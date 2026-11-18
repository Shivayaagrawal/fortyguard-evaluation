/**
 * Planned MCP cases. Nothing in this module calls a tool.
 * Phase 4 executes the unbilled cases first, then at most one low-cost tool
 * after the credit balance is known.
 */
export interface PlannedMcpCase {
  id: string;
  tool: string;
  kind: "discovery" | "negative" | "read" | "paid";
  prompt?: string;
  expectedSelection?: string;
}

export const PLANNED_MCP_CASES: readonly PlannedMcpCase[] = [
  {
    id: "discover-catalog",
    tool: "tools/list",
    kind: "discovery",
  },
  {
    id: "env-params-missing-temperature",
    tool: "env_params",
    kind: "negative",
  },
  {
    id: "heatmap-read-unknown-id",
    tool: "heatmap_read",
    kind: "read",
  },
  {
    id: "report-read-unknown-id",
    tool: "report_read",
    kind: "read",
  },
  {
    id: "nl-heatmap-selection",
    tool: "heatmap",
    kind: "discovery",
    prompt: "Generate a temperature heatmap for this geographic area.",
    expectedSelection: "heatmap",
  },
  {
    id: "nl-status-selection",
    tool: "heatmap_read",
    kind: "discovery",
    prompt: "Retrieve the status of my previous analysis.",
    expectedSelection: "heatmap_read or report_read or temperature_routing_read, depending on which identifier is in context",
  },
  {
    id: "nl-env-params",
    tool: "env_params",
    kind: "paid",
    prompt: "Explain the environmental parameters available for this operation.",
    expectedSelection: "env_params only if a coordinate and time are supplied; otherwise the agent should explain the schema without calling it",
  },
  {
    id: "nl-routing",
    tool: "temperature_routing",
    kind: "paid",
    prompt: "Generate a temperature-aware route between two locations.",
    expectedSelection: "temperature_routing",
  },
];
