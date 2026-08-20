import Link from "next/link";
import type { CSSProperties } from "react";

const ACTIVE_COPY_WIDTH = 747;
const ACTIVE_IMAGE_WIDTH = 635;
const ACTIVE_CARD_WIDTH = ACTIVE_COPY_WIDTH + ACTIVE_IMAGE_WIDTH;

const CARD_HEIGHT = 688;
const STACK_STEP = 72;
const STACK_COUNT = 8;

const COLLAPSED_COPY_WIDTHS = [
  260,
  321,
  382,
  442,
  503,
  563,
  623,
  684,
] as const;

const COLLAPSED_IMAGE_WIDTHS = [
  148,
  209,
  269,
  330,
  391,
  451,
  511,
  572,
] as const;

const SERVICES = [
  {
    number: "01",
    title: "Media & Content Production",
    description:
      "Films, web series, OTT originals, documentaries, branded content, corporate films and podcasts built for audiences across platforms.",
    image: "/images/landing/services/Image%202.png",
  },
  {
    number: "02",
    title: "Digital Entertainment & OTT",
    description:
      "Platform strategy, programming, distribution and audience experiences designed for a fast-moving digital entertainment landscape.",
    image: "/images/landing/services/Image%203.png",
  },
  {
    number: "03",
    title: "Music & Audio Experiences",
    description:
      "Original music, sonic identities, audio storytelling and immersive formats that help brands and audiences connect through sound.",
    image: "/images/landing/services/Image%204.png",
  },
  {
    number: "04",
    title: "Brand & Creative Studio",
    description:
      "Campaign systems, visual identities, creative direction and content toolkits shaped to keep communication consistent across every touchpoint.",
    image: "/images/landing/services/Image%205.png",
  },
  {
    number: "05",
    title: "Media Technology & Innovation",
    description:
      "AI-assisted media workflows, product thinking and technology-led experiences that make content creation, discovery and delivery more effective.",
    image: "/images/landing/services/Image%206.png",
  },
  {
    number: "06",
    title: "Live Experiences & Events",
    description:
      "Cultural experiences, launches, live formats and audience activations planned from concept through production, amplification and delivery.",
    image: "/images/landing/services/Image%207.png",
  },
  {
    number: "07",
    title: "Strategic Partnerships & Distribution",
    description:
      "Partnership design, syndication and distribution programs that connect content, creators, platforms and institutions with the right audiences.",
    image: "/images/landing/services/Image%208.png",
  },
  {
    number: "08",
    title: "Government & Institutional Communications",
    description:
      "IEC campaigns, public awareness, tourism, heritage and cultural documentation built for public communication at scale.",
    image: "/images/landing/services/Image%209.png",
  },
] as const;

const STAGE_HEIGHT =
  CARD_HEIGHT + STACK_STEP * (STACK_COUNT - 1);

type ServiceCardStyle = CSSProperties & {
  "--card-left": string;
  "--card-bottom": string;
  "--card-width": string;
  "--card-height": string;
  "--card-z": number;

  "--copy-column": string;
  "--image-column": string;
};

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

