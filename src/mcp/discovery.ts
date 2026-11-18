export type McpBehavior = "direct" | "async" | "read";

export interface DocumentedMcpTool {
  name: string;
  behavior: McpBehavior;
  purpose: string;
  startsNewAnalysis: boolean;
  documentedIdentifier?: string;
  notes: string[];
}

/**
 * Catalog named by the MCP quickstart and tool pages.
 * Phase 4 must replace this with the tools returned by `tools/list`.
 * A tool that appears only at runtime is an undocumented tool, not a planning assumption.
 */
export const DOCUMENTED_MCP_TOOLS: readonly DocumentedMcpTool[] = [
  {
    name: "env_params",
    behavior: "direct",
    purpose: "Point environmental conditions for one coordinate and time.",
    startsNewAnalysis: true,
    notes: [
      "Documented inputs include latitude, longitude, temperature, date_time, and optional analysis.",
      "REST describes the equivalent POST as an asynchronous activity.",
    ],
  },
  {
    name: "heatmap",
    behavior: "async",
    purpose: "Start an area heatmap.",
    startsNewAnalysis: true,
    notes: [
      "Documented optional wait_for_completion flag.",
      "Default behavior returns a processing status and an activity identifier.",
      "Granularity documented as 60, 80, or 100.",
    ],
  },
  {
    name: "heatmap_read",
    behavior: "read",
    purpose: "Read an existing heatmap activity.",
    startsNewAnalysis: false,
    documentedIdentifier: "heatmap_id",
    notes: [
      "The published example uses heatmap activity hm_123.",
      "REST status uses activity_id, including UUID examples.",
    ],
  },
  {
    name: "report",
    behavior: "async",
    purpose: "Start a Heat Intelligence report.",
    startsNewAnalysis: true,
    notes: [
      "MCP documents temperature as degrees Celsius.",
      "REST /v1/heat_intelligence documents temperature as Fahrenheit and also mentions Celsius.",
    ],
  },
  {
    name: "report_read",
    behavior: "read",
    purpose: "Read an existing Heat Intelligence report.",
    startsNewAnalysis: false,
    documentedIdentifier: "analytics_id",
    notes: [
      "Documented input is analytics_id, and the page says activity_id is also accepted.",
      "A fresh read is the documented way to replace an expired report link.",
    ],
  },
  {
    name: "satellite",
    behavior: "direct",
    purpose: "Satellite imagery segmentation for one location.",
    startsNewAnalysis: true,
    notes: ["REST equivalent is the most expensive documented call at 14,400 premium credits."],
  },
  {
    name: "streetview",
    behavior: "direct",
    purpose: "Street-level imagery segmentation.",
    startsNewAnalysis: true,
    notes: ["REST equivalent is premium-only and documented at 8,600 credits."],
  },
  {
    name: "temperature_routing",
    behavior: "async",
    purpose: "Start a temperature-aware route.",
    startsNewAnalysis: true,
    notes: ["REST path is /v1/routing. MCP tool name is temperature_routing."],
  },
  {
    name: "temperature_routing_read",
    behavior: "read",
    purpose: "Read an existing routing activity.",
    startsNewAnalysis: false,
    notes: [
      "The tools page rendered on 2026-11-18 says to use the activity identifier returned by temperature_routing.",
      "That page does not name the input field. The live schema has not been read.",
    ],
  },
];

export interface DiscoveredTool {
  name: string;
  description?: string;
  inputSchema: unknown;
}

export function compareCatalog(discovered: readonly DiscoveredTool[]): {
  missingFromServer: string[];
  undocumentedOnServer: string[];
} {
  const documented = new Set(DOCUMENTED_MCP_TOOLS.map((tool) => tool.name));
  const live = new Set(discovered.map((tool) => tool.name));
  return {
    missingFromServer: [...documented].filter((name) => !live.has(name)),
    undocumentedOnServer: [...live].filter((name) => !documented.has(name)),
  };
}
