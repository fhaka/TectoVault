import type { Metadata } from "next";
import { LegalLayout } from "@/components/shared/legal-layout";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = { title: "Terms of Service" };

export default function TermsPage() {
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
          Payment terms are defined per project in the relevant agreement. [Specify standard
          payment terms, e.g. deposit percentage, milestone structure, late payment policy.]
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
        <p>These terms are governed by the laws of [JURISDICTION].</p>
      </section>

      <section>
        <h2>8. Contact</h2>
        <p>Questions about these terms can be sent to {siteConfig.contact.email}.</p>
      </section>
    </LegalLayout>
  );
}
