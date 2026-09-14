export type Locale = "en" | "sq";

export const defaultLocale: Locale = "en";

// Flat, dot-namespaced dictionaries. Deep page/content translation (every
// service, project and industry paragraph) is a larger, ongoing content
// task — this covers the site chrome and homepage, which is what every
// visitor sees regardless of which page they land on.
export const dictionaries: Record<Locale, Record<string, string>> = {
  en: {
    "nav.services": "Services",
    "nav.solutions": "Solutions",
    "nav.industries": "Industries",
    "nav.work": "Work",
    "nav.about": "About",
    "nav.process": "Process",
    "nav.pricing": "Pricing",
    "nav.viewAllServices": "View all services",

    "cta.startProject": "Start a Project",
    "cta.contactUs": "Contact Us",
    "cta.exploreTechnology": "Explore Our Technology",
    "cta.getQuote": "Get a quote",
    "cta.learnMore": "Learn more",

    "hero.eyebrow": "Optimize. Automate. Operate.",
    "hero.headline1": "Building the",
    "hero.headline2": "intelligent business.",
    "hero.subheadline":
      "AI-powered software and automation systems designed to optimize operations, eliminate repetitive work, and help businesses operate smarter.",

    "splash.tagline": "Optimize. Automate. Operate.",
    "splash.message": "Building intelligent systems for the businesses of tomorrow.",
    "splash.explore": "Explore",
    "splash.scrollHint": "or scroll to continue",

    "problems.eyebrow": "Why it matters",
    "problems.title": "We don't just build software.",
    "problems.description": "We solve business problems with technology.",
    "problems.pair1.problem": "Missing calls and messages?",
    "problems.pair1.solution": "AI Agents",
    "problems.pair2.problem": "Too much manual work?",
    "problems.pair2.solution": "Automation",
    "problems.pair3.problem": "Need better operations?",
    "problems.pair3.solution": "Business software",
    "problems.pair4.problem": "Systems that don't talk to each other?",
    "problems.pair4.solution": "AI Integration",
    "problems.pair5.problem": "Still running on outdated processes?",
    "problems.pair5.solution": "Digital Transformation",

    "finalCta.eyebrow": "Have an idea?",
    "finalCta.title": "Let's turn it into something real.",
    "finalCta.description":
      "Tell us what you're trying to build — we'll get back to you with next steps.",

    "footer.company": "Company",
    "footer.services": "Services",
    "footer.resources": "Resources",
    "footer.contact": "Contact",
    "footer.rights": "All rights reserved.",

    "gallery.privacyNote": "Client names blurred for privacy",
  },
  sq: {
    "nav.services": "Shërbimet",
    "nav.solutions": "Zgjidhjet",
    "nav.industries": "Industritë",
    "nav.work": "Punimet",
    "nav.about": "Rreth Nesh",
    "nav.process": "Procesi",
    "nav.pricing": "Çmimet",
    "nav.viewAllServices": "Shiko të gjitha shërbimet",

    "cta.startProject": "Fillo një Projekt",
    "cta.contactUs": "Na Kontakto",
    "cta.exploreTechnology": "Eksploro Teknologjinë",
    "cta.getQuote": "Kërko ofertë",
    "cta.learnMore": "Mëso më shumë",

    "hero.eyebrow": "Optimizo. Automatizo. Operon.",
    "hero.headline1": "Duke ndërtuar",
    "hero.headline2": "biznesin inteligjent.",
    "hero.subheadline":
      "Softuer dhe sisteme automatizimi me AI, të projektuara për të optimizuar operacionet, eliminuar punën e përsëritur, dhe ndihmuar bizneset të operojnë më mençur.",

    "splash.tagline": "Optimizo. Automatizo. Operon.",
    "splash.message": "Duke ndërtuar sisteme inteligjente për bizneset e së nesërmes.",
    "splash.explore": "Eksploro",
    "splash.scrollHint": "ose lëviz poshtë për të vazhduar",

    "problems.eyebrow": "Pse ka rëndësi",
    "problems.title": "Ne s'ndërtojmë thjesht softuer.",
    "problems.description": "Ne zgjidhim probleme biznesi me teknologji.",
    "problems.pair1.problem": "Humbni telefonata dhe mesazhe?",
    "problems.pair1.solution": "Agjentë AI",
    "problems.pair2.problem": "Shumë punë manuale?",
    "problems.pair2.solution": "Automatizim",
    "problems.pair3.problem": "Ju duhen operacione më të mira?",
    "problems.pair3.solution": "Softuer biznesi",
    "problems.pair4.problem": "Sistemet s'komunikojnë me njëri-tjetrin?",
    "problems.pair4.solution": "Integrim AI",
    "problems.pair5.problem": "Ende me proceset e vjetra?",
    "problems.pair5.solution": "Transformim Digjital",

    "finalCta.eyebrow": "Ke një ide?",
    "finalCta.title": "Le ta kthejmë në diçka reale.",
    "finalCta.description":
      "Na trego çfarë do të ndërtosh — do të të kthejmë përgjigje me hapat e ardhshëm.",

    "footer.company": "Kompania",
    "footer.services": "Shërbimet",
    "footer.resources": "Burime",
    "footer.contact": "Kontakt",
    "footer.rights": "Të gjitha të drejtat e rezervuara.",

    "gallery.privacyNote": "Emrat e klientëve janë mbuluar për privatësi",
  },
};
