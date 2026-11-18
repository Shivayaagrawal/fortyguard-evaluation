import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";

function redact(value: string): string {
  const key = process.env.FORTYGUARD_API_KEY?.trim();
  let stripped = value
    .replace(/api-key\s*[:=]\s*\S+/gi, "[redacted]")
    .replace(/authorization\s*[:=]\s*bearer\s+\S+/gi, "[redacted]")
    .replace(/bearer\s+[a-z0-9._-]{8,}/gi, "[redacted]");
  if (key !== undefined && key.length >= 8) stripped = stripped.split(key).join("[redacted]");
  return stripped;
}

const endpoint = process.env.FORTYGUARD_MCP_URL?.trim();
const apiKey = process.env.FORTYGUARD_API_KEY?.trim();
if (!endpoint || !apiKey || endpoint !== "https://tos-mcp.app.fortyguard.com/mcp") {
  console.error("MCP URL or API key is not the documented configuration. No connection opened.");
  process.exit(1);
}

const httpLog: Array<Record<string, unknown>> = [];
const loggingFetch: typeof fetch = async (input, init) => {
  const started = Date.now();
  const response = await fetch(input, init);
  const method = init?.method ?? "GET";
  httpLog.push({
    at: new Date().toISOString(),
    method,
    status: response.status,
    contentType: response.headers.get("content-type"),
    elapsedMs: Date.now() - started,
  });
  return response;
};

const outDir = path.resolve("evidence/mcp-fresh");
await mkdir(outDir, { recursive: true });
const started = Date.now();
const client = new Client({ name: "fortyguard-evaluation", version: "0.1.0" }, { capabilities: {} });
const transport = new StreamableHTTPClientTransport(new URL(endpoint), {
  requestInit: { headers: { Authorization: `Bearer ${apiKey}` } },
  fetch: loggingFetch,
});
await client.connect(transport);
const listed = await client.listTools();
const discoveryMs = Date.now() - started;

type Tool = (typeof listed.tools)[number];
function schemaOf(tool: Tool) {
  const schema = tool.inputSchema;
  const properties = schema.properties ?? {};
  return {
    name: tool.name,
    description: tool.description ?? "",
    required: Array.isArray(schema.required) ? schema.required : [],
    additionalProperties: schema.additionalProperties ?? null,
    properties: Object.fromEntries(
      Object.entries(properties).map(([name, value]) => {
        const property = value as {
          type?: unknown;
          description?: string;
          enum?: unknown;
          default?: unknown;
          minimum?: unknown;
          maximum?: unknown;
          minItems?: unknown;
          maxItems?: unknown;
          anyOf?: unknown;
          items?: unknown;
        };
        return [name, {
          type: property.type ?? null,
          description: property.description ?? null,
          enum: property.enum ?? null,
          default: property.default ?? null,
          minimum: property.minimum ?? null,
          maximum: property.maximum ?? null,
          minItems: property.minItems ?? null,
          maxItems: property.maxItems ?? null,
          anyOf: property.anyOf ?? null,
          items: property.items ?? null,
        }];
      }),
    ),
  };
}

const digest = listed.tools.map(schemaOf);
const balanceTool = digest.find((tool) => tool.name === "credit_balance");
const paidNumber = balanceTool?.description.match(/\b([1-9]\d{2,})\s*credits?\b/i);
const balanceSafe = balanceTool !== undefined
  && balanceTool.required.length === 0
  && paidNumber === null;

let balance: unknown = null;
let balanceMs: number | null = null;
if (balanceSafe) {
  const callStarted = Date.now();
  balance = await client.callTool({ name: "credit_balance", arguments: {} });
  balanceMs = Date.now() - callStarted;
}

const payload = {
  at: new Date().toISOString(),
  endpoint,
  auth: "Authorization Bearer from the local environment",
  sdk: "@modelcontextprotocol/sdk 1.32.2",
  discoveryMs,
  serverVersion: client.getServerVersion() ?? null,
  serverCapabilities: client.getServerCapabilities() ?? null,
  sessionPresent: Boolean(transport.sessionId),
  httpLog,
  toolCount: digest.length,
  names: digest.map((tool) => tool.name),
  invoked: balanceSafe ? ["credit_balance"] : [],
  balanceSkippedReason: balanceSafe ? null : "credit_balance was missing, required arguments, or named a positive credit cost",
  balanceMs,
  creditBalance: balance,
  schemaDigest: digest,
};
await writeFile(
  path.join(outDir, "2026-11-18-discovery.json"),
  `${redact(JSON.stringify(payload, null, 2))}\n`,
);
await client.close().catch(() => undefined);

const balanceText = JSON.stringify(balance);
console.log(redact(JSON.stringify({
  discoveryMs,
  http: httpLog.map((entry) => ({ method: entry.method, status: entry.status, elapsedMs: entry.elapsedMs })),
  serverVersion: payload.serverVersion,
  toolCount: payload.toolCount,
  names: payload.names,
  balanceCalled: balanceSafe,
  balanceMs,
  costCredits: balanceText.match(/"cost_credits":\s*(-?\d+)/)?.[1] ?? null,
  availableCredits: balanceText.match(/"available_credits":\s*(\d+)/)?.[1] ?? null,
  plan: balanceText.match(/"plan":\s*"([^"]+)"/)?.[1] ?? null,
}, null, 2)));
