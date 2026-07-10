import { z } from "zod";

export const registerSchema = z
  .object({
    full_name: z
      .string()
      .trim()
      .min(3, "Full name is required."),

    email: z
      .string()
      .trim()
      .email("Please enter a valid email address."),

    password: z
      .string()
      .min(8, "Password must contain at least 8 characters."),

    confirm_password: z.string(),

    role_id: z
      .number({
        invalid_type_error: "Role is required.",
      })
      .positive(),
  })
  .refine(
    (data) => data.password === data.confirm_password,
    {
      path: ["confirm_password"],
      message: "Passwords do not match.",
    }
  );

export default registerSchema;