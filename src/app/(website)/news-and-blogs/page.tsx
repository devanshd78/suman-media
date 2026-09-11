import { NewsBlogsPage as NewsBlogsListing } from "@/components/news-and-blogs/news-blogs-page";

import {
  REFERENCE_CAREERS_CTA,
  REFERENCE_FAQ,
  REFERENCE_POSTS,
} from "@/components/news-and-blogs/reference-content";

import { CareersCtaSection } from "@/components/landing/careers-cta-section";
import { FaqSection } from "@/components/landing/faq-section";
import { ParallaxBlackSection } from "@/components/motion/parallax-black-section";

import { createPageMetadata } from "@/lib/seo/metadata";

import {
  getNewsBlogs,
  getNewsBlogsSharedContent,
} from "@/sanity/lib/news-and-blogs-data";

export const metadata = createPageMetadata(
  "News & Blogs",
  "Read the latest news, stories, updates, events and press coverage from Suman Media & Entertainment.",
  "/news-and-blogs",
);

export default async function NewsAndBlogsPage() {
  const [cmsPosts, shared] = await Promise.all([
    getNewsBlogs(),
    getNewsBlogsSharedContent(),
  ]);

  const posts =
    cmsPosts.length > 0
      ? cmsPosts
      : REFERENCE_POSTS;

  const faq =
    shared?.faqSection?.items?.length
      ? shared.faqSection
      : REFERENCE_FAQ;

  const careersCta =
    shared?.careersCta?.heading
      ? shared.careersCta
      : REFERENCE_CAREERS_CTA;

  return (
    <>
      <NewsBlogsListing posts={posts} />

      <FaqSection
        content={faq}
        variant="insights"
      />

      <ParallaxBlackSection>
        <CareersCtaSection content={careersCta} />
      </ParallaxBlackSection>
    </>
  );
}