"use client";

import Image from "@/components/ui/image";
import Link from "next/link";

import {
  inter,
  plusJakartaSans,
} from "@/lib/fonts";

import {
  motion,
  useReducedMotion,
} from "framer-motion";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import styles from "./client-section.module.css";

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

type LoopSlide = {
  key: string;
  slide: Slide;
  isClone: boolean;
};

/* ============================================================
   SLIDES
   ============================================================ */

const SLIDES: Slide[] = [
  {
    id: 1,
    image: "/images/landing/client/Image1.png",
    imagePosition: "center center",
    eyebrow: "01. DIGITAL ENTERTAINMENT & PLATFORM",
    title: "Abhijat Marathi OTT",
    description:
      "A dedicated Marathi OTT platform bringing regional stories, films and content to audiences worldwide.",
    primaryLabel: "Explore Abhijat Marathi",
    primaryHref: "/companies/abhijat-marathi",
    secondaryLabel: "Learn more",
    secondaryHref: "/companies/abhijat-marathi",
  },
  {
    id: 2,
    image: "/images/landing/client/Image2.png",
    imagePosition: "center center",
    eyebrow: "02. EVENT & EXPERIENCES",
    title: "Experiences Beyond the Screen",
    description:
      "Delivering concerts, cultural festivals, corporate events, product launches, and large-scale public experiences that connect brands with audiences.",
    primaryLabel: "Watch now",
    primaryHref: "/services",
    secondaryLabel: "Learn more",
    secondaryHref: "/services",
  },
  {
    id: 3,
    image: "/images/landing/client/Image3.png",
    imagePosition: "center center",
    eyebrow: "03. MUSIC & AUDIO ECOSYSTEM",
    title: "Building India's Next Music Library",
    description:
      "From original compositions and film soundtracks to digital publishing and royalty management, creating music that reaches audiences everywhere.",
    primaryLabel: "Explore library",
    primaryHref: "/services",
    secondaryLabel: "Learn more",
    secondaryHref: "/services",
  },
  {
    id: 4,
    image: "/images/landing/client/Image4.png",
    imagePosition: "center center",
    eyebrow: "04. CONTENT CREATION",
    title: "Creating Stories That Inspire Millions",
    description:
      "Producing feature films, web series, documentaries, branded content, and corporate communications with end-to-end production capabilities.",
    primaryLabel: "Watch now",
    primaryHref: "/services",
    secondaryLabel: "Learn more",
    secondaryHref: "/services",
  },
  {
    id: 5,
    image: "/images/landing/client/Image5.png",
    imagePosition: "center center",
    eyebrow: "05. GOVT & STRATEGIC COMMUNICATION",
    title: "Empowering Public Communication at Scale",
    description:
      "Partnering with government institutions, public sector organizations, and enterprises to deliver impactful campaigns, citizen engagement, and strategic communication initiatives.",
    primaryLabel: "Watch now",
    primaryHref: "/services",
    secondaryLabel: "Learn more",
    secondaryHref: "/services",
  },
];

/* ============================================================
   INFINITE TRACK

   THREE COMPLETE COPIES:

   Previous:
   1 2 3 4 5

   Real / middle:
   1 2 3 4 5

   Next:
   1 2 3 4 5

   We always silently reposition back into the middle group.

   This means the browser NEVER reaches the actual end when
   doing 5 -> 1.
   ============================================================ */

const LOOPED_SLIDES: LoopSlide[] = [
  ...SLIDES.map((slide) => ({
    key: `previous-${slide.id}`,
    slide,
    isClone: true,
  })),

  ...SLIDES.map((slide) => ({
    key: `real-${slide.id}`,
    slide,
    isClone: false,
  })),

  ...SLIDES.map((slide) => ({
    key: `next-${slide.id}`,
    slide,
    isClone: true,
  })),
];

/*
 * Rendered indexes:
 *
 * 0 1 2 3 4      = previous clones
 * 5 6 7 8 9      = REAL middle slides
 * 10 11 12 13 14 = next clones
 */

const MIDDLE_START_INDEX = SLIDES.length;

const MIDDLE_END_INDEX =
  MIDDLE_START_INDEX + SLIDES.length;

const UI_EASE = [0.22, 1, 0.36, 1] as const;

/*
 * Autoplay delay.
 *
 * 4500 = 4.5 seconds.
 */
