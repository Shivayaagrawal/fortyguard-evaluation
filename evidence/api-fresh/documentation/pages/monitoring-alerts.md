# /docs/monitoring-alerts

Captured: 2026-11-18T15:05:28.355Z
HTTP 200
Elapsed ms: 31865
H1: List Alerts

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
List Alerts
GET
/v1/monitors/{monitor_id}/alerts

Show the Alerts one Monitor has raised. Every forecast check that breaches any rule creates an Alert — there is no waiting period. Each Alert names the predicted breach time and temperature, the responsible map tile, and the rules that were met. Use GET /v1/monitors/{monitor_id}/alerts. To read one Alert directly anywhere, use GET /v1/alerts/{alert_id}.

Available in
API PREMIUM
Credit cost:
3,500 credits per request (Premium)
Required attributes
Optional attributes
Required attributes
monitor_id
string
REQUIRED

ID of the Monitor whose Alerts to show.

Optional attributes
limit
number
OPTIONAL

How many Alerts to return (1–100, default 25).

cursor
string
OPTIONAL

Page marker from a previous answer to fetch the next page.

Request
Response
PYTHON
Copy
import requests

response = requests.get(
    "https://api.fortyguard.com/v1/monitors/monitor_abc123/alerts",
    headers={"api-key": "your_api_key"},
    params={"limit": 25}
)

print(response.json())
PREVIOUS
Delete Monitor
NEXT
Alert Report
