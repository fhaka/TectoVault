import "server-only";

import { getCloudflareContext } from "@opennextjs/cloudflare";

// Free mode for the demo agent: Cloudflare Workers AI through the `AI`
// binding in wrangler.jsonc. Used when no ANTHROPIC_API_KEY is set. No card
// or key needed; Cloudflare gives every account a free daily allowance,
// after which requests fail until the next day (00:00 UTC).

// Tried in order. Some models are reserved for paid Cloudflare plans or get
// retired; those are skipped and the next one is used. Set WORKERS_AI_MODEL
// to force one model.
const MODELS = [
  "@cf/google/gemma-3-12b-it",
  "@cf/meta/llama-4-scout-17b-16e-instruct",
  "@cf/meta/llama-3.3-70b-instruct-fp8-fast",
  "@cf/meta/llama-3.1-8b-instruct-fast",
];

const MAX_TOKENS = 600;

type ChatMessage = { role: "system" | "user" | "assistant"; content: string };

interface AiBinding {
  run(model: string, input: Record<string, unknown>): Promise<unknown>;
}

/** The Workers AI binding, or null outside Cloudflare (next dev / next start). */
export function workersAi(): AiBinding | null {
  try {
    const env = getCloudflareContext().env as unknown as { AI?: AiBinding };
    return env.AI ?? null;
  } catch {
    return null;
  }
}

export class DailyLimitError extends Error {}

// Remembers a model that failed as unavailable, per Worker instance.
const unavailable = new Set<string>();

function errorText(err: unknown) {
  return err instanceof Error ? `${err.name} ${err.message}` : String(err);
}

function isDailyLimit(err: unknown) {
  return /3036|daily free allocation|neurons/i.test(errorText(err));
}

function isModelUnavailable(err: unknown) {
  return /5035|5007|no such model|not found|unavailable|deprecated|not allowed|403/i.test(errorText(err));
}

/**
 * Streams a reply, calling onText for each chunk. Handles both stream
 * formats Workers AI uses: `{response}` and OpenAI-style `{choices:[{delta}]}`.
 */
export async function streamWorkersAi(
  ai: AiBinding,
  messages: ChatMessage[],
  onText: (text: string) => void,
  signal: AbortSignal
) {
  const forced = process.env.WORKERS_AI_MODEL;
  const candidates = forced ? [forced] : MODELS.filter((m) => !unavailable.has(m));
  let lastError: unknown = new Error("No Workers AI model available");

  for (const model of candidates) {
    let stream: ReadableStream<Uint8Array>;
    try {
      stream = (await ai.run(model, { messages, stream: true, max_tokens: MAX_TOKENS, temperature: 0.4 })) as ReadableStream<Uint8Array>;
    } catch (err) {
      if (isDailyLimit(err)) throw new DailyLimitError(errorText(err));
      if (!forced && isModelUnavailable(err)) {
        console.warn(`[agent] Workers AI model ${model} unavailable, trying the next one`, errorText(err));
        unavailable.add(model);
        lastError = err;
        continue;
      }
      throw err;
    }

    const reader = stream.getReader();
    const decoder = new TextDecoder();
    let buffer = "";
    try {
      while (true) {
        if (signal.aborted) {
          await reader.cancel();
          return;
        }
        const { value, done } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";
        for (const raw of lines) {
          const line = raw.trim();
          if (!line.startsWith("data:")) continue;
          const data = line.slice(5).trim();
          if (!data || data === "[DONE]") continue;
          try {
            const event = JSON.parse(data);
            const text: unknown = event.response ?? event.choices?.[0]?.delta?.content;
            if (typeof text === "string" && text) onText(text);
          } catch {
            // Ignore keep-alives and partial lines.
          }
        }
      }
    } finally {
      reader.releaseLock();
    }
    return;
  }
  throw lastError;
}
