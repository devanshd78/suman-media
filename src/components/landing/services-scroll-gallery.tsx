"use client";

import Link from "next/link";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useRef, useState } from "react";

/* =========================================================
   SERVICES
   ========================================================= */

const SERVICES = [
  {
    number: "01",
    title: "Media & Content Production",
    description:
      "Films, web series, OTT originals, documentaries, branded content, corporate films and podcasts built for audiences across platforms.",
    image: "/images/landing/services/Image%202.png",
  },
  {
    number: "02",
    title: "Digital Entertainment & OTT",
    description:
      "Platform strategy, programming, distribution and audience experiences designed for a fast-moving digital entertainment landscape.",
    image: "/images/landing/services/Image%203.png",
  },
  {
    number: "03",
    title: "Music & Audio Experiences",
    description:
      "Original music, sonic identities, audio storytelling and immersive formats that help brands and audiences connect through sound.",
    image: "/images/landing/services/Image%204.png",
  },
  {
    number: "04",
    title: "Brand & Creative Studio",
    description:
      "Campaign systems, visual identities, creative direction and content toolkits shaped to keep communication consistent across every touchpoint.",
    image: "/images/landing/services/Image%205.png",
  },
  {
    number: "05",
    title: "Media Technology & Innovation",
    description:
      "AI-assisted media workflows, product thinking and technology-led experiences that make content creation, discovery and delivery more effective.",
    image: "/images/landing/services/Image%206.png",
  },
  {
    number: "06",
    title: "Live Experiences & Events",
    description:
      "Cultural experiences, launches, live formats and audience activations planned from concept through production, amplification and delivery.",
    image: "/images/landing/services/Image%207.png",
  },
  {
    number: "07",
    title: "Strategic Partnerships & Distribution",
    description:
      "Partnership design, syndication and distribution programs that connect content, creators, platforms and institutions with the right audiences.",
    image: "/images/landing/services/Image%208.png",
  },
  {
    number: "08",
    title: "Government & Institutional Communications",
    description:
      "IEC campaigns, public awareness, tourism, heritage and cultural documentation built for public communication at scale.",
    image: "/images/landing/services/Image%209.png",
  },
] as const;

const TOTAL_CARDS = SERVICES.length;
const LAST_INDEX = TOTAL_CARDS - 1;

/* =========================================================
   3D FLY-THROUGH GEOMETRY

   Based on the Framer University 3D scroll gallery
   (scroll-gallery.learnframer.site). Its choreography,
   taken from its source:

   - perspective on the sticky viewport; cards spaced along
     Z as a visible receding corridor
     (spacing / perspective = 283 / 1200 ≈ 0.235)
   - one continuous scroll-linked translation of the whole
     stack toward the camera
   - per card, in its own slice of the scroll: an extra push
     past the camera plane plus a 70° swing around its TOP
     edge (transform-origin 50% 0%), so it tips over the
     viewer on the way past
   - every scroll effect scrubbed through a spring of
     stiffness 500 / damping 60 / mass 1

   Two deliberate departures from the reference, for large
   content cards instead of its small photo squares:

   - The reference pitches the whole stage rotateX(-12deg),
     which keystones every card ("tilted into the screen" on
     a text card). Here cards stay FLAT and the upward
     cascade comes from an explicit y-offset proportional to
     depth (CASCADE_SLOPE) — same corridor, no keystone.
   - The reference shows its 4 cards with no fading. With 8
     wide cards that reads as a cluttered pyramid, so cards
     deeper than ~2 steps fade out and fade back in as they
     rise through the queue.

   Our cards are ~1.8x larger than the reference's 273px
   squares, so the scene is scaled up while keeping the
   reference's spacing/perspective ratio — that ratio sets
   the per-card shrink (2000/2470 ≈ 0.81 per step, same as
   the reference's 1200/1483).
   ========================================================= */

const PERSPECTIVE_PX = 2000;
const CARD_SPACING_PX = 470;

