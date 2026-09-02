"use client";

import Image from "@/components/ui/image";
import Link from "next/link";

import {
  inter,
  plusJakartaSans,
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
  type PointerEvent as ReactPointerEvent,
} from "react";

/* ============================================================
   TYPES
   ============================================================ */

type Slide = {
  id: number;

  image: string;
  imagePosition?: string;

  eyebrow: string;
  title: string;
  description: string;

  primaryLabel: string;
  primaryHref: string;

  secondaryLabel: string;
  secondaryHref: string;
};

type CarouselDimensions = {
  viewportWidth: number;
  slideWidth: number;
  gap: number;
};

/* ============================================================
   SLIDES
   ============================================================ */

const SLIDES: Slide[] = [
  {
    id: 1,

    image:
      "/images/landing/client/Image1.png",

    imagePosition:
      "center center",

    eyebrow:
      "01. DIGITAL ENTERTAINMENT & PLATFORM",

    title:
      "Abhijat Marathi OTT",

    description:
      "A dedicated Marathi OTT platform bringing regional stories, films and content to audiences worldwide.",

    primaryLabel:
      "Explore Abhijat Marathi",

    primaryHref:
      "/companies/abhijat-marathi",

    secondaryLabel:
      "Learn more",

    secondaryHref:
      "/companies/abhijat-marathi",
  },

  {
    id: 2,

    image:
      "/images/landing/client/Image2.png",

    imagePosition:
      "center center",

    eyebrow:
      "02. EVENT & EXPERIENCES",

    title:
      "Designing Experiences Beyond the Screen",

    description:
      "Delivering concerts, cultural festivals, corporate events, product launches, and large-scale public experiences that connect brands with audiences.",

    primaryLabel:
      "Watch now",

    primaryHref:
      "/services",

    secondaryLabel:
      "Learn more",

    secondaryHref:
      "/services",
  },

  {
    id: 3,

    image:
      "/images/landing/client/Image3.png",

    imagePosition:
      "center center",

    eyebrow:
      "03. MUSIC & AUDIO ECOSYSTEM",

    title:
      "Building India's Next Music Library",

    description:
      "From original compositions and film soundtracks to digital publishing and royalty management, creating music that reaches audiences everywhere.",

    primaryLabel:
      "Explore library",

    primaryHref:
      "/services",

    secondaryLabel:
      "Learn more",

    secondaryHref:
      "/services",
  },

  {
    id: 4,

    image:
      "/images/landing/client/Image4.png",

    /*
     * Keeps the woman comfortably visible while retaining
     * the artwork on the left.
     */
    imagePosition:
      "center center",

    eyebrow:
      "04. CONTENT CREATION",

    title:
      "Creating Stories That Inspire Millions",

    description:
      "Producing feature films, web series, documentaries, branded content, and corporate communications with end-to-end production capabilities.",

    primaryLabel:
      "Watch now",

    primaryHref:
      "/services",

    secondaryLabel:
      "Learn more",

    secondaryHref:
      "/services",
  },

  {
    id: 5,

    image:
      "/images/landing/client/Image5.png",

    imagePosition:
      "center center",

    eyebrow:
      "05. GOVT & STRATEGIC COMMUNICATION",

    title:
      "Empowering Public Communication at Scale",

    description:
      "Partnering with government institutions, public sector organizations, and enterprises to deliver impactful campaigns, citizen engagement, and strategic communication initiatives.",

    primaryLabel:
      "Watch now",

    primaryHref:
      "/services",

    secondaryLabel:
      "Learn more",

    secondaryHref:
      "/services",
  },
];

/* ============================================================
   CONFIG
   ============================================================ */

const AUTOPLAY_MS = 5600;

/*
 * Smooth editorial carousel spring.
 *
 * Lower stiffness = less abrupt acceleration.
 * Higher damping = controlled landing.
 */
const SLIDE_SPRING = {
  type: "spring" as const,

  stiffness: 135,
  damping: 25,
  mass: 0.9,

  restDelta: 0.12,
  restSpeed: 0.12,
};

const UI_EASE = [
  0.22,
  1,
  0.36,
  1,
] as const;

const SWIPE_DISTANCE_PX = 44;

