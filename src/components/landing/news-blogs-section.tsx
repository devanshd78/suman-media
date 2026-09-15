"use client";

import { TextReveal } from "@/components/ui/scroll-text-reveal";
import Image from "@/components/ui/image";
import Link from "next/link";

import {
  inter,
  plusJakartaSans,
} from "@/lib/fonts";

import type {
  CmsCta,
  CmsFeaturedInsight,
} from "@/types/cms";

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

type NewsBlogCardData = {
  id: string;
  image: string;
  imagePosition?: string;
  title: string;
  description: string;
  href: string;
};

type NewsBlogsSectionProps = {
  revealText?: boolean;
  eyebrow?: string | null;
  heading?: string | null;
  cta?: CmsCta | null;
  articles?: CmsFeaturedInsight[] | null;
};

/* ============================================================
   CONFIG
   ============================================================ */

/*
 * Pointer movement below this amount is treated as a normal click.
 *
 * Once movement exceeds this threshold, the interaction becomes
 * a carousel drag and link navigation is suppressed for that gesture.
 */
const DRAG_THRESHOLD = 7;

/* ============================================================
   NEWS & BLOGS FALLBACK
   ============================================================ */

const FALLBACK_NEWS_BLOGS: NewsBlogCardData[] = [
  {
    id: "fallback-news-cannes-1",
    image:
      "/cannes/cannes-red-carpet-group-01.jpg",
    imagePosition:
      "center 46%",
    title:
      "Abhijat Marathi at Cannes 2026",
    description:
      "A look at Abhijat Marathi's Cannes 2026 presence, from the Bharat Pavilion to red-carpet moments celebrating Marathi culture on a global stage.",
    href:
      "/news-and-blogs/abhijat-marathi-at-cannes-2026",
  },
  {
    id: "fallback-news-cannes-2",
    image:
      "/cannes/cannes-riviera-portrait-01.jpg",
    imagePosition:
      "34% 46%",
    title:
      "Prajakta Mali Cannes Moments 2026",
    description:
      "Selected photographs from Cannes 2026 featuring Marathi culture, fashion and the international festival atmosphere.",
    href:
      "/news-and-blogs/prajakta-mali-cannes-moments-2026",
  },
  {
    id: "fallback-news-cannes-3",
    image:
      "/cannes/cannes-pavilion-guests-01.jpg",
    imagePosition:
      "center 34%",
    title:
      "Inside the Bharat Pavilion at Cannes",
    description:
      "Conversations, meetings and cultural exchange from the Bharat Pavilion during Cannes 2026.",
    href:
      "/news-and-blogs/inside-bharat-pavilion-cannes-2026",
  },
  {
    id: "fallback-news-cannes-4",
    image:
      "/cannes/cannes-red-carpet-blue-look-01.jpg",
    imagePosition:
      "64% 50%",
    title:
      "Marathi Culture on the Cannes Red Carpet",
    description:
      "A Cannes red-carpet moment bringing regional identity, fashion and Marathi culture into an international festival setting.",
    href:
      "/news-and-blogs/marathi-culture-cannes-red-carpet",
  },
  {
    id: "fallback-news-cannes-5",
    image:
      "/cannes/cannes-red-carpet-group-02.jpg",
    imagePosition:
      "center 43%",
    title:
      "India at Cannes: Red Carpet Moments",
    description:
      "Festival guests and cultural representatives come together for a series of memorable Cannes 2026 red-carpet moments.",
    href:
      "/news-and-blogs/india-at-cannes-red-carpet-moments",
  },
  {
    id: "fallback-news-cannes-6",
    image:
      "/cannes/cannes-pavilion-guests-02.jpg",
    imagePosition:
      "center 34%",
    title:
      "People and Conversations at Cannes 2026",
    description:
      "A closer look at the meetings, conversations and connections created around the Bharat Pavilion at Cannes 2026.",
    href:
      "/news-and-blogs/people-and-conversations-cannes-2026",
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
   NEWS & BLOG CARD
   ============================================================ */

function NewsBlogCard({
  article,
  revealText = false,
}: {
  article: NewsBlogCardData;
  revealText?: boolean;
}) {
  return (
    <article
      data-news-blog-card
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
      {/* =====================================================
          COMPLETE CARD IS A REAL NEXT.JS LINK
          ===================================================== */}

      <Link
        href={article.href}
        draggable={false}
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
            src={article.image}
            alt={article.title}
            fill
            loading="lazy"
            quality={84}
            draggable={false}
            sizes="
              (max-width: 639px) 86vw,
              (max-width: 767px) 72vw,
              (max-width: 1023px) 68vw,
              59vw
            "
            style={{
              objectPosition:
                article.imagePosition ??
                "center",
            }}
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
            <TextReveal
              enabled={revealText}
            >
              {article.title}
            </TextReveal>
          </h3>

          {/* =================================================
              DESCRIPTION / LEARN MORE
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
              <TextReveal
                enabled={revealText}
              >
                {article.description}
              </TextReveal>
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
              <TextReveal
                enabled={revealText}
              >
                learn more
              </TextReveal>
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}

/* ============================================================
   NEWS & BLOGS SECTION
   ============================================================ */

export function NewsBlogsSection({
  eyebrow,
  heading,
  cta,
  articles,
  revealText = false,
}: NewsBlogsSectionProps) {
  /* ==========================================================
     CMS ARTICLES
     ========================================================== */

  const cmsNewsBlogs:
    NewsBlogCardData[] =
    articles
      ?.filter(
        (item) =>
          Boolean(
            item?.title?.trim(),
          ) &&
          Boolean(
            item?.slug?.trim(),
          ) &&
          Boolean(
            item?.excerpt?.trim(),
          ) &&
          Boolean(
            item?.imageUrl?.trim(),
          ),
      )
      .map((item) => ({
        id:
          item._id,

        image:
          item.imageUrl,

        imagePosition:
          typeof item.imageHotspotX ===
            "number" &&
            typeof item.imageHotspotY ===
            "number"
            ? `${Math.round(
              item.imageHotspotX *
              100,
            )}% ${Math.round(
              item.imageHotspotY *
              100,
            )}%`
            : undefined,

        title:
          item.title,

        description:
          item.excerpt,

        href:
          `/news-and-blogs/${item.slug}`,
      })) ?? [];

  const visibleNewsBlogs =
    cmsNewsBlogs.length > 0
      ? cmsNewsBlogs
      : FALLBACK_NEWS_BLOGS;

  /* ==========================================================
     SECTION CONTENT
     ========================================================== */

  const sectionEyebrow =
    eyebrow?.trim() ||
    "LATEST ANNOUNCEMENTS";

  const sectionHeading =
    heading?.trim() ||
    "News & Blogs";

  const sectionCtaLabel =
    cta?.label?.trim() ||
    "view all";

  const sectionCtaHref =
    cta?.href?.trim() ||
    "/news-and-blogs";

  /* ==========================================================
     REFS
     ========================================================== */

  const scrollerRef =
    useRef<HTMLDivElement>(
      null,
    );

  const dragRef =
    useRef({
      pointerId: -1,
      startX: 0,
      startScrollLeft: 0,
      moved: false,
    });

  const suppressClickRef =
    useRef(false);

  /* ==========================================================
     STATE
     ========================================================== */

  const [
    canScrollPrevious,
    setCanScrollPrevious,
  ] =
    useState(false);

  const [
    canScrollNext,
    setCanScrollNext,
  ] =
    useState(true);

  const [
    isDragging,
    setIsDragging,
  ] =
    useState(false);

  /* ==========================================================
     GET CARDS
     ========================================================== */

  const getCards =
    useCallback(() => {
      const scroller =
        scrollerRef.current;

      if (!scroller) {
        return [] as HTMLElement[];
      }

      return Array.from(
        scroller.querySelectorAll<HTMLElement>(
          "[data-news-blog-card]",
        ),
      );
    }, []);

  /* ==========================================================
     UPDATE NAVIGATION STATE
     ========================================================== */

  const updateScrollState =
    useCallback(() => {
      const scroller =
        scrollerRef.current;

      if (!scroller) {
        return;
      }

      const maxScroll =
        Math.max(
          0,
          scroller.scrollWidth -
          scroller.clientWidth,
        );

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
     SNAP TO NEAREST CARD
     ========================================================== */

  const snapToNearestCard =
    useCallback(
      (
        behavior:
          ScrollBehavior =
          "smooth",
      ) => {
        const scroller =
          scrollerRef.current;

        const cards =
          getCards();

        if (
          !scroller ||
          cards.length === 0
        ) {
          return;
        }

        const scrollerRect =
          scroller.getBoundingClientRect();

        let nearestLeft =
          scroller.scrollLeft;

        let nearestDistance =
          Number.POSITIVE_INFINITY;

        cards.forEach(
          (card) => {
            const cardRect =
              card.getBoundingClientRect();

            const cardLeft =
              scroller.scrollLeft +
              cardRect.left -
              scrollerRect.left;

            const distance =
              Math.abs(
                cardRect.left -
                scrollerRect.left,
              );

            if (
              distance <
              nearestDistance
            ) {
              nearestDistance =
                distance;

              nearestLeft =
                cardLeft;
            }
          },
        );

        const maxScroll =
          Math.max(
            0,
            scroller.scrollWidth -
            scroller.clientWidth,
          );

        scroller.scrollTo({
          left:
            Math.min(
              maxScroll,
              Math.max(
                0,
                nearestLeft,
              ),
            ),

          behavior,
        });
      },
      [getCards],
    );

  /* ==========================================================
     FINISH POINTER INTERACTION

     IMPORTANT:
     - click => no suppression, Link redirects
     - drag  => suppress the release click, then snap
     ========================================================== */

  const finishDrag =
    useCallback(
      (
        pointerId: number,
      ) => {
        const scroller =
          scrollerRef.current;

        if (
          !scroller ||
          dragRef.current
            .pointerId !==
          pointerId
        ) {
          return;
        }

        /*
         * Capture whether this was actually a drag BEFORE
         * releasing pointer capture.
         */
        const moved =
          dragRef.current.moved;

        /*
         * Only real drags capture the pointer now.
         */
        if (
          scroller.hasPointerCapture(
            pointerId,
          )
        ) {
          scroller.releasePointerCapture(
            pointerId,
          );
        }

        dragRef.current.pointerId =
          -1;

        dragRef.current.moved =
          false;

        setIsDragging(false);

        /*
         * Normal click.
         *
         * Do nothing here.
         *
         * The browser is now free to dispatch the normal click
         * to the card's Next.js <Link>.
         */
        if (!moved) {
          return;
        }

        /*
         * Actual drag.
         *
         * Prevent the pointer release from accidentally opening
         * the link underneath it.
         */
        suppressClickRef.current =
          true;

        window.requestAnimationFrame(
          () => {
            snapToNearestCard(
              "smooth",
            );

            updateScrollState();
          },
        );

        /*
         * Only suppress this drag's accidental click.
         * The next real click should navigate normally.
         */
        window.setTimeout(
          () => {
            suppressClickRef.current =
              false;
          },
          150,
        );
      },
      [
        snapToNearestCard,
        updateScrollState,
      ],
    );

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
  }, [
    updateScrollState,
  ]);

  /* ==========================================================
     PREVIOUS / NEXT BUTTONS
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
            "[data-news-blog-card]",
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

          behavior:
            "smooth",
        });
      },
      [],
    );

  /* ==========================================================
     RENDER
     ========================================================== */

  return (
    <section
      id="news-blogs"
      aria-labelledby="news-blogs-heading"
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
            LEFT HEADER
            =================================================== */}

        <div
          className="
            min-w-0
            max-w-[45rem]
          "
        >
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
            <TextReveal
              enabled={revealText}
            >
              {sectionEyebrow}
            </TextReveal>
          </p>

          <h2
            id="news-blogs-heading"
            className={`
              landing-title

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
            <TextReveal
              enabled={revealText}
            >
              {sectionHeading}
            </TextReveal>
          </h2>
        </div>

        {/* ===================================================
            VIEW ALL
            =================================================== */}

        <Link
          href={
            sectionCtaHref
          }
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
            <TextReveal
              enabled={revealText}
            >
              {sectionCtaLabel}
            </TextReveal>
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
          CAROUSEL
          ===================================================== */}

      <div
        ref={scrollerRef}
        data-landing-parallax-layer="reverse"
        data-dragging={
          isDragging
        }
        role="region"
        aria-label="News and Blogs carousel"
        tabIndex={0}

        /* ===================================================
           CLICK

           Suppress only the synthetic/accidental click after
           an actual horizontal drag.
           =================================================== */

        onClickCapture={(
          event,
        ) => {
          if (
            !suppressClickRef.current
          ) {
            return;
          }

          event.preventDefault();
          event.stopPropagation();

          suppressClickRef.current =
            false;
        }}

        /* ===================================================
           NATIVE HTML DRAG

           Stops browser image ghost dragging without affecting
           the normal click/navigation lifecycle.
           =================================================== */

        onDragStart={(
          event,
        ) => {
          event.preventDefault();
        }}

        /* ===================================================
           POINTER DOWN

           IMPORTANT:
           DO NOT CAPTURE THE POINTER HERE.

           At this point it may simply be a normal Link click.
           =================================================== */

        onPointerDown={(
          event,
        ) => {
          /*
           * Mouse must use the primary button.
           */
          if (
            event.pointerType ===
            "mouse" &&
            event.button !== 0
          ) {
            return;
          }

          const scroller =
            scrollerRef.current;

          if (!scroller) {
            return;
          }

          /*
           * Clear any stale suppression from a previous gesture.
           */
          suppressClickRef.current =
            false;

          dragRef.current = {
            pointerId:
              event.pointerId,

            startX:
              event.clientX,

            startScrollLeft:
              scroller.scrollLeft,

            moved:
              false,
          };

          /*
           * NO setPointerCapture() here.
           *
           * This is the important redirect fix.
           */
        }}

        /* ===================================================
           POINTER MOVE

           Only become a drag after moving DRAG_THRESHOLD px.
           =================================================== */

        onPointerMove={(
          event,
        ) => {
          const scroller =
            scrollerRef.current;

          const drag =
            dragRef.current;

          if (
            !scroller ||
            drag.pointerId !==
            event.pointerId
          ) {
            return;
          }

          const delta =
            event.clientX -
            drag.startX;

          /*
           * Still potentially a click.
           */
          if (!drag.moved) {
            if (
              Math.abs(delta) <
              DRAG_THRESHOLD
            ) {
              return;
            }

            /*
             * Horizontal drag confirmed.
             */
            drag.moved =
              true;

            setIsDragging(
              true,
            );

            /*
             * Capture ONLY now.
             *
             * Normal card clicks never enter this branch.
             */
            if (
              !scroller.hasPointerCapture(
                event.pointerId,
              )
            ) {
              scroller.setPointerCapture(
                event.pointerId,
              );
            }
          }

          /*
           * Perform the horizontal drag.
           */
          scroller.scrollLeft =
            drag.startScrollLeft -
            delta;
        }}

        /* ===================================================
           POINTER RELEASE
           =================================================== */

        onPointerUp={(
          event,
        ) => {
          finishDrag(
            event.pointerId,
          );
        }}

        onPointerCancel={(
          event,
        ) => {
          finishDrag(
            event.pointerId,
          );
        }}

        /* ===================================================
           LOST CAPTURE

           Normally fires only for a confirmed drag because
           normal clicks never request pointer capture.
           =================================================== */

        onLostPointerCapture={(
          event,
        ) => {
          if (
            dragRef.current
              .pointerId !==
            event.pointerId
          ) {
            return;
          }

          dragRef.current.pointerId =
            -1;

          dragRef.current.moved =
            false;

          setIsDragging(
            false,
          );
        }}

        /* ===================================================
           STYLES
           =================================================== */

        className="
          news-blogs-track

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

          cursor-grab

          select-none

          [touch-action:pan-y]

          pb-1

          sm:mt-12
          sm:gap-6

          lg:mt-16
          lg:gap-8
        "
      >
        {visibleNewsBlogs.map(
          (article) => (
            <NewsBlogCard
              key={article.id}
              article={article}
              revealText={
                revealText
              }
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
        {/* ===================================================
            PREVIOUS
            =================================================== */}

        <button
          type="button"
          onClick={() =>
            scrollCards(-1)
          }
          disabled={
            !canScrollPrevious
          }
          aria-label="Previous News & Blog article"
          className="
            inline-flex

            h-12
            w-12

            shrink-0

            items-center
            justify-center

            rounded-[0.25rem]

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

        {/* ===================================================
            NEXT
            =================================================== */}

        <button
          type="button"
          onClick={() =>
            scrollCards(1)
          }
          disabled={
            !canScrollNext
          }
          aria-label="Next News & Blog article"
          className="
            inline-flex

            h-12
            w-12

            shrink-0

            items-center
            justify-center

            rounded-[0.25rem]

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
          LOCAL CAROUSEL CSS
          ===================================================== */}

      <style>{`
        .news-blogs-track {
          -ms-overflow-style: none;
          scrollbar-width: none;
          -webkit-overflow-scrolling: touch;
        }

        .news-blogs-track::-webkit-scrollbar {
          display: none;
        }

        /*
         * Disable native snap + smooth behavior only while
         * the user is actively dragging.
         */
        .news-blogs-track[data-dragging="true"] {
          cursor: grabbing;
          scroll-behavior: auto;
          scroll-snap-type: none;
        }

        /*
         * Once drag intent has been confirmed, links should
         * not react to pointer interaction.
         *
         * Before that point the links remain completely normal,
         * which is why clicking now redirects correctly.
         */
        .news-blogs-track[data-dragging="true"] a {
          pointer-events: none;
        }

        @media (prefers-reduced-motion: reduce) {
          .news-blogs-track {
            scroll-behavior: auto;
          }

          #news-blogs
            [data-news-blog-card]
            img {
            transition: none !important;
            transform: none !important;
          }
        }
      `}</style>
    </section>
  );
}