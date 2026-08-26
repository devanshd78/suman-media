import { Exo_2, Inter } from "next/font/google";

import {
  HeritageDepthField,
  Premium3DSurface,
} from "@/components/motion/premium-3d";
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
      className="landing-section-transition culture-thread paithani-edge relative w-full overflow-hidden bg-[radial-gradient(circle_at_16%_12%,rgba(201,155,54,0.15),transparent_28%),linear-gradient(135deg,#4A1724_0%,#1B1114_46%,#0D1518_100%)] px-5 py-14 text-[#FFF8EC] sm:px-8 sm:py-16 lg:px-[3.5rem] lg:py-[5.25rem]"
    >
      <HeritageDepthField className="z-0 opacity-42" tone="dark" />
      <div aria-hidden="true" className="depth-horizon-grid z-0 opacity-15" />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-1/2 h-52 w-52 -translate-x-1/2 -translate-y-1/2 rotate-45 border border-[#E2BB5F]/12"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-1/2 h-72 w-72 translate-x-1/2 -translate-y-1/2 rotate-45 border border-[#E2BB5F]/12"
      />

      <dl className="relative z-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:gap-5">
        {validStats.map((stat, index) => (
          <Reveal
            key={stat._key ?? `${stat.label}-${index}`}
            delay={index * 0.08}
            distance={24}
            amount={0.35}
            className="h-full"
          >
            <Premium3DSurface
              className="h-full rounded-[1.25rem]"
              surfaceClassName="h-full rounded-[1.25rem]"
              intensity={5.5}
              lift={9}
              perspective={1100}
            >
              <div className="depth-glass-slab heritage-inlay group relative flex min-h-[8.5rem] h-full flex-col items-center justify-center overflow-hidden rounded-[1.25rem] px-4 py-5 text-center sm:min-h-[9.5rem] sm:px-6 lg:min-h-[10rem] lg:px-8 [transform-style:preserve-3d]">
                <div
                  aria-hidden="true"
                  className="absolute -right-8 -top-8 h-24 w-24 rotate-45 border border-[#E2BB5F]/10"
                  style={{ transform: "translateZ(26px) rotate(45deg)" }}
                />

                <dd
                  className={`${exo2.className} premium-3d-layer-deep text-center text-[2.35rem] font-semibold leading-[2.8rem] tracking-[-0.05rem] text-[#F7E2B4] transition-colors duration-300 group-hover:text-white sm:text-[2.85rem] sm:leading-[3.3rem] lg:text-[3.55rem] lg:leading-[3.9rem] lg:tracking-[-0.07rem]`}
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
                  className={`${inter.className} premium-3d-layer mt-2 text-center text-[0.6rem] font-semibold uppercase leading-4 tracking-[0.09em] text-white/52 sm:text-[0.6875rem]`}
                  style={{ fontFeatureSettings: '"liga" off, "clig" off' }}
                >
                  {stat.label}
                </dt>
              </div>
            </Premium3DSurface>
          </Reveal>
        ))}
      </dl>
    </section>
  );
}
