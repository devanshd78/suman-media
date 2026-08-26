import { Exo_2, Inter } from "next/font/google";

import { HeritageDepthField } from "@/components/motion/premium-3d";
import { Reveal } from "@/components/motion/reveal";
import { TextReveal } from "@/components/motion/text-reveal";
import type { CmsFeaturedService } from "@/types/cms";

import { ServicesScrollGallery } from "./services-scroll-gallery";

const exo2 = Exo_2({ subsets: ["latin"], weight: ["600"] });
const inter = Inter({ subsets: ["latin"], weight: ["400", "600"] });

type ServicesSectionProps = {
  eyebrow?: string | null;
  heading?: string | null;
  services: CmsFeaturedService[];
};

export function ServicesSection({ eyebrow, heading, services }: ServicesSectionProps) {
  const validServices = services.filter(
    (service) => Boolean(service?.title?.trim() && service?.slug && service?.shortDescription?.trim()),
  );

  if (validServices.length === 0) return null;

  const resolvedHeading = heading?.trim() || "What we really do?";

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="landing-section-transition culture-thread heritage-ink paithani-edge relative flex w-full flex-col items-center justify-end gap-14 overflow-clip px-5 py-16 sm:px-8 lg:gap-[5.25rem] lg:px-[3.5rem] lg:pb-0 lg:pt-[7rem]"
    >
      <HeritageDepthField className="z-0 opacity-30" tone="dark" />
      <div aria-hidden="true" className="depth-horizon-grid z-0 opacity-12" />

      <div className="relative z-10 flex w-full flex-col items-center gap-2 text-center">
        <Reveal delay={0.02} distance={12}>
          <p className={`${inter.className} text-[0.625rem] font-semibold uppercase leading-[0.875rem] tracking-[0.08em] text-[#E2BB5F]/75`}>
            {eyebrow?.trim() || "Our Services"}
          </p>
        </Reveal>

        <h2
          id="services-heading"
          className={`${exo2.className} premium-display w-full overflow-hidden text-center text-[2rem] font-semibold leading-[2.5rem] tracking-[-0.04rem] text-[#FFF8EC] sm:text-[2.25rem] lg:text-[2.75rem] lg:leading-[3.15rem] lg:tracking-[-0.0625rem]`}
        >
          <TextReveal text={resolvedHeading} stagger={0.055} />
        </h2>
      </div>

      <div className={`${inter.className} relative z-10 w-full`}>
        <ServicesScrollGallery services={validServices} />
      </div>
    </section>
  );
}
