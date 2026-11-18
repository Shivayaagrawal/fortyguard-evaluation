# /docs/limitations

Captured: 2026-11-18T15:00:32.722Z
HTTP 200
Elapsed ms: 31872
H1: Known Limitations

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
Known Limitations

This page documents the current operational, technical, and plan-level limits of the FortyGuard Enterprise API. It is maintained alongside each release so you can plan integrations, size workloads, and anticipate constraints before hitting them in production.

Plan Limits

Every API key is associated with a subscription plan. The table below summarizes what each plan includes. See each endpoint page for plan-specific behavior.

Capability	API Basic	API Premium	API Startup
Monthly credits	1,000,000	5,000,000	1,000,000
Commercial License	Included	Included	Included
Heatmap Generation (max area)	Up to 10 mi²	Up to 50 mi²	Up to 10 mi²
Map Statistics	Full access	Full access	Full access
Environmental Parameters	Up to 3 parameters per request	Full access to all parameters	Up to 3 parameters per request
Satellite Segmentation	Not included	Included	Not included
Street View Segmentation	Not included	Included	Not included
Heat Intelligence Reports	Not included	Included	Not included
Access window	Monthly (renews each cycle)	Monthly (renews each cycle)	6 months (one-time)
Regional coverage	United States only	United States only	United States only
Heatmap credit cost / request	3,500	4,220	3,500
Environmental Parameters credit cost / request	2,110	2,900	2,110
Satellite Segmentation credit cost / request	Not included	14,400	Not included
Street View Segmentation credit cost / request	Not included	8,600	Not included
Heat Intelligence credit cost / request	Not included	8,600	Not included
Temperature-Aware Routing credit cost / request	Not included	3,500	Not included
Temperature-Aware Routing

Maximum distance: the origin-to-destination straight-line/great-circle distance must not exceed 200 km. This is not the driving-route distance.

Required input:origin, destination, and departure_time are required.

Processing: routing is asynchronous. Submit the request, then poll GET /v1/status/{activity_id} until the activity is Completed or Failed.

Coverage: available routes depend on current road and routing-data coverage.

Input Constraints

Requests that violate the following constraints return 400 Bad Request and are not charged against your credit balance.

Coordinates:latitude must be in the range [-90, 90] and longitude in [-180, 180]. During the current release, coordinates must fall within the United States.

Polygon Area of Interest: must be a valid GeoJSON FeatureCollection whose geometry is a closed Polygon (first and last coordinates identical).

Date format:start_date and end_date must be YYYY-MM-DD. start_time and end_time must be HH:MM in 24-hour time.

Date range: server-supported date validation applies (default earliest date 2019-01-01). Acceptance does not guarantee coverage or a forecast. 20 m results depend on the UTC hours and locations present in the high-resolution catalog. Partial coverage can succeed; no available tiles produces a failed activity.

Filter types:1 (Single Hour), 2 (same-day Range of Hours), 3 (Single Day), or 4 (Range of Days; end date at most 31 days after start).

Granularity: heatmap and point-satellite requests accept numeric 20, 60, 80, or 100 metres; default 100. Existing plan-based area limits and pricing apply. Satellite imagery has independent availability and no guaranteed capture date matching the request.

Heat Intelligence analysis:analysis must be a subset of ["geographic", "environmental", "urban", "events", "anthropogenic"].

Processing & Results

Activity lifecycle: submission endpoints return an activity_id. Results are retrieved asynchronously via the GET /v1/status/{activity_id} endpoint.

Failed tasks: tasks that fail during processing (status Failed) do not consume credits.

Image encoding: segmentation outputs return Base64-encoded images. If the response omits the MIME prefix, prepend data:image/png;base64, before rendering in a browser.

Heat Intelligence reports: the completed status response returns JSON with data.result.download_link. The link is temporary; use it immediately to download the PDF, and do not log or share the full signed URL.

Regional Coverage

The current release supports requests for locations within the United States on the API Basic, API Premium, and API Startup plans.

Credits & Billing

Credits are deducted only on successful task completion (status Completed).

Unused credits do not roll over between billing cycles — they reset on your credits_reset_date.

API Startup: a one-time allocation of 1,000,000 credits valid for a 6-month access window (not a recurring monthly cycle).

Reporting an Issue

If you hit a limit that is not documented here, or a documented limit that is incorrect, please contact support@fortyguard.com.

On this page
Plan Limits
Temperature-Aware Routing
Input Constraints
Processing & Results
Regional Coverage
Credits & Billing
Reporting an Issue
PREVIOUS
Get a Free API Key
NEXT
Release Notes
