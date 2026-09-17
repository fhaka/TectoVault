import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { adminFetchJson } from "@/lib/admin-api";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { LogoutButton } from "@/components/admin/logout-button";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

type CurrentUser = { id: string; email: string; name: string; role: string };

// The real authorization check (see proxy.ts for why it isn't there):
// every load of an admin page asks the backend who the token belongs to.
// An expired, forged, or missing token gets a 401 and we bounce to login.
export default async function ProtectedAdminLayout({ children }: { children: React.ReactNode }) {
  const user = await adminFetchJson<CurrentUser>("/auth/me");

  if (!user) {
    redirect("/admin/login");
  }

  return (
    <div className="flex min-h-screen bg-muted/20">
      <aside className="hidden w-64 shrink-0 border-r border-border bg-card sm:block">
        <div className="border-b border-border px-6 py-5">
          <p className="font-display text-base font-medium tracking-tight">{siteConfig.name}</p>
          <p className="text-xs text-muted-foreground">Admin panel</p>
        </div>
        <AdminSidebar />
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex min-w-0 items-center justify-between border-b border-border bg-card px-4 py-3 sm:px-6 sm:py-4">
          <div className="sm:hidden">
            <p className="font-display text-sm font-medium">{siteConfig.name} Admin</p>
          </div>
          <div className="ml-auto flex min-w-0 items-center gap-2 sm:gap-4">
            <span className="hidden truncate text-sm text-muted-foreground min-[430px]:block">{user.email}</span>
            <LogoutButton />
          </div>
        </header>
        <div className="border-b border-border bg-card sm:hidden">
          <AdminSidebar />
        </div>
        <main className="min-w-0 flex-1 p-4 sm:p-8">{children}</main>
      </div>
    </div>
  );
}
