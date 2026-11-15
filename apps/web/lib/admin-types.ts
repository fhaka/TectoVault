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
  chats_last_7_days: number;
  new_pilot_applications: number;
  active_pilots: number;
  pilots_review_due: number;
  pilot_places_left: number;
};

export type PilotOut = {
  id: string;
  quote_request_id: string | null;
  name: string;
  email: string;
  company: string | null;
  phone: string | null;
  status: import("@/lib/admin-constants").PilotStatus;
  started_at: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
};

export type ChatSummary = {
  id: string;
  locale: string;
  page: string | null;
  provider: string | null;
  message_count: number;
  contact_name: string | null;
  contact_email: string | null;
  contact_phone: string | null;
  started_at: string;
  last_message_at: string;
  preview: string | null;
};

export type ChatDetail = ChatSummary & {
  messages: { role: "user" | "assistant" | "event"; content: string; created_at: string }[];
};
