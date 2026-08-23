import { Exo_2, Inter } from "next/font/google";
import type { CmsFaqSection } from "@/types/cms";

const exo2 = Exo_2({ subsets: ["latin"], weight: ["600"] });
const inter = Inter({ subsets: ["latin"], weight: ["400", "600"] });

export function FaqSection({ content }: { content?: CmsFaqSection | null }) {
  const items = content?.items?.filter(
    (item) => Boolean(item?.question?.trim() && item?.answer?.trim()),
  ) ?? [];
  if (!content || items.length === 0) return null;

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="landing-section-transition mx-auto grid w-full max-w-[90rem] gap-10 bg-white px-5 py-16 sm:px-8 lg:grid-cols-[minmax(18rem,0.7fr)_minmax(0,1.3fr)] lg:gap-20 lg:px-[3.5rem] lg:py-[6.25rem]"
    >
      <div>
        <p className={`${inter.className} text-[0.625rem] font-semibold uppercase tracking-[0.1em] text-[rgba(0,9,51,0.55)]`}>
          {content.eyebrow?.trim() || "FAQ"}
        </p>
        <h2 id="faq-heading" className={`${exo2.className} mt-3 text-[2rem] font-semibold leading-tight tracking-[-0.035em] text-black sm:text-[2.5rem]`}>
          {content.heading?.trim() || "Questions people asked?"}
        </h2>

        {content.contactEmail ? (
          <p className={`${inter.className} mt-5 text-sm leading-6 text-[rgba(0,9,51,0.62)]`}>
            {content.contactText?.trim() || "Still have a query?"}{" "}
            <a className="font-semibold text-[#8F6C1A] underline-offset-4 hover:underline" href={`mailto:${content.contactEmail}`}>
              {content.contactEmail}
            </a>
          </p>
        ) : null}
      </div>

      <div className="divide-y divide-black/[0.08] border-y border-black/[0.08]">
        {items.map((item, index) => (
          <details key={item._key} className="group" open={index === 0}>
            <summary className={`${inter.className} flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-base font-semibold text-black marker:hidden sm:text-lg`}>
              <span>{item.question}</span>
              <span aria-hidden="true" className="text-xl font-normal text-black/40 transition-transform group-open:rotate-45">+</span>
            </summary>
            <p className={`${inter.className} max-w-3xl pb-6 pr-10 text-sm leading-6 text-[rgba(0,9,51,0.64)] sm:text-base sm:leading-7`}>
              {item.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
