import type { Metadata } from "next";
import { notFound } from "next/navigation";

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
  return { title: solution.title, description: solution.shortDescription };
}

export default async function SolutionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const solution = getSolutionBySlug(slug);
  if (!solution) notFound();

  const relatedProjects = projects.slice(0, 2);
  const { icon: _icon, ...solutionData } = solution;
  void _icon;

  return <SolutionDetailBody solution={solutionData} icon={<solution.icon className="size-6" />} relatedProjects={relatedProjects} />;
}
