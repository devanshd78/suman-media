import { z } from "zod";
import { honeypotSchema } from "@/lib/validation/shared";

export const MAX_RESUME_BYTES = 10 * 1024 * 1024;

export const uploadRequestSchema = z.object({
  category: z.literal("resume"),
  fileName: z.string().trim().min(1).max(255),
  contentType: z.string().trim().min(1).max(150),
  size: z.number().int().positive().max(MAX_RESUME_BYTES),
  turnstileToken: z.string().min(1).max(2048).optional(),
  website: honeypotSchema,
});

export type UploadRequestInput = z.infer<typeof uploadRequestSchema>;
