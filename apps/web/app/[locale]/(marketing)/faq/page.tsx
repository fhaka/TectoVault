import type { Metadata } from "next";

import { FaqBody } from "@/components/sections/faq-body";
import { faqGroups } from "@/content/faq";
import { getLocale, pageMetadata } from "@/lib/i18n/server";

export function generateMetadata(): Promise<Metadata> {
  return pageMetadata(
    "/faq",
    { en: "FAQ: AI agents, data and privacy", sq: "Pyetje të shpeshta: agjentët AI, të dhënat dhe privatësia" },
    {
      en: "How AI agents and chatbots work, which languages they speak, what happens to your data, GDPR, pricing and the pilot programme. Answers from TectoVault in Tirana.",
      sq: "Si funksionojnë agjentët AI dhe chatbot-et, në cilat gjuhë flasin, çfarë ndodh me të dhënat tuaja, GDPR, çmimet dhe programi pilot. Përgjigje nga TectoVault në Tiranë.",
    }
  );
}

export default async function FaqPage() {
  const locale = await getLocale();
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: locale,
    mainEntity: faqGroups.flatMap((group) =>
      group.items.map((item) => ({
        "@type": "Question",
        name: item.q[locale],
        acceptedAnswer: { "@type": "Answer", text: item.a[locale] },
      }))
    ),
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <FaqBody />
    </>
  );
}
