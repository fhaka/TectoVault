// Albanian translations for the list/card-level content (titles + short
// descriptions) of services, projects and industries. Deep page content —
// full overviews, capability lists, FAQs, challenge/solution paragraphs —
// remains in English for now; this covers what appears in navigation,
// listing pages and cards across the site.

export type ServiceTranslationSq = {
  title: string;
  shortDescription: string;
  overview?: string;
  capabilities?: string[];
  whatWeBuild?: string[];
  faq?: { question: string; answer: string }[];
};

export const serviceTranslationsSq: Record<string, ServiceTranslationSq> = {
  "ai-agents": {
    title: "Agjentë AI",
    shortDescription: "Agjentë inteligjentë që komunikojnë me klientët, përgjigjen pyetjeve dhe kryejnë detyra.",
  },
  "business-automation": {
    title: "Automatizim Biznesi",
    shortDescription: "Procese të automatizuara, sisteme të lidhura dhe panele në kohë reale: më pak punë manuale, vendime më të qarta.",
  },
  "custom-software": {
    title: "Softuer & Aplikacione",
    shortDescription: "Sisteme biznesi, aplikacione web dhe aplikacione mobile të ndërtuara sipas mënyrës si punoni.",
  },
  "web-development": {
    title: "Faqe Interneti",
    shortDescription: "Faqe korporative dhe marketingu, të ndërtuara për shpejtësi, qartësi dhe konvertim.",
  },
  "maintenance-support": {
    title: "Hostim & Mbështetje",
    shortDescription: "Hostim i besueshëm, publikime të automatizuara dhe kujdes i vazhdueshëm pas lançimit.",
  },
};

export const serviceDetailsSq: Record<
  string,
  {
    overview: string;
    capabilities: string[];
    whatWeBuild: string[];
    faq: { question: string; answer: string }[];
  }
