"use client";

import Image from "@/components/ui/image";
import Link from "next/link";

import {
  inter as buttonFont,
  plusJakartaSans as plusJakarta,
} from "@/lib/fonts";

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";

import {
  useRef,
} from "react";

/* ============================================================
   TYPES
   ============================================================ */

type GalleryImage = {
  src: string;
  alt: string;
  position?: string;
};

type GalleryRowProps = {
  images: GalleryImage[];
  direction: "left" | "right";
  progress: MotionValue<number>;
  zoom: MotionValue<number>;
  decorative?: boolean;
  reduceMotion: boolean;
};

/* ============================================================
   GALLERY DATA
   ============================================================ */

const GALLERY_IMAGES: readonly GalleryImage[] = [
  {
    src: "/images/landing/film/mumbai-gateway.png",
    alt: "Gateway of India and Mumbai harbour at golden hour",
  },
  {
    src: "/images/landing/film/ganesh-festival.png",
    alt: "Ganesh Chaturthi procession with traditional dhol-tasha performers",
  },
  {
    src: "/images/landing/film/lavani-performance.png",
    alt: "Traditional Marathi Lavani performance in a heritage theatre",
  },
  {
    src: "/images/landing/film/marine-drive.png",
    alt: "Mumbai Marine Drive and the Queen's Necklace after monsoon rain",
  },
  {
    src: "/images/landing/hero/Image1.png",
    alt: "Illustrated tribute to Chhatrapati Shivaji Maharaj",
  },
  {
    src: "/images/landing/background2.png",
    alt: "Abhijat Marathi presentation at the Bharat Pavilion",
    position: "center 42%",
  },
];

/*
 * Every row deliberately uses a different order.
 *
 * This avoids the three rows visually appearing like
 * duplicated strips while still reusing the same local assets.
 */
const GALLERY_ROWS: readonly GalleryImage[][] = [
  [...GALLERY_IMAGES],

  [
    GALLERY_IMAGES[3],
    GALLERY_IMAGES[5],
    GALLERY_IMAGES[1],
    GALLERY_IMAGES[4],
    GALLERY_IMAGES[0],
    GALLERY_IMAGES[2],
  ],

  [
    GALLERY_IMAGES[2],
    GALLERY_IMAGES[0],
    GALLERY_IMAGES[4],
    GALLERY_IMAGES[1],
    GALLERY_IMAGES[5],
    GALLERY_IMAGES[3],
  ],
];

/* ============================================================
   ICON
   ============================================================ */

function CaretRightIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="none"
      className="
        h-5
        w-5
        shrink-0
      "
    >
      <path
        d="M7.5 15L12.5 10L7.5 5"
        stroke="currentColor"
        strokeOpacity="0.8"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ============================================================
   GALLERY ROW
   ============================================================ */

