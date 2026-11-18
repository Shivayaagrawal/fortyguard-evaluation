import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

function redact(value: string): string {
  const key = process.env.FORTYGUARD_API_KEY?.trim();
  let stripped = value
    .replace(/api-key\s*[:=]\s*\S+/gi, "[redacted]")
    .replace(/authorization\s*[:=]\s*bearer\s+\S+/gi, "[redacted]");
  if (key !== undefined && key.length >= 8) stripped = stripped.split(key).join("[redacted]");
  return stripped;
}

if (process.env.FORTYGUARD_ALLOW_PAID === "true") {
  console.error("FORTYGUARD_ALLOW_PAID is true. Refusing the fresh authentication run.");
  process.exit(1);
}

const apiKey = process.env.FORTYGUARD_API_KEY?.trim();
if (!apiKey) {
  console.error("FORTYGUARD_API_KEY is not set. Authentication tests that need a key were not sent.");
  process.exit(1);
}

const baseUrl = (process.env.FORTYGUARD_API_BASE_URL ?? "https://api.fortyguard.com").replace(/\/$/, "");
const unknownId = "00000000-0000-4000-8000-000000000001";
const outDir = path.resolve("evidence/api-fresh/authentication");
await mkdir(outDir, { recursive: true });

const probes = [
  {
    id: "API-001",
    file: "missing-key.json",
    path: `/v1/status/${unknownId}`,
    key: undefined,
    authorization: "absent",
  },
  {
    id: "API-002",
    file: "invalid-key.json",
    path: `/v1/status/${unknownId}`,
    key: "invalid-evaluation-key",
    authorization: "invalid-dummy-key",
  },
  {
    id: "API-003",
    file: "unknown-activity.json",
    path: `/v1/status/${unknownId}`,
    key: apiKey,
    authorization: "account-key",
  },
];

const summary: Array<Record<string, unknown>> = [];
for (const probe of probes) {
  const headers: Record<string, string> = { accept: "application/json" };
  if (probe.key !== undefined) headers["api-key"] = probe.key;
  const started = Date.now();
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 20_000);
  try {
    const response = await fetch(`${baseUrl}${probe.path}`, {
      method: "GET",
      headers,
      signal: controller.signal,
    });
    const text = await response.text();
    let body: unknown = { nonJson: true, length: text.length, sample: text.slice(0, 500) };
    try {
      body = JSON.parse(text);
    } catch {
      // Keep the bounded non-JSON sample.
    }
    const payload = {
      id: probe.id,
      at: new Date().toISOString(),
      elapsedMs: Date.now() - started,
      request: {
        method: "GET",
        path: probe.path,
        authorization: probe.authorization,
        accept: "application/json",
      },
      response: {
        status: response.status,
        contentType: response.headers.get("content-type"),
        bytes: Buffer.byteLength(text),
        body,
      },
    };
    const redacted = redact(JSON.stringify(payload, null, 2));
    await writeFile(path.join(outDir, probe.file), `${redacted}\n`, "utf8");
    const parsed = body as { details?: { message?: string } };
    summary.push({
      id: probe.id,
      http: response.status,
      contentType: response.headers.get("content-type"),
      elapsedMs: payload.elapsedMs,
      bytes: payload.response.bytes,
      message: parsed.details?.message ?? null,
      file: `evidence/api-fresh/authentication/${probe.file}`,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    summary.push({ id: probe.id, error: message });
  } finally {
    clearTimeout(timer);
  }
}

console.log(redact(JSON.stringify(summary, null, 2)));
