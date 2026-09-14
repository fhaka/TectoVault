"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, FileText, Mail, Briefcase } from "lucide-react";

import { cn } from "@/lib/utils";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/leads", label: "Leads", icon: Users },
  { href: "/admin/quotes", label: "Quote requests", icon: FileText },
  { href: "/admin/messages", label: "Messages", icon: Mail },
  { href: "/admin/applications", label: "Applications", icon: Briefcase },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <nav className="flex gap-1 overflow-x-auto p-3 sm:flex-col sm:overflow-visible sm:p-4">
      {navItems.map((item) => {
        const isActive = item.exact ? pathname === item.href : pathname.startsWith(item.href);
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex shrink-0 items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors sm:gap-3",
              isActive
                ? "bg-accent/10 text-accent"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <Icon className="size-4" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
