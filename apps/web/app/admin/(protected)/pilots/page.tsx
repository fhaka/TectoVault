import Link from "next/link";
import { AlertTriangle, Rocket } from "lucide-react";

import { adminFetchJson } from "@/lib/admin-api";
import { updatePilotStatus } from "@/lib/admin-actions";
import { PILOT_DAYS, pilotStatusLabels, pilotStatusOptions, type PilotStatus } from "@/lib/admin-constants";
import type { PilotOut } from "@/lib/admin-types";
import { StatusSelect } from "@/components/admin/status-select";
import { PilotNotes } from "@/components/admin/pilot-notes";
import { cn } from "@/lib/utils";

type Availability = { total: number; taken: number; left: number; open: boolean };

const groups: { title: string; hint: string; statuses: PilotStatus[] }[] = [
  {
    title: "Applications",
    hint: "New applications. Book a call, then set them to Setting up once accepted. Accepting takes a place.",
    statuses: ["applied", "call_booked"],
  },
  {
    title: "Running",
    hint: "Set a pilot to Live when the agent starts answering real customers: the 30 days start then.",
    statuses: ["setting_up", "live", "review"],
  },
  { title: "Finished", hint: "", statuses: ["converted", "ended", "declined"] },
];

function pilotDay(startedAt: string | null): number | null {
  if (!startedAt) return null;
  const days = Math.floor((Date.now() - new Date(startedAt).getTime()) / 86_400_000) + 1;
  return Math.max(days, 1);
}

export default async function AdminPilotsPage() {
  const [pilots, availability] = await Promise.all([
    adminFetchJson<PilotOut[]>("/admin/pilots").then((p) => p ?? []),
    adminFetchJson<Availability>("/pilot/availability"),
  ]);

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-medium tracking-tight">Pilot programme</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Applications from the &ldquo;Apply for the pilot&rdquo; button, and the pilots you&rsquo;re running.
          </p>
        </div>
        {availability ? (
          <div className="flex items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3">
            <div className="flex gap-1.5" aria-hidden="true">
              {Array.from({ length: availability.total }, (_, i) => (
                <span key={i} className={cn("size-2.5 rounded-full", i < availability.taken ? "bg-muted-foreground/30" : "bg-accent")} />
              ))}
            </div>
            <p className="text-sm">
              <span className="font-semibold">{availability.left}</span> of {availability.total} places left
              <span className="block text-xs text-muted-foreground">
                {availability.open ? "Shown on the website" : "Website shows the waiting list"}
              </span>
            </p>
          </div>
        ) : null}
      </div>

      {groups.map((group) => {
        const items = pilots.filter((p) => group.statuses.includes(p.status));
        return (
          <section key={group.title} className="space-y-3">
            <div>
              <h2 className="text-sm font-semibold">
                {group.title} <span className="text-muted-foreground">({items.length})</span>
              </h2>
              {group.hint ? <p className="text-xs text-muted-foreground">{group.hint}</p> : null}
            </div>
            {items.length === 0 ? (
              <p className="rounded-2xl border border-dashed border-border px-6 py-6 text-center text-sm text-muted-foreground">
                Nothing here yet.
              </p>
            ) : (
              <div className="grid gap-3 lg:grid-cols-2">
                {items.map((pilot) => {
                  const day = pilotDay(pilot.started_at);
                  const reviewDue = pilot.status === "review" || (pilot.status === "live" && day !== null && day >= PILOT_DAYS);
                  return (
                    <article key={pilot.id} className="space-y-4 rounded-2xl border border-border bg-card p-5">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="font-medium">{pilot.company || pilot.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {pilot.company ? `${pilot.name} · ` : ""}
                            <a href={`mailto:${pilot.email}`} className="hover:text-accent">{pilot.email}</a>
                            {pilot.phone ? ` · ${pilot.phone}` : ""}
                          </p>
                          <p className="mt-1 text-xs text-muted-foreground">
                            Applied {new Date(pilot.created_at).toLocaleDateString()}
                            {pilot.quote_request_id ? (
                              <>
                                {" · "}
                                <Link href={`/admin/quotes/${pilot.quote_request_id}`} className="text-accent hover:underline">
                                  Application
                                </Link>
                              </>
                            ) : null}
                          </p>
                        </div>
                        <StatusSelect
                          id={pilot.id}
                          value={pilot.status}
                          options={pilotStatusOptions}
                          labels={pilotStatusLabels}
                          onChange={updatePilotStatus}
                        />
                      </div>

                      {day !== null && ["live", "review"].includes(pilot.status) ? (
                        <div>
                          <div className="flex items-center justify-between text-xs">
                            <span className="flex items-center gap-1.5 font-medium">
                              <Rocket className="size-3.5 text-accent" />
                              Day {Math.min(day, PILOT_DAYS)} of {PILOT_DAYS}
                              <span className="font-normal text-muted-foreground">
                                · started {new Date(pilot.started_at!).toLocaleDateString()}
                              </span>
                            </span>
                            {reviewDue ? (
                              <span className="flex items-center gap-1 rounded-full bg-amber-500/15 px-2 py-0.5 font-medium text-amber-700">
                                <AlertTriangle className="size-3" /> Review due
                              </span>
                            ) : null}
                          </div>
                          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
                            <div
                              className="h-full origin-left rounded-full bg-accent"
                              style={{ transform: `scaleX(${Math.min(day / PILOT_DAYS, 1)})` }}
                            />
                          </div>
                        </div>
                      ) : null}

                      <PilotNotes id={pilot.id} initial={pilot.notes} />
                    </article>
                  );
                })}
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
}
