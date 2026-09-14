import type { LucideIcon } from "lucide-react";

export interface Service {
  slug: string;
  icon: LucideIcon;
  title: string;
  shortDescription: string;
  overview: string;
  capabilities: string[];
  whatWeBuild: string[];
  technology: string[];
  faq: { question: string; answer: string }[];
}

export interface Solution {
  slug: string;
  icon: LucideIcon;
  title: string;
  problem: string;
  shortDescription: string;
  solution: string;
  features: string[];
  benefits: string[];
  technology: string[];
}

export interface Industry {
  slug: string;
  icon: LucideIcon;
  title: string;
  overview: string;
  problems: string[];
  relatedSolutions: string[]; // solution slugs
  relatedServices: string[]; // service slugs
}

export type ProjectCategory =
  | "Websites"
  | "Applications"
  | "E-Commerce"
  | "Software"
  | "Cloud";

export interface Project {
  slug: string;
  name: string;
  industry: string;
  category: ProjectCategory;
  description: string;
  technology: string[];
  isPlaceholder?: boolean;
  /** 4:3 screenshot under /public/images/work — cards fall back to abstract art without it. */
  image?: string;
  /** Optional additional screenshots for a hover/drag carousel on the work card. */
  images?: string[];
  /** Public production URL, when the project is live. */
  liveUrl?: string;
  challenge: string;
  solution: string;
  architecture: string;
  /** Only publish real, confirmed results — section is hidden when omitted. */
  results?: string[];
}

export interface ProcessStage {
  number: string;
  title: string;
  whatHappens: string;
  whatClientReceives: string;
  whatsNext: string;
}
