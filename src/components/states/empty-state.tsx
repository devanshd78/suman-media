import type { ReactNode } from "react";
import { StateShell } from "@/components/feedback/state-shell";

type EmptyStateProps = {
  title?: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
  compact?: boolean;
};

export function EmptyState({
  title = "Nothing to show",
  description = "Content will appear here when it becomes available.",
  icon,
  action,
  compact,
}: EmptyStateProps) {
  return (
    <StateShell
      title={title}
      description={description}
      icon={icon}
      action={action}
      compact={compact}
    />
  );
}
