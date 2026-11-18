# Final feedback form draft

18 November 2026. **NOT SUBMITTED.**

Phase 8 closed the dashboard as blocked. The map tab still showed `misdirected request to "dashboard.fortyguard.com"` and was not reloaded. Settings, Feedbacks, zoom, the basemap switch, release-note text, and a second location remain `NOT TESTED — BLOCKED BY AVAILABILITY`. No new API call was made. Detail: `docs/16-dashboard-final-completion.md` and `docs/17-rest-api-functional-evaluation.md`.

The assigned reviews are complete. The second pass read nine documentation articles, rechecked the status route, and listed 11 MCP tools. It spent 0 credits. The balance stayed 997,100. Five paid processing routes were reviewed and not executed. All four ratings remain `NO DEFENSIBLE SCORE`. Do not paste a number. Name, email, position, and time spent stay blank. The form has not been submitted. Current package: `docs/26-final-evaluation-package.md`.

This text was checked against the saved environmental-parameters response, the two credit-balance files, the 401 and 404 captures, the original MCP 503 diagnostic, the recovered handshake, and the saved `tools/list`. Local contract tests are not live API tests.

The question list below is the 19-question list in the phase 7 brief. Earlier drafts used 15 or 16 questions. Match the live form by wording before pasting.

## A. Temperature Dashboard

Use `docs/47-dashboard-google-form-answer.md` for the six dashboard questions. That file is the 18 November signed-in Safari session. The paragraphs under this heading are the earlier session and are not the answers to paste.

The login URL returned a page whose only text was `upstream request timeout`. An existing Safari session later opened Demo Heatmap – Alabama. The outline was visible. One popup showed coordinates `32.608763, -86.680695` and the labels Satellite View and Street View, with no temperature. An earlier tile at a different coordinate showed `60.59°F`. Feature Updates opened and listed v1.1.1, v1.1.0, v1.0.7, and v1.0.4, with counts of 4, 2, and 4. The note text was not read.

The map URL then returned `misdirected request to "dashboard.fortyguard.com"`. One reload produced the same 49-character page. Settings, Feedbacks, zoom, the basemap switch, and a second location were not tested. Those controls are not described as broken.

Three recommendations from what was actually seen:

1. Replace the gateway line with an outage page that names the dashboard and links to status.
2. Label what a demo click shows, including the unit when a temperature is shown.
3. Show the release-note sentences. The version labels and counts were visible. The notes were not.

## B. Temperature REST API

The fresh 18 November API pass is `docs/49-rest-api-google-form-answers.md`. Use that file for the API rating, design issues, and documentation improvements. One later New York `env_params` job completed. The paragraphs below are the earlier draft.

Live evidence, activity `98a664cb-d9bb-484c-82a1-3d23ed9c7365`:

- Submit returned HTTP 200 and that activity id.
- The status read returned HTTP 200. `data.status` and the message were `Completed`.
- Coordinates remained `33.4484, -112.074`.
- The timestamp was `2025-09-20T14:00:00-07:00`, timezone `America/Phoenix`, offset `-7`.
- Field names identify Celsius, percent, millimetres, octas, and W/m².
- The Premium balance moved from 1,000,000 to 997,100. The difference is 2,900, which matches the documented Premium price. The job body does not contain a credit cost.
- A missing `api-key` header returned HTTP 401: "Missing required 'api-key' header."
- An invalid key returned HTTP 401: "Invalid or unknown API key."
- An unknown activity returned HTTP 404: "No activity found for the provided activity_id."
- Those errors share `error`, `status_code`, and `details.message`.

The 24 local tests reject malformed fixtures in this repository. They were not sent to the server.

Documentation conflicts, not runtime measurements: the Heat Intelligence page describes the report temperature as both Fahrenheit and Celsius, heatmap examples use more than one GeoJSON shape, and activity identifiers are not one name across REST and MCP.

## C. Temperature MCP

