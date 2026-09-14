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

const UI_EASE = [0.22, 1, 0.36, 1] as const;

/* ============================================================
   ICONS
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

function ChevronLeft() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      width="24"
      height="24"
    >
      <path
        d="M14.5 5.5 8 12l6.5 6.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      width="24"
      height="24"
    >
      <path
        d="m9.5 5.5 6.5 6.5-6.5 6.5"
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
        viewport={{ once: true, amount: 0.55 }}
        transition={{ duration: 0.45, ease: UI_EASE }}
        className={`${plusJakartaSans.className} ${styles.eyebrow}`}
        style={{ fontFeatureSettings: '"liga" off, "clig" off' }}
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
        viewport={{ once: true, amount: 0.55 }}
        transition={{ duration: 0.58, delay: 0.04, ease: UI_EASE }}
        className={`${plusJakartaSans.className} ${styles.heading}`}
        style={{ fontFeatureSettings: '"liga" off, "clig" off' }}
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
}: {
  slide: Slide;
  isActive: boolean;
}) {
  return (
    <article
      aria-current={isActive ? "true" : undefined}
      className={styles.card}
    >
      {/* Only the media area is deliberately tall. */}
      <div className={styles.visual}>
        <Image
          src={slide.image}
          alt={slide.title}
          fill
          loading="lazy"
          draggable={false}
          sizes="(max-width: 639px) calc(100vw - 2.5rem), (max-width: 767px) 84vw, (max-width: 1023px) 76vw, (max-width: 1279px) 68vw, (max-width: 1535px) 64vw, 60vw"
          className={styles.image}
          style={{ objectPosition: slide.imagePosition ?? "center center" }}
        />
      </div>

      <div className={styles.copy}>
        <div className={styles.copyText}>
          <p
            className={`${plusJakartaSans.className} ${styles.cardEyebrow}`}
            style={{ fontFeatureSettings: '"liga" off, "clig" off' }}
          >
            {slide.eyebrow.replace(/^\d+\.\s*/, "")}
          </p>

          <h3
            className={`${plusJakartaSans.className} ${styles.title}`}
            style={{ fontFeatureSettings: '"liga" off, "clig" off' }}
          >
            {slide.title}
          </h3>

          <p
            className={`${plusJakartaSans.className} ${styles.description}`}
            style={{ fontFeatureSettings: '"liga" off, "clig" off' }}
          >
            {slide.description}
          </p>
        </div>

        <div className={styles.actions}>
          <Link
            href={slide.primaryHref}
            className={`${inter.className} ${styles.primary}`}
            style={{ fontFeatureSettings: '"liga" off, "clig" off' }}
          >
            <span>{slide.primaryLabel}</span>
            <span aria-hidden="true" className={styles.actionArrow}>
              <SmallArrowRight />
            </span>
          </Link>

          <Link
            href={slide.secondaryHref}
            className={`${inter.className} ${styles.secondary}`}
            style={{ fontFeatureSettings: '"liga" off, "clig" off' }}
          >
            <span>{slide.secondaryLabel}</span>
            <span aria-hidden="true" className={styles.actionArrow}>
              <SmallArrowRight />
            </span>
          </Link>
        </div>
      </div>
    </article>
  );
}

/* ============================================================
   BUSINESS ECOSYSTEM

   This version intentionally has NO scroll-linked / pinned animation.

   Desktop + tablet + mobile:
   - normal document flow
   - horizontal draggable rail
   - touch swipe
   - mouse / pen drag
   - previous / next chevrons
   - CSS scroll snapping
   ============================================================ */

