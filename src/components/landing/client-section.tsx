"use client";

import Image from "@/components/ui/image";
import Link from "next/link";

import {
  inter,
  plusJakartaSans,
} from "@/lib/fonts";

import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
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
  imagePosition?: string;

  eyebrow: string;
  title: string;
  description: string;

  primaryLabel: string;
  primaryHref: string;

  secondaryLabel: string;
  secondaryHref: string;
};

type ScrollMeasurements = {
  viewportWidth: number;
  slideWidth: number;
  gap: number;
  edgeInset: number;
  horizontalDistance: number;
  stickyHeight: number;
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
   MOTION CONFIG

   Vertical scroll is converted 1:1 into horizontal travel.

   Spring only smooths the visual response.
   It does NOT create artificial extra scroll distance.
   ============================================================ */

const SCROLL_SPRING = {
  stiffness: 115,
  damping: 29,
  mass: 0.55,
  restDelta: 0.001,
  restSpeed: 0.001,
} as const;

const UI_EASE = [
  0.22,
  1,
  0.36,
  1,
] as const;

/* ============================================================
   ICON
   ============================================================ */

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

/* ============================================================
   SECTION HEADER
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
          EYEBROW
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
          landing-title
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

          lg:text-[clamp(2.25rem,3vw,2.5rem)]
          lg:leading-[1.2]
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
   SLIDE CARD
   ============================================================ */

function SlideCard({
  slide,
  isActive,
  reduceMotion,
}: {
  slide: Slide;
  isActive: boolean;
  reduceMotion: boolean;
}) {
  return (
    <motion.article
      aria-current={
        isActive
          ? "true"
          : undefined
      }
      animate={
        reduceMotion
          ? undefined
          : {
            opacity:
              isActive
                ? 1
                : 0.82,

            scale:
              isActive
                ? 1
                : 0.987,
          }
      }
      transition={{
        duration: 0.5,
        ease: UI_EASE,
      }}
      style={{
        transformOrigin:
          "50% 50%",
      }}
      className="
        relative

        h-[32rem]
        w-full

        overflow-hidden

        rounded-[0.25rem]

        bg-[#111]

        min-[390px]:h-[33rem]

        sm:h-[32rem]

        md:h-[34rem]

        lg:h-[clamp(25rem,56svh,37.375rem)]

        xl:h-[clamp(27rem,58svh,39rem)]
      "
    >
      {/* =====================================================
          BACKGROUND IMAGE
          ===================================================== */}

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
              scale:
                isActive
                  ? 1
                  : 1.025,
            }
        }
        transition={{
          duration: 0.9,
          ease: UI_EASE,
        }}
      >
        <Image
          src={slide.image}
          alt={slide.title}
          fill
          loading="lazy"
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

      {/* =====================================================
          DARK OVERLAYS
          ===================================================== */}

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

      {/* =====================================================
          CONTENT
          ===================================================== */}

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
        <div
          className="
            min-w-0
            max-w-[68rem]
          "
        >
          {/* =================================================
              EYEBROW
              ================================================= */}

          <motion.p
            animate={
              reduceMotion
                ? undefined
                : {
                  opacity:
                    isActive
                      ? 1
                      : 0.35,

                  y:
                    isActive
                      ? 0
                      : 8,
                }
            }
            transition={{
              duration: 0.4,
              ease: UI_EASE,
            }}
            className={`
              ${plusJakartaSans.className}

              text-[0.75rem]
              font-semibold
              leading-[1.125rem]

              text-white

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

          {/* =================================================
              TITLE
              ================================================= */}

          <motion.h3
            animate={
              reduceMotion
                ? undefined
                : {
                  opacity:
                    isActive
                      ? 1
                      : 0.45,

                  y:
                    isActive
                      ? 0
                      : 12,
                }
            }
            transition={{
              duration: 0.48,
              ease: UI_EASE,
            }}
            className="
              mt-1

              max-w-[61rem]

              break-words

              text-[2rem]
              font-normal
              leading-[2.5rem]
              tracking-[-0.03125rem]

              text-white

              min-[390px]:text-[2.25rem]
              min-[390px]:leading-[2.75rem]

              sm:text-[2.625rem]
              sm:leading-[3.125rem]

              md:text-[3rem]
              md:leading-[3.5rem]

              lg:text-[clamp(2.75rem,4.2vw,3.5rem)]
              lg:leading-[1.14]
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

          {/* =================================================
              DESCRIPTION
              ================================================= */}

          <motion.p
            animate={
              reduceMotion
                ? undefined
                : {
                  opacity:
                    isActive
                      ? 1
                      : 0.42,

                  y:
                    isActive
                      ? 0
                      : 12,
                }
            }
            transition={{
              duration: 0.5,
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

              lg:text-[clamp(1rem,1.4vw,1.25rem)]
              lg:leading-[1.4]
            `}
            style={{
              fontFeatureSettings:
                '"liga" off, "clig" off',
            }}
          >
            {slide.description}
          </motion.p>
        </div>

        {/* ===================================================
            ACTIONS
            =================================================== */}

        <motion.div
          animate={
            reduceMotion
              ? undefined
              : {
                opacity:
                  isActive
                    ? 1
                    : 0.4,

                y:
                  isActive
                    ? 0
                    : 14,
              }
          }
          transition={{
            duration: 0.52,
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
          {/* =================================================
              PRIMARY CTA
              ================================================= */}

          <Link
            href={
              slide.primaryHref
            }
            className={`
              ${inter.className}

              group

              inline-flex

              min-h-[3rem]

              items-center
              justify-center

              gap-2

              rounded-[1rem]

              bg-white

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
              lg:text-[1.125rem]
              lg:leading-[1.625rem]

              xl:text-[1.25rem]
              xl:leading-[1.75rem]
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

          {/* =================================================
              SECONDARY CTA
              ================================================= */}

          <Link
            href={
              slide.secondaryHref
            }
            className={`
              ${inter.className}

              group

              inline-flex

              min-h-[3rem]

              items-center
              justify-center

              gap-2

              rounded-[1rem]

              border
              border-white

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
              lg:text-[1.125rem]
              lg:leading-[1.625rem]

              xl:text-[1.25rem]
              xl:leading-[1.75rem]
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

   DESKTOP:
   Vertical scrolling drives horizontal translation.

   MOBILE / TABLET:
   Native horizontal scrolling.

   NO:
   - autoplay
   - infinite clones
   - previous / next buttons
   - dots
   - pause / play
   ============================================================ */

export function ClientsSection() {
  const reduceMotion =
    useReducedMotion() ?? false;

  /* ==========================================================
     REFS
     ========================================================== */

  const sectionRef =
    useRef<HTMLElement>(null);

  const stickyRef =
    useRef<HTMLDivElement>(null);

  const viewportRef =
    useRef<HTMLDivElement>(null);

  const trackRef =
    useRef<HTMLDivElement>(null);

  const firstSlideRef =
    useRef<HTMLDivElement>(null);

  const mobileFrameRef =
    useRef<number | null>(null);

  /* ==========================================================
     STATE
     ========================================================== */

  const [
    activeIndex,
    setActiveIndex,
  ] = useState(0);

  const [
    desktopScrollEnabled,
    setDesktopScrollEnabled,
  ] = useState(false);

  const [
    measurements,
    setMeasurements,
  ] =
    useState<ScrollMeasurements>({
      viewportWidth: 0,
      slideWidth: 0,
      gap: 0,
      edgeInset: 0,
      horizontalDistance: 0,
      stickyHeight: 0,
    });

  /* ==========================================================
     DESKTOP / TOUCH MODE

     Use scroll-linked horizontal motion only on
     desktop/fine-pointer environments.

     Mobile/tablet receives native horizontal scrolling.
     ========================================================== */

  useEffect(() => {
    const query =
      window.matchMedia(
        "(min-width: 1024px) and (pointer: fine)",
      );

    const update = () => {
      setDesktopScrollEnabled(
        query.matches,
      );
    };

    update();

    query.addEventListener(
      "change",
      update,
    );

    return () => {
      query.removeEventListener(
        "change",
        update,
      );
    };
  }, []);

  /* ==========================================================
     MEASURE

     Calculate:

     - card width
     - responsive gap
     - side inset required to center first/last card
     - exact horizontal travel
     - actual sticky-content height

     There is NO artificial hold distance.
     ========================================================== */

  useEffect(() => {
    const viewport =
      viewportRef.current;

    const track =
      trackRef.current;

    const firstSlide =
      firstSlideRef.current;

    const sticky =
      stickyRef.current;

    if (
      !viewport ||
      !track ||
      !firstSlide ||
      !sticky
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
            const viewportWidth =
              viewport.clientWidth;

            const slideWidth =
              firstSlide.offsetWidth;

            const trackStyle =
              window.getComputedStyle(
                track,
              );

            const rawGap =
              Number.parseFloat(
                trackStyle.columnGap ||
                trackStyle.gap ||
                "0",
              );

            const gap =
              Number.isFinite(
                rawGap,
              )
                ? rawGap
                : 0;

            /*
             * On desktop, first and last cards
             * remain centered like the old carousel.
             */
            const edgeInset =
              desktopScrollEnabled
                ? Math.max(
                  0,
                  (
                    viewportWidth -
                    slideWidth
                  ) / 2,
                )
                : 0;

            /*
             * With equal left/right edge insets,
             * exact travel between first and last
             * centered cards is:
             *
             * (number of transitions)
             * ×
             * (card width + gap)
             */
            const horizontalDistance =
              desktopScrollEnabled
                ? Math.max(
                  0,
                  (
                    SLIDES.length -
                    1
                  ) *
                  (
                    slideWidth +
                    gap
                  ),
                )
                : 0;

            const stickyHeight =
              sticky.scrollHeight;

            setMeasurements(
              (current) => {
                const next = {
                  viewportWidth,
                  slideWidth,
                  gap,
                  edgeInset,
                  horizontalDistance,
                  stickyHeight,
                };

                if (
                  Math.abs(
                    current.viewportWidth -
                    next.viewportWidth,
                  ) < 0.5 &&
                  Math.abs(
                    current.slideWidth -
                    next.slideWidth,
                  ) < 0.5 &&
                  Math.abs(
                    current.gap -
                    next.gap,
                  ) < 0.5 &&
                  Math.abs(
                    current.edgeInset -
                    next.edgeInset,
                  ) < 0.5 &&
                  Math.abs(
                    current.horizontalDistance -
                    next.horizontalDistance,
                  ) < 0.5 &&
                  Math.abs(
                    current.stickyHeight -
                    next.stickyHeight,
                  ) < 0.5
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

    observer.observe(
      sticky,
    );

    window.addEventListener(
      "resize",
      measure,
      {
        passive: true,
      },
    );

    return () => {
      window.cancelAnimationFrame(
        frame,
      );

      observer.disconnect();

      window.removeEventListener(
        "resize",
        measure,
      );
    };
  }, [
    desktopScrollEnabled,
  ]);

  /* ==========================================================
     DESKTOP SCROLL PROGRESS
     ========================================================== */

  const {
    scrollYProgress,
  } = useScroll({
    target: sectionRef,

    offset: [
      "start start",
      "end end",
    ],
  });

  const smoothProgress =
    useSpring(
      scrollYProgress,
      SCROLL_SPRING,
    );

  const x =
    useTransform(
      smoothProgress,
      [0, 1],
      [
        0,
        -measurements.horizontalDistance,
      ],
    );

  /* ==========================================================
     DESKTOP ACTIVE CARD

     Only update React when the logical active card
     changes—not every scroll frame.
     ========================================================== */

  useMotionValueEvent(
    smoothProgress,
    "change",
    (latest) => {
      if (
        !desktopScrollEnabled ||
        reduceMotion ||
        SLIDES.length <= 1
      ) {
        return;
      }

      const next =
        Math.min(
          SLIDES.length - 1,
          Math.max(
            0,
            Math.round(
              latest *
              (
                SLIDES.length -
                1
              ),
            ),
          ),
        );

      setActiveIndex(
        (current) =>
          current === next
            ? current
            : next,
      );
    },
  );

  /* ==========================================================
     MOBILE / TABLET ACTIVE CARD

     Native horizontal scroll.
     Determine which card is nearest viewport center.
     ========================================================== */

  const updateNativeActive =
    useCallback(() => {
      if (
        desktopScrollEnabled
      ) {
        return;
      }

      const viewport =
        viewportRef.current;

      if (!viewport) {
        return;
      }

      const cards =
        Array.from(
          viewport.querySelectorAll<HTMLElement>(
            "[data-client-slide]",
          ),
        );

      if (
        cards.length === 0
      ) {
        return;
      }

      const viewportRect =
        viewport.getBoundingClientRect();

      const viewportCenter =
        viewportRect.left +
        viewportRect.width /
        2;

      let nearestIndex = 0;
      let nearestDistance =
        Number.POSITIVE_INFINITY;

      cards.forEach(
        (
          card,
          index,
        ) => {
          const rect =
            card.getBoundingClientRect();

          const center =
            rect.left +
            rect.width / 2;

          const distance =
            Math.abs(
              center -
              viewportCenter,
            );

          if (
            distance <
            nearestDistance
          ) {
            nearestDistance =
              distance;

            nearestIndex =
              index;
          }
        },
      );

      setActiveIndex(
        (current) =>
          current ===
            nearestIndex
            ? current
            : nearestIndex,
      );
    }, [
      desktopScrollEnabled,
    ]);

  const handleNativeScroll =
    useCallback(() => {
      if (
        mobileFrameRef.current !==
        null
      ) {
        window.cancelAnimationFrame(
          mobileFrameRef.current,
        );
      }

      mobileFrameRef.current =
        window.requestAnimationFrame(
          updateNativeActive,
        );
    }, [
      updateNativeActive,
    ]);

  useEffect(() => {
    return () => {
      if (
        mobileFrameRef.current !==
        null
      ) {
        window.cancelAnimationFrame(
          mobileFrameRef.current,
        );
      }
    };
  }, []);

  /* ==========================================================
     STICKY MODE
     ========================================================== */

  const stickyEnabled =
    desktopScrollEnabled &&
    !reduceMotion &&
    measurements.horizontalDistance >
    0;

  /*
   * Actual content height
   * +
   * exact horizontal travel.
   *
   * No:
   * 100svh forced white area
   * final hold
   * additional px
   */
  const sectionHeight =
    stickyEnabled
      ? measurements.stickyHeight +
      measurements.horizontalDistance
      : undefined;

  /* ==========================================================
     RENDER
     ========================================================== */

  return (
    <section
      ref={sectionRef}
      id="clients"
      aria-labelledby="clients-heading"
      data-motion-managed
      className="
        landing-section-transition

        relative

        w-full

        bg-white
      "
      style={
        sectionHeight
          ? {
            height:
              `${sectionHeight}px`,
          }
          : undefined
      }
    >
      {/* =====================================================
          STICKY CONTENT
          ===================================================== */}

      <div
        ref={stickyRef}
        className={`
          w-full

          overflow-hidden

          bg-white

          ${stickyEnabled
            ? "sticky top-0"
            : "relative"
          }

          py-16

          sm:py-20

          lg:py-[clamp(2.75rem,5.5svh,6.25rem)]
        `}
      >
        {/* ===================================================
            HEADER

            No previous / next buttons.
            =================================================== */}

        <div
          className="
            mx-auto

            w-full
            max-w-[74.3125rem]

            px-5

            sm:px-8

            lg:px-0
          "
        >
          <HeaderText />
        </div>

        {/* ===================================================
            HORIZONTAL SCROLLER
            =================================================== */}

        <div
          ref={viewportRef}
          role="region"
          aria-label="Business ecosystem"
          onScroll={
            handleNativeScroll
          }
          className={`
            clients-scroll-viewport

            relative

            mt-12

            w-full

            sm:mt-14

            lg:mt-[clamp(2.5rem,5svh,6.25rem)]

            ${stickyEnabled
              ? `
                    overflow-hidden
                  `
              : `
                    overflow-x-auto
                    overflow-y-hidden

                    overscroll-x-contain

                    scroll-smooth

                    snap-x
                    snap-mandatory
                  `
            }
          `}
        >
          <motion.div
            ref={trackRef}
            className={`
              clients-scroll-track

              flex

              w-max

              items-center

              gap-4

              sm:gap-6

              lg:gap-10

              ${stickyEnabled
                ? `
                      transform-gpu
                      will-change-transform

                      [backface-visibility:hidden]
                    `
                : `
                      px-5

                      sm:px-8
                    `
              }
            `}
            style={{
              ...(stickyEnabled
                ? {
                  x,

                  paddingLeft:
                    measurements.edgeInset,

                  paddingRight:
                    measurements.edgeInset,
                }
                : {}),
            }}
          >
            {SLIDES.map(
              (
                slide,
                index,
              ) => {
                const isActive =
                  index ===
                  activeIndex;

                return (
                  <div
                    key={
                      slide.id
                    }
                    ref={
                      index === 0
                        ? firstSlideRef
                        : undefined
                    }
                    data-client-slide
                    className="
                      w-[calc(100vw-2rem)]

                      shrink-0

                      snap-center

                      sm:w-[calc(100vw-5rem)]

                      md:w-[calc(100vw-7rem)]

                      lg:w-[74.3125rem]
                      lg:max-w-[74.3125rem]
                    "
                  >
                    <SlideCard
                      slide={
                        slide
                      }
                      isActive={
                        isActive
                      }
                      reduceMotion={
                        reduceMotion
                      }
                    />
                  </div>
                );
              },
            )}
          </motion.div>
        </div>
      </div>

      {/* =====================================================
          SCOPED STYLES
          ===================================================== */}

      <style>{`
        .clients-scroll-viewport {
          scrollbar-width: none;
          -ms-overflow-style: none;
          -webkit-overflow-scrolling: touch;
        }

        .clients-scroll-viewport::-webkit-scrollbar {
          display: none;
        }

        @media (max-width: 1023px) {
          #clients {
            height: auto !important;
          }

          #clients
            > div:first-child {
            position: relative !important;
            top: auto !important;
          }

          .clients-scroll-track {
            transform: none !important;
          }
        }

        @media (
          prefers-reduced-motion: reduce
        ) {
          #clients {
            height: auto !important;
          }

          #clients
            > div:first-child {
            position: relative !important;
            top: auto !important;
          }

          .clients-scroll-viewport {
            overflow-x: auto !important;
            scroll-behavior: auto !important;
          }

          .clients-scroll-track {
            transform: none !important;
          }
        }
      `}</style>
    </section>
  );
}