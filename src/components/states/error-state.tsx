"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { StateShell } from "@/components/feedback/state-shell";

type ErrorStateProps = {
  title?: string;
  description?: string;
  requestId?: string;
  onRetry?: () => void;
  href?: string;
  actionLabel?: string;
  icon?: ReactNode;
  compact?: boolean;
};

export function ErrorState({
  title = "Something went wrong",
  description = "We could not complete this request. Please try again.",
  requestId,
  onRetry,
  href,
  actionLabel = onRetry ? "Try again" : "Go back",
  icon,
  compact,
}: ErrorStateProps) {
  const actionClass =
    "inline-flex min-h-10 items-center justify-center rounded-md bg-zinc-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2";

  const action = onRetry ? (
    <button type="button" onClick={onRetry} className={actionClass}>
      {actionLabel}
    </button>
  ) : href ? (
    <Link href={href} className={actionClass}>
      {actionLabel}
    </Link>
  ) : null;

  return (
    <div>
      <StateShell
        role="alert"
        title={title}
        description={description}
        icon={icon}
        action={action}
        compact={compact}
      />
      {requestId ? (
        <p className="-mt-8 pb-8 text-center text-xs text-zinc-500">
          Reference: <code>{requestId}</code>
        </p>
      ) : null}
    </div>
  );
}
