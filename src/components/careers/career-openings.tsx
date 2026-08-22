"use client";

import { useState } from "react";
import Link from "next/link";
import { CaretDownIcon, CaretRightIcon } from "@phosphor-icons/react";
import { Exo_2, Inter } from "next/font/google";

import type { CmsCareerOpening } from "@/types/cms";

const exo2 = Exo_2({
  subsets: ["latin"],
  weight: ["600"],
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "600"],
});

const FALLBACK_OPENINGS: CmsCareerOpening[] = [
  {
    _key: "product-designer",
    title: "Product Designer",
    location: "Maharashtra, India",
    description:
      "Shape clear, useful digital experiences for audiences across Suman Media's products and platforms.",
    responsibilities: [
      "Turn product ideas and user needs into flows, wireframes and polished interfaces.",
      "Work closely with product, engineering and content teams from discovery through launch.",
      "Maintain consistent interaction patterns across web and mobile experiences.",
    ],
    requirements: [
      "A strong portfolio demonstrating product thinking and visual craft.",
      "Comfort with Figma, prototyping and collaborative design reviews.",
      "Clear communication and attention to detail.",
    ],
  },
  {
    _key: "motion-designer",
    title: "Motion Designer",
    location: "Mumbai, Maharashtra",
    description:
      "Transform static designs into engaging motion that strengthens stories, campaigns and digital experiences.",
    responsibilities: [
      "Create motion graphics and animations for web, social media and marketing campaigns.",
      "Collaborate with design, marketing and content teams to bring concepts to life.",
      "Experiment with animation styles and techniques to improve audience engagement.",
    ],
    requirements: [
      "Experience in motion design with a portfolio of 2D, 3D or kinetic typography work.",
      "Proficiency with tools such as After Effects, Premiere Pro or similar software.",
      "A strong grasp of animation principles, visual storytelling and typography.",
    ],
  },
  {
    _key: "content-strategist",
    title: "Content Strategist",
    location: "Mumbai, Maharashtra",
    description:
      "Develop content strategies that help entertainment brands connect with the right audience at the right moment.",
    responsibilities: [
      "Plan editorial themes and channel-specific content calendars.",
      "Translate audience insights into clear creative briefs.",
      "Measure content performance and improve future campaigns.",
    ],
    requirements: [
      "Experience building content strategies for digital brands or media businesses.",
      "Strong writing, research and presentation skills.",
      "An instinct for culture, entertainment and emerging formats.",
    ],
  },
  {
    _key: "frontend-engineer",
    title: "Frontend Engineer",
    location: "Pune, Maharashtra",
    description:
      "Build fast, accessible interfaces that power modern media, entertainment and technology products.",
    responsibilities: [
      "Develop responsive product experiences with React and TypeScript.",
      "Partner with designers and backend engineers to ship reliable features.",
      "Improve performance, accessibility and shared interface systems.",
    ],
    requirements: [
      "Professional experience with React, TypeScript and modern CSS.",
      "A practical understanding of accessibility and web performance.",
      "Confidence collaborating through code reviews and iterative delivery.",
    ],
  },
];

function safeApplyHref(href?: string | null) {
  const value = href?.trim();

  if (
    value?.startsWith("/") ||
    value?.startsWith("https://") ||
    value?.startsWith("http://") ||
    value?.startsWith("mailto:")
  ) {
    return value;
  }

  return "/contact";
}

function DetailList({ title, items }: { title: string; items?: string[] | null }) {
  if (!items?.length) {
    return null;
  }

  return (
    <div className="space-y-3">
      <h4 className="font-semibold text-black">{title}</h4>
      <ul className="list-disc space-y-2 pl-5">
        {items.map((item, index) => (
          <li key={`${item}-${index}`}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export function CareerOpenings({ openings }: { openings?: CmsCareerOpening[] }) {
  const jobs = openings?.length ? openings : FALLBACK_OPENINGS;
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <section
      id="open-roles"
      aria-labelledby="career-openings-heading"
      className="mx-auto flex w-full max-w-[90rem] scroll-mt-24 flex-col items-center gap-16 bg-white px-5 py-16 sm:px-8 lg:gap-[6.25rem] lg:px-[3.5rem] lg:py-[6.25rem]"
    >
      <h2
        id="career-openings-heading"
        className={`${exo2.className} text-center text-[2rem] font-semibold leading-10 tracking-[-0.03125rem] text-black lg:text-[2.5rem] lg:leading-[3rem]`}
        style={{ fontFeatureSettings: '"liga" off, "clig" off' }}
      >
        Open Positions
      </h2>

      <div className="w-full max-w-[81.125rem]">
        <div className="flex w-full flex-col gap-6">
          {jobs.map((job, index) => {
            const isOpen = hoveredIndex === index || expandedIndex === index;
            const detailsId = `career-opening-details-${index}`;

            return (
              <article
                key={job._key || `${job.title}-${index}`}
                className="w-full border-y border-[#E6E6E6]"
              >
                <div className="flex min-h-[7.5rem] w-full flex-col items-start justify-center gap-6 p-5 md:flex-row md:items-center md:justify-between md:gap-[6.25rem]">
                  <div className="min-w-0 flex-1">
                    <h3
                      className={`${exo2.className} text-[2rem] font-semibold leading-10 tracking-[-0.03125rem] text-black lg:text-[2.5rem] lg:leading-[3rem]`}
                      style={{ fontFeatureSettings: '"liga" off, "clig" off' }}
                    >
                      {job.title}
                    </h3>
                    <p
                      className={`${inter.className} mt-1 text-base font-normal leading-6 text-[#B8B8B8]`}
                      style={{ fontFeatureSettings: '"liga" off, "clig" off' }}
                    >
                      {job.location}
                    </p>
                  </div>

                  <div className="flex shrink-0 items-center gap-5">
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={detailsId}
                      onClick={() =>
                        setExpandedIndex((current) =>
                          current === index ? null : index,
                        )
                      }
                      className={`${inter.className} inline-flex h-12 items-center justify-center gap-2 px-1 text-sm font-semibold text-black`}
                    >
                      <span>View details</span>
                      <span
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        className="inline-flex"
                      >
                        <CaretDownIcon
                          aria-hidden="true"
                          size={18}
                          weight="bold"
                          className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                        />
                      </span>
                    </button>

                    <Link
                      href={safeApplyHref(job.applyUrl)}
                      className={`${inter.className} inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#8F6C1A] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#755715] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8F6C1A]`}
                    >
                      <span>Apply now</span>
                      <CaretRightIcon aria-hidden="true" size={18} weight="bold" />
                    </Link>
                  </div>
                </div>

                <div
                  id={detailsId}
                  aria-hidden={!isOpen}
                  className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div
                      className={`${inter.className} space-y-8 px-5 pb-10 text-base font-normal leading-7 text-[#969696]`}
                      style={{ fontFeatureSettings: '"liga" off, "clig" off' }}
                    >
                      <p>{job.description}</p>
                      <DetailList
                        title="Your responsibilities will include:"
                        items={job.responsibilities}
                      />
                      <DetailList title="Requirements:" items={job.requirements} />
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <p
        className={`${inter.className} w-full max-w-[16.375rem] text-center text-2xl font-semibold leading-8 text-black`}
        style={{ fontFeatureSettings: '"liga" off, "clig" off' }}
      >
        Didn&apos;t find a good fit? Share your CV{" "}
        <Link
          href="/contact"
          className="text-[#8F6C1A] underline decoration-transparent underline-offset-4 transition-colors hover:decoration-current"
        >
          here
        </Link>
      </p>
    </section>
  );
}
