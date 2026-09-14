import type { Metadata } from "next";
import { LegalLayout } from "@/components/shared/legal-layout";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = { title: "Cookie Policy" };

export default function CookiesPage() {
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
            <strong>Analytics cookies</strong> — help us understand how visitors use the site.
            [Confirm analytics provider and cookie names once implemented.]
          </li>
        </ul>
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
