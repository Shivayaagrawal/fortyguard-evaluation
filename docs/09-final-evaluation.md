# Final evaluation — form draft

Superseded by `docs/PRODUCT_EVALUATION_TRACKER.md`, `docs/FINAL_GOOGLE_FORM_RESPONSES.md`, and `docs/10-cross-product-and-final-report.md`. Do not add new findings here.

Status: not submitted. MCP testing is closed. Ratings stay blank.

The form is not submitted from this repository.

Tone for the final text: a working engineer who used the product, not a product announcement. The notes below are evidence so far. They are not the answers to paste.

## Dashboard

Phase 2, 17 November 2026, about 20:50 UTC. The product was not reached. Detail is in `docs/dashboard/06-dashboard-summary.md`. API, MCP, and overall ratings below were not changed in this phase.

### 1. First impression

Not answered. `https://dashboard.fortyguard.com/login` showed `upstream request timeout` and no sign-in form. DASH-001. Screenshot: `evidence/dashboard/screenshots/dash-001-login-upstream-timeout.png`.

### 2. What did you like most?

Not answered.

### 3. What did you dislike most?

Not answered.

### 4. Bugs, issues, or confusing behavior

No in-product bug. DASH-001 is availability of the login URL.

### 5. Top three recommendations

Not answered.

### 6. Usability rating, 1–10

Not scored.

## API

Phase 3, 17 November 2026. Detail: `docs/api/06-api-summary.md`. MCP and overall ratings were not changed.

### 7. API rating, 1–10

Not scored. The key is accepted and an unknown activity is a 404. No processing request was made, so a score would not cover the product's actual job.

### 8. Design issues or missing endpoints

The status route exists and answered. Missing key and invalid key are different 401 messages. The account key then receives 404, "No activity found for the provided activity_id."

Still open as documentation, not as a failed live job:

- Heat Intelligence temperature unit. DOC-002.
- Two official `polygon_aoi` shapes. DOC-003.
- `activity_id` on REST versus `heatmap_id` and `analytics_id` on MCP. API-001. The live 404 uses the REST name.
- No documented idempotency key for a submit timeout.
- Temperature Property Reports are named in the introduction and were not found as a seventh POST. Unconfirmed.

### 9. How would you improve the API documentation?

Generate the examples from one schema. Use one polygon shape, one activity field, and one temperature unit. Say, next to each MCP tool, whether it waits or returns an activity. Publish the credit cost on the MCP page. Document the submit-timeout case beside the charge-on-completion rule. Keep the plan matrix, the missing-value rule, and the error text that already names the `api-key` header.

## MCP

Phase 4. The current evidence is one approved handshake: HTTP 200, then HTTP 503. Detail: `docs/mcp/07-documentation-and-failure-analysis.md`. The overall rating was not changed.

### 10. What did you try with MCP?

One Streamable HTTP handshake to `https://tos-mcp.app.fortyguard.com/mcp` with the documented bearer token, using `@modelcontextprotocol/sdk` 1.32.2. Initialize returned HTTP 200 for FortyGuard 4.0.11. The next POST returned HTTP 503. No tool was listed or called. MCP-001.

### 11. Which AI tool did you use?

Cursor is the evaluation environment. The handshake used the official MCP TypeScript SDK. The bearer token was not pasted into Cursor's MCP settings. No model selected a FortyGuard tool.

### 12. MCP rating, 1–10

Not scored. Discovery and invocation did not happen.

### 13. Setup or use issues

The server returned a valid initialize result, then HTTP 503 with the message "Authentication service is temporarily unavailable." That does not establish an invalid key. The cause is unverified. MCP-001.

## Overall

### 14. Overall experience, 1–10

Pending.

### 15. Additional comments

Working material, not the final paragraph:

The public contract is thoughtful where it is specific. One status resource, credits only on success, a plan matrix, a large-result download escape hatch, and an explicit missing-value rule are signs of a team that has operated these jobs. The same contract undermines itself where a caller has to pick between two examples. The status page is currently more informative than the docs host, and then spends that advantage on a month-old MCP incident and a burst of identical processing incidents.

### 16. Supporting evidence

This repository, after the remaining phases are filled in. There is no public link yet. Do not create one until the user asks, and do not include `.env` or raw signed download URLs.

## Answer rules for the final edit

- Every rating cites something that was clicked or returned.
- Suspected items stay out of the bug question.
- Include at least one thing the product does well. The billing rule and the plan matrix already qualify.
- Keep each answer short enough for a form field. Put the reproduction detail in `docs/07-findings-and-anomalies.md`.