const AUTOPLAY_DELAY = 4500;

const DRAG_THRESHOLD = 7;

/*
 * Wait until native smooth scrolling settles,
 * then silently recenter if we're in a clone group.
 */
const SCROLL_SETTLE_DELAY = 250;

/* ============================================================
   ICON
   ============================================================ */

function SmallArrowRight() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 8 14"
      fill="none"
      width="8"
      height="14"
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
   HEADER
   ============================================================ */

function HeaderText() {
  const reduceMotion = useReducedMotion() ?? false;

  return (
    <div className={styles.headerText}>
      <motion.p
        initial={
          reduceMotion
            ? false
            : {
              opacity: 0,
              y: 10,
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
          amount: 0.55,
        }}
        transition={{
          duration: 0.45,
          ease: UI_EASE,
        }}
        className={`${plusJakartaSans.className} ${styles.eyebrow}`}
        style={{
          fontFeatureSettings: '"liga" off, "clig" off',
        }}
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
              y: 16,
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
          amount: 0.55,
        }}
        transition={{
          duration: 0.58,
          delay: 0.04,
          ease: UI_EASE,
        }}
        className={`${plusJakartaSans.className} ${styles.heading}`}
        style={{
          fontFeatureSettings: '"liga" off, "clig" off',
        }}
      >
        One platform, a universe of entertainment
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
  isClone,
}: {
  slide: Slide;
  isActive: boolean;
  isClone: boolean;
}) {
  return (
    <article
      aria-current={
        !isClone && isActive
          ? "true"
          : undefined
      }
      aria-hidden={
        isClone
          ? true
          : undefined
      }
      className={styles.card}
    >
      <div className={styles.visual}>
        <Image
          src={slide.image}
          alt={isClone ? "" : slide.title}
          fill
          loading="lazy"
          draggable={false}
          sizes="(max-width: 639px) calc(100vw - 2.5rem), (max-width: 767px) 84vw, (max-width: 1023px) 76vw, (max-width: 1279px) 68vw, (max-width: 1535px) 64vw, 60vw"
          className={styles.image}
          style={{
            objectPosition:
              slide.imagePosition ??
              "center center",
          }}
        />
      </div>

      <div className={styles.copy}>
        <div className={styles.copyText}>
          <p
            className={`${plusJakartaSans.className} ${styles.cardEyebrow}`}
            style={{
              fontFeatureSettings:
                '"liga" off, "clig" off',
            }}
          >
            {slide.eyebrow.replace(
              /^\d+\.\s*/,
              "",
            )}
          </p>

          <h3
            className={`${plusJakartaSans.className} ${styles.title}`}
            style={{
              fontFeatureSettings:
                '"liga" off, "clig" off',
            }}
          >
            {slide.title}
          </h3>

          <p
            className={`${plusJakartaSans.className} ${styles.description}`}
            style={{
              fontFeatureSettings:
                '"liga" off, "clig" off',
            }}
          >
            {slide.description}
          </p>
        </div>

        <div className={styles.actions}>
          <Link
            href={slide.primaryHref}
            tabIndex={isClone ? -1 : undefined}
            className={`${inter.className} ${styles.primary}`}
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
              className={styles.actionArrow}
            >
              <SmallArrowRight />
            </span>
          </Link>

          <Link
            href={slide.secondaryHref}
            tabIndex={isClone ? -1 : undefined}
            className={`${inter.className} ${styles.secondary}`}
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
              className={styles.actionArrow}
            >
              <SmallArrowRight />
            </span>
          </Link>
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
    useReducedMotion() ?? false;

  const viewportRef =
    useRef<HTMLDivElement>(null);

  const scrollFrameRef =
    useRef<number | null>(null);

  const scrollSettleTimerRef =
    useRef<number | null>(null);

  const resizeFrameRef =
    useRef<number | null>(null);

  const activeLogicalIndexRef =
    useRef(0);

  const dragRef = useRef({
    pointerId: -1,
    startX: 0,
    startScrollLeft: 0,
    moved: false,
  });

  const suppressClickRef =
    useRef(false);

  /*
   * Start from middle-set Slide 1.
   *
   * index 5 = real Slide 1
   */
  const [
    activeRenderedIndex,
    setActiveRenderedIndex,
  ] = useState(
    MIDDLE_START_INDEX,
  );

  const [
    isDragging,
    setIsDragging,
  ] = useState(false);

  const [
    isHovered,
    setIsHovered,
  ] = useState(false);

  const [
    isReady,
    setIsReady,
  ] = useState(false);

  /*
   * Autoplay stops:
   *
   * - while mouse is over carousel
   * - while dragging
   * - for reduced-motion users
   */
  const isAutoplayPaused =
    !isReady ||
    isHovered ||
    isDragging ||
    reduceMotion;

  /* ==========================================================
     GET ALL RENDERED SLIDES
     ========================================================== */

  const getCards =
    useCallback(() => {
      const viewport =
        viewportRef.current;

      if (!viewport) {
        return [] as HTMLElement[];
      }

      return Array.from(
        viewport.querySelectorAll<HTMLElement>(
          "[data-client-slide]",
        ),
      );
    }, []);

  /* ==========================================================
     SCROLL PADDING
     ========================================================== */

  const getScrollInset =
    useCallback(() => {
      const viewport =
        viewportRef.current;

      if (!viewport) {
        return 0;
      }

      const value =
        Number.parseFloat(
          window.getComputedStyle(
            viewport,
          ).scrollPaddingLeft ||
          "0",
        );

      return Number.isFinite(
        value,
      )
        ? value
        : 0;
    }, []);

  /* ==========================================================
     RENDERED INDEX -> ORIGINAL SLIDE INDEX

     0,5,10 = Slide 1
     1,6,11 = Slide 2
     etc.
     ========================================================== */

  const renderedToLogicalIndex =
    useCallback(
      (
        renderedIndex: number,
      ) => {
        return (
          renderedIndex %
          SLIDES.length
        );
      },
      [],
    );

  /* ==========================================================
     UPDATE ACTIVE
     ========================================================== */

  const syncActiveIndex =
    useCallback(
      (
        renderedIndex: number,
      ) => {
        const logicalIndex =
          renderedToLogicalIndex(
            renderedIndex,
          );

        activeLogicalIndexRef.current =
          logicalIndex;

        setActiveRenderedIndex(
          (current) =>
            current ===
              renderedIndex
              ? current
              : renderedIndex,
        );
      },
      [
        renderedToLogicalIndex,
      ],
    );

  /* ==========================================================
     FIND NEAREST SLIDE
     ========================================================== */

  const getNearestRenderedIndex =
    useCallback(() => {
      const viewport =
        viewportRef.current;

      const cards =
        getCards();

      if (
        !viewport ||
        cards.length === 0
      ) {
        return MIDDLE_START_INDEX;
      }

      const inset =
        getScrollInset();

      const targetLeft =
        viewport.scrollLeft +
        inset;

      let nearestIndex =
        MIDDLE_START_INDEX;

      let nearestDistance =
        Number.POSITIVE_INFINITY;

      cards.forEach(
        (card, index) => {
          const distance =
            Math.abs(
              card.offsetLeft -
              targetLeft,
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

      return nearestIndex;
    }, [
      getCards,
      getScrollInset,
    ]);

  /* ==========================================================
     GET EXACT SCROLL POSITION
     ========================================================== */

  const getCardScrollLeft =
    useCallback(
      (
        renderedIndex: number,
      ) => {
        const cards =
          getCards();

        if (
          cards.length === 0
        ) {
          return 0;
        }

        const safeIndex =
          Math.min(
            cards.length - 1,
            Math.max(
              0,
              renderedIndex,
            ),
          );

        const card =
          cards[safeIndex];

        const inset =
          getScrollInset();

        return Math.max(
          0,
          card.offsetLeft -
          inset,
        );
      },
      [
        getCards,
        getScrollInset,
      ],
    );

  /* ==========================================================
     SILENT JUMP

     Used to move clone -> real middle copy.

     There is NO animation during this reset.
     User cannot see this jump because both slides are identical.
     ========================================================== */

  const jumpToRenderedIndex =
    useCallback(
      (
        renderedIndex: number,
      ) => {
        const viewport =
          viewportRef.current;

        const cards =
          getCards();

        if (
          !viewport ||
          cards.length === 0
        ) {
          return;
        }

        const safeIndex =
          Math.min(
            cards.length - 1,
            Math.max(
              0,
              renderedIndex,
            ),
          );

        const left =
          getCardScrollLeft(
            safeIndex,
          );

        const previousBehavior =
          viewport.style
            .scrollBehavior;

        const previousSnap =
          viewport.style
            .scrollSnapType;

        /*
         * Temporarily disable smooth scroll and snapping.
         */
        viewport.style.scrollBehavior =
          "auto";

        viewport.style.scrollSnapType =
          "none";

        viewport.scrollTo({
          left,
          behavior: "auto",
        });

        viewport.style.scrollBehavior =
          previousBehavior;

        viewport.style.scrollSnapType =
          previousSnap;

        syncActiveIndex(
          safeIndex,
        );
      },
      [
        getCards,
        getCardScrollLeft,
        syncActiveIndex,
      ],
    );

  /* ==========================================================
     NORMAL SMOOTH SCROLL
     ========================================================== */

  const scrollToRenderedIndex =
    useCallback(
      (
        renderedIndex: number,
        behavior: ScrollBehavior = "smooth",
      ) => {
        const viewport =
          viewportRef.current;

        const cards =
          getCards();

        if (
          !viewport ||
          cards.length === 0
        ) {
          return;
        }

        const safeIndex =
          Math.min(
            cards.length - 1,
            Math.max(
              0,
              renderedIndex,
            ),
          );

        viewport.scrollTo({
          left:
            getCardScrollLeft(
              safeIndex,
            ),
          behavior,
        });

        syncActiveIndex(
          safeIndex,
        );
      },
      [
        getCards,
        getCardScrollLeft,
        syncActiveIndex,
      ],
    );

  /* ==========================================================
     RECENTER INFINITE TRACK

     If we land inside:

       previous clone group
       OR
       next clone group

     move to the identical slide inside the middle group.

     Example:

       index 10 = next-copy Slide 1

     becomes:

       index 5 = real Slide 1

     Visually nothing changes.

     But now autoplay has:
       index 6 = Slide 2

     ready immediately after it.
     ========================================================== */

  const correctLoopPosition =
    useCallback(() => {
      /*
       * Never reposition while user is actively dragging.
       */
      if (
        dragRef.current
          .pointerId !== -1
      ) {
        return;
      }

      const nearestIndex =
        getNearestRenderedIndex();

      const logicalIndex =
        renderedToLogicalIndex(
          nearestIndex,
        );

      /*
       * We are outside the middle group.
       */
      if (
        nearestIndex <
        MIDDLE_START_INDEX ||
        nearestIndex >=
        MIDDLE_END_INDEX
      ) {
        const middleIndex =
          MIDDLE_START_INDEX +
          logicalIndex;

        jumpToRenderedIndex(
          middleIndex,
        );

        return;
      }

      syncActiveIndex(
        nearestIndex,
      );
    }, [
      getNearestRenderedIndex,
      jumpToRenderedIndex,
      renderedToLogicalIndex,
      syncActiveIndex,
    ]);

  /* ==========================================================
     HANDLE SCROLL
     ========================================================== */

  const handleScroll =
    useCallback(() => {
      /*
       * Update active slide efficiently.
       */
      if (
        scrollFrameRef.current !==
        null
      ) {
        window.cancelAnimationFrame(
          scrollFrameRef.current,
        );
      }

      scrollFrameRef.current =
        window.requestAnimationFrame(
          () => {
            scrollFrameRef.current =
              null;

            const nearest =
              getNearestRenderedIndex();

            syncActiveIndex(
              nearest,
            );
          },
        );

      /*
       * Wait until scrolling ends before doing the silent
       * infinite-loop reposition.
       */
      if (
        scrollSettleTimerRef.current !==
        null
      ) {
        window.clearTimeout(
          scrollSettleTimerRef.current,
        );
      }

      scrollSettleTimerRef.current =
        window.setTimeout(
          () => {
            scrollSettleTimerRef.current =
              null;

            correctLoopPosition();
          },
          SCROLL_SETTLE_DELAY,
        );
    }, [
      correctLoopPosition,
      getNearestRenderedIndex,
      syncActiveIndex,
    ]);

  /* ==========================================================
     MOVE NEXT / PREVIOUS

     No buttons are displayed.

     This function is used by:
     - autoplay
     - keyboard arrow keys
     ========================================================== */

  const moveCarousel =
    useCallback(
      (
        direction: 1 | -1,
      ) => {
        let currentIndex =
          getNearestRenderedIndex();

        /*
         * If for any reason we're still inside a clone group,
         * normalize to the middle first.
         */
        if (
          currentIndex <
          MIDDLE_START_INDEX ||
          currentIndex >=
          MIDDLE_END_INDEX
        ) {
          const logicalIndex =
            renderedToLogicalIndex(
              currentIndex,
            );

          currentIndex =
            MIDDLE_START_INDEX +
            logicalIndex;

          jumpToRenderedIndex(
            currentIndex,
          );
        }

        /*
         * Important:
         *
         * Slide 5:
         * middle index 9
         *
         * NEXT becomes:
         * index 10
         *
         * index 10 = cloned Slide 1.
         *
         * After animation, correctLoopPosition()
         * silently changes index 10 -> index 5.
         *
         * Then next autoplay:
         * index 5 -> index 6 (Slide 2).
         */
        const nextIndex =
          currentIndex +
          direction;

        scrollToRenderedIndex(
          nextIndex,
          "smooth",
        );
      },
      [
        getNearestRenderedIndex,
        jumpToRenderedIndex,
        renderedToLogicalIndex,
        scrollToRenderedIndex,
      ],
    );

  /* ==========================================================
     FINISH DRAG
     ========================================================== */

  const finishDrag =
    useCallback(
      (
        pointerId: number,
      ) => {
        const viewport =
          viewportRef.current;

        if (
          !viewport ||
          dragRef.current.pointerId !==
          pointerId
        ) {
          return;
        }

        const moved =
          dragRef.current.moved;

        if (
          viewport.hasPointerCapture(
            pointerId,
          )
        ) {
          viewport.releasePointerCapture(
            pointerId,
          );
        }

        dragRef.current.pointerId =
          -1;
        dragRef.current.moved =
          false;

        setIsDragging(false);

        if (!moved) {
          return;
        }

        suppressClickRef.current =
          true;

        window.setTimeout(
          () => {
            suppressClickRef.current =
              false;
          },
          120,
        );

        window.requestAnimationFrame(
          () => {
            const nearestIndex =
              getNearestRenderedIndex();

            scrollToRenderedIndex(
              nearestIndex,
              "smooth",
            );
          },
        );
      },
      [
        getNearestRenderedIndex,
        scrollToRenderedIndex,
      ],
    );

  /* ==========================================================
     INITIAL POSITION
     ========================================================== */

  useEffect(() => {
    /*
     * Immediately start on the REAL middle Slide 1.
     */
    jumpToRenderedIndex(
      MIDDLE_START_INDEX,
    );

    setIsReady(true);
  }, [jumpToRenderedIndex]);

  /* ==========================================================
     AUTOPLAY
     ========================================================== */

  useEffect(() => {
    if (
      isAutoplayPaused
    ) {
      return;
    }

    const autoplayTimer =
      window.setTimeout(
        () => {
          moveCarousel(1);
        },
        AUTOPLAY_DELAY,
      );

    return () => {
      window.clearTimeout(
        autoplayTimer,
      );
    };
  }, [
    activeRenderedIndex,
    isAutoplayPaused,
    moveCarousel,
  ]);

  /* ==========================================================
     RESIZE
     ========================================================== */

  useEffect(() => {
    const handleResize =
      () => {
        if (
          resizeFrameRef.current !==
          null
        ) {
          window.cancelAnimationFrame(
            resizeFrameRef.current,
          );
        }

        resizeFrameRef.current =
          window.requestAnimationFrame(
            () => {
              resizeFrameRef.current =
                null;

              /*
               * Return to same logical slide in middle group.
               */
              jumpToRenderedIndex(
                MIDDLE_START_INDEX +
                activeLogicalIndexRef.current,
              );
            },
          );
      };

    window.addEventListener(
      "resize",
      handleResize,
    );

    return () => {
      window.removeEventListener(
        "resize",
        handleResize,
      );
    };
  }, [
    jumpToRenderedIndex,
  ]);

  /* ==========================================================
     CLEANUP
     ========================================================== */

  useEffect(() => {
    return () => {
      if (
        scrollFrameRef.current !==
        null
      ) {
        window.cancelAnimationFrame(
          scrollFrameRef.current,
        );
      }

      if (
        resizeFrameRef.current !==
        null
      ) {
        window.cancelAnimationFrame(
          resizeFrameRef.current,
        );
      }

      if (
        scrollSettleTimerRef.current !==
        null
      ) {
        window.clearTimeout(
          scrollSettleTimerRef.current,
        );
      }
    };
  }, []);

  /* ==========================================================
     RENDER
     ========================================================== */

  return (
    <section
      id="clients"
      aria-labelledby="clients-heading"
      data-motion-managed
      className={styles.section}
    >
      <div
        className={
          styles.content
        }
      >
        <div
          className={
            styles.header
          }
        >
          <HeaderText />
        </div>

        <div
          ref={viewportRef}
          className={
            styles.viewport
          }
          data-dragging={
            isDragging
          }
          data-ready={
            isReady
          }
          data-lenis-prevent-horizontal
          role="region"
          aria-label="Business ecosystem carousel"
          tabIndex={0}

          /* ---------------------------------------------
             AUTOPLAY PAUSE ON HOVER
             --------------------------------------------- */

          onMouseEnter={() => {
            setIsHovered(true);
          }}

          onMouseLeave={() => {
            setIsHovered(false);
          }}

          /* ---------------------------------------------
             SCROLL
             --------------------------------------------- */

          onScroll={
            handleScroll
          }

          /* ---------------------------------------------
             KEYBOARD
             --------------------------------------------- */

          onKeyDown={(
            event,
          ) => {
            if (
              event.key ===
              "ArrowRight"
            ) {
              event.preventDefault();

              moveCarousel(1);

              return;
            }

            if (
              event.key ===
              "ArrowLeft"
            ) {
              event.preventDefault();

              moveCarousel(-1);
            }
          }}

          /* ---------------------------------------------
             PREVENT CLICK AFTER DRAG
             --------------------------------------------- */

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

          /* ---------------------------------------------
             START POINTER GESTURE
             --------------------------------------------- */

          onPointerDown={(
            event,
          ) => {
            if (
              event.pointerType ===
              "mouse" &&
              event.button !== 0
            ) {
              return;
            }

            const viewport =
              viewportRef.current;

            if (!viewport) {
              return;
            }

            suppressClickRef.current =
              false;

            dragRef.current = {
              pointerId:
                event.pointerId,
              startX:
                event.clientX,
              startScrollLeft:
                viewport.scrollLeft,
              moved: false,
            };
          }}

          onDragStart={(
            event,
          ) => {
            event.preventDefault();
          }}

          /* ---------------------------------------------
             DRAG MOVE
             --------------------------------------------- */

          onPointerMove={(
            event,
          ) => {
            const viewport =
              viewportRef.current;

            const drag =
              dragRef.current;

            if (
              !viewport ||
              drag.pointerId !==
              event.pointerId
            ) {
              return;
            }

            const delta =
              event.clientX -
              drag.startX;

            if (!drag.moved) {
              if (
                Math.abs(delta) <
                DRAG_THRESHOLD
              ) {
                return;
              }

              drag.moved = true;
              setIsDragging(true);

              if (
                !viewport.hasPointerCapture(
                  event.pointerId,
                )
              ) {
                viewport.setPointerCapture(
                  event.pointerId,
                );
              }
            }

            viewport.scrollLeft =
              drag.startScrollLeft -
              delta;
          }}

          /* ---------------------------------------------
             END DRAG
             --------------------------------------------- */

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

          onLostPointerCapture={(
            event,
          ) => {
            if (
              dragRef.current
                .pointerId ===
              event.pointerId
            ) {
              dragRef.current.pointerId =
                -1;

              dragRef.current.moved =
                false;

              setIsDragging(
                false,
              );
            }
          }}
        >
          <div
            className={
              styles.track
            }
          >
            {LOOPED_SLIDES.map(
              (
                item,
                renderedIndex,
              ) => (
                <div
                  key={
                    item.key
                  }
                  data-client-slide
                  className={
                    styles.slide
                  }
                >
                  <SlideCard
                    slide={
                      item.slide
                    }
                    isClone={
                      item.isClone
                    }
                    isActive={
                      renderedIndex ===
                      activeRenderedIndex
                    }
                  />
                </div>
              ),
            )}
          </div>
        </div>
      </div>
    </section>
  );
}