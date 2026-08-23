import Image from "next/image";
import Link from "next/link";
import { Exo_2, Inter } from "next/font/google";

import type { CmsPartnerSection } from "@/types/cms";

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
      className="h-4 w-4"
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

function ArrowUpRightIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className="h-4 w-4"
      fill="none"
    >
      <path
        d="M6 14 14 6M8 6h6v6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PartnerSection({
  content,
}: {
  content?: CmsPartnerSection | null;
}) {
  if (!content) {
    return null;
  }

  const benefits =
    content.benefits?.filter((item) =>
      Boolean(item?.title?.trim()),
    ) ?? [];

  const hasIntro = Boolean(
    content.heading?.trim() ||
      content.description?.trim() ||
      benefits.length,
  );

  const hasEvent = Boolean(
    content.eventHeading?.trim() ||
      content.eventImageUrl,
  );

  if (!hasIntro && !hasEvent) {
    return null;
  }

  const eventCtaLabel =
    content.eventCta?.label?.trim() || null;

  const eventCtaHref =
    content.eventCta?.href?.trim() || null;

  return (
    <section
      id="why-partner"
      aria-labelledby="why-partner-heading"
      className="
        landing-section-transition
        mx-auto
        w-full
        max-w-[90rem]
        overflow-hidden
        bg-[#FFEABF]
      "
    >
      {/* =====================================================
          WHY PARTNER
          ===================================================== */}

      {hasIntro ? (
        <div
          className="
            grid
            gap-12
            px-5
            py-16

            sm:px-8

            lg:grid-cols-[minmax(0,1fr)_minmax(30rem,37rem)]
            lg:gap-20
            lg:px-[3.5rem]
            lg:py-[6.25rem]
          "
        >
          {/* =================================================
              LEFT
              ================================================= */}

          <div className="max-w-[31.5rem]">
            {content.heading?.trim() ? (
              <h2
                id="why-partner-heading"
                className={`
                  ${exo2.className}

                  text-[2.25rem]
                  font-semibold
                  leading-[2.75rem]
                  tracking-[-0.04rem]
                  text-[rgba(0,6,38,0.90)]

                  sm:text-[2.75rem]
                  sm:leading-[3.25rem]

                  lg:text-[3.5rem]
                  lg:leading-[4rem]
                  lg:tracking-[-0.0625rem]
                `}
                style={{
                  fontFeatureSettings:
                    '"liga" off, "clig" off',
                }}
              >
                {content.heading}
              </h2>
            ) : null}

            {content.description?.trim() ? (
              <p
                className={`
                  ${inter.className}

                  mt-6
                  max-w-[31rem]
                  text-base
                  font-normal
                  leading-6
                  text-[rgba(0,6,38,0.62)]
                `}
              >
                {content.description}
              </p>
            ) : null}
          </div>

          {/* =================================================
              BENEFITS
              ================================================= */}

          {benefits.length > 0 ? (
            <div
              className="
                flex
                w-full
                flex-col
                border-t
                border-[rgba(0,17,102,0.10)]
              "
            >
              {benefits.map((item, index) => {
                const number = String(
                  index + 1,
                ).padStart(2, "0");

                const rowContent = (
                  <>
                    <div
                      className="
                        flex
                        min-w-0
                        items-center
                        gap-5
                        sm:gap-7
                      "
                    >
                      <span
                        className={`
                          ${inter.className}

                          shrink-0
                          text-[0.625rem]
                          font-semibold
                          tracking-[0.08em]
                          text-[rgba(0,6,38,0.40)]
                        `}
                      >
                        {number}
                      </span>

                      <span
                        className={`
                          ${inter.className}

                          text-base
                          font-semibold
                          leading-6
                          text-[rgba(0,6,38,0.90)]

                          sm:text-lg
                          sm:leading-7

                          lg:text-xl
                        `}
                      >
                        {item.title}
                      </span>
                    </div>

                    <span
                      className="
                        flex
                        h-9
                        w-9
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        text-[rgba(0,6,38,0.45)]

                        transition-all
                        duration-300

                        group-hover:translate-x-1
                        group-hover:-translate-y-1
                        group-hover:bg-[rgba(0,6,38,0.06)]
                        group-hover:text-[rgba(0,6,38,0.90)]
                      "
                    >
                      <ArrowUpRightIcon />
                    </span>
                  </>
                );

                const rowClass = `
                  group
                  flex
                  min-h-[4.75rem]
                  w-full
                  items-center
                  justify-between
                  gap-5
                  border-b
                  border-[rgba(0,17,102,0.10)]
                  py-4

                  transition-colors
                  duration-300

                  hover:bg-white/20
                `;

                return item.href ? (
                  <Link
                    key={
                      item._key ??
                      `${item.title}-${index}`
                    }
                    href={item.href}
                    className={rowClass}
                  >
                    {rowContent}
                  </Link>
                ) : (
                  <div
                    key={
                      item._key ??
                      `${item.title}-${index}`
                    }
                    className={rowClass}
                  >
                    {rowContent}
                  </div>
                );
              })}
            </div>
          ) : null}
        </div>
      ) : null}

      {/* =====================================================
          CANNES / EVENT FEATURE
          ===================================================== */}

      {hasEvent ? (
        <div
          className="
            relative
            min-h-[34rem]
            w-full
            overflow-hidden

            sm:min-h-[42rem]

            lg:min-h-[48.875rem]
          "
        >
          {/* IMAGE */}

          {content.eventImageUrl ? (
            <Image
              src={content.eventImageUrl}
              alt={
                content.eventImageAlt?.trim() ||
                ""
              }
              fill
              sizes="100vw"
              className="
                object-cover
                object-center
              "
            />
          ) : (
            <div
              aria-hidden="true"
              className="
                absolute
                inset-0
                bg-[#071021]
              "
            />
          )}

          {/* CINEMATIC OVERLAY */}

          <div
            aria-hidden="true"
            className="
              absolute
              inset-0
              bg-[linear-gradient(180deg,rgba(0,0,0,0.72)_0%,rgba(0,0,0,0.10)_46%,rgba(0,0,0,0.62)_100%)]
            "
          />

          <div
            aria-hidden="true"
            className="
              absolute
              inset-0
              bg-[radial-gradient(100%_75%_at_55%_62%,transparent_30%,rgba(0,0,0,0.42)_100%)]
            "
          />

          {/* CONTENT */}

          <div
            className="
              relative
              z-10
              flex
              min-h-[34rem]
              w-full
              flex-col
              justify-between
              px-5
              py-8

              sm:min-h-[42rem]
              sm:px-8
              sm:py-10

              lg:min-h-[48.875rem]
              lg:px-[3.5rem]
              lg:py-12
            "
          >
            {/* TOP CONTENT */}

            <div className="max-w-[69rem]">
              {content.eventHeading?.trim() ? (
                <h3
                  className={`
                    ${exo2.className}

                    max-w-[67rem]
                    text-[2rem]
                    font-semibold
                    leading-[2.5rem]
                    tracking-[-0.04rem]
                    text-white

                    sm:text-[2.75rem]
                    sm:leading-[3.25rem]

                    lg:text-[3.5rem]
                    lg:leading-[4rem]
                    lg:tracking-[-0.0625rem]
                  `}
                  style={{
                    fontFeatureSettings:
                      '"liga" off, "clig" off',
                  }}
                >
                  {content.eventHeading}
                </h3>
              ) : null}

              {eventCtaLabel &&
              eventCtaHref ? (
                <Link
                  href={eventCtaHref}
                  className={`
                    ${inter.className}

                    group
                    mt-6
                    inline-flex
                    items-center
                    gap-2
                    py-2

                    text-sm
                    font-semibold
                    text-white

                    transition-opacity
                    duration-300

                    hover:opacity-70
                  `}
                >
                  <span>
                    {eventCtaLabel}
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

            {/* EVENT BADGE */}

            {content.eventBadgeUrl ? (
              <div
                className="
                  relative
                  ml-auto
                  mt-auto
                  h-[3.75rem]
                  w-[7.5rem]

                  sm:h-[4.5rem]
                  sm:w-[9rem]
                "
              >
                <Image
                  src={content.eventBadgeUrl}
                  alt={
                    content.eventBadgeAlt?.trim() ||
                    ""
                  }
                  fill
                  sizes="144px"
                  className="object-contain"
                />
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </section>
  );
}