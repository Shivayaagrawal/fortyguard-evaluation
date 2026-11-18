# FortyGuard product evaluation tracker

Authoritative working record. Detailed write-ups stay in `docs/01` through `docs/08`. This file holds progress, findings, form mapping, and evidence pointers.

The Google Form has **not** been submitted. Phase 7 did not submit it.

Last updated: 18 November 2026, signed-in Safari dashboard session. REST and MCP reviews remain complete at the assigned scope. The dashboard shell, settings, one demo popup, and one release-note group were used. A temperature was not shown. Create heatmap, routing, Feedbacks, basemap, and zoom were not completed. End-to-end execution of every workflow is not established. No credit was spent. No rating was entered. The form was not submitted. Dashboard answers: `docs/47-dashboard-google-form-answer.md`. Report: `docs/46-dashboard-fresh-product-evaluation.md`.

| Workstream | Status |
| --- | --- |
| Dashboard | SIGNED-IN LOOK-ONLY. Temperature, create, route, feedback, basemap, and zoom not finished. Rating NO DEFENSIBLE SCORE. |
| REST API | COMPLETE at the assigned review scope. Live this pass: the status route only. |
| REST API documentation | COMPLETE. Nine articles read. |
| MCP | COMPLETE at the assigned review scope. Live this pass: handshake, 11 tools, `credit_balance`. |
| MCP documentation | COMPLETE. Nine published tools, eleven live tools. |
| Cross-product analysis | COMPLETE |
| Rating decision | COMPLETE — NO DEFENSIBLE SCORE |
| Submission clarification | AWAITING |
| Feedback form | NOT SUBMITTED |
| End-to-end product validation | NOT ESTABLISHED |

COMPLETE means the assigned documentation and free live checks are finished. It does not mean the five paid processing routes were executed. The second pass cost 0. The earlier 2,900 figure is an observed balance difference, not a server invoice.

COMPLETE means every assigned check was reviewed. It does not mean every paid operation was executed. The contracts, schemas, costs, and workflows of the unexecuted paid operations were reviewed. The only live processing charge on record is the 2,900-credit environmental-parameters difference.

## Form numbering

The working sections below still use the earlier 16-question numbering. The phase 7 draft follows the later 19-question list, which adds name, email, position, and time spent, and renumbers the ratings. Use `docs/12-final-feedback-form-draft.md` for submission text. Do not paste by number alone.

| Form question | Topic |
| --- | --- |
| 1 | First impression of the dashboard |
| 2 | What you liked most |
| 3 | What you disliked most |
| 4 | Bugs, issues, or confusing behaviour |
| 5 | Top three dashboard recommendations |
| 6 | Dashboard usability, 1–10 |
| 7 | API rating, 1–10 |
| 8 | API design issues or missing endpoints |
| 9 | How to improve the API documentation |
| 10 | What you tried with MCP |
| 11 | Which AI tool you used |
| 12 | MCP rating, 1–10 |
| 13 | MCP setup or use problems |
| 14 | Overall experience, 1–10 |
| 15 | Additional comments |
| 16 | Supporting evidence link |

## A. Evaluation progress

Findings are counted once, on the activity that produced them. Later sections may cite the same ID.

| Product | Activity | Status | Findings Count | Evidence |
| --- | --- | --- | --- | --- |
| Dashboard | Initial exploration | CLOSED — PARTIALLY BLOCKED BY AVAILABILITY | 2 | `docs/16-dashboard-final-completion.md`. |
| Dashboard | UX/UI evaluation | SIGNED-IN LOOK-ONLY | 1 | Settings and v1.1.1 notes opened. Popup has no temperature (DF-004). Feedbacks, zoom, and basemap not completed. |
| Dashboard | Workflow testing | CLOSED — PARTIALLY BLOCKED BY AVAILABILITY | 0 | Create heatmap and routing were not submitted. |
| REST API | Documentation audit | COMPLETE | 4 | DOC-001, DOC-002, DOC-003, API-001. All documented routes reviewed. |
| REST API | Functional testing | COMPLETE | 1 | Live: one `POST /v1/env_params` and status reads. Other POST contracts reviewed and not executed. |
| REST API | Error handling | COMPLETE | 0 | Live 401, 401, and 404. Invalid POST bodies were local fixtures only. |
| MCP | Setup and authentication | COMPLETE | 1 | HTTP 503 handshake preserved. Later handshake completed. Not reinitialized. |
| MCP | Tool discovery | COMPLETE | 1 | 11 live tools. Nine published. Schemas reviewed. |
| MCP | Tool execution | COMPLETE | 1 | Live: `credit_balance` at cost 0. Other tools reviewed from schemas and not called. |
| Cross-product | Architecture comparison | COMPLETE | 1 | `docs/11-phase5-functional-verification.md` and `docs/17-rest-api-functional-evaluation.md`. |
| Final | Google Form preparation | NOT SUBMITTED | 0 | `docs/12-final-feedback-form-draft.md`. Ratings are `NO DEFENSIBLE SCORE`. Clarification is AWAITING. |

The table above this section is the current closure. Older session notes below keep the status words they used on the day they were written.

## B. Observation register

Earlier notes FG-01 through FG-05 are the same observations. The aliases are kept so older docs stay valid.

| Tracker ID | Previous ID |
| --- | --- |
| DOC-001 | FG-01 |
| ARCH-001 | FG-02, plus the coupled-outage note inside FG-01 |
| DOC-002 | FG-03 |
| DOC-003 | FG-04 |
| API-001 | FG-05 |

### DASH-001

| Field | Details |
| --- | --- |
| Finding ID | DASH-001 |
| Date | 2026-11-17 |
| Product | Dashboard |
| Feature | Login URL |
| Category | AVAILABILITY |
| Severity | P1 |
| Observation | `https://dashboard.fortyguard.com/login` rendered a blank document whose only visible text was `upstream request timeout`. The page title was empty and there were no controls. |
| Expected Behaviour | A sign-in screen, or a FortyGuard outage message with a way to tell that the product is down. |
| Actual Behaviour | Gateway timeout text on a black page. Sign-in could not start. |
| Reproduction Steps | Open `https://dashboard.fortyguard.com/login` once. Do not retry. |
| Evidence | `evidence/dashboard/screenshots/dash-001-login-upstream-timeout.png`. `evidence/dashboard/observations/2026-11-17-login-timeout.md`. |
| Impact | The product cannot be evaluated or used. This is not a finding about maps, units, or workflows, because those screens did not load. |
| Recommendation | Serve an outage page from the edge that stays up, and point it at the status incident. Resume the dashboard review when the login form is actually returned. |
| Confidence | Confirmed |
| Form Mapping | Blocks 1, 2, 3, 4, 5, and 6. It is not an answer to those questions. |
| Status | Open |

Update, 18 November 2026, about 03:24 UTC+5:30: the existing Safari tab at `https://dashboard.fortyguard.com/` showed only `upstream request timeout` on a black page. No product control was visible. The tab was not reloaded. Phase 2 was not resumed. Evidence: `evidence/dashboard/screenshots/dash-003-root-upstream-timeout.png` and `evidence/dashboard/observations/2026-11-18-root-upstream-timeout.md`.

