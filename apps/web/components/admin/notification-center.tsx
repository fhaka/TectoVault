"use client";

import * as React from "react";
import Link from "next/link";
import { Bell, FileText, UserPlus } from "lucide-react";

import { cn, formatRelativeTime } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "@/lib/i18n/language-context";
import type { DashboardSummary } from "@/lib/admin-types";

type NotificationItem = {
  id: string;
  title: string;
  detail: string;
  href: string;
  createdAt: string | null;
  icon: "lead" | "application";
};

// `t` is threaded through instead of called at module scope so this stays a
// plain function (easy to unit-test / reuse) while still following the
// active locale — callers re-run this inside a useMemo keyed on `t`.
function buildNotifications(summary: DashboardSummary | null, t: (key: string) => string): NotificationItem[] {
  if (!summary) return [];

  const items: NotificationItem[] = summary.recent_leads
    .filter((lead) => lead.status === "new")
    .map((lead) => ({
      id: `lead-${lead.id}`,
      title: lead.name,
      detail: lead.source === "quote" ? t("admin.newQuoteRequest") : t("admin.newContactMessage"),
      href: lead.source === "quote" ? "/admin/quotes" : "/admin/messages",
      createdAt: lead.created_at,
      icon: "lead" as const,
    }));

  if (summary.new_applications > 0) {
    const applicationWord = summary.new_applications === 1 ? t("admin.newApplication") : t("admin.newApplications");
    items.push({
      id: "applications",
      title: `${summary.new_applications} ${applicationWord}`,
      detail: t("admin.awaitingReview"),
      href: "/admin/applications",
      createdAt: null,
      icon: "application" as const,
    });
  }

  return items;
}

function NotificationRow({ item }: { item: NotificationItem }) {
  return (
    <Link href={item.href} className="flex items-start gap-3 px-4 py-3 transition-colors hover:bg-muted">
      <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
        {item.icon === "application" ? <UserPlus className="size-4" /> : <FileText className="size-4" />}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm font-medium">{item.title}</span>
        <span className="block truncate text-xs text-muted-foreground">{item.detail}</span>
      </span>
      {item.createdAt ? (
        <span className="shrink-0 whitespace-nowrap text-xs text-muted-foreground">
          {formatRelativeTime(item.createdAt)}
        </span>
      ) : null}
    </Link>
  );
}

/**
 * Two places render this: the public-site navbar (variant="dropdown", a
 * bell button that opens a floating panel — only shown once an admin
 * session is detected server-side) and the admin dashboard itself
 * (variant="panel", the same data inline as a card). Both are built
 * entirely from the existing /admin/dashboard summary — no new backend
 * endpoint, no new npm dependency for the dropdown/positioning.
 */
export function NotificationCenter({
  summary,
  variant = "dropdown",
  dark = false,
}: {
  summary: DashboardSummary | null;
  variant?: "dropdown" | "panel";
  dark?: boolean;
}) {
  const { t } = useTranslation();
  const items = React.useMemo(() => buildNotifications(summary, t), [summary, t]);
  const [open, setOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!open) return;
    function onClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  if (variant === "panel") {
    return (
      <div className="rounded-2xl border border-border bg-card">
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <h2 className="text-sm font-medium">{t("admin.notifications")}</h2>
          {items.length > 0 ? (
            <Badge variant="accent">
              {items.length} {t("admin.new")}
            </Badge>
          ) : null}
        </div>
        {items.length > 0 ? (
          <div className="divide-y divide-border">
            {items.map((item) => (
              <NotificationRow key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <p className="px-6 py-10 text-center text-sm text-muted-foreground">{t("admin.notificationsEmpty")}</p>
        )}
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        aria-label={t("admin.notifications")}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "relative flex size-10 items-center justify-center rounded-full transition-colors",
          dark ? "text-white hover:bg-white/10" : "text-foreground hover:bg-muted"
        )}
      >
        <Bell className="size-5" />
        {items.length > 0 ? (
          <span className="absolute right-1.5 top-1.5 flex size-4 items-center justify-center rounded-full bg-accent text-[10px] font-semibold text-accent-foreground">
            {items.length > 9 ? "9+" : items.length}
          </span>
        ) : null}
      </button>

      {open ? (
        <div className="absolute right-0 top-full z-50 mt-2 w-80 overflow-hidden rounded-2xl border border-border bg-card text-foreground shadow-xl">
          <div className="border-b border-border px-4 py-3">
            <p className="text-sm font-medium">{t("admin.notifications")}</p>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {items.length > 0 ? (
              <div className="divide-y divide-border">
                {items.map((item) => (
                  <NotificationRow key={item.id} item={item} />
                ))}
              </div>
            ) : (
              <p className="px-4 py-8 text-center text-sm text-muted-foreground">{t("admin.notificationsEmpty")}</p>
            )}
          </div>
          <div className="border-t border-border px-4 py-2.5">
            <Link href="/admin" className="text-xs font-medium text-accent hover:underline" onClick={() => setOpen(false)}>
              {t("admin.goToDashboard")}
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  );
}
