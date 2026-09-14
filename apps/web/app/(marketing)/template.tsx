import { PageTransition } from "@/components/layout/page-transition";

// Templates remount on each App Router navigation, giving every marketing
// page a clear transition boundary while the persistent site chrome remains.
export default function MarketingTemplate({ children }: { children: React.ReactNode }) {
  return <PageTransition>{children}</PageTransition>;
}
