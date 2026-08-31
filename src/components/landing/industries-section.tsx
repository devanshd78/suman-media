"use client";

import Link from "next/link";
import { plusJakartaSans as bodyFont, plusJakartaSans as headingFont } from "@/lib/fonts";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

import type { CmsCta } from "@/types/cms";

/* ============================================================
   FONTS
   ============================================================ */

/* ============================================================
   TYPES
   ============================================================ */

type IndustryKey =
  | "entertainment"
  | "enterprises"
  | "brands"
  | "investors"
  | "public-sector"
  | "creators"
  | "government";

type IndustryItem = {
  key: IndustryKey;
  number: string;
  title: string;
  slug: string;
  background: string;
  artwork: ReactNode;
};

type IndustriesSectionProps = {
  eyebrow?: string | null;
  heading?: string | null;
  description?: string | null;
  cta?: CmsCta | null;

};

/* ============================================================
   CONFIG
   ============================================================ */

const CARD_GAP_PX = 24;

const SCROLL_SPRING = {
  stiffness: 120,
  damping: 30,
  mass: 0.55,
  restDelta: 0.001,
} as const;

/* ============================================================
   ARROW
   ============================================================ */

function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className="h-4 w-4 shrink-0"
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
   01 — ENTERTAINMENT
   ============================================================ */

function EntertainmentArtwork() {
  return (
    <svg
      viewBox="0 0 320 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-full w-full"
    >
      <g
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="48" y="48" width="224" height="224" />
        <rect x="67" y="67" width="186" height="186" />
        <rect x="86" y="86" width="148" height="148" />
        <rect x="105" y="105" width="110" height="110" />
        <rect x="124" y="124" width="72" height="72" />
        <rect x="143" y="143" width="34" height="34" />

        <path d="M48 48 143 143" />
        <path d="M272 48 177 143" />
        <path d="M272 272 177 177" />
        <path d="M48 272 143 177" />
      </g>
    </svg>
  );
}

/* ============================================================
   02 — ENTERPRISES
   ============================================================ */

function EnterprisesArtwork() {
  return (
    <svg
      viewBox="0 0 320 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-full w-full"
    >
      <g
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M160 50 258 106 258 216 160 272 62 216 62 106 160 50Z" />

        <path d="M62 106 160 162 258 106" />
        <path d="M160 162V272" />
        <path d="M160 50V162" />

        <path d="M111 78 209 134" />
        <path d="M111 244V134L209 78" />

        <path d="M62 216 160 160 258 216" />
      </g>
    </svg>
  );
}

/* ============================================================
   03 — BRANDS
   ============================================================ */

function BrandsArtwork() {
  const rings = [
    "160,44 228,61 276,108 291,176 264,241 210,282 141,288 78,257 39,200 39,132 74,75 128,46",
    "160,64 218,78 259,119 271,176 248,229 201,263 144,268 91,242 59,193 59,139 87,91 134,66",
    "160,84 208,96 242,130 251,176 232,218 193,246 147,250 104,228 78,188 78,146 101,106 140,86",
    "160,104 198,113 225,140 232,175 218,208 187,230 150,233 117,216 96,183 96,151 114,120 145,105",
    "160,123 188,130 208,150 213,175 203,199 181,214 154,217 129,203 114,180 114,156 127,136 149,124",
    "160,142 179,146 192,159 195,175 188,190 174,200 156,202 140,193 131,178 131,162 140,149 153,143",
  ];

  return (
    <svg
      viewBox="0 0 320 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-full w-full"
    >
      <g
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {rings.map((points, index) => (
          <polygon
            key={index}
            points={points}
          />
        ))}
      </g>
    </svg>
  );
}

/* ============================================================
   04 — INVESTORS
   ============================================================ */

function InvestorsArtwork() {
  return (
    <svg
      viewBox="0 0 320 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-full w-full"
    >
      <g
        stroke="white"
        strokeWidth="2.6"
        strokeLinecap="round"
      >
        <path d="M42 175C82 77 191 48 282 115" />
        <path d="M47 186C92 96 193 68 278 125" />
        <path d="M54 197C103 117 195 88 271 137" />
        <path d="M63 208C115 139 198 109 262 149" />
        <path d="M75 219C128 160 200 132 250 162" />
        <path d="M89 230C141 182 201 156 236 176" />
        <path d="M105 240C153 204 201 181 221 191" />

        <path d="M42 175C91 250 195 274 282 205" />
        <path d="M47 186C100 245 197 259 278 196" />
        <path d="M54 197C111 240 198 243 271 187" />
        <path d="M63 208C122 235 200 225 262 178" />
        <path d="M75 219C134 230 200 208 250 169" />
      </g>
    </svg>
  );
}

