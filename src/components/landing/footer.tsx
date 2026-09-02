import Link from "next/link";
import {
  notoSansDevanagari as devanagari,
  plusJakartaSans as body,
  plusJakartaSans as display,
} from "@/lib/fonts";
import type { ReactNode } from "react";

import type { CmsCta, CmsSiteSettings } from "@/types/cms";

const DEFAULT_MARATHI_WORDMARK = "\u0938\u0941\u092e\u0928 \u090f\u0902\u091f\u0930\u091f\u0947\u0928\u092e\u0947\u0902\u091f \u0905\u0901\u0921 \u092e\u0940\u0921\u093f\u092f\u093e";

function ArrowRightIcon({ className = "h-3 w-3" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" className={className} fill="none">
      <path
        d="M3.5 8h8M8.5 5l3 3-3 3"
        stroke="currentColor"
        strokeWidth="1.15"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DiagonalArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" className="h-3 w-3 shrink-0" fill="none">
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

function PartnerIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none">
      <path
        d="M8.25 11.25a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM15.75 10.25a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5ZM3.75 18.5c.5-3 2.1-4.5 4.5-4.5s4 1.5 4.5 4.5M13 14.25c.7-.65 1.6-.95 2.75-.95 2.05 0 3.45 1.2 4 3.6"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function GrowthIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none">
      <path
        d="M5 17 10 12l3 3 6-7M15 8h4v4"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function XIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none" className="h-[1.15rem] w-[1.15rem]" aria-hidden="true">
      <path d="M6 5H12L26 27H20L6 5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14.235 17.9414L6 27.0002" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M26.0006 5L17.7656 14.0588" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none" className="h-[1.15rem] w-[1.15rem]" aria-hidden="true">
      <path d="M16 0C7.16352 0 0 7.16352 0 16C0 23.5034 5.16608 29.7997 12.135 31.529V20.8896H8.83584V16H12.135V13.8931C12.135 8.44736 14.5997 5.9232 19.9462 5.9232C20.96 5.9232 22.7091 6.12224 23.4246 6.32064V10.7526C23.047 10.713 22.391 10.6931 21.5763 10.6931C18.953 10.6931 17.9392 11.687 17.9392 14.2707V16H23.1654L22.2675 20.8896H17.9392V31.8829C25.8618 30.9261 32.0006 24.1805 32.0006 16C32 7.16352 24.8365 0 16 0Z" fill="currentColor" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none" className="h-[1.15rem] w-[1.15rem]" aria-hidden="true">
      <path d="M16 21C18.7614 21 21 18.7614 21 16C21 13.2386 18.7614 11 16 11C13.2386 11 11 13.2386 11 16C11 18.7614 13.2386 21 16 21Z" stroke="currentColor" strokeWidth="2" strokeMiterlimit="10" />
      <path d="M22 4H10C6.68629 4 4 6.68629 4 10V22C4 25.3137 6.68629 28 10 28H22C25.3137 28 28 25.3137 28 22V10C28 6.68629 25.3137 4 22 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M22.5 11C23.3284 11 24 10.3284 24 9.5C24 8.67157 23.3284 8 22.5 8C21.6716 8 21 8.67157 21 9.5C21 10.3284 21.6716 11 22.5 11Z" fill="currentColor" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none" className="h-[1.15rem] w-[1.15rem]" aria-hidden="true">
      <path d="M31.6812 9.60039C31.6812 9.60039 31.3688 7.39414 30.4062 6.42539C29.1875 5.15039 27.825 5.14414 27.2 5.06914C22.725 4.74414 16.0063 4.74414 16.0063 4.74414H15.9937C15.9937 4.74414 9.275 4.74414 4.8 5.06914C4.175 5.14414 2.8125 5.15039 1.59375 6.42539C0.63125 7.39414 0.325 9.60039 0.325 9.60039C0.325 9.60039 0 12.1941 0 14.7816V17.2066C0 19.7941 0.31875 22.3879 0.31875 22.3879C0.31875 22.3879 0.63125 24.5941 1.5875 25.5629C2.80625 26.8379 4.40625 26.7941 5.11875 26.9316C7.68125 27.1754 16 27.2504 16 27.2504C16 27.2504 22.725 27.2379 27.2 26.9191C27.825 26.8441 29.1875 26.8379 30.4062 25.5629C31.3688 24.5941 31.6812 22.3879 31.6812 22.3879C31.6812 22.3879 32 19.8004 32 17.2066V14.7816C32 12.1941 31.6812 9.60039 31.6812 9.60039ZM12.6938 20.1504V11.1566L21.3375 15.6691L12.6938 20.1504Z" fill="currentColor" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none" className="h-[1.15rem] w-[1.15rem]" aria-hidden="true">
      <path d="M29.6313 0H2.3625C1.05625 0 0 1.03125 0 2.30625V29.6875C0 30.9625 1.05625 32 2.3625 32H29.6313C30.9375 32 32 30.9625 32 29.6938V2.30625C32 1.03125 30.9375 0 29.6313 0ZM9.49375 27.2687H4.74375V11.9937H9.49375V27.2687ZM7.11875 9.9125C5.59375 9.9125 4.3625 8.68125 4.3625 7.1625C4.3625 5.64375 5.59375 4.4125 7.11875 4.4125C8.6375 4.4125 9.86875 5.64375 9.86875 7.1625C9.86875 8.675 8.6375 9.9125 7.11875 9.9125ZM27.2687 27.2687H22.525V19.8438C22.525 18.075 22.4937 15.7937 20.0562 15.7937C17.5875 15.7937 17.2125 17.725 17.2125 19.7188V27.2687H12.475V11.9937H17.025V14.0813H17.0875C17.7188 12.8813 19.2688 11.6125 21.575 11.6125C26.3813 11.6125 27.2687 14.775 27.2687 18.8875V27.2687Z" fill="currentColor" />
    </svg>
  );
}

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
  { label: "Our Journey", href: "/about#journey" },
  { label: "Contact us", href: "/contact" },
  { label: "Become a Part", href: "/careers" },
];

