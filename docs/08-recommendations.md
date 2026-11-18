# Recommendations

Status: historical. The ranked phase 6 recommendations are in `docs/12-final-feedback-form-draft.md`. The idempotency note below is still open for REST. MCP `heatmap` now has an optional `idempotency_key`, so that part of recommendation 2 is outdated.

These three recommendations were written before the completed API job and the live MCP schemas. They are not the form answers.

## 1. Publish one contract for REST and MCP

**Current behavior.** The HTTP API and the agent tools expose the same jobs through different names, different identifier fields, and at least one conflicting temperature unit. Two heatmap examples use different GeoJSON types.

**Problem.** A developer and an agent can both "follow the docs" and produce different requests. The expensive failure is silent: a Heat Intelligence job that completes at the wrong unit still costs 8,600 premium credits. The cheap failure is the first integration, where the copied polygon shape or the copied activity id does not match the other page.

**Proposed shape.** One internal operation schema. REST and MCP are generated views. Each numeric measurement names its unit in the field (`temperature_celsius`) or in a required sibling. Every accepted job returns `activity_id`. Read tools accept that field, with the old names as aliases for one release. Examples are generated from the schema so the authentication page cannot drift from the heatmap page.

**Benefit.** Removes the class of bugs FG-03, FG-04, and FG-05. Gives an agent a schema it can trust without a prose exception.

**Effort.** Moderate if both edges already call one backend model. High if the MCP tool declarations were written by hand and the REST docs were written separately. The first useful step is smaller: a contract test in their own repository that fails when the example payloads and the MCP JSON Schema disagree.

## 2. Make timeout behavior as clear as failure behavior

**Current behavior.** The docs say validation failures and `Failed` activities are not charged, and `Completed` activities are. MCP tells the client not to submit again while a job is processing. Nothing in the excerpts tells a client what to do when the submit request itself times out.

**Problem.** That is the moment the client does not yet have an `activity_id`. Retrying can create a second billable job. Not retrying can lose the only copy of work the server accepted. The 17 November status incidents told users that failed requests were safe to retry. A dropped connection is not the same as a `Failed` activity, and the status page language collapses those cases.

**Proposed shape.** Accept an `Idempotency-Key` on every submit. The same key and same body return the original `activity_id`. A different body with the same key returns `409`. Document a short rule for the status page: retry only when the server returned a definitive rejection, or when the caller still holds the idempotency key.

**Benefit.** Developers can build the retry the outage notice is already asking for. Credit risk becomes predictable.

**Effort.** Low to document the current truth if duplicate submits are already safe. Medium to add the key if they are not. This recommendation should be checked with one intentional duplicate only after the user approves the credit spend. It should not be guessed.

## 3. Make the status page match the failure domain

**Current behavior.** Authentication stayed operational while the dashboard and every processing API were reported down together at `2026-11-17T20:24:22Z`. MCP has had its own "Investigating" incident since 14 October and is shown as `No data`. The docs host answered the outage with a gateway timeout.

**Problem.** Users can sign in, or follow a docs link, and still have no idea whether the product is available. Eight identical incident rows imply eight independent systems. The October MCP row implies a long-running agent outage that this review has not verified. Either reading damages trust in the status page.

**Proposed shape.** Group components that share a processing dependency, and page them as one incident with a list of affected capabilities. Monitor the MCP endpoint or remove its uptime percentage. Serve the docs site from the edge that stayed up, and link it to the active incident when the API cannot.

**Benefit.** A developer decides whether to retry, wait, or switch products. The hiring-evaluation problem is the same problem a customer has: the status page is currently the only reliable surface, and part of it is stale.

**Effort.** Low for the docs redirect and the stale MCP incident. Medium for a dependency-aware status page. No internal topology is assumed beyond the split the outage already demonstrated.

## What these three leave out

Dashboard visual polish, a TypeScript SDK, and more sample apps would all help. They are weaker than a contract that does not contradict itself, a retry rule that cannot double-charge, and a status page that can be believed. Those are the user-visible, developer-visible, and operational risks the public surface already supports.
