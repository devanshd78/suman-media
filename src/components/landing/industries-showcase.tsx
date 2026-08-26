"use client";

import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef } from "react";

import { Premium3DSurface } from "@/components/motion/premium-3d";
import type { CmsFeaturedIndustry } from "@/types/cms";

type IndustryCardProps = {
  industry: CmsFeaturedIndustry;
  index: number;
};

const CARD_TONES = [
  {
    base: "radial-gradient(circle at 48% 28%, #E4C86D 0%, #947015 45%, #463204 100%)",
    glow: "rgba(226,187,95,0.28)",
    edge: "rgba(255,237,187,0.30)",
  },
  {
    base: "radial-gradient(circle at 45% 26%, #A95D69 0%, #6B2232 48%, #2A0C16 100%)",
    glow: "rgba(201,155,54,0.18)",
    edge: "rgba(246,216,176,0.24)",
  },
  {
    base: "radial-gradient(circle at 52% 25%, #4B9192 0%, #175A5E 48%, #082D30 100%)",
    glow: "rgba(226,187,95,0.18)",
    edge: "rgba(230,242,233,0.22)",
  },
  {
    base: "radial-gradient(circle at 50% 28%, #CE8B54 0%, #9C5123 46%, #48200F 100%)",
    glow: "rgba(255,220,167,0.20)",
    edge: "rgba(255,239,214,0.22)",
  },
] as const;

function IndustryCard({
  industry,
  index,
}: IndustryCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const direction = index % 2 === 0 ? -1 : 1;
  const tone = CARD_TONES[index % CARD_TONES.length];

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    mass: 0.7,
  });

  const rotateY = useTransform(
    smoothProgress,
    [0, 0.5, 1],
    [direction * 26, 0, direction * -14],
  );

  const rotateZ = useTransform(
    smoothProgress,
    [0, 0.5, 1],
    [direction * 5, 0, direction * -2],
  );

  const x = useTransform(
    smoothProgress,
    [0, 0.5, 1],
    [direction * 80, 0, direction * -35],
  );

  const y = useTransform(
    smoothProgress,
    [0, 0.5, 1],
    [55, 0, -30],
  );

  const scale = useTransform(
    smoothProgress,
    [0, 0.5, 1],
    [0.86, 1, 0.94],
  );

  const opacity = useTransform(
    smoothProgress,
    [0, 0.18, 0.82, 1],
    [0, 1, 1, 0.6],
  );

  const number = String(index + 1).padStart(2, "0");

  return (
    <div ref={cardRef}>
      <Premium3DSurface
        className="rounded-[2rem]"
        surfaceClassName="rounded-[2rem]"
        intensity={reduceMotion ? 0 : 3.8}
        lift={10}
        perspective={1450}
      >
        <article
          className="premium-3d-shadow heritage-inlay relative min-h-[38rem] overflow-hidden rounded-[2rem] lg:min-h-[46rem] [transform-style:preserve-3d]"
          style={{ background: tone.base }}
        >
          {/* Multi-plane lighting */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.20),transparent_34%,rgba(0,0,0,0.22))]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-[12%] top-[8%] h-[34rem] w-[34rem] rounded-full blur-3xl"
            style={{ background: tone.glow }}
          />
          <div
            aria-hidden="true"
            className="absolute inset-5 rounded-[1.45rem] border"
            style={{
              borderColor: tone.edge,
              transform: "translateZ(22px)",
            }}
          />

          {/* Paithani-inspired floating inlay */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-[7%] top-[7%] hidden h-28 w-28 rotate-45 border sm:block lg:h-40 lg:w-40"
            style={{
              borderColor: tone.edge,
              transform: "translateZ(48px) rotate(45deg)",
            }}
          >
            <span
              className="absolute inset-[24%] border"
              style={{ borderColor: tone.edge }}
            />
            <span
              className="absolute inset-[43%] bg-white/50"
              style={{ boxShadow: `0 0 2rem ${tone.glow}` }}
            />
          </div>

          {/* Number / copy plane */}
          <div
            className="relative z-20 flex h-full min-h-[38rem] flex-col justify-between p-6 sm:p-8 lg:min-h-[46rem] lg:p-10 [transform:translateZ(62px)]"
          >
            <div className="flex items-start justify-between">
              <span className="text-xs font-medium tracking-[0.12em] text-white/72">
                {number}
              </span>

              <span className="text-xs uppercase tracking-[0.12em] text-white/68">
                Industry
              </span>
            </div>

            <div className="relative z-20 max-w-md">
              <h3 className="text-3xl font-semibold tracking-[-0.03em] text-white [text-shadow:0_1rem_2.5rem_rgba(0,0,0,0.22)] sm:text-4xl lg:text-5xl">
                {industry.title}
              </h3>

              {industry.shortDescription ? (
                <p className="mt-4 max-w-sm text-sm leading-6 text-white/76 sm:text-base">
                  {industry.shortDescription}
                </p>
              ) : null}

              {industry.slug ? (
                <Link
                  href={`/industries/${industry.slug}`}
                  className="kinetic-link mt-6 inline-flex text-sm font-medium text-white transition-opacity hover:opacity-70"
                >
                  Explore industry →
                </Link>
              ) : null}
            </div>
          </div>

          {/* Rotating CMS artwork on a higher Z plane */}
          {industry.imageUrl ? (
            <motion.div
              aria-hidden="true"
              style={{
                rotateY: reduceMotion ? 0 : rotateY,
                rotateZ: reduceMotion ? 0 : rotateZ,
                x: reduceMotion ? 0 : x,
                y: reduceMotion ? 0 : y,
                scale: reduceMotion ? 1 : scale,
                opacity: reduceMotion ? 1 : opacity,
                transformPerspective: 1200,
                transformStyle: "preserve-3d",
              }}
              className="pointer-events-none absolute left-1/2 top-[10%] z-10 h-[68%] w-[80%] -translate-x-1/2 sm:w-[72%] lg:left-auto lg:right-[2%] lg:top-[8%] lg:h-[76%] lg:w-[58%] lg:translate-x-0"
            >
              <div className="relative h-full w-full [transform:translateZ(105px)]">
                <Image
                  src={industry.imageUrl}
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 80vw, 55vw"
                  className="object-contain drop-shadow-[0_2.6rem_4.8rem_rgba(0,0,0,0.38)]"
                />
              </div>
            </motion.div>
          ) : null}
        </article>
      </Premium3DSurface>
    </div>
  );
}

export function IndustriesShowcase({
  industries,
}: {
  industries: CmsFeaturedIndustry[];
}) {
  if (!industries.length) return null;

  return (
    <div className="space-y-8 lg:space-y-12">
      {industries.map((industry, index) => (
        <IndustryCard
          key={industry._id}
          industry={industry}
          index={index}
        />
      ))}
    </div>
  );
}
