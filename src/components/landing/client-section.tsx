"use client";

import Image from "@/components/ui/image";
import Link from "next/link";

import {
  inter,
  plusJakartaSans,
} from "@/lib/fonts";

import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

/* ============================================================
   TYPES
   ============================================================ */

type Slide = {
  id: number;
  image: string;
  imagePosition?: string;
  eyebrow: string;
  title: string;
  description: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
};

type ScrollMeasurements = {
  viewportWidth: number;
  slideWidth: number;
  gap: number;
  edgeInset: number;
  horizontalDistance: number;
  stickyHeight: number;
};

/* ============================================================
   SLIDES
   ============================================================ */

const SLIDES: Slide[] = [
  {
    id: 1,
    image: "/images/landing/client/Image1.png",
    imagePosition: "center center",
    eyebrow: "01. DIGITAL ENTERTAINMENT & PLATFORM",
    title: "Abhijat Marathi OTT",
    description:
      "A dedicated Marathi OTT platform bringing regional stories, films and content to audiences worldwide.",
    primaryLabel: "Explore Abhijat Marathi",
    primaryHref: "/companies/abhijat-marathi",
    secondaryLabel: "Learn more",
    secondaryHref: "/companies/abhijat-marathi",
  },
  {
    id: 2,
    image: "/images/landing/client/Image2.png",
    imagePosition: "center center",
    eyebrow: "02. EVENT & EXPERIENCES",
    title: "Experiences Beyond the Screen",
    description:
      "Delivering concerts, cultural festivals, corporate events, product launches, and large-scale public experiences that connect brands with audiences.",
    primaryLabel: "Watch now",
    primaryHref: "/services",
    secondaryLabel: "Learn more",
    secondaryHref: "/services",
  },
  {
    id: 3,
    image: "/images/landing/client/Image3.png",
    imagePosition: "center center",
    eyebrow: "03. MUSIC & AUDIO ECOSYSTEM",
    title: "Building India's Next Music Library",
    description:
      "From original compositions and film soundtracks to digital publishing and royalty management, creating music that reaches audiences everywhere.",
    primaryLabel: "Explore library",
    primaryHref: "/services",
    secondaryLabel: "Learn more",
    secondaryHref: "/services",
  },
  {
    id: 4,
    image: "/images/landing/client/Image4.png",
    imagePosition: "center center",
    eyebrow: "04. CONTENT CREATION",
    title: "Creating Stories That Inspire Millions",
    description:
      "Producing feature films, web series, documentaries, branded content, and corporate communications with end-to-end production capabilities.",
    primaryLabel: "Watch now",
    primaryHref: "/services",
    secondaryLabel: "Learn more",
    secondaryHref: "/services",
  },
  {
    id: 5,
    image: "/images/landing/client/Image5.png",
    imagePosition: "center center",
    eyebrow: "05. GOVT & STRATEGIC COMMUNICATION",
    title: "Empowering Public Communication at Scale",
    description:
      "Partnering with government institutions, public sector organizations, and enterprises to deliver impactful campaigns, citizen engagement, and strategic communication initiatives.",
    primaryLabel: "Watch now",
    primaryHref: "/services",
    secondaryLabel: "Learn more",
    secondaryHref: "/services",
  },
];

const UI_EASE = [0.22, 1, 0.36, 1] as const;

/* ============================================================
   ICON
   ============================================================ */

function SmallArrowRight() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 8 14"
      fill="none"
      className="h-3 w-1.5 shrink-0"
    >
      <path
        d="M1 13L7 7L1 1"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ============================================================
   SECTION HEADER
   ============================================================ */

