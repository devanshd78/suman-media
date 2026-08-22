import { Exo_2, Inter } from "next/font/google";

import { ClientsBubbles } from "./clients-bubbles";

const exo2 = Exo_2({
  subsets: ["latin"],
  weight: ["600"],
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["600"],
});

export function ClientsSection() {
  return (
    <section
      id="clients"
      aria-labelledby="clients-heading"
      className="mx-auto flex w-full max-w-[90rem] flex-col items-center justify-end gap-16 bg-white px-5 py-16 sm:px-8 lg:gap-[8rem] lg:px-[3.5rem] lg:py-[6.25rem]"
    >
      <div className="flex w-full flex-col items-center gap-2 text-center">
        <p
          className={`${inter.className} text-[0.625rem] font-semibold uppercase leading-[0.875rem] tracking-[-0.00625rem] text-[rgba(0,9,51,0.65)]`}
        >
          Our Clients
        </p>

        <h2
          id="clients-heading"
          className={`${exo2.className} text-[2rem] font-semibold leading-[2.5rem] tracking-[-0.03125rem] text-black lg:text-[2.5rem] lg:leading-[3rem]`}
          style={{ fontFeatureSettings: '"liga" off, "clig" off' }}
        >
          Our Clients
        </h2>
      </div>

      <ClientsBubbles />
    </section>
  );
}