# REST API evidence — full consolidated capture

18 November 2026. Full verbatim contents of the current `evidence/api-fresh` evaluation artifacts referenced by `docs/48-rest-api-fresh-evaluation.md` and `docs/49-rest-api-google-form-answers.md`. Credentials remain redacted as in the source files (`[redacted]`, `account-key`).

Absolute base: `/Users/shivanyaagrawal/fourty/fortyguard-evaluation/evidence/api-fresh/`


---

## Authentication — missing-key.md

Source path: `authentication/missing-key.md`

# API-001 Missing API key

18 November 2026. Fresh request. This is not a copy of an earlier status file.

| Field | Value |
| --- | --- |
| Method and path | `GET /v1/status/00000000-0000-4000-8000-000000000001` |
| Authorization | Header absent |
| Accept | `application/json` |
| HTTP status | 401 |
| Content type | `application/json` |
| Elapsed | 1,223 ms |
| Body size | 138 bytes |

Response body:

```json
{
  "error": true,
  "status_code": 401,
  "details": {
    "message": "Missing required 'api-key' header. Send your key in the 'api-key' request header."
  }
}
```

The message names the header and tells the caller where to send it. The quickstart lists 401 as "Missing or invalid API key." The live body matches that meaning. The quickstart does not show this JSON envelope.

Raw file: `evidence/api-fresh/authentication/missing-key.json`.


---

## Authentication — missing-key.json

Source path: `authentication/missing-key.json`

```json
{
  "id": "API-001",
  "at": "2026-11-18T14:52:47.254Z",
  "elapsedMs": 1223,
  "request": {
    "method": "GET",
    "path": "/v1/status/00000000-0000-4000-8000-000000000001",
    "authorization": "absent",
    "accept": "application/json"
  },
  "response": {
    "status": 401,
    "contentType": "application/json",
    "bytes": 138,
    "body": {
      "error": true,
      "status_code": 401,
      "details": {
        "message": "Missing required 'api-key' header. Send your key in the 'api-key' request header."
      }
    }
  }
}
```


---

## Authentication — invalid-key.md

Source path: `authentication/invalid-key.md`

# API-002 Invalid API key

18 November 2026. Fresh request. The dummy key was `invalid-evaluation-key`. It is not an account key.

| Field | Value |
| --- | --- |
| Method and path | `GET /v1/status/00000000-0000-4000-8000-000000000001` |
| Authorization | `api-key` set to a dummy value |
| Accept | `application/json` |
| HTTP status | 401 |
| Content type | `application/json` |
| Elapsed | 373 ms |
| Body size | 84 bytes |

Response body:

```json
{
  "error": true,
  "status_code": 401,
  "details": {
    "message": "Invalid or unknown API key."
  }
}
```

The message is specific. It does not echo the supplied key. It uses the same `error`, `status_code`, and `details.message` shape as the missing-key response. The quickstart groups missing and invalid keys under one 401 line. The two live messages are different, which is more useful than that single line.

Raw file: `evidence/api-fresh/authentication/invalid-key.json`.


---

## Authentication — invalid-key.json

Source path: `authentication/invalid-key.json`

```json
{
  "id": "API-002",
  "at": "2026-11-18T14:52:47.632Z",
  "elapsedMs": 373,
  "request": {
    "method": "GET",
    "path": "/v1/status/00000000-0000-4000-8000-000000000001",
    "authorization": "invalid-dummy-key",
    "accept": "application/json"
  },
  "response": {
    "status": 401,
    "contentType": "application/json",
    "bytes": 84,
    "body": {
      "error": true,
      "status_code": 401,
      "details": {
        "message": "Invalid or unknown API key."
      }
    }
  }
}
```


---

## Authentication — unknown-activity.md

Source path: `authentication/unknown-activity.md`

# API-003 Unknown activity ID

18 November 2026. Fresh request. The account key was sent and is not stored in this file. The activity id is a synthetic UUID, `00000000-0000-4000-8000-000000000001`. It is not an id returned by a job in this pass.

| Field | Value |
| --- | --- |
| Method and path | `GET /v1/status/00000000-0000-4000-8000-000000000001` |
| Authorization | Account key in `api-key` |
| Accept | `application/json` |
| HTTP status | 404 |
| Content type | `application/json` |
| Elapsed | 630 ms |
| Body size | 104 bytes |

Response body:

```json
{
  "error": true,
  "status_code": 404,
  "details": {
    "message": "No activity found for the provided activity_id."
  }
}
```

The message names `activity_id`. The quickstart lists 404 as "Activity not found or temporarily unavailable immediately after submission." This response matches the not-found half of that sentence. It does not say whether the id was malformed or simply absent. The check-status example uses `heatmap_abc123`, which was not requested in this test.

Raw file: `evidence/api-fresh/authentication/unknown-activity.json`.


---

## Authentication — unknown-activity.json

Source path: `authentication/unknown-activity.json`

```json
{
  "id": "API-003",
  "at": "2026-11-18T14:52:48.263Z",
  "elapsedMs": 630,
  "request": {
    "method": "GET",
    "path": "/v1/status/00000000-0000-4000-8000-000000000001",
    "authorization": "account-key",
    "accept": "application/json"
  },
  "response": {
    "status": 404,
    "contentType": "application/json",
    "bytes": 104,
    "body": {
      "error": true,
      "status_code": 404,
      "details": {
        "message": "No activity found for the provided activity_id."
      }
    }
  }
}
```


---

## Functional test — execution-notes.md

Source path: `functional-test/execution-notes.md`

# Functional test notes

18 November 2026, 16:10 UTC. One `POST /v1/env_params`, then one status read. No retry. No other paid route.

The API key was present in the local environment and was not printed. A search of the repository, excluding `.env`, found no copy of the key. `FORTYGUARD_API_BASE_URL` is `https://api.fortyguard.com`. `FORTYGUARD_ALLOW_PAID` stayed false. This script was the one authorized exception and wrote `SUBMITTED.lock` before the POST so a second run cannot submit again.

## Account

No read-only balance endpoint is documented. The credits page is a form. The release notes name `POST /v1/system/fetch-api-key-usage` and `POST /v1/system/fetch-api-key-custom-usage` without a body or a price, so they were not called. Plan and available credits were not retrieved.

## Authentication

`GET /v1/status/00000000-0000-4000-8000-000000000001` with the account key returned HTTP 404 in 1,234 ms. Content type `application/json`. Body: `error` true, `status_code` 404, message "No activity found for the provided activity_id." A 404 rather than 401 means the key was accepted.

## Submission

HTTP 200 in 1,525 ms. Message: "Environment Parameters Analysis Submitted Successfully." Activity id `8c32cb1d-0331-49f5-9302-34b6b9549ed6`. The body contained no measurements and no credit field.

## Lifecycle

The first status read, 3,879 ms later, was HTTP 200 and `Completed`. No intermediate `Processing` body was seen. The measurements were in `data.result` on that response. Polling stopped.

## Credits

Not verifiable. The completed body has no credit field. The documented price of a completed call is 2,900 on Premium and 2,110 on Basic or Startup. This run does not establish which figure applied.

## Result check

The coordinate matches the request. The timestamp is `2024-07-15T14:00:00-04:00` in `America/New_York`. Derived temperature fields end in `_celsius`. `methane_ppb` and `co2_ppm` are null. Precipitation is 0. Solar values include a W/m² description. No scientific comparison was made.


---

## Functional test — 01-auth-status.json

Source path: `functional-test/01-auth-status.json`

```json
{
  "at": "2026-11-18T16:10:23.157Z",
  "request": {
    "method": "GET",
    "path": "/v1/status/00000000-0000-4000-8000-000000000001",
    "authorization": "account-key"
  },
  "response": {
    "status": 404,
    "contentType": "application/json",
    "elapsedMs": 1234,
    "bytes": 104,
    "body": {
      "error": true,
      "status_code": 404,
      "details": {
        "message": "No activity found for the provided activity_id."
      }
    }
  }
}
```


---

## Functional test — 02-request-redacted.json

Source path: `functional-test/02-request-redacted.json`

```json
{
  "method": "POST",
  "path": "/v1/env_params",
  "headers": {
    "api-key": "[redacted]",
    "accept": "application/json",
    "content-type": "application/json"
  },
  "body": {
    "latitude": 40.7128,
    "longitude": -74.006,
    "temperature": 32.5,
    "date_time": {
      "start_date": "2024-07-15",
      "start_time": "14:00",
      "filter_type": 1
    }
  },
  "documentedPremiumCredits": 2900,
  "documentedBasicOrStartupCredits": 2110
}
```


---

## Functional test — 03-submit-response.json

Source path: `functional-test/03-submit-response.json`

```json
{
  "at": "2026-11-18T16:10:24.687Z",
  "response": {
    "status": 200,
    "contentType": "application/json",
    "elapsedMs": 1525,
    "bytes": 162,
    "body": {
      "error": false,
      "status_code": 200,
      "message": "Environment Parameters Analysis Submitted Successfully",
      "data": {
        "activity_id": "8c32cb1d-0331-49f5-9302-34b6b9549ed6"
      }
    }
  }
}
```


---

## Functional test — 04-status-polls.json

Source path: `functional-test/04-status-polls.json`

```json
[
  {
    "attempt": 1,
    "at": "2026-11-18T16:10:28.567Z",
    "elapsedSinceSubmitMs": 3879,
    "http": 200,
    "contentType": "application/json",
    "bytes": 1190,
    "status": "Completed"
  }
]
```


---

## Functional test — 05-final-status.json

Source path: `functional-test/05-final-status.json`

```json
{
  "activityId": "8c32cb1d-0331-49f5-9302-34b6b9549ed6",
  "pollCount": 1,
  "final": {
    "error": false,
    "status_code": 200,
    "message": "Completed",
    "data": {
      "activity_id": "8c32cb1d-0331-49f5-9302-34b6b9549ed6",
      "status": "Completed",
      "result": {
        "metadata": {
          "timezone": "America/New_York",
          "timezone_offset_hours": -4,
          "time_range": {
            "start": "2024-07-15T14:00:00-04:00",
            "end": "2024-07-15T14:00:00-04:00",
            "interval": "1h",
            "count": 1
          },
          "timestamps": [
            "2024-07-15T14:00:00-04:00"
          ]
        },
        "locations": [
          {
            "lat": 40.7128,
            "lon": -74.006,
            "elevation": 32,
            "temperature": 32.5,
            "parameters": {
              "heat_index_celsius": [
                36.2
              ],
              "apparent_temperature_celsius": [
                37.9
              ],
              "relative_humidity_percent": [
                53.4
              ],
              "precipitation_mm": [
                0
              ],
              "cloud_cover_octas": [
                8
              ],
              "wet_bulb_temperature_celsius": [
                25.9
              ],
              "air_quality:idx": [
                87.3
              ],
              "air_quality_pm2p5:idx": [
                78.1
              ],
              "air_quality_pm10:idx": [
                31.1
              ],
              "air_quality_no2:idx": [
                4.1
              ],
              "aqi_us_co": [
                2.9
              ],
              "air_quality_o3:idx": [
                87.3
              ],
              "air_quality_so2:idx": [
                5.5
              ],
              "methane_ppb": [
                null
              ],
              "co2_ppm": [
                null
              ]
            },
            "solar_irradiance": {
              "clear_sky": {
                "ghi": 898.69,
                "dni": 827.19,
                "dhi": 136.76
              },
              "description": "These modeled clear-sky irradiance estimates in W/m² describe the specific location at 2024-07-15 14:00. GHI is global horizontal irradiance, DNI is direct normal irradiance, and DHI is diffuse horizontal irradiance."
            }
          }
        ]
      }
    }
  }
}
```


---

## Successful request — execution-notes.md

Source path: `successful-request/execution-notes.md`

# Successful request was not sent in the first pass

A later authorized run sent one New York request. That result is `evidence/api-fresh/functional-test/`. The notes below record why the first pass stopped.

## Why it stopped

