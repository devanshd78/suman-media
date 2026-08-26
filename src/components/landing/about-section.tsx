import Link from "next/link";
import { Exo_2, Inter } from "next/font/google";

import { HeritageOrnament } from "@/components/motion/heritage-ornament";
import { Reveal } from "@/components/motion/reveal";
import { TextReveal } from "@/components/motion/text-reveal";
import type { CmsCta } from "@/types/cms";

const exo2 = Exo_2({ subsets: ["latin"], weight: ["600"] });
const inter = Inter({ subsets: ["latin"], weight: ["400", "600"] });

function ArrowRightIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" className="h-4 w-4 shrink-0" fill="none">
      <path d="M3.5 8h8M8.5 5l3 3-3 3" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

type AboutSectionProps = {
  eyebrow?: string | null;
  heading?: string | null;
  description?: string | null;
  cta?: CmsCta | null;
};

export function AboutSection({ eyebrow, heading, description, cta }: AboutSectionProps) {
  const resolvedEyebrow = eyebrow?.trim() || "ABOUT SUMAN ENTERTAINMENT";
  const resolvedHeading =
    heading?.trim() ||
    "We're a team of creatives, music lovers and audio obsessives, developing products building India's Next Generation Media Ecosystem";
  const resolvedDescription =
    description?.trim() ||
    "Suman Entertainment & Media Pvt. Ltd. brings together digital platforms, premium content, music, technology, strategic communications, and enterprise partnerships to create, distribute, and scale media experiences across industries. From one of India's dedicated Marathi OTT platforms to government communication initiatives, original content production, music publishing, AI-powered technologies, and global partnerships, we're building an integrated ecosystem designed for the future of media.";
  const resolvedCta = cta?.label && cta.href ? cta : { label: "Explore Capabilities", href: "/services" };

  return (
    <section
      id="about-suman-entertainment"
      aria-labelledby="about-suman-heading"
      className="landing-section-transition culture-thread culture-weave heritage-surface fort-silhouette paithani-edge relative flex w-full flex-col items-start gap-[0.625rem] overflow-hidden px-5 py-16 sm:px-8 lg:px-[3.5rem] lg:py-[7.5rem]"
    >
      <div className="pointer-events-none absolute right-5 top-9 hidden lg:block lg:right-[3.5rem]">
        <HeritageOrnament tone="gold" label="महाराष्ट्र" className="text-[#7A4F18]/50" />
      </div>

      <div className="grid w-full grid-cols-1 items-start gap-8 lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-[6.25rem]">
        <Reveal delay={0.05} distance={16}>
          <div className="flex items-start gap-3 pt-1">
            <span aria-hidden="true" className="mt-[0.3rem] h-1.5 w-1.5 rotate-45 bg-[#B68A16]" />
            <p className={`${inter.className} text-[0.625rem] font-semibold uppercase leading-[0.875rem] tracking-[-0.00625rem] text-[rgba(0,9,51,0.65)]`}>
              {resolvedEyebrow}
            </p>
          </div>
        </Reveal>

        <div className="flex min-w-0 flex-col items-start">
          <h2
            id="about-suman-heading"
            className={`${exo2.className} premium-display w-full max-w-[72rem] text-[2rem] font-semibold leading-[2.5rem] tracking-[-0.03125rem] text-[#15110D] lg:text-[clamp(2.65rem,3.35vw,3.6rem)] lg:leading-[1.08]`}
            style={{ fontFeatureSettings: '"liga" off, "clig" off' }}
          >
            <TextReveal text={resolvedHeading} stagger={0.022} amount={0.2} />
          </h2>

          <Reveal delay={0.18} distance={22} className="w-full">
            <p
              className={`${inter.className} mt-8 w-full max-w-[70rem] text-base font-normal leading-7 text-[rgba(28,22,17,0.66)] lg:text-[1.04rem] lg:leading-8`}
              style={{ fontFeatureSettings: '"liga" off, "clig" off' }}
            >
              {resolvedDescription}
            </p>
          </Reveal>

          <Reveal delay={0.28} distance={14}>
            <Link
              href={resolvedCta.href}
              className={`${inter.className} kinetic-link group mt-8 inline-flex items-center gap-1.5 py-2 text-sm font-semibold leading-5 text-[#8F6C1A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8F6C1A]/35`}
            >
              <span>{resolvedCta.label}</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1.5">
                <ArrowRightIcon />
              </span>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
