import type { CSSProperties } from "react";
import Image from "@/components/ui/image";
import Link from "next/link";
import { plusJakartaSans as exo2, plusJakartaSans as inter } from "@/lib/fonts";
import { CareersHeroTypewriter } from "@/components/careers/careers-hero-typewriter";
import { TextReveal } from "@/components/motion/text-reveal";

/* ========================================================= */
/* TYPES                                                     */
/* ========================================================= */

type CareersImage = {
  key: string;
  url: string;
  alt: string;
};

type CareersCMSData = {
  heroImage?: CareersImage;
  galleryImages: CareersImage[];
};

const LOCAL_HERO_IMAGE: CareersImage = {
  key: "local-careers-hero",
  url: "/images/careers/Rectangle.png",
  alt: "Friends celebrating together by the water",
};

const LOCAL_GALLERY_IMAGES: CareersImage[] = Array.from(
  { length: 8 },
  (_, index) => {
    const isTeamPhoto = index % 2 === 0;

    return {
      key: `local-careers-gallery-${index + 1}`,
      url: isTeamPhoto
        ? "/images/careers/animation/Join%20as%20(5).png"
        : "/images/careers/animation/Join%20as%20(6).png",
      alt: isTeamPhoto
        ? "Colleagues working together"
        : "Colleagues celebrating a shared success",
    };
  },
);

/* ========================================================= */
/* SANITY QUERY                                              */
/* ========================================================= */

const CAREERS_QUERY = `
  *[_type == "careersPage"][0] {
    "heroImage": {
      "key": coalesce(heroImage.asset->_id, "careers-hero"),
      "url": heroImage.asset->url,
      "alt": coalesce(
        heroImage.alt,
        "Life at Suman Entertainment"
      )
    },

    "galleryImages": galleryImages[0...8] {
      "key": coalesce(_key, asset->_id),
      "url": asset->url,
      "alt": coalesce(
        alt,
        "Life at Suman Entertainment"
      )
    }
  }
`;

/* ========================================================= */
/* CMS FETCH                                                 */
/* ========================================================= */

async function getCareersData(): Promise<CareersCMSData> {
  const projectId =
    process.env.SANITY_PROJECT_ID ??
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

  const dataset =
    process.env.SANITY_DATASET ??
    process.env.NEXT_PUBLIC_SANITY_DATASET;

  const apiVersion =
    process.env.SANITY_API_VERSION ??
    "2026-08-01";

  const token =
    process.env.SANITY_API_READ_TOKEN;

  if (!projectId || !dataset) {
    return {
      galleryImages: [],
    };
  }

  try {
    const url =
      `https://${projectId}.api.sanity.io/` +
      `v${apiVersion}/data/query/${dataset}` +
      `?query=${encodeURIComponent(CAREERS_QUERY)}`;

    const response = await fetch(url, {
      headers: token
        ? {
            Authorization: `Bearer ${token}`,
          }
        : undefined,

      next: {
        revalidate: 60,
        tags: ["careers-page"],
      },
    });

    if (!response.ok) {
      return {
        galleryImages: [],
      };
    }

    const payload = (await response.json()) as {
      result?: CareersCMSData | null;
    };

    if (!payload.result) {
      return {
        galleryImages: [],
      };
    }

    return {
      heroImage: payload.result.heroImage?.url
        ? payload.result.heroImage
        : undefined,

      galleryImages:
        payload.result.galleryImages?.filter(
          (image) => Boolean(image?.url),
        ) ?? [],
    };
  } catch {
    return {
      galleryImages: [],
    };
  }
}

/* ========================================================= */
/* ARROW                                                     */
/* ========================================================= */

