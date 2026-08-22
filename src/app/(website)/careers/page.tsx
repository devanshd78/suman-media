import { CareersSection } from "@/components/careers/careers-section";
import { CareersValuesSection } from "@/components/careers/careers-values-section";
import { CareerOpenings } from "@/components/careers/career-openings";
import { createPageMetadata } from "@/lib/seo/metadata";
import { getCareerOpenings, getCareersCulture } from "@/sanity/lib/data";

export const metadata = createPageMetadata(
  "Careers",
  "Explore career opportunities with Suman Media & Entertainment.",
  "/careers",
);

export default async function CareersPage() {
  const [cmsCulture, openings] = await Promise.all([
    getCareersCulture(),
    getCareerOpenings(),
  ]);

  return (
    <main className="relative mx-auto w-full max-w-[90rem] overflow-x-hidden bg-white">
      <CareersSection />
      <CareersValuesSection cmsCulture={cmsCulture} />
      <CareerOpenings openings={openings} />
    </main>
  );
}
