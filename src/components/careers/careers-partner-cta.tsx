import Image from "@/components/ui/image";
import Link from "next/link";
import { plusJakartaSans as exo2, plusJakartaSans as inter } from "@/lib/fonts";
import { TextReveal } from "@/components/motion/text-reveal";

import type { CmsCareersPartnerCta } from "@/types/cms";

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
      className="relative mx-auto flex min-h-[24rem] w-full max-w-full flex-col items-end justify-between overflow-hidden px-5 py-8 sm:min-h-[30rem] sm:px-8 sm:py-10 lg:min-h-[32rem] lg:px-[3.5rem]"
    >
      <Image
        src={backgroundImage}
        alt=""
        fill
        sizes="100vw"
        className="pointer-events-none select-none object-cover object-center"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(118.01%_73.86%_at_57.53%_72.82%,rgba(0,0,0,0)_42.15%,rgba(0,0,0,0.76)_85.74%)]"
      />

      <div className="relative z-10 flex w-full flex-col items-start gap-3">
        <TextReveal
          as="h2"
          text={heading}
          className={`${exo2.className} w-full max-w-[30.5rem] text-[clamp(1.8rem,7vw,2.5rem)] font-semibold leading-[1.2] tracking-[-0.03125rem] text-white`}
          style={{ fontFeatureSettings: '"liga" off, "clig" off' }}
        />

        <Link
          href="/contact?type=partnership"
          className={`${inter.className} group inline-flex min-h-12 items-center justify-center gap-1 rounded-[1rem] px-4 py-3 text-sm font-semibold leading-5 text-white transition-[background-color,transform] duration-200 hover:-translate-y-[1px] hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:text-base sm:leading-6`}
        >
          <span>Join as a Partner</span>
          <ArrowRightIcon />
        </Link>
      </div>
    </section>
  );
}