export function ClientsSection() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const scrollFrameRef = useRef<number | null>(null);

  const dragRef = useRef({
    pointerId: -1,
    startX: 0,
    startScrollLeft: 0,
    moved: false,
  });

  const suppressClickRef = useRef(false);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const getCards = useCallback(() => {
    const viewport = viewportRef.current;

    if (!viewport) {
      return [] as HTMLElement[];
    }

    return Array.from(
      viewport.querySelectorAll<HTMLElement>("[data-client-slide]"),
    );
  }, []);

  const getScrollInset = useCallback(() => {
    const viewport = viewportRef.current;

    if (!viewport) {
      return 0;
    }

    const value = Number.parseFloat(
      window.getComputedStyle(viewport).scrollPaddingLeft || "0",
    );

    return Number.isFinite(value) ? value : 0;
  }, []);

  const updateActiveIndex = useCallback(() => {
    const viewport = viewportRef.current;
    const cards = getCards();

    if (!viewport || cards.length === 0) {
      return;
    }

    const viewportRect = viewport.getBoundingClientRect();
    const inset = getScrollInset();
    const targetLeft = viewportRect.left + inset;

    let nearestIndex = 0;
    let nearestDistance = Number.POSITIVE_INFINITY;

    cards.forEach((card, index) => {
      const rect = card.getBoundingClientRect();
      const distance = Math.abs(rect.left - targetLeft);

      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestIndex = index;
      }
    });

    setActiveIndex((current) =>
      current === nearestIndex ? current : nearestIndex,
    );
  }, [getCards, getScrollInset]);

  const scrollToIndex = useCallback(
    (index: number, behavior: ScrollBehavior = "smooth") => {
      const viewport = viewportRef.current;
      const cards = getCards();

      if (!viewport || cards.length === 0) {
        return;
      }

      const nextIndex = Math.min(
        cards.length - 1,
        Math.max(0, index),
      );

      const inset = getScrollInset();
      const card = cards[nextIndex];

      viewport.scrollTo({
        left: Math.max(0, card.offsetLeft - inset),
        behavior,
      });

      setActiveIndex(nextIndex);
    },
    [getCards, getScrollInset],
  );

  const handleScroll = useCallback(() => {
    if (scrollFrameRef.current !== null) {
      window.cancelAnimationFrame(scrollFrameRef.current);
    }

    scrollFrameRef.current = window.requestAnimationFrame(() => {
      scrollFrameRef.current = null;
      updateActiveIndex();
    });
  }, [updateActiveIndex]);

  const finishDrag = useCallback(
    (pointerId: number) => {
      const viewport = viewportRef.current;

      if (!viewport || dragRef.current.pointerId !== pointerId) {
        return;
      }

      if (viewport.hasPointerCapture(pointerId)) {
        viewport.releasePointerCapture(pointerId);
      }

      const moved = dragRef.current.moved;

      dragRef.current.pointerId = -1;
      dragRef.current.moved = false;

      setIsDragging(false);

      if (moved) {
        suppressClickRef.current = true;

        window.requestAnimationFrame(() => {
          updateActiveIndex();

          window.requestAnimationFrame(() => {
            const cards = getCards();
            const currentViewport = viewportRef.current;

            if (!currentViewport || cards.length === 0) {
              return;
            }

            const viewportRect = currentViewport.getBoundingClientRect();
            const inset = getScrollInset();
            const targetLeft = viewportRect.left + inset;

            let nearestIndex = 0;
            let nearestDistance = Number.POSITIVE_INFINITY;

            cards.forEach((card, index) => {
              const rect = card.getBoundingClientRect();
              const distance = Math.abs(rect.left - targetLeft);

              if (distance < nearestDistance) {
                nearestDistance = distance;
                nearestIndex = index;
              }
            });

            scrollToIndex(nearestIndex);
          });
        });
      }
    },
    [getCards, getScrollInset, scrollToIndex, updateActiveIndex],
  );

  useEffect(() => {
    return () => {
      if (scrollFrameRef.current !== null) {
        window.cancelAnimationFrame(scrollFrameRef.current);
      }
    };
  }, []);

  return (
    <section
      id="clients"
      aria-labelledby="clients-heading"
      data-motion-managed
      className={styles.section}
    >
      <div className={styles.content}>
        <div className={styles.header}>
          <HeaderText />

          <div
            className={styles.carouselControls}
            aria-label="Business ecosystem carousel controls"
          >
            <button
              type="button"
              className={styles.carouselButton}
              onClick={() => scrollToIndex(activeIndex - 1)}
              disabled={activeIndex === 0}
              aria-label="Previous slide"
            >
              <ChevronLeft />
            </button>

            <button
              type="button"
              className={styles.carouselButton}
              onClick={() => scrollToIndex(activeIndex + 1)}
              disabled={activeIndex === SLIDES.length - 1}
              aria-label="Next slide"
            >
              <ChevronRight />
            </button>
          </div>
        </div>

        <div
          ref={viewportRef}
          className={styles.viewport}
          data-dragging={isDragging}
          role="region"
          aria-label="Business ecosystem"
          tabIndex={0}
          onScroll={handleScroll}
          onClickCapture={(event) => {
            if (!suppressClickRef.current) {
              return;
            }

            event.preventDefault();
            event.stopPropagation();
            suppressClickRef.current = false;
          }}
          onPointerDown={(event) => {
            if (event.pointerType === "mouse" && event.button !== 0) {
              return;
            }

            const viewport = viewportRef.current;

            if (!viewport) {
              return;
            }

            dragRef.current = {
              pointerId: event.pointerId,
              startX: event.clientX,
              startScrollLeft: viewport.scrollLeft,
              moved: false,
            };

            viewport.setPointerCapture(event.pointerId);
            setIsDragging(true);
          }}
          onPointerMove={(event) => {
            const viewport = viewportRef.current;
            const drag = dragRef.current;

            if (!viewport || drag.pointerId !== event.pointerId) {
              return;
            }

            const delta = event.clientX - drag.startX;

            if (Math.abs(delta) > 6) {
              drag.moved = true;
            }

            viewport.scrollLeft = drag.startScrollLeft - delta;
          }}
          onPointerUp={(event) => finishDrag(event.pointerId)}
          onPointerCancel={(event) => finishDrag(event.pointerId)}
          onLostPointerCapture={(event) => {
            if (dragRef.current.pointerId === event.pointerId) {
              dragRef.current.pointerId = -1;
              setIsDragging(false);
            }
          }}
        >
          <div className={styles.track}>
            {SLIDES.map((slide, index) => (
              <div
                key={slide.id}
                data-client-slide
                className={styles.slide}
              >
                <SlideCard
                  slide={slide}
                  isActive={index === activeIndex}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
