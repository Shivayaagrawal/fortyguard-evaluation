# /docs/mcp-overview

Captured: 2026-11-18T16:23:34.117Z
HTTP 200
Elapsed ms: 34174
H1: FortyGuard MCP

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
FortyGuard MCP

Connect AI assistants and agents directly to FortyGuard's heat, environmental, geospatial, and temperature-intelligence capabilities through the Model Context Protocol (MCP).

What is FortyGuard MCP?

FortyGuard MCP is a Model Context Protocol interface for using FortyGuard capabilities from compatible AI clients and agent workflows.

Instead of manually integrating individual API requests into an AI application, an MCP-compatible client can discover available FortyGuard tools, select the appropriate capability, provide validated inputs, and work with the returned results.

What can you do with it?
Retrieve environmental conditions for a location.
Generate heatmaps for an area and retrieve completed heatmap results and statistics.
Generate and retrieve Heat Intelligence reports.
Analyze satellite imagery and street-view imagery.
Generate temperature-aware routes and retrieve completed routing results.
How it works
Compatible AI Client
→
FortyGuard MCP
→
FortyGuard capabilities

Your MCP client connects to the FortyGuard MCP endpoint using your FortyGuard API key. The client can discover the available tools and invoke the appropriate capability based on your request.

Asynchronous workflows

Some analyses can take longer to complete. These operations return an activity identifier and can be checked later using the corresponding read tool.

heatmap → heatmap_read
report → report_read
temperature_routing → temperature_routing_read
Compatible clients

FortyGuard MCP works with compatible MCP clients. The integration has been validated with OpenAI Codex CLI, Cursor, and Claude Code.

Getting started

Continue to the MCP Quickstart to connect a client, configure Client Setup, explore Available Tools, or review MCP Authentication before configuring your API key.

On this page
What is FortyGuard MCP?
What can you do with it?
How it works
Asynchronous workflows
Compatible clients
Getting started
PREVIOUS
Authentication
NEXT
MCP Quickstart
