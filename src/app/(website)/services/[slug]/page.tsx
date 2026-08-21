import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContentDetailPage } from "@/components/layout/content-detail-page";
import { createCmsMetadata, createNotFoundMetadata } from "@/lib/seo/metadata";
import { getServiceBySlug } from "@/sanity/lib/data";

type ServicePageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug, true);

  if (!service) return createNotFoundMetadata("Service not found");
  return createCmsMetadata(service, `/services/${slug}`);
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);

  if (!service) notFound();

  return (
    <ContentDetailPage
      eyebrow="Service"
      title={service.title}
      description={service.description}
      backHref="/services"
      backLabel="View all services"
    />
  );
}
