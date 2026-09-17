import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { siteConfig } from "@/lib/site-config";
import { services, getServiceBySlug } from "@/content/services";
import { ServiceDetailBody } from "@/components/sections/service-detail-body";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  const url = `${siteConfig.url}/services/${slug}`;
  return {
    title: service.title,
    description: service.shortDescription,
    alternates: { canonical: url },
    openGraph: { title: `${service.title} — ${siteConfig.name}`, description: service.shortDescription, url },
    twitter: { title: `${service.title} — ${siteConfig.name}`, description: service.shortDescription },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const url = `${siteConfig.url}/services/${slug}`;

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.overview,
    url,
    areaServed: "Albania",
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "Services", item: `${siteConfig.url}/services` },
      { "@type": "ListItem", position: 3, name: service.title, item: url },
    ],
  };

  // Real, visible FAQ content — rendered as an accordion on this same page in
  // ServiceDetailBody, sourced from content/services.ts. FAQPage schema only
  // goes on pages where the FAQ content is actually visible, per Google's
  // guidelines — this is the one page type on the site that qualifies.
  const faqJsonLd =
    service.faq.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: service.faq.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: { "@type": "Answer", text: item.answer },
          })),
        }
      : null;

  const { icon: _icon, ...serviceData } = service;
  void _icon;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {faqJsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      ) : null}
      <ServiceDetailBody service={serviceData} icon={<service.icon className="size-6" />} />
    </>
  );
}
