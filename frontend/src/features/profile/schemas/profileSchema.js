import { z } from "zod";

const profileSchema = z.object({
  full_name: z
    .string()
    .min(3, "Full name is required")
    .max(100),
});

export default profileSchema;