# Evaluation closure summary

18 November 2026. This summary predates the second pass. The current package is `docs/26-final-evaluation-package.md`. The second pass spent 0 credits. The form has not been submitted. The clarification email has not been sent.

## Scope

| Workstream | Status | What complete means |
| --- | --- | --- |
| Dashboard | CLOSED — PARTIALLY BLOCKED BY AVAILABILITY | The reachable screens were recorded. The rest could not be opened. |
| REST API | COMPLETE | All six documented POST routes and the shared status route were reviewed. |
| REST API documentation | COMPLETE | Authentication, errors, async status, costs, plan limits, and the published conflicts were reviewed. |
| MCP | COMPLETE | Connection, the failed and recovered handshakes, all 11 live schemas, and the free balance call were reviewed. |
| MCP documentation | COMPLETE | The published nine-tool catalogue was compared with the live 11-tool catalogue. |
| Cross-product analysis | COMPLETE | Units, identifiers, lifecycle, credits, and errors were compared only where a page or a response was in hand. |
| Rating decision | COMPLETE — NO DEFENSIBLE SCORE | All four fields. Provisional 6s withdrawn. |
| Submission clarification | AWAITING | The hiring contact has not been asked. |
| Feedback form | NOT SUBMITTED | Identity fields are empty. |

## Live execution, and what was not executed

| Action | Class |
| --- | --- |
| `POST /v1/env_params` completed as `98a664cb-d9bb-484c-82a1-3d23ed9c7365` | Live. Balance 1,000,000 to 997,100. Difference 2,900. |
| Status reads: missing key 401, invalid key 401, unknown id 404, completed job 200 | Live. |
| Heatmap, routing, heat intelligence, street view, and satellite | Contract, cost, and workflow reviewed. Not executed. |
| MCP initialize HTTP 200 then HTTP 503 | Live historical failure. |
| Later MCP handshake HTTP 200 then HTTP 202, then 11 tools | Live. |
| `credit_balance` twice, `cost_credits` 0 | Live. |
| The other ten MCP tools | Schemas, prices, and required fields reviewed. Not executed. |
| Local contract tests, 24 passed | Fixtures. Not live API tests. |
| Dashboard login timeout, Alabama demo, Feature Updates versions, misdirected-request page | Observed. |
| Settings, Feedbacks, zoom, basemap, second location, release-note text | `NOT TESTED`. Not defects. |

No other credit charge is claimed.

## Findings that remain

- The dashboard showed `upstream request timeout` and, later, `misdirected request to "dashboard.fortyguard.com"`.
- The completed environmental job kept the coordinate, used a Phoenix offset, and named the units. The job body does not show the 2,900-credit charge.
- REST errors use one envelope and distinguish a missing key from an invalid key.
- The report temperature is Fahrenheit in the live MCP schema, Celsius on the published MCP page, and both on the REST Heat Intelligence page. No report was executed.
- REST uses `activity_id`. `report_read` requires `analytics_id`. The alias is description text, not a schema field.
- The published MCP catalogue has nine tools. The server listed eleven, including `credit_balance` and `monitoring`.

## Ratings

Dashboard usability, API, MCP, and overall experience are each `NO DEFENSIBLE SCORE`. The assigned reviews are complete. A submitted number would still be read as live proof of every paid operation and of the dashboard workflows that availability blocked.

## Administrative actions left

1. Enter name, email, position, and time spent yourself.
2. Read any consent line on the live form.
3. Decide whether to send `docs/15-hiring-contact-clarification-email.md` before entering the four ratings.
4. Copy the narrative from `docs/12-final-feedback-form-draft.md` using `docs/19-manual-submission-guide.md`.
5. Submit the form yourself, if you choose to. This closure does not submit it.

## Package for hiring-team review

The written package is ready to review: the tracker, this summary, the form draft, the rating decision, and the evidence files named in the form draft.

The form itself is not ready to send until the personal fields are filled and the rating fields are either left blank with the contact's agreement or filled from an instruction the contact gives.
