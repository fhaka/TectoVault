"use client";

import { LegalLayout } from "@/components/shared/legal-layout";
import { siteConfig } from "@/lib/site-config";
import { useTranslation } from "@/lib/i18n/language-context";

export function PrivacyBody() {
  const { locale, tx } = useTranslation();

  if (locale === "sq") {
    return (
      <LegalLayout title="Privacy Policy" titleSq="Politika e Privatësisë" lastUpdated="8 Nëntor 2026">
        <section>
          <h2>1. Kush jemi</h2>
          <p>
            {siteConfig.legalName} (&ldquo;{siteConfig.name}&rdquo;, &ldquo;ne&rdquo;) ofron zhvillim
            softueri dhe shërbime të ngjashme. Kjo politikë shpjegon çfarë të dhënash personale
            mbledhim përmes {siteConfig.url}, pse, dhe çfarë të drejtash ke mbi to.
          </p>
        </section>

        <section>
          <h2>2. Të dhënat që mbledhim</h2>
          <ul>
            <li>Detaje kontakti që dërgon përmes formularëve tanë (emër, email, telefon, kompani)</li>
            <li>Detaje projekti të dërguara përmes formularit të kërkesës për ofertë</li>
            <li>Detaje aplikimi të dërguara përmes faqes së karrierave (CV, letër motivimi, linke)</li>
            <li>Mesazhet që i shkruan agjentit tonë AI në këtë sajt, dhe detajet që jep nëse kërkon të rezervosh një takim</li>
            <li>Mesazhet që na dërgon në WhatsApp</li>
          </ul>
        </section>

        <section>
          <h2>3. Si i përdorim të dhënat tua</h2>
          <ul>
            <li>Për t’iu përgjigjur pyetjeve dhe kërkesave për ofertë</li>
            <li>Për të vlerësuar aplikimet për punë</li>
            <li>Për të përmirësuar sajtin dhe shërbimet tona</li>
            <li>Për të përmbushur detyrime ligjore dhe kontabël</li>
          </ul>
        </section>

        <section>
          <h2>4. Agjenti AI në këtë sajt</h2>
          <p>
            Agjenti AI në këtë sajt i shkruan përgjigjet me modele AI që i ekzekuton Cloudflare
            (Workers AI) ose, kur aktivizohen, me modelet Claude të Anthropic. Kur i shkruan, mesazhet e
            bisedës dërgohen te ky ofrues për të gjeneruar përgjigjen. Ofruesi i përpunon ato si
            nënpërpunues dhe, sipas kushteve të veta, nuk i përdor për të trajnuar modelet e veta AI. Ne
            nuk e ruajmë bisedën në serverët tanë.
          </p>
          <p>
            Nëse i kërkon agjentit të rezervojë një takim, emri, email-i, ora që zgjedh dhe tema që
            përshkruan na dërgohen si kërkesë kontakti dhe trajtohen si çdo mesazh tjetër që na dërgon.
            Mos ndaj informacion të ndjeshëm (si të dhëna shëndetësore apo financiare) në bisedë.
          </p>
        </section>

        <section>
          <h2>5. Agjentët AI që ndërtojmë për klientët tanë</h2>
          <p>
            Kur ndërtojmë dhe mirëmbajmë një agjent AI për një biznes, ai biznes është kontrolluesi i të
            dhënave të klientëve të vet, dhe ne veprojmë si përpunues në emër të tij, sipas një
            marrëveshjeje për përpunimin e të dhënave. Përdorim ato të dhëna vetëm për të ofruar
            shërbimin, jo për qëllimet tona, dhe jo për të trajnuar modele AI. Nëse ke folur me një
            agjent që kemi ndërtuar për një biznes tjetër, politika e privatësisë e atij biznesi
            shpjegon si trajtohen të dhënat e tua.
          </p>
        </section>

        <section>
          <h2>6. Baza ligjore</h2>
          <p>
            Procesojmë të dhëna personale bazuar në pëlqimin tënd (dërgimi i një formulari), interesin
            tonë legjitim për t’iu përgjigjur pyetjeve, dhe, kur zbatohet, ekzekutimin e një kontrate.
          </p>
        </section>

        <section>
          <h2>7. Ruajtja e të dhënave</h2>
          <p>
            Ruajmë të dhëna personale vetëm sa është e nevojshme për qëllimin për të cilin u mblodhën,
            ose siç kërkohet nga ligji. Dërgimet e formularit të kontaktit dhe kërkesës për ofertë
            ruhen deri në 24 muaj nga data e dërgimit, pas së cilës fshihen, përveç kur një
            marrëdhënie aktive klienti kërkon ruajtje më të gjatë (p.sh. për qëllime kontraktuale apo
            kontabël). Mund të kërkosh fshirje më të hershme në çdo kohë duke na kontaktuar.
          </p>
        </section>

        <section>
          <h2>8. Të drejtat tua</h2>
          <p>
            Në varësi të vendndodhjes tënde, mund të kesh të drejtë të aksesosh, korrigjosh, fshish,
            apo kufizosh përdorimin e të dhënave tua personale. Për të ushtruar këto të drejta, na
            kontakto te {siteConfig.contact.email}. Ke gjithashtu të drejtë të ankohesh te Komisioneri për
            të Drejtën e Informimit dhe Mbrojtjen e të Dhënave Personale.
          </p>
        </section>

        <section>
          <h2>9. Palët e treta</h2>
          <p>
            Përdorim një numër të kufizuar shërbimesh palësh të treta për të xhiruar sajtin tonë dhe
            për të komunikuar me ty: Cloudflare dhe ofrues të tjerë infrastrukture cloud për të
            hostuar sajtin dhe databazën tonë; Resend për dërgimin e email-eve transaksionale (si
            konfirmimet e formularit të kontaktit dhe kërkesës për ofertë); Cloudflare (Workers AI) dhe Anthropic për
            agjentin AI në këtë sajt; dhe WhatsApp (Meta) kur zgjedh të na shkruash atje, sipas kushteve të
            WhatsApp. S’përdorim aktualisht analitikë apo tracker reklamimi të palëve të treta në
            këtë sajt.
          </p>
        </section>

        <section>
          <h2>10. Kontakt</h2>
          <p>
            Për pyetje rreth kësaj politike, na kontakto te {siteConfig.contact.email} ose{" "}
            {tx(siteConfig.contact.address)}.
          </p>
        </section>
      </LegalLayout>
    );
  }

  return (
    <LegalLayout title="Privacy Policy" lastUpdated="November 8, 2026">
      <section>
        <h2>1. Who we are</h2>
        <p>
          {siteConfig.legalName} (&ldquo;{siteConfig.name}&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) provides
          software development and related services. This policy explains what personal data we collect
          through {siteConfig.url}, why, and what rights you have over it.
        </p>
      </section>

      <section>
        <h2>2. Data we collect</h2>
        <ul>
          <li>Contact details you submit through our forms (name, email, phone, company)</li>
          <li>Project details submitted through the request-a-quote form</li>
          <li>Application details submitted through our careers page (CV, cover letter, links)</li>
          <li>Messages you write to the AI agent on this website, and the details you give if you ask it to book a call</li>
          <li>Messages you send us on WhatsApp</li>
        </ul>
      </section>

      <section>
        <h2>3. How we use your data</h2>
        <ul>
          <li>To respond to enquiries and quote requests</li>
          <li>To evaluate job applications</li>
          <li>To improve our website and services</li>
          <li>To meet legal and accounting obligations</li>
        </ul>
      </section>

      <section>
        <h2>4. The AI agent on this website</h2>
        <p>
          The AI agent on this website writes its replies with AI models run by Cloudflare
          (Workers AI) or, when enabled, Anthropic&rsquo;s Claude models. When you chat with it, the
          messages in the conversation are sent to that provider to generate a response. The provider
          processes them as a sub-processor and, under its terms, does not use them to train its AI
          models. We do not store the conversation on our servers.
        </p>
        <p>
          If you ask the agent to book a call, your name, email, chosen time and the topic you
          describe are sent to us as a contact request and handled like any other message you send
          us. Please don&rsquo;t share sensitive information (such as health or financial details) in
          the chat.
        </p>
      </section>

      <section>
        <h2>5. AI agents we build for our clients</h2>
        <p>
          When we build and run an AI agent for a business, that business is the controller of its
          customers&rsquo; data and we act as a processor on its behalf, under a data processing
          agreement. We use that data only to provide the service, not for our own purposes and not
          to train AI models. If you spoke to an agent we built for another business, that
          business&rsquo;s privacy policy explains how your data is handled.
        </p>
      </section>

      <section>
        <h2>6. Legal basis</h2>
        <p>
          We process personal data based on your consent (submitting a form), our legitimate
          interest in responding to enquiries, and, where applicable, the performance of a
          contract.
        </p>
      </section>

      <section>
        <h2>7. Data retention</h2>
        <p>
          We retain personal data only as long as necessary for the purpose it was collected
          for, or as required by law. Contact form and quote request submissions are retained
          for up to 24 months from the date of submission, after which they are deleted unless
          an active client relationship requires longer retention (e.g. for contractual or
          accounting purposes). You may request earlier deletion at any time by contacting us.
        </p>
      </section>

      <section>
        <h2>8. Your rights</h2>
        <p>
          Depending on your location, you may have the right to access, correct, delete, or
          restrict the use of your personal data. To exercise these rights, contact us at{" "}
          {siteConfig.contact.email}. You also have the right to complain to Albania&rsquo;s
          Information and Data Protection Commissioner.
        </p>
      </section>

      <section>
        <h2>9. Third parties</h2>
        <p>
          We use a limited number of third-party services to operate our website and
          communicate with you: Cloudflare and other cloud infrastructure providers to host our
          website and database; Resend for delivering transactional emails (such as contact form
          and quote request confirmations); Cloudflare (Workers AI) and Anthropic for the AI agent on this website; and
          WhatsApp (Meta) when you choose to message us there, under WhatsApp&rsquo;s own terms. We
          do not currently use third-party analytics or advertising trackers on this website.
        </p>
      </section>

      <section>
        <h2>10. Contact</h2>
        <p>
          For questions about this policy, contact us at {siteConfig.contact.email} or{" "}
          {tx(siteConfig.contact.address)}.
        </p>
      </section>
    </LegalLayout>
  );
}
