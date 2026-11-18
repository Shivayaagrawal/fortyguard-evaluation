# Cross-product second pass

18 November 2026. Current pages and the new MCP schema, compared with the status reread. No new paid call.

| Topic | Current documentation | Current live behavior | Earlier finding |
| --- | --- | --- | --- |
| Report temperature | REST field Fahrenheit, date sentence Celsius, example `82.4`. MCP page Celsius. | Live `report` schema says Fahrenheit. Not executed. | Persists. |
| Environmental temperature | REST and MCP `env_params` say Celsius. | The stored job uses Celsius field names and Phoenix `-07:00`. | Persists as a match, not a conflict. |
| Activity id | REST status and the completed job use `activity_id`. | The 404 and the reread use `activity_id`. | Persists. |
| Report read id | MCP page says `analytics_id`, and that `activity_id` is an alias. | Live schema requires `analytics_id` and does not define `activity_id`. Alias not tried. | Persists. |
| Heatmap read id | MCP page shows `heatmap_id` and `hm_123`. | Live schema accepts `activity_id` or `heatmap_id`. Not called. | Persists. |
| Routing read id | The tools page does not name the field in the short section. | Live schema requires `activity_id`. Not called. | Persists. |
| Polygon shape | Quickstart and authentication use a FeatureCollection. Heatmap page uses a Polygon. | Live heatmap schema accepts Polygon, Feature, or FeatureCollection. Not executed. | Persists in the examples. |
| Status words | Table: Processing, Completed, Failed. Sample also uses succeeded and error. | The reread status is `Completed`. | The extra words remain documented. One live success word is `Completed`. |
| Credits | Env-params Premium price 2,900. | Balance is still 997,100. This pass added no charge. The job body still has no cost. | Persists. |
| Catalogue | Nine published tools. | Eleven live tools. | Persists. |
| Direct versus async | MCP page calls `env_params`, `satellite`, and `streetview` direct. REST quickstart calls every POST an activity. | REST env-params was an activity. The MCP tool was not called. | The documents still disagree. Runtime for MCP is untested. |
| Dashboard | Not reopened. | The earlier gateway strings stay historical. | Unchanged by this pass. |
