"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  type CSSProperties,
  type PointerEvent,
  type ReactNode,
} from "react";

type Premium3DSurfaceProps = {
  children: ReactNode;
  className?: string;
  surfaceClassName?: string;
  intensity?: number;
  lift?: number;
  perspective?: number;
  glare?: boolean;
  style?: CSSProperties;
};

const SPRING = {
  stiffness: 170,
  damping: 24,
  mass: 0.72,
} as const;

/**
 * Lightweight pointer-driven 3D tilt used across the landing experience.
 * It relies only on GPU-friendly transforms and automatically becomes static
 * for reduced-motion users and touch pointers.
 */
export function Premium3DSurface({
  children,
  className = "",
  surfaceClassName = "",
  intensity = 6,
  lift = 10,
  perspective = 1200,
  glare = true,
  style,
}: Premium3DSurfaceProps) {
  const reduceMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const hover = useMotionValue(0);

  const springX = useSpring(pointerX, SPRING);
  const springY = useSpring(pointerY, SPRING);
  const springHover = useSpring(hover, SPRING);

  const rotateY = useTransform(
    springX,
    [-0.5, 0.5],
    [-intensity, intensity],
  );
  const rotateX = useTransform(
    springY,
    [-0.5, 0.5],
    [intensity, -intensity],
  );
  const y = useTransform(springHover, [0, 1], [0, -lift]);
  const scale = useTransform(springHover, [0, 1], [1, 1.012]);
  const glareX = useTransform(springX, [-0.5, 0.5], [22, 78]);
  const glareY = useTransform(springY, [-0.5, 0.5], [18, 82]);
  const glareOpacity = useTransform(springHover, [0, 1], [0, 0.5]);
  const glareBackground = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.38) 0%, rgba(226,187,95,0.12) 18%, rgba(255,255,255,0) 52%)`;

  const reset = () => {
    pointerX.set(0);
    pointerY.set(0);
    hover.set(0);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (reduceMotion || event.pointerType === "touch") return;

    const rect = event.currentTarget.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) return;

    pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
    hover.set(1);
  };

  return (
    <div
      className={`premium-3d-stage ${className}`}
      style={{ perspective: `${perspective}px`, ...style }}
      onPointerMove={handlePointerMove}
      onPointerEnter={(event) => {
        if (reduceMotion || event.pointerType === "touch") return;
        hover.set(1);
      }}
      onPointerLeave={reset}
      onPointerCancel={reset}
    >
      <motion.div
        className={`premium-3d-surface relative h-full w-full ${surfaceClassName}`}
        style={{
          rotateX: reduceMotion ? 0 : rotateX,
          rotateY: reduceMotion ? 0 : rotateY,
          y: reduceMotion ? 0 : y,
          scale: reduceMotion ? 1 : scale,
          transformStyle: "preserve-3d",
        }}
      >
        {children}

        {glare ? (
          <motion.span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-[90] rounded-[inherit]"
            style={{
              background: glareBackground,
              opacity: reduceMotion ? 0 : glareOpacity,
              mixBlendMode: "screen",
            }}
          />
        ) : null}
      </motion.div>
    </div>
  );
}

type HeritageDepthFieldProps = {
  className?: string;
  tone?: "dark" | "light";
};

/**
 * Abstract 3D cultural geometry: Paithani-like diamonds + hill-fort steps.
 * Decorative only, with no literal heritage illustration.
 */
export function HeritageDepthField({
  className = "",
  tone = "dark",
}: HeritageDepthFieldProps) {
  const reduceMotion = useReducedMotion();
  const border = tone === "dark" ? "rgba(226,187,95,0.34)" : "rgba(143,108,26,0.26)";
  const softBorder = tone === "dark" ? "rgba(255,255,255,0.10)" : "rgba(100,31,46,0.11)";

  const shapes = [
    {
      className: "left-[7%] top-[17%] h-24 w-24 sm:h-32 sm:w-32",
      rotateX: 64,
      rotateY: -20,
      rotateZ: 45,
      duration: 16,
      delay: -3,
    },
    {
      className: "right-[10%] top-[22%] h-32 w-32 sm:h-44 sm:w-44 lg:h-56 lg:w-56",
      rotateX: 68,
      rotateY: 18,
      rotateZ: 45,
      duration: 21,
      delay: -8,
    },
    {
      className: "bottom-[11%] left-[46%] h-16 w-16 sm:h-24 sm:w-24",
      rotateX: 72,
      rotateY: -12,
      rotateZ: 45,
      duration: 18,
      delay: -5,
    },
  ] as const;

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden [perspective:1200px] ${className}`}
    >
      {shapes.map((shape, index) => (
        <motion.span
          key={index}
          className={`absolute [transform-style:preserve-3d] ${shape.className}`}
          style={{
            border: `1px solid ${index === 1 ? border : softBorder}`,
            boxShadow:
              tone === "dark"
                ? "0 2rem 5rem rgba(0,0,0,0.12), inset 0 0 2rem rgba(226,187,95,0.03)"
                : "0 2rem 4rem rgba(69,45,15,0.05), inset 0 0 2rem rgba(143,108,26,0.025)",
          }}
          initial={{
            rotateX: shape.rotateX,
            rotateY: shape.rotateY,
            rotateZ: shape.rotateZ,
          }}
          animate={
            reduceMotion
              ? undefined
              : {
                  rotateX: [shape.rotateX - 4, shape.rotateX + 5, shape.rotateX - 4],
                  rotateY: [shape.rotateY - 6, shape.rotateY + 7, shape.rotateY - 6],
                  rotateZ: [shape.rotateZ, shape.rotateZ + 360],
                  y: [0, -12 - index * 3, 0],
                }
          }
          transition={{
            rotateZ: {
              duration: shape.duration * 2.4,
              ease: "linear",
              repeat: Infinity,
              delay: shape.delay,
            },
            rotateX: {
              duration: shape.duration,
              ease: "easeInOut",
              repeat: Infinity,
              delay: shape.delay,
            },
            rotateY: {
              duration: shape.duration * 0.92,
              ease: "easeInOut",
              repeat: Infinity,
              delay: shape.delay,
            },
            y: {
              duration: shape.duration * 0.62,
              ease: "easeInOut",
              repeat: Infinity,
              delay: shape.delay,
            },
          }}
        >
          <span
            className="absolute inset-[17%] border"
            style={{
              borderColor: border,
              transform: "translateZ(34px)",
            }}
          />
          <span
            className="absolute inset-[36%] rotate-45"
            style={{
              background: border,
              boxShadow: `0 0 2rem ${border}`,
              transform: "translateZ(66px) rotate(45deg)",
            }}
          />
        </motion.span>
      ))}

      <div className="absolute bottom-[15%] right-[4%] hidden h-28 w-[17rem] lg:block [transform:rotateX(64deg)_rotateZ(-7deg)] [transform-style:preserve-3d]">
        <span
          className="absolute bottom-0 left-0 h-px w-[18%]"
          style={{ background: border }}
        />
        <span
          className="absolute bottom-[18%] left-[18%] h-px w-[16%]"
          style={{ background: border }}
        />
        <span
          className="absolute bottom-[36%] left-[34%] h-px w-[16%]"
          style={{ background: border }}
        />
        <span
          className="absolute bottom-[18%] left-[50%] h-px w-[16%]"
          style={{ background: border }}
        />
        <span
          className="absolute bottom-0 left-[66%] h-px w-[34%]"
          style={{ background: border }}
        />
      </div>
    </div>
  );
}
