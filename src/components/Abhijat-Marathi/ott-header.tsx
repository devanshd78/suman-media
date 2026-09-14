"use client";

import { TextReveal } from "@/components/ui/scroll-text-reveal";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useState } from "react";
import {
  motion,
  useReducedMotion,
} from "framer-motion";

/* =========================================================
   TYPES
========================================================= */

type OttHeaderProps = {
  learnMoreHref?: string;
  joinNowHref?: string;
};

type OttImage = {
  src: string;

  left: string;
  top: string;

  zIndex: number;

  center?: boolean;

  /*
   * Entrance delay.
   *
   * Center first,
   * then inner pair,
   * middle pair,
   * outer pair.
   */
  delay: number;
};

/* =========================================================
   IMAGE STACK

   FINAL POSITIONS REMAIN EXACTLY THE SAME.

   Horizontal step:
   12.5rem / 200px

   Vertical staircase:
   center      = 0
   inner       = 3rem
   middle      = 6rem
   outer       = 9rem
========================================================= */

const OTT_IMAGES: OttImage[] = [
  {
    src: "/images/ott/image1.png",
    left: "0rem",
    top: "9rem",
    zIndex: 10,
    center: false,
    delay: 0.54,
  },

  {
    src: "/images/ott/Image2.png",
    left: "12.5rem",
    top: "6rem",
    zIndex: 20,
    center: false,
    delay: 0.36,
  },

  {
    src: "/images/ott/image3.png",
    left: "25rem",
    top: "3rem",
    zIndex: 30,
    center: false,
    delay: 0.18,
  },

  {
    src: "/images/ott/image4.png",
    left: "37.5rem",
    top: "0rem",
    zIndex: 40,
    center: true,
    delay: 0,
  },

  {
    src: "/images/ott/image5.png",
    left: "50rem",
    top: "3rem",
    zIndex: 30,
    center: false,
    delay: 0.18,
  },

  {
    src: "/images/ott/image6.png",
    left: "62.5rem",
    top: "6rem",
    zIndex: 20,
    center: false,
    delay: 0.36,
  },

  {
    src: "/images/ott/image7.png",
    left: "75rem",
    top: "9rem",
    zIndex: 10,
    center: false,
    delay: 0.54,
  },
];

/* =========================================================
   CHEVRON
========================================================= */