function HeaderText() {
  const reduceMotion = useReducedMotion() ?? false;

  return (
    <div className="min-w-0 flex-1">
      <motion.p
        initial={
          reduceMotion
            ? false
            : {
                opacity: 0,
                y: 10,
              }
        }
        whileInView={
          reduceMotion
            ? undefined
            : {
                opacity: 1,
                y: 0,
              }
        }
        viewport={{ once: true, amount: 0.55 }}
        transition={{ duration: 0.45, ease: UI_EASE }}
        className={`${plusJakartaSans.className} text-[0.875rem] font-semibold leading-[1.25rem] text-[#B8B8B8]`}
        style={{ fontFeatureSettings: '"liga" off, "clig" off' }}
      >
        BUSINESS ECOSYSTEM
      </motion.p>

      <motion.h2
        id="clients-heading"
        initial={
          reduceMotion
            ? false
            : {
                opacity: 0,
                y: 16,
              }
        }
        whileInView={
          reduceMotion
            ? undefined
            : {
                opacity: 1,
                y: 0,
              }
        }
        viewport={{ once: true, amount: 0.55 }}
        transition={{ duration: 0.58, delay: 0.04, ease: UI_EASE }}
        className={`${plusJakartaSans.className} mt-1 max-w-[54rem] text-[clamp(2rem,2.5vw,2.5rem)] font-semibold leading-[1.2] tracking-[-0.03125rem] text-[#1A1A1A]`}
        style={{ fontFeatureSettings: '"liga" off, "clig" off' }}
      >
        One platform, a universe of entertainment
      </motion.h2>
    </div>
  );
}

/* ============================================================
   SLIDE CARD
   ============================================================ */

function SlideCard({
  slide,
  isActive,
}: {
  slide: Slide;
  isActive: boolean;
}) {
  return (
    <article
      aria-current={isActive ? "true" : undefined}
      className="w-full overflow-hidden rounded-[0.25rem] bg-white"
    >
      {/* =====================================================
          IMAGE
          ===================================================== */}

      <div
        className="group relative h-[20rem] w-full overflow-hidden rounded-[0.25rem] bg-[#111] sm:h-[23rem] md:h-[26rem] lg:h-[clamp(19rem,48svh,37.375rem)]"
      >
        <Image
          src={slide.image}
          alt={slide.title}
          fill
          loading="lazy"
          sizes="
            (max-width: 639px) calc(100vw - 2.5rem),
            (max-width: 1023px) calc(100vw - 6rem),
            78vw
          "
          className="select-none object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-safe:group-hover:scale-[1.012]"
          style={{ objectPosition: slide.imagePosition ?? "center center" }}
        />
      </div>

      {/* =====================================================
          CONTENT
          ===================================================== */}

      <div className="grid min-h-[10.5rem] w-full gap-6 px-4 py-6 sm:px-5 md:px-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-14 lg:px-6 lg:py-7">
        <div className="min-w-0 max-w-[47rem]">
          <p
            className={`${plusJakartaSans.className} text-[0.875rem] font-semibold leading-[1.25rem] text-[#8F6C1A]`}
            style={{ fontFeatureSettings: '"liga" off, "clig" off' }}
          >
            {slide.eyebrow.replace(/^\d+\.\s*/, "")}
          </p>

          <h3
            className={`${plusJakartaSans.className} mt-1 text-[clamp(1.625rem,2vw,2rem)] font-bold leading-[1.25] tracking-[-0.03125rem] text-[#1A1A1A]`}
            style={{ fontFeatureSettings: '"liga" off, "clig" off' }}
          >
            {slide.title}
          </h3>

          <p
            className={`${plusJakartaSans.className} mt-2 max-w-[44rem] text-[clamp(1rem,1.3vw,1.25rem)] font-normal leading-[1.4] text-[#969696]`}
            style={{ fontFeatureSettings: '"liga" off, "clig" off' }}
          >
            {slide.description}
          </p>
        </div>

        {/* ===================================================
            BUTTONS - CENTERED WITH COPY AS IN FIGMA
            =================================================== */}

        <div className="flex shrink-0 flex-wrap items-center gap-3 self-center sm:flex-nowrap">
          <Link
            href={slide.primaryHref}
            className={`${inter.className} group inline-flex min-h-12 items-center justify-center gap-2 rounded-[0.25rem] bg-[#8F6C1A] px-5 py-3 text-center text-[0.875rem] font-semibold leading-[1.25rem] text-white transition-[background-color,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-px hover:bg-[#7F5F16] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8F6C1A]/35 focus-visible:ring-offset-2`}
            style={{ fontFeatureSettings: '"liga" off, "clig" off' }}
          >
            <span>{slide.primaryLabel}</span>
            <span
              aria-hidden="true"
              className="inline-flex transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0.5"
            >
              <SmallArrowRight />
            </span>
          </Link>

          <Link
            href={slide.secondaryHref}
            className={`${inter.className} group inline-flex min-h-12 items-center justify-center gap-2 rounded-[0.25rem] border border-[#E6E6E6] bg-white px-5 py-3 text-center text-[0.875rem] font-semibold leading-[1.25rem] text-[#1A1A1A] transition-[background-color,transform,border-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-px hover:border-[#D8D8D8] hover:bg-[#FAFAFA] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8F6C1A]/25 focus-visible:ring-offset-2`}
            style={{ fontFeatureSettings: '"liga" off, "clig" off' }}
          >
            <span>{slide.secondaryLabel}</span>
            <span
              aria-hidden="true"
              className="inline-flex transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0.5"
            >
              <SmallArrowRight />
            </span>
          </Link>
        </div>
      </div>
    </article>
  );
}

