import { z } from "zod";
import { emailSchema, honeypotSchema } from "@/lib/validation/shared";

export const newsletterSchema = z.object({
  email: emailSchema,
  turnstileToken: z.string().min(1).max(2048).optional(),
  website: honeypotSchema,
});

export type NewsletterInput = z.infer<typeof newsletterSchema>;
