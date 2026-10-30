"use client";

import { useState } from "react";
import Link from "@/components/navigation/website-link";
import { LocalizedContent } from "@/components/localization/localized-content";
import styles from "./publications-and-intellectual-property-page.module.css";

export type CapabilityItem = {
  title: string;
  description: string;
};

type InteractiveCapabilitiesProps = {
  items: CapabilityItem[];
  isIp?: boolean;
};

function ChevronRight({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="m9 5 7 7-7 7" />
    </svg>
  );
}

export function InteractiveCapabilities({ items }: InteractiveCapabilitiesProps) {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  return (
    <LocalizedContent>
      <ul className={styles.cards} role="list">
        {items.map((item, index) => {
          const isActive = activeIndex === index;
          return (
            <li key={item.title} className={styles.cardItem}>
              <Link
                href="/contact/form"
                className={styles.capabilityCard}
                data-tone={index}
                data-active={isActive ? "true" : "false"}
                onMouseEnter={() => setActiveIndex(index)}
                onFocus={() => setActiveIndex(index)}
                onClick={() => setActiveIndex(index)}
                aria-expanded={isActive}
                aria-label={`${item.title}. ${item.description}`}
              >
                <div className={styles.capabilityCardInner}>
                  <div className={styles.capabilityContent}>
                    <h3 className={styles.capabilityTitle}>{item.title}</h3>
                    <p className={styles.capabilityDescription}>
                      {item.description}
                    </p>
                  </div>
                  <div className={styles.capabilityExpertSide} aria-hidden={!isActive}>
                    <span className={styles.capabilityExpertAction}>
                      <span>Talk to an Expert</span>
                      <ChevronRight className={styles.cardArrow} />
                    </span>
                  </div>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </LocalizedContent>
  );
}
