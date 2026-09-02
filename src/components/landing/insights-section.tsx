"use client";

import Image from "@/components/ui/image";
import Link from "next/link";

import {
  inter,
  plusJakartaSans,
} from "@/lib/fonts";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

/* ============================================================
   TYPES
   ============================================================ */

type Direction =
  | "left"
  | "right";

type Insight = {
  id: number;
  image: string;
  title: string;
  description: string;
  href: string;
};

/* ============================================================
   FRONTEND-CONTROLLED INSIGHTS

   NO SANITY / CMS DEPENDENCY.

   Images:
   /public/images/landing/insights/Image1.png
   /public/images/landing/insights/Image2.png
   /public/images/landing/insights/Image3.png
   ============================================================ */

const INSIGHTS: Insight[] = [
  {
    id: 1,

    image:
      "/images/landing/insights/Image1.png",

    title:
      "Suman Entertainment & Media Pvt. Ltd.",

    description:
      "Suman Entertainment & Media Pvt. Ltd. brings together platforms, content, technology, experiences and entertainment under one growing media ecosystem.",

    href: "/insights",
  },

  {
    id: 2,

    image:
      "/images/landing/insights/Image2.png",

    title:
      "Digital Platforms and OTT",

    description:
      "Building digital entertainment platforms and OTT experiences designed around regional storytelling, audiences and new-age distribution.",

    href: "/insights",
  },

  {
    id: 3,

    image:
      "/images/landing/insights/Image3.png",

    title:
      "Media, Culture and Entertainment",

    description:
      "Creating stories, experiences and entertainment properties that connect culture, creators, technology and audiences across platforms.",

    href: "/insights",
  },
];

/* ============================================================
   ICON
   ============================================================ */