/*
 * Screen-Y per Z: deeper cards sit higher (the queue rises
 * behind the focused card); a passing card drops below the
 * camera as it flies out. Plays the role of the reference's
 * stage pitch without tilting card faces.
 */
const CASCADE_SLOPE = 0.34;

/*
 * World Z a card reaches at the end of its scroll slice.
 * Slightly past the perspective distance so it crosses the
 * camera plane and is culled — by then the swing has it
 * nearly edge-on, which is what sells the "whoosh past you"
 * exit without a hard pop.
 */
const FLY_PAST_Z_PX = Math.round(PERSPECTIVE_PX * 1.05);

const SWING_DEG = 70;

/*
 * Depth fade, in units of queue position (STEP slices): a
 * card is invisible until it is ~3.8 steps from focus and
 * fully opaque from ~2.2 steps in — so the focused card has
 * two crisp cards and one ghost behind it, instead of all
 * eight stacked as a pyramid. Once opaque a card never
 * fades again (the fly-past stays fully visible).
 */
const FADE_IN_START_STEPS = 3.8;
const FADE_IN_END_STEPS = 2.2;

/*
 * The exact spring the reference scrubs its scroll effects
 * with. damping 60 is above critical (2·√500 ≈ 45) so the
 * glide lags smoothly without bouncing. Rest thresholds are
 * tightened because the defaults (0.01 on a 0..1 progress)
 * would snap the stack by ~30px of Z on settle.
 */
const SCROLL_SPRING = {
  stiffness: 500,
  damping: 60,
  mass: 1,
  restDelta: 0.0001,
  restSpeed: 0.0001,
} as const;

/* =========================================================
   SCROLL TRACK

   60svh of scrolling per card transition (the reference
   spends ~75vh per card), then a short hold with the final
   card resting at focus. The viewport stays sticky the
   whole time, so none of this appears as blank space.
   ========================================================= */

const SCROLL_PER_CARD_VH = 60;
const FINAL_HOLD_VH = 18;

const TRACK_HEIGHT_VH =
  100 + LAST_INDEX * SCROLL_PER_CARD_VH + FINAL_HOLD_VH;

/*
 * Fraction of scrollYProgress spent travelling through the
 * corridor (the remainder is the final hold), and each
 * card's slice of it.
 */
const TRAVEL_END =
  (LAST_INDEX * SCROLL_PER_CARD_VH) /
  (LAST_INDEX * SCROLL_PER_CARD_VH + FINAL_HOLD_VH);

const STEP = TRAVEL_END / LAST_INDEX;

/* =========================================================
   TYPES
   ========================================================= */

type Service = (typeof SERVICES)[number];

type ServiceCardProps = {
  index: number;
  service: Service;
  progress: MotionValue<number>;
  isActive: boolean;
};

/* =========================================================
   ICON
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

/* =========================================================
   CARD UI

   Content stays fully opaque on every card — in the
   reference the corridor is the point: you can see the
   queue of upcoming cards behind the focused one.
   ========================================================= */

