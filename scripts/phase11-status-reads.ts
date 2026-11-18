import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

function redact(value: string): string {
  const key = process.env.FORTYGUARD_API_KEY?.trim();
  const withoutHeader = value
    .replace(/api-key\s*[:=]\s*\S+/gi, "[redacted]")
    .replace(/authorization\s*[:=]\s*bearer\s+\S+/gi, "[redacted]");
  if (key === undefined || key.length < 8) return withoutHeader;
  return withoutHeader.split(key).join("[redacted]");
}

const baseUrl = (process.env.FORTYGUARD_API_BASE_URL ?? "https://api.fortyguard.com").replace(/\/$/, "");
const apiKey = process.env.FORTYGUARD_API_KEY?.trim();
if (!apiKey) {
  console.error("FORTYGUARD_API_KEY is empty. Refusing to run.");
  process.exit(1);
}

const knownActivity = "98a664cb-d9bb-484c-82a1-3d23ed9c7365";
const probes = [
  { name: "status-missing-key", path: "/v1/status/does-not-exist", key: undefined },
  { name: "status-invalid-key", path: "/v1/status/does-not-exist", key: "invalid-evaluation-key" },
  { name: "status-unknown-id", path: "/v1/status/does-not-exist", key: apiKey },
  { name: "status-known-activity", path: `/v1/status/${knownActivity}`, key: apiKey },
];

const directory = path.resolve("evidence/phase11/rest-api");
await mkdir(directory, { recursive: true });

for (const probe of probes) {
  const started = new Date().toISOString();
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 20_000);
  const headers: Record<string, string> = { accept: "application/json" };
  if (probe.key !== undefined) headers["api-key"] = probe.key;
  try {
    const response = await fetch(`${baseUrl}${probe.path}`, {
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
        path: probe.path,
        authorization: probe.key === undefined ? "absent" : probe.key === apiKey ? "account-key" : "invalid-key",
      },
      response: parsed,
    }, null, 2));
    await writeFile(path.join(directory, fileName), `${payload}\n`, "utf8");
    console.log(redact(`${probe.name} ${response.status} evidence=evidence/phase11/rest-api/${fileName}`));
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.log(redact(`${probe.name} ERROR ${message}`));
  } finally {
    clearTimeout(timer);
  }
}
