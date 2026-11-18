# MCP documentation versus live server versus source

18 November 2026. Four facts are kept apart:

- Documented: the published MCP pages.
- Implemented: present in FortyGuard server source. That source is not in the repository, so this column is unavailable for every tool.
- Discovered: returned by `tools/list` at 13:13 UTC.
- Executed: invoked, and a result came back.

The two extra live tools are discovered. They are not explained by another published page read in this phase. They are not proven experimental, and they are not proven absent from some other private document. The server source that would settle that is missing.

| Tool | Published docs | Live tool list | Server implementation | Execution tested | Mismatch |
| --- | --- | --- | --- | --- | --- |
| `env_params` | Yes. Direct. Celsius. | Yes. Required latitude, longitude, temperature, `date_time`. Paid 2,110 or 2,900. | Unavailable. | No. | Docs say direct. REST quickstart says every POST is an activity. The MCP call was not made. |
| `heatmap` | Yes. Async. | Yes. Required polygon and `date_time`. Includes `idempotency_key`. | Unavailable. | No. | REST heatmap page does not document `idempotency_key`. Not executed. |
| `heatmap_read` | Yes. Input `heatmap_id`. Example `hm_123`. | Yes. Optional `activity_id` and optional `heatmap_id`. Neither is required. | Unavailable. | No. | The page shows one field. The schema has two and requires neither. |
| `report` | Yes. Async. Celsius. One to five analyses. | Yes. Description contains Fahrenheit. Premium text says at most two analyses. Paid 6,300 or 8,600. | Unavailable. | No. | Unit and analysis count disagree. Not a measured report. |
| `report_read` | Yes. `analytics_id`, and the prose says `activity_id` is an alias. | Yes. Required `analytics_id`. Properties are `heatmap_id` and `analytics_id`. Extra properties false. | Unavailable. | No. | The alias is not a schema field. |
| `satellite` | Yes. Direct. | Yes. Required `date_time`. Paid 14,400 Premium. | Unavailable. | No. | REST article was not extracted. Direct behavior was not executed. |
| `streetview` | Yes. Direct. Horizontal pan 0–360. | Yes. Required latitude, longitude, both angles, `back_view`. Paid 8,600. | Unavailable. | No. | The same-day full schema describes the angles differently from the page. The QA digest kept the names, not those sentences. Not executed. |
| `temperature_routing` | Yes. Async. | Yes. Required origin, destination, `departure_time`. Paid 3,500. | Unavailable. | No. | Field names agree with the REST routing page. Not executed. |
| `temperature_routing_read` | Yes. "Activity identifier," field name omitted. | Yes. Required `activity_id`. | Unavailable. | No. | The live field name supplies what the page omits. Not executed. |
| `credit_balance` | No. | Yes. No inputs. Description says free and read-only. | Unavailable. | Yes. Balance 997,100. `cost_credits` 0. `isError` false. | Documented catalogue is missing a tool the server exposes. |
| `monitoring` | No. | Yes. Required `operation`. Fourteen operations, including `delete_monitor` and `delete_heatmap_data`. Text says `list_monitors` and `list_alerts` are free and the others cost 3,500 on Premium. | Unavailable. | No. | A paid and destructive tool is on the live server and not in the published catalogue. |

## Previously identified issues

| Issue | Current evidence | Status |
| --- | --- | --- |
| Report temperature unit | Tools page still says Celsius. QA digest marks the live `report` description as Fahrenheit. REST page still says both. | Still present. Not executed. |
| `report_read` alias | Page still says `activity_id` is accepted. Live properties do not include it. | Still present. Not executed. |
| `env_params` direct measurement | Page still says direct. One REST job was asynchronous. The MCP tool was not called. | Documentation conflict remains. MCP runtime is unverified. |
| Monitoring cost | Live description still splits two free operations from 3,500-credit operations. | Still present on the schema. No operation was called, including the free ones, because the same tool can delete. |
| Nine versus eleven | Quickstart still says nine. Live list still has eleven, and the nine published names are all present. | Still present. |

## Finding

| ID | Component | Evidence | Expected | Actual | Impact | Severity | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| DOC-004 | `credit_balance`, `monitoring` | QA tool names. Six MCP pages. | Published setup matches discovery. | Two live tools have no published page. | An agent can select `delete_heatmap_data` from a tool the docs never mention. | High | Confirmed as a catalogue gap. The delete was not run, so impact is potential. |
