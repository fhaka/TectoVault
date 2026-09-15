"use client";

import * as React from "react";
import { copySq } from "@/lib/i18n/copy-sq";
import { useTranslation } from "@/lib/i18n/language-context";

const originalText = new WeakMap<Text, string>();
const translatedAttributes = ["aria-label", "placeholder", "title"] as const;

function normalized(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

function localize(root: ParentNode, locale: "en" | "sq") {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  let node = walker.nextNode() as Text | null;
  while (node) {
    const parent = node.parentElement;
    if (parent && !["SCRIPT", "STYLE", "CODE"].includes(parent.tagName)) {
      const remembered = originalText.get(node);
      const source = remembered ?? node.data;
      const key = normalized(source);
      const replacement = locale === "sq" ? copySq[key] : undefined;
      // Only take ownership of copy represented in this exact-copy map.
      // Text rendered through t() remains React-owned and must not be reset by
      // an observer from the preceding locale render.
      if (remembered) {
        node.data = locale === "sq" ? source.replace(key, copySq[key] ?? key) : source;
      } else if (replacement) {
        originalText.set(node, source);
        node.data = source.replace(key, replacement);
      }
    }
    node = walker.nextNode() as Text | null;
  }

  root.querySelectorAll?.<HTMLElement>(translatedAttributes.map((name) => `[${name}]`).join(",")).forEach((element) => {
    translatedAttributes.forEach((name) => {
      const originalName = `data-i18n-original-${name}`;
      const remembered = element.getAttribute(originalName);
      const source = remembered ?? element.getAttribute(name);
      if (!source) return;
      const replacement = copySq[normalized(source)];
      if (remembered) element.setAttribute(name, locale === "sq" ? replacement ?? source : source);
      else if (replacement) {
        element.setAttribute(originalName, source);
        if (locale === "sq") element.setAttribute(name, replacement);
      }
    });
  });
}

export function CopyLocalizer() {
  const { locale } = useTranslation();

  React.useEffect(() => {
    const apply = () => localize(document.body, locale);
    apply();
    const observer = new MutationObserver(apply);
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [locale]);

  return null;
}
