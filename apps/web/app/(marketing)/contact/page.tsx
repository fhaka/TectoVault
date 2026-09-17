import type { Metadata } from "next";

import { ContactPageBody } from "@/components/sections/contact-page-body";
import { siteConfig } from "@/lib/site-config";

const title = "Contact Us";
const description = `Get in touch with ${siteConfig.name} — software development in Tirana, Albania. Call, email, or request a quote.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${siteConfig.url}/contact` },
  openGraph: { title: `${title} — ${siteConfig.name}`, description, url: `${siteConfig.url}/contact` },
  twitter: { title: `${title} — ${siteConfig.name}`, description },
};

export default function ContactPage() {
  return <ContactPageBody />;
}