function ArrowRightIcon() {
  return (
    <svg
      aria-hidden="true"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      className="h-5 w-5"
    >
      <path
        d="M4.1665 9.99996H15.8332M9.99984 15.8333L15.8332 9.99996L9.99984 4.16663"
        stroke="currentColor"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ========================================================= */
/* GALLERY                                                   */
/* ========================================================= */

const GALLERY_OFFSETS = [
  11,
  7,
  3,
  0,
  3,
  7,
  11,
  7,
] as const;

function GalleryGroup({
  images,
  duplicate = false,
}: {
  images: CareersImage[];
  duplicate?: boolean;
}) {
  return (
    <div
      aria-hidden={duplicate || undefined}
      className="
        careers-gallery-group
        flex
        shrink-0
        items-end

        gap-6
        pr-6

        lg:gap-[2rem]
        lg:pr-[2rem]
      "
    >
      {images.map((image, index) => {
        const verticalOffset =
          GALLERY_OFFSETS[
            index % GALLERY_OFFSETS.length
          ];

        return (
          <figure
            key={
              duplicate
                ? `copy-${image.key}-${index}`
                : `${image.key}-${index}`
            }
            className="careers-gallery-card relative shrink-0 overflow-hidden bg-[#F4F4F4]"
            style={{
              width: "22rem",
              height: "25rem",
              "--gallery-offset": `-${verticalOffset}rem`,
              "--gallery-offset-mobile": `-${verticalOffset * 0.55}rem`,
            } as CSSProperties}
          >
            <Image
              src={image.url}
              alt={duplicate ? "" : image.alt}
              fill
              sizes="22rem"
              draggable={false}
              className="
                select-none
                object-cover
                object-center
              "
            />
          </figure>
        );
      })}
    </div>
  );
}

/* ========================================================= */
/* COMPLETE CAREERS SECTION                                  */
/* ========================================================= */

export async function CareersSection() {
  const data = await getCareersData();

  const heroImage = data.heroImage ?? LOCAL_HERO_IMAGE;

  const galleryImages = (
    data.galleryImages.length > 0
      ? data.galleryImages
      : LOCAL_GALLERY_IMAGES
  ).slice(0, 8);

  return (
    <section
      aria-label="Careers at Suman Entertainment"
      className="
        mx-auto
        w-full
        max-w-full

        overflow-x-clip
        bg-white
      "
    >
      {/* =================================================== */}
      {/* TOP CAREERS CTA                                     */}
      {/* =================================================== */}

      <div
        className="
          flex
          w-full

          flex-col
          items-center

          gap-[3.5rem]

          px-5
          pb-10
          pt-16

          sm:px-8

          lg:px-[3.5rem]
          lg:pb-[3.5rem]
          lg:pt-[6.25rem]
        "
      >
        <CareersHeroTypewriter />

        {/* BUTTON */}
        <Link
          href="#open-roles"
          className={`
            ${inter.className}

            group

            inline-flex
            h-12

            items-center
            justify-center

            gap-2

            rounded-xl

            bg-[#8F6C1A]

            px-5

            text-sm
            font-semibold
            leading-5

            text-white

            transition-opacity
            duration-200

            hover:opacity-90
          `}
        >
          <span>View open roles</span>

          <span
            className="
              transition-transform
              duration-300
              ease-in-out

              group-hover:translate-x-1
            "
          >
            <ArrowRightIcon />
          </span>
        </Link>
      </div>

      {/* =================================================== */}
      {/* MAIN CMS IMAGE                                      */}
      {/* =================================================== */}

      <div
        className="
          relative
          w-full

          overflow-hidden

          bg-[#F3F3F3]

          aspect-[16/10]

          lg:h-[46.875rem]
          lg:aspect-auto
        "
      >
        <Image
          src={heroImage.url}
          alt={heroImage.alt}
          fill
          priority
          sizes="100vw"
          draggable={false}
          className="
            select-none
            object-cover
            object-center
          "
        />
      </div>

      {/* =================================================== */}
      {/* LIFE @ SUMAN TEXT                                   */}
      {/* =================================================== */}

      <div
        className="
          flex
          w-full

          flex-col
          items-start
          justify-between

          gap-8

          px-5
          py-12

          sm:px-8

          lg:flex-row
          lg:items-center
          lg:px-[3.5rem]
          lg:py-[6.25rem]
        "
      >
        {/* LEFT */}
        <div
          className="
            flex
            flex-col
            items-start
            gap-4
          "
        >
          <TextReveal
            as="p"
            text="CAREERS"
            className={`
              ${inter.className}

              text-[0.875rem]
              font-semibold
              leading-[1.25rem]

              text-[rgba(0,9,51,0.65)]
            `}
          />

          <TextReveal
            as="h2"
            text="Life @ Suman Ent."
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
          />
        </div>

        {/* RIGHT */}
        <TextReveal
          as="p"
          text="Work at the intersection of creativity, technology and culture. From content and OTT to music, AI, marketing and experiences, every team contributes to something bigger."
          className={`
            ${inter.className}

            w-full
            max-w-[37.125rem]

            text-base
            font-normal
            leading-6

            text-[#969696]
          `}
        />
      </div>

      {/* =================================================== */}
      {/* 8-IMAGE ANIMATED CMS GALLERY                        */}
      {/* =================================================== */}

      {galleryImages.length > 0 && (
        <div
          className="
            relative

            flex
            w-full
            flex-col
            items-center

            overflow-hidden

            bg-white

            pb-[6.25rem]
          "
        >
          <div
            className="
              careers-gallery-window

              relative

              flex
              h-[42rem]
              w-full

              items-end

              overflow-hidden
            "
          >
            {/* LEFT SOFT EDGE */}
            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                inset-y-0
                left-0
                z-20

                w-[5rem]

                bg-gradient-to-r
                from-white
                to-transparent
              "
            />

            {/* RIGHT SOFT EDGE */}
            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                inset-y-0
                right-0
                z-20

                w-[5rem]

                bg-gradient-to-l
                from-white
                to-transparent
              "
            />

            {/* MOVING TRACK */}
            <div
              className="
                careers-gallery-track

                flex
                w-max
                items-end
              "
            >
              <GalleryGroup
                images={galleryImages}
              />

              <GalleryGroup
                images={galleryImages}
                duplicate
              />
            </div>
          </div>
        </div>
      )}

      {/* =================================================== */}
      {/* LOCAL ANIMATION                                     */}
      {/* =================================================== */}

      <style>{`
        /*
         * The cards themselves are NOT rotated.
         *
         * Each image has a different vertical offset,
         * producing the staircase / tilted-carousel
         * appearance shown in the reference.
         */

        .careers-gallery-card {
          transform:
            translateY(
              var(--gallery-offset, 0px)
            );

          transition:
            transform 300ms ease-in-out;
        }

        /*
         * Continuous right-to-left movement.
         *
         * We render the same 8 images twice,
         * therefore -50% creates the seamless loop.
         */
        .careers-gallery-track {
          animation:
            careersGalleryMovement
            32s
            linear
            infinite;

          will-change: transform;
          backface-visibility: hidden;
        }

        /*
         * Slightly pause when the user wants to
         * inspect the gallery.
         */
        @media (hover: hover) and (pointer: fine) {
          .careers-gallery-window:hover
            .careers-gallery-track {
            animation-play-state: paused;
          }
        }

        @keyframes careersGalleryMovement {
          from {
            transform:
              translate3d(
                0,
                0,
                0
              );
          }

          to {
            transform:
              translate3d(
                -50%,
                0,
                0
              );
          }
        }

        /*
         * Responsive gallery sizing.
         */
        @media (max-width: 1023px) {
          .careers-gallery-window {
            height: 31rem;
          }

          .careers-gallery-card {
            width: 17rem !important;
            height: 20rem !important;

            transform:
              translateY(
                var(--gallery-offset-mobile, 0px)
              );
          }
        }

        /*
         * Accessibility
         */
        @media (prefers-reduced-motion: reduce) {
          .careers-gallery-track {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
