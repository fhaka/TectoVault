export const mainNav = [
  // Flagship offer: first in the nav and marked with a live dot.
  { label: "AI Agents", href: "/services/ai-agents", highlight: true },
  { label: "Services", href: "/services", megaMenu: "services" as const },
  { label: "Solutions", href: "/solutions", megaMenu: "solutions" as const },
  { label: "Industries", href: "/industries", megaMenu: "industries" as const },
  { label: "About", href: "/about" },
  { label: "Packages", href: "/pricing" },
];

export const footerNav = {
  company: [
    { label: "About", href: "/about" },
    { label: "Process", href: "/process" },
    { label: "Careers", href: "/careers" },
  ],
  services: [
    { label: "AI Agents", href: "/services/ai-agents" },
    { label: "Business Automation", href: "/services/business-automation" },
    { label: "Custom Software & Apps", href: "/services/custom-software" },
    { label: "Websites", href: "/services/web-development" },
    { label: "Hosting & Support", href: "/services/maintenance-support" },
  ],
  resources: [
    { label: "Blog", href: "/blog" },
    { label: "Packages", href: "/pricing" },
    { label: "FAQ", href: "/faq" },
  ],
  legal: [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
    { label: "Cookies", href: "/cookies" },
  ],
};
