import Image from "@/components/ui/image";
import Link from "next/link";
import { plusJakartaSans as inter } from "@/lib/fonts";

import styles from "./contact-page.module.css";

export type ContactActionCard = {
  key: string;
  title: string;
  description: string;
  imageUrl: string;
  imageAlt?: string | null;
  href: string;
};

function ArrowUpRightIcon() {
  return (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      className={styles.cardArrowIcon}
    >
      <path
        d="M8 24L24 8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11 8H24V21"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ContactActionCards({
  cards,
  compact = false,
  ariaLabel = "Ways to connect with Suman Entertainment",
}: {
  cards: ContactActionCard[];
  compact?: boolean;
  ariaLabel?: string;
}) {
  if (!cards.length) return null;

  return (
    <section
      aria-label={ariaLabel}
      className={`site-gutter flex w-full flex-col items-center bg-white ${
        compact ? "py-12 sm:py-14 lg:py-16" : "py-16 lg:py-[6.25rem]"
      }`}
    >
      <div className="grid w-full grid-cols-1 items-stretch gap-6 sm:gap-8 lg:grid-cols-3">
        {cards.slice(0, 3).map((card) => (
          <Link
            key={card.key}
            href={card.href}
            className={`${styles.contactCard} group relative flex aspect-[422/495] w-full max-w-none flex-col items-end justify-between overflow-hidden p-5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8F6C1A] sm:p-8`}
            aria-label={`${card.title}: ${card.description}`}
          >
            <Image
              src={card.imageUrl}
              alt={card.imageAlt?.trim() || card.title}
              fill
              sizes="(min-width: 1024px) 30vw, calc(100vw - 2.5rem)"
              className={`${styles.cardImage} object-cover`}
            />

            <span className={styles.cardOverlay} aria-hidden="true" />

            <span className={styles.cardArrow}>
              <ArrowUpRightIcon />
            </span>

            <span className="relative z-10 flex w-full max-w-[15.3125rem] self-start flex-col items-start">
              <span
                className={`${inter.className} text-2xl font-semibold leading-8 text-white`}
                style={{ fontFeatureSettings: '"liga" off, "clig" off' }}
              >
                {card.title}
              </span>

              <span
                className={`${styles.cardDescription} ${inter.className} text-base font-normal leading-6 text-white/90`}
                style={{ fontFeatureSettings: '"liga" off, "clig" off' }}
              >
                {card.description}
              </span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
