import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site-config";

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn("flex items-center", className)}
      aria-label={`${siteConfig.name} home`}
    >
      <Image
        src="/images/tectovault-logo.png"
        alt={siteConfig.name}
        width={696}
        height={147}
        priority
        className="h-6 w-auto sm:h-7"
      />
    </Link>
  );
}
