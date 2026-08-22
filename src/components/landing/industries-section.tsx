"use client";

import Link from "next/link";
import { Exo_2 } from "next/font/google";
import {
  useEffect,
  useRef,
  type ReactNode,
} from "react";

const exo2 = Exo_2({
  subsets: ["latin"],
  weight: ["600"],
});

const CARD_WIDTH = 27.625 * 16;

/* ------------------------------------------------ */
/* ARROWS                                           */
/* ------------------------------------------------ */

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

function ArrowLeftIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className="h-4 w-4"
      fill="none"
    >
      <path
        d="M16 10H5M9 6l-4 4 4 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ------------------------------------------------ */
/* 01 — ENTERTAINMENT                               */
/* 7 NESTED SQUARES                                 */
/* Hover: 360° anti-clockwise                       */
/* ------------------------------------------------ */

function EntertainmentArtwork() {
  const squares = [
    {
      x: 39,
      y: 39,
      size: 256,
    },
    {
      x: 57,
      y: 57,
      size: 220,
    },
    {
      x: 75,
      y: 75,
      size: 184,
    },
    {
      x: 93,
      y: 93,
      size: 148,
    },
    {
      x: 111,
      y: 111,
      size: 112,
    },
    {
      x: 129,
      y: 129,
      size: 76,
    },
    {
      x: 147,
      y: 147,
      size: 40,
    },
  ];

  return (
    <div
      className="
        flex
        h-[82%]
        w-[82%]
        items-center
        justify-center

        origin-center
        transform-gpu

        transition-transform
        duration-[1100ms]
        ease-in-out

        group-hover:-rotate-[180deg]
      "
    >
      <svg
        viewBox="0 0 334 334"
        aria-hidden="true"
        className="h-full w-full"
        fill="none"
      >
        <defs>
          <linearGradient
            id="entertainment-line"
            x1="35"
            y1="35"
            x2="300"
            y2="300"
            gradientUnits="userSpaceOnUse"
          >
            <stop
              offset="0"
              stopColor="white"
              stopOpacity="1"
            />

            <stop
              offset="0.55"
              stopColor="white"
              stopOpacity="0.92"
            />

            <stop
              offset="1"
              stopColor="white"
              stopOpacity="0.55"
            />
          </linearGradient>
        </defs>

        {squares.map((square) => (
          <rect
            key={square.size}
            x={square.x}
            y={square.y}
            width={square.size}
            height={square.size}
            stroke="url(#entertainment-line)"
            strokeWidth="4"
          />
        ))}
      </svg>
    </div>
  );
}   

/* ------------------------------------------------ */
/* 02 — ENTERPRISES                                 */
/* Hover: 90° clockwise                             */
/* ------------------------------------------------ */

