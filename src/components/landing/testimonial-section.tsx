
import { PreFooterBanner } from "@/components/shared/pre-footer-banner";
import { LocalizedContent } from "@/components/localization/localized-server-content";
import { IntersectionReveal } from "@/components/motion/intersection-reveal";
import Image from "@/components/ui/image";

import {
  plusJakartaSans as inter,
} from "@/lib/fonts";

import type {
  CmsStoryBanner,
  CmsTestimonialSection,
} from "@/types/cms";

const REFERENCE_TESTIMONIAL_COPY =
  "From creating original content and building digital platforms to strategic communications and global distribution, our integrated capabilities help businesses, creators, governments, and brands grow through media and technology.";

/* ============================================================
   ICON
   ============================================================ */


/* ============================================================
   TESTIMONIAL SECTION
   ============================================================ */

export function TestimonialSection({
  testimonial,
  story,
}: {
  testimonial?: CmsTestimonialSection | null;
  story?: CmsStoryBanner | null;
}) {
  const partnerLogos =
    testimonial?.partnerLogos?.filter(
      (item) => Boolean(item?.imageUrl),
    ) ?? [];

  const companyName =
    testimonial?.companyName?.trim() ||
    null;

  const personName =
    testimonial?.personName?.trim() ||
    null;

  const personRole =
    testimonial?.personRole?.trim() ||
    null;

  const quote =
    testimonial?.quote?.trim() ||
    (
      testimonial?.companyLogoUrl ||
        companyName ||
        partnerLogos.length
        ? REFERENCE_TESTIMONIAL_COPY
        : null
    );

  const hasTestimonial =
    Boolean(
      quote ||
      testimonial?.companyLogoUrl ||
      partnerLogos.length,
    );

  /* ==========================================================
     STORY DATA
     ========================================================== */

  const storyEyebrow =
    story?.eyebrow?.trim() ||
    "JOIN ABHIJAT MARATHI";

  const storyHeading =
    story?.heading?.trim() ||
    "Have a story worth telling? Let's bring it to the world.";

  const storyCtaLabel =
    story?.cta?.label?.trim() ||
    "Join as Partner";

  const storyCtaHref =
    story?.cta?.href?.trim() ||
    "/contact";

  const hasStory =
    Boolean(
      story?.imageUrl ||
      story?.heading?.trim(),
    );

  if (
    !hasTestimonial &&
    !hasStory
  ) {
    return null;
  }

  return <LocalizedContent>{(
    <>
      {/* =====================================================
          TESTIMONIAL
          ===================================================== */}

      {hasTestimonial ? (
        <section
          id="testimonial"
          data-motion-managed
          aria-label="Client testimonial"
          className="
            landing-section-transition
            relative
            w-full
            bg-white
          "
        >
          {/* =================================================
              SAME SPACING AS CANNES

              Mobile:  64px vertical
              Tablet:  80px vertical
              Desktop: 100px vertical

              Horizontal:
              clamp(1.25rem, 4vw, 4rem)
              ================================================= */}

          <IntersectionReveal
            className="
    testimonial-body

    box-border
    flex
    min-h-[28rem]
    w-full
    flex-col
    items-center
    justify-center

    p-[clamp(1.25rem,4vw,4rem)]

    text-center
  "
          >
            {/* ===============================================
                INNER CONTENT

                Full available width.
                Maximum width controls readable content only.
                =============================================== */}

            <div
              className="
                flex
                w-full
                max-w-[72rem]
                flex-col
                items-center
              "
            >
              {/* COMPANY LOGO */}

              {testimonial?.companyLogoUrl ? (
                <div
                  className="
                    relative

                    h-[3.75rem]
                    w-[12rem]

                    sm:h-[4.5rem]
                    sm:w-[14rem]
                  "
                >
                  <Image
                    src={
                      testimonial.companyLogoUrl
                    }
                    alt={
                      testimonial.companyLogoAlt?.trim() ||
                      companyName ||
                      ""
                    }
                    fill
                    sizes="224px"
                    className="object-contain"
                  />
                </div>
              ) : null}

              {/* =============================================
                  QUOTE
                  ============================================= */}

              {quote ? (
                <blockquote
                  className="
                    mt-8
                    w-full
                    max-w-[64rem]

                    sm:mt-9
                  "
                >
                  <p
                    className={`
                      testimonial-quote
                      ${inter.className}

                      m-0
                      w-full

                      text-center

                      text-[0.9375rem]
                      font-normal
                      leading-[1.6]

                      text-[rgba(0,6,38,0.62)]

                      sm:text-[1rem]
                      sm:leading-[1.65]

                      lg:text-[1.0625rem]
                      lg:leading-[1.7]
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

              {/* =============================================
                  PERSON / ROLE / COMPANY
                  ============================================= */}

              {personName ||
                personRole ||
                companyName ? (
                <div
                  className="
                    mt-4
                    w-full
                    max-w-[40rem]
                    text-center
                  "
                >
                  {personName ? (
                    <p
                      className={`
                        ${inter.className}

                        m-0

                        text-[0.875rem]
                        font-semibold
                        leading-[1.375rem]

                        text-[rgba(0,6,38,0.90)]
                      `}
                    >
                      {personName}
                    </p>
                  ) : null}

                  {personRole ||
                    companyName ? (
                    <p
                      className={`
                        ${inter.className}

                        m-0
                        ${personName ? "mt-1" : ""}

                        w-full

                        text-[0.875rem]
                        font-semibold
                        leading-[1.375rem]

                        text-[rgba(0,6,38,0.90)]

                        sm:text-[1rem]
                        sm:leading-[1.5rem]

                        lg:text-[1.0625rem]
                        lg:leading-[1.625rem]
                      `}
                      style={{
                        fontFeatureSettings:
                          '"liga" off, "clig" off',
                      }}
                    >
                      {personRole}

                      {personRole &&
                        companyName
                        ? " at "
                        : null}

                      {companyName}
                    </p>
                  ) : null}
                </div>
              ) : null}
            </div>
          </IntersectionReveal>

          {/* =================================================
              PARTNER LOGOS

              Same horizontal gutter as Cannes.
              ================================================= */}

          {partnerLogos.length > 0 ? (
            <div
              data-landing-parallax-layer="reverse"
              className="
                w-full
                border-t
                border-[rgba(0,6,38,0.09)]
              "
            >
              <div
                className="
                  mx-auto

                  grid
                  min-h-[7.75rem]

                  w-full

                  grid-cols-2
                  items-center
                  justify-items-center

                  gap-x-8
                  gap-y-7

                  px-[clamp(1.25rem,4vw,4rem)]
                  py-7

                  sm:grid-cols-3

                  lg:grid-cols-5
                  lg:gap-x-12
                "
              >
                {partnerLogos
                  .slice(0, 5)
                  .map(
                    (
                      logo,
                      index,
                    ) => (
                      <div
                        key={
                          logo._key ??
                          `${logo.label}-${index}`
                        }
                        className="
                          relative

                          h-[2.1rem]
                          w-full
                          max-w-[7.25rem]

                          opacity-90
                          grayscale

                          transition-[opacity,filter]
                          duration-300

                          hover:opacity-100
                          hover:grayscale-0

                          sm:max-w-[8rem]
                        "
                      >
                        <Image
                          src={
                            logo.imageUrl
                          }
                          alt={
                            logo.imageAlt?.trim() ||
                            `${logo.label} logo`
                          }
                          fill
                          sizes="128px"
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
          STORY
          ===================================================== */}

      {hasStory ? (
        <PreFooterBanner type={2} content={{ heading: storyHeading, eyebrow: storyEyebrow, imageUrl: story?.imageUrl || "/images/join-as-partner-background.png", imageAlt: story?.imageAlt || "", cta: { label: storyCtaLabel, href: storyCtaHref }, badgeUrl: story?.badgeUrl || "", badgeAlt: story?.badgeAlt || "" }} />
      ) : null}
    </>
  )}</LocalizedContent>;
}