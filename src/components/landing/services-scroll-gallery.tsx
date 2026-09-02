"use client";

import Image from "@/components/ui/image";
import Link from "next/link";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
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

/* ============================================================
   TYPES
   ============================================================ */

type ServicesScrollGalleryProps = {
  eyebrow?: string | null;
  heading?: string | null;
  services: CmsFeaturedService[];
};

type GalleryService = {
  service: CmsFeaturedService;
  number: number;
};

type ResponsiveMotionConfig = {
  perspective: number;
  cardSpacing: number;
  cascadeSlope: number;
  flyPastZ: number;
  swingDeg: number;
};

/* ============================================================
   ANIMATION CONFIG

   Desktop keeps the original 3D values.

   Mobile/tablet use the SAME animation mechanism, but use
   smaller Z spacing so the complete stack remains inside
   narrower / shorter viewports.
   ============================================================ */

const DESKTOP_MOTION: ResponsiveMotionConfig = {
  perspective: 2000,
  cardSpacing: 470,
  cascadeSlope: 0.34,
  flyPastZ: 2100,
  swingDeg: 70,
};

const TABLET_MOTION: ResponsiveMotionConfig = {
  perspective: 1500,
  cardSpacing: 210,
  cascadeSlope: 0.26,
  flyPastZ: 1580,
  swingDeg: 64,
};

const MOBILE_MOTION: ResponsiveMotionConfig = {
  perspective: 1050,
  cardSpacing: 135,
  cascadeSlope: 0.24,
  flyPastZ: 1150,
  swingDeg: 58,
};

/*
 * Keep the same scroll cadence on every device.
 *
 * This ensures:
 *
 * 08 → leaves
 * 07 → front
 * 06 → front
 * ...
 * 01 → final hold
 */
const SCROLL_PER_CARD_VH = 60;
const FINAL_HOLD_VH = 18;

/*
 * Same spring feel as the desktop animation.
 */
const SCROLL_SPRING = {
  stiffness: 500,
  damping: 60,
  mass: 1,
  restDelta: 0.0001,
  restSpeed: 0.0001,
} as const;

/* ============================================================
   COLORS
   ============================================================ */

const SERVICE_COLORS = [
  "#FF6548",
  "#A747C6",
  "#FFD429",
  "#47E58C",
  "#176FC8",
  "#9DCE67",
  "#04A9BB",
  "#ED5B8D",
] as const;

/* ============================================================
   RESPONSIVE MOTION
   ============================================================ */

function getMotionConfig(
  width: number,
): ResponsiveMotionConfig {
  if (width < 640) {
    return MOBILE_MOTION;
  }

  if (width < 1024) {
    return TABLET_MOTION;
  }

  return DESKTOP_MOTION;
}

function useResponsiveMotionConfig() {
  /*
   * Start with desktop on SSR so server/client markup remains
   * deterministic. The actual viewport config is applied
   * immediately after mount.
   */
  const [
    config,
    setConfig,
  ] = useState<ResponsiveMotionConfig>(
    DESKTOP_MOTION,
  );

  useEffect(() => {
    let animationFrame = 0;

    const update = () => {
      cancelAnimationFrame(
        animationFrame,
      );

      animationFrame =
        requestAnimationFrame(() => {
          const next =
            getMotionConfig(
              window.innerWidth,
            );

          setConfig(
            (current) =>
              current === next
                ? current
                : next,
          );
        });
    };

    update();

    window.addEventListener(
      "resize",
      update,
      {
        passive: true,
      },
    );

    return () => {
      cancelAnimationFrame(
        animationFrame,
      );

      window.removeEventListener(
        "resize",
        update,
      );
    };
  }, []);

  return config;
}

/* ============================================================
   ICON
   ============================================================ */

function ArrowRightIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className="h-4 w-4"
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
   HEADING UTILS
   ============================================================ */

