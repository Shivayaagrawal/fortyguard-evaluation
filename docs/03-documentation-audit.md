# Documentation audit

Status: cross-read of indexed API docs, indexed MCP docs, the public website, and the live status page. Dashboard labels were not seen. No runtime response is classified as confirmed behavior.

Classification used here:

- **Confirmed.** Observed in this session.
- **Documentation gap.** Two public texts disagree, or a contract a caller needs is missing.
- **Suspected.** The text suggests a problem, and a call or a screen is still required.
- **Design opportunity.** A reasonable product choice with a cost worth naming.

## Comparison matrix

| Topic | REST docs | MCP docs | Dashboard / site | Classification |
| --- | --- | --- | --- | --- |
| Transport | `https://api.fortyguard.com` | `https://tos-mcp.app.fortyguard.com/mcp` | Dashboard host is separate | Design opportunity. Separate edges are reasonable |
| Auth | `api-key` header | `Authorization: Bearer` | Not seen. Status page says accounts stayed up | Design opportunity unless a guide tells developers to reuse one header |
| Heat Intelligence temperature | Field text says Fahrenheit. The date field says the date is for the supplied Celsius temperature. Example value is `82.4` | `report.temperature` is documented as Celsius | Marketing mock uses `temperature_f: 112` on a path that is not the real endpoint | Documentation gap |
| Area geometry | Authentication and quickstart examples use a GeoJSON FeatureCollection. The heatmap page example uses a bare Polygon | "GeoJSON-style polygon" | Not seen | Documentation gap |
| Activity id | `activity_id` for every product. Examples include a UUID | `heatmap_id` on `heatmap_read`. `analytics_id` on `report_read`, with `activity_id` also accepted. Example id `hm_123` | Not seen | Documentation gap. Runtime mapping is suspected |
| Sync model | Every POST returns an activity and is polled | `env_params`, `satellite`, and `streetview` are direct. Heatmap, report, and routing are polled | Not seen | Documentation gap, or an adapter that the REST page does not mention |
| Status words | Table: `Processing`, `Completed`, `Failed`. Sample code also treats `succeeded` and `error` as terminal | `processing`, completed, failed | Not seen | Documentation gap |
| Tool / route names | `/v1/heat_intelligence`, `/v1/routing` | `report`, `temperature_routing` | Marketing mock uses `POST /v1/heat-intelligence` | Documentation gap for the mock. MCP names may be intentional |
| Credits | Per-endpoint numbers and a plan matrix | "may consume usage or credits" | Hackathon "trial credits." Dashboard marketed as free elsewhere | Documentation gap for MCP cost. Trial terms are unknown |
| Async lifecycle | Submit, poll, stop on completed or failed. Report link is temporary | Same, plus `wait_for_completion`, and `report_read` refreshes an expired link | Not seen | REST and MCP are stronger here than on identifiers |
| Constraints | US-only plans, area caps, 200 km routing distance, date floor 2019-01-01 | Partial, and no credit numbers | Not seen | Suspected incomplete MCP constraint docs |
| Property reports | Named in the introduction. No matching POST in the six-endpoint quickstart | Not in the nine-tool list | Not seen | Suspected missing page or a renamed feature |
| Startup plan | Present in the limitations table | Not mentioned in the introduction's Basic/Premium labels | Startup program exists as a marketing URL | Documentation gap |

## Findings that are already confirmed

1. The docs host was unavailable. HTTP 504, body `upstream request timeout`, at 20:36 UTC on 17 November 2026. The status page at the same time listed the processing APIs and the dashboard as down.
2. The status page listed an MCP incident as still investigating since 14 October 2026, and showed MCP Server as `No data` rather than up or down.
3. The homepage source contains an illustrative payload, `POST /v1/heat-intelligence`, with `location`, `temperature_f`, `risk_level`, `resolution`, `measured_at`, and `credits_remaining`. None of those fields appear in the indexed Heat Intelligence contract. The real path uses an underscore.

## Heat Intelligence units

This is the documentation defect with the most user impact.

On `POST /v1/heat_intelligence` the temperature attribute is "degrees Fahrenheit." The date attribute, on the same page, is "Date for the supplied Celsius temperature." The example sends `82.4`. That number is a plausible Fahrenheit temperature and an implausible air temperature in Celsius.

The MCP `report` tool tells the agent the reference temperature is Celsius. An agent that follows MCP and a backend that follows the Fahrenheit sentence will write a report about the wrong physical temperature and still return `Completed`. Credit would be consumed for a misleading result. Which sentence the server implements is not known.

## Polygon shape

A developer who copies the authentication example sends a FeatureCollection. A developer who copies the heatmap example sends a Polygon. Both pages show a closed ring around lower Manhattan and `granularity: 100`. One of these examples can be wrong while still looking official. Phase 3 should send the invalid shape only as a validation request, after a rejected request has been shown not to create an activity. Do not send both shapes as paid jobs.

## Identifiers

REST has one id. MCP publishes three names, and the heatmap example `hm_123` does not look like the UUID in the Heat Intelligence polling example (`f3e1c68b-1cc3-46bc-8589-1faaf30ef30a`). Possibilities:

- MCP renames `activity_id` per tool, and the `hm_123` example is fictional.
- Heatmap ids really use a different format from report ids.
- `analytics_id` is a second resource, not the activity id, and accepting both is a compatibility shim.

The second and third change how a caller stores work. Phase 4 decides this from the tool schema and one read of an id that REST already returned. That read should not create a new analysis.

## What the docs do well

- The plan matrix states area caps, parameter caps, and premium-only products in one table.
- Credit deduction is tied to `Completed`, and failed processing is documented as free.
- The status code table includes the awkward `404` immediately after submit, which is a real client hazard and is good to document.
- Large heatmap results have an escape hatch, `result_delivery=links`, so a status poll does not have to inline the whole map.
- Environmental missing values are specified: new responses use JSON `null`, older stored responses may use `-999`, and neither means zero.
- MCP tells the agent not to submit a duplicate while a job is processing, and tells it to call `report_read` again when a signed PDF link expires.
- Filter types for a single hour, an hour range, a day, and a short date range are enumerated, including which extra fields each type requires.

## Pages still unread

Because the docs host timed out, these pages were not reviewed as full documents: introduction, quickstart, authentication, limitations, every endpoint page, and every MCP page. The excerpts are specific enough to support the gaps above. They are not specific enough to certify that an error catalog or a credits-usage page is absent.
