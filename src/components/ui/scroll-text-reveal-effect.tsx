"use client";

import { Children, cloneElement, isValidElement, useRef, type CSSProperties, type ReactNode } from "react";
import { motion, useScroll, type MotionStyle } from "framer-motion";
import styles from "./scroll-text-reveal.module.css";

const CHARACTER_DURATION = 0.22;
const segmenter = typeof Intl.Segmenter === "function"
  ? new Intl.Segmenter(undefined, { granularity: "grapheme" })
  : null;

function characters(word: string): string[] {
  // Keep Marathi combining marks and emoji together; old browsers reveal whole words.
  return segmenter ? Array.from(segmenter.segment(word), ({ segment }) => segment) : [word];
}

function countCharacters(children: ReactNode): number {
  return Children.toArray(children).reduce<number>((total, child) => {
    if (typeof child === "string" || typeof child === "number") {
      return total + (String(child).match(/\S+/g) ?? [])
        .reduce((count, word) => count + characters(word).length, 0);
    }
    if (isValidElement<{ children?: ReactNode }>(child)) {
      return total + countCharacters(child.props.children);
    }
    return total;
  }, 0);
}

export default function ScrollReveal({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLSpanElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.95", "start 0.5"],
    trackContentSize: true,
  });
  const total = countCharacters(children);
  let characterIndex = 0;

  function splitCharacters(nodes: ReactNode): ReactNode {
    return Children.map(nodes, (child) => {
      if (typeof child === "string" || typeof child === "number") {
        return String(child).split(/(\s+)/).map((part, index) => {
          if (!part.trim()) return part;
          return (
            <span key={index} className={styles.word}>
              {characters(part).map((character, index) => {
                const start = characterIndex++ / Math.max(total - 1, 1) * (1 - CHARACTER_DURATION);
                return (
                  <span
                    key={index}
                    data-reveal-character=""
                    className={styles.character}
                    style={{ "--character-start": start } as CSSProperties}
                  >
                    {character}
                  </span>
                );
              })}
            </span>
          );
        });
      }
      if (isValidElement<{ children?: ReactNode }>(child) && child.props.children != null) {
        return cloneElement(child, { children: splitCharacters(child.props.children) });
      }
      return child;
    });
  }

  // One Motion value per text block drives all characters without per-letter hooks.
  return (
    <motion.span
      ref={ref}
      data-text-reveal="blur"
      className={styles.reveal}
      style={{
        "--reveal-progress": scrollYProgress,
        "--character-duration": CHARACTER_DURATION,
      } as MotionStyle}
    >
      {splitCharacters(children)}
    </motion.span>
  );
}

