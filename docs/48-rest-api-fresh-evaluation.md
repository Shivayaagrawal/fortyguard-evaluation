# Fresh REST API evaluation

18 November 2026. Black-box review of the FortyGuard Temperature API. The server source was not inspected. One `POST /v1/env_params` was sent, activity `8c32cb1d-0331-49f5-9302-34b6b9549ed6`, and its status was read once. No heatmap, route, report, satellite job, Street View job, or monitor was created. The form was not submitted.

Reports for the form are in `docs/49-rest-api-google-form-answers.md`.

## 1. Scope and methodology

The official docs were rendered and saved under `evidence/api-fresh/documentation/pages/`. Status reads and one environmental-parameters submission were sent to `https://api.fortyguard.com`. Credentials stayed in the local environment. Saved files say `account-key` or `[redacted]` and do not contain the key.

The functional run is `evidence/api-fresh/functional-test/`. Earlier jobs are not used as this result.

## 2. Documentation review

Twenty-one articles rendered. The sidebar has more than the seven analysis and status routes. Detail: `evidence/api-fresh/documentation/documentation-review.md`.

The credits page rendered and does not document a request. The release notes name `POST /v1/system/fetch-api-key-usage` and `POST /v1/system/fetch-api-key-custom-usage` without a price. The account key was not entered.

## 3. Endpoint inventory

Authentication for every route below is the `api-key` header. The quickstart says there is no OAuth exchange.

| Method and path | Purpose | Async | Documented credit cost | Plan on the page |
| --- | --- | --- | --- | --- |
| `POST /v1/heatmap` | GeoJSON temperature tiles for a polygon | Yes | 3,500 Basic and Startup; 4,220 Premium | Basic and Premium |
| `POST /v1/satellite` | Satellite segmentation | Yes | 14,400 Premium | Premium |
| `POST /v1/streetview` | Street View segmentation | Yes | 8,600 Premium | Premium |
| `POST /v1/heat_intelligence` | Heat Intelligence report | Yes | 8,600 Premium | Premium |
| `POST /v1/env_params` | Point environmental parameters | Yes | 2,110 Basic and Startup; 2,900 Premium | Basic and Premium |
| `POST /v1/routing` | Temperature-aware route | Yes | 3,500 Premium | Premium |
| `GET /v1/status/{activity_id}` | Status and result | Poll | No price on the page | Basic and Premium |
| `POST /v1/monitors` | Create a heatmap monitor | Not stated as an activity | 3,500 per request | Premium |
| `GET /v1/monitors` | List monitors | No | 3,500 per request | Premium |
| `GET /v1/monitors/{monitor_id}` | One monitor | No | 3,500 per request | Premium |
| `PATCH /v1/monitors/{monitor_id}` | Update a monitor | No | 3,500 per request | Premium |
| `DELETE /v1/monitors/{monitor_id}` | Delete a monitor and its alerts | No | 3,500 per request | Premium |
| `GET /v1/monitors/{monitor_id}/alerts` | List alerts | No | 3,500 per request | Premium |
| `GET /v1/monitors/{monitor_id}/alerts/{alert_id}/report` | Alert report or download | No | 3,500 per request | Premium |

`GET /v1/alerts/{alert_id}` is named in the list-alerts prose and has no own page. The Temperature Property API is named in the release notes and has no sidebar path. Neither was called.

### Environmental parameters, the proposed call

Required: `latitude` number, `longitude` number, `temperature` number in Celsius, `date_time` object. `date_time.start_date` is `YYYY-MM-DD`. `date_time.filter_type` is 1, 2, or 3. Type 1 also needs `start_time` as `HH:MM`. Optional: `end_date`, `start_time`, `end_time`, and `analysis` as a string list. Omitting `analysis` means the full set. Basic and Startup are limited to three parameters.

The completed body is documented as `metadata`, `locations`, and parameter arrays. Missing numbers are `null`. Older stored responses may still use `-999`. This pass did not see a body.

### Other constraints worth keeping

Heatmap `polygon_aoi` is required. The limitations page says it must be a FeatureCollection. The heatmap test request is a bare Polygon. Granularity is 20, 60, 80, or 100 metres. Filter types include 4. Basic area cap is 10 mi². Premium is 50 mi².

Street View requires `latitude`, `longitude`, `vertical_angle`, `horizontal_angle`, and `back_view`. The release note calls the back view optional.

Satellite nests the point under `sat` and requires `date_time`.

Heat Intelligence requires `latitude`, `longitude`, `temperature`, `date`, and `analysis`. The temperature field says Fahrenheit. The date sentence says Celsius. The example is 82.4 on 2024-07-15 with `analysis: ["environmental"]`. The completed status returns `data.result.download_link`, not the PDF.

