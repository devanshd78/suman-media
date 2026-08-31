import { plusJakartaSans as body, plusJakartaSans as display } from "@/lib/fonts";

import { AnimatedStatNumber } from "./animated-stat-number";

/* =========================================================
   FONTS
   ========================================================= */

/* =========================================================
   TYPES
   ========================================================= */

type Stat = {
  _key?: string;
  value: number;
  prefix?: string | null;
  suffix?: string | null;
  label: string;
};

/* =========================================================
   STATS SECTION
   ========================================================= */

export function StatsSection({
  stats,
}: {
  stats?: Stat[] | null;
}) {
  const validStats =
    stats
      ?.filter(
        (stat) =>
          typeof stat.value === "number" &&
          Number.isFinite(stat.value) &&
          Boolean(stat.label?.trim()),
      )
      .slice(0, 4) ?? [];

  if (!validStats.length) {
    return null;
  }

  return (
    <section
      aria-label="Suman Entertainment statistics"
      className="
        landing-section-transition
        w-full
        bg-[#FFEABF]
        px-5
        pb-14
        pt-2
        sm:px-8
        sm:pb-16
        lg:px-[3.5rem]
        lg:pb-[4.75rem]
        lg:pt-4
        xl:px-[4rem]
      "
    >
      <dl
        className="
          grid
          grid-cols-2
          lg:grid-cols-4
        "
      >
        {validStats.map((stat, index) => (
          <div
            key={
              stat._key ??
              `${stat.label}-${index}`
            }
            className="
              relative
              flex
              min-h-[8.5rem]
              flex-col
              items-center
              justify-center
              px-4
              text-center
              sm:min-h-[9rem]
              sm:px-6
              lg:min-h-[10rem]
              lg:px-8
            "
          >
            {/* =============================================
                MOBILE VERTICAL DIVIDER
                ============================================= */}

            {index % 2 !== 0 ? (
              <span
                aria-hidden="true"
                className="
                  absolute
                  left-0
                  top-1/2
                  h-14
                  w-px
                  -translate-y-1/2
                  bg-black/[0.12]
                  lg:hidden
                "
              />
            ) : null}

            {/* =============================================
                DESKTOP VERTICAL DIVIDER
                ============================================= */}

            {index !== 0 ? (
              <span
                aria-hidden="true"
                className="
                  absolute
                  left-0
                  top-1/2
                  hidden
                  h-14
                  w-px
                  -translate-y-1/2
                  bg-black/[0.12]
                  lg:block
                "
              />
            ) : null}

            {/* =============================================
                MOBILE ROW DIVIDER
                ============================================= */}

            {index > 1 ? (
              <span
                aria-hidden="true"
                className="
                  absolute
                  inset-x-5
                  top-0
                  h-px
                  bg-black/[0.10]
                  lg:hidden
                "
              />
            ) : null}

            {/* =============================================
                STAT NUMBER

                FIGMA:
                Plus Jakarta Sans
                56px / 64px
                700
                -1px tracking
                #1A1A1A
                ============================================= */}

            <dd
              className={`
                ${display.className}

                text-center
                text-[2.75rem]
                font-bold
                leading-[3.25rem]
                tracking-[-0.0625rem]
                text-[#1A1A1A]

                sm:text-[3rem]
                sm:leading-[3.5rem]

                lg:text-[3.5rem]
                lg:leading-[4rem]
              `}
              style={{
                fontFeatureSettings:
                  '"liga" off, "clig" off',
              }}
            >
              <AnimatedStatNumber
                value={stat.value}
                prefix={stat.prefix}
                suffix={stat.suffix}
                delay={index * 130}
              />
            </dd>

            {/* =============================================
                STAT LABEL

                FIGMA:
                Plus Jakarta Sans
                16px / 24px
                400
                #1A1A1A
                ============================================= */}

            <dt
              className={`
                ${body.className}

                mt-2
                text-center
                text-[0.875rem]
                font-normal
                leading-[1.375rem]
                text-[#1A1A1A]

                sm:text-[1rem]
                sm:leading-[1.5rem]
              `}
              style={{
                fontFeatureSettings:
                  '"liga" off, "clig" off',
              }}
            >
              {stat.label}
            </dt>
          </div>
        ))}
      </dl>
    </section>
  );
}