export function ServicesScrollGallery() {
  return (
    <div
      className="services-static-stage relative mx-auto w-full max-w-[83rem]"
      style={{
        aspectRatio: `${ACTIVE_CARD_WIDTH} / ${STAGE_HEIGHT}`,
      }}
    >
      {SERVICES.map((service, index) => {
        const isFrontCard =
          index === SERVICES.length - 1;

        /*
         * 01-07 use your Figma collapsed dimensions.
         * 08 is the fully expanded front card.
         */
        const copyWidth = isFrontCard
          ? ACTIVE_COPY_WIDTH
          : COLLAPSED_COPY_WIDTHS[index];

        const imageWidth = isFrontCard
          ? ACTIVE_IMAGE_WIDTH
          : COLLAPSED_IMAGE_WIDTHS[index];

        const cardWidth =
          copyWidth + imageWidth;

        /*
         * IMPORTANT:
         *
         * The text/image divider stays in exactly
         * the same horizontal position.
         *
         * This creates the staircase shown in your
         * reference rather than right-aligning
         * every card.
         */
        const leftOffset =
          ACTIVE_COPY_WIDTH - copyWidth;

        /*
         * 01 = highest/back card
         * 08 = lowest/front card
         */
        const stackLevel =
          SERVICES.length - 1 - index;

        const bottomOffset =
          stackLevel * STACK_STEP;

        const style: ServiceCardStyle = {
          "--card-left": `${
            (leftOffset / ACTIVE_CARD_WIDTH) * 100
          }%`,

          "--card-bottom": `${
            (bottomOffset / STAGE_HEIGHT) * 100
          }%`,

          "--card-width": `${
            (cardWidth / ACTIVE_CARD_WIDTH) * 100
          }%`,

          "--card-height": `${
            (CARD_HEIGHT / STAGE_HEIGHT) * 100
          }%`,

          "--card-z": index + 1,

          "--copy-column": `${
            (copyWidth / cardWidth) * 100
          }%`,

          "--image-column": `${
            (imageWidth / cardWidth) * 100
          }%`,
        };

        return (
          <article
            key={service.number}
            className="
              services-static-card
              absolute
              overflow-hidden
              border
              border-black/[0.035]
              bg-white
              shadow-[0_0.6rem_2rem_rgba(0,0,0,0.09)]
            "
            style={style}
          >
            <div
              className="
                services-static-grid
                grid
                h-full
                min-w-0
                bg-white
              "
            >
              {/* LEFT SIDE */}
              <div
                className="
                  services-static-copy
                  flex
                  min-w-0
                  flex-col
                  bg-white
                "
              >
                <span
                  className="
                    services-static-number
                    block
                    font-semibold
                    leading-none
                    tracking-[-0.04em]
                    text-black
                  "
                >
                  {service.number}
                </span>

                {/* Only 08 shows complete content */}
                {isFrontCard && (
                  <div
                    className="
                      services-static-details
                      mt-auto
                      flex
                      min-w-0
                      flex-col
                      gap-3
                      sm:gap-4
                    "
                  >
                    <h3
                      className="
                        services-static-title
                        max-w-[35rem]
                        font-semibold
                        tracking-[-0.025em]
                        text-black
                      "
                    >
                      {service.title}
                    </h3>

                    <p
                      className="
                        services-static-description
                        max-w-[36rem]
                        text-[rgba(0,9,51,0.65)]
                      "
                    >
                      {service.description}
                    </p>

                    <Link
                      href="/services"
                      className="
                        services-static-button
                        inline-flex
                        w-fit
                        items-center
                        gap-2
                        rounded-lg
                        py-2
                        font-semibold
                        text-[#8F6C1A]
                        transition-opacity
                        hover:opacity-70
                        sm:py-3
                      "
                    >
                      <span>
                        Explore Capabilities
                      </span>

                      <ArrowRightIcon />
                    </Link>
                  </div>
                )}
              </div>

              {/* RIGHT SIDE */}
              <div
                className="
                  relative
                  min-w-0
                  overflow-hidden
                  bg-[#f2eee4]
                "
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={service.image}
                  alt=""
                  draggable={false}
                  className="
                    h-full
                    w-full
                    select-none
                    object-cover
                  "
                />
              </div>
            </div>
          </article>
        );
      })}

      <style>{`
        .services-static-stage {
          container-type: inline-size;
        }

        .services-static-card {
          left: var(--card-left);

          bottom: var(--card-bottom);

          width: var(--card-width);

          height: var(--card-height);

          z-index: var(--card-z);
        }

        .services-static-grid {
          grid-template-columns:
            var(--copy-column)
            var(--image-column);
        }

        .services-static-copy {
          container-type: inline-size;

          padding: clamp(
            0.75rem,
            4.05cqw,
            3.5rem
          );
        }

        .services-static-number {
          font-size: clamp(
            0.8rem,
            5.35cqw,
            2.5rem
          );
        }

        .services-static-title {
          font-size: clamp(
            0.8rem,
            4.25cqw,
            2rem
          );

          line-height: 1.2;
        }

        .services-static-description {
          font-size: clamp(
            0.5rem,
            1.85cqw,
            0.875rem
          );

          line-height: 1.5;
        }

        .services-static-button {
          font-size: clamp(
            0.5rem,
            1.75cqw,
            0.875rem
          );

          line-height: 1.25rem;
        }
      `}</style>
    </div>
  );
}