| Precondition | Result |
| --- | --- |
| Schema confirmed | Yes. The environmental-parameters page requires `latitude`, `longitude`, Celsius `temperature`, and `date_time`, with `filter_type` 1 requiring `start_date` and `start_time`. |
| Documented cost | 2,110 credits on Basic and Startup. 2,900 credits on Premium. The limitations table matches those numbers. The quickstart says the charge happens when status becomes Completed. |
| Live balance | Not read. `/docs/credits-usage` is a key form with no path, body, or cost. The release notes name `POST /v1/system/fetch-api-key-usage` and `POST /v1/system/fetch-api-key-custom-usage` and do not price them. The account key was not submitted. |
| Plan | Not confirmed in this pass. The cost therefore cannot be pinned to 2,110 or 2,900 for this account. |
| Authorization | The run instruction is to show this payload and cost before any successful call. |

## Proposed body

The body in `request-redacted.json` is the documented New York example: latitude 40.7128, longitude -74.006, temperature 32.5, start date 2024-07-15, start time 14:00, filter type 1. The page says the temperature is Celsius. The coordinate is inside the United States.

If this account is Premium and the task reaches Completed, the documented charge is 2,900 credits. If it is Basic or Startup, the documented charge is 2,110, and Basic or Startup may return only three parameters unless `analysis` is limited. The proposed body omits `analysis`, which the page says means the full set.

No response fields, temperature, timestamp, or duration are claimed.


---

## Successful request — request-redacted.json

Source path: `successful-request/request-redacted.json`

```json
{
  "executed": false,
  "reason": "Waiting for review. A completed Premium call is documented at 2900 credits. Basic and Startup are documented at 2110. This pass did not confirm the live plan or balance.",
  "method": "POST",
  "path": "/v1/env_params",
  "headers": {
    "api-key": "[redacted]",
    "content-type": "application/json",
    "accept": "application/json"
  },
  "body": {
    "latitude": 40.7128,
    "longitude": -74.006,
    "temperature": 32.5,
    "date_time": {
      "start_date": "2024-07-15",
      "start_time": "14:00",
      "filter_type": 1
    }
  },
  "source": "Example on https://docs-api.fortyguard.com/docs/environmental-parameters, captured 2026-11-18.",
  "temperature_unit_in_docs": "Celsius"
}
```


---

## Successful request — response-redacted.json

Source path: `successful-request/response-redacted.json`

```json
{
  "executed": false,
  "http_status": null,
  "body": null,
  "reason": "POST /v1/env_params was not sent."
}
```


---

## Status workflow — status-evaluation.md

Source path: `status-workflow/status-evaluation.md`

# Status workflow

18 November 2026. No new activity was created, so there is no initial, subsequent, or final status for a job from this pass.

The documented workflow is: `POST` returns `data.activity_id`, then `GET /v1/status/{activity_id}` until Processing ends. Completed carries the result. Failed stops the poll. The quickstart sample also treats `succeeded` and `error` as terminal. Credits are documented as deducted only on Completed.

The three status reads in this pass used a synthetic id and exercised the error path only:

| Read | HTTP | Elapsed | Message |
| --- | --- | --- | --- |
| Missing key | 401 | 1,223 ms | Missing required `api-key` header. |
| Invalid key | 401 | 373 ms | Invalid or unknown API key. |
| Unknown id, account key | 404 | 630 ms | No activity found for the provided activity_id. |

Those bodies are errors. They do not show a processing lifecycle, a result payload, or a failure payload for an accepted task.

`GET /v1/status/{activity_id}` has no credit line on its page. These three reads are the only status calls in this pass.


---

## Documentation — documentation-review.md

Source path: `documentation/documentation-review.md`

# Fresh REST documentation review

Captured 18 November 2026 from the rendered articles at `https://docs-api.fortyguard.com`. Page text is in `evidence/api-fresh/documentation/pages/`. This review does not reuse an earlier write-up as the evidence.

## Pages read

| Page | HTTP | Article extracted |
| --- | --- | --- |
| `/docs/introduction` | 200 | Yes |
| `/docs/quickstart` | 200 | Yes |
| `/docs/authentication` | 200 | Yes |
| `/docs/create-heatmap` | 200 | Yes |
| `/docs/satellite-view-segmentation` | 200 | Yes |
| `/docs/street-view-segmentation` | 200 | Yes |
| `/docs/heat-intelligence` | 200 | Yes |
| `/docs/environmental-parameters` | 200 | Yes |
| `/docs/routing` | 200 | Yes |
| `/docs/check-status` | 200 | Yes |
| `/docs/credits-usage` | 200 | Yes. The article is a key form, not a request contract. |
| `/docs/generate-free-key` | 200 | Yes. The article is an email form. It was not submitted. |
| `/docs/limitations` | 200 | Yes |
| `/docs/release-notes` | 200 | Yes |
| `/docs/monitoring-create` | 200 | Yes |
| `/docs/monitoring-list` | 200 | Yes |
| `/docs/monitoring-get` | 200 | Yes |
| `/docs/monitoring-update` | 200 | Yes |
| `/docs/monitoring-delete` | 200 | Yes |
| `/docs/monitoring-alerts` | 200 | Yes |
| `/docs/monitoring-report` | 200 | Yes |

The older slugs `/docs/streetview` and `/docs/satellite` were not used. The sidebar links to `/docs/street-view-segmentation` and `/docs/satellite-view-segmentation`, and both articles rendered.

## Quality checklist

| Question | Result |
| --- | --- |
| Required and optional fields identified? | Yes on the endpoint pages, with REQUIRED and OPTIONAL labels. |
| Types and ranges specified? | Types are labeled. Latitude and longitude ranges are on the limitations page and the routing page, not on the environmental-parameters page. |
| Date and time formats consistent? | No. Most analysis calls use a `date_time` object. Heat Intelligence uses a `date` string. Routing uses an ISO-8601 `departure_time`. |
| Temperature units clear? | No. Environmental parameters and heatmap tiles say Celsius. Heat Intelligence says Fahrenheit in the field and Celsius in the date sentence. The example value is 82.4. |
| GeoJSON examples consistent? | No. The limitations page requires a FeatureCollection. The quickstart uses one. The heatmap test request and the create-monitor example use a bare Polygon. |
| Success examples complete? | The visible text describes result fields. The Response tab content was not a separate example body in the extracted text. The quickstart shows how to read `data.activity_id` and `data.status`. |
| Error examples provided? | The quickstart has a status table and no JSON body. |
| Async workflow explained? | Yes for the analysis POSTs. Submit, receive `activity_id`, poll `GET /v1/status/{activity_id}`. |
| Credit costs and plans visible? | Yes on the analysis and monitor pages, and again in the limitations table. The credits-usage page does not show a cost. The introduction plan labels omit Startup, which the limitations table includes. |
| Can a developer integrate without guessing? | Not for Heat Intelligence's unit, the polygon shape, the status-word aliases, or the balance request. |

## Billing sentences

The quickstart says credits are deducted only after status `Completed`. The limitations page repeats that, and it says requests that violate the listed input constraints return 400 and are not charged. Failed tasks are not charged.

Those sentences were not verified with a POST in this pass.

## Named, without a path in the sidebar

The introduction says the API powers Heat Intelligence and Temperature Property Reports. The release notes say API Premium includes the Temperature Property API. No sidebar entry gives that report a path. This review did not find the endpoint. That is not proof the route is absent.

`GET /v1/alerts/{alert_id}` is named in the list-alerts prose and has no own page in the sidebar.

The release notes name `POST /v1/system/fetch-api-key-usage` and `POST /v1/system/fetch-api-key-custom-usage`. The credits page does not show either path, a body, or a cost. The page DOM has an "Enter your API key" field and no form action. The key was not entered.


---

## Documentation — api-design-review.md

Source path: `documentation/api-design-review.md`

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


---

## Validation — validation-results.md

Source path: `validation/validation-results.md`

# Validation cases prepared, not sent

18 November 2026. None of these requests were sent.

The target is `POST /v1/env_params`. The valid body below is the example on `/docs/environmental-parameters`. The documented Premium cost of a completed call is 2,900 credits. Basic and Startup are documented at 2,110. The limitations page says requests that violate its listed constraints return HTTP 400 and are not charged. That sentence was not verified live. A POST was not sent, because an accepted body can still become a completed task and the successful call is waiting for review.

## Valid body used as the base

```json
{
  "latitude": 40.7128,
  "longitude": -74.006,
  "temperature": 32.5,
  "date_time": {
    "start_date": "2024-07-15",
    "start_time": "14:00",
    "filter_type": 1
  }
}
```

`temperature` is documented as Celsius. The New York coordinate is inside the United States, which the limitations page says is the current coverage.

## Cases

| Test | Change | Documented expectation | This pass |
| --- | --- | --- | --- |
| API-004 | `{}` | Not named in the uncharged constraint list. Quickstart lists 400 or 422 for a validation error. | `NOT EXECUTED — BILLING SAFETY` |
| API-005 | `latitude` omitted | Required on the endpoint page. Not in the uncharged list. | `NOT EXECUTED — BILLING SAFETY` |
| API-006 | `"latitude": "40.7128"` | Type is number. Not in the uncharged list. | `NOT EXECUTED — BILLING SAFETY` |
| API-007 | `"latitude": 120` | Limitations: latitude must be in [-90, 90], and a violating request returns 400 and is not charged. | `NOT EXECUTED — BILLING SAFETY` |
| API-008 | `"longitude": 200` | Limitations: longitude must be in [-180, 180], same 400 sentence. | `NOT EXECUTED — BILLING SAFETY` |
| API-009 | `"start_date": "07/15/2024"` | Limitations: `start_date` must be `YYYY-MM-DD`, same 400 sentence. | `NOT EXECUTED — BILLING SAFETY` |
| API-010 | `"analysis": "heat_index_celsius"` | The field is documented as `string[]`. Not in the uncharged list. | `NOT EXECUTED — BILLING SAFETY` |
| API-011 | extra `"unused_field": true` | Unknown fields are not discussed. | `NOT EXECUTED — BILLING SAFETY` |

API-007, API-008, and API-009 are the cases the limitations page explicitly says are rejected and not charged. They were still not sent. The other five are not covered by that sentence.

No HTTP status, error body, or field-level message is claimed for these cases.


---

## Performance — reliability-review.md

Source path: `performance/reliability-review.md`

# Performance and reliability

18 November 2026. The status reads below, plus one later environmental-parameters submit, were executed. No load, concurrency, or repeated paid call was made. These durations do not support a scalability claim.

| Request | HTTP | Elapsed | Bytes | Content type |
| --- | --- | --- | --- | --- |
| `GET /v1/status/{synthetic}` with no key | 401 | 1,223 ms | 138 | `application/json` |
| Same path, dummy key | 401 | 373 ms | 84 | `application/json` |
| Same path, account key | 404 | 630 ms | 104 | `application/json` |
| Same path, account key, functional pass | 404 | 1,234 ms | 104 | `application/json` |
| `POST /v1/env_params`, New York example | 200 | 1,525 ms | 162 | `application/json` |
| Status of that activity, first poll | 200 | 3,879 ms after the submit response | 1,190 | `application/json` |

Each case was sent once. Repeated consistency was not measured. No successful analysis duration exists for this pass.

## What the documentation says

| Topic | Documentation | Classification |
| --- | --- | --- |
| Rate limits | Quickstart lists HTTP 429 as "Rate limit exceeded" and gives no number. The release notes say the limitations page documents rate limits. The captured limitations article has no rate-limit number. | Numeric limit `NOT DOCUMENTED`. |
| Pagination | Monitor list and alert list document `limit` (1–100, default 25) and `cursor`. Analysis routes do not. Heatmap documents `result_delivery=links` for a large completed map. | Partial. |
| Request timeouts | The Heat Intelligence sample sets a client timeout of 30 seconds and polls up to 120 times. No server timeout is stated. | Server timeout `NOT DOCUMENTED`. |
| Retry | The quickstart says to keep polling while Processing and to stop on Failed. It does not say how to retry HTTP 429 or 500. | Retry rule `NOT DOCUMENTED` beyond polling. |
| Idempotency | No idempotency key on the REST pages read here. | `NOT DOCUMENTED`. |
| Async jobs | Analysis POSTs return `activity_id`. Status words are Processing, Completed, and Failed, and the sample also accepts `succeeded` and `error`. | Documented, not executed. |
| Availability | No status or uptime section on the pages read here. | `NOT DOCUMENTED` in this set. |

