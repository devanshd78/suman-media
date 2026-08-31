import { Plus_Jakarta_Sans } from "next/font/google";

import type { CmsFaqSection } from "@/types/cms";

const exo2 = Plus_Jakarta_Sans({ subsets: ["latin"], weight: ["600"] });
const inter = Plus_Jakarta_Sans({ subsets: ["latin"], weight: ["400", "600"] });

function PlusIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" className="h-3 w-3" fill="none">
      <path d="M8 4v8M4 8h8" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  );
}

function MinusIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" className="h-3 w-3" fill="none">
      <path d="M4 8h8" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  );
}

export function FaqSection({ content }: { content?: CmsFaqSection | null }) {
  const items =
    content?.items?.filter(
      (item) => Boolean(item?.question?.trim() && item?.answer?.trim()),
    ) ?? [];

  if (!content || items.length === 0) return null;

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="landing-section-transition mx-auto grid w-full max-w-full gap-12 bg-white px-5 py-16 sm:px-8 sm:py-20 md:grid-cols-[minmax(15rem,0.72fr)_minmax(0,1.28fr)] md:gap-14 lg:gap-24 lg:px-[3.5rem] lg:py-[6.25rem]"
    >
      <div>
        <p className={`${inter.className} text-[0.625rem] font-semibold uppercase tracking-[0.055em] text-[rgba(0,9,51,0.58)]`}>
          {content.eyebrow?.trim() || "FAQ"}
        </p>
        <h2
          id="faq-heading"
          className={`${exo2.className} mt-2.5 max-w-[28rem] text-[2rem] font-semibold leading-[2.45rem] tracking-[-0.04em] text-black sm:text-[2.4rem] sm:leading-[2.9rem]`}
        >
          {content.heading?.trim() || "Questions people asked?"}
        </h2>

        {content.contactEmail ? (
          <p className={`${inter.className} mt-4 text-sm leading-6 text-[rgba(0,9,51,0.58)]`}>
            {content.contactText?.trim() || "still have a quarry?"}{" "}
            <a
              className="font-normal text-[#8F6C1A] underline underline-offset-2 transition-opacity hover:opacity-65"
              href={`mailto:${content.contactEmail}`}
            >
              {content.contactEmail}
            </a>
          </p>
        ) : null}
      </div>

      <div
        data-landing-parallax-layer="reverse"
        className="border-t border-[rgba(0,17,102,0.12)]"
      >
        {items.map((item, index) => (
          <details
            key={item._key}
            className="group border-b border-[rgba(0,17,102,0.12)]"
            open={index === 0}
          >
            <summary className={`${inter.className} flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-[0.92rem] font-semibold leading-6 text-[rgba(0,6,38,0.90)] marker:hidden sm:text-base [&::-webkit-details-marker]:hidden`}>
              <span>{item.question}</span>
              <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[#7380aa] text-[#7380aa]">
                <span className="group-open:hidden"><PlusIcon /></span>
                <span className="hidden group-open:block"><MinusIcon /></span>
              </span>
            </summary>
            <p className={`${inter.className} max-w-[45rem] pb-6 pr-10 text-sm leading-6 text-[rgba(0,9,51,0.60)] sm:text-[0.94rem] sm:leading-7`}>
              {item.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
