import Link from "next/link";

import { adminFetchJson } from "@/lib/admin-api";
import { updateLeadStatus } from "@/lib/admin-actions";
import { leadStatusLabels, leadStatusOptions, type LeadStatus } from "@/lib/admin-constants";
import { StatusSelect } from "@/components/admin/status-select";
import { cn } from "@/lib/utils";

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

export default async function AdminLeadsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;
  const query = status ? `?status=${encodeURIComponent(status)}` : "";
  const leads = (await adminFetchJson<LeadOut[]>(`/admin/leads${query}`)) ?? [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-medium tracking-tight">Leads</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Every contact message and quote request in one pipeline.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        <Link
          href="/admin/leads"
          className={cn(
            "rounded-full border px-3.5 py-1.5 text-xs font-medium",
            !status ? "border-accent bg-accent/10 text-accent" : "border-border text-muted-foreground hover:border-accent/50"
          )}
        >
          All
        </Link>
        {leadStatusOptions.map((option) => (
          <Link
            key={option}
            href={`/admin/leads?status=${option}`}
            className={cn(
              "rounded-full border px-3.5 py-1.5 text-xs font-medium",
              status === option
                ? "border-accent bg-accent/10 text-accent"
                : "border-border text-muted-foreground hover:border-accent/50"
            )}
          >
            {leadStatusLabels[option]}
          </Link>
        ))}
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-card">
        {leads.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-border text-xs uppercase tracking-wide text-muted-foreground">
                  <th className="px-6 py-3 font-medium">Name</th>
                  <th className="px-6 py-3 font-medium">Source</th>
                  <th className="px-6 py-3 font-medium">Service / Budget</th>
                  <th className="px-6 py-3 font-medium">Status</th>
                  <th className="px-6 py-3 font-medium">Received</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead) => (
                  <tr key={lead.id} className="border-b border-border last:border-0">
                    <td className="px-6 py-3.5">
                      <p className="font-medium">{lead.name}</p>
                      <p className="text-xs text-muted-foreground">{lead.email}</p>
                      {lead.company ? <p className="text-xs text-muted-foreground">{lead.company}</p> : null}
                    </td>
                    <td className="px-6 py-3.5 capitalize text-muted-foreground">{lead.source}</td>
                    <td className="px-6 py-3.5 text-muted-foreground">
                      {[lead.service, lead.budget].filter(Boolean).join(" · ") || "—"}
                    </td>
                    <td className="px-6 py-3.5">
                      <StatusSelect
                        id={lead.id}
                        value={lead.status}
                        options={leadStatusOptions}
                        labels={leadStatusLabels}
                        onChange={updateLeadStatus}
                      />
                    </td>
                    <td className="px-6 py-3.5 whitespace-nowrap text-muted-foreground">
                      {new Date(lead.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="px-6 py-10 text-center text-sm text-muted-foreground">No leads found.</p>
        )}
      </div>
    </div>
  );
}
