"use client";

import Image from "next/image";
import Link from "next/link";
import * as Matter from "matter-js";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type DragEvent as ReactDragEvent,
  type MouseEvent as ReactMouseEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";

import type { CmsFeaturedCompany } from "@/types/cms";

const DESKTOP_MEDIA_QUERY = "(min-width: 1024px)";
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

const FIXED_TIME_STEP = 1000 / 60;
const MAX_FRAME_DELTA = 1000 / 20;
const SPAWN_INTERVAL_MS = 420;

const BUBBLE_CATEGORY = 0x0001;
const BOUNDARY_CATEGORY = 0x0002;

/*
 * Values measured against the supplied MML Ventures recording:
 * - circles are approximately 13.75vw on a 1920px desktop
 * - every circle enters through the upper-right area
 * - the next circle starts about every 0.42 seconds
 * - no top wall, so dragged/thrown circles can leave and fall back in
 * - a left shelf and a right diagonal ramp reproduce the resting layout
 */
const PHYSICS = {
  gravityScale: 0.0012,
  restitution: 0.76,
  friction: 0.018,
  frictionStatic: 0.22,
  frictionAir: 0.0055,
  density: 0.001,
  spawnXRatio: 0.84,
  shelfYRatio: 0.77,
  shelfWidthRatio: 0.63,
  rampStartXRatio: 0.69,
  rampStartYRatio: 1.05,
  rampEndXRatio: 1.02,
  rampEndYRatio: 0.47,
} as const;

const STATIC_LAYOUT = [
  { left: "8%", top: "49%", angle: -8 },
  { left: "22%", top: "19%", angle: 8 },
  { left: "37%", top: "50%", angle: -5 },
  { left: "52%", top: "19%", angle: 7 },
  { left: "67%", top: "51%", angle: -7 },
  { left: "82%", top: "21%", angle: 5 },
  { left: "89%", top: "55%", angle: -5 },
  { left: "2%", top: "73%", angle: 6 },
] as const;

const SPAWN_PRESETS = [
  // The first item travels furthest left, as in the supplied recording.
  { xVelocity: -4.6, yVelocity: 2.1, angle: -0.08, spin: 0.012 },
  { xVelocity: -1.25, yVelocity: 2.0, angle: 0.07, spin: -0.015 },
  { xVelocity: -1.05, yVelocity: 2.25, angle: -0.04, spin: 0.018 },
  { xVelocity: -3.15, yVelocity: 1.95, angle: 0.1, spin: -0.012 },
  { xVelocity: -0.8, yVelocity: 2.15, angle: -0.09, spin: 0.016 },
  { xVelocity: -2.1, yVelocity: 2.0, angle: 0.05, spin: -0.019 },
  { xVelocity: -3.7, yVelocity: 2.2, angle: -0.06, spin: 0.014 },
  { xVelocity: -1.4, yVelocity: 2.05, angle: 0.08, spin: -0.016 },
] as const;

function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(Math.max(value, minimum), maximum);
}

function companyHref(company: CmsFeaturedCompany) {
  if (company.hasDetailPage && company.slug) {
    return `/companies/${company.slug}`;
  }

  return company.websiteUrl || undefined;
}

function getDesktopBubbleSize(width: number, height: number) {
  const widthBasedSize = width * 0.1375;
  const shortStageCap = height * 0.48;

  return clamp(Math.min(widthBasedSize, shortStageCap), 148, 264);
}

function getStaticStyle(index: number): CSSProperties {
  const layout = STATIC_LAYOUT[index % STATIC_LAYOUT.length];

  return {
    left: layout.left,
    top: layout.top,
    width: "clamp(9.25rem, 13.75vw, 16.5rem)",
    height: "clamp(9.25rem, 13.75vw, 16.5rem)",
    transform: `translate3d(-50%, -50%, 0) rotate(${layout.angle}deg)`,
  };
}

