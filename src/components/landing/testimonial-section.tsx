import Image from "next/image";
import Link from "next/link";
import { Exo_2, Inter } from "next/font/google";
import type { CmsStoryBanner, CmsTestimonialSection } from "@/types/cms";

const exo2 = Exo_2({ subsets: ["latin"], weight: ["600"] });
const inter = Inter({ subsets: ["latin"], weight: ["400", "600", "700"] });

function ArrowRightIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" fill="none">
      <path d="M3.5 8h9M9 4.5 12.5 8 9 11.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Testimonial({ content }: { content: CmsTestimonialSection }) {
  const logos = content.partnerLogos?.filter((logo) => Boolean(logo?.imageUrl)) ?? [];
  const hasQuote = Boolean(content.quote?.trim());

  if (!hasQuote && logos.length === 0) return null;

  return (
    <section
      aria-label="Partner testimonial and clients"
      className="landing-section-transition mx-auto flex w-full max-w-[90rem] flex-col items-center gap-[6.25rem] bg-white px-5 py-16 sm:px-8 lg:px-[3.5rem] lg:py-[6.25rem]"
    >
      {hasQuote ? (
        <figure className="flex w-full max-w-[45rem] flex-col items-center gap-9 text-center">
          {content.companyLogoUrl ? (
            <div className="relative h-12 w-52">
              <Image
                src={content.companyLogoUrl}
                alt={content.companyLogoAlt?.trim() || content.companyName || "Company logo"}
                fill
                sizes="208px"
                className="object-contain"
              />
            </div>
          ) : content.companyName ? (
            <p className={`${inter.className} text-lg font-semibold text-black`}>{content.companyName}</p>
          ) : null}

          <figcaption className="flex flex-col items-center gap-5">
            <blockquote className={`${inter.className} text-base font-normal leading-7 text-[rgba(0,9,51,0.65)] sm:text-lg`}>
              “{content.quote}”
            </blockquote>
            {content.personName || content.personRole ? (
              <p className={`${inter.className} text-sm font-semibold leading-6 text-[rgba(0,6,38,0.9)] sm:text-base`}>
                {[content.personName, content.personRole].filter(Boolean).join(" · ")}
              </p>
            ) : null}
          </figcaption>
        </figure>
      ) : null}

      {logos.length > 0 ? (
        <div className="flex w-full flex-wrap items-center justify-center gap-x-10 gap-y-8 border-t border-black/[0.05] pt-10">
          {logos.map((logo) => (
            <div key={logo._key} className="relative h-11 w-36 sm:w-44">
              <Image
                src={logo.imageUrl}
                alt={logo.imageAlt?.trim() || logo.label}
                fill
                sizes="176px"
                className="object-contain grayscale"
              />
            </div>
          ))}
        </div>
      ) : null}
    </section>
  );
}

function StoryBannerSection({ story }: { story: CmsStoryBanner }) {
  if (!story.imageUrl && !story.heading?.trim()) return null;

  return (
    <section
      aria-labelledby="landing-story-heading"
      className="landing-section-transition relative mx-auto flex min-h-[30rem] w-full max-w-[90rem] flex-col items-end justify-between overflow-hidden p-8"
    >
      {story.imageUrl ? (
        <Image
          src={story.imageUrl}
          alt={story.imageAlt?.trim() || ""}
          fill
          sizes="100vw"
          className="object-cover"
        />
      ) : (
        <div className="absolute inset-0 bg-[#0c1421]" aria-hidden="true" />
      )}
      <div className="absolute inset-0 bg-[radial-gradient(118.01%_73.86%_at_57.53%_72.82%,rgba(0,0,0,0)_42.15%,rgba(0,0,0,0.76)_85.74%)]" />

      <div className="relative z-10 flex w-full flex-col items-start gap-2">
        {story.eyebrow?.trim() ? (
          <p className={`${inter.className} text-[0.625rem] font-semibold uppercase leading-[0.875rem] text-white`}>
            {story.eyebrow}
          </p>
        ) : null}

        {story.heading?.trim() ? (
          <h2
            id="landing-story-heading"
            className={`${exo2.className} w-full max-w-[30.5rem] text-[2rem] font-semibold leading-10 tracking-[-0.03125rem] text-white sm:text-[2.5rem] sm:leading-[3rem]`}
          >
            {story.heading}
          </h2>
        ) : null}

        {story.cta?.label && story.cta.href ? (
          <Link
            href={story.cta.href}
            className={`${inter.className} group mt-1 inline-flex items-center justify-center gap-1 rounded-lg p-4 text-sm font-semibold leading-5 text-white transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white`}
          >
            <span>{story.cta.label}</span>
            <ArrowRightIcon />
          </Link>
        ) : null}
      </div>

      {story.badgeUrl ? (
        <div className="relative z-10 h-[3.8125rem] w-[7.5625rem] shrink-0">
          <Image
            src={story.badgeUrl}
            alt={story.badgeAlt?.trim() || "Story badge"}
            fill
            sizes="122px"
            className="object-contain"
          />
        </div>
      ) : null}
    </section>
  );
}

export function TestimonialSection({
  testimonial,
  story,
}: {
  testimonial?: CmsTestimonialSection | null;
  story?: CmsStoryBanner | null;
}) {
  if (!testimonial && !story) return null;

  return (
    <>
      {testimonial ? <Testimonial content={testimonial} /> : null}
      {story ? <StoryBannerSection story={story} /> : null}
    </>
  );
}
