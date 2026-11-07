import "server-only";

import type Anthropic from "@anthropic-ai/sdk";
import { z } from "zod";

import { postToBackend } from "@/lib/api";

// Tools the demo agent can call. Tool inputs are untrusted model output, so
// every handler validates with Zod before doing anything.

const TIMEZONE = "Europe/Tirane";
const SLOT_TIMES = ["10:00", "11:30", "14:00", "16:30"];
const DAYS_AHEAD = 3;

export const demoAgentTools: Anthropic.Beta.BetaToolUnion[] = [
  {
    name: "check_availability",
    description:
      "Returns proposed times (Tirana time) for a free 30-minute intro call with the TectoVault team over the next few working days. Optionally pass a preferred date. Use this before booking, and offer the visitor two or three of the returned times.",
    input_schema: {
      type: "object",
      properties: {
        preferred_date: {
          type: "string",
          description: "Optional preferred date in YYYY-MM-DD format.",
        },
      },
      additionalProperties: false,
    },
    eager_input_streaming: true,
  },
  {
    name: "book_intro_call",
    description:
      "Sends an intro-call request to the TectoVault team, who confirm it by email. Only call this after the visitor has given their name and email, chosen one of the times from check_availability, and said yes to the summary you read back.",
    input_schema: {
      type: "object",
      properties: {
        name: { type: "string", description: "The visitor's full name." },
        email: { type: "string", description: "The visitor's email address, exactly as they wrote it." },
        company: { type: "string", description: "Company or business name, if they gave one." },
        slot: { type: "string", description: "The chosen time, exactly as returned by check_availability." },
        topic: {
          type: "string",
          description: "One or two sentences on what the visitor wants to discuss (their business and what the agent should do).",
        },
      },
      required: ["name", "email", "slot", "topic"],
      additionalProperties: false,
    },
    eager_input_streaming: true,
  },
];

/** Short, human-readable labels the chat UI shows while a tool runs. */
export const toolLabels: Record<string, { en: string; sq: string }> = {
  check_availability: { en: "Checking the team's calendar", sq: "Po kontrolloj kalendarin e ekipit" },
  book_intro_call: { en: "Sending your booking request", sq: "Po dërgoj kërkesën për takim" },
};

const CheckAvailabilityInput = z.object({
  preferred_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
});

const BookIntroCallInput = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(200),
  company: z.string().trim().max(150).optional(),
  slot: z.string().trim().min(5).max(80),
  topic: z.string().trim().min(5).max(600),
});

function isWeekday(date: Date) {
  const day = new Intl.DateTimeFormat("en-US", { timeZone: TIMEZONE, weekday: "short" }).format(date);
  return day !== "Sat" && day !== "Sun";
}

function formatDay(date: Date) {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: TIMEZONE,
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(date);
}

function proposedSlots(preferredDate?: string) {
  const days: Date[] = [];
  const today = new Date();

  if (preferredDate) {
    const preferred = new Date(`${preferredDate}T12:00:00Z`);
    const diffDays = (preferred.getTime() - today.getTime()) / 86_400_000;
    if (!Number.isNaN(preferred.getTime()) && diffDays > 0 && diffDays <= 30 && isWeekday(preferred)) {
      days.push(preferred);
    }
  }

  // Start tomorrow so a same-day request never lands in the past.
  for (let offset = 1; days.length < DAYS_AHEAD && offset < 14; offset++) {
    const candidate = new Date(today.getTime() + offset * 86_400_000);
    if (isWeekday(candidate) && !days.some((d) => formatDay(d) === formatDay(candidate))) {
      days.push(candidate);
    }
  }

  return days.map((day) => ({ day: formatDay(day), times: SLOT_TIMES }));
}

export type ToolOutcome = { content: string; isError: boolean };

export async function runDemoAgentTool(name: string, input: unknown): Promise<ToolOutcome> {
  if (name === "check_availability") {
    const parsed = CheckAvailabilityInput.safeParse(input ?? {});
    if (!parsed.success) {
      return { content: "Invalid input: preferred_date must be YYYY-MM-DD.", isError: true };
    }
    return {
      content: JSON.stringify({
        timezone: "Tirana (CET/CEST)",
        duration_minutes: 30,
        note: "Proposed times. The team confirms the final time by email.",
        days: proposedSlots(parsed.data.preferred_date),
      }),
      isError: false,
    };
  }

  if (name === "book_intro_call") {
    const parsed = BookIntroCallInput.safeParse(input);
    if (!parsed.success) {
      const fields = Object.keys(parsed.error.flatten().fieldErrors).join(", ");
      return { content: `Missing or invalid fields: ${fields}. Ask the visitor for them.`, isError: true };
    }
    const { name: visitorName, email, company, slot, topic } = parsed.data;
    const result = await postToBackend("/contact", {
      name: visitorName,
      email,
      company: company || null,
      message: `[Website AI agent] Intro call request\nPreferred time: ${slot} (Tirana time)\nTopic: ${topic}`,
      website: "",
    });
    if (!result.ok) {
      return {
        content: `The booking request could not be sent (${result.message}). Apologise and give the visitor the email and phone number to book directly.`,
        isError: true,
      };
    }
    return {
      content: JSON.stringify({ status: "requested", slot, confirmation: "The team will confirm by email." }),
      isError: false,
    };
  }

  return { content: `Unknown tool: ${name}`, isError: true };
}
