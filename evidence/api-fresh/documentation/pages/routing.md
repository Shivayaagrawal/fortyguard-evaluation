# /docs/routing

Captured: 2026-11-18T14:55:25.831Z
HTTP 200
Elapsed ms: 32027
H1: Temperature-Aware Routing

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
Temperature-Aware Routing
POST
/v1/routing

Temperature-Aware Routing generates temperature-aware driving route alternatives for an origin, destination, and departure time. Submit POST /v1/routing to start an asynchronous activity, then poll GET /v1/status/{activity_id} until the activity is Completed or Failed. The maximum origin-to-destination straight-line distance is 200 km.

How it works:

POST /v1/routing accepts the request
Receive an activity_id
Poll GET /v1/status/{activity_id}
Completed: consume the routing result
Failed: inspect the routing error
Available in
API PREMIUM
Credit cost:
3,500 credits per request (Premium)
Required attributes
Required attributes
origin
object
REQUIRED

Route origin. Include lat (decimal latitude, -90 to 90) and lon (decimal longitude, -180 to 180).

destination
object
REQUIRED

Route destination. Include lat (decimal latitude, -90 to 90) and lon (decimal longitude, -180 to 180). The origin and destination must be different.

departure_time
string
REQUIRED

ISO-8601 departure datetime.

Request
Response
Test request
PYTHON
Copy
import requests

response = requests.post(
    "https://api.fortyguard.com/v1/routing",
    headers={"api-key": "your_api_key"},
    json={
        "origin": {
            "lat": 40.7812,
            "lon": -73.9665
        },
        "destination": {
            "lat": 40.7580,
            "lon": -73.9855
        },
        "departure_time": "2026-10-19T12:00:00Z"
    }
)

print(response.json())
PREVIOUS
Environmental Parameters
NEXT
Create Monitor
