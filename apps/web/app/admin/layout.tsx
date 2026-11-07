import type { Metadata } from "next";
import { Toaster } from "sonner";

import "@fontsource-variable/inter";
import "@fontsource-variable/manrope";
import "../globals.css";
import { siteConfig } from "@/lib/site-config";
import { Providers } from "@/components/layout/providers";

// The admin panel has its own root layout: it lives outside the localized
// /[locale] tree and is English-only.
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: `Admin — ${siteConfig.name}`, template: `%s — ${siteConfig.name} admin` },
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="flex min-h-full flex-col">
        <Providers locale="en">
          {children}
          <Toaster position="bottom-right" richColors />
        </Providers>
      </body>
    </html>
  );
}
