"use client";

import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type RefObject,
} from "react";

import type { CmsFeaturedService } from "@/types/cms";

type ServicesScrollGalleryProps = {
  eyebrow?: string | null;
  heading?: string | null;
  services: CmsFeaturedService[];
  handoffScrollVh?: number;
};

type OrderedService = {
  service: CmsFeaturedService;
  serviceNumber: number;
};

type StageMetrics = {
  cardWidth: number;
  cardHeight: number;
  stackStep: number;
  scale: number;
  top: number;
  measured: boolean;
};

const MAX_SERVICES = 8;
const CARD_SCROLL_VH = 72;
const DEFAULT_HANDOFF_SCROLL_VH = 46;
const DEFAULT_HEADING = "What we really do?";

/** Colours are stored in CMS order: service 01 through service 08. */
const SERVICE_COLOURS = [
  "#FF7043", // 01 Deep Orange 400
  "#AB47BC", // 02 Purple 400
  "#FDD835", // 03 Yellow 600
  "#4BE887", // 04 Neon 600
  "#1565C0", // 05 Blue 800
  "#9CCC65", // 06 Light Green 400
  "#00ACC1", // 07 Cyan 600
  "#F06292", // 08 Pink 300
] as const;

/** Exact desktop widths from front card 08 to back card 01. */
const STACK_WIDTHS_REM = [
  78.5,
  70.875,
  63.375,
  55.75,
  48.25,
  40.625,
  33.125,
  25.5,
] as const;

const FRONT_CARD_WIDTH_REM = STACK_WIDTHS_REM[0];
const DESKTOP_CARD_WIDTH = FRONT_CARD_WIDTH_REM * 16;
const DESKTOP_CARD_HEIGHT = 38.75 * 16;
const DESKTOP_STACK_STEP = 4 * 16;

/**
 * Mobile keeps the desktop card proportions on a smaller logical canvas. The
 * complete eight-card stack is then scaled as one unit, preventing cards 01
 * and 02 from being clipped out of the layout.
 */
const MOBILE_CARD_WIDTH = 640;
const MOBILE_CARD_HEIGHT = 360;
const MOBILE_STACK_STEP = 24;

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

function mix(from: number, to: number, progress: number) {
  return from + (to - from) * progress;
}

function easeInOutCubic(value: number) {
  const progress = clamp(value);

  return progress < 0.5
    ? 4 * progress * progress * progress
    : 1 - Math.pow(-2 * progress + 2, 3) / 2;
}

function widthRatioAtDepth(depth: number) {
  const safeDepth = clamp(depth, 0, STACK_WIDTHS_REM.length - 1);
  const lowerIndex = Math.floor(safeDepth);
  const upperIndex = Math.min(
    STACK_WIDTHS_REM.length - 1,
    Math.ceil(safeDepth),
  );
  const localProgress = safeDepth - lowerIndex;
  const lower = STACK_WIDTHS_REM[lowerIndex] / FRONT_CARD_WIDTH_REM;
  const upper = STACK_WIDTHS_REM[upperIndex] / FRONT_CARD_WIDTH_REM;

  return mix(lower, upper, localProgress);
}

function readString(record: Record<string, unknown>, keys: string[]) {
  for (const key of keys) {
    const value = record[key];

    if (typeof value === "string" && value.trim()) {
      return value.trim();
    }
  }

  return null;
}

function readNestedImage(
  record: Record<string, unknown>,
  keys: string[],
): { url: string; alt?: string } | null {
  for (const key of keys) {
    const value = record[key];

    if (!value || typeof value !== "object") continue;

    const nested = value as Record<string, unknown>;
    const url = readString(nested, ["url", "src", "assetUrl"]);

    if (!url) continue;

    return {
      url,
      alt: readString(nested, ["alt", "altText", "description"]) || undefined,
    };
  }

  return null;
}

