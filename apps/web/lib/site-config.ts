// Central, easy-to-edit source of truth for company-wide content.
// Replace the bracketed placeholders with real details when available.
// Nothing here is fabricated — see /38 "Important content rules".

export const siteConfig = {
  name: "TectoVault",
  legalName: "[LEGAL COMPANY NAME]",
  tagline: "Optimize. Automate. Operate.",
  domain: "tectovault.example",
  url: "https://tectovault.example",
  description:
    "TectoVault builds intelligent systems that transform the way businesses operate — AI agents, business automation, custom software, web and mobile applications, and AI integration for the businesses of tomorrow.",
  founded: undefined as number | undefined, // e.g. 2021 — set when confirmed

  contact: {
    email: "tectovault@gmail.com",
    phone: "+355 69 243 0517",
    address: "Tirana, Albania",
    hours: "Mon–Fri, 09:00–18:00 (CET)",
  },

  social: {
    linkedin: "[LINKEDIN URL]",
    instagram: "https://www.instagram.com/tectovault/",
    github: "[GITHUB URL]",
  },

  // Only populate with real, confirmed figures. Leave undefined to hide.
  stats: undefined as
    | { projects?: number; clients?: number; countries?: number; years?: number }
    | undefined,

  locales: ["en", "sq", "it"] as const,
  defaultLocale: "en" as const,
};

export type SiteConfig = typeof siteConfig;
