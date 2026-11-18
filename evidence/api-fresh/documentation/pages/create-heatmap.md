# /docs/create-heatmap

Captured: 2026-11-18T14:52:50.076Z
HTTP 200
Elapsed ms: 30849
H1: Create Heatmap

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
Create Heatmap
POST
/v1/heatmap

The Heatmap Generation feature produces high-resolution thermal maps derived from spatial and temporal inputs. Built on FortyGuard's proprietary Large Temperature Models (LTMs), each output is a GeoJSON polygon layer with tiles containing predicted or observed temperature data.

Available in
API BASIC
API PREMIUM
BASIC
Generate heatmaps up to 10 mi² area. Includes full access to Map Statistics.
PREMIUM
Generate heatmaps up to 50 mi² area. Includes full access to Map Statistics.
Credit cost:
3,500 credits/request (Basic, Startup); 4,220 (Premium)
Required attributes
Optional attributes
Result Schema
Result Output Fields
Required attributes
polygon_aoi
object
REQUIRED

GeoJSON polygon defining the area of interest for heatmap generation.

date_time
object
REQUIRED

Date and time range configuration object.

date_time.start_date
string
REQUIRED

Start date in YYYY-MM-DD format. Server-supported date validation applies (default earliest date 2019-01-01). Availability depends on catalog entries, not just request acceptance. For 20 m, unavailable locations/hours may produce partial output; no available tiles means a failed activity. No forecast coverage is guaranteed.

date_time.filter_type
number
REQUIRED

Filter type options:

1 (Single Hour) - requires start_date and start_time
2 (Range of Hours, same day) - requires start_date, start_time, and end_time
3 (Single Day) - requires only start_date (covers 00:00–23:59)
4 (Range of Days — week / month, ≤ 1 month) - requires start_date and end_date
Optional attributes
granularity
number
OPTIONAL

Numeric metres: 20, 60, 80, or 100 (default). 20 m uses a separate catalog with actual spatial/time coverage; partial results can succeed.

date_time.end_date
string
OPTIONAL

End date in YYYY-MM-DD format. Required for filter_type 4; auto-populated for filter_type 1–3.

date_time.start_time
string
OPTIONAL

Start time in HH:MM 24-hour format. Required for filter_type 1 and 2.

date_time.end_time
string
OPTIONAL

End time in HH:MM 24-hour format. Required for filter_type 2. Auto-calculated for filter_type 1 (start_time + 1 hour).

analytic_type
string
OPTIONAL

Analysis heatmap type (default 'tcm'):

tcm — Temperature snapshot; value is temperature (°C) per tile
time_of_measure — clock hour (0–23); 20 m uses the AOI timezone, existing resolutions retain UTC
exceedance — number of hours the temperature passes the threshold
persistence — longest continuous run of hours past the threshold

Read stats_data.units: time_of_measure/exceedance use hours; 20 m persistence over day ranges uses days, otherwise hours. At 20 m these discrete values are sampled from source cells, not spatially blended. Missing hours/days do not bridge persistence runs. Persistence includes threshold equality; exceedance is strictly above/below. tcm returns Celsius fields.

threshold
number
OPTIONAL

Temperature threshold in °C for exceedance / persistence. Defaults to 30 °C. Ignored by tcm and time_of_measure.

direction
string
OPTIONAL

Threshold direction for exceedance / persistence: 'above' (default) counts hours above the threshold, 'below' counts hours below it. Ignored by tcm and time_of_measure.

Result Schema

Once the heatmap generation activity has finished processing, the final response contains two main outputs:

GeoJSON heatmap tiles (map_data)
Aggregated temperature statistics (stats_data)

For large completed maps, GET /v1/status/{activity_id}?result_delivery=links returns map_download_url and stats_download_url instead, without loading the full map inside the API. Signed links expire and should be kept private. Downloaded map artifacts retain legacy storage encoding and may require a second JSON decode. Default inline responses are unchanged.

This response is returned when the activity status is "Completed".

Result Output Fields
Result.map_data
GeoJSON FeatureCollection

Stored GeoJSON FeatureCollection. For 20 m, coverage reports available hours/source samples and completeness. Missing locations are omitted; zero values are valid. Partial results do not imply complete coverage.

Result.stats_data
object

Aggregated statistical summary of all tiles in the heatmap. This includes:

Temperature_stats - Temperature statistics across the heatmap region
Minimum: Lowest temperature across the heatmap region
Maximum: Highest temperature across the heatmap region
Mean: Average temperature value
Standard_deviation: Variability of temperatures across tiles
Overall_temperature_distribution (array[number]) - Sorted temperature values representing the overall distribution
Normal_temperature_distribution (object) - Normalized curve data for plotting a temperature distribution
x_axis: Temperature range
y_axis: Probability density values
Temperature_frequency (object) - Histogram-style frequency counts for temperature bins
Request
Response
Result Schema
Test request
Single Hour
Range of Hours
Single Day
Range of Days
Exceedance
Time of Measure
Persistence
PYTHON
Copy
import requests

response = requests.post(
    'https://api.fortyguard.com/v1/heatmap',
    headers={'api-key': 'your_api_key'},
    json={
        'polygon_aoi': {
            'type': 'Polygon',
            'coordinates': [[
                [-74.0170, 40.7051],
                [-74.0031, 40.7051],
                [-74.0031, 40.7180],
                [-74.0170, 40.7180],
                [-74.0170, 40.7051]
            ]]
        },
        'date_time': {
            'start_date': '2024-07-15',
            'start_time': '14:00',
            'filter_type': 1
        },
        'granularity': 100
    }
)
PREVIOUS
QGIS
NEXT
Satellite View Segmentation
