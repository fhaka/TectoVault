// Central, easy-to-edit source of truth for company-wide content.

export const siteConfig = {
  name: "TectoVault",
  legalName: "TectoVault",
  tagline: "Optimize. Automate. Operate.",
  domain: "tectovault.com",
  url: "https://tectovault.com",
  description:
    "TectoVault is a software development company in Albania building intelligent systems that transform the way businesses operate — AI agents, business automation, custom software, web and mobile applications, cloud services, and AI integration for the businesses of tomorrow.",
  founded: 2026,

  contact: {
    email: "tectovault@gmail.com",
    phone: "+355 69 243 0517",
    phone2: "+355 68 878 7812",
    address: "Tirana, Albania",
    hours: "Mon–Fri, 09:00–18:00 (CET)",
  },

  social: {
    instagram: "https://www.instagram.com/tectovault/",
  },

  // Only populate with real, confirmed figures. Leave undefined to hide.
  stats: undefined as
    | { projects?: number; clients?: number; countries?: number; years?: number }
    | undefined,

  locales: ["en", "sq"] as const,
  defaultLocale: "en" as const,
};

export type SiteConfig = typeof siteConfig;
