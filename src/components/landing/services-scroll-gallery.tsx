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
import { useRef, useState } from "react";

import type { CmsFeaturedService } from "@/types/cms";

const SCROLL_PER_CARD_VH = 42;
const FINAL_HOLD_VH = 12;

const SCROLL_SPRING = {
  stiffness: 240,
  damping: 38,
  mass: 0.65,
  restDelta: 0.0005,
  restSpeed: 0.0005,
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
  active?: boolean;
};

function ServiceCardContent({ service, index, active = false }: ServiceCardProps) {
  return (
    <div className="service-card-grid grid h-full w-full min-w-0 bg-[#101012] lg:grid-cols-[54%_46%]">
      <div className="service-card-copy relative flex h-full min-w-0 flex-col overflow-hidden bg-[linear-gradient(145deg,#181317_0%,#0d0c0e_100%)]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rotate-45 border border-[#B68A16]/12"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-6 top-6 h-8 w-8 rotate-45 border border-[#B68A16]/18"
        />

        <span className="service-card-number relative z-10 block font-semibold leading-none tracking-[-0.04em] text-[#E2BB5F]">
          {String(index + 1).padStart(2, "0")}
        </span>

        <div className="relative z-10 mt-auto flex min-w-0 flex-col gap-3 xl:gap-4">
          <h3 className="service-card-title max-w-[35rem] font-semibold leading-[1.08] tracking-[-0.035em] text-[#FFF8EC]">
            {service.title}
          </h3>
          <p className="service-card-description max-w-[36rem] leading-[1.55] text-white/60">
            {service.shortDescription}
          </p>
          <Link
            href={`/services/${service.slug}`}
            tabIndex={active ? undefined : -1}
            className="service-card-button kinetic-link group mt-1 inline-flex w-fit items-center gap-2 py-2 font-semibold text-[#E2BB5F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E2BB5F]"
          >
            <span>Explore Capabilities</span>
            <span className="transition-transform duration-300 group-hover:translate-x-1.5">
              <ArrowRightIcon />
            </span>
          </Link>
        </div>
      </div>

      <div className="service-card-image relative h-full min-w-0 overflow-hidden bg-[#171416]">
        {service.imageUrl ? (
          <Image
            src={service.imageUrl}
            alt={service.imageAlt?.trim() || service.title}
            fill
            sizes="(max-width: 1023px) 100vw, 42vw"
            className={`select-none object-cover transition-transform duration-[1200ms] ease-out ${active ? "scale-100" : "scale-[1.045]"}`}
          />
        ) : (
          <div className="absolute inset-0 bg-[linear-gradient(135deg,#3f252c,#8f6c1a)]" aria-hidden="true" />
        )}

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(226,187,95,0.11),transparent_42%,rgba(70,14,29,0.20))]"
        />
      </div>
    </div>
  );
}

type Service3DCardProps = ServiceCardProps & {
  progress: MotionValue<number>;
  isActive: boolean;
  activeIndex: number;
  totalCards: number;
  center: number;
  step: number;
};

function Service3DCard({
  service,
  index,
  progress,
  isActive,
  activeIndex,
  totalCards,
  center,
  step,
}: Service3DCardProps) {
  const direction = index % 2 === 0 ? -1 : 1;
  const isLast = index === totalCards - 1;
  const range = isLast
    ? [center - step * 0.95, center - step * 0.38, center, 1, 1.001]
    : [
        center - step * 0.95,
        center - step * 0.38,
        center,
        center + step * 0.38,
        center + step * 0.95,
      ];

  const opacity = useTransform(
    progress,
    range,
    isLast ? [0, 0.16, 1, 1, 1] : [0, 0.16, 1, 0.16, 0],
  );
  const x = useTransform(
    progress,
    range,
    isLast
      ? [direction * 130, direction * 46, 0, 0, 0]
      : [direction * 130, direction * 46, 0, direction * -46, direction * -130],
  );
  const y = useTransform(progress, range, isLast ? [86, 28, 0, 0, 0] : [86, 28, 0, -28, -86]);
  const z = useTransform(progress, range, isLast ? [-720, -260, 0, 0, 0] : [-720, -260, 0, 360, 820]);
  const rotateX = useTransform(progress, range, isLast ? [7, 3, 0, 0, 0] : [7, 3, 0, -5, -10]);
  const rotateY = useTransform(
    progress,
    range,
    isLast
      ? [direction * -15, direction * -6, 0, 0, 0]
      : [direction * -15, direction * -6, 0, direction * 7, direction * 14],
  );
  const rotateZ = useTransform(
    progress,
    range,
    isLast
      ? [direction * -1.4, direction * -0.5, 0, 0, 0]
      : [direction * -1.4, direction * -0.5, 0, direction * 0.5, direction * 1.2],
  );
  const scale = useTransform(progress, range, isLast ? [0.82, 0.92, 1, 1, 1] : [0.82, 0.92, 1, 0.92, 0.82]);

  const distanceFromActive = Math.abs(index - activeIndex);
  const zIndex = isActive ? totalCards + 20 : Math.max(1, totalCards - distanceFromActive);

  return (
    <div
      className="service-3d-card-shell absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      style={{ zIndex, pointerEvents: isActive ? "auto" : "none" }}
      inert={!isActive}
    >
      <motion.article
        style={{ x, y, z, rotateX, rotateY, rotateZ, scale, opacity }}
        className="service-3d-card h-full w-full overflow-hidden rounded-[1.35rem] border border-[#E2BB5F]/15 bg-[#101012] shadow-[0_2.5rem_8rem_rgba(0,0,0,0.48),0_0_0_1px_rgba(255,255,255,0.025)_inset]"
      >
        <ServiceCardContent service={service} index={index} active={isActive} />
      </motion.article>
    </div>
  );
}

