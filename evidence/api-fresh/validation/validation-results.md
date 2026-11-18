# Validation cases prepared, not sent

18 November 2026. None of these requests were sent.

The target is `POST /v1/env_params`. The valid body below is the example on `/docs/environmental-parameters`. The documented Premium cost of a completed call is 2,900 credits. Basic and Startup are documented at 2,110. The limitations page says requests that violate its listed constraints return HTTP 400 and are not charged. That sentence was not verified live. A POST was not sent, because an accepted body can still become a completed task and the successful call is waiting for review.

## Valid body used as the base

```json
{
  "latitude": 40.7128,
  "longitude": -74.006,
  "temperature": 32.5,
  "date_time": {
    "start_date": "2024-07-15",
    "start_time": "14:00",
    "filter_type": 1
  }
}
```

`temperature` is documented as Celsius. The New York coordinate is inside the United States, which the limitations page says is the current coverage.

## Cases

| Test | Change | Documented expectation | This pass |
| --- | --- | --- | --- |
| API-004 | `{}` | Not named in the uncharged constraint list. Quickstart lists 400 or 422 for a validation error. | `NOT EXECUTED — BILLING SAFETY` |
| API-005 | `latitude` omitted | Required on the endpoint page. Not in the uncharged list. | `NOT EXECUTED — BILLING SAFETY` |
| API-006 | `"latitude": "40.7128"` | Type is number. Not in the uncharged list. | `NOT EXECUTED — BILLING SAFETY` |
| API-007 | `"latitude": 120` | Limitations: latitude must be in [-90, 90], and a violating request returns 400 and is not charged. | `NOT EXECUTED — BILLING SAFETY` |
| API-008 | `"longitude": 200` | Limitations: longitude must be in [-180, 180], same 400 sentence. | `NOT EXECUTED — BILLING SAFETY` |
| API-009 | `"start_date": "07/15/2024"` | Limitations: `start_date` must be `YYYY-MM-DD`, same 400 sentence. | `NOT EXECUTED — BILLING SAFETY` |
| API-010 | `"analysis": "heat_index_celsius"` | The field is documented as `string[]`. Not in the uncharged list. | `NOT EXECUTED — BILLING SAFETY` |
| API-011 | extra `"unused_field": true` | Unknown fields are not discussed. | `NOT EXECUTED — BILLING SAFETY` |

API-007, API-008, and API-009 are the cases the limitations page explicitly says are rejected and not charged. They were still not sent. The other five are not covered by that sentence.

No HTTP status, error body, or field-level message is claimed for these cases.
