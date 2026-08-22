"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

/* =========================================================
   NAV DATA

   Edit dropdown contents and link targets here. Sub-lines
   render as plain text (they describe offerings that do not
   have dedicated pages yet); give an entry a real href when
   its page exists.
   ========================================================= */

type MenuEntry = {
  label: string;
  href: string;
  /** short gray lines listed under the gold link */
  sublines?: string[];
  /** gray paragraph under the gold link */
  subtext?: string;
};

type MenuColumn = {
  heading: string;
  entries: MenuEntry[];
  image?: { src: string; alt: string };
};

type NavMenu = {
  id: string;
  label: string;
  columns: MenuColumn[];
  featured?: {
    href: string;
    imageSrc: string;
    imageAlt: string;
    tag: string;
    title: string;
  };
  /** CSS grid-template-columns for the panel */
  gridColumns: string;
};

const NAV_MENUS: NavMenu[] = [
  {
    id: "product",
    label: "Product",
    gridColumns: "1fr 1fr 1.5fr",
    columns: [
      {
        heading: "Digital Platforms",
        entries: [
          { label: "OTT, Digital Platforms & Streaming", href: "/companies" },
          { label: "Monetization Model", href: "/companies" },
          { label: "Fast Channel", href: "/companies" },
          { label: "AI & Emerging Technology", href: "/companies" },
          { label: "Tech & Digital Transformation", href: "/companies" },
        ],
      },
      {
        heading: "Content Assets",
        entries: [
          { label: "Content and Music Library Management", href: "/services" },
          { label: "Publication & Knowledge Platforms", href: "/services" },
          { label: "Intellectual Property Development", href: "/services" },
        ],
      },
    ],
    featured: {
      href: "/companies",
      imageSrc: "/images/landing/hero/Image1.png",
      imageAlt: "Raja Shivchhatrapati on Abhijat Marathi OTT",
      tag: "OTT",
      title: "Abhijat Marathi OTT",
    },
  },
  {
    id: "services",
    label: "Services",
    gridColumns: "1fr 1fr 1.1fr 0.7fr",
    columns: [
      {
        heading: "Media and Production",
        entries: [
          { label: "Media & Content Syndication", href: "/services" },
          { label: "Music & Audio Division", href: "/services" },
          { label: "Events and Experiences", href: "/services" },
          { label: "AI & Emerging Technology", href: "/services" },
          { label: "Tech & Digital Transformation", href: "/services" },
        ],
      },
      {
        heading: "Marketing and Brand Services",
        entries: [
          { label: "Content and Music Library Management", href: "/services" },
          { label: "Publication & Knowledge Platforms", href: "/services" },
          { label: "Intellectual Property Development", href: "/services" },
        ],
      },
      {
        heading: "Creator Services",
        entries: [
          {
            label: "Talent and Creator Ecosystem",
            href: "/services",
            sublines: [
              "Artist, Celebrity, Influencer Management",
              "Speaker Bureau",
              "Brand Endorsements",
              "Content Creator Network",
            ],
          },
        ],
      },
      {
        heading: "Any Specific Need?",
        entries: [{ label: "Call now?", href: "/contact" }],
      },
    ],
  },
  {
    id: "solutions",
    label: "Solutions",
    gridColumns: "1.1fr 1.1fr 1fr",
    columns: [
      {
        heading: "Government & Institutional",
        entries: [
          {
            label: "Govt, PSU & Institutional Solutions",
            href: "/services",
            sublines: [
              "State/Central Government Empanelment",
              "Citizen Engagement Programs",
              "Tourism Promotion",
              "Heritage Promotion",
              "IEC & Public Awareness Campaigns",
              "Event Management",
            ],
          },
        ],
      },
      {
        heading: "Capital & Business Growth",
        entries: [
          {
            label: "IPO & Investor Ecosystem",
            href: "/about",
            subtext:
              "Investor Relations, Shareholder Communications, Digital Roadshow, Financial PR, Listed Company Communication",
          },
          {
            label: "International Business & Global Partnership",
            href: "/services",
            subtext:
              "Co-Productions, Film Festivals, International Markets, Global Distribution, Strategic Alliances, Market Representation",
          },
        ],
      },
      {
        heading: "Distribution & Licensing",
        entries: [
          {
            label: "Content Acquisition & Distribution",
            href: "/services",
            subtext:
              "Film & Music Rights Acquisition, OTT Rights, Satellite Rights, FAST Channel Content Acquisition, International Distribution, Syndication",
          },
        ],
        image: {
          src: "/images/landing/hero/Image2.jpg",
          alt: "Live concert audience",
        },
      },
    ],
  },
];

