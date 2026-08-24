import Image from "next/image";
import { Exo_2, Inter } from "next/font/google";

import type { CmsMediaCoverageItem, CmsMediaCoverageSection } from "@/types/cms";

const exo2 = Exo_2({ subsets: ["latin"], weight: ["600"] });
const inter = Inter({ subsets: ["latin"], weight: ["400", "600"] });

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
    content?.items?.filter((item) => Boolean(item?.imageUrl))?.slice(0, 12) ?? [];

  if (!items.length) return null;

  return (
    <section
      id="media-coverage"
      aria-labelledby="media-coverage-heading"
      className="landing-section-transition mx-auto w-full max-w-full bg-white px-5 py-16 sm:px-8 sm:py-20 lg:px-[3.5rem] lg:pb-[7rem] lg:pt-[6.25rem]"
    >
      <div className="text-center">
        <p className={`${inter.className} text-[0.625rem] font-semibold uppercase leading-4 tracking-[0.045em] text-[rgba(0,6,38,0.56)]`}>
          {eyebrow}
        </p>
        <h2
          id="media-coverage-heading"
          className={`${exo2.className} mt-2.5 text-[2rem] font-semibold leading-[2.5rem] tracking-[-0.035rem] text-[rgba(0,6,38,0.94)] sm:text-[2.4rem] sm:leading-[2.9rem]`}
          style={{ fontFeatureSettings: '"liga" off, "clig" off' }}
        >
          {heading}
        </h2>
      </div>

      <div className="mx-auto mt-14 grid max-w-[68rem] grid-cols-2 items-center justify-items-center gap-x-8 gap-y-10 sm:mt-16 sm:grid-cols-3 sm:gap-x-12 sm:gap-y-12 lg:mt-[5rem] lg:grid-cols-10 lg:gap-x-8 lg:gap-y-12">
        {items.map((item, index) => {
          const logo = (
            <div className="relative h-[2.8rem] w-[7.75rem] opacity-82 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0 sm:w-[8.5rem] lg:w-[9rem]">
              <Image
                src={item.imageUrl!}
                alt={item.imageAlt?.trim() || `${item.title} logo`}
                fill
                sizes="144px"
                className="object-contain"
              />
            </div>
          );

          const wrapperClass = `group flex min-h-[4.25rem] items-center justify-center sm:min-h-[4.75rem] lg:col-span-2 ${desktopPlacement(index, items.length)}`;

          return item.href ? (
            <a
              key={item._key ?? `${item.title}-${index}`}
              href={item.href}
              target="_blank"
              rel="noreferrer"
              aria-label={`Read ${item.title}`}
              className={`${wrapperClass} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black`}
            >
              {logo}
            </a>
          ) : (
            <div key={item._key ?? `${item.title}-${index}`} className={wrapperClass}>
              {logo}
            </div>
          );
        })}
      </div>
    </section>
  );
}
