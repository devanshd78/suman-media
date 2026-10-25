"use client";


import { PreFooterBanner } from "@/components/shared/pre-footer-banner";
import { LocalizedContent, useTextTranslation } from "@/components/localization/localized-content";
import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

/* =========================================================
   DATA
========================================================= */

const heading =
  "Building International Opportunities through Co-Productions, Global Distribution, Strategic Partnerships and Market Representation.";

const marketCards = [
  {
    title: "Co-Productions",
    description:
      "Collaborating with international partners to develop and produce content across markets.",
    image: "/images/business/international-co-productions.png",
    alt: "International co-production film set",
  },
  {
    title: "Film Festivals",
    description:
      "Connecting content and creative work with international film festivals, industry platforms and global audiences.",
    image: "/images/business/film-festivals.png",
    alt: "International film festival and industry showcase",
  },
  {
    title: "International Markets",
    description:
      "Connecting content and creative work with international film festivals, showcases and industry markets.",
    image: "/images/business/international-markets.png",
    alt: "International content and entertainment market",
  },
  {
    title: "Global Distribution",
    description:
      "Taking Indian and regional content to audiences and platforms across international territories.",
    image: "/images/business/global-distribution.png",
    alt: "Global content distribution and operations",
  },
  {
    title: "Strategic Alliances",
    description:
      "Building long-term partnerships with international companies, platforms and industry stakeholders.",
    image: "/images/business/strategic-alliances.png",
    alt: "International strategic partnerships and alliances",
  },
  {
    title: "Market Representation",
    description:
      "Representing content, brands and business interests in selected international markets.",
    image: "/images/business/market-representation.png",
    alt: "International market representation strategy",
  },
];

const journeyItems = [
  {
    number: "1.",
    title: "Connect",
    subtitle: "International Partners",
    icon: "/images/business/icons/phone-call.svg",
  },
  {
    number: "2.",
    title: "Present",
    subtitle: "Markets & Festivals",
    icon: "/images/media/presentation-chart.svg",
  },
  {
    number: "3.",
    title: "Distribute",
    subtitle: "Global Platforms",
    icon: "/images/media/television.svg",
  },
  {
    number: "4.",
    title: "Grow",
    subtitle: "New Audiences & Opportunities",
    icon: "/images/business/icons/chart-line-up.svg",
  },
];

const connectSlides = [
  {
    image: "/images/business/illustrations/stack.png",
    alt: "Suman Entertainment representing Indian entertainment globally",
  },
  {
    image: "/images/business/illustrations/stack-1.png",
    alt: "Suman Entertainment at an international entertainment event",
  },
  {
    image: "/images/business/illustrations/stack-2.png",
    alt: "Suman Entertainment connecting Indian stories with global audiences",
  },
  {
    image: "/images/business/illustrations/stack-3.png",
    alt: "Suman Entertainment global cultural and entertainment presence",
  },
];

/* =========================================================
   ANIMATION
========================================================= */

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.035,
      delayChildren: 0.15,
    },
  },
};