The status page at `2026-11-17T20:50:25Z` also listed Temperature Dashboard as Down, incident start `2026-11-17T20:47:15Z`. That page is context. DASH-001 is the login URL.

Update, about 20:54 UTC: `GET /login` returned HTTP 200 in 1.4 seconds. The HTML title was `Temperature Dashboard™` and the body was 66,689 bytes. The URL was opened in the system default browser. The rendered sign-in form has not been inspected, and no one has signed in from this evaluation. DASH-001 stays open as the earlier timeout.

Update, about 20:55 UTC: Safari's front window was `https://dashboard.fortyguard.com/map`, title `Temperature Dashboard™`. The signed-in session exists in Safari. UI inspection could not start: Cursor Computer Use lacks Accessibility and Screen Recording permission, Safari blocks JavaScript from Apple Events, and screen capture returned `could not create image from display`. No dashboard control was clicked.

Phase 5, later on 18 November: the same map URL rendered a black page whose only text was `misdirected request to "dashboard.fortyguard.com"`. The tab was not reloaded again. This is not a restatement of the earlier timeout. Evidence: `evidence/dashboard/screenshots/dash-006-map-misdirected-request.png` and `evidence/dashboard/observations/2026-11-18-phase5-dashboard.md`.

### DOC-001

| Field | Details |
| --- | --- |
| Finding ID | DOC-001 |
| Date | 2026-11-17 |
| Product | API documentation. Blocks the dashboard review. |
| Feature | Docs host during a processing outage |
| Category | DOC |
| Severity | P2 |
| Observation | The docs introduction URL returned HTTP 504, body `upstream request timeout`. At the same time the status page listed the dashboard and the processing APIs as down. Authentication was marked operational. |
| Expected Behaviour | The docs site loads, or it shows the active incident instead of a gateway timeout. |
| Actual Behaviour | Envoy timeout. The status page did load and named the incident start as `2026-11-17T20:24:22Z`. |
| Reproduction Steps | Request `https://docs-api.fortyguard.com/docs/introduction`. Open `https://status.fortyguard.com/`. |
| Evidence | `evidence/dashboard/status-page-2026-11-17.md`. Browser snapshot of the docs host showed the timeout text. |
| Impact | A developer cannot read the contract while the API is failing. This review could not render the docs or open the dashboard. |
| Recommendation | Serve the documentation from the edge that stayed up with authentication, and link the active incident. |
| Confidence | Confirmed |
| Form Mapping | 9, 15, 16. Blocks 1–6 until retested. |
| Status | Open |

### ARCH-001

| Field | Details |
| --- | --- |
| Finding ID | ARCH-001 |
| Date | 2026-11-17 |
| Product | MCP, and the shared status page |
| Feature | Status components and incident history |
| Category | ARCH |
| Severity | P2 |
| Observation | MCP Server was shown as `No data`, 88.10% over 90 days, with an Investigating incident still dated `2026-10-14T16:17:29Z`. The same page reported Heatmap, Satellite, Street View, Heat Intelligence, Environmental Parameters, the Dashboard, and Heat Monitoring down together from `2026-11-17T20:24:22Z`. |
| Expected Behaviour | A current up or down state for MCP, and an incident list that matches independent failure domains. |
| Actual Behaviour | The October MCP incident was still open on 17 November. Seven components shared one start time. Authentication stayed operational. |
| Reproduction Steps | Open `https://status.fortyguard.com/` and read the MCP component, the October incident, and the 17 November incidents. |
| Evidence | `evidence/dashboard/status-page-2026-11-17.md` |
| Impact | An agent developer cannot tell whether MCP is available. A month-old investigating state makes the page easier to ignore. Eight identical rows imply eight independent failures that this outage did not demonstrate. |
| Recommendation | Close or update the October incident. Monitor MCP or stop publishing an uptime figure for it. Group components that fail together. |
| Confidence | Confirmed for the page text at 20:37 UTC. Unverified, at that time, for whether the MCP endpoint was down. |
| Form Mapping | 13, 14, 15 |
| Status | Open |

Update, later the same evening: the component read Down, 88.03%, and the October incident was still open. A new processing incident was dated `2026-11-17T20:47:15Z`. Evidence: `evidence/dashboard/status-page-2026-11-17-2047.md`. The endpoint check is MCP-001.

### API-002

| Field | Details |
| --- | --- |
| Finding ID | API-002 |
| Date | 2026-11-17 |
| Product | API |
| Feature | `GET /v1/status/{activity_id}` during the outage |
| Category | API |
| Severity | P1 |
| Observation | A status read returned no HTTP response within 15 seconds. The same timeout happened with the header omitted, with a dummy key, and with the account key. `curl` with no credential received 0 bytes in 12 seconds. |
| Expected Behaviour | A missing or invalid key returns 401. An unknown activity returns 404. An outage returns a product or gateway error. |
| Actual Behaviour | The connection produced no status code and no body. |
| Reproduction Steps | `GET https://api.fortyguard.com/v1/status/does-not-exist` with a 12–15 second limit, with and without an `api-key` header. |
| Evidence | `evidence/api/errors/2026-11-17-status-read-timeout.md` |
| Impact | Callers cannot tell a bad key from an outage. The plan and the credit balance stayed unknown. Validation of the supplied key did not happen. |
| Recommendation | Fail closed at the edge with 401 or 503 before the processing timeout. Leave `GET /v1/status` available when account authentication is operational. |
| Confidence | Confirmed |
| Form Mapping | 7, 8, 14, 15 |
| Status | Open |

POST `/v1/env_params` and POST `/v1/heatmap` were not sent. The status page listed those services down, and a client timeout can occur after a job has been accepted.

### MCP-001

MCP initialization fails before the handshake finishes. The availability failure is confirmed. The authentication-service cause named in the response is not independently verified.

| Field | Details |
| --- | --- |
| Finding ID | MCP-001 |
| Date | 2026-11-17, updated 2026-11-18 |
| Product | MCP |
| Feature | Session initialize |
| Category | MCP |
| Severity | P1 |
| Observation | The first POST returned HTTP 200 and a valid JSON-RPC initialize result for FortyGuard 4.0.11, protocol `2025-11-25`. The second POST, inferred as `notifications/initialized` from the SDK sequence, returned HTTP 503. The body was `temporarily_unavailable`: "Authentication service is temporarily unavailable." `retry-after` was 5. No `mcp-session-id` was returned. |
| Expected Behaviour | After a successful initialize result, the handshake completes and the client can discover tools. A rejected key would be an authentication failure, not a 503 that calls itself temporary. |
| Actual Behaviour | Initialization did not complete. Tools were not discovered or invoked. The response does not say the API key is invalid. |
| Reproduction Steps | One Streamable HTTP handshake with `@modelcontextprotocol/sdk` 1.32.2 and `Authorization: Bearer`. Do not repeat it while this 503 is the latest evidence. |
| Evidence | `evidence/mcp/configuration/2026-11-18-initialize-diagnostic.json`, unchanged. Classification correction: `evidence/mcp/configuration/2026-11-18-initialize-diagnostic-correction.json`. Earlier timeouts: `evidence/mcp/configuration/2026-11-17-initialize-timeout.md`. Analysis: `docs/mcp/07-documentation-and-failure-analysis.md`. |
| Impact | The MCP connection could not complete, so tool discovery and the rest of the MCP evaluation did not start. No processing call was made and no credits were spent. |
| Recommendation | Ask FortyGuard why a 503 that names the authentication service follows a successful initialize result, whether the missing session id is intentional, and when another attempt is useful. Do not treat the key as invalid from this body. |
| Confidence | Confirmed availability failure for this handshake. The underlying authentication-service cause is unverified. |
| Form Mapping | 10, 12, 13, 15 |
| Status | Open. A later handshake succeeded. The 503 itself is unchanged. |
| Blocker | Cleared for discovery on 18 November 2026. The cause of the earlier 503 is still unverified. |

