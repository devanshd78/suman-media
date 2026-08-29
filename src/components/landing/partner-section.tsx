import Link from "next/link";
import { Plus_Jakarta_Sans } from "next/font/google";

import type { CmsPartnerSection } from "@/types/cms";

const exo2 = Plus_Jakarta_Sans({ subsets: ["latin"], weight: ["600"] });
const inter = Plus_Jakarta_Sans({ subsets: ["latin"], weight: ["400", "600"] });

function ArrowUpRightIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 18 18"
      className="h-4 w-4"
      fill="none"
    >
      <path
        d="M5 13 13 5M7 5h6v6"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const DEFAULT_BENEFITS = [
  "Future-ready Media Infrastructure",
  "Technology-led Innovation",
  "Integrated Ecosystem",
  "Scalable Partnerships",
  "Enterprise Delivery",
];

export function PartnerSection({
  content,
}: {
  content?: CmsPartnerSection | null;
}) {
  if (!content) return null;

  const benefits =
    content.benefits?.filter((item) => Boolean(item?.title?.trim())) ?? [];

  const visibleBenefits =
    benefits.length > 0
      ? benefits
      : DEFAULT_BENEFITS.map((title, index) => ({
          _key: `reference-benefit-${index}`,
          title,
          href: null,
        }));

  const heading = content.heading?.trim() || "Why Partner With us?";

  const description =
    content.description?.trim() ||
    "From creating original content and building digital platforms to strategic communications and global distribution, our integrated capabilities help businesses, creators, governments, and brands grow through media and technology.";

  return (
    <section
      id="why-partner"
      aria-labelledby="why-partner-heading"
      className="landing-section-transition mx-auto w-full max-w-full overflow-hidden bg-[#FFEABF]"
    >
      <div className="grid gap-10 px-5 py-14 sm:px-8 sm:py-16 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] md:gap-12 lg:grid-cols-[minmax(0,0.82fr)_minmax(32rem,1.18fr)] lg:gap-24 lg:px-[3.5rem] lg:py-[5.5rem]">
        <div className="max-w-[31rem]">
          <h2
            id="why-partner-heading"
            className={`${exo2.className} text-[2rem] font-semibold leading-[2.45rem] tracking-[-0.04rem] text-[rgba(0,6,38,0.92)] sm:text-[2.35rem] sm:leading-[2.8rem] lg:text-[2.5rem] lg:leading-[3rem] lg:tracking-[-0.05rem]`}
            style={{ fontFeatureSettings: '"liga" off, "clig" off' }}
          >
            {heading}
          </h2>

          <p
            className={`${inter.className} mt-5 max-w-[30rem] text-sm leading-6 text-[rgba(0,6,38,0.62)] sm:text-[0.94rem]`}
          >
            {description}
          </p>
        </div>

        <div
          data-landing-parallax-layer="reverse"
          className="flex w-full flex-col border-t border-[rgba(0,17,102,0.12)]"
        >
          {visibleBenefits.slice(0, 5).map((item, index) => {
            const row = (
              <span className="inline-flex min-w-0 items-center gap-2.5">
                <span
                  className={`${inter.className} text-[0.95rem] font-semibold leading-6 text-[rgba(0,6,38,0.93)] sm:text-base lg:text-[1.03rem]`}
                >
                  {item.title}
                </span>

                <span className="shrink-0 text-[rgba(0,6,38,0.48)] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[rgba(0,6,38,0.88)]">
                  <ArrowUpRightIcon />
                </span>
              </span>
            );

            const className =
              "group flex min-h-[3.75rem] w-full items-center border-b border-[rgba(0,17,102,0.12)] py-4 transition-colors hover:bg-white/15";

            return item.href ? (
              <Link
                key={item._key || `${item.title}-${index}`}
                href={item.href}
                className={className}
              >
                {row}
              </Link>
            ) : (
              <div
                key={item._key || `${item.title}-${index}`}
                className={className}
              >
                {row}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}