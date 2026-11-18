# MCP evaluation

Status: closed. Blocked — provider-side HTTP failure observed. The handshake returned HTTP 200 and then HTTP 503. No tool was discovered or invoked. The rating is not scored. Detail: `docs/10-cross-product-and-final-report.md`. The case list below is the unused plan.

Endpoint: `https://tos-mcp.app.fortyguard.com/mcp`.

Transport: remote MCP over HTTP, Streamable HTTP.

Auth: `Authorization: Bearer <FORTYGUARD_API_KEY>`.

Client: official TypeScript SDK, `@modelcontextprotocol/sdk` 1.32.2, in `src/mcp/client.ts`. Cursor is the agent host for the natural-language cases. The harness is the host for discovery and negative cases, so those results do not depend on the model choosing a tool.

The public status page, fetched 17 November 2026, showed MCP Server as `No data` and an incident still investigating since 14 October 2026. That is not treated as proof the endpoint is down.

## Documented tools

| Tool | Behavior | Documented id input | Starts work |
| --- | --- | --- | --- |
| `env_params` | Direct | — | Yes |
| `heatmap` | Async | returns an activity id | Yes |
| `heatmap_read` | Read | `heatmap_id` | No |
| `report` | Async | returns an activity id | Yes |
| `report_read` | Read | `analytics_id`, also `activity_id` | No |
| `satellite` | Direct | — | Yes |
| `streetview` | Direct | — | Yes |
| `temperature_routing` | Async | returns an activity id | Yes |
| `temperature_routing_read` | Read | name not fully visible in the excerpt | No |

`src/mcp/discovery.ts` compares this list with a live `tools/list`. Tools only on the server are undocumented. Tools missing from the server are a docs defect. Either result is recorded before any tool is invoked.

Credit cost per tool is not published. The MCP pages say a new heatmap, report, or route may consume credits and that availability follows the API plan. Assume the REST price until a tool schema or a credit balance says otherwise.

## Cases

Discovery and negative cases:

1. Connect and list tools.
2. Invoke `env_params` with latitude and longitude and no temperature.
3. Invoke `heatmap_read` with an id that cannot exist.
4. Invoke `report_read` with `analytics_id` and, separately, the same value as `activity_id`, using an id that cannot exist. This checks the documented alias without creating a report.

Natural-language cases, after discovery, and without approving a paid tool unless the prompt cannot be answered from the schema:

| Prompt | Competent behavior |
| --- | --- |
| "Generate a temperature heatmap for this geographic area." | Select `heatmap`. Ask for a polygon, date, and time if they were not provided. Do not invent a polygon and submit it. |
| "Retrieve the status of my previous analysis." | Ask which id, or use an id already in context. Choose the matching read tool. Do not call a submit tool. |
| "Explain the environmental parameters available for this operation." | Answer from the tool schema. Call `env_params` only when a coordinate, time, and reference temperature are present. |
| "Generate a temperature-aware route between two locations." | Select `temperature_routing`. Ask for origin, destination, and departure time. |

The heatmap and routing prompts are selection tests. They are not permission to spend 3,500 credits.

## REST comparison to make

| Question | REST | MCP | How to decide |
| --- | --- | --- | --- |
| Does point environment return inline? | Documented as an activity | Documented as direct | One approved `env_params` on the surface not already charged, or a schema that shows the wrapped activity |
| Which temperature unit does a report use? | Fahrenheit and Celsius in the same page | Celsius | Do not spend 8,600 credits to find out. Inspect the tool schema and the rendered REST page first |
| Can a REST `activity_id` be read through MCP? | `activity_id` | `heatmap_id` or `analytics_id` | Read an id already created. Do not create one for this check |
| Are imagery tools direct? | Activity | Direct | Defer. Satellite is 14,400 credits |

## Results

None.
