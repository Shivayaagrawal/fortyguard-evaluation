# /docs/monitoring-create

Captured: 2026-11-18T15:02:48.991Z
HTTP 200
Elapsed ms: 34513
H1: Create Monitor

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
Create Monitor
POST
/v1/monitors

A Monitor watches one of your heatmaps and checks the temperature forecast for it every 12 hours. When a rule you set is breached (for example, average temperature above 40 °C), FortyGuard creates an Alert you can read or download as a report. Create a Monitor with POST /v1/monitors by giving the heatmap, a name, the area to watch, 1 to 20 rules, and where alerts should be sent.

Available in
API PREMIUM
Credit cost:
3,500 credits per request (Premium)
Required attributes
Optional attributes
Required attributes
heatmap_id
string
REQUIRED

ID of an existing finished heatmap this Monitor belongs to.

name
string
REQUIRED

Name for this Monitor (1–120 characters, unique per heatmap).

boundary_geojson
object
REQUIRED

Area to watch. A GeoJSON Polygon inside the heatmap, or the whole heatmap area.

rules
array
REQUIRED

1–20 alert rules. Each rule picks a target (average, lowest, or highest × minimum or maximum temperature), a condition (Above, Below, or Between) with a threshold in °C or °F. Any rule breaching triggers an Alert.

notifications
object
REQUIRED

Where alerts go: email addresses, SMS and WhatsApp numbers (at least one destination).

Optional attributes
enabled
boolean
OPTIONAL

Start checking immediately. True by default; set false to create a paused Monitor.

generate_report
boolean
OPTIONAL

Attach a downloadable PDF report to each Alert. True by default.

Request
Response
PYTHON
Copy
import requests

response = requests.post(
    "https://api.fortyguard.com/v1/monitors",
    headers={"api-key": "your_api_key"},
    json={
        "heatmap_id": "heatmap_abc123",
        "name": "Downtown heat watch",
        "boundary_geojson": {
            "type": "Polygon",
            "coordinates": [[[-74.01, 40.70], [-73.93, 40.70], [-73.93, 40.85], [-74.01, 40.70]]]
        },
        "rules": [
            {
                "temporal_aggregation": "average",
                "spatial_aggregation": "minimum",
                "operator": "above",
                "threshold": 40,
                "unit": "celsius"
            }
        ],
        "notifications": {"email": ["ops@example.com"]},
        "enabled": True,
        "generate_report": True
    }
)

print(response.json())
PREVIOUS
Temperature-Aware Routing
NEXT
List Monitors
