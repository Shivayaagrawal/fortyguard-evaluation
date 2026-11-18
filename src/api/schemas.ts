import { z } from "zod";

/**
 * Schemas below mirror the published request examples.
 * They are fixtures for the evaluation, not a claim that the server validates
 * exactly these shapes. Phase 3 has to compare them with runtime responses.
 */

export const filterTypeSchema = z.union([
  z.literal(1),
  z.literal(2),
  z.literal(3),
  z.literal(4),
]);

export const dateTimeSchema = z.object({
  start_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  filter_type: filterTypeSchema,
  start_time: z.string().regex(/^\d{2}:\d{2}$/).optional(),
  end_time: z.string().regex(/^\d{2}:\d{2}$/).optional(),
  end_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
});

const ringSchema = z.array(z.tuple([z.number(), z.number()])).min(4);

export const polygonGeometrySchema = z.object({
  type: z.literal("Polygon"),
  coordinates: z.array(ringSchema).min(1),
});

export const polygonFeatureCollectionSchema = z.object({
  type: z.literal("FeatureCollection"),
  features: z.array(
    z.object({
      type: z.literal("Feature"),
      properties: z.record(z.string(), z.unknown()).optional(),
      geometry: polygonGeometrySchema,
    }),
  ).min(1),
});

/** The docs publish both shapes. Keep them distinct until runtime testing chooses. */
export const polygonAoiSchema = z.union([
  polygonGeometrySchema,
  polygonFeatureCollectionSchema,
]);

export const heatmapRequestSchema = z.object({
  polygon_aoi: polygonAoiSchema,
  date_time: dateTimeSchema,
  granularity: z.union([z.literal(60), z.literal(80), z.literal(100)]).optional(),
  analytic_type: z.enum(["tcm", "time_of_measure", "exceedance", "persistence"]).optional(),
  map_type: z.enum(["bm", "tcm", "tccm"]).optional(),
});

export const envParamsRequestSchema = z.object({
  latitude: z.number().gte(-90).lte(90),
  longitude: z.number().gte(-180).lte(180),
  temperature: z.number(),
  date_time: dateTimeSchema,
  analysis: z.array(z.string()).optional(),
});

export const routingRequestSchema = z.object({
  origin: z.object({
    lat: z.number().gte(-90).lte(90),
    lon: z.number().gte(-180).lte(180),
  }),
  destination: z.object({
    lat: z.number().gte(-90).lte(90),
    lon: z.number().gte(-180).lte(180),
  }),
  departure_time: z.string().datetime(),
});

export const heatIntelligenceRequestSchema = z.object({
  latitude: z.number().gte(-90).lte(90),
  longitude: z.number().gte(-180).lte(180),
  temperature: z.number(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  analysis: z.array(z.enum(["geographic", "environmental", "urban", "events", "anthropogenic"])).min(1),
});

export const streetViewRequestSchema = z.object({
  latitude: z.number().gte(-90).lte(90),
  longitude: z.number().gte(-180).lte(180),
  vertical_angle: z.number(),
  horizontal_angle: z.number().gte(0).lte(360),
  back_view: z.boolean(),
});

export const satelliteRequestSchema = z.object({
  sat: z.object({
    latitude: z.number().gte(-90).lte(90),
    longitude: z.number().gte(-180).lte(180),
  }),
  date_time: dateTimeSchema,
  granularity: z.union([z.literal(20), z.literal(60), z.literal(80), z.literal(100)]).optional(),
});

export const activityAcceptedSchema = z.object({
  data: z.object({
    activity_id: z.string().min(1),
  }),
});

export const activityStatusSchema = z.enum([
  "Processing",
  "Completed",
  "Failed",
  "processing",
  "completed",
  "failed",
  "succeeded",
  "error",
]);

/** Local reading of the two status vocabularies published in the quickstart. */
export function interpretActivityStatus(status: string): "continue" | "complete" | "failed" | "unknown" {
  switch (status.toLowerCase()) {
    case "processing":
      return "continue";
    case "completed":
    case "succeeded":
      return "complete";
    case "failed":
    case "error":
      return "failed";
    default:
      return "unknown";
  }
}