Earlier observations, kept as history:

- A request with no credential timed out after 12 seconds and received 0 bytes.
- After the REST status route had recovered, one bearer initialize failed in about 17 seconds with `upstream request timeout`. The HTTP status of that response was not logged.
- The configuration audit found the URL, Streamable HTTP transport, and single Bearer header matched the documented setup. DNS and TLS succeeded. Cursor's `mcp.json` has no FortyGuard server, which does not explain the SDK result.

The stored `jsonrpc_error` label on the 503 exchange is incorrect. The original JSON was not rewritten. The correction record classifies that response as `http_error` because it is an HTTP 503 with a non-JSON-RPC body. `classifyHttpResponse` in `src/mcp/http-classification.ts` is covered by `tests/mcp/http-classification.test.ts`.

Update, 18 November 2026, 11:29 UTC: a later handshake completed. Initialize returned HTTP 200 and the next POST returned HTTP 202. `tools/list` returned 11 tools. `credit_balance` cost 0. The 503 file was restored after a rerun briefly overwrote it. The successful record is `evidence/mcp/configuration/2026-11-18-initialize-recovered.json`. No MCP rating has been assigned.

### DOC-002

| Field | Details |
| --- | --- |
| Finding ID | DOC-002 |
| Date | 2026-11-17 |
| Product | API, MCP |
| Feature | Heat Intelligence temperature unit |
| Category | DOC |
| Severity | DOC. Treat as P1 only if a completed call accepts the wrong unit without warning. |
| Observation | The REST temperature field is described as Fahrenheit. The date field on the same page says the date applies to a Celsius temperature. The example value is `82.4`. The MCP `report` tool describes temperature as Celsius. |
| Expected Behaviour | One unit, named the same way on REST, MCP, and the example. |
| Actual Behaviour | The three texts do not agree. Which unit the server enforces is unknown. |
| Reproduction Steps | Read `https://docs-api.fortyguard.com/docs/heat-intelligence` and the `report` section of `https://docs-api.fortyguard.com/docs/mcp-tools`. |
| Evidence | `evidence/documentation/inconsistencies/2026-11-17-indexed-excerpts.md`. Full pages were not rendered, because of DOC-001. |
| Impact | A completed report can describe the wrong physical temperature and still cost 8,600 premium credits. |
| Recommendation | Require an explicit unit field. Publish one example on both surfaces. |
| Confidence | Confirmed for the indexed text and, on 18 November, for the live `report` schema. Unverified at runtime. |
| Form Mapping | 8, 9, 13, 15 |
| Status | Open |

Phase 5 update: the live `report` tool describes `temperature` as degrees Fahrenheit and says Premium allows at most two analysis types. The published MCP tools page reviewed earlier still describes that temperature as Celsius. The REST page still contains both units and the example `82.4`. No report was submitted, so the unit the server stores is unknown.

### DOC-003

| Field | Details |
| --- | --- |
| Finding ID | DOC-003 |
| Date | 2026-11-17 |
| Product | API |
| Feature | Heatmap `polygon_aoi` |
| Category | DOC |
| Severity | DOC. P2 if a paid call accepts only one of the two published shapes. |
| Observation | The authentication and quickstart examples send a GeoJSON FeatureCollection. The heatmap page sends a Polygon. |
| Expected Behaviour | One documented shape, or a sentence that says both are accepted. |
| Actual Behaviour | Both shapes are shown as working examples. Neither has been submitted. |
| Reproduction Steps | Compare `polygon_aoi` on the authentication, quickstart, and create-heatmap pages. |
| Evidence | `evidence/documentation/inconsistencies/2026-11-17-indexed-excerpts.md` |
| Impact | The first heatmap a developer copies can be the wrong shape. A heatmap request is 3,500 or 4,220 credits. |
| Recommendation | Generate the examples from one schema. |
| Confidence | Confirmed for the indexed examples. The live schema accepts all three shapes. Unverified which shape the server executes. |
| Form Mapping | 8, 9 |
| Status | Open |

Phase 5 update: live `heatmap.polygon_aoi` is described as a closed GeoJSON Polygon, Feature, or FeatureCollection. The schema also has an optional `idempotency_key`. `map_type` is described as accepted and ignored. None of this was executed.

### API-001

| Field | Details |
| --- | --- |
| Finding ID | API-001 |
| Date | 2026-11-17 |
| Product | API, MCP |
| Feature | Activity identifiers |
| Category | API |
| Severity | P2 |
| Observation | REST returns `activity_id` for every job. MCP `heatmap_read` takes `heatmap_id`. MCP `report_read` takes `analytics_id` and also accepts `activity_id`. Published examples use both `hm_123` and a UUID. |
| Expected Behaviour | One identifier, or a mapping that says the other names are aliases. |
| Actual Behaviour | Three names and two example formats. The heatmap read tool, in the visible excerpt, does not document the alias that the report read tool documents. |
| Reproduction Steps | Compare `GET /v1/status/{activity_id}` with the inputs of `heatmap_read` and `report_read`. |
| Evidence | `evidence/documentation/inconsistencies/2026-11-17-indexed-excerpts.md`. `src/mcp/discovery.ts` records the documented names. |
| Impact | An agent holding a REST id cannot know which read tool field to fill. A miss looks like the documented post-submit 404. |
| Recommendation | Accept `activity_id` on every read tool. Keep the older names as aliases. Use real-looking ids in examples. |
| Confidence | Confirmed for the documented names and the live schemas. Unverified by a read call. |
| Form Mapping | 8, 9, 13 |
| Status | Open |

Phase 5 update from `evidence/mcp/tool-discovery/2026-11-17-tools-list.json`: `temperature_routing_read` requires `activity_id`. `heatmap_read` accepts `activity_id` or the alias `heatmap_id` and lists neither as required. `report_read` requires `analytics_id`. Its description says `activity_id` is an alias, but the schema has no `activity_id` property and sets `additionalProperties` to false. A strict client that sends only `activity_id` would fail that schema. Whether the server accepts the alias anyway was not tested.

### Watch list

Not findings. Promote one only after a page render or a response supports it. Detail is in `docs/03-documentation-audit.md`.

