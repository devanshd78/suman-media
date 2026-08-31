"use client";

import Link from "next/link";
import { Plus_Jakarta_Sans } from "next/font/google";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { CmsCta } from "@/types/cms";

const exo2 = Plus_Jakarta_Sans({ subsets: ["latin"], weight: ["600"] });
const inter = Plus_Jakarta_Sans({ subsets: ["latin"], weight: ["400", "600"] });

function ArrowRightIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" className="h-4 w-4 shrink-0" fill="none">
      <path d="M3.5 8h8M8.5 5l3 3-3 3" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const wordVariants: Variants = {
  hidden: {
    opacity: 0,
    y: "0.7em",
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    y: "0em",
    filter: "blur(0px)",
    transition: {
      y: { type: "spring", stiffness: 120, damping: 18, mass: 0.8 },
      opacity: { duration: 0.45, ease: "easeOut" },
      filter: { duration: 0.55, ease: "easeOut" },
    },
  },
};

type AnimatedWordsProps = {
  as: "h2" | "p";
  className: string;
  delay?: number;
  id?: string;
  stagger?: number;
  text: string;
};

function AnimatedWords({
  as,
  className,
  delay = 0,
  id,
  stagger = 0.025,
  text,
}: AnimatedWordsProps) {
  const shouldReduceMotion = useReducedMotion();
  const MotionText = as === "h2" ? motion.h2 : motion.p;
  const words = text.split(/\s+/);
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
      initial={shouldReduceMotion ? "visible" : "hidden"}
      variants={containerVariants}
      viewport={{ once: true, amount: 0.3 }}
      whileInView="visible"
      style={{ fontFeatureSettings: '"liga" off, "clig" off' }}
    >
      <span aria-hidden="true">
        {words.map((word, index) => (
          <span key={`${word}-${index}`}>
            <motion.span className="inline-block will-change-transform" variants={wordVariants}>
              {word}
            </motion.span>
            {index < words.length - 1 ? " " : null}
          </span>
        ))}
      </span>
    </MotionText>
  );
}

type AboutSectionProps = {
  eyebrow?: string | null;
  heading?: string | null;
  description?: string | null;
  cta?: CmsCta | null;
};

export function AboutSection({ eyebrow, heading, description, cta }: AboutSectionProps) {
  const resolvedEyebrow = eyebrow?.trim() || "ABOUT SUMAN ENTERTAINMENT";
  const resolvedHeading =
    heading?.trim() ||
    "We're a team of creatives, music lovers and audio obsessives, developing products building India's Next Generation Media Ecosystem";
  const resolvedDescription =
    description?.trim() ||
    "Suman Entertainment & Media Pvt. Ltd. brings together digital platforms, premium content, music, technology, strategic communications, and enterprise partnerships to create, distribute, and scale media experiences across industries. From one of India's dedicated Marathi OTT platforms to government communication initiatives, original content production, music publishing, AI-powered technologies, and global partnerships, we're building an integrated ecosystem designed for the future of media.";
  const resolvedCta = { label: "LearnMore", href: cta?.href || "/services" };

  return (
    <section
      id="about-suman-entertainment"
      aria-labelledby="about-suman-heading"
      className="landing-section-transition mx-auto flex w-full max-w-full flex-col items-center gap-16 bg-black px-5 py-16 sm:px-8 sm:py-20 lg:gap-[6.25rem] lg:px-[3.5rem] lg:py-[6.25rem]"
    >
      <div className="grid w-full grid-cols-1 items-start gap-8 lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-[6.25rem]">
        <p
          data-landing-parallax-layer="reverse"
          className={`${inter.className} pt-1 text-[0.625rem] font-semibold uppercase leading-[0.875rem] tracking-[-0.00625rem] text-[#F9F7F4]`}
        >
          {resolvedEyebrow}
        </p>

        <div className="flex min-w-0 flex-col items-start">
          <AnimatedWords
            as="h2"
            id="about-suman-heading"
            text={resolvedHeading}
            className={`${exo2.className} w-full self-stretch text-[2rem] font-semibold leading-[2.5rem] tracking-[-0.03125rem] text-[#F9F7F4] sm:text-[2.25rem] sm:leading-[2.75rem] lg:text-[2.5rem] lg:leading-[3rem]`}
            stagger={0.035}
          />

          <AnimatedWords
            as="p"
            text={resolvedDescription}
            delay={0.1}
            stagger={0.018}
            className={`${inter.className} mt-8 w-full self-stretch text-[1.125rem] font-normal leading-6 text-[#969696] sm:text-[1.25rem] sm:leading-[1.625rem] lg:text-[1.5rem] lg:leading-[1.75rem]`}
          />

          <Link
            href={resolvedCta.href}
            className={`${inter.className} group mt-8 inline-flex cursor-pointer items-center gap-1.5 py-2 text-sm font-semibold leading-5 text-[#F9F7F4] transition-opacity hover:opacity-65 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F9F7F4]/50`}
          >
            <span>{resolvedCta.label}</span>
            <span className="transition-transform duration-200 group-hover:translate-x-1"><ArrowRightIcon /></span>
          </Link>
        </div>
      </div>
    </section>
  );
}
