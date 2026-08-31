import Image from "next/image";
import { Plus_Jakarta_Sans } from "next/font/google";

import type { CmsFounderLetter } from "@/types/cms";

const exo2 = Plus_Jakarta_Sans({ subsets: ["latin"], weight: ["600"] });
const inter = Plus_Jakarta_Sans({ subsets: ["latin"], weight: ["400", "600"] });

export function FounderLetterSection({ content }: { content?: CmsFounderLetter | null }) {
  if (!content?.body?.trim()) return null;

  const paragraphs = content.body
    .split(/\n\s*\n/)
    .map((item) => item.trim())
    .filter(Boolean);

  const eyebrow = content.eyebrow?.trim() || "A Letter";
  const heading = content.heading?.trim() || "from the founder";
  const founderName = content.founderName?.trim() || "Kedar Joshi";
  const founderRole = content.founderRole?.trim() || "Founder and CEO";

  return (
    <section
      id="founder-letter"
      aria-labelledby="founder-letter-heading"
      className="landing-section-transition relative mx-auto flex min-h-[42rem] w-full max-w-full items-center justify-center overflow-hidden bg-[#151515] px-5 py-10 sm:min-h-[46rem] sm:px-8 sm:py-12 lg:min-h-[52rem] lg:px-[3.5rem] lg:py-14"
    >
      {content.imageUrl ? (
        <>
          <div
            data-landing-parallax-layer="media"
            className="absolute inset-0"
          >
            <Image
              src={content.imageUrl}
              alt={content.imageAlt?.trim() || ""}
              fill
              sizes="100vw"
              className="object-cover object-center grayscale"
            />
          </div>
          <div aria-hidden="true" className="absolute inset-0 bg-black/18" />
        </>
      ) : null}

      <article className="relative z-10 w-full max-w-[33rem] bg-[#fbfbfb] px-6 py-8 shadow-[0_1.5rem_5rem_rgba(0,0,0,0.28)] sm:px-9 sm:py-10 lg:px-[2.75rem] lg:py-[2.85rem]">
        <h2
          id="founder-letter-heading"
          className={`${exo2.className} text-[2.15rem] font-semibold leading-[2.5rem] tracking-[-0.045rem] text-[#121b3d] sm:text-[2.55rem] sm:leading-[3rem]`}
          style={{ fontFeatureSettings: '"liga" off, "clig" off' }}
        >
          <span className="block">{eyebrow}</span>
          <span className="mt-1 block">{heading}</span>
        </h2>

        <div className={`${inter.className} mt-4 space-y-4 text-[0.73rem] leading-[1.18rem] text-[rgba(0,9,51,0.63)] sm:text-[0.78rem] sm:leading-[1.28rem]`}>
          {paragraphs.map((paragraph, index) => (
            <p key={`${paragraph.slice(0, 28)}-${index}`}>{paragraph}</p>
          ))}
        </div>

        <div className="mt-5 flex flex-col items-end">
          {content.signatureUrl ? (
            <div className="relative h-[2.7rem] w-[8.5rem]">
              <Image
                src={content.signatureUrl}
                alt={content.signatureAlt?.trim() || `${founderName} signature`}
                fill
                sizes="136px"
                className="object-contain object-right-center"
              />
            </div>
          ) : (
            <p className="font-serif text-lg italic leading-none text-[#5865d8]">
              {founderName}
            </p>
          )}

          <p className={`${inter.className} mt-2 text-right text-[0.64rem] font-semibold leading-4 text-[rgba(0,9,51,0.60)]`}>
            {founderRole}- <span className="font-normal">{founderName}</span>
          </p>
        </div>
      </article>
    </section>
  );
}