None of the missing items is recorded as an implementation defect.


---

## Screenshots — README.md

Source path: `screenshots/README.md`

# Screenshots

No screenshot was saved. The fresh documentation evidence is the rendered article text in `evidence/api-fresh/documentation/pages/`. The fresh runtime evidence is the three redacted status responses in `evidence/api-fresh/authentication/`.


---

## Documentation pages — full captures

Source folder: `documentation/pages/`


---

### documentation/pages/authentication.md

Source path: `documentation/pages/authentication.md`

# /docs/authentication

Captured: 2026-11-18T14:52:19.226Z
HTTP 200
Elapsed ms: 30973
H1: Authentication

API Documentation
⌘K
GUIDES
Introduction
Quickstart
Authentication
MCP
MCP Overview
MCP Quickstart
MCP Authentication
Available Tools
Client Setup
Troubleshooting
INTEGRATIONS
QGIS
ANALYSIS ENDPOINTS
Create Heatmap
POST
Satellite View Segmentation
POST
Street View Segmentation
POST
Heat Intelligence
POST
Environmental Parameters
POST
Temperature-Aware Routing
POST
MONITORING & ALERTING
Monitors
Alerts
TASK MANAGEMENT
Check Status
GET
Check API Credits Usage
GET
RESOURCES
Get a Free API Key
POST
Known Limitations
Release Notes
Authentication

FortyGuard's Enterprise API uses API key–based authentication to ensure secure and controlled access to all endpoints.

Every request to the API must include a valid API Key provided to you upon registration or via your organization's FortyGuard admin console.

Authentication is handled via request headers, making integration lightweight and straightforward. No OAuth flow or token exchange is required.

Header Format

Include your API key in the header of every request as follows:

api-key: YOUR_API_KEY
Copy
Example (Python)

Below is a simple Python example using the requests library to authenticate and call the Heatmap Generation endpoint:

import requests

url = "https://api.fortyguard.com/v1/heatmap"
headers = {
    "api-key": "YOUR_API_KEY",
    "Content-Type": "application/json"
}
payload = {
    "polygon_aoi": {
        "type": "FeatureCollection",
        "features": [
            {
                "type": "Feature",
                "properties": {},
                "geometry": {
                    "type": "Polygon",
                    "coordinates": [[
                        [-74.0170, 40.7050],
                        [-74.0030, 40.7050],
                        [-74.0030, 40.7180],
                        [-74.0170, 40.7180],
                        [-74.0170, 40.7050]
                    ]]
                }
            }
        ]
    },
    "date_time": {
        "start_date": "2024-07-15",
        "start_time": "14:00",
        "filter_type": 1
    },
    "granularity": 100
}

response = requests.post(url, headers=headers, json=payload)

if response.status_code == 200:
    print("Request successful!")
    print(response.json())
else:
    print(f"Error {response.status_code}: {response.text}")
Copy
On this page
Header Format
Example (Python)
PREVIOUS
Quickstart
NEXT
MCP Overview


---

### documentation/pages/check-status.md

Source path: `documentation/pages/check-status.md`

# /docs/check-status

Captured: 2026-11-18T14:55:59.862Z
HTTP 200
Elapsed ms: 34031
H1: Check Status

API Documentation
⌘K
GUIDES
Introduction
Quickstart
Authentication
MCP
MCP Overview
MCP Quickstart
MCP Authentication
Available Tools
Client Setup
Troubleshooting
INTEGRATIONS
QGIS
ANALYSIS ENDPOINTS
Create Heatmap
POST
Satellite View Segmentation
POST
Street View Segmentation
POST
Heat Intelligence
POST
Environmental Parameters
POST
Temperature-Aware Routing
POST
MONITORING & ALERTING
Monitors
Alerts
TASK MANAGEMENT
Check Status
GET
Check API Credits Usage
GET
RESOURCES
Get a Free API Key
POST
Known Limitations
Release Notes
Check Status
GET
/v1/status/{activity_id}

This endpoint allows you to check the status of any submitted activity using the unique activity ID. When the activity is completed, the response will include the final results and output data.

Available in
API BASIC
API PREMIUM
Required attributes
Required attributes
activity_id
string
REQUIRED

Unique identifier for the activity (returned from any submission endpoint).

Request
Response
PYTHON
Copy
import requests

# Replace {activity_id} with the actual activity ID from your submission
activity_id = "heatmap_abc123"

response = requests.get(
    f'https://api.fortyguard.com/v1/status/{activity_id}',
    headers={'api-key': 'your_api_key'}
)
PREVIOUS
Alert Report
NEXT
Check API Credits Usage


---

### documentation/pages/create-heatmap.md

Source path: `documentation/pages/create-heatmap.md`

# /docs/create-heatmap

Captured: 2026-11-18T14:52:50.076Z
HTTP 200
Elapsed ms: 30849
H1: Create Heatmap

API Documentation
⌘K
GUIDES
Introduction
Quickstart
Authentication
MCP
MCP Overview
MCP Quickstart
MCP Authentication
Available Tools
Client Setup
Troubleshooting
INTEGRATIONS
QGIS
ANALYSIS ENDPOINTS
Create Heatmap
POST
Satellite View Segmentation
POST
Street View Segmentation
POST
Heat Intelligence
POST
Environmental Parameters
POST
Temperature-Aware Routing
POST
MONITORING & ALERTING
Monitors
Alerts
TASK MANAGEMENT
Check Status
GET
Check API Credits Usage
GET
RESOURCES
Get a Free API Key
POST
Known Limitations
Release Notes
Create Heatmap
POST
/v1/heatmap

The Heatmap Generation feature produces high-resolution thermal maps derived from spatial and temporal inputs. Built on FortyGuard's proprietary Large Temperature Models (LTMs), each output is a GeoJSON polygon layer with tiles containing predicted or observed temperature data.

Available in
API BASIC
API PREMIUM
BASIC
Generate heatmaps up to 10 mi² area. Includes full access to Map Statistics.
PREMIUM
Generate heatmaps up to 50 mi² area. Includes full access to Map Statistics.
Credit cost:
3,500 credits/request (Basic, Startup); 4,220 (Premium)
Required attributes
Optional attributes
Result Schema
Result Output Fields
Required attributes
polygon_aoi
object
REQUIRED

GeoJSON polygon defining the area of interest for heatmap generation.

date_time
object
REQUIRED

Date and time range configuration object.

date_time.start_date
string
REQUIRED

Start date in YYYY-MM-DD format. Server-supported date validation applies (default earliest date 2019-01-01). Availability depends on catalog entries, not just request acceptance. For 20 m, unavailable locations/hours may produce partial output; no available tiles means a failed activity. No forecast coverage is guaranteed.

date_time.filter_type
number
REQUIRED

Filter type options:

1 (Single Hour) - requires start_date and start_time
2 (Range of Hours, same day) - requires start_date, start_time, and end_time
3 (Single Day) - requires only start_date (covers 00:00–23:59)
4 (Range of Days — week / month, ≤ 1 month) - requires start_date and end_date
Optional attributes
granularity
number
OPTIONAL

Numeric metres: 20, 60, 80, or 100 (default). 20 m uses a separate catalog with actual spatial/time coverage; partial results can succeed.

date_time.end_date
string
OPTIONAL

End date in YYYY-MM-DD format. Required for filter_type 4; auto-populated for filter_type 1–3.

date_time.start_time
string
OPTIONAL

Start time in HH:MM 24-hour format. Required for filter_type 1 and 2.

date_time.end_time
string
OPTIONAL

End time in HH:MM 24-hour format. Required for filter_type 2. Auto-calculated for filter_type 1 (start_time + 1 hour).

analytic_type
string
OPTIONAL

Analysis heatmap type (default 'tcm'):

tcm — Temperature snapshot; value is temperature (°C) per tile
time_of_measure — clock hour (0–23); 20 m uses the AOI timezone, existing resolutions retain UTC
exceedance — number of hours the temperature passes the threshold
persistence — longest continuous run of hours past the threshold

Read stats_data.units: time_of_measure/exceedance use hours; 20 m persistence over day ranges uses days, otherwise hours. At 20 m these discrete values are sampled from source cells, not spatially blended. Missing hours/days do not bridge persistence runs. Persistence includes threshold equality; exceedance is strictly above/below. tcm returns Celsius fields.

threshold
number
OPTIONAL

Temperature threshold in °C for exceedance / persistence. Defaults to 30 °C. Ignored by tcm and time_of_measure.

direction
string
OPTIONAL

Threshold direction for exceedance / persistence: 'above' (default) counts hours above the threshold, 'below' counts hours below it. Ignored by tcm and time_of_measure.

Result Schema

Once the heatmap generation activity has finished processing, the final response contains two main outputs:

GeoJSON heatmap tiles (map_data)
Aggregated temperature statistics (stats_data)

For large completed maps, GET /v1/status/{activity_id}?result_delivery=links returns map_download_url and stats_download_url instead, without loading the full map inside the API. Signed links expire and should be kept private. Downloaded map artifacts retain legacy storage encoding and may require a second JSON decode. Default inline responses are unchanged.

This response is returned when the activity status is "Completed".

Result Output Fields
Result.map_data
GeoJSON FeatureCollection

Stored GeoJSON FeatureCollection. For 20 m, coverage reports available hours/source samples and completeness. Missing locations are omitted; zero values are valid. Partial results do not imply complete coverage.

Result.stats_data
object

Aggregated statistical summary of all tiles in the heatmap. This includes:

Temperature_stats - Temperature statistics across the heatmap region
Minimum: Lowest temperature across the heatmap region
Maximum: Highest temperature across the heatmap region
Mean: Average temperature value
Standard_deviation: Variability of temperatures across tiles
Overall_temperature_distribution (array[number]) - Sorted temperature values representing the overall distribution
Normal_temperature_distribution (object) - Normalized curve data for plotting a temperature distribution
x_axis: Temperature range
y_axis: Probability density values
Temperature_frequency (object) - Histogram-style frequency counts for temperature bins
Request
Response
Result Schema
Test request
Single Hour
Range of Hours
Single Day
Range of Days
Exceedance
Time of Measure
Persistence
PYTHON
Copy
import requests

response = requests.post(
    'https://api.fortyguard.com/v1/heatmap',
    headers={'api-key': 'your_api_key'},
    json={
        'polygon_aoi': {
            'type': 'Polygon',
            'coordinates': [[
                [-74.0170, 40.7051],
                [-74.0031, 40.7051],
                [-74.0031, 40.7180],
                [-74.0170, 40.7180],
                [-74.0170, 40.7051]
            ]]
        },
        'date_time': {
            'start_date': '2024-07-15',
            'start_time': '14:00',
            'filter_type': 1
        },
        'granularity': 100
    }
)
PREVIOUS
QGIS
NEXT
Satellite View Segmentation


---

### documentation/pages/credits-page-dom.json

Source path: `documentation/pages/credits-page-dom.json`

