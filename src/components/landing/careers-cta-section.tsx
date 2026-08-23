import Image from "next/image";
import Link from "next/link";
import { Exo_2, Inter } from "next/font/google";
import type { CmsCareersCta } from "@/types/cms";

const exo2 = Exo_2({ subsets: ["latin"], weight: ["600"] });
const inter = Inter({ subsets: ["latin"], weight: ["400", "600"] });

function ArrowRightIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4" fill="none">
      <path d="M4 10h11M11 6l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CareersCtaSection({ content }: { content?: CmsCareersCta | null }) {
  if (!content?.heading?.trim()) return null;
  const cta = content.cta?.label && content.cta.href ? content.cta : { label: "View Open Roles", href: "/careers" };

  return (
    <section
      id="careers"
      aria-labelledby="landing-careers-heading"
      className="landing-section-transition relative mx-auto flex min-h-[34rem] w-full max-w-[90rem] items-end overflow-hidden bg-[#121212] px-5 py-10 text-white sm:px-8 lg:min-h-[42rem] lg:px-[3.5rem] lg:py-14"
    >
      {content.imageUrl ? (
        <Image
          src={content.imageUrl}
          alt={content.imageAlt?.trim() || ""}
          fill
          sizes="100vw"
          className="object-cover"
        />
      ) : null}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.08)_10%,rgba(0,0,0,0.78)_100%)]" />

      <div className="relative z-10 max-w-3xl">
        <p className={`${inter.className} text-[0.625rem] font-semibold uppercase tracking-[0.12em] text-white/70`}>
          {content.eyebrow?.trim() || "Careers"}
        </p>
        <h2 id="landing-careers-heading" className={`${exo2.className} mt-3 text-[2.4rem] font-semibold leading-[1.05] tracking-[-0.04em] sm:text-[3.4rem] lg:text-[4.5rem]`}>
          {content.heading}
        </h2>
        {content.description?.trim() ? (
          <p className={`${inter.className} mt-5 max-w-2xl text-sm leading-6 text-white/72 sm:text-base`}>
            {content.description}
          </p>
        ) : null}
        <Link
          href={cta.href}
          className={`${inter.className} mt-6 inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-black transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white`}
        >
          {cta.label}
          <ArrowRightIcon />
        </Link>
      </div>
    </section>
  );
}
