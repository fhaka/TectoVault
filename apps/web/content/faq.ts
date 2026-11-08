// Questions for /faq, in English and Albanian. Answers must stay in line
// with the privacy policy, the terms and the data processing agreement
// (docs/legal). Plain text only: they also feed the FAQPage structured data.

type L = { en: string; sq: string };

export interface FaqGroup {
  id: string;
  title: L;
  items: { q: L; a: L }[];
}

export const faqGroups: FaqGroup[] = [
  {
    id: "agents",
    title: { en: "AI agents", sq: "Agjentët AI" },
    items: [
      {
        q: {
          en: "What is an AI agent, and how is it different from a chatbot?",
          sq: "Çfarë është një agjent AI dhe si ndryshon nga një chatbot?",
        },
        a: {
          en: "A chatbot follows a fixed script and gets stuck when a question doesn't fit it. An AI agent understands what the customer means, answers in their language and can act on it: check your calendar, take a booking, update your CRM or pass the conversation to a person.",
          sq: "Një chatbot ndjek një skenar të fiksuar dhe ngec kur pyetja nuk i përshtatet. Një agjent AI e kupton çfarë do klienti, i përgjigjet në gjuhën e tij dhe vepron: kontrollon kalendarin tuaj, merr një rezervim, përditëson CRM-në ose ia kalon bisedën një njeriu.",
        },
      },
      {
        q: { en: "Which channels can an agent work on?", sq: "Në cilat kanale mund të punojë një agjent?" },
        a: {
          en: "WhatsApp, Instagram, your website, email and phone calls. One agent can cover several channels at the same time, with the same knowledge everywhere.",
          sq: "WhatsApp, Instagram, faqja juaj e internetit, email-i dhe telefonatat. Një agjent mund të mbulojë disa kanale njëkohësisht, me të njëjtat njohuri kudo.",
        },
      },
      {
        q: { en: "Which languages does it speak?", sq: "Në cilat gjuhë flet?" },
        a: {
          en: "Albanian and English as standard, plus Italian and other languages when your customers need them. It replies in the language the customer writes in, even if they switch mid-conversation.",
          sq: "Shqip dhe anglisht si standard, si dhe italisht e gjuhë të tjera kur u duhen klientëve tuaj. Përgjigjet në gjuhën që shkruan klienti, edhe nëse ai e ndryshon gjatë bisedës.",
        },
      },
      {
        q: {
          en: "What happens when the agent doesn't know the answer?",
          sq: "Çfarë ndodh kur agjenti nuk e di përgjigjen?",
        },
        a: {
          en: "It doesn't guess. It tells the customer that a person will follow up and sends the conversation to your team with a short summary. You decide which topics it must always hand over, such as complaints, special prices or anything sensitive.",
          sq: "Nuk hamendëson. I thotë klientit se do ta kontaktojë një person dhe ia dërgon bisedën ekipit tuaj me një përmbledhje të shkurtër. Ju vendosni cilat tema duhet t'i kalojë gjithmonë, si ankesat, çmimet speciale ose çdo gjë të ndjeshme.",
        },
      },
      {
        q: { en: "Can it make mistakes?", sq: "A mund të gabojë?" },
        a: {
          en: "Yes, like any AI. That's why we limit it to the information you give us, test it with your team before any customer sees it, review its conversations and keep a person in the loop for anything sensitive.",
          sq: "Po, si çdo AI. Prandaj e kufizojmë te informacioni që na jepni ju, e testojmë me ekipin tuaj para se ta shohë ndonjë klient, i rishikojmë bisedat dhe mbajmë një njeri të përfshirë për çdo gjë të ndjeshme.",
        },
      },
      {
        q: {
          en: "Do we need to change our systems to use an agent?",
          sq: "A duhet t'i ndryshojmë sistemet tona për të përdorur një agjent?",
        },
        a: {
          en: "No. The agent connects to the tools you already use, such as your calendar, booking system, CRM, online shop or spreadsheets.",
          sq: "Jo. Agjenti lidhet me mjetet që përdorni tashmë, si kalendari, sistemi i rezervimeve, CRM-ja, dyqani online ose tabelat Excel.",
        },
      },
    ],
  },
  {
    id: "data",
    title: { en: "Data, privacy and security", sq: "Të dhënat, privatësia dhe siguria" },
    items: [
      {
        q: { en: "Who owns the customer data?", sq: "Kujt i përkasin të dhënat e klientëve?" },
        a: {
          en: "You do. For the agents we run for you, your business is the controller of the data and we act as a processor on your behalf, under a data processing agreement that we sign before launch.",
          sq: "Juve. Për agjentët që i menaxhojmë për ju, biznesi juaj është kontrolluesi i të dhënave dhe ne veprojmë si përpunues në emrin tuaj, sipas një marrëveshjeje për përpunimin e të dhënave që e nënshkruajmë para nisjes.",
        },
      },
      {
        q: {
          en: "Do you use our conversations to train AI models?",
          sq: "A i përdorni bisedat tona për të trajnuar modele AI?",
        },
        a: {
          en: "No. We use your data only to run your agent, never for our own purposes or to train AI models, and the AI providers we work with don't train their models on it under their business terms.",
          sq: "Jo. Të dhënat tuaja i përdorim vetëm për të funksionuar agjentin tuaj, asnjëherë për qëllimet tona apo për të trajnuar modele AI, dhe ofruesit e AI-së me të cilët punojmë, sipas kushteve të tyre të biznesit, nuk i trajnojnë modelet me to.",
        },
      },
      {
        q: {
          en: "Where is the data stored, and who processes it?",
          sq: "Ku ruhen të dhënat dhe kush i përpunon?",
        },
        a: {
          en: "With established cloud providers such as Cloudflare, plus the AI provider and the channels your agent uses (for example WhatsApp). The data processing agreement lists every provider and where it processes data, and we tell you in advance before adding a new one.",
          sq: "Te ofrues të njohur cloud si Cloudflare, si dhe te ofruesi i AI-së dhe kanalet që përdor agjenti juaj (për shembull WhatsApp). Marrëveshja për përpunimin e të dhënave liston çdo ofrues dhe ku i përpunon të dhënat, dhe ju njoftojmë paraprakisht para se të shtojmë një të ri.",
        },
      },
      {
        q: {
          en: "How long are conversations kept? Can they be deleted?",
          sq: "Sa kohë ruhen bisedat? A mund të fshihen?",
        },
        a: {
          en: "You decide the retention period in our agreement, so you can review conversations and we can improve the agent. When our work together ends, we delete or return your data, unless the law requires it to be kept.",
          sq: "Periudhën e ruajtjes e vendosni ju në marrëveshjen tonë, që të mund t'i rishikoni bisedat dhe ne ta përmirësojmë agjentin. Kur mbaron bashkëpunimi, i fshijmë ose jua kthejmë të dhënat, përveç rasteve kur ligji kërkon që të ruhen.",
        },
      },
      {
        q: {
          en: "Do customers know they're talking to an AI?",
          sq: "A e dinë klientët që po flasin me një AI?",
        },
        a: {
          en: "Yes. The agent says so in its first message, and we help you mention it in your privacy policy. Being open about it builds trust and is part of our agreement.",
          sq: "Po. Agjenti e thotë këtë që në mesazhin e parë dhe ju ndihmojmë ta përmendni në politikën tuaj të privatësisë. Të qenit i hapur ndërton besim dhe është pjesë e marrëveshjes sonë.",
        },
      },
      {
        q: { en: "Which data protection rules do you follow?", sq: "Cilat rregulla për mbrojtjen e të dhënave ndiqni?" },
        a: {
          en: "Albania's personal data protection law and, where it applies, the EU GDPR. Our data processing agreement is written to both.",
          sq: "Ligjin shqiptar për mbrojtjen e të dhënave personale dhe, kur zbatohet, GDPR-në e BE-së. Marrëveshja jonë për përpunimin e të dhënave është hartuar sipas të dyjave.",
        },
      },
    ],
  },
  {
    id: "working",
    title: { en: "Working with us", sq: "Bashkëpunimi me ne" },
    items: [
      {
        q: { en: "Is the first call free?", sq: "A është falas telefonata e parë?" },
        a: {
          en: "Yes. The intro call is free and without commitment. We listen to how your business works and tell you honestly whether an agent, automation or software would help.",
          sq: "Po. Telefonata e parë është falas dhe pa detyrim. Dëgjojmë si funksionon biznesi juaj dhe ju themi sinqerisht nëse do t'ju ndihmonte një agjent, automatizim apo softuer.",
        },
      },
      {
        q: { en: "How long does it take to launch?", sq: "Sa kohë duhet për ta nisur?" },
        a: {
          en: "It depends on the channels and systems involved, and you get a timeline with your quote. One agent on one channel is a small project; systems with many integrations take longer. We test everything with your team before launch.",
          sq: "Varet nga kanalet dhe sistemet që përfshihen, dhe afatin e merrni bashkë me ofertën. Një agjent në një kanal është projekt i vogël; sistemet me shumë integrime kërkojnë më shumë kohë. Para nisjes testojmë gjithçka me ekipin tuaj.",
        },
      },
      {
        q: { en: "Who owns what you build?", sq: "Kujt i përket ajo që ndërtoni?" },
        a: {
          en: "Unless we agree otherwise in writing, ownership of the custom work transfers to you once it's fully paid. Your data and content are always yours.",
          sq: "Përveç rasteve kur biem dakord ndryshe me shkrim, pronësia e punës së personalizuar kalon te ju sapo të paguhet plotësisht. Të dhënat dhe përmbajtja juaj janë gjithmonë tuajat.",
        },
      },
      {
        q: { en: "Do you look after it after launch?", sq: "A kujdeseni për të pas nisjes?" },
        a: {
          en: "Yes. Agents get monthly reviews and improvements based on real conversations, and our hosting and support packages keep websites and apps secure and up to date.",
          sq: "Po. Agjentët rishikohen dhe përmirësohen çdo muaj bazuar në bisedat reale, ndërsa paketat tona të hostimit dhe mbështetjes i mbajnë faqet dhe aplikacionet të sigurta dhe të përditësuara.",
        },
      },
    ],
  },
  {
    id: "pricing",
    title: { en: "Packages and pricing", sq: "Paketat dhe çmimet" },
    items: [
      {
        q: { en: "Why aren't there prices on the website?", sq: "Pse nuk ka çmime në faqe?" },
        a: {
          en: "Every business needs different channels, integrations and volumes. Instead of a price that fits nobody, we prepare a quote for what you actually need after a short call.",
          sq: "Çdo biznes ka nevojë për kanale, integrime dhe vëllime të ndryshme. Në vend të një çmimi që nuk i përshtatet askujt, përgatisim një ofertë për atë që ju nevojitet vërtet pas një telefonate të shkurtër.",
        },
      },
      {
        q: { en: "How is an AI agent paid for?", sq: "Si paguhet një agjent AI?" },
        a: {
          en: "Usually with a one-time setup fee and a monthly plan that covers hosting, AI usage, monitoring and improvements. Your quote shows both before you decide.",
          sq: "Zakonisht me një pagesë të vetme për konfigurimin dhe një plan mujor që mbulon hostimin, përdorimin e AI-së, monitorimin dhe përmirësimet. Oferta juaj i tregon të dyja para se të vendosni.",
        },
      },
      {
        q: { en: "What is the pilot programme?", sq: "Çfarë është programi pilot?" },
        a: {
          en: "For our first businesses we set up one agent on one channel, you use it with real customers for 30 days, and then we review the results together and you decide whether to keep it. The terms are agreed on a short call before we start.",
          sq: "Për bizneset tona të para konfigurojmë një agjent në një kanal, ju e përdorni me klientë realë për 30 ditë, pastaj i shqyrtojmë rezultatet bashkë dhe vendosni nëse do ta mbani. Kushtet i bien dakord në një telefonatë të shkurtër para se të fillojmë.",
        },
      },
    ],
  },
];
