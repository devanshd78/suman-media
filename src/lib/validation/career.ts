import { z } from "zod";
import {
  emailSchema,
  honeypotSchema,
  optionalTrimmedString,
} from "@/lib/validation/shared";

export const careerApplicationSchema = z.object({
  jobReference: z.string().trim().min(1).max(150),
  applicantName: z.string().trim().min(2).max(100),
  email: emailSchema,
  phone: optionalTrimmedString(30),
  resumeKey: z
    .string()
    .trim()
    .min(1)
    .max(1024)
    .regex(/^resumes\/[0-9]{4}-[0-9]{2}-[0-9]{2}\/[a-f0-9-]+-[^/]+$/),
  resumeFileName: z.string().trim().min(1).max(255),
  coverLetter: optionalTrimmedString(5000),
  turnstileToken: z.string().min(1).max(2048).optional(),
  website: honeypotSchema,
});

export type CareerApplicationInput = z.infer<typeof careerApplicationSchema>;
