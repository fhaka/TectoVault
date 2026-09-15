"use client";

import { LegalLayout } from "@/components/shared/legal-layout";
import { siteConfig } from "@/lib/site-config";
import { useTranslation } from "@/lib/i18n/language-context";

export function CookiesBody() {
  const { locale } = useTranslation();

  if (locale === "sq") {
    return (
      <LegalLayout title="Cookie Policy" titleSq="Politika e Cookies" lastUpdated="20 Shtator 2026">
        <section>
          <h2>1. Çfarë janë cookies</h2>
          <p>
            Cookies janë skedarë të vegjël teksti të ruajtur në pajisjen tënde që ndihmojnë sajtet të
            funksionojnë dhe të mbledhin informacion bazë përdorimi.
          </p>
        </section>

        <section>
          <h2>2. Cookies që përdorim</h2>
          <ul>
            <li>
              <strong>Cookies thelbësore</strong> — të nevojshme që sajti të funksionojë saktë.
            </li>
            <li>
              <strong>Ruajtje preferencash</strong> — përdorim local storage të browser-it tënd për
              të mbajtur mend gjuhën e zgjedhur (Anglisht/Shqip) mes vizitave. Kjo s'është një cookie
              gjurmimi dhe s'ndahet kurrë me palë të treta.
            </li>
          </ul>
          <p className="mt-4">
            Aktualisht s'përdorim cookies analitike apo reklamimi në këtë sajt. Nëse kjo ndryshon,
            kjo politikë do të përditësohet përkatësisht.
          </p>
        </section>

        <section>
          <h2>3. Menaxhimi i cookies</h2>
          <p>
            Mund të kontrollosh apo çaktivizosh cookies përmes cilësimeve të browser-it tënd.
            Çaktivizimi i cookies thelbësore mund të ndikojë se si funksionojnë disa pjesë të sajtit.
          </p>
        </section>

        <section>
          <h2>4. Kontakt</h2>
          <p>Pyetjet rreth përdorimit tonë të cookies mund të dërgohen te {siteConfig.contact.email}.</p>
        </section>
      </LegalLayout>
    );
  }

  return (
    <LegalLayout title="Cookie Policy" lastUpdated="September 20, 2026">
      <section>
        <h2>1. What are cookies</h2>
        <p>
          Cookies are small text files stored on your device that help websites function and
          collect basic usage information.
        </p>
      </section>

      <section>
        <h2>2. Cookies we use</h2>
        <ul>
          <li>
            <strong>Essential cookies</strong> — required for the website to function correctly.
          </li>
          <li>
            <strong>Preference storage</strong> — we use your browser's local storage to remember
            your selected language (English/Albanian) between visits. This is not a tracking
            cookie and is never shared with third parties.
          </li>
        </ul>
        <p className="mt-4">
          We do not currently use analytics or advertising cookies on this website. If that
          changes, this policy will be updated accordingly.
        </p>
      </section>

      <section>
        <h2>3. Managing cookies</h2>
        <p>
          You can control or disable cookies through your browser settings. Disabling essential
          cookies may affect how parts of this website function.
        </p>
      </section>

      <section>
        <h2>4. Contact</h2>
        <p>Questions about our use of cookies can be sent to {siteConfig.contact.email}.</p>
      </section>
    </LegalLayout>
  );
}
