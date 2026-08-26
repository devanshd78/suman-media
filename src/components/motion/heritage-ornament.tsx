type HeritageOrnamentProps = {
  className?: string;
  tone?: "gold" | "light" | "ink";
  label?: string;
};

const TONE = {
  gold: {
    primary: "#C99B36",
    secondary: "#A5652A",
  },
  light: {
    primary: "rgba(255,255,255,0.82)",
    secondary: "rgba(226,187,95,0.82)",
  },
  ink: {
    primary: "#15120E",
    secondary: "#8F6C1A",
  },
} as const;

/**
 * A restrained Maharashtra-inspired signature mark.
 *
 * The stepped line references hill-fort silhouettes, while the diamond and
 * central sun borrow from Paithani geometry. It intentionally avoids literal
 * folk-art illustration so it can sit inside a contemporary media identity.
 */
export function HeritageOrnament({
  className = "",
  tone = "gold",
  label,
}: HeritageOrnamentProps) {
  const colors = TONE[tone];

  return (
    <div
      aria-hidden="true"
      className={`inline-flex items-center gap-3 ${className}`}
    >
      <svg
        viewBox="0 0 92 26"
        className="h-[1.15rem] w-[4.15rem] shrink-0 sm:h-5 sm:w-[4.75rem]"
        fill="none"
      >
        <path
          d="M2 18H13V13H24V8H35V13H46V18H57"
          stroke={colors.primary}
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle
          cx="46"
          cy="7"
          r="3.1"
          stroke={colors.secondary}
          strokeWidth="1.15"
        />
        <path
          d="M64 13 72 5l8 8-8 8-8-8Z"
          stroke={colors.primary}
          strokeWidth="1.15"
        />
        <circle cx="72" cy="13" r="1.65" fill={colors.secondary} />
        <path
          d="M84 13h6"
          stroke={colors.primary}
          strokeWidth="1.15"
          strokeLinecap="round"
        />
      </svg>

      {label ? (
        <span className="text-[0.5rem] font-semibold uppercase tracking-[0.24em] opacity-60">
          {label}
        </span>
      ) : null}
    </div>
  );
}
