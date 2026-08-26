import { Exo_2, Inter } from "next/font/google";

import { Reveal } from "@/components/motion/reveal";
import { AnimatedStatNumber } from "./animated-stat-number";

const exo2 = Exo_2({ subsets: ["latin"], weight: ["600"] });
const inter = Inter({ subsets: ["latin"], weight: ["400", "600"] });

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
      className="landing-section-transition culture-thread relative w-full overflow-hidden bg-[#FBFAF7] px-5 py-12 sm:px-8 sm:py-14 lg:px-[3.5rem] lg:py-[4.75rem]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-1/2 h-52 w-52 -translate-x-1/2 -translate-y-1/2 rotate-45 border border-[#B68A16]/10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-1/2 h-72 w-72 translate-x-1/2 -translate-y-1/2 rotate-45 border border-[#B68A16]/10"
      />

      <dl className="relative z-10 grid grid-cols-2 lg:grid-cols-4">
        {validStats.map((stat, index) => (
          <Reveal
            key={stat._key ?? `${stat.label}-${index}`}
            delay={index * 0.08}
            distance={24}
            amount={0.35}
          >
            <div className="group relative flex min-h-[7.5rem] flex-col items-center justify-center px-4 text-center transition-transform duration-500 hover:-translate-y-1 sm:px-6 lg:min-h-[7.5rem] lg:px-8">
              {index % 2 !== 0 ? (
                <span aria-hidden="true" className="absolute left-0 top-1/2 h-12 w-px -translate-y-1/2 bg-[#DDD8CA] lg:hidden" />
              ) : null}

              {index !== 0 ? (
                <span aria-hidden="true" className="absolute left-0 top-1/2 hidden h-12 w-px -translate-y-1/2 bg-[#DDD8CA] lg:block" />
              ) : null}

              {index > 1 ? (
                <span aria-hidden="true" className="absolute inset-x-5 top-0 h-px bg-[#DDD8CA] lg:hidden" />
              ) : null}

              <dd
                className={`${exo2.className} text-center text-[2.5rem] font-semibold leading-[3rem] tracking-[-0.05rem] text-[rgba(0,6,38,0.90)] transition-colors duration-300 group-hover:text-[#8F6C1A] sm:text-[3rem] sm:leading-[3.5rem] lg:text-[3.75rem] lg:leading-[4rem] lg:tracking-[-0.07rem]`}
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
                className={`${inter.className} mt-2 text-center text-[0.625rem] font-semibold uppercase leading-4 tracking-[0.09em] text-[rgba(0,6,38,0.48)] sm:text-[0.6875rem]`}
                style={{ fontFeatureSettings: '"liga" off, "clig" off' }}
              >
                {stat.label}
              </dt>
            </div>
          </Reveal>
        ))}
      </dl>
    </section>
  );
}
