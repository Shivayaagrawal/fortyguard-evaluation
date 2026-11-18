# MCP documentation deep review

18 November 2026. These pages rendered as articles. No paid tool was called. The examples were compared with the live tool list from `evidence/qa-audit/mcp/2026-11-18T13-13-20-004Z-discovery-and-balance.json` and the same-day full schemas in `evidence/phase11/mcp/2026-11-18T12-50-28-293Z-discovery-and-balance.json`.

## Pages

| Page | What it specifies |
| --- | --- |
| `/docs/mcp-overview` | Remote MCP in front of FortyGuard capabilities. Async pairs are heatmap, report, and temperature routing. Validated clients: Codex, Cursor, Claude. |
| `/docs/mcp-quickstart` | Streamable HTTP. Endpoint `https://tos-mcp.app.fortyguard.com/mcp`. `Authorization: Bearer`. Environment variable `FORTYGUARD_API_KEY`. Catalog of nine tools. First request is Phoenix at 35 °C through `env_params`. |
| `/docs/mcp-authentication` | Bearer, not the REST `api-key` header. Failures include missing, invalid, expired, revoked, and unauthorized keys. No status code or body is shown. |
| `/docs/mcp-client-setup` | Codex `~/.codex/config.toml` with 30-second startup and 120-second tool timeout. Cursor `~/.cursor/mcp.json` with `Bearer ${env:FORTYGUARD_API_KEY}`. Claude `claude mcp add --transport http`. Same Phoenix example. |
| `/docs/mcp-tools` | Nine tools, inputs, and the direct versus async split. Numeric prices are not in a table. |
| `/docs/mcp-troubleshooting` | Categories: authentication, invalid input, processing, failed, access, and unavailable data. No HTTP 503. No `mcp-session-id`. |

No page states an SDK version. The evaluation client used `@modelcontextprotocol/sdk` 1.32.2. That version is a client choice, not a documented server requirement.

## Documented inventory

| Tool | Docs behavior | Documented inputs | Documented credits |
| --- | --- | --- | --- |
| `env_params` | Direct result. | Latitude, longitude, Celsius temperature, `date_time`, optional `analysis`. | "May consume usage." The live description says 2,110 or 2,900. The page does not. |
| `heatmap` | Async. Optional wait. | Polygon, `date_time`, granularity 60, 80, or 100. | "May consume usage." Live text says 3,500 or 4,220. |
| `heatmap_read` | Read. Does not create a heatmap. | `heatmap_id`. Example `hm_123`. | Not priced. |
| `report` | Async. | Latitude, longitude, Celsius temperature, date, one to five analyses. | "May consume usage." Live text says 6,300 free or 8,600 Premium, and at most two analyses on Premium. |
| `report_read` | Read. | `analytics_id`. Page says `activity_id` is accepted. | Not priced. Fresh read replaces an expired link. |
| `satellite` | Direct. | `sat` point or tiles, required `date_time`. | Not priced on the page. Live text says 14,400 Premium. |
| `streetview` | Direct. | Latitude, longitude, vertical viewing angle, horizontal pan 0–360, `back_view`. | Not priced on the page. Live text says 8,600. |
| `temperature_routing` | Async. | Origin, destination, ISO-8601 departure. | Not priced on the page. Live text says 3,500. |
| `temperature_routing_read` | Read. | The activity identifier. The field name is not given. | Not priced. |

`credit_balance` and `monitoring` are absent from all six pages.

## Example check

The connection example matches the endpoint and Bearer header that the evaluation client used successfully. Cursor's `${env:FORTYGUARD_API_KEY}` form is the documented interpolation. This phase did not edit `~/.cursor/mcp.json`. The evaluation calls used the SDK directly.

The Phoenix `env_params` example matches the one REST job that completed. The MCP tool itself was not called, so the page's "direct result" sentence is not runtime-proven.

The nine-tool verification step is wrong for the current server. The live list has eleven names.

## Findings

| ID | Tool or page | Evidence | Expected | Actual | Impact | Severity | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| DOC-004 | Catalogue | Quickstart, tools page, QA discovery. | The page lists the tools a client will see. | Nine published. Eleven live. | `credit_balance` and `monitoring`, including delete and paid operations, are invisible in the setup docs. | High | Confirmed. |
| DOC-002 | `report` | Tools page says Celsius. Live description flag is Fahrenheit. REST page says both. | One unit. | Three texts. | The agent can send a Celsius number into a Fahrenheit field. | High | Confirmed in docs and the live description. The tool was not called. |
| API-001 | `report_read` | Tools page. QA digest properties `heatmap_id`, `analytics_id`, extra properties false. | The alias in the prose is a schema field. | `activity_id` is not a property. | A caller holding the REST id cannot fill the schema by following the sentence. | High | Strong evidence from the schema. The rejection was not executed. |
| DOC-010 | Troubleshooting | Troubleshooting page. `evidence/mcp/configuration/2026-11-18-initialize-diagnostic.json`. | A 503 from the authentication service is described. | The page has no 503 and no session-id guidance. | The observed failure looks like a bad key unless the caller reads the body. | Medium | Confirmed gap. The 503 was historical and was not reproduced in the QA handshake. |
| DOC-011 | Prices | Six MCP pages versus live tool descriptions and REST pages. | The setup docs show the price the tool text shows. | MCP pages say "may consume usage." Live descriptions and REST pages show numbers, and those numbers are not one table. | An agent that trusts only the MCP page cannot quote the cost the tool will announce. | Medium | Confirmed. |
| DOC-017 | `report` analysis count | Tools page says one to five. Live description says at most two on Premium. | One maximum. | The texts disagree. | A Premium request can be built with three analyses and then be rejected or billed unexpectedly. | High | Strong evidence. Not executed. |
