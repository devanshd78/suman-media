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

  /*
   * Change only these paths if your other four card
   * filenames are different.
   */
  smartTv: "/images/ott/smart-tv.png",
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
          fontFeatureSettings: "'liga' off, 'clig' off",
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
          fontFeatureSettings: "'liga' off, 'clig' off",
        }}
      >
        {description}
      </p>
    </div>
  );
}

/* =========================================================
   GENERIC LOOPING ARTWORK

   Used by the four non-mobile cards.
========================================================= */

type AnimationDirection =
  | "up"
  | "left"
  | "right";

type LoopingArtworkProps = {
  src: string;
  direction: AnimationDirection;
  reducedMotion: boolean;
  backgroundSize?: string;
  backgroundPosition?: string;
  distance?: number;
};

function LoopingArtwork({
  src,
  direction,
  reducedMotion,
  backgroundSize = "contain",
  backgroundPosition = "center bottom",
  distance = 120,
}: LoopingArtworkProps) {
  const animation =
    direction === "up"
      ? {
        y: reducedMotion
          ? 0
          : [distance, 0, distance],
      }
      : direction === "left"
        ? {
          x: reducedMotion
            ? 0
            : [distance, 0, distance],
        }
        : {
          x: reducedMotion
            ? 0
            : [-distance, 0, -distance],
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
            times: [0, 0.92, 1],
            ease: "easeOut",
            repeat: Infinity,
            repeatType: "loop",
          }
      }
      className="absolute inset-0"
      style={{
        backgroundImage: `url("${src}")`,
        backgroundRepeat: "no-repeat",
        backgroundPosition,
        backgroundSize,
        willChange: "transform",
      }}
    />
  );
}

/* =========================================================
   MOBILE APPLICATION PHONE

   Figma outer phone:
   width  = 20.48256rem
   height = 42.47088rem

   IMPORTANT STACK ORDER:

   50 dynamic island
   40 time/status
   30 logo
   20 purple header
   10 OTT app screen
    0 physical frame
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
          y: reducedMotion ? 0 : [145, 0, 145],
        }}
        transition={
          reducedMotion
            ? { duration: 0 }
            : {
              duration: 2,
              times: [0, 0.92, 1],
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
        {/* =====================================================
            PHONE / METALLIC FRAME

            Keep this BEHIND all UI.

            Do NOT use mix-blend-mode here.
            We need the actual silver border from the PNG.
        ====================================================== */}
        <div
          className="
            pointer-events-none
            absolute
            inset-0
            z-0
          "
          style={{
            backgroundImage:
              'url("/images/ott/mobile/mobile.png")',

            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "100% 100%",
          }}
        />


        {/* =====================================================
            APPLICATION SCREEN

            Starts below the custom purple header.
        ====================================================== */}
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
                'url("/images/ott/mobile/onphone-image.png")',

              backgroundRepeat: "no-repeat",

              backgroundPosition:
                "-32.592px -142.443px",

              backgroundSize:
                "122.162% 135.631%",
            }}
          />
        </div>


        {/* =====================================================
            PURPLE HEADER

            IMPORTANT:
            The top is intentionally inset.

            This exposes the metallic silver frame above
            and on both sides, matching the Figma reference.

            Figma dimensions:
            19.96181rem × 4.23431rem
        ====================================================== */}
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


        {/* =====================================================
            SMALL INNER EDGE

            Gives the top of the phone the thin reflective
            edge visible in the Figma mockup.
        ====================================================== */}
        <div
          className="
            pointer-events-none
            absolute
            left-1/2
            top-[0.16rem]
            z-[21]

            h-[4.40rem]
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


        {/* =====================================================
            STATUS BAR / TIME

            Move together with the purple header.

            Exact Figma dimensions:
            19.693rem × 2.62125rem
        ====================================================== */}
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
              'url("/images/ott/mobile/time.png")',

            backgroundRepeat: "no-repeat",

            backgroundPosition:
              "-2.576px 0.235px",

            backgroundSize:
              "99.194% 1699.074%",
          }}
        />


        {/* =====================================================
            CENTER OTT LOGO

            Figma values:
            x = 144.502px
            y = 30.717px

            width ≈ 30.4px
            height ≈ 31px

            Header starts at 0.27rem.
            30.717px ≈ 1.92rem.

            Final top ≈ 2.19rem.
        ====================================================== */}
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
              'url("/images/ott/mobile/center-logo.png")',

            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "contain",
          }}
        />


        {/* =====================================================
            BOTTOM EDGE OF PURPLE HEADER

            Very subtle separation before application navigation.
        ====================================================== */}
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
   ENTERTAINMENT SECTION
========================================================= */

export default function Entertainment() {
  const reducedMotion =
    Boolean(useReducedMotion());

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
            SECTION TITLE

            Figma:
            max-width 51.125rem
            font-size 2.5rem
            line-height 3rem
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
            CARDS WRAPPER
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
              FIRST ROW

              Desktop:
              available = 1328px
              gap       = 32px
              card      = 648px each
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
                reducedMotion={reducedMotion}
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

              <div
                className="
                  absolute
                  inset-x-0
                  bottom-0

                  h-[24rem]

                  overflow-hidden
                "
              >
                <LoopingArtwork
                  src={ASSETS.smartTv}
                  direction="right"
                  reducedMotion={reducedMotion}
                  backgroundSize="contain"
                  backgroundPosition="center bottom"
                  distance={110}
                />
              </div>
            </article>
          </div>

          {/* =================================================
              SECOND ROW
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
                  src={ASSETS.connectedTv}
                  direction="right"
                  reducedMotion={reducedMotion}
                  backgroundSize="contain"
                  backgroundPosition="center bottom"
                  distance={90}
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
                  src={ASSETS.contentAggregation}
                  direction="left"
                  reducedMotion={reducedMotion}
                  backgroundSize="contain"
                  backgroundPosition="center bottom"
                  distance={90}
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
                  src={ASSETS.subscriptionManagement}
                  direction="up"
                  reducedMotion={reducedMotion}
                  backgroundSize="contain"
                  backgroundPosition="center bottom"
                  distance={100}
                />
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}