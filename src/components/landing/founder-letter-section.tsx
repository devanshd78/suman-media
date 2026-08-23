import Image from "next/image";
import { Exo_2, Inter } from "next/font/google";
import type { CmsFounderLetter } from "@/types/cms";

const exo2 = Exo_2({ subsets: ["latin"], weight: ["600"] });
const inter = Inter({ subsets: ["latin"], weight: ["400", "600"] });

export function FounderLetterSection({ content }: { content?: CmsFounderLetter | null }) {
  if (!content?.body?.trim()) return null;
  const paragraphs = content.body.split(/\n\s*\n/).map((item) => item.trim()).filter(Boolean);

  return (
    <section
      id="founder-letter"
      aria-labelledby="founder-letter-heading"
      className="landing-section-transition relative mx-auto min-h-[42rem] w-full max-w-[90rem] overflow-hidden bg-[#151515] px-5 py-16 sm:px-8 lg:px-[3.5rem] lg:py-[6.25rem]"
    >
      {content.imageUrl ? (
        <>
          <Image
            src={content.imageUrl}
            alt={content.imageAlt?.trim() || ""}
            fill
            sizes="100vw"
            className="object-cover grayscale"
          />
          <div className="absolute inset-0 bg-black/45" />
        </>
      ) : null}

      <div className="relative z-10 ml-auto max-w-3xl bg-white p-6 shadow-[0_1.5rem_5rem_rgba(0,0,0,0.22)] sm:p-9 lg:p-12">
        <p className={`${inter.className} text-[0.625rem] font-semibold uppercase tracking-[0.1em] text-[rgba(0,9,51,0.55)]`}>
          {content.eyebrow?.trim() || "A Letter from the founder"}
        </p>
        <h2 id="founder-letter-heading" className={`${exo2.className} mt-3 text-[2rem] font-semibold leading-tight tracking-[-0.035em] text-black sm:text-[2.5rem]`}>
          {content.heading?.trim() || "From Bharat to the world"}
        </h2>

        <div className={`${inter.className} mt-7 space-y-5 text-sm leading-6 text-[rgba(0,9,51,0.67)] sm:text-base sm:leading-7`}>
          {paragraphs.map((paragraph, index) => (
            <p key={`${paragraph.slice(0, 24)}-${index}`}>{paragraph}</p>
          ))}
        </div>

        {content.founderName || content.founderRole ? (
          <div className={`${inter.className} mt-8 border-t border-black/[0.08] pt-5`}>
            {content.founderName ? <p className="font-semibold text-black">{content.founderName}</p> : null}
            {content.founderRole ? <p className="mt-1 text-sm text-[rgba(0,9,51,0.58)]">{content.founderRole}</p> : null}
          </div>
        ) : null}
      </div>
    </section>
  );
}
