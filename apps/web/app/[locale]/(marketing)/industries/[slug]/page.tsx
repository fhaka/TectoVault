import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { siteConfig } from "@/lib/site-config";
import { industries, getIndustryBySlug } from "@/content/industries";
import { getSolutionBySlug } from "@/content/solutions";
import { getServiceBySlug } from "@/content/services";
import { projects } from "@/content/projects";
import { IndustryDetailBody } from "@/components/sections/industry-detail-body";
import { getLocale, pageMetadata } from "@/lib/i18n/server";
import { localizePath } from "@/lib/i18n/config";
import { industryTranslationsSq } from "@/lib/i18n/content-sq";

export function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);
  if (!industry) return {};
  return pageMetadata(
    `/industries/${slug}`,
    { en: industry.title, sq: industryTranslationsSq[slug]?.title ?? industry.title },
    { en: industry.overview, sq: industryTranslationsSq[slug]?.overview ?? industry.overview }
  );
}

export default async function IndustryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);
  if (!industry) notFound();

  const locale = await getLocale();
  const abs = (path: string) => `${siteConfig.url}${localizePath(path, locale) === "/" ? "" : localizePath(path, locale)}`;
  const url = abs(`/industries/${slug}`);

  const relatedSolutions = (industry.relatedSolutions.map(getSolutionBySlug).filter(Boolean) as NonNullable<
    ReturnType<typeof getSolutionBySlug>
  >[]).map((s) => ({ slug: s.slug, title: s.title, shortDescription: s.shortDescription }));
  const relatedServices = (industry.relatedServices.map(getServiceBySlug).filter(Boolean) as NonNullable<
    ReturnType<typeof getServiceBySlug>
  >[]).map((s) => ({ slug: s.slug, title: s.title, shortDescription: s.shortDescription }));
  const relatedProjects = projects.filter((p) => p.industry === industry.title).slice(0, 2);

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: locale === "sq" ? "Kreu" : "Home", item: abs("/") },
      { "@type": "ListItem", position: 2, name: locale === "sq" ? "Industritë" : "Industries", item: abs("/industries") },
      { "@type": "ListItem", position: 3, name: (locale === "sq" && industryTranslationsSq[slug]?.title) || industry.title, item: url },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <IndustryDetailBody
        industry={{ slug: industry.slug, title: industry.title, overview: industry.overview, problems: industry.problems }}
        icon={<industry.icon className="size-6" />}
        relatedSolutions={relatedSolutions}
        relatedServices={relatedServices}
        relatedProjects={relatedProjects}
      />
    </>
  );
}