The fresh 18 November MCP session is `docs/51-mcp-google-form-answers.md`. Use that file for the MCP questions. The balance in that session is 994,200. The paragraphs below are the earlier draft, which still says 997,100.

MCP was not entirely unavailable. One handshake returned HTTP 200 for FortyGuard 4.0.11 and then HTTP 503, `temporarily_unavailable`, "Authentication service is temporarily unavailable." A later handshake returned HTTP 200 and then HTTP 202 and completed. `tools/list` returned 11 tools. The published catalogue names nine. The extra live tools are `credit_balance` and `monitoring`.

`credit_balance` is the only MCP tool that was executed. Every recorded read reported `cost_credits` 0, including the QA recheck at 13:13 UTC. The balance stayed 997,100. No paid processing tool was called. Untested tools are not described as working.

`monitoring` exposes 14 operations. The tool text says `list_monitors` and `list_alerts` are free and the other operations cost 3,500 credits on Premium. That price was not spent.

The live `report` schema says Fahrenheit. The published MCP tools page says Celsius. `temperature_routing_read` requires `activity_id`. `report_read` requires `analytics_id`. Its description says `activity_id` is an alias. That alias is not a schema field, and it was not tried.

## Cross-product

| Dimension | Dashboard | REST API | MCP |
| --- | --- | --- | --- |
| Accessibility and availability | Login timed out. The map loaded once, then `/map` returned the misdirected-request line. | Status reads and one job succeeded after an earlier timeout. | HTTP 503 after a valid initialize, then a completed handshake. |
| Functional completeness | One demo view and a version list. Settings, Feedbacks, zoom, and basemap were not tested. | One of the processing routes completed. The others were not called. | Discovery completed. One free read worked. Paid tools were not called. |
| Documentation quality | The open panel showed versions and counts, not the notes. | The completed job matches the environmental-parameters contract. The report page disagrees with itself on the unit. | Nine tools published, eleven live. Fahrenheit in the live schema, Celsius on the published page. |
| Error handling | The visible failure is a gateway string, not an application message. | 401 and 404 use one envelope, and the two 401s say different things. | The 503 names a temporary authentication-service failure and does not say the key is invalid. |
| Developer experience | A signed-in session can reach a demo and then lose the page. | The completed body is usable without another data request. | Schemas name required fields and units. The report-read alias does not match the schema. |
| Credit transparency | No balance was on the screens that loaded. | The 2,900 charge is in the balance change and the price table, not in the job. | Tool text states the price. `credit_balance` returns the balance and `cost_credits`. |
| Naming consistency | Not compared. The popup did not name a unit on the later click. | `activity_id` on submit, status, and the 404. | `activity_id`, `heatmap_id`, and `analytics_id` all appear. The route tool is `temperature_routing`, not `/v1/routing`. |
| Scalability and maintainability | No load test. Two gateway strings replaced the product. | One status route retrieved the completed job. That is one observed design, not a capacity result. | No load test. The live tool text and the published page disagree. |

Confirmed observations are the rows above that cite a response, a schema, or a screenshot. The unit conflict, the identifier names, and the 9-versus-11 catalogue are documentation inconsistencies. The missing credit field is a product limitation of the completed response. The report unit actually stored, the `report_read` alias, the MCP `env_params` return shape, the 503 cause, and the meaning of the Alabama popup are unverified questions.

No claim is made about internal services, capacity, or a shared codebase beyond the surfaces that were read.

## Copy-ready answers

Paste these only after filling the blanks and deciding the four ratings. Leave a rating blank rather than pasting a proposed score.

### 1. Full name

Manual confirmation required. The repository does not record the applicant's name.

### 2. Email address

Manual confirmation required. The repository does not record an applicant email.

### 3. Position applied for

Manual confirmation required. The repository does not name the position.

### 4. Time spent reviewing products

