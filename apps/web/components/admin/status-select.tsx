"use client";

import * as React from "react";
import { useTransition } from "react";

import { cn } from "@/lib/utils";

type StatusSelectProps<T extends string> = {
  id: string;
  value: T;
  options: readonly T[];
  labels: Record<T, string>;
  onChange: (id: string, status: T) => Promise<{ ok: boolean }>;
};

export function StatusSelect<T extends string>({ id, value, options, labels, onChange }: StatusSelectProps<T>) {
  const [current, setCurrent] = React.useState(value);
  const [isPending, startTransition] = useTransition();
  const [failed, setFailed] = React.useState(false);

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const next = e.target.value as T;
    const previous = current;
    setCurrent(next);
    setFailed(false);
    startTransition(async () => {
      const result = await onChange(id, next);
      if (!result.ok) {
        setCurrent(previous);
        setFailed(true);
      }
    });
  }

  return (
    <div className="inline-flex flex-col gap-1">
      <select
        value={current}
        onChange={handleChange}
        disabled={isPending}
        className={cn(
          "h-8 rounded-full border border-border bg-transparent px-3 text-xs font-medium capitalize outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring",
          isPending && "opacity-60"
        )}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {labels[option]}
          </option>
        ))}
      </select>
      {failed ? <span className="text-[11px] text-destructive">Update failed — try again.</span> : null}
    </div>
  );
}
