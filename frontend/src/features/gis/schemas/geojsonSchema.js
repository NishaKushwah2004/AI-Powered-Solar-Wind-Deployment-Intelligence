import { z } from "zod";

export const geometrySchema = z.object({
  type: z.literal("Point"),

  coordinates: z
    .array(z.number())
    .length(2),
});

export const featureSchema = z.object({
  type: z.literal("Feature"),

  geometry: geometrySchema,

  properties: z.record(z.any()),
});

const featureCollectionSchema = z.object({
  type: z.literal("FeatureCollection"),

  features: z.array(featureSchema),
});

export default featureCollectionSchema;