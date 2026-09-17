"use client";

import Image from "@/components/ui/image";
import Link from "next/link";

import {
  inter,
  plusJakartaSans,
} from "@/lib/fonts";

import type {
  CmsCannesMediaItem,
  CmsCannesSection,
} from "@/types/cms";

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

  /*
   * Edge continuation card.
   *
   * Used only to visually continue the first row before
   * its first real item.
   *
   * It is not treated as another accessible gallery item.
   */
  decorativeClone?: boolean;
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
   ============================================================ */

const FOCUS_MEDIA_PATH =
  "/cannes/cannes-red-carpet-interview.mp4";

/* ============================================================
   TOP ROW
   ============================================================ */

const FALLBACK_CANNES_TOP_ROW:
  readonly GalleryMedia[] = [
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

/* ============================================================
   BOTTOM ROW
   ============================================================ */

const FALLBACK_CANNES_BOTTOM_ROW:
  readonly GalleryMedia[] = [
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

/* ============================================================
   COMBINED FALLBACK

   Only used by reduced-motion/static gallery.
   No decorative clones are included here.
   ============================================================ */

const FALLBACK_CANNES_MEDIA:
  readonly GalleryMedia[] = [
    ...FALLBACK_CANNES_TOP_ROW,
    ...FALLBACK_CANNES_BOTTOM_ROW,
  ];

/* ============================================================
   ROW EXPANSION

   prependWrapItem:
   false = normal row
   true  = add LAST item before FIRST item

   This creates:

   LAST CLONE | FIRST | SECOND | THIRD | ...

   The leading clone prevents black/empty space from appearing
   before the first top-row video.
   ============================================================ */

function expandGalleryRow(
  row: readonly GalleryMedia[],
  prependWrapItem = false,
): GalleryMedia[] {
  if (row.length === 0) {
    return [];
  }

  /*
   * Start with all real items in their exact original order.
   */
  const expanded: GalleryMedia[] = [
    ...row,
  ];

  /*
   * Keep at least six cards.
   */
  while (
    expanded.length < 6
  ) {
    expanded.push(
      row[
      expanded.length %
      row.length
      ],
    );
  }

  /*
   * Keep the existing continuation buffer
   * after the row.
   *
   * These help prevent an empty edge near the
   * opposite end of the animation.
   */
  const bufferStart =
    expanded.length;

  for (
    let index = 0;
    index < 2;
    index += 1
  ) {
    expanded.push(
      row[
      (bufferStart + index) %
      row.length
      ],
    );
  }

  /*
   * Only row 1 uses this.
   *
   * Put the final REAL item immediately before
   * the first real item.
   */
  if (
    prependWrapItem
  ) {
    const lastItem =
      row[row.length - 1];

    const leadingClone:
      GalleryMedia = {
      ...lastItem,

      /*
       * Unique key prevents the actual last card from
       * being treated as the same React element.
       */
      key:
        `${lastItem.key}__leading-wrap`,

      decorativeClone:
        true,
    };

    return [
      leadingClone,
      ...expanded,
    ];
  }

  return expanded;
}

/* ============================================================
   FOCUS MEDIA HELPERS
   ============================================================ */

function isFocusMedia(
  media: GalleryMedia,
) {
  return media.src
    .split("?")[0]
    .endsWith(
      FOCUS_MEDIA_PATH,
    );
}

function applyFocusCrop(
  media: GalleryMedia,
): GalleryMedia {
  if (
    !isFocusMedia(media)
  ) {
    return media;
  }

  return {
    ...media,

    cropScale:
      media.cropScale ??
      1.95,

    cropOrigin:
      media.cropOrigin ??
      "43% 27%",
  };
}

function prioritizeFocusMedia(
  media:
    readonly GalleryMedia[],
): GalleryMedia[] {
  const focusIndex =
    media.findIndex(
      isFocusMedia,
    );

  if (
    focusIndex <= 0
  ) {
    return [
      ...media,
    ];
  }

  return [
    media[focusIndex],

    ...media.slice(
      0,
      focusIndex,
    ),

    ...media.slice(
      focusIndex + 1,
    ),
  ];
}

/* ============================================================
   SANITY MEDIA
   ============================================================ */

function toGalleryMedia(
  item:
    CmsCannesMediaItem,
): GalleryMedia | null {
  const videoUrl =
    item.videoUrl?.trim();

  const imageUrl =
    item.imageUrl?.trim();

  const hotspotPosition =
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
      : undefined;

  const position =
    item.objectPosition?.trim() ||
    hotspotPosition;

  /* ----------------------------------------------------------
     VIDEO
     ---------------------------------------------------------- */

  if (
    (
      item.mediaType ===
      "video" ||
      (
        !item.mediaType &&
        videoUrl
      )
    ) &&
    videoUrl
  ) {
    return applyFocusCrop({
      key:
        item._key,

      kind:
        "video",

      src:
        videoUrl,

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

  /* ----------------------------------------------------------
     IMAGE
     ---------------------------------------------------------- */

  if (
    imageUrl
  ) {
    return applyFocusCrop({
      key:
        item._key,

      kind:
        "image",

      src:
        imageUrl,

      alt:
        item.imageAlt?.trim() ||
        item.caption?.trim() ||
        "Cannes 2026 moment",

      position,
    });
  }

  return null;
}

/* ============================================================
   BUILD ROWS

   Row 1:
   LAST clone | FIRST | SECOND | ...

   Row 2:
   unchanged
   ============================================================ */

function buildGalleryRows(
  media:
    readonly GalleryMedia[],
) {
  if (
    media.length === 0
  ) {
    return [
      [],
      [],
    ] as const;
  }

  /*
   * Preserve editor order.
   */
  const splitIndex =
    Math.ceil(
      media.length / 2,
    );

  const firstRow =
    media.slice(
      0,
      splitIndex,
    );

  const secondRow =
    media.slice(
      splitIndex,
    );

  return [
    /*
     * TOP ROW
     *
     * Leading wrap enabled.
     */
    expandGalleryRow(
      firstRow,
      true,
    ),

    /*
     * BOTTOM ROW
     *
     * Existing behaviour.
     */
    expandGalleryRow(
      secondRow.length > 0
        ? secondRow
        : firstRow,
      false,
    ),
  ] as const;
}

/* ============================================================
   MOTION
   ============================================================ */

const EASE:
  [
    number,
    number,
    number,
    number,
  ] = [
    0.22,
    1,
    0.36,
    1,
  ];

/* ============================================================
   INITIAL GEOMETRY

   ANIMATION VALUES UNCHANGED
   ============================================================ */

const INITIAL_GEOMETRY:
  GalleryGeometry = {
  height:
    0,

  topTravel:
    0,

  bottomTravel:
    0,

  initialScale:
    1.45,

  endFraction:
    1.35 / 2.35,

  topStartOffset:
    0,
};

function clamp01(
  value: number,
) {
  return Math.min(
    1,
    Math.max(
      0,
      value,
    ),
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
   VIDEO
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
  const videoRef =
    useRef<HTMLVideoElement>(
      null,
    );

  const videoInView =
    useInView(
      videoRef,
      {
        margin:
          "160px 0px 160px 0px",
      },
    );

  /*
   * Decorative leading/repeated videos do not autoplay.
   */
  const shouldAutoplay =
    loadMedia &&
    active &&
    videoInView &&
    !reducedMotion &&
    !decorative;

  useEffect(() => {
    const video =
      videoRef.current;

    if (
      !video ||
      !loadMedia
    ) {
      return;
    }

    if (
      shouldAutoplay
    ) {
      void video
        .play()
        .catch(() => {
          /*
           * Browser autoplay policy
           * may reject playback.
           */
        });
    } else {
      video.pause();
    }
  }, [
    loadMedia,
    shouldAutoplay,
  ]);

  return (
    <video
      ref={videoRef}
      src={
        loadMedia
          ? media.src
          : undefined
      }
      poster={
        media.poster
      }
      className={
        styles.video
      }
      style={{
        objectPosition:
          media.position ??
          "center",

        objectFit:
          "cover",

        transform:
          media.cropScale
            ? `scale(${media.cropScale})`
            : undefined,

        transformOrigin:
          media.cropOrigin ??
          "center",
      }}
      autoPlay={
        shouldAutoplay
      }
      muted
      loop
      playsInline
      preload={
        loadMedia
          ? "metadata"
          : "none"
      }
      controls={
        reducedMotion &&
        !decorative
      }
      aria-hidden={
        decorative
          ? true
          : undefined
      }
      aria-label={
        decorative
          ? undefined
          : media.alt
      }
      tabIndex={
        reducedMotion &&
          !decorative
          ? 0
          : -1
      }
      disablePictureInPicture
    />
  );
}

/* ============================================================
   MEDIA CARD
   ============================================================ */

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
  const isDecorative =
    decorative ||
    media.decorativeClone ===
    true;

  return (
    <figure
      className={
        styles.card
      }

      /*
       * Used by the measurement system so we can subtract
       * this extra visual buffer from animation geometry.
       */
      data-cannes-leading-clone={
        media.decorativeClone
          ? "true"
          : undefined
      }

      aria-hidden={
        isDecorative
          ? true
          : undefined
      }
    >
      {media.kind ===
        "video" ? (
        <GalleryVideo
          media={media}
          active={active}
          loadMedia={
            loadMedia
          }
          reducedMotion={
            reducedMotion
          }
          decorative={
            isDecorative
          }
        />
      ) : (
        <Image
          src={
            media.src
          }
          alt={
            isDecorative
              ? ""
              : media.alt
          }
          fill
          loading="lazy"
          decoding="async"
          draggable={false}
          sizes="
            (max-width: 639px) 84vw,
            (max-width: 1023px) 64vw,
            38vw
          "
          className={
            styles.image
          }
          style={{
            objectPosition:
              media.position ??
              "center",

            objectFit:
              "cover",

            transform:
              media.cropScale
                ? `scale(${media.cropScale})`
                : undefined,

            transformOrigin:
              media.cropOrigin ??
              "center",
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
  media:
  readonly GalleryMedia[];

  x:
  MotionValue<number>;

  decorative:
  boolean;

  loadMedia:
  boolean;

  active:
  boolean;

  reducedMotion:
  boolean;
}) {
  return (
    <div
      className={
        styles.row
      }
      aria-hidden={
        decorative
          ? true
          : undefined
      }
    >
      <motion.div
        data-cannes-row-track
        className={
          styles.track
        }
        style={{
          x,
        }}
      >
        {media.map(
          (
            item,
            index,
          ) => {
            /*
             * Appended duplicate items remain decorative.
             *
             * The leading wrap item is also decorative,
             * but has its own unique key.
             */
            const repeated =
              media
                .slice(
                  0,
                  index,
                )
                .some(
                  (
                    previous,
                  ) =>
                    previous.key ===
                    item.key,
                );

            return (
              <GalleryCard
                key={`${item.key}-${index}`}
                media={item}
                decorative={
                  decorative ||
                  item.decorativeClone ===
                  true ||
                  repeated
                }
                loadMedia={
                  loadMedia
                }
                active={
                  active
                }
                reducedMotion={
                  reducedMotion
                }
              />
            );
          },
        )}
      </motion.div>
    </div>
  );
}

/* ============================================================
   CANNES SECTION
   ============================================================ */

export function CannesSection({
  content,
}: CannesSectionProps) {
  const sceneRef =
    useRef<HTMLDivElement>(
      null,
    );

  const stageRef =
    useRef<HTMLDivElement>(
      null,
    );

  const reduceMotion =
    useReducedMotion() ===
    true;

  /* ==========================================================
     CMS MEDIA
     ========================================================== */

  const cmsMedia =
    content?.media
      ?.map(
        toGalleryMedia,
      )
      .filter(
        (
          item,
        ): item is GalleryMedia =>
          item !== null,
      ) ?? [];

  /*
   * Keep focus media first.
   */
  const orderedCmsMedia =
    prioritizeFocusMedia(
      cmsMedia,
    );

  const usingCmsMedia =
    orderedCmsMedia.length >
    0;

  /*
   * Static gallery:
   *
   * no leading clone.
   */
  const galleryMedia =
    usingCmsMedia
      ? orderedCmsMedia
      : [
        ...FALLBACK_CANNES_MEDIA,
      ];

  /* ==========================================================
     ANIMATED ROWS

     IMPORTANT:

     Only TOP row receives leading continuation card.
     ========================================================== */

  const galleryRows =
    usingCmsMedia
      ? buildGalleryRows(
        orderedCmsMedia,
      )
      : [
        /*
         * TOP ROW
         *
         * Last photo appears before first video.
         */
        expandGalleryRow(
          FALLBACK_CANNES_TOP_ROW,
          true,
        ),

        /*
         * BOTTOM ROW
         *
         * Completely unchanged.
         */
        expandGalleryRow(
          FALLBACK_CANNES_BOTTOM_ROW,
          false,
        ),
      ] as const;

  /* ==========================================================
     CONTENT
     ========================================================== */

  const heading =
    content?.heading?.trim() ||
    DEFAULT_HEADING;

  const description =
    content?.description?.trim() ||
    DEFAULT_DESCRIPTION;

  const ctaLabel =
    content?.cta?.label?.trim() ||
    DEFAULT_CTA.label;

  const ctaHref =
    content?.cta?.href?.trim() ||
    DEFAULT_CTA.href;

  /* ==========================================================
     GEOMETRY
     ========================================================== */

  const [
    geometry,
    setGeometry,
  ] =
    useState(
      INITIAL_GEOMETRY,
    );

  /* ==========================================================
     MEDIA LOADING
     ========================================================== */

  const loadMedia =
    useInView(
      sceneRef,
      {
        once:
          true,

        margin:
          "700px 0px 700px 0px",
      },
    );

  const sceneVisible =
    useInView(
      sceneRef,
      {
        margin:
          "100px 0px 100px 0px",
      },
    );

  /* ==========================================================
     RESPONSIVE MEASUREMENTS

     IMPORTANT:

     The top row now contains one extra visual card before
     the real first card.

     That extra card is SUBTRACTED from all animation
     measurements.

     Therefore:

     - starting first-video position stays the same
     - scale stays the same
     - travel distance stays the same
     - animation duration stays the same
     - scroll timing stays the same
     ========================================================== */

  useEffect(() => {
    if (
      reduceMotion
    ) {
      return;
    }

    const stage =
      stageRef.current;

    const tracks =
      stage
        ? Array.from(
          stage.querySelectorAll<HTMLElement>(
            "[data-cannes-row-track]",
          ),
        )
        : [];

    const firstTrack =
      tracks[0];

    const card =
      firstTrack
        ?.firstElementChild;

    if (
      !stage ||
      !firstTrack ||
      !(
        card instanceof
        HTMLElement
      )
    ) {
      return;
    }

    let frame:
      number | null =
      null;

    let disposed =
      false;

    const measure =
      () => {
        frame =
          null;

        if (
          disposed
        ) {
          return;
        }

        /* ------------------------------------------------------
           STAGE DIMENSIONS
           ------------------------------------------------------ */

        const width =
          stage.clientWidth;

        const height =
          stage.clientHeight;

        if (
          !width ||
          !height
        ) {
          return;
        }

        /* ------------------------------------------------------
           CARD / GAP
           ------------------------------------------------------ */

        const gap =
          Number.parseFloat(
            getComputedStyle(
              firstTrack,
            ).columnGap,
          ) || 0;

        const cardStep =
          card.offsetWidth +
          gap;

        const compact =
          width < 1024;

        /* ------------------------------------------------------
           LEADING CONTINUATION CARD

           This card visually exists before the first video,
           but must NOT alter animation geometry.
           ------------------------------------------------------ */

        const hasLeadingClone =
          card.dataset
            .cannesLeadingClone ===
          "true";

        const leadingBuffer =
          hasLeadingClone
            ? cardStep
            : 0;

        /* ------------------------------------------------------
           OPENING WIDTH

           UNCHANGED
           ------------------------------------------------------ */

        const openingWidth =
          width >= 1024
            ? card.offsetWidth *
            2 +
            gap
            : card.offsetWidth;

        /* ------------------------------------------------------
           TOP START OFFSET

           The extra leading card increases scrollWidth by
           exactly one cardStep.

           Subtracting one cardStep here keeps the ORIGINAL
           first video in the same visual position.
           ------------------------------------------------------ */

        const topStartOffset =
          Math.max(
            0,

            (
              firstTrack.scrollWidth -
              openingWidth
            ) /
            2 -
            leadingBuffer,
          );

        /* ------------------------------------------------------
           SCALE

           EXACT EXISTING ANIMATION
           ------------------------------------------------------ */

        const twoCardWidth =
          card.offsetWidth *
          2 +
          gap;

        const desktopPairScale =
          twoCardWidth > 0
            ? (
              width *
              0.92
            ) /
            twoCardWidth
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

        /* ------------------------------------------------------
           TRACKS
           ------------------------------------------------------ */

        const topTrack =
          tracks[0];

        const bottomTrack =
          tracks[1] ??
          topTrack;

        /*
         * Ignore the extra leading clone when calculating
         * top-row available travel.
         *
         * This keeps the existing top animation unchanged.
         */
        const effectiveTopTrackWidth =
          Math.max(
            0,

            topTrack.scrollWidth -
            leadingBuffer,
          );

        const topAvailable =
          Math.max(
            0,

            (
              effectiveTopTrackWidth -
              width
            ) /
            2 -
            16,
          );

        /*
         * Bottom row unchanged.
         */
        const bottomAvailable =
          Math.max(
            0,

            (
              bottomTrack.scrollWidth -
              width
            ) /
            2 -
            16,
          );

        /* ------------------------------------------------------
           ROW TRAVEL

           EXACT EXISTING VALUES
           ------------------------------------------------------ */

        const topTravel =
          Math.min(
            cardStep *
            (
              compact
                ? 1.1
                : 1.75
            ),

            topAvailable,
          );

        const bottomTravel =
          Math.min(
            cardStep *
            (
              compact
                ? 1.0
                : 1.5
            ),

            bottomAvailable,
          );

        /* ------------------------------------------------------
           SCROLL DISTANCE

           EXACT EXISTING VALUES
           ------------------------------------------------------ */

        const scrollDistance =
          Math.round(
            height *
            (
              compact
                ? 1.1
                : 1.35
            ),
          );

        const totalHeight =
          height +
          scrollDistance;

        /* ------------------------------------------------------
           NEXT GEOMETRY
           ------------------------------------------------------ */

        const next:
          GalleryGeometry = {
          height:
            totalHeight,

          topTravel,

          bottomTravel,

          initialScale,

          endFraction:
            scrollDistance /
            totalHeight,

          topStartOffset,
        };

        /* ------------------------------------------------------
           AVOID UNNECESSARY STATE UPDATES
           ------------------------------------------------------ */

        setGeometry(
          (
            current,
          ) =>
            Math.abs(
              current.height -
              next.height,
            ) <
              0.5 &&
              Math.abs(
                current.topTravel -
                next.topTravel,
              ) <
              0.5 &&
              Math.abs(
                current.bottomTravel -
                next.bottomTravel,
              ) <
              0.5 &&
              Math.abs(
                current.initialScale -
                next.initialScale,
              ) <
              0.0001 &&
              Math.abs(
                current.endFraction -
                next.endFraction,
              ) <
              0.0001 &&
              Math.abs(
                current.topStartOffset -
                next.topStartOffset,
              ) <
              0.5
              ? current
              : next,
        );
      };

    /* ========================================================
       SCHEDULE MEASUREMENT
       ======================================================== */

    const scheduleMeasure =
      () => {
        if (
          !disposed &&
          frame === null
        ) {
          frame =
            requestAnimationFrame(
              measure,
            );
        }
      };

    scheduleMeasure();

    /* ========================================================
       RESIZE OBSERVER
       ======================================================== */

    const observer =
      new ResizeObserver(
        scheduleMeasure,
      );

    observer.observe(
      stage,
    );

    tracks.forEach(
      (
        track,
      ) => {
        observer.observe(
          track,
        );

        const firstCard =
          track.firstElementChild;

        if (
          firstCard instanceof
          HTMLElement
        ) {
          observer.observe(
            firstCard,
          );
        }
      },
    );

    /* ========================================================
       WINDOW RESIZE
       ======================================================== */

    window.addEventListener(
      "resize",
      scheduleMeasure,
      {
        passive:
          true,
      },
    );

    window.visualViewport?.addEventListener(
      "resize",
      scheduleMeasure,
      {
        passive:
          true,
      },
    );

    /* ========================================================
       CLEANUP
       ======================================================== */

    return () => {
      disposed =
        true;

      if (
        frame !== null
      ) {
        cancelAnimationFrame(
          frame,
        );
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

    galleryRows[0]
      .length,

    galleryRows[1]
      .length,
  ]);

  /* ==========================================================
     SCROLL PROGRESS

     UNCHANGED
     ========================================================== */

  const {
    scrollYProgress,
  } =
    useScroll({
      target:
        sceneRef,

      offset: [
        "start start",
        "end start",
      ],
    });

  const progress =
    useTransform(
      scrollYProgress,

      (
        value,
      ) =>
        clamp01(
          value /
          Math.max(
            geometry.endFraction,
            0.001,
          ),
        ),
    );

  /* ==========================================================
     WALL SCALE

     UNCHANGED
     ========================================================== */

  const scale =
    useTransform(
      progress,

      (
        value,
      ) =>
        geometry.initialScale +
        (
          1 -
          geometry.initialScale
        ) *
        value,
    );

  /* ==========================================================
     TOP ROW

     UNCHANGED ANIMATION
     ========================================================== */

  const topX =
    useTransform(
      progress,

      (
        value,
      ) => {
        const eased =
          value *
          value *
          (
            3 -
            2 *
            value
          );

        return (
          geometry.topStartOffset *
          (
            1 -
            eased
          ) -
          geometry.topTravel *
          eased
        );
      },
    );

  /* ==========================================================
     BOTTOM ROW

     COMPLETELY UNCHANGED
     ========================================================== */

  const bottomX =
    useTransform(
      progress,

      (
        value,
      ) => {
        const eased =
          value *
          value *
          (
            3 -
            2 *
            value
          );

        return (
          geometry.bottomTravel *
          eased
        );
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
          TEXT / CTA
          ===================================================== */}

      <div
        className={
          styles.content
        }
      >
        <div
          className={
            styles.textBlock
          }
        >
          {/* =================================================
              HEADING
              ================================================= */}

          <motion.h2
            id="abhijat-marathi-cannes-heading"
            className={
              styles.heading
            }
            initial={
              reduceMotion
                ? false
                : {
                  opacity:
                    0,

                  y:
                    22,
                }
            }
            whileInView={{
              opacity:
                1,

              y:
                0,
            }}
            viewport={{
              once:
                true,

              amount:
                0.15,
            }}
            transition={{
              duration:
                reduceMotion
                  ? 0
                  : 0.7,

              ease:
                EASE,
            }}
          >
            {heading}
          </motion.h2>

          {/* =================================================
              DESCRIPTION
              ================================================= */}

          <motion.p
            className={
              styles.description
            }
            initial={
              reduceMotion
                ? false
                : {
                  opacity:
                    0,

                  y:
                    18,
                }
            }
            whileInView={{
              opacity:
                1,

              y:
                0,
            }}
            viewport={{
              once:
                true,

              amount:
                0.15,
            }}
            transition={{
              duration:
                reduceMotion
                  ? 0
                  : 0.65,

              ease:
                EASE,
            }}
          >
            {description}
          </motion.p>

          {/* =================================================
              CTA
              ================================================= */}

          <Link
            href={
              ctaHref
            }
            className={`
              ${inter.className}
              ${styles.cta}
            `}
          >
            <span>
              {ctaLabel}
            </span>

            <span
              className={
                styles.ctaArrow
              }
            >
              <CaretRightIcon />
            </span>
          </Link>
        </div>
      </div>

      {/* =====================================================
          TWO-ROW SCROLL SCENE
          ===================================================== */}

      <div
        ref={
          sceneRef
        }
        id="cannes-gallery"
        className={
          styles.scene
        }
        data-reduced={
          reduceMotion
        }
        data-active={
          sceneVisible &&
          !reduceMotion
        }
        role="group"
        aria-label="Cannes 2026 photo and video gallery"
        style={{
          height:
            reduceMotion
              ? undefined
              : geometry.height ||
              undefined,
        }}
      >
        {reduceMotion ? (
          /* =================================================
             ACCESSIBLE STATIC FALLBACK

             No decorative clones here.
             ================================================= */

          <div
            className={
              styles.reducedViewport
            }
            tabIndex={
              0
            }
          >
            <div
              className={
                styles.reducedGrid
              }
            >
              {galleryMedia.map(
                (
                  item,
                ) => (
                  <GalleryCard
                    key={
                      item.key
                    }
                    media={
                      item
                    }
                    loadMedia={
                      loadMedia
                    }
                    active={
                      sceneVisible
                    }
                    reducedMotion={
                      reduceMotion
                    }
                  />
                ),
              )}
            </div>
          </div>
        ) : (
          /* =================================================
             PINNED ZOOM-OUT GALLERY
             ================================================= */

          <div
            ref={
              stageRef
            }
            className={
              styles.stage
            }
          >
            <motion.div
              className={
                styles.wall
              }
              style={{
                scale,
              }}
            >
              {/* =============================================
                  TOP ROW

                  Visual order begins:

                  LAST CLONE
                  FIRST VIDEO
                  SECOND
                  THIRD
                  ...

                  Motion itself is unchanged.
                  ============================================= */}

              <GalleryRow
                media={
                  galleryRows[0]
                }
                x={
                  topX
                }
                decorative={
                  false
                }
                loadMedia={
                  loadMedia
                }
                active={
                  sceneVisible
                }
                reducedMotion={
                  reduceMotion
                }
              />

              {/* =============================================
                  BOTTOM ROW

                  Entirely unchanged.
                  ============================================= */}

              <GalleryRow
                media={
                  galleryRows[1]
                }
                x={
                  bottomX
                }
                decorative={
                  false
                }
                loadMedia={
                  loadMedia
                }
                active={
                  sceneVisible
                }
                reducedMotion={
                  reduceMotion
                }
              />
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}