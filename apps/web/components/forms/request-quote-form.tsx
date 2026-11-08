"use client";

import * as React from "react";
import { useForm, useWatch, type Path } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  CalendarClock,
  CalendarDays,
  Check,
  Globe,
  Infinity as InfinityIcon,
  Loader2,
  Mail,
  MessageSquareText,
  Phone,
  Sparkles,
  UploadCloud,
  User,
  X,
  Zap,
} from "lucide-react";

import Link from "@/components/i18n/link";
import { cn } from "@/lib/utils";
import { quoteSchema, type QuoteFormValues } from "@/lib/schemas";
import {
  projectTypeOptions,
  budgetOptions,
  timelineOptions,
  acceptedFileTypes,
  maxFileSizeMb,
  maxFiles,
} from "@/lib/quote-config";
import { services } from "@/content/services";
import { findPackage, packageKey, type PackageService, type ServicePackage } from "@/content/service-packages";
import { serviceToType, typeToService } from "@/lib/quote-link";
import { serviceTranslationsSq } from "@/lib/i18n/content-sq";
import { siteConfig } from "@/lib/site-config";
import { whatsappLink } from "@/lib/whatsapp";
import { WhatsappIcon } from "@/components/shared/social-icons";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/lib/i18n/language-context";

// Six short steps. The left rail shows progress and the answers given so
// far; the right card asks one question at a time. Choice steps move on by
// themselves once something is picked.
const steps = [
  { title: "What do you need?", label: "quote.step.service", fields: ["projectType"] as Path<QuoteFormValues>[] },
  { title: "Tell us about your project.", label: "quote.step.project", fields: ["description"] as Path<QuoteFormValues>[] },
  { title: "What's your budget?", label: "quote.step.budget", fields: ["budget"] as Path<QuoteFormValues>[] },
  { title: "When should it launch?", label: "quote.step.timeline", fields: ["timeline"] as Path<QuoteFormValues>[] },
  { title: "How can we reach you?", label: "quote.step.contact", fields: ["name", "email"] as Path<QuoteFormValues>[] },
  { title: "Anything to show us?", label: "quote.step.files", fields: [] as Path<QuoteFormValues>[] },
];

const MIN_DESCRIPTION = 20;
const AUTO_ADVANCE_MS = 420;

// Quote option -> service whose short description explains it.
const optionService: Record<string, string> = {
  "ai-agents": "ai-agents",
  "business-automation": "business-automation",
  "custom-software": "custom-software",
  website: "web-development",
  "maintenance-support": "maintenance-support",
};

const timelineIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  asap: Zap,
  "1-3-months": CalendarDays,
  "3-6-months": CalendarClock,
  flexible: InfinityIcon,
};

const ideaKeys = ["quote.idea1", "quote.idea2", "quote.idea3", "quote.idea4"];

const darkField =
  "h-12 w-full rounded-xl border border-white/10 bg-white/[0.05] pl-11 pr-4 text-sm text-white outline-none transition-colors placeholder:text-white/35 focus:border-accent focus:bg-white/[0.07] focus:ring-2 focus:ring-accent/25 aria-[invalid=true]:border-red-400/60";

