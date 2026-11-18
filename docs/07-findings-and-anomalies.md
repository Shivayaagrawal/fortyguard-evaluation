# Findings and anomalies

Status: planning register. Five items are worth keeping. Several more documentation nits exist in `docs/03-documentation-audit.md` and are not repeated here.

The live copy of these five items is `docs/PRODUCT_EVALUATION_TRACKER.md`. IDs moved on 18 November 2026. The FG numbers below are unchanged.

| Previous ID | Tracker ID |
| --- | --- |
| FG-01 | DOC-001 |
| FG-02 | ARCH-001 |
| FG-03 | DOC-002 |
| FG-04 | DOC-003 |
| FG-05 | API-001 |

Confidence is how sure the observation is, not how severe it would be if confirmed.

## FG-01 — Processing outage during the review window

| Field | Value |
| --- | --- |
| Product | Dashboard, API |
| Category | Availability |
| Severity | P1 if it is still open when testing starts. Otherwise context |
| Description | The public status page reported Heatmap, Satellite, Street View, Heat Intelligence, Environmental Parameters, the Temperature Dashboard, and Heat Monitoring as down. |
| Evidence | `evidence/dashboard/status-page-2026-11-17.md`. Docs request returned HTTP 504 with `upstream request timeout`. |
| Reproduction | Open `https://status.fortyguard.com/` and request `https://docs-api.fortyguard.com/docs/introduction`. |
| Expected | A status page and a docs site that load, or an incident banner on the docs site itself. |
| Actual | Status page loaded and listed the outage from `2026-11-17T20:24:22Z`. The docs host timed out. Authentication was marked operational. |
| Impact | Dashboard review and API tests could not start. Developers get a gateway timeout rather than the product's own error contract. |
| Recommendation | Keep the docs site on the path that stayed up with authentication, or show the status incident instead of an Envoy timeout. Re-test the product only after this incident closes. |
| Confidence | Confirmed for the state of the status page and the docs response in this session. Not a claim that the outage is permanent. |

## FG-02 — MCP status incident open since 14 October

| Field | Value |
| --- | --- |
| Product | MCP |
| Category | Observability |
| Severity | P2 |
| Description | MCP Server is listed as `No data` with 88.10% 90-day uptime, and an "Investigating" incident is still dated `2026-10-14T16:17:29Z`. |
| Evidence | Status page text captured in `evidence/dashboard/status-page-2026-11-17.md`. |
| Reproduction | Open the status page and read the MCP component and the October incident. |
| Expected | A current up or down state, and an incident that is resolved or updated. |
| Actual | The October incident was still open on 17 November. The component had no current data. The November processing outage did not include a new MCP incident in the captured text. |
| Impact | An agent developer cannot tell whether MCP is a supported production edge. A month-old investigating state trains users to ignore the status page. |
| Recommendation | Close or update the October incident. If MCP is unmonitored, say so, and publish a different uptime figure only when probes exist. |
| Confidence | Confirmed that the page said this. Suspected that the MCP endpoint has been unavailable since October. The endpoint was not called. |

## FG-03 — Heat Intelligence temperature unit contradicts itself and the MCP tool

| Field | Value |
| --- | --- |
| Product | API, MCP |
| Category | Contract |
| Severity | P1 if the server accepts the wrong unit without warning. DOC until then |
| Description | REST says the report temperature is Fahrenheit, then says the date applies to a Celsius temperature. MCP says the report temperature is Celsius. The REST example sends `82.4`. |
| Evidence | Indexed pages `docs/heat-intelligence` and `docs/mcp-tools`, reviewed 17 November 2026. The docs host itself was down, so this is from search excerpts of those URLs, not a full-page render. |
| Reproduction | Read the temperature and date attribute text on both pages. Compare with the MCP `report` input description. |
| Expected | One unit, named the same way on REST, MCP, and the example. |
| Actual | Fahrenheit, Celsius, and Celsius across those three texts. |
| Impact | A completed report can describe the wrong physical event. Because credits are charged on `Completed`, the caller pays for a result that is hard to recognize as wrong. |
| Recommendation | Pick one unit. Accept the other only as an explicit field such as `temperature_celsius`. Reject a bare number when the unit is absent. Use the same example on both surfaces. |
| Confidence | High that the published texts conflict. Unknown which text the server enforces. |

## FG-04 — Two official heatmap examples use different GeoJSON types

| Field | Value |
| --- | --- |
| Product | API |
| Category | Contract |
| Severity | P2 if only one shape is accepted. DOC until a validation call |
| Description | The authentication and quickstart samples send `polygon_aoi` as a FeatureCollection. The heatmap page sends a Polygon. |
| Evidence | Indexed excerpts of `docs/authentication`, `docs/quickstart`, and `docs/create-heatmap`. |
| Reproduction | Compare the `polygon_aoi` object in those three examples. |
| Expected | One accepted shape, and the other rejected with a field error, or both accepted and documented. |
| Actual | Both shapes are shown as working examples. Acceptance is untested. |
| Impact | The first paid heatmap a developer runs may be a 3,500-credit request copied from the wrong page, or a confusing validation failure before they have a working client. |
| Recommendation | Publish one schema. If both are accepted, show one canonical example and a sentence that says the other is allowed. |
| Confidence | High that the examples differ. Unknown which shape succeeds. |

## FG-05 — Activity identifiers change name across the agent boundary

| Field | Value |
| --- | --- |
| Product | API, MCP |
| Category | Contract |
| Severity | P2 |
| Description | REST returns `activity_id` for every job. MCP reads heatmaps with `heatmap_id` and reports with `analytics_id`. The report tool also accepts `activity_id`. The heatmap example id is `hm_123`; a REST polling example uses a UUID. |
| Evidence | Indexed `docs/mcp-tools`, `docs/quickstart`, and `docs/heat-intelligence`. |
| Reproduction | Compare the status path, the `heatmap_read` input, and the `report_read` input. |
| Expected | One identifier name, or a mapping table that says these are aliases of one id. |
| Actual | Three names, and two example formats. `report_read` documents an alias. `heatmap_read` does not, in the excerpt that was visible. |
| Impact | An agent that stored the REST id cannot reliably retrieve the job. The failure looks like a missing activity, which the REST docs also use for a race immediately after submit. |
| Recommendation | Accept `activity_id` on every read tool and keep the older names as aliases. Make the example ids look like real ids. |
| Confidence | High that the names differ in the docs. The alias behavior and the id format need a schema and a read call. |

## Noted, not promoted

These stay in the documentation audit until a response shows they matter:

- REST describes every POST as asynchronous. MCP describes point and imagery tools as direct.
- Quickstart sample code treats `succeeded` and `error` as statuses. The status table does not.
- The introduction names Temperature Property Reports. No matching endpoint was in the indexed inventory.
- The introduction's plan labels omit Startup, which the limitations table includes.
- The homepage mock uses `POST /v1/heat-intelligence` and fields the contract does not define.
- No idempotency key is documented. That is a design opportunity, not yet a reproduced double charge.
- No rate-limit window is documented. Do not probe for one with a burst.

## What is already well designed

- A single status route is easier to operate than one status route per product.
- Charging on `Completed`, and documenting failed processing as free, is the right billing boundary for a slow geospatial job.
- The plan matrix tells a Basic developer, before they integrate, that imagery and routing are absent.
- `result_delivery=links` acknowledges that a heatmap body can be too large for a status poll.
- The environmental API documents `null` and legacy `-999` instead of leaving missing data looking like a real measurement.
- MCP's split between submit and read, and the instruction not to resubmit while processing, is the correct agent contract even where the identifier names are not.
