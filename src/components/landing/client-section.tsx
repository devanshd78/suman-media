"use client";

import Image from "@/components/ui/image";
import Link from "next/link";

import {
  plusJakartaSans as plusJakarta,
} from "@/lib/fonts";

import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

/* ============================================================
   TYPES
   ============================================================ */

type Slide = {
  id: number;
  image: string;
  eyebrow: string;
  title: string;
  description: string;
  watchHref?: string;
  learnHref?: string;
};

/* ============================================================
   SLIDES
   ============================================================ */

const SLIDES: Slide[] = [
  {
    id: 1,
    image:
      "/images/landing/client/Image1.png",

    eyebrow:
      "01. EVENT & EXPERIENCES",

    title:
      "Experiences Beyond the Screen",

    description:
      "Delivering concerts, cultural festivals, corporate events, product launches, and large-scale public experiences that connect brands with audiences.",

    watchHref: "#",
    learnHref: "#",
  },

  {
    id: 2,
    image:
      "/images/landing/client/Image2.png",

    eyebrow:
      "02. MEDIA & ENTERTAINMENT",

    title:
      "Stories Built for Every Screen",

    description:
      "Creating entertainment-led formats, campaigns, and media experiences designed to move seamlessly across platforms and audiences.",

    watchHref: "#",
    learnHref: "#",
  },

  {
    id: 3,
    image:
      "/images/landing/client/Image3.png",

    eyebrow:
      "03. DIGITAL & INTERACTIVE",

    title:
      "Interactive Experiences That Connect",

    description:
      "Building digital-first experiences that combine content, culture, technology, and participation to create stronger audience engagement.",

    watchHref: "#",
    learnHref: "#",
  },
];

/* ============================================================
   CONFIG
   ============================================================ */

const AUTOPLAY_MS = 5200;

const SLIDE_GAP_PX = 40;

/*
 * Smooth UI animation.
 *
 * A controlled tween is preferable here to repeatedly starting
 * new springs while the user is rapidly clicking navigation.
 */
const SLIDE_DURATION = 0.72;

const SLIDE_EASE = [
  0.22,
  1,
  0.36,
  1,
] as const;

/* ============================================================
   LOOP

   Physical structure:

   [03 clone] [01] [02] [03] [01 clone]

   Starting position:
                ↑ 01
   ============================================================ */

const LOOPED_SLIDES =
  SLIDES.length > 1
    ? [
        SLIDES[
          SLIDES.length - 1
        ],
        ...SLIDES,
        SLIDES[0],
      ]
    : SLIDES;

/* ============================================================
   HELPERS
   ============================================================ */

function physicalToLogical(
  physicalIndex: number,
) {
  if (SLIDES.length <= 1) {
    return 0;
  }

  if (physicalIndex === 0) {
    return SLIDES.length - 1;
  }

  if (
    physicalIndex ===
    SLIDES.length + 1
  ) {
    return 0;
  }

  return physicalIndex - 1;
}

/* ============================================================
   ICONS
   ============================================================ */

