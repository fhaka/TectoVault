import type { Metadata } from "next";
import { Toaster } from "sonner";
import { MotionConfig } from "framer-motion";

import "@fontsource-variable/inter";
import "@fontsource-variable/manrope";
import "./globals.css";
import { siteConfig } from "@/lib/site-config";
import { Providers } from "@/components/layout/providers";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
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
  alternates: {
    canonical: siteConfig.url,
  },
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
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    url: siteConfig.url,
    locale: "en_US",
    images: [{ url: "/icon-512.png", width: 512, height: 512, alt: siteConfig.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: ["/icon-512.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
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
    <html lang="en" className="h-full">
      <body className="flex min-h-full flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <Providers>
          <MotionConfig reducedMotion="user">{children}</MotionConfig>
          <Toaster position="bottom-right" richColors />
        </Providers>
      </body>
    </html>
  );
}
