import { CareersSection } from "@/components/careers/careers-section";
import { CareersValuesSection } from "@/components/careers/careers-values-section";
import { CareerOpenings } from "@/components/careers/career-openings";
import { CareersPartnerCta } from "@/components/careers/careers-partner-cta";
import { createPageMetadata } from "@/lib/seo/metadata";
import {
  getCareerOpenings,
  getCareersCulture,
  getCareersPartnerCta,
} from "@/sanity/lib/data";

export const metadata = createPageMetadata(
  "Careers",
  "Explore career opportunities with Suman Media & Entertainment.",
  "/careers",
);

export default async function CareersPage() {
  const [cmsCulture, openings, partnerCta] = await Promise.all([
    getCareersCulture(),
    getCareerOpenings(),
    getCareersPartnerCta(),
  ]);

  return (
    <main className="relative mx-auto w-full max-w-[90rem] overflow-x-clip bg-white">
      <CareersSection />
      <CareersValuesSection cmsCulture={cmsCulture} />
      <CareerOpenings openings={openings} />
      <CareersPartnerCta content={partnerCta} />
    </main>
  );
}
