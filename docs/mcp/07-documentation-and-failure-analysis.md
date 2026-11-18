# Documentation review and initialization failure

No new MCP connection was made for this note. The evidence is the single approved run in `evidence/mcp/configuration/2026-11-18-initialize-diagnostic.json`.

## Documentation reviewed

These pages were retrieved on 18 November 2026 and rendered as article text, not only the app shell:

| Page | Retrieved |
| --- | --- |
| `https://docs-api.fortyguard.com/docs/mcp-overview` | Yes |
| `https://docs-api.fortyguard.com/docs/mcp-quickstart` | Yes |
| `https://docs-api.fortyguard.com/docs/mcp-authentication` | Yes |
| `https://docs-api.fortyguard.com/docs/mcp-client-setup` | Yes |
| `https://docs-api.fortyguard.com/docs/mcp-tools` | Yes |
| `https://docs-api.fortyguard.com/docs/mcp-troubleshooting` | Yes |

Earlier in the evaluation the troubleshooting page had no readable article. This retrieval does.

## What the pages specify

Endpoint: `https://tos-mcp.app.fortyguard.com/mcp`.

Transport: remote MCP over HTTP / Streamable HTTP.

Authentication: `Authorization: Bearer <FORTYGUARD_API_KEY>`. REST uses `api-key`. The authentication page says a failure can come from a missing, invalid, expired, or revoked key, or from a key without access to the capability. It does not show a 503 body.

Validated clients: OpenAI Codex CLI, Cursor, and Claude Code. Cursor's documented entry is `~/.cursor/mcp.json` with `Bearer ${env:FORTYGUARD_API_KEY}`. Codex sets `startup_timeout_sec = 30` and `tool_timeout_sec = 120`. Those are client timeouts, not a server retry rule.

Expected connection behaviour: the client connects, discovers nine tools, and can call one. The pages do not describe the `initialize` request, the `notifications/initialized` notification, SSE responses, or `mcp-session-id`.

Catalogue, from the quickstart and the tools page:

| Tool | Behaviour | Identifier named on the tools page |
| --- | --- | --- |
| `env_params` | Direct | None. Inputs include latitude, longitude, temperature, `date_time`, optional `analysis`. |
| `heatmap` | Asynchronous | Returns an activity identifier. Optional `wait_for_completion`. |
| `heatmap_read` | Read | `heatmap_id`. Example value `hm_123`. |
| `report` | Asynchronous | Returns an activity identifier. Temperature is specified as degrees Celsius. |
| `report_read` | Read | `analytics_id`. The page says `activity_id` is also accepted. |
| `satellite` | Direct | `sat` point or tiles. `date_time` required. |
| `streetview` | Direct | Latitude, longitude, both angles, and `back_view` required. |
| `temperature_routing` | Asynchronous | Returns an activity identifier. |
| `temperature_routing_read` | Read | The page says to use the activity identifier from `temperature_routing`. It does not name the input field. |

Direct tools return a result for the submitted request. Asynchronous tools return a status and an activity identifier; the matching read tool is how a later check is done. The troubleshooting page says not to submit the same analysis again while it is still processing.

Account limits: capabilities and usage follow the API key's account and subscription. The tools page says heatmap and report generation may consume usage or credits. Read tools are described as not creating a new analysis. None of the six MCP pages publish the numeric credit table.

Troubleshooting categories that are written down: authentication, invalid input, processing, failed, access or plan, and data unavailable. The recommended support report is the client name, the tool name, and an activity identifier if one exists, with the key left out. The page does not mention HTTP 503, `temporarily_unavailable`, or a second request during initialization.

## Configuration check

The approved run used the documented endpoint, `@modelcontextprotocol/sdk` 1.32.2, `StreamableHTTPClientTransport`, and one Bearer credential. Both responses came from that endpoint. The first response was `text/event-stream`, which is the Streamable HTTP success shape the SDK accepts for a request. Rechecking DNS, TLS, or the Bearer prefix would not explain this pair of responses.

Cursor's `~/.cursor/mcp.json` still has no FortyGuard entry. That did not affect this SDK run.

## Diagnostic sequence

Recorded completion time: `2026-11-17T21:39:20.799Z`. That is 17 November 2026, 21:39:20.799 UTC, which is 18 November 2026, 03:09:20.799 at UTC+5:30.

The client elapsed time was 11,956 ms. No tool was called. `toolsCalled` is empty.

First POST, inferred from the SDK as `initialize` because the body is an initialize result. The request body was not captured.

- HTTP 200, empty status text, 11,536 ms.
- `content-type: text/event-stream`, `server: envoy`, `x-envoy-upstream-service-time: 10364`.
- No `mcp-session-id` header.
- SSE data: JSON-RPC result, protocol `2025-11-25`, server FortyGuard `4.0.11`, tools capability `listChanged: true`.

Second POST. The SDK sends `notifications/initialized` only after it accepts the initialize result and the protocol version. The request body was not captured, so the method name is inferred from that sequence.

- HTTP 503, empty status text, 339 ms.
- `content-type: application/json`, `server: envoy`, `x-envoy-upstream-service-time: 41`, `retry-after: 5`.
- Body: `{"error":"temporarily_unavailable","retriable":true,"message":"Authentication service is temporarily unavailable."}`

The SDK error is `StreamableHTTPError` with `code` 503 and that body in the message. The stored classification `jsonrpc_error` on the second exchange is wrong. The body has no `jsonrpc` field, and `error` is a string. The corrected classifier returns `http_error` for any non-2xx status. The original evidence file was not rewritten.

The first response `Date` is `Tue, 17 Nov 2026 21:36:19 GMT`. The second is `Tue, 17 Nov 2026 21:39:20 GMT`. The client measured 11.5 seconds for the first POST. The three-minute gap between those Date values is unexplained.