const RESOURCES: FooterLink[] = [
  { label: "News and Blogs", href: "/insights" },
  { label: "Case study", href: "/case-studies" },
  { label: "FAQ", href: "/#faq" },
  { label: "Terms and Condition", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
];

const PRODUCT: FooterLink[] = [
  { label: "OTT, Digital Platforms & Streaming", href: "/products/ott-digital-platforms-streaming" },
  { label: "Monetization Modal", href: "/products/monetization" },
  { label: "Fast Channel", href: "/products/fast-channel" },
  { label: "AI & Emerging Technology", href: "/products/ai-emerging-technology" },
  { label: "Content and Music Library Management", href: "/products/content-music-library" },
  { label: "Publication & Knowledge Platforms", href: "/products/publication-knowledge-platforms" },
  { label: "Intellectual Property Development", href: "/products/intellectual-property-development" },
];

const INVESTOR: FooterLink[] = [
  { label: "Financials Data", href: "/investors/financials" },
  { label: "Roadmap", href: "/investors/roadmap" },
  { label: "Company Profile", href: "/investors/company-profile" },
  { label: "IPO 2027", href: "/investors", soon: true },
];

const SERVICES: FooterLink[] = [
  { label: "Media & Content Production", href: "/services/media-content-production" },
  { label: "Music & Audio Division", href: "/services/music-audio-experiences" },
  { label: "Events and Experiences", href: "/services/live-experiences-events" },
  { label: "Tech & Digital Transformation", href: "/services/technology-digital-transformation" },
  { label: "Content and Music Library Management", href: "/services/content-music-library-management" },
  { label: "Publication & Knowledge Platforms", href: "/services/publication-knowledge-platforms" },
  { label: "Intellectual Property Development", href: "/services/intellectual-property-development" },
  { label: "Talent and Creator Ecosystem", href: "/services/talent-creator-ecosystem" },
];

const CONTACT: FooterLink[] = [
  { label: "Contact Information", href: "/contact", arrow: true },
  { label: "Business Enquiry", href: "/contact?type=business", arrow: true },
  { label: "Partnership Enquiry", href: "/contact?type=partnership", arrow: true },
];

const SOLUTIONS: FooterLink[] = [
  { label: "Government, PSU & Institutional Services", href: "/solutions/government-institutional", arrow: true },
  { label: "Capital Markets & Investor Communications", href: "/solutions/capital-markets-investor-communications", arrow: true },
  { label: "International Business & Partnerships", href: "/solutions/international-business-partnerships", arrow: true },
  { label: "Content Acquisition & Distribution", href: "/solutions/content-acquisition-distribution", arrow: true },
];

function FooterGroup({ title, links }: { title: string; links: FooterLink[] }) {
  return (
    <div className="flex flex-col">
      <h3 className={`${body.className} mb-5 text-[0.75rem] font-semibold uppercase leading-4 tracking-[0.01em] text-[#161616]`}>
        {title}
      </h3>

      <ul className="flex flex-col gap-[0.72rem]">
        {links.map((link) => (
          <li key={`${title}-${link.label}`}>
            <Link
              href={link.href}
              className={`${body.className} group inline-flex max-w-full items-center gap-1.5 text-[0.75rem] font-normal leading-[1.5] text-black/62 transition-colors duration-200 hover:text-black`}
            >
              <span>{link.label}</span>
              {link.arrow ? (
                <span className="text-black/38 transition-transform duration-200 group-hover:translate-x-[2px] group-hover:-translate-y-[2px] group-hover:text-black">
                  <DiagonalArrowIcon />
                </span>
              ) : null}
              {link.soon ? (
                <span className={`${body.className} ml-1.5 rounded-[0.18rem] bg-[#E8C96A] px-1.5 py-[0.15rem] text-[0.6875rem] font-semibold leading-none text-[#604809]`}>
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

function SocialLink({ href, label, children }: { href?: string | null; label: string; children: ReactNode }) {
  const className = "inline-flex h-8 w-8 items-center justify-center text-black transition-transform duration-200 hover:-translate-y-0.5 hover:scale-105 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-black/30";

  if (!href) {
    return (
      <span aria-label={label} className={className}>
        {children}
      </span>
    );
  }

  return (
    <a href={href} target="_blank" rel="noreferrer" aria-label={label} className={className}>
      {children}
    </a>
  );
}

function findSocialHref(socialLinks: CmsSiteSettings["socialLinks"], aliases: string[]) {
  const normalizedAliases = aliases.map((alias) => alias.toLowerCase());
  return socialLinks?.find((item) => normalizedAliases.includes(item.platform.trim().toLowerCase()))?.url ?? null;
}

function FooterAction({ cta, fallback }: { cta?: CmsCta | null; fallback: CmsCta }) {
  const resolved = cta?.label?.trim() && cta?.href?.trim() ? cta : fallback;
  return (
    <Link
      href={resolved.href}
      className={`${body.className} group inline-flex w-fit items-center gap-1.5 text-[0.75rem] font-medium leading-5 text-[#9B7417] transition-colors hover:text-[#5F4308]`}
    >
      <span>{resolved.label}</span>
      <span className="transition-transform duration-200 group-hover:translate-x-0.5">
        <ArrowRightIcon />
      </span>
    </Link>
  );
}

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
    <div className="flex min-w-0 flex-col items-start">
      <span className="mb-5 inline-flex h-9 w-9 items-center justify-center rounded-[0.18rem] border border-black/12 text-black/80">
        {icon}
      </span>
      <h3 className={`${display.className} text-[0.875rem] font-medium leading-5 text-[#171717]`}>
        {heading}
      </h3>
      <p className={`${body.className} mt-2 max-w-[18rem] text-[0.75rem] font-normal leading-[1.5] text-black/50 lg:max-w-[15rem] lg:text-black/40`}>
        {description}
      </p>
      <div className="mt-7">
        <FooterAction cta={cta} fallback={fallbackCta} />
      </div>
    </div>
  );
}

export function Footer({ settings }: { settings?: CmsSiteSettings | null }) {
  const socialLinks = settings?.socialLinks;
  const footer = settings?.footer;

  const xHref = findSocialHref(socialLinks, ["x", "twitter"]);
  const facebookHref = findSocialHref(socialLinks, ["facebook", "fb"]);
  const instagramHref = findSocialHref(socialLinks, ["instagram", "ig"]);
  const youtubeHref = findSocialHref(socialLinks, ["youtube", "yt"]);
  const linkedinHref = findSocialHref(socialLinks, ["linkedin", "linked in"]);

  const heading = footer?.heading?.trim() || "Get started";
  const description = footer?.description?.trim() || "Create an account instantly, or contact us to design a custom package for your business.";
  const partnerHeading = footer?.partnerHeading?.trim() || "Partner with us";
  const partnerDescription = footer?.partnerDescription?.trim() || "From films and music to technology and distribution, partner with us to create, build and reach new audiences.";
  const growHeading = footer?.growHeading?.trim() || "Grow with us";
  const growDescription = footer?.growDescription?.trim() || "Join a growing media ecosystem built around content, technology, regional IP and global opportunities.";
  const marathiWordmark = footer?.marathiWordmark?.trim() || DEFAULT_MARATHI_WORDMARK;
  const legalName = settings?.legalName?.trim() || "Suman Entertainment & Media PVT LTD";
  const designCredit = footer?.designCredit?.trim() || "Design Courtesy NOWT";

  return (
    <footer className="relative isolate w-full overflow-hidden bg-white text-black">
      <div className="w-full px-5 pt-10 sm:px-8 sm:pt-12 lg:px-[3.5rem] lg:pt-14 xl:px-[4rem]">
        <div className="grid gap-10 pb-9 lg:grid-cols-[minmax(0,2.05fr)_minmax(13rem,0.95fr)_minmax(13rem,0.95fr)] lg:gap-14 lg:pb-11">
          <div className="max-w-[31rem]">
            <h2 className={`${display.className} text-[1.55rem] font-semibold leading-[1.12] tracking-[-0.035em] text-[#111] sm:text-[1.8rem] lg:text-[2rem]`}>
              {heading}
            </h2>
            <p className={`${body.className} mt-4 max-w-[27rem] text-[0.875rem] leading-[1.55] text-black/58`}>
              {description}
            </p>
            <div className="mt-10">
              <FooterAction cta={footer?.contactCta} fallback={{ label: "Contact us", href: "/contact", style: "text" }} />
            </div>
          </div>

          <FooterIntroCard
            icon={<PartnerIcon />}
            heading={partnerHeading}
            description={partnerDescription}
            cta={footer?.partnerCta}
            fallbackCta={{ label: "Become a partner", href: "/contact?type=partnership", style: "text" }}
          />

          <FooterIntroCard
            icon={<GrowthIcon />}
            heading={growHeading}
            description={growDescription}
            cta={footer?.growCta}
            fallbackCta={{ label: "Explore investment", href: "/investors", style: "text" }}
          />
        </div>

        <div className="h-px w-full bg-black/[0.08]" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-[4.25rem] py-7 sm:pr-8 lg:min-h-[27rem] lg:border-r lg:border-black/[0.09] lg:py-7 lg:pr-9">
            <FooterGroup title="Company" links={COMPANY} />
            <FooterGroup title="Resources" links={RESOURCES} />
          </div>

          <div className="flex flex-col gap-[3.5rem] py-7 sm:pl-8 lg:min-h-[27rem] lg:border-r lg:border-black/[0.09] lg:px-9 lg:py-7">
            <FooterGroup title="Product" links={PRODUCT} />
            <FooterGroup title="Investor & Relations" links={INVESTOR} />
          </div>

          <div className="flex flex-col gap-[3.5rem] py-7 sm:pr-8 lg:min-h-[27rem] lg:border-r lg:border-black/[0.09] lg:px-9 lg:py-7">
            <FooterGroup title="Services" links={SERVICES} />
            <FooterGroup title="Contact" links={CONTACT} />
          </div>

          <div className="flex flex-col py-7 sm:pl-8 lg:min-h-[27rem] lg:py-7 lg:pl-9">
            <FooterGroup title="Solutions" links={SOLUTIONS} />

            <div className="mt-8 flex flex-wrap items-center gap-2 sm:mt-10">
              <SocialLink href={xHref} label="X"><XIcon /></SocialLink>
              <SocialLink href={facebookHref} label="Facebook"><FacebookIcon /></SocialLink>
              <SocialLink href={instagramHref} label="Instagram"><InstagramIcon /></SocialLink>
              <SocialLink href={youtubeHref} label="YouTube"><YouTubeIcon /></SocialLink>
              <SocialLink href={linkedinHref} label="LinkedIn"><LinkedinIcon /></SocialLink>
            </div>
          </div>
        </div>
      </div>

      <div className="relative border-t border-black/[0.03] bg-[linear-gradient(180deg,#ffffff_0%,#fff9ec_30%,#ffedbf_100%)] px-5 pb-7 pt-12 sm:px-8 sm:pt-14 lg:px-[3.5rem] lg:pb-8 lg:pt-16 xl:px-[4rem]">
        <p
          className={`${devanagari.className} mx-auto max-w-[92rem] text-center text-[clamp(2.75rem,7.2vw,7.4rem)] font-extrabold leading-[0.95] tracking-[-0.055em] text-black`}
          lang="mr"
        >
          {marathiWordmark}
        </p>

        <div className="mt-12 flex flex-col gap-2 sm:mt-14 sm:flex-row sm:items-center sm:justify-between lg:mt-16">
          <p className={`${body.className} text-[0.75rem] font-normal leading-5 text-black/45 lg:text-black/35`}>
            &copy;2026 {legalName}
          </p>
          <p className={`${body.className} text-[0.75rem] font-normal leading-5 text-black/45 lg:text-black/35`}>
            {designCredit}
          </p>
        </div>
      </div>
    </footer>
  );
}