function GalleryRow({
  images,
  direction,
  progress,
  zoom,
  decorative = false,
  reduceMotion,
}: GalleryRowProps) {
  /*
   * Opposite rows move in opposite directions.
   *
   * Mobile receives slightly less overall visual travel because
   * percentage movement is relative to this oversized row.
   */
  const x = useTransform(
    progress,
    [0, 1],
    direction === "left"
      ? ["5.5%", "-5.5%"]
      : ["-5.5%", "5.5%"],
  );

  return (
    <div
      className="
        flex
        w-full
        min-w-0
        justify-center
        overflow-visible
      "
    >
      <motion.div
        className="
          flex
          w-max
          shrink-0
          items-center

          gap-3

          sm:gap-4

          md:gap-5

          lg:gap-6
        "
        style={
          reduceMotion
            ? undefined
            : {
                x,
                willChange: "transform",
              }
        }
      >
        {images.map(
          (
            image,
            index,
          ) => (
            <div
              key={`${image.src}-${index}`}
              className="
                relative
                aspect-[155/91]
                w-[76vw]
                shrink-0
                overflow-hidden
                rounded-[0.25rem]
                bg-[#292929]

                sm:w-[65vw]

                md:w-[48vw]

                lg:w-[35vw]
                lg:max-w-[31.9375rem]
              "
            >
              <motion.div
                className="
                  absolute
                  inset-0
                "
                style={
                  reduceMotion
                    ? undefined
                    : {
                        scale: zoom,
                        willChange:
                          "transform",
                      }
                }
              >
                <Image
                  src={image.src}
                  alt={
                    decorative
                      ? ""
                      : image.alt
                  }
                  fill
                  sizes="
                    (max-width: 639px) 76vw,
                    (max-width: 767px) 65vw,
                    (max-width: 1023px) 48vw,
                    31.9375rem
                  "
                  className="
                    select-none
                    object-cover
                  "
                  style={{
                    objectPosition:
                      image.position ??
                      "center",
                  }}
                />
              </motion.div>

              {/* subtle lower image treatment */}
              <div
                aria-hidden="true"
                className="
                  pointer-events-none
                  absolute
                  inset-0
                  bg-[linear-gradient(180deg,transparent_55%,rgba(0,0,0,0.18)_100%)]
                "
              />
            </div>
          ),
        )}
      </motion.div>
    </div>
  );
}

/* ============================================================
   FILM SECTION
   ============================================================ */

export function FilmSection() {
  const sectionRef =
    useRef<HTMLElement>(null);

  const reduceMotion =
    useReducedMotion() ?? false;

  /* ----------------------------------------------------------
     SECTION SCROLL PROGRESS
     ---------------------------------------------------------- */

  const {
    scrollYProgress,
  } = useScroll({
    target: sectionRef,
    offset: [
      "start end",
      "end start",
    ],
  });

  /*
   * Smooth the raw page-scroll value before passing it into
   * the row translation and image scale transforms.
   */
  const smoothProgress =
    useSpring(
      scrollYProgress,
      {
        stiffness: 82,
        damping: 24,
        mass: 0.42,
      },
    );

  /*
   * Images start slightly zoomed and settle to natural scale
   * as this section progresses through the viewport.
   */
  const imageZoom =
    useTransform(
      smoothProgress,
      [0, 0.78],
      [1.24, 1],
    );

  return (
    <section
      ref={sectionRef}
      id="abhijat-marathi-cannes"
      aria-labelledby="abhijat-marathi-cannes-heading"
      className="
        landing-section-transition

        flex
        w-full
        flex-col
        items-center
        overflow-hidden
        bg-[#1A1A1A]

        px-5
        pt-16

        sm:px-8
        sm:pt-20

        lg:px-[3.5rem]
        lg:pt-[6.25rem]
      "
    >
      {/* ======================================================
          CONTENT
          ====================================================== */}

      <div
        className="
          flex
          w-full
          flex-col
          items-start
        "
      >
        {/* ====================================================
            HEADING

            Figma:
            Plus Jakarta Sans
            40px
            600
            48px
            -0.5px
            #F9F9F9
            ==================================================== */}

        <h2
          id="abhijat-marathi-cannes-heading"
          className={`
            ${plusJakarta.className}

            self-stretch

            text-[2rem]
            font-semibold
            leading-[2.5rem]
            tracking-[-0.03125rem]
            text-[#F9F9F9]

            sm:text-[2.25rem]
            sm:leading-[2.75rem]

            lg:text-[2.5rem]
            lg:leading-[3rem]
          `}
          style={{
            fontFeatureSettings:
              '"liga" off, "clig" off',
          }}
        >
          Abhijat Marathi made its
          Global Alpha Launch at the
          Cannes Film Festival 2026, at
          the Bharat (India) Pavilion.
        </h2>

        {/* ====================================================
            DESCRIPTION

            Figma:
            Plus Jakarta Sans
            16px
            400
            24px
            #F9F9F9
            ==================================================== */}

        <p
          className={`
            ${plusJakarta.className}

            mt-4
            self-stretch

            text-[1rem]
            font-normal
            leading-[1.5rem]
            text-[#F9F9F9]
          `}
          style={{
            fontFeatureSettings:
              '"liga" off, "clig" off',
          }}
        >
          From creating original content
          and building digital platforms
          to strategic communications
          and global distribution, our
          integrated capabilities help
          businesses, creators,
          governments, and brands grow
          through media and technology.
        </p>

        {/* ====================================================
            CTA

            Figma:
            background: #FFF
            radius: 4px

            Inter
            16px
            600
            24px
            #8F6C1A
            ==================================================== */}

        <Link
          href="/portfolio"
          className={`
            ${buttonFont.className}

            group

            mt-14

            inline-flex
            min-h-[3.5rem]
            cursor-pointer
            items-center
            justify-center
            gap-1

            rounded-[0.25rem]
            bg-[#FFFFFF]

            px-4
            py-4

            text-center
            text-[1rem]
            font-semibold
            leading-[1.5rem]
            text-[#8F6C1A]

            transition-[background-color,transform]
            duration-200

            hover:-translate-y-[1px]
            hover:bg-[#F9F9F9]

            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-white/65
            focus-visible:ring-offset-2
            focus-visible:ring-offset-[#1A1A1A]
          `}
          style={{
            fontFeatureSettings:
              '"liga" off, "clig" off',
          }}
        >
          <span>
            Cannes Moment
          </span>

          <span
            className="
              inline-flex
              items-center
              justify-center

              transition-transform
              duration-200

              group-hover:translate-x-1
            "
          >
            <CaretRightIcon />
          </span>
        </Link>
      </div>

      {/* ======================================================
          GALLERY

          Full-bleed relative to section horizontal padding.
          ====================================================== */}

      <div
        aria-label="Mumbai and Marathi culture gallery"
        className="
          -mx-5
          mt-16

          flex
          w-[calc(100%+2.5rem)]
          flex-col
          items-center

          gap-3

          sm:-mx-8
          sm:mt-20
          sm:w-[calc(100%+4rem)]
          sm:gap-4

          md:gap-5

          lg:-mx-[3.5rem]
          lg:mt-[6.25rem]
          lg:w-[calc(100%+7rem)]
          lg:gap-6
        "
      >
        {GALLERY_ROWS.map(
          (
            images,
            index,
          ) => (
            <GalleryRow
              key={`film-gallery-row-${index}`}
              images={images}
              direction={
                index % 2 === 0
                  ? "left"
                  : "right"
              }
              progress={
                smoothProgress
              }
              zoom={imageZoom}
              decorative={
                index > 0
              }
              reduceMotion={
                reduceMotion
              }
            />
          ),
        )}
      </div>
    </section>
  );
}