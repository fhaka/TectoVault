import Anthropic from "@anthropic-ai/sdk";
import { z } from "zod";

import { DEMO_AGENT_SYSTEM_PROMPT } from "@/lib/demo-agent/prompt";
import { demoAgentTools, runDemoAgentTool, toolLabels } from "@/lib/demo-agent/tools";

// Live demo agent endpoint. The browser sends the visible conversation (plain
// text only); this handler runs Claude's tool loop server-side and streams
// newline-delimited JSON events back:
//   {type:"text", text}                      - a chunk of the reply
//   {type:"tool", id, name, label, status}   - tool started / finished
//   {type:"done"} | {type:"error", message}
//
// Earlier turns come back as text without thinking blocks, so nothing is
// replayed that the history-editing check could reject; within one turn the
// assistant content is appended unchanged.

const MODEL = "claude-opus-5-5";
const MAX_TOOL_ROUNDS = 4;
const MAX_MESSAGES = 24;
const MAX_CHARS = 1500;

const BodySchema = z.object({
  locale: z.enum(["en", "sq"]).default("en"),
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().trim().min(1).max(MAX_CHARS),
      })
    )
    .min(1)
    .max(MAX_MESSAGES)
    .refine((m) => m[0].role === "user" && m[m.length - 1].role === "user", {
      message: "Conversation must start and end with a visitor message.",
    }),
});

// Best-effort per-IP limit. Workers isolates don't share memory, so this only
// slows down a single abusive client - pair it with a Cloudflare rate-limiting
// rule on /api/agent and a spend limit in the Anthropic Console.
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 20;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > RATE_MAX;
}

const messagesFor = {
  en: {
    busy: "You're sending messages a bit fast. Please wait a few minutes and try again.",
    unavailable: "The live demo is offline right now. You can reach the team at tectovault@gmail.com.",
    failed: "Something went wrong on my side. Please try again in a moment.",
    refusal: "I can't help with that one. I'm happy to answer anything about TectoVault's AI agents and services.",
  },
  sq: {
    busy: "Po dërgoni mesazhe pak shpejt. Ju lutem prisni disa minuta dhe provoni sërish.",
    unavailable: "Demo live nuk është aktive tani. Mund ta kontaktoni ekipin në tectovault@gmail.com.",
    failed: "Diçka shkoi keq nga ana ime. Ju lutem provoni sërish pas pak.",
    refusal: "Për këtë nuk mund të ndihmoj. Me kënaqësi përgjigjem për agjentët AI dhe shërbimet e TectoVault.",
  },
};

/** Lets the chat widget hide itself until an API key is configured. */
export function GET() {
  return Response.json(
    { enabled: Boolean(process.env.ANTHROPIC_API_KEY) },
    { headers: { "Cache-Control": "no-store" } }
  );
}

export async function POST(request: Request) {
  const parsed = BodySchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return Response.json({ ok: false, message: "Invalid conversation." }, { status: 400 });
  }
  const { locale, messages: visible } = parsed.data;
  const copy = messagesFor[locale];

  const ip = request.headers.get("cf-connecting-ip") ?? request.headers.get("x-forwarded-for") ?? "unknown";
  if (rateLimited(ip)) {
    return Response.json({ ok: false, message: copy.busy }, { status: 429 });
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    return Response.json({ ok: false, message: copy.unavailable }, { status: 503 });
  }

  const client = new Anthropic();
  const encoder = new TextEncoder();

  const body = new ReadableStream<Uint8Array>({
    async start(controller) {
      const send = (event: Record<string, unknown>) =>
        controller.enqueue(encoder.encode(JSON.stringify(event) + "\n"));

      const messages: Anthropic.Beta.BetaMessageParam[] = visible.map((m) => ({
        role: m.role,
        content: m.content,
      }));

      try {
        let jsonRetries = 0;
        for (let round = 0; round < MAX_TOOL_ROUNDS; round++) {
          const stream = client.beta.messages.stream(
            {
              model: MODEL,
              max_tokens: 4096,
              betas: ["server-side-fallback-2026-07-01"],
              fallbacks: "default",
              output_config: { effort: "low" },
              system: [{ type: "text", text: DEMO_AGENT_SYSTEM_PROMPT, cache_control: { type: "ephemeral" } }],
              tools: demoAgentTools,
              messages,
            },
            { signal: request.signal }
          );

          stream.on("text", (text) => send({ type: "text", text }));
          stream.on("streamEvent", (event) => {
            if (event.type === "content_block_start" && event.content_block.type === "tool_use") {
              const { id, name } = event.content_block;
              send({ type: "tool", id, name, label: toolLabels[name]?.[locale] ?? name, status: "start" });
            }
          });

          let message: Anthropic.Beta.BetaMessage;
          try {
            message = await stream.finalMessage();
            jsonRetries = 0;
          } catch (err) {
            // With eager input streaming, an unparseable tool input rejects
            // finalMessage(); re-issue that turn once. API errors are rethrown.
            if (err instanceof Anthropic.APIError || jsonRetries++ >= 1) throw err;
            round--;
            continue;
          }

          if (message.stop_reason === "refusal") {
            send({ type: "text", text: copy.refusal });
            break;
          }

          const toolUses = message.content.filter(
            (b): b is Anthropic.Beta.BetaToolUseBlock => b.type === "tool_use"
          );
          if (toolUses.length === 0) break;
          // A tool input cut off at max_tokens can still look valid - never run it.
          if (message.stop_reason === "max_tokens") break;

          messages.push({ role: "assistant", content: message.content });

          const results: Anthropic.Beta.BetaToolResultBlockParam[] = [];
          for (const tool of toolUses) {
            const outcome = await runDemoAgentTool(tool.name, tool.input);
            results.push({
              type: "tool_result",
              tool_use_id: tool.id,
              content: outcome.content,
              ...(outcome.isError ? { is_error: true } : {}),
            });
            send({
              type: "tool",
              id: tool.id,
              name: tool.name,
              label: toolLabels[tool.name]?.[locale] ?? tool.name,
              status: outcome.isError ? "error" : "done",
            });
          }
          // All results for one assistant turn go back in a single user message.
          messages.push({ role: "user", content: results });
          if (round === MAX_TOOL_ROUNDS - 1) send({ type: "text", text: "\n" + copy.failed });
        }
        send({ type: "done" });
      } catch (err) {
        if (err instanceof Anthropic.RateLimitError) {
          send({ type: "error", message: copy.busy });
        } else if (err instanceof Anthropic.AuthenticationError) {
          console.error("[agent] invalid ANTHROPIC_API_KEY");
          send({ type: "error", message: copy.unavailable });
        } else if (err instanceof Anthropic.APIUserAbortError) {
          // Visitor closed the chat mid-reply - nothing to report.
        } else {
          console.error("[agent] request failed", err);
          send({ type: "error", message: copy.failed });
        }
      } finally {
        controller.close();
      }
    },
  });

  return new Response(body, {
    headers: {
      "Content-Type": "application/x-ndjson; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
