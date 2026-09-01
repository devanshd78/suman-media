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
import { useMemo, useRef, useState } from "react";

import type { CmsFeaturedService } from "@/types/cms";

/* =========================================================
   TYPES
   ========================================================= */

type ServicesScrollGalleryProps = {
  eyebrow?: string | null;
  heading?: string | null;
  services: CmsFeaturedService[];
};

type GalleryService = {
  service: CmsFeaturedService;
  number: number;
};

/* =========================================================
   EXACT MOTION SYSTEM FROM YOUR REFERENCE CODE
   ========================================================= */

const PERSPECTIVE_PX = 2000;

/*
 * Distance between one frame and the next in Z-space.
 *
 * IMPORTANT:
 * All cards remain absolutely positioned in the same place.
 * The apparent staircase comes from:
 *
 * negative Z
 * +
 * perspective
 * +
 * Y derived from Z
 */
const CARD_SPACING_PX = 470;

/*
 * EXACT cascade relationship from your animation.
 *
 * Card further in Z:
 * also moves upward.
 *
 * This creates:
 *
 *             01
 *           ┌────┐
 *         ┌──02──┐
 *       ┌────03────┐
 *     ┌─────04──────┐
 *   ┌──────05────────┐
 * ┌────────06──────────┐
 * ┌──────────07────────────┐
 * ┌────────────08──────────────┐
 */
const CASCADE_SLOPE = 0.34;

/*
 * Card flies THROUGH the camera.
 */
const FLY_PAST_Z_PX = Math.round(
  PERSPECTIVE_PX * 1.05,
);

/*
 * Exact dramatic rotation from the reference.
 */
const SWING_DEG = 70;

const SCROLL_PER_CARD_VH = 60;

const FINAL_HOLD_VH = 18;

/*
 * Same spring characteristics as your uploaded code.
 */
const SCROLL_SPRING = {
  stiffness: 500,
  damping: 60,
  mass: 1,
  restDelta: 0.0001,
  restSpeed: 0.0001,
} as const;

/* =========================================================
   CARD COLORS

   ORIGINAL UI IS PRESERVED.

   01 = orange
   02 = purple
   03 = yellow
   04 = green
   05 = blue
   06 = lime
   07 = cyan
   08 = pink
   ========================================================= */

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

/* =========================================================
   UTILS
   ========================================================= */

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
    return ["What we", "really do?"];
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
    words.slice(0, middle).join(" "),
    words.slice(middle).join(" "),
  ];
}

/* =========================================================
   LARGE HEADING

   KEEPING THE PLACEMENT YOU LIKED.
   ========================================================= */

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
        top-[3.5rem]
        z-0
        flex
        w-full
        -translate-x-1/2
        flex-col
        items-center
        text-center
        text-[clamp(4rem,10vw,9rem)]
        font-semibold
        leading-[0.82]
        tracking-[-0.065em]
        text-white
        sm:top-[4rem]
        lg:top-[4.5rem]
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