const SWIPE_AXIS_RATIO = 1.15;

/* ============================================================
   INFINITE TRACK

   [05 clone]
   [01]
   [02]
   [03]
   [04]
   [05]
   [01 clone]
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
    return (
      SLIDES.length - 1
    );
  }

  if (
    physicalIndex ===
    SLIDES.length + 1
  ) {
    return 0;
  }

  return physicalIndex - 1;
}

function calculateTrackX(
  physicalIndex: number,
  dimensions:
    CarouselDimensions,
) {
  const {
    viewportWidth,
    slideWidth,
    gap,
  } = dimensions;

  if (
    !viewportWidth ||
    !slideWidth
  ) {
    return 0;
  }

  return (
    viewportWidth / 2 -
    slideWidth / 2 -
    physicalIndex *
    (slideWidth + gap)
  );
}

/* ============================================================
   ICONS
   ============================================================ */

function ArrowLeftIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className="h-6 w-6"
    >
      <path
        d="M15 18L9 12L15 6"
        stroke="currentColor"
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
      viewBox="0 0 24 24"
      fill="none"
      className="h-6 w-6"
    >
      <path
        d="M9 18L15 12L9 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SmallArrowRight() {
  return (
    <svg
      aria-hidden="true"
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
        stroke="currentColor"
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
      viewBox="0 0 24 24"
      fill="none"
      className="
        h-5
        w-5
        sm:h-6
        sm:w-6
      "
    >
      <rect
        x="7.5"
        y="5.5"
        width="3"
        height="13"
        rx="1.5"
        fill="currentColor"
      />

      <rect
        x="13.5"
        y="5.5"
        width="3"
        height="13"
        rx="1.5"
        fill="currentColor"
      />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className="
        h-5
        w-5
        sm:h-6
        sm:w-6
      "
    >
      <path
        d="M9 7.5L17 12L9 16.5V7.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

/* ============================================================
   SECTION HEADING
   ============================================================ */

function HeaderText() {
  const reduceMotion =
    useReducedMotion() ?? false;

  return (
    <div
      className="
        min-w-0
        flex-1
      "
    >
      {/* =====================================================
          EYEBROW — BUSINESS ECOSYSTEM

          Plus Jakarta Sans
          14px / 20px
          600
          #B8B8B8
          ===================================================== */}

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
          amount: 0.6,
        }}
        transition={{
          duration: 0.45,
          ease: UI_EASE,
        }}
        className={`
          ${plusJakartaSans.className}

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
        BUSINESS ECOSYSTEM
      </motion.p>

      {/* =====================================================
          HEADING

          Plus Jakarta Sans
          40px / 48px
          600
          -0.5px
          #1A1A1A
          ===================================================== */}

      <motion.h2
        id="clients-heading"
        initial={
          reduceMotion
            ? false
            : {
              opacity: 0,
              y: 20,
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
          amount: 0.6,
        }}
        transition={{
          duration: 0.6,
          delay: 0.06,
          ease: UI_EASE,
        }}
        className={`
          ${plusJakartaSans.className}

          mt-1
          max-w-[50rem]

          text-[2rem]
          font-semibold
          leading-[2.5rem]
          tracking-[-0.03125rem]

          text-[#1A1A1A]

          sm:text-[2.25rem]
          sm:leading-[2.75rem]

          lg:text-[2.5rem]
          lg:leading-[3rem]
        `}
        style={{
          fontFeatureSettings:
            '"liga" off, "clig" off',
        }}
      >
        One platform, a universe of
        entertainment
      </motion.h2>
    </div>
  );
}

/* ============================================================
   TOP NAVIGATION
   ============================================================ */

function Navigation({
  onPrevious,
  onNext,
}: {
  onPrevious: () => void;
  onNext: () => void;
}) {
  const buttonClass = `
    inline-flex

    h-12
    w-12

    shrink-0

    items-center
    justify-center

    rounded-[0.25rem]

    bg-[#8F6C1A]
    text-white

    transition-[background-color,transform]
    duration-200

    hover:bg-[#806016]

    active:scale-[0.96]

    focus-visible:outline-none
    focus-visible:ring-2
    focus-visible:ring-[#8F6C1A]/40
    focus-visible:ring-offset-2
  `;

  return (
    <div
      className="
        flex
        shrink-0
        items-center
        gap-2
      "
    >
      <button
        type="button"
        onClick={onPrevious}
        aria-label="Previous slide"
        className={buttonClass}
      >
        <ArrowLeftIcon />
      </button>

      <button
        type="button"
        onClick={onNext}
        aria-label="Next slide"
        className={buttonClass}
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
  reduceMotion,
  onTogglePlayback,
}: {
  slide: Slide;

  isActive: boolean;

  isPlaying: boolean;

  reduceMotion: boolean;

  onTogglePlayback: () => void;
}) {
  return (
    <motion.article
      aria-hidden={!isActive}
      animate={
        reduceMotion
          ? undefined
          : {
            opacity:
              isActive
                ? 1
                : 0.8,

            scale:
              isActive
                ? 1
                : 0.987,
          }
      }
      transition={{
        duration: 0.58,
        ease: UI_EASE,
      }}
      style={{
        pointerEvents:
          isActive
            ? "auto"
            : "none",

        transformOrigin:
          "50% 50%",
      }}
      className="
        relative

        h-[34rem]
        w-full

        overflow-hidden

        rounded-[0.25rem]

        bg-[#111]

        sm:h-[32rem]

        md:h-[34rem]

        lg:h-[37.375rem]

        xl:h-[39rem]
      "
    >
      {/* ======================================================
          BACKGROUND
          ====================================================== */}

      <motion.div
        className="
    absolute
    inset-0
    overflow-hidden
    rounded-[0.25rem]
  "
        animate={
          reduceMotion
            ? undefined
            : {
              scale: isActive
                ? 1
                : 1.035,
            }
        }
        transition={{
          duration: 1.05,
          ease: UI_EASE,
        }}
      >
        <Image
          src={slide.image}
          alt={slide.title}
          fill
          sizes="
      (max-width: 639px) calc(100vw - 2rem),
      (max-width: 1023px) calc(100vw - 5rem),
      74.3125rem
    "
          className="
      select-none
      rounded-[0.25rem]
      object-cover
    "
          style={{
            objectPosition:
              slide.imagePosition ??
              "center center",
          }}
        />
      </motion.div>

      {/* ======================================================
          GRADIENT SYSTEM

          Strong bottom gradient, plus a subtle left-side
          gradient so white typography remains readable.
          ====================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          inset-0

          bg-[linear-gradient(180deg,rgba(0,0,0,0.01)_0%,rgba(0,0,0,0.02)_34%,rgba(0,0,0,0.20)_57%,rgba(0,0,0,0.88)_100%)]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          inset-0

          bg-[linear-gradient(90deg,rgba(0,0,0,0.48)_0%,rgba(0,0,0,0.22)_47%,rgba(0,0,0,0.02)_84%)]
        "
      />

      {/* ======================================================
          BOTTOM CONTENT
          ====================================================== */}

      <div
        className="
          absolute

          inset-x-0
          bottom-0

          z-10

          px-5
          pb-6

          sm:px-7
          sm:pb-8

          md:px-8
          md:pb-9

          lg:px-[2.5rem]
          lg:pb-[2.5rem]
      "
      >
        {/* ====================================================
            COPY + PLAYBACK CONTROL

            IMPORTANT:
            Pause button is vertically aligned to THIS TEXT ROW,
            not the image.
            ==================================================== */}

        <div
          className="
            grid
            w-full

            grid-cols-[minmax(0,1fr)_auto]

            items-center

            gap-4

            sm:gap-6

            lg:gap-10
          "
        >
          {/* ==================================================
              COPY
              ================================================== */}

          <div
            className="
              min-w-0

              max-w-[68rem]
            "
          >
            {/* ================================================
                EYEBROW

                Desktop:
                Plus Jakarta Sans
                14px / 20px
                600
                #FFF
                ================================================ */}

            <motion.p
              animate={
                reduceMotion
                  ? undefined
                  : {
                    opacity:
                      isActive
                        ? 1
                        : 0,

                    y:
                      isActive
                        ? 0
                        : 10,
                  }
              }
              transition={{
                duration: 0.42,
                ease: UI_EASE,
              }}
              className={`
                ${plusJakartaSans.className}

                text-[0.75rem]
                font-semibold
                leading-[1.125rem]
                text-[#FFFFFF]

                sm:text-[0.8125rem]
                sm:leading-[1.1875rem]

                lg:text-[0.875rem]
                lg:leading-[1.25rem]
              `}
              style={{
                fontFeatureSettings:
                  '"liga" off, "clig" off',
              }}
            >
              {slide.eyebrow}
            </motion.p>

            {/* ================================================
                TITLE

                Desktop exact:
                Google Sans Flex
                56px / 64px
                400
                -1px
                #FFF
                ================================================ */}

            <motion.h3
              animate={
                reduceMotion
                  ? undefined
                  : {
                    opacity:
                      isActive
                        ? 1
                        : 0,

                    y:
                      isActive
                        ? 0
                        : 16,
                  }
              }
              transition={{
                duration: 0.52,

                delay:
                  isActive
                    ? 0.035
                    : 0,

                ease: UI_EASE,
              }}
              className="
                mt-1

                break-words

                text-[2rem]
                font-normal
                leading-[2.5rem]
                tracking-[-0.03125rem]

                text-[#FFFFFF]

                min-[390px]:text-[2.25rem]
                min-[390px]:leading-[2.75rem]

                sm:text-[2.625rem]
                sm:leading-[3.125rem]

                md:text-[3rem]
                md:leading-[3.5rem]

                lg:text-[3.5rem]
                lg:leading-[4rem]
                lg:tracking-[-0.0625rem]
              "
              style={{
                fontFamily:
                  '"Google Sans Flex", "Plus Jakarta Sans", sans-serif',

                fontFeatureSettings:
                  '"liga" off, "clig" off',
              }}
            >
              {slide.title}
            </motion.h3>

            {/* ================================================
                DESCRIPTION

                Desktop exact:
                Plus Jakarta Sans
                20px / 28px
                400
                rgba(255,255,255,.78)
                ================================================ */}

            <motion.p
              animate={
                reduceMotion
                  ? undefined
                  : {
                    opacity:
                      isActive
                        ? 1
                        : 0,

                    y:
                      isActive
                        ? 0
                        : 16,
                  }
              }
              transition={{
                duration: 0.56,

                delay:
                  isActive
                    ? 0.07
                    : 0,

                ease: UI_EASE,
              }}
              className={`
                ${plusJakartaSans.className}

                mt-2

                max-w-[57rem]

                text-[0.8125rem]
                font-normal
                leading-[1.25rem]

                text-white/[0.78]

                sm:text-[0.9375rem]
                sm:leading-[1.375rem]

                md:text-[1.0625rem]
                md:leading-[1.625rem]

                lg:text-[1.25rem]
                lg:leading-[1.75rem]
              `}
              style={{
                fontFeatureSettings:
                  '"liga" off, "clig" off',
              }}
            >
              {slide.description}
            </motion.p>
          </div>

          {/* ==================================================
              PLAY / PAUSE

              It now belongs to the text grid.

              Therefore:
              - title can grow/shrink
              - description can wrap
              - the control remains centered against copy
              ================================================== */}

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
              inline-flex

              h-10
              w-10

              shrink-0

              items-center
              justify-center

              self-center

              rounded-full

              border
              border-white

              bg-black/10

              text-white

              backdrop-blur-[2px]

              transition-[background-color,transform]
              duration-200

              hover:scale-[1.04]
              hover:bg-black/25

              active:scale-[0.96]

              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-white/80

              sm:h-11
              sm:w-11

              lg:h-12
              lg:w-12
            "
          >
            {isPlaying ? (
              <PauseIcon />
            ) : (
              <PlayIcon />
            )}
          </button>
        </div>

        {/* ====================================================
            ACTIONS
            ==================================================== */}

        <motion.div
          animate={
            reduceMotion
              ? undefined
              : {
                opacity:
                  isActive
                    ? 1
                    : 0,

                y:
                  isActive
                    ? 0
                    : 18,
              }
          }
          transition={{
            duration: 0.6,

            delay:
              isActive
                ? 0.11
                : 0,

            ease: UI_EASE,
          }}
          className="
            mt-5

            flex

            w-full
            flex-col

            items-stretch

            gap-2

            min-[390px]:w-auto
            min-[390px]:flex-row
            min-[390px]:items-center

            sm:mt-6
            sm:gap-3
          "
        >
          {/* ==================================================
              PRIMARY CTA

              Desktop exact:
              Inter
              20 / 28
              600
              #1A1A1A
              white background
              16px radius
              ================================================== */}

          <Link
            href={
              slide.primaryHref
            }
            tabIndex={
              isActive
                ? 0
                : -1
            }
            className={`
              ${inter.className}

              group

              inline-flex

              min-h-[3.25rem]

              items-center
              justify-center

              gap-2

              rounded-[1rem]

              bg-[#FFFFFF]

              px-5
              py-3

              text-center

              text-[0.875rem]
              font-semibold
              leading-[1.25rem]

              text-[#1A1A1A]

              transition-[background-color,transform]
              duration-200

              hover:-translate-y-[1px]
              hover:bg-[#F7F7F7]

              active:translate-y-0

              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-white/75
              focus-visible:ring-offset-2
              focus-visible:ring-offset-black/30

              sm:text-[1rem]
              sm:leading-[1.5rem]

              lg:min-h-[3.5rem]
              lg:px-6
              lg:text-[1.25rem]
              lg:leading-[1.75rem]
            `}
            style={{
              fontFeatureSettings:
                '"liga" off, "clig" off',
            }}
          >
            <span>
              {slide.primaryLabel}
            </span>

            <span
              aria-hidden="true"
              className="
                inline-flex

                transition-transform
                duration-200

                group-hover:translate-x-1
              "
            >
              <SmallArrowRight />
            </span>
          </Link>

          {/* ==================================================
              SECONDARY CTA
              ================================================== */}

          <Link
            href={
              slide.secondaryHref
            }
            tabIndex={
              isActive
                ? 0
                : -1
            }
            className={`
              ${inter.className}

              group

              inline-flex

              min-h-[3.25rem]

              items-center
              justify-center

              gap-2

              rounded-[1rem]

              border
              border-[#FFFFFF]

              bg-transparent

              px-5
              py-3

              text-center

              text-[0.875rem]
              font-semibold
              leading-[1.25rem]

              text-[#F9F9F9]

              transition-[background-color,transform]
              duration-200

              hover:-translate-y-[1px]
              hover:bg-white/10

              active:translate-y-0

              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-white/75

              sm:text-[1rem]
              sm:leading-[1.5rem]

              lg:min-h-[3.5rem]
              lg:px-6
              lg:text-[1.25rem]
              lg:leading-[1.75rem]
            `}
            style={{
              fontFeatureSettings:
                '"liga" off, "clig" off',
            }}
          >
            <span>
              {slide.secondaryLabel}
            </span>

            <span
              aria-hidden="true"
              className="
                inline-flex

                transition-transform
                duration-200

                group-hover:translate-x-1
              "
            >
              <SmallArrowRight />
            </span>
          </Link>
        </motion.div>
      </div>
    </motion.article>
  );
}

/* ============================================================
   CLIENTS SECTION
   ============================================================ */

export function ClientsSection() {
  const reduceMotion =
    useReducedMotion() ?? false;

  /* ==========================================================
     STATE
     ========================================================== */

  const [
    activeIndex,
    setActiveIndex,
  ] = useState(0);

  const [
    activePhysicalIndex,
    setActivePhysicalIndex,
  ] = useState(
    SLIDES.length > 1 ? 1 : 0,
  );

  const [
    isPlaying,
    setIsPlaying,
  ] = useState(true);

  const [
    autoplayResetKey,
    setAutoplayResetKey,
  ] = useState(0);

  const [
    interactionPaused,
    setInteractionPaused,
  ] = useState(false);

  const [
    isReady,
    setIsReady,
  ] = useState(false);

  const [
    isSectionVisible,
    setIsSectionVisible,
  ] = useState(false);

  /* ==========================================================
     REFS
     ========================================================== */

  const sectionRef =
    useRef<HTMLElement>(null);

  const viewportRef =
    useRef<HTMLDivElement>(null);

  const trackRef =
    useRef<HTMLDivElement>(null);

  const firstSlideRef =
    useRef<HTMLDivElement>(null);

  const physicalIndexRef =
    useRef(
      SLIDES.length > 1
        ? 1
        : 0,
    );

  const dimensionsRef =
    useRef<CarouselDimensions>({
      viewportWidth: 0,
      slideWidth: 0,
      gap: 0,
    });

  const isAnimatingRef =
    useRef(false);

  const pendingStepsRef =
    useRef(0);

  const animationRef =
    useRef<
      ReturnType<
        typeof animate
      > | null
    >(null);

  const movementTokenRef =
    useRef(0);

  const pointerStartRef =
    useRef<{
      x: number;
      y: number;
    } | null>(null);

  /* ==========================================================
     TRACK X
     ========================================================== */

  const trackX =
    useMotionValue(0);

  const getTrackX =
    useCallback(
      (
        physicalIndex: number,
      ) =>
        calculateTrackX(
          physicalIndex,
          dimensionsRef.current,
        ),
      [],
    );

  /* ==========================================================
     MOVE ENGINE
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

        const movementToken =
          ++movementTokenRef.current;

        isAnimatingRef.current =
          true;

        const incomingLogicalIndex =
          physicalToLogical(
            targetPhysicalIndex,
          );

        /*
         * Activate incoming card at movement start.
         */
        setActiveIndex(
          (current) =>
            current ===
              incomingLogicalIndex
              ? current
              : incomingLogicalIndex,
        );

        setActivePhysicalIndex(
          targetPhysicalIndex,
        );

        const destination =
          getTrackX(
            targetPhysicalIndex,
          );

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
              SLIDE_SPRING,
            );

          animationRef.current =
            controller;

          try {
            await controller;
          } catch {
            /*
             * Expected when resize/unmount interrupts movement.
             */
          }
        }

        if (
          movementToken !==
          movementTokenRef.current
        ) {
          return;
        }

        physicalIndexRef.current =
          targetPhysicalIndex;

        /* ====================================================
           LOOP REPOSITION
           ==================================================== */

        if (
          targetPhysicalIndex === 0
        ) {
          physicalIndexRef.current =
            SLIDES.length;

          setActivePhysicalIndex(
            SLIDES.length,
          );

          trackX.set(
            getTrackX(
              SLIDES.length,
            ),
          );
        } else if (
          targetPhysicalIndex ===
          SLIDES.length + 1
        ) {
          physicalIndexRef.current =
            1;

          setActivePhysicalIndex(1);

          trackX.set(
            getTrackX(1),
          );
        }

        animationRef.current =
          null;

        isAnimatingRef.current =
          false;

        /* ====================================================
           QUEUED NAVIGATION
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

        await moveToPhysicalIndex(
          physicalIndexRef.current +
          direction,
        );
      },
      [
        getTrackX,
        reduceMotion,
        trackX,
      ],
    );

  /* ==========================================================
     REQUEST MOVE
     ========================================================== */

  const requestMove =
    useCallback(
      (
        direction: -1 | 1,
      ) => {
        if (
          SLIDES.length <= 1
        ) {
          return;
        }

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

        void moveToPhysicalIndex(
          physicalIndexRef.current +
          direction,
        );
      },
      [
        moveToPhysicalIndex,
      ],
    );

  /* ==========================================================
     AUTOPLAY RESET
     ========================================================== */

  const resetAutoplay =
    useCallback(() => {
      setAutoplayResetKey(
        (value) =>
          value + 1,
      );
    }, []);

  /* ==========================================================
     NAVIGATION
     ========================================================== */

  const goPrevious =
    useCallback(() => {
      resetAutoplay();

      requestMove(-1);
    }, [
      requestMove,
      resetAutoplay,
    ]);

  const goNext =
    useCallback(() => {
      resetAutoplay();

      requestMove(1);
    }, [
      requestMove,
      resetAutoplay,
    ]);

  const goToSlide =
    useCallback(
      (
        logicalIndex: number,
      ) => {
        if (
          SLIDES.length <= 1 ||
          isAnimatingRef.current
        ) {
          return;
        }

        resetAutoplay();

        pendingStepsRef.current =
          0;

        void moveToPhysicalIndex(
          logicalIndex + 1,
        );
      },
      [
        moveToPhysicalIndex,
        resetAutoplay,
      ],
    );

  /* ==========================================================
     VIEWPORT ACTIVITY

     Do not keep autoplay timers active while this large carousel is far
     outside the viewport. This reduces background work on long pages and
     makes mobile scrolling more predictable.
     ========================================================== */

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSectionVisible(
          Boolean(entry?.isIntersecting),
        );
      },
      {
        rootMargin: "20% 0px 20% 0px",
        threshold: 0.01,
      },
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, []);

  /* ==========================================================
     AUTOPLAY
     ========================================================== */

  useEffect(() => {
    if (
      !isPlaying ||
      !isSectionVisible ||
      interactionPaused ||
      reduceMotion ||
      SLIDES.length <= 1
    ) {
      return;
    }

    const timer =
      window.setTimeout(
        () => {
          if (
            document
              .visibilityState ===
            "visible" &&
            !isAnimatingRef.current
          ) {
            requestMove(1);
          }
        },
        AUTOPLAY_MS,
      );

    return () => {
      window.clearTimeout(
        timer,
      );
    };
  }, [
    activeIndex,
    autoplayResetKey,
    interactionPaused,
    isSectionVisible,
    isPlaying,
    reduceMotion,
    requestMove,
  ]);

  /* ==========================================================
     RESPONSIVE MEASUREMENT
     ========================================================== */

  useEffect(() => {
    const viewport =
      viewportRef.current;

    const track =
      trackRef.current;

    const firstSlide =
      firstSlideRef.current;

    if (
      !viewport ||
      !track ||
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
            const trackStyle =
              window.getComputedStyle(
                track,
              );

            const rawGap =
              parseFloat(
                trackStyle.columnGap ||
                trackStyle.gap ||
                "0",
              );

            const next:
              CarouselDimensions = {
              viewportWidth:
                viewport.clientWidth,

              slideWidth:
                firstSlide
                  .offsetWidth,

              gap:
                Number.isFinite(
                  rawGap,
                )
                  ? rawGap
                  : 0,
            };

            const current =
              dimensionsRef.current;

            if (
              current.viewportWidth ===
              next.viewportWidth &&
              current.slideWidth ===
              next.slideWidth &&
              current.gap ===
              next.gap
            ) {
              setIsReady(true);

              return;
            }

            movementTokenRef.current +=
              1;

            animationRef.current?.stop();

            animationRef.current =
              null;

            isAnimatingRef.current =
              false;

            pendingStepsRef.current =
              0;

            dimensionsRef.current =
              next;

            trackX.set(
              calculateTrackX(
                physicalIndexRef.current,
                next,
              ),
            );

            setIsReady(true);
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
  }, [
    trackX,
  ]);

  /* ==========================================================
     TOUCH SWIPE
     ========================================================== */

  const handlePointerDown =
    useCallback(
      (
        event:
          ReactPointerEvent<HTMLDivElement>,
      ) => {
        if (
          event.pointerType ===
          "mouse"
        ) {
          return;
        }

        pointerStartRef.current = {
          x: event.clientX,
          y: event.clientY,
        };
      },
      [],
    );

  const handlePointerCancel =
    useCallback(() => {
      pointerStartRef.current =
        null;
    }, []);

  const handlePointerUp =
    useCallback(
      (
        event:
          ReactPointerEvent<HTMLDivElement>,
      ) => {
        const start =
          pointerStartRef.current;

        pointerStartRef.current =
          null;

        if (!start) {
          return;
        }

        const deltaX =
          event.clientX -
          start.x;

        const deltaY =
          event.clientY -
          start.y;

        const horizontal =
          Math.abs(
            deltaX,
          );

        const vertical =
          Math.abs(
            deltaY,
          );

        if (
          horizontal <
          SWIPE_DISTANCE_PX ||
          horizontal <
          vertical *
          SWIPE_AXIS_RATIO
        ) {
          return;
        }

        resetAutoplay();

        requestMove(
          deltaX < 0
            ? 1
            : -1,
        );
      },
      [
        requestMove,
        resetAutoplay,
      ],
    );

  /* ==========================================================
     CLEANUP
     ========================================================== */

  useEffect(() => {
    return () => {
      movementTokenRef.current +=
        1;

      animationRef.current?.stop();

      animationRef.current =
        null;

      isAnimatingRef.current =
        false;

      pendingStepsRef.current =
        0;
    };
  }, []);

  /* ==========================================================
     RENDER
     ========================================================== */

  return (
    <section
      ref={sectionRef}
      id="clients"
      aria-labelledby="clients-heading"
      data-motion-managed
      onMouseEnter={() => {
        setInteractionPaused(
          true,
        );
      }}
      onMouseLeave={() => {
        setInteractionPaused(
          false,
        );
      }}
      onFocusCapture={() => {
        setInteractionPaused(
          true,
        );
      }}
      onBlurCapture={(
        event,
      ) => {
        if (
          event.currentTarget.contains(
            event.relatedTarget as
            Node | null,
          )
        ) {
          return;
        }

        setInteractionPaused(
          false,
        );
      }}
      className="
        landing-section-transition

        flex
        w-full
        flex-col
        items-center

        overflow-hidden

        bg-white

        py-16

        sm:py-20

        lg:py-[6.25rem]
      "
    >
      {/* ======================================================
          HEADER
          ====================================================== */}

      <div
        className="
          flex

          w-full
          max-w-[74.3125rem]

          flex-col

          items-start
          justify-between

          gap-6

          px-5

          sm:flex-row
          sm:items-end
          sm:px-8

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

      {/* ======================================================
          CAROUSEL
          ====================================================== */}

      <div
        ref={viewportRef}
        role="region"
        aria-roledescription="carousel"
        aria-label="Business ecosystem"
        onPointerDown={
          handlePointerDown
        }
        onPointerUp={
          handlePointerUp
        }
        onPointerCancel={
          handlePointerCancel
        }
        className={`
          relative

          mt-14

          w-full

          touch-pan-y
          overflow-hidden

          transition-opacity
          duration-300

          sm:mt-16

          lg:mt-[6.25rem]

          ${isReady
            ? "opacity-100"
            : "opacity-0"
          }
        `}
      >
        <motion.div
          ref={trackRef}
          className="
            flex

            items-center

            gap-4

            transform-gpu

            will-change-transform

            [backface-visibility:hidden]
            [transform-style:preserve-3d]

            sm:gap-6

            lg:gap-10
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
              const isActive =
                renderIndex ===
                activePhysicalIndex;

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

                    shrink-0

                    transform-gpu

                    sm:w-[calc(100vw-5rem)]

                    md:w-[calc(100vw-7rem)]

                    lg:w-[74.3125rem]
                    lg:max-w-[74.3125rem]
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
                    reduceMotion={
                      reduceMotion
                    }
                    onTogglePlayback={() => {
                      resetAutoplay();

                      setIsPlaying(
                        (current) =>
                          !current,
                      );
                    }}
                  />
                </div>
              );
            },
          )}
        </motion.div>
      </div>

      {/* ======================================================
          MOBILE / TABLET DOTS
          ====================================================== */}

      <div
        className="
          mt-6

          flex

          items-center
          justify-center

          gap-2

          lg:hidden
        "
      >
        {SLIDES.map(
          (
            slide,
            index,
          ) => {
            const active =
              index ===
              activeIndex;

            return (
              <button
                key={slide.id}
                type="button"
                aria-label={`Go to slide ${index + 1
                  }`}
                aria-current={
                  active
                    ? "true"
                    : undefined
                }
                onClick={() => {
                  goToSlide(
                    index,
                  );
                }}
                className={`
                  h-2

                  rounded-full

                  transition-[width,background-color,transform]
                  duration-300

                  ease-[cubic-bezier(0.22,1,0.36,1)]

                  hover:scale-110

                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-[#8F6C1A]/35
                  focus-visible:ring-offset-2

                  ${active
                    ? `
                          w-6
                          bg-[#8F6C1A]
                        `
                    : `
                          w-2
                          bg-[#D9D9D9]
                        `
                  }
                `}
              />
            );
          },
        )}
      </div>
    </section>
  );
}