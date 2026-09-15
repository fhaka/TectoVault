import type { Metadata } from "next";

import { ContactPageBody } from "@/components/sections/contact-page-body";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${siteConfig.name}.`,
};

export default function ContactPage() {
  return <ContactPageBody />;
}
