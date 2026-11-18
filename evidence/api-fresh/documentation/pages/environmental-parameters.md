# /docs/environmental-parameters

Captured: 2026-11-18T14:54:53.803Z
HTTP 200
Elapsed ms: 31142
H1: Environmental Parameters

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
Environmental Parameters
POST
/v1/env_params

A multidimensional temperature intelligence service offering operationally vital metrics including heat index, apparent temperature, and wet bulb temperature for thermal stress assessment. Captures atmospheric and hydrological variables (precipitation, AQI, ozone levels) plus solar irradiance profiles (GHI, DNI, DHI) to support energy modeling, urban planning, and climate resilience.

Available in
API BASIC
API PREMIUM
BASIC
Up to 3 customizable environmental parameters per request.
PREMIUM
Full access to all environmental parameters.
Credit cost:
2,110 credits/request (Basic, Startup); 2,900 (Premium)
Required attributes
Optional attributes
Result Schema
Required attributes
latitude
number
REQUIRED

Latitude coordinate of the location.

longitude
number
REQUIRED

Longitude coordinate of the location.

temperature
number
REQUIRED

Temperature value in degrees Celsius for the location.

date_time
object
REQUIRED

Date and time range configuration object.

date_time.start_date
string
REQUIRED

Start date in YYYY-MM-DD format, subject to server-supported date validation and environmental-provider availability. This coordinate-based endpoint has no granularity field; weather values are not 20 m observations.

date_time.filter_type
number
REQUIRED

Filter type options:

1 (Single Hour) - requires start_date and start_time
2 (Range of Hours) - requires start_date, start_time, and end_time
3 (Single Day) - requires only start_date
Optional attributes
date_time.end_date
string
OPTIONAL

End date in YYYY-MM-DD format. Auto-populated based on filter_type.

date_time.start_time
string
OPTIONAL

Start time in HH:MM 24-hour format. Required for filter_type 1 and 2.

date_time.end_time
string
OPTIONAL

End time in HH:MM 24-hour format. Required for filter_type 2.

analysis
string[]
OPTIONAL

Optional list of environmental parameters to return. Omit to receive all of them. API Basic and API Startup are limited to 3 parameters per request; API Premium has full access.

Thermal & atmospheric:

heat_index_celsius — heat index ("feels like"), °C
apparent_temperature_celsius — apparent temperature, °C
wet_bulb_temperature_celsius — wet-bulb temperature, °C
relative_humidity_percent — relative humidity, %
precipitation_mm — precipitation, mm
cloud_cover_octas — effective cloud cover, octas
elevation — ground elevation, m

Air quality (US AQI) & gases:

air_quality:idx — overall US Air Quality Index
air_quality_pm2p5:idx — AQI, PM2.5
air_quality_pm10:idx — AQI, PM10
air_quality_no2:idx — AQI, nitrogen dioxide
aqi_us_co — AQI, carbon monoxide
air_quality_o3:idx — AQI, ozone
air_quality_so2:idx — AQI, sulphur dioxide
methane_ppb — methane, ppb
co2_ppm — carbon dioxide, ppm

Solar:

solar_irradiance — clear-sky GHI / DNI / DHI
Result Schema

Once the environmental parameters analysis activity has finished processing, the final response contains three main outputs:

Time metadata (metadata) - timezone + the exact timestamps/time range the data corresponds to
Location context (locations) - the latitude/longitude (and often elevation) that was analyzed
Environmental outputs (parameters + solar_irradiance) - time-aligned arrays of weather/comfort, air-quality, gases, and solar irradiance metrics

Missing numeric values:

New missing numeric environmental values are returned as JSON null
Older stored responses may still contain legacy -999
null means data was unavailable from the upstream provider
Missing values must not be interpreted as zero
Response arrays and live field names remain unchanged

This response is returned when the activity status is "Completed".

Request
Response
Result Schema
Test request
PYTHON
Copy
import requests

response = requests.post(
    'https://api.fortyguard.com/v1/env_params',
    headers={'api-key': 'your_api_key'},
    json={
        'latitude': 40.7128,
        'longitude': -74.0060,
        'temperature': 32.5,
        'date_time': {
            'start_date': '2024-07-15',
            'start_time': '14:00',
            'filter_type': 1
        }
    }
)
PREVIOUS
Heat Intelligence
NEXT
Temperature-Aware Routing
