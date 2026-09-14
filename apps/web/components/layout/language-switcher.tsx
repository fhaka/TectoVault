"use client";

import { cn } from "@/lib/utils";
import { useTranslation } from "@/lib/i18n/language-context";

export function LanguageSwitcher({ dark = false }: { dark?: boolean }) {
  const { locale, setLocale } = useTranslation();

  return (
    <div
      className={cn(
        "flex items-center gap-0.5 rounded-full border p-0.5 text-xs font-semibold",
        dark ? "border-white/20 bg-white/5" : "border-border bg-muted"
      )}
      role="group"
      aria-label="Language"
    >
      <button
        type="button"
        onClick={() => setLocale("en")}
        aria-pressed={locale === "en"}
        className={cn(
          "rounded-full px-3 py-1.5 transition-colors",
          locale === "en"
            ? "bg-accent text-accent-foreground"
            : dark
              ? "text-white/70 hover:text-white"
              : "text-muted-foreground hover:text-foreground"
        )}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLocale("sq")}
        aria-pressed={locale === "sq"}
        className={cn(
          "rounded-full px-3 py-1.5 transition-colors",
          locale === "sq"
            ? "bg-accent text-accent-foreground"
            : dark
              ? "text-white/70 hover:text-white"
              : "text-muted-foreground hover:text-foreground"
        )}
      >
        AL
      </button>
    </div>
  );
}