/* ============================================================
   05 — PUBLIC SECTOR
   ============================================================ */

function PublicSectorArtwork() {
  return (
    <svg
      viewBox="0 0 320 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-full w-full"
    >
      <g
        stroke="white"
        strokeWidth="2.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M160 44 222 61 272 103 290 164 274 228 226 274 161 290 98 272 51 226 34 163 54 100 99 59 160 44Z" />

        <path d="M160 44 136 96 99 59" />
        <path d="M160 44 185 96 222 61" />

        <path d="M99 59 136 96 80 126 54 100" />
        <path d="M222 61 185 96 240 128 272 103" />

        <path d="M136 96 185 96 207 147 160 167 112 145 136 96Z" />

        <path d="M80 126 112 145 89 196 34 163" />
        <path d="M240 128 207 147 231 196 290 164" />

        <path d="M112 145 160 167 142 221 89 196" />
        <path d="M207 147 160 167 178 222 231 196" />

        <path d="M89 196 142 221 98 272 51 226" />
        <path d="M231 196 178 222 226 274 274 228" />

        <path d="M142 221 178 222 161 290" />
      </g>
    </svg>
  );
}

/* ============================================================
   06 — CREATORS
   ============================================================ */

function CreatorsArtwork() {
  return (
    <svg
      viewBox="0 0 320 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-full w-full"
    >
      <g
        stroke="white"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M71 70H174L257 152 174 234H71L153 152 71 70Z" />
        <path d="M92 87H177L242 152 177 217H92L157 152 92 87Z" />
        <path d="M113 104H179L227 152 179 200H113L161 152 113 104Z" />
        <path d="M134 121H182L212 152 182 183H134L165 152 134 121Z" />
        <path d="M155 137H184L199 152 184 167H155L170 152 155 137Z" />
      </g>
    </svg>
  );
}

/* ============================================================
   07 — GOVERNMENT
   ============================================================ */

function GovernmentArtwork() {
  return (
    <svg
      viewBox="0 0 320 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-full w-full"
    >
      <g
        stroke="white"
        strokeWidth="2.6"
        strokeLinecap="round"
      >
        <ellipse
          cx="160"
          cy="160"
          rx="113"
          ry="43"
          transform="rotate(18 160 160)"
        />

        <ellipse
          cx="160"
          cy="160"
          rx="113"
          ry="43"
          transform="rotate(72 160 160)"
        />

        <ellipse
          cx="160"
          cy="160"
          rx="113"
          ry="43"
          transform="rotate(128 160 160)"
        />

        <path d="M64 109C109 72 161 80 200 111C243 146 251 207 216 252" />
        <path d="M93 252C59 207 67 146 109 111C147 78 209 68 256 105" />

        <circle
          cx="160"
          cy="160"
          r="5"
          fill="white"
          stroke="none"
        />
      </g>
    </svg>
  );
}

/* ============================================================
   CODE-CONTROLLED INDUSTRIES
   ============================================================ */