function ServiceCardContent({ service }: { service: Service }) {
  return (
    <div
      className="
        service-card-grid
        grid
        h-full
        w-full
        min-w-0
        bg-white
        lg:grid-cols-[54%_46%]
      "
    >
      {/* ===================================================
          LEFT
          =================================================== */}

      <div
        className="
          service-card-copy
          flex
          h-full
          min-w-0
          flex-col
          bg-white
        "
      >
        <span
          className="
            service-card-number
            block
            font-semibold
            leading-none
            tracking-[-0.04em]
            text-black
          "
        >
          {service.number}
        </span>

        <div
          className="
            mt-auto
            flex
            min-w-0
            flex-col
            gap-3
            xl:gap-4
          "
        >
          <h3
            className="
              service-card-title
              max-w-[35rem]
              font-semibold
              leading-[1.12]
              tracking-[-0.03em]
              text-black
            "
          >
            {service.title}
          </h3>

          <p
            className="
              service-card-description
              max-w-[36rem]
              leading-[1.55]
              text-[rgba(0,9,51,0.65)]
            "
          >
            {service.description}
          </p>

          <Link
            href="/services"
            className="
              service-card-button
              mt-1
              inline-flex
              w-fit
              items-center
              gap-2
              py-2
              font-semibold
              text-[#8F6C1A]
              transition-opacity
              hover:opacity-70
            "
          >
            <span>Explore Capabilities</span>
            <ArrowRightIcon />
          </Link>
        </div>
      </div>

      {/* ===================================================
          IMAGE
          =================================================== */}

      <div
        className="
          service-card-image
          relative
          h-full
          min-w-0
          overflow-hidden
          bg-[#f2eee4]
        "
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={service.image}
          alt=""
          draggable={false}
          className="
            absolute
            inset-0
            h-full
            w-full
            select-none
            object-cover
          "
        />
      </div>
    </div>
  );
}

/* =========================================================
   3D CARD

   Everything derives from one spring-smoothed scroll
   progress:

   Z — piecewise linear per card i:

     p = 0            ->  -i · SPACING   (resting in corridor)
     p = i · STEP     ->  0              (at focus)
     p = (i+1) · STEP ->  FLY_PAST_Z     (past the camera)

   The approach segment has the same slope for every card,
   so the corridor advances rigidly (the reference's single
   stack translation); during its own slice a card
   accelerates ahead of the stack (the reference's per-card
   600–900px push).

   Y — CASCADE_SLOPE · z: queued cards rise behind the
   focused one; a passing card drops out below.

   ROTATE X — 0 -> 70° around the top edge across the card's
   slice (the reference's -70° swing; the sign flips because
   its nested rotateY(90/180/90) wrappers mirror the axis).
   framer-motion composes translate before rotate, matching
   the reference's transform order.

   OPACITY — depth fade-in only (see FADE_IN_* above).

   The last card only travels to focus and rests through the
   final hold — this is a mid-page section and should not
   end empty (in the reference every card flies away).
   ========================================================= */

function Service3DCard({
  index,
  service,
  progress,
  isActive,
}: ServiceCardProps) {
  const isFirst = index === 0;
  const isLast = index === LAST_INDEX;

  const sliceStart = index * STEP;
  const sliceEnd = (index + 1) * STEP;
  const restZ = -index * CARD_SPACING_PX;

  const z = useTransform(
    progress,

    isFirst
      ? [0, sliceEnd]
      : isLast
        ? [0, sliceStart]
        : [0, sliceStart, sliceEnd],

    isFirst
      ? [0, FLY_PAST_Z_PX]
      : isLast
        ? [restZ, 0]
        : [restZ, 0, FLY_PAST_Z_PX],
  );

  const rotateX = useTransform(
    progress,
    [sliceStart, sliceEnd],
    isLast ? [0, 0] : [0, SWING_DEG],
  );

  const y = useTransform(z, (v) => v * CASCADE_SLOPE);

  /*
   * z reaches focus (0) at p = i·STEP moving S per STEP, so
   * "k steps from focus" in progress terms is (i − k)·STEP.
   * Inputs may be negative for the first cards — they just
   * clamp to fully opaque.
   */
  const opacity = useTransform(
    progress,
    [
      (index - FADE_IN_START_STEPS) * STEP,
      (index - FADE_IN_END_STEPS) * STEP,
    ],
    [0, 1],
  );

  /*
   * Depth order is static: card i stays nearer than card j
   * for i < j at every scroll position (a passing card is
   * culled before the next card's slice begins), so this
   * z-index always equals true depth order — robust even in
   * browsers that fall back to paint order inside
   * preserve-3d contexts.
   */
  return (
    <div
      className="
        service-3d-card-shell
        absolute
        left-1/2
        top-1/2
        -translate-x-1/2
        -translate-y-1/2
      "
      style={{
        zIndex: TOTAL_CARDS - index,
        pointerEvents: isActive ? "auto" : "none",
      }}
      /* keeps the 7 non-active cards' links out of the tab
         order and the accessibility tree */
      inert={!isActive}
    >
      <motion.article
        style={{ y, z, rotateX, opacity }}
        className="
          service-3d-card
          h-full
          w-full
          overflow-hidden
          border
          border-black/[0.04]
          bg-white
          shadow-[0_1.5rem_5rem_rgba(0,0,0,0.14)]
        "
      >
        <ServiceCardContent service={service} />
      </motion.article>
    </div>
  );
}

/* =========================================================
   MOBILE / TABLET

   Also shown on desktop for prefers-reduced-motion users
   (the 3D gallery is hidden there — see the style block).
   ========================================================= */

function MobileServices() {
  return (
    <div
      className="
        services-static-list
        flex
        w-full
        flex-col
        gap-5
        lg:hidden
      "
    >
      {SERVICES.map((service) => (
        <article
          key={service.number}
          className="
            overflow-hidden
            border
            border-black/[0.04]
            bg-white
            shadow-[0_0.75rem_2rem_rgba(0,0,0,0.07)]
          "
        >
          <div className="grid grid-cols-1">
            <div
              className="
                flex
                min-h-[23rem]
                flex-col
                p-6
              "
            >
              <span
                className="
                  text-2xl
                  font-semibold
                  text-black
                "
              >
                {service.number}
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
                    text-black
                  "
                >
                  {service.title}
                </h3>

                <p
                  className="
                    text-sm
                    leading-6
                    text-[rgba(0,9,51,0.65)]
                  "
                >
                  {service.description}
                </p>

                <Link
                  href="/services"
                  className="
                    inline-flex
                    w-fit
                    items-center
                    gap-2
                    py-2
                    text-sm
                    font-semibold
                    text-[#8F6C1A]
                  "
                >
                  <span>Explore Capabilities</span>

                  <ArrowRightIcon />
                </Link>
              </div>
            </div>

            <div
              className="
                relative
                min-h-[20rem]
              "
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={service.image}
                alt=""
                className="
                  absolute
                  inset-0
                  h-full
                  w-full
                  object-cover
                "
              />
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

/* =========================================================
   MAIN
   ========================================================= */

export function ServicesScrollGallery() {
  const containerRef = useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  /*
   * One spring smooths the raw scroll position; every card
   * transform derives from it, so the scene glides as one
   * rigid corridor the way the reference does.
   */
  const smoothProgress = useSpring(scrollYProgress, SCROLL_SPRING);

  /* =======================================================
     ACTIVE INDEX

     Pointer gating + the progress counter only. The
     animation itself stays fully MotionValue-driven.
     ======================================================= */

  /*
   * Tracks the SMOOTHED value so pointer gating follows what
   * is visually at focus, not where the raw scroll has
   * already jumped ahead. The isFinite guard covers the
   * degenerate rect while the container is display:none
   * (mobile / reduced motion).
   */
  useMotionValueEvent(smoothProgress, "change", (latest) => {
    if (!Number.isFinite(latest)) return;

    const next = Math.min(
      LAST_INDEX,
      Math.max(0, Math.round(latest / STEP)),
    );

    setActiveIndex((current) =>
      current === next ? current : next,
    );
  });

  return (
    <>
      {/* ===================================================
          MOBILE
          =================================================== */}

      <MobileServices />

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
          lg:block
        "
        style={{
          height: `${TRACK_HEIGHT_VH}svh`,
        }}
      >
        {/* =================================================
            STICKY VIEWPORT — the camera
            ================================================= */}

        <div
          className="
            services-3d-sticky
            sticky
            top-0
            h-[100svh]
            w-full
            overflow-hidden
          "
        >
          {/* ===============================================
              STAGE — the corridor
              =============================================== */}

          <div
            className="
              services-3d-stage
              relative
              h-full
              w-full
            "
          >
            {SERVICES.map((service, index) => (
              <Service3DCard
                key={service.number}
                index={index}
                service={service}
                progress={smoothProgress}
                isActive={activeIndex === index}
              />
            ))}
          </div>

          {/* ===============================================
              PROGRESS
              =============================================== */}

          <div
            className="
              pointer-events-none
              absolute
              bottom-8
              left-1/2
              z-[200]
              flex
              -translate-x-1/2
              items-center
              gap-4
            "
          >
            <span
              className="
                text-[0.625rem]
                font-semibold
                uppercase
                tracking-[0.16em]
                text-black/30
              "
            >
              Scroll to explore
            </span>

            <span
              className="
                text-[0.625rem]
                font-semibold
                tabular-nums
                text-black/30
              "
            >
              {String(activeIndex + 1).padStart(2, "0")}
              /
              {String(TOTAL_CARDS).padStart(2, "0")}
            </span>
          </div>
        </div>

        <style>{`

          /* ==================================================
             3D VIEWPORT

             The perspective / spacing pair defines the
             corridor: 470 / 2000 keeps the reference's
             283 / 1200 ratio, so each card behind renders at
             ~81% of the one in front of it. Keep the two
             constants in sync if either changes.
             ================================================== */

          .services-3d-sticky {
            perspective: ${PERSPECTIVE_PX}px;
            perspective-origin: 50% 50%;

            background: white;

            isolation: isolate;
          }


          /* ==================================================
             PRESERVE 3D

             Every layer between the perspective viewport and
             the cards must preserve 3D so the browser depth-
             sorts the corridor (no manual z-index).
             ================================================== */

          .services-3d-stage,
          .service-3d-card-shell,
          .service-3d-card {
            transform-style: preserve-3d;
          }


          /* ==================================================
             CARD SIZE
             ================================================== */

          .service-3d-card-shell {
            width: min(72vw, 68rem);
            height: clamp(25rem, 53svh, 34rem);
          }


          /* ==================================================
             CARD

             Swing pivot on the TOP edge (the reference's
             transform-origin 50% 0%): passing cards tip over
             the viewer instead of spinning in place.
             ================================================== */

          .service-3d-card {
            transform-origin: 50% 0%;

            will-change: transform, opacity;

            backface-visibility: hidden;
            -webkit-backface-visibility: hidden;
          }


          /* ==================================================
             CONTENT
             ================================================== */

          .service-card-copy {
            padding: clamp(2rem, 3vw, 3.5rem);
          }

          .service-card-number {
            font-size: clamp(1.5rem, 2vw, 2.35rem);
          }

          .service-card-title {
            font-size: clamp(1.5rem, 2.15vw, 2.4rem);
          }

          .service-card-description {
            font-size: clamp(0.8rem, 0.9vw, 0.95rem);
          }

          .service-card-button {
            font-size: clamp(0.78rem, 0.85vw, 0.875rem);
          }


          /* ==================================================
             1366 / 1440 DESKTOP
             ================================================== */

          @media (min-width: 1024px) and (max-width: 1500px) {

            .service-3d-card-shell {
              width: min(74vw, 62rem);
              height: clamp(23rem, 51svh, 31rem);
            }
          }


          /* ==================================================
             SHORT SCREEN
             ================================================== */

          @media (min-width: 1024px) and (max-height: 760px) {

            .service-3d-card-shell {
              width: min(72vw, 58rem);
              height: clamp(21rem, 49svh, 27rem);
            }

            .service-card-copy {
              padding: 1.75rem;
            }

            .service-card-title {
              font-size: clamp(1.35rem, 2vw, 2rem);
            }

            .service-card-description {
              font-size: 0.78rem;
            }
          }


          /* ==================================================
             LARGE DESKTOP
             ================================================== */

          @media (min-width: 1800px) {

            .service-3d-card-shell {
              width: min(64vw, 72rem);
              height: min(52svh, 36rem);
            }
          }


          /* ==================================================
             REDUCED MOTION

             Swap the fly-through for the static card list.
             ================================================== */

          @media (prefers-reduced-motion: reduce) {

            .services-3d-scroll {
              display: none !important;
            }

            .services-static-list {
              display: flex !important;
            }
          }

        `}</style>
      </div>
    </>
  );
}