> = {
  "ai-agents": {
    overview:
      "Ndërtojmë agjentë AI që shërbejnë si fuqi punëtore digjitale inteligjente për biznesin tënd — duke trajtuar komunikimin me klientët, kualifikimin e drejtimeve, procesimin e porosive, planifikimin e takimeve, mbështetjen, dhe detyra të brendshme, në shumë gjuhë, gjatë gjithë kohës.",
    capabilities: [
      "Komunikim me klientët",
      "Kualifikim drejtimesh",
      "Procesim porosish",
      "Planifikim takimesh",
      "Mbështetje klientësh",
      "Procesim dokumentesh",
      "Menaxhim detyrash të brendshme",
      "Nxjerrje të dhënash",
      "Ekzekutim workflow-esh",
      "Njoftime",
      "Marrje informacioni biznesi",
      "Komunikim shumëgjuhësh",
      "AI në faqen, CRM-në dhe aplikacionet që keni tashmë",
    ],
    whatWeBuild: [
      "Agjentë zëri për telefon dhe rezervime",
      "Agjentë chat për web dhe kanale mesazhesh",
      "Agjentë të brendshëm për staf dhe operacione",
      "Agjentë shumëgjuhësh për klientët",
      "Funksione AI brenda softuerit tuaj ekzistues",
    ],
    faq: [
      {
        question: "A mund një agjent AI të trajtojë telefonata, jo vetëm chat?",
        answer:
          "Po — ndërtojmë agjentë zëri që përgjigjen telefonatave, kuptojnë kërkesat, dhe kryejnë veprime si rezervim apo marrje mesazhi, përveç agjentëve me bazë chat.",
      },
      {
        question: "A do të tingëllojë natyral agjenti dhe mbështet shumë gjuhë?",
        answer:
          "Po. Agjentët tanë konfigurohen për çdo biznes me tonin, faktet, dhe gjuhët që klientët tuaj përdorin realisht.",
      },
      {
        question: "Çfarë ndodh kur agjenti s'mund ta trajtojë një kërkesë?",
        answer:
          "Agjentët janë projektuar të njohin kufijtë e tyre dhe t'ia kalojnë një njeriu — duke marrë mesazh ose transferuar telefonatën — në vend që të hamendësojnë.",
      },
      {
        question: "A duhet ta rindërtojmë sistemin për të shtuar AI?",
        answer:
          "Zakonisht jo. Shumica e funksioneve AI lidhen me faqen, CRM-në ose aplikacionin tuaj ekzistues përmes API-ve, pa pasur nevojë për rindërtim.",
      },
    ],
  },
  "business-automation": {
    overview:
      "Zëvendësojmë punën manuale dhe të përsëritur (mesazhe, futje të dhënash, porosi, dokumente, ndjekje klientësh) me procese të automatizuara, lidhim mjetet që përdorin departamentet tuaja që të dhënat të kalojnë mes tyre, dhe ju japim panele e raporte që tregojnë si po ecën vërtet biznesi. Hap pas hapi, proceset me letra dhe fletëllogaritje bëhen sisteme digjitale të lidhura.",
    capabilities: [
      "Automatizim procesesh",
      "Automatizim porosish dhe dokumentesh",
      "Automatizim komunikimi dhe ndjekjeje",
      "Lidhje mes sistemeve",
      "Panele dhe raporte të automatizuara",
      "Analizë dhe rikonceptim procesesh",
      "Kalim i proceseve me letra dhe fletëllogaritje online",
      "Procese mes departamenteve",
    ],
    whatWeBuild: [
      "Procese të automatizuara që zëvendësojnë hapat manualë",
      "Sisteme të lidhura që ndajnë të dhëna në kohë reale",
      "Panele biznesi dhe raporte të automatizuara",
      "Plane hap pas hapi për digjitalizim",
    ],
    faq: [
      {
        question: "Përdorim tashmë disa mjete të palidhura. A mund të ndihmoni?",
        answer:
          "Po. Një pikënisje e zakonshme është lidhja e mjeteve që keni përmes automatizimit, para se të mendohet për një rindërtim të plotë.",
      },
      {
        question: "Si e përcaktoni një projekt automatizimi?",
        answer:
          "Nisim duke hartuar procesin tuaj aktual nga fillimi në fund, gjejmë ku ka punë manuale dhe biem dakord çfarë të automatizojmë së pari për fitimin më të shpejtë.",
      },
      {
        question: "Ku duhet të nisë një ndryshim digjital më i madh?",
        answer:
          "Me një fazë të shkurtër zbulimi që harton proceset tuaja dhe zgjedh një ose dy ndryshimet me ndikimin më të shpejtë, pastaj ndërtojmë mbi to me faza.",
      },
    ],
  },
  "custom-software": {
    overview:
      "Kur mjetet e gatshme ju detyrojnë të punoni si duan ato, ne ndërtojmë softuer sipas mënyrës suaj: sisteme menaxhimi, portale klientësh, panele të brendshme dhe platforma rezervimi në web, si dhe aplikacione iOS e Android për klientët ose stafin, të gjitha mbi të njëjtin sistem dhe të ndërtuara që të mirëmbahen lehtë ndërsa rriteni.",
    capabilities: [
      "Sisteme menaxhimi biznesi (si CRM / ERP)",
      "Portale klientësh dhe panele të brendshme",
      "Sisteme rezervimi dhe planifikimi",
      "Aplikacione iOS dhe Android",
      "Akses sipas roleve për stafin, klientët dhe administratorët",
      "Integrime me mjetet që përdorni tashmë",
      "Modernizim sistemesh të vjetra dhe migrim të dhënash",
      "Funksione në kohë reale dhe njoftime",
    ],
    whatWeBuild: [
      "Platforma operacionesh dhe menaxhimi",
      "Portale për klientët",
      "Aplikacione mobile për klientët ose stafin",
      "Integrime mes mjeteve ekzistuese",
    ],
    faq: [
      {
        question: "Si e përcaktoni një projekt softueri të personalizuar?",
        answer:
          "Nisim me një fazë zbulimi për të hartuar procesin tuaj aktual, përcaktojmë çfarë duhet të bëjë softueri dhe biem dakord për qëllimin para se të fillojë zhvillimi.",
      },
      {
        question: "A mund të zëvendësojë softueri i personalizuar disa mjete që përdorim sot?",
        answer:
          "Shpesh po. Një rezultat i zakonshëm është bashkimi i disa mjeteve të palidhura në një sistem të vetëm, të ndërtuar sipas mënyrës si funksionon biznesi juaj.",
      },
      {
        question: "A ndërtoni edhe web edhe mobile?",
        answer:
          "Po. Ndërtojmë gjithçka (ndërfaqen, backend-in, databazën dhe API-të), dhe aplikacione iOS e Android zakonisht nga një kod i përbashkët, të lidhura me të njëjtin sistem.",
      },
    ],
  },
  "web-development": {
    overview:
      "Projektojmë dhe ndërtojmë faqe interneti të shpejta dhe të aksesueshme që e përfaqësojnë biznesin tuaj si duhet online, nga faqe korporative deri te faqe fushatash, shumëgjuhëshe dhe gati për motorët e kërkimit, mbi baza moderne dhe të mirëmbajtshme.",
    capabilities: [
      "Faqe korporative",
      "Faqe marketingu",
      "Faqe fushatash (landing pages)",
      "Faqe shumëgjuhëshe",
      "Faqe me performancë të lartë",
      "Integrime CMS",
      "Arkitekturë gati për SEO",
    ],
    whatWeBuild: [
      "Faqe për kompaninë dhe produktet",
      "Faqe për fushata dhe lançime",
      "Faqe marketingu me menaxhim përmbajtjeje",
      "Faqe shumëgjuhëshe",
    ],
    faq: [
      {
        question: "Sa zgjat zakonisht një projekt faqeje interneti?",
        answer:
          "Një faqe marketingu ose korporative zakonisht zgjat disa javë nga fillimi deri në publikim, në varësi të qëllimit, gatishmërisë së përmbajtjes dhe numrit të modeleve të faqeve.",
      },
      {
        question: "A mund të punoni me udhëzimet tona ekzistuese të markës?",
        answer:
          "Po. Ndërtojmë brenda sistemit tuaj të markës kur ekziston, dhe mund t'ju ndihmojmë ta zgjeroni për web aty ku ende nuk e mbulon.",
      },
    ],
  },
  "maintenance-support": {
    overview:
      "Lançimi është fillimi, jo fundi. Konfigurojmë hostimin në cloud dhe publikimet e automatizuara që e mbajnë faqen, aplikacionin ose agjentin tuaj AI të disponueshëm dhe të sigurt, pastaj kujdesemi për të me përditësime, monitorim, riparime dhe përmirësime të vogla, pa pasur nevojë për një ekip teknik të brendshëm.",
    capabilities: [
      "Konfigurim hostimi në cloud",
      "Publikime të automatizuara",
      "Monitorim dhe njoftime për ndërprerje",
      "Kopje rezervë dhe rikuperim",
      "Përditësime sigurie dhe varësish",
      "Riparime dhe përmirësime të vogla",
      "Optimizim performance",
      "Mbështetje teknike",
    ],
    whatWeBuild: [
      "Mjedise hostimi për prodhim",
      "Publikime të automatizuara",
      "Monitorim dhe njoftime",
      "Plane mirëmbajtjeje të vazhdueshme",
    ],
    faq: [
      {
        question: "A na duhet një plan mbështetjeje pas lançimit?",
        answer:
          "Është opsional por i rekomanduar. Softueri ka nevojë për përditësime me kalimin e kohës (sigurie, varësish, riparime të vogla) që të mbetet i besueshëm.",
      },
      {
        question: "A mund të merrni përsipër hostimin ose infrastrukturën tonë ekzistuese?",
        answer:
          "Po. I rishikojmë dhe i marrim përsipër mjediset ekzistuese, duke i dokumentuar dhe përmirësuar aty ku duhet.",
      },
    ],
  },
};

