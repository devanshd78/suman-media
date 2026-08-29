import Image from "next/image";
import Link from "next/link";
import { Exo_2, Inter } from "next/font/google";

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
          className="landing-section-transition mx-auto w-full max-w-full bg-white"
        >
          <div className="flex flex-col items-center px-5 pb-12 pt-16 text-center sm:px-8 sm:pb-14 sm:pt-20 lg:px-[3.5rem] lg:pb-[4.75rem] lg:pt-[5.5rem]">
            {testimonial?.companyLogoUrl ? (
              <div className="relative h-[2rem] w-[7rem] sm:h-[2.35rem] sm:w-[8rem]">
                <Image
                  src={testimonial.companyLogoUrl}
                  alt={testimonial.companyLogoAlt?.trim() || companyName || ""}
                  fill
                  sizes="128px"
                  className="object-contain"
                />
              </div>
            ) : null}

            {quote ? (
              <blockquote className="mt-8 max-w-[40rem] sm:mt-9">
                <p
                  className={`${inter.className} text-center text-[0.78rem] font-normal leading-[1.35rem] text-[rgba(0,6,38,0.62)] sm:text-[0.875rem] sm:leading-[1.5rem]`}
                  style={{ fontFeatureSettings: '"liga" off, "clig" off' }}
                >
                  {quote}
                </p>
              </blockquote>
            ) : null}

            {personName || personRole || companyName ? (
              <div className="mt-4">
                {personName ? (
                  <p className={`${inter.className} text-xs font-semibold text-[rgba(0,6,38,0.90)]`}>
                    {personName}
                  </p>
                ) : null}
                <p className={`${inter.className} text-[0.7rem] font-semibold leading-5 text-[rgba(0,6,38,0.90)] sm:text-[0.75rem]`}>
                  {personRole}
                  {personRole && companyName ? " at " : null}
                  {companyName}
                </p>
              </div>
            ) : null}
          </div>

          {partnerLogos.length > 0 ? (
            <div className="border-t border-[rgba(0,6,38,0.09)] px-5 sm:px-8 lg:px-[3.5rem]">
              <div className="mx-auto grid min-h-[7.75rem] max-w-[70rem] grid-cols-2 items-center justify-items-center gap-x-8 gap-y-7 py-7 sm:grid-cols-3 lg:grid-cols-5 lg:gap-x-12">
                {partnerLogos.slice(0, 5).map((logo, index) => (
                  <div
                    key={logo._key ?? `${logo.label}-${index}`}
                    className="relative h-[2.1rem] w-[7.25rem] opacity-90 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0 sm:w-[8rem]"
                  >
                    <Image
                      src={logo.imageUrl}
                      alt={logo.imageAlt?.trim() || `${logo.label} logo`}
                      fill
                      sizes="128px"
                      className="object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </section>
      ) : null}

      {hasStory ? (
        <section
          aria-labelledby="join-abhijat-heading"
          className="landing-section-transition relative mx-auto aspect-[4/5] w-full max-w-full overflow-hidden bg-[#111] sm:aspect-[16/10] lg:aspect-[2.55/1]"
        >
          {story?.imageUrl ? (
            <Image
              src={story.imageUrl}
              alt={story.imageAlt?.trim() || ""}
              fill
              sizes="100vw"
              className="object-cover object-center transition-transform duration-[1600ms] ease-out hover:scale-[1.012]"
            />
          ) : null}

          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.74)_0%,rgba(0,0,0,0.42)_32%,rgba(0,0,0,0.04)_68%)]"
          />

          <div className="relative z-10 flex h-full w-full flex-col justify-between px-5 py-6 sm:px-8 sm:py-8 lg:px-[3.5rem] lg:py-9">
            <div className="max-w-[35rem]">
              <p className={`${inter.className} text-[0.625rem] font-semibold uppercase leading-4 tracking-[0.035em] text-white`}>
                {storyEyebrow}
              </p>

              <h2
                id="join-abhijat-heading"
                className={`${exo2.className} mt-2.5 max-w-[33rem] text-[2rem] font-semibold leading-[2.3rem] tracking-[-0.035rem] text-white sm:text-[2.35rem] sm:leading-[2.75rem] lg:text-[2.5rem] lg:leading-[3rem] lg:tracking-[-0.05rem]`}
                style={{ fontFeatureSettings: '"liga" off, "clig" off' }}
              >
                {storyHeading}
              </h2>

              <Link
                href={storyCtaHref}
                className={`${inter.className} group mt-7 inline-flex items-center gap-2 py-2 text-xs font-semibold text-white transition-opacity hover:opacity-72 sm:text-sm`}
              >
                <span>{storyCtaLabel}</span>
                <span className="transition-transform duration-200 group-hover:translate-x-1">
                  <ArrowRightIcon />
                </span>
              </Link>
            </div>

            {story?.badgeUrl ? (
              <div className="relative ml-auto h-[3.25rem] w-[3.25rem] sm:h-[4rem] sm:w-[4rem]">
                <Image
                  src={story.badgeUrl}
                  alt={story.badgeAlt?.trim() || "Abhijat Marathi logo"}
                  fill
                  sizes="64px"
                  className="object-contain object-right-bottom"
                />
              </div>
            ) : null}
          </div>
        </section>
      ) : null}
    </>
  );
}
