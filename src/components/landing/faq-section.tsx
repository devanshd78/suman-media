"use client";

import { Exo_2, Inter } from "next/font/google";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";

import { TextReveal } from "@/components/motion/text-reveal";
import type { CmsFaqSection } from "@/types/cms";

const exo2 = Exo_2({ subsets: ["latin"], weight: ["600"] });
const inter = Inter({ subsets: ["latin"], weight: ["400", "600"] });

function PlusIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" className="h-3 w-3" fill="none">
      <path d="M8 4v8M4 8h8" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  );
}

export function FaqSection({ content }: { content?: CmsFaqSection | null }) {
  const reduceMotion = useReducedMotion();
  const items =
    content?.items?.filter(
      (item) => Boolean(item?.question?.trim() && item?.answer?.trim()),
    ) ?? [];
  const [openIndex, setOpenIndex] = useState(0);

  if (!content || items.length === 0) return null;

  const heading = content.heading?.trim() || "Questions people asked?";

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="landing-section-transition culture-thread culture-weave heritage-surface paithani-edge fort-silhouette relative grid w-full gap-12 overflow-hidden px-5 py-16 sm:px-8 sm:py-20 md:grid-cols-[minmax(15rem,0.72fr)_minmax(0,1.28fr)] md:gap-14 lg:gap-24 lg:px-[3.5rem] lg:py-[7rem]"
    >
      <div className="relative z-10">
        <motion.p
          initial={reduceMotion ? false : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: reduceMotion ? 0 : 0.55 }}
          className={`${inter.className} text-[0.625rem] font-semibold uppercase tracking-[0.08em] text-[rgba(0,9,51,0.58)]`}
        >
          {content.eyebrow?.trim() || "FAQ"}
        </motion.p>
        <h2
          id="faq-heading"
          className={`${exo2.className} premium-display mt-2.5 max-w-[28rem] overflow-hidden text-[2rem] font-semibold leading-[2.45rem] tracking-[-0.04em] text-black sm:text-[2.5rem] sm:leading-[2.95rem]`}
        >
          <TextReveal text={heading} stagger={0.045} />
        </h2>

        {content.contactEmail ? (
          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: reduceMotion ? 0 : 0.65, delay: 0.12 }}
            className={`${inter.className} mt-4 text-sm leading-6 text-[rgba(0,9,51,0.58)]`}
          >
            {content.contactText?.trim() || "still have a query?"}{" "}
            <a
              className="kinetic-link font-normal text-[#8F6C1A]"
              href={`mailto:${content.contactEmail}`}
            >
              {content.contactEmail}
            </a>
          </motion.p>
        ) : null}
      </div>

      <div className="relative z-10 overflow-hidden rounded-[1.35rem] border border-[#C99B36]/18 bg-white/35 px-5 shadow-[0_1.5rem_4rem_rgba(55,35,10,0.07)] backdrop-blur-sm sm:px-7">
        {items.map((item, index) => {
          const isOpen = index === openIndex;
          const answerId = `faq-answer-${index}`;
          const triggerId = `faq-trigger-${index}`;

          return (
            <motion.div
              key={item._key}
              initial={reduceMotion ? false : { opacity: 0, x: 18 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: reduceMotion ? 0 : 0.6, delay: index * 0.035 }}
              className="border-b border-[#8F6C1A]/12 last:border-b-0"
            >
              <button
                id={triggerId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={answerId}
                onClick={() => setOpenIndex((current) => (current === index ? -1 : index))}
                className={`${inter.className} group flex w-full items-center justify-between gap-6 py-5 text-left text-[0.92rem] font-semibold leading-6 text-[#201812] transition-colors duration-300 hover:text-[#8A4A24] sm:text-base`}
              >
                <span>{item.question}</span>
                <motion.span
                  animate={{ rotate: isOpen ? 45 : 0, scale: isOpen ? 1.05 : 1 }}
                  transition={{ duration: reduceMotion ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] }}
                  className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#8F6C1A]/35 text-[#8F6C1A]/70 transition-colors duration-300 group-hover:border-[#8F6C1A] group-hover:text-[#8F6C1A]"
                >
                  <PlusIcon />
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen ? (
                  <motion.div
                    id={answerId}
                    role="region"
                    aria-labelledby={triggerId}
                    initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
                    transition={{
                      height: { duration: reduceMotion ? 0 : 0.42, ease: [0.22, 1, 0.36, 1] },
                      opacity: { duration: reduceMotion ? 0 : 0.28 },
                    }}
                    className="overflow-hidden"
                  >
                    <p className={`${inter.className} max-w-[45rem] pb-6 pr-10 text-sm leading-6 text-[rgba(38,28,20,0.64)] sm:text-[0.94rem] sm:leading-7`}>
                      {item.answer}
                    </p>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
