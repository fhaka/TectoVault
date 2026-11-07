import { MessagesSquare, PhoneCall, Workflow } from "lucide-react";
import type { LucideIcon } from "lucide-react";

// AI-agent packages. All visible copy lives in the i18n dictionaries under
// `agentPackages.<id>.*` (English + Albanian). Packages have no public
// prices: every button leads to a quote request.
export interface AgentPackage {
  id: "starter" | "growth" | "business";
  icon: LucideIcon;
  featured?: boolean;
  /** Number of `agentPackages.<id>.feature<N>` keys to render. */
  featureCount: number;
}

export const agentPackages: AgentPackage[] = [
  { id: "starter", icon: MessagesSquare, featureCount: 6 },
  { id: "growth", icon: PhoneCall, featured: true, featureCount: 7 },
  { id: "business", icon: Workflow, featureCount: 7 },
];
