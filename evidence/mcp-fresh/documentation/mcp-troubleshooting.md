# /docs/mcp-troubleshooting

Captured: 2026-11-18T16:26:11.912Z
HTTP 200
Elapsed ms: 31557
H1: MCP Troubleshooting

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
MCP Troubleshooting

Resolve common connection, authentication, tool execution, and result-retrieval issues when using FortyGuard MCP.

Most MCP issues fall into a few categories: client configuration, authentication, invalid inputs, asynchronous processing, coverage or data availability, and account access. Use the checks below before retrying a request.

Start here
Confirm the MCP endpoint is correct.
Confirm your FortyGuard API key is available to the client.
Confirm the client shows FortyGuard as connected.
Confirm the expected FortyGuard tools are visible.
Recheck the tool inputs.
For asynchronous tools, use the corresponding read tool instead of creating a duplicate job.
Connection & authentication
MCP server does not connect

Clients may show a disconnected server, a connection failure, or no available tools.

Verify that the endpoint is https://tos-mcp.app.fortyguard.com/mcp.
Confirm network access and that your client supports remote MCP over HTTP / Streamable HTTP.
Verify that the Authorization header is configured, then restart or reload the client after configuration changes.

Review MCP Client Setup and MCP Authentication.

Authentication fails

Authentication errors can appear as unauthorized or access-denied messages, or as a server that connects but cannot load tools.

Authorization: Bearer <FORTYGUARD_API_KEY>
Confirm the API key exists and the client inherited or read its environment variable.
Confirm the Bearer prefix is present and no extra quotes or spaces became part of the key.
Confirm the key has not been revoked or rotated, and restart the client after environment-variable changes.

Never paste a real API key into prompts, logs, or support screenshots. See MCP Authentication for secure key handling.

Connected, but no FortyGuard tools appear

Verify that the correct MCP server is enabled, that an old or local FortyGuard configuration is not conflicting, and that the endpoint and authentication settings are correct. Reconnect or restart the client after making changes.

The current documented catalog includes nine tools. Compare what your client shows with Available Tools.

Tool execution
Tool returns invalid input

MCP tool requests are schema-validated. A request can be rejected when required values are missing, unsupported, or incorrectly formatted.

Check latitude and longitude, GeoJSON polygons, date/time formats, analysis selections, and activity identifiers.
For routing, confirm that both origin and destination are valid.
Review the tool's Key inputs section and let the client retry with corrected arguments rather than inventing values.

Use the exact formats described in Available Tools.

Tool returns processing

This is expected for asynchronous tools. A processing status and activity identifier mean the analysis was accepted but is not complete yet.

Use the matching read tool
heatmap → heatmap_read
report → report_read
temperature_routing → temperature_routing_read

Retain the returned activity identifier and use the corresponding read tool. Do not repeatedly submit the same analysis while it is still processing.

Activity returns failed

A failed status means the requested analysis could not complete. Possible user-facing causes include unsupported location or coverage, unavailable data, an unsupported time window, invalid request context, or a temporary service failure.

Verify the request inputs and location/date support.
Retry only when appropriate; avoid repeatedly submitting identical paid work.
If the failure persists, contact FortyGuard support with the affected tool name and activity identifier, if one was returned.
Long-running analysis

Heatmaps, Heat Intelligence reports, and temperature-aware routes can take longer to complete. Submit once, retain the activity identifier, and check progress with the matching read tool. Completion times can vary, so do not create duplicates merely because a result is not immediate.

Data & results
Report download link expired

Completed reports may use a temporary signed download link. Use report_read again with the same report/activity identifier to retrieve the current result and obtain a fresh link.

Returned imagery date differs from the requested date

Imagery availability depends on source coverage and the imagery available for the requested location. Satellite or Street View analysis may use the most appropriate available imagery rather than imagery captured on the exact requested date.

Check the returned imagery metadata before relying on time-sensitive visual conclusions.

Segmentation labels look unexpected

Satellite and Street View segmentation results are model-generated estimates. Inspect segmentation percentages and imagery together, and treat the results as analytical evidence rather than guaranteed ground truth.

Large imagery response

Satellite and Street View tools may return imagery or segmentation artifacts in addition to structured metadata. Clients can display or store large responses differently. Focus on structured segmentation values and metadata, and use a client that supports large MCP responses.

Availability & access
Temperature-aware routing is unavailable

Routing may be unavailable when a location is outside routing coverage, a departure time is outside supported thermal-data availability, a route cannot be generated for the coordinates, or the analysis fails temporarily.

Confirm origin, destination, and departure time.
Try a supported location or time when appropriate.
For existing work, use temperature_routing_read rather than submitting duplicates.
Tool unavailable for your account

Available MCP capabilities and usage depend on the FortyGuard API plan associated with your API key. If you see access denied, capability unavailable, or insufficient usage/credits, confirm the intended account and plan before retrying. Contact FortyGuard if access appears incorrect.

Location or data is unavailable

Some capabilities depend on geographic coverage and data availability. This can affect environmental conditions, heatmaps, imagery, routing, and reports.

Verify coordinates and the requested date/time.
Confirm supported coverage and data availability.
Try a nearby supported area only when it is appropriate for the request.
Common response guidance
Category	Meaning	Recommended action
Authentication	Key or header cannot be accepted.	Verify the API key and Bearer header.
Invalid input	Required values or formats need correction.	Review the tool inputs and retry with valid arguments.
Processing	An asynchronous analysis is still running.	Use the corresponding read tool.
Failed	The requested analysis could not complete.	Review inputs and coverage; retry only if appropriate.
Access or plan	The account cannot use the requested capability.	Check account plan and access.
Data unavailable	Coverage or data is unavailable for the request.	Check the location and requested date/time.
Still having trouble?

If the issue persists, contact FortyGuard support and include the MCP client you are using, the affected tool name, and the activity identifier if one was returned.

Never include your API key, Authorization header, or other private credentials when sharing logs or screenshots.

On this page
Start here
Connection & authentication
Tool execution
Data & results
Availability & access
Common response guidance
Still having trouble?
PREVIOUS
Client Setup
NEXT
QGIS
