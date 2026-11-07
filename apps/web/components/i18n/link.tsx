"use client";

import * as React from "react";
import NextLink from "next/link";

import { useTranslation } from "@/lib/i18n/language-context";

/**
 * Drop-in replacement for next/link on the marketing site: internal paths
 * ("/pricing") point to the same page in the visitor's language
 * ("/sq/pricing" on the Albanian site). External links, /api and /admin are
 * left alone.
 */
export const Link = React.forwardRef<HTMLAnchorElement, React.ComponentProps<typeof NextLink>>(
  function LocaleLink({ href, ...props }, ref) {
    const { href: localize } = useTranslation();
    const localized = typeof href === "string" ? localize(href) : href;
    return <NextLink ref={ref} href={localized} {...props} />;
  }
);

export default Link;
