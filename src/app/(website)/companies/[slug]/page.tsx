import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContentDetailPage } from "@/components/layout/content-detail-page";
import { createCmsMetadata, createNotFoundMetadata } from "@/lib/seo/metadata";
import { getCompanyBySlug } from "@/sanity/lib/data";

type CompanyPageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: CompanyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const company = await getCompanyBySlug(slug, true);

  if (!company) return createNotFoundMetadata("Company not found");
  return createCmsMetadata(company, `/companies/${slug}`);
}

export default async function CompanyPage({ params }: CompanyPageProps) {
  const { slug } = await params;
  const company = await getCompanyBySlug(slug);

  if (!company) notFound();

  return (
    <ContentDetailPage
      eyebrow="Company"
      title={company.title}
      description={company.description}
      backHref="/companies"
      backLabel="View all companies"
    />
  );
}
