"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Trash2 } from "lucide-react";

import { deleteChat } from "@/lib/admin-actions";

export function DeleteChatButton({ id }: { id: string }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  return (
    <button
      type="button"
      disabled={isPending}
      onClick={() => {
        if (!window.confirm("Delete this conversation permanently?")) return;
        startTransition(async () => {
          const result = await deleteChat(id);
          if (result.ok) router.push("/admin/chats");
          else window.alert("Delete failed. Try again.");
        });
      }}
      className="inline-flex items-center gap-2 rounded-full border border-border px-3.5 py-1.5 text-xs font-medium text-destructive hover:border-destructive/50 disabled:opacity-50"
    >
      <Trash2 className="size-3.5" />
      {isPending ? "Deleting…" : "Delete chat"}
    </button>
  );
}
