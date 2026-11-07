import type { AgentPackage } from "@/content/agent-packages";

// Links into the quote form with the answer to "What do you need?" (and,
// for AI agents, the chosen package) already filled in. The form reads
// these from the URL: /request-quote?type=ai-agents&package=growth

const serviceToType: Record<string, string> = {
  "ai-agents": "ai-agents",
  "business-automation": "business-automation",
  "custom-software": "custom-software",
  "web-development": "website",
  "maintenance-support": "maintenance-support",
};

export function quoteHref({ service, type, pkg }: { service?: string; type?: string; pkg?: AgentPackage["id"] } = {}) {
  const params = new URLSearchParams();
  const resolved = type ?? (service ? serviceToType[service] : undefined);
  if (resolved) params.set("type", resolved);
  if (pkg) params.set("package", pkg);
  const query = params.toString();
  return query ? `/request-quote?${query}` : "/request-quote";
}
