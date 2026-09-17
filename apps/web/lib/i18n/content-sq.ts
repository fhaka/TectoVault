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
    shortDescription: "Automatizim i proceseve, porosive dhe komunikimit të përsëritur.",
  },
  "custom-software": {
    title: "Softuer i Personalizuar",
    shortDescription: "Softuer i ndërtuar posaçërisht sipas modelit dhe nevojave të biznesit tënd.",
  },
  "web-applications": {
    title: "Aplikacione Web",
    shortDescription: "Platforma SaaS, panele kontrolli, portale dhe sisteme menaxhimi.",
  },
  "mobile-applications": {
    title: "Aplikacione Mobile",
    shortDescription: "Aplikacione profesionale Android dhe iOS për klientë dhe ekipe.",
  },
  "ai-integration": {
    title: "Integrim AI",
    shortDescription: "Sjellim inteligjencën artificiale në softuerin, sajtin dhe kanalet tuaja ekzistuese.",
  },
  "digital-transformation": {
    title: "Transformim Digjital",
    shortDescription: "Kthimi i proceseve tradicionale në sisteme digjitale të lidhura.",
  },
  "intelligent-operations": {
    title: "Operacione Inteligjente",
    shortDescription: "Lidhja e njerëzve, të dhënave, softuerit dhe automatizimit në një ekosistem.",
  },
  "web-development": {
    title: "Zhvillim Web",
    shortDescription: "Sajte korporative dhe marketingu, të ndërtuara për shpejtësi dhe konvertim.",
  },
  "cloud-devops": {
    title: "Cloud & DevOps",
    shortDescription: "Infrastrukturë e besueshme, e shkallëzueshme, dhe pipeline vendosjeje.",
  },
  "maintenance-support": {
    title: "Mirëmbajtje & Suport",
    shortDescription: "Kujdes i vazhdueshëm pas lançimit — përditësime, monitorim, riparime.",
  },
};

