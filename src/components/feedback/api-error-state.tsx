"use client";

import { ErrorState } from "@/components/states/error-state";
import { isApiClientError } from "@/lib/api/client";

const errorCopy = {
  INVALID_CONTENT_TYPE: {
    title: "Unsupported request",
    description: "The request was sent in an unsupported format.",
  },
  PAYLOAD_TOO_LARGE: {
    title: "Request too large",
    description: "Reduce the submitted content and try again.",
  },
  METHOD_NOT_ALLOWED: {
    title: "Action not supported",
    description: "This action is not available for the requested endpoint.",
  },
  INVALID_JSON: {
    title: "Invalid request",
    description: "The submitted request could not be read.",
  },
  VALIDATION_ERROR: {
    title: "Check the form",
    description: "Some submitted fields need your attention.",
  },
  UNAUTHORIZED: {
    title: "Access denied",
    description: "You are not authorized to complete this request.",
  },
  FORBIDDEN: {
    title: "Access denied",
    description: "You do not have permission to complete this request.",
  },
  RATE_LIMITED: {
    title: "Too many attempts",
    description: "Please wait a little before trying again.",
  },
  BOT_CHECK_FAILED: {
    title: "Verification failed",
    description: "Complete the verification and submit again.",
  },
  UNSUPPORTED_FILE: {
    title: "Unsupported file",
    description: "Choose a supported file type and try again.",
  },
  STORAGE_NOT_CONFIGURED: {
    title: "Upload unavailable",
    description: "File storage has not been configured yet.",
  },
  STORAGE_OBJECT_NOT_FOUND: {
    title: "Upload not found",
    description: "Upload the file again before submitting the form.",
  },
  SERVICE_UNAVAILABLE: {
    title: "Service temporarily unavailable",
    description: "Please try again after a short while.",
  },
  DATABASE_UNAVAILABLE: {
    title: "Service temporarily unavailable",
    description: "Please try again after a short while.",
  },
} as const;

type ApiErrorStateProps = {
  error: unknown;
  onRetry?: () => void;
  compact?: boolean;
};

export function ApiErrorState({ error, onRetry, compact }: ApiErrorStateProps) {
  if (isApiClientError(error)) {
    const copy = errorCopy[error.code as keyof typeof errorCopy];
    return (
      <ErrorState
        title={copy?.title ?? "Request failed"}
        description={copy?.description ?? error.message}
        requestId={error.requestId}
        onRetry={onRetry}
        compact={compact}
      />
    );
  }

  return <ErrorState onRetry={onRetry} compact={compact} />;
}
