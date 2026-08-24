import Link from "next/link";
import { Exo_2, Inter } from "next/font/google";
import { getFeaturedProjects } from "@/sanity/lib/data";
import type { CmsFeaturedProject } from "@/types/cms";

const exo2 = Exo_2({
  subsets: ["latin"],
  weight: ["600"],
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "600"],
});

type ProjectCard = Pick<
  CmsFeaturedProject,
  | "title"
  | "client"
  | "shortDescription"
  | "imageUrl"
  | "imageAlt"
  | "projectDate"
> & {
  _id: string;
};

/*
 * Fallback cards restate the initiatives already described in the
 * hero section's fallback slides (see hero-section.tsx).
 */
const FALLBACK_PROJECTS: ProjectCard[] = [
  {
    _id: "fallback-project-1",
    title: "Abhijat Marathi OTT",
    client: "Digital Entertainment & Platform",
    shortDescription:
      "India's dedicated Marathi OTT platform for original films, series and cultural programming.",
    imageUrl: "/images/landing/hero/Image1.png",
  },
  {
    _id: "fallback-project-2",
    title: "Live Experiences & Events",
    client: "Events & Experiences",
    shortDescription:
      "Concerts, cultural festivals, corporate events and large-scale public experiences.",
    imageUrl: "/images/landing/hero/Image2.jpg",
  },
  {
    _id: "fallback-project-3",
    title: "Music & Audio Ecosystem",
    client: "Music & Publishing",
    shortDescription:
      "Original compositions, film soundtracks, digital publishing and royalty management.",
    imageUrl: "/images/landing/hero/Image3.jpg",
  },
  {
    _id: "fallback-project-4",
    title: "Public Communication at Scale",
    client: "Government & Strategic Communication",
    shortDescription:
      "Campaigns, citizen engagement and strategic communication for public institutions.",
    imageUrl: "/images/landing/hero/Image5.jpg",
  },
];

function ArrowRightIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className="h-4 w-4 shrink-0"
      fill="none"
    >
      <path
        d="M3.5 8h8M8.5 5l3 3-3 3"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function getProjectYear(projectDate?: string | null): number | null {
  if (!projectDate) {
    return null;
  }

  const year = new Date(projectDate).getFullYear();

  return Number.isNaN(year) ? null : year;
}

export async function ProjectsSection() {
  const projects = await getFeaturedProjects();

  const projectCards: ProjectCard[] =
    projects.length > 0 ? projects.slice(0, 4) : FALLBACK_PROJECTS;

  return (
    <section
      id="work"
      aria-labelledby="projects-heading"
      className="mx-auto flex w-full max-w-full flex-col bg-white px-5 py-16 sm:px-8 lg:px-[3.5rem] lg:py-[6.25rem]"
    >
      {/* Header row */}
      <div className="flex w-full flex-col items-start gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
        <div className="flex min-w-0 flex-col items-start gap-4">
          <p
            className={`${inter.className} text-[0.625rem] font-semibold uppercase leading-[0.875rem] tracking-[-0.00625rem] text-[rgba(0,9,51,0.65)]`}
          >
            Our Work
          </p>

          <h2
            id="projects-heading"
            className={`${exo2.className} text-[2rem] font-semibold leading-[2.5rem] tracking-[-0.03125rem] text-black lg:text-[2.5rem] lg:leading-[3rem]`}
            style={{ fontFeatureSettings: '"liga" off, "clig" off' }}
          >
            Featured Projects
          </h2>
        </div>

        <Link
          href="/portfolio"
          className={`${inter.className} inline-flex shrink-0 items-center justify-center gap-1 rounded-lg p-4 text-center text-sm font-semibold leading-5 text-[#8F6C1A] transition-colors hover:bg-[#8F6C1A]/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8F6C1A]/35`}
          style={{ fontFeatureSettings: '"liga" off, "clig" off' }}
        >
          <span>View portfolio</span>
          <ArrowRightIcon />
        </Link>
      </div>

      {/* Projects grid */}
      <div className="mt-12 grid w-full grid-cols-1 gap-8 lg:mt-16 lg:grid-cols-2 lg:gap-10">
        {projectCards.map((project) => {
          const projectYear = getProjectYear(project.projectDate);

          return (
            <Link
              key={project._id}
              href="/portfolio"
              className="group flex flex-col border border-black/[0.04] bg-white shadow-[0_0.75rem_2rem_rgba(0,0,0,0.07)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8F6C1A]/35"
            >
              <div className="aspect-[16/10] w-full overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={project.imageUrl}
                  alt={project.imageAlt ?? project.title}
                  draggable={false}
                  className="h-full w-full select-none object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                />
              </div>

              <div className="flex flex-col items-start gap-2 p-5 lg:p-6">
                {project.client || projectYear !== null ? (
                  <div className="flex w-full items-baseline gap-4">
                    {project.client ? (
                      <p
                        className={`${inter.className} min-w-0 text-[0.625rem] font-semibold uppercase leading-[0.875rem] tracking-[-0.00625rem] text-[rgba(0,9,51,0.65)]`}
                      >
                        {project.client}
                      </p>
                    ) : null}

                    {projectYear !== null ? (
                      <p
                        className={`${inter.className} ml-auto shrink-0 text-right text-[0.625rem] font-semibold uppercase leading-[0.875rem] tracking-[-0.00625rem] text-[rgba(0,9,51,0.65)]`}
                      >
                        {projectYear}
                      </p>
                    ) : null}
                  </div>
                ) : null}

                <h3
                  className={`${inter.className} text-xl font-semibold leading-7 text-black`}
                  style={{ fontFeatureSettings: '"liga" off, "clig" off' }}
                >
                  {project.title}
                </h3>

                <p
                  className={`${inter.className} line-clamp-3 text-sm font-normal leading-5 text-[rgba(0,9,51,0.65)]`}
                  style={{ fontFeatureSettings: '"liga" off, "clig" off' }}
                >
                  {project.shortDescription}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
