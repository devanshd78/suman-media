import Image from "next/image";
import Link from "next/link";
import { Plus_Jakarta_Sans } from "next/font/google";

import type { CmsCareersCta } from "@/types/cms";

const exo2 = Plus_Jakarta_Sans({ subsets: ["latin"], weight: ["600"] });
const inter = Plus_Jakarta_Sans({ subsets: ["latin"], weight: ["400", "600"] });

function ArrowRightIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4" fill="none">
      <path d="M4 10h11M11 6l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CareersCtaSection({ content }: { content?: CmsCareersCta | null }) {
  if (!content?.heading?.trim()) return null;

  const cta =
    content.cta?.label && content.cta.href
      ? content.cta
      : { label: "View Open Roles", href: "/careers" };

  return (
    <section
      id="careers"
      aria-labelledby="landing-careers-heading"
      className="landing-section-transition relative mx-auto aspect-[4/5] w-full max-w-full overflow-hidden bg-[#121212] text-white sm:aspect-[16/9] lg:aspect-[2.65/1]"
    >
      {content.imageUrl ? (
        <div
          data-landing-parallax-layer="media"
          className="absolute inset-0"
        >
          <Image
            src={content.imageUrl}
            alt={content.imageAlt?.trim() || ""}
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
      ) : null}

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.64)_0%,rgba(0,0,0,0.32)_34%,rgba(0,0,0,0.04)_70%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.18)_0%,transparent_55%)]"
      />

      <div className="relative z-10 flex h-full w-full flex-col items-start px-5 py-7 sm:px-8 sm:py-9 lg:px-[3.5rem] lg:py-10">
        <p className={`${inter.className} text-[0.625rem] font-semibold uppercase tracking-[0.045em] text-white/90`}>
          {content.eyebrow?.trim() || "CARRERS"}
        </p>

        <h2
          id="landing-careers-heading"
          className={`${exo2.className} mt-3 max-w-[41rem] text-[2rem] font-semibold leading-[2.35rem] tracking-[-0.04em] sm:text-[2.5rem] sm:leading-[2.9rem] lg:text-[2.85rem] lg:leading-[3.25rem] lg:tracking-[-0.055rem]`}
          style={{ fontFeatureSettings: '"liga" off, "clig" off' }}
        >
          {content.heading}
        </h2>

        {content.description?.trim() ? (
          <p className={`${inter.className} mt-4 max-w-[36rem] text-sm leading-6 text-white/72`}>
            {content.description}
          </p>
        ) : null}

        <Link
          href={cta.href}
          className={`${inter.className} group mt-7 inline-flex items-center gap-2 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-72 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white`}
        >
          <span>{cta.label}</span>
          <span className="transition-transform duration-200 group-hover:translate-x-1">
            <ArrowRightIcon />
          </span>
        </Link>
      </div>
    </section>
  );
}
