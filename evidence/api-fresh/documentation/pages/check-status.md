# /docs/check-status

Captured: 2026-11-18T14:55:59.862Z
HTTP 200
Elapsed ms: 34031
H1: Check Status

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
Check Status
GET
/v1/status/{activity_id}

This endpoint allows you to check the status of any submitted activity using the unique activity ID. When the activity is completed, the response will include the final results and output data.

Available in
API BASIC
API PREMIUM
Required attributes
Required attributes
activity_id
string
REQUIRED

Unique identifier for the activity (returned from any submission endpoint).

Request
Response
PYTHON
Copy
import requests

# Replace {activity_id} with the actual activity ID from your submission
activity_id = "heatmap_abc123"

response = requests.get(
    f'https://api.fortyguard.com/v1/status/{activity_id}',
    headers={'api-key': 'your_api_key'}
)
PREVIOUS
Alert Report
NEXT
Check API Credits Usage
