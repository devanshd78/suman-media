import Link from "next/link";
import { Exo_2, Inter } from "next/font/google";

const exo2 = Exo_2({
  subsets: ["latin"],
  weight: ["600"],
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

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

function AutomationAnywhereLogo({ className = "" }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/images/landing/partners/automation-anywhere.svg"
      alt="Automation Anywhere"
      draggable={false}
      className={`h-10 w-40 shrink-0 select-none object-contain ${className}`}
    />
  );
}

function AttentiveLogo() {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/images/landing/partners/attentive.svg"
      alt="Attentive"
      draggable={false}
      className="h-[3.125rem] w-[12.5rem] shrink-0 select-none object-contain"
    />
  );
}

function RazorpayLogo() {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/images/landing/partners/razorpay.svg"
      alt="Razorpay"
      draggable={false}
      className="h-[3.125rem] w-[12.5rem] shrink-0 select-none object-contain mix-blend-luminosity"
    />
  );
}

function MailchimpLogo() {
  return (
    <div
      aria-label="Mailchimp"
      role="img"
      className={`${inter.className} flex h-[3.125rem] w-40 shrink-0 items-center justify-center gap-2 text-[1.05rem] font-bold tracking-[-0.04em] text-[#1A1E22]`}
    >
      <svg aria-hidden="true" viewBox="0 0 32 32" className="h-7 w-7" fill="none">
        <circle cx="16" cy="16" r="10.5" stroke="currentColor" strokeWidth="1.8" />
        <path
          d="M8.5 14.5c-2.5-1.4-2.3-4.7.1-5.7 1.9-.8 3.7.3 4.2 2.1m1.3 2.2c2.5-2.2 6.8-1.1 7.7 2.3.8 3.2-1.6 6.2-5 6.2-2.2 0-4-1.1-5-2.8m2.1-2.2c1.3 1.1 3.1 1.1 4.4.1"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
      <span>mailchimp</span>
    </div>
  );
}

function FreshworksLogo() {
  return (
    <div
      aria-label="Freshworks"
      role="img"
      className={`${inter.className} flex h-[3.125rem] w-40 shrink-0 items-center justify-center gap-1.5 text-[1.05rem] font-normal tracking-[-0.035em] text-[#666]`}
    >
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6" fill="none">
        <defs>
          <linearGradient id="freshworks-mark" x1="4" y1="3" x2="20" y2="21">
            <stop stopColor="#D8D8D8" />
            <stop offset="1" stopColor="#737373" />
          </linearGradient>
        </defs>
        <path
          d="M12 3.5c4.6 0 8.3 3.5 8.3 7.9 0 5.3-4.1 8.6-9.5 8.6-3.9 0-7.1-2.4-7.1-6.1 0-5.8 5.9-10.4 8.3-10.4Z"
          fill="url(#freshworks-mark)"
        />
        <path d="M7.5 15.7c3.8-.2 6.7-2.5 8.5-6.5" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
      <span>freshworks</span>
    </div>
  );
}

function StoryBanner() {
  return (
    <section
      aria-labelledby="landing-story-heading"
      className="relative mx-auto flex h-[30rem] w-full max-w-[90rem] flex-col items-end justify-between overflow-hidden p-8"
      style={{
        backgroundImage:
          'radial-gradient(118.01% 73.86% at 57.53% 72.82%, rgba(0, 0, 0, 0) 42.15%, rgba(0, 0, 0, 0.76) 85.74%), url("/images/landing/background3.png")',
        backgroundPosition: "center, center",
        backgroundRepeat: "no-repeat, no-repeat",
        backgroundSize: "100% 100%, cover",
      }}
    >
      <div className="flex w-full flex-col items-start gap-2">
        <p
          className={`${inter.className} text-[0.625rem] font-semibold uppercase leading-[0.875rem] text-white`}
        >
          Join Abhijat Marathi
        </p>

        <h2
          id="landing-story-heading"
          className={`${exo2.className} w-full max-w-[30.5rem] text-[2rem] font-semibold leading-10 tracking-[-0.03125rem] text-white sm:text-[2.5rem] sm:leading-[3rem]`}
          style={{ fontFeatureSettings: '"liga" off, "clig" off' }}
        >
          Have a story worth telling? Let&apos;s bring it to the world.
        </h2>

        <Link
          href="/contact?type=partnership"
          className={`${inter.className} group mt-1 inline-flex items-center justify-center gap-1 rounded-lg p-4 text-sm font-semibold leading-5 text-white transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white`}
        >
          <span>Join as a Partner</span>
          <ArrowRightIcon />
        </Link>
      </div>

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/landing/image%207%20%5BVectorized%5D.svg"
        alt="Festival de Cannes"
        draggable={false}
        className="h-[3.8125rem] w-[7.5625rem] shrink-0 select-none object-contain"
      />
    </section>
  );
}

export function TestimonialSection() {
  return (
    <>
      <section
        aria-label="Partner testimonial"
        className="mx-auto flex w-full max-w-[90rem] flex-col items-center gap-[6.25rem] bg-white px-5 py-16 sm:px-8 lg:px-[3.5rem] lg:py-[6.25rem]"
      >
        <div className="flex w-full max-w-[83rem] flex-col items-center gap-16 py-2 lg:gap-[6.25rem]">
          <figure className="flex w-full max-w-[41.75rem] flex-col items-center gap-10 sm:gap-[3.5rem]">
            <AutomationAnywhereLogo />

            <figcaption className="flex w-full flex-col items-center gap-5">
              <blockquote
                className={`${inter.className} w-full text-center text-base font-normal leading-6 text-[rgba(0,9,51,0.65)]`}
                style={{ fontFeatureSettings: '"liga" off, "clig" off' }}
              >
                From creating original content and building digital platforms to
                strategic communications and global distribution, our integrated
                capabilities help businesses, creators, governments, and brands
                grow through media and technology.
              </blockquote>

              <p
                className={`${inter.className} text-center text-base font-semibold leading-6 text-[rgba(0,6,38,0.9)]`}
                style={{ fontFeatureSettings: '"liga" off, "clig" off' }}
              >
                Founder and CEO at Automation Anywhere
              </p>
            </figcaption>
          </figure>

          <div className="flex w-full flex-wrap items-center justify-center gap-8 border border-transparent py-8">
            <AutomationAnywhereLogo />
            <AttentiveLogo />
            <RazorpayLogo />
            <MailchimpLogo />
            <FreshworksLogo />
          </div>
        </div>
      </section>

      <StoryBanner />
    </>
  );
}
