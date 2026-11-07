"use client";

import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";
import { WhatsappIcon } from "@/components/shared/social-icons";
import { useTranslation } from "@/lib/i18n/language-context";
import { whatsappLink } from "@/lib/whatsapp";
import { stripLocale } from "@/lib/i18n/config";
import { useHideOnScroll } from "@/lib/use-hide-on-scroll";

// Pages that already show WhatsApp in their own layout.
const HIDDEN_ON = ["/request-quote"];

// Floating "message us on WhatsApp" button, bottom-left (the AI chat
// launcher sits bottom-right). Opens WhatsApp with a greeting pre-typed.
export function WhatsappButton() {
  const { t, locale } = useTranslation();
  const reduceMotion = useReducedMotion();
  const pathname = stripLocale(usePathname() || "/");
  const hidden = useHideOnScroll();

  if (HIDDEN_ON.includes(pathname)) return null;

  return (
    <motion.a
      href={whatsappLink(locale)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t("whatsapp.cta")}
      title={t("whatsapp.cta")}
      initial={reduceMotion ? false : { opacity: 0, scale: 0.6, y: 20 }}
      animate={hidden ? { opacity: 0, scale: 0.8, y: 24 } : { opacity: 1, scale: 1, y: 0 }}
      transition={hidden ? { duration: 0.2 } : { type: "spring", stiffness: 260, damping: 20 }}
      whileHover={reduceMotion ? undefined : { y: -3 }}
      aria-hidden={hidden || undefined}
      tabIndex={hidden ? -1 : undefined}
      className={cn("group fixed bottom-4 left-4 z-50 flex items-center gap-2 rounded-full bg-[#25D366] p-3 text-white shadow-[0_10px_30px_-6px_rgba(37,211,102,0.6)] sm:bottom-6 sm:left-6 sm:pr-5", hidden && "pointer-events-none")}
    >
      <WhatsappIcon className="size-6" />
      <span className="hidden text-sm font-semibold sm:inline">{t("whatsapp.short")}</span>
    </motion.a>
  );
}
