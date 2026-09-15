import { services } from "@/content/services";
import { projects } from "@/content/projects";
import { industries } from "@/content/industries";
import {
  industryTranslationsSq,
  projectTranslationsSq,
  serviceTranslationsSq,
} from "@/lib/i18n/content-sq";

// Exact, reviewed Albanian equivalents for copy rendered by Server Components.
// Keeping this map separate lets the language switcher localize legal pages,
// empty states and deeply nested page content without duplicating every route.
export const copySq: Record<string, string> = {
  "Loading": "Duke u ngarkuar",
  "View all solutions": "Shiko të gjitha zgjidhjet",
  "View all industries": "Shiko të gjitha industritë",
  "Open menu": "Hap menunë",
  "Language": "Gjuha",
  "Home": "Kreu",
  "Services": "Shërbimet",
  "Solutions": "Zgjidhjet",
  "Industries": "Industritë",
  "Work": "Projektet",
  "About": "Rreth Nesh",
  "Process": "Procesi",
  "Pricing": "Çmimet",
  "Company": "Kompania",
  "Resources": "Burime",
  "Cookies": "Cookies",
  "Learn more": "Mëso më shumë",
  "View all work": "Shiko të gjitha projektet",
  "See the full process": "Shiko procesin e plotë",
  "Tirana, Albania": "Tiranë, Shqipëri",
  "TectoVault builds intelligent systems that transform the way businesses operate — AI agents, business automation, custom software, web and mobile applications, and AI integration for the businesses of tomorrow.": "TectoVault ndërton sisteme inteligjente që transformojnë mënyrën si funksionojnë bizneset — agjentë AI, automatizim biznesi, softuer të personalizuar, aplikacione web dhe për celular, si dhe integrim AI për bizneset e së nesërmes.",
  "Careers": "Karriera",
  "Blog": "Blogu",
  "Contact": "Kontakti",
  "Privacy": "Privatësia",
  "Terms": "Kushtet",
  "Cookie Policy": "Politika e Cookies",
  "Privacy Policy": "Politika e Privatësisë",
  "Terms of Service": "Kushtet e Shërbimit",
  "Last updated:": "Përditësimi i fundit:",
  "Page not found": "Faqja nuk u gjet",
  "The page you are looking for may have moved or no longer exists.": "Faqja që po kërkoni mund të jetë zhvendosur ose të mos ekzistojë më.",
  "Back to home": "Kthehu në kreun e faqes",
  "What we do": "Çfarë bëjmë",
  "End-to-end digital product development": "Zhvillim i plotë i produkteve digjitale",
  "From marketing websites to full software platforms — one team across design, engineering and infrastructure.": "Nga sajtet e marketingut te platformat e plota softuerike — një ekip i vetëm për dizajnin, inxhinierinë dhe infrastrukturën.",
  "Who we work with": "Me kë punojmë",
  "Focused industry experience": "Përvojë e specializuar sipas industrisë",
  "We bring domain understanding, not just code, to the sectors we work in most.": "Në sektorët ku punojmë më shumë sjellim njohuri të fushës, jo vetëm kod.",
  "Selected work": "Punime të përzgjedhura",
  "Featured projects": "Projekte të veçuara",
  "A look at the kind of products we build.": "Një vështrim mbi produktet që ndërtojmë.",
  "How we work": "Si punojmë",
  "A clear, predictable process": "Një proces i qartë dhe i parashikueshëm",
  "No surprises — you always know what happens next.": "Pa të papritura — gjithmonë e dini çfarë vjen më pas.",
  "Projects": "Projekte",
  "Clients": "Klientë",
  "Countries": "Shtete",
  "Years": "Vite",
  "Software Engineering": "Inxhinieri Softuerike",
  "Automation": "Automatizim",
  "About / the studio": "Rreth nesh / studioja",
  "We build with intent, not noise.": "Ndërtojmë me qëllim, jo për bujë.",
  "Independent digital systems": "Sisteme digjitale të pavarura",
  "Who we are": "Kush jemi",
  "Our philosophy": "Filozofia jonë",
  "What we believe": "Në çfarë besojmë",
  "Principles that guide our work": "Parimet që udhëheqin punën tonë",
  "Capabilities": "Aftësitë",
  "What we're set up to deliver": "Çfarë jemi të përgatitur të realizojmë",
  "Team": "Ekipi",
  "A small, focused team": "Një ekip i vogël dhe i përqendruar",
  "Software should solve real problems": "Softueri duhet të zgjidhë probleme reale",
  "Clarity beats complexity": "Qartësia vlen më shumë se kompleksiteti",
  "Quality is not optional": "Cilësia nuk është zgjedhje",
  "Web & software engineering": "Inxhinieri web dhe softuerike",
  "Cloud infrastructure & DevOps": "Infrastrukturë cloud dhe DevOps",
  "UI/UX design": "Dizajn UI/UX",
  "Business process automation": "Automatizim i proceseve të biznesit",
  "Technology that understands the work behind the work.": "Teknologji që kupton punën pas çdo procesi.",
  "Choose an industry to see the operational challenges we turn into better digital systems.": "Zgjidhni një industri për të parë sfidat operative që i kthejmë në sisteme digjitale më të mira.",
  "Explore this industry": "Eksploro këtë industri",
  "Explore industry systems": "Eksploro sistemet e industrisë",
  "What we solve": "Çfarë zgjidhim",
  "Common challenges": "Sfidat e zakonshme",
  "What we typically see": "Çfarë hasim zakonisht",
  "Relevant solutions": "Zgjidhje përkatëse",
  "Relevant services": "Shërbime përkatëse",
  "Case studies": "Studime rasti",
  "Related work": "Punime të ngjashme",
  "Features": "Veçoritë",
  "Benefits": "Përfitimet",
  "Recommended path": "Rruga e rekomanduar",
  "Find your path": "Gjeni rrugën tuaj",
  "Start with the problem. Follow the signal to the solution.": "Nisuni nga problemi. Ndiqni shenjën drejt zgjidhjes.",
  "Select the challenge closest to your business. The right product is never a template—it is a system designed around the work that matters.": "Zgjidhni sfidën më të afërt me biznesin tuaj. Produkti i duhur nuk është kurrë një shabllon — është një sistem i projektuar rreth punës që ka rëndësi.",
  "Explore solution": "Eksploro zgjidhjen",
  "Relevant projects": "Projekte përkatëse",
  "What we build": "Çfarë ndërtojmë",
  "Our process": "Procesi ynë",
  "See full process": "Shiko procesin e plotë",
  "Everything your product needs, connected.": "Gjithçka që i duhet produktit tuaj, e lidhur.",
  "End-to-end digital product development — hover a service to explore it.": "Zhvillim i plotë i produkteve digjitale — kaloni mbi një shërbim për ta eksploruar.",
  "Our Services": "Shërbimet tona",
  "Hover a node to explore": "Kaloni mbi një pikë për ta eksploruar",
  "Services / Web applications": "Shërbimet / Aplikacione web",
  "Web applications that make work flow.": "Aplikacione web që e bëjnë punën të rrjedhë.",
  "Frequently asked questions": "Pyetjet më të shpeshta",
  "Technology": "Teknologjia",
  "Process / a continuous build": "Procesi / zhvillim i vazhdueshëm",
  "From a first signal to a living product.": "Nga ideja e parë te një produkt i gjallë.",
  "A transparent seven-part journey, with a deliberate handoff at every stage.": "Një rrugëtim transparent me shtatë etapa dhe dorëzim të qartë në secilën prej tyre.",
  "Stage": "Etapa",
  "You receive": "Ju merrni",
  "Then": "Më pas",
  "Discovery": "Zbulimi",
  "Strategy": "Strategjia",
  "Design": "Dizajni",
  "Development": "Zhvillimi",
  "Testing": "Testimi",
  "Launch": "Lançimi",
  "Support & Growth": "Mbështetje dhe Rritje",
  "We learn about your business, goals, users and constraints through structured conversations and a review of any existing systems.": "Mësojmë për biznesin, objektivat, përdoruesit dhe kufizimet tuaja përmes bisedave të strukturuara dhe shqyrtimit të sistemeve ekzistuese.",
  "A clear summary of goals, scope boundaries and open questions.": "Një përmbledhje e qartë e objektivave, kufijve të projektit dhe pyetjeve të hapura.",
  "We move into strategy and define the right approach.": "Kalojmë te strategjia dhe përcaktojmë qasjen e duhur.",
  "We define the technical approach, architecture and project plan — including timeline, milestones and technology choices.": "Përcaktojmë qasjen teknike, arkitekturën dhe planin e projektit — përfshirë afatin, etapat dhe zgjedhjet teknologjike.",
  "A project plan with scope, milestones and technical approach.": "Një plan projekti me fushën, etapat dhe qasjen teknike.",
  "Design work begins based on the agreed direction.": "Puna e dizajnit nis sipas drejtimit të miratuar.",
  "We design the interface and user experience, working in prototypes so the product can be validated before development starts.": "Dizajnojmë ndërfaqen dhe përvojën e përdoruesit me prototipa, që produkti të vërtetohet para nisjes së zhvillimit.",
  "Reviewable design prototypes for key screens and flows.": "Prototipa dizajni të shqyrtueshëm për ekranet dhe rrjedhat kryesore.",
  "Once designs are approved, development begins.": "Pasi miratohen dizajnet, nis zhvillimi.",
  "We build the product in iterative milestones, with regular check-ins so progress stays visible throughout.": "E ndërtojmë produktin në etapa përsëritëse, me kontrolle të rregullta që progresi të jetë gjithmonë i dukshëm.",
  "Regular progress updates and access to a staging environment.": "Përditësime të rregullta mbi progresin dhe qasje në mjedisin e testimit.",
  "The product moves into structured testing.": "Produkti kalon në testim të strukturuar.",
  "We test functionality, performance, accessibility and security before anything reaches production.": "Testojmë funksionalitetin, performancën, qasshmërinë dhe sigurinë para kalimit në prodhim.",
  "A tested build ready for review and sign-off.": "Një version i testuar, gati për shqyrtim dhe miratim.",
  "Once approved, we prepare for launch.": "Pas miratimit, përgatitemi për lançim.",
  "We deploy the product to production, handling infrastructure, DNS and go-live checks.": "E vendosim produktin në prodhim, duke u kujdesur për infrastrukturën, DNS-në dhe kontrollet e lançimit.",
  "A live product and a walkthrough of what was delivered.": "Një produkt funksional dhe prezantim i asaj që u realizua.",
  "We move into ongoing support and growth.": "Kalojmë te mbështetja dhe zhvillimi i vazhdueshëm.",
  "We remain available for fixes, updates and future iterations as your product and business evolve.": "Mbetemi në dispozicion për rregullime, përditësime dhe versione të ardhshme ndërsa produkti dhe biznesi juaj zhvillohen.",
  "An ongoing support arrangement suited to your needs.": "Një marrëveshje mbështetjeje të vazhdueshme, e përshtatur për nevojat tuaja.",
  "Your product keeps improving as your business grows.": "Produkti juaj vazhdon të përmirësohet ndërsa biznesi rritet.",
  "Selected work / 2026": "Punime të përzgjedhura / 2026",
  "Ideas that made it into the world.": "Ide që u bënë realitet.",
  "A selection of digital products designed and engineered from the first sketch to a real release.": "Një përzgjedhje produktesh digjitale, të dizajnuara dhe ndërtuara nga skica e parë deri te lançimi real.",
  "All": "Të gjitha",
  "Websites": "Sajte",
  "Applications": "Aplikacione",
  "E-Commerce": "Tregti elektronike",
  "Software": "Softuer",
  "Previous screenshot": "Pamja e mëparshme",
  "Next screenshot": "Pamja tjetër",
  "Pricing / made to measure": "Çmimet / sipas nevojës",
  "Pricing that reflects the actual work.": "Çmime që pasqyrojnë punën reale.",
  "Software isn't one-size-fits-all, and neither is its price. Every project is scoped for what it actually needs.": "Softueri nuk është njësoj për të gjithë, e as çmimi i tij. Çdo projekt vlerësohet sipas nevojave reale.",
  "What determines the price": "Çfarë e përcakton çmimin",
  "Project types": "Llojet e projekteve",
  "Categories we typically scope": "Kategoritë që vlerësojmë zakonisht",
  "Scope": "Fusha",
  "Systems": "Sistemet",
  "Infrastructure": "Infrastruktura",
  "Timeline": "Afati",
  "Your build": "Projekti juaj",
  "Contact Us": "Na kontaktoni",
  "Let's talk about your project.": "Le të flasim për projektin tuaj.",
  "Have a question or want to discuss something specific? Send us a message.": "Keni një pyetje ose dëshironi të diskutoni diçka konkrete? Na dërgoni një mesazh.",
  "Phone": "Telefoni",
  "Location": "Vendndodhja",
  "Working hours": "Orari i punës",
  "Name": "Emri",
  "Your name": "Emri juaj",
  "Company (optional)": "Kompania (opsionale)",
  "Company name": "Emri i kompanisë",
  "Message": "Mesazhi",
  "Tell us what you need help with…": "Na tregoni për çfarë ju duhet ndihmë…",
  "Send message": "Dërgo mesazhin",
  "Sending…": "Duke dërguar…",
  "Message sent": "Mesazhi u dërgua",
  "Thanks — we'll get back to you shortly.": "Faleminderit — do t'ju përgjigjemi së shpejti.",
  "What do you need?": "Çfarë ju nevojitet?",
  "Tell us about your project.": "Na tregoni për projektin tuaj.",
  "What's your budget?": "Cili është buxheti juaj?",
  "When should it launch?": "Kur duhet të lançohet?",
  "How can we reach you?": "Si mund t'ju kontaktojmë?",
  "Anything to show us?": "Keni diçka për të na treguar?",
  "Describe your project": "Përshkruani projektin tuaj",
  "What are you trying to build? What problem should it solve?": "Çfarë dëshironi të ndërtoni? Cilin problem duhet të zgjidhë?",
  "Phone (optional)": "Telefoni (opsional)",
  "Website (optional)": "Sajti (opsional)",
  "Click to upload files": "Klikoni për të ngarkuar skedarë",
  "Continue": "Vazhdo",
  "Back": "Kthehu",
  "Submit request": "Dërgo kërkesën",
  "Request received": "Kërkesa u pranua",
  "Build the future with us.": "Ndërto të ardhmen me ne.",
  "Why work with us": "Pse të punoni me ne",
  "What we value": "Çfarë vlerësojmë",
  "Open positions": "Pozicionet e hapura",
  "Current openings": "Vendet e lira aktuale",
  "General application": "Aplikim i përgjithshëm",
  "Send us your CV": "Na dërgoni CV-në tuaj",
  "Application received": "Aplikimi u pranua",
  "Cover letter (optional)": "Letër motivimi (opsionale)",
  "CV / Resume": "CV / Jetëshkrimi",
  "Click to upload your CV (PDF or DOC)": "Klikoni për të ngarkuar CV-në (PDF ose DOC)",
  "No articles published yet": "Ende nuk ka artikuj të publikuar",
  "Check back soon — we're working on useful content.": "Rikthehuni së shpejti — po përgatisim përmbajtje të dobishme.",
};

