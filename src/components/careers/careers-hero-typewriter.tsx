"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

import { plusJakartaSans } from "@/lib/fonts";

const EYEBROW = "CAREERS";
const HEADING = "Build What's Next With Us";
const DESCRIPTION =
  "Join a growing media, entertainment and technology ecosystem where ideas become stories, products, experiences and businesses.";

type TypewriterLineProps = {
  active: boolean;
  as: "h1" | "p";
  className: string;
  intervalMs: number;
  mode: "characters" | "words";
  persistCaret?: boolean;
  reduceMotion: boolean;
  startDelayMs: number;
  text: string;
};

function splitIntoTypingUnits(
  text: string,
  mode: TypewriterLineProps["mode"],
) {
  if (mode === "characters") {
    return Array.from(text);
  }

  return text.match(/\S+(?:\s+|$)/g) ?? [text];
}

function getSmartPause(text: string) {
  const typedText = text.trimEnd();

  if (typedText.endsWith("...")) {
    return 520;
  }

  if (/[.!?]$/.test(typedText)) {
    return 320;
  }

  if (/[,;:]$/.test(typedText)) {
    return 140;
  }

  return 0;
}

function TypewriterLine({
  active,
  as,
  className,
  intervalMs,
  mode,
  persistCaret = false,
  reduceMotion,
  startDelayMs,
  text,
}: TypewriterLineProps) {
  const units = useMemo(
    () => splitIntoTypingUnits(text, mode),
    [mode, text],
  );
  const [visibleUnitCount, setVisibleUnitCount] = useState(0);

  const animatedText = units
    .slice(0, visibleUnitCount)
    .join("");
  const displayedText = reduceMotion ? text : animatedText;
  const isComplete =
    reduceMotion || visibleUnitCount >= units.length;

  useEffect(() => {
    if (reduceMotion || !active || isComplete) {
      return;
    }

    const delay =
      visibleUnitCount === 0
        ? startDelayMs + intervalMs
        : intervalMs + getSmartPause(animatedText);

    const timeoutId = window.setTimeout(() => {
      setVisibleUnitCount((currentCount) =>
        Math.min(currentCount + 1, units.length),
      );
    }, delay);

    return () => window.clearTimeout(timeoutId);
  }, [
    active,
    animatedText,
    intervalMs,
    isComplete,
    reduceMotion,
    startDelayMs,
    units.length,
    visibleUnitCount,
  ]);

  const showCaret =
    !reduceMotion &&
    active &&
    visibleUnitCount > 0 &&
    (!isComplete || persistCaret);
  const trailLength = isComplete
    ? 0
    : Math.min(3, displayedText.length);
  const solidText = trailLength
    ? displayedText.slice(0, -trailLength)
    : displayedText;
  const trailText = trailLength
    ? displayedText.slice(-trailLength)
    : "";

  const content = (
    <>
      <span aria-hidden="true" className="invisible block">
        {text}
      </span>

      <span aria-hidden="true" className="absolute inset-0 block">
        {solidText}
        {trailText ? (
          <motion.span
            key={displayedText.length}
            initial={{ opacity: 0.55 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="bg-gradient-to-r from-[#C9A74A] to-[#8F6C1A] bg-clip-text text-transparent"
          >
            {trailText}
          </motion.span>
        ) : null}

        {showCaret ? (
          <motion.span
            aria-hidden="true"
            className="ml-[0.08em] inline-block h-[0.88em] w-[0.055em] translate-y-[0.08em] rounded-full bg-[#8F6C1A] align-baseline shadow-[0_0_0.5rem_rgba(143,108,26,0.32)]"
            initial={{ opacity: 1 }}
            animate={{ opacity: [1, 1, 0, 0, 1] }}
            transition={{
              duration: 1,
              ease: "linear",
              repeat: Number.POSITIVE_INFINITY,
              times: [0, 0.45, 0.5, 0.95, 1],
            }}
          />
        ) : null}
      </span>
    </>
  );

  const sharedProps = {
    "aria-label": text,
    className: `relative ${className}`,
    style: {
      fontFeatureSettings: '"liga" off, "clig" off',
    },
  };

  if (as === "h1") {
    return <h1 {...sharedProps}>{content}</h1>;
  }

  return <p {...sharedProps}>{content}</p>;
}

export function CareersHeroTypewriter() {
  const rootRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(rootRef, {
    margin: "100px 0px",
  });
  const reduceMotion = useReducedMotion() ?? false;

  return (
    <div
      ref={rootRef}
      className="flex w-full flex-col items-center gap-4"
    >
      <TypewriterLine
        active={isInView}
        as="p"
        text={EYEBROW}
        mode="characters"
        startDelayMs={120}
        intervalMs={45}
        reduceMotion={reduceMotion}
        className={`${plusJakartaSans.className} w-full text-center text-[0.875rem] font-semibold leading-[1.25rem] text-[rgba(0,9,51,0.65)]`}
      />

      <TypewriterLine
        active={isInView}
        as="h1"
        text={HEADING}
        mode="characters"
        startDelayMs={600}
        intervalMs={42}
        reduceMotion={reduceMotion}
        className={`${plusJakartaSans.className} w-full text-center text-[2rem] font-semibold leading-[2.5rem] tracking-[-0.03125rem] text-black lg:text-[2.5rem] lg:leading-[3rem]`}
      />

      <TypewriterLine
        active={isInView}
        as="p"
        text={DESCRIPTION}
        mode="words"
        startDelayMs={1760}
        intervalMs={90}
        persistCaret
        reduceMotion={reduceMotion}
        className={`${plusJakartaSans.className} w-full max-w-[37.125rem] text-center text-base font-normal leading-6 text-[#969696]`}
      />
    </div>
  );
}
