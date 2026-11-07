import {
  BedDouble,
  Briefcase,
  Home,
  ShoppingBag,
  Stethoscope,
  UtensilsCrossed,
  Wrench,
  type LucideIcon,
} from "lucide-react";

import type { AgentPackage } from "./agent-packages";

// What an AI agent does in each industry, shown on /industries/<slug>.
// Copy is bilingual inline. The chat scripts live in the i18n dictionaries
// under `aiPage.ind.<script>.*` (shared with the AI Agents page showcase).
// "day" and "feed" are illustrative examples and are labelled as such.

type L = { en: string; sq: string };

export interface IndustryAgent {
  /** Chat demos: dictionary prefix + channel shown in the phone header. */
  scripts: { key: string; channel: string; icon: LucideIcon }[];
  /** What the agent handles in this industry (4). */
  tasks: L[];
  /** How the agent fixes each of the industry's problems, in order (3). */
  fixes: L[];
  /** An example day (5 moments). */
  day: { time: string; text: L }[];
  /** Short "live activity" items for the hero feed (5). */
  feed: L[];
  package: AgentPackage["id"];
  packageWhy: L;
}

export const industryAgents: Record<string, IndustryAgent> = {
  healthcare: {
    scripts: [{ key: "aiPage.ind.clinic", channel: "Website", icon: Stethoscope }],
    tasks: [
      { en: "Books, moves and cancels appointments", sq: "Rezervon, zhvendos dhe anulon takime" },
      { en: "Sends reminders before every visit", sq: "Dërgon kujtesa para çdo vizite" },
      { en: "Answers questions about treatments, prices and preparation", sq: "U përgjigjet pyetjeve për trajtimet, çmimet dhe përgatitjen" },
      { en: "Passes medical or urgent questions straight to your staff", sq: "Ua kalon menjëherë stafit pyetjet mjekësore ose urgjente" },
    ],
    fixes: [
      { en: "Patients book and reschedule themselves at any hour, and reminders go out automatically.", sq: "Pacientët rezervojnë dhe zhvendosin vetë takimet në çdo orë, dhe kujtesat dërgohen automatikisht." },
      { en: "Every booking and message lands in one place, your calendar, with a short summary.", sq: "Çdo rezervim dhe mesazh mbërrin në një vend, në kalendarin tuaj, me një përmbledhje të shkurtër." },
      { en: "New patients get an instant answer on your website, WhatsApp and Instagram, so enquiries become appointments.", sq: "Pacientët e rinj marrin përgjigje menjëherë në faqe, WhatsApp dhe Instagram, dhe pyetjet kthehen në takime." },
    ],
    day: [
      { time: "07:45", text: { en: "Answers a question about whitening prices before you open", sq: "U përgjigjet pyetjeve për çmimin e zbardhimit para se të hapni" } },
      { time: "09:10", text: { en: "Moves a cleaning from Thursday to Monday", sq: "Zhvendos një pastrim nga e enjtja te e hëna" } },
      { time: "13:30", text: { en: "Sends tomorrow's appointment reminders", sq: "Dërgon kujtesat për takimet e nesërme" } },
      { time: "18:40", text: { en: "Books a new patient who wrote on Instagram", sq: "Rezervon një pacient të ri që shkroi në Instagram" } },
      { time: "22:15", text: { en: "Gives a patient in pain the emergency number and flags it for staff", sq: "I jep një pacienti me dhimbje numrin e urgjencës dhe njofton stafin" } },
    ],
    feed: [
      { en: "Appointment booked · Mon 16:00", sq: "Takim i rezervuar · e hënë 16:00" },
      { en: "Reminders sent · tomorrow's visits", sq: "Kujtesa të dërguara · vizitat e nesërme" },
      { en: "Question answered · whitening price", sq: "Pyetje e përgjigjur · çmimi i zbardhimit" },
      { en: "Appointment moved · Thu → Mon", sq: "Takim i zhvendosur · e enjte → e hënë" },
      { en: "Handed to staff · urgent request", sq: "Kaluar te stafi · kërkesë urgjente" },
    ],
    package: "growth",
    packageWhy: {
      en: "Patients call as often as they message, so an agent that also answers the phone saves your reception the most time.",
      sq: "Pacientët telefonojnë po aq sa shkruajnë, prandaj një agjent që u përgjigjet edhe telefonatave i kursen recepsionit më shumë kohë.",
    },
  },

  retail: {
    scripts: [{ key: "aiPage.ind.shop", channel: "Instagram", icon: ShoppingBag }],
    tasks: [
      { en: "Answers stock, size and price questions in seconds", sq: "U përgjigjet pyetjeve për gjendjen, masat dhe çmimet brenda sekondave" },
      { en: "Sends the right product and order link in the chat", sq: "Dërgon produktin e duhur dhe linkun e porosisë në bisedë" },
      { en: "Tracks orders and starts return requests", sq: "Gjurmon porositë dhe nis kërkesat për kthim" },
      { en: "Turns Instagram and WhatsApp messages into sales", sq: "I kthen mesazhet në Instagram dhe WhatsApp në shitje" },
    ],
    fixes: [
      { en: "The agent reads live stock from your shop system, so every channel gives the same answer.", sq: "Agjenti lexon gjendjen reale nga sistemi i dyqanit, kështu që çdo kanal jep të njëjtën përgjigje." },
      { en: "Customers can buy straight from a chat: the agent sends the product and the order link.", sq: "Klientët blejnë direkt nga biseda: agjenti dërgon produktin dhe linkun e porosisë." },
      { en: "Order-status questions are answered automatically from your order data.", sq: "Pyetjet për statusin e porosisë marrin përgjigje automatikisht nga të dhënat e porosive." },
    ],
    day: [
      { time: "08:30", text: { en: "Confirms a jacket is in stock in size M", sq: "Konfirmon që një xhaketë është në gjendje në masën M" } },
      { time: "11:00", text: { en: "Sends order links to three customers on Instagram", sq: "Dërgon linqe porosie te tre klientë në Instagram" } },
      { time: "14:20", text: { en: "Tells a customer where their parcel is", sq: "I tregon një klienti ku ndodhet pakoja e tij" } },
      { time: "19:00", text: { en: "Starts a return and emails the instructions", sq: "Nis një kthim dhe dërgon udhëzimet me email" } },
      { time: "23:40", text: { en: "Answers a delivery question for a customer abroad", sq: "U përgjigjet një pyetjeje për dërgesën nga një klient jashtë vendit" } },
    ],
    feed: [
      { en: "Stock checked · jacket, size M", sq: "Gjendja u kontrollua · xhaketë, masa M" },
      { en: "Order link sent · Instagram", sq: "Linku i porosisë u dërgua · Instagram" },
      { en: "Order tracked · #4821", sq: "Porosia u gjurmua · #4821" },
      { en: "Return started · email sent", sq: "Kthimi u nis · email u dërgua" },
      { en: "Question answered · delivery to Durrës", sq: "Pyetje e përgjigjur · dërgesa në Durrës" },
    ],
    package: "growth",
    packageWhy: {
      en: "Up to three channels and a connection to your online shop, so Instagram, WhatsApp and your website all sell for you.",
      sq: "Deri në tre kanale dhe lidhje me dyqanin tuaj online, që Instagram, WhatsApp dhe faqja juaj të shesin të gjitha për ju.",
    },
  },

  hospitality: {
    scripts: [
      { key: "aiPage.ind.restaurant", channel: "WhatsApp", icon: UtensilsCrossed },
      { key: "aiPage.ind.hotel", channel: "Website", icon: BedDouble },
    ],
    tasks: [
      { en: "Takes table and room bookings, changes and cancellations", sq: "Merr rezervime tavolinash dhe dhomash, ndryshime dhe anulime" },
      { en: "Answers questions about the menu, rooms, prices and check-in", sq: "U përgjigjet pyetjeve për menunë, dhomat, çmimet dhe check-in-in" },
      { en: "Replies to tourists in Albanian, English and Italian", sq: "U përgjigjet turistëve në shqip, anglisht dhe italisht" },
      { en: "Collects group and event requests for your manager", sq: "Mbledh kërkesat për grupe dhe evente për menaxherin tuaj" },
    ],
    fixes: [
      { en: "Guests book by WhatsApp, website or phone, and the agent answers every one, even at peak hours.", sq: "Mysafirët rezervojnë me WhatsApp, në faqe ose me telefon, dhe agjenti i përgjigjet secilit, edhe në orët e pikut." },
      { en: "The agent checks your booking system before answering, so guests only get times and rooms you really have.", sq: "Agjenti kontrollon sistemin e rezervimeve para se të përgjigjet, që mysafirët të marrin vetëm orare dhe dhoma që i keni vërtet." },
      { en: "Notes like “vegan guest” or “airport transfer” reach the kitchen or front desk automatically.", sq: "Shënime si «mysafir vegan» apo «transfertë nga aeroporti» mbërrijnë automatikisht te kuzhina ose recepsioni." },
    ],
    day: [
      { time: "09:00", text: { en: "Books a sea-view room for three nights in August", sq: "Rezervon një dhomë me pamje nga deti për tre netë në gusht" } },
      { time: "12:30", text: { en: "Takes table bookings while the lunch rush is on", sq: "Merr rezervime tavolinash gjatë pikut të drekës" } },
      { time: "17:00", text: { en: "Answers an Italian guest about late check-in", sq: "I përgjigjet një mysafiri italian për check-in-in e vonë" } },
      { time: "21:15", text: { en: "Passes a 40-person wedding enquiry to the manager", sq: "I kalon menaxherit një kërkesë për dasmë me 40 vetë" } },
      { time: "23:50", text: { en: "Books tomorrow's lunch table after you've closed", sq: "Rezervon tavolinën e drekës së nesërme pasi keni mbyllur" } },
    ],
    feed: [
      { en: "Table booked · 6 guests, Sat 20:00", sq: "Tavolinë e rezervuar · 6 persona, e shtunë 20:00" },
      { en: "Room held · 14–17 Aug", sq: "Dhoma u mbajt · 14–17 gusht" },
      { en: "Transfer requested · airport", sq: "Transfertë e kërkuar · aeroporti" },
      { en: "Answered in Italian · late check-in", sq: "Përgjigje në italisht · check-in i vonë" },
      { en: "Handed to manager · group of 40", sq: "Kaluar te menaxheri · grup me 40 vetë" },
    ],
    package: "growth",
    packageWhy: {
      en: "Restaurants and hotels get as many calls as messages, and guests write in several languages. Growth covers both.",
      sq: "Restorantet dhe hotelet marrin po aq telefonata sa mesazhe, dhe mysafirët shkruajnë në disa gjuhë. Growth i mbulon të dyja.",
    },
  },

  "real-estate": {
    scripts: [{ key: "aiPage.ind.realestate", channel: "WhatsApp", icon: Home }],
    tasks: [
      { en: "Answers questions about listings around the clock", sq: "U përgjigjet pyetjeve për pronat në çdo orë" },
      { en: "Asks the right questions to qualify buyers and renters", sq: "Bën pyetjet e duhura për të kualifikuar blerësit dhe qiramarrësit" },
      { en: "Books viewings into your agents' calendars", sq: "Rezervon vizita në kalendarët e agjentëve tuaj" },
      { en: "Sends addresses, maps and similar listings", sq: "Dërgon adresa, harta dhe prona të ngjashme" },
    ],
    fixes: [
      { en: "Every enquiry on a listing gets an instant, detailed answer, so interest doesn't go cold.", sq: "Çdo pyetje për një pronë merr përgjigje të menjëhershme dhe të detajuar, që interesi të mos ftohet." },
      { en: "Viewings are booked straight into your agents' calendars, with no back-and-forth.", sq: "Vizitat rezervohen direkt në kalendarët e agjentëve, pa shkëmbime të panevojshme mesazhesh." },
      { en: "Each lead arrives with budget, area and timing already collected, in one place.", sq: "Çdo klient i mundshëm mbërrin me buxhetin, zonën dhe afatin të mbledhura tashmë, në një vend." },
    ],
    day: [
      { time: "08:15", text: { en: "Answers a question about a 2-bedroom flat in Blloku", sq: "U përgjigjet një pyetjeje për një apartament 2+1 në Bllok" } },
      { time: "10:40", text: { en: "Qualifies a renter: budget, move-in date, pets", sq: "Kualifikon një qiramarrës: buxheti, data e hyrjes, kafshët shtëpiake" } },
      { time: "13:05", text: { en: "Books a Wednesday viewing with Klea", sq: "Rezervon një vizitë të mërkurën me Klean" } },
      { time: "18:30", text: { en: "Sends three similar listings to a buyer", sq: "I dërgon një blerësi tre prona të ngjashme" } },
      { time: "22:00", text: { en: "Replies to a buyer living abroad in English", sq: "I përgjigjet në anglisht një blerësi që jeton jashtë vendit" } },
    ],
    feed: [
      { en: "Viewing booked · Wed 17:00", sq: "Vizitë e rezervuar · e mërkurë 17:00" },
      { en: "Lead qualified · budget & area", sq: "Klient i kualifikuar · buxheti dhe zona" },
      { en: "Listing sent · 2-bed, Blloku", sq: "Prona u dërgua · 2+1, Blloku" },
      { en: "Map shared · viewing address", sq: "Harta u nda · adresa e vizitës" },
      { en: "Answered in English · buyer abroad", sq: "Përgjigje në anglisht · blerës jashtë vendit" },
    ],
    package: "growth",
    packageWhy: {
      en: "Buyers call about listings as much as they write, and viewings need to land in your agents' calendars.",
      sq: "Blerësit telefonojnë për pronat po aq sa shkruajnë, dhe vizitat duhet të shkojnë në kalendarët e agjentëve.",
    },
  },

  "professional-services": {
    scripts: [{ key: "aiPage.ind.lawyer", channel: "Website", icon: Briefcase }],
    tasks: [
      { en: "Books consultations and meetings", sq: "Rezervon konsultime dhe takime" },
      { en: "Collects documents and details before the first meeting", sq: "Mbledh dokumentet dhe detajet para takimit të parë" },
      { en: "Answers questions about services, fees and process", sq: "U përgjigjet pyetjeve për shërbimet, tarifat dhe procesin" },
      { en: "Sends reminders and follow-ups to clients", sq: "U dërgon klientëve kujtesa dhe mesazhe vijuese" },
    ],
    fixes: [
      { en: "Visitors get a fast, professional answer at any hour, which makes the firm look as credible as it is.", sq: "Vizitorët marrin një përgjigje të shpejtë dhe profesionale në çdo orë, gjë që e tregon firmën aq të besueshme sa është." },
      { en: "New client details and documents are collected once and sent to one place.", sq: "Të dhënat dhe dokumentet e klientëve të rinj mblidhen një herë dhe dërgohen në një vend." },
      { en: "Reminders for missing documents and upcoming meetings go out automatically.", sq: "Kujtesat për dokumentet që mungojnë dhe takimet e ardhshme dërgohen automatikisht." },
    ],
    day: [
      { time: "08:50", text: { en: "Books a video consultation about a rental contract", sq: "Rezervon një konsultim me video për një kontratë qiraje" } },
      { time: "11:20", text: { en: "Sends a new client the list of documents to bring", sq: "I dërgon një klienti të ri listën e dokumenteve që duhet të sjellë" } },
      { time: "14:00", text: { en: "Answers a question about fees for company registration", sq: "U përgjigjet një pyetjeje për tarifat e regjistrimit të një shoqërie" } },
      { time: "17:30", text: { en: "Reminds a client their tax documents are due on Friday", sq: "I kujton një klienti që dokumentet tatimore duhen deri të premten" } },
      { time: "21:10", text: { en: "Passes a complex case to a partner with a summary", sq: "I kalon një partneri një rast të ndërlikuar me një përmbledhje" } },
    ],
    feed: [
      { en: "Consultation booked · Wed 15:00", sq: "Konsultim i rezervuar · e mërkurë 15:00" },
      { en: "Documents checklist sent", sq: "Lista e dokumenteve u dërgua" },
      { en: "Question answered · fees", sq: "Pyetje e përgjigjur · tarifat" },
      { en: "Reminder sent · documents due Friday", sq: "Kujtesë e dërguar · dokumentet deri të premten" },
      { en: "Handed to partner · complex case", sq: "Kaluar te partneri · rast i ndërlikuar" },
    ],
    package: "starter",
    packageWhy: {
      en: "Most enquiries come through your website and email, so one well-trained chat agent is usually enough to start.",
      sq: "Shumica e kërkesave vijnë nga faqja dhe email-i, prandaj një agjent chat i trajnuar mirë zakonisht mjafton për të nisur.",
    },
  },

  smb: {
    scripts: [{ key: "aiPage.ind.autoservice", channel: "WhatsApp", icon: Wrench }],
    tasks: [
      { en: "Answers the questions your team hears ten times a day", sq: "U përgjigjet pyetjeve që ekipi juaj i dëgjon dhjetë herë në ditë" },
      { en: "Books appointments and services into your calendar", sq: "Rezervon takime dhe shërbime në kalendarin tuaj" },
      { en: "Captures leads and sends them to your email", sq: "Kap klientët e mundshëm dhe jua dërgon në email" },
      { en: "Hands anything unusual to you, with a summary", sq: "Çdo gjë të pazakontë jua kalon juve, me një përmbledhje" },
    ],
    fixes: [
      { en: "Repetitive messages and bookings run on their own instead of living in spreadsheets and your phone.", sq: "Mesazhet e përsëritura dhe rezervimet ecin vetë, në vend që të mbeten në fletëllogaritje dhe në telefonin tuaj." },
      { en: "Packages sized for small businesses, no enterprise software budget needed.", sq: "Paketa të përshtatura për bizneset e vogla, pa pasur nevojë për buxhet softueri enterprise." },
      { en: "The same team builds your agent, your website and your software, so everything is connected.", sq: "I njëjti ekip ndërton agjentin, faqen dhe softuerin tuaj, kështu që gjithçka është e lidhur." },
    ],
    day: [
      { time: "08:00", text: { en: "Answers “are you open today?” before anyone is in", sq: "U përgjigjet «a jeni hapur sot?» para se të vijë kushdo" } },
      { time: "10:30", text: { en: "Books an oil change for Thursday at 9:00", sq: "Rezervon një ndërrim vaji për të enjten në 09:00" } },
      { time: "13:15", text: { en: "Sends a price list to a new customer", sq: "I dërgon listën e çmimeve një klienti të ri" } },
      { time: "17:45", text: { en: "Emails you a lead who wants a quote", sq: "Ju dërgon me email një klient që kërkon ofertë" } },
      { time: "20:30", text: { en: "Messages a customer that their car is ready", sq: "I shkruan një klienti që makina e tij është gati" } },
    ],
    feed: [
      { en: "Service booked · Thu 09:00", sq: "Shërbim i rezervuar · e enjte 09:00" },
      { en: "Price list sent · WhatsApp", sq: "Lista e çmimeve u dërgua · WhatsApp" },
      { en: "Lead emailed · quote request", sq: "Klienti u dërgua me email · kërkesë për ofertë" },
      { en: "Question answered · opening hours", sq: "Pyetje e përgjigjur · orari" },
      { en: "Customer notified · car ready", sq: "Klienti u njoftua · makina gati" },
    ],
    package: "starter",
    packageWhy: {
      en: "One chat agent on WhatsApp or your website covers most small businesses. You can add voice and more channels later.",
      sq: "Një agjent chat në WhatsApp ose në faqen tuaj mjafton për shumicën e bizneseve të vogla. Zërin dhe kanale të tjera mund t'i shtoni më vonë.",
    },
  },
};
