# /docs/release-notes

Captured: 2026-11-18T15:01:04.592Z
HTTP 200
Elapsed ms: 31868
H1: Release Notes

API Documentation
⌘K
GUIDES
Introduction
Quickstart
Authentication
MCP
MCP Overview
MCP Quickstart
MCP Authentication
Available Tools
Client Setup
Troubleshooting
INTEGRATIONS
QGIS
ANALYSIS ENDPOINTS
Create Heatmap
POST
Satellite View Segmentation
POST
Street View Segmentation
POST
Heat Intelligence
POST
Environmental Parameters
POST
Temperature-Aware Routing
POST
MONITORING & ALERTING
Monitors
Alerts
TASK MANAGEMENT
Check Status
GET
Check API Credits Usage
GET
RESOURCES
Get a Free API Key
POST
Known Limitations
Release Notes
Release Notes

A running log of every change to the FortyGuard's Temperature API® and its documentation. Entries are listed most-recent first and grouped by the type of change so you can quickly spot what's new, what's been updated, and what has been deprecated.

Tip: Bookmark this page to stay current with platform changes. Major version upgrades and breaking changes will always be announced here in advance.

v1.0.0
LATEST
APRIL 22, 2026
Initial Public Release

First general-availability release of the FortyGuard Enterprise API. Introduces the core Temperature API® surface, two subscription plans, credit tracking, and complete documentation for every supported endpoint.

ADDED
POST /v1/heatmap — generate high-resolution GeoJSON thermal maps for a polygon AOI across Single Hour, Range of Hours, and Single Day filters at granularity 60m / 80m / 100m.
POST /v1/satellite — tile-based satellite view segmentation with Base64-encoded imagery and per-class coverage metrics.
POST /v1/streetview — ground-level street view segmentation including front (and optional back) view with per-class coverage metrics.
POST /v1/heat_intelligence — multi-dimensional Heat Intelligence Reports across Geographic, Environmental, Urban, Events, and Anthropogenic categories, delivered through a temporary download_link returned by the completed status response.
POST /v1/env_params — Environmental Parameters including heat index, apparent temperature, wet bulb temperature, relative humidity, AQI (PM2.5 / PM10 / NO₂ / CO / O₃ / SO₂), methane, CO₂, and solar irradiance (GHI / DNI / DHI).
GET /v1/status/{activity_id} — unified status and result-retrieval endpoint for all asynchronous submissions.
API key authentication via the api-key request header — no OAuth or token exchange required.
POST /v1/system/fetch-api-key-usage and /v1/system/fetch-api-key-custom-usage — credit usage reporting at both billing-cycle and custom date-range granularity.
PLANS & ACCESS CONTROL
API Basic plan — 1,000,000 monthly credits, commercial license, heatmaps up to 10 mi², full Map Statistics, and up to 3 customizable environmental parameters per request.
API Premium plan — 5,000,000 monthly credits, commercial license, heatmaps up to 50 mi², full Environmental Parameters, and access to Satellite Segmentation, Street View Segmentation, Heat Intelligence, and the Temperature Property API.
Per-endpoint plan availability badges and an in-page availability banner on every endpoint, so subscribers can see at a glance what each plan unlocks.
DOCUMENTATION
Quickstart guide covering authentication, request submission, and activity-status polling with a runnable Python example.
Known Limitations page documenting plan limits, input constraints, rate limits, processing behavior, and regional coverage.
Release Notes page (this page) tracking every API and documentation change.
Credit Usage Tracker — enter your API key to view your plan, remaining credits, activity breakdown, and custom date-range usage.
PREVIOUS
Known Limitations
