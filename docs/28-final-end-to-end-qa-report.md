# End-to-end QA report

18 November 2026, free recheck at 13:13 UTC. This audit does not call the evaluation fully end-to-end. A service that answered a free read is not the same as a workflow that ran to a completed product result.

No dashboard retest. No POST. No paid MCP tool. No credit spend. The balance stayed 997,100. `cost_credits` was 0. The form was not submitted and the email was not sent.

## Method

Local checks were the unit suite, TypeScript, the integration script, and the package scripts. Live checks were four `GET /v1/status/{activity_id}` requests and one MCP `credit_balance` call after `tools/list`. Public pages re-read this audit: `/docs/create-heatmap`, `/docs/heat-intelligence`, and `/docs/mcp-tools`. The quickstart FeatureCollection example was not fetched again. It remains the same-day render in `docs/21-documentation-second-pass.md`.

`FORTYGUARD_ALLOW_PAID` is `false`. The account key was present and was not printed. `FORTYGUARD_PLAN` is still `unknown` in `.env`. The live balance response says `premium`.

## Runtime

| Check | Result | Evidence | Limitation |
| --- | --- | --- | --- |
| Node | PASS | v26.0.0. `engines` asks for Node 20 or newer. | Local harness only. |
| Lockfile and install | PASS | `package-lock.json` and `node_modules` are present. | No clean reinstall was run. |
| Unit tests | PASS | 24 passed: 14 contract, 6 classifier, 2 redaction, 2 catalog. | Fixtures. They do not call FortyGuard. |
| Typecheck | PASS | `tsc --noEmit` exited 0. | `noEmit` is the check. There is no build output. |
| Lint | NOT TESTED | No lint script and no project ESLint config. | Absence is a harness gap, not a product defect. |
| Build | NOT TESTED | No build script. | The package is an evaluation harness, not a server. |
| Application startup | NOT TESTED | No start script and no local FortyGuard server. | A local pass would not make the remote API healthy. |
| Integration script | FAIL | `npm run test:integration` exits 1: no files under `tests/integration`. | The script name promises a suite that does not exist. |
| Browser suite | NOT TESTED | `playwright.config.ts` points at `tests/dashboard`, which has no tests. | It was not run. Running it would open the dashboard. |
| Secret redaction | PASS | QA console reported `balanceHasKey` false. Evidence files record `account-key` or `absent`, not the key. | One local test file covers the redactor. |

## REST

| Check | Result | Evidence | Limitation |
| --- | --- | --- | --- |
| Missing API key | PASS | HTTP 401. `evidence/qa-audit/rest-api/2026-11-18T13-13-17-048Z-status-missing-key.json`. | One route. |
| Invalid API key | PASS | HTTP 401. `...13-13-18-168Z-status-invalid-key.json`. | The invalid value was `invalid-evaluation-key`. |
| Unknown activity | PASS | HTTP 404. `...13-13-18-560Z-status-unknown-id.json`. | Id was `does-not-exist`. |
| Existing env_params job | PASS | HTTP 200, `Completed`, lat `33.4484`, lon `-112.074`, elevation 333, temperature 35, `America/Phoenix`, `2025-09-20T14:00:00-07:00`. No credit field. | This is a reread, not a new job. |
| `POST /v1/env_params` chain | PARTIAL | Earlier submit plus this reread. `evidence/api/responses/2026-11-18-env-params.json`. | One input mode. Not repeated. |
| Heatmap, routing, heat intelligence, street view, satellite | NOT TESTED | Contracts in `docs/22-rest-api-second-pass.md` and the current pages. | Paid. Approval was not given. |
| Local request fixtures | PASS | Contract tests accept the Polygon and FeatureCollection fixtures and the `82.4` example. | The server did not receive them. |
| Street View and satellite REST articles | PARTIAL | MCP text was read. The REST slugs returned shells in the second pass and were not extracted. | A developer cannot follow a REST article that this review did not extract. |

## MCP

