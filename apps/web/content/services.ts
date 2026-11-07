import { Bot, Cpu, Globe, Server, Workflow } from "lucide-react";
import type { Service } from "@/types/content";

// Five services. Older service pages were merged into these, and their URLs
// redirect here (see REMOVED_PAGES in proxy.ts):
//   ai-integration                                   -> ai-agents
//   intelligent-operations, digital-transformation   -> business-automation
//   web-applications, mobile-applications            -> custom-software
//   cloud-devops                                     -> maintenance-support
export const services: Service[] = [
  {
    slug: "ai-agents",
    icon: Bot,
    title: "AI Agents",
    shortDescription:
      "Intelligent agents that communicate with customers, answer questions, and perform tasks.",
    overview:
      "We build AI agents that act as an intelligent digital workforce for your business — handling customer communication, lead qualification, order processing, appointment scheduling, support, and internal tasks, in multiple languages, around the clock.",
    capabilities: [
      "Customer communication",
      "Lead qualification",
      "Order processing",
      "Appointment scheduling",
      "Customer support",
      "Document processing",
      "Internal task management",
      "Data extraction",
      "Workflow execution",
      "Notifications",
      "Business information retrieval",
      "Multilingual communication",
      "AI added to your existing website, CRM and apps",
    ],
    whatWeBuild: [
      "Voice agents for phone and booking",
      "Chat agents for web and messaging channels",
      "Internal agents for staff and operations",
      "Multilingual customer-facing agents",
      "AI features inside your existing software",
    ],
    technology: ["LLM APIs", "Voice AI", "Vector databases", "Webhooks & automation"],
    faq: [
      {
        question: "Can an AI agent handle phone calls, not just chat?",
        answer:
          "Yes — we build voice agents that answer calls, understand requests, and take actions like booking or message-taking, in addition to chat-based agents.",
      },
      {
        question: "Will the agent sound natural and support multiple languages?",
        answer:
          "Yes. Our agents are configured per business with the tone, facts and languages your customers actually use.",
      },
      {
        question: "What happens when the agent can't handle a request?",
        answer:
          "Agents are designed to recognize their limits and hand off to a human — taking a message or transferring the call — rather than guessing.",
      },
      {
        question: "Do we need to rebuild our system to add AI?",
        answer:
          "Usually not. Most AI features connect to your existing website, CRM or app through APIs rather than requiring a rebuild.",
      },
    ],
  },
  {
    slug: "business-automation",
    icon: Workflow,
    title: "Business Automation",
    shortDescription:
      "Automated workflows, connected systems and live dashboards: less manual work, clearer decisions.",
    overview:
      "We replace manual, repetitive work (messages, data entry, orders, documents, follow-ups) with automated workflows, connect the tools your departments use so data flows between them, and give you dashboards and reports that show how the business is really doing. Step by step, paper and spreadsheet processes become connected digital systems.",
    capabilities: [
      "Workflow automation",
      "Order & document automation",
      "Communication & follow-up automation",
      "System-to-system connections",
      "Dashboards & automated reporting",
      "Process analysis & redesign",
      "Moving paper and spreadsheet processes online",
      "Cross-department workflows",
    ],
    whatWeBuild: [
      "Automated workflows replacing manual steps",
      "Connected systems that share data in real time",
      "Business dashboards and automated reports",
      "Step-by-step digitisation roadmaps",
    ],
    technology: ["n8n", "Make / Zapier", "APIs & webhooks", "BI dashboards"],
    faq: [
      {
        question: "We already use several disconnected tools. Can you help?",
        answer:
          "Yes. A common starting point is connecting your existing tools through automation before considering a full custom rebuild.",
      },
      {
        question: "How do you scope an automation project?",
        answer:
          "We start by mapping your current process end to end, identifying where manual work happens, and agreeing on what to automate first for the fastest return.",
      },
      {
        question: "Where should a bigger digital change start?",
        answer:
          "With a short discovery phase that maps your processes and picks the one or two changes with the fastest impact, then builds from there in phases.",
      },
    ],
  },
  {
    slug: "custom-software",
    icon: Cpu,
    title: "Custom Software & Apps",
    shortDescription:
      "Business systems, web applications and mobile apps built around how you work.",
    overview:
      "When off-the-shelf tools force you into their workflow, we build software shaped around yours: management systems, customer portals, internal dashboards and booking platforms on the web, plus iOS and Android apps for customers or staff, all on the same backend and designed to stay maintainable as you grow.",
    capabilities: [
      "Business management systems (CRM / ERP-style)",
      "Customer portals & internal dashboards",
      "Booking & scheduling systems",
      "iOS & Android apps",
      "Role-based access for staff, clients and admins",
      "Integrations with your existing tools",
      "Legacy modernisation & data migration",
      "Real-time features & notifications",
    ],
    whatWeBuild: [
      "Operations and management platforms",
      "Customer and client portals",
      "Mobile apps for customers or staff",
      "Integrations between existing tools",
    ],
    technology: ["Next.js", "TypeScript", "FastAPI", "PostgreSQL", "React Native"],
    faq: [
      {
        question: "How do you scope a custom software project?",
        answer:
          "We start with a discovery phase to map your current process, define what the software needs to do, and agree on a scope before any development begins.",
      },
      {
        question: "Can custom software replace several tools we use today?",
        answer:
          "Often, yes. A common outcome is consolidating several disconnected tools into one system built around how your business actually runs.",
      },
      {
        question: "Do you build both web and mobile?",
        answer:
          "Yes. We deliver the full stack (interface, backend, database and APIs), and mobile apps for iOS and Android usually from one cross-platform codebase, connected to the same system.",
      },
    ],
  },
  {
    slug: "web-development",
    icon: Globe,
    title: "Websites",
    shortDescription:
      "Corporate and marketing websites built for speed, clarity and conversion.",
    overview:
      "We design and build fast, accessible websites that represent your business properly online, from corporate sites to campaign landing pages, multilingual and ready for search engines, on modern, maintainable foundations.",
    capabilities: [
      "Corporate websites",
      "Marketing websites",
      "Landing pages",
      "Multilingual websites",
      "High-performance websites",
      "CMS integrations",
      "SEO-ready architecture",
    ],
    whatWeBuild: [
      "Company and product websites",
      "Campaign and launch landing pages",
      "Content-managed marketing sites",
      "Multilingual websites",
    ],
    technology: ["Next.js", "TypeScript", "Tailwind CSS", "Headless CMS"],
    faq: [
      {
        question: "How long does a website project usually take?",
        answer:
          "A marketing or corporate website typically takes a few weeks from kickoff to launch, depending on scope, content readiness and the number of page templates required.",
      },
      {
        question: "Can you work with our existing brand guidelines?",
        answer:
          "Yes. We build within your existing brand system where one exists, and can help extend it for the web where it doesn't yet cover digital.",
      },
    ],
  },
  {
    slug: "maintenance-support",
    icon: Server,
    title: "Hosting & Support",
    shortDescription: "Reliable hosting, deployments and ongoing care after launch.",
    overview:
      "Launch is the beginning, not the end. We set up the cloud hosting and deployment pipelines that keep your website, app or AI agent available and secure, then look after it with updates, monitoring, fixes and small improvements, without you needing an in-house technical team.",
    capabilities: [
      "Cloud hosting setup",
      "Automated deployment pipelines",
      "Monitoring & uptime alerts",
      "Backups & disaster recovery",
      "Security & dependency updates",
      "Bug fixes & small improvements",
      "Performance optimisation",
      "Technical support",
    ],
    whatWeBuild: [
      "Production hosting environments",
      "Automated deployments",
      "Monitoring and alerting",
      "Ongoing maintenance plans",
    ],
    technology: ["Cloudflare", "AWS", "Docker", "CI/CD", "Sentry"],
    faq: [
      {
        question: "Do we need a support plan after launch?",
        answer:
          "It's optional but recommended. Software needs updates over time (security patches, dependency updates, small fixes) to stay reliable.",
      },
      {
        question: "Can you take over our existing hosting or infrastructure?",
        answer:
          "Yes. We review and take ownership of existing environments, documenting and improving them where needed.",
      },
    ],
  },
];

export function getServiceBySlug(slug: string) {
  return services.find((s) => s.slug === slug);
}