function ArrowIcon({
  direction = "right",
}: {
  direction?: Direction;
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className="
        h-4
        w-4
        shrink-0
      "
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
   INSIGHT CARD
   ============================================================ */

function InsightCard({
  insight,
}: {
  insight: Insight;
}) {
  return (
    <article
      data-insight-card
      className="
        w-[86vw]
        shrink-0
        snap-start

        sm:w-[72vw]

        md:w-[68vw]

        lg:w-[58%]

        xl:w-[59%]
      "
    >
      <Link
        href={insight.href}
        className="
          group
          block

          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-[#8F6C1A]/35
          focus-visible:ring-offset-4
        "
      >
        {/* ===================================================
            IMAGE
            =================================================== */}

        <div
          className="
            relative
            aspect-[1.91/1]
            w-full
            overflow-hidden

            bg-[#EEE9DC]
          "
        >
          <Image
            src={insight.image}
            alt={insight.title}
            fill
            loading="lazy"
            quality={84}
            sizes="
              (max-width: 639px) 86vw,
              (max-width: 767px) 72vw,
              (max-width: 1023px) 68vw,
              59vw
            "
            className="
              select-none
              object-cover

              transition-transform
              duration-[700ms]
              ease-[cubic-bezier(0.16,1,0.3,1)]

              group-hover:scale-[1.018]
            "
          />
        </div>

        {/* ===================================================
            CONTENT
            =================================================== */}

        <div
          className="
            pt-4

            sm:pt-5
          "
        >
          {/* =================================================
              TITLE

              Inter
              20 / 28
              600
              ================================================= */}

          <h3
            className={`
              ${inter.className}

              text-[1.125rem]
              font-semibold
              leading-[1.625rem]
              text-black

              [font-feature-settings:'liga'_off,'clig'_off]

              sm:text-[1.25rem]
              sm:leading-[1.75rem]
            `}
          >
            {insight.title}
          </h3>

          {/* =================================================
              DESCRIPTION / CTA
              ================================================= */}

          <div
            className="
              mt-1.5

              flex
              w-full
              items-start
              justify-between

              gap-4

              sm:mt-2
              sm:gap-5
            "
          >
            <p
              className={`
                ${plusJakartaSans.className}

                line-clamp-2
                min-w-0
                max-w-[72%]

                text-[0.875rem]
                font-normal
                leading-[1.375rem]

                text-[#B8B8B8]

                [font-feature-settings:'liga'_off,'clig'_off]

                sm:max-w-[78%]
                sm:text-[1rem]
                sm:leading-[1.5rem]
              `}
            >
              {insight.description}
            </p>

            <span
              className={`
                ${inter.className}

                shrink-0

                text-center
                text-[0.875rem]
                font-semibold
                leading-[1.375rem]

                text-[#8F6C1A]

                underline
                decoration-auto
                underline-offset-auto

                [font-feature-settings:'liga'_off,'clig'_off]
                [text-decoration-skip-ink:none]
                [text-underline-position:from-font]

                transition-opacity
                duration-200

                group-hover:opacity-65

                sm:text-[1rem]
                sm:leading-[1.5rem]
              `}
            >
              learn more
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}

/* ============================================================
   INSIGHTS SECTION
   ============================================================ */

export function InsightsSection() {
  const scrollerRef =
    useRef<HTMLDivElement>(null);

  const [
    canScrollPrevious,
    setCanScrollPrevious,
  ] = useState(false);

  const [
    canScrollNext,
    setCanScrollNext,
  ] = useState(true);

  /* ==========================================================
     UPDATE NAV STATE
     ========================================================== */

  const updateScrollState =
    useCallback(() => {
      const scroller =
        scrollerRef.current;

      if (!scroller) {
        return;
      }

      const maxScroll =
        scroller.scrollWidth -
        scroller.clientWidth;

      const left =
        scroller.scrollLeft;

      setCanScrollPrevious(
        left > 4,
      );

      setCanScrollNext(
        left <
          maxScroll - 4,
      );
    }, []);

  /* ==========================================================
     SCROLL / RESIZE OBSERVER
     ========================================================== */

  useEffect(() => {
    const scroller =
      scrollerRef.current;

    if (!scroller) {
      return;
    }

    let frame = 0;

    const scheduleUpdate =
      () => {
        window.cancelAnimationFrame(
          frame,
        );

        frame =
          window.requestAnimationFrame(
            updateScrollState,
          );
      };

    scheduleUpdate();

    const observer =
      new ResizeObserver(
        scheduleUpdate,
      );

    observer.observe(
      scroller,
    );

    scroller.addEventListener(
      "scroll",
      scheduleUpdate,
      {
        passive: true,
      },
    );

    return () => {
      window.cancelAnimationFrame(
        frame,
      );

      observer.disconnect();

      scroller.removeEventListener(
        "scroll",
        scheduleUpdate,
      );
    };
  }, [updateScrollState]);

  /* ==========================================================
     SCROLL BUTTONS
     ========================================================== */

  const scrollCards =
    useCallback(
      (
        direction:
          | -1
          | 1,
      ) => {
        const scroller =
          scrollerRef.current;

        if (!scroller) {
          return;
        }

        const card =
          scroller.querySelector<HTMLElement>(
            "[data-insight-card]",
          );

        if (!card) {
          return;
        }

        const computed =
          window.getComputedStyle(
            scroller,
          );

        const gap =
          Number.parseFloat(
            computed.columnGap ||
              computed.gap ||
              "0",
          ) || 0;

        const amount =
          card.offsetWidth +
          gap;

        scroller.scrollBy({
          left:
            direction *
            amount,

          behavior: "smooth",
        });
      },
      [],
    );

  /* ==========================================================
     RENDER
     ========================================================== */

  return (
    <section
      id="insights"
      aria-labelledby="insights-heading"
      className="
        landing-section-transition

        relative
        mx-auto
        w-full
        max-w-full
        overflow-hidden

        bg-white

        px-5
        py-16

        sm:px-8
        sm:py-20

        lg:px-[3.5rem]
        lg:py-[6rem]

        xl:px-[4rem]
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

          gap-6

          sm:flex-row
          sm:items-end
          sm:justify-between
          sm:gap-8
        "
      >
        {/* ===================================================
            LEFT
            =================================================== */}

        <div
          className="
            min-w-0
            max-w-[45rem]
          "
        >
          {/* =================================================
              EYEBROW

              Plus Jakarta Sans
              14 / 20
              600
              #B8B8B8
              ================================================= */}

          <p
            className={`
              ${plusJakartaSans.className}

              text-[0.875rem]
              font-semibold
              leading-[1.25rem]

              text-[#B8B8B8]

              [font-feature-settings:'liga'_off,'clig'_off]
            `}
          >
            LATEST ANNOUNCEMENTS
          </p>

          {/* =================================================
              HEADING

              Plus Jakarta Sans
              40 / 48
              600
              ================================================= */}

          <h2
            id="insights-heading"
            className={`
              ${plusJakartaSans.className}

              mt-1

              text-[2rem]
              font-semibold
              leading-[2.5rem]

              tracking-[-0.03125rem]

              text-black

              [font-feature-settings:'liga'_off,'clig'_off]

              sm:text-[2.25rem]
              sm:leading-[2.75rem]

              lg:text-[2.5rem]
              lg:leading-[3rem]
            `}
          >
            News and blogs
          </h2>
        </div>

        {/* ===================================================
            VIEW ALL
            =================================================== */}

        <Link
          href="/insights"
          className={`
            ${inter.className}

            group

            inline-flex
            shrink-0
            items-center
            gap-1

            py-2

            text-[0.875rem]
            font-semibold
            leading-[1.25rem]

            text-[#8F6C1A]

            [font-feature-settings:'liga'_off,'clig'_off]

            transition-opacity
            duration-200

            hover:opacity-65
          `}
        >
          <span>
            view all
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

      {/* =====================================================
          CARDS
          ===================================================== */}

      <div
        ref={scrollerRef}
        data-landing-parallax-layer="reverse"
        className="
          insights-track

          mt-10

          flex
          w-full

          snap-x
          snap-mandatory

          gap-5

          overflow-x-auto
          overflow-y-hidden

          overscroll-x-contain

          scroll-smooth

          pb-1

          sm:mt-12
          sm:gap-6

          lg:mt-16
          lg:gap-8
        "
      >
        {INSIGHTS.map(
          (insight) => (
            <InsightCard
              key={insight.id}
              insight={insight}
            />
          ),
        )}
      </div>

      {/* =====================================================
          NAVIGATION
          ===================================================== */}

      <div
        className="
          mt-8

          flex
          w-full
          justify-end
          gap-2

          sm:mt-10
        "
      >
        {/* PREVIOUS */}

        <button
          type="button"
          onClick={() =>
            scrollCards(-1)
          }
          disabled={
            !canScrollPrevious
          }
          aria-label="Previous announcement"
          className="
            inline-flex
            h-12
            w-12
            shrink-0
            items-center
            justify-center

            rounded-lg

            bg-[#8F6C1A]
            text-white

            transition-[background-color,opacity,transform]
            duration-200

            hover:bg-[#806016]

            active:scale-[0.96]

            disabled:cursor-default
            disabled:bg-[#FCFAF5]
            disabled:text-[#8F6C1A]
            disabled:opacity-60

            focus-visible:outline
            focus-visible:outline-2
            focus-visible:outline-offset-2
            focus-visible:outline-[#8F6C1A]
          "
        >
          <ArrowIcon
            direction="left"
          />
        </button>

        {/* NEXT */}

        <button
          type="button"
          onClick={() =>
            scrollCards(1)
          }
          disabled={
            !canScrollNext
          }
          aria-label="Next announcement"
          className="
            inline-flex
            h-12
            w-12
            shrink-0
            items-center
            justify-center

            rounded-lg

            bg-[#8F6C1A]
            text-white

            transition-[background-color,opacity,transform]
            duration-200

            hover:bg-[#806016]

            active:scale-[0.96]

            disabled:cursor-default
            disabled:bg-[#FCFAF5]
            disabled:text-[#8F6C1A]
            disabled:opacity-60

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
          CSS
          ===================================================== */}

      <style>{`
        .insights-track {
          scrollbar-width: none;
          -ms-overflow-style: none;
          -webkit-overflow-scrolling: touch;
        }

        .insights-track::-webkit-scrollbar {
          display: none;
        }

        @media (
          prefers-reduced-motion: reduce
        ) {
          .insights-track {
            scroll-behavior: auto;
          }

          #insights
            [data-insight-card]
            img {
            transition: none !important;
            transform: none !important;
          }
        }
      `}</style>
    </section>
  );
}