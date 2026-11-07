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

export interface ProcessStage {
  number: string;
  title: string;
  whatHappens: string;
  whatClientReceives: string;
  whatsNext: string;
}