const wordVariants = {
  hidden: {
    opacity: 0,
    y: 32,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const journeyContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const journeyItemVariants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

/* =========================================================
   PAGE
========================================================= */

export default function InternationalBusinessPage() {
  const t = useTextTranslation();
  const [activeConnectSlide, setActiveConnectSlide] = useState(0);
  const [slideDirection, setSlideDirection] = useState(1);

  const changeConnectSlide = (index: number) => {
    if (index === activeConnectSlide) return;

    setSlideDirection(index > activeConnectSlide ? 1 : -1);
    setActiveConnectSlide(index);
  };

  return <LocalizedContent>{(
    <main className="w-full overflow-hidden bg-[#F9F9F9]">
      {/* =====================================================
          HERO
      ===================================================== */}

      <section
        className="
          flex
          w-full
          flex-col
          items-center
          justify-center
          gap-[3.5rem]
          bg-[#F9F9F9]
          px-6
          py-[3.5rem]
          sm:px-8
          lg:px-[3.5rem]
        "
      >
        <div className="flex w-full flex-col items-center gap-3">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              w-full
              text-center
              text-[0.875rem]
              font-semibold
              leading-[1.25rem]
              text-[#B8B8B8]
            "
            style={{
              fontFamily:
                'var(--Font-family-Heading, "Plus Jakarta Sans")',
              fontFeatureSettings: "'liga' off, 'clig' off",
            }}
          >
            INTERNATIONAL BUSINESS &amp; PARTNERSHIPS
          </motion.p>

          <motion.h1
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.35 }}
            aria-label={heading}
            className="
              flex
              w-full
              flex-wrap
              justify-center
              text-center
              text-[2.15rem]
              font-semibold
              leading-[1.08]
              tracking-[-0.04rem]
              text-black
              sm:text-[2.75rem]
              sm:leading-[3.25rem]
              lg:text-[3.5rem]
              lg:leading-[4rem]
              lg:tracking-[-0.0625rem]
            "
            style={{
              fontFamily:
                'var(--Font-family-Heading, "Plus Jakarta Sans")',
              fontFeatureSettings: "'liga' off, 'clig' off",
            }}
          >
            {t(heading).split(" ").map((word, index) => (
              <motion.span
                key={`${word}-${index}`}
                variants={wordVariants}
                className="mr-[0.27em] inline-block will-change-transform"
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.55,
              delay: 0.5,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mt-1"
          >
            <Link
              href="/contact"
              className="
                group
                flex
                items-center
                justify-center
                gap-1
                rounded-[0.25rem]
                p-0
                text-[1rem]
                font-semibold
                leading-[1.5rem]
                text-[#8F6C1A]
                transition-opacity
                duration-300
                hover:opacity-70
              "
              style={{
                fontFamily: 'var(--Font-family-Body, "Inter")',
                fontFeatureSettings: "'liga' off, 'clig' off",
              }}
            >
              <span>Partner with us</span>

              <motion.span
                aria-hidden="true"
                whileHover={{ x: 4 }}
              >
                â†’
              </motion.span>
            </Link>
          </motion.div>
        </div>

        {/* Hero image */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{
            duration: 0.9,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            flex
            h-[32rem]
            w-full
            flex-col
            items-start
            bg-transparent
            p-0
            sm:h-[38rem]
            lg:h-[43.75rem]
          "
        >
          <motion.div
            initial={{ scale: 0.985 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 1.2,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              relative
              min-h-0
              w-full
              flex-1
              overflow-hidden
              rounded-[1rem]
            "
          >
            <motion.img
              src="/images/business/international-business-hero.png"
              alt="Suman Entertainment international business at Cannes"
              className="
                absolute
                inset-0
                h-full
                w-full
                object-cover
                object-center
              "
              whileHover={{ scale: 1.015 }}
              transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
              }}
            />
          </motion.div>
        </motion.div>
      </section>

      {/* =====================================================
          BUILDING BRIDGES ACROSS MARKETS
      ===================================================== */}

      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.6 }}
        className="
          flex
          w-full
          flex-col
          items-center
          gap-[6.25rem]
          bg-white
          px-6
          py-[4rem]
          sm:px-8
          lg:px-[3.5rem]
          lg:py-[6.25rem]
        "
      >
        <div
          className="
            flex
            w-full
            flex-col
            gap-6
            lg:flex-row
            lg:items-center
            lg:justify-between
          "
        >
          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              w-full
              text-[2rem]
              font-semibold
              leading-[2.5rem]
              tracking-[-0.03125rem]
              text-[#1A1A1A]
              lg:w-[26.625rem]
              lg:text-[2.5rem]
              lg:leading-[3rem]
            "
            style={{
              fontFamily:
                'var(--Font-family-Heading, "Plus Jakarta Sans")',
              fontFeatureSettings: "'liga' off, 'clig' off",
            }}
          >
            Building Bridges
            <br />
            Across Markets
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.7,
              delay: 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              w-full
              text-[1rem]
              font-normal
              leading-[1.5rem]
              text-[#969696]
              lg:w-[37.5rem]
            "
            style={{
              fontFamily:
                'var(--Font-family-Body, "Plus Jakarta Sans")',
              fontFeatureSettings: "'liga' off, 'clig' off",
            }}
          >
            We connect content, creators and businesses with international
            platforms, partners and opportunities.
          </motion.p>
        </div>

        {/* Market cards */}

        <div
          className="
            w-full
            overflow-x-auto
            overflow-y-hidden
            scroll-smooth
            [scrollbar-width:none]
            [&::-webkit-scrollbar]:hidden
          "
        >
          <div
            className="
              flex
              w-max
              items-stretch
              gap-4
              pr-6
              sm:gap-6
              lg:gap-4
            "
          >
            {marketCards.map((card, index) => (
              <motion.article
                key={card.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{
                  once: true,
                  amount: 0.15,
                }}
                transition={{
                  duration: 0.75,
                  delay: Math.min(index * 0.06, 0.3),
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="
                  flex
                  h-auto
                  w-[calc(100vw-3rem)]
                  shrink-0
                  flex-col
                  items-center
                  gap-[2.5rem]
                  rounded-[2rem]
                  bg-[#F5F5F5]
                  p-5
                  sm:w-[42rem]
                  sm:p-8
                  lg:h-[34.875rem]
                  lg:w-[59.1875rem]
                "
              >
                <div className="flex w-full flex-col gap-[0.75rem]">
                  <h3
                    className="
                      w-full
                      text-[1.5rem]
                      font-semibold
                      leading-[2rem]
                      text-[#372B0D]
                    "
                    style={{
                      fontFamily:
                        'var(--Font-family-Heading, "Plus Jakarta Sans")',
                      fontFeatureSettings: "'liga' off, 'clig' off",
                    }}
                  >
                    {card.title}
                  </h3>

                  <p
                    className="
                      line-clamp-1
                      w-full
                      overflow-hidden
                      text-ellipsis
                      text-[1rem]
                      font-medium
                      leading-[1.5rem]
                      text-[#969696]
                    "
                    style={{
                      fontFamily:
                        'var(--Font-family-Body, "Plus Jakarta Sans")',
                      fontFeatureSettings: "'liga' off, 'clig' off",
                    }}
                  >
                    {card.description}
                  </p>
                </div>

                <div
                  className="
                    relative
                    h-[20rem]
                    w-full
                    shrink-0
                    overflow-hidden
                    rounded-[0.75rem]
                    lg:h-[24.125rem]
                  "
                >
                  <motion.img
                    src={card.image}
                    alt={card.alt}
                    className="
                      h-full
                      w-full
                      object-cover
                      object-center
                    "
                    whileHover={{ scale: 1.025 }}
                    transition={{
                      duration: 0.7,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  />
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </motion.section>

      {/* =====================================================
          HOW GLOBAL JOURNEY STARTS
      ===================================================== */}

      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.6 }}
        className="
          flex
          w-full
          flex-col
          items-center
          gap-[6.25rem]
          bg-white
          px-6
          py-[4rem]
          sm:px-8
          lg:px-[3.5rem]
          lg:py-[6.25rem]
        "
      >
        <div className="flex w-full flex-col items-center">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.55,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              text-center
              text-[0.875rem]
              font-semibold
              leading-[1.25rem]
              text-[#969696]
            "
            style={{
              fontFamily:
                'var(--Font-family-Heading, "Plus Jakarta Sans")',
              fontFeatureSettings: "'liga' off, 'clig' off",
            }}
          >
            HOW GLOBAL JOURNEY STARTS
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.7,
              delay: 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              mt-1
              w-full
              text-center
              text-[2rem]
              font-semibold
              leading-[2.5rem]
              tracking-[-0.03125rem]
              text-black
              sm:w-[28rem]
              lg:text-[2.5rem]
              lg:leading-[3rem]
            "
            style={{
              fontFamily:
                'var(--Font-family-Heading, "Plus Jakarta Sans")',
              fontFeatureSettings: "'liga' off, 'clig' off",
            }}
          >
            From Local Stories to
            <br />
            Global Opportunities
          </motion.h2>
        </div>

        {/* Journey grid */}

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.2,
          }}
          variants={journeyContainerVariants}
          className="
            grid
            w-full
            grid-cols-1
            gap-x-8
            gap-y-[2.375rem]
            sm:grid-cols-2
            lg:h-[15rem]
            lg:grid-cols-4
            lg:grid-rows-1
          "
        >
          {journeyItems.map((item, index) => (
            <motion.div
              key={item.title}
              variants={journeyItemVariants}
              className="
                flex
                min-h-[12rem]
                w-full
                flex-col
                items-start
                justify-between
                pb-[0.75rem]
                lg:min-h-0
              "
            >
              <motion.img
                src={item.icon}
                alt=""
                aria-hidden="true"
                className="
                  h-[3.5rem]
                  w-[3.5rem]
                  shrink-0
                "
                whileHover={{
                  scale: 1.08,
                  y: index === 0 ? 0 : -3,
                  rotate: index === 0 ? -4 : 0,
                }}
                transition={{
                  duration: 0.25,
                }}
              />

              <div
                className="
                  flex
                  w-full
                  flex-col
                  items-start
                  gap-2
                "
              >
                <h3
                  className="
                    text-[1.25rem]
                    font-semibold
                    leading-[1.75rem]
                    text-[#1A1A1A]
                  "
                  style={{
                    fontFamily:
                      'var(--Font-family-Heading, "Inter")',
                    fontFeatureSettings: "'liga' off, 'clig' off",
                  }}
                >
                  {item.number} {item.title}
                </h3>

                <p
                  className="
                    text-[1rem]
                    font-normal
                    leading-[1.5rem]
                    text-[#969696]
                  "
                  style={{
                    fontFamily:
                      'var(--Font-family-Body, "Plus Jakarta Sans")',
                    fontFeatureSettings: "'liga' off, 'clig' off",
                  }}
                >
                  {item.subtitle}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* =====================================================
          GLOBAL MAP
      ===================================================== */}

      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{
          once: true,
          amount: 0.1,
        }}
        transition={{
          duration: 0.7,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="
          flex
          w-full
          flex-col
          items-center
          gap-4
          bg-[#F5F1EB]
          px-6
          pb-[6.25rem]
          pt-[3.5rem]
          sm:px-8
          lg:px-[3.5rem]
        "
      >
        <motion.img
          src="/images/business/map.svg"
          alt="Suman Entertainment global presence map"
          initial={{
            opacity: 0,
            y: 30,
            scale: 0.99,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          viewport={{
            once: true,
            amount: 0.15,
          }}
          transition={{
            duration: 0.9,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            block
            h-auto
            w-full
          "
        />
      </motion.section>

      {/* =====================================================
          ROOTED IN INDIA / WHERE WE CONNECT
      ===================================================== */}

      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{
          once: true,
          amount: 0.08,
        }}
        transition={{
          duration: 0.7,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="
          flex
          w-full
          flex-col
          items-center
          gap-[6.25rem]
          overflow-hidden
          bg-white
          px-6
          pb-[3.5rem]
          pt-[6.25rem]
          sm:px-8
          lg:px-[3.5rem]
        "
      >
        {/* Text */}

        <div className="flex w-full flex-col items-start">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.55,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              text-[0.875rem]
              font-semibold
              leading-[1.25rem]
              text-[#969696]
            "
            style={{
              fontFamily:
                'var(--Font-family-Heading, "Plus Jakarta Sans")',
              fontFeatureSettings: "'liga' off, 'clig' off",
            }}
          >
            WHERE WE CONNECT
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.7,
              delay: 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              w-full
              text-[2rem]
              font-semibold
              leading-[2.5rem]
              tracking-[-0.03125rem]
              sm:text-[2.25rem]
              sm:leading-[2.75rem]
              lg:text-[2.5rem]
              lg:leading-[3rem]
            "
            style={{
              fontFamily:
                'var(--Font-family-Heading, "Plus Jakarta Sans")',
              fontFeatureSettings: "'liga' off, 'clig' off",
            }}
          >
            <span className="text-black">
              Rooted in India. Open to the World.{" "}
            </span>

            <span className="text-[#969696]">
              From Marathi stories and Indian entertainment to international
              audiences, Suman is building pathways for regional content and
              creative businesses to travel further.
            </span>
          </motion.h2>
        </div>

        {/* =================================================
            MANUAL CAROUSEL

            IMPORTANT:
            Uses the Figma ratio 1328 / 711 instead of
            a fixed height.

            This prevents bad cropping on large screens.
        ================================================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.1,
          }}
          transition={{
            duration: 0.85,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            relative
            w-full
            shrink-0
            overflow-hidden
            rounded-[1.375rem]
            bg-[#EAEAEA]
          "
          style={{
            aspectRatio: "1328 / 711",
          }}
        >
          {/* Current image */}

          <AnimatePresence
            initial={false}
            custom={slideDirection}
            mode="popLayout"
          >
            <motion.img
              key={activeConnectSlide}
              src={connectSlides[activeConnectSlide].image}
              alt={connectSlides[activeConnectSlide].alt}
              custom={slideDirection}
              initial={{
                opacity: 0,
                x: slideDirection > 0 ? 80 : -80,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              exit={{
                opacity: 0,
                x: slideDirection > 0 ? -80 : 80,
              }}
              transition={{
                duration: 0.65,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
                absolute
                inset-0
                h-full
                w-full
                object-cover
                object-center
              "
            />
          </AnimatePresence>

          {/* Bottom gradient */}

          <div
            className="
              pointer-events-none
              absolute
              inset-0
              z-10
              bg-[linear-gradient(181deg,rgba(0,0,0,0)_75.16%,rgba(0,0,0,0.56)_92.92%)]
            "
          />

          {/* =================================================
              DOT INDICATORS
          ================================================= */}

          <div
            className="
              absolute
              bottom-[1.25rem]
              left-1/2
              z-20
              flex
              -translate-x-1/2
              items-center
              justify-center
              gap-[0.5rem]
              sm:bottom-[1.5rem]
              lg:bottom-[2rem]
            "
          >
            {connectSlides.map((slide, index) => {
              const isActive = activeConnectSlide === index;

              return (
                <button
                  key={slide.image}
                  type="button"
                  aria-label={`Show image ${index + 1}`}
                  aria-current={isActive ? "true" : undefined}
                  onClick={() => changeConnectSlide(index)}
                  className="
                    flex
                    h-[0.75rem]
                    w-[0.75rem]
                    cursor-pointer
                    items-center
                    justify-center
                    rounded-full
                    border-0
                    bg-transparent
                    p-0
                    outline-none
                  "
                >
                  <motion.span
                    animate={{
                      scale: isActive ? 1 : 0.8,
                      opacity: isActive ? 1 : 0.45,
                    }}
                    whileHover={{
                      scale: 1.2,
                      opacity: 1,
                    }}
                    transition={{
                      duration: 0.2,
                    }}
                    className="
                      block
                      h-[0.5rem]
                      w-[0.5rem]
                      rounded-full
                      bg-white
                    "
                  />
                </button>
              );
            })}
          </div>
        </motion.div>
      </motion.section>

      {/* =====================================================
          CONTENT MONETIZATION CTA
      ===================================================== */}

      <PreFooterBanner type={6} />
    </main>
  )}</LocalizedContent>;
}