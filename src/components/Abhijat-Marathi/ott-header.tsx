import Link from "next/link";

type OttHeaderProps = {
  learnMoreHref?: string;
  joinNowHref?: string;
};

type OttImage = {
  src: string;
  left: string;
  zIndex: number;
  center?: boolean;
};

const OTT_IMAGES = [
  {
    src: "/images/ott/image1.png",
    left: "0rem",
    top: "9rem",      // 144px
    zIndex: 10,
    center: false,
  },
  {
    src: "/images/ott/image2.png",
    left: "12.5rem", // 200px
    top: "6rem",     // 96px
    zIndex: 20,
    center: false,
  },
  {
    src: "/images/ott/image3.png",
    left: "25rem",   // 400px
    top: "3rem",     // 48px
    zIndex: 30,
    center: false,
  },
  {
    src: "/images/ott/image4.png",
    left: "37.5rem", // 600px
    top: "0rem",
    zIndex: 40,
    center: true,
  },
  {
    src: "/images/ott/image5.png",
    left: "50rem",   // 800px
    top: "3rem",     // 48px
    zIndex: 30,
    center: false,
  },
  {
    src: "/images/ott/image6.png",
    left: "62.5rem", // 1000px
    top: "6rem",     // 96px
    zIndex: 20,
    center: false,
  },
  {
    src: "/images/ott/image7.png",
    left: "75rem",   // 1200px
    top: "9rem",     // 144px
    zIndex: 10,
    center: false,
  },
] as const;