```json
{
  "hits": [],
  "forms": [],
  "inputs": [
    {
      "tag": "INPUT",
      "type": "text",
      "name": null,
      "placeholder": "Search documentation"
    },
    {
      "tag": "BUTTON",
      "type": null,
      "name": null,
      "placeholder": null
    },
    {
      "tag": "BUTTON",
      "type": null,
      "name": null,
      "placeholder": null
    },
    {
      "tag": "BUTTON",
      "type": null,
      "name": null,
      "placeholder": null
    },
    {
      "tag": "BUTTON",
      "type": null,
      "name": null,
      "placeholder": null
    },
    {
      "tag": "BUTTON",
      "type": null,
      "name": null,
      "placeholder": null
    },
    {
      "tag": "BUTTON",
      "type": null,
      "name": null,
      "placeholder": null
    },
    {
      "tag": "BUTTON",
      "type": null,
      "name": null,
      "placeholder": null
    },
    {
      "tag": "BUTTON",
      "type": null,
      "name": null,
      "placeholder": null
    },
    {
      "tag": "BUTTON",
      "type": null,
      "name": null,
      "placeholder": null
    },
    {
      "tag": "BUTTON",
      "type": null,
      "name": null,
      "placeholder": null
    },
    {
      "tag": "BUTTON",
      "type": null,
      "name": null,
      "placeholder": null
    },
    {
      "tag": "INPUT",
      "type": "text",
      "name": null,
      "placeholder": "Enter your API key"
    },
    {
      "tag": "BUTTON",
      "type": null,
      "name": null,
      "placeholder": null
    },
    {
      "tag": "BUTTON",
      "type": null,
      "name": null,
      "placeholder": null
    }
  ]
}
```


---

### documentation/pages/credits-usage.md

Source path: `documentation/pages/credits-usage.md`

# /docs/credits-usage

Captured: 2026-11-18T14:59:28.965Z
HTTP 200
Elapsed ms: 40273
H1: Check API Credits Usage
GET

API Documentation
⌘K
GUIDES
Introduction
Quickstart
Authentication
MCP
MCP Overview
MCP Quickstart
MCP Authentication
Available Tools
Client Setup
Troubleshooting
INTEGRATIONS
QGIS
ANALYSIS ENDPOINTS
Create Heatmap
POST
Satellite View Segmentation
POST
Street View Segmentation
POST
Heat Intelligence
POST
Environmental Parameters
POST
Temperature-Aware Routing
POST
MONITORING & ALERTING
Monitors
Alerts
TASK MANAGEMENT
Check Status
GET
Check API Credits Usage
GET
RESOURCES
Get a Free API Key
POST
Known Limitations
Release Notes
Check API Credits Usage
GET

Track your API key usage, view subscription details, and monitor credit consumption across all services.

Enter Your API Key

Enter your API key to view your subscription details and credit usage.

Submit
PREVIOUS
Check Status
NEXT
Get a Free API Key


---

### documentation/pages/environmental-parameters.md

Source path: `documentation/pages/environmental-parameters.md`

# /docs/environmental-parameters

Captured: 2026-11-18T14:54:53.803Z
HTTP 200
Elapsed ms: 31142
H1: Environmental Parameters

API Documentation
⌘K
GUIDES
Introduction
Quickstart
Authentication
MCP
MCP Overview
MCP Quickstart
MCP Authentication
Available Tools
Client Setup
Troubleshooting
INTEGRATIONS
QGIS
ANALYSIS ENDPOINTS
Create Heatmap
POST
Satellite View Segmentation
POST
Street View Segmentation
POST
Heat Intelligence
POST
Environmental Parameters
POST
Temperature-Aware Routing
POST
MONITORING & ALERTING
Monitors
Alerts
TASK MANAGEMENT
Check Status
GET
Check API Credits Usage
GET
RESOURCES
Get a Free API Key
POST
Known Limitations
Release Notes
Environmental Parameters
POST
/v1/env_params

A multidimensional temperature intelligence service offering operationally vital metrics including heat index, apparent temperature, and wet bulb temperature for thermal stress assessment. Captures atmospheric and hydrological variables (precipitation, AQI, ozone levels) plus solar irradiance profiles (GHI, DNI, DHI) to support energy modeling, urban planning, and climate resilience.

Available in
API BASIC
API PREMIUM
BASIC
Up to 3 customizable environmental parameters per request.
PREMIUM
Full access to all environmental parameters.
Credit cost:
2,110 credits/request (Basic, Startup); 2,900 (Premium)
Required attributes
Optional attributes
Result Schema
Required attributes
latitude
number
REQUIRED

Latitude coordinate of the location.

longitude
number
REQUIRED

Longitude coordinate of the location.

temperature
number
REQUIRED

Temperature value in degrees Celsius for the location.

date_time
object
REQUIRED

Date and time range configuration object.

date_time.start_date
string
REQUIRED

Start date in YYYY-MM-DD format, subject to server-supported date validation and environmental-provider availability. This coordinate-based endpoint has no granularity field; weather values are not 20 m observations.

date_time.filter_type
number
REQUIRED

Filter type options:

1 (Single Hour) - requires start_date and start_time
2 (Range of Hours) - requires start_date, start_time, and end_time
3 (Single Day) - requires only start_date
Optional attributes
date_time.end_date
string
OPTIONAL

End date in YYYY-MM-DD format. Auto-populated based on filter_type.

date_time.start_time
string
OPTIONAL

Start time in HH:MM 24-hour format. Required for filter_type 1 and 2.

date_time.end_time
string
OPTIONAL

End time in HH:MM 24-hour format. Required for filter_type 2.

analysis
string[]
OPTIONAL

Optional list of environmental parameters to return. Omit to receive all of them. API Basic and API Startup are limited to 3 parameters per request; API Premium has full access.

Thermal & atmospheric:

heat_index_celsius — heat index ("feels like"), °C
apparent_temperature_celsius — apparent temperature, °C
wet_bulb_temperature_celsius — wet-bulb temperature, °C
relative_humidity_percent — relative humidity, %
precipitation_mm — precipitation, mm
cloud_cover_octas — effective cloud cover, octas
elevation — ground elevation, m

Air quality (US AQI) & gases:

air_quality:idx — overall US Air Quality Index
air_quality_pm2p5:idx — AQI, PM2.5
air_quality_pm10:idx — AQI, PM10
air_quality_no2:idx — AQI, nitrogen dioxide
aqi_us_co — AQI, carbon monoxide
air_quality_o3:idx — AQI, ozone
air_quality_so2:idx — AQI, sulphur dioxide
methane_ppb — methane, ppb
co2_ppm — carbon dioxide, ppm

Solar:

solar_irradiance — clear-sky GHI / DNI / DHI
Result Schema

Once the environmental parameters analysis activity has finished processing, the final response contains three main outputs:

Time metadata (metadata) - timezone + the exact timestamps/time range the data corresponds to
Location context (locations) - the latitude/longitude (and often elevation) that was analyzed
Environmental outputs (parameters + solar_irradiance) - time-aligned arrays of weather/comfort, air-quality, gases, and solar irradiance metrics

Missing numeric values:

New missing numeric environmental values are returned as JSON null
Older stored responses may still contain legacy -999
null means data was unavailable from the upstream provider
Missing values must not be interpreted as zero
Response arrays and live field names remain unchanged

This response is returned when the activity status is "Completed".

Request
Response
Result Schema
Test request
PYTHON
Copy
import requests

response = requests.post(
    'https://api.fortyguard.com/v1/env_params',
    headers={'api-key': 'your_api_key'},
    json={
        'latitude': 40.7128,
        'longitude': -74.0060,
        'temperature': 32.5,
        'date_time': {
            'start_date': '2024-07-15',
            'start_time': '14:00',
            'filter_type': 1
        }
    }
)
PREVIOUS
Heat Intelligence
NEXT
Temperature-Aware Routing


---

### documentation/pages/generate-free-key.md

Source path: `documentation/pages/generate-free-key.md`

# /docs/generate-free-key

Captured: 2026-11-18T15:00:00.849Z
HTTP 200
Elapsed ms: 31880
H1: Get a Free API Key
POST

API Documentation
⌘K
GUIDES
Introduction
Quickstart
Authentication
MCP
MCP Overview
MCP Quickstart
MCP Authentication
Available Tools
Client Setup
Troubleshooting
INTEGRATIONS
QGIS
ANALYSIS ENDPOINTS
Create Heatmap
POST
Satellite View Segmentation
POST
Street View Segmentation
POST
Heat Intelligence
POST
Environmental Parameters
POST
Temperature-Aware Routing
POST
MONITORING & ALERTING
Monitors
Alerts
TASK MANAGEMENT
Check Status
GET
Check API Credits Usage
GET
RESOURCES
Get a Free API Key
POST
Known Limitations
Release Notes
Get a Free API Key
POST

Signing up for the FortyGuard Internship Program? Enter your email below and we'll create a free key with full Premium access at no cost and send it to your inbox. Use it to start calling the FortyGuard's Temperature API® right away.

Enter Your Email

We'll generate a free API key with full Premium access and email it to this address.

Get API Key

If the email doesn't arrive, please check your spam folder.

PREVIOUS
Check API Credits Usage
NEXT
Known Limitations


---

### documentation/pages/heat-intelligence.md

Source path: `documentation/pages/heat-intelligence.md`

# /docs/heat-intelligence

Captured: 2026-11-18T14:54:22.659Z
HTTP 200
Elapsed ms: 30865
H1: Heat Intelligence

API Documentation
⌘K
GUIDES
Introduction
Quickstart
Authentication
MCP
MCP Overview
MCP Quickstart
MCP Authentication
Available Tools
Client Setup
Troubleshooting
INTEGRATIONS
QGIS
ANALYSIS ENDPOINTS
Create Heatmap
POST
Satellite View Segmentation
POST
Street View Segmentation
POST
Heat Intelligence
POST
Environmental Parameters
POST
Temperature-Aware Routing
POST
MONITORING & ALERTING
Monitors
Alerts
TASK MANAGEMENT
Check Status
GET
Check API Credits Usage
GET
RESOURCES
Get a Free API Key
POST
Known Limitations
Release Notes
Heat Intelligence
POST
/v1/heat_intelligence

Heat Intelligence transforms raw temperature data into comprehensive, multi-dimensional intelligence reports for any urban location. This service examines spatial and temporal temperature patterns through five targeted analytics categories—Geographic, Environmental, Urban, Events, and Anthropogenic—providing deep, actionable insights for urban planning, climate resilience, and infrastructure design.

Available in
API PREMIUM
Credit cost:
8,600 credits/request (Premium)
Required attributes
Result Schema
Result Output Fields
Required attributes
latitude
number
REQUIRED

Latitude coordinate of the location to analyze.

longitude
number
REQUIRED

Longitude coordinate of the location to analyze.

temperature
number
REQUIRED

Temperature value in degrees Fahrenheit for the location.

date
string
REQUIRED

Date for the supplied Celsius temperature in YYYY-MM-DD format, subject to server-supported date validation. Use the selected tile coordinate and temperature; this endpoint has no granularity field.

analysis
array[string]
REQUIRED

Type of analysis options:

"geographic"
"environmental"
"urban"
"events"
"anthropogenic"
Heat Intelligence Result Flow

Heat Intelligence uses the same status endpoint as other asynchronous activities, but the completed status response returns JSON with data.result.download_link. The status endpoint does not stream the PDF directly. Heat Intelligence report generation may take several minutes. The download_link is temporary. Use it immediately to download the PDF, do not log or share the full signed URL, and stop polling once Completed and download_link are returned. Failed is a terminal status.

Retrieving the Result

To retrieve the completed endpoint-specific result, configure your request as follows:

import time
from pathlib import Path

import requests

activity_id = "f3e1c68b-1cc3-46bc-8589-1faaf30ef30a"
headers = {"api-key": "your_api_key"}
status_url = f"https://api.fortyguard.com/v1/status/{activity_id}"

for _ in range(120):
    status_resp = requests.get(status_url, headers=headers, timeout=30)
    status_resp.raise_for_status()
    data = status_resp.json()["data"]
    status = data.get("status")

    if status == "Completed":
        download_link = (data.get("result") or {}).get("download_link")
        if not download_link:
            raise RuntimeError(f"Activity {activity_id} completed without a download_link")

        report_resp = requests.get(download_link, timeout=60)
        report_resp.raise_for_status()
        Path("report.pdf").write_bytes(report_resp.content)
        print("Saved to report.pdf")
        break

    if status == "Failed":
        raise RuntimeError(f"Activity {activity_id} failed")

    time.sleep(5)
else:
    raise TimeoutError(f"Activity {activity_id} did not complete in time")