function splitHeading(
  heading: string,
) {
  const value =
    heading.trim() ||
    "What we really do?";

  if (
    value.toLowerCase() ===
    "what we really do?"
  ) {
    return [
      "What we",
      "really do?",
    ];
  }

  const words = value
    .split(/\s+/)
    .filter(Boolean);

  if (words.length <= 2) {
    return [value];
  }

  const middle = Math.ceil(
    words.length / 2,
  );

  return [
    words
      .slice(0, middle)
      .join(" "),
    words
      .slice(middle)
      .join(" "),
  ];
}

/* ============================================================
   BACKGROUND HEADING
   ============================================================ */

function ServicesHeading({
  heading,
}: {
  heading: string;
}) {
  const lines = useMemo(
    () => splitHeading(heading),
    [heading],
  );

  return (
    <h2
      id="services-heading"
      aria-label={heading}
      className="
        pointer-events-none
        absolute
        left-1/2
        top-[2.5rem]
        z-0
        flex
        w-full
        -translate-x-1/2
        flex-col
        items-center
        px-3
        text-center
        text-[clamp(3rem,16vw,5rem)]
        font-semibold
        leading-[0.82]
        tracking-[-0.065em]
        text-white

        sm:top-[3.25rem]
        sm:text-[clamp(4.25rem,13vw,7rem)]

        lg:top-[4.5rem]
        lg:text-[clamp(4rem,10vw,9rem)]
      "
    >
      {lines.map(
        (line, index) => (
          <span
            key={`${line}-${index}`}
            aria-hidden="true"
            className="
              block
              whitespace-nowrap
            "
          >
            {line}
          </span>
        ),
      )}
    </h2>
  );
}

/* ============================================================
   CARD CONTENT
   ============================================================ */

function ServiceCardContent({
  item,
  detailsOpacity,
  interactive,
}: {
  item: GalleryService;
  detailsOpacity:
    | number
    | MotionValue<number>;
  interactive: boolean;
}) {
  const {
    service,
    number,
  } = item;

  const numberLabel =
    String(number).padStart(
      2,
      "0",
    );

  const title =
    service.title?.trim() ||
    `Service ${numberLabel}`;

  const description =
    service.shortDescription?.trim() ||
    "";

  const slug =
    service.slug?.trim() || "";

  /*
   * Yellow / green / lime cards need dark text.
   */
  const darkInk =
    number === 3 ||
    number === 4 ||
    number === 6;

  const foreground =
    darkInk
      ? "#111111"
      : "#FFFFFF";

  return (
    <div
      className="
        relative
        grid
        h-full
        w-full
        grid-cols-1
        grid-rows-[60%_40%]
        overflow-hidden

        sm:grid-rows-[56%_44%]

        lg:grid-cols-[54%_46%]
        lg:grid-rows-1
      "
    >
      {/* ======================================================
          COPY
          ====================================================== */}

      <motion.div
        className="
          relative
          z-10
          flex
          min-h-0
          min-w-0
          flex-col
          overflow-hidden
          p-5

          min-[390px]:p-6

          sm:p-8

          lg:p-[clamp(1.5rem,3vw,3.25rem)]
        "
        style={{
          opacity: detailsOpacity,
          color: foreground,
        }}
      >
        <span
          className="
            block
            shrink-0
            text-[1.5rem]
            font-semibold
            leading-none
            tracking-[-0.045em]

            sm:text-[2rem]

            lg:text-[clamp(1.8rem,2.5vw,2.75rem)]
          "
        >
          {numberLabel}
        </span>

        <div
          className="
            mt-auto
            min-h-0
            max-w-[31rem]
          "
        >
          <h3
            className="
              text-[1.3rem]
              font-semibold
              leading-[1.08]
              tracking-[-0.04em]

              min-[390px]:text-[1.4rem]

              sm:text-[1.75rem]

              lg:text-[clamp(1.45rem,2.1vw,2.35rem)]
            "
          >
            {title}
          </h3>

          {description ? (
            <p
              className="
                mt-2.5
                max-w-[29rem]
                overflow-hidden
                text-[0.7rem]
                font-normal
                leading-[1.45]
                opacity-80

                [display:-webkit-box]
                [-webkit-box-orient:vertical]
                [-webkit-line-clamp:3]

                sm:mt-4
                sm:text-[0.8rem]
                sm:[-webkit-line-clamp:4]

                lg:text-[clamp(0.68rem,0.82vw,0.84rem)]
                lg:[display:block]
              "
            >
              {description}
            </p>
          ) : null}

          {slug ? (
            <Link
              href={`/services/${slug}`}
              tabIndex={
                interactive
                  ? 0
                  : -1
              }
              className="
                mt-4
                inline-flex
                w-fit
                shrink-0
                items-center
                gap-2
                rounded-[0.18rem]
                bg-white
                px-3.5
                py-2.5
                text-[0.65rem]
                font-semibold
                leading-4
                text-black
                transition-transform
                duration-200

                hover:-translate-y-[2px]

                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-white

                sm:mt-5
                sm:px-4
                sm:py-3
                sm:text-[0.7rem]

                lg:mt-6
              "
            >
              <span>
                Explore Capabilities
              </span>

              <ArrowRightIcon />
            </Link>
          ) : null}
        </div>
      </motion.div>

      {/* ======================================================
          IMAGE
          ====================================================== */}

      <div
        className="
          relative
          h-full
          min-h-0
          min-w-0
          overflow-hidden
          bg-black/10
        "
      >
        {service.imageUrl ? (
          <Image
            src={service.imageUrl}
            alt={
              service.imageAlt?.trim() ||
              title
            }
            fill
            sizes="
              (max-width: 639px) 100vw,
              (max-width: 1023px) 100vw,
              46vw
            "
            className="
              select-none
              object-cover
            "
          />
        ) : (
          <div
            aria-hidden="true"
            className="
              absolute
              inset-0
              bg-[linear-gradient(135deg,rgba(255,255,255,0.18),rgba(0,0,0,0.12))]
            "
          />
        )}
      </div>
    </div>
  );
}

