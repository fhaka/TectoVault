"use client";

import * as React from "react";
import Link from "next/link";
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { services } from "@/content/services";
import { solutions } from "@/content/solutions";
import { industries } from "@/content/industries";
import { mainNav } from "@/content/nav";
import { useTranslation } from "@/lib/i18n/language-context";

const navLabelKeys: Record<string, string> = {
  Services: "nav.services",
  Solutions: "nav.solutions",
  Industries: "nav.industries",
  Work: "nav.work",
  About: "nav.about",
  Process: "nav.process",
  Pricing: "nav.pricing",
};

const viewAllKeys: Record<string, string> = {
  services: "nav.viewAllServices",
};

const megaMenus = {
  services: {
    items: services.map((s) => ({
      href: `/services/${s.slug}`,
      title: s.title,
      description: s.shortDescription,
      icon: s.icon,
    })),
    viewAll: { href: "/services", label: "View all services" },
  },
  solutions: {
    items: solutions.map((s) => ({
      href: `/solutions/${s.slug}`,
      title: s.title,
      description: s.shortDescription,
      icon: s.icon,
    })),
    viewAll: { href: "/solutions", label: "View all solutions" },
  },
  industries: {
    items: industries.map((i) => ({
      href: `/industries/${i.slug}`,
      title: i.title,
      description: i.overview.slice(0, 64) + "…",
      icon: i.icon,
    })),
    viewAll: { href: "/industries", label: "View all industries" },
  },
} as const;

export function DesktopNav({ dark }: { dark?: boolean }) {
  const { t } = useTranslation();
  return (
    <NavigationMenuPrimitive.Root
      delayDuration={100}
      className="relative hidden lg:block"
    >
      <NavigationMenuPrimitive.List className="flex items-center gap-1">
        {mainNav.map((item) =>
          item.megaMenu ? (
            <NavigationMenuPrimitive.Item key={item.href}>
              <NavigationMenuPrimitive.Trigger
                className={cn(
                  "flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition-colors outline-none data-[state=open]:bg-muted/10",
                  dark ? "text-white/90 hover:text-white" : "text-foreground/90 hover:text-foreground"
                )}
              >
                {t(navLabelKeys[item.label] ?? item.label)}
              </NavigationMenuPrimitive.Trigger>
              {/* absolute: the content must not size itself from the viewport,
                  whose width tracks the content's measured width — a static
                  child fills the viewport's inner box (2px narrower than the
                  measurement, because of the border), which re-measures
                  smaller each cycle and shrinks the menu until it vanishes. */}
              <NavigationMenuPrimitive.Content className="absolute left-0 top-0 data-[motion=from-start]:animate-in data-[motion=from-end]:animate-in data-[motion=to-start]:animate-out data-[motion=to-end]:animate-out data-[motion=from-start]:slide-in-from-left-8 data-[motion=from-end]:slide-in-from-right-8 data-[motion=to-start]:slide-out-to-left-8 data-[motion=to-end]:slide-out-to-right-8 data-[motion=from-start]:fade-in data-[motion=from-end]:fade-in data-[motion=to-start]:fade-out data-[motion=to-end]:fade-out">
                <MegaMenuPanel menuKey={item.megaMenu} />
              </NavigationMenuPrimitive.Content>
            </NavigationMenuPrimitive.Item>
          ) : (
            <NavigationMenuPrimitive.Item key={item.href}>
              <NavigationMenuPrimitive.Link asChild>
                <Link
                  href={item.href}
                  className={cn(
                    "block rounded-full px-4 py-2 text-sm font-medium transition-colors",
                    dark ? "text-white/90 hover:text-white" : "text-foreground/90 hover:text-foreground"
                  )}
                >
                  {t(navLabelKeys[item.label] ?? item.label)}
                </Link>
              </NavigationMenuPrimitive.Link>
            </NavigationMenuPrimitive.Item>
          )
        )}
      </NavigationMenuPrimitive.List>

      <div className="absolute left-0 top-full flex justify-center perspective-[2000px]">
        <NavigationMenuPrimitive.Viewport className="relative mt-3 h-[var(--radix-navigation-menu-viewport-height)] w-[var(--radix-navigation-menu-viewport-width)] origin-top overflow-hidden rounded-2xl border border-border bg-card text-card-foreground shadow-2xl transition-[width,height] duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95" />
      </div>
    </NavigationMenuPrimitive.Root>
  );
}

function MegaMenuPanel({ menuKey }: { menuKey: keyof typeof megaMenus }) {
  const { t } = useTranslation();
  const menu = megaMenus[menuKey];
  return (
    <div className="w-[640px] p-6">
      <div className="grid grid-cols-2 gap-1">
        {menu.items.map((item) => {
          const Icon = item.icon;
          return (
            <NavigationMenuPrimitive.Link asChild key={item.href}>
              <Link
                href={item.href}
                className="group flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-muted"
              >
                <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted text-foreground transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                  <Icon className="size-[18px]" />
                </span>
                <span>
                  <span className="block text-sm font-medium">{item.title}</span>
                  <span className="mt-0.5 block text-xs text-muted-foreground line-clamp-1">
                    {item.description}
                  </span>
                </span>
              </Link>
            </NavigationMenuPrimitive.Link>
          );
        })}
      </div>
      <div className="mt-3 border-t border-border pt-3">
        <NavigationMenuPrimitive.Link asChild>
          <Link
            href={menu.viewAll.href}
            className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium text-accent hover:bg-muted"
          >
            {viewAllKeys[menuKey] ? t(viewAllKeys[menuKey]) : menu.viewAll.label}
            <ArrowRight className="size-4" />
          </Link>
        </NavigationMenuPrimitive.Link>
      </div>
    </div>
  );
}