const INDUSTRIES: IndustryItem[] = [
  {
    key: "entertainment",
    number: "01",
    title: "Entertainment",
    slug: "entertainment",
    background:
      "radial-gradient(circle at 93% 7%, rgba(49,211,239,0.95) 0%, rgba(49,211,239,0) 41%), radial-gradient(circle at 1% 95%, rgba(255,183,67,0.98) 0%, rgba(255,183,67,0) 43%), linear-gradient(137deg,#877BDD 0%,#F58EBB 54%,#54CAE6 100%)",
    artwork: <EntertainmentArtwork />,
  },
  {
    key: "enterprises",
    number: "02",
    title: "Enterprises",
    slug: "enterprises",
    background:
      "radial-gradient(circle at 89% 92%, rgba(251,184,128,0.98) 0%, rgba(251,184,128,0) 45%), radial-gradient(circle at 2% 2%, rgba(108,105,208,0.72) 0%, rgba(108,105,208,0) 47%), linear-gradient(139deg,#7971C7 0%,#EC86C1 50%,#F7AE82 100%)",
    artwork: <EnterprisesArtwork />,
  },
  {
    key: "brands",
    number: "03",
    title: "Brands",
    slug: "brands",
    background:
      "radial-gradient(circle at 3% 96%, rgba(251,197,87,1) 0%, rgba(251,197,87,0) 42%), radial-gradient(circle at 98% 100%, rgba(124,151,239,0.9) 0%, rgba(124,151,239,0) 41%), linear-gradient(139deg,#FF476A 3%,#FF6C82 45%,#FDB14B 100%)",
    artwork: <BrandsArtwork />,
  },
  {
    key: "investors",
    number: "04",
    title: "Investors",
    slug: "investors",
    background:
      "radial-gradient(circle at 7% 96%, rgba(255,249,226,0.98) 0%, rgba(255,249,226,0) 40%), radial-gradient(circle at 97% 94%, rgba(64,162,246,0.9) 0%, rgba(64,162,246,0) 42%), linear-gradient(134deg,#171640 0%,#40345E 42%,#E88E7A 74%,#61B5F0 100%)",
    artwork: <InvestorsArtwork />,
  },
  {
    key: "public-sector",
    number: "05",
    title: "Public Sector",
    slug: "public-sector",
    background:
      "radial-gradient(circle at 2% 8%, rgba(255,110,64,0.98) 0%, rgba(255,110,64,0) 47%), radial-gradient(circle at 98% 90%, rgba(99,151,216,0.9) 0%, rgba(99,151,216,0) 47%), linear-gradient(125deg,#FF7952 0%,#E7A276 48%,#789FD1 100%)",
    artwork: <PublicSectorArtwork />,
  },
  {
    key: "creators",
    number: "06",
    title: "Creators",
    slug: "creators",
    background:
      "radial-gradient(circle at 4% 4%, rgba(226,244,247,0.96) 0%, rgba(226,244,247,0) 44%), radial-gradient(circle at 97% 98%, rgba(255,100,60,0.97) 0%, rgba(255,100,60,0) 43%), linear-gradient(135deg,#D9EFF3 0%,#E36ECE 48%,#FF6943 100%)",
    artwork: <CreatorsArtwork />,
  },
  {
    key: "government",
    number: "07",
    title: "Government",
    slug: "government",
    background:
      "radial-gradient(circle at 7% 90%, rgba(105,197,231,0.85) 0%, rgba(105,197,231,0) 41%), radial-gradient(circle at 93% 9%, rgba(224,164,215,0.92) 0%, rgba(224,164,215,0) 43%), linear-gradient(134deg,#84CBE6 0%,#DCBEE9 51%,#CA88D2 100%)",
    artwork: <GovernmentArtwork />,
  },
];

/* ============================================================
   INDUSTRY CARD
   ============================================================ */

