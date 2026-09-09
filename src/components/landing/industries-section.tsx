"use client";

import Image from "@/components/ui/image";
import Link from "next/link";

import { plusJakartaSans } from "@/lib/fonts";
import { usePinnedRail } from "@/hooks/use-pinned-rail";

import { motion } from "framer-motion";

import {
  useId,
  useRef,
  type ReactNode,
} from "react";

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

/* ============================================================
   TYPES
   ============================================================ */

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

/* ============================================================
   INDUSTRIES

   Gradient backgrounds are now ONLY:

   /images/gradient/gradient-1.png
   /images/gradient/gradient-2.png
   /images/gradient/gradient-3.png
   /images/gradient/gradient-4.png
   /images/gradient/gradient-5.png
   /images/gradient/gradient-6.png
   /images/gradient/gradient-7.png

   No CSS-generated gradient is used here anymore.
   ============================================================ */

const INDUSTRIES: IndustryItem[] = [
  {
    key: "entertainment",

    number: "01",

    title: "Entertainment",

    description:
      "Film, music and stories across screens and experiences.",

    slug: "entertainment",

    gradientImage:
      "/images/gradient/gradient-1.png",

    artwork:
      <EntertainmentArtwork />,
  },

  {
    key: "enterprises",

    number: "02",

    title: "Enterprises",

    description:
      "Media and technology for connected business experiences.",

    slug: "enterprises",

    gradientImage:
      "/images/gradient/gradient-2.png",

    artwork:
      <EnterprisesArtwork />,
  },

  {
    key: "brands",

    number: "03",

    title: "Brands",

    description:
      "Creative content and experiences that connect brands with audiences.",

    slug: "brands",

    gradientImage:
      "/images/gradient/gradient-3.png",

    artwork:
      <BrandsArtwork />,
  },

  {
    key: "investors",

    number: "04",

    title: "Investors",

    description:
      "Media, information and communication for investment ecosystems.",

    slug: "investors",

    gradientImage:
      "/images/gradient/gradient-4.png",

    artwork:
      <InvestorsArtwork />,
  },

  {
    key: "public-sector",

    number: "05",

    title: "Public Sector",

    description:
      "Institutional media, public awareness and outreach.",

    slug: "public-sector",

    gradientImage:
      "/images/gradient/gradient-5.png",

    artwork:
      <PublicSectorArtwork />,
  },

  {
    key: "creators",

    number: "06",

    title: "Creators",

    description:
      "Supporting talent, original content and creative collaboration.",

    slug: "creators",

    gradientImage:
      "/images/gradient/gradient-6.png",

    artwork:
      <CreatorsArtwork />,
  },

  {
    key: "government",

    number: "07",

    title: "Government",

    description:
      "Citizen engagement, culture and public communication.",

    slug: "government",

    gradientImage:
      "/images/gradient/gradient-7.png",

    artwork:
      <GovernmentArtwork />,
  },
];

/* ============================================================
   ARROW
   ============================================================ */

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

/* ============================================================
   INDUSTRY CARD
   ============================================================ */

