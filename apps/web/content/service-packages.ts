import {
  Boxes,
  Building2,
  Gauge,
  HardDrive,
  LayoutTemplate,
  Rocket,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Zap,
  Workflow,
  Globe,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { agentPackages } from "@/content/agent-packages";

// Packages for every service, shown on /pricing. None has a public price:
// each one leads to a quote request. Copy lives in the i18n dictionaries
// (see packageKey); AI agent packages keep their `agentPackages.*` keys.

export type PackageService =
  | "ai-agents"
  | "business-automation"
  | "custom-software"
  | "web-development"
  | "maintenance-support";

export interface ServicePackage {
  id: string;
  icon: LucideIcon;
  featured?: boolean;
  /** Number of `<packageKey>.feature<N>` keys to render. */
  featureCount: number;
}

export const packageServices: PackageService[] = [
  "ai-agents",
  "business-automation",
  "custom-software",
  "web-development",
  "maintenance-support",
];

export const servicePackages: Record<PackageService, ServicePackage[]> = {
  "ai-agents": agentPackages,
  "business-automation": [
    { id: "essentials", icon: Zap, featureCount: 6 },
    { id: "operations", icon: Workflow, featured: true, featureCount: 7 },
    { id: "enterprise", icon: Building2, featureCount: 6 },
  ],
  "custom-software": [
    { id: "mvp", icon: Rocket, featureCount: 6 },
    { id: "product", icon: Boxes, featured: true, featureCount: 7 },
    { id: "enterprise", icon: ShieldCheck, featureCount: 6 },
  ],
  "web-development": [
    { id: "landing", icon: LayoutTemplate, featureCount: 6 },
    { id: "business", icon: Globe, featured: true, featureCount: 7 },
    { id: "commerce", icon: ShoppingCart, featureCount: 6 },
  ],
  "maintenance-support": [
    { id: "basic", icon: HardDrive, featureCount: 6 },
    { id: "pro", icon: Gauge, featured: true, featureCount: 6 },
    { id: "managed", icon: Sparkles, featureCount: 6 },
  ],
};

/** Dictionary prefix for a package's copy (name, tagline, bestFor, featureN). */
export function packageKey(service: PackageService, id: string) {
  return service === "ai-agents" ? `agentPackages.${id}` : `servicePackages.${service}.${id}`;
}

export function findPackage(service: PackageService, id: string | null | undefined) {
  return id ? servicePackages[service].find((p) => p.id === id) ?? null : null;
}

export function isPackageService(value: string): value is PackageService {
  return (packageServices as string[]).includes(value);
}
