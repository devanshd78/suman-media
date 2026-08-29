"use client";

import Image from "next/image";
import Link from "next/link";
import { Plus_Jakarta_Sans } from "next/font/google";
import {
  useEffect,
  useRef,
  type CSSProperties,
} from "react";

import type {
  CmsCta,
  CmsFeaturedIndustry,
} from "@/types/cms";

const exo2 = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["600"],
});

const inter = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "600"],
});

/* ============================================================
   ICON
   ============================================================ */

function ArrowIcon({
  direction = "right",
}: {
  direction?: "left" | "right";
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className="h-4 w-4"
      fill="none"
    >
      <path
        d={
          direction === "right"
            ? "M4 10h11M11 6l4 4-4 4"
            : "M16 10H5M9 6l-4 4 4 4"
        }
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ============================================================
   INDUSTRY VISUAL SYSTEM

   CMS controls:
   - title
   - slug
   - image
   - content

   Frontend controls:
   - gradient
   - artwork size
   - artwork rotation
   - animation duration
   ============================================================ */

type IndustryVisual = {
  background: string;
  width: string;
  height: string;
  rotation: string;
  duration: string;
};

const INDUSTRY_VISUALS: Record<
  string,
  IndustryVisual
> = {
  /* ----------------------------------------------------------
     01 — ENTERTAINMENT
     ---------------------------------------------------------- */

  entertainment: {
    background:
      "radial-gradient(circle at 92% 8%, rgba(40,208,237,0.98) 0%, rgba(40,208,237,0) 42%), radial-gradient(circle at 0% 94%, rgba(255,177,69,0.96) 0%, rgba(255,177,69,0) 45%), linear-gradient(138deg, #8C79DC 0%, #FF82B4 56%, #51CBE5 100%)",

    width: "82%",
    height: "82%",

    rotation: "-180deg",
    duration: "1100ms",
  },

  /* ----------------------------------------------------------
     02 — ENTERPRISES
     ---------------------------------------------------------- */

  enterprises: {
    background:
      "radial-gradient(circle at 87% 90%, rgba(250,183,129,0.95) 0%, rgba(250,183,129,0) 45%), radial-gradient(circle at 4% 3%, rgba(105,105,209,0.72) 0%, rgba(105,105,209,0) 48%), linear-gradient(140deg, #7A70C8 0%, #EC83C0 48%, #F7AF83 100%)",

    width: "72%",
    height: "78%",

    rotation: "90deg",
    duration: "500ms",
  },

  /* ----------------------------------------------------------
     03 — BRANDS
     ---------------------------------------------------------- */

  brands: {
    background:
      "radial-gradient(circle at 4% 95%, rgba(250,196,86,1) 0%, rgba(250,196,86,0) 43%), radial-gradient(circle at 98% 100%, rgba(127,154,239,0.94) 0%, rgba(127,154,239,0) 42%), linear-gradient(140deg, #FF4A69 3%, #FF6B82 45%, #FDB24B 100%)",

    width: "80%",
    height: "80%",

    rotation: "90deg",
    duration: "500ms",
  },

  /* ----------------------------------------------------------
     04 — INVESTORS
     ---------------------------------------------------------- */

  investors: {
    background:
      "radial-gradient(circle at 7% 95%, rgba(255,248,223,0.98) 0%, rgba(255,248,223,0) 40%), radial-gradient(circle at 96% 92%, rgba(62,160,245,0.90) 0%, rgba(62,160,245,0) 42%), linear-gradient(135deg, #191742 0%, #40345E 42%, #E68C79 73%, #62B4EF 100%)",

    width: "78%",
    height: "78%",

    rotation: "-90deg",
    duration: "750ms",
  },

  /* ----------------------------------------------------------
     05 — PUBLIC SECTOR
     ---------------------------------------------------------- */

  "public-sector": {
    background:
      "radial-gradient(circle at 3% 10%, rgba(255,111,65,0.98) 0%, rgba(255,111,65,0) 48%), radial-gradient(circle at 98% 88%, rgba(100,151,215,0.90) 0%, rgba(100,151,215,0) 48%), linear-gradient(125deg, #FF7951 0%, #E8A276 47%, #779ED0 100%)",

    width: "80%",
    height: "80%",

    rotation: "120deg",
    duration: "800ms",
  },

  /* ----------------------------------------------------------
     06 — CREATORS
     ---------------------------------------------------------- */

  creators: {
    background:
      "radial-gradient(circle at 5% 5%, rgba(224,242,246,0.95) 0%, rgba(224,242,246,0) 45%), radial-gradient(circle at 96% 96%, rgba(255,102,61,0.96) 0%, rgba(255,102,61,0) 44%), linear-gradient(135deg, #D8EEF2 0%, #E36DCD 48%, #FF6943 100%)",

    width: "80%",
    height: "80%",

    rotation: "-90deg",
    duration: "750ms",
  },

  /* ----------------------------------------------------------
     07 — GOVERNMENT
     ---------------------------------------------------------- */

  government: {
    background:
      "radial-gradient(circle at 8% 88%, rgba(107,196,230,0.86) 0%, rgba(107,196,230,0) 42%), radial-gradient(circle at 92% 10%, rgba(222,164,214,0.92) 0%, rgba(222,164,214,0) 44%), linear-gradient(135deg, #84CAE5 0%, #D9BDE8 50%, #C888D1 100%)",

    width: "82%",
    height: "82%",

    rotation: "180deg",
    duration: "900ms",
  },
};

const FALLBACK_VISUAL: IndustryVisual = {
  background:
    "linear-gradient(135deg,#8C79DC 0%,#FF82B4 55%,#51CBE5 100%)",

  width: "80%",
  height: "80%",

  rotation: "90deg",
  duration: "700ms",
};

/* ============================================================
   ARTWORK
   ============================================================ */

type ArtworkStyle = CSSProperties & {
  "--industry-rotation": string;
  "--industry-duration": string;
};

function IndustryArtwork({
  imageUrl,
  imageAlt,
  visual,
}: {
  imageUrl: string;
  imageAlt?: string | null;
  visual: IndustryVisual;
}) {
  const style: ArtworkStyle = {
    width: visual.width,
    height: visual.height,

    "--industry-rotation":
      visual.rotation,

    "--industry-duration":
      visual.duration,
  };

  return (
    <div
      style={style}
      className="
        industry-artwork
        relative
        origin-center
        transform-gpu
      "
    >
      <Image
        src={imageUrl}
        alt={imageAlt?.trim() || ""}
        fill
        unoptimized
        sizes="22rem"
        className="
          select-none
          object-contain
        "
      />
    </div>
  );
}

/* ============================================================
   CARD
   ============================================================ */

function IndustryCard({
  industry,
  index,
}: {
  industry: CmsFeaturedIndustry;
  index: number;
}) {
  const visual =
    INDUSTRY_VISUALS[industry.slug] ??
    FALLBACK_VISUAL;

  const number = String(index + 1).padStart(
    2,
    "0",
  );

  return (
    <Link
      href={`/services?industry=${encodeURIComponent(
        industry.slug,
      )}`}
      data-industry-card
      className="
        group
        block
        w-[min(27.625rem,85vw)]
        shrink-0
        bg-white
        text-black

        focus-visible:outline
        focus-visible:outline-2
        focus-visible:outline-offset-4
        focus-visible:outline-[#8F6C1A]
      "
    >
      {/* =====================================================
          GRADIENT / ARTWORK AREA
          ===================================================== */}

      <div
        className="
          relative
          flex
          aspect-square
          w-full
          items-center
          justify-center
          overflow-hidden
        "
        style={{
          background: visual.background,
        }}
      >
        {/* Number */}

        <span
          className={`
            ${inter.className}

            absolute
            left-5
            top-5
            z-20

            text-sm
            font-medium
            leading-5
            text-[rgba(0,9,51,0.58)]
          `}
        >
          {number}
        </span>

        {/* Figma blurred light layer */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-[12%]
            bg-white/20
            blur-[49.95px]
          "
        />

        {/* CMS SVG / artwork */}

        {industry.imageUrl ? (
          <div
            className="
              relative
              z-10
              flex
              h-full
              w-full
              items-center
              justify-center
            "
          >
            <IndustryArtwork
              imageUrl={industry.imageUrl}
              imageAlt={industry.imageAlt}
              visual={visual}
            />
          </div>
        ) : null}
      </div>

      {/* =====================================================
          TITLE
          ===================================================== */}

      <div
        className="
          flex
          min-h-[4.25rem]
          items-center
          bg-white
          px-5
        "
      >
        <h3
          className={`
            ${inter.className}

            text-base
            font-semibold
            leading-6
            text-black
          `}
        >
          {industry.title}
        </h3>
      </div>
    </Link>
  );
}

/* ============================================================
   SECTION
   ============================================================ */

type IndustriesSectionProps = {
  eyebrow?: string | null;
  heading?: string | null;
  description?: string | null;
  cta?: CmsCta | null;
  industries: CmsFeaturedIndustry[];
};

export function IndustriesSection({
  eyebrow,
  heading,
  description,
  cta,
  industries,
}: IndustriesSectionProps) {
  const scrollerRef =
    useRef<HTMLDivElement>(null);

  /*
   * Artwork is required because these are designed
   * as visual cards.
   */
  const validIndustries =
    industries
      .filter(
        (
          industry,
        ): industry is CmsFeaturedIndustry =>
          Boolean(
            industry?._id &&
              industry?.title?.trim() &&
              industry?.slug?.trim() &&
              industry?.imageUrl,
          ),
      )
      .slice(0, 7);

  /* ----------------------------------------------------------
     CTA
     ---------------------------------------------------------- */

  const ctaLabel =
    cta?.label?.trim() ||
    "Explore Capabilities";

  const ctaHref =
    cta?.href?.trim() || "/services";

  /* ----------------------------------------------------------
     ARROW SCROLL
     ---------------------------------------------------------- */

  const scrollCards = (
    direction: -1 | 1,
  ) => {
    const scroller =
      scrollerRef.current;

    if (!scroller) return;

    const card =
      scroller.querySelector<HTMLElement>(
        "[data-industry-card]",
      );

    const amount =
      card?.offsetWidth ?? 442;

    scroller.scrollBy({
      left: amount * direction,
      behavior: "smooth",
    });
  };

  /* ----------------------------------------------------------
     MOUSE WHEEL → HORIZONTAL
     ---------------------------------------------------------- */

  useEffect(() => {
    const scroller =
      scrollerRef.current;

    if (!scroller) return;

    const handleWheel = (
      event: globalThis.WheelEvent,
    ) => {
      const maxScroll =
        scroller.scrollWidth -
        scroller.clientWidth;

      if (maxScroll <= 2) return;

      const delta =
        Math.abs(event.deltaY) >=
        Math.abs(event.deltaX)
          ? event.deltaY
          : event.deltaX;

      if (Math.abs(delta) < 1) return;

      const movingForward = delta > 0;
      const movingBackward = delta < 0;

      const canMoveForward =
        scroller.scrollLeft <
        maxScroll - 2;

      const canMoveBackward =
        scroller.scrollLeft > 2;

      const shouldCapture =
        (movingForward &&
          canMoveForward) ||
        (movingBackward &&
          canMoveBackward);

      /*
       * At either edge we allow normal
       * vertical page scrolling again.
       */
      if (!shouldCapture) return;

      event.preventDefault();

      scroller.scrollLeft += delta;
    };

    scroller.addEventListener(
      "wheel",
      handleWheel,
      {
        passive: false,
      },
    );

    return () => {
      scroller.removeEventListener(
        "wheel",
        handleWheel,
      );
    };
  }, []);

  if (validIndustries.length === 0) {
    return null;
  }

  return (
    <section
      id="industries"
      aria-labelledby="industries-heading"
      className="
        landing-section-transition
        mx-auto
        flex
        w-full
        max-w-full
        flex-col
        items-center
        overflow-hidden
        bg-white

        px-5
        pb-10
        pt-16

        sm:px-8

        lg:px-[3.5rem]
        lg:pb-[3.5rem]
        lg:pt-[6.25rem]
      "
    >
      {/* =====================================================
          HEADER
          ===================================================== */}

      <div
        className="
          flex
          w-full
          flex-col
          items-start
          justify-between
          gap-8

          lg:flex-row
          lg:items-center
          lg:gap-12
        "
      >
        {/* LEFT */}

        <div
          className="
            flex
            w-full
            flex-col
            gap-6

            lg:w-[16.75rem]
            lg:shrink-0
          "
        >
          <p
            className={`
              ${inter.className}

              text-[0.625rem]
              font-semibold
              uppercase
              leading-[0.875rem]
              tracking-[-0.00625rem]
              text-[rgba(0,9,51,0.65)]
            `}
          >
            {eyebrow?.trim() ||
              "Industries we work with"}
          </p>

          <h2
            id="industries-heading"
            className={`
              ${exo2.className}

              text-[2rem]
              font-semibold
              leading-[2.5rem]
              tracking-[-0.03125rem]
              text-black

              lg:text-[2.5rem]
              lg:leading-[3rem]
            `}
            style={{
              fontFeatureSettings:
                '"liga" off, "clig" off',
            }}
          >
            {heading?.trim() ||
              "The Industries we work with?"}
          </h2>
        </div>

        {/* RIGHT */}

        <div
          data-landing-parallax-layer="reverse"
          className="
            flex
            w-full
            flex-col
            items-start

            lg:w-[31.4375rem]
            lg:shrink-0
          "
        >
          {description?.trim() ? (
            <p
              className={`
                ${inter.className}

                text-base
                font-normal
                leading-6
                text-[rgba(0,9,51,0.65)]
              `}
            >
              {description}
            </p>
          ) : null}

          <Link
            href={ctaHref}
            className={`
              ${inter.className}

              group
              mt-4
              inline-flex
              items-center
              gap-1.5
              py-2

              text-sm
              font-semibold
              leading-5
              text-[#8F6C1A]

              transition-opacity
              duration-200

              hover:opacity-60
            `}
          >
            <span>{ctaLabel}</span>

            <span className="transition-transform duration-200 group-hover:translate-x-1">
              <ArrowIcon />
            </span>
          </Link>
        </div>
      </div>

      {/* =====================================================
          CARDS
          ===================================================== */}

      <div
        className="
          mt-[6.25rem]
          w-full
          overflow-hidden
        "
      >
        <div
          ref={scrollerRef}
          className="
            industries-track
            flex
            w-full

            overflow-x-auto
            overflow-y-hidden

            scroll-smooth
            overscroll-x-contain
          "
        >
          {validIndustries.map(
            (industry, index) => (
              <IndustryCard
                key={industry._id}
                industry={industry}
                index={index}
              />
            ),
          )}
        </div>
      </div>

      {/* =====================================================
          NAVIGATION
          ===================================================== */}

      <div
        className="
          mt-5
          flex
          w-full
          justify-end
          gap-2
        "
      >
        <button
          type="button"
          onClick={() =>
            scrollCards(-1)
          }
          aria-label="Previous industry"
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-lg
            bg-[#FCFAF5]
            text-[#8F6C1A]

            transition-colors
            duration-200

            hover:bg-[#F5EEDC]

            focus-visible:outline
            focus-visible:outline-2
            focus-visible:outline-offset-2
            focus-visible:outline-[#8F6C1A]
          "
        >
          <ArrowIcon direction="left" />
        </button>

        <button
          type="button"
          onClick={() =>
            scrollCards(1)
          }
          aria-label="Next industry"
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-lg
            bg-[#FCFAF5]
            text-[#8F6C1A]

            transition-colors
            duration-200

            hover:bg-[#F5EEDC]

            focus-visible:outline
            focus-visible:outline-2
            focus-visible:outline-offset-2
            focus-visible:outline-[#8F6C1A]
          "
        >
          <ArrowIcon />
        </button>
      </div>

      {/* =====================================================
          ANIMATION
          ===================================================== */}

      <style>{`
        .industries-track {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        .industries-track::-webkit-scrollbar {
          display: none;
        }

        .industry-artwork {
          transition-property: transform;
          transition-duration: var(--industry-duration);
          transition-timing-function: cubic-bezier(
            0.4,
            0,
            0.2,
            1
          );
        }

        #industries
          .group:hover
          .industry-artwork {
          transform: rotate(
            var(--industry-rotation)
          );
        }

        @media (
          prefers-reduced-motion: reduce
        ) {
          .industry-artwork {
            transition: none !important;
            transform: none !important;
          }

          #industries
            .group:hover
            .industry-artwork {
            transform: none !important;
          }

          .industries-track {
            scroll-behavior: auto;
          }
        }
      `}</style>
    </section>
  );
}
