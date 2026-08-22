import Image from "next/image";
import Link from "next/link";
import { Exo_2, Inter } from "next/font/google";
import type { ReactNode } from "react";

const exo2 = Exo_2({
  subsets: ["latin"],
  weight: ["500", "600"],
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

/* =========================================================
   BIG CTA ARROW
   ========================================================= */

function BigArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 340 120"
      className="h-auto w-full"
      fill="none"
    >
      <path
        d="M4 60H314"
        stroke="currentColor"
        strokeWidth="5"
      />

      <path
        d="M266 8L318 60L266 112"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
    </svg>
  );
}

/* =========================================================
   SMALL DIAGONAL ARROW
   ========================================================= */

function DiagonalArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className="h-3 w-3 shrink-0"
      fill="none"
    >
      <path
        d="M4 12L12 4M6 4h6v6"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* =========================================================
   EXACT SOCIAL ICONS
   ========================================================= */

function XIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M6 5H12L26 27H20L6 5Z"
        stroke="black"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M14.235 17.9414L6 27.0002"
        stroke="black"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M26.0006 5L17.7656 14.0588"
        stroke="black"
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
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
    >
      <g clipPath="url(#footer-facebook-clip)">
        <path
          d="M16 0C7.16352 0 0 7.16352 0 16C0 23.5034 5.16608 29.7997 12.135 31.529V20.8896H8.83584V16H12.135V13.8931C12.135 8.44736 14.5997 5.9232 19.9462 5.9232C20.96 5.9232 22.7091 6.12224 23.4246 6.32064V10.7526C23.047 10.713 22.391 10.6931 21.5763 10.6931C18.953 10.6931 17.9392 11.687 17.9392 14.2707V16H23.1654L22.2675 20.8896H17.9392V31.8829C25.8618 30.9261 32.0006 24.1805 32.0006 16C32 7.16352 24.8365 0 16 0Z"
          fill="black"
        />
      </g>

      <defs>
        <clipPath id="footer-facebook-clip">
          <rect
            width="32"
            height="32"
            fill="white"
          />
        </clipPath>
      </defs>
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M16 21C18.7614 21 21 18.7614 21 16C21 13.2386 18.7614 11 16 11C13.2386 11 11 13.2386 11 16C11 18.7614 13.2386 21 16 21Z"
        stroke="black"
        strokeWidth="2"
        strokeMiterlimit="10"
      />

      <path
        d="M22 4H10C6.68629 4 4 6.68629 4 10V22C4 25.3137 6.68629 28 10 28H22C25.3137 28 28 25.3137 28 22V10C28 6.68629 25.3137 4 22 4Z"
        stroke="black"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M22.5 11C23.3284 11 24 10.3284 24 9.5C24 8.67157 23.3284 8 22.5 8C21.6716 8 21 8.67157 21 9.5C21 10.3284 21.6716 11 22.5 11Z"
        fill="black"
      />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M31.6812 9.60039C31.6812 9.60039 31.3688 7.39414 30.4062 6.42539C29.1875 5.15039 27.825 5.14414 27.2 5.06914C22.725 4.74414 16.0063 4.74414 16.0063 4.74414H15.9937C15.9937 4.74414 9.275 4.74414 4.8 5.06914C4.175 5.14414 2.8125 5.15039 1.59375 6.42539C0.63125 7.39414 0.325 9.60039 0.325 9.60039C0.325 9.60039 0 12.1941 0 14.7816V17.2066C0 19.7941 0.31875 22.3879 0.31875 22.3879C0.31875 22.3879 0.63125 24.5941 1.5875 25.5629C2.80625 26.8379 4.40625 26.7941 5.11875 26.9316C7.68125 27.1754 16 27.2504 16 27.2504C16 27.2504 22.725 27.2379 27.2 26.9191C27.825 26.8441 29.1875 26.8379 30.4062 25.5629C31.3688 24.5941 31.6812 22.3879 31.6812 22.3879C31.6812 22.3879 32 19.8004 32 17.2066V14.7816C32 12.1941 31.6812 9.60039 31.6812 9.60039ZM12.6938 20.1504V11.1566L21.3375 15.6691L12.6938 20.1504Z"
        fill="black"
      />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
    >
      <g clipPath="url(#footer-linkedin-clip)">
        <path
          d="M29.6313 0H2.3625C1.05625 0 0 1.03125 0 2.30625V29.6875C0 30.9625 1.05625 32 2.3625 32H29.6313C30.9375 32 32 30.9625 32 29.6938V2.30625C32 1.03125 30.9375 0 29.6313 0ZM9.49375 27.2687H4.74375V11.9937H9.49375V27.2687ZM7.11875 9.9125C5.59375 9.9125 4.3625 8.68125 4.3625 7.1625C4.3625 5.64375 5.59375 4.4125 7.11875 4.4125C8.6375 4.4125 9.86875 5.64375 9.86875 7.1625C9.86875 8.675 8.6375 9.9125 7.11875 9.9125ZM27.2687 27.2687H22.525V19.8438C22.525 18.075 22.4937 15.7937 20.0562 15.7937C17.5875 15.7937 17.2125 17.725 17.2125 19.7188V27.2687H12.475V11.9937H17.025V14.0813H17.0875C17.7188 12.8813 19.2688 11.6125 21.575 11.6125C26.3813 11.6125 27.2687 14.775 27.2687 18.8875V27.2687Z"
          fill="black"
        />
      </g>

      <defs>
        <clipPath id="footer-linkedin-clip">
          <rect
            width="32"
            height="32"
            fill="white"
          />
        </clipPath>
      </defs>
    </svg>
  );
}

