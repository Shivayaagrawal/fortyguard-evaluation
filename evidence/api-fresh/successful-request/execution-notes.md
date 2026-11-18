# Successful request was not sent in the first pass

A later authorized run sent one New York request. That result is `evidence/api-fresh/functional-test/`. The notes below record why the first pass stopped.

## Why it stopped

| Precondition | Result |
| --- | --- |
| Schema confirmed | Yes. The environmental-parameters page requires `latitude`, `longitude`, Celsius `temperature`, and `date_time`, with `filter_type` 1 requiring `start_date` and `start_time`. |
| Documented cost | 2,110 credits on Basic and Startup. 2,900 credits on Premium. The limitations table matches those numbers. The quickstart says the charge happens when status becomes Completed. |
| Live balance | Not read. `/docs/credits-usage` is a key form with no path, body, or cost. The release notes name `POST /v1/system/fetch-api-key-usage` and `POST /v1/system/fetch-api-key-custom-usage` and do not price them. The account key was not submitted. |
| Plan | Not confirmed in this pass. The cost therefore cannot be pinned to 2,110 or 2,900 for this account. |
| Authorization | The run instruction is to show this payload and cost before any successful call. |

## Proposed body

The body in `request-redacted.json` is the documented New York example: latitude 40.7128, longitude -74.006, temperature 32.5, start date 2024-07-15, start time 14:00, filter type 1. The page says the temperature is Celsius. The coordinate is inside the United States.

If this account is Premium and the task reaches Completed, the documented charge is 2,900 credits. If it is Basic or Startup, the documented charge is 2,110, and Basic or Startup may return only three parameters unless `analysis` is limited. The proposed body omits `analysis`, which the page says means the full set.

No response fields, temperature, timestamp, or duration are claimed.
