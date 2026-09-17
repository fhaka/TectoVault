import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { siteConfig } from "@/lib/site-config";
import { solutions, getSolutionBySlug } from "@/content/solutions";
import { projects } from "@/content/projects";
import { SolutionDetailBody } from "@/components/sections/solution-detail-body";

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
  const url = `${siteConfig.url}/solutions/${slug}`;
  return {
    title: solution.title,
    description: solution.shortDescription,
    alternates: { canonical: url },
    openGraph: { title: `${solution.title} — ${siteConfig.name}`, description: solution.shortDescription, url },
    twitter: { title: `${solution.title} — ${siteConfig.name}`, description: solution.shortDescription },
  };
}

export default async function SolutionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const solution = getSolutionBySlug(slug);
  if (!solution) notFound();

  const url = `${siteConfig.url}/solutions/${slug}`;
  const relatedProjects = projects.slice(0, 2);

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: solution.title,
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
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "Solutions", item: `${siteConfig.url}/solutions` },
      { "@type": "ListItem", position: 3, name: solution.title, item: url },
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