## How to read the 503

Confirmed: the handshake did not finish. Tool discovery did not happen. The server accepted the first request far enough to return a valid initialize result, so this attempt does not show a malformed Bearer token or a wrong URL. The 503 body names the authentication service and says the condition is temporary and retriable. `retry-after` is 5 seconds.

Not confirmed: that the authentication service is the component that failed, that the API key is invalid, or that a retry would succeed. The message is the server's description. No independent check of that service was made. The same key had already been accepted by the REST status route, which uses a different header and host. That does not prove the MCP credential is valid for every request, and it does not prove the key was rejected here. A rejected key would be expected to look like the authentication failures described in the docs. This body does not say the key is invalid.

There is no evidence that this run consumed credits. No processing tool was called.

## Protocol and session

Confirmed from the captured response and SDK 1.32.2 source:

- The SDK's latest protocol version is `2025-11-25`, the same version in the initialize result. Supported versions also include `2025-06-18`, `2025-03-26`, `2024-11-05`, and `2024-10-07`. The client throws before `notifications/initialized` if the server version is not in that list. The second POST happened, so the version check passed.
- For an HTTP 200 whose content type is `text/event-stream`, `send()` passes the body to the SSE reader when the outgoing message is a request with an id. `initialize` is that kind of message. The client then continued, which is the observed sign that the SSE result was accepted.
- `mcp-session-id` is stored only when the response header is present. If it is absent, the SDK does not throw, later requests do not send the header, and `terminateSession()` returns without a DELETE. A missing session id is valid SDK behaviour. It does not, by itself, show a protocol error. Whether this server is operating without sessions is unverified.
- `StreamableHTTPError` exposes the status code and the message. It does not expose `retry-after` or the other response headers. The wrapper recorded those. The status text was empty on both responses.
- The SDK calls `setProtocolVersion` before the initialized notification, and later requests include `mcp-protocol-version` when that value is set. The diagnostic wrapper did not record that request header, so its presence on the wire was not captured.

Hypothesis, not a finding: the second POST may be hitting an authentication check that the initialize POST did not, or the same check failed only on the second request. The docs do not say whether `notifications/initialized` is authenticated again. That question belongs to FortyGuard.

## Tool-contract comparison

Live MCP schemas were not read. This table is documentation only. DOC-002, DOC-003, and API-001 stay documentation findings. None of them became a runtime defect.

| Topic | MCP page retrieved now | REST, from the existing evaluation record | Runtime |
| --- | --- | --- | --- |
| Heatmap id | `heatmap_read` requires `heatmap_id`. Example `hm_123`. | Status reads use `activity_id`. A live unknown-id GET returned 404 text that uses `activity_id`. | MCP name unverified. API-001. |
| Report id | `report_read` uses `analytics_id` and also accepts `activity_id`. | Same `activity_id` status route. | MCP name unverified. API-001. |
| Routing id | Read-tool field name not published. | `activity_id` on the status route. | Not a new conflict. The MCP field is a documentation gap. |
| Report temperature | `report` says degrees Celsius. | Heat Intelligence text has disagreed between Fahrenheit and Celsius. Example `82.4`. | DOC-002. Unit still not enforced in a live call. |
| Polygon | `heatmap` says a GeoJSON-style polygon. It does not choose FeatureCollection or a bare Polygon. | Both shapes appear as examples. | DOC-003. Unverified. |
| Execution | `env_params`, `satellite`, and `streetview` are direct. Heatmap, report, and routing are asynchronous. | REST processing routes are documented as activities. | The direct-versus-async difference is still a documentation comparison, not a live result. |
| Credits | "May consume usage or credits." No numbers. Reads do not create a new heatmap, report, or route. | Previously recorded REST numbers: env_params 2,110/2,900, heatmap 3,500/4,220, routing 3,500 premium, streetview 8,600 premium, heat intelligence 8,600 premium, satellite 14,400 premium. | No charge was observed. Those REST numbers were not re-fetched in this pass. |

## Confirmed and unresolved

Confirmed:

- The documented endpoint, Streamable HTTP transport, and Bearer header were the ones used.
- Initialize returned HTTP 200 and a JSON-RPC result for FortyGuard 4.0.11.
- The following POST returned HTTP 503 with `temporarily_unavailable` and `retry-after: 5`.
- The handshake did not complete. No tools were listed or invoked.
- The old classifier mislabeled that 503. The corrected rule is covered by local tests.

Unresolved:

- Why a 503 that names the authentication service follows a successful initialize result.
- Whether that service is actually the failing component.
- Whether the server is intentionally sessionless.
- Whether another attempt would succeed. The body says retriable. That is not a test result.
- The live tool catalogue and every input schema.
- The unnamed `temperature_routing_read` field.
- The three-minute difference between the two `Date` headers.

## Next step

Blocker: Await FortyGuard clarification on the HTTP 503 and MCP session handling before another initialization attempt.

The original diagnostic JSON is unchanged. Its `jsonrpc_error` label is corrected in `evidence/mcp/configuration/2026-11-18-initialize-diagnostic-correction.json` to `http_error`. The classifier is `classifyHttpResponse` in `src/mcp/http-classification.ts`, tested in `tests/mcp/http-classification.test.ts`.

The report to engineering can use this timestamp, the endpoint, SDK 1.32.2, the two statuses, the exact 503 body, `retry-after: 5`, and the redacted evidence file. The useful questions are why the authentication service is named on the second request, whether initialization or session handling has a known failure of this shape, whether the missing `mcp-session-id` means stateless operation, and when another connection attempt is worth making.

If a later handshake completes, the next evaluation step is `tools/list`, still without a processing tool.
