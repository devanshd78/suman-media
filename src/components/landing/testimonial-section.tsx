import Image from "next/image";
import Link from "next/link";
import { Exo_2, Inter } from "next/font/google";

import { Parallax, Reveal } from "@/components/motion/reveal";
import { TextReveal } from "@/components/motion/text-reveal";
import type { CmsStoryBanner, CmsTestimonialSection } from "@/types/cms";

const exo2 = Exo_2({ subsets: ["latin"], weight: ["600"] });
const inter = Inter({ subsets: ["latin"], weight: ["400", "600"] });

const REFERENCE_TESTIMONIAL_COPY =
  "From creating original content and building digital platforms to strategic communications and global distribution, our integrated capabilities help businesses, creators, governments, and brands grow through media and technology.";

function ArrowRightIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="none">
      <path d="M4 10h11M11 6l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function TestimonialSection({
  testimonial,
  story,
}: {
  testimonial?: CmsTestimonialSection | null;
  story?: CmsStoryBanner | null;
}) {
  const partnerLogos =
    testimonial?.partnerLogos?.filter((item) => Boolean(item?.imageUrl)) ?? [];

  const companyName = testimonial?.companyName?.trim() || null;
  const personName = testimonial?.personName?.trim() || null;
  const personRole = testimonial?.personRole?.trim() || null;
  const quote =
    testimonial?.quote?.trim() ||
    (testimonial?.companyLogoUrl || companyName || partnerLogos.length
      ? REFERENCE_TESTIMONIAL_COPY
      : null);

  const hasTestimonial = Boolean(
    quote || testimonial?.companyLogoUrl || partnerLogos.length,
  );

  const storyEyebrow = story?.eyebrow?.trim() || "JOIN ABHIJAT MARATHI";
  const storyHeading =
    story?.heading?.trim() || "Have a story worth telling? Let's bring it to the world.";
  const storyCtaLabel = story?.cta?.label?.trim() || "Join as Partner";
  const storyCtaHref = story?.cta?.href?.trim() || "/contact";
  const hasStory = Boolean(story?.imageUrl || story?.heading?.trim());

  if (!hasTestimonial && !hasStory) return null;

  return (
    <>
      {hasTestimonial ? (
        <section
          aria-label="Client testimonial"
          className="landing-section-transition culture-thread heritage-surface paithani-edge relative w-full overflow-hidden"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-0 h-[22rem] w-[54rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(226,187,95,0.09),transparent_68%)]"
          />

          <div className="relative z-10 flex flex-col items-center px-5 pb-12 pt-16 text-center sm:px-8 sm:pb-14 sm:pt-20 lg:px-[3.5rem] lg:pb-[4.75rem] lg:pt-[5.5rem]">
            {testimonial?.companyLogoUrl ? (
              <Reveal distance={16}>
                <div className="relative h-[2rem] w-[7rem] sm:h-[2.35rem] sm:w-[8rem]">
                  <Image
                    src={testimonial.companyLogoUrl}
                    alt={testimonial.companyLogoAlt?.trim() || companyName || ""}
                    fill
                    sizes="128px"
                    className="object-contain"
                  />
                </div>
              </Reveal>
            ) : null}

            {quote ? (
              <Reveal delay={0.12} distance={24}>
                <blockquote className="mt-8 max-w-[44rem] sm:mt-9">
                  <p
                    className={`${inter.className} text-center text-[0.82rem] font-normal leading-[1.45rem] text-[rgba(0,6,38,0.62)] sm:text-[0.94rem] sm:leading-[1.65rem]`}
                    style={{ fontFeatureSettings: '"liga" off, "clig" off' }}
                  >
                    “{quote}”
                  </p>
                </blockquote>
              </Reveal>
            ) : null}

            {personName || personRole || companyName ? (
              <Reveal delay={0.2} distance={12}>
                <div className="mt-5">
                  {personName ? (
                    <p className={`${inter.className} text-xs font-semibold text-[rgba(0,6,38,0.90)]`}>
                      {personName}
                    </p>
                  ) : null}
                  <p className={`${inter.className} text-[0.7rem] font-semibold leading-5 text-[rgba(0,6,38,0.72)] sm:text-[0.75rem]`}>
                    {personRole}
                    {personRole && companyName ? " at " : null}
                    {companyName}
                  </p>
                </div>
              </Reveal>
            ) : null}
          </div>

          {partnerLogos.length > 0 ? (
            <div className="relative z-10 border-t border-[rgba(0,6,38,0.09)] px-5 sm:px-8 lg:px-[3.5rem]">
              <div className="grid min-h-[7.75rem] grid-cols-2 items-center justify-items-center gap-x-8 gap-y-7 py-7 sm:grid-cols-3 lg:grid-cols-5 lg:gap-x-12">
                {partnerLogos.slice(0, 5).map((logo, index) => (
                  <Reveal key={logo._key ?? `${logo.label}-${index}`} delay={index * 0.06} distance={14}>
                    <div className="group relative h-[2.1rem] w-[7.25rem] opacity-70 grayscale transition-all duration-500 hover:-translate-y-1 hover:opacity-100 hover:grayscale-0 sm:w-[8rem]">
                      <Image
                        src={logo.imageUrl}
                        alt={logo.imageAlt?.trim() || `${logo.label} logo`}
                        fill
                        sizes="128px"
                        className="object-contain"
                      />
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          ) : null}
        </section>
      ) : null}

      {hasStory ? (
        <section
          aria-labelledby="join-abhijat-heading"
          className="landing-section-transition culture-thread paithani-edge relative aspect-[4/5] w-full overflow-hidden bg-[#0A0909] sm:aspect-[16/10] lg:aspect-[2.55/1]"
        >
          {story?.imageUrl ? (
            <Parallax className="absolute -inset-y-10 inset-x-0" distance={30} scaleFrom={1.08} scaleTo={1.01}>
              <div className="relative h-full min-h-[calc(100%+5rem)] w-full">
                <Image
                  src={story.imageUrl}
                  alt={story.imageAlt?.trim() || ""}
                  fill
                  sizes="100vw"
                  className="object-cover object-center"
                />
              </div>
            </Parallax>
          ) : null}

          <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(90deg,rgba(37,9,16,0.84)_0%,rgba(15,10,10,0.48)_38%,rgba(0,0,0,0.08)_72%)]" />
          <div aria-hidden="true" className="absolute bottom-[-5rem] right-[8%] h-64 w-64 rotate-45 border border-[#E2BB5F]/25 sm:h-80 sm:w-80" />

          <div className="relative z-10 flex h-full w-full flex-col justify-between px-5 py-6 sm:px-8 sm:py-8 lg:px-[3.5rem] lg:py-9">
            <div className="max-w-[38rem]">
              <Reveal distance={12}>
                <p className={`${inter.className} text-[0.625rem] font-semibold uppercase leading-4 tracking-[0.08em] text-white/90`}>
                  {storyEyebrow}
                </p>
              </Reveal>

              <h2
                id="join-abhijat-heading"
                className={`${exo2.className} premium-display mt-2.5 max-w-[36rem] overflow-hidden text-[2rem] font-semibold leading-[2.3rem] tracking-[-0.035rem] text-white sm:text-[2.35rem] sm:leading-[2.75rem] lg:text-[clamp(2.5rem,3.5vw,3.65rem)] lg:leading-[1.05] lg:tracking-[-0.055rem]`}
                style={{ fontFeatureSettings: '"liga" off, "clig" off' }}
              >
                <TextReveal text={storyHeading} stagger={0.03} amount={0.2} />
              </h2>

              <Reveal delay={0.22} distance={12}>
                <Link
                  href={storyCtaHref}
                  className={`${inter.className} kinetic-link group mt-7 inline-flex items-center gap-2 py-2 text-xs font-semibold text-white sm:text-sm`}
                >
                  <span>{storyCtaLabel}</span>
                  <span className="transition-transform duration-300 group-hover:translate-x-1.5">
                    <ArrowRightIcon />
                  </span>
                </Link>
              </Reveal>
            </div>

            {story?.badgeUrl ? (
              <Reveal className="ml-auto" delay={0.28} distance={16}>
                <div className="relative h-[3.25rem] w-[3.25rem] sm:h-[4rem] sm:w-[4rem]">
                  <Image
                    src={story.badgeUrl}
                    alt={story.badgeAlt?.trim() || "Abhijat Marathi logo"}
                    fill
                    sizes="64px"
                    className="object-contain object-right-bottom"
                  />
                </div>
              </Reveal>
            ) : null}
          </div>
        </section>
      ) : null}
    </>
  );
}