/* ============================================================
   ONE 3D CARD

   Animation order is reversed:

   CMS:
   01 02 03 04 05 06 07 08

   animation:
   08 07 06 05 04 03 02 01

   At rest:

   08 = z 0
   07 = negative Z
   06 = further negative Z
   ...
   01 = deepest card

   Scroll moves one card at a time through the camera.
   ============================================================ */

function Service3DCard({
  item,
  animationIndex,
  progress,
  isActive,
  totalCards,
  lastIndex,
  step,
  motionConfig,
}: {
  item: GalleryService;
  animationIndex: number;
  progress: MotionValue<number>;
  isActive: boolean;
  totalCards: number;
  lastIndex: number;
  step: number;
  motionConfig:
    ResponsiveMotionConfig;
}) {
  const isFirst =
    animationIndex === 0;

  const isLast =
    animationIndex ===
    lastIndex;

  const sliceStart =
    animationIndex * step;

  const sliceEnd =
    (animationIndex + 1) *
    step;

  const restZ =
    -animationIndex *
    motionConfig.cardSpacing;

  /*
   * First card:
   * 0 → through camera
   *
   * Middle cards:
   * restZ → 0 → through camera
   *
   * Last card:
   * restZ → 0 and remains there
   */
  const z = useTransform(
    progress,

    isFirst
      ? [
          0,
          sliceEnd,
        ]
      : isLast
        ? [
            0,
            sliceStart,
          ]
        : [
            0,
            sliceStart,
            sliceEnd,
          ],

    isFirst
      ? [
          0,
          motionConfig.flyPastZ,
        ]
      : isLast
        ? [
            restZ,
            0,
          ]
        : [
            restZ,
            0,
            motionConfig.flyPastZ,
          ],
  );

  /*
   * Current front card swings away as it passes
   * through the camera.
   *
   * 01 stays flat at the end.
   */
  const rotateX =
    useTransform(
      progress,
      [
        sliceStart,
        sliceEnd,
      ],
      isLast
        ? [0, 0]
        : [
            0,
            motionConfig.swingDeg,
          ],
    );

  /*
   * This creates the visible staircase.
   */
  const y = useTransform(
    z,
    (value) =>
      value *
      motionConfig.cascadeSlope,
  );

  /*
   * Fade only after passing close to the camera.
   */
  const opacity =
    useTransform(
      z,
      [
        motionConfig.flyPastZ *
          0.62,
        motionConfig.flyPastZ,
      ],
      [1, 0],
    );

  /*
   * On mobile the Z distance between cards is smaller.
   * Scale the details reveal threshold accordingly so
   * text from the next/back card does not overlap.
   */
  const detailsRevealStart =
    -Math.min(
      210,
      motionConfig.cardSpacing *
        0.78,
    );

  const detailsOpacity =
    useTransform(
      z,
      [
        detailsRevealStart,
        0,
        motionConfig.flyPastZ *
          0.42,
      ],
      [0, 1, 0],
    );

  const color =
    SERVICE_COLORS[
      (item.number - 1) %
        SERVICE_COLORS.length
    ];

  return (
    <div
      className="
        service-3d-card-shell
        absolute
        left-1/2
        -translate-x-1/2
        -translate-y-1/2
      "
      style={{
        zIndex:
          totalCards -
          animationIndex,

        pointerEvents:
          isActive
            ? "auto"
            : "none",
      }}
      aria-hidden={!isActive}
    >
      <motion.article
        style={{
          y,
          z,
          rotateX,
          opacity,
          backgroundColor: color,
        }}
        className="
          service-3d-card
          h-full
          w-full
          overflow-hidden
          rounded-[0.3rem]
          border
          border-black/[0.035]
          shadow-[0_1.5rem_5rem_rgba(0,0,0,0.25)]
        "
      >
        <ServiceCardContent
          item={item}
          detailsOpacity={
            detailsOpacity
          }
          interactive={isActive}
        />
      </motion.article>
    </div>
  );
}