| Topic | Classification | Form question if promoted |
| --- | --- | --- |
| REST calls every POST asynchronous. MCP `heatmap`, `report`, and `temperature_routing` say they return `activity_id`. The live `env_params`, `satellite`, and `streetview` descriptions do not. | Unverified hypothesis | 8, 12 |
| Quickstart sample accepts `succeeded` and `error`. The status table lists `Processing`, `Completed`, `Failed`. The completed env_params job used `Completed`. | Documentation gap in the excerpts. One live success word observed. | 9 |
| Introduction names Temperature Property Reports. No matching POST was in the six-endpoint list. | Unverified hypothesis | 8 |
| Introduction plan labels omit Startup. The limitations table includes it. | Documentation gap in the excerpts | 9 |
| Homepage source shows `POST /v1/heat-intelligence` with fields the contract does not use. | Confirmed as page source. Unverified as something a developer would follow. | 9 |
| No idempotency key is documented. | Outdated for MCP `heatmap`, which has optional `idempotency_key`. REST remains unverified. | 8 |
| No rate-limit window is documented. | Unknown. Do not burst traffic to find it. | 8 |

### Strengths

Positive observations from the contract. No defect ID.

- One status route serves every asynchronous product.
- Credits are documented as charged only when status is `Completed`. Failed processing is documented as free.
- The plan matrix states area caps, the three-parameter Basic limit, and which products are Premium only.
- Large heatmaps can be retrieved with `result_delivery=links`.
- Missing environmental numbers are specified as `null`, with legacy `-999` called out as not zero.
- MCP separates submit from read and tells the agent not to submit a duplicate while a job is processing.

## C. Dashboard evaluation

Phase 2 workstreams, 17 November 2026, about 20:50 UTC:

| Workstream | Status | Notes |
| --- | --- | --- |
| A. First impression | BLOCKED | DASH-001. No product UI. |
| B. Workflows | NOT_STARTED | Nothing was exposed. |
| C. Temperature presentation | NOT_STARTED | No unit was visible. No mismatch is claimed. |
| D. Controls | NOT_STARTED | No controls were present. |
| E. Responsive and accessibility | NOT_STARTED | One timeout viewport only. |
| F. Reliability | BLOCKED | One confirmed timeout of the login URL. Not retried. |

### 1. First impression of the dashboard

Partial. The login URL timed out on 17 November. On 18 November an existing session opened Demo Heatmap – Alabama. Feature Updates lists four versions and does not show the update text. A map popup showed coordinates without a temperature. The same map URL later showed only `misdirected request to "dashboard.fortyguard.com"`. Settings, Feedbacks, zoom, and the basemap switch were not used. Not scored.

### 2. What did you like most?

Drafted in `docs/12-final-feedback-form-draft.md`. The demo map stated a coordinate, and Feature Updates named the version. The completed API result and the MCP prices are recorded with the later questions.

### 3. What did you dislike most?

Drafted in `docs/12-final-feedback-form-draft.md`. The dashboard was replaced by a one-line gateway error. The completed API job does not show its cost. The report unit disagrees across the published pages and the live schema.

### 4. Bugs, issues, or confusing behaviour

DASH-001 is the login timeout. The later map page showed `misdirected request` and is recorded separately. The Alabama popup without a temperature, and the collapsed feature groups, are observations. They are not bugs until the intended behaviour is known. No setting was changed and no feedback was submitted.

### 5. Top three recommendations

Drafted in `docs/12-final-feedback-form-draft.md`: an outage page, a labeled demo click, and visible release-note text. `docs/08-recommendations.md` is the earlier product-wide list.

### 6. Usability rating, 1–10

`PENDING — insufficient evidence`. One reload of `/map` on 18 November returned the misdirected-request page. Settings, Feedbacks, zoom, the basemap switch, and a second location were not tested.

| Component | Score | Notes |
| --- | --- | --- |
| Navigation | Not scored | |
| Workflow | Not scored | |
| Visual clarity | Not scored | |
| Responsiveness | Not scored | |
| Error recovery | Not scored | |
| Accessibility | Not scored | |

## D. REST API evaluation

Inventory and the credit guard are in `docs/04-api-evaluation.md` and `src/api/`. One `POST /v1/env_params` has since completed. Phase 5 inspects that body in `docs/11-phase5-functional-verification.md`.

### 7. API rating, 1–10

`PENDING — insufficient evidence`. One completed env_params job is not a rating for the API.

| Dimension | Evidence so far | Score |
| --- | --- | --- |
| Consistency | DOC-003 and API-001 show inconsistent examples and identifiers. | Not scored |
| Resource naming | Six POST paths plus one status route are a small, clear surface. | Not scored |
| Authentication | A missing key and an invalid key are different 401s. The account key was accepted for the completed job. | Not scored |
| Schemas | One completed env_params body matches the documented field names and units. | Not scored |
| Validation | Local fixtures reject a missing temperature, latitude 91, a short ring, and a MultiPolygon. The server was not sent those bodies. | Not scored |
| Error handling | Live 401 and 404 bodies use `error`, `status_code`, and `details.message`. | Not scored |
| Async workflows | One submit returned `activity_id`. The following status read was `Completed`. | Not scored |
| Developer experience | Python examples are specific. Two of them disagree. See DOC-003. | Not scored |

### 8. API design issues or missing endpoints

| ID | Issue | Class | Equivalent already exists? |
| --- | --- | --- | --- |
| API-001 | `activity_id`, `heatmap_id`, and `analytics_id` | Documentation gap until a live schema confirms the runtime names | Yes. `GET /v1/status/{activity_id}` is the retrieval route. This is not a missing status endpoint. |
| DOC-002 | Heat Intelligence unit | Documentation gap. Runtime defect only if a completed job accepts a misleading unit. | The endpoint exists. |
| DOC-003 | Two `polygon_aoi` shapes in official examples | Documentation gap | The endpoint exists. |

Checked and not called missing:

- Retrieval of a submitted job exists: `GET /v1/status/{activity_id}`.
- Pagination was not described. These are task endpoints, so pagination may be irrelevant. Unknown, not a defect.
- A credits-balance endpoint was not in the indexed inventory. Unknown. Do not invent one.
- Versioning is the `/v1` prefix only. Potential enhancement, not a confirmed defect.
- Idempotency and a numeric rate limit are on the watch list.

### 9. How to improve the API documentation

Draft, to be revised after the docs host renders:

- Generate examples from the schema so the authentication page and the heatmap page cannot diverge. DOC-003.
- Name one temperature unit, in the field name, on REST and MCP. DOC-002.
- Put a REST-to-MCP name map next to each tool, including `activity_id`. API-001.
- State the credit cost on the MCP tool page, not only in the REST plan table.
- Document submit-timeout behaviour beside the "failed activities are free" rule.
- Keep the parts that are already precise: the plan matrix, the `Completed` billing rule, `result_delivery=links`, and the `null` versus `-999` rule.

## E. MCP evaluation

### 10. What did you try with MCP?

One handshake returned HTTP 200 and then HTTP 503. A later handshake completed. `tools/list` returned 11 tools. `credit_balance` was called twice and cost 0. Phase 5 inspected every live schema and did not reinitialize or call a processing tool. MCP-001 remains the earlier 503.

