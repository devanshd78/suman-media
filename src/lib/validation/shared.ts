import { z } from "zod";

export const optionalTrimmedString = (max: number) =>
  z.preprocess(
    (value: unknown) => (typeof value === "string" && value.trim() === "" ? undefined : value),
    z.string().trim().max(max).optional(),
  );

export const emailSchema = z
  .string()
  .trim()
  .email("Enter a valid email address")
  .max(254)
  .transform((value: string) => value.toLowerCase());

export const honeypotSchema = z.string().max(0).optional();
