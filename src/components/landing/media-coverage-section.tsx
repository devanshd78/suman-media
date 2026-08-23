import Image from "next/image";
import { Exo_2, Inter } from "next/font/google";
import type { CmsMediaCoverageSection } from "@/types/cms";

const exo2 = Exo_2({ subsets: ["latin"], weight: ["600"] });
const inter = Inter({ subsets: ["latin"], weight: ["400", "600"] });

function ExternalArrow() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4" fill="none">
      <path d="M6 14 14 6M8 6h6v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function MediaCoverageSection({ content }: { content?: CmsMediaCoverageSection | null }) {
  const items = content?.items?.filter((item) => Boolean(item?.title?.trim())) ?? [];
  if (!content || items.length === 0) return null;

  return (
    <section
      id="media-coverage"
      aria-labelledby="media-coverage-heading"
      className="landing-section-transition mx-auto w-full max-w-[90rem] bg-white px-5 py-16 sm:px-8 lg:px-[3.5rem] lg:py-[6.25rem]"
    >
      <div className="mb-10 sm:mb-14">
        <p className={`${inter.className} text-[0.625rem] font-semibold uppercase tracking-[0.08em] text-[rgba(0,9,51,0.58)]`}>
          {content.eyebrow?.trim() || "Media Coverage"}
        </p>
        <h2 id="media-coverage-heading" className={`${exo2.className} mt-2 text-[2rem] font-semibold leading-tight tracking-[-0.035em] text-black sm:text-[2.5rem]`}>
          {content.heading?.trim() || "Featured media"}
        </h2>
      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => {
          const card = (
            <article className="group flex h-full flex-col overflow-hidden border border-black/[0.06] bg-white transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_1.25rem_3.5rem_rgba(0,0,0,0.08)]">
              <div className="relative aspect-[16/10] overflow-hidden bg-[#eee9dc]">
                {item.imageUrl ? (
                  <Image
                    src={item.imageUrl}
                    alt={item.imageAlt?.trim() || item.title}
                    fill
                    sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.025]"
                  />
                ) : null}
              </div>
              <div className="flex flex-1 flex-col p-5 sm:p-6">
                {item.source?.trim() ? (
                  <p className={`${inter.className} text-[0.625rem] font-semibold uppercase tracking-[0.1em] text-[rgba(0,9,51,0.5)]`}>
                    {item.source}
                  </p>
                ) : null}
                <h3 className={`${inter.className} mt-3 text-lg font-semibold leading-6 text-black`}>
                  {item.title}
                </h3>
                {item.href ? (
                  <span className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold text-[#8F6C1A]">
                    Read coverage <ExternalArrow />
                  </span>
                ) : null}
              </div>
            </article>
          );

          return item.href ? (
            <a key={item._key} href={item.href} target="_blank" rel="noreferrer" className="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8F6C1A]">
              {card}
            </a>
          ) : (
            <div key={item._key}>{card}</div>
          );
        })}
      </div>
    </section>
  );
}
