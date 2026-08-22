import Link from "next/link";
import { Exo_2, Inter } from "next/font/google";

import { getFeaturedCompanies } from "@/sanity/lib/data";
import type { CmsFeaturedCompany } from "@/types/cms";

const exo2 = Exo_2({
  subsets: ["latin"],
  weight: ["600"],
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "600"],
});

/*
 * Shown only when the CMS has no companies yet. Ecosystem pillars
 * restating copy that already exists in the hero and about sections —
 * no slug/website, so every card links to the /companies overview.
 */
const FALLBACK_COMPANIES: CmsFeaturedCompany[] = [
  {
    _id: "fallback-abhijat-marathi-ott",
    name: "Abhijat Marathi OTT",
    shortDescription:
      "One of India's dedicated Marathi OTT platforms, streaming original films, series and cultural programming.",
  },
  {
    _id: "fallback-music-publishing",
    name: "Music & Publishing",
    shortDescription:
      "Original compositions, film soundtracks, digital publishing and royalty management.",
  },
  {
    _id: "fallback-content-studios",
    name: "Content Studios",
    shortDescription:
      "Feature films, web series, documentaries, branded content and corporate communications with end-to-end production.",
  },
  {
    _id: "fallback-media-technology-ai",
    name: "Media Technology & AI",
    shortDescription:
      "AI-powered media workflows and technology-led products for content creation, discovery and delivery.",
  },
];

function ArrowRightIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className="h-4 w-4 shrink-0"
      fill="none"
    >
      <path
        d="M3.5 8h8M8.5 5l3 3-3 3"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CompanyMedia({ company }: { company: CmsFeaturedCompany }) {
  if (company.imageUrl) {
    return (
      <div className="w-full overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={company.imageUrl}
          alt={company.imageAlt ?? ""}
          draggable={false}
          className="aspect-[4/3] w-full select-none object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
    );
  }

  const initial = company.name.trim().charAt(0).toUpperCase();

  return (
    <div className="w-full overflow-hidden">
      <div className="flex aspect-[4/3] w-full select-none items-center justify-center bg-[#f2eee4] transition-transform duration-500 group-hover:scale-[1.03]">
        <span
          aria-hidden="true"
          className={`${exo2.className} text-[5rem] font-semibold leading-none text-black/10`}
          style={{ fontFeatureSettings: '"liga" off, "clig" off' }}
        >
          {initial}
        </span>
      </div>
    </div>
  );
}

function CompanyCard({ company }: { company: CmsFeaturedCompany }) {
  const linkClassName = `${inter.className} mt-auto inline-flex items-center gap-1 pt-4 text-sm font-semibold leading-5 text-[#8F6C1A] transition-colors hover:text-[#6d5214] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8F6C1A]/35`;
  const linkStyle = { fontFeatureSettings: '"liga" off, "clig" off' } as const;
  const linkLabel = `Learn more about ${company.name}`;

  return (
    <article className="group flex flex-col border border-black/[0.04] bg-white shadow-[0_0.75rem_2rem_rgba(0,0,0,0.07)] transition-shadow duration-300 hover:shadow-[0_1rem_2.75rem_rgba(0,0,0,0.12)]">
      <CompanyMedia company={company} />

      <div className="flex flex-1 flex-col items-start gap-2 p-6">
        <h3
          className={`${inter.className} text-lg font-semibold leading-6 text-black`}
          style={{ fontFeatureSettings: '"liga" off, "clig" off' }}
        >
          {company.name}
        </h3>

        <p
          className={`${inter.className} text-sm font-normal leading-5 text-[rgba(0,9,51,0.65)]`}
          style={{ fontFeatureSettings: '"liga" off, "clig" off' }}
        >
          {company.shortDescription}
        </p>

        {company.slug ? (
          <Link
            href={`/companies/${company.slug}`}
            aria-label={linkLabel}
            className={linkClassName}
            style={linkStyle}
          >
            <span>Learn more</span>
            <ArrowRightIcon />
          </Link>
        ) : company.websiteUrl ? (
          <a
            href={company.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={linkLabel}
            className={linkClassName}
            style={linkStyle}
          >
            <span>Learn more</span>
            <ArrowRightIcon />
          </a>
        ) : (
          <Link
            href="/companies"
            aria-label={linkLabel}
            className={linkClassName}
            style={linkStyle}
          >
            <span>Learn more</span>
            <ArrowRightIcon />
          </Link>
        )}
      </div>
    </article>
  );
}

export async function CompaniesSection() {
  const companies = await getFeaturedCompanies();
  const items = companies.length > 0 ? companies : FALLBACK_COMPANIES;

  return (
    <section
      id="companies"
      aria-labelledby="companies-heading"
      className="mx-auto flex w-full max-w-[90rem] flex-col gap-10 bg-white px-5 py-16 sm:px-8 lg:gap-16 lg:px-[3.5rem] lg:py-[6.25rem]"
    >
      <div className="grid w-full grid-cols-1 items-start gap-8 lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-[6.25rem]">
        <p
          className={`${inter.className} pt-1 text-[0.625rem] font-semibold uppercase leading-[0.875rem] tracking-[-0.00625rem] text-[rgba(0,9,51,0.65)]`}
        >
          Our Ecosystem
        </p>

        <div className="flex min-w-0 flex-col items-start gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-8">
          <h2
            id="companies-heading"
            className={`${exo2.className} text-[2rem] font-semibold leading-[2.5rem] tracking-[-0.03125rem] text-black lg:text-[2.5rem] lg:leading-[3rem]`}
            style={{ fontFeatureSettings: '"liga" off, "clig" off' }}
          >
            Companies &amp; Platforms
          </h2>

          <Link
            href="/companies"
            className={`${inter.className} inline-flex shrink-0 items-center justify-center gap-1 rounded-lg p-4 text-center text-sm font-semibold leading-5 text-[#8F6C1A] transition-colors hover:bg-[#8F6C1A]/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8F6C1A]/35`}
            style={{ fontFeatureSettings: '"liga" off, "clig" off' }}
          >
            <span>All companies</span>
            <ArrowRightIcon />
          </Link>
        </div>
      </div>

      <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((company) => (
          <CompanyCard key={company._id} company={company} />
        ))}
      </div>
    </section>
  );
}