const NAV_LINKS = [
  { label: "Investor Relations", href: "/about" },
  { label: "Careers", href: "/careers" },
];

/* =========================================================
   ICONS + LOGO
   ========================================================= */

function SumanLogo() {
  return (
    <span
      className={`inline-flex shrink-0 ${
        isLandingPage ? "items-center" : "flex-col items-center"
      }`}
    >
      <svg
        aria-hidden="true"
        className={`shrink-0 [&_path]:fill-current ${
          isLandingPage
            ? "h-6 w-[8.3805rem] text-white mix-blend-luminosity"
            : "h-[1.625rem] w-[9.125rem] text-[#B8860B]"
        }`}
        viewBox="0 0 135 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g style={isLandingPage ? { mixBlendMode: "luminosity" } : undefined}>
        <path d="M79.7514 3.99607C79.7752 3.99808 79.8496 4.04649 79.8763 4.06196C79.9195 4.5525 79.8488 5.65801 79.8444 6.20522L79.828 10.6563L79.8191 18.5979C79.8183 19.6575 79.8987 22.841 79.6458 23.6857C79.3432 24.0951 74.9876 24.0429 74.6181 23.8262C74.2954 23.4757 74.3742 20.441 74.3653 19.7607L74.3058 11.7311C73.5028 12.8702 72.6239 13.825 71.7703 14.9037C70.0334 17.0993 68.1144 19.2468 66.3916 21.4399C63.8768 18.229 61.0374 15.0225 58.4721 11.805L58.4427 16.2684C58.4352 17.2677 58.6117 23.254 58.1736 23.7484C57.9995 23.9449 57.5212 23.9583 57.274 23.9649C56.6592 23.9816 53.5385 24.0955 53.1924 23.744C52.9921 23.5404 53.002 23.1429 52.9877 22.8745C52.9357 21.9033 52.9756 20.9171 52.9769 19.9438L52.9762 14.7959C52.9749 11.3128 52.8784 7.40458 52.9796 3.97443C54.7297 4.14726 56.7366 3.92252 58.5113 3.99852C59.3871 4.036 59.5869 3.91047 60.1578 4.65922C60.8229 5.53158 61.4668 6.40788 62.1182 7.28388L66.228 12.8208C66.6296 12.2298 72.6373 4.12569 73.0076 4.0833C74.221 3.94453 78.2822 4.02158 79.7514 3.99607Z" fill="white" />
        <path d="M134.018 0L134.088 0.116463C134.002 0.770337 133.963 1.78152 133.779 2.38341C133.034 4.82689 133.265 7.12989 133.263 9.68353L133.237 19.734C133.234 20.5413 133.408 23.0789 133.023 23.5988C132.375 23.9626 127.969 23.9058 127.308 23.4082C126.466 22.7739 125.328 21.5429 124.582 20.7326C121.741 17.647 118.692 14.7021 115.882 11.5962C115.955 12.9928 115.926 14.8401 115.926 16.2551L115.927 22.4123C115.924 22.7431 115.935 23.5595 115.706 23.784C115.167 24.0188 111.621 23.9821 110.987 23.8608C110.658 23.4799 110.758 21.7833 110.751 21.2018L110.69 17.5055C110.659 15.3367 110.647 13.1676 110.65 10.9985C110.65 9.74852 110.626 8.31014 110.706 7.08691C110.833 6.00565 110.923 5.01132 111.833 4.28384C113.113 3.13676 115.491 3.54743 116.741 4.59247C118.056 5.69344 119.467 7.35999 120.699 8.62063C121.933 9.88261 123.153 11.2205 124.377 12.5033C125.496 13.6756 126.702 14.8958 127.738 16.1355C127.723 15.9676 127.714 15.799 127.714 15.6304C127.707 14.5829 127.527 4.58057 127.883 4.20292C128.094 3.98033 130.097 3.15134 130.616 2.82775C131.826 2.07291 133.017 1.01544 134.018 0Z" fill="white" />
        <path d="M5.27776 3.89082C8.91342 3.80589 12.6877 3.91321 16.3375 3.86911C17.2523 3.85803 21.5067 3.82032 22.0286 3.96906C22.0625 3.99814 22.2234 4.1233 22.2248 4.15788C22.4269 9.06703 23.0849 8.49624 18.5672 8.48858L10.6285 8.47349C9.4014 8.47192 7.02983 8.30801 6.0149 8.79223C5.60291 9.32242 5.35234 9.70728 5.42558 10.3989C5.6102 12.1431 8.00542 11.8281 9.22317 11.8277L14.2529 11.8307C16.7262 11.8332 19.1333 11.5772 21.1463 13.3184C25.2441 16.8625 22.9832 23.2013 17.6801 23.6191C17.2308 23.6954 16.3273 23.6573 15.8361 23.6577L12.2493 23.6566C11.041 23.6561 1.26625 23.7574 0.937018 23.5229C0.613581 22.7781 0.835079 21.0626 0.792847 20.2153C0.749424 19.3434 1.78353 19.5185 2.38728 19.5038C2.97787 19.4894 3.61649 19.5036 4.2244 19.5042L12.0656 19.4729C13.5555 19.4761 15.1524 19.5433 16.6314 19.4389C18.6002 19.2999 18.4093 17.41 17.3562 16.2538C16.4264 15.9604 15.4731 16.082 14.5083 16.0781C12.1383 16.0683 9.76811 16.1647 7.39765 16.1537C6.64966 16.1502 5.95743 16.1797 5.21315 16.0479C4.30887 15.887 3.44785 15.5402 2.68454 15.0293C-0.0840017 13.153 -0.812813 9.45182 0.975309 6.60569C2.03417 4.92025 3.3622 4.23917 5.27776 3.89082Z" fill="white" />
        <path d="M94.4647 3.8277C95.789 3.70856 96.94 3.8419 98.1333 4.50112C100.113 5.59361 100.754 7.57809 101.637 9.5274L104.179 15.2142L106.752 20.8823C107.087 21.6258 107.836 23.1855 108.028 23.8943C106.268 23.866 104.492 23.8859 102.728 23.866C102.251 22.9264 101.051 20.1614 100.735 19.1981C99.433 19.2873 97.7348 19.2428 96.4017 19.2417C94.5971 19.2417 91.71 19.324 89.9924 19.2047C89.347 20.4967 88.854 21.9236 88.2577 23.2418C87.8756 24.0871 86.7275 23.8419 85.9528 23.8302C84.8925 23.8093 83.833 23.8029 82.7727 23.8108C83.9281 20.9074 85.3156 17.8633 86.5565 14.9753L88.463 10.5132C89.7218 7.56351 90.6556 4.08859 94.4647 3.8277ZM91.3144 16.0217C92.7635 15.9935 94.212 15.9857 95.6611 15.9983L99.3431 15.9952C98.5966 14.5924 98.0612 13.0149 97.4025 11.5655C97.0924 10.8832 96.8485 10.1574 96.4351 9.52479C95.9711 8.81769 95.7146 8.70539 94.8982 8.79575C93.5963 9.85552 92.1598 14.3313 91.3144 16.0217Z" fill="white" />
        <path d="M26.4989 3.81527C27.3591 3.76306 30.4593 3.6289 31.008 4.1236C31.396 4.8885 31.1263 13.9776 31.1954 15.6007C31.2412 16.6787 31.6369 17.7199 32.4479 18.456C33.8347 19.7148 35.8976 19.5625 37.6368 19.5659C38.5003 19.5676 39.3724 19.5869 40.2349 19.5442C41.7644 19.4683 43.3464 18.9501 44.1368 17.5241C44.432 16.9915 44.5548 16.3788 44.6186 15.7792C44.7545 14.5006 44.6708 13.1378 44.65 11.8509C44.607 9.92318 44.586 7.99499 44.5871 6.06681C44.5853 5.5576 44.4729 4.4126 44.8544 4.03287C45.1963 3.69263 46.3716 3.78552 46.8435 3.78597C47.4958 3.78649 49.2414 3.59885 49.6774 4.0714C50.0165 4.43878 49.855 7.90255 49.8519 8.61353C49.8609 10.9507 49.7752 13.2889 49.7867 15.627C49.7896 16.195 49.7864 16.8404 49.7211 17.4016C49.6492 18.0272 49.4967 18.6409 49.2673 19.2274C48.5357 21.0997 47.1456 22.5067 45.3101 23.3098C44.6363 23.5993 43.924 23.7896 43.1955 23.8746C40.6286 24.1884 37.4447 23.7931 34.8281 23.9613C33.5184 24.0455 31.8454 23.8875 30.613 23.4028C28.7871 22.691 27.3204 21.2805 26.5376 19.4835C26.2087 18.7077 25.9971 17.8872 25.9096 17.049C25.7377 15.3172 25.8885 12.7871 25.8502 10.967C25.8746 9.00746 25.8261 7.0479 25.8295 5.08877C25.8306 4.44555 25.9018 4.06864 26.4989 3.81527Z" fill="white" />
        </g>
      </svg>

      {!isLandingPage ? (
        <span
          aria-hidden="true"
          className="mt-0.5 whitespace-nowrap text-[0.3rem] font-semibold leading-none tracking-[0.02em] text-[#C26D19]"
        >
          — ENTERTAINMENT &amp; MEDIA PVT. LTD. —
        </span>
      ) : null}
    </span>
  );
}

function ChevronDownIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 12 12"
      className={`h-3 w-3 transition-transform duration-200 ${className}`}
      fill="none"
    >
      <path d="M3 4.5 6 7.5l3-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowUpRightIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className={className} fill="none">
      <path d="M5 15 15 5M8 5h7v7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="h-5 w-5" fill="none">
      <path d="M3 5.5h14M3 10h14M3 14.5h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="h-5 w-5" fill="none">
      <path d="m5 5 10 10M15 5 5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

/* =========================================================
   DROPDOWN PANEL (desktop)
   ========================================================= */

function DropdownPanel({
  menu,
  onNavigate,
}: {
  menu: NavMenu;
  onNavigate: () => void;
}) {
  return (
    <div
      id={`nav-menu-${menu.id}`}
      aria-label={`${menu.label} menu`}
      className="absolute inset-x-0 top-full z-40 hidden bg-white shadow-[0_2.5rem_5rem_rgba(0,0,0,0.28)] lg:block"
    >
      <div
        className="grid w-full divide-x divide-[rgba(0,17,102,0.08)]"
        style={{ gridTemplateColumns: menu.gridColumns }}
      >
        {menu.columns.map((column) => (
          <div key={column.heading} className="flex min-w-0 flex-col px-9 py-8">
            <p className="text-sm font-semibold leading-5 text-black">
              {column.heading}
            </p>

            <div className="mt-9 flex flex-col gap-9">
              {column.entries.map((entry) => (
                <div key={entry.label} className="flex flex-col">
                  <Link
                    href={entry.href}
                    onClick={onNavigate}
                    className="w-fit text-[0.9375rem] font-normal leading-6 text-[#8F6C1A] transition-opacity hover:opacity-70"
                  >
                    {entry.label}
                  </Link>

                  {entry.sublines ? (
                    <ul className="mt-4 flex flex-col gap-3.5">
                      {entry.sublines.map((line) => (
                        <li
                          key={line}
                          className="text-sm font-medium leading-5 text-[rgba(0,9,51,0.65)]"
                        >
                          {line}
                        </li>
                      ))}
                    </ul>
                  ) : null}

                  {entry.subtext ? (
                    <p className="mt-3 text-sm font-normal leading-6 text-[rgba(0,9,51,0.65)]">
                      {entry.subtext}
                    </p>
                  ) : null}
                </div>
              ))}
            </div>

            {column.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={column.image.src}
                alt={column.image.alt}
                draggable={false}
                className="mt-8 aspect-[3/1] w-full select-none object-cover"
              />
            ) : null}
          </div>
        ))}

        {menu.featured ? (
          <div className="flex min-w-0 items-start p-8">
            <div className="relative w-full overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={menu.featured.imageSrc}
                alt={menu.featured.imageAlt}
                draggable={false}
                className="aspect-[21/9] w-full select-none object-cover"
              />

              <div className="absolute inset-x-0 bottom-0 flex items-center gap-3 bg-gradient-to-t from-black/75 to-transparent p-4">
                <Link
                  href={menu.featured.href}
                  onClick={onNavigate}
                  className="inline-flex items-center justify-center rounded-full bg-white px-4 py-2 text-sm font-semibold text-black transition-opacity hover:opacity-85"
                >
                  Explore
                </Link>

                <p className="text-sm text-white">
                  <span className="font-semibold">{menu.featured.tag}</span>
                  <span className="text-white/80"> • {menu.featured.title}</span>
                </p>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

/* =========================================================
   HEADER
   ========================================================= */

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    if (!openDropdown) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenDropdown(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [openDropdown]);

  const closeDropdown = () => setOpenDropdown(null);

  const activeMenu = NAV_MENUS.find((menu) => menu.id === openDropdown);

  return (
    <header
      className="absolute left-1/2 top-0 z-50 w-full max-w-[90rem] -translate-x-1/2"
      onMouseLeave={closeDropdown}
    >
      <div className="flex w-full items-center justify-between px-4 py-3 sm:px-8">
        <Link
          href="/"
          aria-label="Suman home"
          className="inline-flex shrink-0 items-center"
          onMouseEnter={closeDropdown}
        >
          <SumanLogo />
        </Link>

        <div className="flex items-center gap-3 lg:gap-5">
          <nav aria-label="Primary navigation" className="hidden items-center gap-5 lg:flex xl:gap-7">
            {NAV_MENUS.map((menu) => (
              <button
                key={menu.id}
                type="button"
                aria-expanded={openDropdown === menu.id}
                aria-controls={`nav-menu-${menu.id}`}
                onMouseEnter={() => setOpenDropdown(menu.id)}
                onClick={() =>
                  setOpenDropdown((current) =>
                    current === menu.id ? null : menu.id,
                  )
                }
                className={`inline-flex items-center gap-1 text-[0.6875rem] font-medium transition-colors ${
                  openDropdown === menu.id
                    ? "text-white"
                    : "text-white/80 hover:text-white"
                }`}
              >
                <span>{menu.label}</span>
                <ChevronDownIcon
                  className={openDropdown === menu.id ? "rotate-180" : ""}
                />
              </button>
            ))}

            {NAV_LINKS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onMouseEnter={closeDropdown}
                className="text-[0.6875rem] font-medium text-white/80 transition-colors hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <Link
            href="/contact"
            onMouseEnter={closeDropdown}
            className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl bg-[#8F6C1A] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#9a7810] sm:px-5"
          >
            <span>Contact us</span>
            <ArrowUpRightIcon />
          </Link>

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={menuOpen}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-white/90 transition-colors hover:text-white lg:hidden"
          >
            <MenuIcon />
          </button>
        </div>
      </div>

      {/* Desktop mega menu */}
      {activeMenu ? (
        <DropdownPanel menu={activeMenu} onNavigate={closeDropdown} />
      ) : null}

      {/* Mobile navigation overlay */}
      {menuOpen ? (
        <div className="fixed inset-0 z-[60] flex flex-col bg-black/95 backdrop-blur-sm lg:hidden">
          <div className="flex items-center justify-between px-4 py-3 sm:px-8">
            <Link
              href="/"
              aria-label="Suman home"
              className="inline-flex shrink-0 items-center"
              onClick={() => setMenuOpen(false)}
            >
              <SumanLogo />
            </Link>

            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              aria-label="Close navigation menu"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-white/90 transition-colors hover:text-white"
            >
              <CloseIcon />
            </button>
          </div>

          <nav
            aria-label="Primary navigation"
            className="flex flex-1 flex-col gap-1 overflow-y-auto px-4 pb-10 pt-6 sm:px-8"
          >
            {NAV_MENUS.map((menu) => (
              <details key={menu.id} className="group border-b border-white/10">
                <summary className="flex cursor-pointer list-none items-center justify-between py-4 text-lg font-medium text-white/85 transition-colors hover:text-white [&::-webkit-details-marker]:hidden">
                  <span>{menu.label}</span>
                  <ChevronDownIcon className="group-open:rotate-180" />
                </summary>

                <div className="flex flex-col pb-4">
                  {menu.columns.map((column) => (
                    <div key={column.heading} className="flex flex-col">
                      <p className="pb-2 pt-3 text-[0.625rem] font-semibold uppercase tracking-[0.06em] text-white/45">
                        {column.heading}
                      </p>

                      {column.entries.map((entry) => (
                        <Link
                          key={entry.label}
                          href={entry.href}
                          onClick={() => setMenuOpen(false)}
                          className="py-2 text-base text-white/75 transition-colors hover:text-white"
                        >
                          {entry.label}
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
              </details>
            ))}

            {NAV_LINKS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="border-b border-white/10 py-4 text-lg font-medium text-white/85 transition-colors hover:text-white"
              >
                {item.label}
              </Link>
            ))}

            <Link
              href="/contact"
              onClick={() => setMenuOpen(false)}
              className="mt-6 inline-flex w-fit items-center justify-center gap-2 rounded-xl bg-[#8F6C1A] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#9a7810]"
            >
              <span>Contact us</span>
              <ArrowUpRightIcon />
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
