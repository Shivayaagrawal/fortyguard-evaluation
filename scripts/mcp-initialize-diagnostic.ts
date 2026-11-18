/**
 * One MCP initialize, with the HTTP response recorded.
 *
 * Does not call tools/list or any tool. Does not open the network unless
 * FORTYGUARD_MCP_DIAGNOSTIC_APPROVED is exactly "true".
 *
 * Endpoint, SDK, transport, and Bearer header match the audited setup.
 */
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";
import { classifyHttpResponse } from "../src/mcp/http-classification.ts";

const BODY_LIMIT = 1024;
const CONNECT_TIMEOUT_MS = 35_000;
const MAX_EXCHANGES = 8;

type Exchange = {
  method: string;
  url: string;
  durationMs: number;
  status: number;
  statusText: string;
  redirected: boolean;
  responseUrl: string;
  request: {
    authorization: "absent" | "bearer-once" | "other";
    contentType: string | null;
    accept: string | null;
  };
  headers: Record<string, string>;
  body: string;
  bodyTruncated: boolean;
  classification: string;
};

const exchanges: Exchange[] = [];

function redact(value: string): string {
  const key = process.env.FORTYGUARD_API_KEY?.trim();
  const stripped = value
    .replace(/api-key\s*[:=]\s*\S+/gi, "[redacted]")
    .replace(/authorization\s*[:=]\s*bearer\s+\S+/gi, "[redacted]")
    .replace(/bearer\s+\S+/gi, "Bearer [redacted]");
  if (key === undefined || key.length < 8) return stripped;
  return stripped.split(key).join("[redacted]");
}

function safeUrl(value: string): string {
  try {
    const url = new URL(value);
    return `${url.origin}${url.pathname}`;
  } catch {
    return "[unparsed]";
  }
}

function headerValue(headers: HeadersInit | undefined, name: string): string | null {
  if (headers === undefined) return null;
  return new Headers(headers).get(name);
}

function authorizationShape(headers: HeadersInit | undefined): Exchange["request"]["authorization"] {
  const value = headerValue(headers, "authorization");
  if (value === null) return "absent";
  return /^Bearer\s+\S+$/.test(value.trim()) ? "bearer-once" : "other";
}

function redactHeaders(headers: Headers): Record<string, string> {
  const hidden = new Set([
    "authorization",
    "cookie",
    "set-cookie",
    "proxy-authorization",
    "x-api-key",
    "api-key",
    "mcp-session-id",
  ]);
  const recorded: Record<string, string> = {};
  headers.forEach((value, name) => {
    recorded[name] = hidden.has(name.toLowerCase()) ? "[redacted]" : redact(value).slice(0, 300);
  });
  return recorded;
}

function withTimeout<T>(promise: Promise<T>, ms: number, label: string): Promise<T> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error(`${label} timed out after ${ms}ms`)), ms);
    promise.then(
      (value) => {
        clearTimeout(timer);
        resolve(value);
      },
      (error: unknown) => {
        clearTimeout(timer);
        reject(error);
      },
    );
  });
}

const observingFetch: typeof fetch = async (input, init) => {
  const method = init?.method ?? "GET";
  const target = input instanceof URL ? input.toString() : input instanceof Request ? input.url : String(input);
  const started = Date.now();
  const response = await fetch(input, init);
  const durationMs = Date.now() - started;
  if (exchanges.length < MAX_EXCHANGES) {
    let body = "";
    let bodyTruncated = false;
    try {
      const text = await response.clone().text();
      bodyTruncated = text.length > BODY_LIMIT;
      body = redact(text.slice(0, BODY_LIMIT));
    } catch {
      body = "[body unreadable]";
    }
    exchanges.push({
      method,
      url: safeUrl(target),
      durationMs,
      status: response.status,
      statusText: response.statusText,
      redirected: response.redirected,
      responseUrl: safeUrl(response.url || target),
      request: {
        authorization: authorizationShape(init?.headers),
        contentType: headerValue(init?.headers, "content-type"),
        accept: headerValue(init?.headers, "accept"),
      },
      headers: redactHeaders(response.headers),
      body,
      bodyTruncated,
      classification: classifyHttpResponse(response.status, body),
    });
  }
  return response;
};

function sdkError(error: unknown): { name: string; message: string; code: number | null } {
  if (!(error instanceof Error)) {
    return { name: "unknown", message: "unknown error", code: null };
  }
  const code = "code" in error && typeof error.code === "number" ? error.code : null;
  return { name: error.name, message: redact(error.message), code };
}

if (process.env.FORTYGUARD_MCP_DIAGNOSTIC_APPROVED !== "true") {
  console.log("NOT_SENT The approval gate is closed. No MCP request was made.");
  process.exit(0);
}

const endpoint = process.env.FORTYGUARD_MCP_URL?.trim();
const apiKey = process.env.FORTYGUARD_API_KEY?.trim();
if (!endpoint || !apiKey) {
  console.error("Missing MCP URL or API key.");
  process.exit(1);
}

const started = Date.now();
const client = new Client(
  { name: "fortyguard-evaluation", version: "0.1.0" },
  { capabilities: {} },
);
const transport = new StreamableHTTPClientTransport(new URL(endpoint), {
  fetch: observingFetch,
  requestInit: {
    headers: { Authorization: `Bearer ${apiKey}` },
  },
});

let outcome: "initialized" | "failed" = "failed";
let errorRecord: ReturnType<typeof sdkError> | null = null;
let serverVersion: ReturnType<Client["getServerVersion"]> | null = null;

try {
  await withTimeout(client.connect(transport), CONNECT_TIMEOUT_MS, "mcp connect");
  outcome = "initialized";
  serverVersion = client.getServerVersion() ?? null;
} catch (error) {
  errorRecord = sdkError(error);
  process.exitCode = 1;
} finally {
  const payload = {
    at: new Date().toISOString(),
    endpoint,
    sdk: "@modelcontextprotocol/sdk 1.32.2",
    transport: "StreamableHTTPClientTransport",
    auth: "Authorization Bearer, value not recorded",
    toolsCalled: [],
    connectTimeoutMs: CONNECT_TIMEOUT_MS,
    elapsedMs: Date.now() - started,
    outcome,
    serverVersion,
    sdkError: errorRecord,
    exchanges,
  };
  const directory = path.resolve("evidence/mcp/configuration");
  await mkdir(directory, { recursive: true });
  const filePath = path.join(directory, `${new Date().toISOString().replace(/[:.]/g, "-")}-initialize-diagnostic.json`);
  await writeFile(filePath, `${redact(JSON.stringify(payload, null, 2))}\n`, "utf8");
  console.log(redact(JSON.stringify({
    outcome,
    elapsedMs: payload.elapsedMs,
    sdkError: errorRecord,
    exchanges: exchanges.map((exchange) => ({
      method: exchange.method,
      url: exchange.url,
      status: exchange.status,
      statusText: exchange.statusText,
      durationMs: exchange.durationMs,
      classification: exchange.classification,
      authorization: exchange.request.authorization,
    })),
  })));
  try {
    await client.close();
  } catch {
    // The session may never have opened.
  }
}
