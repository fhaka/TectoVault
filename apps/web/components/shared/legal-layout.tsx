"use client";

import { useTranslation } from "@/lib/i18n/language-context";

export function LegalLayout({
  title,
  titleSq,
  lastUpdated,
  children,
}: {
  title: string;
  titleSq?: string;
  lastUpdated: string;
  children: React.ReactNode;
}) {
  const { t, locale } = useTranslation();
  return (
    <article className="pb-24 pt-36 md:pt-44">
      <div className="container-page max-w-3xl">
        <h1 className="text-4xl font-medium tracking-tight">{locale === "sq" && titleSq ? titleSq : title}</h1>
        <p className="mt-3 text-sm text-muted-foreground">{t("legal.lastUpdated")}: {lastUpdated}</p>

        <div className="prose-legal mt-12 space-y-8 text-sm leading-relaxed text-foreground [&_h2]:mt-10 [&_h2]:text-lg [&_h2]:font-medium [&_p]:mt-3 [&_p]:text-muted-foreground [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5 [&_ul]:text-muted-foreground">
          {children}
        </div>
      </div>
    </article>
  );
}
