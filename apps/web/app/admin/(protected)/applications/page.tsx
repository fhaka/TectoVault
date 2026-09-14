import Link from "next/link";

import { adminFetchJson } from "@/lib/admin-api";
import { updateApplicationStatus } from "@/lib/admin-actions";
import { applicationStatusLabels, applicationStatusOptions, type ApplicationStatus } from "@/lib/admin-constants";
import { StatusSelect } from "@/components/admin/status-select";
import { cn } from "@/lib/utils";

type JobApplicationOut = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  linkedin: string | null;
  portfolio: string | null;
  cover_letter: string | null;
  cv_filename: string | null;
  job_slug: string | null;
  status: ApplicationStatus;
  created_at: string;
};

export default async function AdminApplicationsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;
  const query = status ? `?status=${encodeURIComponent(status)}` : "";
  const applications = (await adminFetchJson<JobApplicationOut[]>(`/admin/applications${query}`)) ?? [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-medium tracking-tight">Applications</h1>
        <p className="mt-1 text-sm text-muted-foreground">Candidates who applied through the careers page.</p>
      </div>

      <div className="flex flex-wrap gap-2">
        <Link
          href="/admin/applications"
          className={cn(
            "rounded-full border px-3.5 py-1.5 text-xs font-medium",
            !status ? "border-accent bg-accent/10 text-accent" : "border-border text-muted-foreground hover:border-accent/50"
          )}
        >
          All
        </Link>
        {applicationStatusOptions.map((option) => (
          <Link
            key={option}
            href={`/admin/applications?status=${option}`}
            className={cn(
              "rounded-full border px-3.5 py-1.5 text-xs font-medium",
              status === option
                ? "border-accent bg-accent/10 text-accent"
                : "border-border text-muted-foreground hover:border-accent/50"
            )}
          >
            {applicationStatusLabels[option]}
          </Link>
        ))}
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-card">
        {applications.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-border text-xs uppercase tracking-wide text-muted-foreground">
                  <th className="px-6 py-3 font-medium">Name</th>
                  <th className="px-6 py-3 font-medium">Role</th>
                  <th className="px-6 py-3 font-medium">Links</th>
                  <th className="px-6 py-3 font-medium">Status</th>
                  <th className="px-6 py-3 font-medium">Applied</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((application) => (
                  <tr key={application.id} className="border-b border-border last:border-0 align-top">
                    <td className="px-6 py-3.5">
                      <p className="font-medium">{application.name}</p>
                      <p className="text-xs text-muted-foreground">{application.email}</p>
                      {application.phone ? <p className="text-xs text-muted-foreground">{application.phone}</p> : null}
                    </td>
                    <td className="px-6 py-3.5 text-muted-foreground">
                      {application.job_slug ?? "General application"}
                      {application.cover_letter ? (
                        <p className="mt-1 max-w-xs truncate text-xs">{application.cover_letter}</p>
                      ) : null}
                    </td>
                    <td className="px-6 py-3.5 text-sm">
                      <div className="flex flex-col gap-1">
                        {application.linkedin ? (
                          <a href={application.linkedin} target="_blank" rel="noreferrer" className="text-accent hover:underline">
                            LinkedIn
                          </a>
                        ) : null}
                        {application.portfolio ? (
                          <a href={application.portfolio} target="_blank" rel="noreferrer" className="text-accent hover:underline">
                            Portfolio
                          </a>
                        ) : null}
                        {application.cv_filename ? (
                          <span className="text-xs text-muted-foreground">{application.cv_filename}</span>
                        ) : null}
                        {!application.linkedin && !application.portfolio && !application.cv_filename ? (
                          <span className="text-muted-foreground">—</span>
                        ) : null}
                      </div>
                    </td>
                    <td className="px-6 py-3.5">
                      <StatusSelect
                        id={application.id}
                        value={application.status}
                        options={applicationStatusOptions}
                        labels={applicationStatusLabels}
                        onChange={updateApplicationStatus}
                      />
                    </td>
                    <td className="px-6 py-3.5 whitespace-nowrap text-muted-foreground">
                      {new Date(application.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="px-6 py-10 text-center text-sm text-muted-foreground">No applications yet.</p>
        )}
      </div>
    </div>
  );
}