| Check | Result | Evidence | Limitation |
| --- | --- | --- | --- |
| Connection and discovery | PASS | FortyGuard 4.0.11. Eleven tools. Elapsed 6,454 ms. `evidence/qa-audit/mcp/2026-11-18T13-13-20-004Z-discovery-and-balance.json`. | One handshake. The earlier HTTP 503 file was not overwritten. |
| `credit_balance` | PASS | `isError` false. `available_credits` 997100. `plan_type` premium. `cost_credits` 0. | The only executed tool. |
| Other 10 tools | NOT TESTED | Names and required fields are in the QA digest. | Discovery is not execution. |
| `monitoring` list operations | NOT TESTED | Described as free. Not called. | The same tool also deletes and creates paid monitors. |
| Read tools `heatmap_read`, `report_read`, `temperature_routing_read` | NOT TESTED | Schemas reviewed. Cost is not stated as zero on `report_read` or `temperature_routing_read`. | An uncertain read was not used to improve coverage. |
| Historical HTTP 503 | FAIL as a historical event | `evidence/mcp/configuration/2026-11-18-initialize-diagnostic.json`. | Not reproduced at 13:13 UTC. Cause unverified. |

Live required fields from this handshake:

| Tool | Required | Executed |
| --- | --- | --- |
| `credit_balance` | none | Yes |
| `env_params` | latitude, longitude, temperature, date_time | No |
| `heatmap` | polygon_aoi, date_time | No |
| `heatmap_read` | none; `activity_id` and `heatmap_id` are optional | No |
| `monitoring` | operation | No |
| `report` | latitude, longitude, temperature, date, analysis | No |
| `report_read` | analytics_id | No |
| `satellite` | date_time | No |
| `streetview` | latitude, longitude, vertical_angle, horizontal_angle, back_view | No |
| `temperature_routing` | origin, destination, departure_time | No |
| `temperature_routing_read` | activity_id | No |

`report_read` properties are `heatmap_id` and `analytics_id`. `activity_id` is not a property, and extra properties are rejected. The published page still says the identifier is also accepted as `activity_id`. A developer who sends the REST id under that name will not match this schema.

The `report` description still contains Fahrenheit. The published MCP page still says Celsius. The REST heat-intelligence page still says Fahrenheit on the temperature field, Celsius on the date sentence, and sends `82.4`.

The word "free" inside the heatmap and report price lines is the plan name in `free/basic/startup` or `free`, not a zero-cost claim. Those tools were not called.

## Workflow chains

| Workflow | Stages with evidence | Stages executed | Complete chain | Blocker |
| --- | --- | --- | --- | --- |
| REST env_params → activity id → status → result | All four | All four, on one earlier job, reread today | Yes, for that job | A second job was not approved. Other input modes were not sent. |
| REST heatmap, routing, heat intelligence, street view, satellite | Contract and, where extracted, the article | None | No | Unapproved credits. Documented Premium total 39,320 for one pass of the five. |
| MCP connect → discover → `credit_balance` | All three | All three | Yes, for that read | None for this chain. |
| MCP connect → discover → any other tool → result | Connect and discover | The tool call was not made | No | Paid or uncertain cost. |
| Dashboard login → map → location → temperature | Timeout, one loaded map, one popup, one earlier tile with `60.59°F`, then the misdirected-request page | Those observations only | No | Availability. Not retested. |

## Examples a developer can follow

| Example | Can it be followed from the current text |
| --- | --- |
| Env_params at 33.4484, -112.074, 35 °C | Yes. One live job completed with those values. The page and the MCP description both say Celsius. |
| Status polling with `activity_id` | Yes. The known id still returns `Completed`. |
| Heatmap Polygon on the heatmap page | The example is internally a closed ring. The quickstart example is a FeatureCollection. Both shapes are accepted by the local fixture and by the live MCP schema. The server was not sent either shape in this audit. |
| Heat Intelligence `82.4` | The example can be copied. The page does not say whether 82.4 is Fahrenheit or Celsius. The live MCP schema says Fahrenheit. Following both texts does not produce one request. |
| MCP `heatmap_read` example `hm_123` | The published input is `heatmap_id`. The live schema also has `activity_id`, and neither is required. Not executed. |
| MCP `report_read` alias | The page says `activity_id` is accepted. The live schema does not define it. Following the page against the schema fails before a call. |
| Street View horizontal pan 0–360 | That is the published sentence. The same-day full schema described different angle meanings. This audit did not re-save the property descriptions, so the angle sentences were not rechecked word for word. The property names are still present. Not executed. |

## Counts

Passed live or local checks in this audit: four status results, MCP discovery, `credit_balance`, 24 unit tests, typecheck.

Failed: the integration script, because it has no tests. The historical MCP 503 remains a failed handshake and was not repeated.

Blocked: dashboard workflows that were already closed.

Not tested: five paid REST routes, ten MCP tools, lint, build, application startup, and the browser suite.

A local green suite does not say the remote product is healthy.
