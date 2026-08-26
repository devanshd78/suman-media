import Image from "next/image";
import { Exo_2, Inter } from "next/font/google";

import { Premium3DSurface, HeritageDepthField } from "@/components/motion/premium-3d";
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
      className="landing-section-transition culture-thread paithani-edge relative flex min-h-[42rem] w-full items-center justify-center overflow-hidden bg-[#0C0A0B] px-5 py-10 sm:min-h-[46rem] sm:px-8 sm:py-12 lg:min-h-[54rem] lg:px-[3.5rem] lg:py-16"
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
                className="heritage-photo object-cover object-center"
              />
            </div>
          </Parallax>
          <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(201,155,54,0.08),transparent_38%),linear-gradient(90deg,rgba(33,9,16,0.58),rgba(0,0,0,0.12),rgba(10,24,24,0.52))]" />
        </>
      ) : null}

      <HeritageDepthField className="z-[2] opacity-40" tone="dark" />

      <div
        aria-hidden="true"
        className={`${inter.className} pointer-events-none absolute left-[3.5rem] top-1/2 hidden -translate-y-1/2 text-[0.54rem] font-semibold uppercase tracking-[0.28em] text-[#E2BB5F]/32 [writing-mode:vertical-rl] lg:block`}
      >
        कथा · संस्कृती · भविष्य
      </div>

      <Reveal className="relative z-10 w-full max-w-[35rem]" distance={34} amount={0.12}>
        <Premium3DSurface
          className="rounded-[1.5rem]"
          surfaceClassName="rounded-[1.5rem]"
          intensity={4.2}
          lift={12}
          perspective={1350}
        >
        <article className="founder-letter-paper premium-3d-paper-shadow relative overflow-hidden rounded-[1.5rem] px-6 py-8 sm:px-9 sm:py-10 lg:px-[3rem] lg:py-[3rem] [transform-style:preserve-3d]">
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
            className={`${exo2.className} premium-display premium-3d-layer-deep relative z-10 text-[2.15rem] font-semibold leading-[2.5rem] tracking-[-0.045rem] text-[#1B1510] sm:text-[2.7rem] sm:leading-[3rem]`}
            style={{ fontFeatureSettings: '"liga" off, "clig" off' }}
          >
            <span className="block overflow-hidden">
              <TextReveal text={eyebrow} stagger={0.07} />
            </span>
            <span className="mt-1 block overflow-hidden text-[#8A4A24]">
              <TextReveal text={heading} delay={0.12} stagger={0.055} />
            </span>
          </h2>

          <div className={`${inter.className} premium-3d-layer relative z-10 mt-5 space-y-4 text-[0.73rem] leading-[1.25rem] text-[rgba(0,9,51,0.63)] sm:text-[0.8rem] sm:leading-[1.38rem]`}>
            {paragraphs.map((paragraph, index) => (
              <Reveal key={`${paragraph.slice(0, 28)}-${index}`} delay={0.04 * index} distance={12} amount={0.12}>
                <p>{paragraph}</p>
              </Reveal>
            ))}
          </div>

          <Reveal className="premium-3d-layer-deep relative z-10" delay={0.18} distance={12}>
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
        </Premium3DSurface>
      </Reveal>
    </section>
  );
}
