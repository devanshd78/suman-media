import type {
  ApiFailure,
  ApiFieldErrors,
  ApiResponse,
  ApiSuccess,
} from "@/types/api";

export class ApiClientError extends Error {
  readonly status: number;
  readonly code: ApiFailure["code"];
  readonly requestId: string;
  readonly fieldErrors?: ApiFieldErrors;
  readonly details?: unknown;

  constructor(response: ApiFailure) {
    super(response.message);
    this.name = "ApiClientError";
    this.status = response.status;
    this.code = response.code;
    this.requestId = response.meta.requestId;
    this.fieldErrors = response.error.fieldErrors;
    this.details = response.error.details;
  }
}

export function isApiClientError(error: unknown): error is ApiClientError {
  return error instanceof ApiClientError;
}

export type ContactPayload = {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject?: string;
  message: string;
  sourceUrl?: string;
  turnstileToken?: string;
  website?: string;
};

export type NewsletterPayload = {
  email: string;
  turnstileToken?: string;
  website?: string;
};

export type CareerApplicationPayload = {
  jobReference: string;
  applicantName: string;
  email: string;
  phone?: string;
  resumeKey: string;
  resumeFileName: string;
  coverLetter?: string;
  turnstileToken?: string;
  website?: string;
};

export type UploadRequest = {
  category: "resume";
  fileName: string;
  contentType: string;
  size: number;
  turnstileToken?: string;
  website?: string;
};

export type UploadResult = {
  uploadUrl: string;
  key: string;
  expiresIn: number;
};

type RequestOptions<TBody> = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: TBody;
  signal?: AbortSignal;
  timeoutMs?: number;
};

async function readApiResponse<T>(response: Response): Promise<ApiResponse<T>> {
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    throw new Error(`API returned a non-JSON response (${response.status})`);
  }
  return (await response.json()) as ApiResponse<T>;
}

export async function apiRequest<TResponse, TBody = never>(
  url: string,
  options: RequestOptions<TBody> = {},
): Promise<ApiSuccess<TResponse>> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), options.timeoutMs ?? 15_000);
  const onAbort = () => controller.abort();
  if (options.signal?.aborted) controller.abort();
  options.signal?.addEventListener("abort", onAbort, { once: true });

  try {
    const response = await fetch(url, {
      method: options.method ?? (options.body === undefined ? "GET" : "POST"),
      headers: options.body === undefined ? undefined : { "content-type": "application/json" },
      body: options.body === undefined ? undefined : JSON.stringify(options.body),
      credentials: "same-origin",
      cache: "no-store",
      signal: controller.signal,
    });

    const result = await readApiResponse<TResponse>(response);
    if (!response.ok || !result.success) {
      if (!result.success) throw new ApiClientError(result);
      throw new Error(`Request failed with status ${response.status}`);
    }

    return result;
  } finally {
    clearTimeout(timeout);
    options.signal?.removeEventListener("abort", onAbort);
  }
}

export function submitContact(payload: ContactPayload, signal?: AbortSignal) {
  return apiRequest<{ id: string }, ContactPayload>("/api/contact", {
    body: payload,
    signal,
  });
}

export function subscribeNewsletter(payload: NewsletterPayload, signal?: AbortSignal) {
  return apiRequest<{ id: string }, NewsletterPayload>("/api/newsletter", {
    body: payload,
    signal,
  });
}

export function submitCareerApplication(
  payload: CareerApplicationPayload,
  signal?: AbortSignal,
) {
  return apiRequest<{ id: string }, CareerApplicationPayload>("/api/careers/apply", {
    body: payload,
    signal,
  });
}

export function requestResumeUpload(payload: UploadRequest, signal?: AbortSignal) {
  return apiRequest<UploadResult, UploadRequest>("/api/uploads/presign", {
    body: payload,
    signal,
  });
}

export async function uploadFileToS3(
  file: File,
  uploadUrl: string,
  signal?: AbortSignal,
) {
  const response = await fetch(uploadUrl, {
    method: "PUT",
    headers: { "content-type": file.type },
    body: file,
    signal,
  });

  if (!response.ok) throw new Error("File upload failed");
}
