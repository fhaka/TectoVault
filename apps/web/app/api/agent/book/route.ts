import { NextResponse } from "next/server";
import { z } from "zod";

import { postToBackend } from "@/lib/api";
import { isConversationId, logChatTurn } from "@/lib/demo-agent/chat-log";

// "Book a free call" form inside the AI chat. Works with any AI provider:
// the request goes to the backend as a contact message (so it shows up in
// Messages and Leads, with the usual email notification) and is noted in the
// saved conversation.

const BookingSchema = z.object({
  conversationId: z.string().optional(),
  locale: z.enum(["en", "sq"]).default("en"),
  page: z.string().max(255).optional(),
  name: z.string().trim().min(2).max(255),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().max(50).optional(),
  when: z.string().trim().max(200).optional(),
  topic: z.string().trim().max(1000).optional(),
  website: z.string().optional(), // honeypot
});

export async function POST(request: Request) {
  const parsed = BookingSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ ok: false, errors: parsed.error.flatten().fieldErrors }, { status: 400 });
  }
  const data = parsed.data;
  if (data.website) return NextResponse.json({ ok: true });

  const conversationId = isConversationId(data.conversationId) ? data.conversationId : null;
  const lines = [
    "[Website AI agent] Intro call request",
    `Preferred time: ${data.when || "not given"}`,
    data.phone ? `Phone: ${data.phone}` : null,
    data.topic ? `Topic: ${data.topic}` : null,
    conversationId ? `Chat: /admin/chats/${conversationId}` : null,
  ].filter(Boolean);

  const result = await postToBackend("/contact", {
    name: data.name,
    email: data.email,
    company: null,
    message: lines.join("\n"),
    website: "",
  });
  if (!result.ok) {
    return NextResponse.json({ ok: false, message: result.message }, { status: result.status });
  }

  if (conversationId) {
    await logChatTurn({
      conversationId,
      locale: data.locale,
      page: data.page,
      messages: [
        {
          role: "event",
          content: `Call requested by ${data.name} (${data.email}${data.phone ? `, ${data.phone}` : ""}). Preferred time: ${data.when || "not given"}.`,
        },
      ],
      contact: { name: data.name, email: data.email, phone: data.phone || null },
    });
  }

  return NextResponse.json({ ok: true });
}
