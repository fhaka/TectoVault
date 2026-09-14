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
