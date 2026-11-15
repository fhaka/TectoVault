import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarCheck } from "lucide-react";

import { adminFetchJson } from "@/lib/admin-api";
import type { ChatDetail } from "@/lib/admin-types";
import { DeleteChatButton } from "@/components/admin/delete-chat-button";
import { cn } from "@/lib/utils";

export default async function AdminChatDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const chat = await adminFetchJson<ChatDetail>(`/admin/chats/${id}`);
  if (!chat) notFound();

  const deletesOn = new Date(new Date(chat.last_message_at).getTime() + 90 * 86_400_000);
  const fields = [
    { label: "Started", value: new Date(chat.started_at).toLocaleString() },
    { label: "Last message", value: new Date(chat.last_message_at).toLocaleString() },
    { label: "Language", value: chat.locale === "sq" ? "Albanian" : "English" },
    { label: "Page", value: chat.page ?? "—" },
    { label: "AI model", value: chat.provider ?? "—" },
    { label: "Deleted automatically on", value: deletesOn.toLocaleDateString() },
  ];

  return (
    <div className="max-w-3xl space-y-6">
      <Link href="/admin/chats" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="size-4" /> Back to chats
      </Link>

      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-medium tracking-tight">{chat.contact_name ?? "Anonymous visitor"}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{chat.message_count} messages</p>
        </div>
        <DeleteChatButton id={chat.id} />
      </div>

      {chat.contact_email ? (
        <div className="flex items-start gap-3 rounded-2xl border border-accent/30 bg-accent/5 p-5">
          <CalendarCheck className="mt-0.5 size-5 shrink-0 text-accent" />
          <div className="text-sm">
            <p className="font-medium">This visitor asked for a call</p>
            <p className="mt-1 text-muted-foreground">
              {chat.contact_name} ·{" "}
              <a href={`mailto:${chat.contact_email}`} className="text-accent hover:underline">{chat.contact_email}</a>
              {chat.contact_phone ? ` · ${chat.contact_phone}` : ""}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">The request is also in Messages and Leads.</p>
          </div>
        </div>
      ) : null}

      <div className="rounded-2xl border border-border bg-card p-6">
        <dl className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {fields.map((f) => (
            <div key={f.label}>
              <dt className="text-xs uppercase tracking-wide text-muted-foreground">{f.label}</dt>
              <dd className="mt-1 break-words text-sm">{f.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="space-y-3 rounded-2xl border border-border bg-muted/40 p-4 sm:p-6">
        {chat.messages.map((m, i) =>
          m.role === "event" ? (
            <p key={i} className="mx-auto w-fit max-w-full rounded-full bg-accent/15 px-3 py-1 text-center text-xs font-medium text-accent">
              {m.content}
            </p>
          ) : (
            <div key={i} className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}>
              <div
                className={cn(
                  "max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
                  m.role === "user" ? "rounded-br-md bg-accent text-accent-foreground" : "rounded-bl-md border border-border bg-card"
                )}
              >
                {m.content}
                <span className={cn("mt-1 block text-[10px]", m.role === "user" ? "text-accent-foreground/70" : "text-muted-foreground")}>
                  {m.role === "user" ? "Visitor" : "Agent"} · {new Date(m.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </span>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}
