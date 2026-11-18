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
