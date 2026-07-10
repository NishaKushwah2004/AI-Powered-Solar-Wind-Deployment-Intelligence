import { z } from "zod";

const siteSchema = z.object({
  name: z
    .string()
    .min(3, "Site name is required"),

  description: z.string().optional(),

  latitude: z.coerce
    .number()
    .min(-90)
    .max(90),

  longitude: z.coerce
    .number()
    .min(-180)
    .max(180),

  project_id: z.coerce
    .number()
    .min(1, "Project is required"),
});

export default siteSchema;