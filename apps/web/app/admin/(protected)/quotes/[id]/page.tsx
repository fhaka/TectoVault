import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { adminFetchJson } from "@/lib/admin-api";

type QuoteOut = {
  id: string;
  project_type: string;
  description: string;
  budget: string;
  timeline: string;
  name: string;
  email: string;
  company: string | null;
  phone: string | null;
  company_website: string | null;
  attachments: string[] | null;
  created_at: string;
};

export default async function AdminQuoteDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const quote = await adminFetchJson<QuoteOut>(`/admin/quotes/${id}`);

  if (!quote) {
    notFound();
  }

  const fields: { label: string; value: React.ReactNode }[] = [
    { label: "Name", value: quote.name },
    { label: "Email", value: <a href={`mailto:${quote.email}`} className="text-accent hover:underline">{quote.email}</a> },
    { label: "Company", value: quote.company ?? "—" },
    { label: "Phone", value: quote.phone ?? "—" },
    { label: "Company website", value: quote.company_website ?? "—" },
    { label: "Project type", value: <span className="capitalize">{quote.project_type.replace(/-/g, " ")}</span> },
    { label: "Budget", value: quote.budget.replace(/-/g, " ") },
    { label: "Timeline", value: quote.timeline.replace(/-/g, " ") },
    { label: "Received", value: new Date(quote.created_at).toLocaleString() },
  ];

  return (
    <div className="max-w-3xl space-y-6">
      <Link href="/admin/quotes" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="size-4" /> Back to quote requests
      </Link>

      <div>
        <h1 className="text-2xl font-display font-medium tracking-tight">Quote request</h1>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6">
        <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {fields.map((field) => (
            <div key={field.label}>
              <dt className="text-xs uppercase tracking-wide text-muted-foreground">{field.label}</dt>
              <dd className="mt-1 text-sm">{field.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6">
        <h2 className="text-xs uppercase tracking-wide text-muted-foreground">Project description</h2>
        <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed">{quote.description}</p>
      </div>

      {quote.attachments && quote.attachments.length > 0 ? (
        <div className="rounded-2xl border border-border bg-card p-6">
          <h2 className="text-xs uppercase tracking-wide text-muted-foreground">
            Attachments (filenames only — file storage not yet configured)
          </h2>
          <ul className="mt-3 space-y-1 text-sm">
            {quote.attachments.map((name) => (
              <li key={name} className="text-muted-foreground">
                {name}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
