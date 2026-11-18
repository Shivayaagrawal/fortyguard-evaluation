import { describe, expect, it } from "vitest";
import { ENDPOINTS, creditCost } from "../../src/api/endpoints.js";
import { PaidCallRefused, assertPaidCallAllowed } from "../../src/api/client.js";
import {
  activityAcceptedSchema,
  activityStatusSchema,
  envParamsRequestSchema,
  heatmapRequestSchema,
  heatIntelligenceRequestSchema,
  interpretActivityStatus,
} from "../../src/api/schemas.js";

const documentedPolygon = {
  type: "Polygon",
  coordinates: [[
    [-74.017, 40.7051],
    [-74.0031, 40.7051],
    [-74.0031, 40.718],
    [-74.017, 40.718],
    [-74.017, 40.7051],
  ]],
};

const documentedFeatureCollection = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {},
      geometry: documentedPolygon,
    },
  ],
};

describe("published endpoint inventory", () => {
  it("lists the six documented POST operations and the shared status read", () => {
    expect(ENDPOINTS.map((endpoint) => `${endpoint.method} ${endpoint.path}`)).toEqual([
      "POST /v1/heatmap",
      "POST /v1/env_params",
      "GET /v1/status/{activity_id}",
      "POST /v1/routing",
      "POST /v1/heat_intelligence",
      "POST /v1/streetview",
      "POST /v1/satellite",
    ]);
  });

  it("keeps the cheapest paid call below the expensive imagery and report calls", () => {
    const env = ENDPOINTS.find((endpoint) => endpoint.id === "env-params");
    const satellite = ENDPOINTS.find((endpoint) => endpoint.id === "satellite");
    expect(env).toBeDefined();
    expect(satellite).toBeDefined();
    expect(creditCost(env!, "basic")).toBe(2110);
    expect(creditCost(satellite!, "premium")).toBe(14400);
    expect(creditCost(satellite!, "basic")).toBeNull();
  });
});

describe("documented request examples", () => {
  it("accepts both published heatmap area shapes", () => {
    const dateTime = {
      start_date: "2024-07-15",
      start_time: "14:00",
      filter_type: 1,
    };
    expect(heatmapRequestSchema.safeParse({
      polygon_aoi: documentedPolygon,
      date_time: dateTime,
      granularity: 100,
    }).success).toBe(true);
    expect(heatmapRequestSchema.safeParse({
      polygon_aoi: documentedFeatureCollection,
      date_time: dateTime,
      granularity: 100,
    }).success).toBe(true);
  });

  it("accepts the published Heat Intelligence example without deciding the temperature unit", () => {
    const parsed = heatIntelligenceRequestSchema.safeParse({
      latitude: 40.7128,
      longitude: -74.006,
      temperature: 82.4,
      date: "2024-07-15",
      analysis: ["environmental"],
    });
    expect(parsed.success).toBe(true);
  });

  it("accepts the activity envelope shown in the quickstart", () => {
    expect(activityAcceptedSchema.safeParse({
      data: { activity_id: "f3e1c68b-1cc3-46bc-8589-1faaf30ef30a" },
    }).success).toBe(true);
  });
});

describe("credit guard", () => {
  it("refuses a paid call while FORTYGUARD_ALLOW_PAID is not true", () => {
    const previous = process.env.FORTYGUARD_ALLOW_PAID;
    process.env.FORTYGUARD_ALLOW_PAID = "false";
    const heatmap = ENDPOINTS.find((endpoint) => endpoint.id === "heatmap");
    expect(() => assertPaidCallAllowed(heatmap!, "basic")).toThrow(PaidCallRefused);
    if (previous === undefined) delete process.env.FORTYGUARD_ALLOW_PAID;
    else process.env.FORTYGUARD_ALLOW_PAID = previous;
  });

  it("refuses a premium-only call on the basic plan", () => {
    const satellite = ENDPOINTS.find((endpoint) => endpoint.id === "satellite");
    expect(() => assertPaidCallAllowed(satellite!, "basic")).toThrow(PaidCallRefused);
  });

  it("allows the documented zero-cost status read without the paid flag", () => {
    const previous = process.env.FORTYGUARD_ALLOW_PAID;
    process.env.FORTYGUARD_ALLOW_PAID = "false";
    const status = ENDPOINTS.find((endpoint) => endpoint.id === "status");
    expect(assertPaidCallAllowed(status!, "basic")).toBe(0);
    if (previous === undefined) delete process.env.FORTYGUARD_ALLOW_PAID;
    else process.env.FORTYGUARD_ALLOW_PAID = previous;
  });
});

describe("local contract rejects", () => {
  const dateTime = {
    start_date: "2024-07-15",
    start_time: "14:00",
    filter_type: 1,
  };

  it("rejects an environmental request with no temperature and an out-of-range latitude", () => {
    expect(envParamsRequestSchema.safeParse({
      latitude: 40.7128,
      longitude: -74.006,
      date_time: dateTime,
    }).success).toBe(false);
    expect(envParamsRequestSchema.safeParse({
      latitude: 91,
      longitude: -74.006,
      temperature: 32.5,
      date_time: dateTime,
    }).success).toBe(false);
  });

  it("rejects a heatmap ring that is too short to close", () => {
    expect(heatmapRequestSchema.safeParse({
      polygon_aoi: {
        type: "Polygon",
        coordinates: [[
          [-74.017, 40.7051],
          [-74.0031, 40.7051],
          [-74.017, 40.7051],
        ]],
      },
      date_time: dateTime,
    }).success).toBe(false);
  });

  it("rejects a MultiPolygon because neither published example uses one", () => {
    expect(heatmapRequestSchema.safeParse({
      polygon_aoi: {
        type: "MultiPolygon",
        coordinates: [documentedPolygon.coordinates],
      },
      date_time: dateTime,
    }).success).toBe(false);
  });

  it("rejects an acceptance body with no activity id", () => {
    expect(activityAcceptedSchema.safeParse({ data: {} }).success).toBe(false);
    expect(activityAcceptedSchema.safeParse({ activity_id: "abc" }).success).toBe(false);
  });

  it("accepts the documented status words and rejects an invented one", () => {
    expect(activityStatusSchema.safeParse("Processing").success).toBe(true);
    expect(activityStatusSchema.safeParse("succeeded").success).toBe(true);
    expect(activityStatusSchema.safeParse("queued").success).toBe(false);
  });
});

describe("local polling interpretation", () => {
  it("continues on processing and stops on both published success words", () => {
    expect(interpretActivityStatus("Processing")).toBe("continue");
    expect(interpretActivityStatus("Completed")).toBe("complete");
    expect(interpretActivityStatus("succeeded")).toBe("complete");
    expect(interpretActivityStatus("Failed")).toBe("failed");
    expect(interpretActivityStatus("error")).toBe("failed");
    expect(interpretActivityStatus("queued")).toBe("unknown");
  });
});
