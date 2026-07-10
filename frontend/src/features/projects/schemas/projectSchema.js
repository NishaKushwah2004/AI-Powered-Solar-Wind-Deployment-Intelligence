import { z } from "zod";

export const projectSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Project name is required.")
    .max(100, "Project name is too long."),

  description: z
    .string()
    .trim()
    .optional(),

  region: z
    .string()
    .trim()
    .min(2, "Region is required."),
});

export default projectSchema;