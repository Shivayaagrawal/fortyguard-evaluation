# Fresh MCP evaluation

18 November 2026. Black-box test of `https://tos-mcp.app.fortyguard.com/mcp`. The server source was not inspected.

Client paths recorded separately:

1. **SDK path** — `@modelcontextprotocol/sdk` 1.32.2 discovery plus one safe `credit_balance` call.
2. **Cursor path** — env-correct relaunch, Phase C `credit_balance`, Phase D discovery, then free functional/error probes.

No paid heatmap, route, report, imagery, or destructive monitor operation was called. The Google Form was not submitted.

Evidence:

- SDK discovery: `evidence/mcp-fresh/2026-11-18-discovery.json`
- Docs capture: `evidence/mcp-fresh/documentation/`
- Cursor Phase C: `evidence/mcp-fresh/cursor-integration/2026-11-18-phase-c-credit-balance.json`
- Cursor Phase D: `evidence/mcp-fresh/cursor-integration/2026-11-18-phase-d-tool-discovery.json`
- Complete Cursor evaluation: `evidence/mcp-fresh/complete-evaluation/`

## 1. Connection and authentication

### SDK (historical)

| Check | Result |
| --- | --- |
| Server | FortyGuard 4.0.11 |
| Protocol | `2025-11-25` |
| Initialize POST | HTTP 200 in 1,691 ms |
| Following POST | HTTP 202 in 2,685 ms |
| Following GET | HTTP 405 in 853 ms |
| `tools/list` POST | HTTP 200 in 1,103 ms |
| `credit_balance` POST | HTTP 200 in 1,812 ms |
| Discovery, including the balance call | 5,843 ms |

An earlier same-day handshake had returned HTTP 503 after initialize. That failure was not reproduced in the successful SDK session or later Cursor session.

### Cursor setup and Phase C

Initial Cursor attempt failed with HTTP 401 `invalid_token` because `FORTYGUARD_API_KEY` was not in the Cursor process environment. After quitting and relaunching from a shell that sourced `.env` and exported the key, `user-fortyguard` connected.

Phase C `credit_balance` through Cursor MCP:

- Succeeded (`ok`, `decision: allow`)
- Plan: `premium`
- Available credits: `994200`
- Cost: `0`
- Trace: `f0854581c856`
- Latency: 1095 ms

`mcp.json` was not modified.

## 2. Documented tools versus live tools (Phase D)

| Client discovery | FortyGuard tools | Notes |
| --- | --- | --- |
| Published docs | 9 | Omits `credit_balance` and `monitoring` |
| SDK `tools/list` | 11 | Includes the two undocumented tools |
| Cursor Phase D listing | 12 namespace / 11 FortyGuard | Same 11; Cursor also surfaces `mcp_auth` |

**Historical 9-versus-11 discrepancy still holds.**

Confirmed schema/doc mismatches remain: report °C vs °F; analysis 1–5 vs Premium ≤2 vs `maxItems` 5; Street View angle semantics; missing `wait_for_completion`; monitoring undocumented; credit prices only in live text; `heatmap_read` dual IDs.

## 3. Safe / free functional tests (Cursor)

| Tool | Purpose | Status | Cost | Trace |
| --- | --- | --- | --- | --- |
| `credit_balance` | Free baseline (Phase C) | success | 0 | `f0854581c856` |
| `monitoring` / `list_monitors` | Free list | success (empty list) | 0 | `f60562e03d46` |
| `monitoring` / `list_alerts` | Free list claim | `invalid_input` | uncharged | `f31125965e3c` |
| `monitoring` / `list_alerts` + limit | Retry | `invalid_input` | uncharged | `26fea41f029c` |
| `heatmap_read` invalid id | Error handling | `ACTIVITY_UNAVAILABLE` | n/a | `32dba26040eb` |
| `report_read` invalid `analytics_id` | Error handling | `ACTIVITY_UNAVAILABLE` | n/a | `1122fa0dba22` |
| `report_read` with `activity_id` only | Alias probe | `ACTIVITY_UNAVAILABLE` (accepted) | n/a | `f45557797baa` |
| `temperature_routing_read` invalid id | Error handling | `ACTIVITY_UNAVAILABLE` | n/a | `6509fec48549` |
| `heatmap_read` empty | Validation | `INVALID_ACTIVITY_ID` | n/a | `375cc5dcc562` |
| `monitoring` empty | Validation | `invalid_input` field=operation | n/a | `621f5af382a4` |

Credits spent in this Cursor functional pass: **0**.

Runtime update: `report_read` accepts `activity_id` at runtime despite the schema omitting that property and setting `additionalProperties: false`.

## 4. Paid approval gate (not executed)

Primary candidate:

- Tool: `env_params`
- Purpose: resolve DIRECT vs activity-id behaviour
- Expected cost: 2,900 premium credits
- Balance (Phase C): 994,200
- Status: awaiting explicit approval

Not executed without approval: `heatmap`, `report`, `satellite`, `streetview`, `temperature_routing`, and paid/destructive monitoring operations (`create_monitor`, `update_monitor`, `delete_monitor`, `delete_heatmap_data`, `trigger_forecast`, etc.).

## 5. Usability assessment

- Connecting Cursor works after exporting the API key in the launch shell; project `.env` alone is insufficient for remote HTTP MCP.
- Tool naming and free-tool traces are clear; credit costs in live descriptions help agents.
- Documentation lag and the free/destructive mix inside `monitoring` hurt agent safety.
- Invalid-ID denials are understandable; `list_alerts` free claim is currently broken/incomplete.

## 6. Rating

**Cursor MCP rating: 7 / 10**

Setup friction, documentation mismatches, and the broken `list_alerts` free path keep it below 8–9. Verified Cursor auth recovery, discovery, free execution, and clear read-tool errors support a solid 7 without claiming paid analysis success.

## 7. Recommendations

1. Publish the live 11-tool list and mark free vs paid monitoring operations. Priority: High.
2. One report temperature unit; reconcile Premium analysis limit with schema. Priority: High.
3. Put `activity_id` on the `report_read` schema; fix/document `list_alerts` inputs; align Street View angle docs; remove or implement `wait_for_completion`. Priority: High.
4. Document that Cursor must be launched with `FORTYGUARD_API_KEY` exported. Priority: Medium.

## 8. Form readiness

Draft MCP answers: `evidence/mcp-fresh/complete-evaluation/mcp-google-form-final-answers.md` and `docs/51-mcp-google-form-answers.md`.

Google Form: **not submitted**. Paid analysis remains optional for stronger coverage.