Earlier the same endpoint timed out, including one bearer attempt of about 17 seconds with `upstream request timeout`. Those attempts are history. The 503 is the current evidence.

The bearer token was not written into Cursor's MCP settings. This SDK result does not depend on that file.

### 11. Which AI tool did you use?

Cursor is the intended agent host. No prompt has been sent to a FortyGuard tool, so tool-selection quality is not rated.

### Tool matrix

| Tool | Discovered | Executed | Result | Finding ID |
| --- | --- | --- | --- | --- |
| credit_balance | Yes. Not in the published nine. | Yes | Balance 1,000,000, then 997,100. Cost 0. | |
| monitoring | Yes. Not in the published nine. | No | Schema only. Free list operations and paid mutations. | |
| env_params | Yes | No | Schema matches the REST input names. Celsius. | |
| heatmap | Yes | No | Schema accepts three GeoJSON shapes and an idempotency key. | DOC-003 |
| heatmap_read | Yes | No | `activity_id` or `heatmap_id`. | API-001 |
| report | Yes | No | Live description says Fahrenheit. | DOC-002 |
| report_read | Yes | No | Requires `analytics_id`. Alias is description text only. | API-001 |
| satellite | Yes | No | Requires `date_time`. States 14,400 Premium credits. | |
| streetview | Yes | No | Heading and a pitch value divided by 100. | |
| temperature_routing | Yes | No | Requires origin, destination, and departure time. | |
| temperature_routing_read | Yes | No | Requires `activity_id`. | API-001 |

API-001 and DOC-002 are documentation findings about those tools. They are not execution results.

### 12. MCP rating, 1–10

`PENDING — insufficient evidence`. Discovery and one free read succeeded. No processing tool was used.

| Dimension | Score | Notes |
| --- | --- | --- |
| Setup simplicity | Not scored | One handshake failed after initialize. A later handshake completed. |
| Authentication | Not scored | The recovered session listed tools. The earlier 503 names the authentication service and does not say the key is invalid. |
| Tool discoverability | Not scored | `tools/list` returned 11 tools. The published catalogue names 9. |
| Tool descriptions | Not scored | Live `report` says Fahrenheit. The published tools page said Celsius. |
| Input schemas | Not scored | All 11 schemas were read from the saved `tools/list`. None of the paid tools were called. |
| Natural-language compatibility | Not scored | |
| Response quality | Not scored | |
| Error propagation | Not scored | The 503 body is specific. It was not seen through a tool call. |
| Reliability | Not scored | MCP-001 is one handshake. ARCH-001 remains a status-page record. |
| AI agent usability | Not scored | |

### 13. MCP setup or usage problems

The handshake returned HTTP 200 and then HTTP 503. The 503 body says the authentication service is temporarily unavailable and does not say the key is invalid. That cause is unverified. MCP-001.

REST uses `api-key`. MCP uses a bearer token. The authentication page states that difference. It is not a defect.

`credit_balance` was invoked and cost 0. No paid MCP tool was called. The MCP rating stays unscored. Phase 5 schema notes are in `docs/11-phase5-functional-verification.md`.

## F. Cross-product consistency

The current comparison is `docs/11-phase5-functional-verification.md`. `docs/10-cross-product-and-final-report.md` is the earlier close, written before the recovered handshake and the completed job.

| Capability | Dashboard | REST API | MCP | Documentation |
| --- | --- | --- | --- | --- |
| Heatmap | Alabama outline. One earlier tile showed `60.59°F`. The later popup showed coordinates only. | Not called. | Schema only. Three GeoJSON shapes. Not executed. | DOC-003. |
| Environmental parameters | Not tested | One job completed. Phoenix, Celsius field names, 2,900 credits. | Schema matches the REST input names. Not called. | Completed job agrees. Cost is not in the job body. |
| Satellite | Popup button not clicked. | Not called. | Schema only. States 14,400 credits. | Not compared at runtime. |
| Street View | Popup button not clicked. | Not called. | Schema says heading, and pitch divided by 100. | Not executed. |
| Routing | Not submitted. | Not called. | `temperature_routing_read` requires `activity_id`. | Tool name differs from `/v1/routing`. |
| Reports | Not tested | Not called. | Live schema says Fahrenheit. Not called. | DOC-002. Published MCP page said Celsius. |
| Task status | Not tested | Submit, then `Completed`, for one env_params job. Error reads returned 401 or 404. | Read tools not called. | API-001. |
| Availability | DASH-001, then a signed-in map, then `misdirected request`. | API-002 was the earlier timeout. Status reads and one job worked later. | MCP-001, then a completed handshake. Not reinitialized. | MCP docs do not describe the 503 sequence. |
| Credits | No balance on the screens that were read. | 2,900 observed by a separate balance read. | `credit_balance` returned the balance and cost 0. Tool text states prices. | Premium env_params price matches the charge. |

| Discrepancy | Class |
| --- | --- |
| Temperature unit on reports | Documentation plus the live schema. DOC-002. The live tool says Fahrenheit. The published MCP page said Celsius. The dashboard tile in °F does not settle the report unit. |
| Polygon example shape | Documentation only. DOC-003. |
| Identifier names | API-001. REST's live 404 and the completed job use `activity_id`. The routing read schema requires that name. The report read schema requires `analytics_id`. |
| Auth header | Documented difference. Used as documented on both live calls. |
| MCP 503 after a successful initialize | Confirmed for that handshake. A later handshake succeeded. Cause unverified. MCP-001. |
| Credit numbers on MCP pages | The rendered pages omit the REST numbers. The live tool descriptions include them. The completed env_params charge was 2,900. |

## G. Final overall evaluation

Closed in `docs/10-cross-product-and-final-report.md`. The form was not submitted.

### 14. Overall experience, 1–10

`PENDING — insufficient evidence`. One API job completed and MCP discovery recovered. The dashboard then failed a single reload. Those results are not averaged into a score.

### 15. Additional comments

The completed environmental-parameters job preserves the coordinate, uses an unambiguous Phoenix timestamp, and names units in the field names. The 2,900-credit charge matches the Premium table and is absent from the job body. The live MCP catalogue has 11 tools. `report` says Fahrenheit while the published MCP page said Celsius. The map URL later showed `misdirected request`. Ratings stay unscored. Detail: `docs/11-phase5-functional-verification.md`.

### 16. Supporting evidence

Repository path: `fortyguard-evaluation/`. No public link. Do not publish `.env` or a signed report URL.

## Evidence index

| Path | Holds |
| --- | --- |
| `evidence/dashboard/screenshots/` | DASH-001, the Alabama map, Feature Updates, and the later misdirected-request page |
| `evidence/dashboard/observations/2026-11-18-phase5-dashboard.md` | Phase 5 dashboard notes |
| `docs/11-phase5-functional-verification.md` | Phase 5 comparison |
| `evidence/dashboard/workflows/` | Future click sequences |
| `evidence/dashboard/status-page-2026-11-17.md` | DOC-001 and ARCH-001 |
| `evidence/api/requests/` | Future redacted requests |
| `evidence/api/responses/` | Future redacted responses |
| `evidence/api/errors/` | Future redacted errors |
| `evidence/mcp/configuration/` | Future MCP config with the key removed |
| `evidence/mcp/tool-discovery/` | Future `tools/list` |
| `evidence/mcp/executions/` | Future tool results |
| `evidence/documentation/inconsistencies/2026-11-17-indexed-excerpts.md` | DOC-002, DOC-003, API-001 |

