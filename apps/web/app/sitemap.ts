import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/site-config";
import { services } from "@/content/services";
import { solutions } from "@/content/solutions";
import { industries } from "@/content/industries";
import { blogPosts } from "@/content/blog";
import { jobPostings } from "@/content/careers";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/services",
    "/solutions",
    "/industries",
    "/work",
    "/about",
    "/process",
    "/pricing",
    "/blog",
    "/contact",
    "/request-quote",
    "/careers",
    "/privacy",
    "/terms",
    "/cookies",
  ].map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: new Date(),
  }));

  const dynamicRoutes = [
    ...services.map((s) => `/services/${s.slug}`),
    ...solutions.map((s) => `/solutions/${s.slug}`),
    ...industries.map((i) => `/industries/${i.slug}`),
    ...blogPosts.map((p) => `/blog/${p.slug}`),
    ...jobPostings.map((j) => `/careers/${j.slug}`),
  ].map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...dynamicRoutes];
}
