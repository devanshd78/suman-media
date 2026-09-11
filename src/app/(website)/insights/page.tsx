import { CareersCtaSection } from "@/components/landing/careers-cta-section";
import { FaqSection } from "@/components/landing/faq-section";
import { NewsBlogsPage } from "@/components/insights/news-blogs-page";
import {
  REFERENCE_CAREERS_CTA,
  REFERENCE_FAQ,
  REFERENCE_POSTS,
} from "@/components/insights/reference-content";
import { ParallaxBlackSection } from "@/components/motion/parallax-black-section";
import { createPageMetadata } from "@/lib/seo/metadata";
import {
  getNewsBlogs,
  getNewsBlogsSharedContent,
} from "@/sanity/lib/insights-data";

export const metadata = createPageMetadata(
  "News and Blogs",
  "Read the latest news, launches, events, press updates, case studies and stories from Suman Entertainment & Media.",
  "/insights",
);

export default async function InsightsPage() {
  const [cmsPosts, shared] = await Promise.all([
    getNewsBlogs(),
    getNewsBlogsSharedContent(),
  ]);

  const posts = cmsPosts.length > 0 ? cmsPosts : REFERENCE_POSTS;
  const faq = shared?.faqSection?.items?.length ? shared.faqSection : REFERENCE_FAQ;
  const careersCta = shared?.careersCta?.heading
    ? shared.careersCta
    : REFERENCE_CAREERS_CTA;

  return (
    <>
      <NewsBlogsPage posts={posts} />
      <FaqSection content={faq} variant="insights" />
      <ParallaxBlackSection>
        <CareersCtaSection content={careersCta} />
      </ParallaxBlackSection>
    </>
  );
}
