"use client";

import * as React from "react";
import { useTransition } from "react";

import { updatePilotNotes } from "@/lib/admin-actions";

export function PilotNotes({ id, initial }: { id: string; initial: string | null }) {
  const [value, setValue] = React.useState(initial ?? "");
  const [saved, setSaved] = React.useState(initial ?? "");
  const [isPending, startTransition] = useTransition();
  const [failed, setFailed] = React.useState(false);
  const dirty = value !== saved;

  return (
    <div className="space-y-2">
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        rows={2}
        maxLength={5000}
        placeholder="Notes: channel, goals, results so far…"
        className="w-full resize-y rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
      />
      {dirty || failed ? (
        <div className="flex items-center gap-3">
          <button
            type="button"
            disabled={isPending || !dirty}
            onClick={() =>
              startTransition(async () => {
                setFailed(false);
                const result = await updatePilotNotes(id, value);
                if (result.ok) setSaved(value);
                else setFailed(true);
              })
            }
            className="rounded-full bg-accent px-3.5 py-1.5 text-xs font-medium text-accent-foreground disabled:opacity-50"
          >
            {isPending ? "Saving…" : "Save notes"}
          </button>
          {failed ? <span className="text-[11px] text-destructive">Save failed. Try again.</span> : null}
        </div>
      ) : null}
    </div>
  );
}
