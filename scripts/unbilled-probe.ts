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

interface Probe {
  name: string;
  method: "GET" | "POST";
  path: string;
  headers: Record<string, string>;
  body?: unknown;
}

const baseUrl = (process.env.FORTYGUARD_API_BASE_URL ?? "https://api.fortyguard.com").replace(/\/$/, "");
const apiKey = process.env.FORTYGUARD_API_KEY?.trim();

if (!apiKey) {
  console.error("FORTYGUARD_API_KEY is empty. Refusing to run.");
  process.exit(1);
}

const probes: Probe[] = [
  {
    name: "status-missing-key",
    method: "GET",
    path: "/v1/status/does-not-exist",
    headers: { accept: "application/json" },
  },
  {
    name: "status-invalid-key",
    method: "GET",
    path: "/v1/status/does-not-exist",
    headers: { accept: "application/json", "api-key": "invalid-evaluation-key" },
  },
  {
    name: "status-unknown-id",
    method: "GET",
    path: "/v1/status/does-not-exist",
    headers: { accept: "application/json", "api-key": apiKey },
  },
  {
    name: "env-params-missing-temperature",
    method: "POST",
    path: "/v1/env_params",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      "api-key": apiKey,
    },
    body: {
      latitude: 40.7128,
      longitude: -74.006,
      date_time: {
        start_date: "2024-07-15",
        start_time: "14:00",
        filter_type: 1,
      },
    },
  },
  {
    name: "heatmap-unclosed-ring",
    method: "POST",
    path: "/v1/heatmap",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      "api-key": apiKey,
    },
    body: {
      polygon_aoi: {
        type: "Polygon",
        coordinates: [[
          [-74.017, 40.7051],
          [-74.0031, 40.7051],
          [-74.0031, 40.718],
          [-74.017, 40.718],
        ]],
      },
      date_time: {
        start_date: "2024-07-15",
        start_time: "14:00",
        filter_type: 1,
      },
      granularity: 100,
    },
  },
];

function containsActivity(value: unknown): boolean {
  if (value === null || typeof value !== "object") return false;
  if (Array.isArray(value)) return value.some(containsActivity);
  const record = value as Record<string, unknown>;
  if (typeof record.activity_id === "string" && record.activity_id.length > 0) return true;
  return Object.values(record).some(containsActivity);
}

async function runProbe(probe: Probe): Promise<{ stop: boolean; line: string }> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 15_000);
  const started = new Date().toISOString();
  try {
    const response = await fetch(`${baseUrl}${probe.path}`, {
      method: probe.method,
      headers: probe.headers,
      body: probe.body === undefined ? undefined : JSON.stringify(probe.body),
      signal: controller.signal,
    });
    const text = await response.text();
    let parsed: unknown = text.slice(0, 4000);
    try {
      parsed = JSON.parse(text);
    } catch {
      parsed = { nonJson: true, length: text.length, sample: text.slice(0, 500) };
    }
    const accepted = containsActivity(parsed);
    const folder = response.status >= 400 ? "errors" : "responses";
    const directory = path.resolve("evidence/api", folder);
    await mkdir(directory, { recursive: true });
    const fileName = `${started.replace(/[:.]/g, "-")}-${probe.name}.json`;
    const safeRequest = {
      method: probe.method,
      path: probe.path,
      body: probe.body ?? null,
      authorization: probe.headers["api-key"] ? "present" : "absent",
    };
    const payload = redact(JSON.stringify({
      at: started,
      status: response.status,
      request: safeRequest,
      response: parsed,
      activityAccepted: accepted,
    }, null, 2));
    await writeFile(path.join(directory, fileName), `${payload}\n`, "utf8");
    const line = `${probe.name} ${response.status} activityAccepted=${accepted} evidence=evidence/api/${folder}/${fileName}`;
    console.log(redact(line));
    return { stop: accepted, line };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.log(redact(`${probe.name} ERROR ${message}`));
    return { stop: false, line: `${probe.name} ERROR` };
  } finally {
    clearTimeout(timer);
  }
}

const selected = process.env.FORTYGUARD_ALLOW_REJECTED_POSTS === "true"
  ? probes
  : probes.filter((probe) => probe.method === "GET");

if (selected.length !== probes.length) {
  console.log("Skipping POST probes. A timeout while the service is down could still accept a billable job.");
}

for (const probe of selected) {
  const result = await runProbe(probe);
  if (result.stop) {
    console.log("Stopping. A request that was meant to be rejected returned an activity id.");
    process.exit(2);
  }
}
