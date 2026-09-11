import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { NewsBlogDetail } from "@/components/insights/news-blog-detail";
import {
  getReferenceArticle,
  REFERENCE_CAREERS_CTA,
  REFERENCE_FAQ,
} from "@/components/insights/reference-content";
import { CareersCtaSection } from "@/components/landing/careers-cta-section";
import { FaqSection } from "@/components/landing/faq-section";
import { ParallaxBlackSection } from "@/components/motion/parallax-black-section";
import { createCmsMetadata, createNotFoundMetadata } from "@/lib/seo/metadata";
import {
  getNewsBlogBySlug,
  getNewsBlogsSharedContent,
} from "@/sanity/lib/insights-data";

type InsightPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: InsightPageProps): Promise<Metadata> {
  const { slug } = await params;
  const cmsArticle = await getNewsBlogBySlug(slug, true);
  const article = cmsArticle ?? getReferenceArticle(slug);

  if (!article) return createNotFoundMetadata("Article not found");
  return createCmsMetadata(article, `/insights/${slug}`);
}

export default async function InsightPage({ params }: InsightPageProps) {
  const { slug } = await params;
  const [cmsArticle, shared] = await Promise.all([
    getNewsBlogBySlug(slug),
    getNewsBlogsSharedContent(),
  ]);

  const article = cmsArticle ?? getReferenceArticle(slug);
  if (!article) notFound();

  const faq = shared?.faqSection?.items?.length ? shared.faqSection : REFERENCE_FAQ;
  const careersCta = shared?.careersCta?.heading
    ? shared.careersCta
    : REFERENCE_CAREERS_CTA;

  return (
    <>
      <NewsBlogDetail article={article} />
      <FaqSection content={faq} variant="insights" />
      <ParallaxBlackSection>
        <CareersCtaSection content={careersCta} />
      </ParallaxBlackSection>
    </>
  );
}
