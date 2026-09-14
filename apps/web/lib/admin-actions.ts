"use server";

import { revalidatePath } from "next/cache";

import { adminFetch } from "@/lib/admin-api";
import type { ApplicationStatus, LeadStatus } from "@/lib/admin-constants";

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
