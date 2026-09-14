import { cn } from "@/lib/utils";

export function Section({
  className,
  children,
  id,
  tone = "default",
  headerTone,
}: {
  className?: string;
  children: React.ReactNode;
  id?: string;
  tone?: "default" | "muted" | "ink";
  headerTone?: "dark";
}) {
  return (
    <section
      id={id}
      data-header-tone={headerTone}
      className={cn(
        "py-16 sm:py-20 md:py-28",
        tone === "muted" && "bg-muted",
        tone === "ink" && "bg-ink text-ink-foreground",
        className
      )}
    >
      <div className="container-page">{children}</div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
  align = "left",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: string;
  className?: string;
  align?: "left" | "center";
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow ? (
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-balance text-3xl leading-[1.1] font-medium md:text-4xl lg:text-[2.75rem]">
        {title}
      </h2>
      {description ? (
        <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}
