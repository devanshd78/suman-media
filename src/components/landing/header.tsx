"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

/* =========================================================
   TYPES
   ========================================================= */

type MenuEntry = {
  label: string;
  href: string;
  sublines?: string[];
  subtext?: string;
};

type MenuColumn = {
  heading: string;
  entries: MenuEntry[];
  image?: {
    src: string;
    alt: string;
  };
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

  gridColumns: string;
};

/* =========================================================
   NAVIGATION DATA
   ========================================================= */

const NAV_MENUS: NavMenu[] = [
  {
    id: "product",
    label: "Product",
    gridColumns: "1fr 1fr 1.5fr",

    columns: [
      {
        heading: "Digital Platforms",

        entries: [
          {
            label:
              "OTT, Digital Platforms & Streaming",
            href: "/companies",
          },
          {
            label: "Monetization Model",
            href: "/companies",
          },
          {
            label: "Fast Channel",
            href: "/companies",
          },
          {
            label:
              "AI & Emerging Technology",
            href: "/companies",
          },
          {
            label:
              "Tech & Digital Transformation",
            href: "/companies",
          },
        ],
      },

      {
        heading: "Content Assets",

        entries: [
          {
            label:
              "Content and Music Library Management",
            href: "/services",
          },
          {
            label:
              "Publication & Knowledge Platforms",
            href: "/services",
          },
          {
            label:
              "Intellectual Property Development",
            href: "/services",
          },
        ],
      },
    ],

    featured: {
      href: "/companies",
      imageSrc:
        "/images/landing/hero/Image1.png",
      imageAlt:
        "Raja Shivchhatrapati on Abhijat Marathi OTT",
      tag: "OTT",
      title: "Abhijat Marathi OTT",
    },
  },

  {
    id: "services",
    label: "Services",
    gridColumns:
      "1fr 1fr 1.1fr 0.7fr",

    columns: [
      {
        heading: "Media and Production",

        entries: [
          {
            label:
              "Media & Content Syndication",
            href: "/services",
          },
          {
            label:
              "Music & Audio Division",
            href: "/services",
          },
          {
            label:
              "Events and Experiences",
            href: "/services",
          },
          {
            label:
              "AI & Emerging Technology",
            href: "/services",
          },
          {
            label:
              "Tech & Digital Transformation",
            href: "/services",
          },
        ],
      },

      {
        heading:
          "Marketing and Brand Services",

        entries: [
          {
            label:
              "Content and Music Library Management",
            href: "/services",
          },
          {
            label:
              "Publication & Knowledge Platforms",
            href: "/services",
          },
          {
            label:
              "Intellectual Property Development",
            href: "/services",
          },
        ],
      },

      {
        heading: "Creator Services",

        entries: [
          {
            label:
              "Talent and Creator Ecosystem",

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

        entries: [
          {
            label: "Call now?",
            href: "/contact",
          },
        ],
      },
    ],
  },

  {
    id: "solutions",
    label: "Solutions",
    gridColumns: "1.1fr 1.1fr 1fr",

    columns: [
      {
        heading:
          "Government & Institutional",

        entries: [
          {
            label:
              "Govt, PSU & Institutional Solutions",

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
        heading:
          "Capital & Business Growth",

        entries: [
          {
            label:
              "IPO & Investor Ecosystem",

            href: "/about",

            subtext:
              "Investor Relations, Shareholder Communications, Digital Roadshow, Financial PR, Listed Company Communication",
          },

          {
            label:
              "International Business & Global Partnership",

            href: "/services",

            subtext:
              "Co-Productions, Film Festivals, International Markets, Global Distribution, Strategic Alliances, Market Representation",
          },
        ],
      },

      {
        heading:
          "Distribution & Licensing",

        entries: [
          {
            label:
              "Content Acquisition & Distribution",

            href: "/services",

            subtext:
              "Film & Music Rights Acquisition, OTT Rights, Satellite Rights, FAST Channel Content Acquisition, International Distribution, Syndication",
          },
        ],

        image: {
          src:
            "/images/landing/hero/Image2.jpg",

          alt:
            "Live concert audience",
        },
      },
    ],
  },
];

const NAV_LINKS = [
  {
    label: "Investors Relations",
    href: "/about",
  },

  {
    label: "Careers",
    href: "/careers",
  },
];

/* =========================================================
   LOGO
   ========================================================= */

function SumanLogo() {
  return (
    <Image
      src="/images/logo.png"
      alt="Suman Entertainment & Media"
      width={240}
      height={80}
      priority
      className="
        h-auto
        w-[6.75rem]
        shrink-0
        object-contain

        sm:w-[7.5rem]

        md:w-[8rem]

        xl:w-[8.75rem]

        2xl:w-[9.25rem]
      "
    />
  );
}

/* =========================================================
   ICONS
   ========================================================= */

function ChevronDownIcon({
  className = "",
}: {
  className?: string;
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 12 12"
      className={`
        h-3
        w-3
        shrink-0
        transition-transform
        duration-200
        ${className}
      `}
      fill="none"
    >
      <path
        d="M3 4.5 6 7.5l3-3"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-[1.375rem] w-[1.375rem]"
      fill="none"
    >
      <path
        d="M4 7h16M4 12h16M4 17h16"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-[1.375rem] w-[1.375rem]"
      fill="none"
    >
      <path
        d="M6 6l12 12M18 6 6 18"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ArrowRightIcon({
  className = "h-4 w-4",
}: {
  className?: string;
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className={className}
      fill="none"
    >
      <path
        d="M4 10h11M11 6l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* =========================================================
   DESKTOP DROPDOWN PANEL
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
      className="
        absolute
        inset-x-0
        top-full
        z-40
        hidden
        overflow-hidden
        bg-white
        shadow-[0_2.5rem_5rem_rgba(0,0,0,0.28)]

        xl:block
      "
    >
      <div
        className="
          grid
          w-full
          divide-x
          divide-[rgba(0,17,102,0.08)]
        "
        style={{
          gridTemplateColumns:
            menu.gridColumns,
        }}
      >
        {menu.columns.map(
          (column) => (
            <div
              key={column.heading}
              className="
                flex
                min-w-0
                flex-col
                px-7
                py-8

                2xl:px-9
              "
            >
              <p
                className="
                  text-sm
                  font-semibold
                  leading-5
                  text-black
                "
              >
                {column.heading}
              </p>

              <div
                className="
                  mt-8
                  flex
                  flex-col
                  gap-8
                "
              >
                {column.entries.map(
                  (entry) => (
                    <div
                      key={
                        entry.label
                      }
                      className="
                        flex
                        flex-col
                      "
                    >
                      <Link
                        href={
                          entry.href
                        }
                        onClick={
                          onNavigate
                        }
                        className="
                          w-fit
                          text-[0.9375rem]
                          font-normal
                          leading-6
                          text-[#8F6C1A]

                          transition-opacity
                          duration-200

                          hover:opacity-70
                        "
                      >
                        {
                          entry.label
                        }
                      </Link>

                      {entry.sublines
                        ?.length ? (
                        <ul
                          className="
                            mt-4
                            flex
                            flex-col
                            gap-3
                          "
                        >
                          {entry.sublines.map(
                            (
                              line,
                            ) => (
                              <li
                                key={
                                  line
                                }
                                className="
                                  text-sm
                                  font-medium
                                  leading-5
                                  text-[rgba(0,9,51,0.65)]
                                "
                              >
                                {
                                  line
                                }
                              </li>
                            ),
                          )}
                        </ul>
                      ) : null}

                      {entry.subtext ? (
                        <p
                          className="
                            mt-3
                            text-sm
                            font-normal
                            leading-6
                            text-[rgba(0,9,51,0.65)]
                          "
                        >
                          {
                            entry.subtext
                          }
                        </p>
                      ) : null}
                    </div>
                  ),
                )}
              </div>

              {column.image ? (
                <div
                  className="
                    relative
                    mt-8
                    aspect-[3/1]
                    w-full
                    overflow-hidden
                  "
                >
                  <Image
                    src={
                      column.image
                        .src
                    }
                    alt={
                      column.image
                        .alt
                    }
                    fill
                    sizes="30vw"
                    className="
                      select-none
                      object-cover
                    "
                  />
                </div>
              ) : null}
            </div>
          ),
        )}

        {menu.featured ? (
          <div
            className="
              flex
              min-w-0
              items-start
              p-7

              2xl:p-8
            "
          >
            <div
              className="
                relative
                w-full
                overflow-hidden
              "
            >
              <div
                className="
                  relative
                  aspect-[21/9]
                  w-full
                "
              >
                <Image
                  src={
                    menu.featured
                      .imageSrc
                  }
                  alt={
                    menu.featured
                      .imageAlt
                  }
                  fill
                  sizes="35vw"
                  className="
                    select-none
                    object-cover
                  "
                />
              </div>

              <div
                className="
                  absolute
                  inset-x-0
                  bottom-0
                  flex
                  items-center
                  gap-3
                  bg-gradient-to-t
                  from-black/80
                  to-transparent
                  p-4
                "
              >
                <Link
                  href={
                    menu.featured
                      .href
                  }
                  onClick={
                    onNavigate
                  }
                  className="
                    inline-flex
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-white
                    px-4
                    py-2
                    text-sm
                    font-semibold
                    text-black

                    transition-opacity

                    hover:opacity-85
                  "
                >
                  Explore
                </Link>

                <p
                  className="
                    min-w-0
                    truncate
                    text-sm
                    text-white
                  "
                >
                  <span
                    className="
                      font-semibold
                    "
                  >
                    {
                      menu.featured
                        .tag
                    }
                  </span>

                  <span
                    className="
                      text-white/80
                    "
                  >
                    {" "}
                    •{" "}
                    {
                      menu.featured
                        .title
                    }
                  </span>
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
  const pathname = usePathname();

  const isLandingPage =
    pathname === "/";

  const [menuOpen, setMenuOpen] =
    useState(false);

  const [
    openDropdown,
    setOpenDropdown,
  ] = useState<string | null>(null);

  /* ---------------------------------------------------------
     Close everything after route change
     --------------------------------------------------------- */

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setMenuOpen(false);
      setOpenDropdown(null);
    });

    return () => window.cancelAnimationFrame(frame);
  }, [pathname]);

  /* ---------------------------------------------------------
     Escape closes navigation
     --------------------------------------------------------- */

  useEffect(() => {
    const handleKeyDown = (
      event: KeyboardEvent,
    ) => {
      if (event.key !== "Escape") {
        return;
      }

      setMenuOpen(false);
      setOpenDropdown(null);
    };

    window.addEventListener(
      "keydown",
      handleKeyDown,
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown,
      );
    };
  }, []);

  /* ---------------------------------------------------------
     Lock page scrolling behind mobile menu
     --------------------------------------------------------- */

  useEffect(() => {
    if (!menuOpen) {
      return;
    }

    const body =
      document.body;

    const html =
      document.documentElement;

    const previousBodyOverflow =
      body.style.overflow;

    const previousHtmlOverflow =
      html.style.overflow;

    body.style.overflow =
      "hidden";

    html.style.overflow =
      "hidden";

    return () => {
      body.style.overflow =
        previousBodyOverflow;

      html.style.overflow =
        previousHtmlOverflow;
    };
  }, [menuOpen]);

  /* ---------------------------------------------------------
     Desktop begins at XL = 1280px
     --------------------------------------------------------- */

  useEffect(() => {
    const handleResize = () => {
      if (
        window.innerWidth >= 1280
      ) {
        setMenuOpen(false);
      } else {
        setOpenDropdown(null);
      }
    };

    window.addEventListener(
      "resize",
      handleResize,
    );

    return () => {
      window.removeEventListener(
        "resize",
        handleResize,
      );
    };
  }, []);

  const closeDropdown = () => {
    setOpenDropdown(null);
  };

  const closeMobileMenu = () => {
    setMenuOpen(false);
  };

  const activeMenu =
    NAV_MENUS.find(
      (menu) =>
        menu.id === openDropdown,
    ) ?? null;

  return (
    <header
      className={`
        z-50
        w-full

        ${
          isLandingPage
            ? `
                fixed
                inset-x-0
                top-0
                mx-auto
                max-w-full
              `
            : `
                relative
                mx-auto
                max-w-full
                border-b
                border-[#E6E6E6]
                bg-white
              `
        }
      `}
      onMouseLeave={
        closeDropdown
      }
    >
      {/* =====================================================
          MAIN HEADER ROW
          ===================================================== */}

      <div
        className={`
          flex
          w-full
          items-center
          justify-between

          ${
            isLandingPage
              ? `
                  min-h-[4rem]
                  px-4
                  py-3

                  sm:min-h-[4.5rem]
                  sm:px-6

                  md:px-8

                  xl:px-[3.5rem]
                `
              : `
                  min-h-[4.5rem]
                  px-4
                  py-3

                  sm:min-h-[5rem]
                  sm:px-6

                  md:px-8

                  xl:min-h-[5.625rem]
                  xl:px-12
                `
          }
        `}
      >
        {/* =================================================
            LOGO
            ================================================= */}

        <Link
          href="/"
          aria-label="Home"
          className="
            inline-flex
            min-w-0
            shrink-0
            items-center
          "
          onMouseEnter={
            closeDropdown
          }
        >
          <SumanLogo />
        </Link>

        {/* =================================================
            RIGHT SIDE
            ================================================= */}

        <div
          className="
            ml-3
            flex
            shrink-0
            items-center
            gap-1.5

            sm:gap-2.5

            md:gap-3

            xl:gap-5
          "
        >
          {/* ===============================================
              DESKTOP NAV
              1280px+
              =============================================== */}

          <nav
            aria-label="Primary navigation"
            className="
              hidden
              items-center
              gap-3

              xl:flex

              2xl:gap-6
            "
          >
            {NAV_MENUS.map(
              (menu) => {
                const isOpen =
                  openDropdown ===
                  menu.id;

                return (
                  <button
                    key={menu.id}
                    type="button"
                    aria-expanded={
                      isOpen
                    }
                    aria-controls={`nav-menu-${menu.id}`}
                    onMouseEnter={() =>
                      setOpenDropdown(
                        menu.id,
                      )
                    }
                    onFocus={() =>
                      setOpenDropdown(
                        menu.id,
                      )
                    }
                    onClick={() =>
                      setOpenDropdown(
                        (current) =>
                          current ===
                          menu.id
                            ? null
                            : menu.id,
                      )
                    }
                    className={`
                      inline-flex
                      min-h-10
                      items-center
                      gap-1
                      whitespace-nowrap
                      font-medium

                      transition-colors
                      duration-200

                      ${
                        isLandingPage
                          ? `
                              text-[0.6875rem]

                              ${
                                isOpen
                                  ? "text-white"
                                  : "text-white/80 hover:text-white"
                              }

                              2xl:text-xs
                            `
                          : `
                              text-xs

                              ${
                                isOpen
                                  ? "text-black"
                                  : "text-[#929292] hover:text-black"
                              }

                              2xl:text-sm
                            `
                      }
                    `}
                  >
                    <span>
                      {
                        menu.label
                      }
                    </span>

                    <ChevronDownIcon
                      className={
                        isOpen
                          ? "rotate-180"
                          : ""
                      }
                    />
                  </button>
                );
              },
            )}

            {NAV_LINKS.map(
              (item) => {
                const isActive =
                  pathname ===
                    item.href ||
                  pathname.startsWith(
                    `${item.href}/`,
                  );

                return (
                  <Link
                    key={
                      item.label
                    }
                    href={
                      item.href
                    }
                    aria-current={
                      isActive
                        ? "page"
                        : undefined
                    }
                    onMouseEnter={
                      closeDropdown
                    }
                    onFocus={
                      closeDropdown
                    }
                    className={`
                      inline-flex
                      min-h-10
                      items-center
                      whitespace-nowrap
                      font-medium

                      transition-colors
                      duration-200

                      ${
                        isLandingPage
                          ? `
                              text-[0.6875rem]
                              text-white/80

                              hover:text-white

                              2xl:text-xs
                            `
                          : isActive
                            ? `
                                text-xs
                                font-semibold
                                text-black

                                2xl:text-sm
                              `
                            : `
                                text-xs
                                text-[#929292]

                                hover:text-black

                                2xl:text-sm
                              `
                      }
                    `}
                  >
                    {
                      item.label
                    }
                  </Link>
                );
              },
            )}
          </nav>

          {/* ===============================================
              CONTACT CTA

              Hidden on phone.
              Visible tablet+
              =============================================== */}

          <Link
            href="/contact"
            onMouseEnter={
              closeDropdown
            }
            className="
              hidden
              min-h-10
              shrink-0
              items-center
              justify-center
              gap-2
              whitespace-nowrap
              rounded-xl
              bg-[#8F6C1A]

              px-4
              py-2

              text-xs
              font-semibold
              text-white

              transition-colors
              duration-200

              hover:bg-[#9A7810]

              md:inline-flex

              xl:px-5
            "
          >
            <span>
              Contact us
            </span>

            <ArrowRightIcon />
          </Link>

          {/* ===============================================
              MOBILE / TABLET MENU BUTTON

              Visible < 1280px
              =============================================== */}

          <button
            type="button"
            aria-label={
              menuOpen
                ? "Close navigation menu"
                : "Open navigation menu"
            }
            aria-expanded={
              menuOpen
            }
            aria-controls="mobile-primary-navigation"
            onClick={() =>
              setMenuOpen(
                (current) =>
                  !current,
              )
            }
            className={`
              inline-flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-full

              transition-colors
              duration-200

              xl:hidden

              ${
                isLandingPage
                  ? `
                      text-white

                      hover:bg-white/10
                    `
                  : `
                      text-[rgba(0,6,38,0.85)]

                      hover:bg-black/5
                    `
              }
            `}
          >
            {menuOpen ? (
              <CloseIcon />
            ) : (
              <MenuIcon />
            )}
          </button>
        </div>
      </div>

      {/* =====================================================
          DESKTOP MEGA MENU
          ===================================================== */}

      {activeMenu ? (
        <DropdownPanel
          menu={activeMenu}
          onNavigate={
            closeDropdown
          }
        />
      ) : null}

      {/* =====================================================
          MOBILE / TABLET NAVIGATION
          ===================================================== */}

      {menuOpen ? (
        <div
          id="mobile-primary-navigation"
          className="
            fixed
            inset-0
            z-[999]
            flex
            h-[100dvh]
            w-screen
            flex-col
            overflow-hidden
            bg-[#080808]/[0.98]
            backdrop-blur-xl

            xl:hidden
          "
        >
          {/* ===============================================
              MOBILE MENU TOP
              =============================================== */}

          <div
            className="
              flex
              min-h-[4rem]
              shrink-0
              items-center
              justify-between

              border-b
              border-white/10

              px-4
              py-3

              sm:min-h-[4.5rem]
              sm:px-6

              md:px-8
            "
          >
            <Link
              href="/"
              aria-label="Home"
              className="
                inline-flex
                shrink-0
                items-center
              "
              onClick={
                closeMobileMenu
              }
            >
              <SumanLogo />
            </Link>

            <button
              type="button"
              onClick={
                closeMobileMenu
              }
              aria-label="Close navigation menu"
              className="
                inline-flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-full
                text-white

                transition-colors
                duration-200

                hover:bg-white/10
              "
            >
              <CloseIcon />
            </button>
          </div>

          {/* ===============================================
              MOBILE NAV SCROLL AREA
              =============================================== */}

          <nav
            aria-label="Mobile primary navigation"
            className="
              min-h-0
              flex-1
              overflow-y-auto
              overscroll-contain

              px-4
              pb-[calc(2.5rem+env(safe-area-inset-bottom))]
              pt-2

              sm:px-6
              sm:pt-4

              md:px-8
            "
          >
            {/* MENU GROUPS */}

            {NAV_MENUS.map(
              (menu) => (
                <details
                  key={menu.id}
                  className="
                    group
                    border-b
                    border-white/10
                  "
                >
                  <summary
                    className="
                      flex
                      min-h-[4rem]
                      cursor-pointer
                      list-none
                      items-center
                      justify-between
                      gap-5

                      py-4

                      text-base
                      font-medium
                      text-white/90

                      transition-colors

                      hover:text-white

                      sm:text-lg

                      [&::-webkit-details-marker]:hidden
                    "
                  >
                    <span>
                      {
                        menu.label
                      }
                    </span>

                    <ChevronDownIcon
                      className="
                        group-open:rotate-180
                      "
                    />
                  </summary>

                  <div
                    className="
                      flex
                      flex-col
                      pb-6
                    "
                  >
                    {menu.columns.map(
                      (
                        column,
                      ) => (
                        <div
                          key={
                            column.heading
                          }
                          className="
                            flex
                            flex-col
                          "
                        >
                          <p
                            className="
                              pb-2
                              pt-5

                              text-[0.625rem]
                              font-semibold
                              uppercase
                              leading-4
                              tracking-[0.08em]
                              text-white/40
                            "
                          >
                            {
                              column.heading
                            }
                          </p>

                          {column.entries.map(
                            (
                              entry,
                            ) => (
                              <div
                                key={
                                  entry.label
                                }
                                className="
                                  border-b
                                  border-white/[0.05]

                                  last:border-b-0
                                "
                              >
                                <Link
                                  href={
                                    entry.href
                                  }
                                  onClick={
                                    closeMobileMenu
                                  }
                                  className="
                                    block

                                    py-3

                                    text-sm
                                    font-medium
                                    leading-5
                                    text-white/85

                                    transition-colors

                                    hover:text-white

                                    sm:text-base
                                  "
                                >
                                  {
                                    entry.label
                                  }
                                </Link>

                                {entry
                                  .sublines
                                  ?.length ? (
                                  <ul
                                    className="
                                      -mt-1
                                      space-y-1.5
                                      pb-4
                                      pl-3
                                    "
                                  >
                                    {entry.sublines.map(
                                      (
                                        line,
                                      ) => (
                                        <li
                                          key={
                                            line
                                          }
                                          className="
                                            text-xs
                                            leading-5
                                            text-white/45

                                            sm:text-sm
                                          "
                                        >
                                          {
                                            line
                                          }
                                        </li>
                                      ),
                                    )}
                                  </ul>
                                ) : null}

                                {entry.subtext ? (
                                  <p
                                    className="
                                      -mt-1
                                      pb-4
                                      pl-3

                                      text-xs
                                      leading-5
                                      text-white/45

                                      sm:text-sm
                                    "
                                  >
                                    {
                                      entry.subtext
                                    }
                                  </p>
                                ) : null}
                              </div>
                            ),
                          )}
                        </div>
                      ),
                    )}
                  </div>
                </details>
              ),
            )}

            {/* NORMAL LINKS */}

            {NAV_LINKS.map(
              (item) => {
                const isActive =
                  pathname ===
                    item.href ||
                  pathname.startsWith(
                    `${item.href}/`,
                  );

                return (
                  <Link
                    key={
                      item.label
                    }
                    href={
                      item.href
                    }
                    aria-current={
                      isActive
                        ? "page"
                        : undefined
                    }
                    onClick={
                      closeMobileMenu
                    }
                    className={`
                      flex
                      min-h-[4rem]
                      items-center

                      border-b
                      border-white/10

                      py-4

                      text-base
                      font-medium

                      transition-colors

                      sm:text-lg

                      ${
                        isActive
                          ? "text-white"
                          : "text-white/90 hover:text-white"
                      }
                    `}
                  >
                    {
                      item.label
                    }
                  </Link>
                );
              },
            )}

            {/* CONTACT CTA */}

            <Link
              href="/contact"
              onClick={
                closeMobileMenu
              }
              className="
                mt-7
                inline-flex
                min-h-12
                w-full
                items-center
                justify-center
                gap-2

                rounded-xl
                bg-[#8F6C1A]

                px-5
                py-3

                text-sm
                font-semibold
                text-white

                transition-colors
                duration-200

                hover:bg-[#9A7810]

                sm:w-fit
                sm:min-w-[10rem]
              "
            >
              <span>
                Contact us
              </span>

              <ArrowRightIcon />
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
