"use client";

import Image from "@/components/ui/image";
import Link from "next/link";

import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import type {
  CmsFeaturedService,
} from "@/types/cms";

import styles from "./services-scroll-gallery.module.css";

/* ============================================================
   TYPES
   ============================================================ */

type Props = {
  eyebrow?: string | null;
  heading?: string | null;
  services: CmsFeaturedService[];
};

type Item = {
  service: CmsFeaturedService;
  number: number;
};

type Geometry = {
  width: number;
  height: number;
  cardWidth: number;
  cardHeight: number;
  frontTop: number;
  step: number;
  perspective: number;
  spacing: number;
  stride: number;
  pinned: boolean;
};

/* ============================================================
   COLORS
   ============================================================ */

const COLORS = [
  "#FF6548",
  "#A747C6",
  "#FFD429",
  "#47E58C",
  "#176FC8",
  "#9DCE67",
  "#04A9BB",
  "#ED5B8D",
];

/* ============================================================
   INITIAL GEOMETRY
   ============================================================ */

const INITIAL: Geometry = {
  width: 0,
  height: 0,
  cardWidth: 0,
  cardHeight: 0,
  frontTop: 0,
  step: 0,
  perspective: 1800,
  spacing: 360,
  stride: 560,
  pinned: false,
};

/* ============================================================
   HELPERS
   ============================================================ */

const clamp = (
  value: number,
  min = 0,
  max = 1,
) => Math.min(max, Math.max(min, value));

const lerp = (
  from: number,
  to: number,
  progress: number,
) => from + (to - from) * progress;

const smoothstep = (value: number) => {
  const t = clamp(value);

  return t * t * (3 - 2 * t);
};

const easeInCubic = (value: number) => {
  const t = clamp(value);

  return t * t * t;
};

const fadeOutNearEnd = (value: number) => {
  const t = clamp(
    (value - 0.72) / 0.28,
  );

  return 1 - smoothstep(t);
};

/* ============================================================
   RESPONSIVE GEOMETRY

   IMPORTANT:
   Animation values are intentionally unchanged.
   ============================================================ */

export function calculateServiceGeometry(
  width: number,
  height: number,
  count: number,
  reduced: boolean,
): Geometry {
  const safeWidth = Math.max(
    280,
    width,
  );

  const safeHeight = Math.max(
    420,
    height,
  );

  const compact = safeWidth < 900;

  const veryNarrow =
    safeWidth < 540;

  const shortScreen =
    safeHeight < 680;

  /*
   * Reserve space for heading.
   */
  const headingZone = Math.min(
    compact ? 150 : 180,

    Math.max(
      compact ? 88 : 110,

      safeHeight *
      (compact
        ? 0.18
        : 0.2),
    ),
  );

  const bottomInset =
    compact ? 16 : 28;

  const availableCardHeight =
    Math.max(
      250,

      safeHeight -
      headingZone -
      bottomInset,
    );

  const desiredCardHeight =
    safeHeight *
    (
      compact
        ? shortScreen
          ? 0.58
          : 0.62
        : shortScreen
          ? 0.5
          : 0.56
    );

  const cardHeight = Math.min(
    compact ? 570 : 620,

    availableCardHeight,

    Math.max(
      veryNarrow
        ? 280
        : 310,

      desiredCardHeight,
    ),
  );

  const frontTop = Math.max(
    headingZone,

    safeHeight -
    bottomInset -
    cardHeight,
  );

  /*
   * Keep the back cards above the foreground card.
   */
  const desiredBackTop =
    Math.min(
      compact ? 120 : 155,

      Math.max(
        compact ? 58 : 72,

        safeHeight *
        (
          compact
            ? 0.1
            : 0.12
        ),
      ),
    );

  const backTop = Math.min(
    desiredBackTop,

    Math.max(
      24,

      frontTop -
      Math.max(
        36,
        count * 7,
      ),
    ),
  );

  const rawStep =
    count > 1
      ? (
        frontTop -
        backTop
      ) /
      (count - 1)
      : 0;

  const step =
    count > 1
      ? Math.max(
        6,

        Math.min(
          compact
            ? 26
            : 38,

          rawStep,
        ),
      )
      : 0;

  const horizontalInset =
    compact ? 14 : 44;

  const cardWidth = Math.min(
    Math.max(
      240,

      safeWidth -
      horizontalInset * 2,
    ),

    compact
      ? 820
      : 1180,
  );

  /*
   * Scroll distance per transition.
   *
   * UNCHANGED.
   */
  const stride = Math.round(
    Math.max(
      compact
        ? 390
        : 460,

      Math.min(
        compact
          ? 720
          : 820,

        safeHeight *
        (
          compact
            ? 0.76
            : 0.8
        ),
      ),
    ),
  );

  return {
    width: safeWidth,
    height: safeHeight,
    cardWidth,
    cardHeight,
    frontTop,
    step,

    perspective:
      compact
        ? 1350
        : 1900,

    spacing:
      compact
        ? 220
        : 360,

    stride,

    pinned:
      !reduced &&
      count > 1,
  };
}

