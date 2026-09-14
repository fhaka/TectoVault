import {
  Building2,
  CalendarCheck,
  ShoppingBag,
  Users,
  Workflow,
} from "lucide-react";
import type { Solution } from "@/types/content";

export const solutions: Solution[] = [
  {
    slug: "business-management-systems",
    icon: Building2,
    title: "Business Management Systems",
    problem:
      "Your operations run across spreadsheets, paper and disconnected tools — and it's slowing everything down.",
    shortDescription:
      "One system to manage staff, operations, inventory and reporting.",
    solution:
      "A custom management system built around your actual workflow, giving your team one place to manage day-to-day operations instead of piecing information together from multiple tools.",
    features: [
      "Role-based staff access",
      "Operations & inventory tracking",
      "Centralized reporting",
      "Custom workflows per department",
    ],
    benefits: [
      "Less time spent reconciling data across tools",
      "Clear visibility into daily operations",
      "Fewer manual errors",
      "A system that grows with your business",
    ],
    technology: ["FastAPI", "PostgreSQL", "Next.js"],
  },
  {
    slug: "booking-appointment-platforms",
    icon: CalendarCheck,
    title: "Booking & Appointment Platforms",
    problem:
      "Phone-based or manual booking is costing you time and no-shows are hurting revenue.",
    shortDescription:
      "Let customers book, reschedule and pay online — automatically.",
    solution:
      "A booking platform that lets customers schedule appointments directly, with automated reminders, calendar management and optional online payment — reducing admin work and no-shows.",
    features: [
      "Real-time availability & scheduling",
      "Automated reminders",
      "Staff & resource calendars",
      "Optional online payment",
    ],
    benefits: [
      "Fewer missed appointments",
      "Less time spent on manual scheduling",
      "A more professional booking experience for customers",
    ],
    technology: ["Next.js", "FastAPI", "PostgreSQL"],
  },
  {
    slug: "e-commerce-solutions",
    icon: ShoppingBag,
    title: "E-Commerce Solutions",
    problem:
      "You need to sell online but existing platforms don't fit how your catalog or operations actually work.",
    shortDescription: "A store built around your products, not a template.",
    solution:
      "A custom or headless e-commerce build that fits your catalog, pricing and fulfillment process, rather than forcing your business into a generic template.",
    features: [
      "Custom storefront design",
      "Inventory & order management",
      "Payment gateway integration",
      "Multi-currency & multilingual support",
    ],
    benefits: [
      "A storefront that matches your brand",
      "Easier day-to-day store management",
      "Room to scale beyond template limitations",
    ],
    technology: ["Next.js", "Stripe", "PostgreSQL"],
  },
  {
    slug: "customer-portals",
    icon: Users,
    title: "Customer Portals",
    problem:
      "Customers keep calling or emailing for information they could access themselves.",
    shortDescription:
      "A self-service portal for your customers or clients.",
    solution:
      "A secure portal where your customers can log in to view orders, documents, project status or account information — reducing support load and improving their experience.",
    features: [
      "Secure customer authentication",
      "Self-service account & document access",
      "Status & order tracking",
      "Notifications",
    ],
    benefits: [
      "Fewer routine support requests",
      "A more professional customer experience",
      "Centralized customer data",
    ],
    technology: ["Next.js", "FastAPI", "PostgreSQL"],
  },
  {
    slug: "business-automation",
    icon: Workflow,
    title: "Business Automation",
    problem:
      "Your team spends hours on repetitive manual work that software could handle.",
    shortDescription: "Automate the repetitive parts of your workflow.",
    solution:
      "We identify repetitive manual processes — data entry, reporting, notifications, approvals — and automate them, freeing your team to focus on higher-value work.",
    features: [
      "Workflow automation",
      "Automated reporting",
      "System-to-system integrations",
      "Notification & approval flows",
    ],
    benefits: [
      "Hours saved on manual work weekly",
      "Fewer human errors in repetitive tasks",
      "Faster turnaround on internal processes",
    ],
    technology: ["Python", "FastAPI", "PostgreSQL"],
  },
];

export function getSolutionBySlug(slug: string) {
  return solutions.find((s) => s.slug === slug);
}
