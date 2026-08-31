import { Plus_Jakarta_Sans } from "next/font/google";

import { AnimatedStatNumber } from "./animated-stat-number";

const exo2 = Plus_Jakarta_Sans({ subsets: ["latin"], weight: ["600"] });
const inter = Plus_Jakarta_Sans({ subsets: ["latin"], weight: ["400"] });

type Stat = {
  _key?: string;
  value: number;
  prefix?: string | null;
  suffix?: string | null;
  label: string;
};

export function StatsSection({ stats }: { stats?: Stat[] | null }) {
  const validStats =
    stats
      ?.filter(
        (stat) =>
          typeof stat.value === "number" &&
          Number.isFinite(stat.value) &&
          Boolean(stat.label?.trim()),
      )
      .slice(0, 4) ?? [];

  if (!validStats.length) return null;

  return (
    <section
      aria-label="Suman Entertainment statistics"
      className="landing-section-transition mx-auto w-full max-w-full bg-white px-5 py-12 sm:px-8 sm:py-14 lg:px-[3.5rem] lg:py-[4.25rem]"
    >
      <dl className="grid grid-cols-2 lg:grid-cols-4">
        {validStats.map((stat, index) => (
          <div
            key={stat._key ?? `${stat.label}-${index}`}
            className="relative flex min-h-[7.25rem] flex-col items-center justify-center px-4 text-center sm:px-6 lg:min-h-[7rem] lg:px-8"
          >
            {index % 2 !== 0 ? (
              <span
                aria-hidden="true"
                className="absolute left-0 top-1/2 h-12 w-px -translate-y-1/2 bg-[#E7E9EF] lg:hidden"
              />
            ) : null}

            {index !== 0 ? (
              <span
                aria-hidden="true"
                className="absolute left-0 top-1/2 hidden h-12 w-px -translate-y-1/2 bg-[#E7E9EF] lg:block"
              />
            ) : null}

            {index > 1 ? (
              <span
                aria-hidden="true"
                className="absolute inset-x-5 top-0 h-px bg-[#E7E9EF] lg:hidden"
              />
            ) : null}

            <dd
              className={`${exo2.className} text-center text-[2.5rem] font-semibold leading-[3rem] tracking-[-0.05rem] text-[rgba(0,6,38,0.90)] sm:text-[3rem] sm:leading-[3.5rem] lg:text-[3.5rem] lg:leading-[4rem] lg:tracking-[-0.0625rem]`}
              style={{ fontFeatureSettings: '"liga" off, "clig" off' }}
            >
              <AnimatedStatNumber
                value={stat.value}
                prefix={stat.prefix}
                suffix={stat.suffix}
                delay={index * 130}
              />
            </dd>

            <dt
              className={`${inter.className} mt-2 text-center text-[0.625rem] font-normal leading-4 text-[rgba(0,6,38,0.55)] sm:text-[0.6875rem]`}
              style={{ fontFeatureSettings: '"liga" off, "clig" off' }}
            >
              {stat.label}
            </dt>
          </div>
        ))}
      </dl>
    </section>
  );
}
