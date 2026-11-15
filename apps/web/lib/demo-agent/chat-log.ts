import "server-only";

import { API_V1_URL } from "@/lib/api";

// Saves AI agent conversations to the backend, which shows them in the admin
// panel (Chats) and deletes them after 90 days. Needs AGENT_LOG_KEY, the same
// secret set on the API; without it nothing is saved. Logging never breaks a
// chat: failures are logged and ignored.

export type ChatLogTurn = {
  conversationId: string;
  locale: "en" | "sq";
  page?: string | null;
  provider?: string | null;
  messages: { role: "user" | "assistant" | "event"; content: string }[];
  contact?: { name: string; email: string; phone?: string | null } | null;
};

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export function isConversationId(value: unknown): value is string {
  return typeof value === "string" && UUID_RE.test(value);
}

export async function logChatTurn(turn: ChatLogTurn): Promise<void> {
  const key = process.env.AGENT_LOG_KEY;
  if (!key || !isConversationId(turn.conversationId)) return;
  const messages = turn.messages
    .filter((m) => m.content.trim())
    .map((m) => ({ role: m.role, content: m.content.slice(0, 8000) }));
  if (!messages.length && !turn.contact) return;
  try {
    const res = await fetch(`${API_V1_URL}/internal/agent/turns`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Agent-Log-Key": key },
      body: JSON.stringify({
        conversation_id: turn.conversationId,
        locale: turn.locale,
        page: turn.page?.slice(0, 255) ?? null,
        provider: turn.provider?.slice(0, 100) ?? null,
        messages,
        contact: turn.contact ?? null,
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(4000),
    });
    if (!res.ok) console.error(`[agent] chat log failed: ${res.status}`);
  } catch (err) {
    console.error("[agent] chat log failed", err);
  }
}
