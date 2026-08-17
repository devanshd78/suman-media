import { NextResponse } from "next/server";
import type {
  ApiFailure,
  ApiFieldErrors,
  ApiSuccess,
} from "@/types/api";

const baseHeaders = {
  "Cache-Control": "no-store, max-age=0",
  "Content-Type": "application/json; charset=utf-8",
};

type SuccessOptions<T> = {
  requestId: string;
  data: T;
  status?: 200 | 201 | 202;
  code?: "OK" | "CREATED" | "ACCEPTED";
  message?: string;
  headers?: HeadersInit;
};

export function apiSuccess<T>({
  requestId,
  data,
  status = 200,
  code = status === 201 ? "CREATED" : status === 202 ? "ACCEPTED" : "OK",
  message = "Request completed successfully",
  headers,
}: SuccessOptions<T>) {
  return NextResponse.json<ApiSuccess<T>>(
    {
      success: true,
      status,
      code,
      message,
      data,
      meta: {
        requestId,
        timestamp: new Date().toISOString(),
      },
    },
    {
      status,
      headers: {
        ...baseHeaders,
        "X-Request-Id": requestId,
        ...Object.fromEntries(new Headers(headers).entries()),
      },
    },
  );
}

type FailureOptions = {
  requestId: string;
  status: number;
  code: ApiFailure["code"];
  message: string;
  fieldErrors?: ApiFieldErrors;
  details?: unknown;
  headers?: HeadersInit;
};

export function apiFailure({
  requestId,
  status,
  code,
  message,
  fieldErrors,
  details,
  headers,
}: FailureOptions) {
  return NextResponse.json<ApiFailure>(
    {
      success: false,
      status,
      code,
      message,
      error: {
        ...(fieldErrors ? { fieldErrors } : {}),
        ...(details === undefined ? {} : { details }),
      },
      meta: {
        requestId,
        timestamp: new Date().toISOString(),
      },
    },
    {
      status,
      headers: {
        ...baseHeaders,
        "X-Request-Id": requestId,
        ...Object.fromEntries(new Headers(headers).entries()),
      },
    },
  );
}
