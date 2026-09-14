import {
  HeartPulse,
  Store,
  UtensilsCrossed,
  Building,
  Briefcase,
  Users2,
} from "lucide-react";
import type { Industry } from "@/types/content";

export const industries: Industry[] = [
  {
    slug: "healthcare",
    icon: HeartPulse,
    title: "Healthcare",
    overview:
      "Clinics and healthcare providers need software that handles scheduling, patient records and communication reliably, without adding friction to care.",
    problems: [
      "Manual appointment scheduling and reminders",
      "Patient information scattered across systems",
      "Limited online presence for new patient acquisition",
    ],
    relatedSolutions: ["booking-appointment-platforms", "customer-portals"],
    relatedServices: ["web-applications", "custom-software"],
  },
  {
    slug: "retail",
    icon: Store,
    title: "Retail",
    overview:
      "Retail businesses need to manage inventory, sell across channels and give customers a smooth experience both online and in-store.",
    problems: [
      "Disconnected inventory across sales channels",
      "Outdated or template-limited online stores",
      "Manual order and stock tracking",
    ],
    relatedSolutions: ["e-commerce-solutions", "business-management-systems"],
    relatedServices: ["business-automation", "custom-software"],
  },
  {
    slug: "hospitality",
    icon: UtensilsCrossed,
    title: "Hospitality",
    overview:
      "Restaurants, hotels and hospitality businesses depend on smooth booking experiences and operations that keep up during peak demand.",
    problems: [
      "Phone-only reservations and bookings",
      "No visibility into real-time availability",
      "Manual coordination between front-of-house and operations",
    ],
    relatedSolutions: ["booking-appointment-platforms"],
    relatedServices: ["ai-agents", "web-applications"],
  },
  {
    slug: "real-estate",
    icon: Building,
    title: "Real Estate",
    overview:
      "Real estate businesses need to present listings professionally and manage inquiries, viewings and client communication efficiently.",
    problems: [
      "Listings that don't convert or rank well",
      "Manual handling of inquiries and viewings",
      "No centralized system for client and property data",
    ],
    relatedSolutions: ["customer-portals", "business-management-systems"],
    relatedServices: ["web-applications", "digital-transformation"],
  },
  {
    slug: "professional-services",
    icon: Briefcase,
    title: "Professional Services",
    overview:
      "Firms offering professional services need a credible online presence and internal systems that keep client work organized.",
    problems: [
      "A website that doesn't reflect the firm's credibility",
      "Client information spread across email and spreadsheets",
      "Manual, ad hoc project and document tracking",
    ],
    relatedSolutions: ["customer-portals", "business-automation"],
    relatedServices: ["custom-software", "business-automation"],
  },
  {
    slug: "smb",
    icon: Users2,
    title: "Small & Medium Businesses",
    overview:
      "SMBs often need a mix of a strong web presence and lightweight software to run day-to-day operations, without enterprise-level cost or complexity.",
    problems: [
      "Outgrowing spreadsheets and manual processes",
      "Limited budget for enterprise software",
      "Needing one partner for both web and software needs",
    ],
    relatedSolutions: ["business-management-systems", "business-automation"],
    relatedServices: ["custom-software", "business-automation", "intelligent-operations"],
  },
];

export function getIndustryBySlug(slug: string) {
  return industries.find((i) => i.slug === slug);
}
