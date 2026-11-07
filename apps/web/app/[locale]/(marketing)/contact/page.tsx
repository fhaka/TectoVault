import type { Metadata } from "next";

import { ContactPageBody } from "@/components/sections/contact-page-body";
import { pageMetadata } from "@/lib/i18n/server";

export function generateMetadata(): Promise<Metadata> {
  return pageMetadata(
    "/contact",
    { en: "Contact Us", sq: "Na Kontaktoni" },
    {
      en: "Get in touch with TectoVault \u2014 software development in Tirana, Albania. Call, email, or request a quote.",
      sq: "Kontaktoni TectoVault — zhvillim softueri në Tiranë, Shqipëri. Na telefononi, na shkruani ose kërkoni një ofertë.",
    }
  );
}

export default function ContactPage() {
  return <ContactPageBody />;
}
