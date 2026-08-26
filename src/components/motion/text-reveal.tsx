"use client";

import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";

type TextRevealProps = {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  amount?: number;
  once?: boolean;
};

export function TextReveal({
  text,
  className,
  delay = 0,
  stagger = 0.035,
  amount = 0.45,
  once = true,
}: TextRevealProps) {
  const reduceMotion = useReducedMotion();
  const words = text.trim().split(/\s+/);

  if (reduceMotion) {
    return <span className={className}>{text}</span>;
  }

  const container: Variants = {
    hidden: {},
    visible: {
      transition: {
        delayChildren: delay,
        staggerChildren: stagger,
      },
    },
  };

  const word: Variants = {
    hidden: {
      y: "115%",
      opacity: 0,
      filter: "blur(7px)",
    },
    visible: {
      y: "0%",
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.68,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.span
      className={className}
      aria-label={text}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={container}
    >
      <span aria-hidden="true">
        {words.map((part, index) => (
          <span
            key={`${part}-${index}`}
            className="inline-block overflow-hidden align-bottom"
          >
            <motion.span className="inline-block" variants={word}>
              {part}
              {index < words.length - 1 ? "\u00A0" : ""}
            </motion.span>
          </span>
        ))}
      </span>
    </motion.span>
  );
}