Credentials, authorization headers, account ids, and signed download URLs stay out of these files.

## Session log

### 2026-11-17 — Planning

Tested: public status page, docs host availability, indexed API and MCP pages, homepage source.

Discovered: DOC-001, ARCH-001, DOC-002, DOC-003, API-001. Recorded then as FG-01 through FG-05.

Form questions updated: none with final answers. Blockers noted for 1–6, 7, 10–13.

Untested: every dashboard screen, every API call, every MCP tool.

### 2026-11-18 — Tracker opened

Tested: nothing new. Existing observations were copied here and given tracker IDs. No finding was deleted or downgraded.

Form questions updated: all 16 have a slot in `docs/FINAL_GOOGLE_FORM_RESPONSES.md`. Ratings remain blank.

Untested: unchanged.

### 2026-11-17 — Key stored, reachability only

Tested: `GET /v1/status/does-not-exist` with no key, a dummy key, and the account key. One MCP `initialize`. The public status page again.

Discovered: API-002, MCP-001. ARCH-001 gained a later reading: MCP now says Down, and a new processing incident started at `2026-11-17T20:47:15Z`.

Form questions updated: 8, 10, 13, 15. Ratings for 6, 7, 12, and 14 stay blank.

Untested: dashboard screens, error bodies, every paid call, `tools/list`, and all nine tools. POST validation was skipped on purpose while those services were listed down.

### 2026-11-17 — Phase 2 availability gate

Tested: one open of `https://dashboard.fortyguard.com/login`. The status page was read once for context. No second attempt.

Discovered: DASH-001. The login URL showed `upstream request timeout` and no controls.

Form questions updated: 1 through 6 remain unanswered. The blocker is recorded against them. Ratings for 6, 7, 12, and 14 stay blank. API and MCP questions were not changed.

Untested: every signed-in dashboard screen, workflow, unit label, control, viewport, and accessibility check. Phase 3 was not started.

### 2026-11-17 — Safari screen capture works

Tested: one screen capture of the front Safari window. Cursor's own capture helper still reports that Screen Recording is missing. The system capture of Safari succeeded.

Discovered: the signed-in page is `dashboard.fortyguard.com`, showing Demo Heatmap – Alabama. The open tile popup labels temperature `60.59°F` at coordinates `32.367693, -86.223497`. Visible navigation includes Map Controls, Monitor Configuration, Heatmap Information, Analytics, Segmentation, Heat Intelligence, Map Comparison, Settings, Feature Updates, Feedbacks, and Profile. No Brave session was used.

Evidence: `evidence/dashboard/screenshots/dash-002-safari-demo-heatmap-alabama.png`.

Form questions updated: none scored. Question 1 now has a first real screen, still incomplete.

### 2026-11-17 — Phase 2B paused before map interactions

Tested: brought Safari forward to continue from the Alabama heatmap. The only window's current tab was no longer the dashboard.

Actual state: a Google account consent page was in front. The Temperature Dashboard tab was not in that window. No button on that page was clicked. No map interaction was performed in this pass.

Evidence: not saved. The screen showed an account email, so the capture was deleted rather than stored.

### 2026-11-17 — Phase 3 REST reads

Tested: local contract suite (`npm test`, 18 passed) and three `GET /v1/status/does-not-exist` calls. No key, a dummy key, and the account key.

Discovered: no new finding. Missing key is 401 with a message that names the `api-key` header. A dummy key is 401, invalid or unknown. The account key is 404, no activity found. The JSON shape is `error`, `status_code`, `details.message`.

Form questions updated: 7 stays unscored. 8 and 9 now include the live read. 10–14 were not changed.

Untested: every POST, a completed job, the credit balance, and MCP. Workstream F stays blocked until the plan, the remaining credits, and a spend ceiling are approved.

### 2026-11-17 — Phase 4 MCP initialize

Tested: one Streamable HTTP initialize with the account bearer token. Not repeated.

Discovered: no new finding. MCP-001 still stands. The error text is now `upstream request timeout`, about 17 seconds, after REST had recovered. Tools discovered: 0 of 9. Schemas inspected: 0. Tools invoked: none.

Form questions updated: 10, 11, 13. Question 12 stays unscored. Question 14 stays unscored. Question 15 now includes the REST error envelope and this MCP timeout.

Untested: tool discovery, every tool schema, every tool call, and paid processing. Phase 5 was not started.

### 2026-11-18 — MCP configuration audit

Tested: the SDK script, Cursor `mcp.json`, key shape, DNS, and TLS. No MCP initialize and no tool call.

Discovered: no new finding. The URL, Streamable HTTP transport, and one Bearer header are correct. Cursor has no FortyGuard server, which does not explain the SDK result. The prior error is a non-OK HTTP response with body `upstream request timeout`. Its status code was not logged. Detail: `docs/mcp/06-connection-configuration-audit.md`.

Form questions updated: none. MCP-001 was not reclassified.

Untested: a second initialize that records the HTTP status, tool discovery, and every tool call.

### 2026-11-18 — MCP diagnostic prepared

Tested: nothing on the network. `scripts/mcp-initialize-diagnostic.ts` was added and syntax-checked. It was not run.

Discovered: no new finding. The SDK keeps the HTTP status on `StreamableHTTPError.code` and does not keep status text or headers, so the script wraps `fetch`. MCP-001 was not reclassified. Detail: `docs/mcp/06-connection-configuration-audit.md`.

Form questions updated: none.

Untested: the instrumented initialize. It stays behind `FORTYGUARD_MCP_DIAGNOSTIC_APPROVED=true`.

### 2026-11-18 — Instrumented initialize, once

Tested: `scripts/mcp-initialize-diagnostic.ts` with the approval flag. One handshake. No `tools/list`, no tool call, no retry.

Discovered: no classification change. The initialize POST returned HTTP 200 and an SSE JSON-RPC result for FortyGuard 4.0.11. The next POST returned HTTP 503, body `temporarily_unavailable`, message "Authentication service is temporarily unavailable." The script's `jsonrpc_error` label on that second body is incorrect; the body is not a JSON-RPC envelope. Evidence: `evidence/mcp/configuration/2026-11-18-initialize-diagnostic.json`.

Form questions updated: none. MCP-001 was not reclassified.

### 2026-11-18 — Documentation review and MCP-001 update

Tested: local classifier tests only. The six MCP documentation pages were retrieved. No MCP connection, no `tools/list`, no tool call, and no REST processing request.

Discovered: MCP-001 remains the same finding. Its description now records the HTTP 200 initialize and the HTTP 503 follow-up. The availability failure is confirmed. The authentication-service cause is unverified. The corrected classifier returns `http_error` for that 503. Detail: `docs/mcp/07-documentation-and-failure-analysis.md`.

