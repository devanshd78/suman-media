import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { NewsBlogDetail } from "@/components/news-and-blogs/news-blog-detail";
import {
  getReferenceArticle,
  REFERENCE_CAREERS_CTA,
  REFERENCE_FAQ,
} from "@/components/news-and-blogs/reference-content";
import { CareersCtaSection } from "@/components/landing/careers-cta-section";
import { FaqSection } from "@/components/landing/faq-section";
import { ParallaxBlackSection } from "@/components/motion/parallax-black-section";
import { createCmsMetadata, createNotFoundMetadata } from "@/lib/seo/metadata";
import {
  getNewsBlogBySlug,
  getNewsBlogsSharedContent,
} from "@/sanity/lib/news-and-blogs-data";

type NewsBlogPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: NewsBlogPageProps): Promise<Metadata> {
  const { slug } = await params;
  const cmsArticle = await getNewsBlogBySlug(slug, true);
  const article = cmsArticle ?? getReferenceArticle(slug);

  if (!article) return createNotFoundMetadata("Article not found");
  return createCmsMetadata(article, `/news-and-blogs/${slug}`);
}

export default async function NewsBlogArticlePage({ params }: NewsBlogPageProps) {
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
      <FaqSection content={faq} variant="newsAndBlogs" />
      <ParallaxBlackSection>
        <CareersCtaSection content={careersCta} />
      </ParallaxBlackSection>
    </>
  );
}
