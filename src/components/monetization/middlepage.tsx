"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { inter } from "@/lib/fonts";
import styles from "./middlepage.module.css";
import {
  Alarm,
  Books,
  Browser,
  CaretRight,
  FilmReel,
  FilmScript,
  HandCoins,
  Handshake,
  MonitorPlay,
  Newspaper,
  YoutubeLogo,
} from "@phosphor-icons/react";

const subscriptionFeatures = [
  {
    label: "Premium Film Libraries",
    icon: MonitorPlay,
  },
  {
    label: "Original Series",
    icon: YoutubeLogo,
  },
  {
    label: "Exclusive Content",
    icon: FilmReel,
  },
  {
    label: "Early Access",
    icon: Alarm,
  },
  {
    label: "Premium Non-fiction",
    icon: FilmScript,
  },
  {
    label: "Special Collections",
    icon: Books,
  },
];

const transactionFeatures = [
  { label: "New Film Releases", icon: MonitorPlay },
  { label: "Premium Premieres", icon: YoutubeLogo },
  { label: "Film Rentals", icon: FilmReel },
  { label: "Pay-per-view Events", icon: Alarm },
  { label: "Exclusive Content", icon: FilmScript },
  { label: "Special Screenings", icon: Books },
];

const hybridFeatures = [
  { label: "Premium Subscriptions", icon: YoutubeLogo },
  { label: "Free Ad-supported Content", icon: Browser },
  { label: "Film Rentals", icon: FilmReel },
  { label: "Pay-per-view Events", icon: HandCoins },
  { label: "Exclusive Releases", icon: Newspaper },
  { label: "Branded Partnerships", icon: Handshake },
];