Copy
Notes
The status endpoint returns JSON; it does not stream the PDF
Heat Intelligence report generation may take several minutes
The download_link is temporary and should be used immediately
Do not log or share the full signed URL
Stop polling once Completed and download_link are returned
Failed is terminal; stop polling and record the activity_id
Result Output Fields
data.status
string

Activity state. Continue bounded polling while Processing, stop on Completed or Failed.

data.result.download_link
string

Temporary signed URL for the Heat Intelligence PDF when status is Completed.

Request
Response
PYTHON
Copy
import requests

response = requests.post(
    'https://api.fortyguard.com/v1/heat_intelligence',
    headers={'api-key': 'your_api_key'},
    json={
        'latitude': 40.7128,
        'longitude': -74.0060,
        'temperature': 82.4,
        'date': '2024-07-15',
        'analysis': ['environmental']
    }
)
PREVIOUS
Street View Segmentation
NEXT
Environmental Parameters


---

### documentation/pages/index-monitoring.json

Source path: `documentation/pages/index-monitoring.json`

```json
[
  {
    "route": "/docs/monitoring-create",
    "status": 200,
    "h1": "Create Monitor",
    "chars": 2839,
    "ms": 34515,
    "file": "monitoring-create.md"
  },
  {
    "route": "/docs/monitoring-list",
    "status": 200,
    "h1": "List Monitors",
    "chars": 1385,
    "ms": 31923,
    "file": "monitoring-list.md"
  },
  {
    "route": "/docs/monitoring-get",
    "status": 200,
    "h1": "Get Monitor",
    "chars": 1120,
    "ms": 31865,
    "file": "monitoring-get.md"
  },
  {
    "route": "/docs/monitoring-update",
    "status": 200,
    "h1": "Update Monitor",
    "chars": 1799,
    "ms": 31845,
    "file": "monitoring-update.md"
  },
  {
    "route": "/docs/monitoring-delete",
    "status": 200,
    "h1": "Delete Monitor",
    "chars": 1127,
    "ms": 31862,
    "file": "monitoring-delete.md"
  },
  {
    "route": "/docs/monitoring-alerts",
    "status": 200,
    "h1": "List Alerts",
    "chars": 1589,
    "ms": 31866,
    "file": "monitoring-alerts.md"
  },
  {
    "route": "/docs/monitoring-report",
    "status": 200,
    "h1": "Alert Report",
    "chars": 1879,
    "ms": 31858,
    "file": "monitoring-report.md"
  }
]
```


---

### documentation/pages/index.json

Source path: `documentation/pages/index.json`

```json
[
  {
    "route": "/docs/credits-usage",
    "status": 200,
    "h1": "Check API Credits Usage\nGET",
    "chars": 811,
    "ms": 40275,
    "file": "credits-usage.md"
  },
  {
    "route": "/docs/generate-free-key",
    "status": 200,
    "h1": "Get a Free API Key\nPOST",
    "chars": 1025,
    "ms": 31881,
    "file": "generate-free-key.md"
  },
  {
    "route": "/docs/limitations",
    "status": 200,
    "h1": "Known Limitations",
    "chars": 5417,
    "ms": 31874,
    "file": "limitations.md"
  },
  {
    "route": "/docs/release-notes",
    "status": 200,
    "h1": "Release Notes",
    "chars": 3551,
    "ms": 31869,
    "file": "release-notes.md"
  }
]
```


---

### documentation/pages/introduction.md

Source path: `documentation/pages/introduction.md`

# /docs/introduction

Captured: 2026-11-18T14:51:17.409Z
HTTP 200
Elapsed ms: 44768
H1: Introduction

API Documentation
⌘K
GUIDES
Introduction
Quickstart
Authentication
MCP
MCP Overview
MCP Quickstart
MCP Authentication
Available Tools
Client Setup
Troubleshooting
INTEGRATIONS
QGIS
ANALYSIS ENDPOINTS
Create Heatmap
POST
Satellite View Segmentation
POST
Street View Segmentation
POST
Heat Intelligence
POST
Environmental Parameters
POST
Temperature-Aware Routing
POST
MONITORING & ALERTING
Monitors
Alerts
TASK MANAGEMENT
Check Status
GET
Check API Credits Usage
GET
RESOURCES
Get a Free API Key
POST
Known Limitations
Release Notes
Introduction

As cities grapple with intensifying heat and climate volatility, the need for precise, actionable urban temperature intelligence has never been more urgent. The FortyGuard API Services framework responds to this challenge by offering a powerful suite of heat-intelligent endpoints that translate granular temperature data into operational insights.

This documentation provides a comprehensive overview of the technical capabilities, service architecture, and data workflows that define FortyGuard's Temperature API®. Built upon our proprietary Large Temperature Models (LTMs), these APIs enable developers, urban planners, logistics coordinators, and policymakers to seamlessly integrate climate context into digital platforms and physical infrastructure decisions.

Capabilities

Our API suite provides real-time and forecasted heatmaps, advanced segmentation of satellite and street-level imagery, and comprehensive environmental parameter analysis. It powers the generation of Heat Intelligence and Temperature Property Reports, transforming temperature data into actionable insights. These capabilities deliver multi-dimensional analyses across geographic, environmental, urban, event-based, and anthropogenic factors—enabling smarter, temperature-adaptive design and decision-making at both city and property scales.

Plan Availability

Each endpoint in this documentation is tagged with the plan it belongs to. Use the labels in the sidebar and on each endpoint page to understand what's included in your subscription.

BOTH
Included in both API Basic and API Premium plans.
BASIC
Included in the API Basic plan.
PREMIUM
Included in the API Premium plan only.

Endpoints that are available on both plans may still have plan-specific limits (e.g., heatmap area size or number of environmental parameters). These differences are called out on each endpoint page.

Need premium endpoints or more credits?

Unlock Satellite Segmentation, Street View Segmentation, Heat Intelligence, and full Environmental Parameters — plus up to 5M monthly credits — by upgrading to API Premium.

View Plans & Pricing
Use Cases
Climate-Aware Infrastructure Planning — Use temperature intelligence and environmental parameters to design and maintain roads, bridges, and public utilities that withstand long-term heat stress and reduce maintenance costs.
Property & Asset Intelligence — Generate property-level heat performance reports to assess livability, operational efficiency, and financial risk—supporting ESG appraisals and investment decisions.
Research & Climate Innovation — Provide APIs and data layers for universities, consultants, and innovators building AI models or digital twins focused on urban heat, sustainability, and material resilience.
Environmental & Health Monitoring — Track apparent temperature, air quality, and humidity to power early warning systems for heat stress, pollution exposure, or extreme weather risk.
Smart Mobility & Logistics — Integrate thermal comfort-based routing and forecasted heat zones into transportation systems or delivery networks to optimize routes, reduce energy consumption, and improve worker safety.
Urban Design & Public Space Optimization — Leverage heat data and street-level analytics to model microclimates, improve outdoor comfort, and guide placement of vegetation, shading, or cooling features in city design.
Energy & Climate Systems Planning — Combine irradiance, temperature, and humidity data to forecast energy demand, optimize renewable placement, and support district cooling or energy resilience strategies.
On this page
Capabilities
Plan Availability
Use Cases
NEXT
Quickstart


---

### documentation/pages/limitations.md

Source path: `documentation/pages/limitations.md`

# /docs/limitations

Captured: 2026-11-18T15:00:32.722Z
HTTP 200
Elapsed ms: 31872
H1: Known Limitations

API Documentation
⌘K
GUIDES
Introduction
Quickstart
Authentication
MCP
MCP Overview
MCP Quickstart
MCP Authentication
Available Tools
Client Setup
Troubleshooting
INTEGRATIONS
QGIS
ANALYSIS ENDPOINTS
Create Heatmap
POST
Satellite View Segmentation
POST
Street View Segmentation
POST
Heat Intelligence
POST
Environmental Parameters
POST
Temperature-Aware Routing
POST
MONITORING & ALERTING
Monitors
Alerts
TASK MANAGEMENT
Check Status
GET
Check API Credits Usage
GET
RESOURCES
Get a Free API Key
POST
Known Limitations
Release Notes
Known Limitations

This page documents the current operational, technical, and plan-level limits of the FortyGuard Enterprise API. It is maintained alongside each release so you can plan integrations, size workloads, and anticipate constraints before hitting them in production.

Plan Limits

Every API key is associated with a subscription plan. The table below summarizes what each plan includes. See each endpoint page for plan-specific behavior.

Capability	API Basic	API Premium	API Startup
Monthly credits	1,000,000	5,000,000	1,000,000
Commercial License	Included	Included	Included
Heatmap Generation (max area)	Up to 10 mi²	Up to 50 mi²	Up to 10 mi²
Map Statistics	Full access	Full access	Full access
Environmental Parameters	Up to 3 parameters per request	Full access to all parameters	Up to 3 parameters per request
Satellite Segmentation	Not included	Included	Not included
Street View Segmentation	Not included	Included	Not included
Heat Intelligence Reports	Not included	Included	Not included
Access window	Monthly (renews each cycle)	Monthly (renews each cycle)	6 months (one-time)
Regional coverage	United States only	United States only	United States only
Heatmap credit cost / request	3,500	4,220	3,500
Environmental Parameters credit cost / request	2,110	2,900	2,110
Satellite Segmentation credit cost / request	Not included	14,400	Not included
Street View Segmentation credit cost / request	Not included	8,600	Not included
Heat Intelligence credit cost / request	Not included	8,600	Not included
Temperature-Aware Routing credit cost / request	Not included	3,500	Not included
Temperature-Aware Routing

Maximum distance: the origin-to-destination straight-line/great-circle distance must not exceed 200 km. This is not the driving-route distance.

Required input:origin, destination, and departure_time are required.

Processing: routing is asynchronous. Submit the request, then poll GET /v1/status/{activity_id} until the activity is Completed or Failed.

Coverage: available routes depend on current road and routing-data coverage.

Input Constraints

Requests that violate the following constraints return 400 Bad Request and are not charged against your credit balance.

Coordinates:latitude must be in the range [-90, 90] and longitude in [-180, 180]. During the current release, coordinates must fall within the United States.

Polygon Area of Interest: must be a valid GeoJSON FeatureCollection whose geometry is a closed Polygon (first and last coordinates identical).

Date format:start_date and end_date must be YYYY-MM-DD. start_time and end_time must be HH:MM in 24-hour time.

Date range: server-supported date validation applies (default earliest date 2019-01-01). Acceptance does not guarantee coverage or a forecast. 20 m results depend on the UTC hours and locations present in the high-resolution catalog. Partial coverage can succeed; no available tiles produces a failed activity.

Filter types:1 (Single Hour), 2 (same-day Range of Hours), 3 (Single Day), or 4 (Range of Days; end date at most 31 days after start).

Granularity: heatmap and point-satellite requests accept numeric 20, 60, 80, or 100 metres; default 100. Existing plan-based area limits and pricing apply. Satellite imagery has independent availability and no guaranteed capture date matching the request.

Heat Intelligence analysis:analysis must be a subset of ["geographic", "environmental", "urban", "events", "anthropogenic"].

Processing & Results

Activity lifecycle: submission endpoints return an activity_id. Results are retrieved asynchronously via the GET /v1/status/{activity_id} endpoint.

Failed tasks: tasks that fail during processing (status Failed) do not consume credits.

Image encoding: segmentation outputs return Base64-encoded images. If the response omits the MIME prefix, prepend data:image/png;base64, before rendering in a browser.

Heat Intelligence reports: the completed status response returns JSON with data.result.download_link. The link is temporary; use it immediately to download the PDF, and do not log or share the full signed URL.

Regional Coverage

The current release supports requests for locations within the United States on the API Basic, API Premium, and API Startup plans.

Credits & Billing

Credits are deducted only on successful task completion (status Completed).

Unused credits do not roll over between billing cycles — they reset on your credits_reset_date.

API Startup: a one-time allocation of 1,000,000 credits valid for a 6-month access window (not a recurring monthly cycle).

Reporting an Issue

