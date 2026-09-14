import type { Metadata } from "next";

import { RequestQuoteForm } from "@/components/forms/request-quote-form";

export const metadata: Metadata = {
  title: "Request a Quote",
  description: "Tell us about your project and get a real, scoped estimate.",
};

export default function RequestQuotePage() {
  return (
    <section className="relative min-h-svh overflow-hidden bg-ink pb-16 pt-24 text-ink-foreground sm:pb-24 sm:pt-36 md:pt-40">
      {/* Ambient glow so the dealt cards live in a lit space, not a void. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(47,143,114,0.18),transparent)]"
      />

      <div className="container-page relative">
        <h1 className="sr-only">Request a Quote</h1>
        <p className="mb-2 text-center text-xs font-semibold uppercase tracking-[0.25em] text-accent">
          Request a Quote
        </p>
        <RequestQuoteForm />
      </div>
    </section>
  );
}
