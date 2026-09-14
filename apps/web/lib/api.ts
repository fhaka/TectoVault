// Server-side only — the FastAPI backend base URL. Never expose this via
// NEXT_PUBLIC_*; Route Handlers call it from the server, the browser never
// talks to the backend directly.
export const API_BASE_URL = process.env.API_BASE_URL ?? "http://localhost:8000";
export const API_V1_URL = `${API_BASE_URL}/api/v1`;

export type BackendResult =
  | { ok: true }
  | { ok: false; status: number; message: string };

/**
 * Forward a JSON payload to a FastAPI public endpoint and translate the
 * result into a shape our Next.js API routes can return directly.
 *
 * Never leaks backend internals (stack traces, raw validation payloads) to
 * the client — just a clean ok/status/message shape.
 */
export async function postToBackend(path: string, payload: unknown): Promise<BackendResult> {
  try {
    const res = await fetch(`${API_V1_URL}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    if (res.ok) {
      return { ok: true };
    }

    if (res.status === 429) {
      return {
        ok: false,
        status: 429,
        message: "Too many requests. Please wait a minute and try again.",
      };
    }

    if (res.status === 422) {
      // Our own Zod schema already validated this client-side, so a 422 here
      // means the two schemas drifted — log it for us, but don't expose the
      // raw Pydantic error shape to the visitor.
      const body = await res.text().catch(() => "");
      console.error(`[backend] 422 from ${path}`, body);
      return {
        ok: false,
        status: 400,
        message: "We couldn't process your submission. Please check your details and try again.",
      };
    }

    return {
      ok: false,
      status: 502,
      message: "Something went wrong on our end. Please try again shortly.",
    };
  } catch (error) {
    console.error(`[backend] failed to reach ${path}`, error);
    return {
      ok: false,
      status: 503,
      message: "We couldn't reach the server. Please try again shortly or email us directly.",
    };
  }
}