function IndustryCard({
  industry,
}: {
  industry: IndustryItem;
}) {
  const noiseId =
    useId().replace(
      /:/g,
      "",
    );

  return (
    <Link
      href={`/services?industry=${encodeURIComponent(
        industry.slug,
      )}`}
      data-rail-card
      data-industry-card
      className={styles.card}
    >
      {/* =====================================================
          VISUAL
          ===================================================== */}

      <div
        className={
          styles.visual
        }
      >
        {/* ===================================================
            GRADIENT PNG

            Replaces old radial-gradient / linear-gradient CSS.
            =================================================== */}

        <Image
          src={
            industry.gradientImage
          }
          alt=""
          aria-hidden="true"
          fill
          loading="lazy"
          sizes="
            (max-width: 1023px) 82vw,
            26rem
          "
          className="
            pointer-events-none
            absolute
            inset-0
            select-none
            object-cover
          "
        />

        {/* ===================================================
            NUMBER
            =================================================== */}

        <span
          className={
            styles.number
          }
        >
          {industry.number}
        </span>

        {/* ===================================================
            LIGHT BLOOM

            Keeps the depth layer above the PNG.
            =================================================== */}

        <div
          aria-hidden="true"
          className={
            styles.bloom
          }
        />

        {/* ===================================================
            NOISE

            Keep the texture layer separately above gradient.
            =================================================== */}

        <svg
          aria-hidden="true"
          focusable="false"
          className={
            styles.noise
          }
          width="100%"
          height="100%"
        >
          <filter
            id={noiseId}
            x="0"
            y="0"
            width="100%"
            height="100%"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.8"
              numOctaves="3"
              stitchTiles="stitch"
              seed="7"
            />

            <feColorMatrix
              type="saturate"
              values="0"
            />
          </filter>

          <rect
            width="100%"
            height="100%"
            filter={`url(#${noiseId})`}
          />
        </svg>

        {/* ===================================================
            SVG ARTWORK
            =================================================== */}

        <div
          aria-hidden="true"
          data-industry-artwork={
            industry.key
          }
          className={
            styles.artwork
          }
        >
          {industry.artwork}
        </div>
      </div>

      {/* =====================================================
          TITLE
          ===================================================== */}

      <h3
        className={
          styles.cardTitle
        }
      >
        {industry.title}
      </h3>

      {/* =====================================================
          DESCRIPTION
          ===================================================== */}

      <p
        className={
          styles.cardDescription
        }
      >
        {industry.description}
      </p>
    </Link>
  );
}

/* ============================================================
   SECTION
   ============================================================ */

export function IndustriesSection({
  eyebrow,
  heading,
  description,
  cta,
}: IndustriesSectionProps) {
  const section =
    useRef<HTMLElement>(null);

  const content =
    useRef<HTMLDivElement>(
      null,
    );

  const viewport =
    useRef<HTMLDivElement>(
      null,
    );

  const track =
    useRef<HTMLDivElement>(
      null,
    );

  const rail =
    usePinnedRail({
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
      data-pinned={
        rail.pinned
      }
      className={`
        ${plusJakartaSans.className}
        ${styles.section}
      `}
      style={{
        height:
          rail.sectionHeight,
      }}
    >
      {/* =====================================================
          STICKY WRAPPER
          ===================================================== */}

      <div
        className={
          styles.sticky
        }
        style={{
          height:
            rail.pinned
              ? rail.viewportHeight
              : undefined,
        }}
      >
        <div
          ref={content}
          className={
            styles.content
          }
        >
          {/* =================================================
              HEADER
              ================================================= */}

          <div
            className={
              styles.header
            }
          >
            <div>
              <p
                className={
                  styles.eyebrow
                }
              >
                {eyebrow?.trim() ||
                  "Industries we work with"}
              </p>

              <h2
                id="industries-heading"
                className={
                  styles.heading
                }
              >
                {heading?.trim() ||
                  "The Industries we work with?"}
              </h2>
            </div>

            {/* ===============================================
                RIGHT COPY
                =============================================== */}

            <div
              className={
                styles.introduction
              }
            >
              <p
                className={
                  styles.description
                }
              >
                {description?.trim() ||
                  "From creating original content and building digital platforms to strategic communications and global distribution, our integrated capabilities help businesses, creators, governments, and brands grow through media and technology."}
              </p>

              <Link
                href={
                  cta?.href?.trim() ||
                  "/services"
                }
                className={
                  styles.cta
                }
              >
                {cta?.label?.trim() ||
                  "Explore Capabilities"}

                <ArrowIcon />
              </Link>
            </div>
          </div>

          {/* =================================================
              HORIZONTAL INDUSTRY RAIL
              ================================================= */}

          <div
            ref={viewport}
            className={
              styles.viewport
            }
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
              className={
                styles.track
              }
              style={{
                x: rail.x,
              }}
            >
              {INDUSTRIES.map(
                (
                  industry,
                ) => (
                  <IndustryCard
                    key={
                      industry.key
                    }
                    industry={
                      industry
                    }
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