function serviceMedia(service: CmsFeaturedService) {
  const record = service as unknown as Record<string, unknown>;
  const fallbackTitle =
    typeof service.title === "string" && service.title.trim()
      ? service.title.trim()
      : "Service";
  const directUrl = readString(record, [
    "imageUrl",
    "cardImageUrl",
    "featuredImageUrl",
    "coverImageUrl",
    "thumbnailUrl",
    "heroImageUrl",
  ]);
  const directAlt = readString(record, [
    "imageAlt",
    "cardImageAlt",
    "featuredImageAlt",
    "coverImageAlt",
    "thumbnailAlt",
  ]);

  if (directUrl) {
    return { url: directUrl, alt: directAlt || fallbackTitle };
  }

  const nested = readNestedImage(record, [
    "image",
    "cardImage",
    "featuredImage",
    "coverImage",
    "thumbnail",
    "heroImage",
  ]);

  if (nested) {
    return { url: nested.url, alt: nested.alt || fallbackTitle };
  }

  return null;
}

function splitHeadingIntoTwoLines(value: string) {
  const heading = value.trim() || DEFAULT_HEADING;

  if (heading.toLowerCase() === DEFAULT_HEADING.toLowerCase()) {
    return ["What we", "really do?"];
  }

  const words = heading.split(/\s+/).filter(Boolean);

  if (words.length < 2) return [heading];

  const breakAt = Math.ceil(words.length / 2);
  return [words.slice(0, breakAt).join(" "), words.slice(breakAt).join(" ")];
}

