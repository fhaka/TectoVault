import {
  Bot,
  Workflow,
  Cpu,
  LayoutGrid,
  Smartphone,
  Plug,
  RefreshCw,
  Network,
  Globe,
  Cloud,
  LifeBuoy,
} from "lucide-react";
import type { Service } from "@/types/content";

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
    ],
    whatWeBuild: [
      "Voice agents for phone and booking",
      "Chat agents for web and messaging channels",
      "Internal agents for staff and operations",
      "Multilingual customer-facing agents",
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
    ],
  },
  {
    slug: "business-automation",
    icon: Workflow,
    title: "Business Automation",
    shortDescription:
      "Automating repetitive workflows, orders, communication, and internal processes.",
    overview:
      "We replace manual, repetitive work — messages, data entry, orders, documents, follow-ups, disconnected systems — with automated, connected workflows that run reliably in the background.",
    capabilities: [
      "Workflow automation",
      "Order & document automation",
      "Communication automation",
      "Scheduling & notifications",
      "System-to-system connections",
      "Automated documentation",
    ],
    whatWeBuild: [
      "Automated workflows replacing manual processes",
      "Connected systems that share data in real time",
      "Notification and follow-up automations",
      "Automated reporting and documentation",
    ],
    technology: ["n8n", "Zapier/Make", "APIs & webhooks", "Cloud functions"],
    faq: [
      {
        question: "We already use several disconnected tools — can you help?",
        answer:
          "Yes. A common starting point is connecting your existing tools through automation before considering a full custom rebuild.",
      },
      {
        question: "How do you scope an automation project?",
        answer:
          "We start by mapping your current process end to end, identifying where manual work happens, and agreeing on what to automate first for the fastest return.",
      },
    ],
  },
  {
    slug: "custom-software",
    icon: Cpu,
    title: "Custom Software",
    shortDescription:
      "Software engineered specifically around your business model and requirements.",
    overview:
      "When off-the-shelf tools force you into their workflow instead of yours, we build software shaped around your actual processes — operations, scheduling, reporting, or anything in between.",
    capabilities: [
      "Business management systems",
      "CRM & ERP-style applications",
      "Reporting and analytics tooling",
      "Legacy system modernization",
      "System integrations",
      "Data migration",
    ],
    whatWeBuild: [
      "Operations and management platforms",
      "Internal reporting systems",
      "Booking and order management systems",
      "Integrations between existing tools",
    ],
    technology: ["Python", "FastAPI", "PostgreSQL", "Docker"],
    faq: [
      {
        question: "How do you scope a custom software project?",
        answer:
          "We start with a discovery phase to map your current process, define what the software needs to do, and agree on a scope before any development begins.",
      },
      {
        question: "Can custom software replace several tools we use today?",
        answer:
          "Often, yes — a common outcome is consolidating several disconnected tools into one system built around how your business actually runs.",
      },
    ],
  },
  {
    slug: "web-applications",
    icon: LayoutGrid,
    title: "Web Applications",
    shortDescription:
      "SaaS platforms, dashboards, portals, and management systems.",
    overview:
      "From customer portals to internal dashboards, we build web applications that handle real business logic, real users and real data — designed to stay maintainable as they grow.",
    capabilities: [
      "Customer & client portals",
      "Internal tools and dashboards",
      "Booking and scheduling systems",
      "Role-based access control",
      "Real-time features",
      "Third-party integrations",
    ],
    whatWeBuild: [
      "Customer-facing portals",
      "Internal operations dashboards",
      "Booking and appointment systems",
      "Multi-role platforms",
    ],
    technology: ["Next.js", "TypeScript", "FastAPI", "PostgreSQL"],
    faq: [
      {
        question: "Do you build the frontend and backend, or just one side?",
        answer:
          "We deliver full-stack: the interface your users see and the backend, database and APIs behind it, working as one coherent system.",
      },
      {
        question: "Can the application support different user roles?",
        answer:
          "Yes — role-based access is a standard part of how we architect applications with more than one type of user, such as staff, clients and administrators.",
      },
    ],
  },
  {
    slug: "mobile-applications",
    icon: Smartphone,
    title: "Mobile Applications",
    shortDescription:
      "Professional Android and iOS applications for customers and teams.",
    overview:
      "We build mobile applications that connect to the same backend and business logic as your web products — for customers, employees, and internal operations.",
    capabilities: [
      "iOS & Android applications",
      "Cross-platform development",
      "API & backend integration",
      "Push notifications",
      "App store preparation & submission",
    ],
    whatWeBuild: [
      "Customer-facing mobile apps",
      "Internal field/staff apps",
      "Companion apps to existing platforms",
    ],
    technology: ["React Native", "TypeScript", "FastAPI"],
    faq: [
      {
        question: "Do you build for both iOS and Android?",
        answer:
          "Yes, typically from a single cross-platform codebase unless a project specifically requires native development.",
      },
    ],
  },
  {
    slug: "ai-integration",
    icon: Plug,
    title: "AI Integration",
    shortDescription:
      "Bringing AI into your existing software, websites, and communication channels.",
    overview:
      "You don't always need to rebuild from scratch. We integrate artificial intelligence into your existing websites, applications, CRM systems, and communication channels — adding intelligence where it creates real value.",
    capabilities: [
      "AI integration into existing systems",
      "CRM & communication channel integration",
      "Existing website & app enhancement",
      "API-based AI feature integration",
      "Data pipeline connections",
    ],
    whatWeBuild: [
      "AI features added to existing products",
      "Intelligent search and recommendations",
      "AI-enhanced customer communication channels",
    ],
    technology: ["LLM APIs", "Vector search", "REST/GraphQL APIs"],
    faq: [
      {
        question: "Do we need to rebuild our system to add AI?",
        answer:
          "Usually not — most AI integrations connect to your existing system through APIs rather than requiring a rebuild.",
      },
    ],
  },
  {
    slug: "digital-transformation",
    icon: RefreshCw,
    title: "Digital Transformation",
    shortDescription:
      "Turning traditional processes into connected digital systems.",
    overview:
      "Businesses are moving from disconnected tools and manual processes toward intelligent systems that understand, automate, and continuously optimize operations. We build that transition.",
    capabilities: [
      "Process analysis & redesign",
      "Legacy-to-digital migration",
      "Departmental system connection",
      "Change management support",
      "Digital-first workflow design",
    ],
    whatWeBuild: [
      "Modernized digital operating models",
      "Connected, paperless workflows",
      "Phased transformation roadmaps",
    ],
    technology: ["Cloud platforms", "APIs & integrations", "Automation tooling"],
    faq: [
      {
        question: "Where should a digital transformation start?",
        answer:
          "Typically with a discovery phase that maps existing processes and identifies where digitizing and connecting systems will have the fastest impact.",
      },
    ],
  },
  {
    slug: "intelligent-operations",
    icon: Network,
    title: "Intelligent Operations",
    shortDescription:
      "Connecting people, data, software, and automation into one ecosystem.",
    overview:
      "We optimize workflows, reduce manual work, connect departments, and enable smarter, data-driven business decisions — turning day-to-day operations into one intelligent, connected system.",
    capabilities: [
      "Workflow optimization",
      "Cross-department connectivity",
      "Business intelligence dashboards",
      "Automated reporting & insights",
      "Data-driven decision support",
    ],
    whatWeBuild: [
      "Operational dashboards and analytics",
      "Connected departmental workflows",
      "Automated insight and reporting systems",
    ],
    technology: ["BI dashboards", "PostgreSQL", "Automation & APIs"],
    faq: [
      {
        question: "Do you offer ongoing support once systems are connected?",
        answer:
          "Yes — this is typically covered under an ongoing optimization engagement, refining automations and dashboards as the business evolves.",
      },
    ],
  },
  {
    slug: "web-development",
    icon: Globe,
    title: "Web Development",
    shortDescription:
      "Corporate and marketing websites built for speed, clarity and conversion.",
    overview:
      "We design and build fast, accessible websites that represent your business properly online — from corporate sites to campaign landing pages, all engineered on modern, maintainable foundations.",
    capabilities: [
      "Corporate websites",
      "Marketing websites",
      "Landing pages",
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
    slug: "cloud-devops",
    icon: Cloud,
    title: "Cloud & DevOps",
    shortDescription:
      "Reliable, scalable infrastructure and deployment pipelines.",
    overview:
      "We set up cloud infrastructure and deployment pipelines that keep your application available, secure and easy to release updates to — without you needing an in-house infrastructure team.",
    capabilities: [
      "Cloud architecture & hosting setup",
      "CI/CD pipelines",
      "Containerization",
      "Monitoring & alerting",
      "Backup & disaster recovery",
      "Performance optimization",
    ],
    whatWeBuild: [
      "Production cloud environments",
      "Automated deployment pipelines",
      "Containerized application infrastructure",
      "Monitoring and uptime tooling",
    ],
    technology: ["AWS", "Cloudflare", "Docker", "CI/CD"],
    faq: [
      {
        question: "Can you take over an existing infrastructure setup?",
        answer:
          "Yes — we regularly review and take ownership of existing cloud environments, documenting and improving them where needed.",
      },
      {
        question: "Do you offer ongoing infrastructure support?",
        answer:
          "Yes, this is typically covered under a maintenance & support engagement after launch.",
      },
    ],
  },
  {
    slug: "maintenance-support",
    icon: LifeBuoy,
    title: "Maintenance & Support",
    shortDescription: "Ongoing care after launch — updates, monitoring, fixes.",
    overview:
      "Launch is the beginning, not the end. We offer ongoing maintenance plans covering updates, monitoring, bug fixes and small improvements so your product stays reliable.",
    capabilities: [
      "Security & dependency updates",
      "Bug fixing",
      "Performance monitoring",
      "Uptime monitoring & alerting",
      "Small feature iterations",
      "Technical support",
    ],
    whatWeBuild: [
      "Ongoing maintenance retainers",
      "Monitoring & alerting setup",
      "Incremental improvements post-launch",
    ],
    technology: ["Sentry", "CI/CD", "Docker"],
    faq: [
      {
        question: "Do we need a support plan after launch?",
        answer:
          "It's optional but recommended — software needs updates over time (security patches, dependency updates, small fixes) to stay reliable.",
      },
    ],
  },
];

export function getServiceBySlug(slug: string) {
  return services.find((s) => s.slug === slug);
}