function ArrowLeftIcon() {
  return (
    <svg
      aria-hidden="true"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      className="h-6 w-6"
    >
      <path
        d="M15 18L9 12L15 6"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg
      aria-hidden="true"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      className="h-6 w-6"
    >
      <path
        d="M9 18L15 12L9 6"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SmallArrowRight({
  inverse = false,
}: {
  inverse?: boolean;
}) {
  return (
    <svg
      aria-hidden="true"
      width="8"
      height="14"
      viewBox="0 0 8 14"
      fill="none"
      className="
        h-3
        w-1.5
        shrink-0
      "
    >
      <path
        d="M1 13L7 7L1 1"
        stroke={
          inverse
            ? "white"
            : "rgba(143,108,26,0.8)"
        }
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg
      aria-hidden="true"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      className="h-6 w-6"
    >
      <rect
        x="7.5"
        y="5.5"
        width="3"
        height="13"
        rx="1.5"
        fill="white"
      />

      <rect
        x="13.5"
        y="5.5"
        width="3"
        height="13"
        rx="1.5"
        fill="white"
      />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg
      aria-hidden="true"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      className="h-6 w-6"
    >
      <path
        d="M9 7.5L17 12L9 16.5V7.5Z"
        fill="white"
      />
    </svg>
  );
}

/* ============================================================
   HEADER
   ============================================================ */

function HeaderText() {
  const reduceMotion =
    useReducedMotion();

  return (
    <div
      className="
        min-w-0
        flex-1
      "
    >
      <motion.p
        initial={
          reduceMotion
            ? false
            : {
                opacity: 0,
                y: 12,
              }
        }
        whileInView={
          reduceMotion
            ? undefined
            : {
                opacity: 1,
                y: 0,
              }
        }
        viewport={{
          once: true,
          amount: 0.65,
        }}
        transition={{
          duration: 0.45,
          ease: SLIDE_EASE,
        }}
        className="
          self-stretch

          text-[0.875rem]
          font-semibold
          leading-[1.25rem]

          text-[#B8B8B8]

          [font-feature-settings:'liga'_off,'clig'_off]
        "
      >
        BUSINESS ECOSYSTEM
      </motion.p>

      <motion.h2
        id="clients-heading"
        initial={
          reduceMotion
            ? false
            : {
                opacity: 0,
                y: 22,
              }
        }
        whileInView={
          reduceMotion
            ? undefined
            : {
                opacity: 1,
                y: 0,
              }
        }
        viewport={{
          once: true,
          amount: 0.65,
        }}
        transition={{
          duration: 0.62,
          delay: 0.08,
          ease: SLIDE_EASE,
        }}
        className="
          mt-1
          self-stretch

          text-[2rem]
          font-semibold
          leading-[2.5rem]
          tracking-[-0.03125rem]

          text-[#1A1A1A]

          md:text-[2.5rem]
          md:leading-[3rem]
        "
      >
        One platform, a universe of
        entertainment
      </motion.h2>
    </div>
  );
}

/* ============================================================
   NAVIGATION
   ============================================================ */

function Navigation({
  onPrevious,
  onNext,
}: {
  onPrevious: () => void;
  onNext: () => void;
}) {
  return (
    <div
      className="
        flex
        w-full
        shrink-0
        items-center
        justify-end
        gap-2

        sm:w-auto
        sm:justify-start
      "
    >
      <button
        type="button"
        onClick={onPrevious}
        aria-label="Previous slide"
        className="
          flex
          h-12
          w-12
          shrink-0
          items-center
          justify-center

          rounded-lg

          bg-[#8F6C1A]

          transition-[background-color,transform]
          duration-200

          hover:bg-[#806016]

          active:scale-[0.96]

          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-[#8F6C1A]/40
        "
      >
        <ArrowLeftIcon />
      </button>

      <button
        type="button"
        onClick={onNext}
        aria-label="Next slide"
        className="
          flex
          h-12
          w-12
          shrink-0
          items-center
          justify-center

          rounded-lg

          bg-[#8F6C1A]

          transition-[background-color,transform]
          duration-200

          hover:bg-[#806016]

          active:scale-[0.96]

          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-[#8F6C1A]/40
        "
      >
        <ArrowRightIcon />
      </button>
    </div>
  );
}

/* ============================================================
   SLIDE
   ============================================================ */

function SlideCard({
  slide,
  isActive,
  isPlaying,
  onTogglePlayback,
}: {
  slide: Slide;
  isActive: boolean;
  isPlaying: boolean;
  onTogglePlayback: () => void;
}) {
  return (
    <article
      aria-hidden={
        !isActive
      }
      className="
        w-full
        shrink-0
        overflow-hidden
        rounded-[0.25rem]
        bg-white
      "
    >
      <div
        className="
          flex
          w-full
          flex-col
          items-center
          gap-10
        "
      >
        {/* =================================================
            IMAGE
            ================================================= */}

        <div
          className="
            relative
            flex

            h-[24rem]
            w-full

            flex-col
            items-center
            justify-end

            overflow-hidden
            rounded-[0.25rem]

            bg-[#111]

            sm:h-[30rem]

            lg:h-[37.375rem]
          "
        >
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            priority={
              slide.id === 1
            }
            sizes="
              (max-width: 768px) 92vw,
              74.3125rem
            "
            className="
              object-cover
            "
          />

          <button
            type="button"
            onClick={
              onTogglePlayback
            }
            tabIndex={
              isActive
                ? 0
                : -1
            }
            aria-label={
              isPlaying
                ? "Pause slider autoplay"
                : "Play slider autoplay"
            }
            className="
              absolute
              right-4
              top-4

              flex
              h-12
              w-12
              items-center
              justify-center

              rounded-full

              border
              border-white

              bg-black/5

              backdrop-blur-[1px]

              transition-colors
              duration-200

              hover:bg-black/15

              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-white/80

              sm:right-[2.53125rem]
              sm:top-[2.55981rem]
            "
          >
            {isPlaying ? (
              <PauseIcon />
            ) : (
              <PlayIcon />
            )}
          </button>
        </div>

        {/* =================================================
            COPY
            ================================================= */}

        <div
          className="
            flex
            min-h-[12.5rem]
            w-full

            flex-col
            justify-center
            gap-8

            px-4
            pb-4

            sm:px-0

            lg:flex-row
            lg:items-center
            lg:gap-14
          "
        >
          <div
            className="
              min-w-0
              flex-1
            "
          >
            <p
              className="
                text-[0.875rem]
                font-semibold
                leading-[1.25rem]

                text-[#B8B8B8]

                [font-feature-settings:'liga'_off,'clig'_off]
              "
            >
              {slide.eyebrow}
            </p>

            <h3
              className="
                mt-1

                text-[1.75rem]
                font-bold
                leading-[2.25rem]

                text-[#1A1A1A]

                [font-feature-settings:'liga'_off,'clig'_off]

                md:text-[2rem]
                md:leading-[2.5rem]
              "
            >
              {slide.title}
            </h3>

            <p
              className="
                mt-3
                max-w-[47rem]

                text-[1rem]
                font-normal
                leading-[1.5rem]

                text-[#B8B8B8]

                [font-feature-settings:'liga'_off,'clig'_off]

                md:text-[1.25rem]
                md:leading-[1.75rem]
              "
            >
              {slide.description}
            </p>
          </div>

          {/* ===============================================
              ACTIONS
              =============================================== */}

          <div
            className="
              flex
              flex-wrap
              shrink-0
              items-center
              gap-3
            "
          >
            {slide.watchHref ? (
              <Link
                href={
                  slide.watchHref
                }
                tabIndex={
                  isActive
                    ? 0
                    : -1
                }
                className="
                  inline-flex
                  items-center
                  justify-center
                  gap-1

                  rounded-lg

                  bg-[#8F6C1A]

                  px-4
                  py-4

                  text-[0.875rem]
                  font-semibold
                  leading-5
                  text-white

                  transition-opacity

                  hover:opacity-90

                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-[#8F6C1A]/40
                "
              >
                Watch now

                <SmallArrowRight
                  inverse
                />
              </Link>
            ) : null}

            {slide.learnHref ? (
              <Link
                href={
                  slide.learnHref
                }
                tabIndex={
                  isActive
                    ? 0
                    : -1
                }
                className="
                  inline-flex
                  items-center
                  justify-center
                  gap-2

                  rounded-lg

                  border
                  border-[#ECECEC]

                  bg-white

                  px-4
                  py-4

                  text-[0.875rem]
                  font-semibold
                  leading-5
                  text-[#1A1A1A]

                  transition-colors

                  hover:bg-[#FAFAFA]

                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-[#8F6C1A]/30
                "
              >
                Learn more

                <SmallArrowRight />
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );
}

/* ============================================================
   CLIENTS SECTION
   ============================================================ */

export function ClientsSection() {
  const reduceMotion =
    useReducedMotion();

  /* ==========================================================
     STATE

     Keep React state to a minimum.

     Only logical UI state lives in React.
     Track movement itself lives in MotionValue.
     ========================================================== */

  const [
    activeIndex,
    setActiveIndex,
  ] = useState(0);

  const [
    isPlaying,
    setIsPlaying,
  ] = useState(true);

  const [
    dimensions,
    setDimensions,
  ] = useState({
    slideWidth: 0,
    viewportWidth: 0,
  });

  /* ==========================================================
     REFS
     ========================================================== */

  const viewportRef =
    useRef<HTMLDivElement>(null);

  const firstSlideRef =
    useRef<HTMLDivElement>(null);

  /*
   * Current PHYSICAL index.
   *
   * Starts at:
   *
   * clone 03
   * REAL 01 ← index 1
   * real 02
   * real 03
   * clone 01
   */
  const physicalIndexRef =
    useRef(
      SLIDES.length > 1
        ? 1
        : 0,
    );

  /*
   * Prevent multiple Framer animations
   * from fighting each other.
   */
  const isAnimatingRef =
    useRef(false);

  /*
   * If the user clicks rapidly while animation
   * is running, remember their input rather
   * than dropping it.
   *
   * + = next
   * - = previous
   */
  const pendingStepsRef =
    useRef(0);

  /*
   * Current animation playback controller.
   */
  const animationRef =
    useRef<
      ReturnType<typeof animate> | null
    >(null);

  /*
   * Latest dimensions without forcing callbacks
   * to be recreated after every measurement.
   */
  const dimensionsRef =
    useRef(dimensions);

  /* ==========================================================
     MOTION VALUE

     Updating this does NOT re-render React.
     ========================================================== */

  const trackX =
    useMotionValue(0);

  /* ==========================================================
     KEEP DIMENSIONS REF CURRENT
     ========================================================== */

  useEffect(() => {
    dimensionsRef.current =
      dimensions;
  }, [dimensions]);

  /* ==========================================================
     CALCULATE TRACK X
     ========================================================== */

  const getTrackX =
    useCallback(
      (
        physicalIndex: number,
      ) => {
        const {
          slideWidth,
          viewportWidth,
        } =
          dimensionsRef.current;

        if (
          !slideWidth ||
          !viewportWidth
        ) {
          return 0;
        }

        return (
          viewportWidth / 2 -
          slideWidth / 2 -
          physicalIndex *
            (
              slideWidth +
              SLIDE_GAP_PX
            )
        );
      },
      [],
    );

  /* ==========================================================
     INTERNAL MOVE ENGINE
     ========================================================== */

  const moveToPhysicalIndex =
    useCallback(
      async function moveToPhysicalIndex(
        targetPhysicalIndex: number,
      ) {
        if (
          SLIDES.length <= 1
        ) {
          return;
        }

        isAnimatingRef.current =
          true;

        const destination =
          getTrackX(
            targetPhysicalIndex,
          );

        /*
         * Stop only an old controller that is
         * no longer part of this move.
         */
        animationRef.current?.stop();

        if (reduceMotion) {
          trackX.set(
            destination,
          );
        } else {
          const controller =
            animate(
              trackX,
              destination,
              {
                duration:
                  SLIDE_DURATION,

                ease:
                  SLIDE_EASE,
              },
            );

          animationRef.current =
            controller;

          try {
            await controller;
          } catch {
            /*
             * Animation can be interrupted during
             * resize/unmount. No error is needed.
             */
          }
        }

        /*
         * Keep physical reference aligned with
         * the animation target.
         */
        physicalIndexRef.current =
          targetPhysicalIndex;

        /* ====================================================
           CLONE RESET

           These are instantaneous MotionValue writes,
           NOT React state changes.

           Therefore there is no visible re-render or lag.
           ==================================================== */

        if (
          targetPhysicalIndex === 0
        ) {
          /*
           * clone last
           *      ↓
           * real last
           */
          physicalIndexRef.current =
            SLIDES.length;

          trackX.set(
            getTrackX(
              SLIDES.length,
            ),
          );
        } else if (
          targetPhysicalIndex ===
          SLIDES.length + 1
        ) {
          /*
           * clone first
           *      ↓
           * real first
           */
          physicalIndexRef.current =
            1;

          trackX.set(
            getTrackX(1),
          );
        }

        const logicalIndex =
          physicalToLogical(
            physicalIndexRef.current,
          );

        /*
         * One small React update AFTER movement,
         * only when logical slide actually changes.
         */
        setActiveIndex(
          (current) =>
            current ===
            logicalIndex
              ? current
              : logicalIndex,
        );

        isAnimatingRef.current =
          false;

        /* ====================================================
           PROCESS FAST CLICKS

           If someone clicked 2–3 times while the animation
           was running, process the next queued movement
           rather than launching competing animations.
           ==================================================== */

        const queued =
          pendingStepsRef.current;

        if (queued === 0) {
          return;
        }

        const direction =
          queued > 0
            ? 1
            : -1;

        pendingStepsRef.current -=
          direction;

        const nextPhysical =
          physicalIndexRef.current +
          direction;

        await moveToPhysicalIndex(
          nextPhysical,
        );
      },
      [
        getTrackX,
        reduceMotion,
        trackX,
      ],
    );

  /* ==========================================================
     REQUEST MOVEMENT

     Button/autoplay calls this instead of changing
     React state directly.
     ========================================================== */

  const requestMove =
    useCallback(
      (direction: -1 | 1) => {
        if (
          SLIDES.length <= 1
        ) {
          return;
        }

        /*
         * An animation is already active:
         * queue this click.
         *
         * Clamp the queue to prevent somebody
         * generating dozens of delayed slides.
         */
        if (
          isAnimatingRef.current
        ) {
          pendingStepsRef.current =
            Math.max(
              -2,
              Math.min(
                2,
                pendingStepsRef.current +
                  direction,
              ),
            );

          return;
        }

        const target =
          physicalIndexRef.current +
          direction;

        void moveToPhysicalIndex(
          target,
        );
      },
      [moveToPhysicalIndex],
    );

  /* ==========================================================
     NAVIGATION
     ========================================================== */

  const goPrevious =
    useCallback(() => {
      requestMove(-1);
    }, [requestMove]);

  const goNext =
    useCallback(() => {
      requestMove(1);
    }, [requestMove]);

  /* ==========================================================
     DOT NAVIGATION

     Dots move directly to a real physical slide.
     ========================================================== */

  const goToSlide =
    useCallback(
      (logicalIndex: number) => {
        if (
          SLIDES.length <= 1 ||
          isAnimatingRef.current
        ) {
          return;
        }

        pendingStepsRef.current = 0;

        const realPhysicalIndex =
          logicalIndex + 1;

        void moveToPhysicalIndex(
          realPhysicalIndex,
        );
      },
      [moveToPhysicalIndex],
    );

  /* ==========================================================
     AUTOPLAY
     ========================================================== */

  useEffect(() => {
    if (
      !isPlaying ||
      reduceMotion ||
      SLIDES.length <= 1
    ) {
      return;
    }

    const timer =
      window.setInterval(
        () => {
          /*
           * Don't pile autoplay input behind an
           * existing button animation.
           */
          if (
            !isAnimatingRef.current
          ) {
            requestMove(1);
          }
        },
        AUTOPLAY_MS,
      );

    return () => {
      window.clearInterval(
        timer,
      );
    };
  }, [
    isPlaying,
    reduceMotion,
    requestMove,
  ]);

  /* ==========================================================
     MEASURE

     ResizeObserver + RAF avoids layout thrashing.
     ========================================================== */

  useEffect(() => {
    const viewport =
      viewportRef.current;

    const firstSlide =
      firstSlideRef.current;

    if (
      !viewport ||
      !firstSlide
    ) {
      return;
    }

    let frame = 0;

    const measure = () => {
      window.cancelAnimationFrame(
        frame,
      );

      frame =
        window.requestAnimationFrame(
          () => {
            const next = {
              viewportWidth:
                viewport.clientWidth,

              slideWidth:
                firstSlide.offsetWidth,
            };

            setDimensions(
              (current) => {
                if (
                  current.viewportWidth ===
                    next.viewportWidth &&
                  current.slideWidth ===
                    next.slideWidth
                ) {
                  return current;
                }

                return next;
              },
            );
          },
        );
    };

    measure();

    const observer =
      new ResizeObserver(
        measure,
      );

    observer.observe(
      viewport,
    );

    observer.observe(
      firstSlide,
    );

    return () => {
      window.cancelAnimationFrame(
        frame,
      );

      observer.disconnect();
    };
  }, []);

  /* ==========================================================
     APPLY POSITION WHEN DIMENSIONS CHANGE

     No animation here — resizing should simply keep
     the active slide centered.
     ========================================================== */

  useEffect(() => {
    if (
      !dimensions.slideWidth ||
      !dimensions.viewportWidth
    ) {
      return;
    }

    /*
     * Cancel current movement because previous target was
     * calculated from obsolete dimensions.
     */
    animationRef.current?.stop();

    isAnimatingRef.current =
      false;

    pendingStepsRef.current = 0;

    trackX.set(
      getTrackX(
        physicalIndexRef.current,
      ),
    );
  }, [
    dimensions,
    getTrackX,
    trackX,
  ]);

  /* ==========================================================
     CLEANUP
     ========================================================== */

  useEffect(() => {
    return () => {
      animationRef.current?.stop();

      isAnimatingRef.current =
        false;

      pendingStepsRef.current = 0;
    };
  }, []);

  /* ==========================================================
     RENDER
     ========================================================== */

  return (
    <section
      id="clients"
      aria-labelledby="clients-heading"
      className={`
        ${plusJakarta.className}

        landing-section-transition

        flex
        w-full
        flex-col
        items-center
        justify-end

        gap-14

        sm:gap-20

        lg:gap-[6.25rem]

        overflow-hidden

        bg-white

        py-[6.25rem]
      `}
    >
      {/* =====================================================
          HEADER
          ===================================================== */}

      <div
        className="
          flex
          w-full
          max-w-[74.3125rem]

          flex-col
          items-start
          justify-between
          gap-6

          px-4

          sm:px-6
          sm:flex-row
          sm:items-end

          lg:px-0
        "
      >
        <HeaderText />

        <Navigation
          onPrevious={
            goPrevious
          }
          onNext={
            goNext
          }
        />
      </div>

      {/* =====================================================
          CAROUSEL
          ===================================================== */}

      <div
        ref={viewportRef}
        className="
          relative
          w-full
          overflow-hidden
          [contain:layout_paint]
        "
        role="region"
        aria-roledescription="carousel"
        aria-label="Business ecosystem"
      >
        <motion.div
          className="
            flex
            items-start
            gap-10

            transform-gpu

            will-change-transform

            [backface-visibility:hidden]
            [transform-style:preserve-3d]
          "
          style={{
            x: trackX,
          }}
        >
          {LOOPED_SLIDES.map(
            (
              slide,
              renderIndex,
            ) => {
              const logicalIndex =
                physicalToLogical(
                  renderIndex,
                );

              const isActive =
                logicalIndex ===
                activeIndex;

              return (
                <div
                  key={`${slide.id}-${renderIndex}`}
                  ref={
                    renderIndex === 0
                      ? firstSlideRef
                      : undefined
                  }
                  className="
                    w-[calc(100vw-2rem)]
                    max-w-[74.3125rem]
                    shrink-0

                    transform-gpu

                    sm:w-[calc(100vw-7rem)]

                    lg:w-[74.3125rem]
                  "
                >
                  <SlideCard
                    slide={slide}
                    isActive={
                      isActive
                    }
                    isPlaying={
                      isPlaying
                    }
                    onTogglePlayback={() =>
                      setIsPlaying(
                        (value) =>
                          !value,
                      )
                    }
                  />
                </div>
              );
            },
          )}
        </motion.div>
      </div>

      {/* =====================================================
          MOBILE DOTS
          ===================================================== */}

      <div
        className="
          -mt-14
          flex
          items-center
          gap-2

          lg:hidden
        "
      >
        {SLIDES.map(
          (
            slide,
            index,
          ) => (
            <button
              key={slide.id}
              type="button"
              aria-label={`Go to slide ${
                index + 1
              }`}
              aria-current={
                index ===
                activeIndex
                  ? "true"
                  : undefined
              }
              onClick={() =>
                goToSlide(
                  index,
                )
              }
              className={[
                "h-2 rounded-full transition-[width,background-color] duration-300",

                index ===
                activeIndex
                  ? "w-6 bg-[#8F6C1A]"
                  : "w-2 bg-[#D9D9D9]",
              ].join(" ")}
            />
          ),
        )}
      </div>
    </section>
  );
}
