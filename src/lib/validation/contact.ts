import { z } from "zod";
import {
  emailSchema,
  honeypotSchema,
  optionalTrimmedString,
} from "@/lib/validation/shared";

export const contactSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: emailSchema,
  phone: optionalTrimmedString(30),
  company: optionalTrimmedString(150),
  subject: optionalTrimmedString(200),
  message: z.string().trim().min(10).max(5000),
  sourceUrl: z.preprocess(
    (value: unknown) => (value === "" ? undefined : value),
    z.string().url().max(2048).optional(),
  ),
  turnstileToken: z.string().min(1).max(2048).optional(),
  website: honeypotSchema,
});

export type ContactInput = z.infer<typeof contactSchema>;