export function RequestQuoteForm() {
  const { t, tx, locale } = useTranslation();
  const reduceMotion = useReducedMotion();
  const [step, setStep] = React.useState(0);
  const [direction, setDirection] = React.useState(1);
  const [submitted, setSubmitted] = React.useState(false);
  const [files, setFiles] = React.useState<File[]>([]);
  const [fileError, setFileError] = React.useState<string | null>(null);
  const [dragging, setDragging] = React.useState(false);
  const advanceTimer = React.useRef<number | null>(null);

  const {
    register,
    handleSubmit,
    trigger,
    setValue,
    setError,
    control,
    formState: { errors, isSubmitting },
  } = useForm<QuoteFormValues>({
    resolver: zodResolver(quoteSchema),
    defaultValues: { projectType: "", budget: "", timeline: "", description: "" },
  });

  const values = useWatch({ control });
  const [chosenPackage, setChosenPackage] = React.useState<{ service: PackageService; pkg: ServicePackage } | null>(null);
  // The package sentence we pre-filled; it doesn't count towards the minimum,
  // so visitors still describe the project in their own words.
  const [packageIntro, setPackageIntro] = React.useState("");
  const [pilot, setPilot] = React.useState(false);

  // Pre-fill from links such as /request-quote?type=ai-agents&package=growth
  // (pricing cards, service and industry pages): select the service, note
  // the package in the description, and start at the second step.
  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const type = params.get("type");
    if (!type || !projectTypeOptions.some((o) => o.value === type)) return;
    const service = typeToService(type);
    const pkg = service ? findPackage(service, params.get("package")) : null;
    const isPilot = type === "ai-agents" && params.get("offer") === "pilot";
    const id = window.setTimeout(() => {
      setValue("projectType", type);
      if (service && pkg) {
        setChosenPackage({ service, pkg });
        const option = projectTypeOptions.find((o) => o.value === type)!;
        const intro = t("quote.packageIntro")
          .replace("{name}", t(`${packageKey(service, pkg.id)}.name`))
          .replace("{service}", tx(option.label));
        setPackageIntro(intro);
        setValue("description", intro + " ");
      } else if (isPilot) {
        setPilot(true);
        const intro = t("pilot.quoteIntro");
        setPackageIntro(intro);
        setValue("description", intro + " ");
      }
      setDirection(1);
      setStep(1);
    }, 0);
    return () => window.clearTimeout(id);
    // Runs once on arrival; later language switches keep what was typed.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // The pilot is for AI agents only.
  React.useEffect(() => {
    if (pilot && values.projectType !== "ai-agents") {
      const id = window.setTimeout(() => setPilot(false), 0);
      return () => window.clearTimeout(id);
    }
  }, [pilot, values.projectType]);

  // A package belongs to one service; drop it if the visitor picks another.
  React.useEffect(() => {
    if (chosenPackage && values.projectType !== serviceToType[chosenPackage.service]) {
      const id = window.setTimeout(() => setChosenPackage(null), 0);
      return () => window.clearTimeout(id);
    }
  }, [chosenPackage, values.projectType]);

  React.useEffect(() => () => {
    if (advanceTimer.current) window.clearTimeout(advanceTimer.current);
  }, []);

  const goTo = React.useCallback(
    (target: number) => {
      setDirection(target > step ? 1 : -1);
      setStep(Math.max(0, Math.min(target, steps.length - 1)));
    },
    [step]
  );

  const description = values.description ?? "";
  const ownDescription = (
    packageIntro && description.trimStart().startsWith(packageIntro)
      ? description.trimStart().slice(packageIntro.length)
      : description
  ).trim();
  const descriptionLength = ownDescription.length;

  const next = React.useCallback(async () => {
    const valid = await trigger(steps[step].fields);
    if (!valid) return;
    if (step === 1 && descriptionLength < MIN_DESCRIPTION) {
      setError("description", { message: "Please describe your project in a bit more detail." });
      return;
    }
    goTo(step + 1);
  }, [descriptionLength, goTo, setError, step, trigger]);

  // Choice steps: select, then move on after a short beat.
  const choose = (field: "projectType" | "budget" | "timeline", value: string) => {
    setValue(field, value, { shouldValidate: true });
    if (advanceTimer.current) window.clearTimeout(advanceTimer.current);
    advanceTimer.current = window.setTimeout(() => goTo(step + 1), AUTO_ADVANCE_MS);
  };

  const addFiles = (list: File[]) => {
    setFileError(null);
    if (list.length + files.length > maxFiles) {
      setFileError(locale === "sq" ? `Mund të ngarkoni deri në ${maxFiles} skedarë.` : `You can upload up to ${maxFiles} files.`);
      return;
    }
    const tooLarge = list.find((f) => f.size > maxFileSizeMb * 1024 * 1024);
    if (tooLarge) {
      setFileError(
        locale === "sq"
          ? `"${tooLarge.name}" kalon kufirin prej ${maxFileSizeMb}MB.`
          : `"${tooLarge.name}" exceeds the ${maxFileSizeMb}MB limit.`
      );
      return;
    }
    const invalidType = list.find((f) => !acceptedFileTypes.some((ext) => f.name.toLowerCase().endsWith(ext)));
    if (invalidType) {
      setFileError(
        locale === "sq"
          ? `"${invalidType.name}" nuk është një lloj skedari i pranuar.`
          : `"${invalidType.name}" is not an accepted file type.`
      );
      return;
    }
    setFiles((prev) => [...prev, ...list]);
  };

  async function onSubmit(data: QuoteFormValues) {
    if (descriptionLength < MIN_DESCRIPTION) {
      goTo(1);
      setError("description", { message: "Please describe your project in a bit more detail." });
      return;
    }
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, attachments: files.map((f) => f.name) }),
      });
      if (!res.ok) throw new Error("Request failed");
      setSubmitted(true);
    } catch {
      toast.error(tx("Something went wrong submitting your request. Please try again or email us directly."));
    }
  }

  // Answers shown in the rail and on the review step.
  const answerFor = (index: number): string | null => {
    if (index === 0) {
      const opt = projectTypeOptions.find((o) => o.value === values.projectType);
      if (!opt) return null;
      if (chosenPackage) return `${tx(opt.label)} · ${t(`${packageKey(chosenPackage.service, chosenPackage.pkg.id)}.name`)}`;
      return pilot ? `${tx(opt.label)} · ${t("pilot.label")}` : tx(opt.label);
    }
    if (index === 1) {
      const d = ownDescription;
      return d.length >= MIN_DESCRIPTION ? (d.length > 42 ? `${d.slice(0, 42)}…` : d) : null;
    }
    if (index === 2) {
      const opt = budgetOptions.find((o) => o.value === values.budget);
      return opt ? tx(opt.label) : null;
    }
    if (index === 3) {
      const opt = timelineOptions.find((o) => o.value === values.timeline);
      return opt ? tx(opt.label) : null;
    }
    if (index === 4) return values.name && values.email ? `${values.name}` : null;
    if (index === 5) return files.length ? `${files.length} ${locale === "sq" ? "skedarë" : files.length === 1 ? "file" : "files"}` : null;
    return null;
  };

  const optionDescription = (value: string) => {
    const slug = optionService[value];
    if (!slug) return t("quote.other.desc");
    const service = services.find((s) => s.slug === slug);
    if (!service) return "";
    return locale === "sq" ? serviceTranslationsSq[slug]?.shortDescription ?? service.shortDescription : service.shortDescription;
  };

  const errorText = (message?: string) =>
    message ? (
      <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="mt-2 text-sm text-red-300">
        {tx(message)}
      </motion.p>
    ) : null;

  if (submitted) {
    return <SuccessCard />;
  }

  const progress = ((step + 1) / steps.length) * 100;
  return (
    <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
      {/* ---------- Left rail ---------- */}
      <aside className="lg:sticky lg:top-32 lg:self-start">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">{tx("Request a Quote")}</p>
          <h1 className="mt-4 text-balance font-display text-4xl font-medium leading-[1.02] md:text-5xl">
            {t("quote.heroTitle")}
          </h1>
          <p className="mt-4 max-w-sm text-white/60">{t("quote.heroBody")}</p>
        </motion.div>

        {/* Mobile: compact progress */}
        <div className="mt-6 lg:hidden">
          <div className="flex items-center justify-between text-xs text-white/60">
            <span>
              {tx("Step")} {step + 1} / {steps.length} · {t(steps[step].label)}
            </span>
            <span className="font-mono">{Math.round(progress)}%</span>
          </div>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
            <motion.div className="h-full origin-left rounded-full bg-accent" initial={false} animate={{ scaleX: progress / 100 }} transition={{ duration: 0.5 }} />
          </div>
        </div>

        {/* Desktop: vertical stepper with the answers so far */}
        <ol className="relative mt-10 hidden space-y-1 lg:block">
          {steps.map((s, i) => {
            const done = i < step;
            const current = i === step;
            const answer = done ? answerFor(i) : null;
            return (
              <li key={s.label} className="relative">
                {i < steps.length - 1 ? (
                  <span aria-hidden="true" className="absolute -bottom-1 left-[1.4rem] top-[3rem] w-px overflow-hidden bg-white/10">
                    <motion.span
                      className="block size-full origin-top bg-accent"
                      initial={false}
                      animate={{ scaleY: done ? 1 : 0 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    />
                  </span>
                ) : null}
                <button
                  type="button"
                  disabled={!done}
                  onClick={() => done && goTo(i)}
                  className={cn(
                    "group relative flex w-full items-start gap-4 rounded-2xl px-1 py-2.5 text-left transition-colors",
                    done && "hover:bg-white/[0.04]"
                  )}
                >
                  <span
                    className={cn(
                      "relative z-10 grid size-[2.3rem] shrink-0 place-items-center rounded-full border text-xs font-semibold transition-colors duration-300",
                      done && "border-accent bg-accent text-accent-foreground",
                      current && "border-accent bg-ink text-accent",
                      !done && !current && "border-white/15 bg-ink text-white/40"
                    )}
                  >
                    {current && !reduceMotion ? (
                      <motion.span
                        aria-hidden="true"
                        className="absolute inset-0 rounded-full border border-accent"
                        animate={{ scale: [1, 1.5], opacity: [0.7, 0] }}
                        transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
                      />
                    ) : null}
                    {done ? <Check className="size-4" /> : i + 1}
                  </span>
                  <span className="min-w-0 pt-1.5">
                    <span className={cn("block text-sm font-medium", current ? "text-white" : done ? "text-white/85" : "text-white/40")}>
                      {t(s.label)}
                    </span>
                    <AnimatePresence>
                      {answer ? (
                        <motion.span
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          className="mt-0.5 block truncate text-xs text-accent"
                        >
                          {answer}
                        </motion.span>
                      ) : null}
                    </AnimatePresence>
                  </span>
                </button>
              </li>
            );
          })}
        </ol>

        <div className="mt-10 hidden rounded-2xl border border-white/10 bg-white/[0.03] p-5 lg:block">
          <p className="text-sm font-medium">{t("quote.next.title")}</p>
          <ul className="mt-3 space-y-2 text-sm text-white/60">
            {["quote.next.1", "quote.next.2", "quote.next.3"].map((k, i) => (
              <li key={k} className="flex gap-2.5">
                <span className="font-mono text-accent">0{i + 1}</span>
                {t(k)}
              </li>
            ))}
          </ul>
          <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-white/10 pt-4 text-sm">
            <span className="text-white/50">{t("quote.talk")}</span>
            <a
              href={whatsappLink(locale)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-[#25D366]/15 px-3 py-1.5 font-medium text-[#4be08a] hover:bg-[#25D366]/25"
            >
              <WhatsappIcon className="size-4" /> WhatsApp
            </a>
            <a href={`mailto:${siteConfig.contact.email}`} className="inline-flex items-center gap-1.5 text-white/70 hover:text-white">
              <Mail className="size-4" /> Email
            </a>
          </div>
        </div>
      </aside>

      {/* ---------- Question card ---------- */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="relative"
        onKeyDown={(e) => {
          // Enter moves to the next step (the textarea keeps new lines, and
          // focused buttons keep their own Enter behaviour).
          const tag = (e.target as HTMLElement).tagName;
          if (e.key !== "Enter" || e.shiftKey || tag === "TEXTAREA" || tag === "BUTTON") return;
          e.preventDefault();
          if (step < steps.length - 1) void next();
        }}
      >
        <input type="text" tabIndex={-1} autoComplete="off" className="hidden" {...register("website")} />
        <div
          aria-hidden="true"
          className="absolute -inset-6 -z-10 rounded-[3rem] bg-[radial-gradient(ellipse_at_top,rgba(79,209,168,0.16),transparent_70%)] blur-xl"
        />
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035] shadow-[0_40px_120px_-40px_rgba(0,0,0,0.8)] backdrop-blur-xl">
          {/* Progress bar */}
          <div className="h-1 bg-white/5">
            <motion.div
              className="h-full origin-left bg-gradient-to-r from-accent to-[#4fd1a8]"
              initial={false}
              animate={{ scaleX: progress / 100 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>

          <div className="p-6 sm:p-10">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs tracking-widest text-white/45">
                {String(step + 1).padStart(2, "0")} / {String(steps.length).padStart(2, "0")}
              </span>
              <span className="text-xs font-medium uppercase tracking-[0.2em] text-accent">{t(steps[step].label)}</span>
            </div>

            <div className="mt-5 min-h-[3.5rem]">
              <AnimatePresence mode="wait" initial={false}>
                <AnimatedQuestion key={step} text={tx(steps[step].title)} />
              </AnimatePresence>
            </div>
            <p className="mt-2 text-sm text-white/50">{t(`quote.hint.${step}`)}</p>

            <div className="relative mt-8">
              <AnimatePresence mode="wait" initial={false} custom={direction}>
                <motion.div
                  key={step}
                  custom={direction}
                  initial={reduceMotion ? { opacity: 0 } : { opacity: 0, x: direction * 48, filter: "blur(6px)" }}
                  animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  exit={reduceMotion ? { opacity: 0 } : { opacity: 0, x: direction * -48, filter: "blur(6px)" }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  {step === 0 ? (
                    <div className="grid gap-3 sm:grid-cols-2">
                      {projectTypeOptions.map((opt, i) => {
                        const Icon = opt.icon;
                        const active = values.projectType === opt.value;
                        return (
                          <motion.button
                            type="button"
                            key={opt.value}
                            onClick={() => choose("projectType", opt.value)}
                            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            whileHover={reduceMotion ? undefined : { y: -3 }}
                            whileTap={{ scale: 0.98 }}
                            aria-pressed={active}
                            className={cn(
                              "group relative flex items-start gap-4 rounded-2xl border p-4 text-left transition-colors duration-300",
                              active
                                ? "border-accent bg-accent/10 shadow-[0_0_0_1px_rgba(79,209,168,0.4),0_16px_40px_-16px_rgba(79,209,168,0.45)]"
                                : "border-white/10 bg-white/[0.02] hover:border-white/25 hover:bg-white/[0.05]"
                            )}
                          >
                            <span
                              className={cn(
                                "grid size-11 shrink-0 place-items-center rounded-xl transition-colors",
                                active ? "bg-accent text-accent-foreground" : "bg-white/[0.06] text-accent group-hover:bg-white/10"
                              )}
                            >
                              <Icon className="size-5" />
                            </span>
                            <span className="min-w-0 pr-6">
                              <span className="block font-medium text-white">{tx(opt.label)}</span>
                              <span className="mt-1 block text-xs leading-relaxed text-white/50">{optionDescription(opt.value)}</span>
                            </span>
                            <AnimatePresence>
                              {active ? (
                                <motion.span
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  exit={{ scale: 0 }}
                                  transition={{ type: "spring", stiffness: 500, damping: 22 }}
                                  className="absolute right-3 top-3 grid size-5 place-items-center rounded-full bg-accent text-accent-foreground"
                                >
                                  <Check className="size-3" />
                                </motion.span>
                              ) : null}
                            </AnimatePresence>
                          </motion.button>
                        );
                      })}
                      <div className="sm:col-span-2">{errorText(errors.projectType?.message)}</div>
                    </div>
                  ) : null}

                  {step === 1 ? (
                    <div>
                      <div className="relative">
                        <MessageSquareText className="pointer-events-none absolute left-4 top-4 size-4 text-white/35" />
                        <textarea
                          id="description"
                          rows={7}
                          placeholder={tx("What are you trying to build? What problem should it solve?")}
                          aria-label={tx("Describe your project")}
                          aria-invalid={!!errors.description}
                          className={cn(darkField, "h-auto resize-none py-3.5 leading-relaxed")}
                          {...register("description")}
                        />
                      </div>
                      {packageIntro && descriptionLength < MIN_DESCRIPTION ? (
                        <p className="mt-2 text-xs text-white/55">{t("quote.packageHint")}</p>
                      ) : null}
                      <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="flex items-center gap-1 text-xs text-white/40">
                            <Sparkles className="size-3.5" /> {t("quote.ideas")}
                          </span>
                          {ideaKeys.map((k) => (
                            <button
                              key={k}
                              type="button"
                              onClick={() => {
                                const current = values.description?.trim() ?? "";
                                setValue("description", current ? `${current} ${t(k)}.` : `${t(k)}.`, { shouldValidate: descriptionLength > 0 });
                              }}
                              className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/70 transition-colors hover:border-accent/50 hover:text-white"
                            >
                              + {t(k)}
                            </button>
                          ))}
                        </div>
                        <span
                          className={cn(
                            "flex items-center gap-1 font-mono text-xs transition-colors",
                            descriptionLength >= MIN_DESCRIPTION ? "text-accent" : "text-white/40"
                          )}
                        >
                          {descriptionLength >= MIN_DESCRIPTION ? <Check className="size-3.5" /> : null}
                          {Math.min(descriptionLength, MIN_DESCRIPTION)}/{MIN_DESCRIPTION}
                        </span>
                      </div>
                      {errorText(errors.description?.message)}
                    </div>
                  ) : null}

                  {step === 2 ? (
                    <div className="grid gap-3 sm:grid-cols-2">
                      {budgetOptions.map((opt, i) => (
                        <ChoiceCard
                          key={opt.value}
                          index={i}
                          active={values.budget === opt.value}
                          onClick={() => choose("budget", opt.value)}
                          label={tx(opt.label)}
                          visual={
                            opt.value === "not-sure" ? (
                              <span className="font-display text-lg text-white/50">?</span>
                            ) : (
                              <span className="flex items-end gap-0.5">
                                {[0, 1, 2, 3].map((b) => (
                                  <motion.span
                                    key={b}
                                    className={cn("w-1.5 rounded-full", b <= i ? "bg-accent" : "bg-white/15")}
                                    initial={{ height: 4 }}
                                    animate={{ height: 6 + b * 4 }}
                                    transition={{ delay: 0.15 + b * 0.05 }}
                                  />
                                ))}
                              </span>
                            )
                          }
                        />
                      ))}
                      <div className="sm:col-span-2">{errorText(errors.budget?.message)}</div>
                    </div>
                  ) : null}

                  {step === 3 ? (
                    <div className="grid gap-3 sm:grid-cols-2">
                      {timelineOptions.map((opt, i) => {
                        const Icon = timelineIcons[opt.value] ?? CalendarDays;
                        return (
                          <ChoiceCard
                            key={opt.value}
                            index={i}
                            active={values.timeline === opt.value}
                            onClick={() => choose("timeline", opt.value)}
                            label={tx(opt.label)}
                            visual={<Icon className="size-5 text-accent" />}
                          />
                        );
                      })}
                      <div className="sm:col-span-2">{errorText(errors.timeline?.message)}</div>
                    </div>
                  ) : null}

                  {step === 4 ? (
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field icon={User} label={tx("Name")} error={errorText(errors.name?.message)}>
                        <input id="name" autoComplete="name" aria-invalid={!!errors.name} className={darkField} {...register("name")} />
                      </Field>
                      <Field icon={Mail} label={tx("Email")} error={errorText(errors.email?.message)}>
                        <input id="email" type="email" autoComplete="email" aria-invalid={!!errors.email} className={darkField} {...register("email")} />
                      </Field>
                      <Field icon={Building2} label={tx("Company (optional)")}>
                        <input id="company" autoComplete="organization" className={darkField} {...register("company")} />
                      </Field>
                      <Field icon={Phone} label={tx("Phone (optional)")}>
                        <input id="phone" type="tel" autoComplete="tel" className={darkField} {...register("phone")} />
                      </Field>
                      <div className="sm:col-span-2">
                        <Field icon={Globe} label={tx("Website (optional)")}>
                          <input id="companyWebsite" placeholder="https://" className={darkField} {...register("companyWebsite")} />
                        </Field>
                      </div>
                    </div>
                  ) : null}

                  {step === 5 ? (
                    <div className="space-y-5">
                      <label
                        htmlFor="attachments"
                        onDragOver={(e) => {
                          e.preventDefault();
                          setDragging(true);
                        }}
                        onDragLeave={() => setDragging(false)}
                        onDrop={(e) => {
                          e.preventDefault();
                          setDragging(false);
                          addFiles(Array.from(e.dataTransfer.files));
                        }}
                        className={cn(
                          "flex cursor-pointer flex-col items-center gap-2 rounded-2xl border border-dashed p-8 text-center transition-colors",
                          dragging ? "border-accent bg-accent/10" : "border-white/15 hover:border-accent/60 hover:bg-white/[0.03]"
                        )}
                      >
                        <motion.span
                          animate={dragging && !reduceMotion ? { y: [0, -6, 0] } : { y: 0 }}
                          transition={{ duration: 0.8, repeat: dragging ? Infinity : 0 }}
                          className="grid size-12 place-items-center rounded-2xl bg-white/[0.06] text-accent"
                        >
                          <UploadCloud className="size-6" />
                        </motion.span>
                        <span className="text-sm font-medium text-white">{t("quote.drop")}</span>
                        <span className="text-xs text-white/45">
                          {locale === "sq"
                            ? `PDF, DOC/DOCX, PNG/JPG ose ZIP — deri në ${maxFileSizeMb}MB secili, maksimumi ${maxFiles} skedarë`
                            : `PDF, DOC/DOCX, PNG/JPG or ZIP — up to ${maxFileSizeMb}MB each, ${maxFiles} files max`}
                        </span>
                        <input
                          id="attachments"
                          type="file"
                          multiple
                          className="sr-only"
                          accept={acceptedFileTypes.join(",")}
                          onChange={(e) => addFiles(Array.from(e.target.files ?? []))}
                        />
                      </label>
                      {fileError ? <p className="text-sm text-red-300">{fileError}</p> : null}
                      <AnimatePresence initial={false}>
                        {files.map((file, i) => (
                          <motion.div
                            key={`${file.name}-${i}`}
                            layout
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm"
                          >
                            <span className="truncate text-white/80">{file.name}</span>
                            <button
                              type="button"
                              onClick={() => setFiles((prev) => prev.filter((_, idx) => idx !== i))}
                              className="text-white/40 hover:text-white"
                              aria-label={`${tx("Remove")} ${file.name}`}
                            >
                              <X className="size-4" />
                            </button>
                          </motion.div>
                        ))}
                      </AnimatePresence>

                      {/* Review before sending */}
                      <div className="rounded-2xl border border-white/10 bg-ink/40 p-5">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/45">{t("quote.review")}</p>
                        <dl className="mt-3 grid gap-x-6 gap-y-2 text-sm sm:grid-cols-2">
                          {[0, 2, 3, 4].map((i) => (
                            <div key={i} className="flex justify-between gap-3 border-b border-white/5 pb-2">
                              <dt className="text-white/45">{t(steps[i].label)}</dt>
                              <dd className="truncate text-right text-white/85">{answerFor(i) ?? "—"}</dd>
                            </div>
                          ))}
                        </dl>
                      </div>
                    </div>
                  ) : null}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation */}
            <div className="mt-10 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => goTo(step - 1)}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium text-white/60 transition-colors hover:bg-white/5 hover:text-white",
                  step === 0 && "invisible"
                )}
              >
                <ArrowLeft className="size-4" /> {tx("Back")}
              </button>

              {step < steps.length - 1 ? (
                <div className="flex items-center gap-4">
                  <span className="hidden text-xs text-white/35 sm:inline">{t("quote.enterHint")}</span>
                  <Button type="button" variant="accent" size="lg" onClick={() => void next()}>
                    {tx("Continue")} <ArrowRight className="size-4" />
                  </Button>
                </div>
              ) : (
                // Deliberately type="button" with a programmatic submit: this button
                // sits where "Continue" was a moment earlier, and a native submit
                // raced with React's re-render, occasionally submitting on the click
                // that revealed this step. Calling handleSubmit directly is deterministic.
                <Button type="button" variant="accent" size="lg" disabled={isSubmitting} onClick={handleSubmit(onSubmit)}>
                  {isSubmitting ? <Loader2 className="size-4 animate-spin" /> : null}
                  {tx("Submit Project Request")}
                  {!isSubmitting ? <ArrowRight className="size-4" /> : null}
                </Button>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

function Field({
  icon: Icon,
  label,
  error,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  error?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-white/60">{label}</span>
      <span className="relative block">
        <Icon className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-white/35" />
        {children}
      </span>
      {error}
    </label>
  );
}

function ChoiceCard({
  active,
  onClick,
  label,
  visual,
  index,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  visual: React.ReactNode;
  index: number;
}) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      initial={reduceMotion ? false : { opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={reduceMotion ? undefined : { y: -3 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "relative flex items-center gap-4 rounded-2xl border p-5 text-left transition-colors duration-300",
        active
          ? "border-accent bg-accent/10 shadow-[0_0_0_1px_rgba(79,209,168,0.4),0_16px_40px_-16px_rgba(79,209,168,0.45)]"
          : "border-white/10 bg-white/[0.02] hover:border-white/25 hover:bg-white/[0.05]"
      )}
    >
      <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-white/[0.06]">{visual}</span>
      <span className="font-medium text-white">{label}</span>
      <AnimatePresence>
        {active ? (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 22 }}
            className="ml-auto grid size-6 place-items-center rounded-full bg-accent text-accent-foreground"
          >
            <Check className="size-3.5" />
          </motion.span>
        ) : null}
      </AnimatePresence>
    </motion.button>
  );
}

// The question, dealt in word by word.
function AnimatedQuestion({ text }: { text: string }) {
  const words = text.split(" ");
  return (
    <motion.h2
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, y: -12, transition: { duration: 0.18 } }}
      variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
      className="text-balance font-display text-3xl font-medium leading-tight text-white md:text-4xl"
    >
      {words.map((word, i) => (
        <React.Fragment key={`${word}-${i}`}>
          <span className="inline-block overflow-hidden pb-1 align-bottom">
            <motion.span
              className="inline-block"
              variants={{
                hidden: { y: "100%", opacity: 0 },
                visible: { y: "0%", opacity: 1, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
              }}
            >
              {word}
            </motion.span>
          </span>
          {i < words.length - 1 ? " " : null}
        </React.Fragment>
      ))}
    </motion.h2>
  );
}

function SuccessCard() {
  const { t, tx, locale } = useTranslation();
  const reduceMotion = useReducedMotion();
  const particles = Array.from({ length: 12 });
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="relative mx-auto flex max-w-xl flex-col items-center overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 text-center backdrop-blur-xl sm:p-14"
    >
      <div className="relative">
        {!reduceMotion
          ? particles.map((_, i) => {
              const angle = (i / particles.length) * Math.PI * 2;
              return (
                <motion.span
                  key={i}
                  aria-hidden="true"
                  className="absolute left-1/2 top-1/2 size-1.5 rounded-full bg-accent"
                  initial={{ x: 0, y: 0, opacity: 0 }}
                  animate={{ x: Math.cos(angle) * 70, y: Math.sin(angle) * 70, opacity: [0, 1, 0] }}
                  transition={{ duration: 1, delay: 0.55, ease: "easeOut" }}
                />
              );
            })
          : null}
        <motion.span
          aria-hidden="true"
          className="absolute inset-0 rounded-full border-2 border-accent"
          initial={{ scale: 0.6, opacity: 0.7 }}
          animate={{ scale: 2, opacity: 0 }}
          transition={{ duration: 1.1, delay: 0.5, ease: "easeOut" }}
        />
        <motion.svg viewBox="0 0 52 52" fill="none" className="size-20 text-accent" aria-hidden="true">
          <motion.circle cx="26" cy="26" r="24" stroke="currentColor" strokeWidth="2.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6, ease: "easeOut" }} />
          <motion.path d="M15 27l8 8 15-16" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.35, delay: 0.5, ease: "easeOut" }} />
        </motion.svg>
      </div>
      <motion.h2 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="mt-8 font-display text-3xl font-medium text-white">
        {tx("Request received")}
      </motion.h2>
      <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.85 }} className="mt-3 text-white/60">
        {tx("Thanks for the details — we’ll review your project and get back to you shortly with next steps.")}
      </motion.p>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }} className="mt-8 flex flex-wrap justify-center gap-3">
        <Button asChild variant="accent" size="lg">
          <Link href="/">{t("quote.success.home")}</Link>
        </Button>
        <a
          href={whatsappLink(locale)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-11 items-center gap-2 rounded-full border border-white/15 px-5 text-sm font-medium text-white hover:bg-white/10"
        >
          <WhatsappIcon className="size-4" /> WhatsApp
        </a>
      </motion.div>
    </motion.div>
  );
}
