"use client";

import Image from "@/components/ui/image";
import Link from "next/link";

import {
  inter,
  plusJakartaSans,
} from "@/lib/fonts";

import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import styles from "./film-section.module.css";

/* ============================================================
   TYPES
   ============================================================ */

type GalleryImage = {
  src: string;
  alt: string;
  position?: string;
};

type GalleryGeometry = {
  height: number;
  travel: number;
  initialScale: number;
  endFraction: number;
};

/* ============================================================
   CONTENT
   ============================================================ */

const HEADING =
  "Abhijat Marathi made its Global Alpha Launch at the Cannes Film Festival 2026, at the Bharat (India) Pavilion.";

const DESCRIPTION =
  "From creating original content and building digital platforms to strategic communications and global distribution, our integrated capabilities help businesses, creators, governments, and brands grow through media and technology.";

/* ============================================================
   EXISTING IMAGES
   ============================================================ */

const GALLERY_IMAGES = [
  {
    src: "/images/landing/film/mumbai-gateway.png",
    alt: "Gateway of India and Mumbai harbour at golden hour",
  },
  {
    src: "/images/landing/film/ganesh-festival.png",
    alt: "Ganesh Chaturthi procession with traditional dhol-tasha performers",
  },
  {
    src: "/images/landing/film/lavani-performance.png",
    alt: "Traditional Marathi Lavani performance in a heritage theatre",
  },
  {
    src: "/images/landing/film/marine-drive.png",
    alt: "Mumbai Marine Drive and the Queen's Necklace after monsoon rain",
  },
  {
    src: "/images/landing/hero/Image1.png",
    alt: "Illustrated tribute to Chhatrapati Shivaji Maharaj",
  },
  {
    src: "/images/landing/background2.png",
    alt: "Abhijat Marathi presentation at the Bharat Pavilion",
    position: "center 42%",
  },
] as const satisfies readonly GalleryImage[];

/* ============================================================
   EXACTLY TWO ROWS

   Each row has one buffer image at either end so horizontal
   movement does not expose an empty edge.

   These are static buffers:
   - no autoplay
   - no infinite carousel
   - no third row
   ============================================================ */

const GALLERY_ROWS: readonly (readonly GalleryImage[])[] = [
  [
    GALLERY_IMAGES[5],
    ...GALLERY_IMAGES,
    GALLERY_IMAGES[0],
  ],

  [
    GALLERY_IMAGES[2],
    GALLERY_IMAGES[3],
    GALLERY_IMAGES[5],
    GALLERY_IMAGES[1],
    GALLERY_IMAGES[4],
    GALLERY_IMAGES[0],
    GALLERY_IMAGES[2],
    GALLERY_IMAGES[3],
  ],
];

/* ============================================================
   MOTION
   ============================================================ */

const EASE: [number, number, number, number] = [
  0.22,
  1,
  0.36,
  1,
];

const INITIAL_GEOMETRY: GalleryGeometry = {
  height: 0,
  travel: 0,
  initialScale: 2.05,
  endFraction: 1.35 / 2.35,
};

function clamp01(value: number) {
  return Math.min(
    1,
    Math.max(0, value),
  );
}

/* ============================================================
   CTA ICON
   ============================================================ */

function CaretRightIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      width="20"
      height="20"
      fill="none"
    >
      <path
        d="M7.5 15L12.5 10L7.5 5"
        stroke="currentColor"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ============================================================
   IMAGE CARD

   Square image treatment, as in the recording.
   No independent hover zoom competing with the wall animation.
   ============================================================ */

function GalleryCard({
  image,
  decorative = false,
  loadImages,
}: {
  image: GalleryImage;
  decorative?: boolean;
  loadImages: boolean;
}) {
  return (
    <figure className={styles.card}>
      <Image
        src={image.src}
        alt={decorative ? "" : image.alt}
        fill
        loading={loadImages ? "eager" : "lazy"}
        decoding="async"
        draggable={false}
        sizes="
          (max-width: 639px) 84vw,
          (max-width: 1023px) 64vw,
          38vw
        "
        className={styles.image}
        style={{
          objectPosition: image.position ?? "center",
        }}
      />
    </figure>
  );
}

/* ============================================================
   GALLERY ROW
   ============================================================ */

