import Link from "next/link";
import { CalendarCheck, MessagesSquare } from "lucide-react";

import { adminFetchJson } from "@/lib/admin-api";
import type { ChatSummary } from "@/lib/admin-types";
import { cn } from "@/lib/utils";

function timeAgo(iso: string) {
  const minutes = Math.round((Date.now() - new Date(iso).getTime()) / 60_000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours} h ago`;
  return new Date(iso).toLocaleDateString();
}

export default async function AdminChatsPage({ searchParams }: { searchParams: Promise<{ contact?: string }> }) {
  const { contact } = await searchParams;
  const withContact = contact === "1";
  const chats = (await adminFetchJson<ChatSummary[]>(`/admin/chats?limit=100${withContact ? "&with_contact=true" : ""}`)) ?? [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-medium tracking-tight">AI agent chats</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Conversations with the AI agent on the website. Deleted automatically 90 days after the last message.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {[
          { label: "All chats", href: "/admin/chats", active: !withContact },
          { label: "Asked for a call", href: "/admin/chats?contact=1", active: withContact },
        ].map((f) => (
          <Link
            key={f.href}
            href={f.href}
            className={cn(
              "rounded-full border px-3.5 py-1.5 text-xs font-medium",
              f.active ? "border-accent bg-accent/10 text-accent" : "border-border text-muted-foreground hover:border-accent/50"
            )}
          >
            {f.label}
          </Link>
        ))}
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-card">
        {chats.length > 0 ? (
          <ul className="divide-y divide-border">
            {chats.map((chat) => (
              <li key={chat.id}>
                <Link href={`/admin/chats/${chat.id}`} className="flex gap-4 px-5 py-4 transition-colors hover:bg-muted/50 sm:px-6">
                  <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-full bg-accent/10 text-accent">
                    {chat.contact_email ? <CalendarCheck className="size-4" /> : <MessagesSquare className="size-4" />}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <p className="truncate font-medium">
                        {chat.contact_name ?? "Anonymous visitor"}
                        {chat.contact_email ? (
                          <span className="ml-2 text-xs font-normal text-muted-foreground">{chat.contact_email}</span>
                        ) : null}
                      </p>
                      <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-semibold uppercase">{chat.locale}</span>
                      {chat.contact_email ? (
                        <span className="rounded-full bg-accent/15 px-2 py-0.5 text-[10px] font-semibold text-accent">Asked for a call</span>
                      ) : null}
                    </div>
                    <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{chat.preview ?? "—"}</p>
                    <p className="mt-1.5 text-xs text-muted-foreground">
                      {chat.message_count} messages · {chat.page ?? "unknown page"} · {timeAgo(chat.last_message_at)}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="px-6 py-10 text-center text-sm text-muted-foreground">
            {withContact ? "No visitor has asked for a call from the chat yet." : "No chats yet."}
          </p>
        )}
      </div>
    </div>
  );
}