export default function MiddlePage() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !("IntersectionObserver" in window)) return;
    const targets = section.querySelectorAll<HTMLElement>(
      "h2, h3, p, [data-reveal], [data-reveal-list] > div",
    );
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        (entry.target as HTMLElement).dataset.entered = "true";
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.08 });
    targets.forEach((target) => {
      target.classList.add(styles.reveal);
      observer.observe(target);
    });
    return () => {
      observer.disconnect();
      targets.forEach((target) => {
        target.classList.remove(styles.reveal);
        delete target.dataset.entered;
      });
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      data-motion-managed
      className={`
        ${styles.section}
        flex
        w-full
        flex-col
        items-center
        gap-[6.25rem]
        bg-white
        px-[3.5rem]
        py-[6.25rem]
      `}
    >
      {/* ===================================================== */}
      {/* TOP HEADING */}
      {/* ===================================================== */}

      <div className="flex w-full flex-col items-center">
        <h2
          className="
            w-[33.25rem]
            max-w-full
            text-center
            font-['Plus_Jakarta_Sans',sans-serif]
            text-[2.5rem]
            font-semibold
            leading-[3rem]
            tracking-[-0.03125rem]
            text-[#1A1A1A]
            [font-feature-settings:'liga'_off,'clig'_off]
          "
        >
          One Content Ecosystem.
          <br />
          Four Ways to Monetise.
        </h2>

        <p
          className="
            mt-[0.75rem]
            w-[37.5rem]
            max-w-full
            text-center
            font-['Plus_Jakarta_Sans',sans-serif]
            text-[1rem]
            font-normal
            leading-[1.5rem]
            text-[#969696]
            [font-feature-settings:'liga'_off,'clig'_off]
          "
        >
          Different content calls for different revenue models. Choose the
          approach that fits your audience, content library and growth
          strategy.
        </p>
      </div>

      {/* ===================================================== */}
      {/* SVOD SECTION */}
      {/* ===================================================== */}

      <div
        className="
          flex
          w-full
          items-start
          gap-[3.5rem]
        "
      >
        {/* =================================================== */}
        {/* LEFT */}
        {/* =================================================== */}

        <div
          className="
            flex
            min-w-0
            flex-1
            flex-col
          "
        >
          {/* Heading + description */}
          <div className="flex w-full flex-col">
            <h3
              className="
                w-full
                font-['Plus_Jakarta_Sans',sans-serif]
                text-[2rem]
                font-bold
                leading-[2.5rem]
                text-[#372B0D]
                [font-feature-settings:'liga'_off,'clig'_off]
              "
            >
              Subscription Video on Demand (SVOD)
            </h3>

            <p
              className="
                mt-[0.5rem]
                w-full
                font-['Plus_Jakarta_Sans',sans-serif]
                text-[1rem]
                font-normal
                leading-[1.5rem]
                text-[#969696]
                [font-feature-settings:'liga'_off,'clig'_off]
              "
            >
              Premium content behind a recurring subscription — built for
              audiences who want continuous access to a curated entertainment
              library.
            </p>
          </div>

          {/* Learn more */}
          <div data-reveal="up" className="mt-[1.5rem]">
            <button
              type="button"
              className="
                inline-flex
                items-center
                justify-center
                gap-[0.25rem]
                rounded-[0.75rem]
                p-[1rem]
                font-['Inter',sans-serif]
                text-[1rem]
                font-semibold
                leading-[1.5rem]
                text-[#8F6C1A]
                [font-feature-settings:'liga'_off,'clig'_off]
              "
            >
              <span>Learn more</span>

              <CaretRight
                size={24}
                weight="regular"
                className="text-[#E1D7BD]"
              />
            </button>
          </div>

          {/* ================================================= */}
          {/* FEATURE LIST */}
          {/* ================================================= */}

          <div data-reveal-list className="mt-[4rem] flex w-full flex-col">
            {subscriptionFeatures.map(
              ({ label, icon: Icon }, index) => (
                <div
                  key={label}
                  className={`
                    flex
                    w-full
                    items-center
                    gap-[1.5rem]
                    py-[0.75rem]

                    border-b
                    border-b-[rgba(217,217,217,0.31)]

                    ${
                      index === 0
                        ? "border-t border-t-[rgba(217,217,217,0.31)]"
                        : ""
                    }
                  `}
                >
                  <Icon
                    size={24}
                    weight="regular"
                    className="
                      h-[1.5rem]
                      w-[1.5rem]
                      shrink-0
                      text-[#969696]
                    "
                  />

                  <span
                    className="
                      font-['Plus_Jakarta_Sans',sans-serif]
                      text-[1rem]
                      font-normal
                      leading-[1.5rem]
                      text-[#969696]
                    "
                  >
                    {label}
                  </span>
                </div>
              ),
            )}
          </div>
        </div>

        {/* =================================================== */}
        {/* RIGHT */}
        {/* =================================================== */}

        <div
          className="
            flex
            min-w-0
            flex-1
            flex-col
            items-center
            justify-end

            rounded-[1rem]

            w-full
            px-5
            pb-0
            pt-[10.6875rem]

            bg-[linear-gradient(180deg,rgba(255,255,255,0)_24.08%,rgba(255,255,255,0.50)_50%,#7C7CCC_100%)]
          "
        >
          <div data-reveal="right" className={styles.subscriptionFrame}>
            <div className={styles.subscriptionCard}>
              <div className={styles.subscriptionArtwork}>
                <Image
                  src="/images/monetization/Image1.png"
                  alt="Premium content: films, originals and series for ₹299 per month"
                  width={881}
                  height={1024}
                  priority
                  sizes="(max-width: 640px) 75vw, 373px"
                  className={styles.subscriptionImage}
                />
              </div>
              <button
                type="button"
                className={`${styles.subscribeButton} ${inter.className}`}
              >
                Subscribe
                <CaretRight size={20} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.avodRow}>
        <div className={styles.avodGradient}>
          <div data-reveal="left" className={styles.subscriptionFrame}>
            <div className={styles.avodCard}>
              <Image
                src="/images/monetization/Image2.png"
                alt="Advertising subscription: curated films, originals and series, with sponsored segments"
                width={433}
                height={509}
                sizes="(max-width: 640px) 80vw, 433px"
                className={styles.avodImage}
              />
              <div className={styles.avodButtonArea}>
                <button
                  type="button"
                  className={`${styles.subscribeButton} ${inter.className}`}
                >
                  Subscribe
                  <CaretRight size={20} aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex w-full flex-col">
            <h3 className="w-full font-['Plus_Jakarta_Sans',sans-serif] text-[2rem] font-bold leading-[2.5rem] text-[#372B0D] [font-feature-settings:'liga'_off,'clig'_off]">
              Advertising Video on Demand (AVOD)
            </h3>
            <p className="mt-[0.5rem] w-full font-['Plus_Jakarta_Sans',sans-serif] text-[1rem] font-normal leading-[1.5rem] text-[#969696] [font-feature-settings:'liga'_off,'clig'_off]">
              Premium content behind a recurring subscription — built for
              audiences who want continuous access to a curated entertainment
              library.
            </p>
          </div>
          <div data-reveal="up" className="mt-[1.5rem]">
            <button
              type="button"
              className="inline-flex items-center justify-center gap-[0.25rem] rounded-[0.75rem] p-[1rem] font-['Inter',sans-serif] text-[1rem] font-semibold leading-[1.5rem] text-[#8F6C1A] [font-feature-settings:'liga'_off,'clig'_off]"
            >
              <span>Learn more</span>
              <CaretRight size={24} weight="regular" className="text-[#E1D7BD]" />
            </button>
          </div>
          <div data-reveal-list className="mt-[4rem] flex w-full flex-col">
            {subscriptionFeatures.map(({ label, icon: Icon }, index) => (
              <div
                key={label}
                className={`flex w-full items-center gap-[1.5rem] border-b border-b-[rgba(217,217,217,0.31)] py-[0.75rem] ${index === 0 ? "border-t border-t-[rgba(217,217,217,0.31)]" : ""}`}
              >
                <Icon size={24} weight="regular" className="h-[1.5rem] w-[1.5rem] shrink-0 text-[#969696]" />
                <span className="font-['Plus_Jakarta_Sans',sans-serif] text-[1rem] font-normal leading-[1.5rem] text-[#969696]">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.avodRow}>
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex w-full flex-col">
            <h3 className="w-full font-['Plus_Jakarta_Sans',sans-serif] text-[2rem] font-bold leading-[2.5rem] text-[#372B0D] [font-feature-settings:'liga'_off,'clig'_off]">
              Transactional Video on Demand (TVOD)
            </h3>
            <p className="mt-[0.5rem] w-full font-['Plus_Jakarta_Sans',sans-serif] text-[1rem] font-normal leading-[1.5rem] text-[#969696] [font-feature-settings:'liga'_off,'clig'_off]">
              Give audiences access to individual titles or premium releases through one-time
              rentals or purchases.
            </p>
          </div>
          <div data-reveal="up" className="mt-[1.5rem]">
            <button
              type="button"
              className="inline-flex items-center justify-center gap-[0.25rem] rounded-[0.75rem] p-[1rem] font-['Inter',sans-serif] text-[1rem] font-semibold leading-[1.5rem] text-[#8F6C1A] [font-feature-settings:'liga'_off,'clig'_off]"
            >
              <span>Learn more</span>
              <CaretRight size={24} weight="regular" className="text-[#E1D7BD]" />
            </button>
          </div>
          <div data-reveal-list className="mt-[4rem] flex w-full flex-col">
            {transactionFeatures.map(({ label, icon: Icon }, index) => (
              <div
                key={label}
                className={`flex w-full items-center gap-[1.5rem] border-b border-b-[rgba(217,217,217,0.31)] py-[0.75rem] ${index === 0 ? "border-t border-t-[rgba(217,217,217,0.31)]" : ""}`}
              >
                <Icon size={24} weight="regular" className="h-[1.5rem] w-[1.5rem] shrink-0 text-[#969696]" />
                <span className="font-['Plus_Jakarta_Sans',sans-serif] text-[1rem] font-normal leading-[1.5rem] text-[#969696]">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className={`${styles.avodGradient} ${styles.tvodGradient}`}>
          <div data-reveal="right" className={`${styles.subscriptionFrame} ${styles.tvodFrame}`}>
            <div className={`${styles.avodCard} ${styles.tvodCard}`}>
              <Image
                src="/images/monetization/Image3.png"
                alt="Premium cinema experience with movie tickets"
                width={433}
                height={509}
                sizes="(max-width: 640px) 80vw, 433px"
                className={styles.avodImage}
              />
              <div className={styles.avodButtonArea}>
                <button type="button" className={`${styles.subscribeButton} ${inter.className}`}>
                  Book now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className={styles.hybridSection} aria-labelledby="hybrid-heading">
        <div className={styles.hybridIntro}>
          <h3 id="hybrid-heading" className={styles.hybridHeading}>
            Multiple Revenue Streams,<br />
            One Ecosystem (HYBRID)
          </h3>
          <p className={styles.hybridDescription}>
            Combine subscriptions, advertising and transactions to create a flexible
            revenue model around different audiences and content types.
          </p>
          <button
            type="button"
            data-reveal="up"
            className={`${styles.hybridLearnMore} ${inter.className}`}
          >
            Learn more
            <CaretRight size={24} weight="bold" aria-hidden="true" />
          </button>
        </div>
        <ul data-reveal-list className={styles.hybridFeatures}>
          {hybridFeatures.map(({ label, icon: Icon }) => (
            <li key={label} data-reveal="up" className={styles.hybridFeature}>
              <Icon size={24} weight="regular" aria-hidden="true" />
              <span>{label}</span>
            </li>
          ))}
        </ul>
      </section>
    </section>
  );
}
