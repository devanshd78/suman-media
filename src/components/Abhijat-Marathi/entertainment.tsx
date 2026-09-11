"use client";

import { motion, useReducedMotion } from "framer-motion";

/* =========================================================
   ASSETS
========================================================= */

const ASSETS = {
  mobile: {
    frame: "/images/ott/mobile/mobile.png",
    time: "/images/ott/mobile/time.png",
    logo: "/images/ott/mobile/center-logo.png",
    screen: "/images/ott/mobile/onphone-image.png",
  },

  television: {
    setup: "/images/ott/television/television-setup.png",
    screen: "/images/ott/television/television-image.png",
  },

  connectedTv: "/images/ott/connected-tv.png",
  contentAggregation: "/images/ott/content-aggregation.png",
  subscriptionManagement: "/images/ott/subscription-management.png",
} as const;

/* =========================================================
   CARD HEADER
========================================================= */

type CardHeaderProps = {
  title: string;
  description: string;
};

function CardHeader({
  title,
  description,
}: CardHeaderProps) {
  return (
    <div
      className="
        relative
        z-50

        flex
        w-full
        flex-col
        items-center

        gap-[0.5rem]

        px-5
        pt-[2.5rem]
      "
    >
      <h3
        className="
          w-full

          text-center

          text-[1.25rem]
          font-semibold
          leading-[1.75rem]

          text-black

          lg:text-[1.5rem]
          lg:leading-[2rem]
        "
        style={{
          fontFamily:
            'var(--Font-family-Heading, "Plus Jakarta Sans")',

          fontFeatureSettings:
            "'liga' off, 'clig' off",
        }}
      >
        {title}
      </h3>

      <p
        className="
          w-full
          max-w-[25.5rem]

          text-center

          text-[0.75rem]
          font-normal
          leading-[1.125rem]

          text-[#969696]

          lg:text-[0.875rem]
          lg:leading-[1.25rem]
        "
        style={{
          fontFamily:
            'var(--Font-family-Body, "Plus Jakarta Sans")',

          fontFeatureSettings:
            "'liga' off, 'clig' off",
        }}
      >
        {description}
      </p>
    </div>
  );
}

/* =========================================================
   MOBILE PHONE
========================================================= */

function MobilePhone({
  reducedMotion,
}: {
  reducedMotion: boolean;
}) {
  return (
    <div
      className="
        absolute

        left-1/2
        top-[10.5rem]
        z-20

        -translate-x-1/2

        origin-top

        scale-[0.72]
        sm:scale-[0.82]
        md:scale-[0.9]
        lg:scale-100
      "
    >
      <motion.div
        initial={false}
        animate={{
          y: reducedMotion
            ? 0
            : [145, 0, 145],
        }}
        transition={
          reducedMotion
            ? {
                duration: 0,
              }
            : {
                duration: 2,

                times: [
                  0,
                  0.92,
                  1,
                ],

                ease: "easeOut",

                repeat: Infinity,

                repeatType: "loop",
              }
        }
        className="
          relative

          h-[42.47088rem]
          w-[20.48256rem]
        "
        style={{
          willChange: "transform",

          filter:
            "drop-shadow(16px 18px 24px rgba(0,0,0,0.16))",
        }}
      >
        {/* =================================================
            PHONE FRAME
        ================================================= */}

        <div
          className="
            pointer-events-none

            absolute
            inset-0
            z-0
          "
          style={{
            backgroundImage:
              `url("${ASSETS.mobile.frame}")`,

            backgroundRepeat:
              "no-repeat",

            backgroundPosition:
              "center",

            backgroundSize:
              "100% 100%",
          }}
        />

        {/* =================================================
            OTT SCREEN
        ================================================= */}

        <div
          className="
            absolute

            left-1/2
            top-[4.42rem]
            z-10

            h-[37.75rem]
            w-[19.55419rem]

            -translate-x-1/2

            overflow-hidden

            rounded-b-[3.32419rem]

            bg-black
          "
        >
          <div
            className="
              absolute
              inset-0
            "
            style={{
              backgroundImage:
                `url("${ASSETS.mobile.screen}")`,

              backgroundRepeat:
                "no-repeat",

              backgroundPosition:
                "-32.592px -142.443px",

              backgroundSize:
                "122.162% 135.631%",
            }}
          />
        </div>

        {/* =================================================
            PURPLE HEADER
        ================================================= */}

        <div
          className="
            absolute

            left-1/2
            top-[0.27rem]
            z-20

            h-[4.23431rem]
            w-[19.96181rem]

            -translate-x-1/2

            overflow-hidden

            rounded-t-[3.36056rem]
          "
          style={{
            background:
              "linear-gradient(182deg, #2A0C3B 44.53%, #000 120.08%)",
          }}
        />

        {/* =================================================
            INNER PHONE EDGE
        ================================================= */}

        <div
          className="
            pointer-events-none

            absolute

            left-1/2
            top-[0.16rem]
            z-[21]

            h-[4.4rem]
            w-[20.17rem]

            -translate-x-1/2

            rounded-t-[3.52rem]

            border-x-[1.5px]
            border-t-[1.5px]
            border-white/50
          "
          style={{
            boxShadow:
              "inset 0 1px 1px rgba(255,255,255,0.45)",
          }}
        />

        {/* =================================================
            STATUS / TIME
        ================================================= */}

        <div
          className="
            pointer-events-none

            absolute

            left-1/2
            top-[0.34rem]
            z-40

            h-[2.62125rem]
            w-[19.693rem]

            -translate-x-1/2
          "
          style={{
            backgroundImage:
              `url("${ASSETS.mobile.time}")`,

            backgroundRepeat:
              "no-repeat",

            backgroundPosition:
              "-2.576px 0.235px",

            backgroundSize:
              "99.194% 1699.074%",
          }}
        />

        {/* =================================================
            CENTER LOGO
        ================================================= */}

        <div
          className="
            pointer-events-none

            absolute

            left-1/2
            top-[2.18rem]
            z-50

            h-[1.94rem]
            w-[1.9rem]

            -translate-x-1/2
          "
          style={{
            backgroundImage:
              `url("${ASSETS.mobile.logo}")`,

            backgroundRepeat:
              "no-repeat",

            backgroundPosition:
              "center",

            backgroundSize:
              "contain",
          }}
        />

        <div
          className="
            pointer-events-none

            absolute

            left-1/2
            top-[4.46rem]
            z-30

            h-px
            w-[19.55rem]

            -translate-x-1/2

            bg-white/[0.05]
          "
        />
      </motion.div>
    </div>
  );
}

/* =========================================================
   SMART TV

   Structure:

   Television hardware        z-10
   OTT screen                 z-20
   Television bezel           z-30

   SCREEN FIGMA SIZE:

   width  = 29.86956rem
   height = 16.58275rem
========================================================= */

function SmartTelevision({
  reducedMotion,
}: {
  reducedMotion: boolean;
}) {
  return (
    <div
      className="
        absolute

        inset-x-0
        top-[6.3rem]
        bottom-0

        z-20

        overflow-hidden
      "
    >
      {/* =================================================
          COMPLETE TELEVISION COMPOSITION
      ================================================= */}

      <div
        className="
          absolute

          left-1/2
          top-0

          h-[33.02857rem]
          w-[57.76474rem]

          origin-top

          -translate-x-1/2

          scale-[0.58]
          sm:scale-[0.72]
          md:scale-[0.82]
          lg:scale-100
        "
      >
        <motion.div
          initial={false}
          animate={{
            x: reducedMotion
              ? 0
              : [
                  -58,
                  -58,
                  0,
                  0,
                  -58,
                ],
          }}
          transition={
            reducedMotion
              ? {
                  duration: 0,
                }
              : {
                  duration: 2,

                  times: [
                    0,
                    0.18,
                    0.76,
                    0.92,
                    1,
                  ],

                  ease: "easeInOut",

                  repeat:
                    Infinity,

                  repeatType:
                    "loop",
                }
          }
          className="
            relative
            h-full
            w-full
          "
          style={{
            willChange:
              "transform",
          }}
        >
          {/* =================================================
              TV + SPEAKERS + SOUNDBAR

              This provides all physical television hardware.
          ================================================= */}

          <div
            className="
              pointer-events-none

              absolute
              inset-0
              z-10
            "
            style={{
              backgroundImage:
                `url("${ASSETS.television.setup}")`,

              backgroundRepeat:
                "no-repeat",

              backgroundPosition:
                "center center",

              backgroundSize:
                "100% 100%",
            }}
          />

          {/* =================================================
              TV SCREEN CONTENT

              Exact Figma:

              width:
              29.86956rem

              height:
              16.58275rem

              Website is placed ONLY inside this rectangle.
          ================================================= */}

          <div
            className="
              absolute

              left-[13.90528rem]
              top-[3.92056rem]

              z-20

              h-[16.58275rem]
              w-[29.86956rem]

              overflow-hidden

              bg-black
            "
          >
            {/* ===============================================
                WEBSITE SCREENSHOT

                television-image.png contains white space.

                We enlarge + offset the source so only the
                actual website UI appears inside television.
            ================================================ */}

            <div
              className="
                absolute

                left-[-3.79rem]
                top-[-4.29rem]

                h-[27.75rem]
                w-[36.91rem]
              "
              style={{
                backgroundImage:
                  `url("${ASSETS.television.screen}")`,

                backgroundRepeat:
                  "no-repeat",

                backgroundPosition:
                  "center center",

                backgroundSize:
                  "100% 100%",
              }}
            />
          </div>

          {/* =================================================
              TV BEZEL

              IMPORTANT FIX

              This is NOT a regular border because a normal
              border would shrink/crop the OTT screen.

              box-shadow with positive spread draws the frame
              OUTSIDE the exact screen dimensions.

              Therefore:

              OTT image remains exactly:
              29.86956rem × 16.58275rem

              AND

              television gets its black physical border.
          ================================================= */}

          <div
            className="
              pointer-events-none

              absolute

              left-[13.90528rem]
              top-[3.92056rem]

              z-30

              h-[16.58275rem]
              w-[29.86956rem]

              rounded-[0.08rem]
            "
            style={{
              boxShadow: `
                0 0 0 0.42rem #090909,
                0 0 0 0.49rem rgba(255,255,255,0.10),
                0 0.45rem 1.2rem rgba(0,0,0,0.22)
              `,
            }}
          />

          {/* =================================================
              INNER BLACK EDGE

              Small inner edge like the reference television.
              It sits over only a few pixels.
          ================================================= */}

          <div
            className="
              pointer-events-none

              absolute

              left-[13.90528rem]
              top-[3.92056rem]

              z-[31]

              h-[16.58275rem]
              w-[29.86956rem]
            "
            style={{
              boxShadow:
                "inset 0 0 0 0.08rem rgba(0,0,0,0.95)",
            }}
          />

          {/* =================================================
              TOP BEZEL HIGHLIGHT

              Gives slight dimensional separation visible
              in your reference.
          ================================================= */}

          <div
            className="
              pointer-events-none

              absolute

              left-[13.48528rem]
              top-[3.50056rem]

              z-[32]

              h-[0.08rem]
              w-[30.70956rem]

              bg-white/[0.10]
            "
          />
        </motion.div>
      </div>
    </div>
  );
}

/* =========================================================
   GENERIC CARD ANIMATION
========================================================= */

type Direction =
  | "up"
  | "left"
  | "right";

type LoopingArtworkProps = {
  src: string;
  direction: Direction;
  reducedMotion: boolean;

  distance?: number;

  backgroundSize?: string;
  backgroundPosition?: string;
};

function LoopingArtwork({
  src,
  direction,
  reducedMotion,

  distance = 100,

  backgroundSize = "contain",
  backgroundPosition = "center bottom",
}: LoopingArtworkProps) {
  const animation =
    direction === "up"
      ? {
          y: reducedMotion
            ? 0
            : [
                distance,
                0,
                distance,
              ],
        }
      : direction === "left"
        ? {
            x: reducedMotion
              ? 0
              : [
                  distance,
                  0,
                  distance,
                ],
          }
        : {
            x: reducedMotion
              ? 0
              : [
                  -distance,
                  0,
                  -distance,
                ],
          };

  return (
    <motion.div
      initial={false}
      animate={animation}
      transition={
        reducedMotion
          ? {
              duration: 0,
            }
          : {
              duration: 2,

              times: [
                0,
                0.92,
                1,
              ],

              ease: "easeOut",

              repeat: Infinity,

              repeatType: "loop",
            }
      }
      className="
        absolute
        inset-0
      "
      style={{
        backgroundImage:
          `url("${src}")`,

        backgroundRepeat:
          "no-repeat",

        backgroundPosition,

        backgroundSize,

        willChange:
          "transform",
      }}
    />
  );
}

/* =========================================================
   ENTERTAINMENT SECTION
========================================================= */

export default function Entertainment() {
  const reducedMotion =
    Boolean(
      useReducedMotion(),
    );

  return (
    <section
      aria-labelledby="entertainment-heading"
      className="
        w-full
        overflow-hidden

        bg-[#F5F1EB]
      "
    >
      <div
        className="
          mx-auto

          flex
          w-full
          max-w-[90rem]
          flex-col
          items-center

          gap-16

          px-5
          py-16

          md:px-8
          md:py-20

          lg:gap-[6.25rem]
          lg:px-[3.5rem]
          lg:py-[6.25rem]
        "
      >
        {/* =================================================
            SECTION HEADING
        ================================================= */}

        <h2
          id="entertainment-heading"
          className="
            w-full
            max-w-[51.125rem]

            text-center

            text-[1.9rem]
            font-bold
            leading-[2.35rem]

            tracking-[-0.03125rem]

            text-black

            md:text-[2.25rem]
            md:leading-[2.75rem]

            lg:text-[2.5rem]
            lg:leading-[3rem]
          "
          style={{
            fontFamily:
              'var(--Font-family-Body, "Plus Jakarta Sans")',

            fontFeatureSettings:
              "'liga' off, 'clig' off",
          }}
        >
          Entertainment from library to living room.
        </h2>

        {/* =================================================
            CARDS
        ================================================= */}

        <div
          className="
            flex
            w-full
            flex-col

            gap-8
          "
        >
          {/* =================================================
              TOP ROW
          ================================================= */}

          <div
            className="
              grid
              w-full

              grid-cols-1

              gap-8

              lg:grid-cols-2
            "
          >
            {/* =================================================
                MOBILE APPLICATIONS
            ================================================= */}

            <article
              className="
                relative

                h-[34.375rem]

                min-w-0

                overflow-hidden

                rounded-[1.25rem]

                bg-white
              "
            >
              <CardHeader
                title="Mobile Applications"
                description="Entertainment experiences designed for mobile audiences."
              />

              <MobilePhone
                reducedMotion={
                  reducedMotion
                }
              />
            </article>

            {/* =================================================
                SMART TV APPLICATIONS
            ================================================= */}

            <article
              className="
                relative

                h-[34.375rem]

                min-w-0

                overflow-hidden

                rounded-[1.25rem]

                bg-white
              "
            >
              <CardHeader
                title="Smart TV Applications"
                description="Large-screen experiences that bring digital entertainment into the living room."
              />

              <SmartTelevision
                reducedMotion={
                  reducedMotion
                }
              />
            </article>
          </div>

          {/* =================================================
              BOTTOM ROW
          ================================================= */}

          <div
            className="
              grid
              w-full

              grid-cols-1

              gap-8

              md:grid-cols-2

              lg:grid-cols-3
            "
          >
            {/* =================================================
                CONNECTED TV
            ================================================= */}

            <article
              className="
                relative

                h-[34.375rem]

                min-w-0

                overflow-hidden

                rounded-[1.25rem]

                bg-white
              "
            >
              <CardHeader
                title="Connected TV (CTV)"
                description="Extending digital content across connected television environments and modern viewing ecosystems."
              />

              <div
                className="
                  absolute

                  inset-x-0
                  bottom-0

                  h-[22.5rem]

                  overflow-hidden
                "
              >
                <LoopingArtwork
                  src={
                    ASSETS.connectedTv
                  }

                  direction="right"

                  reducedMotion={
                    reducedMotion
                  }

                  distance={90}

                  backgroundSize="contain"

                  backgroundPosition="center bottom"
                />
              </div>
            </article>

            {/* =================================================
                CONTENT AGGREGATION
            ================================================= */}

            <article
              className="
                relative

                h-[34.375rem]

                min-w-0

                overflow-hidden

                rounded-[1.25rem]

                bg-white
              "
            >
              <CardHeader
                title="Content Aggregation"
                description="Structuring diverse content libraries for discovery, access, distribution and digital consumption."
              />

              <div
                className="
                  absolute

                  inset-x-0
                  bottom-0

                  h-[22.5rem]

                  overflow-hidden
                "
              >
                <LoopingArtwork
                  src={
                    ASSETS.contentAggregation
                  }

                  direction="left"

                  reducedMotion={
                    reducedMotion
                  }

                  distance={90}

                  backgroundSize="contain"

                  backgroundPosition="center bottom"
                />
              </div>
            </article>

            {/* =================================================
                SUBSCRIPTION MANAGEMENT
            ================================================= */}

            <article
              className="
                relative

                h-[34.375rem]

                min-w-0

                overflow-hidden

                rounded-[1.25rem]

                bg-white

                md:col-span-2

                lg:col-span-1
              "
            >
              <CardHeader
                title="Subscription Management"
                description="Digital subscription experiences designed around access, memberships and audience relationships."
              />

              <div
                className="
                  absolute

                  inset-x-0
                  bottom-0

                  h-[22.5rem]

                  overflow-hidden
                "
              >
                <LoopingArtwork
                  src={
                    ASSETS.subscriptionManagement
                  }

                  direction="up"

                  reducedMotion={
                    reducedMotion
                  }

                  distance={100}

                  backgroundSize="contain"

                  backgroundPosition="center bottom"
                />
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}