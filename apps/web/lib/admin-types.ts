import type { LeadStatus } from "@/lib/admin-constants";

// Shared with app/admin/(protected)/page.tsx and the notification center
// (components/admin/notification-center.tsx), which both consume the same
// /admin/dashboard response — kept here once instead of redefined per file.
export type LeadOut = {
  id: string;
  name: string;
  email: string;
  company: string | null;
  source: "contact" | "quote";
  service: string | null;
  budget: string | null;
  status: LeadStatus;
  created_at: string;
};

export type DashboardSummary = {
  new_leads: number;
  open_quote_requests: number;
  total_contact_messages: number;
  new_applications: number;
  recent_leads: LeadOut[];
};
