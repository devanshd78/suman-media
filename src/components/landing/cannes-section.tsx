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
  cropScale?: number;
  cropOrigin?: string;
};

type GalleryGeometry = {
  height: number;
  topTravel: number;
  bottomTravel: number;
  initialScale: number;
  endFraction: number;
  topStartOffset: number;
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

/* ============================================================
   CANNES FALLBACK MEDIA

   ORDER:
   1. Top row — left to right
   2. Bottom row — left to right

   Do NOT use even/odd splitting.
   ============================================================ */

const FOCUS_MEDIA_PATH =
  "/cannes/cannes-red-carpet-interview.mp4";

/*
 * The local fallback is curated to landscape media only.
 * Portrait assets are intentionally not placed into this wall because the
 * Cannes cards are cinematic landscape frames and aggressive portrait crops
 * were the source of the empty/letterboxed-looking cards.
 *
 * The focus video itself is a 16:9 file with decorative side panels baked
 * into the source. A card-level cropScale removes those baked panels without
 * changing or re-encoding the original public asset.
 */
const FALLBACK_CANNES_TOP_ROW: readonly GalleryMedia[] = [
  {
    key: "cannes-red-carpet-interview",
    kind: "video",
    src: FOCUS_MEDIA_PATH,
    alt: "Red carpet interview moment at Cannes",
    position: "center center",
    cropScale: 1.95,
    cropOrigin: "43% 27%",
  },
  {
    key: "cannes-red-carpet-group-01",
    kind: "image",
    src: "/cannes/cannes-red-carpet-group-01.jpg",
    alt: "Guests representing Indian culture on the Cannes red carpet",
    position: "center 44%",
  },
  {
    key: "cannes-pavilion-guests-02",
    kind: "image",
    src: "/cannes/cannes-pavilion-guests-02.jpg",
    alt: "Guests meeting at the Cannes pavilion",
    position: "center 42%",
  },
  {
    key: "cannes-interview-group",
    kind: "video",
    src: "/cannes/cannes-interview-group.mp4",
    alt: "Cannes festival interview with guests",
    position: "center center",
  },
  {
    key: "cannes-red-carpet-group-02",
    kind: "image",
    src: "/cannes/cannes-red-carpet-group-02.jpg",
    alt: "Festival guests posing together on the Cannes red carpet",
    position: "center 42%",
  },
  {
    key: "cannes-pavilion-guests-01",
    kind: "image",
    src: "/cannes/cannes-pavilion-guests-01.jpg",
    alt: "Guests gathering at the Cannes pavilion",
    position: "center 38%",
  },
];

const FALLBACK_CANNES_BOTTOM_ROW: readonly GalleryMedia[] = [
  {
    key: "cannes-interview-group-short",
    kind: "video",
    src: "/cannes/cannes-interview-group-short.mp4",
    alt: "Cannes interview moment at the Bharat Pavilion",
    position: "center center",
  },
  {
    key: "cannes-riviera-portrait-01",
    kind: "image",
    src: "/cannes/cannes-riviera-portrait-01.jpg",
    alt: "Festival portrait overlooking the Cannes waterfront",
    position: "center 42%",
  },
  {
    key: "cannes-interview-indoor",
    kind: "video",
    src: "/cannes/cannes-interview-indoor.mp4",
    alt: "Cannes interview and pavilion moment",
    position: "center center",
  },
  {
    key: "cannes-red-carpet-blue-look-01",
    kind: "image",
    src: "/cannes/cannes-red-carpet-blue-look-01.jpg",
    alt: "Traditional blue look presented on the Cannes red carpet",
    position: "center 48%",
  },
  {
    key: "cannes-red-carpet-blue-look-02",
    kind: "image",
    src: "/cannes/cannes-red-carpet-blue-look-02.jpg",
    alt: "Traditional blue look on the Cannes red carpet",
    position: "center 48%",
  },
];

/* Combined fallback is used by the reduced-motion/static gallery. */
const FALLBACK_CANNES_MEDIA: readonly GalleryMedia[] = [
  ...FALLBACK_CANNES_TOP_ROW,
  ...FALLBACK_CANNES_BOTTOM_ROW,
];

/* ============================================================
   ROW HELPERS
   ============================================================ */

function expandGalleryRow(
  row: readonly GalleryMedia[],
): GalleryMedia[] {
  if (row.length === 0) {
    return [];
  }

  /*
   * IMPORTANT: never prepend a clone.
   * The first real media item must remain the first visible card.
   * If a short CMS row needs extra width, repeat items only at the end.
   */
  const expanded = [...row];

  while (expanded.length < 6) {
    expanded.push(
      row[expanded.length % row.length],
    );
  }

  return expanded;
}

function isFocusMedia(media: GalleryMedia) {
  return media.src.split("?")[0].endsWith(FOCUS_MEDIA_PATH);
}

function applyFocusCrop(media: GalleryMedia): GalleryMedia {
  if (!isFocusMedia(media)) {
    return media;
  }

  return {
    ...media,
    cropScale: media.cropScale ?? 1.95,
    cropOrigin: media.cropOrigin ?? "43% 27%",
  };
}

function prioritizeFocusMedia(
  media: readonly GalleryMedia[],
): GalleryMedia[] {
  const focusIndex = media.findIndex(isFocusMedia);

  if (focusIndex <= 0) {
    return [...media];
  }

  return [
    media[focusIndex],
    ...media.slice(0, focusIndex),
    ...media.slice(focusIndex + 1),
  ];
}

/* ============================================================
   SANITY ROW BUILDER

   Sanity still supplies one ordered media list.
   We preserve its order by putting the first half in row 1
   and the second half in row 2.

   OLD CODE:
   index % 2 === 0 / index % 2 === 1

   That code was changing the visible order.
   ============================================================ */


function toGalleryMedia(item: CmsCannesMediaItem): GalleryMedia | null {
  const videoUrl = item.videoUrl?.trim();
  const imageUrl = item.imageUrl?.trim();

  const hotspotPosition =
    typeof item.imageHotspotX === "number" &&
      typeof item.imageHotspotY === "number"
      ? `${Math.round(item.imageHotspotX * 100)}% ${Math.round(
        item.imageHotspotY * 100,
      )}%`
      : undefined;

  const position =
    item.objectPosition?.trim() ||
    hotspotPosition;

  /*
   * Cannes cards are intentionally edge-to-edge.
   * CMS `contain` is ignored here because it creates the black side bars
   * visible in the supplied screenshot.
   */
  if (
    (item.mediaType === "video" ||
      (!item.mediaType && videoUrl)) &&
    videoUrl
  ) {
    return applyFocusCrop({
      key: item._key,
      kind: "video",
      src: videoUrl,
      alt:
        item.videoLabel?.trim() ||
        item.caption?.trim() ||
        "Cannes 2026 video moment",
      poster:
        item.posterUrl?.trim() ||
        undefined,
      position,
    });
  }

  if (imageUrl) {
    return applyFocusCrop({
      key: item._key,
      kind: "image",
      src: imageUrl,
      alt:
        item.imageAlt?.trim() ||
        item.caption?.trim() ||
        "Cannes 2026 moment",
      position,
    });
  }

  return null;
}

function buildGalleryRows(media: readonly GalleryMedia[]) {
  if (media.length === 0) {
    return [[], []] as const;
  }

  // Preserve Sanity/editor order exactly:
  // first half = row 1, second half = row 2.
  const splitIndex = Math.ceil(media.length / 2);
  const firstRow = media.slice(0, splitIndex);
  const secondRow = media.slice(splitIndex);

  return [
    expandGalleryRow(firstRow),
    expandGalleryRow(secondRow.length > 0 ? secondRow : firstRow),
  ] as const;
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
  topTravel: 0,
  bottomTravel: 0,
  initialScale: 1.45,
  endFraction: 1.35 / 2.35,
  topStartOffset: 0,
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
  const videoInView = useInView(videoRef, {
    margin: "160px 0px 160px 0px",
  });

  const shouldAutoplay =
    loadMedia &&
    active &&
    videoInView &&
    !reducedMotion;

  useEffect(() => {
    const video = videoRef.current;

    if (!video || !loadMedia) {
      return;
    }

    if (shouldAutoplay) {
      void video.play().catch(() => {
        /* Browser autoplay policy can still reject playback. */
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
        objectFit: "cover",
        transform: media.cropScale
          ? `scale(${media.cropScale})`
          : undefined,
        transformOrigin: media.cropOrigin ?? "center",
      }}
      autoPlay={shouldAutoplay}
      muted
      loop
      playsInline
      preload={loadMedia ? "metadata" : "none"}
      controls={
        reducedMotion && !decorative
      }
      aria-hidden={
        decorative ? true : undefined
      }
      aria-label={
        decorative ? undefined : media.alt
      }
      tabIndex={
        reducedMotion && !decorative
          ? 0
          : -1
      }
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
    <figure
      className={styles.card}
      aria-hidden={
        decorative ? true : undefined
      }
    >
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
            objectFit: "cover",
            transform: media.cropScale
              ? `scale(${media.cropScale})`
              : undefined,
            transformOrigin: media.cropOrigin ?? "center",
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
    <div
      className={styles.row}
      aria-hidden={
        decorative ? true : undefined
      }
    >
      <motion.div
        data-cannes-row-track
        className={styles.track}
        style={{ x }}
      >
        {media.map((item, index) => {
          const repeated = media
            .slice(0, index)
            .some((previous) => previous.key === item.key);

          return (
            <GalleryCard
              key={`${item.key}-${index}`}
              media={item}
              decorative={decorative || repeated}
              loadMedia={loadMedia}
              active={active}
              reducedMotion={reducedMotion}
            />
          );
        })}
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
      .filter(
        (item): item is GalleryMedia =>
          item !== null,
      ) ?? [];

  const orderedCmsMedia = prioritizeFocusMedia(cmsMedia);

  const usingCmsMedia = orderedCmsMedia.length > 0;

  const galleryMedia = usingCmsMedia
    ? orderedCmsMedia
    : [...FALLBACK_CANNES_MEDIA];

  /*
   * Fallback rows are curated and stable: six landscape cards on top and
   * five unique landscape cards below, with the bottom row repeated only at
   * the end when needed to keep both tracks equally robust. No post-load
   * filtering is allowed to shrink a row and break the scroll geometry.
   * Sanity media preserves editor order.
   */
  const galleryRows = usingCmsMedia
    ? buildGalleryRows(orderedCmsMedia)
    : [
      expandGalleryRow(FALLBACK_CANNES_TOP_ROW),
      expandGalleryRow(FALLBACK_CANNES_BOTTOM_ROW),
    ] as const;

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

    const tracks = stage
      ? Array.from(
        stage.querySelectorAll<HTMLElement>(
          "[data-cannes-row-track]",
        ),
      )
      : [];

    const firstTrack = tracks[0];
    const card =
      firstTrack?.firstElementChild;

    if (
      !stage ||
      !firstTrack ||
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
          getComputedStyle(firstTrack).columnGap,
        ) || 0;

      const cardStep =
        card.offsetWidth + gap;

      const compact = width < 1024;

      /*
       * Restore the original Cannes interaction:
       * - the whole wall zooms from the centre
       * - the top row travels left
       * - the bottom row travels right
       *
       * Unlike the old implementation, the opening offset is calculated
       * so the first real item (the red-carpet interview) stays in the
       * opening composition instead of relying on a leading clone.
       */
      const openingWidth =
        width >= 1024
          ? card.offsetWidth * 2 + gap
          : card.offsetWidth;

      const topStartOffset = Math.max(
        0,
        (firstTrack.scrollWidth - openingWidth) / 2,
      );

      const twoCardWidth =
        card.offsetWidth * 2 + gap;

      const desktopPairScale =
        twoCardWidth > 0
          ? (width * 0.92) / twoCardWidth
          : 1.4;

      const initialScale =
        width < 640
          ? 1.12
          : compact
            ? 1.22
            : Math.min(
              1.5,
              Math.max(
                1.18,
                desktopPairScale,
              ),
            );

      /*
       * Measure each row independently. Using the shortest row as a shared
       * limit made the top interaction almost stop whenever that row lost an
       * item. Independent travel keeps both rows balanced and fully visible.
       */
      const topTrack = tracks[0];
      const bottomTrack = tracks[1] ?? topTrack;

      const topAvailable = Math.max(
        0,
        (topTrack.scrollWidth - width) / 2 - 16,
      );
      const bottomAvailable = Math.max(
        0,
        (bottomTrack.scrollWidth - width) / 2 - 16,
      );

      const topTravel = Math.min(
        cardStep * (compact ? 1.1 : 1.75),
        topAvailable,
      );
      const bottomTravel = Math.min(
        cardStep * (compact ? 1.0 : 1.5),
        bottomAvailable,
      );

      const scrollDistance = Math.round(
        height * (compact ? 1.1 : 1.35),
      );

      const totalHeight =
        height + scrollDistance;

      const next: GalleryGeometry = {
        height: totalHeight,
        topTravel,
        bottomTravel,
        initialScale,
        endFraction:
          scrollDistance / totalHeight,
        topStartOffset,
      };

      setGeometry((current) =>
        Math.abs(
          current.height - next.height,
        ) < 0.5 &&
          Math.abs(
            current.topTravel - next.topTravel,
          ) < 0.5 &&
          Math.abs(
            current.bottomTravel - next.bottomTravel,
          ) < 0.5 &&
          Math.abs(
            current.initialScale -
            next.initialScale,
          ) < 0.0001 &&
          Math.abs(
            current.endFraction -
            next.endFraction,
          ) < 0.0001 &&
          Math.abs(
            current.topStartOffset -
            next.topStartOffset,
          ) < 0.5
          ? current
          : next,
      );
    };

    const scheduleMeasure = () => {
      if (
        !disposed &&
        frame === null
      ) {
        frame = requestAnimationFrame(
          measure,
        );
      }
    };

    scheduleMeasure();

    const observer =
      new ResizeObserver(
        scheduleMeasure,
      );

    observer.observe(stage);

    tracks.forEach((track) => {
      observer.observe(track);

      const firstCard =
        track.firstElementChild;

      if (
        firstCard instanceof HTMLElement
      ) {
        observer.observe(firstCard);
      }
    });

    window.addEventListener(
      "resize",
      scheduleMeasure,
      { passive: true },
    );

    window.visualViewport?.addEventListener(
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

      window.visualViewport?.removeEventListener(
        "resize",
        scheduleMeasure,
      );
    };
  }, [
    reduceMotion,
    galleryRows[0].length,
    galleryRows[1].length,
  ]);

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
       two-card opening frame → full gallery wall
       measured pair scale → 1

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

     The top row opens on the first real media pair, then travels across the
     full row toward the left. The bottom row starts centred and moves right.
     Each row has its own measured travel distance, so a shorter row can never
     throttle the other row. The smoothstep curve keeps the opening calm and
     the reverse-scroll path perfectly deterministic.
     ========================================================== */

  const topX = useTransform(
    progress,
    (value) => {
      const eased = value * value * (3 - 2 * value);

      return (
        geometry.topStartOffset * (1 - eased) -
        geometry.topTravel * eased
      );
    },
  );

  const bottomX = useTransform(
    progress,
    (value) => {
      const eased = value * value * (3 - 2 * value);
      return geometry.bottomTravel * eased;
    },
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
        <div className={styles.textBlock}>
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
                decorative={false}
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