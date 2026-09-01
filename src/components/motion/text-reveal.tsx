"use client";

import {
  Fragment,
  createElement,
  useMemo,
  useRef,
  type CSSProperties,
} from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

type TextRevealTag =
  | "div"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "li"
  | "p"
  | "span";

type TextRevealEffect = "blur" | "fade" | "mask" | "rise";
type TextRevealSplit = "characters" | "words";

type TextPiece = {
  index: number;
  text: string;
};

type TextRevealProps = {
  amount?: number;
  as?: TextRevealTag;
  className?: string;
  delay?: number;
  distance?: number;
  duration?: number;
  effect?: TextRevealEffect;
  id?: string;
  once?: boolean;
  split?: TextRevealSplit;
  stagger?: number;
  style?: CSSProperties;
  text: string;
};

const REVEAL_EASE = [0.22, 1, 0.36, 1] as const;

function buildTextLines(text: string, split: TextRevealSplit) {
  let pieceIndex = 0;

  return text.split("\n").map((line) =>
    line
      .split(" ")
      .filter(Boolean)
      .map((word) => {
        if (split === "characters") {
          return Array.from(word).map((character) => ({
            index: pieceIndex++,
            text: character,
          }));
        }

        return [
          {
            index: pieceIndex++,
            text: word,
          },
        ];
      }),
  );
}

function hiddenState(effect: TextRevealEffect, distance: number) {
  if (effect === "fade") {
    return { opacity: 0 };
  }

  if (effect === "blur") {
    return {
      filter: `blur(${Math.max(distance / 2, 4)}px)`,
      opacity: 0,
    };
  }

  if (effect === "mask") {
    return { opacity: 1, y: "110%" };
  }

  return { opacity: 0, y: distance };
}

function shownState(effect: TextRevealEffect) {
  if (effect === "blur") {
    return { filter: "blur(0px)", opacity: 1 };
  }

  if (effect === "fade") {
    return { opacity: 1 };
  }

  return { opacity: 1, y: 0 };
}

export function TextReveal({
  amount = 0.35,
  as = "p",
  className,
  delay = 0,
  distance = 24,
  duration = 0.7,
  effect = "mask",
  id,
  once = true,
  split = "words",
  stagger = 0.024,
  style,
  text,
}: TextRevealProps) {
  const textRef = useRef<HTMLSpanElement | null>(null);
  const isInView = useInView(textRef, { amount, once });
  const reduceMotion = useReducedMotion() ?? false;
  const lines = useMemo(
    () => buildTextLines(text, split),
    [split, text],
  );
  const isMask = effect === "mask";
  const hidden = hiddenState(effect, distance);
  const shown = shownState(effect);

  const renderPiece = (piece: TextPiece) => (
    <span
      key={piece.index}
      className={isMask ? "inline-block overflow-hidden align-bottom" : "inline-block align-bottom"}
      style={
        isMask
          ? {
              marginBottom: "-0.16em",
              paddingBottom: "0.16em",
            }
          : undefined
      }
    >
      <motion.span
        className="inline-block will-change-transform"
        initial={reduceMotion ? false : hidden}
        animate={reduceMotion || isInView ? shown : hidden}
        transition={{
          delay: delay + piece.index * stagger,
          duration,
          ease: REVEAL_EASE,
        }}
      >
        {piece.text}
      </motion.span>
    </span>
  );

  const content = (
    <span ref={textRef} aria-hidden="true">
      {lines.map((words, lineIndex) => (
        <span
          key={`${lineIndex}-${words.length}`}
          className={lines.length > 1 ? "block min-h-[1em]" : undefined}
        >
          {words.map((pieces, wordIndex) => (
            <Fragment key={`${lineIndex}-${wordIndex}`}>
              <span className="inline-block">
                {pieces.map(renderPiece)}
              </span>
              {wordIndex < words.length - 1 ? " " : null}
            </Fragment>
          ))}
        </span>
      ))}
    </span>
  );

  return createElement(
    as,
    {
      "aria-label": text,
      "data-text-reveal": true,
      className,
      id,
      style,
    },
    content,
  );
}