export const industryTranslationsSq: Record<string, { title: string; overview: string; problems: string[] }> = {
  healthcare: {
    title: "Shëndetësi",
    overview: "Klinikat dhe ofruesit shëndetësorë kanë nevojë për softuer që trajton në mënyrë të besueshme rezervimet, kartelat e pacientëve dhe komunikimin, pa shtuar vështirësi në kujdes.",
    problems: [
      "Planifikim dhe kujtesë manuale takimesh",
      "Informacioni i pacientëve i shpërndarë nëpër sisteme",
      "Prezencë e kufizuar online për tërheqjen e pacientëve të rinj",
    ],
  },
  retail: {
    title: "Tregti me Pakicë",
    overview: "Bizneset e tregtisë kanë nevojë të menaxhojnë inventarin, të shesin nëpër kanale të shumta, dhe t'i japin klientit një përvojë të qetë online dhe në dyqan.",
    problems: [
      "Inventar i shkëputur nëpër kanale shitjeje",
      "Dyqane online të vjetruara ose të kufizuara nga shablloni",
      "Ndjekje manuale e porosive dhe stokut",
    ],
  },
  hospitality: {
    title: "Mikpritje",
    overview: "Restorantet, hotelet dhe bizneset e mikpritjes varen nga përvoja të qeta rezervimi dhe operacione që mbajnë ritmin gjatë kërkesës maksimale.",
    problems: [
      "Rezervime vetëm me telefon",
      "Mungesë dukshmërie mbi disponueshmërinë në kohë reale",
      "Koordinim manual mes sallës dhe operacioneve",
    ],
  },
  "real-estate": {
    title: "Patundshmëri",
    overview: "Bizneset e patundshmërive kanë nevojë të prezantojnë pronat në mënyrë profesionale dhe të menaxhojnë me efikasitet kërkesat, vizitat dhe komunikimin me klientët.",
    problems: [
      "Lista pronash që s'konvertojnë apo renditen mirë",
      "Trajtim manual i kërkesave dhe vizitave",
      "Mungesë sistemi të centralizuar për të dhëna klientësh dhe pronash",
    ],
  },
  "professional-services": {
    title: "Shërbime Profesionale",
    overview: "Firmat që ofrojnë shërbime profesionale kanë nevojë për një prezencë online të besueshme dhe sisteme të brendshme që mbajnë punën e klientëve të organizuar.",
    problems: [
      "Një sajt që s'pasqyron besueshmërinë e firmës",
      "Informacioni i klientëve i shpërndarë mes email-esh dhe fletëllogaritjesh",
      "Ndjekje manuale dhe e rastësishme e projekteve dhe dokumenteve",
    ],
  },
  smb: {
    title: "Biznese të Vogla & të Mesme",
    overview: "SME-të shpesh kanë nevojë për një kombinim prezence të fortë online dhe softueri të lehtë për operacionet e përditshme, pa koston apo kompleksitetin e softuerit enterprise.",
    problems: [
      "Rritje përtej fletëllogaritjeve dhe proceseve manuale",
      "Buxhet i kufizuar për softuer enterprise",
      "Nevojë për një partner të vetëm për web dhe softuer",
    ],
  },
};

