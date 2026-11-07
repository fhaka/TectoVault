import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { siteConfig } from "@/lib/site-config";
import { solutions, getSolutionBySlug } from "@/content/solutions";
import { projects } from "@/content/projects";
import { SolutionDetailBody } from "@/components/sections/solution-detail-body";
import { getLocale, pageMetadata } from "@/lib/i18n/server";
import { localizePath } from "@/lib/i18n/config";
import { solutionTranslationsSq } from "@/lib/i18n/content-sq";

export function generateStaticParams() {
  return solutions.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const solution = getSolutionBySlug(slug);
  if (!solution) return {};
  return pageMetadata(
    `/solutions/${slug}`,
    { en: solution.title, sq: solutionTranslationsSq[slug]?.title ?? solution.title },
    { en: solution.shortDescription, sq: solutionTranslationsSq[slug]?.shortDescription ?? solution.shortDescription }
  );
}

export default async function SolutionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const solution = getSolutionBySlug(slug);
  if (!solution) notFound();

  const locale = await getLocale();
  const abs = (path: string) => `${siteConfig.url}${localizePath(path, locale) === "/" ? "" : localizePath(path, locale)}`;
  const url = abs(`/solutions/${slug}`);
  const relatedProjects = projects.slice(0, 2);

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: (locale === "sq" && solutionTranslationsSq[slug]?.title) || solution.title,
    description: solution.shortDescription,
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
      { "@type": "ListItem", position: 2, name: locale === "sq" ? "Zgjidhjet" : "Solutions", item: abs("/solutions") },
      { "@type": "ListItem", position: 3, name: (locale === "sq" && solutionTranslationsSq[slug]?.title) || solution.title, item: url },
    ],
  };

  const { icon: _icon, ...solutionData } = solution;
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
      <SolutionDetailBody solution={solutionData} icon={<solution.icon className="size-6" />} relatedProjects={relatedProjects} />
    </>
  );
}
