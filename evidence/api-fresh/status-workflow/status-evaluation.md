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
