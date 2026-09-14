"use client";

import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";

import { siteConfig } from "@/lib/site-config";
import { footerNav } from "@/content/nav";
import { Logo } from "@/components/layout/logo";
import { InstagramIcon } from "@/components/shared/social-icons";
import { useTranslation } from "@/lib/i18n/language-context";

export function SiteFooter() {
  const year = new Date().getFullYear();
  const { t } = useTranslation();

  return (
    <footer className="border-t border-white/10 bg-ink text-ink-foreground">
      <div className="container-page py-16 md:py-20">
        <div className="grid grid-cols-1 gap-10 min-[400px]:grid-cols-2 md:grid-cols-6">
          <div className="min-[400px]:col-span-2">
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-muted">
              {siteConfig.description}
            </p>
            <div className="mt-6 flex items-center gap-3">
              <SocialLink href={siteConfig.social.instagram} label="Instagram">
                <InstagramIcon className="size-4" />
              </SocialLink>
            </div>
          </div>

          <FooterColumn title={t("footer.company")} links={footerNav.company} />
          <FooterColumn title={t("footer.services")} links={footerNav.services} />
          <FooterColumn title={t("footer.resources")} links={footerNav.resources} />

          <div>
            <h3 className="text-sm font-semibold">{t("footer.contact")}</h3>
            <ul className="mt-4 space-y-3 text-sm text-ink-muted">
              <li className="flex items-start gap-2">
                <Mail className="mt-0.5 size-4 shrink-0" />
                <a href={`mailto:${siteConfig.contact.email}`} className="min-w-0 break-all hover:text-white">
                  {siteConfig.contact.email}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="mt-0.5 size-4 shrink-0" />
                <a href={`tel:${siteConfig.contact.phone}`} className="hover:text-foreground">
                  {siteConfig.contact.phone}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 size-4 shrink-0" />
                <span>{siteConfig.contact.address}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-8 text-sm text-ink-muted md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {siteConfig.name}. {t("footer.rights")}
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {footerNav.legal.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-white">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="text-sm font-semibold">{title}</h3>
      <ul className="mt-4 space-y-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-sm text-ink-muted hover:text-white"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  const isPlaceholder = href.startsWith("[");
  return (
    <a
      href={isPlaceholder ? undefined : href}
      aria-label={label}
      aria-disabled={isPlaceholder}
      target={isPlaceholder ? undefined : "_blank"}
      rel={isPlaceholder ? undefined : "noopener noreferrer"}
      className="flex size-9 items-center justify-center rounded-full border border-white/15 text-ink-muted transition-colors hover:border-accent hover:text-accent"
    >
      {children}
    </a>
  );
}
