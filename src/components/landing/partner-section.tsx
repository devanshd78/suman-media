"use client";

import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import Link from "next/link";
import {
  inter as benefitFont,
  plusJakartaSans as body,
  plusJakartaSans as display,
} from "@/lib/fonts";

import type {
  CmsCta,
  CmsPartnerSection,
} from "@/types/cms";

/* =========================================================
   FONTS
   ========================================================= */

/* =========================================================
   ICONS
   ========================================================= */

function ArrowRightIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className="h-4 w-4 shrink-0"
      fill="none"
    >
      <path
        d="M3.5 8h8M8.5 5l3 3-3 3"
        stroke="currentColor"
        strokeWidth="1.15"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowUpRightIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className="h-4 w-4 shrink-0"
      fill="none"
    >
      <path
        d="M4 12 12 4M6.25 4H12v5.75"
        stroke="currentColor"
        strokeWidth="1.15"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* =========================================================
   FALLBACK BENEFITS
   ========================================================= */

const DEFAULT_BENEFITS = [
  "Future-ready Media Infrastructure",
  "Technology-led Innovation",
  "Integrated Ecosystem",
  "Scalable Partnerships",
  "Enterprise Delivery",
];

/* =========================================================
   BENEFIT REVEAL
   ========================================================= */

const BENEFIT_VARIANTS: Variants = {
  hidden: {
    opacity: 0,
    y: 18,
  },

  visible: (index: number) => ({
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.72,
      delay: index * 0.08,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

/* =========================================================
   CTA FALLBACK
   ========================================================= */

function resolveCta(
  cta?: CmsCta | null,
): CmsCta {
  if (
    cta?.label?.trim() &&
    cta?.href?.trim()
  ) {
    return cta;
  }

  return {
    label: "Contact us",
    href: "/contact",
    style: "primary",
  };
}

/* =========================================================
   PARTNER SECTION
   ========================================================= */

export function PartnerSection({
  content,
}: {
  content?: CmsPartnerSection | null;
}) {
  const shouldReduceMotion =
    useReducedMotion();

  if (!content) {
    return null;
  }

  const benefits =
    content.benefits?.filter((item) =>
      Boolean(item?.title?.trim()),
    ) ?? [];

  const visibleBenefits =
    benefits.length > 0
      ? benefits
      : DEFAULT_BENEFITS.map(
          (title, index) => ({
            _key: `reference-benefit-${index}`,
            title,
            href: null,
          }),
        );

  const heading =
    content.heading?.trim() ||
    "Why Partner With us?";

  const description =
    content.description?.trim() ||
    "From creating original content and building digital platforms to strategic communications and global distribution, our integrated capabilities help businesses, creators, governments, and brands grow through media and technology.";

  const cta = resolveCta(
    content.cta,
  );

  return (
    <section
      id="why-partner"
      aria-labelledby="why-partner-heading"
      className="
        landing-section-transition
        w-full
        overflow-hidden
        bg-[#FFEABF]
      "
    >
      <div
        className="
          grid
          w-full
          gap-10
          px-5
          pt-12

          sm:px-8
          sm:pt-14

          md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]
          md:gap-12

          lg:grid-cols-[minmax(0,0.78fr)_minmax(30rem,1.22fr)]
          lg:gap-20
          lg:px-[3.5rem]
          lg:pt-[4.25rem]

          xl:px-[4rem]
        "
      >
        {/* =================================================
            LEFT CONTENT
            ================================================= */}

        <motion.div
          data-landing-text-reveal-skip
          className="
            max-w-[31rem]
          "
          initial={
            shouldReduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 24,
                }
          }
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.45,
          }}
          transition={{
            duration:
              shouldReduceMotion
                ? 0
                : 0.8,

            ease: [
              0.16,
              1,
              0.3,
              1,
            ],
          }}
        >
          {/* ===============================================
              HEADING

              FIGMA
              Plus Jakarta Sans
              40px / 48px
              600
              -0.5px
              #1A1A1A
              =============================================== */}

          <h2
            id="why-partner-heading"
            className={`
              ${display.className}

              text-[2rem]
              font-semibold
              leading-[2.5rem]
              tracking-[-0.03125rem]
              text-[#1A1A1A]

              sm:text-[2.25rem]
              sm:leading-[2.75rem]

              lg:text-[2.5rem]
              lg:leading-[3rem]
            `}
            style={{
              fontFeatureSettings:
                '"liga" off, "clig" off',
            }}
          >
            {heading}
          </h2>

          {/* ===============================================
              DESCRIPTION

              FIGMA
              Plus Jakarta Sans
              16px / 24px
              400
              #1A1A1A
              =============================================== */}

          <p
            className={`
              ${body.className}

              mt-5
              max-w-[30rem]

              text-[0.9375rem]
              font-normal
              leading-[1.5rem]
              text-[#1A1A1A]

              sm:text-[1rem]
              sm:leading-[1.5rem]
            `}
            style={{
              fontFeatureSettings:
                '"liga" off, "clig" off',
            }}
          >
            {description}
          </p>

          {/* ===============================================
              CTA

              FIGMA
              border-radius: 4px
              background: #8F6C1A
              =============================================== */}

          <Link
            href={cta.href}
            className={`
              ${body.className}

              group
              mt-6
              inline-flex
              min-h-[2.75rem]
              items-center
              justify-center
              gap-2

              rounded-[0.25rem]
              bg-[#8F6C1A]

              px-6
              py-2.5

              text-[0.875rem]
              font-medium
              leading-5
              text-white

              transition-[background-color,transform]
              duration-200

              hover:-translate-y-[1px]
              hover:bg-[#765813]

              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-[#8F6C1A]/35
              focus-visible:ring-offset-2
              focus-visible:ring-offset-[#FFEABF]
            `}
            style={{
              fontFeatureSettings:
                '"liga" off, "clig" off',
            }}
          >
            <span>
              {cta.label}
            </span>

            <span
              className="
                transition-transform
                duration-200
                group-hover:translate-x-0.5
              "
            >
              <ArrowRightIcon />
            </span>
          </Link>
        </motion.div>

        {/* =================================================
            BENEFIT LIST
            ================================================= */}

        <div
          data-landing-text-reveal-skip
          className="
            flex
            w-full
            flex-col
            border-t
            border-black/[0.10]
          "
        >
          {visibleBenefits
            .slice(0, 5)
            .map(
              (item, index) => {
                const contentRow = (
                  <>
                    {/* =====================================
                        BENEFIT TITLE

                        FIGMA
                        Inter
                        20px / 28px
                        600
                        #1A1A1A
                        ===================================== */}

                    <span
                      className={`
                        ${benefitFont.className}

                        text-[1rem]
                        font-semibold
                        leading-[1.5rem]
                        text-[#1A1A1A]

                        sm:text-[1.125rem]
                        sm:leading-[1.625rem]

                        lg:text-[1.25rem]
                        lg:leading-[1.75rem]
                      `}
                      style={{
                        fontFeatureSettings:
                          '"liga" off, "clig" off',
                      }}
                    >
                      {item.title}
                    </span>

                    {item.href ? (
                      <span
                        className="
                          ml-auto
                          shrink-0
                          text-[#1A1A1A]/45
                          transition-[color,transform]
                          duration-200

                          group-hover:translate-x-0.5
                          group-hover:-translate-y-0.5
                          group-hover:text-[#1A1A1A]
                        "
                      >
                        <ArrowUpRightIcon />
                      </span>
                    ) : null}
                  </>
                );

                const rowClassName = `
                  group
                  flex
                  min-h-[4rem]
                  w-full
                  items-center
                  gap-4

                  border-b
                  border-black/[0.10]

                  py-4

                  transition-colors
                  duration-200

                  hover:bg-white/[0.12]

                  sm:min-h-[4.5rem]
                  sm:py-[1.125rem]

                  lg:min-h-[5rem]
                  lg:py-5
                `;

                return (
                  <motion.div
                    key={
                      item._key ||
                      `${item.title}-${index}`
                    }
                    custom={index}
                    variants={
                      BENEFIT_VARIANTS
                    }
                    initial={
                      shouldReduceMotion
                        ? false
                        : "hidden"
                    }
                    whileInView="visible"
                    viewport={{
                      once: true,
                      amount: 0.55,
                    }}
                  >
                    {item.href ? (
                      <Link
                        href={item.href}
                        className={
                          rowClassName
                        }
                      >
                        {contentRow}
                      </Link>
                    ) : (
                      <div
                        className={
                          rowClassName
                        }
                      >
                        {contentRow}
                      </div>
                    )}
                  </motion.div>
                );
              },
            )}
        </div>
      </div>

      {/* ===================================================
          BOTTOM BREATHING SPACE
          =================================================== */}

      <div
        aria-hidden="true"
        className="
          h-14
          sm:h-16
          lg:h-[4.5rem]
        "
      />
    </section>
  );
}