import { localizeMetadata } from "@/i18n/server";

import { LocalizedContent } from "@/components/localization/localized-server-content";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContentDetailPage } from "@/components/layout/content-detail-page";
import { createCmsMetadata, createNotFoundMetadata } from "@/lib/seo/metadata";
import { getCompanyBySlug } from "@/sanity/lib/data";

type CompanyPageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: CompanyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const company = await getCompanyBySlug(slug, true);

  if (!company) return await localizeMetadata(createNotFoundMetadata("Company not found"));
  return await localizeMetadata(createCmsMetadata(company, `/companies/${slug}`));
}

export default async function CompanyPage({ params }: CompanyPageProps) {
  const { slug } = await params;
  const company = await getCompanyBySlug(slug);

  if (!company) notFound();

  return <LocalizedContent>{(
    <ContentDetailPage
      eyebrow="Company"
      title={company.title}
      description={company.description}
      backHref="/companies"
      backLabel="View all companies"
    />
  )}</LocalizedContent>;
}
