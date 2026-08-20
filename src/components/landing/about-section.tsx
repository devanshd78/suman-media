import Link from "next/link";
import { Exo_2, Inter } from "next/font/google";

const exo2 = Exo_2({
  subsets: ["latin"],
  weight: ["600"],
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "600"],
});

function ArrowRightIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className="h-4 w-4 shrink-0"
      fill="none"
    >
      <path
        d="M3.5 8h8M8.5 5l3 3-3 3"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function AboutSection() {
  return (
    <section
      id="about-suman-entertainment"
      aria-labelledby="about-suman-heading"
      className="mx-auto flex w-full max-w-[90rem] flex-col items-start gap-[0.625rem] bg-white px-5 py-16 sm:px-8 lg:px-[3.5rem] lg:py-[6.25rem]"
    >
      <div className="grid w-full grid-cols-1 items-start gap-8 lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-[6.25rem]">
        <p
          className={`${inter.className} pt-1 text-[0.625rem] font-semibold uppercase leading-[0.875rem] tracking-[-0.00625rem] text-[rgba(0,9,51,0.65)]`}
        >
          About Suman Entertainment
        </p>

        <div className="flex min-w-0 flex-col items-start">
          <h2
            id="about-suman-heading"
            className={`${exo2.className} w-full text-[2rem] font-semibold leading-[2.5rem] tracking-[-0.03125rem] text-black lg:text-[2.5rem] lg:leading-[3rem]`}
            style={{ fontFeatureSettings: '"liga" off, "clig" off' }}
          >
            We&apos;re a team of creatives, music lovers and audio obsessives,
            developing products building India&apos;s Next Generation Media
            Ecosystem
          </h2>

          <p
            className={`${inter.className} mt-8 w-full text-base font-normal leading-6 text-[rgba(0,9,51,0.65)]`}
            style={{ fontFeatureSettings: '"liga" off, "clig" off' }}
          >
            Suman Entertainment &amp; Media Pvt. Ltd. brings together digital
            platforms, premium content, music, technology, strategic
            communications, and enterprise partnerships to create, distribute,
            and scale media experiences across industries. From one of
            India&apos;s dedicated Marathi OTT platforms to government
            communication initiatives, original content production, music
            publishing, AI-powered technologies, and global partnerships,
            we&apos;re building an integrated ecosystem designed for the future
            of media.
          </p>

          <Link
            href="/services"
            className={`${inter.className} mt-8 inline-flex items-center justify-center gap-1 rounded-lg p-4 text-center text-sm font-semibold leading-5 text-[#8F6C1A] transition-colors hover:bg-[#8F6C1A]/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8F6C1A]/35`}
            style={{ fontFeatureSettings: '"liga" off, "clig" off' }}
          >
            <span>Explore Capabilities</span>
            <ArrowRightIcon />
          </Link>
        </div>
      </div>
    </section>
  );
}