If you hit a limit that is not documented here, or a documented limit that is incorrect, please contact support@fortyguard.com.

On this page
Plan Limits
Temperature-Aware Routing
Input Constraints
Processing & Results
Regional Coverage
Credits & Billing
Reporting an Issue
PREVIOUS
Get a Free API Key
NEXT
Release Notes


---

### documentation/pages/monitoring-alerts.md

Source path: `documentation/pages/monitoring-alerts.md`

# /docs/monitoring-alerts

Captured: 2026-11-18T15:05:28.355Z
HTTP 200
Elapsed ms: 31865
H1: List Alerts

API Documentation
⌘K
GUIDES
Introduction
Quickstart
Authentication
MCP
MCP Overview
MCP Quickstart
MCP Authentication
Available Tools
Client Setup
Troubleshooting
INTEGRATIONS
QGIS
ANALYSIS ENDPOINTS
Create Heatmap
POST
Satellite View Segmentation
POST
Street View Segmentation
POST
Heat Intelligence
POST
Environmental Parameters
POST
Temperature-Aware Routing
POST
MONITORING & ALERTING
Monitors
Alerts
TASK MANAGEMENT
Check Status
GET
Check API Credits Usage
GET
RESOURCES
Get a Free API Key
POST
Known Limitations
Release Notes
List Alerts
GET
/v1/monitors/{monitor_id}/alerts

Show the Alerts one Monitor has raised. Every forecast check that breaches any rule creates an Alert — there is no waiting period. Each Alert names the predicted breach time and temperature, the responsible map tile, and the rules that were met. Use GET /v1/monitors/{monitor_id}/alerts. To read one Alert directly anywhere, use GET /v1/alerts/{alert_id}.

Available in
API PREMIUM
Credit cost:
3,500 credits per request (Premium)
Required attributes
Optional attributes
Required attributes
monitor_id
string
REQUIRED

ID of the Monitor whose Alerts to show.

Optional attributes
limit
number
OPTIONAL

How many Alerts to return (1–100, default 25).

cursor
string
OPTIONAL

Page marker from a previous answer to fetch the next page.

Request
Response
PYTHON
Copy
import requests

response = requests.get(
    "https://api.fortyguard.com/v1/monitors/monitor_abc123/alerts",
    headers={"api-key": "your_api_key"},
    params={"limit": 25}
)

print(response.json())
PREVIOUS
Delete Monitor
NEXT
Alert Report


---

### documentation/pages/monitoring-create.md

Source path: `documentation/pages/monitoring-create.md`

# /docs/monitoring-create

Captured: 2026-11-18T15:02:48.991Z
HTTP 200
Elapsed ms: 34513
H1: Create Monitor

API Documentation
⌘K
GUIDES
Introduction
Quickstart
Authentication
MCP
MCP Overview
MCP Quickstart
MCP Authentication
Available Tools
Client Setup
Troubleshooting
INTEGRATIONS
QGIS
ANALYSIS ENDPOINTS
Create Heatmap
POST
Satellite View Segmentation
POST
Street View Segmentation
POST
Heat Intelligence
POST
Environmental Parameters
POST
Temperature-Aware Routing
POST
MONITORING & ALERTING
Monitors
Alerts
TASK MANAGEMENT
Check Status
GET
Check API Credits Usage
GET
RESOURCES
Get a Free API Key
POST
Known Limitations
Release Notes
Create Monitor
POST
/v1/monitors

A Monitor watches one of your heatmaps and checks the temperature forecast for it every 12 hours. When a rule you set is breached (for example, average temperature above 40 °C), FortyGuard creates an Alert you can read or download as a report. Create a Monitor with POST /v1/monitors by giving the heatmap, a name, the area to watch, 1 to 20 rules, and where alerts should be sent.

Available in
API PREMIUM
Credit cost:
3,500 credits per request (Premium)
Required attributes
Optional attributes
Required attributes
heatmap_id
string
REQUIRED

ID of an existing finished heatmap this Monitor belongs to.

name
string
REQUIRED

Name for this Monitor (1–120 characters, unique per heatmap).

boundary_geojson
object
REQUIRED

Area to watch. A GeoJSON Polygon inside the heatmap, or the whole heatmap area.

rules
array
REQUIRED

1–20 alert rules. Each rule picks a target (average, lowest, or highest × minimum or maximum temperature), a condition (Above, Below, or Between) with a threshold in °C or °F. Any rule breaching triggers an Alert.

notifications
object
REQUIRED

Where alerts go: email addresses, SMS and WhatsApp numbers (at least one destination).

Optional attributes
enabled
boolean
OPTIONAL

Start checking immediately. True by default; set false to create a paused Monitor.

generate_report
boolean
OPTIONAL

Attach a downloadable PDF report to each Alert. True by default.

Request
Response
PYTHON
Copy
import requests

response = requests.post(
    "https://api.fortyguard.com/v1/monitors",
    headers={"api-key": "your_api_key"},
    json={
        "heatmap_id": "heatmap_abc123",
        "name": "Downtown heat watch",
        "boundary_geojson": {
            "type": "Polygon",
            "coordinates": [[[-74.01, 40.70], [-73.93, 40.70], [-73.93, 40.85], [-74.01, 40.70]]]
        },
        "rules": [
            {
                "temporal_aggregation": "average",
                "spatial_aggregation": "minimum",
                "operator": "above",
                "threshold": 40,
                "unit": "celsius"
            }
        ],
        "notifications": {"email": ["ops@example.com"]},
        "enabled": True,
        "generate_report": True
    }
)

print(response.json())
PREVIOUS
Temperature-Aware Routing
NEXT
List Monitors


---

### documentation/pages/monitoring-delete.md

Source path: `documentation/pages/monitoring-delete.md`

# /docs/monitoring-delete

Captured: 2026-11-18T15:04:56.489Z
HTTP 200
Elapsed ms: 31861
H1: Delete Monitor

API Documentation
⌘K
GUIDES
Introduction
Quickstart
Authentication
MCP
MCP Overview
MCP Quickstart
MCP Authentication
Available Tools
Client Setup
Troubleshooting
INTEGRATIONS
QGIS
ANALYSIS ENDPOINTS
Create Heatmap
POST
Satellite View Segmentation
POST
Street View Segmentation
POST
Heat Intelligence
POST
Environmental Parameters
POST
Temperature-Aware Routing
POST
MONITORING & ALERTING
Monitors
Alerts
TASK MANAGEMENT
Check Status
GET
Check API Credits Usage
GET
RESOURCES
Get a Free API Key
POST
Known Limitations
Release Notes
Delete Monitor
DELETE
/v1/monitors/{monitor_id}

Permanently delete a Monitor together with its runs and Alert history. This cannot be undone. Use DELETE /v1/monitors/{monitor_id}.

Available in
API PREMIUM
Credit cost:
3,500 credits per request (Premium)
Required attributes
Required attributes
monitor_id
string
REQUIRED

ID of the Monitor to delete.

Request
Response
PYTHON
Copy
import requests

response = requests.delete(
    "https://api.fortyguard.com/v1/monitors/monitor_abc123",
    headers={"api-key": "your_api_key"}
)

print(response.json())
PREVIOUS
Update Monitor
NEXT
List Alerts


---

### documentation/pages/monitoring-get.md

Source path: `documentation/pages/monitoring-get.md`

# /docs/monitoring-get

Captured: 2026-11-18T15:03:52.782Z
HTTP 200
Elapsed ms: 31864
H1: Get Monitor

API Documentation
⌘K
GUIDES
Introduction
Quickstart
Authentication
MCP
MCP Overview
MCP Quickstart
MCP Authentication
Available Tools
Client Setup
Troubleshooting
INTEGRATIONS
QGIS
ANALYSIS ENDPOINTS
Create Heatmap
POST
Satellite View Segmentation
POST
Street View Segmentation
POST
Heat Intelligence
POST
Environmental Parameters
POST
Temperature-Aware Routing
POST
MONITORING & ALERTING
Monitors
Alerts
TASK MANAGEMENT
Check Status
GET
Check API Credits Usage
GET
RESOURCES
Get a Free API Key
POST
Known Limitations
Release Notes
Get Monitor
GET
/v1/monitors/{monitor_id}

Show the full details of one Monitor, including its rules, notification addresses, and latest run. Use GET /v1/monitors/{monitor_id}.

Available in
API PREMIUM
Credit cost:
3,500 credits per request (Premium)
Required attributes
Required attributes
monitor_id
string
REQUIRED

ID of the Monitor to show.

Request
Response
PYTHON
Copy
import requests

response = requests.get(
    "https://api.fortyguard.com/v1/monitors/monitor_abc123",
    headers={"api-key": "your_api_key"}
)

print(response.json())
PREVIOUS
List Monitors
NEXT
Update Monitor


---

### documentation/pages/monitoring-list.md

Source path: `documentation/pages/monitoring-list.md`

# /docs/monitoring-list

Captured: 2026-11-18T15:03:20.917Z
HTTP 200
Elapsed ms: 31922
H1: List Monitors

API Documentation
⌘K
GUIDES
Introduction
Quickstart
Authentication
MCP
MCP Overview
MCP Quickstart
MCP Authentication
Available Tools
Client Setup
Troubleshooting
INTEGRATIONS
QGIS
ANALYSIS ENDPOINTS
Create Heatmap
POST
Satellite View Segmentation
POST
Street View Segmentation
POST
Heat Intelligence
POST
Environmental Parameters
POST
Temperature-Aware Routing
POST
MONITORING & ALERTING
Monitors
Alerts
TASK MANAGEMENT
Check Status
GET
Check API Credits Usage
GET
RESOURCES
Get a Free API Key
POST
Known Limitations
Release Notes
List Monitors
GET
/v1/monitors

See all your Monitors. Use GET /v1/monitors, optionally filtered by heatmap or by whether the Monitor is switched on.

Available in
API PREMIUM
Credit cost:
3,500 credits per request (Premium)
Optional attributes
Optional attributes
heatmap_id
string
OPTIONAL

Show only Monitors for this heatmap.

enabled
boolean
OPTIONAL

Show only switched-on (true) or paused (false) Monitors.

limit
number
OPTIONAL

How many Monitors to return (1–100, default 25).

cursor
string
OPTIONAL

Page marker from a previous answer to fetch the next page.

Request
Response
PYTHON
Copy
import requests

response = requests.get(
    "https://api.fortyguard.com/v1/monitors",
    headers={"api-key": "your_api_key"},
    params={"heatmap_id": "heatmap_abc123", "limit": 25}
)

print(response.json())
PREVIOUS
Create Monitor
NEXT
Get Monitor


---

### documentation/pages/monitoring-report.md

Source path: `documentation/pages/monitoring-report.md`

# /docs/monitoring-report

Captured: 2026-11-18T15:06:00.213Z
HTTP 200
Elapsed ms: 31857
H1: Alert Report

API Documentation
⌘K
GUIDES
Introduction
Quickstart
Authentication
MCP
MCP Overview
MCP Quickstart
MCP Authentication
Available Tools
Client Setup
Troubleshooting
INTEGRATIONS
QGIS
ANALYSIS ENDPOINTS
Create Heatmap
POST
Satellite View Segmentation
POST
Street View Segmentation
POST
Heat Intelligence
POST
Environmental Parameters
POST
Temperature-Aware Routing
POST
MONITORING & ALERTING
Monitors
Alerts
TASK MANAGEMENT
Check Status
GET
Check API Credits Usage
GET
RESOURCES
Get a Free API Key
POST
Known Limitations
Release Notes
Alert Report
GET
/v1/monitors/{monitor_id}/alerts/{alert_id}/report

Read or download the report for one Alert: which tiles triggered it, the predicted time and temperature, and the weather details behind it. If the Monitor has PDF reports switched on, the report is downloadable as PDF (default) or Word. Use GET /v1/monitors/{monitor_id}/alerts/{alert_id}/report to read it, adding /download?type=pdf (or docx) to download the file.

