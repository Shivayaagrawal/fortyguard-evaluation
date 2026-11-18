# /docs/mcp-tools

Captured: 2026-11-18T16:25:08.799Z
HTTP 200
Elapsed ms: 31551
H1: Available MCP Tools

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
Available MCP Tools

FortyGuard MCP exposes tools for environmental conditions, heat analysis, imagery segmentation, reporting, and temperature-aware routing. MCP clients can discover these tools automatically and select the appropriate capability based on the user's request.

Tool workflow summary
Direct analysis

env_params, satellite, and streetview return results for the submitted request.

Asynchronous analysis

heatmap
→
heatmap_read

report
→
report_read

temperature_routing
→
temperature_routing_read

Asynchronous submit tools return a status and activity identifier. Use the corresponding read tool later to retrieve a processing, completed, or failed result.

Tool	Purpose	Behavior
env_params	Retrieve point-level environmental conditions and raw measurements for a single coordinate and date/time.	DIRECT
heatmap	Generate a temperature heatmap for a geographic area.	ASYNC
heatmap_read	Retrieve the status and persisted statistics for an existing heatmap activity.	READ
report	Generate a Heat Intelligence report for a location and selected analyses.	ASYNC
report_read	Check an existing Heat Intelligence report and retrieve its generated report result when complete.	READ
satellite	Analyze satellite imagery for a location and return semantic segmentation information.	DIRECT
streetview	Analyze street-level imagery and return semantic segmentation information.	DIRECT
temperature_routing	Generate route alternatives using travel time and thermal exposure information.	ASYNC
temperature_routing_read	Retrieve an existing temperature-aware routing activity.	READ
Jump to a tool
01
Environmental Parameters
02
Create Heatmap
03
Read Heatmap Result
04
Heat Intelligence Report
05
Read Report Result
06
Satellite View Segmentation
07
Street View Segmentation
08
Temperature-Aware Routing
09
Read Temperature Routing Result
01
Environmental Parameters
env_params
DIRECT
Purpose

Retrieve point-level environmental conditions and raw measurements for a single coordinate and date/time.

When to use

Use this when a user needs environmental readings for one specific location rather than an area-wide heatmap or a report.

Key inputs
latitude — Latitude in decimal degrees.
longitude — Longitude in decimal degrees.
temperature — Reference temperature.
date_time — Date/time selection; single-hour, range-of-hours, and single-day filters are supported.
analysis — Optional list of supported environmental measurements to return.
Example request
Get the environmental conditions for Phoenix at latitude 33.4484 and longitude -112.074 for September 20, 2025 using a reference temperature of 35 °C.
Important output
Environmental measurements such as apparent temperature, wet-bulb temperature, relative humidity, precipitation, cloud cover, air quality, and solar irradiance when available.
Usage and limitations: Values and available parameters depend on the requested location, date, plan, and available data.
02
Create Heatmap
heatmap
ASYNC
Purpose

Generate a temperature heatmap for a geographic area.

When to use

Use this for area-level temperature and heat analysis rather than a single point reading.

Key inputs
polygon_aoi — GeoJSON-style polygon area of interest for a base heatmap.
date_time — Date/time selection for a base heatmap.
granularity — Optional spatial granularity: 60, 80, or 100 metres; defaults to 100.
analytic_type — Optional analysis type: tcm, time_of_measure, exceedance, or persistence.
map_type — Optional map type: bm, tcm, or tccm.
wait_for_completion — Optional flag to wait for the completed result in the MCP response.
Example request
Generate a heatmap for this polygon for September 20, 2025 at granularity 100.
Important output
An accepted activity identifier while processing, or completed heatmap statistics when waiting for completion.
Async workflow
heatmap → heatmap_read
By default, heatmap creation returns a processing status and activity identifier. Use heatmap_read to retrieve the completed statistics.
Related tool: heatmap_read
Usage and limitations: Generating a new heatmap may consume usage or credits. Availability and usage depend on your FortyGuard API plan.
03
Read Heatmap Result
heatmap_read
READ
Purpose

Retrieve the status and persisted statistics for an existing heatmap activity.

When to use

Use this after heatmap returns a heatmap activity identifier.

Key inputs
heatmap_id — The existing heatmap activity identifier.
Example request
Retrieve the result for heatmap activity hm_123.
Important output
Processing, completed, or failed status.
Temperature unit, temperature statistics, and mean temperature when completed.
Related tool: heatmap
Usage and limitations: This reads existing work and does not create a new heatmap.
04
Heat Intelligence Report
report
ASYNC
Purpose

Generate a Heat Intelligence report for a location and selected analyses.

When to use

Use this when a user needs a written, report-style analysis rather than only raw measurements.

