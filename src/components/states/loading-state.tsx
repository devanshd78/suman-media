type LoadingStateProps = {
  label?: string;
  rows?: number;
  compact?: boolean;
};

export function LoadingState({
  label = "Loading content",
  rows = 3,
  compact = false,
}: LoadingStateProps) {
  return (
    <section
      aria-busy="true"
      aria-live="polite"
      aria-label={label}
      className={`mx-auto w-full max-w-full px-5 sm:px-8 lg:px-[3.5rem] ${compact ? "py-8" : "py-16"}`}
    >
      <span className="sr-only">{label}</span>
      <div className="animate-pulse space-y-5">
        <div className="h-4 w-32 rounded bg-zinc-200" />
        <div className="h-10 max-w-xl rounded bg-zinc-200" />
        <div className="space-y-3 pt-3">
          {Array.from({ length: rows }, (_, index) => (
            <div
              key={index}
              className={`h-4 rounded bg-zinc-200 ${index === rows - 1 ? "w-2/3" : "w-full"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
