# Status read timeouts — 17 November 2026

No API key is stored in this file.

The status page listed Heatmap, Environmental Parameters, and the other processing APIs as down, incident start `2026-11-17T20:47:15Z`. Authentication and Accounts were marked operational.

`GET https://api.fortyguard.com/v1/status/does-not-exist` was attempted three times from this machine, each with a 15 second limit:

| Attempt | Credential | Result |
| --- | --- | --- |
| 1 | Header omitted | Aborted. No status code. No body. |
| 2 | A dummy key, not the account key | Aborted. No status code. No body. |
| 3 | The account key from `.env` | Aborted. No status code. No body. |

A separate `curl` with no credential timed out after 12 seconds and received 0 bytes.

POST `/v1/env_params` and POST `/v1/heatmap` were not sent. The status page said those services were down, and a client timeout can happen after the server has accepted a job.

No `activity_id` was returned. The account plan and credit balance are still unknown.