Routing requires `origin`, `destination`, and ISO-8601 `departure_time`. Latitude is -90 to 90 and longitude is -180 to 180 on that page. Straight-line distance maximum is 200 km. Premium only.

The limitations page says out-of-range coordinates, a bad polygon, and a bad date return 400 and are not charged. Coverage is the United States. The earliest default date is 2019-01-01.

## 4. Authentication results

All three used `GET /v1/status/00000000-0000-4000-8000-000000000001`.

| Test | Result |
| --- | --- |
| API-001, no header | HTTP 401 in 1,223 ms. "Missing required 'api-key' header. Send your key in the 'api-key' request header." |
| API-002, dummy key | HTTP 401 in 373 ms. "Invalid or unknown API key." |
| API-003, account key, synthetic id | HTTP 404 in 630 ms. "No activity found for the provided activity_id." |

Each body is `{"error": true, "status_code": N, "details": {"message": "..."}}` and `application/json`. The quickstart's 401 and 404 lines match these meanings. The quickstart does not show the JSON. Write-ups: `evidence/api-fresh/authentication/`.

## 5. Validation results

Eight invalid `POST /v1/env_params` bodies were prepared and not sent. The limitations page says the coordinate-range and date-format cases return 400 and are not charged. That claim was not tested. Detail: `evidence/api-fresh/validation/validation-results.md`.

## 6. Successful request

Sent once at 2026-11-18T16:10:24Z. The body was the documented New York example: latitude 40.7128, longitude -74.006, temperature 32.5, start date 2024-07-15, start time 14:00, filter type 1. No optional `analysis` list was added.

`POST /v1/env_params` returned HTTP 200 in 1,525 ms.

```json
{
  "error": false,
  "status_code": 200,
  "message": "Environment Parameters Analysis Submitted Successfully",
  "data": { "activity_id": "8c32cb1d-0331-49f5-9302-34b6b9549ed6" }
}
```

The POST did not return measurements. There is no documented read-only balance route, and the release-note usage paths have no request body or price, so they were not called. Plan and credits consumed are not verifiable. The documented price of a completed call is 2,900 on Premium and 2,110 on Basic or Startup.

## 7. Status workflow

One `GET /v1/status/8c32cb1d-0331-49f5-9302-34b6b9549ed6` was sent 3,879 ms after the submit response. HTTP 200, 1,190 bytes, `data.status` and `message` were `Completed`. No `Processing` response was observed. The result was in that same body, under `data.result`. No second retrieval and no second poll were required.

Observed result:

- Timezone `America/New_York`, offset `-4`, timestamp `2024-07-15T14:00:00-04:00`. The range has one hour.
- Location `lat` 40.7128, `lon` -74.006, elevation 32, temperature 32.5. The request fields were `latitude` and `longitude`.
- Parameter names carry units: `heat_index_celsius` 36.2, `apparent_temperature_celsius` 37.9, `wet_bulb_temperature_celsius` 25.9, humidity 53.4, precipitation 0, cloud cover 8, and US AQI fields. `methane_ppb` and `co2_ppm` are `null`.
- Solar clear-sky GHI 898.69, DNI 827.19, DHI 136.76. The description says W/m².
- No credit field.

The values are recorded as returned. They were not checked against an independent weather source. The null gas values match the documented rule that missing numbers are `null`, not zero. Precipitation `0` is distinct from those nulls.

## 8. API design

The analysis paths and the `api-key` header are consistent. Location fields, date fields, temperature units, and GeoJSON examples are not. Monitor reads are priced like analysis jobs, while the quickstart says credits are taken only when a task completes. Detail: `evidence/api-fresh/documentation/api-design-review.md`.

## 9. Performance and reliability

The authenticated synthetic status read took 1,234 ms and returned 404. The New York submit took 1,525 ms. The completed status was available on the first poll, 3,879 ms after that response. One sample is not a performance claim. Rate-limit numbers, server timeouts, idempotency, and retry rules remain `NOT DOCUMENTED` or only partly documented. Detail: `evidence/api-fresh/performance/reliability-review.md`.

## 10. Findings