function StaticServices({ services }: { services: CmsFeaturedService[] }) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="services-static-list flex w-full flex-col gap-5 lg:hidden">
      {services.map((service, index) => (
        <motion.article
          key={service._id}
          initial={reduceMotion ? false : { opacity: 0, y: 28, scale: 0.985 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.16 }}
          transition={{ duration: reduceMotion ? 0 : 0.72, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden rounded-[1.2rem] border border-[#E2BB5F]/12 bg-[#101012] shadow-[0_1rem_3rem_rgba(0,0,0,0.32)]"
        >
          <div className="grid grid-cols-1 md:grid-cols-[54%_46%]">
            <div className="relative flex min-h-[21rem] flex-col overflow-hidden bg-[linear-gradient(145deg,#181317_0%,#0d0c0e_100%)] p-6 sm:p-8 md:min-h-[28rem]">
              <span aria-hidden="true" className="absolute right-5 top-5 h-7 w-7 rotate-45 border border-[#B68A16]/18" />
              <span className="text-2xl font-semibold text-[#E2BB5F]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="mt-auto flex flex-col gap-3">
                <h3 className="text-2xl font-semibold leading-tight text-[#FFF8EC]">{service.title}</h3>
                <p className="text-sm leading-6 text-white/60">{service.shortDescription}</p>
                <Link
                  href={`/services/${service.slug}`}
                  className="kinetic-link group inline-flex w-fit items-center gap-2 py-2 text-sm font-semibold text-[#E2BB5F]"
                >
                  <span>Explore Capabilities</span>
                  <span className="transition-transform duration-300 group-hover:translate-x-1.5">
                    <ArrowRightIcon />
                  </span>
                </Link>
              </div>
            </div>

            <div className="relative min-h-[20rem] overflow-hidden bg-[#171416] md:min-h-[28rem]">
              {service.imageUrl ? (
                <Image
                  src={service.imageUrl}
                  alt={service.imageAlt?.trim() || service.title}
                  fill
                  sizes="100vw"
                  className="object-cover transition-transform duration-700 hover:scale-[1.025]"
                />
              ) : null}
            </div>
          </div>
        </motion.article>
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
        <div className="services-3d-sticky sticky top-0 h-[100svh] w-full overflow-hidden bg-[#09090a]">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-55 [background-image:linear-gradient(rgba(226,187,95,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(226,187,95,0.035)_1px,transparent_1px)] [background-size:56px_56px]"
          />

          <div className="services-3d-stage relative h-full w-full">
            {services.map((service, index) => (
              <Service3DCard
                key={service._id}
                service={service}
                index={index}
                progress={smoothProgress}
                isActive={activeIndex === index}
                activeIndex={activeIndex}
                totalCards={totalCards}
                center={index * step}
                step={step}
              />
            ))}
          </div>

          <div className="pointer-events-none absolute bottom-8 left-[3.5rem] z-[80] flex items-center gap-4 text-white/45">
            <span className="text-[0.62rem] font-semibold tracking-[0.18em]">
              {String(activeIndex + 1).padStart(2, "0")}
            </span>
            <span className="h-px w-20 bg-[#E2BB5F]/30" />
            <span className="text-[0.62rem] font-semibold tracking-[0.18em]">
              {String(totalCards).padStart(2, "0")}
            </span>
          </div>

          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-8 right-[3.5rem] z-[80] text-[0.58rem] font-semibold uppercase tracking-[0.22em] text-[#E2BB5F]/52"
          >
            कथा · ध्वनी · अनुभव · तंत्रज्ञान
          </div>
        </div>
      </div>

      <style>{`
        .services-3d-sticky {
          perspective: 2100px;
          perspective-origin: 50% 48%;
          isolation: isolate;
        }

        .services-3d-stage,
        .service-3d-card-shell,
        .service-3d-card {
          transform-style: preserve-3d;
        }

        .service-3d-card-shell {
          width: min(82vw, 74rem);
          height: clamp(27rem, 58svh, 38rem);
        }

        .service-3d-card {
          transform-origin: 50% 50%;
          will-change: transform, opacity;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }

        .service-card-copy { padding: clamp(2rem, 3vw, 3.5rem); }
        .service-card-number { font-size: clamp(1.5rem, 2vw, 2.35rem); }
        .service-card-title { font-size: clamp(1.6rem, 2.25vw, 2.55rem); }
        .service-card-description { font-size: clamp(0.8rem, 0.9vw, 0.95rem); }
        .service-card-button { font-size: clamp(0.78rem, 0.85vw, 0.875rem); }

        @media (min-width: 1024px) and (max-width: 1500px) {
          .service-3d-card-shell {
            width: min(84vw, 68rem);
            height: clamp(25rem, 56svh, 33rem);
          }
        }

        @media (min-width: 1024px) and (max-height: 760px) {
          .service-3d-card-shell {
            width: min(80vw, 62rem);
            height: clamp(22rem, 52svh, 29rem);
          }
          .service-card-copy { padding: 1.65rem; }
          .service-card-title { font-size: clamp(1.35rem, 2vw, 1.95rem); }
          .service-card-description { font-size: 0.78rem; }
        }

        @media (min-width: 1800px) {
          .service-3d-card-shell {
            width: min(76vw, 78rem);
            height: min(60svh, 40rem);
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
