"use client";

import Link from "@/components/i18n/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site-config";
import { useTranslation } from "@/lib/i18n/language-context";

export function Logo({ className }: { className?: string }) {
  const { locale } = useTranslation();
  return (
    <Link
      href="/"
      className={cn("flex items-center", className)}
      aria-label={locale === "sq" ? `${siteConfig.name} kreu` : `${siteConfig.name} home`}
    >
      <Image
        src="/images/tectovault-logo.svg"
        alt={siteConfig.name}
        width={696}
        height={147}
        priority
        unoptimized
        className="h-6 w-auto sm:h-7"
      />
    </Link>
  );
}
