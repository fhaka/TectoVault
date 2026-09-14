"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { CheckCircle2, Loader2, UploadCloud } from "lucide-react";

import { applicationSchema, type ApplicationFormValues } from "@/lib/schemas";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export function GeneralApplicationForm() {
  const [submitted, setSubmitted] = React.useState(false);
  const [cvName, setCvName] = React.useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ApplicationFormValues>({ resolver: zodResolver(applicationSchema) });

  async function onSubmit(values: ApplicationFormValues) {
    try {
      const res = await fetch("/api/careers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, cvFileName: cvName }),
      });
      if (!res.ok) throw new Error("Request failed");
      setSubmitted(true);
      reset();
      setCvName(null);
    } catch {
      toast.error("Something went wrong. Please try again or email us your CV directly.");
    }
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center rounded-2xl border border-border bg-card p-12 text-center">
        <CheckCircle2 className="size-10 text-accent" />
        <h3 className="mt-5 text-xl font-medium">Application received</h3>
        <p className="mt-2 max-w-sm text-sm text-muted-foreground">
          Thanks for your interest — we&rsquo;ll keep your details on file and reach out if there&rsquo;s a fit.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
      <input type="text" tabIndex={-1} autoComplete="off" className="hidden" {...register("website")} />

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
          <Label htmlFor="phone">Phone (optional)</Label>
          <Input id="phone" type="tel" {...register("phone")} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="linkedin">LinkedIn (optional)</Label>
          <Input id="linkedin" placeholder="https://linkedin.com/in/…" {...register("linkedin")} />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="portfolio">GitHub / Portfolio (optional)</Label>
        <Input id="portfolio" placeholder="https://" {...register("portfolio")} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="coverLetter">Cover letter (optional)</Label>
        <Textarea id="coverLetter" placeholder="Anything you'd like us to know" {...register("coverLetter")} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="cv">CV / Resume</Label>
        <label
          htmlFor="cv"
          className="flex cursor-pointer items-center justify-center gap-3 rounded-xl border border-dashed border-border p-6 text-sm text-muted-foreground transition-colors hover:border-accent"
        >
          <UploadCloud className="size-4" />
          {cvName ?? "Click to upload your CV (PDF or DOC)"}
          <input
            id="cv"
            type="file"
            accept=".pdf,.doc,.docx"
            className="hidden"
            onChange={(e) => setCvName(e.target.files?.[0]?.name ?? null)}
          />
        </label>
      </div>

      <Button type="submit" size="lg" variant="accent" disabled={isSubmitting} className="w-full sm:w-auto">
        {isSubmitting ? <Loader2 className="size-4 animate-spin" /> : null}
        Send Your CV
      </Button>
    </form>
  );
}