function IndustryCard({
  industry,
  index,
}: {
  industry: IndustryItem;
  index: number;
}) {
  return (
    <Link
      href={`/services?industry=${encodeURIComponent(
        industry.slug,
      )}`}
      data-industry-card
      className="
        group
        block
        w-[17.5rem]
        shrink-0
        bg-white
        text-black

        sm:w-[20rem]
        lg:w-[22rem]
        xl:w-[23.5rem]

        focus-visible:outline
        focus-visible:outline-2
        focus-visible:outline-offset-4
        focus-visible:outline-[#8F6C1A]
      "
    >
      <div
        className="
          relative
          flex
          aspect-[0.92/1]
          w-full
          items-center
          justify-center
          overflow-hidden
        "
        style={{
          background: industry.background,
        }}
      >
        <span
          className={`
            ${bodyFont.className}

            absolute
            left-5
            top-5
            z-30

            text-[0.75rem]
            font-medium
            leading-4
            text-white/80
          `}
        >
          {industry.number}
        </span>

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-[12%]
            rounded-full
            bg-white/20
            blur-[3.7rem]
          "
        />

        <div
          aria-hidden="true"
          className="
            industry-noise
            pointer-events-none
            absolute
            inset-0
            z-[1]
            opacity-[0.075]
            mix-blend-soft-light
          "
        />

        <div
          aria-hidden="true"
          className={`
            industry-svg
            industry-svg-${index + 1}

            relative
            z-10

            h-[66%]
            w-[66%]

            origin-center
            transform-gpu

            sm:h-[69%]
            sm:w-[69%]
          `}
        >
          {industry.artwork}
        </div>

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-0
            z-20
            bg-[linear-gradient(145deg,rgba(255,255,255,0.16),transparent_34%,transparent_70%,rgba(0,0,0,0.06))]
          "
        />
      </div>

      <div
        className="
          flex
          min-h-[3.75rem]
          items-center
          bg-white
          pt-3
        "
      >
        <h3
          className={`
            ${bodyFont.className}

            text-[1rem]
            font-semibold
            leading-[1.5rem]
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

export function IndustriesSection({
  eyebrow,
  heading,
  description,
  cta,
}: IndustriesSectionProps) {
  const sectionRef =
    useRef<HTMLElement>(null);

  const stickyContentRef =
    useRef<HTMLDivElement>(null);

  const viewportRef =
    useRef<HTMLDivElement>(null);

  const trackRef =
    useRef<HTMLDivElement>(null);

  const shouldReduceMotion =
    useReducedMotion();

  const [metrics, setMetrics] = useState({
    horizontalDistance: 0,
    stickyHeight: 0,
    sectionStart: 0,
  });

  const {
    horizontalDistance,
    stickyHeight,
    sectionStart,
  } = metrics;

  /* ==========================================================
     CONTENT
     ========================================================== */

  const resolvedEyebrow =
    eyebrow?.trim() ||
    "Industries we work with";

  const resolvedHeading =
    heading?.trim() ||
    "The Industries we work with?";

  const resolvedDescription =
    description?.trim() ||
    "From creating original content and building digital platforms to strategic communications and global distribution, our integrated capabilities help businesses, creators, governments, and brands grow through media and technology.";

  const ctaLabel =
    cta?.label?.trim() ||
    "Explore Capabilities";

  const ctaHref =
    cta?.href?.trim() ||
    "/services";

  /* ==========================================================
     MEASURE ACTUAL CONTENT + ACTUAL HORIZONTAL TRAVEL

     No 100svh.
     No artificial hold.
     No +24 px.
     ========================================================== */

  useEffect(() => {
    const section = sectionRef.current;
    const sticky = stickyContentRef.current;
    const viewport = viewportRef.current;
    const track = trackRef.current;

    if (!section || !sticky || !viewport || !track) {
      return;
    }

    let frame = 0;
    let cancelled = false;

    const commitMeasurement = () => {
      if (cancelled) return;

      const next = {
        horizontalDistance: Math.max(
          0,
          track.scrollWidth - viewport.clientWidth,
        ),
        stickyHeight: sticky.scrollHeight,
        sectionStart: section.getBoundingClientRect().top + window.scrollY,
      };

      setMetrics((current) =>
        current.horizontalDistance === next.horizontalDistance &&
        current.stickyHeight === next.stickyHeight &&
        Math.abs(current.sectionStart - next.sectionStart) < 0.5
          ? current
          : next,
      );
    };

    const scheduleMeasure = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(commitMeasurement);
    };

    scheduleMeasure();

    const observer = new ResizeObserver(scheduleMeasure);
    observer.observe(sticky);
    observer.observe(viewport);
    observer.observe(track);

    window.addEventListener("resize", scheduleMeasure, { passive: true });

    // Font metrics can settle after hydration. Re-measure once the loaded font
    // set is ready so the sticky release point stays exact without observing
    // the section's own computed height and creating a resize feedback loop.
    void document.fonts?.ready.then(scheduleMeasure);

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("resize", scheduleMeasure);
    };
  }, []);

  /* ==========================================================
     SCROLL

     Vertical pixels map directly to horizontal pixels.
     ========================================================== */

  const { scrollY } = useScroll();

  const smoothScrollY =
    useSpring(
      scrollY,
      SCROLL_SPRING,
    );

  const x = useTransform(
    smoothScrollY,
    (latestScrollY) => {
      if (
        horizontalDistance <= 0
      ) {
        return 0;
      }

      const rawProgress =
        (latestScrollY -
          sectionStart) /
        horizontalDistance;

      const progress = Math.min(
        1,
        Math.max(0, rawProgress),
      );

      return (
        -horizontalDistance *
        progress
      );
    },
  );

  /*
   * Section height:
   *
   * actual visible content
   * +
   * exact horizontal travel
   *
   * Nothing else.
   */
  const calculatedSectionHeight =
    shouldReduceMotion
      ? undefined
      : Math.max(
          0,
          stickyHeight +
            horizontalDistance,
        );

  return (
    <section
      ref={sectionRef}
      id="industries"
      aria-labelledby="industries-heading"
      className="
        landing-section-transition
        relative
        w-full
        bg-white
      "
      style={
        calculatedSectionHeight
          ? {
              height: `${calculatedSectionHeight}px`,
            }
          : undefined
      }
    >
      {/* =====================================================
          STICKY CONTENT

          IMPORTANT:
          NO h-[100svh]
          ===================================================== */}

      <div
        ref={stickyContentRef}
        className={`
          industries-sticky
          w-full
          bg-white

          ${
            shouldReduceMotion
              ? "relative"
              : "sticky top-0 overflow-hidden"
          }
        `}
      >
        {/* ===================================================
            HEADER
            =================================================== */}

        <div
          className="
            flex
            w-full
            flex-col
            items-start
            justify-between
            gap-8

            px-5
            pt-14

            sm:px-8
            sm:pt-16

            lg:flex-row
            lg:items-start
            lg:gap-16
            lg:px-[3.5rem]
            lg:pt-[4.5rem]

            xl:px-[4rem]
          "
        >
          {/* =================================================
              LEFT
              ================================================= */}

          <div
            className="
              flex
              w-full
              flex-col
              gap-5

              lg:w-[19rem]
              lg:shrink-0
            "
          >
            {/* ===============================================
                EYEBROW

                14 / 20
                600
                #B8B8B8
                =============================================== */}

            <p
              className={`
                ${headingFont.className}

                text-[0.875rem]
                font-semibold
                leading-[1.25rem]
                text-[#B8B8B8]
              `}
              style={{
                fontFeatureSettings:
                  '"liga" off, "clig" off',
              }}
            >
              {resolvedEyebrow}
            </p>

            {/* ===============================================
                HEADING

                32 / 40
                400
                #000
                =============================================== */}

            <h2
              id="industries-heading"
              className={`
                ${headingFont.className}

                text-[2rem]
                font-normal
                leading-[2.5rem]
                text-black
              `}
              style={{
                fontFeatureSettings:
                  '"liga" off, "clig" off',
              }}
            >
              {resolvedHeading}
            </h2>
          </div>

          {/* =================================================
              RIGHT
              ================================================= */}

          <div
            className="
              flex
              w-full
              flex-col
              items-start

              lg:w-[31.5rem]
              lg:shrink-0
            "
          >
            {/* ===============================================
                DESCRIPTION

                16 / 24
                400
                #B8B8B8
                =============================================== */}

            <p
              className={`
                ${bodyFont.className}

                text-[1rem]
                font-normal
                leading-[1.5rem]
                text-[#B8B8B8]
              `}
              style={{
                fontFeatureSettings:
                  '"liga" off, "clig" off',
              }}
            >
              {resolvedDescription}
            </p>

            <Link
              href={ctaHref}
              className={`
                ${bodyFont.className}

                group
                mt-4
                inline-flex
                items-center
                gap-1.5
                py-2

                text-[0.875rem]
                font-semibold
                leading-[1.25rem]
                text-[#8F6C1A]

                transition-opacity
                duration-200

                hover:opacity-60
              `}
            >
              <span>
                {ctaLabel}
              </span>

              <span
                className="
                  transition-transform
                  duration-200
                  group-hover:translate-x-1
                "
              >
                <ArrowIcon />
              </span>
            </Link>
          </div>
        </div>

        {/* ===================================================
            HORIZONTAL CARDS
            =================================================== */}

        <div
          ref={viewportRef}
          className="
            industries-viewport
            mt-10
            w-full
            overflow-hidden
            pb-10

            sm:mt-12
            sm:pb-12

            lg:mt-[4rem]
            lg:pb-[3.5rem]
          "
        >
          <motion.div
            ref={trackRef}
            className="
              industries-horizontal-track
              flex
              w-max
              items-start

              pl-5
              pr-5

              sm:pl-8
              sm:pr-8

              lg:pl-[3.5rem]
              lg:pr-[3.5rem]

              xl:pl-[4rem]
              xl:pr-[4rem]
            "
            style={{
              x:
                shouldReduceMotion
                  ? 0
                  : x,

              gap: CARD_GAP_PX,
            }}
          >
            {INDUSTRIES.map(
              (
                industry,
                index,
              ) => (
                <IndustryCard
                  key={industry.key}
                  industry={
                    industry
                  }
                  index={index}
                />
              ),
            )}
          </motion.div>
        </div>
      </div>

      {/* =====================================================
          STYLES
          ===================================================== */}

      <style>{`
        /* ==================================================
           SVG INTERACTION
           ================================================== */

        .industry-svg {
          transition:
            transform 850ms
              cubic-bezier(
                0.16,
                1,
                0.3,
                1
              ),
            filter 850ms
              cubic-bezier(
                0.16,
                1,
                0.3,
                1
              );

          filter:
            drop-shadow(
              0 1.6rem 2.2rem
              rgba(0, 0, 0, 0.09)
            );
        }

        [data-industry-card]:hover
          .industry-svg {
          transform:
            scale(1.075)
            rotate(7deg);

          filter:
            drop-shadow(
              0 2rem 2.7rem
              rgba(0, 0, 0, 0.14)
            );
        }

        [data-industry-card]:nth-child(2):hover
          .industry-svg {
          transform:
            scale(1.07)
            rotate(-8deg);
        }

        [data-industry-card]:nth-child(3):hover
          .industry-svg {
          transform:
            scale(1.08)
            rotate(11deg);
        }

        [data-industry-card]:nth-child(4):hover
          .industry-svg {
          transform:
            scale(1.07)
            rotate(-6deg);
        }

        [data-industry-card]:nth-child(5):hover
          .industry-svg {
          transform:
            scale(1.065)
            rotate(8deg);
        }

        [data-industry-card]:nth-child(6):hover
          .industry-svg {
          transform:
            scale(1.08)
            translateX(0.55rem);
        }

        [data-industry-card]:nth-child(7):hover
          .industry-svg {
          transform:
            scale(1.075)
            rotate(-9deg);
        }

        /* ==================================================
           SUBTLE TEXTURE
           ================================================== */

        .industry-noise {
          background-image:
            repeating-radial-gradient(
              circle at 24% 31%,
              rgba(
                  255,
                  255,
                  255,
                  0.18
                )
                0,
              rgba(
                  255,
                  255,
                  255,
                  0.18
                )
                0.6px,
              transparent 0.8px,
              transparent 3px
            );
        }

        /* ==================================================
           MOBILE / TABLET

           Normal horizontal touch scrolling.
           No sticky vertical-scroll conversion.
           ================================================== */

        @media (max-width: 1023px) {
          #industries {
            height: auto !important;
          }

          .industries-sticky {
            position: relative !important;
            top: auto !important;
            overflow: visible !important;
          }

          .industries-viewport {
            overflow-x: auto !important;
            overflow-y: hidden !important;
            overscroll-behavior-x:
              contain;
            scrollbar-width: none;
            -ms-overflow-style: none;
          }

          .industries-viewport::-webkit-scrollbar {
            display: none;
          }

          .industries-horizontal-track {
            transform: none !important;
          }
        }

        /* ==================================================
           REDUCED MOTION
           ================================================== */

        @media (
          prefers-reduced-motion: reduce
        ) {
          #industries {
            height: auto !important;
          }

          .industries-sticky {
            position: relative !important;
            top: auto !important;
            overflow: visible !important;
          }

          .industries-viewport {
            overflow-x: auto !important;
            scrollbar-width: none;
          }

          .industries-viewport::-webkit-scrollbar {
            display: none;
          }

          .industries-horizontal-track {
            transform: none !important;
          }

          .industry-svg {
            transition: none !important;
          }

          [data-industry-card]:hover
            .industry-svg {
            transform: none !important;
          }
        }
      `}</style>
    </section>
  );
}