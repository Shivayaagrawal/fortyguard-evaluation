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
