import Image from "next/image";
import Link from "next/link";
import { Exo_2, Inter } from "next/font/google";

import { Parallax, Reveal } from "@/components/motion/reveal";
import { TextReveal } from "@/components/motion/text-reveal";
import type { CmsPartnerSection } from "@/types/cms";

const exo2 = Exo_2({ subsets: ["latin"], weight: ["600"] });
const inter = Inter({ subsets: ["latin"], weight: ["400", "600"] });

function ArrowRightIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className={className} fill="none">
      <path d="M4 10h11M11 6l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowUpRightIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 18 18" className="h-4 w-4" fill="none">
      <path d="M5 13 13 5M7 5h6v6" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const DEFAULT_BENEFITS = [
  "Future-ready Media Infrastructure",
  "Technology-led Innovation",
  "Integrated Ecosystem",
  "Scalable Partnerships",
  "Enterprise Delivery",
];

export function PartnerSection({ content }: { content?: CmsPartnerSection | null }) {
  if (!content) return null;

  const benefits = content.benefits?.filter((item) => Boolean(item?.title?.trim())) ?? [];
  const visibleBenefits =
    benefits.length > 0
      ? benefits
      : DEFAULT_BENEFITS.map((title, index) => ({
          _key: `reference-benefit-${index}`,
          title,
          href: null,
        }));

  const heading = content.heading?.trim() || "Why Partner With us?";
  const description =
    content.description?.trim() ||
    "From creating original content and building digital platforms to strategic communications and global distribution, our integrated capabilities help businesses, creators, governments, and brands grow through media and technology.";

  const eventHeading =
    content.eventHeading?.trim() ||
    "Abhijat Marathi made its Global Alpha Launch at the Cannes Film Festival 2026, at the Bharat (India) Pavilion.";
  const eventCtaLabel = content.eventCta?.label?.trim() || "View Our Cannes Monument";
  const eventCtaHref = content.eventCta?.href?.trim() || "/portfolio";
  const hasEvent = Boolean(content.eventImageUrl || content.eventHeading?.trim());

  return (
    <section
      id="why-partner"
      aria-labelledby="why-partner-heading"
      className="landing-section-transition culture-thread culture-weave paithani-edge fort-silhouette relative w-full overflow-hidden bg-[radial-gradient(circle_at_12%_10%,rgba(255,255,255,0.42),transparent_26%),linear-gradient(135deg,#F3E0BC_0%,#EBCB91_46%,#DFAE5F_100%)]"
    >
      <div className="grid gap-10 px-5 py-14 sm:px-8 sm:py-16 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] md:gap-12 lg:grid-cols-[minmax(0,0.82fr)_minmax(32rem,1.18fr)] lg:gap-24 lg:px-[3.5rem] lg:py-[6rem]">
        <div className="max-w-[31rem]">
          <h2
            id="why-partner-heading"
            className={`${exo2.className} premium-display overflow-hidden text-[2rem] font-semibold leading-[2.45rem] tracking-[-0.04rem] text-[rgba(0,6,38,0.92)] sm:text-[2.35rem] sm:leading-[2.8rem] lg:text-[2.75rem] lg:leading-[3.1rem] lg:tracking-[-0.055rem]`}
            style={{ fontFeatureSettings: '"liga" off, "clig" off' }}
          >
            <TextReveal text={heading} stagger={0.06} />
          </h2>

          <Reveal delay={0.15} distance={18}>
            <p className={`${inter.className} mt-5 max-w-[30rem] text-sm leading-6 text-[rgba(0,6,38,0.62)] sm:text-[0.94rem] sm:leading-7`}>
              {description}
            </p>
          </Reveal>
        </div>

        <div className="flex w-full flex-col border-t border-[rgba(0,17,102,0.12)]">
          {visibleBenefits.slice(0, 5).map((item, index) => {
            const row = (
              <span className="inline-flex min-w-0 items-center gap-2.5">
                <span className={`${inter.className} text-[0.95rem] font-semibold leading-6 text-[rgba(0,6,38,0.93)] sm:text-base lg:text-[1.03rem]`}>
                  {item.title}
                </span>
                <span className="shrink-0 text-[rgba(0,6,38,0.48)] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-[rgba(0,6,38,0.88)]">
                  <ArrowUpRightIcon />
                </span>
              </span>
            );

            const className =
              "group relative flex min-h-[3.75rem] w-full items-center overflow-hidden border-b border-[rgba(0,17,102,0.12)] py-4 transition-colors duration-300 before:absolute before:inset-y-0 before:left-0 before:w-0 before:bg-white/22 before:transition-[width] before:duration-500 hover:before:w-full";

            return (
              <Reveal key={item._key || `${item.title}-${index}`} delay={0.07 * index} distance={16} amount={0.25}>
                {item.href ? (
                  <Link href={item.href} className={className}>
                    <span className="relative z-10">{row}</span>
                  </Link>
                ) : (
                  <div className={className}>
                    <span className="relative z-10">{row}</span>
                  </div>
                )}
              </Reveal>
            );
          })}
        </div>
      </div>

      {hasEvent ? (
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#071021] sm:aspect-[16/10] lg:aspect-[16/8.7]">
          {content.eventImageUrl ? (
            <Parallax className="absolute -inset-y-12 inset-x-0" distance={34} scaleFrom={1.08} scaleTo={1.015}>
              <div className="relative h-full min-h-[calc(100%+6rem)] w-full">
                <Image
                  src={content.eventImageUrl}
                  alt={content.eventImageAlt?.trim() || ""}
                  fill
                  sizes="100vw"
                  className="object-cover object-center"
                />
              </div>
            </Parallax>
          ) : null}

          <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.68)_0%,rgba(0,0,0,0.26)_40%,rgba(0,0,0,0.02)_74%)]" />
          <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.34)_0%,transparent_45%,rgba(0,0,0,0.15)_100%)]" />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-[8%] top-[12%] h-28 w-28 rotate-45 border border-[#E2BB5F]/28 sm:h-40 sm:w-40 lg:h-56 lg:w-56"
          />

          <div className="relative z-10 flex h-full w-full flex-col justify-between px-5 py-6 sm:px-8 sm:py-8 lg:px-[3.5rem] lg:py-10">
            <div className="max-w-[64rem]">
              <Reveal distance={26} amount={0.2}>
                <h3
                  className={`${exo2.className} max-w-[64rem] text-[1.75rem] font-semibold leading-[2.1rem] tracking-[-0.035rem] text-white sm:text-[2.25rem] sm:leading-[2.65rem] lg:text-[clamp(2.5rem,3.7vw,4rem)] lg:leading-[1.05] lg:tracking-[-0.06rem]`}
                  style={{ fontFeatureSettings: '"liga" off, "clig" off' }}
                >
                  {eventHeading}
                </h3>
              </Reveal>

              <Reveal delay={0.18} distance={12}>
                <Link
                  href={eventCtaHref}
                  className={`${inter.className} kinetic-link group mt-5 inline-flex items-center gap-2 py-2 text-xs font-semibold text-white sm:text-sm`}
                >
                  <span>{eventCtaLabel}</span>
                  <span className="transition-transform duration-300 group-hover:translate-x-1.5">
                    <ArrowRightIcon />
                  </span>
                </Link>
              </Reveal>
            </div>

            {content.eventBadgeUrl ? (
              <Reveal className="ml-auto" delay={0.28} distance={18}>
                <div className="relative h-[3.25rem] w-[6.5rem] sm:h-[4rem] sm:w-[8rem] lg:h-[4.5rem] lg:w-[9rem]">
                  <Image
                    src={content.eventBadgeUrl}
                    alt={content.eventBadgeAlt?.trim() || ""}
                    fill
                    sizes="144px"
                    className="object-contain object-right-bottom"
                  />
                </div>
              </Reveal>
            ) : null}
          </div>
        </div>
      ) : null}
    </section>
  );
}
