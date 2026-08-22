import Link from "next/link";
import { Exo_2, Inter } from "next/font/google";

import type { CmsCareersPartnerCta } from "@/types/cms";

const exo2 = Exo_2({
  subsets: ["latin"],
  weight: ["600"],
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["600"],
});

const FALLBACK_HEADING =
  "Have a story worth telling? Let's bring it to the world.";
const FALLBACK_IMAGE = "/images/landing/background3.png";

function ArrowRightIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
      fill="none"
    >
      <path
        d="M3.5 8h9M9 4.5 12.5 8 9 11.5"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CareersPartnerCta({
  content,
}: {
  content?: CmsCareersPartnerCta | null;
}) {
  const heading = content?.heading?.trim() || FALLBACK_HEADING;
  const backgroundImage = content?.imageUrl?.trim() || FALLBACK_IMAGE;

  return (
    <section
      aria-label="Partner with Suman Media"
      className="mx-auto flex h-[30rem] w-full max-w-[90rem] flex-col items-end justify-between overflow-hidden p-8"
      style={{
        backgroundImage: `radial-gradient(118.01% 73.86% at 57.53% 72.82%, rgba(0, 0, 0, 0) 42.15%, rgba(0, 0, 0, 0.76) 85.74%), url("${backgroundImage}")`,
        backgroundPosition: "center, center",
        backgroundRepeat: "no-repeat, no-repeat",
        backgroundSize: "100% 100%, cover",
      }}
    >
      <div className="flex w-full flex-col items-start gap-3">
        <h2
          className={`${exo2.className} w-full max-w-[30.5rem] text-[2rem] font-semibold leading-10 tracking-[-0.03125rem] text-white sm:text-[2.5rem] sm:leading-[3rem]`}
          style={{ fontFeatureSettings: '"liga" off, "clig" off' }}
        >
          {heading}
        </h2>

        <Link
          href="/contact?type=partnership"
          className={`${inter.className} group inline-flex items-center justify-center gap-1 rounded-lg p-4 text-sm font-semibold leading-5 text-white transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white`}
        >
          <span>Join as a Partner</span>
          <ArrowRightIcon />
        </Link>
      </div>
    </section>
  );
}