/* ============================================================
   REDUCED MOTION FALLBACK

   This is ONLY used when the operating system explicitly
   requests reduced motion.

   Normal mobile devices still get the complete 3D animation.
   ============================================================ */

function ReducedMotionServices({
  services,
  heading,
  eyebrow,
}: {
  services: GalleryService[];
  heading: string;
  eyebrow?: string | null;
}) {
  return (
    <div
      className="
        w-full
        bg-black
        px-5
        py-14

        sm:px-8
        sm:py-20

        lg:px-14
        lg:py-24
      "
    >
      <div
        className="
          mx-auto
          mb-10
          max-w-[80rem]
          text-center
        "
      >
        {eyebrow?.trim() ? (
          <p
            className="
              mb-3
              text-xs
              font-semibold
              uppercase
              tracking-[0.08em]
              text-white/55
            "
          >
            {eyebrow.trim()}
          </p>
        ) : null}

        <h2
          id="services-heading"
          className="
            text-[clamp(3rem,10vw,7rem)]
            font-semibold
            leading-[0.9]
            tracking-[-0.06em]
            text-white
          "
        >
          {heading}
        </h2>
      </div>

      <div
        className="
          mx-auto
          flex
          max-w-[80rem]
          flex-col
          gap-5
        "
      >
        {services.map((item) => {
          const {
            service,
            number,
          } = item;

          const color =
            SERVICE_COLORS[
              (number - 1) %
                SERVICE_COLORS.length
            ];

          return (
            <article
              key={service._id}
              className="
                h-[clamp(28rem,68svh,38rem)]
                overflow-hidden
                rounded-[0.3rem]
              "
              style={{
                backgroundColor:
                  color,
              }}
            >
              <ServiceCardContent
                item={item}
                detailsOpacity={1}
                interactive
              />
            </article>
          );
        })}
      </div>
    </div>
  );
}

