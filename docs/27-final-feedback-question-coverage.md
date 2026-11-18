# Feedback question coverage

18 November 2026. Source of the questions: `docs/12-final-feedback-form-draft.md`, the 19-question list. The tracker still prints an older 16-question map. Paste by wording, not by that older number.

The form has not been submitted. A paragraph in the draft is not treated as coverage unless the cited evidence exists.

| Question | Answer present | Evidence | Basis | Revision | Stronger test, if wanted |
| --- | --- | --- | --- | --- | --- |
| 1. Full name | No. Left for the applicant. | None in the repository. | Not a product observation. | No product text to add. | None. |
| 2. Email | No. Left for the applicant. | None. An earlier accidental account screen was not kept. | Not a product observation. | Do not reconstruct an address. | None. |
| 3. Position | No. Left for the applicant. | None. | Not a product observation. | No product text to add. | None. |
| 4. Time spent | No reliable total. | Session dates are 17 and 18 November 2026. A few request durations exist. | Those durations are not a review total. | Do not calculate a number from the dates. | The applicant's own record. |
| 5. Dashboard first impression | Yes. | `docs/16-dashboard-final-completion.md`. Screenshots `dash-001` and `dash-006`. | Observation. Not retested in this audit. | No. Untested controls stay out of the answer. | A later session that loads login and the map. Not run. |
| 6. What was liked most | Yes. | Completed job `evidence/api/responses/2026-11-18-env-params-status.json`. Status errors in `evidence/qa-audit/rest-api/`. `credit_balance` at cost 0. Demo and version list in the dashboard notes. | Live API and MCP, plus one dashboard observation. | No. The answer is a preference across products, and each cited part has a record. | Paid routes were not needed to support this sentence. |
| 7. What was disliked most | Yes. | Gateway strings in the dashboard notes. Job body has no credit field, confirmed again at 13:13 UTC. Unit conflict on the heat-intelligence page and the live `report` description. | Observation, live response, and current documentation. | No. | A report call would show the stored unit. It was not authorized. |
| 8. Bugs and confusing behaviour | Yes, for the items named. | DASH-001. Misdirected-request page. MCP 503 file `evidence/mcp/configuration/2026-11-18-initialize-diagnostic.json`. Current pages and the QA schema digest. | Confirmed availability and contract conflicts. The 503 was not reproduced at 13:13 UTC. | No. The popup without a temperature stays an observation. | Error bodies for the five paid routes. Not authorized. |
| 9. Three dashboard recommendations | Yes. | The two gateway strings, the popup and the earlier `60.59°F` tile, and the version counts without note text. | Observation. | No. They do not cover Settings, Feedbacks, zoom, or the basemap switch. | Those controls. Not run. |
| 10. Dashboard rating | Decision only: `NO DEFENSIBLE SCORE`. | `docs/13-final-rating-assessment.md`. | The blocked session and unused controls. | Do not enter a number. | A full dashboard session. Not run. |
| 11. API rating | Decision only: `NO DEFENSIBLE SCORE`. | One completed job and the status reads. Five POST routes have no live response. | Live slice plus contract review. | Do not enter a number. The sentence already says the five routes were not executed. | The five paid routes. Not authorized. |
| 12. API design issues | Yes. | Completed body has no credit field. `report_read` properties are `heatmap_id` and `analytics_id`, with `additionalProperties` false. Heatmap page example is a bare Polygon. Published catalogue lists nine tools. | Live body, live schema, and current pages. | No. These are design and documentation issues. They are not live proof that the five POST routes fail. | A REST idempotency field was not observed because heatmap was not sent. |
| 13. Evidence links | Yes, as local paths. No public URL. | Paths in the draft, plus `evidence/phase11/` and `evidence/qa-audit/`. | File index. | The QA paths were added. Still no public link. | A hosting decision by the applicant. |
| 14. Documentation improvements | Yes. | Same-day pages: heat intelligence still says Fahrenheit and then Celsius. MCP tools still says Celsius, nine tools, and `heatmap_id` example `hm_123`. | Documentation review on 18 November. | No. | None without a product change. |
| 15. MCP tools and client | Yes. | SDK 1.32.2 is in the lockfile. QA file lists 11 names and invokes only `credit_balance`. | Live discovery and one call. | The narrative "called twice" was corrected. Q15 already said only `credit_balance` was invoked. | The other ten tools. Not authorized, except any later proof that a read is free. |
| 16. MCP rating | Decision only: `NO DEFENSIBLE SCORE`. | Handshake, 11 schemas, one free call. | Live discovery is not execution of the other tools. | Do not enter a number. | Paid or uncertain tools. Not authorized. |
| 17. MCP setup issues | Yes. | 503 file kept. Later recovered handshake. QA handshake succeeded as FortyGuard 4.0.11. Published page still lists nine tools and Celsius. | Historical failure plus current success and current docs. | No. Do not describe MCP as down now. | The 503 cause. Not diagnosed. |
| 18. Overall rating | Decision only: `NO DEFENSIBLE SCORE`. | The three product rows. | An average would hide the blocked dashboard and the unexecuted paid work. | Do not enter a number. | Not an additional product test. |
| 19. Additional comments | Yes. | Job coordinate `33.4484, -112.074`, Phoenix offset, balance files 1,000,000 then 997,100, catalogue mismatch, dashboard gateway line. | Live and documented. The 2,900 figure remains an observed difference, not an invoice. | No. | The report unit and the 503 cause remain open. |

## Dashboard items against the feedback questions

| Item | Status |
| --- | --- |
| First impression | Partially observed. Timeout, then the Alabama demo, then the misdirected-request page. |
| Navigation and usability | Partially observed. The demo and Feature Updates were reached. Settings, Feedbacks, zoom, and the basemap switch were visible in earlier notes and not used. |
| Most useful feature | Partially observed. The demo and the version list were the usable parts. |
| Least useful feature | Not established. Too little of the product stayed available to rank a weak feature. |
| Bugs and confusing behaviour | Observed and supported for the two gateway strings. Untested controls are not bugs. |
| Performance and responsiveness | Partially observed. No timing benchmark. The failures were gateway pages, not slow product screens. |
| Recommendations | Supported for the three items in question 9. Not applicable to controls that were never used. |

## Answer corrections made

- Section C no longer says `credit_balance` was called twice. The recorded reads are the two balance files, the second-pass discovery file, and `evidence/qa-audit/mcp/2026-11-18T13-13-20-004Z-discovery-and-balance.json`.
- Question 13 now includes `evidence/phase11/` and `evidence/qa-audit/`.

No rating text was changed to a number.