/* ============================================================
   ARROW
   ============================================================ */

function Arrow() {
  return (
    <svg
      aria-hidden="true"
      width="16"
      height="16"
      viewBox="0 0 20 20"
      fill="none"
    >
      <path
        d="M4 10h11M11 6l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ============================================================
   CARD CONTENT

   IMPORTANT FIX:

   There is intentionally NO:
   data-lenis-prevent

   on the left content.

   This allows wheel / trackpad / touch scrolling to continue
   controlling the page and therefore the existing stack
   animation even when the pointer is over the text side.
   ============================================================ */

function CardContent({
  item,
  interactive = true,
}: {
  item: Item;
  interactive?: boolean;
}) {
  const {
    service,
    number,
  } = item;

  return (
    <div
      className={
        styles.cardBody
      }
    >
      <div
        className={
          styles.copy
        }
      >
        <span
          className={
            styles.number
          }
        >
          {String(
            number,
          ).padStart(
            2,
            "0",
          )}
        </span>

        <div
          className={
            styles.details
          }
        >
          <h3>
            {service.title ||
              `Service ${number}`}
          </h3>

          {service.shortDescription ? (
            <p>
              {
                service.shortDescription
              }
            </p>
          ) : null}

          {service.slug ? (
            <Link
              href={`/services/${service.slug}`}
              tabIndex={
                interactive
                  ? 0
                  : -1
              }
              className={
                styles.cta
              }
            >
              Explore Capabilities

              <Arrow />
            </Link>
          ) : null}
        </div>
      </div>

      <div
        className={
          styles.image
        }
      >
        {service.imageUrl ? (
          <Image
            src={
              service.imageUrl
            }
            alt={
              service.imageAlt?.trim() ||
              service.title
            }
            fill
            loading="lazy"
            sizes="(max-width: 899px) calc(100vw - 28px), 50vw"
            className={
              styles.cover
            }
          />
        ) : null}
      </div>
    </div>
  );
}

/* ============================================================
   SERVICE FRAME

   ANIMATION IS UNCHANGED.
   ============================================================ */

function ServiceFrame({
  item,
  index,
  total,
  progress,
  geometry,
  active,
}: {
  item: Item;
  index: number;
  total: number;
  progress: MotionValue<number>;
  geometry: Geometry;
  active: boolean;
}) {
  const {
    cardHeight,
    perspective,
    spacing,
    step,
  } = geometry;

  const isFirst =
    index === 0;

  const isLast =
    index === total - 1;

  const restZ =
    -index * spacing;

  const ratio =
    perspective /
    (
      perspective -
      restZ
    );

  const restY =
    isFirst
      ? 0
      : (
        cardHeight *
        (ratio - 1) /
        2 -
        index * step
      ) /
      ratio;

  /* ==========================================================
     Y
     ========================================================== */

  const y = useTransform(
    progress,

    (value) => {
      if (isLast) {
        if (isFirst) {
          return 0;
        }

        const arrival =
          smoothstep(
            value -
            (index - 1),
          );

        return lerp(
          restY,
          0,
          arrival,
        );
      }

      if (value < index) {
        if (isFirst) {
          return 0;
        }

        const arrival =
          smoothstep(
            value -
            (index - 1),
          );

        return lerp(
          restY,
          0,
          arrival,
        );
      }

      const exit =
        clamp(
          value -
          index,
        );

      return (
        cardHeight *
        0.72 *
        easeInCubic(exit)
      );
    },
  );

  /* ==========================================================
     Z
     ========================================================== */

  const z = useTransform(
    progress,

    (value) => {
      if (isLast) {
        if (isFirst) {
          return 0;
        }

        const arrival =
          smoothstep(
            value -
            (index - 1),
          );

        return lerp(
          restZ,
          0,
          arrival,
        );
      }

      if (value < index) {
        if (isFirst) {
          return 0;
        }

        const arrival =
          smoothstep(
            value -
            (index - 1),
          );

        return lerp(
          restZ,
          0,
          arrival,
        );
      }

      const exit =
        clamp(
          value -
          index,
        );

      return (
        perspective *
        0.82 *
        easeInCubic(exit)
      );
    },
  );

  /* ==========================================================
     ROTATION
     ========================================================== */

  const rotateX =
    useTransform(
      progress,

      (value) => {
        if (
          isLast ||
          value < index
        ) {
          return 0;
        }

        const exit =
          clamp(
            value -
            index,
          );

        return (
          70 *
          easeInCubic(exit)
        );
      },
    );

  /* ==========================================================
     OPACITY
     ========================================================== */

  const opacity =
    useTransform(
      progress,

      (value) => {
        if (
          isLast ||
          value < index
        ) {
          return 1;
        }

        return fadeOutNearEnd(
          value -
          index,
        );
      },
    );

  /* ==========================================================
     RENDER
     ========================================================== */

  return (
    <div
      className={
        styles.shell
      }
      style={{
        width:
          geometry.cardWidth,

        height:
          cardHeight,

        top:
          geometry.frontTop,

        zIndex:
          total -
          index,
      }}
    >
      <motion.article
        data-service-frame
        data-active={
          active
        }
        aria-hidden={
          !active
        }
        inert={
          !active
        }
        style={{
          y,
          z,
          rotateX,
          opacity,

          background:
            COLORS[
            (
              item.number -
              1
            ) %
            COLORS.length
            ],

          color:
            [3, 4, 6].includes(
              item.number,
            )
              ? "#151515"
              : "#fff",

          pointerEvents:
            active
              ? "auto"
              : "none",
        }}
        className={
          styles.frame
        }
      >
        <CardContent
          item={item}
          interactive={
            active
          }
        />
      </motion.article>
    </div>
  );
}

/* ============================================================
   MAIN GALLERY
   ============================================================ */

export function ServicesScrollGallery({
  eyebrow,
  heading,
  services,
}: Props) {
  const rootRef =
    useRef<HTMLDivElement>(
      null,
    );

  const shouldReduceMotion =
    useReducedMotion() ===
    true;

  const [
    geometry,
    setGeometry,
  ] =
    useState<Geometry>(
      INITIAL,
    );

  const [
    active,
    setActive,
  ] =
    useState(0);

  /* ==========================================================
     SERVICES

     Preserve current ordering.
     ========================================================== */

  const items =
    useMemo(
      () =>
        services
          .slice(0, 8)
          .map(
            (
              service,
              index,
            ) => ({
              service,
              number:
                index +
                1,
            }),
          )
          .reverse(),

      [services],
    );

  const count =
    items.length;

  const currentHeading =
    heading?.trim() ||
    "What we really do?";

  /* ==========================================================
     RESPONSIVE MEASUREMENT

     UNCHANGED.
     ========================================================== */

  useEffect(() => {
    const root =
      rootRef.current;

    if (!root) {
      return;
    }

    let frame = 0;

    const measure =
      () => {
        frame = 0;

        const rect =
          root.getBoundingClientRect();

        const width =
          rect.width ||
          document
            .documentElement
            .clientWidth ||
          window.innerWidth;

        const height =
          window
            .visualViewport
            ?.height ||
          window.innerHeight ||
          document
            .documentElement
            .clientHeight;

        const next =
          calculateServiceGeometry(
            width,
            height,
            count,
            shouldReduceMotion,
          );

        setGeometry(
          (old) => {
            const unchanged =
              old.width ===
              next.width &&
              old.height ===
              next.height &&
              old.cardWidth ===
              next.cardWidth &&
              old.cardHeight ===
              next.cardHeight &&
              old.frontTop ===
              next.frontTop &&
              old.step ===
              next.step &&
              old.perspective ===
              next.perspective &&
              old.spacing ===
              next.spacing &&
              old.stride ===
              next.stride &&
              old.pinned ===
              next.pinned;

            return unchanged
              ? old
              : next;
          },
        );
      };

    const schedule =
      () => {
        if (!frame) {
          frame =
            requestAnimationFrame(
              measure,
            );
        }
      };

    const observer =
      new ResizeObserver(
        schedule,
      );

    observer.observe(
      root,
    );

    window.addEventListener(
      "resize",
      schedule,
      {
        passive: true,
      },
    );

    window.visualViewport
      ?.addEventListener(
        "resize",
        schedule,
        {
          passive: true,
        },
      );

    schedule();

    return () => {
      cancelAnimationFrame(
        frame,
      );

      observer.disconnect();

      window.removeEventListener(
        "resize",
        schedule,
      );

      window.visualViewport
        ?.removeEventListener(
          "resize",
          schedule,
        );
    };
  }, [
    count,
    shouldReduceMotion,
  ]);

  /* ==========================================================
     SCROLL PROGRESS

     UNCHANGED.
     ========================================================== */

  const {
    scrollYProgress,
  } =
    useScroll({
      target:
        rootRef,

      offset: [
        "start start",
        "end end",
      ],
    });

  const transitionCount =
    Math.max(
      1,
      count - 1,
    );

  const progress =
    useTransform(
      scrollYProgress,

      [0, 1],

      [
        0,
        transitionCount,
      ],
    );

  /* ==========================================================
     ACTIVE CARD

     UNCHANGED.
     ========================================================== */

  useMotionValueEvent(
    progress,

    "change",

    (value) => {
      if (!count) {
        return;
      }

      const next =
        Math.min(
          count - 1,

          Math.max(
            0,

            Math.round(
              value,
            ),
          ),
        );

      setActive(
        (previous) =>
          previous ===
            next
            ? previous
            : next,
      );
    },
  );

  if (!count) {
    return null;
  }

  /* ==========================================================
     HEADING
     ========================================================== */

  const headingMarkup =
    (
      <h2
        id="services-heading"
        className={
          styles.heading
        }
      >
        {currentHeading.toLowerCase() ===
          "what we really do?" ? (
          <>
            What we
            <br />
            really do?
          </>
        ) : (
          currentHeading
        )}
      </h2>
    );

  const measurementsReady =
    geometry.width > 0 &&
    geometry.height > 0;

  /* ==========================================================
     TOTAL SCROLL HEIGHT

     UNCHANGED.
     ========================================================== */

  const scrollHeight =
    geometry.height +
    Math.max(
      0,
      count - 1,
    ) *
    geometry.stride;

  /* ==========================================================
     RENDER
     ========================================================== */

  return (
    <div
      ref={rootRef}
      data-motion-managed
      data-services-gallery
      data-pinned={
        geometry.pinned
      }
      className={
        styles.root
      }
      style={{
        height:
          measurementsReady &&
            geometry.pinned
            ? scrollHeight
            : undefined,
      }}
    >
      {!measurementsReady ? (
        /* -----------------------------------------------
           Initial measuring state
           ----------------------------------------------- */

        <div
          className={
            styles.loadingStage
          }
        >
          {headingMarkup}
        </div>
      ) : geometry.pinned ? (
        /* -----------------------------------------------
           Animated / sticky version
           ----------------------------------------------- */

        <div
          className={
            styles.stage
          }
          style={{
            height:
              geometry.height,
          }}
        >
          {eyebrow ? (
            <span
              className="sr-only"
            >
              {eyebrow}
            </span>
          ) : null}

          {headingMarkup}

          <div
            className={
              styles.scene
            }
            style={{
              perspective:
                geometry.perspective,

              perspectiveOrigin:
                `50% ${geometry.frontTop +
                geometry.cardHeight /
                2
                }px`,
            }}
          >
            {items.map(
              (
                item,
                index,
              ) => (
                <ServiceFrame
                  key={`${item.service._id}-${item.number}`}
                  item={
                    item
                  }
                  index={
                    index
                  }
                  total={
                    count
                  }
                  progress={
                    progress
                  }
                  geometry={
                    geometry
                  }
                  active={
                    index ===
                    active
                  }
                />
              ),
            )}
          </div>
        </div>
      ) : (
        /* -----------------------------------------------
           Reduced-motion / one-card fallback
           ----------------------------------------------- */

        <div
          className={
            styles.staticList
          }
        >
          {eyebrow ? (
            <span
              className="sr-only"
            >
              {eyebrow}
            </span>
          ) : null}

          {headingMarkup}

          <div
            className={
              styles.staticRail
            }
            aria-label="Services"
          >
            {items.map(
              (item) => (
                <article
                  key={`${item.service._id}-${item.number}`}
                  className={
                    styles.staticCard
                  }
                  style={{
                    background:
                      COLORS[
                      (
                        item.number -
                        1
                      ) %
                      COLORS.length
                      ],

                    color:
                      [3, 4, 6].includes(
                        item.number,
                      )
                        ? "#151515"
                        : "#fff",
                  }}
                >
                  <CardContent
                    item={
                      item
                    }
                  />
                </article>
              ),
            )}
          </div>
        </div>
      )}

      {/* =====================================================
          Accessibility links for the animated version
          ===================================================== */}

      {geometry.pinned ? (
        <nav
          className="sr-only"
          aria-label="All services"
        >
          {items.map(
            (item) =>
              item.service
                .slug ? (
                <Link
                  key={
                    item.number
                  }
                  href={`/services/${item.service.slug}`}
                >
                  {
                    item
                      .service
                      .title
                  }
                </Link>
              ) : null,
          )}
        </nav>
      ) : null}
    </div>
  );
}