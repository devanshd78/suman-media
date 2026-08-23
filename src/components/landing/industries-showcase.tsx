"use client";

import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  useRef,
  type CSSProperties,
} from "react";

import type { CmsFeaturedIndustry } from "@/types/cms";

type IndustryCardProps = {
  industry: CmsFeaturedIndustry;
  index: number;
};

function IndustryCard({
  industry,
  index,
}: IndustryCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const direction = index % 2 === 0 ? -1 : 1;

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(
    scrollYProgress,
    {
      stiffness: 90,
      damping: 26,
      mass: 0.7,
    },
  );

  /*
   * Image enters tilted one way,
   * straightens near center,
   * then tilts slightly the other way.
   */
  const rotateY = useTransform(
    smoothProgress,
    [0, 0.5, 1],
    [
      direction * 26,
      0,
      direction * -14,
    ],
  );

  const rotateZ = useTransform(
    smoothProgress,
    [0, 0.5, 1],
    [
      direction * 5,
      0,
      direction * -2,
    ],
  );

  const x = useTransform(
    smoothProgress,
    [0, 0.5, 1],
    [
      direction * 80,
      0,
      direction * -35,
    ],
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

  const number = String(index + 1).padStart(
    2,
    "0",
  );

  return (
    <article
      ref={cardRef}
      className="
        relative
        min-h-[38rem]
        overflow-hidden
        rounded-[2rem]
        lg:min-h-[46rem]
      "
    >
      {/* ==============================================
          GRADIENT — frontend controlled
          ============================================== */}

      <div
        className="
          absolute
          inset-0
          bg-[radial-gradient(circle_at_50%_32%,#E2C865_0%,#927116_48%,#4A3506_100%)]
        "
      />

      {/* subtle lighting */}
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          bg-[linear-gradient(135deg,rgba(255,255,255,0.18),transparent_38%,rgba(0,0,0,0.18))]
        "
      />

      {/* ==============================================
          NUMBER / COPY
          ============================================== */}

      <div
        className="
          relative
          z-20
          flex
          h-full
          min-h-[38rem]
          flex-col
          justify-between
          p-6
          sm:p-8
          lg:min-h-[46rem]
          lg:p-10
        "
      >
        <div className="flex items-start justify-between">
          <span
            className="
              text-xs
              font-medium
              tracking-[0.12em]
              text-white/70
            "
          >
            {number}
          </span>

          <span
            className="
              text-xs
              uppercase
              tracking-[0.12em]
              text-white/70
            "
          >
            Industry
          </span>
        </div>

        <div className="relative z-20 max-w-md">
          <h3
            className="
              text-3xl
              font-semibold
              tracking-[-0.03em]
              text-white
              sm:text-4xl
              lg:text-5xl
            "
          >
            {industry.title}
          </h3>

          {industry.shortDescription ? (
            <p
              className="
                mt-4
                max-w-sm
                text-sm
                leading-6
                text-white/75
                sm:text-base
              "
            >
              {industry.shortDescription}
            </p>
          ) : null}

          {industry.slug ? (
            <Link
              href={`/industries/${industry.slug}`}
              className="
                mt-6
                inline-flex
                text-sm
                font-medium
                text-white
                transition-opacity
                hover:opacity-65
              "
            >
              Explore industry →
            </Link>
          ) : null}
        </div>
      </div>

      {/* ==============================================
          ROTATING CMS ARTWORK
          ============================================== */}

      {industry.imageUrl ? (
        <motion.div
          aria-hidden="true"
          style={{
            rotateY,
            rotateZ,
            x,
            y,
            scale,
            opacity,
            transformPerspective: 1200,
            transformStyle: "preserve-3d",
          }}
          className="
            pointer-events-none
            absolute
            left-1/2
            top-[10%]
            z-10
            h-[68%]
            w-[80%]
            -translate-x-1/2

            sm:w-[72%]

            lg:left-auto
            lg:right-[2%]
            lg:top-[8%]
            lg:h-[76%]
            lg:w-[58%]
            lg:translate-x-0
          "
        >
          <Image
            src={industry.imageUrl}
            alt=""
            fill
            sizes="
              (max-width: 1024px) 80vw,
              55vw
            "
            className="
              object-contain
              drop-shadow-[0_2rem_3.5rem_rgba(0,0,0,0.3)]
            "
          />
        </motion.div>
      ) : null}
    </article>
  );
}

export function IndustriesShowcase({
  industries,
}: {
  industries: CmsFeaturedIndustry[];
}) {
  if (!industries.length) {
    return null;
  }

  return (
    <div className="space-y-6 lg:space-y-10">
      {industries.map(
        (industry, index) => (
          <IndustryCard
            key={industry._id}
            industry={industry}
            index={index}
          />
        ),
      )}
    </div>
  );
}