function GalleryRow({
  images,
  x,
  decorative,
  loadImages,
}: {
  images: readonly GalleryImage[];
  x: MotionValue<number>;
  decorative: boolean;
  loadImages: boolean;
}) {
  return (
    <div
      className={styles.row}
      aria-hidden={decorative ? true : undefined}
    >
      <motion.div
        data-film-row-track
        className={styles.track}
        style={{ x }}
      >
        {images.map((image, index) => (
          <GalleryCard
            key={`${image.src}-${index}`}
            image={image}
            decorative={
              decorative ||
              index === 0 ||
              index === images.length - 1
            }
            loadImages={loadImages}
          />
        ))}
      </motion.div>
    </div>
  );
}

/* ============================================================
   FILM SECTION
   ============================================================ */

export function FilmSection() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  const reduceMotion = useReducedMotion() === true;

  const [geometry, setGeometry] = useState(
    INITIAL_GEOMETRY,
  );

  /*
   * Load the gallery shortly before the user reaches it.
   * Both rows reuse the same six image sources.
   */
  const loadImages = useInView(sceneRef, {
    once: true,
    margin: "700px 0px 700px 0px",
  });

  const sceneVisible = useInView(sceneRef, {
    margin: "100px 0px 100px 0px",
  });

  /* ==========================================================
     RESPONSIVE MEASUREMENTS

     Measure layout dimensions, not transformed rectangles.

     The zoom itself therefore cannot change the measurement
     and cause the animation to recalculate continuously.
     ========================================================== */

  useEffect(() => {
    if (reduceMotion) {
      return;
    }

    const stage = stageRef.current;

    const track =
      stage?.querySelector<HTMLElement>(
        "[data-film-row-track]",
      );

    const card = track?.firstElementChild;

    if (
      !stage ||
      !track ||
      !(card instanceof HTMLElement)
    ) {
      return;
    }

    let frame: number | null = null;
    let disposed = false;

    const measure = () => {
      frame = null;

      if (disposed) {
        return;
      }

      const width = stage.clientWidth;
      const height = stage.clientHeight;

      if (!width || !height) {
        return;
      }

      const gap =
        Number.parseFloat(
          getComputedStyle(track).columnGap,
        ) || 0;

      const cardStep = card.offsetWidth + gap;

      /*
       * Limit horizontal travel to the available row width.
       * This prevents black gaps at the left or right edges.
       */
      const safeOverflow = Math.max(
        0,
        (track.scrollWidth - width) / 2 - 16,
      );

      const compact = width < 1024;

      const travel = Math.min(
        cardStep * (compact ? 1.15 : 1.8),
        safeOverflow,
      );

      /*
       * The scroll scene consists of:
       *
       * one visible stage
       * +
       * the distance used by the zoom/row animation.
       *
       * No additional inactive hold is appended.
       */
      const scrollDistance = Math.round(
        height * (compact ? 1.1 : 1.35),
      );

      const totalHeight = height + scrollDistance;

      const next: GalleryGeometry = {
        height: totalHeight,
        travel,

        initialScale:
          width < 640
            ? 1.22
            : compact
              ? 1.6
              : 2.05,

        endFraction:
          scrollDistance / totalHeight,
      };

      setGeometry((current) =>
        Math.abs(current.height - next.height) < 0.5 &&
          Math.abs(current.travel - next.travel) < 0.5 &&
          current.initialScale === next.initialScale &&
          Math.abs(
            current.endFraction - next.endFraction,
          ) < 0.0001
          ? current
          : next,
      );
    };

    const scheduleMeasure = () => {
      if (!disposed && frame === null) {
        frame = requestAnimationFrame(measure);
      }
    };

    scheduleMeasure();

    const observer = new ResizeObserver(
      scheduleMeasure,
    );

    observer.observe(stage);
    observer.observe(track);
    observer.observe(card);

    window.addEventListener(
      "resize",
      scheduleMeasure,
      { passive: true },
    );

    return () => {
      disposed = true;

      if (frame !== null) {
        cancelAnimationFrame(frame);
      }

      observer.disconnect();

      window.removeEventListener(
        "resize",
        scheduleMeasure,
      );
    };
  }, [reduceMotion]);

  /* ==========================================================
     SCROLL PROGRESS

     Measure the untransformed outer scene.

     Mapping the scene's full height to its actual pin distance
     keeps animation completion aligned with sticky release.
     ========================================================== */

  const { scrollYProgress } = useScroll({
    target: sceneRef,

    offset: [
      "start start",
      "end start",
    ],
  });

  const progress = useTransform(
    scrollYProgress,
    (value) =>
      clamp01(
        value /
        Math.max(geometry.endFraction, 0.001),
      ),
  );

  /* ==========================================================
     ONE SHARED ZOOM

     Desktop:
       large images → smaller images
       2.05 → 1

     Only the complete wall scales.
     Individual cards do not run separate zoom animations.
     ========================================================== */

  const scale = useTransform(
    progress,
    (value) =>
      geometry.initialScale +
      (1 - geometry.initialScale) * value,
  );

  /* ==========================================================
     OPPOSING ROW MOVEMENT

     The horizontal movement starts gently and increases
     as the wall zooms out.

     Both values reverse naturally when scrolling upward.
     ========================================================== */

  const topX = useTransform(
    progress,
    (value) =>
      -geometry.travel * value * value,
  );

  const bottomX = useTransform(
    progress,
    (value) =>
      geometry.travel * value * value,
  );

  /* ==========================================================
     RENDER
     ========================================================== */

  return (
    <section
      id="abhijat-marathi-cannes"
      aria-labelledby="abhijat-marathi-cannes-heading"
      data-motion-managed
      data-landing-text-reveal-skip
      className={`
        ${plusJakartaSans.className}
        ${styles.section}
      `}
    >
      {/* =====================================================
          TEXT AND CTA
          ===================================================== */}

      <div className={styles.content}>
        <motion.h2
          id="abhijat-marathi-cannes-heading"
          className={styles.heading}
          initial={
            reduceMotion
              ? false
              : {
                opacity: 0,
                y: 22,
              }
          }
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.15,
          }}
          transition={{
            duration: reduceMotion ? 0 : 0.7,
            ease: EASE,
          }}
        >
          {HEADING}
        </motion.h2>

        <motion.p
          className={styles.description}
          initial={
            reduceMotion
              ? false
              : {
                opacity: 0,
                y: 18,
              }
          }
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.15,
          }}
          transition={{
            duration: reduceMotion ? 0 : 0.65,
            ease: EASE,
          }}
        >
          {DESCRIPTION}
        </motion.p>

        <Link
          href="/portfolio"
          className={`
            ${inter.className}
            ${styles.cta}
          `}
        >
          <span>Cannes Moment</span>

          <span className={styles.ctaArrow}>
            <CaretRightIcon />
          </span>
        </Link>
      </div>

      {/* =====================================================
          TWO-ROW SCROLL SCENE
          ===================================================== */}

      <div
        ref={sceneRef}
        className={styles.scene}
        data-reduced={reduceMotion}
        data-active={sceneVisible && !reduceMotion}
        role="group"
        aria-label="Mumbai and Marathi culture gallery"
        style={{
          height:
            reduceMotion
              ? undefined
              : geometry.height || undefined,
        }}
      >
        {reduceMotion ? (
          /* =================================================
             ACCESSIBLE STATIC FALLBACK

             Six unique images, arranged in two rows.
             ================================================= */

          <div
            className={styles.reducedViewport}
            tabIndex={0}
          >
            <div className={styles.reducedGrid}>
              {GALLERY_IMAGES.map((image) => (
                <GalleryCard
                  key={image.src}
                  image={image}
                  loadImages={loadImages}
                />
              ))}
            </div>
          </div>
        ) : (
          /* =================================================
             PINNED ZOOM-OUT GALLERY
             ================================================= */

          <div
            ref={stageRef}
            className={styles.stage}
          >
            <motion.div
              className={styles.wall}
              style={{ scale }}
            >
              {/* ROW 1 — MOVES LEFT */}

              <GalleryRow
                images={GALLERY_ROWS[0]}
                x={topX}
                decorative={false}
                loadImages={loadImages}
              />

              {/* ROW 2 — MOVES RIGHT */}

              <GalleryRow
                images={GALLERY_ROWS[1]}
                x={bottomX}
                decorative
                loadImages={loadImages}
              />
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}