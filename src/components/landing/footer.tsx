import Link from "next/link";

import {
  inter,
  plusJakartaSans,
  notoSansDevanagari as devanagari,
} from "@/lib/fonts";

import type { ReactNode } from "react";

import type {
  CmsCta,
  CmsSiteSettings,
} from "@/types/cms";

/* ============================================================
   CONSTANTS
   ============================================================ */

const DEFAULT_MARATHI_WORDMARK =
  "सुमन एंटरटेनमेंट अँड मीडिया";

/* ============================================================
   ICONS
   ============================================================ */

function ArrowRightIcon({
  className = "h-4 w-4",
}: {
  className?: string;
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className={className}
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

function DiagonalArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className="h-3 w-3 shrink-0"
      fill="none"
    >
      <path
        d="M4 12 12 4M6.25 4H12v5.75"
        stroke="currentColor"
        strokeWidth="1.15"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ============================================================
   PARTNER ICON
   ============================================================ */

function PartnerIcon() {
  return (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      className="h-6 w-6 shrink-0"
    >
      <g clipPath="url(#footer-partner-icon-clip)">
        <path
          d="M7.875 15C10.5674 15 12.75 12.8174 12.75 10.125C12.75 7.43261 10.5674 5.25 7.875 5.25C5.18261 5.25 3 7.43261 3 10.125C3 12.8174 5.18261 15 7.875 15Z"
          stroke="#1A1A1A"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <path
          d="M0.959045 18.75C1.70819 17.5982 2.73317 16.6517 3.94092 15.9965C5.14867 15.3412 6.50095 14.998 7.87498 14.998C9.24902 14.998 10.6013 15.3412 11.809 15.9965C13.0168 16.6517 14.0418 17.5982 14.7909 18.75"
          stroke="#1A1A1A"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <path
          d="M16.125 15C17.499 14.9992 18.8513 15.3418 20.0592 15.9967C21.267 16.6517 22.292 17.5981 23.0409 18.75"
          stroke="#1A1A1A"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <path
          d="M14.3147 5.59687C14.9816 5.3309 15.6989 5.2155 16.4156 5.25893C17.1322 5.30235 17.8304 5.50352 18.4602 5.84806C19.0901 6.19261 19.6361 6.67202 20.0592 7.25204C20.4823 7.83207 20.7721 8.49838 20.9078 9.20338C21.0435 9.90838 21.0219 10.6346 20.8444 11.3303C20.6669 12.026 20.3379 12.6738 19.881 13.2276C19.4241 13.7814 18.8505 14.2274 18.2012 14.5338C17.5519 14.8402 16.843 14.9994 16.125 15"
          stroke="#1A1A1A"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>

      <defs>
        <clipPath id="footer-partner-icon-clip">
          <rect
            width="24"
            height="24"
            fill="white"
          />
        </clipPath>
      </defs>
    </svg>
  );
}

/* ============================================================
   GROW ICON
   ============================================================ */

function GrowthIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="h-6 w-6 shrink-0"
    >
      <path
        d="M21.75 5.25L12.75 14.25L9 10.5L2.25 17.25"
        stroke="#1A1A1A"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M21.75 11.25V5.25H15.75"
        stroke="#1A1A1A"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ============================================================
   SOCIAL ICONS
   ============================================================ */

function XIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      fill="none"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path
        d="M6 5H12L26 27H20L6 5Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M14.235 17.9414L6 27.0002"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M26.0006 5L17.7656 14.0588"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      fill="none"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path
        d="M16 0C7.16352 0 0 7.16352 0 16C0 23.5034 5.16608 29.7997 12.135 31.529V20.8896H8.83584V16H12.135V13.8931C12.135 8.44736 14.5997 5.9232 19.9462 5.9232C20.96 5.9232 22.7091 6.12224 23.4246 6.32064V10.7526C23.047 10.713 22.391 10.6931 21.5763 10.6931C18.953 10.6931 17.9392 11.687 17.9392 14.2707V16H23.1654L22.2675 20.8896H17.9392V31.8829C25.8618 30.9261 32.0006 24.1805 32.0006 16C32 7.16352 24.8365 0 16 0Z"
        fill="currentColor"
      />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      fill="none"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path
        d="M16 21C18.7614 21 21 18.7614 21 16C21 13.2386 18.7614 11 16 11C13.2386 11 11 13.2386 11 16C11 18.7614 13.2386 21 16 21Z"
        stroke="currentColor"
        strokeWidth="2"
      />

      <path
        d="M22 4H10C6.68629 4 4 6.68629 4 10V22C4 25.3137 6.68629 28 10 28H22C25.3137 28 28 25.3137 28 22V10C28 6.68629 25.3137 4 22 4Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M22.5 11C23.3284 11 24 10.3284 24 9.5C24 8.67157 23.3284 8 22.5 8C21.6716 8 21 8.67157 21 9.5C21 10.3284 21.6716 11 22.5 11Z"
        fill="currentColor"
      />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      fill="none"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path
        d="M31.6812 9.60039C31.6812 9.60039 31.3688 7.39414 30.4062 6.42539C29.1875 5.15039 27.825 5.14414 27.2 5.06914C22.725 4.74414 16.0063 4.74414 16.0063 4.74414H15.9937C15.9937 4.74414 9.275 4.74414 4.8 5.06914C4.175 5.14414 2.8125 5.15039 1.59375 6.42539C0.63125 7.39414 0.325 9.60039 0.325 9.60039C0.325 9.60039 0 12.1941 0 14.7816V17.2066C0 19.7941 0.31875 22.3879 0.31875 22.3879C0.31875 22.3879 0.63125 24.5941 1.5875 25.5629C2.80625 26.8379 4.40625 26.7941 5.11875 26.9316C7.68125 27.1754 16 27.2504 16 27.2504C16 27.2504 22.725 27.2379 27.2 26.9191C27.825 26.8441 29.1875 26.8379 30.4062 25.5629C31.3688 24.5941 31.6812 22.3879 31.6812 22.3879C31.6812 22.3879 32 19.8004 32 17.2066V14.7816C32 12.1941 31.6812 9.60039 31.6812 9.60039ZM12.6938 20.1504V11.1566L21.3375 15.6691L12.6938 20.1504Z"
        fill="currentColor"
      />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      fill="none"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path
        d="M29.6313 0H2.3625C1.05625 0 0 1.03125 0 2.30625V29.6875C0 30.9625 1.05625 32 2.3625 32H29.6313C30.9375 32 32 30.9625 32 29.6938V2.30625C32 1.03125 30.9375 0 29.6313 0ZM9.49375 27.2687H4.74375V11.9937H9.49375V27.2687ZM7.11875 9.9125C5.59375 9.9125 4.3625 8.68125 4.3625 7.1625C4.3625 5.64375 5.59375 4.4125 7.11875 4.4125C8.6375 4.4125 9.86875 5.64375 9.86875 7.1625C9.86875 8.675 8.6375 9.9125 7.11875 9.9125ZM27.2687 27.2687H22.525V19.8438C22.525 18.075 22.4937 15.7937 20.0562 15.7937C17.5875 15.7937 17.2125 17.725 17.2125 19.7188V27.2687H12.475V11.9937H17.025V14.0813H17.0875C17.7188 12.8813 19.2688 11.6125 21.575 11.6125C26.3813 11.6125 27.2687 14.775 27.2687 18.8875V27.2687Z"
        fill="currentColor"
      />
    </svg>
  );
}