function EnterpriseArtwork() {
  return (
    <div
      className="
        flex
        h-[20.1rem]
        w-[17.27281rem]
        max-h-[80%]
        max-w-[72%]
        items-center
        justify-center

        origin-center
        transform-gpu

        transition-transform
        duration-500
        ease-in-out

        group-hover:rotate-90
      "
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 322 277"
        className="h-full w-full"
        fill="none"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="
            M321.6 140.673
            L241.19 276.365
            L90.4102 276.365
            L0 140.75
            L80.4286 0
            L241.216 0
            L321.6 140.673

            Z

            M157.298 4.93509
            H235.532
            L204.511 59.2211
            H125.308
            L157.298 4.93509

            Z

            M151.569 4.93509
            H83.2926
            L52.272 59.2211
            H119.579
            L151.569 4.93509

            Z

            M116.671 64.1562
            H49.4519
            L7.15115 138.183
            H73.0485
            L116.671 64.1562

            Z

            M73.0747 143.118
            H7.50976
            L55.2157 214.677
            H116.805
            L73.0747 143.118

            Z

            M122.589 214.677
            L78.8583 143.118
            H159.416
            L201.599 214.301
            L201.373 214.677
            H122.589

            Z

            M119.821 219.612
            H58.5057
            L93.0514 271.43
            H151.488
            L119.821 219.612

            Z

            M157.271 271.43
            L125.605 219.612
            H204.168
            L204.458 219.127
            L235.453 271.43
            H157.271

            Z

            M78.7768 138.183
            L122.399 64.1562
            H201.691
            L159.39 138.183
            H78.7768

            Z

            M205.59 67.2791
            L163.677 140.628
            L204.485 209.491
            L246.674 139.175
            L205.59 67.2791

            Z

            M249.482 144.088
            L207.345 214.317
            L239.784 269.058
            L281.075 199.378
            L249.482 144.088

            Z

            M283.969 194.495
            L252.393 139.236
            L284.509 85.7098
            L315.89 140.628
            L283.969 194.495

            Z

            M281.701 80.7968
            L249.585 134.323
            L208.432 62.3056
            L239.784 7.44105
            L281.701 80.7968

            Z
          "
          fill="url(#enterprise-gradient)"
        />

        <defs>
          <linearGradient
            id="enterprise-gradient"
            x1="13.5734"
            y1="219.612"
            x2="162.222"
            y2="345.006"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="white" />

            <stop
              offset="1"
              stopColor="white"
              stopOpacity="0"
            />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

/* ------------------------------------------------ */
/* 03 — BRANDS                                      */
/* 7 POLYGON RINGS                                  */
/* Hover: 90° clockwise                             */
/* ------------------------------------------------ */

function BrandArtwork() {
  const polygons = [
    "170,130 198,140 213,166 207,194 185,213 155,213 133,194 128,166 142,140",
    "170,108 212,123 234,161 226,205 192,234 148,234 114,205 106,161 128,123",
    "170,86 225,107 255,158 245,216 200,254 140,254 95,216 85,158 115,107",
    "170,65 239,90 276,154 263,227 207,274 133,274 77,227 64,154 101,90",
    "170,43 253,73 298,150 282,237 214,294 126,294 58,237 43,150 87,73",
    "170,22 267,57 319,146 301,248 222,315 118,315 39,248 21,146 73,57",
    "170,3 281,40 338,143 319,259 229,333 111,333 21,259 2,143 59,40",
  ];

  return (
    <div
      className="
        flex
        h-[20.9375rem]
        w-[21.25rem]
        max-h-[82%]
        max-w-[80%]
        items-center
        justify-center

        origin-center
        transform-gpu

        transition-transform
        duration-500
        ease-in-out

        group-hover:rotate-90
      "
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 340 335"
        className="h-full w-full"
        fill="none"
      >
        <defs>
          <linearGradient
            id="brand-gradient"
            x1="208"
            y1="313.5"
            x2="371.041"
            y2="172.285"
            gradientUnits="userSpaceOnUse"
          >
            <stop
              stopColor="white"
              stopOpacity="0"
            />

            <stop
              offset="1"
              stopColor="white"
            />
          </linearGradient>
        </defs>

        {polygons.map((points) => (
          <polygon
            key={points}
            points={points}
            stroke="url(#brand-gradient)"
            strokeWidth="5"
          />
        ))}
      </svg>
    </div>
  );
}

/* ------------------------------------------------ */
/* INDUSTRY CARD                                    */
/* ------------------------------------------------ */

type IndustryCardProps = {
  number: string;
  title: string;
  className: string;
  children: ReactNode;
};

function IndustryCard({
  number,
  title,
  className,
  children,
}: IndustryCardProps) {
  return (
    <article
      className="
        w-[min(27.625rem,85vw)]
        shrink-0
        bg-white
      "
    >
      {/* Image / artwork area */}
      <div
        className={`
          group
          relative
          flex
          aspect-square
          w-full
          items-center
          justify-center
          overflow-hidden

          ${className}
        `}
      >
        {/* Card number */}
        <span
          className="
            absolute
            left-5
            top-5
            z-20

            text-sm
            font-medium
            leading-5
            text-[rgba(0,9,51,0.65)]
          "
        >
          {number}
        </span>

        {/* Blurred white Figma layer */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-[12%]

            bg-white/20

            blur-[49.95px]
          "
        />

        {/* Artwork */}
        <div
          className="
            relative
            z-10

            flex
            h-full
            w-full

            items-center
            justify-center
          "
        >
          {children}
        </div>
      </div>

      {/* Bottom card title */}
      <div
        className="
          flex
          min-h-[4.25rem]
          items-center

          px-5
        "
      >
        <h3
          className="
            text-base
            font-semibold
            leading-6
            text-black
          "
        >
          {title}
        </h3>
      </div>
    </article>
  );
}

/* ------------------------------------------------ */
/* MAIN SECTION                                     */
/* ------------------------------------------------ */

export function IndustriesSection() {
  const cardsRef =
    useRef<HTMLDivElement>(null);

  const scrollCards = (
    direction: "left" | "right",
  ) => {
    const element = cardsRef.current;

    if (!element) {
      return;
    }

    element.scrollBy({
      left:
        direction === "right"
          ? CARD_WIDTH
          : -CARD_WIDTH,

      behavior: "smooth",
    });
  };

  /*
   * Mouse wheel moves horizontally through the cards; once
   * the track reaches either end, normal vertical page
   * scrolling continues.
   *
   * Attached natively (not via React's onWheel) because
   * React registers wheel listeners as passive, which makes
   * preventDefault a silent no-op — the page would scroll
   * vertically at the same time.
   */
  useEffect(() => {
    const element = cardsRef.current;

    if (!element) {
      return;
    }

    const handleWheel = (event: globalThis.WheelEvent) => {
      const maximumScroll =
        element.scrollWidth - element.clientWidth;

      if (maximumScroll <= 2) {
        return;
      }

      const scrollingForward = event.deltaY > 0;
      const scrollingBackward = event.deltaY < 0;

      const canMoveForward =
        element.scrollLeft < maximumScroll - 2;

      const canMoveBackward = element.scrollLeft > 2;

      const shouldCapture =
        (scrollingForward && canMoveForward) ||
        (scrollingBackward && canMoveBackward);

      if (!shouldCapture) {
        return;
      }

      event.preventDefault();

      element.scrollLeft += event.deltaY;
    };

    element.addEventListener("wheel", handleWheel, {
      passive: false,
    });

    return () =>
      element.removeEventListener("wheel", handleWheel);
  }, []);

  return (
    <section
      id="industries"
      aria-labelledby="industries-heading"
      className="
        mx-auto
        flex
        w-full
        max-w-[90rem]
        flex-col
        items-center

        bg-white

        px-5
        pb-10
        pt-16

        sm:px-8

        lg:px-[3.5rem]
        lg:pb-[3.5rem]
        lg:pt-[6.25rem]
      "
    >
      {/* ----------------------------------------- */}
      {/* HEADING                                   */}
      {/* ----------------------------------------- */}

      <div
        className="
          flex
          w-full
          flex-col
          items-start
          justify-between

          gap-8

          lg:flex-row
          lg:items-center
          lg:gap-12
        "
      >
        {/* Left side */}
        <div
          className="
            flex
            w-full
            flex-col

            gap-6

            lg:w-[16.75rem]
            lg:shrink-0
          "
        >
          <p
            className="
              text-[0.625rem]
              font-semibold
              uppercase
              leading-[0.875rem]
              tracking-[-0.00625rem]

              text-[rgba(0,9,51,0.65)]
            "
          >
            Industries we work with
          </p>

          <h2
            id="industries-heading"
            className={`
              ${exo2.className}

              text-[2rem]
              font-semibold
              leading-[2.5rem]
              tracking-[-0.03125rem]

              text-black

              lg:text-[2.5rem]
              lg:leading-[3rem]
            `}
            style={{
              fontFeatureSettings:
                '"liga" off, "clig" off',
            }}
          >
            The Industries
            <br />
            we work with?
          </h2>
        </div>

        {/* Right side */}
        <div
          className="
            flex
            w-full
            flex-col
            items-start

            lg:w-[31.4375rem]
            lg:shrink-0
          "
        >
          <p
            className="
              text-base
              font-normal
              leading-6

              text-[rgba(0,9,51,0.65)]
            "
            style={{
              fontFeatureSettings:
                '"liga" off, "clig" off',
            }}
          >
            Entertainment, culture, public service and
            enterprise each connect with audiences in
            their own way. We bring the same integrated
            media capabilities to every one of them,
            shaped to the formats, platforms and
            partnerships each industry runs on.
          </p>

          <Link
            href="/services"
            className="
              mt-4

              inline-flex
              items-center
              justify-center
              gap-2

              rounded-lg
              p-4

              text-center
              text-sm
              font-semibold
              leading-5

              text-[#8F6C1A]

              transition-opacity
              duration-200

              hover:opacity-60
            "
          >
            <span>
              Explore Capabilities
            </span>

            <ArrowRightIcon />
          </Link>
        </div>
      </div>

      {/* ----------------------------------------- */}
      {/* CARDS                                     */}
      {/* ----------------------------------------- */}

      <div
        className="
          mt-[6.25rem]
          w-full
          overflow-hidden
        "
      >
        <div
          ref={cardsRef}
          className="
            industries-track

            flex
            w-full

            overflow-x-auto
            overflow-y-hidden

            scroll-smooth
            overscroll-x-contain
          "
        >
          {/* ------------------------------------- */}
          {/* 01 — ENTERTAINMENT                    */}
          {/* ------------------------------------- */}

          <IndustryCard
            number="01"
            title="Entertainment"
            className="
              bg-[radial-gradient(circle_at_92%_8%,rgba(40,208,237,0.98)_0%,rgba(40,208,237,0)_42%),radial-gradient(circle_at_0%_94%,rgba(255,177,69,0.96)_0%,rgba(255,177,69,0)_45%),linear-gradient(138deg,#8C79DC_0%,#FF82B4_56%,#51CBE5_100%)]
            "
          >
            <EntertainmentArtwork />
          </IndustryCard>

          {/* ------------------------------------- */}
          {/* 02 — ENTERPRISES                      */}
          {/* ------------------------------------- */}

          <IndustryCard
            number="02"
            title="Enterprises"
            className="
              bg-[radial-gradient(circle_at_87%_90%,rgba(250,183,129,0.95)_0%,rgba(250,183,129,0)_45%),radial-gradient(circle_at_4%_3%,rgba(105,105,209,0.72)_0%,rgba(105,105,209,0)_48%),linear-gradient(140deg,#7A70C8_0%,#EC83C0_48%,#F7AF83_100%)]
            "
          >
            <EnterpriseArtwork />
          </IndustryCard>

          {/* ------------------------------------- */}
          {/* 03 — BRANDS                           */}
          {/* ------------------------------------- */}

          <IndustryCard
            number="03"
            title="Brands"
            className="
              bg-[radial-gradient(circle_at_4%_95%,rgba(250,196,86,1)_0%,rgba(250,196,86,0)_43%),radial-gradient(circle_at_98%_100%,rgba(127,154,239,0.94)_0%,rgba(127,154,239,0)_42%),linear-gradient(140deg,#FF4A69_3%,#FF6B82_45%,#FDB24B_100%)]
            "
          >
            <BrandArtwork />
          </IndustryCard>
        </div>
      </div>

      {/* ----------------------------------------- */}
      {/* NAVIGATION                                */}
      {/* ----------------------------------------- */}

      <div
        className="
          mt-5
          flex
          w-full
          justify-end

          gap-2
        "
      >
        <button
          type="button"
          onClick={() =>
            scrollCards("left")
          }
          aria-label="Previous industry"
          className="
            flex
            h-10
            w-10
            items-center
            justify-center

            rounded-lg

            bg-[#FCFAF5]
            text-[#8F6C1A]

            transition-colors
            duration-200

            hover:bg-[#F5EEDC]
          "
        >
          <ArrowLeftIcon />
        </button>

        <button
          type="button"
          onClick={() =>
            scrollCards("right")
          }
          aria-label="Next industry"
          className="
            flex
            h-10
            w-10
            items-center
            justify-center

            rounded-lg

            bg-[#FCFAF5]
            text-[#8F6C1A]

            transition-colors
            duration-200

            hover:bg-[#F5EEDC]
          "
        >
          <ArrowRightIcon />
        </button>
      </div>

      {/* ----------------------------------------- */}
      {/* LOCAL STYLES                              */}
      {/* ----------------------------------------- */}

      <style>{`
        .industries-track {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        .industries-track::-webkit-scrollbar {
          display: none;
        }

        /*
         * Accessibility:
         * users who prefer reduced motion
         * should not get large rotations.
         */
        @media (prefers-reduced-motion: reduce) {
          #industries .group > div,
          #industries .group svg {
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </section>
  );
}