import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";

function redact(value: string): string {
  const key = process.env.FORTYGUARD_API_KEY?.trim();
  const stripped = value
    .replace(/api-key\s*[:=]\s*\S+/gi, "[redacted]")
    .replace(/authorization\s*[:=]\s*bearer\s+\S+/gi, "[redacted]")
    .replace(/bearer\s+[a-z0-9._-]{8,}/gi, "[redacted]");
  if (key === undefined || key.length < 8) return stripped;
  return stripped.split(key).join("[redacted]");
}

const baseUrl = (process.env.FORTYGUARD_API_BASE_URL ?? "https://api.fortyguard.com").replace(/\/$/, "");
const endpoint = process.env.FORTYGUARD_MCP_URL?.trim();
const apiKey = process.env.FORTYGUARD_API_KEY?.trim();
if (!endpoint || !apiKey) {
  console.error("Missing MCP URL or API key.");
  process.exit(1);
}
if (process.env.FORTYGUARD_ALLOW_PAID === "true") {
  console.error("FORTYGUARD_ALLOW_PAID is true. Refusing the audit run.");
  process.exit(1);
}

const restDir = path.resolve("evidence/qa-audit/rest-api");
const mcpDir = path.resolve("evidence/qa-audit/mcp");
await mkdir(restDir, { recursive: true });
await mkdir(mcpDir, { recursive: true });

const knownActivity = "98a664cb-d9bb-484c-82a1-3d23ed9c7365";
const probes = [
  { name: "status-missing-key", requestPath: "/v1/status/does-not-exist", key: undefined },
  { name: "status-invalid-key", requestPath: "/v1/status/does-not-exist", key: "invalid-evaluation-key" },
  { name: "status-unknown-id", requestPath: "/v1/status/does-not-exist", key: apiKey },
  { name: "status-known-activity", requestPath: `/v1/status/${knownActivity}`, key: apiKey },
];

const restSummary: Array<Record<string, unknown>> = [];
for (const probe of probes) {
  const started = new Date().toISOString();
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 20_000);
  const headers: Record<string, string> = { accept: "application/json" };
  if (probe.key !== undefined) headers["api-key"] = probe.key;
  try {
    const response = await fetch(`${baseUrl}${probe.requestPath}`, {
      method: "GET",
      headers,
      signal: controller.signal,
    });
    const text = await response.text();
    let parsed: unknown = { nonJson: true, length: text.length, sample: text.slice(0, 500) };
    try {
      parsed = JSON.parse(text);
    } catch {
      // Keep the bounded sample.
    }
    const fileName = `${started.replace(/[:.]/g, "-")}-${probe.name}.json`;
    const payload = redact(JSON.stringify({
      at: started,
      status: response.status,
      request: {
        method: "GET",
        path: probe.requestPath,
        authorization: probe.key === undefined ? "absent" : probe.key === apiKey ? "account-key" : "invalid-key",
      },
      response: parsed,
    }, null, 2));
    await writeFile(path.join(restDir, fileName), `${payload}\n`, "utf8");
    const body = parsed as { error?: boolean; details?: { message?: string }; data?: { status?: string } };
    restSummary.push({
      name: probe.name,
      http: response.status,
      message: body.details?.message ?? null,
      dataStatus: body.data?.status ?? null,
      file: `evidence/qa-audit/rest-api/${fileName}`,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    restSummary.push({ name: probe.name, error: message });
  } finally {
    clearTimeout(timer);
  }
}

const started = Date.now();
const client = new Client(
  { name: "fortyguard-evaluation", version: "0.1.0" },
  { capabilities: {} },
);
const transport = new StreamableHTTPClientTransport(new URL(endpoint), {
  requestInit: { headers: { Authorization: `Bearer ${apiKey}` } },
});
const stamp = new Date().toISOString().replace(/[:.]/g, "-");

await client.connect(transport);
const listed = await client.listTools();
const names = listed.tools.map((tool) => tool.name);
const balance = await client.callTool({ name: "credit_balance", arguments: {} });
const digest = listed.tools.map((tool) => ({
  name: tool.name,
  required: Array.isArray(tool.inputSchema.required) ? tool.inputSchema.required : [],
  propertyNames: Object.keys(tool.inputSchema.properties ?? {}),
  additionalProperties: tool.inputSchema.additionalProperties ?? null,
  descriptionHasFahrenheit: /fahrenheit|°f/i.test(tool.description ?? ""),
  descriptionHasCelsius: /celsius|°c/i.test(tool.description ?? ""),
  descriptionSaysFree: /free/i.test(tool.description ?? ""),
  paidPhrase: (tool.description ?? "").match(/Paid:[^.]+/)?.[0] ?? null,
}));
const payload = {
  at: new Date().toISOString(),
  elapsedMs: Date.now() - started,
  endpoint,
  auth: "Authorization Bearer from the local environment",
  serverVersion: client.getServerVersion() ?? null,
  toolCount: names.length,
  names,
  invoked: ["credit_balance"],
  notInvoked: names.filter((name) => name !== "credit_balance"),
  creditBalance: balance,
  schemaDigest: digest,
};
const filePath = path.join(mcpDir, `${stamp}-discovery-and-balance.json`);
await writeFile(filePath, `${redact(JSON.stringify(payload, null, 2))}\n`, "utf8");
await client.close().catch(() => undefined);

const balanceText = JSON.stringify(balance);
console.log(redact(JSON.stringify({
  rest: restSummary,
  elapsedMs: payload.elapsedMs,
  serverVersion: payload.serverVersion,
  toolCount: payload.toolCount,
  names,
  balanceHasKey: balanceText.includes(apiKey),
  costCredits: balanceText.match(/"cost_credits":\s*(-?\d+)/)?.[1] ?? null,
  availableCredits: balanceText.match(/"available_credits":\s*(\d+)/)?.[1] ?? null,
  evidence: `evidence/qa-audit/mcp/${stamp}-discovery-and-balance.json`,
}, null, 2)));