Form questions updated: 9, 10, 11, 12, 13, and 15. Question 12 stays unscored. The form was not submitted.

Untested: another handshake, tool discovery, every tool schema, every tool call, and paid processing.

### 2026-11-18 — MCP phase closed

Tested: nothing new. The existing handshake is the close.

Discovered: no new finding. MCP testing is Blocked — provider-side HTTP failure observed. The raw diagnostic JSON was not rewritten. A note beside it corrects the `jsonrpc_error` label. Cross-product close: `docs/10-cross-product-and-final-report.md`.

Form questions updated: 14 and 15, still unscored. The form was not submitted.

Untested by decision: another MCP connection, tool discovery, tool calls, paid API jobs, and further dashboard interaction.

### 2026-11-18 — MCP evidence closeout

Tested: nothing on the network. No code change.

Discovered: no new finding. The original diagnostic JSON still says `jsonrpc_error` on the 503 exchange. `evidence/mcp/configuration/2026-11-18-initialize-diagnostic-correction.json` records the corrected class `http_error`. MCP-001, `docs/mcp/07-documentation-and-failure-analysis.md`, and this tracker agree: handshake failure confirmed, cause unverified, rating unscored, no credits spent.

Blocker: Await FortyGuard clarification on the HTTP 503 and MCP session handling before another initialization attempt.

Form questions updated: 10, 12, 13, and 15. Question 12 stays unscored. The form was not submitted.

### 2026-11-18 — Dashboard access check

Tested: the existing Safari tab at `https://dashboard.fortyguard.com/`. It was brought forward and not reloaded. No control was clicked.

Discovered: no new finding. The page showed only `upstream request timeout` on a black background. Navigation, map, heatmap, analytics, settings, and the other Phase 2 workflows were not available. DASH-001 stays open. Evidence: `evidence/dashboard/observations/2026-11-18-root-upstream-timeout.md`.

Form questions updated: none scored. Questions 1 through 6 stay incomplete. The form was not submitted.

Untested: every signed-in dashboard workflow. REST processing was not started. MCP was not retried.

### 2026-11-18 — Retest after the outages

Tested: Safari login URL, the signed-in map, Feature Updates, three REST status reads, one `POST /v1/env_params`, one status read of that job, one MCP handshake, `tools/list`, and `credit_balance`.

Discovered: the dashboard session was already signed in and showed Demo Heatmap – Alabama. A map click showed coordinates and no temperature. Feature Updates lists versions through v1.1.1. Settings and Feedbacks were not opened. The environmental-parameters job `98a664cb-d9bb-484c-82a1-3d23ed9c7365` completed. The credit balance moved from 1,000,000 to 997,100, a difference of 2,900, on plan type premium. MCP listed 11 tools, including the documented nine plus `credit_balance` and `monitoring`. The live `report` description says Fahrenheit. The live `temperature_routing_read` field is `activity_id`.

Form questions updated: 1, 7, 8, 10, 12, and 13. Ratings stay blank. The form was not submitted.

Untested: dashboard settings, feedback contents, analytics, heat intelligence, zoom, and responsiveness. REST heatmap, routing, satellite, street view, and heat intelligence. Every MCP processing tool.

### 2026-11-18 — Phase 5 functional verification

Tested: the saved environmental-parameters response against the contract, the saved 11-tool schemas, the local contract suite (24 passed), Feature Updates, and further map clicks. No new paid call. MCP was not reinitialized. Settings were not changed and feedback was not submitted.

Discovered: the completed job keeps `33.4484, -112.074`, uses `America/Phoenix` at `-07:00`, and names Celsius, percent, millimetres, octas, and W/m² in the result. The balance drop of 2,900 matches the Premium price and is not in the job body. Live `report` says Fahrenheit. `temperature_routing_read` requires `activity_id`. `report_read` requires `analytics_id`. `credit_balance` and `monitoring` are outside the published nine. Feature Updates did not reveal its changelog text. The map popup still had no temperature. The map URL then showed `misdirected request to "dashboard.fortyguard.com"`.

Form questions updated: 1, 4, 7, 8, 9, 10, 12, 13, 14, and 15. Ratings stay blank. The form was not submitted.

Untested: Settings, Feedbacks, a second confirmed map location, zoom, layers, analytics, and every paid processing tool.

### 2026-11-18 — Phase 6 final audit

Tested: one reload of `https://dashboard.fortyguard.com/map`. The page source was `misdirected request to "dashboard.fortyguard.com"`. No second reload. No REST request. No MCP request. No setting change. No feedback submission.

Dashboard steps marked NOT TESTED after that result: Feature Updates groups, Settings, Feedbacks, a second map location, zoom, and the Map / Satellite switch.

Checked against the original files: the completed env_params body has no credit field; the balance files show 1,000,000 then 997,100; the 503 diagnostic still has `outcome: failed`; the recovered handshake is a separate file; `tools/list` still has 11 tools.

Form questions updated: the phase 6 draft is `docs/12-final-feedback-form-draft.md`. Questions 6, 7, 12, and 14 are `PENDING — insufficient evidence`. The form was not submitted. The evaluation is not marked complete.

### 2026-11-18 — Phase 7 submission preparation

Tested: nothing live. The saved API responses, balance files, 503 diagnostic, recovered handshake, and tool list were re-read. No evidence file was overwritten.

Discovered: no new product finding. The repository has no applicant name, email, position, or total review time. Dashboard usability and the overall rating stay without a number. A provisional 6 for the API and a separate provisional 6 for MCP are written only in `docs/13-final-rating-assessment.md`. They are not form answers. An unsent clarification note is `docs/15-hiring-contact-clarification-email.md`.

Form status: NOT SUBMITTED.

### 2026-11-18 — Phase 8 dashboard gate and API inventory

Tested: one read of the existing Safari tab at `https://dashboard.fortyguard.com/map`, without a reload. The source was `misdirected request to "dashboard.fortyguard.com"`. The public API introduction was read. Local tests were run again: 24 passed. No REST call. No MCP call.

Discovered: no new product defect. Remaining dashboard workflows are `NOT TESTED — BLOCKED BY AVAILABILITY`. They are not bugs. The REST inventory is unchanged: six POST routes and one status read. Only `env_params` and the status read have live results. Paid routes remain unapproved.

Form status: NOT SUBMITTED. No dashboard number was assigned.

### 2026-11-18 — Phase 9 rating decision

Tested: nothing live. The form draft was checked against the saved job, the balance files, and the MCP records.

Discovered: no new product finding. Dashboard usability, the API, MCP, and the overall experience are `NO DEFENSIBLE SCORE`. The provisional API 6 and MCP 6 are withdrawn because each would be read as coverage. Name, email, position, time spent, and consent remain empty.

Form status: NOT SUBMITTED. Not ready for manual submission.

### 2026-11-18 — Phase 10 closure

Tested: nothing. No dashboard, REST, or MCP call.

