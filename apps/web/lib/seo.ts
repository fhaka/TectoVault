// Search titles and descriptions: written for what people type into Google
// in Albania ("chatbot për hotele", "agjent AI për WhatsApp", "faqe
// interneti për biznes"). They only change the search result and link
// preview; the headings on the pages stay as they are.

type L = { en: string; sq: string };
type Seo = { title: L; description: L };

export const serviceSeo: Record<string, Seo> = {
  "ai-agents": {
    title: {
      en: "AI Agents & Chatbots for WhatsApp, Calls and Websites",
      sq: "Agjentë AI dhe chatbot për WhatsApp, telefon dhe web",
    },
    description: {
      en: "AI agents and chatbots that answer customers 24/7 on WhatsApp, Instagram, phone and your website, take bookings and hand over to your team. Built in Tirana for businesses in Albania.",
      sq: "Agjentë AI dhe chatbot që u përgjigjen klientëve 24/7 në WhatsApp, Instagram, telefon dhe në faqen tuaj, marrin rezervime dhe ia kalojnë bisedën ekipit tuaj. Në shqip, anglisht dhe italisht. Tiranë, Shqipëri.",
    },
  },
  "business-automation": {
    title: { en: "Business Automation & Workflow Integration", sq: "Automatizim biznesi dhe procesesh pune" },
    description: {
      en: "Automate invoices, orders, reports and repetitive tasks by connecting the tools you already use. Business automation for companies in Albania.",
      sq: "Automatizoni faturat, porositë, raportet dhe punët e përsëritura duke lidhur mjetet që përdorni tashmë. Automatizim biznesi për kompani në Shqipëri.",
    },
  },
  "custom-software": {
    title: { en: "Custom Software, Web & Mobile Apps", sq: "Softuer i personalizuar dhe aplikacione celulare" },
    description: {
      en: "Business software, web applications and iOS/Android apps built around how your company works. Custom software development in Tirana, Albania.",
      sq: "Softuer biznesi, aplikacione web dhe aplikacione iOS/Android të ndërtuara sipas mënyrës si punon kompania juaj. Zhvillim softueri të personalizuar në Tiranë.",
    },
  },
  "web-development": {
    title: { en: "Website Design & Development for Businesses", sq: "Ndërtim faqesh interneti për biznese" },
    description: {
      en: "Fast, modern websites and online shops for businesses in Albania: multilingual, mobile-first and ready for Google.",
      sq: "Faqe interneti dhe dyqane online të shpejta dhe moderne për biznese në Shqipëri: shumëgjuhëshe, të menduara për celularin dhe gati për Google.",
    },
  },
  "maintenance-support": {
    title: { en: "Website Hosting, Maintenance & Support", sq: "Hostim, mirëmbajtje dhe mbështetje për faqe interneti" },
    description: {
      en: "Secure hosting, backups, updates and support for your website or app, so it stays fast and online. Based in Tirana.",
      sq: "Hostim i sigurt, kopje rezervë, përditësime dhe mbështetje për faqen ose aplikacionin tuaj, që të mbetet i shpejtë dhe online. Me bazë në Tiranë.",
    },
  },
};

export const industrySeo: Record<string, Seo> = {
  hospitality: {
    title: { en: "AI Agents for Hotels and Restaurants", sq: "Agjent AI dhe chatbot për hotele dhe restorante" },
    description: {
      en: "An AI agent that takes table and room bookings, answers guests in Albanian, English and Italian on WhatsApp and the phone, and passes group requests to your team.",
      sq: "Një agjent AI që merr rezervime për tavolina dhe dhoma, u përgjigjet mysafirëve në shqip, anglisht dhe italisht në WhatsApp dhe telefon, dhe ia kalon kërkesat për grupe ekipit tuaj.",
    },
  },
  healthcare: {
    title: { en: "AI Agents for Clinics and Dental Practices", sq: "Agjent AI për klinika dhe klinika dentare" },
    description: {
      en: "An AI agent that books appointments, answers questions about treatments and preparation, and sends reminders, around the clock.",
      sq: "Një agjent AI që cakton takime, u përgjigjet pyetjeve për trajtimet dhe përgatitjen dhe dërgon kujtesa, në çdo orë të ditës.",
    },
  },
  retail: {
    title: { en: "AI Agents for Shops and Online Stores", sq: "Agjent AI dhe chatbot për dyqane dhe dyqane online" },
    description: {
      en: "An AI agent that answers stock, size and price questions on Instagram and WhatsApp, takes orders and follows up with customers.",
      sq: "Një agjent AI që u përgjigjet pyetjeve për gjendjen, masat dhe çmimet në Instagram dhe WhatsApp, merr porosi dhe ndjek klientët.",
    },
  },
  "real-estate": {
    title: { en: "AI Agents for Real Estate Agencies", sq: "Agjent AI për agjenci imobiliare" },
    description: {
      en: "An AI agent that answers property enquiries, qualifies buyers and tenants, and books viewings straight into your calendar.",
      sq: "Një agjent AI që u përgjigjet pyetjeve për pronat, kualifikon blerësit dhe qiramarrësit dhe cakton vizita direkt në kalendarin tuaj.",
    },
  },
  "professional-services": {
    title: { en: "AI Agents for Law Firms, Accountants and Consultants", sq: "Agjent AI për zyra ligjore, kontabilistë dhe konsulentë" },
    description: {
      en: "An AI agent that answers first enquiries, collects the details you need and books consultations, so your team spends time on client work.",
      sq: "Një agjent AI që u përgjigjet pyetjeve të para, mbledh të dhënat që ju duhen dhe cakton konsultime, që ekipi juaj të merret me punën për klientët.",
    },
  },
  smb: {
    title: { en: "AI Agents for Small and Medium Businesses", sq: "Agjent AI për biznese të vogla dhe të mesme" },
    description: {
      en: "An AI agent that answers repetitive messages and bookings on WhatsApp and your website, sized and priced for small businesses in Albania.",
      sq: "Një agjent AI që u përgjigjet mesazheve dhe rezervimeve të përsëritura në WhatsApp dhe në faqen tuaj, i përshtatur për bizneset e vogla në Shqipëri.",
    },
  },
};