/* ============================================================
   MAIN
   ============================================================ */

export function ServicesScrollGallery({
  eyebrow,
  heading,
  services,
}: ServicesScrollGalleryProps) {
  const containerRef =
    useRef<HTMLDivElement>(null);

  const prefersReducedMotion =
    useReducedMotion() ?? false;

  const motionConfig =
    useResponsiveMotionConfig();

  /*
   * CMS ordering remains:
   *
   * 01
   * 02
   * 03
   * ...
   * 08
   */
  const cmsServices =
    useMemo<GalleryService[]>(
      () =>
        services
          .slice(0, 8)
          .map(
            (
              service,
              index,
            ) => ({
              service,
              number: index + 1,
            }),
          ),
      [services],
    );

  /*
   * Animation starts with service 08 in front.
   */
  const animationServices =
    useMemo(
      () =>
        [
          ...cmsServices,
        ].reverse(),
      [cmsServices],
    );

  const totalCards =
    animationServices.length;

  const lastIndex =
    Math.max(
      0,
      totalCards - 1,
    );

  /*
   * 0 = service 08
   * 1 = service 07
   * ...
   * 7 = service 01
   */
  const [
    activeAnimationIndex,
    setActiveAnimationIndex,
  ] = useState(0);

  /*
   * Each card receives the exact same amount of
   * vertical scroll distance on all normal devices.
   */
  const trackHeightVh =
    100 +
    lastIndex *
      SCROLL_PER_CARD_VH +
    FINAL_HOLD_VH;

  /*
   * Stop animation slightly before the track ends.
   * The remaining distance is the final-card hold.
   */
  const travelEnd =
    lastIndex > 0
      ? (
          lastIndex *
          SCROLL_PER_CARD_VH
        ) /
        (
          lastIndex *
            SCROLL_PER_CARD_VH +
          FINAL_HOLD_VH
        )
      : 1;

  /*
   * One progress slice per transition.
   */
  const step =
    lastIndex > 0
      ? travelEnd /
        lastIndex
      : 1;

  const {
    scrollYProgress,
  } = useScroll({
    target: containerRef,
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

  /*
   * Change interactive card only when scroll moves
   * into another frame.
   */
  useMotionValueEvent(
    smoothProgress,
    "change",
    (latest) => {
      if (
        !Number.isFinite(
          latest,
        ) ||
        lastIndex === 0
      ) {
        return;
      }

      const next =
        Math.min(
          lastIndex,
          Math.max(
            0,
            Math.round(
              latest / step,
            ),
          ),
        );

      setActiveAnimationIndex(
        (current) =>
          current === next
            ? current
            : next,
      );
    },
  );

  if (totalCards === 0) {
    return null;
  }

  const resolvedHeading =
    heading?.trim() ||
    "What we really do?";

  /*
   * Accessibility override only.
   *
   * This does NOT depend on viewport width.
   * Mobile still gets animation unless the user has
   * explicitly enabled reduced-motion in the OS.
   */
  if (prefersReducedMotion) {
    return (
      <ReducedMotionServices
        services={cmsServices}
        heading={resolvedHeading}
        eyebrow={eyebrow}
      />
    );
  }

  return (
    <>
      <div
        ref={containerRef}
        className="
          services-3d-scroll
          relative
          block
          w-full
          bg-black
        "
        style={{
          height:
            `${trackHeightVh}svh`,
        }}
      >
        {/* ====================================================
            STICKY VIEWPORT
            ==================================================== */}

        <div
          className="
            services-3d-sticky
            sticky
            top-0
            h-[100svh]
            w-full
            touch-pan-y
            overflow-hidden
            bg-black
          "
          style={{
            perspective:
              `${motionConfig.perspective}px`,

            perspectiveOrigin:
              "50% 50%",
          }}
        >
          {eyebrow?.trim() ? (
            <span className="sr-only">
              {eyebrow.trim()}
            </span>
          ) : null}

          {/* ==================================================
              BACKGROUND HEADING
              ================================================== */}

          <ServicesHeading
            heading={
              resolvedHeading
            }
          />

          {/* ==================================================
              3D STAGE
              ================================================== */}

          <div
            className="
              services-3d-stage
              relative
              h-full
              w-full
            "
          >
            {animationServices.map(
              (
                item,
                animationIndex,
              ) => (
                <Service3DCard
                  key={
                    item.service._id
                  }
                  item={item}
                  animationIndex={
                    animationIndex
                  }
                  progress={
                    smoothProgress
                  }
                  isActive={
                    activeAnimationIndex ===
                    animationIndex
                  }
                  totalCards={
                    totalCards
                  }
                  lastIndex={
                    lastIndex
                  }
                  step={step}
                  motionConfig={
                    motionConfig
                  }
                />
              ),
            )}
          </div>
        </div>
      </div>

      {/* ======================================================
          COMPONENT-SCOPED CSS
          ====================================================== */}

      <style>{`
        /* =====================================================
           3D ENVIRONMENT
           ===================================================== */

        .services-3d-sticky {
          isolation: isolate;
        }

        .services-3d-stage,
        .service-3d-card-shell,
        .service-3d-card {
          transform-style: preserve-3d;
        }

        .service-3d-card {
          transform-origin: 50% 0%;
          will-change: transform, opacity;

          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }

        /* =====================================================
           MOBILE

           The front card sits lower so the complete stack can
           rise behind it.

           Width almost fills the screen while leaving a clean
           outer gutter.
           ===================================================== */

        .service-3d-card-shell {
          top: 64%;

          width: calc(
            100vw - 1.25rem
          );

          max-width: 30rem;

          height: clamp(
            23rem,
            68svh,
            34rem
          );
        }

        /* =====================================================
           VERY SMALL PHONES
           ===================================================== */

        @media (max-width: 389px) {
          .service-3d-card-shell {
            top: 64.5%;

            width: calc(
              100vw - 1rem
            );

            height: clamp(
              22rem,
              67svh,
              31rem
            );
          }
        }

        /* =====================================================
           TALL MOBILE DEVICES
           ===================================================== */

        @media
          (max-width: 639px)
          and (min-height: 760px) {

          .service-3d-card-shell {
            top: 64%;

            height: min(
              66svh,
              35rem
            );
          }
        }

        /* =====================================================
           TABLET
           ===================================================== */

        @media (min-width: 640px) {
          .service-3d-card-shell {
            top: 65%;

            width: min(
              88vw,
              44rem
            );

            max-width: none;

            height: min(
              61svh,
              38rem
            );
          }
        }

        /* =====================================================
           DESKTOP / LAPTOP

           Restores your original desktop geometry.
           ===================================================== */

        @media (min-width: 1024px) {
          .service-3d-card-shell {
            top: 68%;

            width: min(
              88vw,
              72rem
            );

            height: clamp(
              19rem,
              39svh,
              30rem
            );
          }
        }

        /* =====================================================
           SHORT LAPTOP

           1366×768 etc.
           ===================================================== */

        @media
          (min-width: 1024px)
          and (max-height: 800px) {

          .service-3d-card-shell {
            top: 69%;

            width: min(
              86vw,
              68rem
            );

            height: clamp(
              18rem,
              38svh,
              27rem
            );
          }
        }

        /* =====================================================
           REGULAR LARGE DESKTOP
           ===================================================== */

        @media (min-width: 1501px) {
          .service-3d-card-shell {
            top: 68%;

            width: min(
              88vw,
              80rem
            );

            height: clamp(
              20rem,
              40svh,
              33rem
            );
          }
        }

        /* =====================================================
           VERY LARGE DESKTOP
           ===================================================== */

        @media (min-width: 1800px) {
          .service-3d-card-shell {
            top: 67%;

            width: min(
              82vw,
              82rem
            );

            height: min(
              42svh,
              34rem
            );
          }
        }
      `}</style>
    </>
  );
}