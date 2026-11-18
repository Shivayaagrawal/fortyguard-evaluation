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
  requestInit: { headers: { Authorization: `Bearer ${apiKey}` } },
});

const directory = path.resolve("evidence/phase11/mcp");
await mkdir(directory, { recursive: true });
const stamp = new Date().toISOString().replace(/[:.]/g, "-");

try {
  await client.connect(transport);
  const listed = await client.listTools();
  const names = listed.tools.map((tool) => tool.name);
  const documented = new Set(DOCUMENTED);
  const balance = await client.callTool({ name: "credit_balance", arguments: {} });
  const payload = {
    at: new Date().toISOString(),
    elapsedMs: Date.now() - started,
    endpoint,
    auth: "Authorization Bearer from the local environment",
    serverVersion: client.getServerVersion() ?? null,
    toolCount: names.length,
    missingFromServer: DOCUMENTED.filter((name) => !names.includes(name)),
    undocumentedOnServer: names.filter((name) => !documented.has(name)),
    tools: listed.tools.map((tool) => ({
      name: tool.name,
      description: tool.description ?? null,
      inputSchema: tool.inputSchema,
    })),
    invoked: ["credit_balance"],
    creditBalance: balance,
  };
  const filePath = path.join(directory, `${stamp}-discovery-and-balance.json`);
  await writeFile(filePath, `${redact(JSON.stringify(payload, null, 2))}\n`, "utf8");
  const balanceText = JSON.stringify(balance);
  console.log(redact(JSON.stringify({
    elapsedMs: payload.elapsedMs,
    serverVersion: payload.serverVersion,
    toolCount: payload.toolCount,
    names,
    missingFromServer: payload.missingFromServer,
    undocumentedOnServer: payload.undocumentedOnServer,
    balanceHasKey: balanceText.includes(apiKey),
    evidence: `evidence/phase11/mcp/${stamp}-discovery-and-balance.json`,
  }, null, 2)));
} catch (error) {
  const message = error instanceof Error ? error.message : "unknown error";
  const filePath = path.join(directory, `${stamp}-connect-failed.json`);
  await writeFile(filePath, `${redact(JSON.stringify({ at: new Date().toISOString(), error: message }, null, 2))}\n`, "utf8");
  console.log(redact(`MCP_CONNECT_FAILED ${message}`));
  process.exitCode = 1;
} finally {
  try {
    await client.close();
  } catch {
    // The session may never have opened.
  }
}
