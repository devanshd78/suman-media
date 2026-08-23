import Image from "next/image";
import { Exo_2, Inter } from "next/font/google";

import type {
  CmsMediaCoverageSection,
  CmsMediaCoverageItem,
} from "@/types/cms";

const exo2 = Exo_2({
  subsets: ["latin"],
  weight: ["600"],
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "600"],
});

export function MediaCoverageSection({
  content,
}: {
  content?: CmsMediaCoverageSection | null;
}) {
  const eyebrow =
    content?.eyebrow?.trim() ||
    "MEDIA COVERAGE";

  const heading =
    content?.heading?.trim() ||
    "Featured media";

  const items: CmsMediaCoverageItem[] =
    content?.items?.filter(
      (item: CmsMediaCoverageItem) =>
        Boolean(item?.imageUrl),
    ) ?? [];

  if (!items.length) {
    return null;
  }

  return (
    <section
      aria-labelledby="media-coverage-heading"
      className="
        landing-section-transition
        mx-auto
        w-full
        max-w-[90rem]
        bg-white
        px-5
        py-16

        sm:px-8
        sm:py-20

        lg:px-[3.5rem]
        lg:pb-[7rem]
        lg:pt-[6.5rem]
      "
    >
      {/* HEADER */}

      <div className="text-center">
        <p
          className={`
            ${inter.className}

            text-[0.625rem]
            font-semibold
            uppercase
            leading-4
            tracking-[0.06em]
            text-[rgba(0,6,38,0.50)]
          `}
        >
          {eyebrow}
        </p>

        <h2
          id="media-coverage-heading"
          className={`
            ${exo2.className}

            mt-3
            text-[2rem]
            font-semibold
            leading-[2.5rem]
            tracking-[-0.035rem]
            text-[rgba(0,6,38,0.90)]

            sm:text-[2.5rem]
            sm:leading-[3rem]
          `}
          style={{
            fontFeatureSettings:
              '"liga" off, "clig" off',
          }}
        >
          {heading}
        </h2>
      </div>

      {/* LOGO GRID */}

      <div
        className="
          mx-auto
          mt-14
          grid
          max-w-[64rem]
          grid-cols-2
          items-center
          justify-items-center
          gap-x-8
          gap-y-12

          sm:grid-cols-3
          sm:gap-x-12

          lg:mt-[5rem]
          lg:grid-cols-5
          lg:gap-x-12
          lg:gap-y-14
        "
      >
        {items.map(
          (
            item: CmsMediaCoverageItem,
            index: number,
          ) => {
            const logo = (
              <div
                className="
                  relative
                  h-[2.75rem]
                  w-[8rem]

                  opacity-85
                  grayscale

                  transition-all
                  duration-300

                  hover:opacity-100
                  hover:grayscale-0

                  sm:w-[9rem]
                "
              >
                <Image
                  src={item.imageUrl!}
                  alt={
                    item.imageAlt?.trim() ||
                    `${item.title} logo`
                  }
                  fill
                  sizes="144px"
                  className="object-contain"
                />
              </div>
            );

            if (item.href) {
              return (
                <a
                  key={
                    item._key ??
                    `${item.title}-${index}`
                  }
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Read ${item.title}`}
                  className="
                    flex
                    min-h-[4.25rem]
                    items-center
                    justify-center

                    focus-visible:outline
                    focus-visible:outline-2
                    focus-visible:outline-offset-4
                    focus-visible:outline-black
                  "
                >
                  {logo}
                </a>
              );
            }

            return (
              <div
                key={
                  item._key ??
                  `${item.title}-${index}`
                }
                className="
                  flex
                  min-h-[4.25rem]
                  items-center
                  justify-center
                "
              >
                {logo}
              </div>
            );
          },
        )}
      </div>
    </section>
  );
}