// Reuse the reviewed structured translations on cards and Server Component
// detail pages as well. Product names and technology names intentionally stay
// unchanged when they are proper nouns or established technical terms.
for (const service of services) {
  const translated = serviceTranslationsSq[service.slug];
  if (translated) {
    copySq[service.title] = translated.title;
    copySq[service.shortDescription] = translated.shortDescription;
    if (translated.overview) copySq[service.overview] = translated.overview;
    translated.capabilities?.forEach((translatedValue, index) => {
      const source = service.capabilities[index];
      if (source) copySq[source] = translatedValue;
    });
    translated.whatWeBuild?.forEach((translatedValue, index) => {
      const source = service.whatWeBuild[index];
      if (source) copySq[source] = translatedValue;
    });
    translated.faq?.forEach((translatedValue, index) => {
      const source = service.faq[index];
      if (source) {
        copySq[source.question] = translatedValue.question;
        copySq[source.answer] = translatedValue.answer;
      }
    });
  }
}

for (const project of projects) {
  const translated = projectTranslationsSq[project.slug];
  if (translated) {
    copySq[project.name] = translated.name;
    copySq[project.description] = translated.description;
  }
}

for (const industry of industries) {
  const translated = industryTranslationsSq[industry.slug];
  if (translated) {
    copySq[industry.title] = translated.title;
    copySq[industry.overview] = translated.overview;
  }
}
