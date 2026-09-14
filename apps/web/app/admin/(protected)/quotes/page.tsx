import Link from "next/link";

import { adminFetchJson } from "@/lib/admin-api";

type QuoteOut = {
  id: string;
  project_type: string;
  budget: string;
  timeline: string;
  name: string;
  email: string;
  company: string | null;
  created_at: string;
};

export default async function AdminQuotesPage() {
  const quotes = (await adminFetchJson<QuoteOut[]>("/admin/quotes")) ?? [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-medium tracking-tight">Quote requests</h1>
        <p className="mt-1 text-sm text-muted-foreground">Project requests submitted through the quote wizard.</p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-card">
        {quotes.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-border text-xs uppercase tracking-wide text-muted-foreground">
                  <th className="px-6 py-3 font-medium">Name</th>
                  <th className="px-6 py-3 font-medium">Project type</th>
                  <th className="px-6 py-3 font-medium">Budget</th>
                  <th className="px-6 py-3 font-medium">Timeline</th>
                  <th className="px-6 py-3 font-medium">Received</th>
                  <th className="px-6 py-3 font-medium" />
                </tr>
              </thead>
              <tbody>
                {quotes.map((quote) => (
                  <tr key={quote.id} className="border-b border-border last:border-0">
                    <td className="px-6 py-3.5">
                      <p className="font-medium">{quote.name}</p>
                      <p className="text-xs text-muted-foreground">{quote.email}</p>
                      {quote.company ? <p className="text-xs text-muted-foreground">{quote.company}</p> : null}
                    </td>
                    <td className="px-6 py-3.5 capitalize text-muted-foreground">
                      {quote.project_type.replace(/-/g, " ")}
                    </td>
                    <td className="px-6 py-3.5 text-muted-foreground">{quote.budget.replace(/-/g, " ")}</td>
                    <td className="px-6 py-3.5 text-muted-foreground">{quote.timeline.replace(/-/g, " ")}</td>
                    <td className="px-6 py-3.5 whitespace-nowrap text-muted-foreground">
                      {new Date(quote.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-3.5 text-right">
                      <Link href={`/admin/quotes/${quote.id}`} className="text-sm font-medium text-accent hover:underline">
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="px-6 py-10 text-center text-sm text-muted-foreground">No quote requests yet.</p>
        )}
      </div>
    </div>
  );
}
