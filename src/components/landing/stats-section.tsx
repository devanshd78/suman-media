import { Exo_2, Inter } from "next/font/google";

import { AnimatedStatNumber } from "./animated-stat-number";

const exo2 = Exo_2({
  subsets: ["latin"],
  weight: ["600"],
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400"],
});

type Stat = {
  _key?: string;
  value: number;
  prefix?: string | null;
  suffix?: string | null;
  label: string;
};

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
        mx-auto
        w-full
        max-w-[90rem]
        bg-white
        px-5
        py-12
        sm:px-8
        lg:px-[3.5rem]
        lg:py-[4.25rem]
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
            key={stat._key ?? `${stat.label}-${index}`}
            className={`
              relative
              flex
              min-h-[7rem]
              flex-col
              items-center
              justify-center
              px-4
              text-center

              sm:px-6

              lg:min-h-[6.5rem]
              lg:px-8

              ${
                index % 2 !== 0
                  ? "border-l border-[#E7E9EF]"
                  : ""
              }

              ${
                index > 1
                  ? "border-t border-[#E7E9EF] lg:border-t-0"
                  : ""
              }

              ${
                index !== 0
                  ? "lg:border-l lg:border-[#E7E9EF]"
                  : "lg:border-l-0"
              }
            `}
          >
            <dd
              className={`
                ${exo2.className}

                text-center
                text-[2.5rem]
                font-semibold
                leading-[3rem]
                tracking-[-0.05rem]
                text-[rgba(0,6,38,0.90)]

                sm:text-[3rem]
                sm:leading-[3.5rem]

                lg:text-[3.5rem]
                lg:leading-[4rem]
                lg:tracking-[-0.0625rem]
              `}
              style={{
                fontFeatureSettings: '"liga" off, "clig" off',
              }}
            >
              <AnimatedStatNumber
                value={stat.value}
                prefix={stat.prefix}
                suffix={stat.suffix}
                delay={index * 130}
              />
            </dd>

            <dt
              className={`
                ${inter.className}

                mt-2
                text-center
                text-[0.625rem]
                font-normal
                leading-4
                text-[rgba(0,6,38,0.55)]

                sm:text-[0.6875rem]
              `}
              style={{
                fontFeatureSettings: '"liga" off, "clig" off',
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