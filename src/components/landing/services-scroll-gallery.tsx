"use client";

import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useRef, useState } from "react";
import type { CmsFeaturedService } from "@/types/cms";

const PERSPECTIVE_PX = 2000;
const CARD_SPACING_PX = 470;
const CASCADE_SLOPE = 0.34;
const FLY_PAST_Z_PX = Math.round(PERSPECTIVE_PX * 1.05);
const SWING_DEG = 70;
const FADE_IN_START_STEPS = 3.8;
const FADE_IN_END_STEPS = 2.2;
const SCROLL_PER_CARD_VH = 60;
const FINAL_HOLD_VH = 18;

const SCROLL_SPRING = {
  stiffness: 500,
  damping: 60,
  mass: 1,
  restDelta: 0.0001,
  restSpeed: 0.0001,
} as const;

function ArrowRightIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4" fill="none">
      <path d="M4 10h11M11 6l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

type ServiceCardProps = {
  service: CmsFeaturedService;
  index: number;
};

function ServiceCardContent({ service, index }: ServiceCardProps) {
  return (
    <div className="service-card-grid grid h-full w-full min-w-0 bg-white lg:grid-cols-[54%_46%]">
      <div className="service-card-copy flex h-full min-w-0 flex-col bg-white">
        <span className="service-card-number block font-semibold leading-none tracking-[-0.04em] text-black">
          {String(index + 1).padStart(2, "0")}
        </span>

        <div className="mt-auto flex min-w-0 flex-col gap-3 xl:gap-4">
          <h3 className="service-card-title max-w-[35rem] font-semibold leading-[1.12] tracking-[-0.03em] text-black">
            {service.title}
          </h3>
          <p className="service-card-description max-w-[36rem] leading-[1.55] text-[rgba(0,9,51,0.65)]">
            {service.shortDescription}
          </p>
          <Link
            href={`/services/${service.slug}`}
            className="service-card-button mt-1 inline-flex w-fit items-center gap-2 py-2 font-semibold text-[#8F6C1A] transition-opacity hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8F6C1A]"
          >
            <span>Explore Capabilities</span>
            <ArrowRightIcon />
          </Link>
        </div>
      </div>

      <div className="service-card-image relative h-full min-w-0 overflow-hidden bg-[#f2eee4]">
        {service.imageUrl ? (
          <Image
            src={service.imageUrl}
            alt={service.imageAlt?.trim() || service.title}
            fill
            sizes="(max-width: 1023px) 100vw, 42vw"
            className="select-none object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-[linear-gradient(135deg,#e8dfc8,#b69945)]" aria-hidden="true" />
        )}
      </div>
    </div>
  );
}

type Service3DCardProps = ServiceCardProps & {
  progress: MotionValue<number>;
  isActive: boolean;
  totalCards: number;
  lastIndex: number;
  step: number;
};

function Service3DCard({
  service,
  index,
  progress,
  isActive,
  totalCards,
  lastIndex,
  step,
}: Service3DCardProps) {
  const isFirst = index === 0;
  const isLast = index === lastIndex;
  const sliceStart = index * step;
  const sliceEnd = (index + 1) * step;
  const restZ = -index * CARD_SPACING_PX;

  const z = useTransform(
    progress,
    isFirst ? [0, sliceEnd] : isLast ? [0, sliceStart] : [0, sliceStart, sliceEnd],
    isFirst
      ? [0, FLY_PAST_Z_PX]
      : isLast
        ? [restZ, 0]
        : [restZ, 0, FLY_PAST_Z_PX],
  );

  const rotateX = useTransform(
    progress,
    [sliceStart, sliceEnd],
    isLast ? [0, 0] : [0, SWING_DEG],
  );
  const y = useTransform(z, (value) => value * CASCADE_SLOPE);
  const opacity = useTransform(
    progress,
    [(index - FADE_IN_START_STEPS) * step, (index - FADE_IN_END_STEPS) * step],
    [0, 1],
  );

  return (
    <div
      className="service-3d-card-shell absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      style={{ zIndex: totalCards - index, pointerEvents: isActive ? "auto" : "none" }}
      inert={!isActive}
    >
      <motion.article
        style={{ y, z, rotateX, opacity }}
        className="service-3d-card h-full w-full overflow-hidden border border-black/[0.04] bg-white shadow-[0_1.5rem_5rem_rgba(0,0,0,0.14)]"
      >
        <ServiceCardContent service={service} index={index} />
      </motion.article>
    </div>
  );
}

