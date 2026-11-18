// Discovery script. The next approved connection is scripts/mcp-initialize-diagnostic.ts,
// which records the HTTP response and does not call tools/list.
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";

const DOCUMENTED = [
  "env_params",
  "heatmap",
  "heatmap_read",
  "report",
  "report_read",
  "satellite",
  "streetview",
  "temperature_routing",
  "temperature_routing_read",
];

function redact(value: string): string {
  const key = process.env.FORTYGUARD_API_KEY?.trim();
  const stripped = value
    .replace(/api-key\s*[:=]\s*\S+/gi, "[redacted]")
    .replace(/authorization\s*[:=]\s*bearer\s+\S+/gi, "[redacted]")
    .replace(/bearer\s+[a-z0-9._-]{8,}/gi, "[redacted]");
  if (key === undefined || key.length < 8) return stripped;
  return stripped.split(key).join("[redacted]");
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
  requestInit: {
    headers: { Authorization: `Bearer ${apiKey}` },
  },
});

try {
  await withTimeout(client.connect(transport), 20_000, "mcp connect");
  const listed = await withTimeout(client.listTools(), 20_000, "tools/list");
  const names = listed.tools.map((tool) => tool.name);
  const documented = new Set(DOCUMENTED);
  const live = new Set(names);
  const payload = {
    at: new Date().toISOString(),
    elapsedMs: Date.now() - started,
    endpoint,
    auth: "Authorization Bearer from the local environment",
    serverVersion: client.getServerVersion() ?? null,
    capabilities: client.getServerCapabilities() ?? null,
    toolCount: names.length,
    missingFromServer: DOCUMENTED.filter((name) => !live.has(name)),
    undocumentedOnServer: names.filter((name) => !documented.has(name)),
    tools: listed.tools.map((tool) => ({
      name: tool.name,
      description: tool.description ?? null,
      inputSchema: tool.inputSchema,
    })),
    invoked: [],
  };
  const directory = path.resolve("evidence/mcp/tool-discovery");
  await mkdir(directory, { recursive: true });
  const filePath = path.join(directory, "2026-11-17-tools-list.json");
  await writeFile(filePath, `${redact(JSON.stringify(payload, null, 2))}\n`, "utf8");
  console.log(redact(JSON.stringify({
    elapsedMs: payload.elapsedMs,
    serverVersion: payload.serverVersion,
    toolCount: payload.toolCount,
    names,
    missingFromServer: payload.missingFromServer,
    undocumentedOnServer: payload.undocumentedOnServer,
  }, null, 2)));
} catch (error) {
  const message = error instanceof Error ? error.message : "unknown error";
  console.log(redact(`MCP_CONNECT_FAILED ${message}`));
  process.exitCode = 1;
} finally {
  try {
    await client.close();
  } catch {
    // The session may never have opened.
  }
}
