import Link from "next/link";

type ContactOut = {
  id: string;
  name: string;
  email: string;
  company: string | null;
  message: string;
  created_at: string;
};

import { adminFetchJson } from "@/lib/admin-api";

export default async function AdminMessagesPage() {
  const messages = (await adminFetchJson<ContactOut[]>("/admin/messages")) ?? [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-medium tracking-tight">Messages</h1>
        <p className="mt-1 text-sm text-muted-foreground">Submissions from the contact form.</p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-card">
        {messages.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-border text-xs uppercase tracking-wide text-muted-foreground">
                  <th className="px-6 py-3 font-medium">Name</th>
                  <th className="px-6 py-3 font-medium">Message</th>
                  <th className="px-6 py-3 font-medium">Received</th>
                  <th className="px-6 py-3 font-medium" />
                </tr>
              </thead>
              <tbody>
                {messages.map((message) => (
                  <tr key={message.id} className="border-b border-border last:border-0">
                    <td className="px-6 py-3.5">
                      <p className="font-medium">{message.name}</p>
                      <p className="text-xs text-muted-foreground">{message.email}</p>
                      {message.company ? <p className="text-xs text-muted-foreground">{message.company}</p> : null}
                    </td>
                    <td className="max-w-sm truncate px-6 py-3.5 text-muted-foreground">{message.message}</td>
                    <td className="px-6 py-3.5 whitespace-nowrap text-muted-foreground">
                      {new Date(message.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-3.5 text-right">
                      <Link
                        href={`/admin/messages/${message.id}`}
                        className="text-sm font-medium text-accent hover:underline"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="px-6 py-10 text-center text-sm text-muted-foreground">No messages yet.</p>
        )}
      </div>
    </div>
  );
}
