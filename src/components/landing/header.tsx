"use client";

import Image from "@/components/ui/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { inter } from "@/lib/fonts";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./header.module.css";

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

const DESKTOP_QUERY = "(min-width: 1120px)";
const CLOSE_DELAY_MS = 140;

function SumanLogo({ inverse = false }: { inverse?: boolean }) {
  return (
    <Image
      src="/images/logo.png"
      alt="Suman Entertainment & Media"
      width={134}
      height={39}
      priority
      className={`${styles.logo} ${inverse ? styles.logoInverse : ""}`}
    />
  );
}

function ChevronDownIcon({ open = false }: { open?: boolean }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 12 12" className={styles.chevron} data-open={open} fill="none">
      <path d="M3 4.5 6 7.5l3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MenuIcon({ close = false }: { close?: boolean }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" width="24" height="24" fill="none">
      <path d={close ? "M6 6l12 12M18 6 6 18" : "M4 7h16M4 12h16M4 17h16"} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" width="16" height="16" fill="none">
      <path d="M4 10h11M11 6l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function DropdownPanel({ menu, onNavigate }: { menu: NavMenu; onNavigate: () => void }) {
  return (
    <div
      id={`nav-menu-${menu.id}`}
      data-desktop-panel
      data-lenis-prevent
      aria-label={`${menu.label} menu`}
      className={styles.dropdown}
    >
      <div className={styles.dropdownGrid} style={{ gridTemplateColumns: menu.gridColumns }}>
        {menu.columns.map((column) => (
          <div key={column.heading} className={styles.column}>
            <h3 className={styles.columnHeading}>{column.heading}</h3>
            <div className={styles.entries}>
              {column.entries.map((entry) => (
                <div key={entry.label}>
                  <Link href={entry.href} onClick={onNavigate} className={styles.entryLink}>{entry.label}</Link>
                  {entry.sublines?.length ? (
                    <ul className={styles.sublines}>
                      {entry.sublines.map((line) => <li key={line}>{line}</li>)}
                    </ul>
                  ) : null}
                  {entry.subtext ? <p className={styles.subtext}>{entry.subtext}</p> : null}
                </div>
              ))}
            </div>
            {column.image ? (
              <div className={styles.columnImage}>
                <Image src={column.image.src} alt={column.image.alt} fill sizes="(min-width: 1120px) 30vw, 90vw" className={styles.coverImage} />
              </div>
            ) : null}
          </div>
        ))}
        {menu.featured ? (
          <div className={styles.featured}>
            <Link href={menu.featured.href} onClick={onNavigate} className={styles.featuredLink}>
              <Image src={menu.featured.imageSrc} alt={menu.featured.imageAlt} fill sizes="35vw" className={styles.coverImage} />
              <div className={styles.featuredCaption}>
                <span className={styles.featuredButton}>Explore</span>
                <span><strong>{menu.featured.tag}</strong> &middot; {menu.featured.title}</span>
              </div>
            </Link>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export function Header() {
  const pathname = usePathname();
  const isLandingPage = pathname === "/";
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancelClose = useCallback(() => {
    if (closeTimer.current !== null) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  const closeDropdown = useCallback(() => {
    cancelClose();
    setOpenDropdown(null);
  }, [cancelClose]);

  const openMenu = useCallback((id: string) => {
    cancelClose();
    setOpenDropdown(id);
  }, [cancelClose]);

  const scheduleClose = useCallback(() => {
    cancelClose();
    // Bridge the short pointer journey between a trigger and its panel.
    closeTimer.current = setTimeout(() => {
      const focused = document.activeElement;
      if (focused instanceof HTMLElement &&
          focused.matches(":focus-visible") &&
          focused.closest("[data-desktop-panel]")) return;
      setOpenDropdown(null);
      closeTimer.current = null;
    }, CLOSE_DELAY_MS);
  }, [cancelClose]);

  const closeMobileMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      cancelClose();
      setMenuOpen(false);
      setOpenDropdown(null);
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname, cancelClose]);

  useEffect(() => {
    const desktop = window.matchMedia(DESKTOP_QUERY);
    const onBreakpoint = () => {
      cancelClose();
      setMenuOpen(false);
      setOpenDropdown(null);
    };
    desktop.addEventListener("change", onBreakpoint);
    return () => { desktop.removeEventListener("change", onBreakpoint); cancelClose(); };
  }, [cancelClose]);

  useEffect(() => {
    const onOutsidePointer = (event: PointerEvent) => {
      if (event.target instanceof Node && !headerRef.current?.contains(event.target)) closeDropdown();
    };
    const onEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (openDropdown) {
        event.preventDefault();
        triggerRefs.current[openDropdown]?.focus({ preventScroll: true });
        closeDropdown();
      }
      setMenuOpen(false);
    };
    document.addEventListener("pointerdown", onOutsidePointer);
    document.addEventListener("keydown", onEscape);
    return () => {
      document.removeEventListener("pointerdown", onOutsidePointer);
      document.removeEventListener("keydown", onEscape);
    };
  }, [openDropdown, closeDropdown]);

  useEffect(() => {
    if (!menuOpen) return;
    const dialog = dialogRef.current;
    const returnFocus = menuButtonRef.current;
    const previousBody = document.body.style.overflow;
    const previousHtml = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    const focusFrame = requestAnimationFrame(() => closeButtonRef.current?.focus());
    const trapFocus = (event: KeyboardEvent) => {
      if (event.key !== "Tab" || !dialog) return;
      const focusable = Array.from(dialog.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), summary, [tabindex="0"]',
      )).filter((element) => element.getClientRects().length > 0);
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && (document.activeElement === first || !dialog.contains(document.activeElement))) {
        event.preventDefault(); last?.focus();
      } else if (!event.shiftKey && (document.activeElement === last || !dialog.contains(document.activeElement))) {
        event.preventDefault(); first?.focus();
      }
    };
    document.addEventListener("keydown", trapFocus);
    return () => {
      cancelAnimationFrame(focusFrame);
      document.removeEventListener("keydown", trapFocus);
      document.body.style.overflow = previousBody;
      document.documentElement.style.overflow = previousHtml;
      returnFocus?.focus({ preventScroll: true });
    };
  }, [menuOpen]);

  // Direction-aware navigation. Scroll updates only set data attributes, not
  // component state every frame. Keyboard focus/open menus keep it available.
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    let previous = Math.max(0, window.scrollY);
    let accumulated = 0;
    let direction = 0;
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = Math.max(0, window.scrollY);
      const delta = y - previous;
      previous = y;
      const nextDirection = Math.sign(delta);
      if (nextDirection && nextDirection !== direction) { accumulated = 0; direction = nextDirection; }
      accumulated += Math.abs(delta);
      header.dataset.scrolled = String(y > 24);
      if (y < 100 || menuOpen || openDropdown || header.contains(document.activeElement)) {
        header.dataset.hidden = "false";
      } else if (accumulated > 12) {
        header.dataset.hidden = String(direction > 0);
      }
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    return () => { cancelAnimationFrame(frame); window.removeEventListener("scroll", schedule); };
  }, [menuOpen, openDropdown, pathname]);

  const activeMenu = NAV_MENUS.find((menu) => menu.id === openDropdown) ?? null;

  return (
    <>
    {!isLandingPage ? <div aria-hidden="true" className={styles.spacer} /> : null}
    <header
      ref={headerRef}
      data-site-header
      data-menu-open={menuOpen || Boolean(openDropdown)}
      data-landing-text-reveal-skip
      data-overlay={isLandingPage}
      className={`${inter.className} ${styles.header}`}
      onPointerEnter={cancelClose}
      onPointerLeave={(event) => { if (event.pointerType === "mouse") scheduleClose(); }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) closeDropdown();
      }}
    >
      <div className={styles.row}>
        <Link href="/" aria-label="Suman Entertainment & Media home" className={styles.brand} onMouseEnter={closeDropdown}>
          <SumanLogo inverse={isLandingPage} />
        </Link>
        <div className={styles.actions}>
          <nav aria-label="Primary navigation" className={styles.desktopNav}>
            {NAV_MENUS.map((menu) => (
              <button
                key={menu.id}
                ref={(element) => { triggerRefs.current[menu.id] = element; }}
                type="button"
                className={styles.navControl}
                aria-expanded={openDropdown === menu.id}
                aria-controls={openDropdown === menu.id ? `nav-menu-${menu.id}` : undefined}
                onPointerEnter={(event) => { if (event.pointerType === "mouse") openMenu(menu.id); }}
                onClick={(event) => {
                  cancelClose();
                  // A pointer click after hover must not instantly close what hover opened.
                  if (event.detail > 0 && event.currentTarget.matches(":hover")) openMenu(menu.id);
                  else setOpenDropdown((current) => current === menu.id ? null : menu.id);
                }}
                onKeyDown={(event) => {
                  if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
                  event.preventDefault();
                  openMenu(menu.id);
                  const last = event.key === "ArrowUp";
                  requestAnimationFrame(() => {
                    const links = headerRef.current?.querySelectorAll<HTMLAnchorElement>(`#nav-menu-${menu.id} a[href]`);
                    links?.[last ? links.length - 1 : 0]?.focus();
                  });
                }}
              >
                <span>{menu.label}</span><ChevronDownIcon open={openDropdown === menu.id} />
              </button>
            ))}
            {NAV_LINKS.map((item) => (
              <Link key={item.label} href={item.href} className={styles.navControl}
                aria-current={pathname === item.href || pathname.startsWith(`${item.href}/`) ? "page" : undefined}
                onMouseEnter={closeDropdown} onFocus={closeDropdown}>
                {item.label}
              </Link>
            ))}
          </nav>
          <Link href="/contact" className={`${styles.contact} ${styles.desktopContact}`} onMouseEnter={closeDropdown} onFocus={closeDropdown}>
            Contact us <ArrowRightIcon />
          </Link>
          <button ref={menuButtonRef} type="button" className={styles.mobileToggle}
            aria-label="Open navigation menu" aria-expanded={menuOpen}
            aria-controls={menuOpen ? "mobile-primary-navigation" : undefined}
            onClick={() => { closeDropdown(); setMenuOpen(true); }}>
            <MenuIcon />
          </button>
        </div>
      </div>

      {activeMenu ? <DropdownPanel key={activeMenu.id} menu={activeMenu} onNavigate={closeDropdown} /> : null}

      {menuOpen ? createPortal(
        <div ref={dialogRef} id="mobile-primary-navigation" role="dialog" aria-modal="true"
          aria-label="Navigation" data-lenis-prevent data-landing-text-reveal-skip
          className={`${inter.className} ${styles.mobileDialog}`}>
          <div className={styles.mobileTop}>
            <Link href="/" aria-label="Suman Entertainment & Media home" onClick={closeMobileMenu}><SumanLogo inverse /></Link>
            <button ref={closeButtonRef} type="button" aria-label="Close navigation menu" className={styles.iconButton} onClick={closeMobileMenu}><MenuIcon close /></button>
          </div>
          <nav aria-label="Mobile primary navigation" className={styles.mobileContent} data-lenis-prevent>
            {NAV_MENUS.map((menu) => (
              <details key={menu.id} className={styles.mobileGroup}>
                <summary className={styles.mobileSummary}>{menu.label}<ChevronDownIcon /></summary>
                {menu.columns.map((column) => (
                  <div key={column.heading} className={styles.mobileColumn}>
                    <h3>{column.heading}</h3>
                    {column.entries.map((entry) => (
                      <div key={entry.label} className={styles.mobileEntry}>
                        <Link href={entry.href} onClick={closeMobileMenu}>{entry.label}</Link>
                        {entry.sublines?.length ? <ul>{entry.sublines.map((line) => <li key={line}>{line}</li>)}</ul> : null}
                        {entry.subtext ? <p>{entry.subtext}</p> : null}
                      </div>
                    ))}
                  </div>
                ))}
              </details>
            ))}
            {NAV_LINKS.map((item) => <Link key={item.label} href={item.href} onClick={closeMobileMenu} className={styles.mobileLink}>{item.label}</Link>)}
            <Link href="/contact" onClick={closeMobileMenu} className={`${styles.contact} ${styles.mobileContact}`}>Contact us <ArrowRightIcon /></Link>
          </nav>
        </div>, document.body,
      ) : null}
    </header>
    </>
  );
}
