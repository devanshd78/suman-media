"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

type Bubble = {
  id: string;
  name: string;
  size: string;
  mobileSize: string;
  left?: string;
  right?: string;
  bottom: string;
  rotation: string;
  delay: string;
  duration: string;
  mark: ReactNode;
};

type BubbleStyle = CSSProperties & {
  "--bubble-size": string;
  "--bubble-mobile-size": string;
  "--bubble-left"?: string;
  "--bubble-right"?: string;
  "--bubble-bottom": string;
  "--bubble-rotation": string;
  "--bubble-delay": string;
  "--bubble-duration": string;
};

function AwsMark() {
  return (
    <div className="flex w-[58%] flex-col items-center" aria-hidden="true">
      <span className="text-[clamp(2.4rem,5vw,5rem)] font-light leading-none tracking-[-0.08em] text-white">
        aws
      </span>
      <svg viewBox="0 0 190 45" className="mt-1 w-full" fill="none">
        <path
          d="M17 10C57 38 124 39 173 13"
          stroke="white"
          strokeWidth="8"
          strokeLinecap="round"
        />
        <path
          d="M150 9L176 10L166 34"
          stroke="white"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

function MaharashtraMark() {
  return (
    <div className="flex w-[68%] flex-col items-center text-center text-white" aria-hidden="true">
      <svg viewBox="0 0 96 96" className="mb-2 w-[46%]" fill="none">
        <circle cx="48" cy="48" r="42" stroke="white" strokeWidth="2" />
        <circle cx="48" cy="48" r="31" stroke="white" strokeWidth="1.5" />
        <path
          d="M48 20L53 35L69 35L56 44L61 59L48 50L35 59L40 44L27 35L43 35L48 20Z"
          stroke="white"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path d="M22 69C35 78 61 78 74 69" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
      <span className="text-[clamp(0.75rem,1.6vw,1.35rem)] font-semibold leading-[1.05]">
        Government of
        <br />
        Maharashtra
      </span>
    </div>
  );
}

function ZNewsMark() {
  return (
    <div className="flex items-end text-white" aria-hidden="true">
      <span className="text-[clamp(2rem,5vw,4.8rem)] font-light leading-none">Z</span>
      <span className="mb-[0.12em] text-[clamp(1rem,2.7vw,2.25rem)] font-light leading-none">NEWS</span>
    </div>
  );
}

function LaminarMark() {
  return (
    <span
      aria-hidden="true"
      className="text-[clamp(2rem,4.5vw,4.2rem)] font-bold leading-none tracking-[-0.065em] text-white"
    >
      laminar
    </span>
  );
}

function ReverieMark() {
  return (
    <span
      aria-hidden="true"
      className="block rotate-[42deg] text-[clamp(0.8rem,1.7vw,1.35rem)] font-semibold text-white"
    >
      reverie
    </span>
  );
}

function SupercellMark() {
  return (
    <span
      aria-hidden="true"
      className="text-center text-[clamp(0.75rem,1.55vw,1.3rem)] font-black uppercase leading-[0.72] tracking-[-0.04em] text-white"
    >
      SUP
      <br />
      ERC
      <br />
      ELL
    </span>
  );
}

function CannesMark() {
  return (
    <div className="flex w-[70%] rotate-[14deg] flex-col items-center text-white" aria-hidden="true">
      <svg viewBox="0 0 150 76" className="w-[72%]" fill="none">
        <ellipse cx="75" cy="38" rx="66" ry="30" stroke="white" strokeWidth="2" />
        <path d="M52 58C67 48 79 35 95 17" stroke="white" strokeWidth="2" strokeLinecap="round" />
        <path d="M61 51L49 44M69 45L56 36M78 38L65 29M86 31L75 22M66 47L79 50M75 40L89 43M84 33L98 35M92 26L105 28" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
      <span className="mt-1 text-[clamp(0.65rem,1.35vw,1.1rem)] font-medium tracking-[0.02em]">
        FESTIVAL DE CANNES
      </span>
    </div>
  );
}

/*
 * Desktop (>= 1024px) values are container query units (cqw) relative to the
 * stage, which is a size container. The reference design is an 83rem-wide
 * stage (section max-w 90rem minus lg:px-[3.5rem] per side), so
 * 1rem -> 100/83 = 1.2048cqw. mobileSize stays in rem for the <1024px
 * flex-wrap fallback.
 */
const bubbles: Bubble[] = [
  {
    id: "aws",
    name: "AWS",
    size: "30.12cqw",
    mobileSize: "10rem",
    left: "0.48cqw",
    bottom: "0.24cqw",
    rotation: "-2deg",
    delay: "0ms",
    duration: "1800ms",
    mark: <AwsMark />,
  },
  {
    id: "maharashtra",
    name: "Government of Maharashtra",
    size: "21.08cqw",
    mobileSize: "8.5rem",
    left: "21.93cqw",
    bottom: "17.35cqw",
    rotation: "-2deg",
    delay: "110ms",
    duration: "1880ms",
    mark: <MaharashtraMark />,
  },
  {
    id: "z-news-main",
    name: "Z News",
    size: "22.29cqw",
    mobileSize: "9rem",
    left: "29.88cqw",
    bottom: "-0.12cqw",
    rotation: "0deg",
    delay: "210ms",
    duration: "1940ms",
    mark: <ZNewsMark />,
  },
  {
    id: "laminar",
    name: "Laminar",
    size: "23.19cqw",
    mobileSize: "9.25rem",
    left: "47.35cqw",
    bottom: "7.77cqw",
    rotation: "0deg",
    delay: "320ms",
    duration: "2020ms",
    mark: <LaminarMark />,
  },
  {
    id: "reverie",
    name: "Reverie",
    size: "9.94cqw",
    mobileSize: "6rem",
    left: "48.67cqw",
    bottom: "0.12cqw",
    rotation: "-6deg",
    delay: "430ms",
    duration: "1660ms",
    mark: <ReverieMark />,
  },
  {
    id: "supercell",
    name: "Supercell",
    size: "9.94cqw",
    mobileSize: "6rem",
    left: "56.87cqw",
    bottom: "0.18cqw",
    rotation: "2deg",
    delay: "520ms",
    duration: "1700ms",
    mark: <SupercellMark />,
  },
  {
    id: "z-news-top",
    name: "Z News",
    size: "17.17cqw",
    mobileSize: "7.5rem",
    right: "0.54cqw",
    bottom: "17.77cqw",
    rotation: "12deg",
    delay: "620ms",
    duration: "1840ms",
    mark: <ZNewsMark />,
  },
  {
    id: "cannes",
    name: "Festival de Cannes",
    size: "21.99cqw",
    mobileSize: "8.75rem",
    right: "0cqw",
    bottom: "0cqw",
    rotation: "2deg",
    delay: "720ms",
    duration: "1980ms",
    mark: <CannesMark />,
  },
];

export function ClientsBubbles() {
  const stageRef = useRef<HTMLDivElement>(null);
  const [hasEntered, setHasEntered] = useState(false);

  useEffect(() => {
    const stage = stageRef.current;

    if (!stage) {
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // Intentional one-shot reveal on mount: reduced-motion users get the
      // settled composition immediately instead of the entrance animation.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setHasEntered(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setHasEntered(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.18,
        rootMargin: "0px 0px -8% 0px",
      },
    );

    observer.observe(stage);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={stageRef}
      role="list"
      aria-label="Suman Entertainment clients"
      className={`clients-stage relative w-full overflow-hidden ${hasEntered ? "clients-stage--active" : ""}`}
    >
      {bubbles.map((bubble) => {
        const style: BubbleStyle = {
          "--bubble-size": bubble.size,
          "--bubble-mobile-size": bubble.mobileSize,
          "--bubble-left": bubble.left,
          "--bubble-right": bubble.right,
          "--bubble-bottom": bubble.bottom,
          "--bubble-rotation": bubble.rotation,
          "--bubble-delay": bubble.delay,
          "--bubble-duration": bubble.duration,
        };

        return (
          <div
            key={bubble.id}
            role="listitem"
            aria-label={bubble.name}
            className="client-bubble flex items-center justify-center rounded-full bg-[#E2BB5F]"
            style={style}
          >
            {bubble.mark}
          </div>
        );
      })}

      <style>{`
        @media (min-width: 1024px) {
          .clients-stage {
            /*
             * The stage is the query container the bubbles' cqw values resolve
             * against. cqw cannot resolve against the element itself, so the
             * stage height (50.4375rem on the 83rem reference design ->
             * 60.77cqw) is expressed as the equivalent aspect ratio of its own
             * width.
             */
            container-type: inline-size;
            aspect-ratio: 100 / 60.77;
          }
        }

        .client-bubble {
          position: absolute;
          width: var(--bubble-size);
          height: var(--bubble-size);
          left: var(--bubble-left, auto);
          right: var(--bubble-right, auto);
          bottom: var(--bubble-bottom);
          opacity: 0;
          transform: translate3d(0, -77.11cqw, 0) rotate(calc(var(--bubble-rotation) - 34deg));
          transform-origin: 50% 50%;
          will-change: transform, opacity;
        }

        .clients-stage--active .client-bubble {
          animation: client-bubble-fall var(--bubble-duration) cubic-bezier(0.22, 0.72, 0.18, 1) var(--bubble-delay) both;
        }

        @keyframes client-bubble-fall {
          0% {
            opacity: 0;
            transform: translate3d(0, -77.11cqw, 0) rotate(calc(var(--bubble-rotation) - 34deg));
          }
          44% {
            opacity: 1;
          }
          58% {
            opacity: 1;
            transform: translate3d(0, 0, 0) rotate(var(--bubble-rotation));
          }
          68% {
            transform: translate3d(0, -2.85rem, 0) rotate(calc(var(--bubble-rotation) + 4deg));
          }
          76% {
            transform: translate3d(0, 0, 0) rotate(var(--bubble-rotation));
          }
          84% {
            transform: translate3d(0, -1.2rem, 0) rotate(calc(var(--bubble-rotation) - 1.5deg));
          }
          91% {
            transform: translate3d(0, 0, 0) rotate(var(--bubble-rotation));
          }
          96% {
            transform: translate3d(0, -0.35rem, 0) rotate(var(--bubble-rotation));
          }
          100% {
            opacity: 1;
            transform: translate3d(0, 0, 0) rotate(var(--bubble-rotation));
          }
        }

        @media (max-width: 1023px) {
          .clients-stage {
            height: auto;
            min-height: 38rem;
            display: flex;
            flex-wrap: wrap;
            align-content: flex-end;
            align-items: center;
            justify-content: center;
            gap: 0;
            overflow: hidden;
            padding-top: 7rem;
          }

          .client-bubble {
            position: relative;
            left: auto;
            right: auto;
            bottom: auto;
            width: var(--bubble-mobile-size);
            height: var(--bubble-mobile-size);
            margin: -0.35rem;
            flex: 0 0 auto;
            transform: translate3d(0, -46rem, 0) rotate(calc(var(--bubble-rotation) - 24deg));
          }

          @keyframes client-bubble-fall {
            0% {
              opacity: 0;
              transform: translate3d(0, -46rem, 0) rotate(calc(var(--bubble-rotation) - 24deg));
            }
            58% {
              opacity: 1;
              transform: translate3d(0, 0, 0) rotate(var(--bubble-rotation));
            }
            70% {
              transform: translate3d(0, -1.6rem, 0) rotate(calc(var(--bubble-rotation) + 3deg));
            }
            79% {
              transform: translate3d(0, 0, 0) rotate(var(--bubble-rotation));
            }
            88% {
              transform: translate3d(0, -0.7rem, 0) rotate(var(--bubble-rotation));
            }
            100% {
              opacity: 1;
              transform: translate3d(0, 0, 0) rotate(var(--bubble-rotation));
            }
          }
        }

        @media (max-width: 639px) {
          .clients-stage {
            min-height: 34rem;
            padding-top: 5rem;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .client-bubble,
          .clients-stage--active .client-bubble {
            animation: none;
            opacity: 1;
            transform: rotate(var(--bubble-rotation));
          }
        }
      `}</style>
    </div>
  );
}