| Finding | Area | Observation | Evidence | Severity | Class |
| --- | --- | --- | --- | --- | --- |
| API-F001 | Documentation | Heat Intelligence `temperature` says Fahrenheit. The `date` sentence says Celsius. The example is 82.4. Environmental parameters and heatmap tiles say Celsius. | `pages/heat-intelligence.md`, `pages/environmental-parameters.md` | High | Design inconsistency |
| API-F002 | Authentication | Missing and invalid keys return 401 with different, specific messages. An unknown id returns 404. The shared JSON body is not in the quickstart. | `evidence/api-fresh/authentication/` | Low for the missing example | Confirmed behavior, plus a documentation gap |
| API-F003 | Validation | Eight invalid bodies were not sent. The limitations page says some of them return 400 and are not charged. | `validation/validation-results.md`, `pages/limitations.md` | — | Untested |
| API-F004 | Request design | Limitations require a GeoJSON FeatureCollection. The heatmap test request and the create-monitor example send a bare Polygon. The quickstart sends a FeatureCollection. | `pages/limitations.md`, `pages/create-heatmap.md`, `pages/monitoring-create.md`, `pages/quickstart.md` | High | Design inconsistency |
| API-F005 | Developer experience | The credits page has no path or cost. The release notes name two usage POSTs and do not price them. The live balance was not read. | `pages/credits-usage.md`, `pages/release-notes.md` | Medium | Documentation gap |
| API-F006 | Documentation | The quickstart counts six POST endpoints and lists Completed and Failed. The sample also accepts `succeeded` and `error`. The sidebar also documents monitors. | `pages/quickstart.md`, monitor pages | Medium | Documentation gap |
| API-F007 | Billing docs | Every monitor call, including GET and DELETE, is priced at 3,500. The quickstart says credits are deducted only when a task reaches Completed. | Monitor pages, `pages/quickstart.md` | Medium | Design inconsistency in the docs. Not executed. |
| API-F008 | Reliability | The documented New York `env_params` call returned an activity id in 1,525 ms and was `Completed` on the first status read. | `evidence/api-fresh/functional-test/` | — | Confirmed runtime success for this one job |
| API-F009 | Documentation | Street View marks `back_view` required. The v1.0.0 note calls the back view optional. The alert-report prose uses `type`, and the example uses `file_type`. | `pages/street-view-segmentation.md`, `pages/release-notes.md`, `pages/monitoring-report.md` | Medium | Documentation gap |
| API-F010 | Catalogue | Temperature Property Reports and the Temperature Property API are named. No sidebar path was found. | `pages/introduction.md`, `pages/release-notes.md` | Low | Functionality not found in the nav. Not proof of absence. |

## 11. Three recommendations

1. **Use one temperature unit on Heat Intelligence.** The field says Fahrenheit, the date sentence says Celsius, and the example is 82.4. A caller can submit a Celsius value the server reads as Fahrenheit, or the reverse. Priority: High.

2. **Generate every polygon example from the limitations rule.** That page requires a closed Polygon inside a FeatureCollection. The heatmap test request and the monitor example are bare Polygons, so a developer who copies the endpoint page can violate the constraint page. Priority: High.

3. **Publish one billing rule and a balance request.** Status has no price. Monitor reads are priced at 3,500 each. The quickstart says a charge happens only when a task completes. The credits page does not show a path or a cost. A caller cannot price the first request or the balance check. Priority: High.

## 12. Rating

**6/10** for the surface that was actually used: status authentication, one completed environmental-parameters job, and the documentation required to make that call.

The documented example was accepted, the activity id worked, and the result was usable: the coordinate matched, the timestamp carried the New York offset, the derived temperatures were named in Celsius, and missing gas values were null. The score stays at 6 because a caller still has to resolve the Heat Intelligence unit, the polygon examples, and the billing pages, and this completed body does not show what it cost. Validation was not tested. Heatmap, routing, imagery, and monitors were not called, so this is not a score of those routes.

## 13. Untested

- Eight invalid `POST /v1/env_params` bodies.
- Heatmap, routing, Heat Intelligence, Street View, and satellite.
- Every monitor and alert route. DELETE was not attempted.
- Both credit-usage POSTs named in the release notes. Plan and balance were not retrieved.
- The free-key form.
- HTTP 400, 403, 422, 429, and 500.
- A `Processing` status. This job was already `Completed` on the first poll.
- The credit deduction. The completed body has no credit field.
- Server implementation, rate-limit behavior, and scalability.

## 14. Documentation findings after the functional test

| Finding | Class |
| --- | --- |
| Heat Intelligence Fahrenheit versus Celsius | Confirmed documentation inconsistency. Runtime not tested. |
| Polygon versus FeatureCollection | Confirmed documentation inconsistency. Runtime not tested. |
| Status words `succeeded` and `error` versus Completed and Failed | This job returned `Completed`. The extra sample words were not returned. Unable to verify the aliases. |
| Monitor price of 3,500 on GET and DELETE versus charge-only-on-Completed | Confirmed documentation inconsistency. Runtime not tested. |
| Credit-balance request details | Confirmed documentation gap. Balance not retrieved. |
| Street View `back_view` required versus optional | Confirmed documentation inconsistency. Runtime not tested. |
| Alert report `type` versus `file_type` | Confirmed documentation inconsistency. Runtime not tested. |
| Location and date names | Confirmed on this job: the request uses `latitude`, `longitude`, and `date_time`; the result uses `lat`, `lon`, and an offset timestamp. Other endpoints were not called. |
