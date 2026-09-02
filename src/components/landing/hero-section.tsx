"use client";

import {
  Fragment,
} from "react";

import Link from "next/link";

import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";

import {
  inter,
  plusJakartaSans,
} from "@/lib/fonts";

import type {
  CmsHero,
} from "@/types/cms";

/* ============================================================
   DEFAULT CONTENT
   ============================================================ */

const DEFAULT_HERO_VIDEO =
  "/videos/MediaVedio.mp4";

const DEFAULT_EYEBROW =
  "DIGITAL ENTERTAINMENT & PLATFORM";

const DEFAULT_HEADING =
  "Abhijat Marathi OTT";

const DEFAULT_DESCRIPTION =
  "A dedicated Marathi OTT platform bringing regional stories, films and content to audiences worldwide.";

/* ============================================================
   ANIMATION
   ============================================================ */

const textUnitVariants: Variants = {
  hidden: {
    opacity: 0,
    y: "100%",
  },

  visible: {
    opacity: 1,
    y: "0%",

    transition: {
      type: "spring",
      stiffness: 500,
      damping: 60,
      mass: 2,
    },
  },
};

/* ============================================================
   UTILS
   ============================================================ */

function textOrFallback(
  value: string | null | undefined,
  fallback: string,
) {
  return value?.trim() || fallback;
}

/* ============================================================
   ANIMATED TEXT
   ============================================================ */

type AnimatedTextProps = {
  as: "h1" | "p";
  className: string;
  delay?: number;
  reducedMotion: boolean;
  split: "characters" | "words";
  stagger?: number;
  text: string;
};

function AnimatedText({
  as,
  className,
  delay = 0,
  reducedMotion,
  split,
  stagger = 0.025,
  text,
}: AnimatedTextProps) {
  const MotionText =
    as === "h1"
      ? motion.h1
      : motion.p;

  const words = text
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  const unitCount =
    split === "characters"
      ? Array.from(
          text.replace(/\s/g, ""),
        ).length
      : words.length;

  /*
   * Prevent extremely long CMS text from creating
   * an excessively long stagger sequence.
   */
  const effectiveStagger =
    Math.min(
      stagger,
      1 /
        Math.max(
          unitCount,
          1,
        ),
    );

  const containerVariants: Variants = {
    hidden: {},

    visible: {
      transition: {
        delayChildren: delay,
        staggerChildren:
          effectiveStagger,
      },
    },
  };

  return (
    <MotionText
      aria-label={text}
      className={className}
      initial={
        reducedMotion
          ? false
          : "hidden"
      }
      animate="visible"
      variants={containerVariants}
      style={{
        fontFeatureSettings:
          '"liga" off, "clig" off',
      }}
    >
      <span aria-hidden="true">
        {words.map(
          (
            word,
            wordIndex,
          ) => (
            <Fragment
              key={`${word}-${wordIndex}`}
            >
              {split ===
              "characters" ? (
                <span
                  className="
                    inline-block
                    whitespace-nowrap
                  "
                >
                  {Array.from(
                    word,
                  ).map(
                    (
                      character,
                      characterIndex,
                    ) => (
                      <span
                        key={`${character}-${characterIndex}`}
                        className="
                          inline-block
                          overflow-hidden
                          align-bottom
                        "
                      >
                        <motion.span
                          className="
                            inline-block
                            will-change-transform
                          "
                          variants={
                            reducedMotion
                              ? undefined
                              : textUnitVariants
                          }
                        >
                          {
                            character
                          }
                        </motion.span>
                      </span>
                    ),
                  )}
                </span>
              ) : (
                <span
                  className="
                    inline-block
                    overflow-hidden
                    align-bottom
                  "
                >
                  <motion.span
                    className="
                      inline-block
                      will-change-transform
                    "
                    variants={
                      reducedMotion
                        ? undefined
                        : textUnitVariants
                    }
                  >
                    {word}
                  </motion.span>
                </span>
              )}

              {wordIndex <
              words.length - 1
                ? " "
                : null}
            </Fragment>
          ),
        )}
      </span>
    </MotionText>
  );
}

/* ============================================================
   ICON
   ============================================================ */

function CaretRightIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 8 14"
      fill="none"
      className="
        h-3
        w-1.5
        shrink-0
      "
    >
      <path
        d="M1 13L7 7L1 1"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ============================================================
   HERO SECTION
   ============================================================ */

export function HeroSection({
  content,
}: {
  content?: CmsHero | null;
}) {
  const shouldReduceMotion =
    useReducedMotion() ?? false;

  /* ----------------------------------------------------------
     CMS CONTENT
     ---------------------------------------------------------- */

  const videoUrl =
    textOrFallback(
      content?.videoUrl,
      DEFAULT_HERO_VIDEO,
    );

  const eyebrow =
    textOrFallback(
      content?.eyebrow,
      DEFAULT_EYEBROW,
    );

  const heading =
    textOrFallback(
      content?.heading,
      DEFAULT_HEADING,
    );

  const description =
    textOrFallback(
      content?.description,
      DEFAULT_DESCRIPTION,
    );

  const learnMoreLabel =
    textOrFallback(
      content?.learnMoreCta
        ?.label,
      "Learn more",
    );

  const learnMoreHref =
    textOrFallback(
      content?.learnMoreCta
        ?.href,
      "/companies/abhijat-marathi",
    );

  const joinNowLabel =
    textOrFallback(
      content?.joinNowCta?.label,
      "Join now",
    );

  const joinNowHref =
    textOrFallback(
      content?.joinNowCta?.href,
      "/contact",
    );

  return (
    <section
      aria-label="Suman featured platform"
      className="
        landing-section-transition

        relative
        flex
        min-h-[100svh]
        w-full
        items-end
        overflow-hidden
        bg-black
        text-white

        px-5

        pb-[3rem]
        pt-[6.5rem]

        sm:px-8
        sm:pb-[4rem]
        sm:pt-[7.5rem]

        md:pb-[4.5rem]

        lg:px-[3.5rem]
        lg:pb-[clamp(4.5rem,7vw,6.5rem)]
        lg:pt-[8rem]
      "
    >
      {/* ======================================================
          BACKGROUND VIDEO
          ====================================================== */}

      <video
        key={videoUrl}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
        tabIndex={-1}
        className="
          pointer-events-none
          absolute
          inset-0
          h-full
          w-full
          select-none
          object-cover
          object-center
        "
      >
        <source
          src={videoUrl}
          type="video/mp4"
        />
      </video>

      {/* ======================================================
          VIDEO OVERLAYS

          Bottom gradient provides text readability.
          Radial gradient darkens the sides without making
          the entire video look artificially dark.
          ====================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0

          bg-[linear-gradient(180deg,rgba(0,0,0,0.08)_0%,rgba(0,0,0,0.14)_34%,rgba(0,0,0,0.48)_67%,rgba(0,0,0,0.94)_100%)]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0

          bg-[radial-gradient(90%_85%_at_76%_20%,rgba(0,0,0,0)_35%,rgba(0,0,0,0.48)_100%)]
        "
      />

      {/* ======================================================
          HERO CONTENT
          ====================================================== */}

      <div
        data-landing-text-reveal-skip
        className="
          relative
          z-10

          mx-auto
          flex
          w-full
          max-w-[83rem]
          flex-col
          items-start
        "
      >
        {/* ====================================================
            EYEBROW

            Plus Jakarta / Inter
            14px desktop
            600
            20px
            inverse white
            ==================================================== */}

        <AnimatedText
          as="p"
          text={`01. ${eyebrow}`}
          split="words"
          delay={0.08}
          stagger={0.06}
          reducedMotion={
            shouldReduceMotion
          }
          className={`
            ${inter.className}

            max-w-full

            text-[0.6875rem]
            font-semibold
            uppercase
            leading-[1rem]
            tracking-[0.01em]
            text-[#F9F9F9]

            sm:text-[0.75rem]
            sm:leading-[1.125rem]

            lg:text-[0.875rem]
            lg:leading-[1.25rem]
          `}
        />

        {/* ====================================================
            MAIN HEADING
            ==================================================== */}

        <AnimatedText
          as="h1"
          text={heading}
          split="characters"
          delay={0.18}
          stagger={0.045}
          reducedMotion={
            shouldReduceMotion
          }
          className={`
            ${plusJakartaSans.className}

            mt-2
            w-full
            max-w-full

            break-words

            text-[2.5rem]
            font-semibold
            leading-[1.08]
            tracking-[-0.03125rem]
            text-[#F9F9F9]

            min-[390px]:text-[2.75rem]

            sm:mt-2.5
            sm:text-[3rem]
            sm:leading-[1.08]

            md:text-[3.25rem]

            lg:text-[3.5rem]
            lg:leading-[4rem]
            lg:tracking-[-0.0625rem]

            xl:text-[3.75rem]
          `}
        />

        {/* ====================================================
            DESCRIPTION
            ==================================================== */}

        <AnimatedText
          as="p"
          text={description}
          split="words"
          delay={0.85}
          stagger={0.045}
          reducedMotion={
            shouldReduceMotion
          }
          className={`
            ${plusJakartaSans.className}

            mt-3
            w-full
            max-w-[32.125rem]

            text-[0.9375rem]
            font-normal
            leading-[1.5rem]
            text-[#B8B8B8]

            sm:mt-4
            sm:text-[1.0625rem]
            sm:leading-[1.625rem]

            lg:text-[1.25rem]
            lg:leading-[1.75rem]
            lg:text-[#969696]
          `}
        />

        {/* ====================================================
            CTA GROUP

            Mobile:
            stacked for correct width / touch area.

            Tablet+:
            side by side.

            First button:
            #FFF
            4px radius

            Second button:
            transparent
            ==================================================== */}

        <motion.div
          className="
            mt-6

            grid
            w-full
            max-w-[28rem]
            grid-cols-1

            gap-2

            sm:grid-cols-2
            sm:gap-0

            lg:mt-7
          "
          initial={
            shouldReduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 40,
                }
          }
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={
            shouldReduceMotion
              ? {
                  duration: 0,
                }
              : {
                  type: "spring",
                  stiffness: 350,
                  damping: 60,
                  mass: 2,
                  delay: 1.3,
                }
          }
        >
          {/* ==================================================
              PRIMARY CTA
              ================================================== */}

          <Link
            href={learnMoreHref}
            className={`
              ${inter.className}

              group

              inline-flex
              min-h-[3.5rem]
              w-full
              items-center
              justify-center
              gap-2.5

              rounded-[0.25rem]
              bg-[#FFFFFF]

              px-4
              py-4

              text-center
              text-[1rem]
              font-semibold
              leading-[1.5rem]
              text-[#8F6C1A]

              transition-[background-color,transform]
              duration-200

              hover:-translate-y-[1px]
              hover:bg-[#F9F9F9]

              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-white
              focus-visible:ring-offset-2
              focus-visible:ring-offset-transparent
            `}
            style={{
              fontFeatureSettings:
                '"liga" off, "clig" off',
            }}
          >
            <span>
              {learnMoreLabel}
            </span>

            <span
              aria-hidden="true"
              className="
                inline-flex
                shrink-0
                items-center
                justify-center

                transition-transform
                duration-200

                group-hover:translate-x-1
              "
            >
              <CaretRightIcon />
            </span>
          </Link>

          {/* ==================================================
              SECONDARY CTA

              Transparent — no permanent background.
              ================================================== */}

          <Link
            href={joinNowHref}
            className={`
              ${inter.className}

              group

              inline-flex
              min-h-[3.5rem]
              w-full
              items-center
              justify-center
              gap-2.5

              rounded-[0.25rem]
              bg-transparent

              px-4
              py-4

              text-center
              text-[1rem]
              font-semibold
              leading-[1.5rem]
              text-[#F9F9F9]

              transition-[background-color,transform]
              duration-200

              hover:bg-white/10

              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-white
              focus-visible:ring-offset-2
              focus-visible:ring-offset-transparent
            `}
            style={{
              fontFeatureSettings:
                '"liga" off, "clig" off',
            }}
          >
            <span>
              {joinNowLabel}
            </span>

            <span
              aria-hidden="true"
              className="
                inline-flex
                shrink-0
                items-center
                justify-center

                transition-transform
                duration-200

                group-hover:translate-x-1
              "
            >
              <CaretRightIcon />
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}