/* =========================================================
   FOOTER DATA
   ========================================================= */

type FooterLink = {
  label: string;
  href: string;
  arrow?: boolean;
  soon?: boolean;
};

const COMPANY: FooterLink[] = [
  { label: "About us", href: "/about" },
  { label: "Careers", href: "/careers" },
  { label: "Leadership", href: "/leadership" },
  {
    label: "Our Journey",
    href: "/about#journey",
  },
  {
    label: "Contact us",
    href: "/contact",
  },
  {
    label: "Become a Part",
    href: "/careers",
  },
];

const RESOURCES: FooterLink[] = [
  {
    label: "News and Blogs",
    href: "/insights",
  },
  {
    label: "Case study",
    href: "/case-studies",
  },
  {
    label: "FAQ",
    href: "/#faq",
  },
  {
    label: "Terms and Condition",
    href: "/terms",
  },
  {
    label: "Privacy Policy",
    href: "/privacy",
  },
];

const PRODUCT: FooterLink[] = [
  {
    label:
      "OTT, Digital Platforms & Streaming",
    href:
      "/products/ott-digital-platforms-streaming",
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
    label:
      "AI & Emerging Technology",
    href:
      "/products/ai-emerging-technology",
  },
  {
    label:
      "Content and Music Library Management",
    href:
      "/products/content-music-library",
  },
  {
    label:
      "Publication & Knowledge Platforms",
    href:
      "/products/publication-knowledge-platforms",
  },
  {
    label:
      "Intellectual Property Development",
    href:
      "/products/intellectual-property-development",
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
    href:
      "/investors/company-profile",
  },
  {
    label: "IPO 2027",
    href: "/investors",
    soon: true,
  },
];

const SERVICES: FooterLink[] = [
  {
    label:
      "Media & Content Production",
    href:
      "/services/media-content-production",
  },
  {
    label:
      "Music & Audio Division",
    href:
      "/services/music-audio-experiences",
  },
  {
    label:
      "Events and Experiences",
    href:
      "/services/live-experiences-events",
  },
  {
    label:
      "Tech & Digital Transformation",
    href:
      "/services/technology-digital-transformation",
  },
  {
    label:
      "Content and Music Library Management",
    href:
      "/services/content-music-library-management",
  },
  {
    label:
      "Publication & Knowledge Platforms",
    href:
      "/services/publication-knowledge-platforms",
  },
  {
    label:
      "Intellectual Property Development",
    href:
      "/services/intellectual-property-development",
  },
  {
    label:
      "Talent and Creator Ecosystem",
    href:
      "/services/talent-creator-ecosystem",
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
    href:
      "/contact?type=business",
    arrow: true,
  },
  {
    label:
      "Partnership Enquiry",
    href:
      "/contact?type=partnership",
    arrow: true,
  },
];

const SOLUTION: FooterLink[] = [
  {
    label:
      "Government, PSU & Institutional Services",
    href:
      "/solutions/government-institutional",
    arrow: true,
  },
  {
    label:
      "Capital Markets & Investor Communications",
    href:
      "/solutions/capital-markets-investor-communications",
    arrow: true,
  },
  {
    label:
      "International Business & Partnerships",
    href:
      "/solutions/international-business-partnerships",
    arrow: true,
  },
  {
    label:
      "Content Acquisition & Distribution",
    href:
      "/solutions/content-acquisition-distribution",
    arrow: true,
  },
];