Available in
API PREMIUM
Credit cost:
3,500 credits per request (Premium)
Required attributes
Optional attributes
Required attributes
monitor_id
string
REQUIRED

ID of the Monitor that raised the Alert.

alert_id
string
REQUIRED

ID of the Alert to read.

Optional attributes
file_type
string
OPTIONAL

Download format for the /download address: pdf (default) or docx.

Request
Response
PYTHON
Copy
import requests

# Read the report
report = requests.get(
    "https://api.fortyguard.com/v1/monitors/monitor_abc123/alerts/alert_123/report",
    headers={"api-key": "your_api_key"}
)
print(report.json())

# Download it as a PDF file
pdf = requests.get(
    "https://api.fortyguard.com/v1/monitors/monitor_abc123/alerts/alert_123/report/download",
    headers={"api-key": "your_api_key"},
    params={"file_type": "pdf"}
)
open("alert-report.pdf", "wb").write(pdf.content)
PREVIOUS
List Alerts
NEXT
Check Status


---

### documentation/pages/monitoring-update.md

Source path: `documentation/pages/monitoring-update.md`

# /docs/monitoring-update

Captured: 2026-11-18T15:04:24.627Z
HTTP 200
Elapsed ms: 31844
H1: Update Monitor

API Documentation
⌘K
GUIDES
Introduction
Quickstart
Authentication
MCP
MCP Overview
MCP Quickstart
MCP Authentication
Available Tools
Client Setup
Troubleshooting
INTEGRATIONS
QGIS
ANALYSIS ENDPOINTS
Create Heatmap
POST
Satellite View Segmentation
POST
Street View Segmentation
POST
Heat Intelligence
POST
Environmental Parameters
POST
Temperature-Aware Routing
POST
MONITORING & ALERTING
Monitors
Alerts
TASK MANAGEMENT
Check Status
GET
Check API Credits Usage
GET
RESOURCES
Get a Free API Key
POST
Known Limitations
Release Notes
Update Monitor
PATCH
/v1/monitors/{monitor_id}

Change a Monitor: rename it, replace its rules or notification addresses, pause it (enabled false) or resume it (enabled true), or switch PDF reports on/off. The heatmap and the watched area cannot be changed — create a new Monitor instead. Use PATCH /v1/monitors/{monitor_id}.

Available in
API PREMIUM
Credit cost:
3,500 credits per request (Premium)
Required attributes
Optional attributes
Required attributes
monitor_id
string
REQUIRED

ID of the Monitor to change.

Optional attributes
name
string
OPTIONAL

New Monitor name (1–120 characters).

rules
array
OPTIONAL

Replacement rule list (1–20 rules; replaces the whole list).

notifications
object
OPTIONAL

Replacement notification addresses (replaces the whole list).

enabled
boolean
OPTIONAL

False pauses checks; true resumes them (a resumed Monitor runs immediately).

generate_report
boolean
OPTIONAL

Switch PDF reports for new Alerts on/off.

Request
Response
PYTHON
Copy
import requests

response = requests.patch(
    "https://api.fortyguard.com/v1/monitors/monitor_abc123",
    headers={"api-key": "your_api_key"},
    json={"enabled": False, "name": "Downtown heat watch (paused)"}
)

print(response.json())
PREVIOUS
Get Monitor
NEXT
Delete Monitor


---

### documentation/pages/quickstart.md

Source path: `documentation/pages/quickstart.md`

# /docs/quickstart

Captured: 2026-11-18T14:51:48.252Z
HTTP 200
Elapsed ms: 30839
H1: Quickstart

API Documentation
⌘K
GUIDES
Introduction
Quickstart
Authentication
MCP
MCP Overview
MCP Quickstart
MCP Authentication
Available Tools
Client Setup
Troubleshooting
INTEGRATIONS
QGIS
ANALYSIS ENDPOINTS
Create Heatmap
POST
Satellite View Segmentation
POST
Street View Segmentation
POST
Heat Intelligence
POST
Environmental Parameters
POST
Temperature-Aware Routing
POST
MONITORING & ALERTING
Monitors
Alerts
TASK MANAGEMENT
Check Status
GET
Check API Credits Usage
GET
RESOURCES
Get a Free API Key
POST
Known Limitations
Release Notes
Quickstart

Get started with the FortyGuard Enterprise API in minutes. This guide will help you authenticate, make your first request, and understand how to track and retrieve your task results.

Authentication

All requests to the FortyGuard Enterprise API require an API key. Simply include your API key within the request headers as shown below:

api-key: YOUR_API_KEY
Copy

No OAuth or token exchange is needed — your API key alone provides secure, authenticated access.

Making a Request

The Enterprise API currently offers six POST endpoints, each designed to handle different temperature intelligence operations (e.g., Heatmap Generation, Street View Segmentation, Heat Intelligence, Environmental Parameters, and more).

Each POST request submits a task to the FortyGuard Engine — for example, generating a heatmap or analyzing a property's thermal profile. When you submit a request, the API immediately returns an activity_id — a unique identifier representing your submitted task.

Tracking Task Status

Once you've received your activity_id, you can use it to query the status of your task using the corresponding status (GET) endpoint.

Use this general response and status guide when handling submissions and polling:

Response/status	Meaning
400 / 422	Invalid request or validation error.
401	Missing or invalid API key.
403	Insufficient plan access or authorization.
404	Activity not found or temporarily unavailable immediately after submission.
429	Rate limit exceeded.
500	Server-side processing error.
Processing	Continue bounded polling.
Completed	Retrieve the endpoint-specific result.
Failed	Stop polling and record the activity ID.

Credits are only deducted after successful completion of a task (status: Completed).

If successful, the same status endpoint will also include the result payload (e.g., temperature data, GeoJSON map, or analytical report) in the response body.

Example Code (Python)

Below is a simplified example showing how to submit a task and then check its status.

Step 1 — Submit your request
import requests

submit_url = "https://api.fortyguard.com/v1/heatmap"
headers = {
    "api-key": "YOUR_API_KEY",
    "Content-Type": "application/json"
}

payload = {
    "polygon_aoi": {
        "type": "FeatureCollection",
        "features": [
            {
                "type": "Feature",
                "properties": {},
                "geometry": {
                    "type": "Polygon",
                    "coordinates": [[
                        [-74.0170, 40.7050],
                        [-74.0030, 40.7050],
                        [-74.0030, 40.7180],
                        [-74.0170, 40.7180],
                        [-74.0170, 40.7050]
                    ]]
                }
            }
        ]
    },
    "date_time": {
        "start_date": "2024-07-15",
        "start_time": "14:00",
        "filter_type": 1
    },
    "granularity": 100
}

response = requests.post(submit_url, headers=headers, json=payload)
activity_id = response.json()["data"]["activity_id"]
print(f"Task submitted. Activity ID: {activity_id}")
Copy
Step 2 — Check task status
import requests
import time

status_url = f"https://api.fortyguard.com/v1/status/{activity_id}"
headers = {
    "api-key": "YOUR_API_KEY"
}

for _ in range(120):
    status_response = requests.get(status_url, headers=headers)
    status_data = status_response.json()["data"]
    status = status_data["status"].lower()

    if status in ("completed", "succeeded"):
        print("Task completed successfully!")
        break
    elif status in ("failed", "error"):
        raise RuntimeError("Task failed.")
    else:
        print("Task is still processing...")
        time.sleep(5)
else:
    raise TimeoutError("Task did not complete in time.")
Copy
On this page
Authentication
Making a Request
Tracking Task Status
Example Code (Python)
PREVIOUS
Introduction
NEXT
Authentication


---

### documentation/pages/release-notes.md

Source path: `documentation/pages/release-notes.md`

# /docs/release-notes

Captured: 2026-11-18T15:01:04.592Z
HTTP 200
Elapsed ms: 31868
H1: Release Notes

API Documentation
⌘K
GUIDES
Introduction
Quickstart
Authentication
MCP
MCP Overview
MCP Quickstart
MCP Authentication
Available Tools
Client Setup
Troubleshooting
INTEGRATIONS
QGIS
ANALYSIS ENDPOINTS
Create Heatmap
POST
Satellite View Segmentation
POST
Street View Segmentation
POST
Heat Intelligence
POST
Environmental Parameters
POST
Temperature-Aware Routing
POST
MONITORING & ALERTING
Monitors
Alerts
TASK MANAGEMENT
Check Status
GET
Check API Credits Usage
GET
RESOURCES
Get a Free API Key
POST
Known Limitations
Release Notes
Release Notes

A running log of every change to the FortyGuard's Temperature API® and its documentation. Entries are listed most-recent first and grouped by the type of change so you can quickly spot what's new, what's been updated, and what has been deprecated.

Tip: Bookmark this page to stay current with platform changes. Major version upgrades and breaking changes will always be announced here in advance.

v1.0.0
LATEST
APRIL 22, 2026
Initial Public Release

First general-availability release of the FortyGuard Enterprise API. Introduces the core Temperature API® surface, two subscription plans, credit tracking, and complete documentation for every supported endpoint.

ADDED
POST /v1/heatmap — generate high-resolution GeoJSON thermal maps for a polygon AOI across Single Hour, Range of Hours, and Single Day filters at granularity 60m / 80m / 100m.
POST /v1/satellite — tile-based satellite view segmentation with Base64-encoded imagery and per-class coverage metrics.
POST /v1/streetview — ground-level street view segmentation including front (and optional back) view with per-class coverage metrics.
POST /v1/heat_intelligence — multi-dimensional Heat Intelligence Reports across Geographic, Environmental, Urban, Events, and Anthropogenic categories, delivered through a temporary download_link returned by the completed status response.
POST /v1/env_params — Environmental Parameters including heat index, apparent temperature, wet bulb temperature, relative humidity, AQI (PM2.5 / PM10 / NO₂ / CO / O₃ / SO₂), methane, CO₂, and solar irradiance (GHI / DNI / DHI).
GET /v1/status/{activity_id} — unified status and result-retrieval endpoint for all asynchronous submissions.
API key authentication via the api-key request header — no OAuth or token exchange required.
POST /v1/system/fetch-api-key-usage and /v1/system/fetch-api-key-custom-usage — credit usage reporting at both billing-cycle and custom date-range granularity.
PLANS & ACCESS CONTROL
API Basic plan — 1,000,000 monthly credits, commercial license, heatmaps up to 10 mi², full Map Statistics, and up to 3 customizable environmental parameters per request.
API Premium plan — 5,000,000 monthly credits, commercial license, heatmaps up to 50 mi², full Environmental Parameters, and access to Satellite Segmentation, Street View Segmentation, Heat Intelligence, and the Temperature Property API.
Per-endpoint plan availability badges and an in-page availability banner on every endpoint, so subscribers can see at a glance what each plan unlocks.
DOCUMENTATION
Quickstart guide covering authentication, request submission, and activity-status polling with a runnable Python example.
Known Limitations page documenting plan limits, input constraints, rate limits, processing behavior, and regional coverage.
Release Notes page (this page) tracking every API and documentation change.
Credit Usage Tracker — enter your API key to view your plan, remaining credits, activity breakdown, and custom date-range usage.
PREVIOUS
Known Limitations


---

### documentation/pages/routing.md

Source path: `documentation/pages/routing.md`

# /docs/routing

Captured: 2026-11-18T14:55:25.831Z
HTTP 200
Elapsed ms: 32027
H1: Temperature-Aware Routing

API Documentation
⌘K
GUIDES
Introduction
Quickstart
Authentication
MCP
MCP Overview
MCP Quickstart
MCP Authentication
Available Tools
Client Setup
Troubleshooting
INTEGRATIONS
QGIS
ANALYSIS ENDPOINTS
Create Heatmap
POST
Satellite View Segmentation
POST
Street View Segmentation
POST
Heat Intelligence
POST
Environmental Parameters
POST
Temperature-Aware Routing
POST
MONITORING & ALERTING
Monitors
Alerts
TASK MANAGEMENT
Check Status
GET
Check API Credits Usage
GET
RESOURCES
Get a Free API Key
POST
Known Limitations
Release Notes
Temperature-Aware Routing
POST
/v1/routing

