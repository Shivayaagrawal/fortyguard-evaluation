# Final evaluation package

18 November 2026. This is the current record. The Google Form has not been submitted. The clarification email has not been sent. No rating was entered.

A free recheck at 13:13 UTC repeated the four status reads and `credit_balance`. The results matched this package: 401, 401, 404, completed job, 11 tools, balance 997,100, `cost_credits` 0. Evidence: `evidence/qa-audit/`. That recheck does not make the five paid routes or the dashboard end-to-end tested. Audit: `docs/28-final-end-to-end-qa-report.md`.

## 1. Executive summary

The Dashboard evaluation is closed. Some of its workflows were blocked by availability and are not defects. The REST API, its documentation, MCP, and the MCP documentation are complete at the assigned review scope. That scope includes every documented route and tool contract, the free live checks, and one earlier environmental-parameters job. It does not include live execution of five paid processing routes.

The second pass spent 0 credits. The balance remained 997,100. Six checks succeeded and none failed. The earlier provisional scores of 6 are withdrawn. All four form ratings are `NO DEFENSIBLE SCORE` because the form has no blank or not-applicable choice, and a number would be read as live coverage the evaluation does not have. That rating decision is waiting on the hiring team. The technical review is not unfinished.

## 2. Scope and method

Documentation was read from the rendered articles. Free status reads and one MCP handshake were repeated after the earlier outages. Paid POSTs were not sent. Local contract tests are fixtures and are not live API tests. Original evidence was not overwritten. New files are under `evidence/phase11/`.

| Check | Result |
| --- | --- |
| Documentation articles read | 9 |
| REST routes reviewed | 7 |
| REST routes tested live in the second pass | 1, through four status requests |
| MCP tools discovered | 11 |
| MCP tools tested live | 1, `credit_balance` |
| Successful checks | 6 |
| Failed checks | 0 |
| Paid routes not executed | 5 |
| Paid tests awaiting approval | 5 |
| Credits spent in the second pass | 0 |

The six successes are a missing-key 401, an invalid-key 401, an unknown-activity 404, a reread of the completed environmental job, an MCP handshake that listed 11 tools, and a `credit_balance` read.

## 3. Dashboard

Status: `CLOSED — PARTIALLY BLOCKED`. It was not reopened.

Observed: the login URL showed `upstream request timeout`. A signed-in session showed Demo Heatmap – Alabama, one coordinate popup at `32.608763, -86.680695` without a temperature, and Feature Updates versions v1.1.1 through v1.0.4. The map URL later showed `misdirected request to "dashboard.fortyguard.com"`.

Not tested, and not defects: Settings, Feedbacks, zoom, the basemap switch, a second location, and the release-note text. Evidence: `docs/16-dashboard-final-completion.md`.

## 4. REST API

Seven routes were reviewed. Only `GET /v1/status/{activity_id}` was called in the second pass. The four requests were missing key, invalid key, unknown id, and the existing job `98a664cb-d9bb-484c-82a1-3d23ed9c7365`. That job still reads `Completed`, keeps `33.4484, -112.074`, and uses `2025-09-20T14:00:00-07:00` in `America/Phoenix`. The body has no credit field.

`POST /v1/env_params` was executed once, earlier. The balance moved from 1,000,000 to 997,100. That 2,900 difference matches the documented Premium price. It is an observed balance difference, not an invoice or a charge printed by the server. The POST was not repeated.

Not executed: heatmap, routing, heat intelligence, street view, and satellite. Evidence: `docs/22-rest-api-second-pass.md` and `evidence/phase11/rest-api/`.

## 5. API documentation

Nine articles rendered: introduction, quickstart, authentication, create heatmap, environmental parameters, heat intelligence, routing, MCP overview, and MCP tools. The street-view and satellite REST slugs returned an application shell and no extracted article. Their MCP descriptions were read.

The introduction names Temperature Property Reports. No matching route is in the seven-route inventory. Evidence: `docs/21-documentation-second-pass.md`.

## 6. MCP

The endpoint is `https://tos-mcp.app.fortyguard.com/mcp`. The second-pass handshake connected as FortyGuard 4.0.11, listed 11 tools, and `credit_balance` returned 997,100 at `cost_credits` 0. No processing tool was called.

An earlier handshake returned HTTP 200 and then HTTP 503. That file was kept. The later success does not delete it. Evidence: `docs/23-mcp-second-pass.md` and `evidence/phase11/mcp/2026-11-18T12-50-28-293Z-discovery-and-balance.json`.

## 7. MCP documentation

The published page lists nine tools. The server lists those nine plus `credit_balance` and `monitoring`. The page says the report temperature is Celsius. The live schema says Fahrenheit. The page documents `heatmap_read` as `heatmap_id` with the example `hm_123`. The live schema also accepts `activity_id`.

## 8. Cross-product inconsistencies

