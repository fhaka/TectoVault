"use server";

import { revalidatePath } from "next/cache";

import { adminFetch } from "@/lib/admin-api";
import type { ApplicationStatus, LeadStatus, PilotStatus } from "@/lib/admin-constants";

export async function updateLeadStatus(leadId: string, status: LeadStatus): Promise<{ ok: boolean }> {
  const res = await adminFetch(`/admin/leads/${leadId}`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });

  if (res.ok) {
    revalidatePath("/admin/leads");
    revalidatePath("/admin");
  }

  return { ok: res.ok };
}

export async function updateApplicationStatus(
  applicationId: string,
  status: ApplicationStatus
): Promise<{ ok: boolean }> {
  const res = await adminFetch(`/admin/applications/${applicationId}`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });

  if (res.ok) {
    revalidatePath("/admin/applications");
    revalidatePath("/admin");
  }

  return { ok: res.ok };
}

export async function updatePilotStatus(pilotId: string, status: PilotStatus): Promise<{ ok: boolean }> {
  const res = await adminFetch(`/admin/pilots/${pilotId}`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
  if (res.ok) {
    revalidatePath("/admin/pilots");
    revalidatePath("/admin");
  }
  return { ok: res.ok };
}

export async function updatePilotNotes(pilotId: string, notes: string): Promise<{ ok: boolean }> {
  const res = await adminFetch(`/admin/pilots/${pilotId}`, {
    method: "PATCH",
    body: JSON.stringify({ notes }),
  });
  if (res.ok) revalidatePath("/admin/pilots");
  return { ok: res.ok };
}

export async function deleteChat(conversationId: string): Promise<{ ok: boolean }> {
  const res = await adminFetch(`/admin/chats/${conversationId}`, { method: "DELETE" });
  if (res.ok) {
    revalidatePath("/admin/chats");
    revalidatePath("/admin");
  }
  return { ok: res.ok };
}