/* ============================================================
   TYPES
   ============================================================ */

type FooterLink = {
  label: string;
  href: string;
  arrow?: boolean;
  soon?: boolean;
};

/* ============================================================
   FOOTER LINKS
   ============================================================ */

const COMPANY: FooterLink[] = [
  { label: "About us", href: "/about" },
  { label: "Careers", href: "/careers" },
  { label: "Leadership", href: "/leadership" },
  { label: "Our Journey", href: "/about#journey" },
  { label: "Contact us", href: "/contact" },
  { label: "Become a Part", href: "/partners" },
];

const RESOURCES: FooterLink[] = [
  { label: "News & Blogs", href: "/news-and-blogs" },
  { label: "Case study", href: "/case-studies" },
  { label: "FAQ", href: "/#faq" },
  { label: "Terms and Condition", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
];

const PRODUCT: FooterLink[] = [
  {
    label: "OTT, Digital Platforms & Streaming",
    href: "/products/ott-digital-platforms-streaming",
  },
  {
    label: "Monetization Modal",
    href: "/products/monetization",
  },
  {
    label: "Fast Channel",
    href: "/products/fast-channel",
  },
  {
    label: "AI & Emerging Technology",
    href: "/products/ai-emerging-technology",
  },
  {
    label: "Content and Music Library Management",
    href: "/products/content-music-library",
  },
  {
    label: "Publication & Knowledge Platforms",
    href: "/products/publication-knowledge-platforms",
  },
  {
    label: "Intellectual Property Development",
    href: "/products/intellectual-property-development",
  },
];

const INVESTOR: FooterLink[] = [
  {
    label: "Financials Data",
    href: "/investors/financials",
  },
  {
    label: "Roadmap",
    href: "/investors/roadmap",
  },
  {
    label: "Company Profile",
    href: "/investors/company-profile",
  },
  {
    label: "IPO 2027",
    href: "/investors",
    soon: true,
  },
];

const SERVICES: FooterLink[] = [
  {
    label: "Media & Content Production",
    href: "/services/media-content-production",
  },
  {
    label: "Music & Audio Division",
    href: "/services/music-audio-experiences",
  },
  {
    label: "Events and Experiences",
    href: "/services/live-experiences-events",
  },
  {
    label: "Tech & Digital Transformation",
    href: "/services/technology-digital-transformation",
  },
  {
    label: "Content and Music Library Management",
    href: "/services/content-music-library-management",
  },
  {
    label: "Publication & Knowledge Platforms",
    href: "/services/publication-knowledge-platforms",
  },
  {
    label: "Intellectual Property Development",
    href: "/services/intellectual-property-development",
  },
  {
    label: "Talent and Creator Ecosystem",
    href: "/services/talent-creator-ecosystem",
  },
];

const CONTACT: FooterLink[] = [
  {
    label: "Contact Information",
    href: "/contact",
    arrow: true,
  },
  {
    label: "Business Enquiry",
    href: "/contact?type=business",
    arrow: true,
  },
  {
    label: "Partnership Enquiry",
    href: "/contact?type=partnership",
    arrow: true,
  },
];

const SOLUTIONS: FooterLink[] = [
  {
    label: "Government, PSU & Institutional Services",
    href: "/solutions/government-institutional",
    arrow: true,
  },
  {
    label: "Capital Markets & Investor Communications",
    href: "/solutions/capital-markets-investor-communications",
    arrow: true,
  },
  {
    label: "International Business & Partnerships",
    href: "/solutions/international-business-partnerships",
    arrow: true,
  },
  {
    label: "Content Acquisition & Distribution",
    href: "/solutions/content-acquisition-distribution",
    arrow: true,
  },
];

/* ============================================================
   FOOTER GROUP
   ============================================================ */

function FooterGroup({
  title,
  links,
}: {
  title: string;
  links: FooterLink[];
}) {
  return (
    <div className="flex min-w-0 flex-col">
      <h3
        className={`
          ${inter.className}
          m-0
          text-[1rem]
          font-semibold
          leading-[1.5rem]
          text-[#1A1A1A]
          [font-feature-settings:'liga'_off,'clig'_off]
        `}
      >
        {title}
      </h3>

      <ul
        className="
          mt-5
          flex
          flex-col
          gap-3
        "
      >
        {links.map((link) => (
          <li
            key={`${title}-${link.label}`}
            className="w-full"
          >
            <Link
              href={link.href}
              className={`
                ${inter.className}

                group

                inline-flex
                max-w-full
                items-center

                gap-1.5

                rounded-[0.5rem]

                text-[0.875rem]
                font-normal
                leading-[1.25rem]

                text-[#1A1A1A]

                [font-feature-settings:'liga'_off,'clig'_off]

                transition-opacity
                duration-200

                hover:opacity-60
              `}
            >
              <span>
                {link.label}
              </span>

              {link.arrow ? (
                <span
                  className="
                    inline-flex
                    shrink-0

                    text-[#969696]

                    transition-transform
                    duration-200

                    group-hover:translate-x-[2px]
                    group-hover:-translate-y-[2px]
                  "
                >
                  <DiagonalArrowIcon />
                </span>
              ) : null}

              {link.soon ? (
                <span
                  className={`
                    ${inter.className}

                    ml-1.5

                    rounded-[0.25rem]

                    bg-[#E8C96A]

                    px-1.5
                    py-1

                    text-[0.6875rem]
                    font-semibold
                    leading-none

                    text-[#604809]
                  `}
                >
                  Soon
                </span>
              ) : null}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ============================================================
   SOCIAL LINK
   ============================================================ */

function SocialLink({
  href,
  label,
  children,
}: {
  href?: string | null;
  label: string;
  children: ReactNode;
}) {
  const className = `
    inline-flex

    h-10
    w-10

    shrink-0

    items-center
    justify-center

    rounded-[6.25rem]

    bg-[rgba(255,255,255,0.10)]

    text-[#1A1A1A]

    backdrop-blur-[4px]

    transition-[transform,background-color]
    duration-200

    hover:-translate-y-0.5
    hover:bg-[rgba(255,255,255,0.22)]

    focus-visible:outline-none
    focus-visible:ring-2
    focus-visible:ring-black/20
  `;

  if (!href) {
    return (
      <span
        aria-label={label}
        className={className}
      >
        {children}
      </span>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className={className}
    >
      {children}
    </a>
  );
}

/* ============================================================
   SOCIAL HELPER
   ============================================================ */

function findSocialHref(
  socialLinks: CmsSiteSettings["socialLinks"],
  aliases: string[],
) {
  const normalizedAliases =
    aliases.map((alias) =>
      alias.toLowerCase(),
    );

  return (
    socialLinks?.find((item) =>
      normalizedAliases.includes(
        item.platform
          .trim()
          .toLowerCase(),
      ),
    )?.url ?? null
  );
}

/* ============================================================
   TOP ACTION
   ============================================================ */

function FooterTopAction({
  cta,
  fallback,
}: {
  cta?: CmsCta | null;
  fallback: CmsCta;
}) {
  const resolved =
    cta?.label?.trim() &&
      cta?.href?.trim()
      ? cta
      : fallback;

  return (
    <Link
      href={resolved.href}
      className={`
        ${inter.className}

        group

        inline-flex

        min-h-[3.25rem]

        w-fit
        max-w-full

        items-center
        justify-center

        gap-1

        rounded-[0.5rem]

        p-4

        text-center

        text-[0.875rem]
        font-medium
        leading-[1.25rem]

        text-[#8F6C1A]

        [font-feature-settings:'liga'_off,'clig'_off]

        transition-[background-color,transform]
        duration-200

        hover:-translate-y-[1px]
        hover:bg-white/30

        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-[#8F6C1A]/25
      `}
    >
      <span>
        {resolved.label}
      </span>

      <span
        aria-hidden="true"
        className="
          inline-flex
          shrink-0

          transition-transform
          duration-200

          group-hover:translate-x-0.5
        "
      >
        <ArrowRightIcon />
      </span>
    </Link>
  );
}

/* ============================================================
   TOP INTRO CARD
   ============================================================ */

function FooterIntroCard({
  icon,
  heading,
  description,
  cta,
  fallbackCta,
}: {
  icon: ReactNode;
  heading: string;
  description: string;
  cta?: CmsCta | null;
  fallbackCta: CmsCta;
}) {
  return (
    <div
      className="
        flex
        h-full
        min-w-0
        flex-col
        items-start
      "
    >
      <span
        className="
          inline-flex

          h-11
          w-11

          shrink-0

          items-center
          justify-center

          rounded-[0.25rem]

          border
          border-[#D6D6D6]

          p-[0.625rem]
        "
      >
        {icon}
      </span>

      <h3
        className={`
          ${inter.className}

          mt-5

          w-full

          text-[1.25rem]
          font-normal
          leading-[1.75rem]

          text-[#1A1A1A]

          [font-feature-settings:'liga'_off,'clig'_off]
        `}
      >
        {heading}
      </h3>

      <p
        className={`
          ${plusJakartaSans.className}

          mt-2

          w-full
          max-w-[23rem]

          text-[0.875rem]
          font-normal
          leading-[1.25rem]

          text-[#969696]

          [font-feature-settings:'liga'_off,'clig'_off]
        `}
      >
        {description}
      </p>

      {/* =====================================================
          Desktop CTA alignment
          ===================================================== */}

      <div
        className="
          mt-6

          lg:mt-auto
          lg:pt-8
        "
      >
        <FooterTopAction
          cta={cta}
          fallback={fallbackCta}
        />
      </div>
    </div>
  );
}

/* ============================================================
   FOOTER
   ============================================================ */

export function Footer({
  settings,
}: {
  settings?: CmsSiteSettings | null;
}) {
  const socialLinks =
    settings?.socialLinks;

  const footer =
    settings?.footer;

  /* ==========================================================
     SOCIAL LINKS
     ========================================================== */

  const xHref =
    findSocialHref(
      socialLinks,
      ["x", "twitter"],
    );

  const facebookHref =
    findSocialHref(
      socialLinks,
      ["facebook", "fb"],
    );

  const instagramHref =
    findSocialHref(
      socialLinks,
      ["instagram", "ig"],
    );

  const youtubeHref =
    findSocialHref(
      socialLinks,
      ["youtube", "yt"],
    );

  const linkedinHref =
    findSocialHref(
      socialLinks,
      ["linkedin", "linked in"],
    );

  /* ==========================================================
     CONTENT
     ========================================================== */

  const heading =
    footer?.heading?.trim() ||
    "Get Started";

  const description =
    footer?.description?.trim() ||
    "Create an account instantly, or contact us to design a custom package for your business.";

  const partnerHeading =
    footer?.partnerHeading?.trim() ||
    "Partner with Us";

  const partnerDescription =
    footer?.partnerDescription?.trim() ||
    "From films and music to technology and distribution, partner with us to create, build and reach new audiences.";

  const growHeading =
    footer?.growHeading?.trim() ||
    "Grow with Us";

  const growDescription =
    footer?.growDescription?.trim() ||
    "Join a growing media ecosystem built around content, technology, regional IP and global opportunities.";

  const marathiWordmark =
    footer?.marathiWordmark?.trim() ||
    DEFAULT_MARATHI_WORDMARK;

  const legalName =
    settings?.legalName?.trim() ||
    "Suman Entertainment & Media PVT LTD";

  const designCredit =
    footer?.designCredit?.trim() ||
    "Design Courtesy NOWT";

  return (
    <footer
      /*
       * IMPORTANT:
       *
       * Lenis does not take ownership of wheel movement while
       * the mouse is over the footer.
       *
       * Native document scrolling therefore remains available
       * all the way to the true bottom of the page.
       */
      data-lenis-prevent-wheel
      className="
        relative
        isolate

        w-full
        min-w-0

        text-[#1A1A1A]
      "
      style={{
        background:
          "linear-gradient(180deg, #F5F1EB 67.87%, #FFEABF 100%)",

        /*
         * Do not trap wheel overscroll inside the footer.
         */
        overscrollBehaviorY:
          "auto",
      }}
    >
      {/* =====================================================
          MAIN FOOTER
          ===================================================== */}

      <div
        className="
          w-full
          min-w-0

          px-5
          pt-12

          sm:px-8
          sm:pt-14

          lg:px-[3.5rem]
          lg:pt-16
        "
      >
        {/* ===================================================
            TOP

            Desktop uses equal-height columns, therefore
            all three CTAs sit on one line.
            =================================================== */}

        <div
          className="
            grid
            items-stretch

            gap-12

            pb-12

            lg:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)_minmax(0,1fr)]
            lg:gap-12
            lg:pb-14

            xl:gap-16
          "
        >
          {/* =================================================
              GET STARTED
              ================================================= */}

          <div
            className="
              flex
              h-full

              w-full
              max-w-[34rem]

              flex-col
              items-start
            "
          >
            <h2
              className={`
                ${inter.className}

                m-0

                text-[2rem]
                font-semibold
                leading-[2.5rem]

                tracking-[-0.03125rem]

                text-[#1A1A1A]

                [font-feature-settings:'liga'_off,'clig'_off]

                sm:text-[2.25rem]
                sm:leading-[2.75rem]

                lg:text-[2.5rem]
                lg:leading-[3rem]
              `}
            >
              {heading}
            </h2>

            <p
              className={`
                ${plusJakartaSans.className}

                mt-4

                w-full
                max-w-[30rem]

                text-[1rem]
                font-normal
                leading-[1.5rem]

                text-[#1A1A1A]

                [font-feature-settings:'liga'_off,'clig'_off]
              `}
            >
              {description}
            </p>

            <div
              className="
                mt-6

                lg:mt-auto
                lg:pt-8
              "
            >
              <FooterTopAction
                cta={footer?.contactCta}
                fallback={{
                  label: "Contact Us",
                  href: "/contact",
                  style: "text",
                }}
              />
            </div>
          </div>

          {/* =================================================
              PARTNER
              ================================================= */}

          <FooterIntroCard
            icon={<PartnerIcon />}
            heading={partnerHeading}
            description={partnerDescription}
            cta={footer?.partnerCta}
            fallbackCta={{
              label: "Become a Partner",
              href: "/partners",
              style: "text",
            }}
          />

          {/* =================================================
              GROW
              ================================================= */}

          <FooterIntroCard
            icon={<GrowthIcon />}
            heading={growHeading}
            description={growDescription}
            cta={footer?.growCta}
            fallbackCta={{
              label: "Explore Investment",
              href: "/investors",
              style: "text",
            }}
          />
        </div>

        {/* ===================================================
            DIVIDER
            =================================================== */}

        <div
          className="
            h-px
            w-full
            bg-black/[0.10]
          "
        />

        {/* ===================================================
            MOBILE / TABLET NAVIGATION

            Desktop has its own shared-row layout below.
            =================================================== */}

        <div
          className="
            grid
            grid-cols-1

            sm:grid-cols-2

            lg:hidden
          "
        >
          {/* COLUMN 1 */}

          <div
            className="
              flex
              flex-col

              gap-14

              py-8

              sm:pr-8
            "
          >
            <FooterGroup
              title="Company"
              links={COMPANY}
            />

            <FooterGroup
              title="Resources"
              links={RESOURCES}
            />
          </div>

          {/* COLUMN 2 */}

          <div
            className="
              flex
              flex-col

              gap-14

              py-8

              sm:pl-8
            "
          >
            <FooterGroup
              title="Product"
              links={PRODUCT}
            />

            <FooterGroup
              title="Investor & Relations"
              links={INVESTOR}
            />
          </div>

          {/* COLUMN 3 */}

          <div
            className="
              flex
              flex-col

              gap-14

              py-8

              sm:pr-8
            "
          >
            <FooterGroup
              title="Services"
              links={SERVICES}
            />

            <FooterGroup
              title="Contact"
              links={CONTACT}
            />
          </div>

          {/* COLUMN 4 */}

          <div
            className="
              flex
              flex-col

              py-8

              sm:pl-8
            "
          >
            <FooterGroup
              title="Solutions"
              links={SOLUTIONS}
            />

            <div
              className="
                mt-10

                flex
                flex-wrap

                items-center

                gap-2
              "
            >
              <SocialLink
                href={xHref}
                label="X"
              >
                <XIcon />
              </SocialLink>

              <SocialLink
                href={facebookHref}
                label="Facebook"
              >
                <FacebookIcon />
              </SocialLink>

              <SocialLink
                href={instagramHref}
                label="Instagram"
              >
                <InstagramIcon />
              </SocialLink>

              <SocialLink
                href={youtubeHref}
                label="YouTube"
              >
                <YouTubeIcon />
              </SocialLink>

              <SocialLink
                href={linkedinHref}
                label="LinkedIn"
              >
                <LinkedinIcon />
              </SocialLink>
            </div>
          </div>
        </div>

        {/* ===================================================
            DESKTOP NAVIGATION

            ONE shared grid.

            Row 1:
            Company / Product / Services

            Row 2:
            Resources / Investor & Relations / Contact

            Because these are actual shared CSS grid rows,
            row 2 is perfectly aligned.
            =================================================== */}

        <div
          className="
            hidden

            lg:grid
            lg:grid-cols-4
            lg:grid-rows-[auto_auto]
          "
        >
          {/* =================================================
              COMPANY
              ================================================= */}

          <div
            className="
              col-start-1
              row-start-1

              border-r
              border-black/[0.10]

              pb-12
              pr-6
              pt-9

              xl:pr-10
            "
          >
            <FooterGroup
              title="Company"
              links={COMPANY}
            />
          </div>

          {/* =================================================
              PRODUCT
              ================================================= */}

          <div
            className="
              col-start-2
              row-start-1

              border-r
              border-black/[0.10]

              px-6
              pb-12
              pt-9

              xl:px-10
            "
          >
            <FooterGroup
              title="Product"
              links={PRODUCT}
            />
          </div>

          {/* =================================================
              SERVICES
              ================================================= */}

          <div
            className="
              col-start-3
              row-start-1

              border-r
              border-black/[0.10]

              px-6
              pb-12
              pt-9

              xl:px-10
            "
          >
            <FooterGroup
              title="Services"
              links={SERVICES}
            />
          </div>

          {/* =================================================
              SOLUTIONS

              Spans both rows.
              ================================================= */}

          <div
            className="
              col-start-4

              row-start-1
              row-span-2

              flex
              min-h-[28rem]
              flex-col

              pb-9
              pl-6
              pt-9

              xl:pl-10
            "
          >
            <FooterGroup
              title="Solutions"
              links={SOLUTIONS}
            />

            <div
              className="
                mt-10

                flex
                flex-wrap

                items-center

                gap-2
              "
            >
              <SocialLink
                href={xHref}
                label="X"
              >
                <XIcon />
              </SocialLink>

              <SocialLink
                href={facebookHref}
                label="Facebook"
              >
                <FacebookIcon />
              </SocialLink>

              <SocialLink
                href={instagramHref}
                label="Instagram"
              >
                <InstagramIcon />
              </SocialLink>

              <SocialLink
                href={youtubeHref}
                label="YouTube"
              >
                <YouTubeIcon />
              </SocialLink>

              <SocialLink
                href={linkedinHref}
                label="LinkedIn"
              >
                <LinkedinIcon />
              </SocialLink>
            </div>
          </div>

          {/* =================================================
              RESOURCES
              ================================================= */}

          <div
            className="
              col-start-1
              row-start-2

              border-r
              border-black/[0.10]

              pb-9
              pr-6
              pt-3

              xl:pr-10
            "
          >
            <FooterGroup
              title="Resources"
              links={RESOURCES}
            />
          </div>

          {/* =================================================
              INVESTOR & RELATIONS
              ================================================= */}

          <div
            className="
              col-start-2
              row-start-2

              border-r
              border-black/[0.10]

              px-6
              pb-9
              pt-3

              xl:px-10
            "
          >
            <FooterGroup
              title="Investor & Relations"
              links={INVESTOR}
            />
          </div>

          {/* =================================================
              CONTACT
              ================================================= */}

          <div
            className="
              col-start-3
              row-start-2

              border-r
              border-black/[0.10]

              px-6
              pb-9
              pt-3

              xl:px-10
            "
          >
            <FooterGroup
              title="Contact"
              links={CONTACT}
            />
          </div>
        </div>
      </div>

      {/* =====================================================
          MARATHI WORDMARK + LEGAL

          This remains part of normal document flow.
          No fixed/sticky positioning.
          No vertical clipping.
          ===================================================== */}

      <div
        className="
          relative

          w-full
          min-w-0

          bg-transparent

          px-5
          pb-7
          pt-12

          sm:px-8
          sm:pt-14

          lg:px-[3.5rem]
          lg:pb-8
          lg:pt-16
        "
      >
        <p
          className={`
            ${devanagari.className}

            mx-auto

            w-full
            max-w-[92rem]

            text-center

            text-[clamp(2.75rem,7.2vw,7.4rem)]

            font-extrabold

            leading-[0.95]

            tracking-[-0.055em]

            text-black
          `}
          lang="mr"
        >
          {marathiWordmark}
        </p>

        {/* ===================================================
            COPYRIGHT

            Always reachable through normal page scroll.
            =================================================== */}

        <div
          className="
            mt-12

            flex
            w-full

            flex-col

            gap-2

            sm:mt-14
            sm:flex-row
            sm:items-center
            sm:justify-between

            lg:mt-16
          "
        >
          <p
            className={`
              ${plusJakartaSans.className}

              text-[0.75rem]
              font-normal
              leading-5

              text-black/45
            `}
          >
            &copy;2026{" "}
            {legalName}
          </p>

          <p
            className={`
              ${plusJakartaSans.className}

              text-[0.75rem]
              font-normal
              leading-5

              text-black/45
            `}
          >
            {designCredit}
          </p>
        </div>
      </div>
    </footer>
  );
}