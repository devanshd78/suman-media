import Image from "@/components/ui/image";
import {
  plusJakartaSans as exo2,
  plusJakartaSans as inter,
} from "@/lib/fonts";

import type {
  CmsMediaCoverageItem,
  CmsMediaCoverageSection,
} from "@/types/cms";

function desktopPlacement(index: number, total: number) {
  if (total >= 10 && index === 5) return "lg:col-start-2";
  if (total >= 10 && index === 9) return "lg:col-start-3";
  return "";
}

export function MediaCoverageSection({
  content,
}: {
  content?: CmsMediaCoverageSection | null;
}) {
  const eyebrow = content?.eyebrow?.trim() || "MEDIA COVERAGE";
  const heading = content?.heading?.trim() || "Featured media";

  const items: CmsMediaCoverageItem[] =
    content?.items
      ?.filter((item) => Boolean(item?.imageUrl))
      ?.slice(0, 12) ?? [];

  if (!items.length) return null;

  return (
    <section
      id="media-coverage"
      aria-labelledby="media-coverage-heading"
      className="
        landing-section-transition
        mx-auto
        w-full
        max-w-full
        bg-white
        px-5
        py-16
        sm:px-8
        sm:py-20
        lg:px-[3.5rem]
        lg:pb-[7rem]
        lg:pt-[6.25rem]
      "
    >
      {/* Heading */}
      <div className="text-center">
        <p
          className={`
            ${inter.className}
            text-[0.875rem]
            font-semibold
            leading-[1.25rem]
            text-[#B8B8B8]
          `}
          style={{
            fontFeatureSettings: '"liga" off, "clig" off',
          }}
        >
          {eyebrow}
        </p>

        <h2
          id="media-coverage-heading"
          className={`
            ${exo2.className}
            mt-2.5
            text-center
            text-[2.5rem]
            font-semibold
            leading-[3rem]
            tracking-[-0.03125rem]
            text-black
          `}
          style={{
            fontFeatureSettings: '"liga" off, "clig" off',
          }}
        >
          {heading}
        </h2>
      </div>

      {/* Media logos */}
      <div
        data-landing-parallax-layer="reverse"
        className="
          mx-auto
          mt-14
          grid
          max-w-[68rem]
          grid-cols-2
          items-center
          justify-items-center
          gap-x-8
          gap-y-10

          sm:mt-16
          sm:grid-cols-3
          sm:gap-x-12
          sm:gap-y-12

          lg:mt-[5rem]
          lg:grid-cols-10
          lg:gap-x-8
          lg:gap-y-12
        "
      >
        {items.map((item, index) => {
          const logo = (
            <div
              className="
                relative
                flex
                h-[4.5rem]
                w-[14rem]
                aspect-[28/9]
                items-center
                justify-center
                opacity-[0.82]
                grayscale
                transition-all
                duration-300
                group-hover:opacity-100
                group-hover:grayscale-0
              "
            >
              <div className="relative h-full w-full">
                <Image
                  src={item.imageUrl!}
                  alt={item.imageAlt?.trim() || `${item.title} logo`}
                  fill
                  sizes="224px"
                  className="object-contain"
                />
              </div>
            </div>
          );

          const wrapperClass = `
            group
            flex
            items-center
            justify-center
            lg:col-span-2
            ${desktopPlacement(index, items.length)}
          `;

          return item.href ? (
            <a
              key={item._key ?? `${item.title}-${index}`}
              href={item.href}
              target="_blank"
              rel="noreferrer"
              aria-label={`Read ${item.title}`}
              className={`
                ${wrapperClass}
                focus-visible:outline
                focus-visible:outline-2
                focus-visible:outline-offset-4
                focus-visible:outline-black
              `}
            >
              {logo}
            </a>
          ) : (
            <div
              key={item._key ?? `${item.title}-${index}`}
              className={wrapperClass}
            >
              {logo}
            </div>
          );
        })}
      </div>
    </section>
  );
}