function StaticServices({ services }: { services: CmsFeaturedService[] }) {
  return (
    <div className="services-static-list flex w-full flex-col gap-5 lg:hidden">
      {services.map((service, index) => (
        <article
          key={service._id}
          className="overflow-hidden border border-black/[0.04] bg-white shadow-[0_0.75rem_2rem_rgba(0,0,0,0.07)]"
        >
          <div className="grid grid-cols-1 md:grid-cols-[54%_46%]">
            <div className="flex min-h-[21rem] flex-col p-6 sm:p-8 md:min-h-[28rem]">
              <span className="text-2xl font-semibold text-black">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="mt-auto flex flex-col gap-3">
                <h3 className="text-2xl font-semibold leading-tight text-black">{service.title}</h3>
                <p className="text-sm leading-6 text-[rgba(0,9,51,0.65)]">{service.shortDescription}</p>
                <Link
                  href={`/services/${service.slug}`}
                  className="inline-flex w-fit items-center gap-2 py-2 text-sm font-semibold text-[#8F6C1A]"
                >
                  <span>Explore Capabilities</span>
                  <ArrowRightIcon />
                </Link>
              </div>
            </div>

            <div className="relative min-h-[20rem] bg-[#f2eee4] md:min-h-[28rem]">
              {service.imageUrl ? (
                <Image
                  src={service.imageUrl}
                  alt={service.imageAlt?.trim() || service.title}
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
              ) : null}
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

export function ServicesScrollGallery({ services }: { services: CmsFeaturedService[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const totalCards = services.length;
  const lastIndex = Math.max(0, totalCards - 1);
  const trackHeightVh = 100 + lastIndex * SCROLL_PER_CARD_VH + FINAL_HOLD_VH;
  const travelEnd =
    lastIndex > 0
      ? (lastIndex * SCROLL_PER_CARD_VH) /
        (lastIndex * SCROLL_PER_CARD_VH + FINAL_HOLD_VH)
      : 1;
  const step = lastIndex > 0 ? travelEnd / lastIndex : 1;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const smoothProgress = useSpring(scrollYProgress, SCROLL_SPRING);

  useMotionValueEvent(smoothProgress, "change", (latest) => {
    if (!Number.isFinite(latest) || lastIndex === 0) return;
    const next = Math.min(lastIndex, Math.max(0, Math.round(latest / step)));
    setActiveIndex((current) => (current === next ? current : next));
  });

  if (services.length === 0) return null;

  return (
    <>
      <StaticServices services={services} />

      <div
        ref={containerRef}
        className="services-3d-scroll relative hidden w-full lg:block"
        style={{ height: `${trackHeightVh}svh` }}
      >
        <div className="services-3d-sticky sticky top-0 h-[100svh] w-full overflow-hidden">
          <div className="services-3d-stage relative h-full w-full">
            {services.map((service, index) => (
              <Service3DCard
                key={service._id}
                service={service}
                index={index}
                progress={smoothProgress}
                isActive={activeIndex === index}
                totalCards={totalCards}
                lastIndex={lastIndex}
                step={step}
              />
            ))}
          </div>

        </div>
      </div>

      <style>{`
        .services-3d-sticky {
          perspective: ${PERSPECTIVE_PX}px;
          perspective-origin: 50% 50%;
          background: white;
          isolation: isolate;
        }

        .services-3d-stage,
        .service-3d-card-shell,
        .service-3d-card {
          transform-style: preserve-3d;
        }

        .service-3d-card-shell {
          width: min(84vw, 76rem);
          height: clamp(28rem, 58svh, 38rem);
        }

        .service-3d-card {
          transform-origin: 50% 0%;
          will-change: transform, opacity;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }

        .service-card-copy { padding: clamp(2rem, 3vw, 3.5rem); }
        .service-card-number { font-size: clamp(1.5rem, 2vw, 2.35rem); }
        .service-card-title { font-size: clamp(1.5rem, 2.15vw, 2.4rem); }
        .service-card-description { font-size: clamp(0.8rem, 0.9vw, 0.95rem); }
        .service-card-button { font-size: clamp(0.78rem, 0.85vw, 0.875rem); }

        @media (min-width: 1024px) and (max-width: 1500px) {
          .service-3d-card-shell {
            width: min(84vw, 72rem);
            height: clamp(26rem, 57svh, 35rem);
          }
        }

        @media (min-width: 1024px) and (max-height: 760px) {
          .service-3d-card-shell {
            width: min(82vw, 66rem);
            height: clamp(23rem, 53svh, 30rem);
          }
          .service-card-copy { padding: 1.75rem; }
          .service-card-title { font-size: clamp(1.35rem, 2vw, 2rem); }
          .service-card-description { font-size: 0.78rem; }
        }

        @media (min-width: 1800px) {
          .service-3d-card-shell {
            width: min(78vw, 78rem);
            height: min(58svh, 39rem);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .services-3d-scroll { display: none !important; }
          .services-static-list { display: flex !important; }
        }
      `}</style>
    </>
  );
}
