"use client";

import Link from "next/link";

import {
  plusJakartaSans as bodyFont,
  plusJakartaSans as headingFont,
} from "@/lib/fonts";

import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";

import type {
  CmsCta,
} from "@/types/cms";

/* ============================================================
   TYPES
   ============================================================ */

type AboutSectionProps = {
  eyebrow?: string | null;
  heading?: string | null;
  description?: string | null;
  cta?: CmsCta | null;
};

type AnimatedWordsProps = {
  as: "h2" | "p";
  className?: string;
  delay?: number;
  id?: string;
  stagger?: number;
  text: string;
};

/* ============================================================
   ICON
   ============================================================ */

function ArrowRightIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      fill="none"
      className="
        h-4
        w-4
        shrink-0
      "
    >
      <path
        d="M3.5 8h8M8.5 5l3 3-3 3"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ============================================================
   WORD REVEAL
   ============================================================ */

const wordVariants: Variants = {
  hidden: {
    opacity: 0,
    y: "0.65em",
    filter: "blur(7px)",
  },

  visible: {
    opacity: 1,
    y: "0em",
    filter: "blur(0px)",

    transition: {
      y: {
        type: "spring",
        stiffness: 120,
        damping: 18,
        mass: 0.8,
      },

      opacity: {
        duration: 0.45,
        ease: "easeOut",
      },

      filter: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  },
};

/* ============================================================
   ANIMATED WORDS
   ============================================================ */

function AnimatedWords({
  as,
  className = "",
  delay = 0,
  id,
  stagger = 0.025,
  text,
}: AnimatedWordsProps) {
  const shouldReduceMotion =
    useReducedMotion() ?? false;

  const MotionText =
    as === "h2"
      ? motion.h2
      : motion.p;

  const words = text
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  const containerVariants: Variants = {
    hidden: {},

    visible: {
      transition: {
        delayChildren: delay,
        staggerChildren: stagger,
      },
    },
  };

  return (
    <MotionText
      id={id}
      aria-label={text}
      className={className}
      initial={
        shouldReduceMotion
          ? "visible"
          : "hidden"
      }
      whileInView="visible"
      variants={containerVariants}
      viewport={{
        once: true,
        amount: 0.2,
      }}
      style={{
        fontFeatureSettings:
          '"liga" off, "clig" off',
      }}
    >
      <span aria-hidden="true">
        {words.map(
          (
            word,
            index,
          ) => (
            <span
              key={`${word}-${index}`}
              className="inline"
            >
              <motion.span
                className="
                  inline-block
                  will-change-[transform,opacity,filter]
                "
                variants={
                  shouldReduceMotion
                    ? undefined
                    : wordVariants
                }
              >
                {word}
              </motion.span>

              {index <
              words.length - 1
                ? " "
                : null}
            </span>
          ),
        )}
      </span>
    </MotionText>
  );
}

/* ============================================================
   ABOUT SECTION
   ============================================================ */

export function AboutSection({
  eyebrow,
  heading,
  description,
  cta,
}: AboutSectionProps) {
  const resolvedEyebrow =
    eyebrow?.trim() ||
    "ABOUT SUMAN ENTERTAINMENT";

  const resolvedHeading =
    heading?.trim() ||
    "We're a team of creatives, music lovers and audio obsessives, developing products building India's Next Generation Media Ecosystem";

  const resolvedDescription =
    description?.trim() ||
    "Suman Entertainment & Media Pvt. Ltd. brings together digital platforms, premium content, music, technology, strategic communications, and enterprise partnerships to create, distribute, and scale media experiences across industries. From one of India's dedicated Marathi OTT platforms to government communication initiatives, original content production, music publishing, AI-powered technologies, and global partnerships, we're building an integrated ecosystem designed for the future of media.";

  const resolvedCta = {
    label:
      cta?.label?.trim() ||
      "Learn more",

    href:
      cta?.href?.trim() ||
      "/services",
  };

  return (
    <section
      id="about-suman-entertainment"
      aria-labelledby="about-suman-heading"
      className="
        landing-section-transition

        mx-auto
        w-full
        max-w-full
        overflow-hidden
        bg-black

        px-5
        py-16

        sm:px-8
        sm:py-20

        lg:px-[3.5rem]
        lg:py-[6.25rem]
      "
    >
      <div
        className="
          grid
          w-full
          grid-cols-1
          items-start

          gap-y-7

          sm:gap-y-8

          lg:grid-cols-[14rem_minmax(0,1fr)]
          lg:gap-x-[6.25rem]
          lg:gap-y-0

          xl:grid-cols-[15rem_minmax(0,1fr)]
        "
      >
        {/* ====================================================
            EYEBROW

            Desktop:
            Plus Jakarta Sans
            14px / 20px
            600
            #B8B8B8
            ==================================================== */}

        <p
          data-landing-parallax-layer="reverse"
          className={`
            ${headingFont.className}

            m-0
            max-w-full

            text-[0.75rem]
            font-semibold
            uppercase
            leading-[1.125rem]
            text-[#B8B8B8]

            sm:text-[0.8125rem]
            sm:leading-[1.1875rem]

            lg:pt-1
            lg:text-[0.875rem]
            lg:leading-[1.25rem]
          `}
          style={{
            fontFeatureSettings:
              '"liga" off, "clig" off',
          }}
        >
          {resolvedEyebrow}
        </p>

        {/* ====================================================
            RIGHT CONTENT
            ==================================================== */}

        <div
          className="
            flex
            min-w-0
            w-full
            flex-col
            items-start
          "
        >
          {/* ==================================================
              HEADING

              Desktop:
              Plus Jakarta Sans
              40px / 48px
              700
              -0.5px
              #F9F7F4
              ================================================== */}

          <AnimatedWords
            as="h2"
            id="about-suman-heading"
            text={resolvedHeading}
            stagger={0.035}
            className={`
              ${headingFont.className}

              m-0
              w-full
              max-w-full

              break-words

              text-[1.75rem]
              font-bold
              leading-[2.125rem]
              tracking-[-0.025rem]
              text-[#F9F7F4]

              min-[390px]:text-[1.875rem]
              min-[390px]:leading-[2.25rem]

              sm:text-[2.125rem]
              sm:leading-[2.625rem]
              sm:tracking-[-0.03125rem]

              lg:text-[2.5rem]
              lg:leading-[3rem]

              xl:max-w-[65rem]
            `}
          />

          {/* ==================================================
              DESCRIPTION

              Desktop:
              Plus Jakarta Sans
              20px / 28px
              400
              #969696
              ================================================== */}

          <AnimatedWords
            as="p"
            text={resolvedDescription}
            delay={0.1}
            stagger={0.018}
            className={`
              ${bodyFont.className}

              mt-6
              w-full
              max-w-full

              break-words

              text-[0.9375rem]
              font-normal
              leading-[1.5rem]
              text-[#969696]

              sm:mt-7
              sm:text-[1.0625rem]
              sm:leading-[1.625rem]

              lg:mt-8
              lg:text-[1.25rem]
              lg:leading-[1.75rem]

              xl:max-w-[68rem]
            `}
          />

          {/* ==================================================
              CTA
              ================================================== */}

          <Link
            href={resolvedCta.href}
            className={`
              ${bodyFont.className}

              group

              mt-6
              inline-flex
              min-h-11
              max-w-full
              cursor-pointer
              items-center
              justify-center
              gap-1.5

              rounded-[0.25rem]

              px-0
              py-2

              text-[0.875rem]
              font-semibold
              leading-[1.25rem]
              text-[#F9F7F4]

              transition-opacity
              duration-200

              hover:opacity-65

              focus-visible:rounded-[0.25rem]
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-[#F9F7F4]/50
              focus-visible:ring-offset-2
              focus-visible:ring-offset-black

              sm:mt-7
              sm:text-[0.9375rem]
              sm:leading-[1.375rem]

              lg:mt-8
              lg:min-h-10
              lg:text-[0.875rem]
              lg:leading-[1.25rem]
            `}
            style={{
              fontFeatureSettings:
                '"liga" off, "clig" off',
            }}
          >
            <span className="truncate">
              {resolvedCta.label}
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
              <ArrowRightIcon />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}