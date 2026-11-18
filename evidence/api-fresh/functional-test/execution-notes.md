# Functional test notes

18 November 2026, 16:10 UTC. One `POST /v1/env_params`, then one status read. No retry. No other paid route.

The API key was present in the local environment and was not printed. A search of the repository, excluding `.env`, found no copy of the key. `FORTYGUARD_API_BASE_URL` is `https://api.fortyguard.com`. `FORTYGUARD_ALLOW_PAID` stayed false. This script was the one authorized exception and wrote `SUBMITTED.lock` before the POST so a second run cannot submit again.

## Account

No read-only balance endpoint is documented. The credits page is a form. The release notes name `POST /v1/system/fetch-api-key-usage` and `POST /v1/system/fetch-api-key-custom-usage` without a body or a price, so they were not called. Plan and available credits were not retrieved.

## Authentication

`GET /v1/status/00000000-0000-4000-8000-000000000001` with the account key returned HTTP 404 in 1,234 ms. Content type `application/json`. Body: `error` true, `status_code` 404, message "No activity found for the provided activity_id." A 404 rather than 401 means the key was accepted.

## Submission

HTTP 200 in 1,525 ms. Message: "Environment Parameters Analysis Submitted Successfully." Activity id `8c32cb1d-0331-49f5-9302-34b6b9549ed6`. The body contained no measurements and no credit field.

## Lifecycle

The first status read, 3,879 ms later, was HTTP 200 and `Completed`. No intermediate `Processing` body was seen. The measurements were in `data.result` on that response. Polling stopped.

## Credits

Not verifiable. The completed body has no credit field. The documented price of a completed call is 2,900 on Premium and 2,110 on Basic or Startup. This run does not establish which figure applied.

## Result check

The coordinate matches the request. The timestamp is `2024-07-15T14:00:00-04:00` in `America/New_York`. Derived temperature fields end in `_celsius`. `methane_ppb` and `co2_ppm` are null. Precipitation is 0. Solar values include a W/m² description. No scientific comparison was made.
