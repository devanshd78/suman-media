"use client";

import { TextReveal } from "@/components/ui/scroll-text-reveal";
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
        <TextReveal>
        {title}
        </TextReveal>
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
        <TextReveal>
        {description}
        </TextReveal>
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
        initial={
          reducedMotion
            ? false
            : {
                y: 180,
                opacity: 0,
              }
        }
        whileInView={
          reducedMotion
            ? undefined
            : {
                y: 0,
                opacity: 1,
              }
        }
        viewport={{
          once: true,
          amount: 0.25,
        }}
        transition={{
          duration: 1.65,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="
          relative

          h-[42.47088rem]
          w-[20.48256rem]
        "
        style={{
          willChange: "transform, opacity",

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
          initial={
            reducedMotion
              ? false
              : {
                  x: -220,
                  opacity: 0,
                }
          }
          whileInView={
            reducedMotion
              ? undefined
              : {
                  x: 0,
                  opacity: 1,
                }
          }
          viewport={{
            once: true,
            amount: 0.2,
          }}
          transition={{
            duration: 1.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            relative
            h-full
            w-full
          "
          style={{
            willChange:
              "transform, opacity",
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
   CONNECTED TV ARTWORK
========================================================= */

function ConnectedTvArtwork({
  reducedMotion,
}: {
  reducedMotion: boolean;
}) {
  const leftVariants = {
    hidden: {
      x: -145,
    },
    visible: {
      x: 0,
      transition: {
        duration: 2.25,
        delay: 0.05,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    },
  };

  const rightVariants = {
    hidden: {
      x: 145,
    },
    visible: {
      x: 0,
      transition: {
        duration: 2.25,
        delay: 0.12,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <div
      className="
        absolute
        inset-x-0
        bottom-0

        h-[24.5rem]

        overflow-hidden
      "
    >
      {/*
        IMPORTANT:
        The viewport trigger lives on this shared parent, not on each
        moving child. This guarantees that the right artwork animates
        even though it starts translated outside its final position.
      */}
      <motion.div
        initial={reducedMotion ? false : "hidden"}
        whileInView={reducedMotion ? undefined : "visible"}
        viewport={{
          once: true,
          amount: 0.12,
        }}
        className="
          absolute
          left-1/2
          top-0

          h-full
          w-[27.82806rem]
          max-w-none

          -translate-x-1/2
        "
      >
        {/* ===================================================
            LEFT: CROPPED television-setup.png

            Only the left television composition is shown.
            The source remains at the supplied Figma dimensions.
        ==================================================== */}
        <motion.div
          variants={reducedMotion ? undefined : leftVariants}
          className="
            absolute
            left-0
            top-[5.2rem]

            h-[13.88581rem]
            w-[13.6rem]

            overflow-hidden
          "
          style={{
            willChange: "transform",
          }}
        >
          <div
            className="
              pointer-events-none
              absolute
              left-[-5.85rem]
              top-0

              h-[13.88581rem]
              w-[25.01169rem]
            "
            style={{
              backgroundImage:
                `url("${ASSETS.television.setup}")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "0.16px 0.318px",
              backgroundSize: "100% 84.857%",
            }}
          />

          {/* television-image.png inside the visible TV screen */}
          <div
            className="
              absolute
              left-[0.17rem]
              top-[1.44rem]
              z-20

              h-[6.09rem]
              w-[12.93rem]

              overflow-hidden
              bg-black
            "
          >
            <div
              className="absolute"
              style={{
                left: "-1.64rem",
                top: "-1.86rem",
                width: "15.98rem",
                height: "12.02rem",
                backgroundImage:
                  `url("${ASSETS.television.screen}")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center center",
                backgroundSize: "100% 100%",
              }}
            />
          </div>

          <div
            className="
              pointer-events-none
              absolute
              left-[0.03rem]
              top-[1.30rem]
              z-30

              h-[6.37rem]
              w-[13.21rem]
            "
            style={{
              boxShadow:
                "inset 0 0 0 0.10rem rgba(0,0,0,0.92)",
            }}
          />
        </motion.div>
        <motion.div
          variants={reducedMotion ? undefined : rightVariants}
          className="
            absolute
            right-[3rem]
            top-[0.70rem]

            h-[14.8816rem]
            w-[7.25rem]

            shrink-0
            overflow-hidden
          "
          style={{
            aspectRatio: "19 / 39",
            willChange: "transform",
          }}
          aria-hidden="true"
        >
          <img
            src={ASSETS.connectedTv}
            alt=""
            draggable={false}
            className="
              pointer-events-none
              absolute
              top-0

              h-full
              max-w-none
              select-none
            "
            style={{
              left: "-67.5px",
              width: "205.229%",
            }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}

/* =========================================================
   CONTENT AGGREGATION
========================================================= */

const CONTENT_IMAGES = [
  "/images/ott/image1.png",
  "/images/ott/image2.png",
  "/images/ott/image3.png",
  "/images/ott/image4.png",
  "/images/ott/image5.png",
  "/images/ott/image6.png",
  "/images/ott/image7.png",
] as const;

const CONTENT_ROWS = [
  [0, 1, 2, 3, 4, 5, 6],
  [3, 4, 5, 6, 0, 1, 2],
  [6, 0, 1, 2, 3, 4, 5],
] as const;

const CONTENT_ROW_OFFSETS = [
  "-2.8rem",
  "0.2rem",
  "-1.55rem",
] as const;

type ContentTileMotion = {
  fromLeft: boolean;
  rowIndex: number;
  itemIndex: number;
};

const contentTileVariants = {
  hidden: ({
    fromLeft,
    rowIndex,
  }: ContentTileMotion) => ({
    x: fromLeft ? -105 : 105,
    y: rowIndex === 1 ? 18 : -12,
    scale: 0.9,
    opacity: 0,
  }),

  show: ({
    rowIndex,
    itemIndex,
  }: ContentTileMotion) => ({
    x: 0,
    y: 0,
    scale: 1,
    opacity: 1,
    transition: {
      duration: 1.15,
      delay:
        rowIndex * 0.14 +
        itemIndex * 0.075,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

function ContentAggregationArtwork({
  reducedMotion,
}: {
  reducedMotion: boolean;
}) {
  return (
    <motion.div
      initial={reducedMotion ? false : "hidden"}
      whileInView={reducedMotion ? undefined : "show"}
      viewport={{
        once: true,
        amount: 0.22,
        margin: "0px 0px -5% 0px",
      }}
      className="
        absolute
        bottom-0
        left-1/2

        flex
        h-[24.5rem]
        w-[27.82806rem]
        max-w-none
        -translate-x-1/2
        flex-col
        items-start
        justify-center

        gap-[1.41619rem]

        overflow-hidden

        bg-white

        py-[2.33669rem]
      "
    >
      {CONTENT_ROWS.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className="
            flex
            w-max
            shrink-0
            items-center
            gap-[1.41619rem]
          "
          style={{
            marginLeft:
              CONTENT_ROW_OFFSETS[rowIndex],
          }}
        >
          {row.map((imageIndex, itemIndex) => {
            const fromLeft =
              (rowIndex + itemIndex) % 2 === 0;

            return (
              <motion.div
                key={`${rowIndex}-${itemIndex}`}
                custom={{
                  fromLeft,
                  rowIndex,
                  itemIndex,
                }}
                variants={
                  contentTileVariants
                }
                className="
                  relative

                  h-[5.66475rem]
                  w-[5.66475rem]
                  shrink-0

                  overflow-hidden

                  rounded-[1.27456rem]

                  bg-[#D9D9D9]
                "
                style={{
                  backgroundImage:
                    `url("${CONTENT_IMAGES[imageIndex]}")`,
                  backgroundRepeat:
                    "no-repeat",
                  backgroundPosition:
                    "center center",
                  backgroundSize:
                    "cover",
                }}
              />
            );
          })}
        </div>
      ))}
    </motion.div>
  );
}

/* =========================================================
   SUBSCRIPTION MANAGEMENT
========================================================= */

const SUBSCRIPTION_AVATARS = [
  "/images/ott/image1.png",
  "/images/ott/image2.png",
  "/images/ott/image3.png",
  "/images/ott/image4.png",
  "/images/ott/image5.png",
] as const;

const WATCH_BARS = [
  26, 18, 20, 18, 21, 31, 27, 23,
  18, 28, 22, 25, 29, 31, 39, 46,
  56, 49, 64, 42, 96, 52, 43, 36,
  48, 67, 48, 51, 46, 50, 38, 44,
  37, 34, 33, 34, 33, 29, 25, 34,
  22, 27, 42, 25, 37, 17, 29, 20,
] as const;

const subscriptionAvatarVariants = {
  hidden: {
    x: 8,
    scale: 0.75,
    opacity: 0,
  },
  show: (index: number) => ({
    x: 0,
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.72,
      delay: 1.06 + index * 0.075,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

const watchBarVariants = {
  hidden: {
    scaleY: 0,
    opacity: 0.55,
  },
  show: (index: number) => ({
    scaleY: 1,
    opacity: 1,
    transition: {
      duration: 0.78,
      delay: 0.34 + index * 0.018,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

function HeadphonesIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-4 w-4"
      fill="none"
    >
      <path
        d="M4 13V11a8 8 0 0 1 16 0v2"
        stroke="#8F6C1A"
        strokeWidth="1.8"
        strokeLinecap="round"
      />

      <path
        d="M4 13.5c0-1.1.9-2 2-2h1v6H6a2 2 0 0 1-2-2v-2Z"
        stroke="#8F6C1A"
        strokeWidth="1.8"
      />

      <path
        d="M20 13.5c0-1.1-.9-2-2-2h-1v6h1a2 2 0 0 0 2-2v-2Z"
        stroke="#8F6C1A"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function ExternalLinkIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      aria-hidden="true"
      className="
        h-[0.875rem]
        w-[0.875rem]
      "
      fill="none"
    >
      <path
        d="M11.5 3.5H16.5V8.5"
        stroke="rgba(0,9,51,0.45)"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M16.25 3.75L9.25 10.75"
        stroke="rgba(0,9,51,0.45)"
        strokeWidth="1.25"
        strokeLinecap="round"
      />

      <path
        d="M15 11V15C15 15.5523 14.5523 16 14 16H5C4.44772 16 4 15.5523 4 15V6C4 5.44772 4.44772 5 5 5H9"
        stroke="rgba(0,9,51,0.45)"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ActiveSubscriptionsCard({
  reducedMotion,
}: {
  reducedMotion: boolean;
}) {
  return (
    <motion.div
      initial={
        reducedMotion
          ? false
          : {
              y: 72,
              scale: 0.96,
              opacity: 0,
            }
      }
      whileInView={
        reducedMotion
          ? undefined
          : {
              y: 0,
              scale: 1,
              opacity: 1,
            }
      }
      viewport={{
        once: true,
        amount: 0.25,
      }}
      transition={{
        duration: 1.25,
        delay: 0.95,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="
        flex
        h-[7.25rem]
        w-[19.375rem]
        max-w-full
        flex-col
        items-center

        rounded-[0.5rem]
        border-[5px]
        border-white/10
        bg-[#F9F9F9]

        p-[0.625rem]

        backdrop-blur-[2px]
      "
      style={{
        willChange:
          "transform, opacity",
      }}
    >
      <div
        className="
          flex
          w-full
          items-start
          justify-between
        "
      >
        <div
          className="
            flex
            h-[2rem]
            w-[2rem]
            shrink-0
            items-center
            justify-center

            rounded-[0.5rem]
            border
            border-[rgba(0,17,102,0.10)]
            bg-white
          "
        >
          <HeadphonesIcon />
        </div>

        <motion.div
          initial={reducedMotion ? false : "hidden"}
          whileInView={reducedMotion ? undefined : "show"}
          viewport={{
            once: true,
            amount: 0.5,
          }}
          className="
            flex
            items-center
            pt-[0.1rem]
          "
        >
          {SUBSCRIPTION_AVATARS.map(
            (src, index) => (
              <motion.div
                key={src}
                custom={index}
                variants={
                  subscriptionAvatarVariants
                }
                className={`
                  relative

                  h-4
                  w-4
                  shrink-0

                  overflow-hidden

                  rounded-[1.5rem]
                  border
                  border-white

                  ${
                    index === 0
                      ? ""
                      : "-ml-[0.24rem]"
                  }
                `}
              >
                <img
                  src={src}
                  alt=""
                  className="
                    h-full
                    w-full
                    object-cover
                  "
                  draggable={false}
                />
              </motion.div>
            ),
          )}
        </motion.div>
      </div>

      <div
        className="
          mt-auto
          w-full
        "
      >
        <p
          className="
            text-[0.875rem]
            font-medium
            leading-[1.25rem]

            text-black
          "
          style={{
            fontFamily:
              'var(--Font-family-Body, "Inter")',

            fontFeatureSettings:
              "'liga' off, 'clig' off",
          }}
        >
          Active Subscriptions
        </p>

        <p
          className="
            line-clamp-1
            w-full

            overflow-hidden
            text-ellipsis

            text-[0.5rem]
            font-normal
            leading-[1.25rem]

            text-[rgba(0,9,51,0.65)]
          "
          style={{
            fontFamily:
              'var(--Font-family-Body, "Inter")',

            fontFeatureSettings:
              "'liga' off, 'clig' off",
          }}
        >
          1000+ active subscription across the Asian region.
        </p>
      </div>
    </motion.div>
  );
}

function TotalWatchViewsCard({
  reducedMotion,
}: {
  reducedMotion: boolean;
}) {
  return (
    <motion.div
      initial={
        reducedMotion
          ? false
          : {
              y: 115,
              scale: 0.97,
              opacity: 0,
            }
      }
      whileInView={
        reducedMotion
          ? undefined
          : {
              y: 0,
              scale: 1,
              opacity: 1,
            }
      }
      viewport={{
        once: true,
        amount: 0.2,
      }}
      transition={{
        duration: 1.25,
        delay: 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="
        flex
        h-[11.75rem]
        w-[19.375rem]
        max-w-full
        flex-col
        items-center
        justify-between

        rounded-[0.5rem]
        border-[5px]
        border-white/10
        bg-[#F9F9F9]

        p-[0.625rem]

        backdrop-blur-[2px]
      "
      style={{
        willChange:
          "transform, opacity",
      }}
    >
      <div
        className="
          flex
          w-full
          items-start
          justify-between
        "
      >
        <div>
          <p
            className="
              text-[0.5rem]
              font-normal
              leading-[0.75rem]

              text-[rgba(0,9,51,0.65)]
            "
            style={{
              fontFamily:
                'var(--Font-family-Body, "Inter")',

              fontFeatureSettings:
                "'liga' off, 'clig' off",
            }}
          >
            Totals watch views
          </p>

          <p
            className="
              text-[0.875rem]
              font-medium
              leading-[1.25rem]

              text-black
            "
            style={{
              fontFamily:
                'var(--Font-family-Body, "Inter")',

              fontFeatureSettings:
                "'liga' off, 'clig' off",
            }}
          >
            2,100,151,80
          </p>
        </div>

        <ExternalLinkIcon />
      </div>

      <motion.div
        initial={reducedMotion ? false : "hidden"}
        whileInView={reducedMotion ? undefined : "show"}
        viewport={{
          once: true,
          amount: 0.4,
        }}
        className="
          flex
          h-[6.375rem]
          w-full
          shrink-0

          items-end
          justify-center

          gap-[0.25rem]

          overflow-hidden
        "
      >
        {WATCH_BARS.map(
          (height, index) => (
            <motion.span
              key={index}
              custom={index}
              variants={
                watchBarVariants
              }
              className="
                block
                w-[0.125rem]
                shrink-0
                origin-bottom

                bg-[#8F6C1A]
              "
              style={{
                height: `${height}%`,
                willChange:
                  "transform, opacity",
              }}
            />
          ),
        )}
      </motion.div>
    </motion.div>
  );
}

function SubscriptionManagementArtwork({
  reducedMotion,
}: {
  reducedMotion: boolean;
}) {
  return (
    <div
      className="
        absolute
        inset-x-0
        bottom-0

        flex
        h-[24.5rem]
        flex-col
        items-center
        justify-end

        gap-[0.75rem]

        overflow-hidden

        pb-[1.25rem]
      "
    >
      <ActiveSubscriptionsCard
        reducedMotion={reducedMotion}
      />

      <TotalWatchViewsCard
        reducedMotion={reducedMotion}
      />
    </div>
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
          <TextReveal>
          Entertainment from library to living room.
          </TextReveal>
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

              <ConnectedTvArtwork
                reducedMotion={
                  reducedMotion
                }
              />
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

              <ContentAggregationArtwork
                reducedMotion={
                  reducedMotion
                }
              />
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

              <SubscriptionManagementArtwork
                reducedMotion={
                  reducedMotion
                }
              />
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}