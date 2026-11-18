# API evaluation

Status: inventory and test design. No request has been sent to `api.fortyguard.com`.

The live docs host returned HTTP 504 during this pass. Costs and fields come from indexed endpoint pages and are stored in `src/api/endpoints.ts`. Phase 3 replaces any row that disagrees with a rendered page or a recorded response.

## Endpoint inventory

| Method | Path | Auth | Required inputs | Async | Credits | Plans |
| --- | --- | --- | --- | --- | ---: | --- |
| POST | `/v1/heatmap` | `api-key` | `polygon_aoi`, `date_time` | Yes | 3,500 Basic/Startup, 4,220 Premium | All |
| POST | `/v1/env_params` | `api-key` | `latitude`, `longitude`, `temperature` °C, `date_time` | Documented as yes | 2,110 Basic/Startup, 2,900 Premium | All |
| GET | `/v1/status/{activity_id}` | `api-key` | `activity_id` | Read | 0 documented | All |
| POST | `/v1/routing` | `api-key` | `origin`, `destination`, `departure_time` | Yes | 3,500 Premium | Premium |
| POST | `/v1/heat_intelligence` | `api-key` | `latitude`, `longitude`, `temperature`, `date`, `analysis` | Yes | 8,600 Premium | Premium |
| POST | `/v1/streetview` | `api-key` | `latitude`, `longitude`, `vertical_angle`, `horizontal_angle`, `back_view` | Yes | 8,600 Premium | Premium |
| POST | `/v1/satellite` | `api-key` | `sat.latitude`, `sat.longitude`, `date_time` | Yes | 14,400 Premium | Premium |

Optional fields worth re-reading before a call: heatmap `granularity`, `analytic_type`, `map_type`; env `analysis[]`; satellite `granularity`; status `result_delivery=links`.

Documented errors: `400` or `422` validation, `401` missing or invalid key, `403` plan or authorization, `404` unknown activity or a short window after submit, `429` rate limit, `500` server error. Error body shape is not in the excerpts.

Documented status values: `Processing`, `Completed`, `Failed`. The quickstart snippet also accepts `succeeded` and `error`.

## Behaviors to investigate

Authentication consistency, status codes, coordinate and GeoJSON validation, missing fields, unexpected bodies, identifier format, timeout, retry, idempotency, rate limit, pagination, credit deduction, and error-message quality.

Pagination does not appear in the task API. It may be irrelevant. Rate-limit numbers were not published in the excerpts. Idempotency keys were not published. Neither absence is a confirmed bug.

## Execution rules for Phase 3

The client refuses a paid path unless `FORTYGUARD_ALLOW_PAID=true` and the documented cost fits `FORTYGUARD_CREDIT_BUDGET`.

Order:

1. Record the plan and the credit balance from the account. If the balance is not visible, stop before any POST that can complete.
2. Call with no key, then with a dummy key. Expect `401`. Record the body with the dummy key redacted.
3. Call `POST /v1/env_params` without `temperature`. Expect `400` or `422`, and no `activity_id`.
4. Call `POST /v1/heatmap` with an unclosed ring. Same expectation.
5. Call `GET /v1/status/does-not-exist`. Expect `404`.
6. If, and only if, those calls did not accept work, run one `POST /v1/env_params` for New York, `40.7128, -74.0060`, temperature `32.5`, date `2024-07-15`, hour `14:00`, filter type `1`, and at most three analysis names. Poll at 5 second intervals, no more than 10 minutes. Record status transitions.
7. Do not run heatmap, routing, street view, satellite, or Heat Intelligence in that first pass.

Use a historical hour from the docs rather than the current hour. The contract says catalog availability is separate from request acceptance, and a recent date can fail after acceptance. A failed activity is documented as free, but that rule is part of what we are checking, so the first success should be a date the docs themselves use.

If the key is Basic or Startup, Premium-only endpoints are tested with one deliberately small request to see whether the refusal is `403` before any processing. That request must be stopped if the response contains an `activity_id`.

## Results

None. Local tests cover the fixture shapes, the credit guard, and redaction only: `npm test`, 9 tests, 17 November 2026.