Key inputs
latitude — Latitude in decimal degrees.
longitude — Longitude in decimal degrees.
temperature — Reference temperature in degrees Celsius.
date — Past or present date in YYYY-MM-DD format.
analysis — One to five selections from geographic, environmental, urban, events, and anthropogenic.
wait_for_completion — Optional flag to wait for the completed report in the MCP response.
Example request
Generate a Heat Intelligence report for this location using geographic and environmental analysis.
Important output
An activity identifier while processing, or a report link when the report is complete.
Async workflow
report → report_read
By default, report returns an activity identifier. Use report_read to check the existing report and retrieve its result.
Related tool: report_read
Usage and limitations: Report generation may consume usage or credits. Availability and usage depend on your FortyGuard API plan.
05
Read Report Result
report_read
READ
Purpose

Check an existing Heat Intelligence report and retrieve its generated report result when complete.

When to use

Use this after report returns its report activity identifier.

Key inputs
analytics_id — The report identifier returned by report. The tool also accepts this identifier as activity_id.
Example request
Retrieve the completed Heat Intelligence report for the report activity identifier.
Important output
Processing, completed, or failed status.
A signed report URL and, when available, a document URL or bounded report sections.
Related tool: report
Usage and limitations: Completed report links may be temporary. Request the result again if a link has expired.
06
Satellite View Segmentation
satellite
DIRECT
Purpose

Analyze satellite imagery for a location and return semantic segmentation information.

When to use

Use this when a user needs land-cover or visual-environment context from overhead imagery.

Key inputs
sat — A point with latitude and longitude, or tiles for a selected tile or polygon target.
date_time — Required date/time selection; range-of-days is not supported.
granularity — Optional granularity: 60, 80, or 100 metres; defaults to 100.
big_area — Optional flag for applicable larger-area requests.
Example request
Analyze satellite imagery at this coordinate and return the segmentation percentages.
Important output
Segmentation classes and class percentages.
Imagery metadata and supported image or segmentation artifacts.
Usage and limitations: Returned imagery represents available imagery selected for the request and may not exactly match the requested date.
07
Street View Segmentation
streetview
DIRECT
Purpose

Analyze street-level imagery and return semantic segmentation information.

When to use

Use this when a user needs ground-level visual context for a location.

Key inputs
latitude — Latitude in decimal degrees.
longitude — Longitude in decimal degrees.
vertical_angle — Required vertical viewing angle.
horizontal_angle — Required horizontal pan angle from 0 to 360 degrees.
back_view — Required flag to include an optional back-view result.
date_time — Optional date/time selection.
Example request
Analyze the street-view image at this location using a forward-facing view.
Important output
Front-view segmentation and optional back-view result.
Semantic classes, class percentages, imagery metadata, and image date when available.
Usage and limitations: Street-view imagery availability and date depend on available imagery for the requested location. Segmentation labels are estimates, not guaranteed semantic truth.
08
Temperature-Aware Routing
temperature_routing
ASYNC
Purpose

Generate route alternatives using travel time and thermal exposure information.

When to use

Use this when routing should consider temperature and heat exposure rather than only shortest or fastest travel.

Key inputs
origin — Required latitude/longitude coordinate pair.
destination — Required latitude/longitude coordinate pair, different from the origin.
departure_time — Required ISO-8601 date-time.
wait_for_completion — Optional flag to wait for the completed result in the MCP response.
Example request
Find temperature-aware routes from this origin to this destination for the requested departure time.
Important output
An activity identifier while processing, or route alternatives when completed.
Async workflow
temperature_routing → temperature_routing_read
By default, routing returns a processing status and activity identifier. Use temperature_routing_read to retrieve the completed routes.
Related tool: temperature_routing_read
Usage and limitations: Availability depends on routing coverage and supported thermal data and time windows.
09
Read Temperature Routing Result
temperature_routing_read
READ
Purpose

Retrieve an existing temperature-aware routing activity.

When to use

Use this after temperature_routing returns an activity identifier.

Key inputs
activity_id — The existing routing activity identifier.
Example request
Retrieve the result for this temperature-aware routing activity.
Important output
Processing, completed, or failed status.
One or more routes with GeoJSON geometry, distance, duration, thermal metrics, route preference metadata, and the selected route.
Related tool: temperature_routing
Usage and limitations: This reads existing routing work and does not start a new routing calculation.
On this page
Tool workflow summary
Jump to a tool
Environmental Parameters
Create Heatmap
Read Heatmap Result
Heat Intelligence Report
Read Report Result
Satellite View Segmentation
Street View Segmentation
Temperature-Aware Routing
Read Temperature Routing Result
PREVIOUS
MCP Authentication
NEXT
Client Setup
