import { Exo_2, Inter } from "next/font/google";

import { Reveal } from "@/components/motion/reveal";
import { TextReveal } from "@/components/motion/text-reveal";
import type { CmsFeaturedCompany } from "@/types/cms";

import { ClientsBubbles } from "./clients-bubbles";

const exo2 = Exo_2({ subsets: ["latin"], weight: ["600"] });
const inter = Inter({ subsets: ["latin"], weight: ["600"] });

type ClientsSectionProps = {
  eyebrow?: string | null;
  heading?: string | null;
  companies: CmsFeaturedCompany[];
};

export function ClientsSection({ eyebrow, heading, companies }: ClientsSectionProps) {
  const logoCompanies = companies.filter((company) => Boolean(company.logoUrl));
  if (logoCompanies.length === 0) return null;

  const resolvedHeading = heading?.trim() || "Our Clients";

  return (
    <section
      id="clients"
      aria-labelledby="clients-heading"
      className="landing-section-transition culture-thread relative flex w-full flex-col items-center justify-end gap-16 overflow-hidden bg-white px-5 py-16 sm:px-8 lg:gap-[5rem] lg:px-[3.5rem] lg:py-[6.5rem]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[28rem] w-[72rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(226,187,95,0.10)_0%,rgba(255,255,255,0)_67%)]"
      />

      <div className="relative z-10 flex w-full flex-col items-center gap-2 text-center">
        <Reveal delay={0.03} distance={12}>
          <p className={`${inter.className} text-[0.625rem] font-semibold uppercase leading-[0.875rem] tracking-[0.08em] text-[rgba(0,9,51,0.58)]`}>
            {eyebrow?.trim() || "OUR CLIENTS & PARTNERS"}
          </p>
        </Reveal>

        <h2
          id="clients-heading"
          className={`${exo2.className} overflow-hidden text-[2rem] font-semibold leading-[2.5rem] tracking-[-0.03125rem] text-black lg:text-[2.75rem] lg:leading-[3.15rem]`}
        >
          <TextReveal text={resolvedHeading} stagger={0.055} />
        </h2>
      </div>

      <Reveal className="relative z-10 w-full" delay={0.12} distance={26} amount={0.1}>
        <ClientsBubbles companies={logoCompanies} />
      </Reveal>
    </section>
  );
}
