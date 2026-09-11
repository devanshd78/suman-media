"use client";

import Image from "@/components/ui/image";
import Link from "next/link";

import {
  inter,
  plusJakartaSans,
} from "@/lib/fonts";

import type { CmsCannesMediaItem, CmsCannesSection } from "@/types/cms";

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

import styles from "./cannes-section.module.css";

/* ============================================================
   TYPES
   ============================================================ */

type GalleryMedia = {
  key: string;
  kind: "image" | "video";
  src: string;
  alt: string;
  poster?: string;
  position?: string;
  fit?: "cover" | "contain";
};

type GalleryGeometry = {
  height: number;
  travel: number;
  initialScale: number;
  endFraction: number;
};

type CannesSectionProps = {
  content?: CmsCannesSection | null;
};

/* ============================================================
   DEFAULT CANNES CONTENT

   Sanity wins when editors provide content/media. The local files
   below are the production-safe fallback when the CMS section or
   its media array is empty/unavailable.
   ============================================================ */

const DEFAULT_HEADING =
  "Abhijat Marathi made its Global Alpha Launch at the Cannes Film Festival 2026, at the Bharat (India) Pavilion.";

const DEFAULT_DESCRIPTION =
  "Explore photographs and video moments from Abhijat Marathi's Cannes 2026 presence at the Bharat (India) Pavilion.";

const DEFAULT_CTA = {
  label: "Explore Cannes Moments",
  href: "#cannes-gallery",
} as const;

const FALLBACK_CANNES_MEDIA: readonly GalleryMedia[] = [
  {
    key: "cannes-red-carpet-group-01",
    kind: "image",
    src: "/cannes/cannes-red-carpet-group-01.jpg",
    alt: "Guests representing Indian culture on the Cannes red carpet",
    position: "center 44%",
    fit: "contain",
  },
  {
    key: "cannes-interview-group-short",
    kind: "video",
    src: "/cannes/cannes-interview-group-short.mp4",
    alt: "Cannes interview moment with guests at the festival",
    fit: "contain",
  },
  {
    key: "cannes-red-carpet-portrait-01",
    kind: "image",
    src: "/cannes/cannes-red-carpet-portrait-01.jpg",
    alt: "Festival guest in traditional attire on the Cannes red carpet",
    position: "center 34%",
    fit: "contain",
  },
  {
    key: "cannes-red-carpet-walk",
    kind: "video",
    src: "/cannes/cannes-red-carpet-walk.mp4",
    alt: "Cannes red carpet festival moment",
    fit: "contain",
  },
  {
    key: "cannes-red-carpet-group-02",
    kind: "image",
    src: "/cannes/cannes-red-carpet-group-02.jpg",
    alt: "Festival guests posing together on the Cannes red carpet",
    position: "center 42%",
    fit: "contain",
  },
  {
    key: "cannes-red-carpet-portrait-video",
    kind: "video",
    src: "/cannes/cannes-red-carpet-portrait-video.mp4",
    alt: "Close-up Cannes red carpet video moment",
    fit: "contain",
  },
  {
    key: "cannes-red-carpet-blue-look-01",
    kind: "image",
    src: "/cannes/cannes-red-carpet-blue-look-01.jpg",
    alt: "Traditional blue look presented on the Cannes red carpet",
    position: "center 48%",
    fit: "contain",
  },
  {
    key: "cannes-interview-group",
    kind: "video",
    src: "/cannes/cannes-interview-group.mp4",
    alt: "Cannes festival interview with a group of guests",
    fit: "contain",
  },
  {
    key: "cannes-red-carpet-blue-look-02",
    kind: "image",
    src: "/cannes/cannes-red-carpet-blue-look-02.jpg",
    alt: "Wide Cannes red carpet moment featuring a traditional blue look",
    position: "center 48%",
    fit: "contain",
  },
  {
    key: "cannes-interview-indoor",
    kind: "video",
    src: "/cannes/cannes-interview-indoor.mp4",
    alt: "Indoor interview recorded during the Cannes visit",
    fit: "contain",
  },
  {
    key: "cannes-red-carpet-guests-01",
    kind: "image",
    src: "/cannes/cannes-red-carpet-guests-01.jpg",
    alt: "Guests greeting the audience on the Cannes red carpet",
    position: "center 38%",
    fit: "contain",
  },
  {
    key: "cannes-red-carpet-interview",
    kind: "video",
    src: "/cannes/cannes-red-carpet-interview.mp4",
    alt: "Red carpet interview moment at Cannes",
    fit: "contain",
  },
  {
    key: "cannes-pavilion-guests-01",
    kind: "image",
    src: "/cannes/cannes-pavilion-guests-01.jpg",
    alt: "Guests gathering at the Cannes pavilion",
    position: "center 38%",
    fit: "contain",
  },
  {
    key: "cannes-riviera-portrait-01",
    kind: "image",
    src: "/cannes/cannes-riviera-portrait-01.jpg",
    alt: "Festival portrait overlooking the Cannes waterfront",
    position: "center 42%",
    fit: "contain",
  },
  {
    key: "cannes-pavilion-guests-02",
    kind: "image",
    src: "/cannes/cannes-pavilion-guests-02.jpg",
    alt: "Cannes pavilion gathering with festival guests",
    position: "center 38%",
    fit: "contain",
  },
];
function toGalleryMedia(item: CmsCannesMediaItem): GalleryMedia | null {
  const videoUrl = item.videoUrl?.trim();
  const imageUrl = item.imageUrl?.trim();

  const hotspotPosition =
    typeof item.imageHotspotX === "number" && typeof item.imageHotspotY === "number"
      ? `${Math.round(item.imageHotspotX * 100)}% ${Math.round(item.imageHotspotY * 100)}%`
      : undefined;

  const position = item.objectPosition?.trim() || hotspotPosition;
  const requestedFit =
    item.objectFit === "contain" || item.objectFit === "cover"
      ? item.objectFit
      : undefined;

  // Prefer an explicitly selected video. Also accept a valid video URL when
  // older Sanity content predates the mediaType field. Videos default to
  // contain so faces and full portrait footage are never cropped away.
  if ((item.mediaType === "video" || (!item.mediaType && videoUrl)) && videoUrl) {
    return {
      key: item._key,
      kind: "video",
      src: videoUrl,
      alt: item.videoLabel?.trim() || item.caption?.trim() || "Cannes 2026 video moment",
      poster: item.posterUrl?.trim() || undefined,
      position,
      fit: requestedFit || "contain",
    };
  }

  if (imageUrl) {
    return {
      key: item._key,
      kind: "image",
      src: imageUrl,
      alt: item.imageAlt?.trim() || item.caption?.trim() || "Cannes 2026 moment",
      position,
      // The Cannes wall prioritizes the whole frame by default so faces,
      // full outfits and group compositions are not cropped. Editors can
      // explicitly switch an item to `cover` in Sanity when edge-to-edge
      // framing is more important.
      fit: requestedFit || "contain",
    };
  }

  return null;
}