export const solutionTranslationsSq: Record<
  string,
  {
    title: string;
    problem: string;
    shortDescription: string;
    solution: string;
    features: string[];
    benefits: string[];
  }
> = {
  "business-management-systems": {
    title: "Sisteme Menaxhimi Biznesi",
    problem:
      "Operacionet tua funksionojnë nëpër fletëllogaritje, letra, dhe vegla të shkëputura — dhe kjo po ngadalëson gjithçka.",
    shortDescription: "Një sistem i vetëm për të menaxhuar stafin, operacionet, inventarin dhe raportimin.",
    solution:
      "Një sistem menaxhimi i personalizuar i ndërtuar rreth workflow-it tënd real, duke i dhënë ekipit tënd një vend të vetëm për të menaxhuar operacionet e përditshme, në vend që të mbledhë informacion nga disa vegla.",
    features: [
      "Akses stafi sipas roli",
      "Ndjekje operacionesh & inventari",
      "Raportim i centralizuar",
      "Workflow të personalizuara për çdo departament",
    ],
    benefits: [
      "Më pak kohë e shpenzuar duke rakorduar të dhëna mes veglave",
      "Dukshmëri e qartë mbi operacionet e përditshme",
      "Më pak gabime manuale",
      "Një sistem që rritet bashkë me biznesin tënd",
    ],
  },
  "booking-appointment-platforms": {
    title: "Platforma Rezervimesh & Takimesh",
    problem:
      "Rezervimi me telefon apo manual po të kushton kohë, dhe mungesat në paraqitje po dëmtojnë të ardhurat.",
    shortDescription: "Lejo klientët të rezervojnë, ndryshojnë, dhe paguajnë online — automatikisht.",
    solution:
      "Një platformë rezervimesh që lejon klientët të planifikojnë takime direkt, me kujtesë automatike, menaxhim kalendari, dhe pagesë online opsionale — duke reduktuar punën administrative dhe mungesat.",
    features: [
      "Disponueshmëri & planifikim në kohë reale",
      "Kujtesë automatike",
      "Kalendarë stafi & burimesh",
      "Pagesë online opsionale",
    ],
    benefits: [
      "Më pak takime të humbura",
      "Më pak kohë e shpenzuar në planifikim manual",
      "Përvojë rezervimi më profesionale për klientët",
    ],
  },
  "e-commerce-solutions": {
    title: "Zgjidhje E-Commerce",
    problem:
      "Ke nevojë të shesësh online, por platformat ekzistuese s'përshtaten me mënyrën si funksionon katalogu apo operacionet e tua.",
    shortDescription: "Një dyqan i ndërtuar rreth produkteve tua, jo një shabllon.",
    solution:
      "Një ndërtim e-commerce i personalizuar që përshtatet me katalogun, çmimet, dhe procesin e përmbushjes së porosive, në vend që ta detyrojë biznesin tënd në një shabllon gjenerik.",
    features: [
      "Dizajn i personalizuar dyqani",
      "Menaxhim inventari & porosish",
      "Integrim porte pagese",
      "Mbështetje multi-monedhë & shumëgjuhëshe",
    ],
    benefits: [
      "Një dyqan që përputhet me markën tënde",
      "Menaxhim më i lehtë i përditshëm i dyqanit",
      "Hapësirë për t'u shkallëzuar përtej kufizimeve të shablloneve",
    ],
  },
  "customer-portals": {
    title: "Portale Klientësh",
    problem: "Klientët vazhdojnë të telefonojnë apo shkruajnë email për informacion që mund ta merrnin vetë.",
    shortDescription: "Një portal vetëshërbimi për klientët tuaj.",
    solution:
      "Një portal i sigurt ku klientët tuaj mund të kyçen për të parë porositë, dokumentet, statusin e projektit, apo informacionin e llogarisë — duke reduktuar ngarkesën e suportit dhe duke përmirësuar përvojën e tyre.",
    features: [
      "Autentikim i sigurt klientësh",
      "Akses vetëshërbimi në llogari & dokumente",
      "Ndjekje statusi & porosish",
      "Njoftime",
    ],
    benefits: [
      "Më pak kërkesa rutinë suporti",
      "Përvojë klienti më profesionale",
      "Të dhëna klientësh të centralizuara",
    ],
  },
  "business-automation": {
    title: "Automatizim Biznesi",
    problem: "Ekipi yt kalon orë të tëra në punë manuale të përsëritur që softueri mund ta trajtonte.",
    shortDescription: "Automatizo pjesët e përsëritura të workflow-it tënd.",
    solution:
      "Identifikojmë proceset manuale të përsëritura — hyrje të dhënash, raportim, njoftime, miratime — dhe i automatizojmë, duke liruar ekipin tënd të fokusohet në punë me vlerë më të lartë.",
    features: [
      "Automatizim workflow-esh",
      "Raportim i automatizuar",
      "Integrime sistem-me-sistem",
      "Rrjedha njoftimi & miratimi",
    ],
    benefits: [
      "Orë të kursyera në punë manuale çdo javë",
      "Më pak gabime njerëzore në detyra të përsëritura",
      "Kthim më i shpejtë në proceset e brendshme",
    ],
  },
};
