"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2, CheckCircle2 } from "lucide-react";

import { contactSchema, type ContactFormValues } from "@/lib/schemas";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/lib/i18n/language-context";

export function ContactForm() {
  const { t } = useTranslation();
  const [submitted, setSubmitted] = React.useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormValues>({ resolver: zodResolver(contactSchema) });

  async function onSubmit(values: ContactFormValues) {
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error("Request failed");
      setSubmitted(true);
      reset();
    } catch {
      toast.error(t("contact.form.error"));
    }
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center rounded-2xl border border-border bg-card p-12 text-center">
        <CheckCircle2 className="size-10 text-accent" />
        <h3 className="mt-5 text-xl font-medium">{t("contact.form.sentTitle")}</h3>
        <p className="mt-2 max-w-sm text-sm text-muted-foreground">
          {t("contact.form.sentBody")}
        </p>
        <Button variant="outline" className="mt-6" onClick={() => setSubmitted(false)}>
          {t("contact.form.sendAnother")}
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
      <input type="text" tabIndex={-1} autoComplete="off" className="hidden" {...register("website")} />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">{t("contact.form.name")}</Label>
          <Input id="name" placeholder={t("contact.form.namePlaceholder")} aria-invalid={!!errors.name} {...register("name")} />
          {errors.name ? <p className="text-sm text-destructive">{errors.name.message}</p> : null}
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">{t("contact.form.email")}</Label>
          <Input id="email" type="email" placeholder={t("contact.form.emailPlaceholder")} aria-invalid={!!errors.email} {...register("email")} />
          {errors.email ? <p className="text-sm text-destructive">{errors.email.message}</p> : null}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="company">{t("contact.form.company")}</Label>
        <Input id="company" placeholder={t("contact.form.companyPlaceholder")} {...register("company")} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">{t("contact.form.message")}</Label>
        <Textarea id="message" placeholder={t("contact.form.messagePlaceholder")} aria-invalid={!!errors.message} {...register("message")} />
        {errors.message ? <p className="text-sm text-destructive">{errors.message.message}</p> : null}
      </div>

      <Button type="submit" size="lg" variant="accent" disabled={isSubmitting} className="w-full sm:w-auto">
        {isSubmitting ? <Loader2 className="size-4 animate-spin" /> : null}
        {t("contact.form.send")}
      </Button>
    </form>
  );
}
