"use client";

import { LegalLayout } from "@/components/shared/legal-layout";
import { siteConfig } from "@/lib/site-config";
import { useTranslation } from "@/lib/i18n/language-context";

export function TermsBody() {
  const { locale } = useTranslation();

  if (locale === "sq") {
    return (
      <LegalLayout title="Terms of Service" titleSq="Kushtet e Shërbimit" lastUpdated="20 Shtator 2026">
        <section>
          <h2>1. Pranimi i kushteve</h2>
          <p>
            Duke hyrë në {siteConfig.url} ose duke angazhuar {siteConfig.name} për shërbime, ti pranon
            këto kushte. Nëse s'pajtohesh, të lutem mos e përdor këtë sajt apo shërbimet tona.
          </p>
        </section>

        <section>
          <h2>2. Shërbimet</h2>
          <p>
            {siteConfig.name} ofron zhvillim softueri, zhvillim web, hostim cloud, dhe shërbime
            digjitale të ngjashme. Qëllimi specifik, dorëzimet, afati kohor dhe çmimi për çdo projekt
            biem dakord veçmas në një propozim apo kontratë me shkrim përpara se të fillojë puna.
          </p>
        </section>

        <section>
          <h2>3. Oferta dhe vlerësime</h2>
          <p>
            Shifrat e dhëna përmes faqes së çmimeve apo formularit të kërkesës për ofertë janë vetëm
            vlerësime dhe s'janë detyruese derisa të konfirmohen në një propozim apo marrëveshje të
            nënshkruar.
          </p>
        </section>

        <section>
          <h2>4. Pronësi intelektuale</h2>
          <p>
            Përveç rasteve kur biem dakord ndryshe me shkrim, pronësia e dorëzimeve të personalizuara
            kalon te klienti pas pagesës së plotë. {siteConfig.name} ruan të drejtën të ripërdorë
            njohuri të përgjithshme, teknika jo-konfidenciale, dhe komponentë të ripërdorshëm të
            zhvilluar gjatë një projekti.
          </p>
        </section>

        <section>
          <h2>5. Pagesa</h2>
          <p>
            Kushtet e pagesës përcaktohen për çdo projekt në marrëveshjen përkatëse. Përveç rasteve kur
            biem dakord ndryshe me shkrim, projektet kërkojnë një depozitë 40% përpara se të fillojë
            puna, me bilancin e mbetur të faturuar sipas etapave të rëna dakord ose në dorëzim.
            Faturat duhen paguar brenda 14 ditësh nga lëshimi; pagesat e vonuara mund të shkaktojnë
            një gjobë mujore 1.5% dhe mund të rezultojnë në pauzim të punës në vazhdim derisa llogaria
            të shlyhet.
          </p>
        </section>

        <section>
          <h2>6. Kufizimi i përgjegjësisë</h2>
          <p>
            Në shkallën më të plotë të lejuar nga ligji, {siteConfig.name} s'mban përgjegjësi për dëme
            indirekte, aksidentale, apo pasuese që dalin nga përdorimi i sajtit apo shërbimeve tona.
          </p>
        </section>

        <section>
          <h2>7. Ligji zbatues</h2>
          <p>
            Këto kushte rregullohen nga ligjet e Republikës së Shqipërisë, pa marrë parasysh parimet e
            konfliktit të ligjeve. Çdo mosmarrëveshje që lind sipas këtyre kushteve i nënshtrohet
            juridiksionit ekskluziv të gjykatave të Tiranës, Shqipëri.
          </p>
        </section>

        <section>
          <h2>8. Kontakt</h2>
          <p>Pyetjet rreth këtyre kushteve mund të dërgohen te {siteConfig.contact.email}.</p>
        </section>
      </LegalLayout>
    );
  }

  return (
    <LegalLayout title="Terms of Service" lastUpdated="September 20, 2026">
      <section>
        <h2>1. Acceptance of terms</h2>
        <p>
          By accessing {siteConfig.url} or engaging {siteConfig.name} for services, you agree to
          these terms. If you do not agree, please do not use this website or our services.
        </p>
      </section>

      <section>
        <h2>2. Services</h2>
        <p>
          {siteConfig.name} provides software development, web development, cloud hosting, and
          related digital services. The specific scope, deliverables, timeline and price for any
          project are agreed separately in a written proposal or contract before work begins.
        </p>
      </section>

      <section>
        <h2>3. Quotes and estimates</h2>
        <p>
          Figures provided through our pricing page or request-a-quote form are estimates only
          and are not binding until confirmed in a signed proposal or agreement.
        </p>
      </section>

      <section>
        <h2>4. Intellectual property</h2>
        <p>
          Unless otherwise agreed in writing, ownership of custom deliverables transfers to the
          client upon full payment. {siteConfig.name} retains the right to reuse general
          knowledge, non-confidential techniques, and reusable components developed during a
          project.
        </p>
      </section>

      <section>
        <h2>5. Payment</h2>
        <p>
          Payment terms are defined per project in the relevant agreement. Unless otherwise
          agreed in writing, projects require a 40% deposit before work begins, with the
          remaining balance invoiced against agreed milestones or upon delivery. Invoices are
          due within 14 days of issue; late payments may incur a 1.5% monthly late fee and may
          result in a pause of ongoing work until the account is settled.
        </p>
      </section>

      <section>
        <h2>6. Limitation of liability</h2>
        <p>
          To the fullest extent permitted by law, {siteConfig.name} is not liable for indirect,
          incidental, or consequential damages arising from the use of our website or services.
        </p>
      </section>

      <section>
        <h2>7. Governing law</h2>
        <p>These terms are governed by the laws of the Republic of Albania, without regard to its conflict of law principles. Any disputes arising under these terms shall be subject to the exclusive jurisdiction of the courts of Tirana, Albania.</p>
      </section>

      <section>
        <h2>8. Contact</h2>
        <p>Questions about these terms can be sent to {siteConfig.contact.email}.</p>
      </section>
    </LegalLayout>
  );
}
