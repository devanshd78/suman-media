import Image from "next/image";
import { Exo_2, Inter } from "next/font/google";

import { Parallax, Reveal } from "@/components/motion/reveal";
import { TextReveal } from "@/components/motion/text-reveal";
import type { CmsFounderLetter } from "@/types/cms";

const exo2 = Exo_2({ subsets: ["latin"], weight: ["600"] });
const inter = Inter({ subsets: ["latin"], weight: ["400", "600"] });

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
      className="landing-section-transition culture-thread relative flex min-h-[42rem] w-full items-center justify-center overflow-hidden bg-[#151515] px-5 py-10 sm:min-h-[46rem] sm:px-8 sm:py-12 lg:min-h-[54rem] lg:px-[3.5rem] lg:py-16"
    >
      {content.imageUrl ? (
        <>
          <Parallax className="absolute -inset-y-14 inset-x-0" distance={38} scaleFrom={1.08} scaleTo={1.015}>
            <div className="relative h-full min-h-[calc(100%+7rem)] w-full">
              <Image
                src={content.imageUrl}
                alt={content.imageAlt?.trim() || ""}
                fill
                sizes="100vw"
                className="object-cover object-center grayscale"
              />
            </div>
          </Parallax>
          <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.42),rgba(0,0,0,0.14),rgba(0,0,0,0.42))]" />
        </>
      ) : null}

      <div
        aria-hidden="true"
        className={`${inter.className} pointer-events-none absolute left-[3.5rem] top-1/2 hidden -translate-y-1/2 text-[0.54rem] font-semibold uppercase tracking-[0.28em] text-[#E2BB5F]/32 [writing-mode:vertical-rl] lg:block`}
      >
        कथा · संस्कृती · भविष्य
      </div>

      <Reveal className="relative z-10 w-full max-w-[35rem]" distance={34} amount={0.12}>
        <article className="relative overflow-hidden bg-[#fbfbfb] px-6 py-8 shadow-[0_2rem_7rem_rgba(0,0,0,0.34)] sm:px-9 sm:py-10 lg:px-[3rem] lg:py-[3rem]">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-[-3.5rem] top-[-3.5rem] h-28 w-28 rotate-45 border border-[#B68A16]/16"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-4 left-4 h-5 w-5 rotate-45 bg-[#B68A16]/10"
          />

          <h2
            id="founder-letter-heading"
            className={`${exo2.className} relative z-10 text-[2.15rem] font-semibold leading-[2.5rem] tracking-[-0.045rem] text-[#121b3d] sm:text-[2.7rem] sm:leading-[3rem]`}
            style={{ fontFeatureSettings: '"liga" off, "clig" off' }}
          >
            <span className="block overflow-hidden">
              <TextReveal text={eyebrow} stagger={0.07} />
            </span>
            <span className="mt-1 block overflow-hidden text-[#8F6C1A]">
              <TextReveal text={heading} delay={0.12} stagger={0.055} />
            </span>
          </h2>

          <div className={`${inter.className} relative z-10 mt-5 space-y-4 text-[0.73rem] leading-[1.25rem] text-[rgba(0,9,51,0.63)] sm:text-[0.8rem] sm:leading-[1.38rem]`}>
            {paragraphs.map((paragraph, index) => (
              <Reveal key={`${paragraph.slice(0, 28)}-${index}`} delay={0.04 * index} distance={12} amount={0.12}>
                <p>{paragraph}</p>
              </Reveal>
            ))}
          </div>

          <Reveal className="relative z-10" delay={0.18} distance={12}>
            <div className="mt-6 flex flex-col items-end">
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
          </Reveal>
        </article>
      </Reveal>
    </section>
  );
}