function buildGalleryRows(media: readonly GalleryMedia[]) {
  const first = media.filter((_, index) => index % 2 === 0);
  const second = media.filter((_, index) => index % 2 === 1);

  const ensureRow = (row: GalleryMedia[], fallback: GalleryMedia[]) => {
    const source = row.length > 0 ? row : fallback;
    const expanded = [...source];

    while (expanded.length < 4 && source.length > 0) {
      expanded.push(source[expanded.length % source.length]);
    }

    if (expanded.length === 0) return [];

    return [expanded[expanded.length - 1], ...expanded, expanded[0]];
  };

  const firstRow = ensureRow(first, [...media]);
  const secondRow = ensureRow(second, first.length > 0 ? first : [...media]);

  return [firstRow, secondRow] as const;
}

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
   MEDIA CARD
   ============================================================ */

function GalleryVideo({
  media,
  active,
  loadMedia,
  reducedMotion,
  decorative,
}: {
  media: GalleryMedia;
  active: boolean;
  loadMedia: boolean;
  reducedMotion: boolean;
  decorative: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoInView = useInView(videoRef, { margin: "160px 0px 160px 0px" });
  const shouldAutoplay = loadMedia && active && videoInView && !reducedMotion;

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !loadMedia) return;

    if (shouldAutoplay) {
      void video.play().catch(() => {
        // Muted autoplay is allowed by modern browsers, but playback can
        // still be blocked by user/browser policy. Failing silently keeps
        // the media wall stable and the first frame visible.
      });
    } else {
      video.pause();
    }
  }, [loadMedia, shouldAutoplay]);

  return (
    <video
      ref={videoRef}
      src={loadMedia ? media.src : undefined}
      poster={media.poster}
      className={styles.video}
      style={{
        objectPosition: media.position ?? "center",
        objectFit: media.fit ?? "contain",
      }}
      autoPlay={shouldAutoplay}
      muted
      loop
      playsInline
      preload={loadMedia ? "metadata" : "none"}
      controls={reducedMotion && !decorative}
      aria-hidden={decorative ? true : undefined}
      aria-label={decorative ? undefined : media.alt}
      tabIndex={reducedMotion && !decorative ? 0 : -1}
      disablePictureInPicture
    />
  );
}

