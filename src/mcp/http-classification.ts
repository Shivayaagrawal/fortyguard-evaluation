export type HttpResponseClass =
  | "http_error"
  | "jsonrpc_error"
  | "jsonrpc_result"
  | "malformed_json"
  | "unrecognized_json"
  | "unrecognized_payload";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isJsonRpcError(value: unknown): boolean {
  return isRecord(value) && typeof value.jsonrpc === "string" && isRecord(value.error);
}

function isJsonRpcResult(value: unknown): boolean {
  return isRecord(value) && typeof value.jsonrpc === "string" && "result" in value && !isJsonRpcError(value);
}

function jsonFromSse(body: string): unknown {
  const events = body.split(/\r?\n\r?\n/);
  for (const event of events) {
    const data = event
      .split(/\r?\n/)
      .filter((line) => line.startsWith("data:"))
      .map((line) => line.slice(5).replace(/^ /, ""))
      .join("\n")
      .trim();
    if (data.length === 0 || data === "[DONE]") continue;
    return JSON.parse(data) as unknown;
  }
  return undefined;
}

function parseBody(body: string): { kind: "empty" | "malformed" | "other" } | { kind: "json"; value: unknown } {
  const trimmed = body.trim();
  if (trimmed.length === 0) return { kind: "empty" };
  if (trimmed.startsWith("{") || trimmed.startsWith("[")) {
    try {
      return { kind: "json", value: JSON.parse(trimmed) as unknown };
    } catch {
      return { kind: "malformed" };
    }
  }
  if (/^(?:event|data):/m.test(trimmed)) {
    try {
      const value = jsonFromSse(trimmed);
      return value === undefined ? { kind: "other" } : { kind: "json", value };
    } catch {
      return { kind: "malformed" };
    }
  }
  return { kind: "other" };
}

/**
 * Classifies one HTTP response. A non-2xx status is `http_error` even when
 * the body contains the word "error". JSON-RPC labels require a 2xx status,
 * a `jsonrpc` string, and either an `error` object or a `result`.
 */
export function classifyHttpResponse(status: number, body: string): HttpResponseClass {
  if (status < 200 || status >= 300) return "http_error";
  const parsed = parseBody(body);
  if (parsed.kind === "malformed") return "malformed_json";
  if (parsed.kind !== "json") return "unrecognized_payload";
  if (isJsonRpcError(parsed.value)) return "jsonrpc_error";
  if (isJsonRpcResult(parsed.value)) return "jsonrpc_result";
  return "unrecognized_json";
}
