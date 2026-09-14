import type { Metadata } from "next";
import { LegalLayout } from "@/components/shared/legal-layout";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
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
          <li>Basic analytics data (pages visited, approximate location, device type)</li>
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
          We retain personal data only as long as necessary for the purpose it was collected for,
          or as required by law. [Specify retention periods once confirmed.]
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
          We may use third-party services for hosting, analytics, and email delivery. [List
          specific providers once finalized — e.g. hosting provider, analytics provider, email
          provider.]
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
