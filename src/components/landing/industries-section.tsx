"use client";

import Image from "@/components/ui/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRef, type ReactNode } from "react";

import { usePinnedRail } from "@/hooks/use-pinned-rail";
import { plusJakartaSans } from "@/lib/fonts";
import type { CmsCta } from "@/types/cms";

import {
  BrandsArtwork,
  CreatorsArtwork,
  EntertainmentArtwork,
  EnterprisesArtwork,
  GovernmentArtwork,
  InvestorsArtwork,
  PublicSectorArtwork,
} from "./industry-artwork";

import styles from "./industries-section.module.css";

type IndustryItem = {
  key: string;
  number: string;
  title: string;
  slug: string;
  gradientImage: string;
  description: string;
  artwork: ReactNode;
};

type IndustriesSectionProps = {
  eyebrow?: string | null;
  heading?: string | null;
  description?: string | null;
  cta?: CmsCta | null;
};

const INDUSTRIES: IndustryItem[] = [
  {
    key: "entertainment",
    number: "01",
    title: "Entertainment",
    description:
      "Film, music and stories across screens and experiences.",
    slug: "entertainment",
    gradientImage: "/images/gradient/gradient-1.png",
    artwork: <EntertainmentArtwork />,
  },
  {
    key: "enterprises",
    number: "02",
    title: "Enterprises",
    description:
      "Media and technology for connected business experiences.",
    slug: "enterprises",
    gradientImage: "/images/gradient/gradient-2.png",
    artwork: <EnterprisesArtwork />,
  },
  {
    key: "brands",
    number: "03",
    title: "Brands",
    description:
      "Creative content and experiences that connect brands with audiences.",
    slug: "brands",
    gradientImage: "/images/gradient/gradient-3.png",
    artwork: <BrandsArtwork />,
  },
  {
    key: "investors",
    number: "04",
    title: "Investors",
    description:
      "Media, information and communication for investment ecosystems.",
    slug: "investors",
    gradientImage: "/images/gradient/gradient-4.png",
    artwork: <InvestorsArtwork />,
  },
  {
    key: "public-sector",
    number: "05",
    title: "Public Sector",
    description:
      "Institutional media, public awareness and outreach.",
    slug: "public-sector",
    gradientImage: "/images/gradient/gradient-5.png",
    artwork: <PublicSectorArtwork />,
  },
  {
    key: "creators",
    number: "06",
    title: "Creators",
    description:
      "Supporting talent, original content and creative collaboration.",
    slug: "creators",
    gradientImage: "/images/gradient/gradient-6.png",
    artwork: <CreatorsArtwork />,
  },
  {
    key: "government",
    number: "07",
    title: "Government",
    description:
      "Citizen engagement, culture and public communication.",
    slug: "government",
    gradientImage: "/images/gradient/gradient-7.png",
    artwork: <GovernmentArtwork />,
  },
];

function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      width="16"
      height="16"
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

function IndustryCard({
  industry,
}: {
  industry: IndustryItem;
}) {
  return (
    <Link
      href={`/services?industry=${encodeURIComponent(
        industry.slug,
      )}`}
      data-rail-card
      data-industry-card
      className={styles.card}
    >
      <div className={styles.visual}>
        {/* Original gradient background */}
        <Image
          src={industry.gradientImage}
          alt=""
          aria-hidden="true"
          fill
          loading="lazy"
          sizes="(max-width: 1023px) 82vw, 26rem"
          className={styles.gradientBackground}
        />

        {/*
          Global contrast-reduction layer.

          Figma:
          fill: rgba(255, 255, 255, 0.20);
          filter: blur(49.95000076293945px);
        */}
        <div
          aria-hidden="true"
          className={styles.backgroundWash}
        />

        {/* Existing central bloom */}
        <div
          aria-hidden="true"
          className={styles.bloom}
        />

        {/* Existing texture */}
        <div
          aria-hidden="true"
          className={styles.noise}
        />

        {/* Number */}
        <span className={styles.number}>
          {industry.number}
        </span>

        {/* Main artwork */}
        <div
          aria-hidden="true"
          data-industry-artwork={industry.key}
          className={styles.artwork}
        >
          {industry.artwork}
        </div>
      </div>

      <h3 className={styles.cardTitle}>
        {industry.title}
      </h3>

      <p className={styles.cardDescription}>
        {industry.description}
      </p>
    </Link>
  );
}

export function IndustriesSection({
  eyebrow,
  heading,
  description,
  cta,
}: IndustriesSectionProps) {
  const section = useRef<HTMLElement>(null);

  const content =
    useRef<HTMLDivElement>(null);

  const viewport =
    useRef<HTMLDivElement>(null);

  const track =
    useRef<HTMLDivElement>(null);

  const rail = usePinnedRail({
    section,
    content,
    viewport,
    track,
  });

  return (
    <section
      ref={section}
      id="industries"
      aria-labelledby="industries-heading"
      data-motion-managed
      data-pinned={rail.pinned}
      className={`${plusJakartaSans.className} ${styles.section}`}
      style={{
        height: rail.sectionHeight,
      }}
    >
      <div
        className={styles.sticky}
        style={{
          height: rail.pinned
            ? rail.viewportHeight
            : undefined,
        }}
      >
        <div
          ref={content}
          className={styles.content}
        >
          <div className={styles.header}>
            <div>
              <p className={styles.eyebrow}>
                {eyebrow?.trim() ||
                  "Industries we work with"}
              </p>

              <h2
                id="industries-heading"
                className={styles.heading}
              >
                {heading?.trim() ||
                  "The Industries we work with?"}
              </h2>
            </div>

            <div
              className={styles.introduction}
            >
              <p
                className={styles.description}
              >
                {description?.trim() ||
                  "From creating original content and building digital platforms to strategic communications and global distribution, our integrated capabilities help businesses, creators, governments, and brands grow through media and technology."}
              </p>

              <Link
                href={
                  cta?.href?.trim() ||
                  "/services"
                }
                className={styles.cta}
              >
                {cta?.label?.trim() ||
                  "Explore Capabilities"}

                <ArrowIcon />
              </Link>
            </div>
          </div>

          <div
            ref={viewport}
            className={styles.viewport}
            data-lenis-prevent={
              rail.pinned
                ? undefined
                : true
            }
            role="region"
            aria-label="Industries"
            tabIndex={0}
          >
            <motion.div
              ref={track}
              className={styles.track}
              style={{
                x: rail.x,
              }}
            >
              {INDUSTRIES.map(
                (industry) => (
                  <IndustryCard
                    key={industry.key}
                    industry={industry}
                  />
                ),
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}