export const API_CODES = {
  OK: "OK",
  CREATED: "CREATED",
  ACCEPTED: "ACCEPTED",
  INVALID_JSON: "INVALID_JSON",
  INVALID_CONTENT_TYPE: "INVALID_CONTENT_TYPE",
  METHOD_NOT_ALLOWED: "METHOD_NOT_ALLOWED",
  PAYLOAD_TOO_LARGE: "PAYLOAD_TOO_LARGE",
  VALIDATION_ERROR: "VALIDATION_ERROR",
  UNAUTHORIZED: "UNAUTHORIZED",
  FORBIDDEN: "FORBIDDEN",
  NOT_FOUND: "NOT_FOUND",
  CONFLICT: "CONFLICT",
  RATE_LIMITED: "RATE_LIMITED",
  BOT_CHECK_FAILED: "BOT_CHECK_FAILED",
  UNSUPPORTED_FILE: "UNSUPPORTED_FILE",
  STORAGE_NOT_CONFIGURED: "STORAGE_NOT_CONFIGURED",
  STORAGE_OBJECT_NOT_FOUND: "STORAGE_OBJECT_NOT_FOUND",
  DATABASE_UNAVAILABLE: "DATABASE_UNAVAILABLE",
  SERVICE_UNAVAILABLE: "SERVICE_UNAVAILABLE",
  INTERNAL_ERROR: "INTERNAL_ERROR"
} as const;

export type ApiCode = (typeof API_CODES)[keyof typeof API_CODES];

export type ApiMeta = {
  requestId: string;
  timestamp: string;
};

export type ApiSuccess<T> = {
  success: true;
  status: number;
  code: "OK" | "CREATED" | "ACCEPTED";
  message: string;
  data: T;
  meta: ApiMeta;
};

export type ApiFieldErrors = Record<string, string[]>;

export type ApiFailure = {
  success: false;
  status: number;
  code: Exclude<ApiCode, "OK" | "CREATED" | "ACCEPTED">;
  message: string;
  error: {
    fieldErrors?: ApiFieldErrors;
    details?: unknown;
  };
  meta: ApiMeta;
};

export type ApiResponse<T> = ApiSuccess<T> | ApiFailure;

export type PaginationMeta = {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
};

export type PaginatedData<T> = {
  items: T[];
  pagination: PaginationMeta;
};