function GalleryCard({
  media,
  decorative = false,
  loadMedia,
  active,
  reducedMotion,
}: {
  media: GalleryMedia;
  decorative?: boolean;
  loadMedia: boolean;
  active: boolean;
  reducedMotion: boolean;
}) {
  return (
    <figure className={styles.card} aria-hidden={decorative ? true : undefined}>
      {media.kind === "video" ? (
        <GalleryVideo
          media={media}
          active={active}
          loadMedia={loadMedia}
          reducedMotion={reducedMotion}
          decorative={decorative}
        />
      ) : (
        <Image
          src={media.src}
          alt={decorative ? "" : media.alt}
          fill
          loading={loadMedia ? "eager" : "lazy"}
          decoding="async"
          draggable={false}
          sizes="
            (max-width: 639px) 84vw,
            (max-width: 1023px) 64vw,
            38vw
          "
          className={styles.image}
          style={{
            objectPosition: media.position ?? "center",
            objectFit: media.fit ?? "cover",
          }}
        />
      )}
    </figure>
  );
}

/* ============================================================
   GALLERY ROW
   ============================================================ */

function GalleryRow({
  media,
  x,
  decorative,
  loadMedia,
  active,
  reducedMotion,
}: {
  media: readonly GalleryMedia[];
  x: MotionValue<number>;
  decorative: boolean;
  loadMedia: boolean;
  active: boolean;
  reducedMotion: boolean;
}) {
  return (
    <div className={styles.row} aria-hidden={decorative ? true : undefined}>
      <motion.div
        data-cannes-row-track
        className={styles.track}
        style={{ x }}
      >
        {media.map((item, index) => (
          <GalleryCard
            key={`${item.key}-${index}`}
            media={item}
            decorative={
              decorative || index === 0 || index === media.length - 1
            }
            loadMedia={loadMedia}
            active={active}
            reducedMotion={reducedMotion}
          />
        ))}
      </motion.div>
    </div>
  );
}

/* ============================================================
   CANNES SECTION
   ============================================================ */

export function CannesSection({ content }: CannesSectionProps) {
  const sceneRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  const reduceMotion = useReducedMotion() === true;

  const cmsMedia =
    content?.media
      ?.map(toGalleryMedia)
      .filter((item): item is GalleryMedia => item !== null) ?? [];

  const galleryMedia =
    cmsMedia.length > 0 ? cmsMedia : [...FALLBACK_CANNES_MEDIA];

  const galleryRows = buildGalleryRows(galleryMedia);

  const heading = content?.heading?.trim() || DEFAULT_HEADING;
  const description = content?.description?.trim() || DEFAULT_DESCRIPTION;
  const ctaLabel = content?.cta?.label?.trim() || DEFAULT_CTA.label;
  const ctaHref = content?.cta?.href?.trim() || DEFAULT_CTA.href;

  const [geometry, setGeometry] = useState(
    INITIAL_GEOMETRY,
  );

  /*
   * Load the gallery shortly before the user reaches it.
   * Photos and videos are loaded shortly before the section reaches the viewport.
   */
  const loadMedia = useInView(sceneRef, {
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
        "[data-cannes-row-track]",
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
          {heading}
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
          {description}
        </motion.p>

        <Link
          href={ctaHref}
          className={`
            ${inter.className}
            ${styles.cta}
          `}
        >
          <span>{ctaLabel}</span>

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
        id="cannes-gallery"
        className={styles.scene}
        data-reduced={reduceMotion}
        data-active={sceneVisible && !reduceMotion}
        role="group"
        aria-label="Cannes 2026 photo and video gallery"
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

             Unique Cannes media items from Sanity or the local fallback set.
             ================================================= */

          <div
            className={styles.reducedViewport}
            tabIndex={0}
          >
            <div className={styles.reducedGrid}>
              {galleryMedia.map((item) => (
                <GalleryCard
                  key={item.key}
                  media={item}
                  loadMedia={loadMedia}
                  active={sceneVisible}
                  reducedMotion={reduceMotion}
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
                media={galleryRows[0]}
                x={topX}
                decorative={false}
                loadMedia={loadMedia}
                active={sceneVisible}
                reducedMotion={reduceMotion}
              />

              {/* ROW 2 — MOVES RIGHT */}

              <GalleryRow
                media={galleryRows[1]}
                x={bottomX}
                decorative
                loadMedia={loadMedia}
                active={sceneVisible}
                reducedMotion={reduceMotion}
              />
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}