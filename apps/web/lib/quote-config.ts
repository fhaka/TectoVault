import {
  Bot,
  Workflow,
  LayoutGrid,
  Smartphone,
  Cpu,
  Plug,
  Network,
  Globe,
  Cloud,
  LifeBuoy,
  HelpCircle,
} from "lucide-react";

// Kept centralized and easy to edit — per spec section 15, budget values
// must be configurable rather than hard-coded throughout the UI.

export const projectTypeOptions = [
  { value: "ai-agents", label: "AI Agents", icon: Bot },
  { value: "business-automation", label: "Business Automation", icon: Workflow },
  { value: "website", label: "Website", icon: Globe },
  { value: "web-application", label: "Web Application", icon: LayoutGrid },
  { value: "mobile-application", label: "Mobile Application", icon: Smartphone },
  { value: "custom-software", label: "Custom Software", icon: Cpu },
  { value: "ai-integration", label: "AI Integration", icon: Plug },
  { value: "intelligent-operations", label: "Intelligent Operations", icon: Network },
  { value: "cloud-devops", label: "Cloud / DevOps", icon: Cloud },
  { value: "maintenance-support", label: "Maintenance / Support", icon: LifeBuoy },
  { value: "other", label: "Other", icon: HelpCircle },
] as const;

export const budgetOptions = [
  { value: "under-1000", label: "Under €1,000" },
  { value: "1000-3000", label: "€1,000 – €3,000" },
  { value: "3000-10000", label: "€3,000 – €10,000" },
  { value: "10000-plus", label: "€10,000+" },
  { value: "not-sure", label: "Not sure" },
] as const;

export const timelineOptions = [
  { value: "asap", label: "ASAP" },
  { value: "1-3-months", label: "1–3 months" },
  { value: "3-6-months", label: "3–6 months" },
  { value: "flexible", label: "Flexible" },
] as const;

export const acceptedFileTypes = [".pdf", ".doc", ".docx", ".png", ".jpg", ".jpeg", ".zip"];
export const maxFileSizeMb = 10;
export const maxFiles = 5;
