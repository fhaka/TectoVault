import type { Metadata } from "next";
import { Toaster } from "sonner";
import { MotionConfig } from "framer-motion";

import "@fontsource-variable/inter";
import "@fontsource-variable/manrope";
import "../globals.css";
import { siteConfig } from "@/lib/site-config";
import { Providers } from "@/components/layout/providers";
import { getLocale, localeAlternates } from "@/lib/i18n/server";
import { dictionaries } from "@/lib/i18n/dictionaries";
import { notFound } from "next/navigation";
import { isLocale, locales } from "@/lib/i18n/config";

// Only /en (served at the root URLs) and /sq exist. Unknown locales 404 in
// the layout below rather than via `dynamicParams = false`: on Cloudflare
// (OpenNext) pages are rendered on demand, which that flag would forbid.
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const descriptionSq =
  "TectoVault është një kompani zhvillimi softueri dhe AI në Shqipëri, që i ndihmon bizneset të rriten me agjentë AI, automatizim biznesi, softuer të personalizuar, aplikacione web dhe mobile, shërbime cloud dhe integrim AI.";

const keywordsSq = [
  "kompani softueri Shqipëri",
  "zhvillim softueri Tiranë",
  "agjentë AI",
  "agjentë AI Shqipëri",
  "chatbot për biznes",
  "automatizim biznesi",
  "softuer i personalizuar",
  "aplikacione web Shqipëri",
  "faqe interneti Shqipëri",
  "integrim AI",
  "TectoVault",
];

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const tagline = dictionaries[locale]["splash.tagline"] ?? siteConfig.tagline;
  const description = locale === "sq" ? descriptionSq : siteConfig.description;
  const { alternates, openGraph } = localeAlternates("/", locale);
  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: `${siteConfig.name} — ${tagline}`,
      template: `%s — ${siteConfig.name}`,
    },
    description,
    keywords: locale === "sq" ? keywordsSq : [
      "software company Albania",
      "software development company Albania",
      "AI development company Albania",
      "software and AI development company",
      "web development Albania",
      "website development Albania",
      "custom software Albania",
      "cloud services Albania",
      "DevOps services Albania",
      "AI automation agency",
      "AI automation Albania",
      "AI agents",
      "AI agents Albania",
      "business automation",
      "business automation Albania",
      "business growth software Albania",
      "custom software development",
      "TectoVault",
    ],
    applicationName: siteConfig.name,
    alternates,
    icons: {
      icon: [
        { url: "/favicon.ico" },
        { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
        { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
      ],
      apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
    },
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      title: `${siteConfig.name} — ${tagline}`,
      description,
      ...openGraph,
      images: [{ url: "/icon-512.png", width: 512, height: 512, alt: siteConfig.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${siteConfig.name} — ${tagline}`,
      description,
      images: ["/icon-512.png"],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function LocaleRootLayout({ children, params }: LayoutProps<"/[locale]">) {
  if (!isLocale((await params).locale)) notFound();
  const locale = await getLocale();
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: siteConfig.url,
    logo: `${siteConfig.url}/icon-512.png`,
    description: siteConfig.description,
    foundingDate: String(siteConfig.founded),
    address: {
      "@type": "PostalAddress",
      addressLocality: "Tirana",
      addressCountry: "AL",
    },
    areaServed: "Albania",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: siteConfig.contact.phone,
      email: siteConfig.contact.email,
      contactType: "customer service",
      areaServed: "AL",
      availableLanguage: ["English", "Albanian"],
    },
    sameAs: [siteConfig.social.instagram],
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    inLanguage: ["en", "sq"],
    publisher: { "@type": "Organization", name: siteConfig.name },
  };

  return (
    <html lang={locale} className="h-full">
      <body className="flex min-h-full flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <Providers locale={locale}>
          <MotionConfig reducedMotion="user">{children}</MotionConfig>
          <Toaster position="bottom-right" richColors />
        </Providers>
      </body>
    </html>
  );
}