Temperature-Aware Routing generates temperature-aware driving route alternatives for an origin, destination, and departure time. Submit POST /v1/routing to start an asynchronous activity, then poll GET /v1/status/{activity_id} until the activity is Completed or Failed. The maximum origin-to-destination straight-line distance is 200 km.

How it works:

POST /v1/routing accepts the request
Receive an activity_id
Poll GET /v1/status/{activity_id}
Completed: consume the routing result
Failed: inspect the routing error
Available in
API PREMIUM
Credit cost:
3,500 credits per request (Premium)
Required attributes
Required attributes
origin
object
REQUIRED

Route origin. Include lat (decimal latitude, -90 to 90) and lon (decimal longitude, -180 to 180).

destination
object
REQUIRED

Route destination. Include lat (decimal latitude, -90 to 90) and lon (decimal longitude, -180 to 180). The origin and destination must be different.

departure_time
string
REQUIRED

ISO-8601 departure datetime.

Request
Response
Test request
PYTHON
Copy
import requests

response = requests.post(
    "https://api.fortyguard.com/v1/routing",
    headers={"api-key": "your_api_key"},
    json={
        "origin": {
            "lat": 40.7812,
            "lon": -73.9665
        },
        "destination": {
            "lat": 40.7580,
            "lon": -73.9855
        },
        "departure_time": "2026-10-19T12:00:00Z"
    }
)

print(response.json())
PREVIOUS
Environmental Parameters
NEXT
Create Monitor


---

### documentation/pages/satellite-view-segmentation.md

Source path: `documentation/pages/satellite-view-segmentation.md`

# /docs/satellite-view-segmentation

Captured: 2026-11-18T14:53:20.928Z
HTTP 200
Elapsed ms: 30851
H1: Satellite View Segmentation

API Documentation
⌘K
GUIDES
Introduction
Quickstart
Authentication
MCP
MCP Overview
MCP Quickstart
MCP Authentication
Available Tools
Client Setup
Troubleshooting
INTEGRATIONS
QGIS
ANALYSIS ENDPOINTS
Create Heatmap
POST
Satellite View Segmentation
POST
Street View Segmentation
POST
Heat Intelligence
POST
Environmental Parameters
POST
Temperature-Aware Routing
POST
MONITORING & ALERTING
Monitors
Alerts
TASK MANAGEMENT
Check Status
GET
Check API Credits Usage
GET
RESOURCES
Get a Free API Key
POST
Known Limitations
Release Notes
Satellite View Segmentation
POST
/v1/satellite

Analyze a specific location using latitude and longitude coordinates.

Available in
API PREMIUM
Credit cost:
14,400 credits/request (Premium)
Required attributes
Optional attributes
Result Schema
Result Output Fields
Required attributes
sat
object
REQUIRED

Satellite data object containing location coordinates.

sat.latitude
number
REQUIRED

Latitude coordinate of the location.

sat.longitude
number
REQUIRED

Longitude coordinate of the location.

date_time
object
REQUIRED

Date and time range configuration object.

date_time.start_date
string
REQUIRED

Start date in YYYY-MM-DD format, subject to server-supported date validation. Imagery capture date is not guaranteed to match this requested analysis date. No parent heatmap is required.

date_time.filter_type
number
REQUIRED

Filter type options:

1 (Single Hour) - requires start_date and start_time
2 (Range of Hours) - requires start_date, start_time, and end_time
3 (Single Day) - requires only start_date
Optional attributes
granularity
number
OPTIONAL

Numeric metres: 20, 60, 80, or 100 (default). 20 selects an 80×80 pixel centered image crop, independent of temperature-catalog coverage.

date_time.end_date
string
OPTIONAL

End date in YYYY-MM-DD format. Auto-populated based on filter_type.

date_time.start_time
string
OPTIONAL

Start time in HH:MM 24-hour format. Required for filter_type 1 and 2.

date_time.end_time
string
OPTIONAL

End time in HH:MM 24-hour format. Required for filter_type 2.

Result Schema

Once the satellite segmentation activity has finished processing, the final response contains three main outputs:

Location metadata (coordinates) - the latitude/longitude that was analyzed
Source imagery (original_image; legacy alias orignal_image) - the original satellite image returned as Base64
Segmentation outputs (segmentation) - class coverage %, legend colors, and the segmentation mask returned as Base64

For point satellite imagery, image_year/image_date are null when the provider does not expose capture dates; imagery_retrieved_at is retrieval time, not capture time. At 20 m the fixed centered image crop is 80×80 pixels; this is not a claim that provider imagery/weather resolution equals the thermal tile resolution.

This response is returned when the activity status is "Completed".

Result Output Fields
Coordinates
object

Location that was analyzed.

latitude (string) - Latitude value
longitude (string) - Longitude value
Orignal_image
array[string]

One or more Base64-encoded original satellite images (typically PNG/JPEG). Note: If you return raw Base64 (no prefix), users may need to prepend: data:image/png;base64, to render in a browser.

Image_year
number

Year of the satellite imagery used for the segmentation.

Segmentation
object

Model output + metadata for the satellite image.

image_dimensions (object) - Output image size in pixels
height (number): Pixel height
width (number): Pixel width
mode (string) - Processing mode (e.g., "sat" for satellite)
processing_time_seconds (number) - Time taken to run segmentation (seconds)
request_id (string) - Internal identifier for tracing/debugging
segments (object) - Class coverage values (typically percentages)
image_legend (object) - RGB legend for rendering the segmentation mask
image_content (string) - Base64-encoded segmentation mask image, decode to display/save the segmentation output. Note: If raw Base64, users may need data:image/png;base64, to render in a browser
Request
Response
Result Schema
Test request
PYTHON
Copy
import requests

response = requests.post(
    'https://api.fortyguard.com/v1/satellite',
    headers={'api-key': 'your_api_key'},
    json={
        'sat': {
            'latitude': 41.84632807720175,
            'longitude': -87.74329628220852
        },
        'date_time': {
            'start_date': '2024-07-15',
            'start_time': '14:00',
            'filter_type': 1
        },
        'granularity': 80
    }
)
PREVIOUS
Create Heatmap
NEXT
Street View Segmentation


---

### documentation/pages/sidebar-after-expand.json

Source path: `documentation/pages/sidebar-after-expand.json`

```json
[
  {
    "text": "Introduction",
    "href": "/docs/introduction"
  },
  {
    "text": "Quickstart",
    "href": "/docs/quickstart"
  },
  {
    "text": "Authentication",
    "href": "/docs/authentication"
  },
  {
    "text": "MCP Overview",
    "href": "/docs/mcp-overview"
  },
  {
    "text": "MCP Quickstart",
    "href": "/docs/mcp-quickstart"
  },
  {
    "text": "MCP Authentication",
    "href": "/docs/mcp-authentication"
  },
  {
    "text": "Available Tools",
    "href": "/docs/mcp-tools"
  },
  {
    "text": "Client Setup",
    "href": "/docs/mcp-client-setup"
  },
  {
    "text": "Troubleshooting",
    "href": "/docs/mcp-troubleshooting"
  },
  {
    "text": "QGIS",
    "href": "/docs/qgis-integration"
  },
  {
    "text": "Create Heatmap POST",
    "href": "/docs/create-heatmap"
  },
  {
    "text": "Satellite View Segmentation POST",
    "href": "/docs/satellite-view-segmentation"
  },
  {
    "text": "Street View Segmentation POST",
    "href": "/docs/street-view-segmentation"
  },
  {
    "text": "Heat Intelligence POST",
    "href": "/docs/heat-intelligence"
  },
  {
    "text": "Environmental Parameters POST",
    "href": "/docs/environmental-parameters"
  },
  {
    "text": "Temperature-Aware Routing POST",
    "href": "/docs/routing"
  },
  {
    "text": "Create Monitor POST",
    "href": "/docs/monitoring-create"
  },
  {
    "text": "List Monitors GET",
    "href": "/docs/monitoring-list"
  },
  {
    "text": "Get Monitor GET",
    "href": "/docs/monitoring-get"
  },
  {
    "text": "Update Monitor PATCH",
    "href": "/docs/monitoring-update"
  },
  {
    "text": "Delete Monitor DELETE",
    "href": "/docs/monitoring-delete"
  },
  {
    "text": "List Alerts GET",
    "href": "/docs/monitoring-alerts"
  },
  {
    "text": "Alert Report GET",
    "href": "/docs/monitoring-report"
  },
  {
    "text": "Check Status GET",
    "href": "/docs/check-status"
  },
  {
    "text": "Check API Credits Usage GET",
    "href": "/docs/credits-usage"
  },
  {
    "text": "Get a Free API Key POST",
    "href": "/docs/generate-free-key"
  },
  {
    "text": "Known Limitations",
    "href": "/docs/limitations"
  },
  {
    "text": "Release Notes",
    "href": "/docs/release-notes"
  },
  {
    "text": "View Plans & Pricing",
    "href": "https://fortyguard.com/api-pricing"
  },
  {
    "text": "NEXT Quickstart",
    "href": "/docs/quickstart"
  }
]
```


---

### documentation/pages/street-view-segmentation.md

Source path: `documentation/pages/street-view-segmentation.md`

# /docs/street-view-segmentation

Captured: 2026-11-18T14:53:51.793Z
HTTP 200
Elapsed ms: 30864
H1: Street View Segmentation

API Documentation
⌘K
GUIDES
Introduction
Quickstart
Authentication
MCP
MCP Overview
MCP Quickstart
MCP Authentication
Available Tools
Client Setup
Troubleshooting
INTEGRATIONS
QGIS
ANALYSIS ENDPOINTS
Create Heatmap
POST
Satellite View Segmentation
POST
Street View Segmentation
POST
Heat Intelligence
POST
Environmental Parameters
POST
Temperature-Aware Routing
POST
MONITORING & ALERTING
Monitors
Alerts
TASK MANAGEMENT
Check Status
GET
Check API Credits Usage
GET
RESOURCES
Get a Free API Key
POST
Known Limitations
Release Notes
Street View Segmentation
POST
/v1/streetview

This endpoint performs segmentation analysis on street view imagery to identify and classify urban features, building facades, vegetation, road surfaces, and thermal characteristics from ground-level perspectives.

Available in
API PREMIUM
Credit cost:
8,600 credits/request (Premium)
Required attributes
Result Output Fields
Required attributes
latitude
number
REQUIRED

Latitude coordinate of the street view location.

longitude
number
REQUIRED

Longitude coordinate of the street view location.

vertical_angle
number
REQUIRED

Vertical viewing angle in degrees (tilt up/down).

horizontal_angle
number
REQUIRED

Horizontal viewing angle in degrees (pan left/right, 0-360).

back_view
boolean
REQUIRED

Whether to capture the back view (opposite direction).

Result Output Fields
Coordinates
object

Location that was analyzed.

latitude (string) - Latitude value
longitude (string) - Longitude value
Front
object

Street View "front" camera results for that location.

original_image (string) - Base64-encoded original street view image. Note: If raw Base64, users may need data:image/png;base64, to render in a browser
segments (object) - Class coverage values (typically percentages of the image)
image_legend (object) - RGB color legend for rendering the segmentation output
segmented_image (string) - Base64-encoded segmentation mask image, decode to display/save the segmentation output
image_date (string) - Date the Street View image was captured, in YYYY-MM-DD format
Request
Response
Result Schema
Test request
PYTHON
Copy
import requests

response = requests.post(
    'https://api.fortyguard.com/v1/streetview',
    headers={'api-key': 'your_api_key'},
    json={
        'latitude': 40.7128,
        'longitude': -74.0060,
        'vertical_angle': 10.0,
        'horizontal_angle': 90.0,
        'back_view': False
    }
)
PREVIOUS
Satellite View Segmentation
NEXT
Heat Intelligence


---

## Functional test — SUBMITTED.lock

Source path: `functional-test/SUBMITTED.lock`

```
{"at":"2026-11-18T16:10:23.161Z","path":"/v1/env_params"}
```
