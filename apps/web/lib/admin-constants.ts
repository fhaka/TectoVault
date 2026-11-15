// Mirrors app/models/enums.py in the FastAPI backend (LeadStatus,
// ApplicationStatus). Kept in sync by hand since the two apps don't share
// types — if the backend enum changes, update here too.

export const leadStatusOptions = [
  "new",
  "contacted",
  "qualified",
  "proposal",
  "negotiation",
  "won",
  "lost",
] as const;

export type LeadStatus = (typeof leadStatusOptions)[number];

export const applicationStatusOptions = [
  "new",
  "reviewed",
  "contacted",
  "rejected",
  "hired",
] as const;

export type ApplicationStatus = (typeof applicationStatusOptions)[number];

export const leadStatusLabels: Record<LeadStatus, string> = {
  new: "New",
  contacted: "Contacted",
  qualified: "Qualified",
  proposal: "Proposal",
  negotiation: "Negotiation",
  won: "Won",
  lost: "Lost",
};

export const applicationStatusLabels: Record<ApplicationStatus, string> = {
  new: "New",
  reviewed: "Reviewed",
  contacted: "Contacted",
  rejected: "Rejected",
  hired: "Hired",
};

// Mirrors PilotStatus in the backend (app/models/enums.py).
export const pilotStatusOptions = [
  "applied",
  "call_booked",
  "setting_up",
  "live",
  "review",
  "converted",
  "ended",
  "declined",
] as const;

export type PilotStatus = (typeof pilotStatusOptions)[number];

export const pilotStatusLabels: Record<PilotStatus, string> = {
  applied: "Applied",
  call_booked: "Call booked",
  setting_up: "Setting up",
  live: "Live",
  review: "Review",
  converted: "Became a client",
  ended: "Ended",
  declined: "Declined",
};

// Length of the pilot programme, in days.
export const PILOT_DAYS = 30;
