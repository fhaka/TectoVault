import { cn } from "@/lib/utils";

export function PageHero({
  eyebrow,
  title,
  description,
  className,
  children,
}: {
  eyebrow?: string;
  title?: React.ReactNode;
  description?: string;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className={cn("border-b border-border pb-12 pt-28 sm:pb-16 sm:pt-36 md:pb-20 md:pt-44", className)}>
      <div className="container-page">
        {eyebrow ? (
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.25em] text-accent">
            {eyebrow}
          </p>
        ) : null}
        {title ? (
          <h1 className="max-w-3xl text-balance text-3xl font-medium leading-[1.08] tracking-tight sm:text-4xl md:text-6xl">
            {title}
          </h1>
        ) : null}
        {description ? (
          <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:mt-6 sm:text-lg">
            {description}
          </p>
        ) : null}
        {children}
      </div>
    </section>
  );
}