/* ============================================================
   BUSINESS ECOSYSTEM

   Desktop:
   vertical page scroll -> horizontal card movement.

   Mobile/tablet:
   native horizontal swipe.

   Only one transform is animated during the desktop rail,
   keeping the interaction responsive and predictable.
   ============================================================ */

export function ClientsSection() {
  const reduceMotion = useReducedMotion() ?? false;

  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const firstSlideRef = useRef<HTMLDivElement>(null);
  const mobileFrameRef = useRef<number | null>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [desktopScrollEnabled, setDesktopScrollEnabled] = useState(false);
  const [measurements, setMeasurements] = useState<ScrollMeasurements>({
    viewportWidth: 0,
    slideWidth: 0,
    gap: 0,
    edgeInset: 0,
    horizontalDistance: 0,
    stickyHeight: 0,
  });

  useEffect(() => {
    const query = window.matchMedia(
      "(min-width: 1024px) and (pointer: fine)",
    );

    const update = () => setDesktopScrollEnabled(query.matches);

    update();
    query.addEventListener("change", update);

    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    const firstSlide = firstSlideRef.current;
    const sticky = stickyRef.current;

    if (!viewport || !track || !firstSlide || !sticky) {
      return;
    }

    let frame = 0;

    const measure = () => {
      window.cancelAnimationFrame(frame);

      frame = window.requestAnimationFrame(() => {
        const viewportWidth = viewport.clientWidth;
        const slideWidth = firstSlide.offsetWidth;
        const trackStyle = window.getComputedStyle(track);

        const rawGap = Number.parseFloat(
          trackStyle.columnGap || trackStyle.gap || "0",
        );

        const gap = Number.isFinite(rawGap) ? rawGap : 0;

        const edgeInset = desktopScrollEnabled
          ? Math.max(0, (viewportWidth - slideWidth) / 2)
          : 0;

        const horizontalDistance = desktopScrollEnabled
          ? Math.max(0, (SLIDES.length - 1) * (slideWidth + gap))
          : 0;

        const stickyHeight = sticky.scrollHeight;

        const next = {
          viewportWidth,
          slideWidth,
          gap,
          edgeInset,
          horizontalDistance,
          stickyHeight,
        };

        setMeasurements((current) => {
          const unchanged =
            Math.abs(current.viewportWidth - next.viewportWidth) < 0.5 &&
            Math.abs(current.slideWidth - next.slideWidth) < 0.5 &&
            Math.abs(current.gap - next.gap) < 0.5 &&
            Math.abs(current.edgeInset - next.edgeInset) < 0.5 &&
            Math.abs(current.horizontalDistance - next.horizontalDistance) < 0.5 &&
            Math.abs(current.stickyHeight - next.stickyHeight) < 0.5;

          return unchanged ? current : next;
        });
      });
    };

    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(viewport);
    observer.observe(firstSlide);
    observer.observe(sticky);

    window.addEventListener("resize", measure, { passive: true });

    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [desktopScrollEnabled]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  /*
   * Do not add another spring on top of Lenis.
   * Keeping one scroll-smoothing layer removes the delayed/catch-up feel.
   */
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -measurements.horizontalDistance],
  );

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (!desktopScrollEnabled || reduceMotion || SLIDES.length <= 1) {
      return;
    }

    const next = Math.min(
      SLIDES.length - 1,
      Math.max(0, Math.round(latest * (SLIDES.length - 1))),
    );

    setActiveIndex((current) => (current === next ? current : next));
  });

  const updateNativeActive = useCallback(() => {
    if (desktopScrollEnabled) {
      return;
    }

    const viewport = viewportRef.current;

    if (!viewport) {
      return;
    }

    const cards = Array.from(
      viewport.querySelectorAll<HTMLElement>("[data-client-slide]"),
    );

    if (!cards.length) {
      return;
    }

    const viewportRect = viewport.getBoundingClientRect();
    const viewportCenter = viewportRect.left + viewportRect.width / 2;

    let nearestIndex = 0;
    let nearestDistance = Number.POSITIVE_INFINITY;

    cards.forEach((card, index) => {
      const rect = card.getBoundingClientRect();
      const center = rect.left + rect.width / 2;
      const distance = Math.abs(center - viewportCenter);

      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestIndex = index;
      }
    });

    setActiveIndex((current) =>
      current === nearestIndex ? current : nearestIndex,
    );
  }, [desktopScrollEnabled]);

  const handleNativeScroll = useCallback(() => {
    if (mobileFrameRef.current !== null) {
      window.cancelAnimationFrame(mobileFrameRef.current);
    }

    mobileFrameRef.current = window.requestAnimationFrame(updateNativeActive);
  }, [updateNativeActive]);

  useEffect(() => {
    return () => {
      if (mobileFrameRef.current !== null) {
        window.cancelAnimationFrame(mobileFrameRef.current);
      }
    };
  }, []);

  const stickyEnabled =
    desktopScrollEnabled &&
    !reduceMotion &&
    measurements.horizontalDistance > 0;

  const sectionHeight = stickyEnabled
    ? measurements.stickyHeight + measurements.horizontalDistance
    : undefined;

  return (
    <section
      ref={sectionRef}
      id="clients"
      aria-labelledby="clients-heading"
      data-motion-managed
      className="landing-section-transition relative w-full bg-white"
      style={sectionHeight ? { height: `${sectionHeight}px` } : undefined}
    >
      <div
        ref={stickyRef}
        className={`
          w-full overflow-hidden bg-white
          ${stickyEnabled ? "sticky top-0" : "relative"}
          py-16 sm:py-20
          lg:py-[clamp(1.75rem,4svh,3.5rem)]
        `}
      >
        <div className="mx-auto w-full max-w-[74.3125rem] px-5 sm:px-8 lg:px-0">
          <HeaderText />
        </div>

        <div
          ref={viewportRef}
          role="region"
          aria-label="Business ecosystem"
          onScroll={handleNativeScroll}
          className={`
            clients-scroll-viewport relative mt-10 w-full sm:mt-12
            lg:mt-[clamp(1.75rem,3.5svh,2.75rem)]
            ${
              stickyEnabled
                ? "overflow-hidden"
                : "snap-x snap-mandatory overflow-x-auto overflow-y-hidden overscroll-x-contain scroll-smooth"
            }
          `}
        >
          <motion.div
            ref={trackRef}
            className={`
              clients-scroll-track flex w-max items-start gap-5 sm:gap-6 lg:gap-8
              ${
                stickyEnabled
                  ? "transform-gpu will-change-transform [backface-visibility:hidden]"
                  : "px-5 sm:px-8"
              }
            `}
            style={
              stickyEnabled
                ? {
                    x,
                    paddingLeft: measurements.edgeInset,
                    paddingRight: measurements.edgeInset,
                  }
                : undefined
            }
          >
            {SLIDES.map((slide, index) => (
              <div
                key={slide.id}
                ref={index === 0 ? firstSlideRef : undefined}
                data-client-slide
                className="w-[calc(100vw-2.5rem)] shrink-0 snap-center sm:w-[calc(100vw-6rem)] md:w-[calc(100vw-8rem)] lg:w-[min(78vw,74.3125rem)]"
              >
                <SlideCard slide={slide} isActive={index === activeIndex} />
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <style>{`
        .clients-scroll-viewport {
          scrollbar-width: none;
          -ms-overflow-style: none;
          -webkit-overflow-scrolling: touch;
        }

        .clients-scroll-viewport::-webkit-scrollbar {
          display: none;
        }

        @media (max-width: 1023px) {
          #clients {
            height: auto !important;
          }

          #clients > div:first-child {
            position: relative !important;
            top: auto !important;
          }

          .clients-scroll-track {
            transform: none !important;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          #clients {
            height: auto !important;
          }

          #clients > div:first-child {
            position: relative !important;
            top: auto !important;
          }

          .clients-scroll-viewport {
            overflow-x: auto !important;
            scroll-behavior: auto !important;
          }

          .clients-scroll-track {
            transform: none !important;
          }
        }
      `}</style>
    </section>
  );
}
