import { describe, expect, it } from "vitest";
import { DOCUMENTED_MCP_TOOLS } from "../../src/mcp/discovery.js";

describe("documented MCP catalog", () => {
  it("matches the nine tools named in the MCP quickstart", () => {
    expect(DOCUMENTED_MCP_TOOLS.map((tool) => tool.name)).toEqual([
      "env_params",
      "heatmap",
      "heatmap_read",
      "report",
      "report_read",
      "satellite",
      "streetview",
      "temperature_routing",
      "temperature_routing_read",
    ]);
  });

  it("does not treat a read tool as a new charged analysis", () => {
    const reads = DOCUMENTED_MCP_TOOLS.filter((tool) => tool.behavior === "read");
    expect(reads.every((tool) => tool.startsNewAnalysis === false)).toBe(true);
  });
});
