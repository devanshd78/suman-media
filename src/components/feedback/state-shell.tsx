import type { ReactNode } from "react";

type StateShellProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
  role?: "status" | "alert";
  compact?: boolean;
};

export function StateShell({
  eyebrow,
  title,
  description,
  icon,
  action,
  role = "status",
  compact = false,
}: StateShellProps) {
  return (
    <section
      role={role}
      className={`mx-auto flex w-full max-w-xl flex-col items-center justify-center px-6 text-center ${compact ? "min-h-48 py-8" : "min-h-72 py-12"}`}
    >
      {icon ? (
        <div className="mb-5 flex size-12 items-center justify-center rounded-full bg-zinc-100 text-zinc-700">
          {icon}
        </div>
      ) : null}
      {eyebrow ? (
        <p className="text-sm font-medium uppercase tracking-[0.16em] text-zinc-500">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-2xl font-semibold tracking-tight text-zinc-950">{title}</h2>
      {description ? (
        <p className="mt-3 max-w-md text-sm leading-6 text-zinc-600">{description}</p>
      ) : null}
      {action ? <div className="mt-6">{action}</div> : null}
    </section>
  );
}