function ChevronRight() {
  return (
    <svg
      aria-hidden="true"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
    >
      <path
        d="M7.5 5L12.5 10L7.5 15"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* =========================================================
   COMPONENT
========================================================= */

export default function OttHeader({
  learnMoreHref = "#",
  joinNowHref = "#",
}: OttHeaderProps) {
  const prefersReducedMotion =
    Boolean(useReducedMotion());

  const [loadedImages, setLoadedImages] =
    useState<Set<string>>(() => new Set());

  const markImageLoaded = useCallback((src: string) => {
    setLoadedImages((current) => {
      if (current.has(src)) return current;

      const next = new Set(current);
      next.add(src);
      return next;
    });
  }, []);

  return (
    <section
      aria-labelledby="ott-header-title"
      className="
        relative
        w-full
        overflow-hidden
        bg-[#111111]
      "
    >
      <div
        className="
          mx-auto

          flex
          w-full
          max-w-[90rem]
          flex-col
          items-center

          gap-12

          px-5
          py-16

          md:gap-16
          md:px-8
          md:py-20

          xl:h-[56rem]
          xl:gap-[6.25rem]
          xl:px-[3.5rem]
          xl:py-[6.25rem]
        "
      >
        {/* =================================================
            TEXT WRAPPER
        ================================================= */}

        <div
          className="
            w-full
            shrink-0
          "
        >
          {/* CATEGORY */}

          <p
            className="
              w-full
              max-w-[75.625rem]

              text-[0.875rem]
              font-semibold
              leading-[1.25rem]

              text-white
            "
            style={{
              fontFamily:
                'var(--Font-family-Heading, "Plus Jakarta Sans")',

              fontFeatureSettings:
                "'liga' off, 'clig' off",
            }}
          >
            <TextReveal>
            OTT, DIGITAL PLATFORM &amp; STREAMING
            </TextReveal>
          </p>

          {/* =================================================
              MAIN HEADING
          ================================================= */}

          <h1
            id="ott-header-title"
            className="
              mt-2

              w-full
              max-w-[58.875rem]

              text-[2.5rem]
              font-semibold
              leading-[2.9rem]

              tracking-[-0.04rem]

              text-white

              md:text-[3rem]
              md:leading-[3.5rem]

              xl:text-[3.5rem]
              xl:leading-[4rem]
              xl:tracking-[-0.0625rem]
            "
            style={{
              fontFamily:
                'var(--Font-family-Heading, "Plus Jakarta Sans")',

              fontFeatureSettings:
                "'liga' off, 'clig' off",
            }}
          >
            <TextReveal>
            Building Digital Platforms for the

            <br
              className="
                hidden
                xl:block
              "
            />

            <span
              className="
                xl:hidden
              "
            >
              {" "}
            </span>

            Next Generation of Entertainment
            </TextReveal>
          </h1>

          {/* =================================================
              SUBTEXT
          ================================================= */}

          <p
            className="
              mt-4

              w-full
              max-w-[53.8125rem]

              text-[1rem]
              font-medium
              leading-[1.5rem]

              text-[rgba(255,255,255,0.78)]

              md:text-[1.125rem]
              md:leading-[1.625rem]

              xl:text-[1.25rem]
              xl:leading-[1.75rem]
            "
            style={{
              fontFamily:
                'var(--Font-family-Body, "Plus Jakarta Sans")',

              fontFeatureSettings:
                "'liga' off, 'clig' off",
            }}
          >
            <TextReveal>
            From Marathi OTT to connected-screen
            experiences, Suman builds and enables digital

            <br
              className="
                hidden
                xl:block
              "
            />

            <span
              className="
                xl:hidden
              "
            >
              {" "}
            </span>

            platforms that bring content to audiences
            across devices and markets.
            </TextReveal>
          </p>

          {/* =================================================
              BUTTONS
          ================================================= */}

          <div
            className="
              mt-6

              flex
              flex-wrap
              items-center

              gap-4
            "
          >
            {/* LEARN MORE */}

            <Link
              href={learnMoreHref}
              className="
                flex

                h-[3.5rem]
                w-[12.5rem]

                items-center
                justify-center

                rounded-[0.25rem]

                bg-white

                transition-opacity
                duration-200

                hover:opacity-90

                focus-visible:outline
                focus-visible:outline-2
                focus-visible:outline-offset-2
                focus-visible:outline-white
              "
            >
              <span
                className="
                  flex
                  items-center

                  gap-3
                "
              >
                <span
                  className="
                    text-center

                    text-[1rem]
                    font-semibold
                    leading-[1.5rem]

                    text-[#8F6C1A]
                  "
                  style={{
                    fontFamily:
                      "var(--Font-family-Body, Inter)",

                    fontFeatureSettings:
                      "'liga' off, 'clig' off",
                  }}
                >
                  <TextReveal>
                  Learn more
                  </TextReveal>
                </span>

                <span
                  className="
                    text-[#8F6C1A]
                  "
                >
                  <ChevronRight />
                </span>
              </span>
            </Link>

            {/* =================================================
                JOIN NOW
            ================================================= */}

            <Link
              href={joinNowHref}
              className="
                flex

                h-[3.5rem]

                items-center
                justify-center

                gap-1

                rounded-[0.25rem]

                px-4

                text-white

                transition-colors
                duration-200

                hover:bg-white/[0.06]

                focus-visible:outline
                focus-visible:outline-2
                focus-visible:outline-offset-2
                focus-visible:outline-white
              "
            >
              <span
                className="
                  text-[1rem]
                  font-semibold
                  leading-[1.5rem]
                "
                style={{
                  fontFamily:
                    "var(--Font-family-Body, Inter)",

                  fontFeatureSettings:
                    "'liga' off, 'clig' off",
                }}
              >
                <TextReveal>
                Join now
                </TextReveal>
              </span>

              <ChevronRight />
            </Link>
          </div>
        </div>

        {/* =====================================================
            IMAGE STACK

            FINAL GEOMETRY:

            image1     y = 144px
            image2     y = 96px
            image3     y = 48px
            image4     y = 0px
            image5     y = 48px
            image6     y = 96px
            image7     y = 144px

            ENTRY ANIMATION:

            Each card initially begins LOWER than its
            final position.

            Center enters first, then expands outward.
        ====================================================== */}

        <div
          className="
            relative

            h-[20rem]
            w-full

            shrink-0

            overflow-visible

            md:h-[25rem]

            xl:h-[30.6875rem]
          "
          aria-hidden="true"
        >
          {/* =================================================
              MASTER STACK

              Desktop visual width:
              1572px / 98.25rem
          ================================================= */}

          <div
            className="
              absolute

              left-1/2
              top-0

              h-[35.6875rem]
              w-[98.25rem]

              origin-top

              -translate-x-1/2

              scale-[0.55]

              md:scale-[0.78]

              xl:scale-100
            "
          >
            {OTT_IMAGES.map(
              (image) => {
                const isCenter =
                  Boolean(
                    image.center,
                  );

                const imageIsLoaded =
                  loadedImages.has(image.src);

                const hiddenY =
                  isCenter ? 340 : 300;

                return (
                  <motion.div
                    key={image.src}

                    /* =========================================
                       FINAL ABSOLUTE POSITION

                       Keep the Figma geometry exactly the same.
                       Only transform/opacity animate.
                    ========================================== */

                    className="
                      absolute

                      w-[23.25rem]

                      overflow-hidden

                      rounded-[1rem]
                    "

                    style={{
                      left: image.left,
                      top: image.top,
                      zIndex: image.zIndex,

                      height: isCenter
                        ? "30.6875rem"
                        : "26.6875rem",

                      boxShadow:
                        "16px 0 16px 0 rgba(0,0,0,0.20), -16px 0 20px 0 rgba(0,0,0,0.20)",

                      backgroundColor: "#171717",

                      backfaceVisibility: "hidden",

                      willChange: prefersReducedMotion
                        ? undefined
                        : "transform, opacity",
                    }}

                    /*
                     * Important: do not reveal/animate a card until its
                     * image has finished loading. This removes the blank
                     * card / late image pop-in seen on slower production
                     * connections.
                     */
                    initial={
                      prefersReducedMotion
                        ? false
                        : {
                          y: hiddenY,
                          opacity: 0,
                        }
                    }

                    animate={
                      imageIsLoaded
                        ? {
                          y: 0,
                          opacity: 1,
                        }
                        : {
                          y: prefersReducedMotion
                            ? 0
                            : hiddenY,
                          opacity: 0,
                        }
                    }

                    transition={
                      prefersReducedMotion
                        ? { duration: 0 }
                        : {
                          delay: image.delay,

                          y: {
                            duration: 2.4,
                            ease: [0.22, 1, 0.36, 1],
                          },

                          opacity: {
                            duration: 0.55,
                            ease: "easeOut",
                          },
                        }
                    }
                  >
                    {isCenter ? (
                      /*
                       * Keep the original center-poster crop without
                       * assigning a custom height to an Image using fill.
                       * The wrapper owns the oversized geometry; the image
                       * simply fills that wrapper. This is valid in Next.js.
                       */
                      <div
                        className="absolute"
                        style={{
                          left: "-0.289px",
                          top: "-29.077px",
                          width: "100%",
                          height: "107.152%",
                        }}
                      >
                        <Image
                          src={image.src}
                          alt=""
                          fill
                          sizes="(min-width: 1280px) 372px, (min-width: 768px) 291px, 205px"
                          quality={75}
                          loading="eager"
                          fetchPriority="high"
                          draggable={false}
                          onLoad={() =>
                            markImageLoaded(image.src)
                          }
                          onError={() => {
                            console.error(
                              `[OttHeader] Failed to load ${image.src}. ` +
                                "Check that the file exists in public/images/ott and that filename casing matches production exactly.",
                            );
                          }}
                          className="
                            pointer-events-none
                            select-none
                          "
                          style={{
                            objectFit: "fill",
                          }}
                        />
                      </div>
                    ) : (
                      <Image
                        src={image.src}
                        alt=""
                        fill
                        sizes="(min-width: 1280px) 372px, (min-width: 768px) 291px, 205px"
                        quality={75}
                        loading="eager"
                        fetchPriority="auto"
                        draggable={false}
                        onLoad={() =>
                          markImageLoaded(image.src)
                        }
                        onError={() => {
                          console.error(
                            `[OttHeader] Failed to load ${image.src}. ` +
                              "Check that the file exists in public/images/ott and that filename casing matches production exactly.",
                          );
                        }}
                        className="
                          pointer-events-none
                          select-none
                        "
                        style={{
                          objectFit: "cover",
                          objectPosition: "50% 50%",
                        }}
                      />
                    )}
                  </motion.div>
                );
              },
            )}
          </div>
        </div>
      </div>
    </section>
  );
}