"use client";

import Image from "@/components/ui/image";
import Link from "next/link";

import {
  motion,
  useMotionValueEvent,
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

type ScrollDirection = "down" | "up";

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

  perspective: 2000,

  spacing: 470,

  stride: 1,

  pinned: false,
};

/* ============================================================
   HELPERS
   ============================================================ */

const clamp = (
  value: number,
  min = 0,
  max = 1,
) =>
  Math.min(
    max,
    Math.max(
      min,
      value,
    ),
  );

/* ============================================================
   RESPONSIVE GEOMETRY

   One exact vertical scroll distance controls the gallery.

   No additional empty scrolling after the cards finish.
   ============================================================ */

export function calculateServiceGeometry(
  width: number,
  height: number,
  count: number,
  reduced: boolean,
): Geometry {
  const compact =
    width < 900;

  /* ==========================================================
     RESPONSIVE CARD HEIGHT
     ========================================================== */

  const cardHeight =
    Math.min(
      compact
        ? 580
        : 600,

      Math.max(
        compact
          ? 450
          : 325,

        height *
        (
          compact
            ? 0.6
            : 0.52
        ),
      ),
    );

  /* ==========================================================
     FRONT CARD LOCATION
     ========================================================== */

  const frontTop =
    height -
    32 -
    cardHeight;

  /* ==========================================================
     BACK STACK LOCATION
     ========================================================== */

  const backTop =
    Math.min(
      190,

      Math.max(
        100,
        height * 0.18,
      ),
    );

  /* ==========================================================
     STACK STEP
     ========================================================== */

  const step =
    count > 1
      ? Math.min(
        42,

        (
          frontTop -
          backTop
        ) /
        (
          count -
          1
        ),
      )
      : 0;

  /* ==========================================================
     SCROLL STRIDE

     Previously this was extremely long and then the card also
     had a completely static middle range.

     Now:
     - enough scrolling to read
     - continuous visual response
     - no giant dead scroll period
     ========================================================== */

  const stride =
    Math.round(
      Math.max(
        620,

        Math.min(
          980,
          height * 0.95,
        ),
      ),
    );

  return {
    width,
    height,

    cardWidth:
      Math.min(
        width -
        (
          compact
            ? 28
            : 88
        ),

        1400,
      ),

    cardHeight,

    frontTop,

    step:
      Math.max(
        10,
        step,
      ),

    perspective:
      compact
        ? 1400
        : 2000,

    spacing:
      compact
        ? 300
        : 470,

    stride,

    pinned:
      !reduced &&
      count > 1 &&
      width >= 360 &&
      height >= 600 &&
      step >= 12,
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
      {/* =====================================================
          COPY
          ===================================================== */}

      <div
        className={
          styles.copy
        }
        data-lenis-prevent
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

      {/* =====================================================
          IMAGE
          ===================================================== */}

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
            sizes="
              (max-width: 899px) 94vw,
              45vw
            "
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

   Each card gets exactly one scroll unit.

   IMPORTANT:

   There is NO stored "furthest scroll position".

   Therefore:

   scroll down
      ↓
   08 → 07 → 06 → ...

   scroll back up
      ↑
   ... → 06 → 07 → 08

   Everything reconstructs naturally.
   ============================================================ */

function ServiceFrame({
  item,
  index,
  total,
  progress,
  geometry,
  active,
  direction,
}: {
  item: Item;

  index: number;
  total: number;

  progress:
  MotionValue<number>;

  geometry: Geometry;

  active: boolean;
  direction: ScrollDirection;
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
    index ===
    total - 1;

  /* ==========================================================
     RESTING Z
     ========================================================== */

  const restZ =
    -index *
    spacing;

  /* ==========================================================
     PERSPECTIVE COMPENSATION
     ========================================================== */

  const ratio =
    perspective /
    (
      perspective -
      restZ
    );

  const restY =
    (
      cardHeight *
      (
        ratio -
        1
      ) /
      2 -
      index *
      step
    ) /
    ratio;

  /* ==========================================================
     LOCAL CARD PROGRESS

     progress:
       0 → 8

     card 08:
       local 0 → 1

     card 07:
       local 0 → 1 after progress reaches 1

     etc.

     This value automatically decreases while scrolling upward.
     ========================================================== */

  const local =
    useTransform(
      progress,

      (
        value,
      ) =>
        clamp(
          value -
          index,
        ),
    );

  /* ==========================================================
     LAST CARD

     Last card does not fly away.

     It continuously moves from the back of the stack
     to foreground.

     It reaches foreground exactly when Services finishes.
     ========================================================== */

  const lastY =
    useTransform(
      local,

      [
        0,
        0.55,
        1,
      ],

      [
        restY,

        restY *
        0.18,

        0,
      ],
    );

  const lastZ =
    useTransform(
      local,

      [
        0,
        0.55,
        1,
      ],

      [
        restZ,

        restZ *
        0.18,

        0,
      ],
    );

  /* ==========================================================
     NORMAL CARD Y

     No static hold.

     rest
       ↓
     readable foreground
       ↓
     tiny continuous drift
       ↓
     exit
     ========================================================== */

  const normalY =
    useTransform(
      local,

      [
        0,
        0.38,
        0.68,
        1,
      ],

      isFirst
        ? [
          0,

          -cardHeight *
          0.01,

          -cardHeight *
          0.035,

          cardHeight *
          0.68,
        ]
        : [
          restY,

          0,

          -cardHeight *
          0.035,

          cardHeight *
          0.68,
        ],
    );

  /* ==========================================================
     NORMAL CARD Z
     ========================================================== */

  const normalZ =
    useTransform(
      local,

      [
        0,
        0.38,
        0.68,
        1,
      ],

      isFirst
        ? [
          0,

          perspective *
          0.01,

          perspective *
          0.035,

          perspective *
          0.82,
        ]
        : [
          restZ,

          0,

          perspective *
          0.035,

          perspective *
          0.82,
        ],
    );

  /* ==========================================================
     ROTATION
     ========================================================== */

  const normalRotateX =
    useTransform(
      local,

      [
        0,
        0.38,
        0.68,
        1,
      ],

      [
        0,
        0,
        3,
        70,
      ],
    );

  /* ==========================================================
     OPACITY

     Fade only near the end of the exit.
     ========================================================== */

  const normalOpacity =
    useTransform(
      local,

      [
        0,
        0.72,
        0.9,
        1,
      ],

      [
        1,
        1,
        1,
        0,
      ],
    );

  /* ==========================================================
     REVERSE / SCROLL-UP RETURN

     Forward motion is intentionally unchanged. While scrolling upward,
     each exited card returns on its own scroll slice with a deliberately simple path:
     it fades back in with only a light tilt, settles in the foreground, then
     moves into the stack. The dramatic forward exit is not replayed in reverse.
     Keeping one card per stride prevents several cards from popping back
     at the same time.
     ========================================================== */

  const returnY =
    useTransform(
      local,
      [0, 0.38, 0.68, 0.88, 1],
      isFirst
        ? [0, 0, 0, cardHeight * 0.18, cardHeight * 0.38]
        : [restY, 0, 0, cardHeight * 0.18, cardHeight * 0.38],
    );

  const returnZ =
    useTransform(
      local,
      [0, 0.38, 0.68, 0.88, 1],
      isFirst
        ? [0, 0, 0, perspective * 0.18, perspective * 0.34]
        : [restZ, 0, 0, perspective * 0.18, perspective * 0.34],
    );

  const returnRotateX =
    useTransform(
      local,
      [0, 0.68, 0.88, 1],
      [0, 0, 6, 14],
    );

  const returnOpacity =
    useTransform(
      local,
      [0, 0.94, 1],
      [1, 1, 0],
    );

  const returning =
    direction === "up" &&
    !isLast;

  const y =
    isLast
      ? lastY
      : returning
        ? returnY
        : normalY;

  const z =
    isLast
      ? lastZ
      : returning
        ? returnZ
        : normalZ;

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

          rotateX:
            isLast
              ? 0
              : returning
                ? returnRotateX
                : normalRotateX,

          opacity:
            isLast
              ? 1
              : returning
                ? returnOpacity
                : normalOpacity,

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

  const [
    scrollDirection,
    setScrollDirection,
  ] = useState<ScrollDirection>("down");

  const previousProgressRef =
    useRef(0);

  /* ==========================================================
     SERVICES

     Preserve:
     08 as front card initially.
     ========================================================== */

  const items =
    useMemo(
      () =>
        services
          .slice(
            0,
            8,
          )
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
     RESPONSIVE GEOMETRY
     ========================================================== */

  useEffect(() => {
    const reduced =
      matchMedia(
        "(prefers-reduced-motion: reduce)",
      );

    let frame = 0;

    const measure =
      () => {
        frame = 0;

        const next =
          calculateServiceGeometry(
            document.documentElement
              .clientWidth,

            document.documentElement
              .clientHeight,

            count,

            reduced.matches,
          );

        setGeometry(
          (
            old,
          ) =>
            Object.keys(
              next,
            ).every(
              (
                key,
              ) =>
                old[
                key as keyof Geometry
                ] ===
                next[
                key as keyof Geometry
                ],
            )
              ? old
              : next,
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

    schedule();

    window.addEventListener(
      "resize",
      schedule,
      {
        passive: true,
      },
    );

    reduced.addEventListener(
      "change",
      schedule,
    );

    return () => {
      cancelAnimationFrame(
        frame,
      );

      window.removeEventListener(
        "resize",
        schedule,
      );

      reduced.removeEventListener(
        "change",
        schedule,
      );
    };
  }, [count]);

  /* ==========================================================
     SCROLL PROGRESS

     THIS is the major correction.

     Old:
       scroll →
       furthest.current →
       Math.max(previous progress)
       ↓
       impossible to rewind

     New:
       real scrollYProgress
       ↓
       progress 0 → number of cards
       ↓
       fully reversible
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

  const progress =
    useTransform(
      scrollYProgress,

      [
        0,
        1,
      ],

      [
        0,
        Math.max(
          1,
          count,
        ),
      ],
    );

  /* ==========================================================
     ACTIVE CARD

     React updates ONLY when the active service changes.

     Card transform itself remains MotionValue-based.
     ========================================================== */

  useMotionValueEvent(
    progress,

    "change",

    (
      value,
    ) => {
      const previousProgress =
        previousProgressRef.current;

      if (Math.abs(value - previousProgress) > 0.002) {
        const nextDirection: ScrollDirection =
          value < previousProgress ? "up" : "down";

        setScrollDirection((current) =>
          current === nextDirection ? current : nextDirection,
        );
      }

      previousProgressRef.current = value;

      if (
        count <= 0
      ) {
        return;
      }

      const next =
        Math.min(
          count -
          1,

          Math.max(
            0,

            Math.floor(
              value,
            ),
          ),
        );

      setActive(
        (
          previous,
        ) =>
          previous ===
            next
            ? previous
            : next,
      );
    },
  );

  /* ==========================================================
     EMPTY
     ========================================================== */

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

  /* ==========================================================
     EXACT SCROLL HEIGHT

     No:

       + geometry.height * 0.35

     No artificial final dead scroll.

     stageHeight + travelDistance

     where:

       travelDistance =
         count × stride
     ========================================================== */

  const scrollHeight =
    geometry.height +
    count *
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
          geometry.pinned
            ? scrollHeight
            : undefined,
      }}
    >
      {/* =====================================================
          PINNED 3D MODE
          ===================================================== */}

      {geometry.pinned ? (
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
                  direction={scrollDirection}
                />
              ),
            )}
          </div>
        </div>
      ) : (
        /* ===================================================
           RESPONSIVE STATIC FALLBACK

           Small/short screens retain readable cards.
           =================================================== */

        <div
          className={
            styles.staticList
          }
        >
          {headingMarkup}

          {items.map(
            (
              item,
            ) => (
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
      )}

      {/* =====================================================
          ACCESSIBILITY NAVIGATION
          ===================================================== */}

      {geometry.pinned ? (
        <nav
          className="sr-only"
          aria-label="All services"
        >
          {items.map(
            (
              item,
            ) =>
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