Manual confirmation required. The notes cover 17 and 18 November 2026 and include a few request durations. They do not contain a reliable total of review time.

### 5. Dashboard first impression

The login URL first showed only `upstream request timeout`. An existing session then opened Demo Heatmap – Alabama, with a state outline and a popup at `32.608763, -86.680695` that showed coordinates and Satellite View / Street View, and no temperature. Feature Updates listed v1.1.1 through v1.0.4. The same map URL later showed only `misdirected request to "dashboard.fortyguard.com"`, including one final reload. Settings, Feedbacks, zoom, and the basemap switch were not tested.

### 6. What was liked most

The completed environmental-parameters result is specific: the coordinate is unchanged, the Phoenix timestamp includes an offset, and the units are in the field names. The API errors are equally specific. A missing key and an invalid key are different 401 messages, and an unknown activity is a 404 that names `activity_id`. On MCP, the tool text states the credit cost before a paid call, and `credit_balance` returned the Premium balance at no cost. On the dashboard, when the map was up, the demo and the version list were easy to find.

### 7. What was disliked most

The dashboard was replaced by a single line of gateway text, first `upstream request timeout` and later `misdirected request to "dashboard.fortyguard.com"`. Neither line says whether the session is valid or where to look. The completed API job cost 2,900 credits and the response does not say so. The live MCP report schema says Fahrenheit while the published MCP page says Celsius.

### 8. Bugs, issues or confusing behaviour

Confirmed availability: the login URL showed `upstream request timeout`, and `/map` showed `misdirected request to "dashboard.fortyguard.com"`. Confirmed MCP failure, later recovered: one handshake returned HTTP 200 and then HTTP 503, "Authentication service is temporarily unavailable." Confirmed contract conflict: report temperature is documented as both Fahrenheit and Celsius, and `report_read` requires `analytics_id` while REST uses `activity_id`.

Not filed as defects: the Alabama popup that showed a coordinate and no temperature, and Feature Updates groups whose note text was not opened. Settings, Feedbacks, zoom, and the basemap switch were not tested.

### 9. Top three dashboard recommendations

1. Show an outage page instead of a raw gateway line, and link it to the status page.
2. State what a click on the demo heatmap represents, and show the unit whenever a temperature is shown.
3. Show the release-note text next to the version and the counts.

### 10. Dashboard usability rating

Leave blank. Decision: `NO DEFENSIBLE SCORE`. Availability failed, and the main workflows were not used. A number would rate the outage or screens that were not opened.

### 11. API rating

Leave blank. Decision: `NO DEFENSIBLE SCORE`. Every documented REST route was reviewed. One job was executed, and the error reads were specific. The other five POST routes were not executed because they are paid. A number would be read as a live result for those routes.

### 12. API design issues or missing endpoints

The status route exists and returned the completed job. The design issues are elsewhere. The completed body has no credit cost. `report_read` requires `analytics_id` while the REST job id is `activity_id`. The report temperature unit is not consistent across the REST page and the MCP schema. Heatmap examples do not use one GeoJSON shape. The published MCP catalogue omits `credit_balance` and `monitoring`. No REST balance endpoint was documented or called. MCP `heatmap` has an idempotency key. A REST idempotency field was not observed.

### 13. Supporting evidence links

No public link. Do not attach the API key or a signed URL. Local index: `fortyguard-evaluation/docs/PRODUCT_EVALUATION_TRACKER.md`. The completed job is `evidence/api/responses/2026-11-18-env-params-status.json`. The balances are `evidence/mcp/executions/2026-11-18-credit-balance-before.json` and `evidence/mcp/executions/2026-11-18-credit-balance.json`. The 503 handshake is `evidence/mcp/configuration/2026-11-18-initialize-diagnostic.json`. The successful handshake is `evidence/mcp/configuration/2026-11-18-initialize-recovered.json`. The tool list is `evidence/mcp/tool-discovery/2026-11-17-tools-list.json`. The second-pass reads are under `evidence/phase11/`. The QA recheck is under `evidence/qa-audit/`. The coverage audit is `docs/27-final-feedback-question-coverage.md`.