function ChevronRight() {
  return (
    <svg
      aria-hidden="true"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
    >
      <path
        d="M7.5 5L12.5 10L7.5 15"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function OttHeader({
  learnMoreHref = "#",
  joinNowHref = "#",
}: OttHeaderProps) {
  return (
    <section
      aria-labelledby="ott-header-title"
      className="
        relative
        w-full
        overflow-hidden
        bg-[#111111]
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

          px-5
          py-16
          gap-12

          md:px-8
          md:py-20
          md:gap-16

          xl:h-[56rem]
          xl:px-[3.5rem]
          xl:py-[6.25rem]
          xl:gap-[6.25rem]
        "
      >
        {/* =========================================================
            TEXT WRAPPER
        ========================================================= */}
        <div className="w-full shrink-0">
          {/* Category */}
          <p
            className="
              w-full
              max-w-[75.625rem]

              text-[0.875rem]
              font-semibold
              leading-[1.25rem]
              text-white
            "
            style={{
              fontFamily:
                'var(--Font-family-Heading, "Plus Jakarta Sans")',
              fontFeatureSettings: "'liga' off, 'clig' off",
            }}
          >
            OTT, DIGITAL PLATFORM &amp; STREAMING
          </p>

          {/* Main heading */}
          <h1
            id="ott-header-title"
            className="
              mt-2
              w-full
              max-w-[58.875rem]

              text-[2.5rem]
              font-semibold
              leading-[2.9rem]
              tracking-[-0.04rem]
              text-white

              md:text-[3rem]
              md:leading-[3.5rem]

              xl:text-[3.5rem]
              xl:leading-[4rem]
              xl:tracking-[-0.0625rem]
            "
            style={{
              fontFamily:
                'var(--Font-family-Heading, "Plus Jakarta Sans")',
              fontFeatureSettings: "'liga' off, 'clig' off",
            }}
          >
            Building Digital Platforms for the
            <br className="hidden xl:block" />
            <span className="xl:hidden"> </span>
            Next Generation of Entertainment
          </h1>

          {/* Description */}
          <p
            className="
              mt-4
              w-full
              max-w-[53.8125rem]

              text-[1rem]
              font-medium
              leading-[1.5rem]
              text-[rgba(255,255,255,0.78)]

              md:text-[1.125rem]
              md:leading-[1.625rem]

              xl:text-[1.25rem]
              xl:leading-[1.75rem]
            "
            style={{
              fontFamily:
                'var(--Font-family-Body, "Plus Jakarta Sans")',
              fontFeatureSettings: "'liga' off, 'clig' off",
            }}
          >
            From Marathi OTT to connected-screen experiences, Suman builds
            and enables digital
            <br className="hidden xl:block" />
            <span className="xl:hidden"> </span>
            platforms that bring content to audiences across devices and
            markets.
          </p>

          {/* Buttons */}
          <div
            className="
              mt-6
              flex
              flex-wrap
              items-center
              gap-4
            "
          >
            {/* Learn more */}
            <Link
              href={learnMoreHref}
              className="
                flex
                h-[3.5rem]
                w-[12.5rem]
                items-center
                justify-center

                rounded-[0.25rem]
                bg-white

                transition-opacity
                duration-200
                hover:opacity-90

                focus-visible:outline
                focus-visible:outline-2
                focus-visible:outline-offset-2
                focus-visible:outline-white
              "
            >
              <span className="flex items-center gap-3">
                <span
                  className="
                    text-center
                    text-[1rem]
                    font-semibold
                    leading-[1.5rem]
                    text-[#8F6C1A]
                  "
                  style={{
                    fontFamily: "var(--Font-family-Body, Inter)",
                    fontFeatureSettings: "'liga' off, 'clig' off",
                  }}
                >
                  Learn more
                </span>

                <span className="text-[#8F6C1A]">
                  <ChevronRight />
                </span>
              </span>
            </Link>

            {/* Join now */}
            <Link
              href={joinNowHref}
              className="
                flex
                h-[3.5rem]
                items-center
                justify-center
                gap-1

                rounded-[0.75rem]
                px-4

                text-white

                transition-colors
                duration-200
                hover:bg-white/[0.06]

                focus-visible:outline
                focus-visible:outline-2
                focus-visible:outline-offset-2
                focus-visible:outline-white
              "
            >
              <span
                className="
                  text-[1rem]
                  font-semibold
                  leading-[1.5rem]
                "
                style={{
                  fontFamily: "var(--Font-family-Body, Inter)",
                  fontFeatureSettings: "'liga' off, 'clig' off",
                }}
              >
                Join now
              </span>

              <ChevronRight />
            </Link>
          </div>
        </div>

        {/* =========================================================
            7-IMAGE OVERLAPPING COLLAGE

            Desktop geometry:

            Card width       = 372px / 23.25rem
            Center height    = 491px / 30.6875rem
            Side height      = 427px / 26.6875rem
            Height diff      = 64px / 4rem
            Horizontal step  = 200px / 12.5rem
            Overlap          = 172px / 10.75rem

            Total width:
            372 + (6 × 200) = 1572px = 98.25rem
        ========================================================= */}
        {/* =========================================================
    OTT IMAGE STACK
========================================================= */}
        <div
          className="
    relative
    w-full
    shrink-0
    overflow-visible

    h-[20rem]
    md:h-[25rem]
    xl:h-[30.6875rem]
  "
          aria-hidden="true"
        >
          <div
            className="
      absolute
      left-1/2
      top-0

      h-[35.6875rem]
      w-[98.25rem]

      origin-top
      -translate-x-1/2

      scale-[0.55]
      md:scale-[0.78]
      xl:scale-100
    "
          >
            {OTT_IMAGES.map((image) => {
              const isCenter = image.center;

              return (
                <div
                  key={image.src}
                  className="
            absolute
            w-[23.25rem]
            overflow-hidden
            rounded-[1rem]
          "
                  style={{
                    left: image.left,
                    top: image.top,
                    zIndex: image.zIndex,

                    height: isCenter
                      ? "30.6875rem"
                      : "26.6875rem",

                    backgroundImage: `url("${image.src}")`,

                    backgroundRepeat: "no-repeat",

                    backgroundPosition: isCenter
                      ? "-0.289px -29.077px"
                      : "50% 50%",

                    backgroundSize: isCenter
                      ? "100% 107.152%"
                      : "cover",

                    boxShadow:
                      "16px 0 16px 0 rgba(0, 0, 0, 0.20), -16px 0 20px 0 rgba(0, 0, 0, 0.20)",
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
