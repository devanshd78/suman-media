"use client";

import Image from "@/components/ui/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { inter } from "@/lib/fonts";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { createPortal } from "react-dom";

import styles from "./header.module.css";

/* ============================================================
   TYPES
   ============================================================ */

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

/* ============================================================
   NAVIGATION DATA
   ============================================================ */

const NAV_MENUS: NavMenu[] = [
  {
    id: "product",

    label: "Product",

    gridColumns:
      "1fr 1fr 1.5fr",

    columns: [
      {
        heading:
          "Digital Platforms",

        entries: [
          {
            label:
              "OTT, Digital Platforms & Streaming",

            href: "/companies",
          },

          {
            label:
              "Monetization Model",

            href: "/companies",
          },

          {
            label:
              "Fast Channel",

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
        heading:
          "Content Assets",

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

      title:
        "Abhijat Marathi OTT",
    },
  },

  {
    id: "services",

    label: "Services",

    gridColumns:
      "1fr 1fr 1.1fr 0.7fr",

    columns: [
      {
        heading:
          "Media and Production",

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
        heading:
          "Creator Services",

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
        heading:
          "Any Specific Need?",

        entries: [
          {
            label:
              "Call now?",

            href: "/contact",
          },
        ],
      },
    ],
  },

  {
    id: "solutions",

    label: "Solutions",

    gridColumns:
      "1.1fr 1.1fr 1fr",

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
    label:
      "Investors Relations",

    href: "/about",
  },

  {
    label:
      "Careers",

    href: "/careers",
  },
];

/* ============================================================
   CONFIG
   ============================================================ */

const DESKTOP_QUERY =
  "(min-width: 1120px)";

const CLOSE_DELAY_MS = 140;

const TOP_THRESHOLD_PX = 24;
const DIRECTION_TRIGGER_PX = 12;

/* ============================================================
   HEADER MODES

   overlay:
   - transparent over a page hero at the very top
   - light Contact us button at the very top
   - hides directly when scrolling down
   - returns as the solid header when scrolling up

   solid:
   - white header from the first render
   - gold Contact us button at all times

   Add any full-bleed hero route that needs the overlay treatment here.
   Article/detail pages are intentionally not matched by prefix.
   ============================================================ */

export type HeaderVariant =
  | "auto"
  | "overlay"
  | "solid";

const OVERLAY_HEADER_ROUTES = new Set([
  "/",
  "/news-and-blogs",
]);

function routeUsesOverlayHeader(pathname: string) {
  return OVERLAY_HEADER_ROUTES.has(pathname);
}

/* ============================================================
   LOGO
   ============================================================ */

function SumanLogo({
  inverse = false,
}: {
  inverse?: boolean;
}) {
  return (
    <Image
      src="/images/logo.png"
      alt="Suman Entertainment & Media"
      width={134}
      height={39}
      priority
      className={`
        ${styles.logo}

        ${inverse
          ? styles.logoInverse
          : ""
        }
      `}
    />
  );
}

/* ============================================================
   ICONS
   ============================================================ */

function ChevronDownIcon({
  open = false,
}: {
  open?: boolean;
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 12 12"
      className={
        styles.chevron
      }
      data-open={open}
      fill="none"
    >
      <path
        d="M3 4.5 6 7.5l3-3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MenuIcon({
  close = false,
}: {
  close?: boolean;
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="none"
    >
      <path
        d={
          close
            ? "M6 6l12 12M18 6 6 18"
            : "M4 7h16M4 12h16M4 17h16"
        }
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      width="16"
      height="16"
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

/* ============================================================
   DROPDOWN PANEL
   ============================================================ */

function DropdownPanel({
  menu,
  onNavigate,
  reduceMotion,
}: {
  menu: NavMenu;
  onNavigate: () => void;
  reduceMotion: boolean;
}) {
  return (
    <motion.div
      id={`nav-menu-${menu.id}`}
      data-desktop-panel
      data-lenis-prevent
      aria-label={`${menu.label} menu`}
      className={styles.dropdown}
      initial={
        reduceMotion
          ? false
          : {
            opacity: 0,
            y: -8,
            clipPath: "inset(0 0 100% 0)",
          }
      }
      animate={{
        opacity: 1,
        y: 0,
        clipPath: "inset(0 0 0% 0)",
      }}
      exit={
        reduceMotion
          ? { opacity: 0 }
          : {
            opacity: 0,
            y: -6,
            clipPath: "inset(0 0 100% 0)",
          }
      }
      transition={{
        duration: reduceMotion ? 0 : 0.3,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{
        transformOrigin: "50% 0%",
        backgroundColor: "#FFFFFF",
      }}
    >
      <motion.div
        className={styles.dropdownGrid}
        style={{
          gridTemplateColumns: menu.gridColumns,
        }}
        initial={reduceMotion ? false : { opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
        transition={{
          duration: reduceMotion ? 0 : 0.22,
          delay: reduceMotion ? 0 : 0.055,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {menu.columns.map(
          (
            column,
          ) => (
            <div
              key={
                column.heading
              }
              className={
                styles.column
              }
            >
              <h3
                className={
                  styles.columnHeading
                }
              >
                {
                  column.heading
                }
              </h3>

              <div
                className={
                  styles.entries
                }
              >
                {column.entries.map(
                  (
                    entry,
                  ) => (
                    <div
                      key={
                        entry.label
                      }
                    >
                      <Link
                        href={
                          entry.href
                        }
                        onClick={
                          onNavigate
                        }
                        className={
                          styles.entryLink
                        }
                      >
                        {
                          entry.label
                        }
                      </Link>

                      {entry
                        .sublines
                        ?.length ? (
                        <ul
                          className={
                            styles.sublines
                          }
                        >
                          {entry.sublines.map(
                            (
                              line,
                            ) => (
                              <li
                                key={
                                  line
                                }
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
                          className={
                            styles.subtext
                          }
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
                  className={
                    styles.columnImage
                  }
                >
                  <Image
                    src={
                      column
                        .image
                        .src
                    }
                    alt={
                      column
                        .image
                        .alt
                    }
                    fill
                    sizes="
                      (min-width: 1120px) 30vw,
                      90vw
                    "
                    className={
                      styles.coverImage
                    }
                  />
                </div>
              ) : null}
            </div>
          ),
        )}

        {menu.featured ? (
          <div
            className={
              styles.featured
            }
          >
            <Link
              href={
                menu.featured
                  .href
              }
              onClick={
                onNavigate
              }
              className={
                styles.featuredLink
              }
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
                className={
                  styles.coverImage
                }
              />

              <div
                className={
                  styles.featuredCaption
                }
              >
                <span
                  className={
                    styles.featuredButton
                  }
                >
                  Explore
                </span>

                <span>
                  <strong>
                    {
                      menu.featured
                        .tag
                    }
                  </strong>

                  {" · "}

                  {
                    menu.featured
                      .title
                  }
                </span>
              </div>
            </Link>
          </div>
        ) : null}
      </motion.div>
    </motion.div>
  );
}

/* ============================================================
   HEADER
   ============================================================ */

export function Header({
  variant = "auto",
}: {
  variant?: HeaderVariant;
} = {}) {
  const pathname =
    usePathname();

  const resolvedVariant =
    variant === "auto"
      ? routeUsesOverlayHeader(pathname)
        ? "overlay"
        : "solid"
      : variant;

  const usesOverlayHeader =
    resolvedVariant === "overlay";

  const reduceMotion =
    useReducedMotion() === true;

  /* ==========================================================
     STATE
     ========================================================== */

  const [
    menuOpen,
    setMenuOpen,
  ] =
    useState(false);

  const [
    openDropdown,
    setOpenDropdown,
  ] =
    useState<
      string | null
    >(null);

  /*
   * Keeps the white desktop navigation surface mounted while
   * the dropdown is animating out. Without this state the
   * homepage header turns transparent one frame before the
   * dropdown exit animation has finished.
   */
  const [
    dropdownSurfaceVisible,
    setDropdownSurfaceVisible,
  ] =
    useState(false);

  /*
   * At the very top of the homepage the navigation can sit over the Hero.
   * As soon as a mouse user hovers the header we intentionally switch to
   * the solid white navigation treatment from the reference image.
   */
  const [
    headerHovered,
    setHeaderHovered,
  ] =
    useState(false);

  /*
   * Overlay pages must not change into the solid header while the
   * user is scrolling DOWN. That was the source of the brief
   * "second header" flash before the hide animation.
   *
   * This becomes true only when the user scrolls UP after leaving
   * the top. It resets when the page reaches the top again.
   */
  const [
    scrollReturnSurfaceVisible,
    setScrollReturnSurfaceVisible,
  ] =
    useState(false);

  /*
   * This is intentionally only a BOOLEAN threshold state.
   *
   * React is NOT updated on every scroll position.
   * It updates only when we cross:
   *
   * scroll <= 24px
   * scroll > 24px
   */
  const [
    isScrolled,
    setIsScrolled,
  ] =
    useState(false);

  /* ==========================================================
     REFS
     ========================================================== */

  const headerRef =
    useRef<HTMLElement>(
      null,
    );

  const dialogRef =
    useRef<HTMLDivElement>(
      null,
    );

  const menuButtonRef =
    useRef<HTMLButtonElement>(
      null,
    );

  const closeButtonRef =
    useRef<HTMLButtonElement>(
      null,
    );

  const triggerRefs =
    useRef<
      Record<
        string,
        HTMLButtonElement | null
      >
    >({});

  const closeTimer =
    useRef<
      ReturnType<
        typeof setTimeout
      > | null
    >(null);

  /* ==========================================================
     VISUAL STATE

     OVERLAY HEADER
       top + idle:
         transparent / white nav / light Contact us

       scroll DOWN:
         hide this same transparent header directly
         (do not swap to the solid header first)

       scroll UP after leaving the top:
         solid white / dark nav / gold Contact us

     SOLID HEADER
       always white / dark nav / gold Contact us
     ========================================================== */

  const navigationSurfaceVisible =
    menuOpen ||
    dropdownSurfaceVisible ||
    headerHovered;

  const solidSurfaceVisible =
    !usesOverlayHeader ||
    navigationSurfaceVisible ||
    scrollReturnSurfaceVisible;

  const transparentAtTop =
    usesOverlayHeader &&
    !solidSurfaceVisible;

  const topTextColor =
    transparentAtTop
      ? "#FFFFFF"
      : "#1A1A1A";

  /* ==========================================================
     DROPDOWN CONTROLS
     ========================================================== */

  const cancelClose =
    useCallback(() => {
      if (
        closeTimer.current !==
        null
      ) {
        clearTimeout(
          closeTimer.current,
        );

        closeTimer.current =
          null;
      }
    }, []);

  const closeDropdown =
    useCallback(() => {
      cancelClose();

      /*
       * Keep dropdownSurfaceVisible=true here.
       * AnimatePresence clears it only after the exit animation,
       * preventing a transparent flash over the homepage hero.
       */
      setOpenDropdown(
        null,
      );
    }, [cancelClose]);

  const openMenu =
    useCallback(
      (
        id: string,
      ) => {
        cancelClose();

        /*
         * Turn the white patch on in the same interaction that
         * opens the dropdown.
         */
        setDropdownSurfaceVisible(
          true,
        );

        setOpenDropdown(
          id,
        );
      },
      [cancelClose],
    );

  const scheduleClose =
    useCallback(() => {
      cancelClose();

      closeTimer.current =
        setTimeout(() => {
          const focused =
            document.activeElement;

          /*
           * Keep it open while keyboard focus is
           * visibly inside the dropdown.
           */
          if (
            focused instanceof
            HTMLElement &&
            focused.matches(
              ":focus-visible",
            ) &&
            focused.closest(
              "[data-desktop-panel]",
            )
          ) {
            return;
          }

          setOpenDropdown(
            null,
          );

          closeTimer.current =
            null;
        }, CLOSE_DELAY_MS);
    }, [cancelClose]);

  const closeMobileMenu =
    useCallback(() => {
      setMenuOpen(false);
    }, []);

  /* ==========================================================
     ROUTE CHANGE
     ========================================================== */

  useEffect(() => {
    const frame =
      requestAnimationFrame(
        () => {
          cancelClose();

          setMenuOpen(
            false,
          );

          setOpenDropdown(
            null,
          );

          setDropdownSurfaceVisible(
            false,
          );

          setHeaderHovered(
            false,
          );

          setScrollReturnSurfaceVisible(
            false,
          );

          setIsScrolled(
            Math.max(
              0,
              window.scrollY,
            ) >
            TOP_THRESHOLD_PX,
          );
        },
      );

    return () =>
      cancelAnimationFrame(
        frame,
      );
  }, [
    pathname,
    cancelClose,
  ]);

  /* ==========================================================
     BREAKPOINT CHANGE
     ========================================================== */

  useEffect(() => {
    const desktop =
      window.matchMedia(
        DESKTOP_QUERY,
      );

    const onBreakpoint =
      () => {
        cancelClose();

        setMenuOpen(
          false,
        );

        setOpenDropdown(
          null,
        );

        setDropdownSurfaceVisible(
          false,
        );

        setHeaderHovered(
          false,
        );

        setScrollReturnSurfaceVisible(
          false,
        );
      };

    desktop.addEventListener(
      "change",
      onBreakpoint,
    );

    return () => {
      desktop.removeEventListener(
        "change",
        onBreakpoint,
      );

      cancelClose();
    };
  }, [cancelClose]);

  /* ==========================================================
     OUTSIDE POINTER + ESCAPE
     ========================================================== */

  useEffect(() => {
    const onOutsidePointer =
      (
        event:
          PointerEvent,
      ) => {
        if (
          event.target instanceof
          Node &&
          !headerRef.current?.contains(
            event.target,
          )
        ) {
          closeDropdown();
        }
      };

    const onEscape =
      (
        event:
          KeyboardEvent,
      ) => {
        if (
          event.key !==
          "Escape"
        ) {
          return;
        }

        if (
          openDropdown
        ) {
          event.preventDefault();

          triggerRefs.current[
            openDropdown
          ]?.focus({
            preventScroll: true,
          });

          closeDropdown();
        }

        setMenuOpen(
          false,
        );
      };

    document.addEventListener(
      "pointerdown",
      onOutsidePointer,
    );

    document.addEventListener(
      "keydown",
      onEscape,
    );

    return () => {
      document.removeEventListener(
        "pointerdown",
        onOutsidePointer,
      );

      document.removeEventListener(
        "keydown",
        onEscape,
      );
    };
  }, [
    openDropdown,
    closeDropdown,
  ]);

  /* ==========================================================
     MOBILE MENU FOCUS / SCROLL LOCK
     ========================================================== */

  useEffect(() => {
    if (!menuOpen) {
      return;
    }

    const dialog =
      dialogRef.current;

    const returnFocus =
      menuButtonRef.current;

    const previousBody =
      document.body.style
        .overflow;

    const previousHtml =
      document.documentElement
        .style.overflow;

    document.body.style.overflow =
      "hidden";

    document.documentElement.style.overflow =
      "hidden";

    const focusFrame =
      requestAnimationFrame(
        () =>
          closeButtonRef.current?.focus(),
      );

    const trapFocus =
      (
        event:
          KeyboardEvent,
      ) => {
        if (
          event.key !==
          "Tab" ||
          !dialog
        ) {
          return;
        }

        const focusable =
          Array.from(
            dialog.querySelectorAll<HTMLElement>(
              'a[href], button:not([disabled]), summary, [tabindex="0"]',
            ),
          ).filter(
            (
              element,
            ) =>
              element
                .getClientRects()
                .length > 0,
          );

        const first =
          focusable[0];

        const last =
          focusable[
          focusable.length -
          1
          ];

        if (
          event.shiftKey &&
          (
            document.activeElement ===
            first ||
            !dialog.contains(
              document.activeElement,
            )
          )
        ) {
          event.preventDefault();

          last?.focus();
        } else if (
          !event.shiftKey &&
          (
            document.activeElement ===
            last ||
            !dialog.contains(
              document.activeElement,
            )
          )
        ) {
          event.preventDefault();

          first?.focus();
        }
      };

    document.addEventListener(
      "keydown",
      trapFocus,
    );

    return () => {
      cancelAnimationFrame(
        focusFrame,
      );

      document.removeEventListener(
        "keydown",
        trapFocus,
      );

      document.body.style.overflow =
        previousBody;

      document.documentElement.style.overflow =
        previousHtml;

      returnFocus?.focus({
        preventScroll: true,
      });
    };
  }, [menuOpen]);

  /* ==========================================================
     DIRECTION-AWARE HEADER

     Critical behavior for overlay pages:

     1. At the top, the overlay header is visible.
     2. Scroll DOWN -> that same overlay header hides directly.
        We DO NOT activate the solid surface on the way down.
     3. Scroll UP -> activate the solid surface first, then reveal
        the header on the next animation frame.
     4. Back at the top -> reset to the overlay treatment.

     Solid pages keep the solid treatment for every state.
     ========================================================== */

  useEffect(() => {
    const header =
      headerRef.current;

    if (!header) {
      return;
    }

    let previous =
      Math.max(
        0,
        window.scrollY,
      );

    let accumulated = 0;
    let direction = 0;
    let frame = 0;
    let revealFrame = 0;

    let previousScrolled =
      previous >
      TOP_THRESHOLD_PX;

    setIsScrolled(
      previousScrolled,
    );

    if (
      usesOverlayHeader &&
      previous <= TOP_THRESHOLD_PX
    ) {
      setScrollReturnSurfaceVisible(
        false,
      );
    }

    const showHeader = () => {
      header.dataset.hidden =
        "false";
    };

    const update = () => {
      frame = 0;

      const y =
        Math.max(
          0,
          window.scrollY,
        );

      const delta =
        y - previous;

      previous = y;

      const nextScrolled =
        y >
        TOP_THRESHOLD_PX;

      if (
        nextScrolled !==
        previousScrolled
      ) {
        previousScrolled =
          nextScrolled;

        setIsScrolled(
          nextScrolled,
        );
      }

      header.dataset.scrolled =
        String(
          nextScrolled,
        );

      /*
       * Returning to the top restores the hero/overlay version.
       * This reset is intentionally independent from isScrolled so
       * scrolling down never changes the header surface before hide.
       */
      if (
        usesOverlayHeader &&
        y <= TOP_THRESHOLD_PX
      ) {
        setScrollReturnSurfaceVisible(
          false,
        );

        accumulated = 0;
        direction = 0;
        showHeader();
        return;
      }

      const interactionKeepsHeaderOpen =
        menuOpen ||
        Boolean(openDropdown) ||
        header.contains(
          document.activeElement,
        );

      if (interactionKeepsHeaderOpen) {
        accumulated = 0;
        showHeader();
        return;
      }

      if (delta === 0) {
        return;
      }

      const nextDirection =
        Math.sign(delta);

      if (
        nextDirection !==
        direction
      ) {
        accumulated = 0;
        direction = nextDirection;
      }

      accumulated +=
        Math.abs(delta);

      if (
        accumulated <=
        DIRECTION_TRIGGER_PX
      ) {
        return;
      }

      accumulated = 0;

      if (direction > 0) {
        /*
         * Scroll DOWN.
         *
         * Do not modify scrollReturnSurfaceVisible here. On the
         * initial descent it is false, therefore the overlay header
         * simply animates out without flashing the solid/gold state.
         */
        header.dataset.hidden =
          "true";
        return;
      }

      if (direction < 0) {
        if (usesOverlayHeader) {
          /*
           * Set the solid return surface before un-hiding.
           * The next RAF gives React a paint opportunity so the
           * returning header never flashes the transparent version.
           */
          setScrollReturnSurfaceVisible(
            true,
          );

          cancelAnimationFrame(
            revealFrame,
          );

          revealFrame =
            requestAnimationFrame(
              showHeader,
            );
        } else {
          showHeader();
        }
      }
    };

    const schedule = () => {
      if (!frame) {
        frame =
          requestAnimationFrame(
            update,
          );
      }
    };

    schedule();

    window.addEventListener(
      "scroll",
      schedule,
      {
        passive: true,
      },
    );

    return () => {
      cancelAnimationFrame(frame);
      cancelAnimationFrame(
        revealFrame,
      );

      window.removeEventListener(
        "scroll",
        schedule,
      );
    };
  }, [
    menuOpen,
    openDropdown,
    pathname,
    usesOverlayHeader,
  ]);

  /* ==========================================================
     ACTIVE DROPDOWN
     ========================================================== */

  const activeMenu =
    NAV_MENUS.find(
      (
        menu,
      ) =>
        menu.id ===
        openDropdown,
    ) ?? null;

  /* ==========================================================
     RENDER
     ========================================================== */

  return (
    <>
      {/* =====================================================
          PAGE SPACER

          IMPORTANT:

          Overlay-header routes:
          no spacer, because the header sits over the page hero.

          Solid-header routes:
          preserve the spacer so content starts below the fixed header.
          ===================================================== */}

      {!usesOverlayHeader ? (
        <div
          aria-hidden="true"
          className={
            styles.spacer
          }
        />
      ) : null}

      {/* =====================================================
          HEADER
          ===================================================== */}

      <header
        ref={headerRef}
        data-site-header
        data-header-variant={
          resolvedVariant
        }
        data-surface={
          transparentAtTop
            ? "overlay"
            : "solid"
        }
        data-menu-open={
          menuOpen ||
          Boolean(
            openDropdown,
          )
        }
        data-landing-text-reveal-skip
        data-overlay={
          transparentAtTop
        }
        data-scrolled={
          isScrolled
        }
        className={`
          ${inter.className}
          ${styles.header}
        `}
        /*
         * Inline visual state intentionally overrides
         * old CSS rules that forced homepage header white.
         *
         * It does NOT touch transform/hide/show behavior.
         */
        style={{
          backgroundColor:
            transparentAtTop
              ? "transparent"
              : "#FFFFFF",

          color:
            topTextColor,

          borderBottomColor:
            transparentAtTop
              ? "transparent"
              : "#E6E6E6",

          boxShadow:
            transparentAtTop
              ? "none"
              : undefined,

          transition:
            reduceMotion
              ? undefined
              : "background-color 280ms cubic-bezier(0.22, 1, 0.36, 1), color 220ms ease, border-color 280ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 280ms cubic-bezier(0.22, 1, 0.36, 1)",
        }}
        onPointerEnter={(event) => {
          cancelClose();

          if (
            event.pointerType ===
            "mouse"
          ) {
            setHeaderHovered(true);
          }
        }}
        onPointerLeave={(
          event,
        ) => {
          if (
            event.pointerType ===
            "mouse"
          ) {
            setHeaderHovered(false);
            scheduleClose();
          }
        }}
        onBlur={(
          event,
        ) => {
          if (
            !event.currentTarget.contains(
              event.relatedTarget as
              Node | null,
            )
          ) {
            closeDropdown();
          }
        }}
      >
        {/* ===================================================
            TOP ROW
            =================================================== */}

        <div
          className={
            styles.row
          }
          style={{
            backgroundColor:
              transparentAtTop
                ? "transparent"
                : "#FFFFFF",

            transition:
              reduceMotion
                ? undefined
                : "background-color 280ms cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          {/* =================================================
              LOGO
              ================================================= */}

          <Link
            href="/"
            aria-label="Suman Entertainment & Media home"
            className={
              styles.brand
            }
            onMouseEnter={
              closeDropdown
            }
          >
            <SumanLogo
              inverse={
                transparentAtTop
              }
            />
          </Link>

          {/* =================================================
              ACTIONS
              ================================================= */}

          <div
            className={
              styles.actions
            }
          >
            {/* ===============================================
                DESKTOP NAV
                =============================================== */}

            <nav
              aria-label="Primary navigation"
              className={
                styles.desktopNav
              }
            >
              {NAV_MENUS.map(
                (
                  menu,
                ) => (
                  <button
                    key={
                      menu.id
                    }
                    ref={(
                      element,
                    ) => {
                      triggerRefs.current[
                        menu.id
                      ] =
                        element;
                    }}
                    type="button"
                    className={
                      styles.navControl
                    }
                    style={{
                      color:
                        topTextColor,
                    }}
                    aria-expanded={
                      openDropdown ===
                      menu.id
                    }
                    aria-controls={
                      openDropdown ===
                        menu.id
                        ? `nav-menu-${menu.id}`
                        : undefined
                    }
                    onPointerEnter={(
                      event,
                    ) => {
                      if (
                        event.pointerType ===
                        "mouse"
                      ) {
                        openMenu(
                          menu.id,
                        );
                      }
                    }}
                    onClick={(
                      event,
                    ) => {
                      cancelClose();

                      /*
                       * Mouse hover already opens the menu.
                       * Clicking while hovered should keep
                       * it open instead of instantly toggling.
                       */
                      if (
                        event.detail >
                        0 &&
                        event.currentTarget.matches(
                          ":hover",
                        )
                      ) {
                        openMenu(
                          menu.id,
                        );
                      } else if (
                        openDropdown ===
                        menu.id
                      ) {
                        closeDropdown();
                      } else {
                        openMenu(
                          menu.id,
                        );
                      }
                    }}
                    onKeyDown={(
                      event,
                    ) => {
                      if (
                        event.key !==
                        "ArrowDown" &&
                        event.key !==
                        "ArrowUp"
                      ) {
                        return;
                      }

                      event.preventDefault();

                      openMenu(
                        menu.id,
                      );

                      const last =
                        event.key ===
                        "ArrowUp";

                      requestAnimationFrame(
                        () => {
                          const links =
                            headerRef.current?.querySelectorAll<HTMLAnchorElement>(
                              `#nav-menu-${menu.id} a[href]`,
                            );

                          links?.[
                            last
                              ? links.length -
                              1
                              : 0
                          ]?.focus();
                        },
                      );
                    }}
                  >
                    <span>
                      {
                        menu.label
                      }
                    </span>

                    <ChevronDownIcon
                      open={
                        openDropdown ===
                        menu.id
                      }
                    />
                  </button>
                ),
              )}

              {/* =============================================
                  STANDARD NAV LINKS
                  ============================================= */}

              {NAV_LINKS.map(
                (
                  item,
                ) => (
                  <Link
                    key={
                      item.label
                    }
                    href={
                      item.href
                    }
                    className={
                      styles.navControl
                    }
                    style={{
                      color:
                        topTextColor,
                    }}
                    aria-current={
                      pathname ===
                        item.href ||
                        pathname.startsWith(
                          `${item.href}/`,
                        )
                        ? "page"
                        : undefined
                    }
                    onMouseEnter={
                      closeDropdown
                    }
                    onFocus={
                      closeDropdown
                    }
                  >
                    {
                      item.label
                    }
                  </Link>
                ),
              )}
            </nav>

            {/* ===============================================
                CONTACT

                Transparent Hero state uses the light CTA.
                Hover/scrolled/internal states use the solid gold CTA.
                =============================================== */}

            <Link
              href="/contact"
              className={`
                ${styles.contact}
                ${styles.desktopContact}
              `}
              onMouseEnter={
                closeDropdown
              }
              onFocus={
                closeDropdown
              }
            >
              Contact us

              <ArrowRightIcon />
            </Link>

            {/* ===============================================
                MOBILE MENU BUTTON
                =============================================== */}

            <button
              ref={
                menuButtonRef
              }
              type="button"
              className={
                styles.mobileToggle
              }
              style={{
                color:
                  topTextColor,

                borderColor:
                  transparentAtTop
                    ? "rgba(255,255,255,0.45)"
                    : undefined,

                backgroundColor:
                  transparentAtTop
                    ? "rgba(0,0,0,0.10)"
                    : undefined,
              }}
              aria-label="Open navigation menu"
              aria-expanded={
                menuOpen
              }
              aria-controls={
                menuOpen
                  ? "mobile-primary-navigation"
                  : undefined
              }
              onClick={() => {
                closeDropdown();

                setMenuOpen(
                  true,
                );
              }}
            >
              <MenuIcon />
            </button>
          </div>
        </div>

        {/* ===================================================
            DESKTOP DROPDOWN
            =================================================== */}

        <AnimatePresence
          initial={false}
          mode="sync"
          onExitComplete={() => {
            if (!openDropdown) {
              setDropdownSurfaceVisible(
                false,
              );
            }
          }}
        >
          {activeMenu ? (
            <DropdownPanel
              key={activeMenu.id}
              menu={activeMenu}
              onNavigate={closeDropdown}
              reduceMotion={reduceMotion}
            />
          ) : null}
        </AnimatePresence>

        {/* ===================================================
            MOBILE DIALOG
            =================================================== */}

        {menuOpen
          ? createPortal(
            <div
              ref={
                dialogRef
              }
              id="mobile-primary-navigation"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation"
              data-lenis-prevent
              data-landing-text-reveal-skip
              className={`
                  ${inter.className}
                  ${styles.mobileDialog}
                `}
            >
              {/* ===========================================
                    MOBILE TOP BAR
                    =========================================== */}

              <div
                className={
                  styles.mobileTop
                }
              >
                <Link
                  href="/"
                  aria-label="Suman Entertainment & Media home"
                  onClick={
                    closeMobileMenu
                  }
                >
                  <SumanLogo
                    inverse
                  />
                </Link>

                <button
                  ref={
                    closeButtonRef
                  }
                  type="button"
                  aria-label="Close navigation menu"
                  className={
                    styles.iconButton
                  }
                  onClick={
                    closeMobileMenu
                  }
                >
                  <MenuIcon
                    close
                  />
                </button>
              </div>

              {/* ===========================================
                    MOBILE NAVIGATION
                    =========================================== */}

              <nav
                aria-label="Mobile primary navigation"
                className={
                  styles.mobileContent
                }
                data-lenis-prevent
              >
                {NAV_MENUS.map(
                  (
                    menu,
                  ) => (
                    <details
                      key={
                        menu.id
                      }
                      className={
                        styles.mobileGroup
                      }
                    >
                      <summary
                        className={
                          styles.mobileSummary
                        }
                      >
                        {
                          menu.label
                        }

                        <ChevronDownIcon />
                      </summary>

                      {menu.columns.map(
                        (
                          column,
                        ) => (
                          <div
                            key={
                              column.heading
                            }
                            className={
                              styles.mobileColumn
                            }
                          >
                            <h3>
                              {
                                column.heading
                              }
                            </h3>

                            {column.entries.map(
                              (
                                entry,
                              ) => (
                                <div
                                  key={
                                    entry.label
                                  }
                                  className={
                                    styles.mobileEntry
                                  }
                                >
                                  <Link
                                    href={
                                      entry.href
                                    }
                                    onClick={
                                      closeMobileMenu
                                    }
                                  >
                                    {
                                      entry.label
                                    }
                                  </Link>

                                  {entry
                                    .sublines
                                    ?.length ? (
                                    <ul>
                                      {entry.sublines.map(
                                        (
                                          line,
                                        ) => (
                                          <li
                                            key={
                                              line
                                            }
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
                                    <p>
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
                    </details>
                  ),
                )}

                {/* =========================================
                      MOBILE STANDARD LINKS
                      ========================================= */}

                {NAV_LINKS.map(
                  (
                    item,
                  ) => (
                    <Link
                      key={
                        item.label
                      }
                      href={
                        item.href
                      }
                      onClick={
                        closeMobileMenu
                      }
                      className={
                        styles.mobileLink
                      }
                    >
                      {
                        item.label
                      }
                    </Link>
                  ),
                )}

                {/* =========================================
                      MOBILE CONTACT
                      ========================================= */}

                <Link
                  href="/contact"
                  onClick={
                    closeMobileMenu
                  }
                  className={`
                      ${styles.contact}
                      ${styles.mobileContact}
                    `}
                >
                  Contact us

                  <ArrowRightIcon />
                </Link>
              </nav>
            </div>,

            document.body,
          )
          : null}
      </header>
    </>
  );
}

/* ============================================================
   EXPLICIT VARIANTS

   Use these when a page/layout should opt in directly instead of
   relying on the automatic route list above.
   ============================================================ */

export function OverlayHeader() {
  return <Header variant="overlay" />;
}

export function SolidHeader() {
  return <Header variant="solid" />;
}
