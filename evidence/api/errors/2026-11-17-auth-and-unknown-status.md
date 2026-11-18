# Auth and unknown-activity reads — 17 November 2026

No API key is stored in this file. No POST was sent.

Base URL: `https://api.fortyguard.com`. Path: `GET /v1/status/does-not-exist`.

| Attempt | Credential | HTTP | Body |
| --- | --- | ---: | --- |
| 1 | Header omitted | 401 | `{"error":true,"status_code":401,"details":{"message":"Missing required 'api-key' header. Send your key in the 'api-key' request header."}}` |
| 2 | Dummy key `invalid-evaluation-key` | 401 | `{"error":true,"status_code":401,"details":{"message":"Invalid or unknown API key."}}` |
| 3 | Account key from `.env` | 404 | `{"error":true,"status_code":404,"details":{"message":"No activity found for the provided activity_id."}}` |

Each call returned in about 1.1–1.3 seconds. None returned an accepted activity. The account plan and the credit balance were not in these bodies.

The docs host `https://docs-api.fortyguard.com/docs/introduction` returned HTTP 200 in about 1.0 second. The body is an application shell (`<app-root>`), not the article text. The contract text used below is still the indexed page text from the earlier review, plus these live responses.
