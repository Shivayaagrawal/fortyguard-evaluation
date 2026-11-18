# Fresh API design review

18 November 2026. Documentation only, plus the three status reads in `evidence/api-fresh/authentication/`. No analysis POST was sent. No monitor was created, listed, changed, or deleted.

## Naming

The analysis paths are predictable: `POST /v1/heatmap`, `/v1/satellite`, `/v1/streetview`, `/v1/heat_intelligence`, `/v1/env_params`, `/v1/routing`, then `GET /v1/status/{activity_id}`.

Monitor paths are also predictable: `POST /v1/monitors`, `GET /v1/monitors`, `GET /v1/monitors/{monitor_id}`, `PATCH` and `DELETE` on that path, then alerts nested underneath. `PATCH` and `DELETE` match the described edits.

The quickstart says the API offers six POST endpoints. The sidebar also documents `POST /v1/monitors` and the release notes document two credit-usage POSTs. The six-count describes the analysis group only if the reader already knows to ignore the other sections.

Identifier names change by feature:

| Feature | Identifier or location fields |
| --- | --- |
| Status | `activity_id` |
| Environmental parameters, Heat Intelligence, Street View | `latitude`, `longitude` |
| Routing | `origin.lat`, `origin.lon`, `destination.lat`, `destination.lon` |
| Satellite | `sat.latitude`, `sat.longitude` |
| Heatmap | `polygon_aoi` |
| Monitors | `heatmap_id`, `monitor_id`, `alert_id` |

The check-status example sets `activity_id` to `heatmap_abc123`. Monitor examples reuse that style. This pass did not create an id, so the live id format was not observed.

## Requests

Date and time are three different shapes: a `date_time` object, a `date` string, and an ISO-8601 `departure_time`.

Temperature units disagree on Heat Intelligence. The required `temperature` field says degrees Fahrenheit. The `date` field says the date applies to the supplied Celsius temperature. The example sends `82.4`. Environmental parameters require Celsius. Heatmap `tcm` values are Celsius. Monitor rule text allows °C or °F, and the example uses `celsius`.

GeoJSON disagrees. The limitations page says a polygon must be a FeatureCollection with a closed Polygon. The quickstart and authentication examples use a FeatureCollection. The heatmap test request sends a bare Polygon. The create-monitor example sends a bare Polygon.

`back_view` is REQUIRED on the Street View page. The v1.0.0 release note calls the back view optional.

Filter type 4 is documented for heatmaps and in the limitations list. The environmental-parameters and satellite pages list types 1–3 only.

The alert-report prose says to add `/download?type=pdf`. The example on the same page sends `file_type=pdf`.

## Responses

The three fresh status reads share one error object: `error`, `status_code`, and `details.message`. The quickstart table does not show that object. It lists 400 or 422, 401, 403, 404, 429, and 500. This pass saw 401 and 404 only.

The quickstart status table uses Processing, Completed, and Failed. The Python sample also treats `succeeded` and `error` as terminal. The Heat Intelligence sample checks `Completed` and `Failed` only.

Analysis POSTs are documented as asynchronous: the POST returns `data.activity_id`, and the result arrives later on the status route. This pass did not see a submit body or a completed body.

Monitor list and alert list document `limit` and `cursor`. The analysis pages do not document pagination. Heatmap documents `result_delivery=links` for a large completed map.

## Developer experience

A new caller can see the `api-key` header, and the live missing-key error repeats that header name. The first copy-paste examples are heatmap POSTs, which the pages price at 3,500 or 4,220 credits. The environmental-parameters example is the cheapest documented analysis call, at 2,110 or 2,900, and it is not the example in the quickstart.

The credits page asks for a key and does not document the method, path, body, or cost. The release notes name two POST paths. This pass did not call them, because the cost is not stated.

`GET /v1/status/{activity_id}` has no credit line. Every monitor page, including list, get, delete, and alert report, says 3,500 credits per request. The quickstart says credits are deducted only when a task reaches Completed. A caller cannot tell which of those sentences applies to a monitor GET. None of those monitor calls were sent.

## Not claimed

No server handler was inspected. A page that rendered is not proof of runtime behavior. A path named only in prose was not declared missing from the server. The Temperature Property API is named in the release notes and has no sidebar path in this review.
