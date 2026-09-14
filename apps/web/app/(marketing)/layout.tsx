import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";

// The public marketing site's chrome (header + footer). Kept out of the
// root layout so /admin can render its own shell instead — visitors get
// the marketing nav, admins get a dashboard shell, neither leaks into
// the other.
export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </>
  );
}
