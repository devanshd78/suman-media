import Image from "next/image";
import Link from "next/link";
import { Exo_2, Inter } from "next/font/google";

import { Parallax, Reveal } from "@/components/motion/reveal";
import { TextReveal } from "@/components/motion/text-reveal";
import type { CmsCareersCta } from "@/types/cms";

const exo2 = Exo_2({ subsets: ["latin"], weight: ["600"] });
const inter = Inter({ subsets: ["latin"], weight: ["400", "600"] });

function ArrowRightIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4" fill="none">
      <path d="M4 10h11M11 6l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CareersCtaSection({ content }: { content?: CmsCareersCta | null }) {
  if (!content?.heading?.trim()) return null;

  const cta =
    content.cta?.label && content.cta.href
      ? content.cta
      : { label: "View Open Roles", href: "/careers" };

  return (
    <section
      id="careers"
      aria-labelledby="landing-careers-heading"
      className="landing-section-transition culture-thread paithani-edge relative aspect-[4/5] w-full overflow-hidden bg-[#0A0809] text-white sm:aspect-[16/9] lg:aspect-[2.65/1]"
    >
      {content.imageUrl ? (
        <Parallax className="absolute -inset-y-12 inset-x-0" distance={32} scaleFrom={1.08} scaleTo={1.01}>
          <div className="relative h-full min-h-[calc(100%+6rem)] w-full">
            <Image
              src={content.imageUrl}
              alt={content.imageAlt?.trim() || ""}
              fill
              sizes="100vw"
              className="object-cover object-center"
            />
          </div>
        </Parallax>
      ) : null}

      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_18%_52%,rgba(201,155,54,0.14),transparent_28%),linear-gradient(90deg,rgba(58,13,27,0.86)_0%,rgba(18,11,13,0.52)_40%,rgba(0,0,0,0.06)_74%)]" />
      <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.18)_0%,transparent_55%,rgba(0,0,0,0.16)_100%)]" />
      <div aria-hidden="true" className="absolute -bottom-28 right-[8%] h-72 w-72 rotate-45 border border-[#E2BB5F]/30 sm:h-96 sm:w-96" />
      <div aria-hidden="true" className="absolute bottom-8 right-[12%] hidden h-12 w-12 rotate-45 border border-[#E2BB5F]/35 sm:block" />

      <div className="relative z-10 flex h-full w-full flex-col items-start px-5 py-7 sm:px-8 sm:py-9 lg:px-[3.5rem] lg:py-10">
        <Reveal distance={12}>
          <p className={`${inter.className} text-[0.625rem] font-semibold uppercase tracking-[0.13em] text-[#F0CE82]`}>
            {content.eyebrow?.trim() || "CAREERS"}
          </p>
        </Reveal>

        <h2
          id="landing-careers-heading"
          className={`${exo2.className} premium-display mt-3 max-w-[46rem] overflow-hidden text-[2rem] font-semibold leading-[2.35rem] tracking-[-0.04em] sm:text-[2.5rem] sm:leading-[2.9rem] lg:text-[clamp(2.85rem,4vw,4.35rem)] lg:leading-[1.03] lg:tracking-[-0.06rem]`}
          style={{ fontFeatureSettings: '"liga" off, "clig" off' }}
        >
          <TextReveal text={content.heading} stagger={0.03} amount={0.2} />
        </h2>

        {content.description?.trim() ? (
          <Reveal delay={0.16} distance={18}>
            <p className={`${inter.className} mt-4 max-w-[38rem] text-sm leading-6 text-white/72 sm:text-[0.95rem] sm:leading-7`}>
              {content.description}
            </p>
          </Reveal>
        ) : null}

        <Reveal delay={0.24} distance={12}>
          <Link
            href={cta.href}
            className={`${inter.className} premium-glass group mt-7 inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white`}
          >
            <span>{cta.label}</span>
            <span className="transition-transform duration-300 group-hover:translate-x-1.5">
              <ArrowRightIcon />
            </span>
          </Link>
        </Reveal>

        <div
          aria-hidden="true"
          className={`${inter.className} mt-auto hidden text-[0.54rem] font-semibold uppercase tracking-[0.28em] text-[#E2BB5F]/60 sm:block`}
        >
          महाराष्ट्रातून जगासाठी · From Maharashtra to the world
        </div>
      </div>
    </section>
  );
}
