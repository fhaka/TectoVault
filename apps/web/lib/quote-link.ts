import type { PackageService } from "@/content/service-packages";

// Links into the quote form with the answer to "What do you need?" (and the
// chosen package) already filled in. The form reads these from the URL:
// /request-quote?type=website&package=business

export const serviceToType: Record<PackageService, string> = {
  "ai-agents": "ai-agents",
  "business-automation": "business-automation",
  "custom-software": "custom-software",
  "web-development": "website",
  "maintenance-support": "maintenance-support",
};

export function typeToService(type: string): PackageService | null {
  const entry = Object.entries(serviceToType).find(([, t]) => t === type);
  return entry ? (entry[0] as PackageService) : null;
}

export function quoteHref({
  service,
  type,
  pkg,
  offer,
}: { service?: string; type?: string; pkg?: string; offer?: "pilot" } = {}) {
  const params = new URLSearchParams();
  const resolved = type ?? (service ? serviceToType[service as PackageService] : undefined);
  if (resolved) params.set("type", resolved);
  if (pkg) params.set("package", pkg);
  if (offer) params.set("offer", offer);
  const query = params.toString();
  return query ? `/request-quote?${query}` : "/request-quote";
}
