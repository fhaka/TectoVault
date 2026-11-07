import { Bot, Cpu, Globe, Server, Workflow } from "lucide-react";

import { Reveal } from "@/components/shared/reveal";
import { siteConfig } from "@/lib/site-config";
import { getTx } from "@/lib/i18n/server";

const capabilities = [
  { icon: Bot, label: "AI Agents" },
  { icon: Workflow, label: "Business Automation" },
  { icon: Cpu, label: "Custom Software & Apps" },
  { icon: Globe, label: "Websites" },
  { icon: Server, label: "Hosting & Support" },
];

export async function HomeCapability() {
  const tx = await getTx();
  const stats = siteConfig.stats;

  return (
    <section className="border-b border-border py-14">
      <div className="container-page">
        <div className="flex flex-wrap items-center justify-between gap-8">
          <Reveal className="flex flex-wrap items-center gap-x-10 gap-y-4">
            {capabilities.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2.5 text-sm font-medium text-muted-foreground">
                <Icon className="size-4 text-accent" />
                {tx(label)}
              </div>
            ))}
          </Reveal>

          {stats ? (
            <div className="flex flex-wrap gap-8">
              {stats.projects ? <Stat value={stats.projects} label={tx("Projects")} /> : null}
              {stats.clients ? <Stat value={stats.clients} label={tx("Clients")} /> : null}
              {stats.countries ? <Stat value={stats.countries} label={tx("Countries")} /> : null}
              {stats.years ? <Stat value={stats.years} label={tx("Years")} /> : null}
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