function useStageMetrics(
  stageRef: RefObject<HTMLDivElement | null>,
  serviceCount: number,
) {
  const [metrics, setMetrics] = useState<StageMetrics>({
    cardWidth: DESKTOP_CARD_WIDTH,
    cardHeight: DESKTOP_CARD_HEIGHT,
    stackStep: DESKTOP_STACK_STEP,
    scale: 0.8,
    top: 176,
    measured: false,
  });

  useEffect(() => {
    const stage = stageRef.current;

    if (!stage) return;

    const measure = () => {
      const rect = stage.getBoundingClientRect();
      const isCompact = rect.width < 900;
      const cardWidth = isCompact ? MOBILE_CARD_WIDTH : DESKTOP_CARD_WIDTH;
      const cardHeight = isCompact ? MOBILE_CARD_HEIGHT : DESKTOP_CARD_HEIGHT;
      const stackStep = isCompact ? MOBILE_STACK_STEP : DESKTOP_STACK_STEP;
      const stackHeight =
        cardHeight + Math.max(0, serviceCount - 1) * stackStep;
      const horizontalInset = isCompact ? 16 : 32;
      const bottomInset = isCompact ? 20 : 32;
      const top = isCompact
        ? Math.min(150, Math.max(96, rect.height * 0.2))
        : Math.min(250, Math.max(144, rect.height * 0.21));
      const widthScale = Math.max(
        0.1,
        (rect.width - horizontalInset) / cardWidth,
      );
      const heightScale = Math.max(
        0.1,
        (rect.height - top - bottomInset) / stackHeight,
      );
      const scale = Math.min(1, widthScale, heightScale);

      setMetrics((current) => {
        const next = {
          cardWidth,
          cardHeight,
          stackStep,
          scale,
          top,
          measured: true,
        };

        if (
          current.cardWidth === next.cardWidth &&
          current.cardHeight === next.cardHeight &&
          current.stackStep === next.stackStep &&
          Math.abs(current.scale - next.scale) < 0.001 &&
          Math.abs(current.top - next.top) < 0.5 &&
          current.measured
        ) {
          return current;
        }

        return next;
      });
    };

    measure();

    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(stage);
    window.addEventListener("resize", measure, { passive: true });

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [serviceCount, stageRef]);

  return metrics;
}

function ArrowUpRight() {
  return (
    <svg
      aria-hidden="true"
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      className="h-3.5 w-3.5 shrink-0"
    >
      <path
        d="M4 10L10 4M5 4H10V9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MaskedHeading({ heading }: { heading: string }) {
  const lines = useMemo(() => splitHeadingIntoTwoLines(heading), [heading]);

  return (
    <h2
      id="services-heading"
      aria-label={heading}
      className="pointer-events-none absolute left-1/2 top-[3.75rem] z-0 flex w-[min(65.875rem,calc(100%_-_2rem))] -translate-x-1/2 flex-col items-center text-center text-[clamp(3.5rem,10.4167vw,10rem)] font-semibold leading-[0.9] tracking-[-0.03125rem] text-white [font-feature-settings:'liga'_off,'clig'_off] sm:top-[4.75rem] lg:top-[clamp(7rem,18.85vh,12.72706rem)]"
    >
      {lines.map((line, lineIndex) => (
        <span
          key={`${line}-${lineIndex}`}
          aria-hidden="true"
          className="block h-[0.94em] w-full overflow-hidden"
        >
          <span className="block whitespace-nowrap leading-[0.9]">
            {line}
          </span>
        </span>
      ))}
    </h2>
  );
}

function ServiceCardContent({
  item,
  isInteractive,
  isPriority,
}: {
  item: OrderedService;
  isInteractive: boolean;
  isPriority: boolean;
}) {
  const { service, serviceNumber } = item;
  const media = serviceMedia(service);
  const number = String(serviceNumber).padStart(2, "0");
  const title = service.title?.trim() || `Service ${number}`;
  const description = service.shortDescription?.trim() || "";
  const slug = service.slug?.trim() || "";

  const actionClassName =
    "mt-7 inline-flex items-center justify-center gap-1 rounded-[0.25rem] bg-white px-4 py-3 text-[0.75rem] font-semibold leading-4 text-[#1A1A1A] transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-black";

  return (
    <div className="relative flex h-full w-full items-center gap-14 overflow-hidden rounded-[0.5rem] pb-8 pr-8 pt-8">
      <div className="relative z-10 flex min-w-0 flex-1 self-stretch flex-col items-start pl-14">
        <p className="text-[2.5rem] font-semibold leading-[3rem] tracking-[-0.03125rem] text-white">
          {number}
        </p>

        <div className="mt-6 flex max-w-[35rem] flex-col items-start">
          <h3 className="text-[2rem] font-semibold leading-[2.5rem] tracking-[-0.03125rem] text-white [font-feature-settings:'liga'_off,'clig'_off]">
            {title}
          </h3>

          {description ? (
            <p className="mt-5 max-w-[33rem] text-[0.875rem] font-normal leading-[1.25rem] text-white/90 [font-feature-settings:'liga'_off,'clig'_off]">
              {description}
            </p>
          ) : null}

          {slug ? (
            <Link
              href={`/services/${slug}`}
              tabIndex={isInteractive ? 0 : -1}
              aria-label={`Explore ${title}`}
              className={actionClassName}
            >
              Explore Capabilities
              <ArrowUpRight />
            </Link>
          ) : (
            <span aria-disabled="true" className={actionClassName}>
              Explore Capabilities
              <ArrowUpRight />
            </span>
          )}
        </div>
      </div>

      <div className="relative h-full w-[44%] shrink-0 overflow-hidden rounded-[0.25rem] bg-black/10">
        {media ? (
          <Image
            src={media.url}
            alt={media.alt || title}
            fill
            priority={isPriority}
            sizes="(max-width: 899px) 45vw, 34.5rem"
            className="object-cover"
          />
        ) : (
          <div
            aria-hidden="true"
            className="flex h-full w-full items-center justify-center bg-[linear-gradient(135deg,rgba(255,255,255,0.22),rgba(0,0,0,0.12))] text-[7rem] font-semibold leading-none text-white/65"
          >
            {number}
          </div>
        )}
      </div>
    </div>
  );
}

function ServiceStackCard({
  item,
  stackIndex,
  serviceCount,
  step,
  metrics,
  isInteractive,
  reduceMotion,
}: {
  item: OrderedService;
  stackIndex: number;
  serviceCount: number;
  step: MotionValue<number>;
  metrics: StageMetrics;
  isInteractive: boolean;
  reduceMotion: boolean;
}) {
  const background =
    SERVICE_COLOURS[(item.serviceNumber - 1) % SERVICE_COLOURS.length];
  const strongShadow = item.serviceNumber <= 2;

  const scaleX = useTransform(step, (value) => {
    const relativeDepth = stackIndex - value;

    return relativeDepth >= 0 ? widthRatioAtDepth(relativeDepth) : 1;
  });

  const scale = useTransform(step, (value) => {
    const exitProgress = easeInOutCubic(clamp(value - stackIndex));
    return 1 + exitProgress * 0.32;
  });

  const z = useTransform(step, (value) => {
    const exitProgress = easeInOutCubic(clamp(value - stackIndex));
    return exitProgress * 450;
  });

  const y = useTransform(step, (value) => {
    const relativeDepth = stackIndex - value;

    if (relativeDepth >= 0) {
      return -relativeDepth * metrics.stackStep;
    }

    const exitProgress = easeInOutCubic(clamp(-relativeDepth));
    return exitProgress * metrics.cardHeight * 0.88;
  });

  const rotateX = useTransform(step, (value) => {
    const exitProgress = easeInOutCubic(clamp(value - stackIndex));
    return exitProgress * -9;
  });

  const rotateZ = useTransform(step, (value) => {
    const exitProgress = easeInOutCubic(clamp(value - stackIndex));
    const direction = stackIndex % 2 === 0 ? -1 : 1;
    return exitProgress * direction * 1.35;
  });

  const opacity = useTransform(step, (value) => {
    const exitProgress = clamp(value - stackIndex);

    if (exitProgress <= 0.82) return 1;

    return mix(1, 0, (exitProgress - 0.82) / 0.18);
  });

  const staticScaleX = widthRatioAtDepth(stackIndex);
  const staticY = -stackIndex * metrics.stackStep;

  return (
    <motion.article
      aria-hidden={!isInteractive}
      className="absolute left-0 top-0 origin-center overflow-hidden rounded-[0.5rem] [backface-visibility:hidden] [transform-style:preserve-3d]"
      style={{
        width: metrics.cardWidth,
        height: metrics.cardHeight,
        zIndex: serviceCount - stackIndex,
        pointerEvents: isInteractive ? "auto" : "none",
        background,
        boxShadow: strongShadow
          ? "0 -16px 50px -4px rgba(0,0,0,0.16)"
          : "0 -12px 24px -4px rgba(0,0,0,0.05)",
        scaleX: reduceMotion ? staticScaleX : scaleX,
        scale: reduceMotion ? 1 : scale,
        z: reduceMotion ? 0 : z,
        y: reduceMotion ? staticY : y,
        rotateX: reduceMotion ? 0 : rotateX,
        rotateZ: reduceMotion ? 0 : rotateZ,
        opacity: reduceMotion ? 1 : opacity,
        transformOrigin: "50% 0%",
        willChange: reduceMotion ? undefined : "transform, opacity",
      }}
    >
      <ServiceCardContent
        item={item}
        isInteractive={isInteractive}
        isPriority={stackIndex === 0}
      />
    </motion.article>
  );
}

export function ServicesScrollGallery({
  eyebrow,
  heading,
  services,
  handoffScrollVh = DEFAULT_HANDOFF_SCROLL_VH,
}: ServicesScrollGalleryProps) {
  const scrollRootRef = useRef<HTMLDivElement>(null);
  const stickyStageRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion() ?? false;

  const orderedServices = useMemo<OrderedService[]>(() => {
    const numbered = services.slice(0, MAX_SERVICES).map((service, index) => ({
      service,
      serviceNumber: index + 1,
    }));

    // Service 08 starts at the front; service 01 starts at the back.
    return numbered.reverse();
  }, [services]);

  const serviceCount = orderedServices.length;
  const metrics = useStageMetrics(stickyStageRef, serviceCount);
  const [activeIndex, setActiveIndex] = useState(0);

  const cardScrollVh = serviceCount * CARD_SCROLL_VH;
  const totalScrollableVh = cardScrollVh + Math.max(0, handoffScrollVh);
  const cardPhaseEnd =
    totalScrollableVh > 0 ? cardScrollVh / totalScrollableVh : 1;

  const { scrollYProgress } = useScroll({
    target: scrollRootRef,
    offset: ["start start", "end end"],
  });

  const smoothedProgress = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 30,
    mass: 0.24,
    restDelta: 0.0005,
  });

  const sourceProgress = reduceMotion ? scrollYProgress : smoothedProgress;

  /**
   * Cards finish before the root ends. The remaining hand-off distance keeps
   * the heading pinned while the overlapping partner strip and next section
   * rise over it, matching the final part of the supplied scroll recording.
   */
  const step = useTransform(sourceProgress, (latest) => {
    if (cardPhaseEnd <= 0) return serviceCount;

    return clamp(latest / cardPhaseEnd) * serviceCount;
  });

  useMotionValueEvent(step, "change", (latest) => {
    if (reduceMotion) {
      setActiveIndex(0);
      return;
    }

    const nextIndex =
      latest >= serviceCount - 0.001
        ? -1
        : Math.min(
            serviceCount - 1,
            Math.max(0, Math.floor(latest + 0.025)),
          );

    setActiveIndex((current) => (current === nextIndex ? current : nextIndex));
  });

  if (serviceCount === 0) return null;

  const stackHeight =
    metrics.cardHeight + Math.max(0, serviceCount - 1) * metrics.stackStep;
  const frontCardTop = Math.max(0, serviceCount - 1) * metrics.stackStep;
  const scrollHeight = reduceMotion
    ? "100svh"
    : `${100 + totalScrollableVh}svh`;
  const resolvedHeading = heading?.trim() || DEFAULT_HEADING;

  return (
    <>
      <div
        ref={scrollRootRef}
        className="relative z-0 w-full bg-black"
        style={{ height: scrollHeight }}
      >
        <div
          ref={stickyStageRef}
          className="sticky top-0 h-[100svh] w-full overflow-hidden bg-black"
        >
          {eyebrow?.trim() ? (
            <p className="sr-only">{eyebrow.trim()}</p>
          ) : null}

          <MaskedHeading heading={resolvedHeading} />

          <div
            className="absolute left-1/2 z-10 transition-opacity duration-300"
            style={{
              top: metrics.top,
              width: metrics.cardWidth,
              height: stackHeight,
              opacity: metrics.measured ? 1 : 0,
              transform: `translateX(-50%) scale(${metrics.scale})`,
              transformOrigin: "50% 0%",
              perspective: "1200px",
            }}
          >
            <div
              className="absolute left-0"
              style={{
                top: frontCardTop,
                width: metrics.cardWidth,
                height: metrics.cardHeight,
                transformStyle: "preserve-3d",
              }}
            >
              {orderedServices.map((item, index) => (
                <ServiceStackCard
                  key={`${item.serviceNumber}-${item.service.slug || item.service.title || "service"}`}
                  item={item}
                  stackIndex={index}
                  serviceCount={serviceCount}
                  step={step}
                  metrics={metrics}
                  isInteractive={index === activeIndex}
                  reduceMotion={reduceMotion}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .services-partner-handoff {
          margin-top: calc(
            -1 * var(--services-partner-overlap, 92svh)
          );
        }

        @media (prefers-reduced-motion: reduce) {
          .services-partner-handoff {
            margin-top: 0 !important;
          }
        }
      `}</style>
    </>
  );
}
