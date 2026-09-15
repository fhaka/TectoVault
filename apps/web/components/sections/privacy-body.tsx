"use client";

import { LegalLayout } from "@/components/shared/legal-layout";
import { siteConfig } from "@/lib/site-config";
import { useTranslation } from "@/lib/i18n/language-context";

export function PrivacyBody() {
  const { locale } = useTranslation();

  if (locale === "sq") {
    return (
      <LegalLayout title="Privacy Policy" titleSq="Politika e Privatësisë" lastUpdated="20 Shtator 2026">
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
          <h2>4. Baza ligjore</h2>
          <p>
            Procesojmë të dhëna personale bazuar në pëlqimin tënd (dërgimi i një formulari), interesin
            tonë legjitim për t’iu përgjigjur pyetjeve, dhe, kur zbatohet, ekzekutimin e një kontrate.
          </p>
        </section>

        <section>
          <h2>5. Ruajtja e të dhënave</h2>
          <p>
            Ruajmë të dhëna personale vetëm sa është e nevojshme për qëllimin për të cilin u mblodhën,
            ose siç kërkohet nga ligji. Dërgimet e formularit të kontaktit dhe kërkesës për ofertë
            ruhen deri në 24 muaj nga data e dërgimit, pas së cilës fshihen, përveç kur një
            marrëdhënie aktive klienti kërkon ruajtje më të gjatë (p.sh. për qëllime kontraktuale apo
            kontabël). Mund të kërkosh fshirje më të hershme në çdo kohë duke na kontaktuar.
          </p>
        </section>

        <section>
          <h2>6. Të drejtat tua</h2>
          <p>
            Në varësi të vendndodhjes tënde, mund të kesh të drejtë të aksesosh, korrigjosh, fshish,
            apo kufizosh përdorimin e të dhënave tua personale. Për të ushtruar këto të drejta, na
            kontakto te {siteConfig.contact.email}.
          </p>
        </section>

        <section>
          <h2>7. Palët e treta</h2>
          <p>
            Përdorim një numër të kufizuar shërbimesh palësh të treta për të xhiruar sajtin tonë dhe
            për të komunikuar me ty: ofrues infrastrukture cloud për të hostuar sajtin dhe databazën
            tonë, dhe Resend për dërgimin e email-eve transaksionale (si konfirmimet e formularit të
            kontaktit dhe kërkesës për ofertë). S’përdorim aktualisht analitikë apo tracker
            reklamimi të palëve të treta në këtë sajt.
          </p>
        </section>

        <section>
          <h2>8. Kontakt</h2>
          <p>
            Për pyetje rreth kësaj politike, na kontakto te {siteConfig.contact.email} ose{" "}
            {siteConfig.contact.address}.
          </p>
        </section>
      </LegalLayout>
    );
  }

  return (
    <LegalLayout title="Privacy Policy" lastUpdated="September 20, 2026">
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
        <h2>4. Legal basis</h2>
        <p>
          We process personal data based on your consent (submitting a form), our legitimate
          interest in responding to enquiries, and, where applicable, the performance of a
          contract.
        </p>
      </section>

      <section>
        <h2>5. Data retention</h2>
        <p>
          We retain personal data only as long as necessary for the purpose it was collected
          for, or as required by law. Contact form and quote request submissions are retained
          for up to 24 months from the date of submission, after which they are deleted unless
          an active client relationship requires longer retention (e.g. for contractual or
          accounting purposes). You may request earlier deletion at any time by contacting us.
        </p>
      </section>

      <section>
        <h2>6. Your rights</h2>
        <p>
          Depending on your location, you may have the right to access, correct, delete, or
          restrict the use of your personal data. To exercise these rights, contact us at{" "}
          {siteConfig.contact.email}.
        </p>
      </section>

      <section>
        <h2>7. Third parties</h2>
        <p>
          We use a limited number of third-party services to operate our website and
          communicate with you: cloud infrastructure providers to host our website and
          database, and Resend for delivering transactional emails (such as contact form and
          quote request confirmations). We do not currently use third-party analytics or
          advertising trackers on this website.
        </p>
      </section>

      <section>
        <h2>8. Contact</h2>
        <p>
          For questions about this policy, contact us at {siteConfig.contact.email} or{" "}
          {siteConfig.contact.address}.
        </p>
      </section>
    </LegalLayout>
  );
}
