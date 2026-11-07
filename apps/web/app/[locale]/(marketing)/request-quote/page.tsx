import type { Metadata } from "next";

import { RequestQuoteForm } from "@/components/forms/request-quote-form";
import { pageMetadata } from "@/lib/i18n/server";

export function generateMetadata(): Promise<Metadata> {
  return pageMetadata(
    "/request-quote",
    { en: "Request a Quote", sq: "Kërkoni një Ofertë" },
    {
      en: "Tell us about your software project in Albania and get a real, scoped estimate.",
      sq: "Na tregoni për projektin tuaj softuerik në Shqipëri dhe merrni një vlerësim real dhe të detajuar.",
    }
  );
}

export default function RequestQuotePage() {
  return (
    <section
      data-header-tone="dark"
      className="relative min-h-svh overflow-hidden bg-ink pb-20 pt-28 text-ink-foreground sm:pt-36 md:pt-40"
    >
      {/* Lit backdrop: grid, a soft glow behind the form, and a slow drifting orb. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,0.4)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.4)_1px,transparent_1px)] [background-size:4rem_4rem] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_45%_at_70%_20%,rgba(47,143,114,0.22),transparent)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 bottom-0 size-[36rem] animate-[pulse_8s_ease-in-out_infinite] rounded-full bg-accent/10 blur-3xl"
      />

      <div className="container-page relative">
        <RequestQuoteForm />
      </div>
    </section>
  );
}
