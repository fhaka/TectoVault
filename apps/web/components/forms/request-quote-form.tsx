"use client";

import * as React from "react";
import { useForm, useWatch, type Path } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Loader2, UploadCloud, X } from "lucide-react";

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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const steps = [
  { title: "What do you need?", fields: ["projectType"] as Path<QuoteFormValues>[] },
  { title: "Tell us about your project.", fields: ["description"] as Path<QuoteFormValues>[] },
  { title: "What's your budget?", fields: ["budget"] as Path<QuoteFormValues>[] },
  { title: "When should it launch?", fields: ["timeline"] as Path<QuoteFormValues>[] },
  { title: "How can we reach you?", fields: ["name", "email"] as Path<QuoteFormValues>[] },
  { title: "Anything to show us?", fields: [] as Path<QuoteFormValues>[] },
];

// The step content is a physical card being dealt: the outgoing card flies
// up and off with a tilt, the incoming one deals in from the opposite side
// and springs flat. Direction flips when going back.
const cardVariants = {
  enter: (dir: number) => ({
    y: 90,
    x: dir * 60,
    rotate: dir * 5,
    scale: 0.94,
    opacity: 0,
  }),
  center: {
    y: 0,
    x: 0,
    rotate: 0,
    scale: 1,
    opacity: 1,
    transition: { type: "spring" as const, stiffness: 230, damping: 24 },
  },
  exit: (dir: number) => ({
    y: -70,
    x: dir * -50,
    rotate: dir * -6,
    scale: 0.94,
    opacity: 0,
    transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

export function RequestQuoteForm() {
  const [step, setStep] = React.useState(0);
  const [direction, setDirection] = React.useState(1);
  const [submitted, setSubmitted] = React.useState(false);
  const [files, setFiles] = React.useState<File[]>([]);
  const [fileError, setFileError] = React.useState<string | null>(null);

  const {
    register,
    handleSubmit,
    trigger,
    setValue,
    control,
    formState: { errors, isSubmitting },
  } = useForm<QuoteFormValues>({
    resolver: zodResolver(quoteSchema),
    defaultValues: { projectType: "", budget: "", timeline: "" },
  });

  const values = useWatch({ control });

  async function next() {
    const valid = await trigger(steps[step].fields);
    if (valid) {
      setDirection(1);
      setStep((s) => Math.min(s + 1, steps.length - 1));
    }
  }

  function back() {
    setDirection(-1);
    setStep((s) => Math.max(s - 1, 0));
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const list = Array.from(e.target.files ?? []);
    setFileError(null);

    if (list.length + files.length > maxFiles) {
      setFileError(`You can upload up to ${maxFiles} files.`);
      return;
    }
    const tooLarge = list.find((f) => f.size > maxFileSizeMb * 1024 * 1024);
    if (tooLarge) {
      setFileError(`"${tooLarge.name}" exceeds the ${maxFileSizeMb}MB limit.`);
      return;
    }
    const invalidType = list.find(
      (f) => !acceptedFileTypes.some((ext) => f.name.toLowerCase().endsWith(ext))
    );
    if (invalidType) {
      setFileError(`"${invalidType.name}" is not an accepted file type.`);
      return;
    }
    setFiles((prev) => [...prev, ...list]);
  }

  async function onSubmit(data: QuoteFormValues) {
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, attachments: files.map((f) => f.name) }),
      });
      if (!res.ok) throw new Error("Request failed");
      setSubmitted(true);
    } catch {
      toast.error("Something went wrong submitting your request. Please try again or email us directly.");
    }
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto flex max-w-lg flex-col items-center rounded-3xl border border-white/10 bg-card p-6 text-center shadow-2xl sm:p-12"
      >
        <div className="relative">
          <motion.span
            aria-hidden="true"
            className="absolute inset-0 rounded-full border-2 border-accent"
            initial={{ scale: 0.6, opacity: 0.7 }}
            animate={{ scale: 2, opacity: 0 }}
            transition={{ duration: 1.1, delay: 0.5, ease: "easeOut" }}
          />
          <motion.svg viewBox="0 0 52 52" fill="none" className="size-16 text-accent" aria-hidden="true">
            <motion.circle
              cx="26" cy="26" r="24" stroke="currentColor" strokeWidth="2.5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
            <motion.path
              d="M15 27l8 8 15-16" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.35, delay: 0.5, ease: "easeOut" }}
            />
          </motion.svg>
        </div>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.7 }}
          className="mt-6 text-2xl font-medium"
        >
          Request received
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.85 }}
          className="mt-3 text-muted-foreground"
        >
          Thanks for the details — we&rsquo;ll review your project and get back to you shortly with next steps.
        </motion.p>
      </motion.div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      <StepConstellation current={step} total={steps.length} />

      {/* The question is the hero of each step: giant type, dealt in word by word. */}
      <div className="mt-6 min-h-[5.5rem] text-center sm:mt-8 md:min-h-[8rem]">
        <AnimatePresence mode="wait" initial={false}>
          <AnimatedQuestion key={step} text={steps[step].title} />
        </AnimatePresence>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <input type="text" tabIndex={-1} autoComplete="off" className="hidden" {...register("website")} />

        {/* Card deck: two ghost cards behind the live one give it physical depth. */}
        <div className="relative mt-10" style={{ perspective: "1400px" }}>
          <div
            aria-hidden="true"
            className="absolute inset-x-4 -bottom-3 top-3 rotate-[1.2deg] rounded-3xl border border-white/5 bg-white/[0.04]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-x-8 -bottom-6 top-6 rotate-[-1.4deg] rounded-3xl border border-white/5 bg-white/[0.03]"
          />

          <AnimatePresence mode="wait" initial={false} custom={direction}>
            <motion.div
              key={step}
              custom={direction}
              variants={cardVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="relative rounded-3xl border border-white/10 bg-card p-6 text-card-foreground shadow-[0_32px_80px_-16px_rgba(0,0,0,0.7)] sm:p-10"
            >
              {step === 0 ? (
                <div className="grid grid-cols-1 gap-3 min-[360px]:grid-cols-2 sm:grid-cols-4">
                  {projectTypeOptions.map((opt) => {
                    const Icon = opt.icon;
                    const active = values.projectType === opt.value;
                    return (
                      <motion.button
                        type="button"
                        key={opt.value}
                        onClick={() => setValue("projectType", opt.value, { shouldValidate: true })}
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.96 }}
                        animate={active ? { scale: [1, 1.05, 1] } : { scale: 1 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className={cn(
                          "relative flex min-h-28 flex-col items-center justify-center gap-2 rounded-2xl border p-4 text-center transition-colors sm:gap-3 sm:p-6",
                          active ? "border-accent bg-accent/5" : "border-border hover:border-accent/50"
                        )}
                      >
                        <AnimatePresence>
                          {active ? (
                            <motion.span
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              exit={{ scale: 0, opacity: 0 }}
                              transition={{ type: "spring", stiffness: 500, damping: 25 }}
                              className="absolute right-2.5 top-2.5 flex size-5 items-center justify-center rounded-full bg-accent text-accent-foreground"
                            >
                              <Check className="size-3" />
                            </motion.span>
                          ) : null}
                        </AnimatePresence>
                        <Icon className={cn("size-6", active ? "text-accent" : "text-muted-foreground")} />
                        <span className="text-sm font-medium">{opt.label}</span>
                      </motion.button>
                    );
                  })}
                  {errors.projectType ? <p className="col-span-full text-sm text-destructive">{errors.projectType.message}</p> : null}
                </div>
              ) : null}

              {step === 1 ? (
                <div className="space-y-2">
                  <Label htmlFor="description">Describe your project</Label>
                  <Textarea
                    id="description"
                    rows={8}
                    placeholder="What are you trying to build? What problem should it solve?"
                    aria-invalid={!!errors.description}
                    {...register("description")}
                  />
                  {errors.description ? <p className="text-sm text-destructive">{errors.description.message}</p> : null}
                </div>
              ) : null}

              {step === 2 ? (
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {budgetOptions.map((opt) => (
                    <RadioCard
                      key={opt.value}
                      active={values.budget === opt.value}
                      onClick={() => setValue("budget", opt.value, { shouldValidate: true })}
                      label={opt.label}
                    />
                  ))}
                  {errors.budget ? <p className="col-span-full text-sm text-destructive">{errors.budget.message}</p> : null}
                </div>
              ) : null}

              {step === 3 ? (
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {timelineOptions.map((opt) => (
                    <RadioCard
                      key={opt.value}
                      active={values.timeline === opt.value}
                      onClick={() => setValue("timeline", opt.value, { shouldValidate: true })}
                      label={opt.label}
                    />
                  ))}
                  {errors.timeline ? <p className="col-span-full text-sm text-destructive">{errors.timeline.message}</p> : null}
                </div>
              ) : null}

              {step === 4 ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" aria-invalid={!!errors.name} {...register("name")} />
                      {errors.name ? <p className="text-sm text-destructive">{errors.name.message}</p> : null}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" aria-invalid={!!errors.email} {...register("email")} />
                      {errors.email ? <p className="text-sm text-destructive">{errors.email.message}</p> : null}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="company">Company (optional)</Label>
                      <Input id="company" {...register("company")} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone (optional)</Label>
                      <Input id="phone" type="tel" {...register("phone")} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="companyWebsite">Website (optional)</Label>
                    <Input id="companyWebsite" placeholder="https://" {...register("companyWebsite")} />
                  </div>
                </div>
              ) : null}

              {step === 5 ? (
                <div>
                  <label
                    htmlFor="attachments"
                    className="flex cursor-pointer flex-col items-center gap-3 rounded-2xl border border-dashed border-border p-6 text-center transition-colors hover:border-accent sm:p-12"
                  >
                    <UploadCloud className="size-8 text-muted-foreground" />
                    <span className="text-sm font-medium">Click to upload files</span>
                    <span className="text-xs text-muted-foreground">
                      PDF, DOC/DOCX, PNG/JPG or ZIP — up to {maxFileSizeMb}MB each, {maxFiles} files max
                    </span>
                    <input
                      id="attachments"
                      type="file"
                      multiple
                      className="hidden"
                      accept={acceptedFileTypes.join(",")}
                      onChange={handleFileChange}
                    />
                  </label>
                  {fileError ? <p className="mt-2 text-sm text-destructive">{fileError}</p> : null}

                  {files.length > 0 ? (
                    <ul className="mt-4 space-y-2">
                      {files.map((file, i) => (
                        <li key={i} className="flex items-center justify-between rounded-lg border border-border px-4 py-2.5 text-sm">
                          <span className="truncate">{file.name}</span>
                          <button
                            type="button"
                            onClick={() => setFiles((prev) => prev.filter((_, idx) => idx !== i))}
                            className="text-muted-foreground hover:text-destructive"
                            aria-label={`Remove ${file.name}`}
                          >
                            <X className="size-4" />
                          </button>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              ) : null}

              <div className="mt-8 flex flex-col-reverse gap-3 min-[380px]:flex-row min-[380px]:items-center min-[380px]:justify-between sm:mt-10 [&>button]:w-full min-[380px]:[&>button]:w-auto">
                <Button type="button" variant="ghost" onClick={back} disabled={step === 0} className={step === 0 ? "invisible" : ""}>
                  <ArrowLeft className="size-4" /> Back
                </Button>

                {step < steps.length - 1 ? (
                  <Button type="button" variant="accent" onClick={next}>
                    Continue <ArrowRight className="size-4" />
                  </Button>
                ) : (
                  // Deliberately type="button" with a programmatic submit, rather than
                  // type="submit": this button occupies the same position the "Continue"
                  // button was in a moment earlier, and relying on the browser's native
                  // submit-on-type="submit" behavior here raced with React's re-render,
                  // occasionally submitting on the click that was meant to reveal this
                  // step. Calling handleSubmit(onSubmit) directly is deterministic.
                  <Button
                    type="button"
                    variant="accent"
                    disabled={isSubmitting}
                    onClick={handleSubmit(onSubmit)}
                  >
                    {isSubmitting ? <Loader2 className="size-4 animate-spin" /> : null}
                    Submit Project Request
                  </Button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </form>
    </div>
  );
}

// Progress as a constellation: one node per step on a gentle arc, connected
// by lines that draw themselves as steps are completed. The current node
// pulses; completed nodes fill in.
function StepConstellation({ current, total }: { current: number; total: number }) {
  const width = 280;
  const height = 44;
  const points = Array.from({ length: total }, (_, i) => {
    const t = i / (total - 1);
    return {
      x: 14 + t * (width - 28),
      // Gentle arc: highest in the middle
      y: height / 2 + Math.sin(t * Math.PI) * -8 + 8,
    };
  });

  return (
    <div className="flex flex-col items-center gap-2">
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="overflow-visible">
        {points.slice(0, -1).map((p, i) => {
          const q = points[i + 1];
          const done = i < current;
          return (
            <motion.line
              key={i}
              x1={p.x}
              y1={p.y}
              x2={q.x}
              y2={q.y}
              stroke="#2f8f72"
              strokeWidth={1.5}
              initial={false}
              animate={{ pathLength: done ? 1 : 0, strokeOpacity: done ? 0.9 : 0.15 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
            />
          );
        })}
        {points.map((p, i) => {
          const done = i < current;
          const isCurrent = i === current;
          return (
            <g key={i}>
              {isCurrent ? (
                <motion.circle
                  cx={p.x}
                  cy={p.y}
                  r={5}
                  fill="none"
                  stroke="#2f8f72"
                  strokeWidth={1.5}
                  initial={{ scale: 1, opacity: 0.8 }}
                  animate={{ scale: [1, 2.2], opacity: [0.7, 0] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
                  style={{ transformOrigin: `${p.x}px ${p.y}px` }}
                />
              ) : null}
              <motion.circle
                cx={p.x}
                cy={p.y}
                r={4}
                initial={false}
                animate={{
                  fill: done || isCurrent ? "#2f8f72" : "rgba(255,255,255,0.15)",
                  scale: isCurrent ? 1.25 : 1,
                }}
                transition={{ duration: 0.3 }}
                style={{ transformOrigin: `${p.x}px ${p.y}px` }}
              />
            </g>
          );
        })}
      </svg>
      <span className="text-xs font-medium uppercase tracking-[0.2em] text-ink-muted">
        Step {current + 1} / {total}
      </span>
    </div>
  );
}

// Giant step question, dealt in word by word.
function AnimatedQuestion({ text }: { text: string }) {
  const words = text.split(" ");
  return (
    <motion.h2
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, y: -16, transition: { duration: 0.18 } }}
      variants={{ visible: { transition: { staggerChildren: 0.055 } } }}
      className="text-balance font-display text-2xl font-semibold leading-[1.12] text-ink-foreground sm:text-3xl md:text-5xl"
    >
      {words.map((word, i) => (
        <React.Fragment key={i}>
          <span className="inline-block overflow-hidden align-bottom">
            <motion.span
              variants={{
                hidden: { y: "100%", opacity: 0 },
                visible: {
                  y: 0,
                  opacity: 1,
                  transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
                },
              }}
              className="inline-block"
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

function RadioCard({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      animate={active ? { scale: [1, 1.03, 1] } : { scale: 1 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "flex items-center justify-between rounded-xl border px-6 py-4 text-left text-sm font-medium transition-colors",
        active ? "border-accent bg-accent/5 text-accent" : "border-border hover:border-accent/50"
      )}
    >
      {label}
      <AnimatePresence>
        {active ? (
          <motion.span
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 25 }}
            className="flex size-5 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground"
          >
            <Check className="size-3" />
          </motion.span>
        ) : null}
      </AnimatePresence>
    </motion.button>
  );
}
