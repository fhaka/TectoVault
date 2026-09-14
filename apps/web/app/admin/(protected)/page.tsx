import Link from "next/link";

import { adminFetchJson } from "@/lib/admin-api";
import { leadStatusLabels, type LeadStatus } from "@/lib/admin-constants";
import { Badge } from "@/components/ui/badge";

type LeadOut = {
  id: string;
  name: string;
  email: string;
  company: string | null;
  source: "contact" | "quote";
  service: string | null;
  budget: string | null;
  status: LeadStatus;
  created_at: string;
};

type DashboardSummary = {
  new_leads: number;
  open_quote_requests: number;
  total_contact_messages: number;
  new_applications: number;
  recent_leads: LeadOut[];
};

export default async function AdminDashboardPage() {
  const summary = await adminFetchJson<DashboardSummary>("/admin/dashboard");

  const cards = [
    { label: "New leads", value: summary?.new_leads ?? 0, href: "/admin/leads" },
    { label: "Quote requests", value: summary?.open_quote_requests ?? 0, href: "/admin/quotes" },
    { label: "Contact messages", value: summary?.total_contact_messages ?? 0, href: "/admin/messages" },
    { label: "New applications", value: summary?.new_applications ?? 0, href: "/admin/applications" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-display font-medium tracking-tight">Dashboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">An overview of incoming leads and activity.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="rounded-2xl border border-border bg-card p-6 transition-colors hover:border-accent/50"
          >
            <p className="text-3xl font-display font-medium tracking-tight">{card.value}</p>
            <p className="mt-1 text-sm text-muted-foreground">{card.label}</p>
          </Link>
        ))}
      </div>

      <div className="rounded-2xl border border-border bg-card">
        <div className="border-b border-border px-6 py-4">
          <h2 className="text-sm font-medium">Recent leads</h2>
        </div>
        {summary && summary.recent_leads.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-border text-xs uppercase tracking-wide text-muted-foreground">
                  <th className="px-6 py-3 font-medium">Name</th>
                  <th className="px-6 py-3 font-medium">Source</th>
                  <th className="px-6 py-3 font-medium">Status</th>
                  <th className="px-6 py-3 font-medium">Received</th>
                </tr>
              </thead>
              <tbody>
                {summary.recent_leads.map((lead) => (
                  <tr key={lead.id} className="border-b border-border last:border-0">
                    <td className="px-6 py-3.5">
                      <p className="font-medium">{lead.name}</p>
                      <p className="text-xs text-muted-foreground">{lead.email}</p>
                    </td>
                    <td className="px-6 py-3.5 capitalize text-muted-foreground">{lead.source}</td>
                    <td className="px-6 py-3.5">
                      <Badge variant="outline">{leadStatusLabels[lead.status]}</Badge>
                    </td>
                    <td className="px-6 py-3.5 text-muted-foreground">
                      {new Date(lead.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="px-6 py-10 text-center text-sm text-muted-foreground">No leads yet.</p>
        )}
      </div>
    </div>
  );
}