Closed: Dashboard as partially blocked by availability. REST API, REST documentation, MCP, MCP documentation, and the cross-product comparison as COMPLETE. Rating decision remains `NO DEFENSIBLE SCORE`. The provisional 6s stay withdrawn.

Distinction: assigned checks are complete. Paid routes and paid MCP tools that were not executed were assessed from their contracts, schemas, costs, and workflows. That is not live execution.

Administrative: the form is NOT SUBMITTED. The clarification email is NOT SENT. Identity fields are still empty. Guide: `docs/19-manual-submission-guide.md`. Summary: `docs/20-evaluation-closure-summary.md`.

### 2026-11-18 — Phase 11 second pass

Tested: four free status reads, one reread of activity `98a664cb-d9bb-484c-82a1-3d23ed9c7365`, one MCP handshake, `tools/list`, and `credit_balance`. Nine documentation articles were rendered. No POST. No paid MCP tool. The Dashboard was not opened.

Discovered: the status route and MCP discovery work now. The balance is still 997,100 and this pass cost 0. The report-unit conflict, the two polygon examples, and the 9-versus-11 catalogue are still on the current pages and the new schema. The earlier 503 file was not overwritten.

Paid tests awaiting approval: heatmap 4,220, routing 3,500, heat intelligence 8,600, street view 8,600, and satellite 14,400 Premium credits, plus the matching MCP tools. A new environmental-parameters job would be another 2,900 and was not sent.

Form status: NOT SUBMITTED. No rating was assigned.

### 2026-11-18 — Final second-pass closure

Tested: nothing. No dashboard reload, no REST call, no MCP call, no credit spend, no email, and no form submission.

Recorded: the second-pass counts are the current figures. Nine documentation articles, seven REST routes reviewed, one REST route live, eleven MCP tools discovered, one MCP tool live, six successful checks, zero failed checks, five paid routes not executed. Balance remained 997,100. Package: `docs/26-final-evaluation-package.md`.

### 2026-11-18 — Final QA audit

Tested: local unit tests and typecheck. Four free status reads and one `credit_balance` call, written to `evidence/qa-audit/`. Public documentation pages for heatmap, heat intelligence, and MCP tools were read again. No POST. No paid MCP tool. No dashboard reload. No email. No form submission. Cost 0. Balance remained 997,100.

Discovered: the free surfaces still respond. The completed environmental job still returns the Phoenix coordinate and timestamp. Twenty-four local tests passed and typecheck passed. `npm run test:integration` has no test files. There is no lint, build, or application start script. The feedback draft's "called twice" sentence was corrected. End-to-end validation of the five paid routes, ten uncalled MCP tools, and the blocked dashboard workflows is not established.

### 2026-11-18 — API and MCP documentation versus server source

Tested: no new API or MCP call. No paid tool. No dashboard reload. The published REST and MCP pages were read again. The workspace was searched for server source.

Discovered: `/Users/shivanyaagrawal/fourty` contains only `fortyguard-evaluation`. Its `src/` tree is a client and fixtures. FortyGuard's API server and MCP server are not in the repository, so no handler, billing path, or database was reviewed. The documentation conflicts remain. Notes: `docs/39-rest-api-documentation-deep-review.md` through `docs/45-api-mcp-integration-consistency.md`.

### 2026-11-18 — Fresh dashboard session

Tested: the login page, invalid login, forgot password, sign up, and logged-out visits to `/map`, `/settings`, and `/`. Viewports 1440 × 900, 1280 × 800, and 390 × 844. No password was available. Google sign-in was not used. The map was not opened.

Discovered: login loads and names its errors. `/settings` without a session stays on a blank `/`. The sign-up legal links share a URL that returns 404. Rating remains `NO DEFENSIBLE SCORE`. Reports: `docs/46-dashboard-fresh-product-evaluation.md` and `docs/47-dashboard-google-form-answer.md`.

### 2026-11-18 — Signed-in Safari dashboard session

Tested: an already signed-in map at `https://dashboard.fortyguard.com/map`. Demo Heatmap – Alabama opened. One map click. Settings opened and not changed. Feature Updates opened and New & Enhanced Features expanded. No password typed. No setting changed. Create heatmap, Find the Coolest Route, Feedbacks, search, Satellite View, Street View, and the basemap switch were not used. No credit spent. No form submitted.

Discovered: the Alabama popup shows coordinates `32.608763, -86.680695` and Satellite View / Street View, with no temperature, unit, or legend. Settings shows Fahrenheit and miles. v1.1.1 notes describe Fastest, Hottest, and Balanced routes and heat monitoring. Zoom was not visually confirmed. A missed sidebar click moved the map and is not a controlled pan test. Rating remains `NO DEFENSIBLE SCORE`. Notes: `evidence/dashboard-fresh/observations/2026-11-18-safari-signed-in.md`. Answers: `docs/47-dashboard-google-form-answer.md`.

### 2026-11-18 — Fresh REST API pass

Tested: twenty-one rendered documentation articles, including the monitor and alert pages. Three `GET /v1/status` reads: missing key 401, dummy key 401, synthetic id 404. No POST. No monitor call. No credit-usage call. No form submission.

Discovered: the sidebar documents monitor routes at 3,500 credits per request, including GET and DELETE. Heat Intelligence still mixes Fahrenheit and Celsius. Polygon examples disagree with the FeatureCollection rule. The credits page does not document a path or a cost. The valid `env_params` example was prepared and not sent. Rating remains `NO DEFENSIBLE SCORE`. Report: `docs/48-rest-api-fresh-evaluation.md`. Answers: `docs/49-rest-api-google-form-answers.md`.

### 2026-11-18 — One authorized env_params job

Tested: account-key status read of the synthetic id, then one `POST /v1/env_params` using the documented New York example, then one status read. No second POST. No monitor call. No credit-usage call. No form submission.

Discovered: the synthetic id returned 404, so the key was accepted. The POST returned HTTP 200 in 1,525 ms and activity `8c32cb1d-0331-49f5-9302-34b6b9549ed6`. The first status read was `Completed`. The coordinate and New York timestamp matched. Derived fields are named in Celsius. Methane and CO₂ are null. The body has no credit field, and the plan was not retrieved. Rating for this tested surface: 6/10. Evidence: `evidence/api-fresh/functional-test/`.

### 2026-11-18 — Fresh MCP connection

Tested: one Streamable HTTP session with `@modelcontextprotocol/sdk` 1.32.2. Protocol `2025-11-25`. Server FortyGuard 4.0.11. `tools/list` returned 11 tools. `credit_balance` returned 994,200 credits, plan premium, cost 0. No paid tool. No monitor operation. Cursor's `mcp.json` was not changed and has no FortyGuard entry.

Discovered: the quickstart still lists nine tools. `credit_balance` and `monitoring` are live only. The report tools page says Celsius and one to five analyses. The live report tool says Fahrenheit, and its text also says Premium allows at most two. `report_read` requires `analytics_id`. The earlier HTTP 503 was not reproduced. One GET returned 405 and the tool calls still succeeded. Rating for this SDK session: 6/10. Report: `docs/50-mcp-fresh-evaluation.md`. Answers: `docs/51-mcp-google-form-answers.md`.
