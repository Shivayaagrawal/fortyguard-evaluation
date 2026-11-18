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
