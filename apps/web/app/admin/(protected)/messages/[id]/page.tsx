import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { adminFetchJson } from "@/lib/admin-api";

type ContactOut = {
  id: string;
  name: string;
  email: string;
  company: string | null;
  message: string;
  created_at: string;
};

export default async function AdminMessageDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const message = await adminFetchJson<ContactOut>(`/admin/messages/${id}`);

  if (!message) {
    notFound();
  }

  return (
    <div className="max-w-2xl space-y-6">
      <Link href="/admin/messages" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="size-4" /> Back to messages
      </Link>

      <div>
        <h1 className="text-2xl font-display font-medium tracking-tight">Message from {message.name}</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          <a href={`mailto:${message.email}`} className="text-accent hover:underline">
            {message.email}
          </a>
          {message.company ? ` · ${message.company}` : ""} · {new Date(message.created_at).toLocaleString()}
        </p>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6">
        <p className="whitespace-pre-wrap text-sm leading-relaxed">{message.message}</p>
      </div>
    </div>
  );
}