export const projectTranslationsSq: Record<string, { name: string; description: string }> = {
  "dental-clinic-platform": {
    name: "Klinikë Dentare — Platformë Rezervimesh",
    description: "Sajt dygjuhësh dhe platformë rezervimesh për një klinikë dentare private — shërbime, galeri, FAQ dhe rezervim online me llogari pacientësh.",
  },
  "fabrika-vaji-haka": {
    name: "Fabrika e Vajit HAKA — Sajt Fabrike",
    description: "Sajt marketingu për një fabrikë vaj ulliri ekstra të virgjër — produkte, procesi i prodhimit, galeri dhe porositje direkte me telefon dhe WhatsApp.",
  },
  "supermarket-pos": {
    name: "SuperMarket POS — Sistem Arke",
    description: "Sistem pikë-shitjeje dhe back-office për retail — faturim me barkod, çmime multi-monedhë, inventar, blerje dhe raportim shitjesh me role të ndryshme.",
  },
  "aurora-motors": {
    name: "Aurora Motors — Marketplace Makinash",
    description: "Marketplace premium për blerje dhe qira makinash luksoze — inspektime të certifikuara, kërkim sipas markës, lista dëshirash dhe shfletim shumëgjuhësh.",
  },
  "ironcore-gym": {
    name: "IronCore Gym — Anëtarësim & Klasa",
    description: "Sajt palestre dhe platformë anëtarësh — rezervim klasash, profile trajnerësh, plane anëtarësimi, blog dhe galeri me llogari anëtarësh.",
  },
  "haka-se-factory": {
    name: "HAKA-SE — Sajt Fabrike Rrjetash Teli",
    description: "Sajt trigjuhësh për një prodhues rrjetash teli të saldiluara dhe gardhesh në Elbasan — katalog produktesh, prezantim fabrike, FAQ, kërkesa ofertash dhe porositje me WhatsApp.",
  },
  "pirko-glass-management": {
    name: "Pirko Glass — Sistem Menaxhimi Porosish me AI",
    description: "Sistem i brendshëm menaxhimi për një prodhues xhamash dhe pasqyrash — AI nxjerr përmasat e xhamit direkt nga porositë në WhatsApp, llogarit çmimin sipas m², copë ose metër linear, dhe e çon porosinë nëpër prodhim, faturim dhe dërgesë.",
  },
  "pirko-glass-website": {
    name: "Pirko Glass — Website Ndërkombëtar",
    description: "Sajt ndërkombëtar dygjuhësh (shqip/anglisht) për një kompani xhami dhe pasqyrash — katalog i plotë shërbimesh e produktesh, një dizajnues virtual pasqyrash, asistent porositjeje me AI, dhe galeri e detajuar projektesh me hartë të madhe interaktive.",
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
    ],
    whatWeBuild: [
      "Agjentë zëri për telefon dhe rezervime",
      "Agjentë chat për web dhe kanale mesazhesh",
      "Agjentë të brendshëm për staf dhe operacione",
      "Agjentë shumëgjuhësh për klientët",
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
    ],
  },
  "business-automation": {
    overview:
      "Zëvendësojmë punën manuale të përsëritur — mesazhe, hyrje të dhënash, porosi, dokumente, ndjekje, sisteme të shkëputura — me workflow të automatizuara dhe të lidhura që punojnë vetë në sfond.",
    capabilities: [
      "Automatizim workflow-esh",
      "Automatizim porosish & dokumentesh",
      "Automatizim komunikimi",
      "Planifikim & njoftime",
      "Lidhje sistem-me-sistem",
      "Dokumentim automatik",
    ],
    whatWeBuild: [
      "Workflow të automatizuara që zëvendësojnë proceset manuale",
      "Sisteme të lidhura që shkëmbejnë të dhëna në kohë reale",
      "Automatizime njoftimi dhe ndjekjeje",
      "Sisteme automatike raportimi dhe dokumentimi",
    ],
    faq: [
      {
        question: "Përdorim tashmë disa vegla të shkëputura — a mund të ndihmoni?",
        answer:
          "Po. Një pikënisje e zakonshme është lidhja e veglave ekzistuese përmes automatizimit përpara se të mendohet për një rindërtim të plotë të personalizuar.",
      },
      {
        question: "Si e vlerësoni një projekt automatizimi?",
        answer:
          "Fillojmë duke hartuar procesin tënd aktual nga fillimi në fund, identifikojmë ku ndodh puna manuale, dhe biem dakord çfarë të automatizohet së pari për kthimin më të shpejtë.",
      },
    ],
  },
  "custom-software": {
    overview:
      "Kur veglat gati të përdorimit të detyrojnë të futesh në workflow-in e tyre në vend të tëndit, ne ndërtojmë softuer të formësuar rreth proceseve tua reale — operacione, planifikim, raportim, apo çdo gjë tjetër ndërmjet.",
    capabilities: [
      "Sisteme menaxhimi biznesi",
      "Aplikacione CRM & tip ERP",
      "Vegla raportimi & analitike",
      "Modernizim sistemesh të vjetra",
      "Integrime sistemesh",
      "Migrim të dhënash",
    ],
    whatWeBuild: [
      "Platforma operacionesh dhe menaxhimi",
      "Sisteme raportimi të brendshme",
      "Sisteme menaxhimi rezervimesh dhe porosish",
      "Integrime mes veglave ekzistuese",
    ],
    faq: [
      {
        question: "Si e vlerësoni një projekt softueri të personalizuar?",
        answer:
          "Fillojmë me një fazë zbulimi për të hartuar procesin tënd aktual, përcaktojmë çfarë duhet të bëjë softueri, dhe biem dakord për qëllimin përpara se të fillojë çdo zhvillim.",
      },
      {
        question: "A mund softueri i personalizuar të zëvendësojë disa vegla që përdorim sot?",
        answer:
          "Shpesh, po — një rezultat i zakonshëm është konsolidimi i disa veglave të shkëputura në një sistem të vetëm të ndërtuar rreth mënyrës si funksionon vërtet biznesi yt.",
      },
    ],
  },
  "web-applications": {
    overview:
      "Bëjmë zhvillim aplikacionesh web, nga portale klientësh deri te panele të brendshme kontrolli — ndërtojmë aplikacione që trajtojnë logjikë biznesi reale, përdorues realë, dhe të dhëna reale, të projektuara të mbeten të mirëmbajtshme ndërsa rriten.",
    capabilities: [
      "Portale klientësh & shërbimi",
      "Vegla dhe panele të brendshme",
      "Sisteme rezervimesh dhe planifikimi",
      "Kontroll aksesi sipas roli",
      "Veçori në kohë reale",
      "Integrime me palë të treta",
    ],
    whatWeBuild: [
      "Portale për klientët",
      "Panele operacionesh të brendshme",
      "Sisteme rezervimesh dhe takimesh",
      "Platforma multi-rol",
    ],
    faq: [
      {
        question: "A ndërtoni frontend-in dhe backend-in, apo vetëm njërën anë?",
        answer:
          "Ofrojmë zgjidhje të plotë: ndërfaqen që shohin përdoruesit e tu, dhe backend-in, databazën, dhe API-të pas saj, duke punuar si një sistem koherent.",
      },
      {
        question: "A mund aplikacioni të mbështesë role të ndryshme përdoruesish?",
        answer:
          "Po — aksesi sipas roli është pjesë standarde e mënyrës si projektojmë aplikacione me më shumë se një lloj përdoruesi, si staf, klientë, dhe administratorë.",
      },
    ],
  },
  "mobile-applications": {
    overview:
      "Ndërtojmë aplikacione mobile që lidhen me të njëjtin backend dhe logjikë biznesi si produktet tuaja web — për klientë, punonjës, dhe operacione të brendshme.",
    capabilities: [
      "Aplikacione iOS & Android",
      "Zhvillim ndër-platformë",
      "Integrim API & backend",
      "Njoftime push",
      "Përgatitje & dorëzim në app store",
    ],
    whatWeBuild: [
      "Aplikacione mobile për klientët",
      "Aplikacione për staf/terren",
      "Aplikacione shoqëruese për platforma ekzistuese",
    ],
    faq: [
      {
        question: "A ndërtoni për iOS dhe Android njëkohësisht?",
        answer:
          "Po, zakonisht nga një bazë kodi e vetme ndër-platformë, përveç rasteve kur një projekt kërkon specifikisht zhvillim nativ.",
      },
    ],
  },
  "ai-integration": {
    overview:
      "Nuk të duhet gjithmonë të rindërtosh nga zero. Integrojmë inteligjencën artificiale në sajtin, aplikacionet, sistemet CRM, dhe kanalet tua ekzistuese të komunikimit — duke shtuar inteligjencë aty ku krijon vlerë reale.",
    capabilities: [
      "Integrim AI në sisteme ekzistuese",
      "Integrim CRM & kanalesh komunikimi",
      "Përmirësim sajti & aplikacioni ekzistues",
      "Integrim veçorish AI me bazë API",
      "Lidhje pipeline të dhënash",
    ],
    whatWeBuild: [
      "Veçori AI të shtuara në produkte ekzistuese",
      "Kërkim dhe rekomandime inteligjente",
      "Kanale komunikimi klientësh të përmirësuara me AI",
    ],
    faq: [
      {
        question: "Na duhet të rindërtojmë sistemin tonë për të shtuar AI?",
        answer:
          "Zakonisht jo — shumica e integrimeve AI lidhen me sistemin tënd ekzistues përmes API-ve në vend që të kërkojnë rindërtim.",
      },
    ],
  },
  "digital-transformation": {
    overview:
      "Bizneset po lëvizin nga vegla të shkëputura dhe procese manuale drejt sistemesh inteligjente që kuptojnë, automatizojnë, dhe optimizojnë vazhdimisht operacionet. Ne e ndërtojmë atë tranzicion.",
    capabilities: [
      "Analizë & rikonceptim procesesh",
      "Migrim nga sisteme të vjetra në digjitale",
      "Lidhje departamentesh",
      "Mbështetje për menaxhimin e ndryshimit",
      "Dizajn workflow-esh digjital-së-pari",
    ],
    whatWeBuild: [
      "Modele operacionale të modernizuara digjitalisht",
      "Workflow të lidhura, pa letra",
      "Udhërrëfyes transformimi me faza",
    ],
    faq: [
      {
        question: "Ku duhet të fillojë një transformim digjital?",
        answer:
          "Zakonisht me një fazë zbulimi që harton proceset ekzistuese dhe identifikon ku digjitalizimi dhe lidhja e sistemeve do të kenë ndikimin më të shpejtë.",
      },
    ],
  },
  "intelligent-operations": {
    overview:
      "Optimizojmë workflow-e, reduktojmë punën manuale, lidhim departamente, dhe mundësojmë vendime biznesi më të mençura, të bazuara në të dhëna — duke kthyer operacionet e përditshme në një sistem të vetëm inteligjent dhe të lidhur.",
    capabilities: [
      "Optimizim workflow-esh",
      "Lidhshmëri ndër-departamentesh",
      "Panele business intelligence",
      "Raportim & njohuri automatike",
      "Mbështetje vendimesh të bazuara në të dhëna",
    ],
    whatWeBuild: [
      "Panele dhe analitikë operacionale",
      "Workflow departamentesh të lidhura",
      "Sisteme automatike njohurie dhe raportimi",
    ],
    faq: [
      {
        question: "Ofroni mbështetje të vazhdueshme pasi sistemet të lidhen?",
        answer:
          "Po — kjo mbulohet zakonisht nën një angazhim optimizimi të vazhdueshëm, duke rafinuar automatizimet dhe panelet ndërsa biznesi evoluon.",
      },
    ],
  },
  "web-development": {
    overview:
      "Ofrojmë zhvillim faqesh web dhe krijim website të shpejtë e të aksesueshëm, që përfaqëson siç duhet biznesin tënd online — nga sajte korporative deri te faqe fushate, të gjitha të ndërtuara mbi baza moderne dhe të mirëmbajtshme.",
    capabilities: [
      "Sajte korporative",
      "Sajte marketingu",
      "Faqe fushate",
      "Sajte me performancë të lartë",
      "Integrime CMS",
      "Arkitekturë gati për SEO",
    ],
    whatWeBuild: [
      "Sajte kompanish dhe produktesh",
      "Faqe fushate dhe lançimi",
      "Sajte marketingu me menaxhim përmbajtjeje",
      "Sajte shumëgjuhëshe",
    ],
    faq: [
      {
        question: "Sa zgjat zakonisht një projekt sajti?",
        answer:
          "Një sajt marketingu apo korporativ zakonisht zgjat disa javë nga fillimi te lançimi, në varësi të qëllimit dhe gatishmërisë së përmbajtjes.",
      },
      {
        question: "A mund të punoni me udhëzimet tona ekzistuese të markës?",
        answer:
          "Po. Ndërtojmë brenda sistemit tënd ekzistues të markës kur ka një të tillë, dhe mund të ndihmojmë ta zgjerojmë për web kur ende s'e mbulon digjitalen.",
      },
    ],
  },
  "cloud-devops": {
    overview:
      "Vendosim infrastrukturë cloud dhe pipeline vendosjeje që mbajnë aplikacionin tënd të disponueshëm, të sigurt, dhe të lehtë për të lëshuar përditësime — pa pasur nevojë për një ekip infrastrukture të brendshëm.",
    capabilities: [
      "Arkitekturë cloud & hostim",
      "Pipeline CI/CD",
      "Konteinerizim",
      "Monitorim & alarmim",
      "Backup & rikuperim fatkeqësie",
      "Optimizim performance",
    ],
    whatWeBuild: [
      "Mjedise cloud prodhimi",
      "Pipeline vendosjeje të automatizuara",
      "Infrastrukturë aplikacioni e konteinerizuar",
      "Vegla monitorimi dhe kohe-funksionimi",
    ],
    faq: [
      {
        question: "A mund të merrni përsipër një infrastrukturë ekzistuese?",
        answer:
          "Po — rishikojmë dhe marrim rregullisht pronësi mbi mjedise cloud ekzistuese, duke i dokumentuar dhe përmirësuar kur nevojitet.",
      },
      {
        question: "Ofroni mbështetje të vazhdueshme për infrastrukturën?",
        answer: "Po, kjo mbulohet zakonisht nën një angazhim mirëmbajtjeje & suporti pas lançimit.",
      },
    ],
  },
  "maintenance-support": {
    overview:
      "Lançimi është fillimi, jo fundi. Ofrojmë plane mirëmbajtjeje që mbulojnë përditësime, monitorim, riparim gabimesh, dhe përmirësime të vogla që mbajnë produktin tënd të besueshëm.",
    capabilities: [
      "Përditësime sigurie & varësish",
      "Riparim gabimesh",
      "Monitorim performance",
      "Monitorim & alarmim kohe-funksionimi",
      "Përmirësime graduale veçorish",
      "Mbështetje teknike",
    ],
    whatWeBuild: [
      "Kontrata mirëmbajtjeje të vazhdueshme",
      "Konfigurim monitorimi & alarmimi",
      "Përmirësime graduale pas lançimit",
    ],
    faq: [
      {
        question: "Na duhet një plan suporti pas lançimit?",
        answer:
          "Është opsionale por e rekomanduar — softueri ka nevojë për përditësime me kohën (rregullime sigurie, përditësime varësish, riparime të vogla) për të mbetur i besueshëm.",
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
