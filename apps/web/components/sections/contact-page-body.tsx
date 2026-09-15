"use client";

import { Mail, Phone, MapPin, Clock } from "lucide-react";

import { PageHero } from "@/components/shared/page-hero";
import { Section } from "@/components/shared/section";
import { ContactForm } from "@/components/forms/contact-form";
import { siteConfig } from "@/lib/site-config";
import { useTranslation } from "@/lib/i18n/language-context";

export function ContactPageBody() {
  const { t } = useTranslation();

  return (
    <>
      <PageHero
        eyebrow={t("contact.eyebrow")}
        title={t("contact.title")}
        description={t("contact.description")}
      />

      <Section>
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_1.2fr]">
          <div className="space-y-8">
            <ContactInfoRow icon={Mail} label={t("contact.form.email")} value={siteConfig.contact.email} href={`mailto:${siteConfig.contact.email}`} />
            <ContactInfoRow icon={Phone} label={t("contact.label.phone")} value={`${siteConfig.contact.phone} / ${siteConfig.contact.phone2}`} href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`} />
            <ContactInfoRow icon={MapPin} label={t("contact.label.location")} value={siteConfig.contact.address} />
            <ContactInfoRow icon={Clock} label={t("contact.label.hours")} value={siteConfig.contact.hours} />
          </div>

          <ContactForm />
        </div>
      </Section>
    </>
  );
}

function ContactInfoRow({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <div className="flex items-start gap-4">
      <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-muted">
        <Icon className="size-[18px]" />
      </span>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{label}</p>
        <p className="mt-1 font-medium">{value}</p>
      </div>
    </div>
  );
  return href ? <a href={href} className="block hover:opacity-80">{content}</a> : content;
}
