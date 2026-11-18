# MCP connection configuration audit

No new MCP initialization was sent. The account key is not recorded here.

## 1. Existing SDK implementation

`scripts/mcp-discover-once.ts` does this, in order:

1. Read `FORTYGUARD_MCP_URL` and `FORTYGUARD_API_KEY` from the process environment. The run used `node --env-file=.env`.
2. Refuse to start if either value is missing.
3. Construct `Client` from `@modelcontextprotocol/sdk/client/index.js` with name `fortyguard-evaluation` and empty capabilities.
4. Construct `StreamableHTTPClientTransport` with the URL and `requestInit.headers.Authorization`.
5. Call `client.connect(transport)`, which sends the MCP `initialize` request through that transport.
6. On success, call `listTools`. That line was not reached.
7. On failure, print the redacted error message and close the client.

A 20 second timer wraps `connect`. The error that came back was not that timer.

Classification: VERIFIED_CORRECT.

## 2. Installed SDK version

`@modelcontextprotocol/sdk` 1.32.2, from the lockfile. It was not upgraded.

Classification: VERIFIED_CORRECT.

## 3. Transport

The script imports `StreamableHTTPClientTransport` from `@modelcontextprotocol/sdk/client/streamableHttp.js`.

It does not import `SSEClientTransport` or `StdioClientTransport`. The thrown error is `StreamableHTTPError` from that same file, and the message prefix `Error POSTing to endpoint` is the POST path in `send()`, not the optional GET SSE path (`Failed to open SSE stream`).

The SDK then sets `content-type: application/json` and `accept: application/json, text/event-stream` before `fetch`. That is the Streamable HTTP client, not a hand-rolled POST.

Classification: VERIFIED_CORRECT.

## 4. Authentication

Checked without printing the key:

| Check | Result |
| --- | --- |
| `FORTYGUARD_API_KEY` present | Yes |
| Non-empty after trim | Yes |
| Already trimmed | Yes |
| Internal whitespace | No |
| Value already starts with `Bearer` | No |
| Header built as `Bearer` plus the trimmed key | Yes, once |
| REST `api-key` header used on this call | No |
| Header passed into the transport | Yes, `requestInit.headers` |

The SDK merges those headers in `_commonHeaders()`. No `authProvider` is set, so the SDK does not add a second bearer token.

Classification: VERIFIED_CORRECT for the SDK test.

## 5. Endpoint

`FORTYGUARD_MCP_URL` is exactly `https://tos-mcp.app.fortyguard.com/mcp`. No extra whitespace, no second `/mcp`, HTTPS.

Classification: VERIFIED_CORRECT.

## 6. Cursor configuration

`~/.cursor/mcp.json` contains a local `railway` STDIO server. It has no `fortyguard` entry.

`fortyguard-evaluation/.cursor/mcp.json` does not exist.

Cursor itself was never pointed at this remote server. That does not explain the SDK timeout. It does mean the IDE has not attempted this connection.

Classification: CONFIGURATION_ERROR for using Cursor's MCP panel. The SDK test did not depend on that file.

## 7. Environment-variable availability

The SDK process was started with `--env-file=.env`, so that process could see the key. A repository `.env` is not loaded into Cursor's remote MCP client. Cursor's documented interpolation is `${env:FORTYGUARD_API_KEY}`, and `envFile` applies to STDIO servers, not to a remote URL.

Classification: POTENTIAL_ISSUE only if a future Cursor MCP entry is added without the variable in Cursor's own environment. It is not the cause of the SDK failure.

## 8. DNS, TLS, and network

Commands sent no API key and no MCP `initialize` body.

| Check | Result | Class |
| --- | --- | --- |
| DNS | `tos-mcp.app.fortyguard.com` resolves to `aa05ef2e8a9c04e48ae295b7f8411fdd-1896807313.us-west-1.elb.amazonaws.com`, then `50.18.24.237` and `184.72.62.98` | VERIFIED_CORRECT |
| TCP and TLS | `openssl s_client` connected to `50.18.24.237:443`. TLS 1.3. Certificate `CN=*.fortyguard.com`. Verification OK. | VERIFIED_CORRECT |
| Proxy | `http_proxy`, `https_proxy`, and `ALL_PROXY` are unset | VERIFIED_CORRECT |

## 9. Where the previous failure happened

The SDK throws `Error POSTing to endpoint: ...` only after `fetch` returns and `response.ok` is false. The text after the colon is the response body. That body was `upstream request timeout`.

So the failure was not DNS, not TCP, and not TLS. The POST was sent. A non-success HTTP response came back. The numeric status is UNKNOWN: `StreamableHTTPError` stores it on `.code`, and the script printed `.message` only.

The 20 second client timer did not fire. The command returned in about 17 seconds with the gateway text, not with `mcp connect timed out after 20000ms`.

Classification: the stage is VERIFIED as "HTTP response received, not OK, body was upstream request timeout." The status code is UNKNOWN.

## 10. Client-side mistakes

None of the setup checks explain this response.

The logging gap is real: the HTTP status was dropped. That is a POTENTIAL_ISSUE for diagnosis, not a cause of the timeout body.

## 11. Proposed correction

Do not change the URL, the transport, or the bearer header.

If Cursor's panel is used later, add a gitignored project entry:

```json
{
  "mcpServers": {
    "fortyguard": {
      "url": "https://tos-mcp.app.fortyguard.com/mcp",
      "headers": {
        "Authorization": "Bearer ${env:FORTYGUARD_API_KEY}"
      }
    }
  }
}
```

