"use client";

import Image from "@/components/ui/image";
import Link from "next/link";
import { inter as buttonFont, plusJakartaSans as headingFont } from "@/lib/fonts";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useRef } from "react";

type GalleryImage = {
  src: string;
  alt: string;
  position?: string;
};

const GALLERY_IMAGES: GalleryImage[] = [
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

const GALLERY_ROWS = [
  GALLERY_IMAGES,
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

function CaretRightIcon() {
  return (
    <svg
      aria-hidden="true"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      className="h-5 w-5 shrink-0"
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

function GalleryRow({
  images,
  direction,
  progress,
  zoom,
  decorative,
}: {
  images: GalleryImage[];
  direction: "left" | "right";
  progress: MotionValue<number>;
  zoom: MotionValue<number>;
  decorative: boolean;
}) {
  const reduceMotion = useReducedMotion();
  const x = useTransform(
    progress,
    [0, 1],
    direction === "left" ? ["6%", "-6%"] : ["-6%", "6%"],
  );

  return (
    <div className="flex w-full justify-center">
      <motion.div
        className="flex w-max shrink-0 items-center gap-6 will-change-transform"
        style={reduceMotion ? undefined : { x }}
      >
        {images.map((image, index) => (
          <div
            key={`${image.src}-${index}`}
            className="relative aspect-[155/91] w-[80vw] max-w-[31.9375rem] shrink-0 overflow-hidden rounded-[0.25rem] bg-[#292929]"
          >
            <motion.div
              className="absolute inset-0 will-change-transform"
              style={reduceMotion ? undefined : { scale: zoom }}
            >
              <Image
                src={image.src}
                alt={decorative ? "" : image.alt}
                fill
                sizes="(max-width: 640px) 80vw, 31.9375rem"
                className="object-cover"
                style={{ objectPosition: image.position ?? "center" }}
              />
            </motion.div>

            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgba(0,0,0,0.18)_100%)]"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export function FilmSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 82,
    damping: 24,
    mass: 0.42,
  });
  const imageZoom = useTransform(smoothProgress, [0, 0.78], [1.24, 1]);

  return (
    <section
      ref={sectionRef}
      id="abhijat-marathi-cannes"
      aria-labelledby="abhijat-marathi-cannes-heading"
      className="landing-section-transition flex w-full flex-col items-center gap-16 overflow-hidden bg-[#1A1A1A] px-5 pt-16 sm:px-8 sm:pt-20 lg:gap-[6.25rem] lg:px-[3.5rem] lg:pt-[6.25rem]"
    >
      <div className="flex w-full flex-col items-start">
        <h2
          id="abhijat-marathi-cannes-heading"
          className={`${headingFont.className} self-stretch text-[2rem] font-semibold leading-[2.5rem] tracking-[-0.03125rem] text-[#F9F9F9] sm:text-[2.25rem] sm:leading-[2.75rem] lg:text-[2.5rem] lg:leading-[3rem]`}
          style={{ fontFeatureSettings: '"liga" off, "clig" off' }}
        >
          Abhijat Marathi made its Global Alpha Launch at the Cannes Film
          Festival 2026, at the Bharat (India) Pavilion.
        </h2>

        <p
          className={`${headingFont.className} mt-4 self-stretch text-base font-normal leading-6 text-[#F9F9F9]`}
          style={{ fontFeatureSettings: '"liga" off, "clig" off' }}
        >
          From creating original content and building digital platforms to
          strategic communications and global distribution, our integrated
          capabilities help businesses, creators, governments, and brands grow
          through media and technology.
        </p>

        <Link
          href="/portfolio"
          className={`${buttonFont.className} group mt-14 inline-flex cursor-pointer items-center justify-center gap-1 rounded-lg bg-[#F9F9F9] p-4 text-center text-base font-semibold leading-6 text-[#8F6C1A] transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/65 focus-visible:ring-offset-2 focus-visible:ring-offset-[#1A1A1A]`}
          style={{ fontFeatureSettings: '"liga" off, "clig" off' }}
        >
          <span>Cannes Moment</span>
          <span className="transition-transform duration-200 group-hover:translate-x-1">
            <CaretRightIcon />
          </span>
        </Link>
      </div>

      <div
        className="-mx-5 flex w-[calc(100%+2.5rem)] flex-col items-center gap-6 sm:-mx-8 sm:w-[calc(100%+4rem)] lg:-mx-[3.5rem] lg:w-[calc(100%+7rem)]"
        aria-label="Mumbai and Marathi culture gallery"
      >
        {GALLERY_ROWS.map((images, index) => (
          <GalleryRow
            key={`film-gallery-row-${index}`}
            images={images}
            direction={index % 2 === 0 ? "left" : "right"}
            progress={smoothProgress}
            zoom={imageZoom}
            decorative={index > 0}
          />
        ))}
      </div>
    </section>
  );
}
