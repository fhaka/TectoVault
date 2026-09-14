import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium tracking-wide uppercase",
  {
    variants: {
      variant: {
        default: "border-border bg-muted text-muted-foreground",
        accent: "border-transparent bg-accent/10 text-accent",
        outline: "border-border bg-transparent",
        inverse: "border-white/15 bg-white/5 text-ink-foreground",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

function Badge({
  className,
  variant,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return (
    <span className={cn(badgeVariants({ variant, className }))} {...props} />
  );
}

export { Badge, badgeVariants };