/* =========================================================
   ACTIVE CARD CONTENT

   UI PRESERVED:
   - number top-left
   - content bottom-left
   - image right
   - white CTA
   ========================================================= */

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
  const { service, number } = item;

  const numberLabel = String(
    number,
  ).padStart(2, "0");

  const title =
    service.title?.trim() ||
    `Service ${numberLabel}`;

  const description =
    service.shortDescription?.trim() ||
    "";

  const slug =
    service.slug?.trim() || "";

  /*
   * Yellow / lime cards require dark ink.
   */
  const darkInk =
    number === 3 ||
    number === 4 ||
    number === 6;

  const foreground = darkInk
    ? "#111111"
    : "#FFFFFF";

  return (
    <div
      className="
        relative
        grid
        h-full
        w-full
        grid-cols-[54%_46%]
        overflow-hidden
      "
    >
      {/* ===================================================
          LEFT COPY
          =================================================== */}

      <motion.div
        className="
          relative
          z-10
          flex
          min-w-0
          flex-col
          p-[clamp(1.5rem,3vw,3.25rem)]
        "
        style={{
          opacity: detailsOpacity,
          color: foreground,
        }}
      >
        <span
          className="
            block
            text-[clamp(1.8rem,2.5vw,2.75rem)]
            font-semibold
            leading-none
            tracking-[-0.045em]
          "
        >
          {numberLabel}
        </span>

        <div
          className="
            mt-auto
            max-w-[31rem]
          "
        >
          <h3
            className="
              text-[clamp(1.45rem,2.1vw,2.35rem)]
              font-semibold
              leading-[1.08]
              tracking-[-0.04em]
            "
          >
            {title}
          </h3>

          {description ? (
            <p
              className="
                mt-4
                max-w-[29rem]
                text-[clamp(0.68rem,0.82vw,0.84rem)]
                font-normal
                leading-[1.5]
                opacity-80
              "
            >
              {description}
            </p>
          ) : null}

          {slug ? (
            <Link
              href={`/services/${slug}`}
              tabIndex={
                interactive ? 0 : -1
              }
              className="
                mt-6
                inline-flex
                w-fit
                items-center
                gap-2
                rounded-[0.18rem]
                bg-white
                px-4
                py-3
                text-[0.7rem]
                font-semibold
                leading-4
                text-black
                transition-transform
                duration-200
                hover:-translate-y-[2px]
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-white
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

      {/* ===================================================
          IMAGE
          =================================================== */}

      <div
        className="
          relative
          h-full
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

/* =========================================================
   ONE 3D FRAME

   THIS IS THE IMPORTANT PART.

   This animation mechanism is now the same as the code
   you sent.

   INITIAL:

   service 08:
   z = 0

   service 07:
   z = -470

   service 06:
   z = -940

   ...

   service 01:
   z = -3290


   SCROLL:

   08:
   0 → +2100
   then gone

   07:
   -470 → 0 → +2100

   06:
   -940 → 0 → +2100

   etc.
   ========================================================= */

function Service3DCard({
  item,
  animationIndex,
  progress,
  isActive,
  totalCards,
  lastIndex,
  step,
}: {
  item: GalleryService;
  animationIndex: number;
  progress: MotionValue<number>;
  isActive: boolean;
  totalCards: number;
  lastIndex: number;
  step: number;
}) {
  /*
   * animationIndex:
   *
   * 0 = service 08
   * 1 = service 07
   * ...
   * 7 = service 01
   */

  const isFirst =
    animationIndex === 0;

  const isLast =
    animationIndex === lastIndex;

  const sliceStart =
    animationIndex * step;

  const sliceEnd =
    (animationIndex + 1) *
    step;

  /*
   * EXACT initial depth.
   */
  const restZ =
    -animationIndex *
    CARD_SPACING_PX;

  /* =======================================================
     Z MOTION

     IMPORTANT:

     Outside this frame's slice,
     its Z DOES NOT CHANGE.

     Therefore only the current frame moves.
     ======================================================= */

  const z = useTransform(
    progress,

    isFirst
      ? [0, sliceEnd]
      : isLast
        ? [0, sliceStart]
        : [
            0,
            sliceStart,
            sliceEnd,
          ],

    isFirst
      ? [
          0,
          FLY_PAST_Z_PX,
        ]
      : isLast
        ? [
            restZ,
            0,
          ]
        : [
            restZ,
            0,
            FLY_PAST_Z_PX,
          ],
  );

  /* =======================================================
     ROTATE X

     Same 70° fly-away movement from your reference.

     Last service 01 does not fly out.
     ======================================================= */

  const rotateX = useTransform(
    progress,
    [
      sliceStart,
      sliceEnd,
    ],
    isLast
      ? [0, 0]
      : [0, SWING_DEG],
  );

  /* =======================================================
     CASCADE

     EXACT mechanism:

     y = z * 0.34
     ======================================================= */

  const y = useTransform(
    z,
    (value) =>
      value * CASCADE_SLOPE,
  );

  /* =======================================================
     OPACITY

     DIFFERENCE FROM YOUR PASTED SAMPLE:

     I AM KEEPING ALL 8 CARDS VISIBLE AT THE START,
     because your chosen UI requires the entire staircase
     to be visible immediately.

     They only fade once they fly through the camera.
     ======================================================= */

  const opacity = useTransform(
    z,
    [
      FLY_PAST_Z_PX * 0.62,
      FLY_PAST_Z_PX,
    ],
    [1, 0],
  );

  /* =======================================================
     DETAILS

     Back frames only show:
     - color
     - image slice

     The title/description/button only become visible
     when a card reaches the front.

     This avoids the ugly overlapping text from the
     previous implementations.
     ======================================================= */

  const detailsOpacity =
    useTransform(
      z,
      [
        -210,
        0,
        FLY_PAST_Z_PX * 0.42,
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

/* =========================================================
   MOBILE / TABLET

   No huge 3D sticky animation.

   This remains intentionally simpler.
   ========================================================= */

function StaticServices({
  services,
}: {
  services: GalleryService[];
}) {
  return (
    <div
      className="
        services-static-list
        flex
        w-full
        flex-col
        gap-5
        bg-black
        px-5
        py-12

        sm:px-8

        lg:hidden
      "
    >
      {services.map((item) => {
        const { service, number } =
          item;

        const color =
          SERVICE_COLORS[
            (number - 1) %
              SERVICE_COLORS.length
          ];

        const darkInk =
          number === 3 ||
          number === 4 ||
          number === 6;

        return (
          <article
            key={service._id}
            className="
              overflow-hidden
              rounded-[0.3rem]
              shadow-[0_1rem_3rem_rgba(0,0,0,0.25)]
            "
            style={{
              backgroundColor: color,
            }}
          >
            <div
              className="
                grid
                grid-cols-1
                md:grid-cols-[54%_46%]
              "
            >
              <div
                className="
                  flex
                  min-h-[21rem]
                  flex-col
                  p-6
                  sm:p-8
                  md:min-h-[28rem]
                "
                style={{
                  color: darkInk
                    ? "#111"
                    : "#fff",
                }}
              >
                <span
                  className="
                    text-2xl
                    font-semibold
                  "
                >
                  {String(
                    number,
                  ).padStart(2, "0")}
                </span>

                <div
                  className="
                    mt-auto
                    flex
                    flex-col
                    gap-3
                  "
                >
                  <h3
                    className="
                      text-2xl
                      font-semibold
                      leading-tight
                    "
                  >
                    {service.title}
                  </h3>

                  <p
                    className="
                      text-sm
                      leading-6
                      opacity-80
                    "
                  >
                    {
                      service.shortDescription
                    }
                  </p>

                  {service.slug ? (
                    <Link
                      href={`/services/${service.slug}`}
                      className="
                        inline-flex
                        w-fit
                        items-center
                        gap-2
                        rounded-[3px]
                        bg-white
                        px-4
                        py-3
                        text-sm
                        font-semibold
                        text-black
                      "
                    >
                      <span>
                        Explore Capabilities
                      </span>

                      <ArrowRightIcon />
                    </Link>
                  ) : null}
                </div>
              </div>

              <div
                className="
                  relative
                  min-h-[20rem]
                  bg-black/10
                  md:min-h-[28rem]
                "
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
                    sizes="100vw"
                    className="
                      object-cover
                    "
                  />
                ) : null}
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}

/* =========================================================
   MAIN
   ========================================================= */

export function ServicesScrollGallery({
  eyebrow,
  heading,
  services,
}: ServicesScrollGalleryProps) {
  const containerRef =
    useRef<HTMLDivElement>(null);

  const prefersReducedMotion =
    useReducedMotion() ?? false;

  /*
   * CMS order:
   *
   * 01
   * 02
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
   * ANIMATION ORDER MUST BE:
   *
   * 08
   * 07
   * 06
   * 05
   * 04
   * 03
   * 02
   * 01
   *
   * because 08 starts in front.
   */
  const animationServices =
    useMemo(
      () =>
        [...cmsServices].reverse(),
      [cmsServices],
    );

  const totalCards =
    animationServices.length;

  const lastIndex = Math.max(
    0,
    totalCards - 1,
  );

  /*
   * 0 = 08 active
   * 1 = 07 active
   * ...
   */
  const [
    activeAnimationIndex,
    setActiveAnimationIndex,
  ] = useState(0);

  const trackHeightVh =
    100 +
    lastIndex *
      SCROLL_PER_CARD_VH +
    FINAL_HOLD_VH;

  /*
   * Leave FINAL_HOLD_VH untouched after
   * service 01 reaches the foreground.
   */
  const travelEnd =
    lastIndex > 0
      ? (lastIndex *
          SCROLL_PER_CARD_VH) /
        (lastIndex *
          SCROLL_PER_CARD_VH +
          FINAL_HOLD_VH)
      : 1;

  const step =
    lastIndex > 0
      ? travelEnd / lastIndex
      : 1;

  const { scrollYProgress } =
    useScroll({
      target: containerRef,
      offset: [
        "start start",
        "end end",
      ],
    });

  /*
   * EXACT spring system from the code you sent.
   */
  const smoothProgress =
    useSpring(
      scrollYProgress,
      SCROLL_SPRING,
    );

  /* =======================================================
     ACTIVE FRAME

     State updates ONLY when crossing to another card.

     It does not update continuously every scroll pixel.
     ======================================================= */

  useMotionValueEvent(
    smoothProgress,
    "change",
    (latest) => {
      if (
        !Number.isFinite(latest) ||
        lastIndex === 0
      ) {
        return;
      }

      const next = Math.min(
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

  return (
    <>
      {/* ===================================================
          MOBILE
          =================================================== */}

      <StaticServices
        services={cmsServices}
      />

      {/* ===================================================
          DESKTOP
          =================================================== */}

      <div
        ref={containerRef}
        className="
          services-3d-scroll
          relative
          hidden
          w-full
          bg-black
          lg:block
        "
        style={{
          height: prefersReducedMotion
            ? "100svh"
            : `${trackHeightVh}svh`,
        }}
      >
        {/* =================================================
            STICKY VIEWPORT
            ================================================= */}

        <div
          className="
            services-3d-sticky
            sticky
            top-0
            h-[100svh]
            w-full
            overflow-hidden
            bg-black
          "
        >
          {eyebrow?.trim() ? (
            <span className="sr-only">
              {eyebrow.trim()}
            </span>
          ) : null}

          {/* ===============================================
              HEADING

              SAME UI / SAME PLACEMENT
              =============================================== */}

          <ServicesHeading
            heading={
              resolvedHeading
            }
          />

          {/* ===============================================
              3D STAGE
              =============================================== */}

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
                />
              ),
            )}
          </div>
        </div>
      </div>

      {/* ===================================================
          COMPONENT-SCOPED CSS
          =================================================== */}

      <style>{`
        /* =================================================
           REAL PERSPECTIVE

           EXACTLY THE SAME PRINCIPLE AS YOUR SENT CODE.
           ================================================= */

        .services-3d-sticky {
          perspective: ${PERSPECTIVE_PX}px;
          perspective-origin: 50% 50%;
          isolation: isolate;
        }

        .services-3d-stage,
        .service-3d-card-shell,
        .service-3d-card {
          transform-style: preserve-3d;
        }

        /* =================================================
           CARD PLACEMENT

           Front card stays lower in the viewport,
           allowing the complete 01 → 08 staircase
           to appear above it.

           Heading remains behind the stack.
           ================================================= */

        .service-3d-card-shell {
          top: 68%;
          width: min(88vw, 80rem);
          height: clamp(20rem, 40svh, 33rem);
        }

        .service-3d-card {
          transform-origin: 50% 0%;
          will-change: transform, opacity;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }

        /* =================================================
           1366 / 1440 LAPTOPS
           ================================================= */

        @media
          (min-width: 1024px)
          and (max-width: 1500px) {

          .service-3d-card-shell {
            top: 68%;
            width: min(88vw, 72rem);
            height: clamp(
              19rem,
              39svh,
              30rem
            );
          }
        }

        /* =================================================
           SHORT LAPTOPS

           1366×768 etc.
           ================================================= */

        @media
          (min-width: 1024px)
          and (max-height: 800px) {

          .service-3d-card-shell {
            top: 69%;
            width: min(86vw, 68rem);
            height: clamp(
              18rem,
              38svh,
              27rem
            );
          }
        }

        /* =================================================
           LARGE DESKTOP
           ================================================= */

        @media (min-width: 1800px) {
          .service-3d-card-shell {
            top: 67%;
            width: min(82vw, 82rem);
            height: min(
              42svh,
              34rem
            );
          }
        }

        /* =================================================
           REDUCED MOTION
           ================================================= */

        @media (
          prefers-reduced-motion:
          reduce
        ) {
          .services-3d-scroll {
            display: none !important;
          }

          .services-static-list {
            display: flex !important;
          }
        }
      `}</style>
    </>
  );
}
