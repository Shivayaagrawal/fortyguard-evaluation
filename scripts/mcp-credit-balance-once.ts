/**
 * One free read of the credit_balance tool. Does not call a processing tool.
 */
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";

function redact(value: string): string {
  const key = process.env.FORTYGUARD_API_KEY?.trim();
  const stripped = value
    .replace(/authorization\s*[:=]\s*bearer\s+\S+/gi, "[redacted]")
    .replace(/bearer\s+\S+/gi, "Bearer [redacted]");
  if (key === undefined || key.length < 8) return stripped;
  return stripped.split(key).join("[redacted]");
}

const endpoint = process.env.FORTYGUARD_MCP_URL?.trim();
const apiKey = process.env.FORTYGUARD_API_KEY?.trim();
if (!endpoint || !apiKey) {
  console.error("Missing MCP URL or API key.");
  process.exit(1);
}

const client = new Client({ name: "fortyguard-evaluation", version: "0.1.0" }, { capabilities: {} });
const transport = new StreamableHTTPClientTransport(new URL(endpoint), {
  requestInit: { headers: { Authorization: `Bearer ${apiKey}` } },
});

try {
  await client.connect(transport);
  const result = await client.callTool({ name: "credit_balance", arguments: {} });
  const directory = path.resolve("evidence/mcp/executions");
  await mkdir(directory, { recursive: true });
  const filePath = path.join(directory, "2026-11-18-credit-balance.json");
  await writeFile(filePath, `${redact(JSON.stringify({ at: new Date().toISOString(), tool: "credit_balance", result }, null, 2))}\n`);
  console.log(redact(JSON.stringify(result)));
} finally {
  await client.close();
}