/* =========================================================
   FOOTER GROUP
   ========================================================= */

function FooterGroup({
  title,
  links,
}: {
  title: string;
  links: FooterLink[];
}) {
  return (
    <div className="flex flex-col">
      <h3
        className={`
          ${inter.className}
          mb-7
          text-[0.6875rem]
          font-semibold
          leading-none
          tracking-[-0.015em]
          text-[#1b2233]
        `}
      >
        {title}
      </h3>

      <ul
        className="
          flex
          flex-col
          gap-[1.05rem]
        "
      >
        {links.map((link) => (
          <li
            key={`${title}-${link.label}`}
          >
            <Link
              href={link.href}
              className={`
                ${inter.className}
                group
                inline-flex
                max-w-full
                items-center
                gap-1
                text-[0.72rem]
                font-normal
                leading-[1.45]
                text-black/38
                transition-colors
                duration-200
                hover:text-black
              `}
            >
              <span>
                {link.label}
              </span>

              {link.arrow ? (
                <span
                  className="
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
                    ml-2
                    rounded-[0.2rem]
                    bg-[#DDB757]
                    px-1.5
                    py-[0.15rem]
                    text-[0.5rem]
                    font-semibold
                    leading-none
                    text-black/80
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

/* =========================================================
   SOCIAL BUTTON
   ========================================================= */

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="
        group
        inline-flex
        h-12
        w-12
        shrink-0
        items-center
        justify-center
        rounded-[6.25rem]
        bg-[rgba(255,255,255,0.10)]
        backdrop-blur-[4px]
        transition-all
        duration-300
        hover:-translate-y-1
        hover:bg-[rgba(255,255,255,0.18)]
        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-white/40
      "
      style={{
        WebkitBackdropFilter:
          "blur(4px)",
      }}
    >
      <span
        className="
          flex
          h-8
          w-8
          items-center
          justify-center
          transition-transform
          duration-300
          group-hover:scale-105
        "
      >
        {children}
      </span>
    </a>
  );
}

/* =========================================================
   FOOTER
   ========================================================= */

export function Footer() {
  return (
    <footer
      className="
        relative
        isolate
        w-full
        overflow-hidden
        bg-[#f3f0eb]
        text-black
      "
    >
      {/* ===================================================
          MAIN CONTENT
          =================================================== */}

      <div
        className="
          relative
          z-20
          mx-auto
          w-full
          max-w-[90rem]
          px-5
          pt-14
          sm:px-8
          lg:px-[3.5rem]
          lg:pt-[4.75rem]
        "
      >
        {/* =================================================
            GET STARTED
            ================================================= */}

        <Link
          href="/contact"
          className="
            group
            grid
            w-full
            grid-cols-1
            items-center
            gap-6
            lg:grid-cols-[minmax(0,0.56fr)_minmax(20rem,0.44fr)]
            lg:gap-10
          "
        >
          <h2
            className={`
              ${exo2.className}
              whitespace-nowrap
              text-[clamp(4rem,8.6vw,7.75rem)]
              font-medium
              leading-[0.92]
              tracking-[-0.065em]
              text-black
            `}
          >
            Get started
          </h2>

          <div
            className="
              w-full
              max-w-[29rem]
              justify-self-start
              text-black
              transition-transform
              duration-500
              ease-out
              group-hover:translate-x-3
              lg:max-w-none
            "
          >
            <BigArrowIcon />
          </div>
        </Link>

        {/* =================================================
            INTRO
            ================================================= */}

        <p
          className={`
            ${inter.className}
            mt-8
            max-w-[39rem]
            text-[0.72rem]
            font-normal
            leading-[1.55]
            text-black/25
            lg:mt-10
          `}
        >
          From creating original content and
          building digital platforms to
          strategic communications and global
          distribution, our integrated
          capabilities help businesses,
          creators,
        </p>

        <div
          className="
            mt-10
            h-px
            w-full
            bg-black/[0.08]
            lg:mt-11
          "
        />

        {/* =================================================
            4-COLUMN GRID
            ================================================= */}

        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-4
          "
        >
          {/* COLUMN 1 */}

          <div
            className="
              flex
              flex-col
              gap-[5.25rem]
              py-10
              sm:pr-8
              lg:min-h-[31rem]
              lg:border-r
              lg:border-black/[0.07]
              lg:py-8
              lg:pr-8
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
              gap-[4.3rem]
              py-10
              sm:pl-8
              lg:min-h-[31rem]
              lg:border-r
              lg:border-black/[0.07]
              lg:px-8
              lg:py-8
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
              gap-[4.3rem]
              py-10
              sm:pr-8
              lg:min-h-[31rem]
              lg:border-r
              lg:border-black/[0.07]
              lg:px-8
              lg:py-8
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
              py-10
              sm:pl-8
              lg:min-h-[31rem]
              lg:py-8
              lg:pl-8
            "
          >
            <FooterGroup
              title="Solution"
              links={SOLUTION}
            />
          </div>
        </div>
      </div>

      {/* ===================================================
          IMAGE / CROWD FOOTER
          =================================================== */}

      <div
        className="
          relative
          mt-0
          h-[18rem]
          w-full
          overflow-hidden
          sm:h-[21rem]
          lg:h-[22rem]
        "
      >
        {/* BACKGROUND IMAGE */}

        <Image
          src="/images/footer/footer.png"
          alt=""
          fill
          sizes="100vw"
          className="
            z-0
            object-cover
            object-center
            grayscale
          "
        />

        {/* TOP FADE */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-x-0
            top-0
            z-10
            h-[5rem]
            bg-gradient-to-b
            from-[#f3f0eb]
            via-[#f3f0eb]/55
            to-transparent
          "
        />

        {/* BOTTOM DARKEN */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-0
            z-10
            bg-gradient-to-b
            from-transparent
            via-transparent
            to-black/20
          "
        />

        {/* =================================================
            LIVE IMAGE OVERLAY
            ================================================= */}

        <div
          className="
            relative
            z-20
            mx-auto
            flex
            h-full
            w-full
            max-w-[90rem]
            flex-col
            justify-between
            px-5
            pb-6
            pt-14
            sm:px-8
            lg:px-[3.5rem]
            lg:pb-7
            lg:pt-12
          "
        >
          {/* =================================================
              TOP ROW
              ================================================= */}

          <div
            className="
    flex
    items-start
    justify-between
    gap-8
  "
          >
            {/* LOGO */}

            <Link
              href="/"
              aria-label="Suman Entertainment & Media"
              className="
      inline-flex
      shrink-0
      items-center
      transition-opacity
      duration-300
      hover:opacity-80
    "
            >
              <span
                aria-hidden="true"
                className="
        block
        h-[3.25rem]
        w-[10.5rem]
        bg-white
        sm:h-[3.5rem]
        sm:w-[11.5rem]
        lg:h-[3.75rem]
        lg:w-[12.5rem]
      "
                style={{
                  WebkitMaskImage: 'url("/images/logo.png")',
                  maskImage: 'url("/images/logo.png")',
                  WebkitMaskRepeat: "no-repeat",
                  maskRepeat: "no-repeat",
                  WebkitMaskPosition: "left center",
                  maskPosition: "left center",
                  WebkitMaskSize: "contain",
                  maskSize: "contain",
                }}
              />
            </Link>

            {/* SOCIAL ICONS */}

            <div
              className="
      flex
      flex-wrap
      items-center
      justify-end
      gap-2
      sm:gap-3
    "
            >
              <SocialLink href="#" label="X">
                <XIcon />
              </SocialLink>

              <SocialLink href="#" label="Facebook">
                <FacebookIcon />
              </SocialLink>

              <SocialLink href="#" label="Instagram">
                <InstagramIcon />
              </SocialLink>

              <SocialLink href="#" label="YouTube">
                <YouTubeIcon />
              </SocialLink>

              <SocialLink href="#" label="LinkedIn">
                <LinkedinIcon />
              </SocialLink>
            </div>
          </div>

          {/* =================================================
              LEGAL ROW
              ================================================= */}

          <div
            className="
              flex
              flex-col
              gap-3
              sm:flex-row
              sm:items-center
              sm:justify-between
            "
          >
            <p
              className={`
                ${inter.className}
                text-[0.58rem]
                font-normal
                leading-4
                text-white/55
              `}
            >
              ©2026 Suman Entertainment &amp;
              Media PVT LTD
            </p>

            <p
              className={`
                ${inter.className}
                text-[0.58rem]
                font-normal
                leading-4
                text-white/55
              `}
            >
              Design Courtesy NOWT
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}