# Product overview

Status: documentation and public-site review only. No product session. No API call.

## Source limits

The API and MCP pages could not be rendered on 17 November 2026. `https://docs-api.fortyguard.com/docs/introduction` returned HTTP 504. The capability map below uses indexed excerpts of those pages, the public status page, and the public website. Where a sentence depends on an excerpt rather than a rendered page, it says so.

The marketing URLs `/products`, `/our-technology`, `/api-pricing`, `/product-temperature-mcp`, and `/startup-api-program` returned a shared HTML shell dominated by hackathon copy. Page-specific product copy may be client-rendered. It was not reviewed, and the identical shell is not recorded as a site defect.

## Problem

FortyGuard sells hyperlocal urban temperature intelligence. The API introduction describes heat-intelligent endpoints, built on proprietary Large Temperature Models, for developers, urban planners, logistics coordinators, and policymakers. The public site says the measurement of interest is about 2 metres above the ground and names cities, mobility, energy, infrastructure, and government as audiences.

That is the product promise. It is not a description of their internal pipeline.

## Products under review

| Product | Public entry | Role in the suite |
| --- | --- | --- |
| Temperature Dashboard | `https://dashboard.fortyguard.com/login` | Interactive map workspace |
| Temperature API | `https://api.fortyguard.com`, documented at `https://docs-api.fortyguard.com` | Programmatic access with an `api-key` header |
| Temperature MCP | `https://tos-mcp.app.fortyguard.com/mcp` | The same class of capabilities for an AI client, using `Authorization: Bearer` |

A fourth offer, Temperature Enterprise, appears in the public navigation. It is outside this evaluation.

## Target users

From the API introduction and the site navigation:

- Developers integrating temperature context into their own software.
- Urban planners, architects, and municipal staff.
- Energy, infrastructure, logistics, insurance, and operations teams.
- AI-agent builders, specifically called out by the MCP product.

The hackathon page also addresses students and researchers. That is a distribution program, not the core product user.

## Core use cases the docs actually name

- Area temperature heatmap as GeoJSON tiles plus statistics.
- Point environmental parameters: heat index, apparent temperature, wet-bulb temperature, humidity, precipitation, cloud cover, elevation, air quality, gases, and solar irradiance.
- Satellite and street-level image segmentation.
- Heat Intelligence reports across geographic, environmental, urban, events, and anthropogenic categories.
- Temperature-aware driving routes.
- The introduction also names Temperature Property Reports. No separate endpoint for that name appeared in the indexed endpoint set. Whether it is a dashboard export, a report preset, or a missing page is unresolved.

## Dashboard workflows

Not observed. Third-party marketplace copy describes drawing a polygon or circle, choosing a 100/80/60 m grid, picking an hour or a day, comparing places, stepping through time, and exporting a Heat Intelligence report. That description is not FortyGuard's API contract and is not treated as dashboard behavior. Phase 2 has to look at the signed-in product.

## REST capabilities

Six POST operations are named by the quickstart, plus one shared status read:

- `POST /v1/heatmap`
- `POST /v1/env_params`
- `POST /v1/satellite`
- `POST /v1/streetview`
- `POST /v1/heat_intelligence`
- `POST /v1/routing`
- `GET /v1/status/{activity_id}`

Submission is documented as asynchronous. The caller receives `data.activity_id` and polls until `Processing`, `Completed`, or `Failed`.

## MCP capabilities

Nine tools are named: `env_params`, `heatmap`, `heatmap_read`, `report`, `report_read`, `satellite`, `streetview`, `temperature_routing`, `temperature_routing_read`.

The MCP pages split them into direct calls, async submit calls, and read calls. That split does not match the REST quickstart, which describes every POST as an activity. See `docs/03-documentation-audit.md`.

## Pricing and trial limits

Published API matrix:

| Plan | Credits | Window | Notable limits |
| --- | ---: | --- | --- |
| API Basic | 1,000,000 | Monthly, no rollover | Heatmaps to 10 mi². Three environmental parameters. No imagery, reports, or routing |
| API Premium | 5,000,000 | Monthly, no rollover | Heatmaps to 50 mi². All listed capabilities |
| API Startup | 1,000,000 | 6 months, one-time | Same capability limits as Basic |

Regional coverage is documented as the United States only for all three plans. Credits are documented as deducted only when an activity reaches `Completed`. Failed processing is documented as free. Rejected validation (`400`) is documented as free.

The account under test is not known. "Trial" does not appear as a fourth plan in the limitations table. The hackathon page says participants receive trial API credits. The dashboard has been marketed as free, including a Microsoft Marketplace listing that says no card and no limits. Those statements can all be true for different products. This evaluation will not assume the API key is Premium or that dashboard actions are free.

## What is unknown

Database, queue, cloud provider, model host, tile storage, and whether the dashboard calls the public REST API or a private backend. The status page lists those capabilities as separate monitored components. During the 17 November outage, authentication stayed operational while heatmap, imagery, reports, environmental parameters, and the dashboard were down. That is evidence of an operational boundary. It is not an architecture diagram of their infrastructure.
