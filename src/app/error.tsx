"use client";

import { useEffect } from "react";
import { ErrorState } from "@/components/states/error-state";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <ErrorState
      title="Unable to load this page"
      description="An unexpected error occurred while loading the page."
      requestId={error.digest}
      onRetry={reset}
    />
  );
}
