"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Logo } from "@/components/layout/logo";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { DesktopNav } from "@/components/layout/nav-menu";
import { mainNav } from "@/content/nav";
import { useTranslation } from "@/lib/i18n/language-context";

export function SiteHeader() {
  const pathname = usePathname();
  const { t } = useTranslation();
  const [surfaceTone, setSurfaceTone] = React.useState<"light" | "dark" | "hero" | "transparent-light" | "transparent-dark">(
    pathname === "/" ? "hero" : pathname === "/solutions" ? "dark" : "light"
  );
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [interactionPath, setInteractionPath] = React.useState("");
  const interacted = interactionPath === pathname;

  React.useEffect(() => {
    const onScroll = () => {
      const headerHeight = 80;
      const isServiceDetail = /^\/services\/[^/]+$/.test(pathname);
      const tone = Array.from(
        document.querySelectorAll<HTMLElement>('[data-header-tone="dark"]')
      ).find((section) => {
        const bounds = section.getBoundingClientRect();
        return bounds.top < headerHeight && bounds.bottom > 0;
      });
      const hero = document.querySelector<HTMLElement>('[data-header-tone="hero"]');
      const heroBounds = hero?.getBoundingClientRect();
      const isOverHero = heroBounds && heroBounds.top < headerHeight && heroBounds.bottom > 0;
      const isOverDark = Boolean(tone);
      if (isServiceDetail && window.scrollY < 12 && !interacted) {
        setSurfaceTone(isOverDark ? "transparent-dark" : "transparent-light");
        return;
      }
      setSurfaceTone(
        isOverHero
          ? "hero"
          : tone ? "dark" : "light"
      );
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname, interacted]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-all duration-300",
        surfaceTone === "hero"
          ? "border-b border-transparent bg-transparent"
          : surfaceTone === "transparent-dark"
            ? "border-b border-transparent bg-transparent"
            : surfaceTone === "transparent-light"
              ? "border-b border-transparent bg-transparent"
          : surfaceTone === "dark"
            ? "border-b border-white/10 bg-ink/90 backdrop-blur-md"
            : "border-b border-border bg-background/90 backdrop-blur-md"
      )}
      onMouseEnter={() => setInteractionPath(pathname)}
      onFocusCapture={() => setInteractionPath(pathname)}
      onClick={() => setInteractionPath(pathname)}
    >
      <div className="container-page flex h-16 items-center justify-between py-2 sm:h-20 sm:py-3">
        <div className={cn((surfaceTone === "dark" || surfaceTone === "hero" || surfaceTone === "transparent-dark") && "[&_span]:text-white [&_a]:text-white")}>
          <Logo />
        </div>

        {/* No blanket [&_a]:text-white here: it would also hit the links
            inside the mega-menu panels, turning their titles white-on-white.
            The dark prop styles the top-level triggers/links itself. */}
        <DesktopNav dark={surfaceTone === "dark" || surfaceTone === "hero" || surfaceTone === "transparent-dark"} />

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <LanguageSwitcher dark={surfaceTone === "dark" || surfaceTone === "hero" || surfaceTone === "transparent-dark"} />
          </div>

          <Button asChild size="default" variant={surfaceTone === "dark" || surfaceTone === "hero" || surfaceTone === "transparent-dark" ? "inverse" : "accent"} className="hidden sm:inline-flex">
            <Link href="/request-quote">
              {t("cta.startProject")}
              <ArrowUpRight className="size-4" />
            </Link>
          </Button>

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <button
                aria-label="Open menu"
                className={cn(
                  "flex size-11 items-center justify-center rounded-full transition-colors lg:hidden",
                  surfaceTone === "dark" || surfaceTone === "hero" || surfaceTone === "transparent-dark" ? "text-white hover:bg-white/10" : "text-foreground hover:bg-muted"
                )}
              >
                <Menu className="size-5" />
              </button>
            </SheetTrigger>
            <SheetContent>
              <MobileNav onNavigate={() => setMobileOpen(false)} />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

const navLabelKeys: Record<string, string> = {
  Services: "nav.services",
  Solutions: "nav.solutions",
  Industries: "nav.industries",
  Work: "nav.work",
  About: "nav.about",
  Process: "nav.process",
  Pricing: "nav.pricing",
};

function MobileNav({ onNavigate }: { onNavigate: () => void }) {
  const { t } = useTranslation();
  return (
    <div className="flex h-full min-h-0 flex-col px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-6 sm:p-6 sm:pt-8">
      <SheetTitle>
        <Logo />
      </SheetTitle>
      <div className="mt-6">
        <LanguageSwitcher />
      </div>
      <nav className="mt-6 flex flex-1 flex-col gap-1 overflow-y-auto sm:mt-8">
        {mainNav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className="rounded-lg px-3 py-3 text-lg font-medium transition-colors hover:bg-muted"
          >
            {t(navLabelKeys[item.label] ?? item.label) || item.label}
          </Link>
        ))}
      </nav>
      <div className="mt-auto flex flex-col gap-3 border-t border-border pt-6">
        <Button asChild size="lg" variant="accent" onClick={onNavigate}>
          <Link href="/request-quote">{t("cta.startProject")}</Link>
        </Button>
        <Button asChild size="lg" variant="outline" onClick={onNavigate}>
          <Link href="/contact">{t("cta.contactUs")}</Link>
        </Button>
      </div>
    </div>
  );
}
