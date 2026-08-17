import type { ReactNode } from "react";
import { StateShell } from "@/components/feedback/state-shell";

type SuccessStateProps = {
  title?: string;
  description?: string;
  action?: ReactNode;
  compact?: boolean;
};

export function SuccessState({
  title = "Submitted successfully",
  description = "Your request has been received.",
  action,
  compact,
}: SuccessStateProps) {
  return (
    <StateShell
      title={title}
      description={description}
      action={action}
      compact={compact}
    />
  );
}
