import type { BlogPost } from "./blog";

// Albanian articles, published at /sq/blog/<slug>.
// Rules: practical and accurate; no invented statistics, clients or quotes.
// Any calculation is labelled as an example with its assumptions stated.

const AUTHOR = "Ekipi TectoVault";

export const postsSq: BlogPost[] = [
  {
    slug: "agjent-ai-whatsapp-restorant",
    locale: "sq",
    title: "Si mund të përdorë një restorant një agjent AI në WhatsApp",
    excerpt:
      "Rezervime, menu, orare dhe ndryshime në minutën e fundit: si një agjent AI u përgjigjet klientëve në WhatsApp ndërsa stafi juaj merret me sallën.",
    category: "AI Agents",
    author: AUTHOR,
    date: "2026-11-07",
    readingTime: "5 min lexim",
    content: [
      {
        type: "p",
        text: "Për shumë restorante në Shqipëri, WhatsApp është bërë linja kryesore me klientët. Aty vijnë rezervimet, pyetjet për menunë, kërkesat për tavolina për grupe dhe mesazhet «a jeni hapur sot?». Problemi është se mesazhet vijnë më shumë pikërisht kur stafi ka më pak kohë: në drekë dhe në darkë, kur salla është plot.",
      },
      {
        type: "p",
        text: "Një agjent AI në WhatsApp u përgjigjet këtyre mesazheve menjëherë, në çdo orë, dhe kryen vetë punët e thjeshta, si rezervimi i një tavoline, pa pritur që dikush nga ekipi të lirohet.",
      },
      { type: "h2", text: "Çfarë është një agjent AI në WhatsApp?" },
      {
        type: "p",
        text: "Është një asistent që lexon mesazhet e klientëve në gjuhë të lirë, i kupton dhe përgjigjet si një punonjës i mirë i restorantit. Ndryshe nga një chatbot me butona, klienti nuk ka nevojë të zgjedhë opsione nga një listë: mjafton të shkruajë «A keni vend për 6 të shtunën në 20:00?» dhe agjenti e kupton kërkesën.",
      },
      {
        type: "p",
        text: "Agjenti trajnohet me informacionin e restorantit tuaj (menuja, orari, rregullat për rezervimet, politika për grupet) dhe lidhet me sistemin ku mbani rezervimet, qoftë një kalendar, një program rezervimesh apo edhe një tabelë Google Sheets.",
      },
      { type: "h2", text: "Çfarë mund të bëjë për restorantin tuaj" },
      {
        type: "ul",
        items: [
          "Të rezervojë tavolina, duke kontrolluar nëse ka vend në orën e kërkuar dhe duke propozuar alternativa kur nuk ka.",
          "Të ndryshojë ose anulojë rezervime kur klienti shkruan se i ka dalë diçka.",
          "T'u përgjigjet pyetjeve për menunë, alergjenët, opsionet vegane dhe çmimet.",
          "Të japë orarin, adresën, informacion për parkimin dhe linkun e hartës.",
          "Të dërgojë mesazhe kujtese para rezervimit, që të ulen tavolinat bosh nga klientët që harrojnë.",
          "Të mbledhë kërkesat për grupe ose evente dhe t'ia kalojë ato menaxherit me të gjitha detajet.",
        ],
      },
      { type: "h2", text: "Si duket një bisedë" },
      {
        type: "p",
        text: "Klienti: «Përshëndetje, keni tavolinë për 6 të shtunën në 20:00? Një prej nesh është vegan.»",
      },
      {
        type: "p",
        text: "Agjenti: «Përshëndetje! Të shtunën në 20:00 kemi vend për 6. Ta rezervoj në emrin tuaj? Kemi edhe disa pjata vegane në menu, dhe kuzhina do të njoftohet për mysafirin vegan.»",
      },
      {
        type: "p",
        text: "Pasi klienti konfirmon, agjenti e regjistron rezervimin në sistemin tuaj, shton shënimin për mysafirin vegan dhe i konfirmon klientit. E gjithë kjo ndodh brenda pak sekondash, edhe nëse është ora 23:00 dhe restoranti është mbyllur.",
      },
      { type: "h2", text: "Kur ia kalon bisedën një njeriu" },
      {
        type: "p",
        text: "Një agjent i mirë nuk hamendëson. Kur një kërkesë del nga rregullat që i keni dhënë, si një darkë për 40 vetë me menu speciale, një ankesë ose një pyetje që nuk e di, ai i thotë klientit se do ta trajtojë një koleg dhe ia kalon bisedën stafit tuaj me një përmbledhje të shkurtër. Ju vendosni se cilat raste duhet t'i trajtojë vetë agjenti dhe cilat shkojnë te ju.",
      },
      { type: "h2", text: "Çfarë ju nevojitet për ta nisur" },
      {
        type: "ul",
        items: [
          "Një numër WhatsApp për biznesin. Agjentët lidhen përmes WhatsApp Business Platform të Meta-s, dhe ne ju ndihmojmë me konfigurimin.",
          "Menunë, orarin dhe rregullat tuaja për rezervimet, grupet dhe anulimet.",
          "Vendin ku mbani rezervimet sot (kalendar, program rezervimesh ose tabelë), që agjenti të shohë dhe të regjistrojë vendet e lira.",
          "Disa ditë testimi me ekipin tuaj para se agjenti t'u përgjigjet klientëve realë.",
        ],
      },
      {
        type: "callout",
        text: "Paketa Starter e TectoVault përfshin një agjent chat në WhatsApp ose në faqen tuaj të internetit, të trajnuar me menunë, çmimet dhe pyetjet tuaja të shpeshta, me €390 konfigurim një herë dhe €49 në muaj. Nëse doni që agjenti t'u përgjigjet edhe telefonatave, paketa Growth shton një agjent zanor.",
      },
    ],
  },
  {
    slug: "agjent-ai-apo-chatbot",
    locale: "sq",
    title: "Agjent AI apo chatbot: cili është ndryshimi dhe çfarë i duhet biznesit tuaj?",
    excerpt:
      "Të dy u përgjigjen klientëve automatikisht, por punojnë shumë ndryshe. Ja si t'i dalloni dhe kur ia vlen secili.",
    category: "Technology",
    author: AUTHOR,
    date: "2026-11-07",
    readingTime: "4 min lexim",
    content: [
      {
        type: "p",
        text: "Shumë biznese kanë provuar një chatbot në faqen e tyre dhe kanë mbetur të zhgënjyer: klientët ngecin në menu me butona, bëjnë një pyetje dhe marrin përgjigjen «Nuk e kuptova, ju lutem zgjidhni një opsion». Agjentët AI janë hapi tjetër, por emrat ngatërrohen shpesh. Ja ndryshimi në gjuhë të thjeshtë.",
      },
      { type: "h2", text: "Chatbot-i klasik: një skenar me butona" },
      {
        type: "p",
        text: "Një chatbot tradicional ndjek një skemë të paracaktuar. Dikush ka shkruar më parë pyetjet e mundshme dhe përgjigjet për secilën. Nëse klienti shkruan diçka që nuk është në skemë, chatbot-i nuk di çfarë të bëjë.",
      },
      {
        type: "ul",
        items: [
          "Funksionon mirë për pyetje shumë të thjeshta dhe të përsëritura, si orari apo adresa.",
          "Kërkon që klienti të zgjedhë nga opsione të gatshme.",
          "Nuk kryen veprime reale, si një rezervim në kalendarin tuaj, përveç nëse çdo hap është programuar veç e veç.",
          "Zakonisht flet vetëm gjuhën në të cilën është shkruar skenari.",
        ],
      },
      { type: "h2", text: "Agjenti AI: kupton, vendos dhe vepron" },
      {
        type: "p",
        text: "Një agjent AI e kupton mesazhin e klientit ashtu siç është shkruar, me gabime drejtshkrimore, në shqip, anglisht apo italisht, dhe vendos vetë çfarë duhet bërë. Mbi të gjitha, mund të përdorë mjetet e biznesit tuaj për ta kryer punën.",
      },
      {
        type: "ul",
        items: [
          "Kupton pyetje të formuluara lirshëm dhe pyet vetë për detajet që mungojnë.",
          "Kryen veprime: kontrollon disponueshmërinë, krijon rezervime, gjen statusin e një porosie, përditëson CRM-në.",
          "Kalon natyrshëm nga një gjuhë në tjetrën, sipas klientit.",
          "E di kur një kërkesë i kalon kufijtë dhe ia kalon bisedën një njeriu me një përmbledhje.",
        ],
      },
      {
        type: "callout",
        text: "Thënë shkurt: chatbot-i ndjek një skenar, agjenti AI ndjek një qëllim. Chatbot-i u përgjigjet pyetjeve; agjenti i zgjidh kërkesat.",
      },
      { type: "h2", text: "Kur mjafton një chatbot i thjeshtë" },
      {
        type: "p",
        text: "Nëse klientët tuaj bëjnë kryesisht tri-katër pyetje gjithmonë të njëjta dhe nuk keni nevojë që sistemi të veprojë në emrin tuaj, një chatbot i thjeshtë ose edhe një faqe e mirë me pyetje të shpeshta mund të mjaftojë.",
      },
      { type: "h2", text: "Kur ia vlen një agjent AI" },
      {
        type: "ul",
        items: [
          "Kur merrni shumë mesazhe ose telefonata dhe ekipi nuk arrin t'u përgjigjet të gjithave në kohë.",
          "Kur pyetjet janë të ndryshme dhe nuk futen dot në pak butona.",
          "Kur përgjigjja kërkon një veprim: rezervim, ndryshim takimi, kontroll gjendjeje në magazinë, gjurmim porosie.",
          "Kur klientët ju shkruajnë në më shumë se një gjuhë.",
          "Kur doni t'u përgjigjeni klientëve edhe natën, në fundjavë dhe në festa.",
        ],
      },
      { type: "h2", text: "Si të vendosni" },
      {
        type: "p",
        text: "Shkruani në një listë dhjetë mesazhet që merrni më shpesh dhe shënoni sa prej tyre kërkojnë që dikush të bëjë diçka, jo vetëm të përgjigjet. Nëse shumica kërkojnë veprim, një agjent AI do t'ju kursejë më shumë kohë. Nëse jo, nisni me diçka më të thjeshtë dhe rritni më vonë.",
      },
    ],
  },
  {
    slug: "agjent-ai-klinike-dentare",
    locale: "sq",
    title: "5 punë që një agjent AI mund t'i marrë përsipër në një klinikë dentare",
    excerpt:
      "Nga rezervimi i takimeve te kujtesat para vizitës: ku një agjent AI i kursen kohë recepsionit, dhe ku duhet të mbetet gjithmonë një njeri.",
    category: "AI Agents",
    author: AUTHOR,
    date: "2026-11-07",
    readingTime: "5 min lexim",
    content: [
      {
        type: "p",
        text: "Në një klinikë dentare, recepsioni bën shumë punë njëkohësisht: pret pacientët, u përgjigjet telefonatave, ndryshon takime dhe merret me pagesat. Një pjesë e madhe e kësaj pune janë kërkesa të përsëritura që mund t'i trajtojë një agjent AI, në telefon, WhatsApp ose në faqen e internetit, ndërsa stafi merret me pacientët që janë në klinikë.",
      },
      { type: "h2", text: "1. Rezervimi i takimeve" },
      {
        type: "p",
        text: "Agjenti pyet pacientin për arsyen e vizitës, kontrollon kalendarin e mjekëve dhe propozon orare të lira. Pasi pacienti zgjedh, takimi regjistrohet direkt në kalendar. Pacienti nuk pret në telefon dhe recepsioni nuk ka nevojë ta shkruajë takimin dy herë.",
      },
      { type: "h2", text: "2. Zhvendosja dhe anulimi i takimeve" },
      {
        type: "p",
        text: "«Duhet ta zhvendos takimin e së enjtes» është një nga mesazhet më të shpeshta. Agjenti gjen takimin, ofron orare të tjera dhe e liron vendin e vjetër, që t'i jepet menjëherë dikujt tjetër.",
      },
      { type: "h2", text: "3. Kujtesat para vizitës" },
      {
        type: "p",
        text: "Një ditë para takimit, agjenti i dërgon pacientit një kujtesë me orën, adresën dhe çdo udhëzim për përgatitjen. Nëse pacienti përgjigjet se nuk mund të vijë, agjenti e zhvendos ose e anulon takimin në vend, pa pasur nevojë që dikush të telefonojë.",
      },
      { type: "h2", text: "4. Pyetjet për trajtimet dhe çmimet" },
      {
        type: "p",
        text: "Sa kushton një pastrim? A bëni implante? A duhet të vij esëll? Agjenti përgjigjet me informacionin që i keni dhënë ju: listën e trajtimeve, çmimet ose intervalet e çmimeve, udhëzimet për përgatitjen dhe mënyrat e pagesës.",
      },
      { type: "h2", text: "5. Telefonatat dhe mesazhet jashtë orarit" },
      {
        type: "p",
        text: "Shumë pacientë shkruajnë ose telefonojnë në mbrëmje, kur klinika është mbyllur. Në vend që mesazhi të presë deri në mëngjes, agjenti i përgjigjet menjëherë, rezervon takimin ose regjistron kërkesën që ekipi ta shohë në fillim të ditës.",
      },
      { type: "h2", text: "Ku duhet të mbetet gjithmonë një njeri" },
      {
        type: "p",
        text: "Një agjent AI nuk është mjek dhe nuk duhet të sillet si i tillë. Në një klinikë, ai konfigurohet që:",
      },
      {
        type: "ul",
        items: [
          "Të mos japë diagnoza ose këshilla mjekësore, por të rezervojë një vizitë ose t'ia kalojë pyetjen mjekut.",
          "T'ia kalojë menjëherë rastet urgjente, si dhimbjet e forta, ënjtjet apo gjakderdhjet, stafit ose t'i udhëzojë pacientët te shërbimi i urgjencës.",
          "Të mbledhë vetëm informacionin e nevojshëm për takimin, sepse të dhënat shëndetësore janë të ndjeshme dhe duhet të trajtohen me kujdes.",
        ],
      },
      {
        type: "callout",
        text: "Paketa Growth e TectoVault përfshin agjentin zanor që u përgjigjet telefonatave dhe rezervimet e sinkronizuara me kalendarin tuaj, me €890 konfigurim një herë dhe €129 në muaj. Para se agjenti të flasë me pacientë realë, e testojmë së bashku me ekipin tuaj.",
      },
    ],
  },
  {
    slug: "sa-kushton-nje-agjent-ai",
    locale: "sq",
    title: "Sa kushton një agjent AI për një biznes në Shqipëri?",
    excerpt:
      "Çfarë paguani në fillim, çfarë paguani çdo muaj, çfarë e rrit çmimin dhe si ta llogaritni nëse ia vlen për biznesin tuaj.",
    category: "Business",
    author: AUTHOR,
    date: "2026-11-07",
    readingTime: "6 min lexim",
    content: [
      {
        type: "p",
        text: "«Sa kushton?» është pyetja e parë që na bëjnë pronarët e bizneseve për agjentët AI. Përgjigjja varet nga sa punë doni që të bëjë agjenti, por struktura e kostos është gjithmonë e njëjtë: një pagesë fillestare për ndërtimin dhe një pagesë mujore për ta mbajtur në punë.",
      },
      { type: "h2", text: "Pagesa fillestare: konfigurimi" },
      {
        type: "p",
        text: "Kjo mbulon punën për ta ndërtuar agjentin për biznesin tuaj specifik:",
      },
      {
        type: "ul",
        items: [
          "Analizën e mënyrës si ju kontaktojnë klientët sot dhe të detyrave që ia vlen të automatizohen.",
          "Trajnimin e agjentit me shërbimet, çmimet, rregullat dhe tonin tuaj të komunikimit.",
          "Lidhjen me kanalet (WhatsApp, faqja e internetit, telefoni) dhe me mjetet tuaja (kalendar, CRM, dyqan online).",
          "Testimin me ekipin tuaj para se agjenti të flasë me klientë realë.",
        ],
      },
      { type: "h2", text: "Pagesa mujore: mbajtja në punë" },
      {
        type: "p",
        text: "Pasi agjenti nis punën, ka kosto që vazhdojnë çdo muaj: hostimi, përdorimi i modeleve AI për çdo bisedë, monitorimi që gjithçka të funksionojë dhe përmirësimet e vazhdueshme bazuar në bisedat reale.",
      },
      { type: "h2", text: "Çfarë e bën një agjent më të shtrenjtë" },
      {
        type: "ul",
        items: [
          "Numri i kanaleve: vetëm WhatsApp kushton më pak se WhatsApp, Instagram, faqja dhe email-i së bashku.",
          "Zëri: një agjent që u përgjigjet telefonatave kërkon më shumë punë sesa një agjent vetëm me chat.",
          "Integrimet: lidhja me një kalendar është e thjeshtë; lidhja me një ERP ose sistem të personalizuar kërkon më shumë.",
          "Gjuhët dhe vëllimi: më shumë gjuhë dhe më shumë biseda në muaj rritin koston mujore.",
        ],
      },
      { type: "h2", text: "Çmimet tona" },
      {
        type: "p",
        text: "Te TectoVault, paketat janë të qarta që në fillim:",
      },
      {
        type: "ul",
        items: [
          "Starter: €390 konfigurim një herë + €49 në muaj. Një agjent chat në faqen tuaj ose në WhatsApp, në shqip dhe anglisht, me kontaktet e klientëve të dërguara në email-in tuaj dhe raport mujor.",
          "Growth: €890 konfigurim një herë + €129 në muaj. Agjent chat dhe zanor, deri në tre kanale, rezervime të sinkronizuara me kalendarin, lidhje me CRM-në ose dyqanin online, edhe në italisht.",
          "Business: ofertë e personalizuar, për disa agjentë, kanale pa kufi, përpunim dokumentesh dhe integrim me ERP-në ose sistemet tuaja.",
        ],
      },
      { type: "h2", text: "Si ta llogaritni nëse ia vlen" },
      {
        type: "p",
        text: "Mënyra më e thjeshtë është të krahasoni koston e agjentit me kohën që ekipi juaj shpenzon sot për të njëjtat detyra, dhe me klientët që humbni kur nuk u përgjigjeni në kohë.",
      },
      {
        type: "callout",
        text: "Shembull me supozime: nëse një punonjës shpenzon rreth 1 orë në ditë pune për t'iu përgjigjur mesazheve të përsëritura, kjo bën rreth 22 orë në muaj. Nëse një orë e kohës së tij i kushton biznesit €5, ato 22 orë kushtojnë rreth €110 në muaj, më shumë se €49 të paketës Starter. Vendosni shifrat tuaja reale; dhe mos harroni se agjenti punon edhe natën dhe në fundjavë, kur askush nuk është në detyrë.",
      },
      {
        type: "p",
        text: "Llogaria nuk përfshin rezervimet dhe shitjet që fitoni kur u përgjigjeni klientëve menjëherë në vend që t'i lini të presin. Këto janë të vështira për t'u parashikuar para se të nisni, prandaj ia vlen t'i matni gjatë muajve të parë.",
      },
      { type: "h2", text: "Hapi i parë" },
      {
        type: "p",
        text: "Nëse nuk jeni të sigurt cila paketë ju përshtatet, na tregoni si ju kontaktojnë klientët sot dhe cilat detyra ju marrin më shumë kohë. Do t'ju rekomandojmë paketën e duhur ose, nëse një agjent AI nuk ia vlen ende për biznesin tuaj, do t'jua themi edhe këtë.",
      },
    ],
  },
];