### 14. API documentation improvements

Publish the live 11-tool catalogue and say which `monitoring` operations are free. Use one report temperature unit in the field name, the REST page, the MCP schema, and the example. Make `activity_id` a real field on every read tool, and state whether `analytics_id` remains an alias. Put the charged credits on the completed result, or document the balance read as the only receipt. Generate the heatmap examples from one schema. Keep the Premium price of 2,900, the unit-bearing environmental field names, and the error sentence that names the `api-key` header.

### 15. MCP tools tested and client used

Client: Cursor, with `@modelcontextprotocol/sdk` 1.32.2 and Streamable HTTP. The bearer token was not added to Cursor's MCP settings. Invoked: `credit_balance` only, at zero credits. Discovered and not invoked: `monitoring`, `env_params`, `heatmap`, `heatmap_read`, `report`, `report_read`, `satellite`, `streetview`, `temperature_routing`, and `temperature_routing_read`.

### 16. MCP rating

Leave blank. Decision: `NO DEFENSIBLE SCORE`. The MCP checks are complete. The handshake, the 11-tool catalogue, and the schemas were reviewed. The only live call was `credit_balance`, at cost 0. The other tools were not executed. A number would be read as a live result for those tools.

### 17. MCP setup and usage issues

The first completed initialize was followed by HTTP 503 and the message "Authentication service is temporarily unavailable." No session id was recorded. A later handshake succeeded, and 11 tools were listed. The published page still lists nine and describes the report temperature as Celsius. The live schema says Fahrenheit. `report_read` tells the caller that `activity_id` is an alias, but the schema requires `analytics_id` and does not define `activity_id`. `monitoring` is available on the server and absent from the published catalogue.

### 18. Overall experience rating

Leave blank. Decision: `NO DEFENSIBLE SCORE`. The assigned reviews are complete. The dashboard was blocked, and the paid API and MCP operations were reviewed from their contracts rather than executed. The field is not an average.

### 19. Additional comments

The environmental-parameters job completed with the submitted coordinate, a Phoenix offset, and named units, and the Premium balance fell by the documented 2,900 credits. MCP connected on the second handshake, listed two tools that the published page omits, and priced `credit_balance` at zero. The dashboard could be opened once and then returned a gateway line. The report unit, the `report_read` alias, and the cause of the HTTP 503 were not resolved, and no further paid call was made to resolve them.

## Recommendations, ranked

| Rank | Action | Why it is first in this order |
| --- | --- | --- |
| 1 | Put one temperature unit on the report field, the REST page, the MCP schema, and the example. | The texts disagree. The documented Premium price is 8,600. No report was submitted, so the stored unit is unknown. |
| 2 | Replace `upstream request timeout` and `misdirected request` with an outage page. | A signed-in user loses the product and is not told what to do. Both strings were seen. The gateway cause was not diagnosed. |
| 3 | Return the credits charged on a completed REST job. | The 2,900 charge is confirmed by the balance files and absent from the job body. |
| 4 | Accept `activity_id` on every read tool, and make any alias a schema field. | REST returns `activity_id`. `report_read` requires `analytics_id` and only mentions the alias in prose. |
| 5 | Publish `credit_balance` and all 14 `monitoring` operations, and mark the two free ones. | The server exposes a free balance read and paid delete operations that the published catalogue does not list. |
| 6 | Generate heatmap examples from the schema. | The published examples disagree on shape. The live MCP schema accepts a Polygon, a Feature, or a FeatureCollection. REST execution was not tested. |

## Related files

- Ratings: `docs/13-final-rating-assessment.md`
- Submission checklist: `docs/14-final-submission-checklist.md`
- Unsent note to the hiring contact: `docs/15-hiring-contact-clarification-email.md`