| Issue | What was seen | Developer impact | Correction |
| --- | --- | --- | --- |
| Temperature unit | Live `report` schema says Fahrenheit. The MCP page says Celsius. The REST Heat Intelligence page says both, and the example is `82.4`. | A report can be requested at the wrong physical temperature. The documented Premium price is 8,600. | Use one unit in the field name, the REST page, the MCP schema, and the example. |
| GeoJSON examples | Quickstart and authentication use a FeatureCollection. The heatmap page uses a bare Polygon. The live schema accepts Polygon, Feature, or FeatureCollection. | The first copied example can disagree with the other page. | Generate both examples from the schema, and say all three shapes are accepted. |
| Identifiers | REST uses `activity_id`. `report_read` requires `analytics_id` and only mentions `activity_id` in prose. `heatmap_read` accepts either id. | A caller holding the REST id cannot fill the report-read schema. | Define `activity_id` on every read tool. Keep the older names as real alias fields. |
| Catalogue | Nine published tools. Eleven live tools. | `credit_balance` and `monitoring`, including paid delete operations, are invisible in the published list. | Publish all eleven, and mark the two free monitoring operations. |
| Environmental workflow | REST quickstart says every POST returns an activity id. The MCP page calls `env_params` direct. One REST job was asynchronous. The MCP tool was not called. | A client can poll the wrong surface, or skip a poll the server requires. | Say, on both pages, whether the call returns measurements or an activity id. |
| Missing path | The introduction names Temperature Property Reports. | A reader looks for a route that is not in the inventory. | Add the route, or remove the name. |

## 9. Coverage matrix

| Surface | Documentation reviewed | Contract reviewed | Tested live | Not executed |
| --- | --- | --- | --- | --- |
| Dashboard | Not a docs product | Observed screens only | Login, demo, one popup, version labels, two gateway strings | Settings, Feedbacks, zoom, basemap, second location, release notes |
| REST status | Yes | Yes | Four requests on one route | None for this route |
| REST env_params | Yes | Yes | One earlier job, then a status reread | A second job |
| REST heatmap, routing, heat intelligence, street view, satellite | Heatmap, routing, and heat intelligence articles. Imagery articles were not extracted. | Yes, including MCP descriptions for imagery | No | All five |
| MCP `credit_balance` | Not in the published nine | Yes | Yes, cost 0 | None |
| Other MCP tools | Yes, on the nine-tool page except the two extras | Yes, from the live schemas | No | Ten tools |

## 10. Credits and execution limits

| Operation | Documented Premium credits | Executed |
| --- | --- | --- |
| Heatmap | 4,220 | No |
| Routing | 3,500 | No |
| Heat Intelligence | 8,600 | No |
| Street View | 8,600 | No |
| Satellite | 14,400 | No |
| Total if all five were sent once | 39,320 | Not sent |

Running the same five through MCP as well could add another 39,320 if the two interfaces bill separately. This evaluation has no evidence that they share a charge or that they bill twice. Do not assume either.

The second pass cost 0. The earlier environmental job is the only processing charge inferred, from 1,000,000 to 997,100.

## 11. Recommendations

**P0.** Put one report temperature unit in the field name, the REST page, the MCP schema, and the example. Put `activity_id` on every read schema.

**P1.** Publish the live eleven-tool list. Generate the heatmap examples from one schema. Say whether `env_params` returns measurements or an activity id. Add or remove Temperature Property Reports.

**P2.** Put the credits charged on the completed REST body. Keep the distinct 401 messages. Point the quickstart status sample at the same words as the status table.

**P3.** Replace `upstream request timeout` and `misdirected request` with an outage page. Say what a demo click shows, and show the unit when a temperature is shown. Show the release-note text that the version list already counts. No recommendation is made for Settings, Feedbacks, zoom, or the basemap switch.

## 12. Rating assessment

| Field | Decision | Why a number is not defensible |
| --- | --- | --- |
| Dashboard usability | `NO DEFENSIBLE SCORE` | Availability failed, and the main controls were not used. A low number would score the outage. A high number would score screens that were not opened. |
| REST API | `NO DEFENSIBLE SCORE` | One workflow and the error reads are confirmed. Five processing routes were not executed. |
| MCP | `NO DEFENSIBLE SCORE` | Connection, discovery, and one free read are confirmed. Ten tools were not executed. |
| Overall | `NO DEFENSIBLE SCORE` | An average would hide the blocked dashboard and the unexecuted paid operations. |

Detail: `docs/13-final-rating-assessment.md`. The unsent question is `docs/15-hiring-contact-clarification-email.md`.

## 13. Submission readiness

- Dashboard evaluation is closed and partially blocked.
- REST API evaluation is complete at the assigned review scope.
- API documentation review is complete.
- MCP evaluation is complete at the assigned review scope.
- MCP documentation review is complete.
- Cross-product review is complete.
- Five paid processing routes remain unexecuted because approval was not provided.
- No credits were spent during the second pass.
- No hiring-team email was sent.
- No Google Form was submitted.
- Numerical ratings remain unresolved pending hiring-team clarification.

The written package is ready for hiring-team review of the assigned scope. It is not a claim that every feature, endpoint, tool, and dashboard workflow ran successfully. The form is not ready to send until the applicant enters name, email, position, and time spent, and until the four rating fields are either left blank with the team's agreement or filled from an instruction the team gives. Copy steps: `docs/19-manual-submission-guide.md`. Readiness matrix: `docs/29-final-product-readiness-matrix.md`.