function detachMatterMouse(mouse: Matter.Mouse) {
  const element = mouse.element;
  const source = mouse as Matter.Mouse & {
    mousemove: EventListener;
    mousedown: EventListener;
    mouseup: EventListener;
    mousewheel: EventListener;
  };

  element.removeEventListener("mousemove", source.mousemove);
  element.removeEventListener("mousedown", source.mousedown);
  element.removeEventListener("mouseup", source.mouseup);
  element.removeEventListener("wheel", source.mousewheel);
  element.removeEventListener("touchmove", source.mousemove);
  element.removeEventListener("touchstart", source.mousedown);
  element.removeEventListener("touchend", source.mouseup);

  Matter.Mouse.clearSourceEvents(mouse);
}

function MmlBoundaryGuides() {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full overflow-visible text-[#927116] opacity-[0.12]"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      <path
        d="M 0 77 H 60 C 62 77 63 79 63 82 V 100"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.22"
        vectorEffect="non-scaling-stroke"
      />
      <path
        d="M 69 105 L 102 47"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.22"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

export function ClientsBubbles({
  companies,
}: {
  companies: CmsFeaturedCompany[];
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const desktopStageRef = useRef<HTMLDivElement | null>(null);
  const desktopBubbleRefs = useRef<Array<HTMLDivElement | null>>([]);

  const pointerStartRef = useRef<{ x: number; y: number } | null>(null);
  const suppressClickRef = useRef(false);
  const suppressClickTimerRef = useRef<number | null>(null);

  const [hasEntered, setHasEntered] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  const visibleCompanies = useMemo(
    () => companies.filter((company) => Boolean(company.logoUrl)).slice(0, 8),
    [companies],
  );

  useEffect(() => {
    const desktopQuery = window.matchMedia(DESKTOP_MEDIA_QUERY);
    const reducedMotionQuery = window.matchMedia(REDUCED_MOTION_QUERY);

    const updateMediaState = () => {
      setIsDesktop(desktopQuery.matches);
      setReduceMotion(reducedMotionQuery.matches);
    };

    updateMediaState();

    desktopQuery.addEventListener("change", updateMediaState);
    reducedMotionQuery.addEventListener("change", updateMediaState);

    return () => {
      desktopQuery.removeEventListener("change", updateMediaState);
      reducedMotionQuery.removeEventListener("change", updateMediaState);
    };
  }, []);

  useEffect(() => {
    const element = containerRef.current;

    if (!element) return;

    if (reduceMotion) {
      setHasEntered(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        setHasEntered(true);
        observer.disconnect();
      },
      {
        threshold: 0.14,
        rootMargin: "0px 0px -6% 0px",
      },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [reduceMotion]);

  useEffect(() => {
    if (!hasEntered || !isDesktop || reduceMotion) return;

    const stage = desktopStageRef.current;
    const bubbleElements = desktopBubbleRefs.current.slice(
      0,
      visibleCompanies.length,
    );

    if (!stage || bubbleElements.some((element) => !element)) return;

    const elements = bubbleElements as HTMLDivElement[];
    const engine = Matter.Engine.create({ enableSleeping: true });

    engine.gravity.x = 0;
    engine.gravity.y = 1;
    engine.gravity.scale = PHYSICS.gravityScale;
    engine.positionIterations = 10;
    engine.velocityIterations = 8;
    engine.constraintIterations = 4;

    const mouse = Matter.Mouse.create(stage);
    Matter.Mouse.setScale(mouse, { x: 1, y: 1 });
    Matter.Mouse.setOffset(mouse, { x: 0, y: 0 });

    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse,
      collisionFilter: {
        category: BUBBLE_CATEGORY,
        mask: BUBBLE_CATEGORY,
      },
      constraint: {
        stiffness: 0.17,
        damping: 0.14,
        render: { visible: false },
      },
    });

    // Matter.js supports this runtime option, but @types/matter-js omits it.
    (mouseConstraint.constraint as Matter.Constraint & {
      angularStiffness: number;
    }).angularStiffness = 0;

    Matter.Composite.add(engine.world, mouseConstraint);

    const dynamicBodies: Array<Matter.Body | null> = new Array(
      visibleCompanies.length,
    ).fill(null);
    const bodyRadii = new Array<number>(visibleCompanies.length).fill(0);
    let boundaryBodies: Matter.Body[] = [];
    let spawnTimers: number[] = [];
    let resizeTimer: number | null = null;
    let frameRequest = 0;
    let lastFrameTime = performance.now();
    let accumulator = 0;
    let previousWidth = 0;
    let previousHeight = 0;
    let disposed = false;

    const resetElement = (element: HTMLDivElement, index: number) => {
      const fallback = getStaticStyle(index);

      element.dataset.spawned = "false";
      element.style.left = String(fallback.left);
      element.style.top = String(fallback.top);
      element.style.width = String(fallback.width);
      element.style.height = String(fallback.height);
      element.style.transform = String(fallback.transform);
    };

    const removeBody = (body: Matter.Body | null) => {
      if (!body) return;
      Matter.Composite.remove(engine.world, body, true);
    };

    const clearSimulationBodies = () => {
      spawnTimers.forEach((timer) => window.clearTimeout(timer));
      spawnTimers = [];

      dynamicBodies.forEach((body, index) => {
        removeBody(body);
        dynamicBodies[index] = null;
        bodyRadii[index] = 0;
        resetElement(elements[index], index);
      });

      boundaryBodies.forEach(removeBody);
      boundaryBodies = [];
    };

    const boundaryOptions: Matter.IChamferableBodyDefinition = {
      isStatic: true,
      restitution: PHYSICS.restitution,
      friction: 0.08,
      frictionStatic: 0.35,
      collisionFilter: {
        category: BOUNDARY_CATEGORY,
        mask: BUBBLE_CATEGORY,
      },
      render: { visible: false },
      label: "mml-boundary",
    };

    const createBoundaries = (width: number, height: number) => {
      const wallThickness = Math.max(80, width * 0.05);
      const surfaceThickness = Math.max(14, width * 0.009);

      const leftWall = Matter.Bodies.rectangle(
        -wallThickness / 2,
        height / 2,
        wallThickness,
        height * 3,
        boundaryOptions,
      );

      const rightWall = Matter.Bodies.rectangle(
        width + wallThickness / 2,
        height / 2,
        wallThickness,
        height * 3,
        boundaryOptions,
      );

      const bottomWall = Matter.Bodies.rectangle(
        width / 2,
        height + wallThickness / 2,
        width + wallThickness * 2,
        wallThickness,
        boundaryOptions,
      );

      const shelfY = height * PHYSICS.shelfYRatio;
      const shelfWidth = width * PHYSICS.shelfWidthRatio;
      const shelf = Matter.Bodies.rectangle(
        shelfWidth / 2,
        shelfY + surfaceThickness / 2,
        shelfWidth,
        surfaceThickness,
        boundaryOptions,
      );

      const shelfDropHeight = height - shelfY + wallThickness;
      const shelfDropWall = Matter.Bodies.rectangle(
        shelfWidth + surfaceThickness / 2,
        shelfY + shelfDropHeight / 2,
        surfaceThickness,
        shelfDropHeight,
        boundaryOptions,
      );

      const rampStart = {
        x: width * PHYSICS.rampStartXRatio,
        y: height * PHYSICS.rampStartYRatio,
      };
      const rampEnd = {
        x: width * PHYSICS.rampEndXRatio,
        y: height * PHYSICS.rampEndYRatio,
      };
      const rampDeltaX = rampEnd.x - rampStart.x;
      const rampDeltaY = rampEnd.y - rampStart.y;
      const rampLength = Math.hypot(rampDeltaX, rampDeltaY);
      const rampAngle = Math.atan2(rampDeltaY, rampDeltaX);

      const ramp = Matter.Bodies.rectangle(
        (rampStart.x + rampEnd.x) / 2,
        (rampStart.y + rampEnd.y) / 2,
        rampLength,
        surfaceThickness,
        {
          ...boundaryOptions,
          angle: rampAngle,
        },
      );

      return [
        leftWall,
        rightWall,
        bottomWall,
        shelf,
        shelfDropWall,
        ramp,
      ];
    };

    const buildSimulation = (width: number, height: number) => {
      if (disposed || width < 1 || height < 1) return;

      clearSimulationBodies();

      previousWidth = width;
      previousHeight = height;
      boundaryBodies = createBoundaries(width, height);
      Matter.Composite.add(engine.world, boundaryBodies);

      const diameter = getDesktopBubbleSize(width, height);
      const radius = diameter / 2;
      const spawnX = width * PHYSICS.spawnXRatio;
      const spawnY = -radius * 0.9;

      elements.forEach((element, index) => {
        element.style.left = "0px";
        element.style.top = "0px";
        element.style.width = `${diameter}px`;
        element.style.height = `${diameter}px`;
        element.dataset.spawned = "false";

        bodyRadii[index] = radius;

        const timer = window.setTimeout(() => {
          if (disposed) return;

          const preset = SPAWN_PRESETS[index % SPAWN_PRESETS.length];
          const body = Matter.Bodies.circle(
            spawnX + (index % 2 === 0 ? -radius * 0.035 : radius * 0.035),
            spawnY - index * 1.5,
            radius,
            {
              density: PHYSICS.density,
              restitution: PHYSICS.restitution,
              friction: PHYSICS.friction,
              frictionStatic: PHYSICS.frictionStatic,
              frictionAir: PHYSICS.frictionAir,
              sleepThreshold: 55,
              slop: 0.035,
              angle: preset.angle,
              collisionFilter: {
                category: BUBBLE_CATEGORY,
                mask: BUBBLE_CATEGORY | BOUNDARY_CATEGORY,
              },
              label: `client-bubble-${index}`,
              render: { visible: false },
            },
          );

          dynamicBodies[index] = body;
          Matter.Composite.add(engine.world, body);
          Matter.Body.setVelocity(body, {
            x: preset.xVelocity,
            y: preset.yVelocity,
          });
          Matter.Body.setAngularVelocity(body, preset.spin);

          element.dataset.spawned = "true";
        }, index * SPAWN_INTERVAL_MS);

        spawnTimers.push(timer);
      });
    };

    const renderBodies = () => {
      dynamicBodies.forEach((body, index) => {
        if (!body) return;

        const element = elements[index];
        const radius = bodyRadii[index];
        const x = body.position.x - radius;
        const y = body.position.y - radius;

        element.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(
          2,
        )}px, 0) rotate(${body.angle.toFixed(5)}rad)`;
      });
    };

    const tick = (time: number) => {
      if (disposed) return;

      const frameDelta = Math.max(
        0,
        Math.min(time - lastFrameTime, MAX_FRAME_DELTA),
      );
      lastFrameTime = time;
      accumulator += frameDelta;

      while (accumulator >= FIXED_TIME_STEP) {
        Matter.Engine.update(engine, FIXED_TIME_STEP);
        accumulator -= FIXED_TIME_STEP;
      }

      renderBodies();
      frameRequest = window.requestAnimationFrame(tick);
    };

    const rebuildFromStageSize = () => {
      const { width, height } = stage.getBoundingClientRect();

      if (
        Math.abs(width - previousWidth) < 1 &&
        Math.abs(height - previousHeight) < 1
      ) {
        return;
      }

      buildSimulation(width, height);
    };

    const resizeObserver = new ResizeObserver(() => {
      if (resizeTimer !== null) window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(rebuildFromStageSize, 120);
    });

    const handleVisibilityChange = () => {
      lastFrameTime = performance.now();
      accumulator = 0;
    };

    const handleStartDrag = () => {
      stage.dataset.dragging = "true";
    };

    const handleEndDrag = () => {
      stage.dataset.dragging = "false";
    };

    Matter.Events.on(mouseConstraint, "startdrag", handleStartDrag);
    Matter.Events.on(mouseConstraint, "enddrag", handleEndDrag);

    elements.forEach(resetElement);
    resizeObserver.observe(stage);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    const initialRect = stage.getBoundingClientRect();
    buildSimulation(initialRect.width, initialRect.height);
    frameRequest = window.requestAnimationFrame(tick);

    return () => {
      disposed = true;

      if (frameRequest) window.cancelAnimationFrame(frameRequest);
      if (resizeTimer !== null) window.clearTimeout(resizeTimer);

      resizeObserver.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);

      Matter.Events.off(mouseConstraint, "startdrag", handleStartDrag);
      Matter.Events.off(mouseConstraint, "enddrag", handleEndDrag);

      clearSimulationBodies();
      Matter.Composite.remove(engine.world, mouseConstraint, true);
      Matter.Engine.clear(engine);
      detachMatterMouse(mouse);

      stage.dataset.dragging = "false";
      elements.forEach(resetElement);
    };
  }, [hasEntered, isDesktop, reduceMotion, visibleCompanies]);

  useEffect(
    () => () => {
      if (suppressClickTimerRef.current !== null) {
        window.clearTimeout(suppressClickTimerRef.current);
      }
    },
    [],
  );

  const handlePointerDownCapture = (event: ReactPointerEvent<HTMLDivElement>) => {
    pointerStartRef.current = { x: event.clientX, y: event.clientY };
    suppressClickRef.current = false;

    if (suppressClickTimerRef.current !== null) {
      window.clearTimeout(suppressClickTimerRef.current);
      suppressClickTimerRef.current = null;
    }
  };

  const handlePointerMoveCapture = (event: ReactPointerEvent<HTMLDivElement>) => {
    const start = pointerStartRef.current;
    if (!start) return;

    const movedDistance = Math.hypot(
      event.clientX - start.x,
      event.clientY - start.y,
    );

    if (movedDistance > 7) suppressClickRef.current = true;
  };

  const finishPointerGesture = () => {
    pointerStartRef.current = null;

    if (suppressClickTimerRef.current !== null) {
      window.clearTimeout(suppressClickTimerRef.current);
    }

    suppressClickTimerRef.current = window.setTimeout(() => {
      suppressClickRef.current = false;
      suppressClickTimerRef.current = null;
    }, 0);
  };

  const preventClickAfterDrag = (event: ReactMouseEvent<HTMLElement>) => {
    if (!suppressClickRef.current) return;

    event.preventDefault();
    event.stopPropagation();
  };

  if (visibleCompanies.length === 0) return null;

  return (
    <div
      ref={containerRef}
      className="w-full"
      data-entered={hasEntered ? "true" : "false"}
    >
      {/* Mobile / tablet: lightweight staggered drop. */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:hidden">
        {visibleCompanies.map((company, index) => {
          const href = companyHref(company);

          const bubble = (
            <div
              className="client-mobile-bubble relative aspect-square overflow-hidden rounded-full bg-[#927116] shadow-[0_1rem_2.5rem_rgba(77,58,9,0.18)]"
              style={{ "--mobile-delay": `${index * 90}ms` } as CSSProperties}
            >
              <Image
                src={company.logoUrl!}
                alt={company.logoAlt?.trim() || company.name}
                fill
                draggable={false}
                sizes="(max-width: 640px) 45vw, 30vw"
                className="pointer-events-none select-none object-contain p-[22%]"
              />
            </div>
          );

          if (!href) return <div key={company._id}>{bubble}</div>;

          if (href.startsWith("http")) {
            return (
              <a
                key={company._id}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={company.name}
                className="block rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#927116]"
              >
                {bubble}
              </a>
            );
          }

          return (
            <Link
              key={company._id}
              href={href}
              aria-label={company.name}
              className="block rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#927116]"
            >
              {bubble}
            </Link>
          );
        })}
      </div>

      {/* Desktop: MML-style rigid-body circles. */}
      <div
        ref={desktopStageRef}
        className="client-physics-stage relative hidden h-[clamp(36rem,72vh,52rem)] w-full touch-none overflow-hidden lg:block"
        data-dragging="false"
        aria-label="Featured clients and partners"
        onPointerDownCapture={handlePointerDownCapture}
        onPointerMoveCapture={handlePointerMoveCapture}
        onPointerUpCapture={finishPointerGesture}
        onPointerCancelCapture={finishPointerGesture}
      >
        <MmlBoundaryGuides />

        {visibleCompanies.map((company, index) => {
          const href = companyHref(company);
          const initialStyle = getStaticStyle(index);

          const bubble = (
            <div className="client-logo-bubble group relative h-full w-full overflow-hidden rounded-full bg-[#927116] shadow-[0_1.5rem_4rem_rgba(77,58,9,0.18)]">
              <Image
                src={company.logoUrl!}
                alt={company.logoAlt?.trim() || company.name}
                fill
                draggable={false}
                sizes="(min-width: 1024px) 16.5rem, 0px"
                className="pointer-events-none select-none object-contain p-[22%] transition-transform duration-300 ease-out group-hover:scale-[1.025]"
              />
            </div>
          );

          const content = href ? (
            href.startsWith("http") ? (
              <a
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={company.name}
                draggable={false}
                onClick={preventClickAfterDrag}
                onDragStart={(event: ReactDragEvent<HTMLAnchorElement>) =>
                  event.preventDefault()
                }
                className="block h-full w-full rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#927116]"
              >
                {bubble}
              </a>
            ) : (
              <Link
                href={href}
                aria-label={company.name}
                draggable={false}
                onClick={preventClickAfterDrag}
                onDragStart={(event: ReactDragEvent<HTMLAnchorElement>) =>
                  event.preventDefault()
                }
                className="block h-full w-full rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#927116]"
              >
                {bubble}
              </Link>
            )
          ) : (
            bubble
          );

          return (
            <div
              key={company._id}
              ref={(element: HTMLDivElement | null) => {
                desktopBubbleRefs.current[index] = element;
              }}
              className="client-physics-position absolute select-none"
              data-spawned="false"
              style={initialStyle}
            >
              {content}
            </div>
          );
        })}
      </div>

      <style jsx global>{`
        .client-physics-stage {
          cursor: grab;
          contain: layout paint;
          isolation: isolate;
          user-select: none;
          -webkit-user-select: none;
        }

        .client-physics-stage[data-dragging="true"] {
          cursor: grabbing;
        }

        .client-physics-position {
          z-index: 2;
          opacity: 0;
          transform-origin: 50% 50%;
          will-change: transform;
        }

        .client-physics-position[data-spawned="true"] {
          opacity: 1;
        }

        @keyframes clientMobileDrop {
          0% {
            opacity: 0;
            transform: translate3d(0, -110px, 0) scale(0.9);
          }

          70% {
            opacity: 1;
            transform: translate3d(0, 10px, 0) scale(1.012);
          }

          85% {
            transform: translate3d(0, -5px, 0) scale(0.997);
          }

          100% {
            opacity: 1;
            transform: translate3d(0, 0, 0) scale(1);
          }
        }

        .client-mobile-bubble {
          opacity: 0;
          will-change: transform, opacity;
        }

        [data-entered="true"] .client-mobile-bubble {
          animation: clientMobileDrop 1s
            cubic-bezier(0.16, 0.8, 0.28, 1.05) var(--mobile-delay) both;
        }

        @media (prefers-reduced-motion: reduce) {
          .client-physics-stage {
            cursor: default;
          }

          .client-physics-position,
          .client-mobile-bubble {
            opacity: 1 !important;
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </div>
  );
}
