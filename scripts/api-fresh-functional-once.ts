import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

function redact(value: string): string {
  const key = process.env.FORTYGUARD_API_KEY?.trim();
  let stripped = value
    .replace(/api-key\s*[:=]\s*\S+/gi, "[redacted]")
    .replace(/authorization\s*[:=]\s*bearer\s+\S+/gi, "[redacted]");
  if (key !== undefined && key.length >= 8) stripped = stripped.split(key).join("[redacted]");
  return stripped;
}

const apiKey = process.env.FORTYGUARD_API_KEY?.trim();
const baseUrl = (process.env.FORTYGUARD_API_BASE_URL ?? "").replace(/\/$/, "");
if (!apiKey || baseUrl !== "https://api.fortyguard.com") {
  console.error("API key missing or base URL is not the documented host. No request sent.");
  process.exit(1);
}

const outDir = path.resolve("evidence/api-fresh/functional-test");
const lockPath = path.join(outDir, "SUBMITTED.lock");
await mkdir(outDir, { recursive: true });

async function send(method: string, requestPath: string, body?: unknown): Promise<{
  status: number;
  contentType: string | null;
  elapsedMs: number;
  bytes: number;
  body: unknown;
}> {
  const started = Date.now();
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 30_000);
  try {
    const response = await fetch(`${baseUrl}${requestPath}`, {
      method,
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "api-key": apiKey as string,
      },
      body: body === undefined ? undefined : JSON.stringify(body),
      signal: controller.signal,
    });
    const text = await response.text();
    let parsed: unknown = { nonJson: true, length: text.length, sample: text.slice(0, 500) };
    try {
      parsed = JSON.parse(text);
    } catch {
      // Keep the bounded sample.
    }
    return {
      status: response.status,
      contentType: response.headers.get("content-type"),
      elapsedMs: Date.now() - started,
      bytes: Buffer.byteLength(text),
      body: parsed,
    };
  } finally {
    clearTimeout(timer);
  }
}

const synthetic = "/v1/status/00000000-0000-4000-8000-000000000001";
const auth = await send("GET", synthetic);
await writeFile(
  path.join(outDir, "01-auth-status.json"),
  `${redact(JSON.stringify({
    at: new Date().toISOString(),
    request: { method: "GET", path: synthetic, authorization: "account-key" },
    response: auth,
  }, null, 2))}\n`,
);

const payload = {
  latitude: 40.7128,
  longitude: -74.006,
  temperature: 32.5,
  date_time: {
    start_date: "2024-07-15",
    start_time: "14:00",
    filter_type: 1,
  },
};
await writeFile(
  path.join(outDir, "02-request-redacted.json"),
  `${JSON.stringify({
    method: "POST",
    path: "/v1/env_params",
    headers: { "api-key": "[redacted]", accept: "application/json", "content-type": "application/json" },
    body: payload,
    documentedPremiumCredits: 2900,
    documentedBasicOrStartupCredits: 2110,
  }, null, 2)}\n`,
);

try {
  await readFile(lockPath, "utf8");
  console.error("A functional POST was already submitted. Refusing a second paid request.");
  process.exit(2);
} catch {
  // First run.
}
await writeFile(lockPath, `${JSON.stringify({ at: new Date().toISOString(), path: "/v1/env_params" })}\n`);

const submit = await send("POST", "/v1/env_params", payload);
await writeFile(
  path.join(outDir, "03-submit-response.json"),
  `${redact(JSON.stringify({ at: new Date().toISOString(), response: submit }, null, 2))}\n`,
);

const submitBody = submit.body as { data?: { activity_id?: string } };
const activityId = submitBody.data?.activity_id;
const polls: Array<Record<string, unknown>> = [];
let finalBody: unknown = null;
if (submit.status >= 200 && submit.status < 300 && typeof activityId === "string" && activityId.length > 0) {
  const started = Date.now();
  const statusPath = `/v1/status/${activityId}`;
  for (let attempt = 1; attempt <= 75; attempt += 1) {
    const polled = await send("GET", statusPath);
    const data = (polled.body as { data?: { status?: string } }).data;
    const word = typeof data?.status === "string" ? data.status : null;
    polls.push({
      attempt,
      at: new Date().toISOString(),
      elapsedSinceSubmitMs: Date.now() - started,
      http: polled.status,
      contentType: polled.contentType,
      bytes: polled.bytes,
      status: word,
    });
    const terminal = word !== null && ["completed", "succeeded", "failed", "error"].includes(word.toLowerCase());
    const earlyMiss = polled.status === 404 && Date.now() - started < 60_000;
    if (terminal || (polled.status !== 200 && !earlyMiss)) {
      finalBody = polled.body;
      break;
    }
    if (attempt === 75) {
      finalBody = polled.body;
      break;
    }
    await new Promise((resolve) => setTimeout(resolve, 8_000));
  }
}

await writeFile(path.join(outDir, "04-status-polls.json"), `${redact(JSON.stringify(polls, null, 2))}\n`);
await writeFile(
  path.join(outDir, "05-final-status.json"),
  `${redact(JSON.stringify({
    activityId: activityId ?? null,
    pollCount: polls.length,
    final: finalBody,
  }, null, 2))}\n`,
);

const finalData = (finalBody as { data?: { status?: string } } | null)?.data;
console.log(redact(JSON.stringify({
  authHttp: auth.status,
  authMs: auth.elapsedMs,
  submitHttp: submit.status,
  submitMs: submit.elapsedMs,
  activityId: activityId ?? null,
  polls: polls.length,
  finalStatus: finalData?.status ?? null,
}, null, 2)));
