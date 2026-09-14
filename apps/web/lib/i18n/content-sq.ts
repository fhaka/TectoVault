// Albanian translations for the list/card-level content (titles + short
// descriptions) of services, projects and industries. Deep page content —
// full overviews, capability lists, FAQs, challenge/solution paragraphs —
// remains in English for now; this covers what appears in navigation,
// listing pages and cards across the site.

export const serviceTranslationsSq: Record<string, { title: string; shortDescription: string }> = {
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
  "nails-by-mikela": {
    name: "Nails by Mikela — Sajt Studioje",
    description: "Sajt editorial për një studio thonjsh — shërbime, portofol, çmime dhe rezervim, i projektuar rreth punës së vetë studios.",
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

export const industryTranslationsSq: Record<string, { title: string; overview: string }> = {
  healthcare: {
    title: "Shëndetësi",
    overview: "Klinikat dhe ofruesit shëndetësorë kanë nevojë për softuer që trajton në mënyrë të besueshme rezervimet, kartelat e pacientëve dhe komunikimin, pa shtuar vështirësi në kujdes.",
  },
  retail: {
    title: "Tregti me Pakicë",
    overview: "Bizneset e tregtisë kanë nevojë të menaxhojnë inventarin, të shesin nëpër kanale të shumta, dhe t'i japin klientit një përvojë të qetë online dhe në dyqan.",
  },
  hospitality: {
    title: "Mikpritje",
    overview: "Restorantet, hotelet dhe bizneset e mikpritjes varen nga përvoja të qeta rezervimi dhe operacione që mbajnë ritmin gjatë kërkesës maksimale.",
  },
  "real-estate": {
    title: "Patundshmëri",
    overview: "Bizneset e patundshmërive kanë nevojë të prezantojnë pronat në mënyrë profesionale dhe të menaxhojnë me efikasitet kërkesat, vizitat dhe komunikimin me klientët.",
  },
  "professional-services": {
    title: "Shërbime Profesionale",
    overview: "Firmat që ofrojnë shërbime profesionale kanë nevojë për një prezencë online të besueshme dhe sisteme të brendshme që mbajnë punën e klientëve të organizuar.",
  },
  smb: {
    title: "Biznese të Vogla & të Mesme",
    overview: "SME-të shpesh kanë nevojë për një kombinim prezence të fortë online dhe softueri të lehtë për operacionet e përditshme, pa koston apo kompleksitetin e softuerit enterprise.",
  },
};
