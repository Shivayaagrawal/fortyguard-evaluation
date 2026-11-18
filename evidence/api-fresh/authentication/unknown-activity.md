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
