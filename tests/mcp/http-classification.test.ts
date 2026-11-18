import { describe, expect, it } from "vitest";
import { classifyHttpResponse } from "../../src/mcp/http-classification.js";

const AUTH_SERVICE_BODY = JSON.stringify({
  error: "temporarily_unavailable",
  retriable: true,
  message: "Authentication service is temporarily unavailable.",
});

describe("MCP HTTP response classification", () => {
  it("classifies the FortyGuard authentication-service 503 as an HTTP error", () => {
    expect(classifyHttpResponse(503, AUTH_SERVICE_BODY)).toBe("http_error");
  });

  it("classifies a JSON-RPC error object as jsonrpc_error", () => {
    const body = JSON.stringify({
      jsonrpc: "2.0",
      id: 1,
      error: { code: -32600, message: "Invalid Request" },
    });
    expect(classifyHttpResponse(200, body)).toBe("jsonrpc_error");
  });

  it("classifies a JSON-RPC success object as jsonrpc_result", () => {
    const body = JSON.stringify({
      jsonrpc: "2.0",
      id: 0,
      result: { protocolVersion: "2025-11-25" },
    });
    expect(classifyHttpResponse(200, body)).toBe("jsonrpc_result");
  });

  it("classifies malformed JSON separately", () => {
    expect(classifyHttpResponse(200, "{\"error\":")).toBe("malformed_json");
  });

  it("classifies HTTP 200 with an unexpected JSON body separately", () => {
    expect(classifyHttpResponse(200, AUTH_SERVICE_BODY)).toBe("unrecognized_json");
  });

  it("classifies the captured SSE initialize result as jsonrpc_result", () => {
    const body = [
      "event: message",
      "data: {\"jsonrpc\":\"2.0\",\"id\":0,\"result\":{\"protocolVersion\":\"2025-11-25\",\"serverInfo\":{\"name\":\"FortyGuard\",\"version\":\"4.0.11\"}}}",
      "",
    ].join("\r\n");
    expect(classifyHttpResponse(200, body)).toBe("jsonrpc_result");
  });
});
