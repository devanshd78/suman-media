import { Exo_2, Inter } from "next/font/google";

import { ServicesScrollGallery } from "./services-scroll-gallery";

const exo2 = Exo_2({
  subsets: ["latin"],
  weight: ["600"],
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["600"],
});

export function ServicesSection() {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="mx-auto flex w-full max-w-[90rem] flex-col items-center justify-end gap-16 bg-white px-5 py-16 sm:px-8 lg:gap-[6.25rem] lg:px-[3.5rem] lg:py-[6.25rem]"
    >
      <div className="flex w-full flex-col items-center gap-2 text-center">
        <p
          className={`${inter.className} text-[0.625rem] font-semibold uppercase leading-[0.875rem] tracking-[-0.00625rem] text-[rgba(0,9,51,0.65)]`}
        >
          Our Services
        </p>

        <h2
          id="services-heading"
          className={`${exo2.className} w-full text-center text-[2rem] font-semibold leading-[2.5rem] tracking-[-0.04rem] text-black sm:text-[2.25rem] lg:text-[2.5rem] lg:leading-[3rem] lg:tracking-[-0.0625rem]`}
          style={{ fontFeatureSettings: '"liga" off, "clig" off' }}
        >
          What we really do?
        </h2>
      </div>

      <div className={`${inter.className} w-full`}>
        <ServicesScrollGallery />
      </div>
    </section>
  );
}