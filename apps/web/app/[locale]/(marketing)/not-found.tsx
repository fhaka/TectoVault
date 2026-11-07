import Link from "@/components/i18n/link";
import { ArrowLeft, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { getTx } from "@/lib/i18n/server";

export default async function NotFound() {
  const tx = await getTx();
  return (
    <section className="flex min-h-[80vh] flex-col items-center justify-center px-6 text-center">
      <p className="font-display text-8xl font-semibold text-accent">404</p>
      <h1 className="mt-6 text-2xl font-medium md:text-3xl">{tx("Page not found")}</h1>
      <p className="mt-3 max-w-sm text-muted-foreground">
        {tx("The page you’re looking for doesn’t exist or may have moved.")}
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Button asChild variant="accent">
          <Link href="/">
            <ArrowLeft className="size-4" /> {tx("Back to home")}
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/work">
            <Search className="size-4" /> {tx("Explore our work")}
          </Link>
        </Button>
      </div>
    </section>
  );
}
