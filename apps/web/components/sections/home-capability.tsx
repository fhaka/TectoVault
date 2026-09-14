import { Code2, Cloud, Cpu, PenTool, Workflow } from "lucide-react";

import { Reveal } from "@/components/shared/reveal";
import { siteConfig } from "@/lib/site-config";

const capabilities = [
  { icon: Code2, label: "Web Development" },
  { icon: Cloud, label: "Cloud" },
  { icon: Cpu, label: "Software Engineering" },
  { icon: PenTool, label: "UI/UX" },
  { icon: Workflow, label: "Automation" },
];

export function HomeCapability() {
  const stats = siteConfig.stats;

  return (
    <section className="border-b border-border py-14">
      <div className="container-page">
        <div className="flex flex-wrap items-center justify-between gap-8">
          <Reveal className="flex flex-wrap items-center gap-x-10 gap-y-4">
            {capabilities.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2.5 text-sm font-medium text-muted-foreground">
                <Icon className="size-4 text-accent" />
                {label}
              </div>
            ))}
          </Reveal>

          {stats ? (
            <div className="flex flex-wrap gap-8">
              {stats.projects ? <Stat value={stats.projects} label="Projects" /> : null}
              {stats.clients ? <Stat value={stats.clients} label="Clients" /> : null}
              {stats.countries ? <Stat value={stats.countries} label="Countries" /> : null}
              {stats.years ? <Stat value={stats.years} label="Years" /> : null}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: number; label: string }) {
  return (
    <div>
      <div className="font-display text-2xl font-semibold">{value}+</div>
      <div className="text-xs uppercase tracking-wide text-muted-foreground">{label}</div>
    </div>
  );
}
