"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useWebsiteLocale } from "@/components/localization/localized-content";
import { translateText } from "@/i18n/translate";
import styles from "./site-loading-screen.module.css";

/** Keep the year and quote in the SAME record so they cannot mismatch. */
const LOADING_QUOTES = [
  {
    year: "1913 — Indian Cinema Begins",
    quote:
      "Dadasaheb Phalke's film is recognised by the Government of India as the first Indian feature film.",
  },
  {
    year: "1931 — India Finds Its Voice",
    quote:
      "Alam Ara, released in 1931, is recognized as the first full-length Indian sound film.",
  },
  {
    year: "1877 — Sound Could Be Captured & Replayed",
    quote:
      "Thomas Edison's phonograph made recorded sound reproducible, transforming how people could preserve and experience voices and music.",
  },
  {
    year: "c. 500 BCE–200 CE — Nāṭya Śāstra",
    quote:
      "Written by Bharata Muni, this ancient text details formal rules for music, instruments, and lyrical performance.",
  },
  {
    year: "Before Sound Could Be Recorded",
    quote:
      "Before sound could be recorded, songs survived through performance, oral tradition and written musical notation.",
  },
] as const;

const QUOTE_INTERVAL_MS = 2400;
const APPROACH_DURATION_MS = 1800;
const FINISH_DURATION_MS = 330;
const APPROACH_TARGET = 94;
// Avoid showing the same quote on two consecutive page transitions.
let lastQuoteAcrossScreens = -1;

/** The first quote on every mount is random, and later quotes never repeat immediately. */
function nextRandomIndex(previous: number): number {
  const count = LOADING_QUOTES.length;
  if (previous < 0 || previous >= count) {
    return Math.floor(Math.random() * count);
  }
  // All the other indices are equally likely; the current quote is excluded.
  return (previous + 1 + Math.floor(Math.random() * (count - 1))) % count;
}

export function SiteLoadingScreen({
  label = "Loading page",
  complete = false,
  onFinish,
  locale: requestedLocale,
}: {
  locale?: string;
  label?: string;
  /** Only reach 100 once navigation/content is ready. */
  complete?: boolean;
  /** Called after the final 000–100 animation has visually completed. */
  onFinish?: () => void;
}) {
  const pathname = usePathname();
  const websiteLocale = useWebsiteLocale();
  const locale = requestedLocale || pathname?.match(/^\/(en|mr)(?:\/|$)/)?.[1] || websiteLocale;
  const t = (text: string) => translateText(text, locale);
  // The server and first client render share the same markup (no hydration mismatch).
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [dotCount, setDotCount] = useState(1);
  const lastIndex = useRef(-1);
  const numberNode = useRef<HTMLSpanElement>(null);
  const currentProgress = useRef(0);
  const onFinishRef = useRef(onFinish);

  useEffect(() => {
    onFinishRef.current = onFinish;
  }, [onFinish]);

  useEffect(() => {
    const showRandomQuote = () => {
      const index = nextRandomIndex(
        lastIndex.current < 0 ? lastQuoteAcrossScreens : lastIndex.current,
      );
      lastIndex.current = index;
      lastQuoteAcrossScreens = index;
      setQuoteIndex(index);
    };

    showRandomQuote();
    const quoteTimer = window.setInterval(showRandomQuote, QUOTE_INTERVAL_MS);
    const dotsTimer = window.setInterval(() => {
      setDotCount((count) => (count % 4) + 1);
    }, 550);

    return () => {
      window.clearInterval(quoteTimer);
      window.clearInterval(dotsTimer);
    };
  }, []);

  useEffect(() => {
    let frame = 0;
    const from = currentProgress.current;
    const to = complete ? 100 : APPROACH_TARGET;
    const duration = complete ? FINISH_DURATION_MS : APPROACH_DURATION_MS;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const paint = (value: number) => {
      const next = Math.min(100, Math.max(0, Math.round(value)));
      currentProgress.current = value;
      if (numberNode.current) {
        // Matches the existing AnimatedStatNumber cubic-ease counting style.
        numberNode.current.textContent = new Intl.NumberFormat(locale === "mr" ? "mr-IN" : "en-IN", { useGrouping: false, minimumIntegerDigits: 3 }).format(next);
      }
    };

    if (reduceMotion) {
      paint(to);
      if (complete) frame = window.requestAnimationFrame(() => onFinishRef.current?.());
      return () => window.cancelAnimationFrame(frame);
    }

    const started = performance.now();
    const animate = (time: number) => {
      const fraction = Math.min(1, (time - started) / duration);
      const eased = 1 - Math.pow(1 - fraction, 3);
      paint(from + (to - from) * eased);

      if (fraction < 1) {
        frame = window.requestAnimationFrame(animate);
      } else if (complete) {
        // One rendered frame at exactly 100 before the overlay is removed.
        frame = window.requestAnimationFrame(() => onFinishRef.current?.());
      }
    };

    frame = window.requestAnimationFrame(animate);
    return () => window.cancelAnimationFrame(frame);
  }, [complete, locale]);

  const activeQuote = LOADING_QUOTES[quoteIndex];

  return (
    <div className={styles.screen} role="status" lang={locale} aria-label={t(label)} aria-busy={!complete} aria-live="off">
      <div className={styles.quoteContainer}>
        <div className={styles.quoteBody} key={quoteIndex}>
          <p className={styles.year}>{t(activeQuote.year)}</p>
          <blockquote className={styles.quote}>{t(activeQuote.quote)}</blockquote>
        </div>
      </div>

      <div className={styles.progressArea}>
        <span ref={numberNode} className={styles.counter} aria-hidden="true">{locale === "mr" ? "०००" : "000"}</span>
        <p className={styles.loadingText} aria-hidden="true">{t("Loading")}{".".repeat(dotCount)}</p>
      </div>
    </div>
  );
}
