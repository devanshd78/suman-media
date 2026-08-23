import Image from "next/image";
import Link from "next/link";
import { Exo_2, Inter } from "next/font/google";

import type {
  CmsStoryBanner,
  CmsTestimonialSection,
} from "@/types/cms";

const exo2 = Exo_2({
  subsets: ["latin"],
  weight: ["600"],
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "600"],
});

function ArrowRightIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className="h-3.5 w-3.5"
      fill="none"
    >
      <path
        d="M4 10h11M11 6l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type TestimonialSectionProps = {
  testimonial?: CmsTestimonialSection | null;
  story?: CmsStoryBanner | null;
};

export function TestimonialSection({
  testimonial,
  story,
}: TestimonialSectionProps) {
  const quote =
    testimonial?.quote?.trim() || null;

  const personName =
    testimonial?.personName?.trim() || null;

  const personRole =
    testimonial?.personRole?.trim() || null;

  const companyName =
    testimonial?.companyName?.trim() || null;

  const partnerLogos =
    testimonial?.partnerLogos?.filter(
      (item) => Boolean(item?.imageUrl),
    ) ?? [];

  const hasTestimonial = Boolean(
    quote ||
      testimonial?.companyLogoUrl ||
      partnerLogos.length,
  );

  const storyEyebrow =
    story?.eyebrow?.trim() || null;

  const storyHeading =
    story?.heading?.trim() || null;

  const storyCtaLabel =
    story?.cta?.label?.trim() || null;

  const storyCtaHref =
    story?.cta?.href?.trim() || null;

  const hasStory = Boolean(
    storyHeading || story?.imageUrl,
  );

  if (!hasTestimonial && !hasStory) {
    return null;
  }

  return (
    <>
      {/* =====================================================
          TESTIMONIAL
          ===================================================== */}

      {hasTestimonial ? (
        <section
          aria-label="Client testimonial"
          className="
            landing-section-transition
            mx-auto
            w-full
            max-w-[90rem]
            bg-white
          "
        >
          {/* MAIN TESTIMONIAL */}

          <div
            className="
              flex
              flex-col
              items-center
              px-5
              pb-14
              pt-16
              text-center

              sm:px-8
              sm:pb-16
              sm:pt-20

              lg:px-[3.5rem]
              lg:pb-[5rem]
              lg:pt-[6rem]
            "
          >
            {/* COMPANY LOGO */}

            {testimonial?.companyLogoUrl ? (
              <div
                className="
                  relative
                  h-[2.6rem]
                  w-[8rem]

                  sm:h-[3rem]
                  sm:w-[9.5rem]
                "
              >
                <Image
                  src={testimonial.companyLogoUrl}
                  alt={
                    testimonial.companyLogoAlt?.trim() ||
                    companyName ||
                    ""
                  }
                  fill
                  sizes="152px"
                  className="object-contain"
                />
              </div>
            ) : null}

            {/* TESTIMONIAL COPY */}

            {quote ? (
              <blockquote
                className="
                  mt-9
                  max-w-[39rem]

                  sm:mt-10
                "
              >
                <p
                  className={`
                    ${inter.className}

                    text-center
                    text-[0.875rem]
                    font-normal
                    leading-[1.55rem]
                    text-[rgba(0,6,38,0.62)]

                    sm:text-[0.9375rem]
                    sm:leading-[1.65rem]
                  `}
                  style={{
                    fontFeatureSettings:
                      '"liga" off, "clig" off',
                  }}
                >
                  {quote}
                </p>
              </blockquote>
            ) : null}

            {/* PERSON / ROLE */}

            {personName ||
            personRole ||
            companyName ? (
              <div className="mt-5">
                {personName ? (
                  <p
                    className={`
                      ${inter.className}
                      text-sm
                      font-semibold
                      text-[rgba(0,6,38,0.90)]
                    `}
                  >
                    {personName}
                  </p>
                ) : null}

                <p
                  className={`
                    ${inter.className}

                    text-[0.75rem]
                    font-semibold
                    leading-5
                    text-[rgba(0,6,38,0.90)]
                  `}
                >
                  {personRole}

                  {personRole &&
                  companyName
                    ? " at "
                    : null}

                  {companyName}
                </p>
              </div>
            ) : null}
          </div>

          {/* PARTNER LOGOS */}

          {partnerLogos.length > 0 ? (
            <div
              className="
                border-t
                border-[rgba(0,6,38,0.10)]
                px-5

                sm:px-8

                lg:px-[3.5rem]
              "
            >
              <div
                className="
                  mx-auto
                  flex
                  min-h-[7rem]
                  max-w-[70rem]
                  flex-wrap
                  items-center
                  justify-center
                  gap-x-10
                  gap-y-7
                  py-7

                  sm:gap-x-14

                  lg:min-h-[8rem]
                  lg:flex-nowrap
                  lg:justify-between
                  lg:gap-x-12
                "
              >
                {partnerLogos.map(
                  (logo, index) => (
                    <div
                      key={
                        logo._key ??
                        `${logo.label}-${index}`
                      }
                      className="
                        relative
                        h-[2.25rem]
                        w-[7.5rem]

                        opacity-90
                        grayscale

                        transition-all
                        duration-300

                        hover:opacity-100
                        hover:grayscale-0

                        sm:w-[8.5rem]
                      "
                    >
                      <Image
                        src={logo.imageUrl!}
                        alt={
                          logo.imageAlt?.trim() ||
                          `${logo.label ?? ""} logo`
                        }
                        fill
                        sizes="136px"
                        className="object-contain"
                      />
                    </div>
                  ),
                )}
              </div>
            </div>
          ) : null}
        </section>
      ) : null}

      {/* =====================================================
          JOIN ABHIJAT MARATHI
          ===================================================== */}

      {hasStory ? (
        <section
          aria-labelledby="join-abhijat-heading"
          className="
            landing-section-transition
            relative
            mx-auto
            min-h-[28rem]
            w-full
            max-w-[90rem]
            overflow-hidden
            bg-[#111]

            sm:min-h-[32rem]

            lg:min-h-[34rem]
          "
        >
          {/* IMAGE */}

          {story?.imageUrl ? (
            <Image
              src={story.imageUrl}
              alt={story.imageAlt?.trim() || ""}
              fill
              sizes="100vw"
              className="
                object-cover
                object-center
                transition-transform
                duration-[1600ms]
                ease-out

                hover:scale-[1.015]
              "
            />
          ) : null}

          {/* LEFT-SIDE DARKENING */}

          <div
            aria-hidden="true"
            className="
              absolute
              inset-0
              bg-[linear-gradient(90deg,rgba(0,0,0,0.76)_0%,rgba(0,0,0,0.48)_30%,rgba(0,0,0,0.08)_68%,rgba(0,0,0,0.05)_100%)]
            "
          />

          <div
            aria-hidden="true"
            className="
              absolute
              inset-0
              bg-[linear-gradient(0deg,rgba(0,0,0,0.28),transparent_40%)]
            "
          />

          {/* CONTENT */}

          <div
            className="
              relative
              z-10
              flex
              min-h-[28rem]
              w-full
              flex-col
              justify-between

              px-5
              py-8

              sm:min-h-[32rem]
              sm:px-8
              sm:py-10

              lg:min-h-[34rem]
              lg:px-[3.5rem]
              lg:py-12
            "
          >
            <div className="max-w-[34rem]">
              {storyEyebrow ? (
                <p
                  className={`
                    ${inter.className}

                    text-[0.625rem]
                    font-semibold
                    uppercase
                    leading-4
                    tracking-[0.04em]
                    text-white
                  `}
                >
                  {storyEyebrow}
                </p>
              ) : null}

              {storyHeading ? (
                <h2
                  id="join-abhijat-heading"
                  className={`
                    ${exo2.className}

                    mt-3
                    max-w-[33rem]

                    text-[2rem]
                    font-semibold
                    leading-[2.35rem]
                    tracking-[-0.035rem]
                    text-white

                    sm:text-[2.5rem]
                    sm:leading-[2.9rem]

                    lg:text-[3rem]
                    lg:leading-[3.4rem]
                    lg:tracking-[-0.05rem]
                  `}
                  style={{
                    fontFeatureSettings:
                      '"liga" off, "clig" off',
                  }}
                >
                  {storyHeading}
                </h2>
              ) : null}

              {storyCtaLabel &&
              storyCtaHref ? (
                <Link
                  href={storyCtaHref}
                  className={`
                    ${inter.className}

                    group
                    mt-8
                    inline-flex
                    items-center
                    gap-2
                    py-2

                    text-xs
                    font-semibold
                    text-white

                    transition-opacity
                    duration-300

                    hover:opacity-70
                  `}
                >
                  <span>
                    {storyCtaLabel}
                  </span>

                  <span
                    className="
                      transition-transform
                      duration-300
                      group-hover:translate-x-1
                    "
                  >
                    <ArrowRightIcon />
                  </span>
                </Link>
              ) : null}
            </div>

            {/* ABHIJAT BADGE — bottom right */}

            {story?.badgeUrl ? (
              <div
                className="
                  relative
                  ml-auto
                  h-[3.75rem]
                  w-[3.75rem]

                  sm:h-[4.5rem]
                  sm:w-[4.5rem]
                "
              >
                <Image
                  src={story.badgeUrl}
                  alt={
                    story.badgeAlt?.trim() ||
                    "Abhijat Marathi logo"
                  }
                  fill
                  sizes="72px"
                  className="object-contain"
                />
              </div>
            ) : null}
          </div>
        </section>
      ) : null}
    </>
  );
}