That entry was not added. `FORTYGUARD_API_KEY` would also have to exist in Cursor's environment, not only in `.env`.

On the next SDK attempt, log `error.code` as well as `error.message`, still without the key. That records the HTTP status the last run lost.

## 12. Is another initialization justified?

Yes, one attempt, and only to record the HTTP status. The client configuration is not the open question. DNS and TLS succeed, and the last POST already received `upstream request timeout`.

Another attempt is not required to reject a wrong transport, a wrong URL, or a missing bearer prefix. Those were checked and match the documented setup.

MCP-001 stays open. This audit does not reclassify it as a confirmed application outage, and it does not clear it. The observed failure is a non-success HTTP response from the MCP edge after a correctly formed Streamable HTTP POST.

## 13. What the SDK already exposes

`StreamableHTTPError` keeps `code` (the HTTP status) and `message`. The message is `Streamable HTTP error: Error POSTing to endpoint: ` plus the response body. The previous script printed `message` and dropped `code`.

The class does not keep status text, response headers, or a separate body. A fetch wrapper is required for those. `StreamableHTTPClientTransport` accepts that wrapper as `fetch`.

The thrown prefix `Error POSTing to endpoint` is the POST path, after `response.ok` is false. A JSON-RPC error would be a successful HTTP response whose body contains `jsonrpc` and `error`. The previous body was plain text, `upstream request timeout`, so the failure seen so far is an HTTP response, not a JSON-RPC error. The status number is still missing.

## 14. Diagnostic script

`scripts/mcp-initialize-diagnostic.ts` is prepared and has not been run.

Unchanged from the audited setup:

- Endpoint `https://tos-mcp.app.fortyguard.com/mcp`
- `@modelcontextprotocol/sdk` 1.32.2
- `StreamableHTTPClientTransport`
- `Authorization: Bearer` from `FORTYGUARD_API_KEY`, added once

The wrapper records, for each HTTP exchange during `client.connect`:

- method and URL origin plus path
- duration
- status and status text
- whether the request carried one Bearer credential, without the credential
- request `content-type` and `accept`
- response headers, with authorization, cookies, and `mcp-session-id` replaced by `[redacted]`
- the first 1024 characters of the body, with the key removed
- a classification: `http_error`, `jsonrpc_error`, `jsonrpc_result`, `http_success`, or `unknown`

It also records the SDK error name, redacted message, and numeric `code` when the SDK sets one. The client timer is 35 seconds, above the 30 second startup window in FortyGuard's Codex example. The previous response arrived in about 17 seconds, before the old 20 second timer, so the longer timer is not expected to change the HTTP result. It only leaves room to record a slower gateway response.

`client.connect` sends the SDK handshake: the `initialize` request and, if that succeeds, the `notifications/initialized` notification. It may also open the optional GET stream. The script does not call `tools/list` or any tool. `scripts/mcp-discover-once.ts` is left unchanged apart from a comment, so it is not the script to run next.

The script writes `evidence/mcp/configuration/2026-11-18-initialize-diagnostic.json` only after the gate below is open. That file does not exist yet.

## 15. Remaining uncertainties

- The HTTP status of the previous response.
- Whether the body is still `upstream request timeout`, or a JSON-RPC error, on the next response.
- Which handshake request fails, if connect makes more than one.
- The troubleshooting page content. It was not readable, so no troubleshooting step from that page is claimed.
- Whether a 35 second ceiling is long enough if the gateway waits longer than last time.

## 16. Approval gate

The gate was opened once, on 2026-11-17 at 21:39 UTC. The script was not run again. MCP-001 is not reclassified.

## 17. Approved run

Evidence: `evidence/mcp/configuration/2026-11-18-initialize-diagnostic.json`. No tool was called. Total time was 11,956 ms. Outcome: `failed`. Server version on the client object: null, because the SDK rejected the handshake before storing it.

Two POSTs went to `https://tos-mcp.app.fortyguard.com/mcp`. Both carried one Bearer credential. Neither redirected. No `mcp-session-id` header was present.

| | First POST | Second POST |
| --- | --- | --- |
| HTTP status | 200 | 503 |
| Status text | empty | empty |
| Duration | 11,536 ms | 339 ms |
| Content type | `text/event-stream` | `application/json` |
| Server | `envoy` | `envoy` |
| Upstream time | 10,364 ms | 41 ms |
| Other headers | `cache-control: no-cache, no-transform`, `x-accel-buffering: no` | `cache-control: no-store`, `retry-after: 5` |

The first body was an SSE message with a JSON-RPC result:

- `protocolVersion`: `2025-11-25`
- `serverInfo`: FortyGuard `4.0.11`
- capabilities included `tools.listChanged: true`

The second body was:

```json
{"error":"temporarily_unavailable","retriable":true,"message":"Authentication service is temporarily unavailable."}
```

That is an HTTP 503 body. It is not a JSON-RPC envelope: there is no `jsonrpc` field. The script labeled it `jsonrpc_error` because the classifier treats any JSON object with an `error` field as JSON-RPC. That label is wrong. The SDK error is `StreamableHTTPError` with `code` 503 and that same body in the message.

The first response `Date` is `Tue, 17 Nov 2026 21:36:19 GMT`. The second is `Tue, 17 Nov 2026 21:39:20 GMT`. The client measured 11.5 seconds for the first POST. Why those Date values differ by about three minutes is UNKNOWN.
