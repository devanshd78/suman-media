"use client";

import { Fragment } from "react";
import Link from "next/link";
import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";

import { inter, plusJakartaSans } from "@/lib/fonts";
import type { CmsHero } from "@/types/cms";

const DEFAULT_HERO_VIDEO = "/videos/MediaVedio.mp4";
const DEFAULT_EYEBROW = "DIGITAL ENTERTAINMENT & PLATFORM";
const DEFAULT_HEADING = "Abhijat Marathi OTT";
const DEFAULT_DESCRIPTION =
  "A dedicated Marathi OTT platform bringing regional stories, films and content to audiences worldwide.";

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

function textOrFallback(value: string | null | undefined, fallback: string) {
  return value?.trim() || fallback;
}

type AnimatedTextProps = {
  as: "h1" | "p";
  className: string;
  delay: number;
  reducedMotion: boolean;
  split: "characters" | "words";
  stagger: number;
  text: string;
};

function AnimatedText({
  as,
  className,
  delay,
  reducedMotion,
  split,
  stagger,
  text,
}: AnimatedTextProps) {
  const MotionText = as === "h1" ? motion.h1 : motion.p;
  const words = text.split(/\s+/).filter(Boolean);
  const unitCount =
    split === "characters"
      ? Array.from(text.replace(/\s/g, "")).length
      : words.length;
  const effectiveStagger = Math.min(stagger, 1 / Math.max(unitCount, 1));
  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        delayChildren: delay,
        staggerChildren: effectiveStagger,
      },
    },
  };

  return (
    <MotionText
      aria-label={text}
      className={className}
      initial={reducedMotion ? false : "hidden"}
      animate="visible"
      variants={containerVariants}
      style={{ fontFeatureSettings: '"liga" off, "clig" off' }}
    >
      <span aria-hidden="true">
        {words.map((word, wordIndex) => (
          <Fragment key={`${word}-${wordIndex}`}>
            {split === "characters" ? (
              <span className="inline-block whitespace-nowrap">
                {Array.from(word).map((character, characterIndex) => (
                  <span
                    key={`${character}-${characterIndex}`}
                    className="inline-block overflow-hidden align-bottom"
                  >
                    <motion.span
                      className="inline-block will-change-transform"
                      variants={textUnitVariants}
                    >
                      {character}
                    </motion.span>
                  </span>
                ))}
              </span>
            ) : (
              <span className="inline-block overflow-hidden align-bottom">
                <motion.span
                  className="inline-block will-change-transform"
                  variants={textUnitVariants}
                >
                  {word}
                </motion.span>
              </span>
            )}
            {wordIndex < words.length - 1 ? " " : null}
          </Fragment>
        ))}
      </span>
    </MotionText>
  );
}

function CaretRightIcon() {
  return (
    <svg
      aria-hidden="true"
      width="8"
      height="14"
      viewBox="0 0 8 14"
      fill="none"
      className="h-3 w-1.5 shrink-0"
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

export function HeroSection({ content }: { content?: CmsHero | null }) {
  const shouldReduceMotion = useReducedMotion() ?? false;
  const videoUrl = textOrFallback(content?.videoUrl, DEFAULT_HERO_VIDEO);
  const eyebrow = textOrFallback(content?.eyebrow, DEFAULT_EYEBROW);
  const heading = textOrFallback(content?.heading, DEFAULT_HEADING);
  const description = textOrFallback(content?.description, DEFAULT_DESCRIPTION);
  const learnMoreLabel = textOrFallback(content?.learnMoreCta?.label, "Learn more");
  const learnMoreHref = textOrFallback(
    content?.learnMoreCta?.href,
    "/companies/abhijat-marathi",
  );
  const joinNowLabel = textOrFallback(content?.joinNowCta?.label, "Join now");
  const joinNowHref = textOrFallback(content?.joinNowCta?.href, "/contact");

  return (
    <section
      aria-label="Suman featured platform"
      className="landing-section-transition relative flex min-h-[100svh] w-full items-end overflow-hidden bg-black px-5 pb-[clamp(3.5rem,7vw,6.5rem)] pt-28 text-white sm:px-8 sm:pt-32 lg:px-[3.5rem]"
    >
      <video
        key={videoUrl}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
        tabIndex={-1}
        className="pointer-events-none absolute inset-0 h-full w-full select-none object-cover object-center"
      >
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support background video.
      </video>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.08)_0%,rgba(0,0,0,0.18)_38%,rgba(0,0,0,0.92)_100%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_85%_at_76%_20%,rgba(0,0,0,0)_35%,rgba(0,0,0,0.48)_100%)]"
      />

      <div
        data-landing-text-reveal-skip
        className="relative z-10 mx-auto flex w-full max-w-[83rem] flex-col items-start"
      >
        <AnimatedText
          as="p"
          text={`01. ${eyebrow}`}
          split="words"
          delay={0.08}
          stagger={0.06}
          reducedMotion={shouldReduceMotion}
          className={`${inter.className} text-[0.66rem] font-semibold uppercase leading-4 tracking-[0.01em] text-white sm:text-[0.72rem]`}
        />

        <AnimatedText
          as="h1"
          text={heading}
          split="characters"
          delay={0.18}
          stagger={0.045}
          reducedMotion={shouldReduceMotion}
          className={`${plusJakartaSans.className} mt-2 self-stretch text-[clamp(2.5rem,5vw,3.5rem)] font-bold leading-[1.08] tracking-[-0.0625rem] text-white sm:leading-[4rem]`}
        />

        <AnimatedText
          as="p"
          text={description}
          split="words"
          delay={0.9}
          stagger={0.045}
          reducedMotion={shouldReduceMotion}
          className={`${plusJakartaSans.className} mt-3 w-full max-w-[32.125rem] text-[1.125rem] font-normal leading-7 text-[#969696] sm:text-[1.25rem]`}
        />

        <motion.div
          className="mt-6 grid w-full max-w-[25rem] grid-cols-2"
          initial={
            shouldReduceMotion
              ? false
              : { opacity: 0, y: 40 }
          }
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 350,
            damping: 60,
            mass: 2,
            delay: 1.35,
          }}
        >
          <Link
            href={learnMoreHref}
            className={`${inter.className} group inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-lg bg-white px-4 py-4 text-center text-base font-semibold leading-6 text-[#8F6C1A] transition-colors hover:bg-[#f4f1e8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white`}
          >
            <span>{learnMoreLabel}</span>
            <span className="transition-transform duration-200 group-hover:translate-x-1">
              <CaretRightIcon />
            </span>
          </Link>

          <Link
            href={joinNowHref}
            className={`${inter.className} group inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-lg px-4 py-4 text-center text-base font-semibold leading-6 text-[#F9F9F9] transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white`}
          >
            <span>{joinNowLabel}</span>
            <span className="transition-transform duration-200 group-hover:translate-x-1">
              <CaretRightIcon />
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
