import { MessagesSquare, PhoneCall, Workflow } from "lucide-react";
import type { LucideIcon } from "lucide-react";

// AI-agent packages shown on /pricing. All visible copy lives in the i18n
// dictionaries under `agentPackages.<id>.*` (English + Albanian).
//
// To show real prices, fill in `setupPrice` / `monthlyPrice` (e.g. "€490").
// While they are null the card shows "Custom quote" instead of a number.
export interface AgentPackage {
  id: "starter" | "growth" | "business";
  icon: LucideIcon;
  featured?: boolean;
  setupPrice: string | null;
  monthlyPrice: string | null;
  /** Number of `agentPackages.<id>.feature<N>` keys to render. */
  featureCount: number;
}

export const agentPackages: AgentPackage[] = [
  { id: "starter", icon: MessagesSquare, setupPrice: "€390", monthlyPrice: "€49", featureCount: 6 },
  { id: "growth", icon: PhoneCall, featured: true, setupPrice: "€890", monthlyPrice: "€129", featureCount: 7 },
  { id: "business", icon: Workflow, setupPrice: null, monthlyPrice: null, featureCount: 7 },
];
