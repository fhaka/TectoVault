import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { siteConfig } from "@/lib/site-config";
import { services, getServiceBySlug } from "@/content/services";
import { ServiceDetailBody } from "@/components/sections/service-detail-body";
import { getLocale, pageMetadata } from "@/lib/i18n/server";
import { localizePath } from "@/lib/i18n/config";
import { serviceDetailsSq, serviceTranslationsSq } from "@/lib/i18n/content-sq";

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
  return pageMetadata(
    `/services/${slug}`,
    { en: service.title, sq: serviceTranslationsSq[slug]?.title ?? service.title },
    { en: service.shortDescription, sq: serviceTranslationsSq[slug]?.shortDescription ?? service.shortDescription },
    slug === "ai-agents" ? "ai-agents" : "default"
  );
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const locale = await getLocale();
  const abs = (path: string) => `${siteConfig.url}${localizePath(path, locale) === "/" ? "" : localizePath(path, locale)}`;
  const url = abs(`/services/${slug}`);

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: (locale === "sq" && serviceTranslationsSq[slug]?.title) || service.title,
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
      { "@type": "ListItem", position: 1, name: locale === "sq" ? "Kreu" : "Home", item: abs("/") },
      { "@type": "ListItem", position: 2, name: locale === "sq" ? "Shërbimet" : "Services", item: abs("/services") },
      { "@type": "ListItem", position: 3, name: (locale === "sq" && serviceTranslationsSq[slug]?.title) || service.title, item: url },
    ],
  };

  // Real, visible FAQ content — rendered as an accordion on this same page in
  // ServiceDetailBody, sourced from content/services.ts. FAQPage schema only
  // goes on pages where the FAQ content is actually visible, per Google's
  // guidelines — this is the one page type on the site that qualifies.
  // Must mirror the FAQ visible on the page, which is Albanian on /sq.
  const faq = (locale === "sq" ? serviceDetailsSq[slug]?.faq : undefined) ?? service.faq;
  const faqJsonLd =
    faq.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faq.map((item) => ({
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
