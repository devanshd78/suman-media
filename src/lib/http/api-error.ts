import type { ApiCode, ApiFieldErrors } from "@/types/api";

type ApiErrorOptions = {
  status: number;
  code: Exclude<ApiCode, "OK" | "CREATED" | "ACCEPTED">;
  message: string;
  fieldErrors?: ApiFieldErrors;
  details?: unknown;
  headers?: HeadersInit;
};

export class ApiError extends Error {
  readonly status: number;
  readonly code: ApiErrorOptions["code"];
  readonly fieldErrors?: ApiFieldErrors;
  readonly details?: unknown;
  readonly headers?: HeadersInit;

  constructor(options: ApiErrorOptions) {
    super(options.message);
    this.name = "ApiError";
    this.status = options.status;
    this.code = options.code;
    this.fieldErrors = options.fieldErrors;
    this.details = options.details;
    this.headers = options.headers;
  }
}
