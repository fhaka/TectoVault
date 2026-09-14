import { siteConfig } from "@/lib/site-config";

export function LegalLayout({
  title,
  lastUpdated,
  children,
}: {
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
}) {
  return (
    <article className="pb-24 pt-36 md:pt-44">
      <div className="container-page max-w-3xl">
        <h1 className="text-4xl font-medium tracking-tight">{title}</h1>
        <p className="mt-3 text-sm text-muted-foreground">Last updated: {lastUpdated}</p>
        <p className="mt-2 text-sm text-muted-foreground">
          This is a standard template. Please have it reviewed by a qualified professional
          before relying on it, and replace all bracketed placeholders with {siteConfig.name}&rsquo;s
          real details.
        </p>

        <div className="prose-legal mt-12 space-y-8 text-sm leading-relaxed text-foreground [&_h2]:mt-10 [&_h2]:text-lg [&_h2]:font-medium [&_p]:mt-3 [&_p]:text-muted-foreground [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5 [&_ul]:text-muted-foreground">
          {children}
        </div>
      </div>
    </article>
  );
}
