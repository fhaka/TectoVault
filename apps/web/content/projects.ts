import type { Project } from "@/types/content";

// Real TectoVault projects. Screenshots live in /public/images/work (4:3, captured
// from the running product). Per the content rules, the `results` list is
// only filled with real, confirmed outcomes — it is omitted until then and
// the case-study page hides the section.
//
// TODO(owner): confirm the technology lists below — they are conservative
// and should name the actual stack of each project.

export const projects: Project[] = [
  {
    slug: "dental-clinic-platform",
    name: "Dental Clinic — Booking Platform",
    industry: "Healthcare",
    category: "Applications",
    description:
      "A bilingual website and appointment platform for a private dental studio — services, gallery, FAQ and online booking with patient accounts.",
    technology: ["React", "TypeScript"],
    image: "/images/work/dental-clinic.png",
    challenge:
      "The clinic needed a modern online presence that could present its services and let patients request appointments without calling — in both Albanian and English.",
    solution:
      "A fast single-page experience with a full service catalog, photo gallery, FAQ, and an appointment-request flow with patient login, delivered in two languages with a calm, clinical visual identity.",
    architecture:
      "Component-driven React frontend with localized content (SQ/EN), an authenticated booking flow, and a design system built around the clinic's brand.",
  },
  {
    slug: "fabrika-vaji-haka",
    name: "Fabrika e Vajit HAKA — Factory Website",
    industry: "Food & Agriculture",
    category: "Websites",
    description:
      "A marketing website for an extra-virgin olive oil factory — products, production process, gallery and direct ordering via phone and WhatsApp.",
    technology: ["React", "TypeScript"],
    image: "/images/work/fabrika-vaji-haka.png",
    liveUrl: "https://fabrikevajihaka.com",
    challenge:
      "A traditional olive oil producer had no digital presence to show the quality of its cold-pressing process or to take orders beyond word of mouth.",
    solution:
      "A video-led site that walks visitors through the factory, the process and the products, with one-tap ordering through phone and WhatsApp — the channels the factory's customers actually use.",
    architecture:
      "Lightweight, media-heavy marketing site tuned for fast loading, with a full-bleed video hero, gallery, FAQ and click-to-order contact actions.",
  },
  {
    slug: "supermarket-pos",
    name: "SuperMarket POS — Cashier System",
    industry: "Retail",
    category: "Software",
    description:
      "A point-of-sale and back-office system for retail — barcode invoicing, multi-currency pricing, inventory, purchasing and sales reporting with role-based access.",
    technology: ["React", "TypeScript"],
    image: "/images/work/supermarket-pos.png",
    challenge:
      "A retail operation needed a fast cashier workstation with exchange-rate-aware pricing in LEK, EUR and USD, plus back-office control over products, purchases and sales.",
    solution:
      "A keyboard-first POS screen built for speed — barcode scanning, a numeric keypad, per-line tax handling — backed by management modules for products, purchases, sales logs, reports, users and operations.",
    architecture:
      "Role-based application (cashier and admin workspaces) with real-time invoice calculation, configurable sale rules and multi-currency account balances.",
  },
  {
    slug: "aurora-motors",
    name: "Aurora Motors — Car Marketplace",
    industry: "Automotive",
    category: "E-Commerce",
    description:
      "A premium marketplace for buying and renting luxury cars — certified inspections, brand search, wishlists and multilingual browsing.",
    technology: ["React", "TypeScript"],
    image: "/images/work/aurora-motors.png",
    challenge:
      "Selling and renting premium vehicles requires trust: buyers want inspection transparency, clear histories and a browsing experience that matches the caliber of the cars.",
    solution:
      "A dark, premium storefront with buy and rent flows, brand and model search, wishlists, user accounts and a 150-point certification presented on every listing.",
    architecture:
      "React application with search and filtering across the vehicle catalog, account features (wishlist, login) and localized UI.",
  },
  {
    slug: "ironcore-gym",
    name: "IronCore Gym — Membership & Classes",
    industry: "Fitness",
    category: "Applications",
    description:
      "A gym website and member platform — class booking, trainer profiles, membership plans, blog and gallery with member accounts.",
    technology: ["React", "TypeScript"],
    image: "/images/work/ironcore-gym.png",
    challenge:
      "The gym wanted to move sign-ups, class bookings and trial requests online, and to present its trainers and facilities the way members actually experience them.",
    solution:
      "An energetic, photography-led site with membership plans, class schedules, trainer profiles, a blog and gallery — plus member login and a free-trial booking flow.",
    architecture:
      "React application with account-based features for members, localized content and a bold visual identity built around the gym's brand.",
  },
  {
    slug: "haka-se-factory",
    name: "HAKA-SE — Wire Mesh Factory Website",
    industry: "Manufacturing",
    category: "Websites",
    description:
      "A trilingual website for a welded-mesh and fencing manufacturer in Elbasan — product catalog, factory presentation, FAQ, quote requests and WhatsApp ordering.",
    technology: ["React", "TypeScript"],
    image: "/images/work/haka-se-factory.jpg",
    challenge:
      "A manufacturer with over a decade of production needed a digital storefront that presents its welded mesh, chain-link fencing and galvanized products to customers in Albanian, English and Italian.",
    solution:
      "A bold, photography-led site built around the factory itself — product catalog, factory tour, FAQ, a quote-request flow and one-tap WhatsApp ordering, delivered in three languages.",
    architecture:
      "Localized React application (SQ/EN/IT) with a product catalog, quote-request funnel and direct messaging contact paths, designed around the company's industrial brand.",
  },
  {
    slug: "nails-by-mikela",
    name: "Nails by Mikela — Studio Website",
    industry: "Beauty & Wellness",
    category: "Websites",
    description:
      "An editorial website for a nail studio — services, portfolio, pricing and booking, designed around the studio's own work.",
    technology: ["React", "TypeScript"],
    image: "/images/work/nails-by-mikela.jpg",
    liveUrl: "https://www.nailsbymikela.org",
    challenge:
      "A one-person studio needed a site that looks as considered as the work itself, presents services and prices clearly, and turns visitors into bookings.",
    solution:
      "A magazine-style layout that puts the studio's real photography first, with services, pricing, an about story and a persistent booking action.",
    architecture:
      "Content-focused site with an editorial type system, image-led sections and direct booking and Instagram contact paths.",
  },
  {
    slug: "pirko-glass-management",
    name: "Pirko Glass — AI Order Management System",
    industry: "Manufacturing",
    category: "Software",
    description:
      "An internal management system for a glass and mirror manufacturer — AI extracts glass dimensions directly from WhatsApp orders, calculates pricing by m², piece or linear meter, and takes the order through production, invoicing and dispatch.",
    technology: ["React", "TypeScript", "AI/LLM"],
    image: "/images/work/pirko-glass-management.png",
    images: [
      "/images/work/pirko-glass-management.png",
      "/images/work/pirko-glass-mgmt-2-payments.png",
      "/images/work/pirko-glass-mgmt-3-orders.png",
    ],
    challenge:
      "Pirko Glass received the majority of its orders through WhatsApp — customers texting glass dimensions in free-form language. Staff then re-typed those measurements into invoices and production sheets by hand, a manual step that regularly introduced transcription errors and slowed orders down, especially during busy periods.",
    solution:
      "An AI-powered order management system that reads incoming order text (and photos of handwritten notes) and extracts glass dimensions automatically, with a very low error rate — only flagging orders for manual review when the original handwriting or message is genuinely illegible. From there, staff manage the full order lifecycle: client records, automatic price calculation by square meter, per piece or linear meter according to Pirko Glass's own pricing rules, handoff to production, and both standard and thermal receipt printing for glass export labeling.",
    architecture:
      "Role-based admin panel (Owner, Manager, Staff) built around an orders pipeline — from intake and AI measurement extraction, through client and pricing management, to a production and inventory view tracking every piece of glass by order number, quantity and client.",
  },
  {
    slug: "pirko-glass-website",
    name: "Pirko Glass — International Website",
    industry: "Manufacturing",
    category: "Websites",
    description:
      "A bilingual (Albanian/English) international website for a glass and mirror company — full service and product catalog, a virtual mirror designer, an AI ordering assistant, and a detailed project gallery with a large interactive location map.",
    technology: ["React", "TypeScript", "AI/LLM"],
    image: "/images/work/pirko-glass-website.png",
    challenge:
      "Pirko Glass needed an international-facing site that could properly showcase a wide catalog of glass and mirror products and services to both local and foreign customers, let customers visualize and order custom mirrors online, and present finished projects the way a premium glass manufacturer deserves — not a generic template site.",
    solution:
      "A fully bilingual site (Albanian/English, with a flag-based language switcher in the top corner) covering every service and product in detail with dedicated photo and video content. The standout feature is 'Design Your Mirror' — a virtual visualization tool letting customers configure a mirror and send the order directly, complete with an expected production date. LED mirrors — the company's best-seller — get dedicated placement, and an AI ordering assistant helps customers get accurate quotes for mirrors and custom orders. The site also includes a detailed project gallery, an About/Contact/FAQ structure, a large interactive map for the workshop location, and a contact form segmented by product and service category.",
    architecture:
      "Bilingual (SQ/EN) marketing and e-commerce-adjacent site with a product/service catalog, an interactive mirror configurator, AI-assisted order guidance, a media-rich project gallery, and a categorized quote/contact flow.",
  },
];
