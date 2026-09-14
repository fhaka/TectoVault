import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Please enter your name."),
  email: z.string().email("Please enter a valid email address."),
  company: z.string().optional(),
  message: z.string().min(10, "Please tell us a bit more (at least 10 characters)."),
  // Honeypot field — hidden from real users via CSS, so any non-empty value
  // means a bot filled it in. Deliberately NOT validated to be empty here:
  // the route handler checks it and returns a normal-looking 200 for bots
  // (so they learn nothing), it just skips persisting/emailing the submission.
  website: z.string().optional(),
});

export type ContactFormValues = z.infer<typeof contactSchema>;

export const quoteSchema = z.object({
  projectType: z.string().min(1, "Please select what you need."),
  description: z.string().min(20, "Please describe your project in a bit more detail."),
  budget: z.string().min(1, "Please select a budget range."),
  timeline: z.string().min(1, "Please select a timeline."),
  name: z.string().min(2, "Please enter your name."),
  email: z.string().email("Please enter a valid email address."),
  company: z.string().optional(),
  phone: z.string().optional(),
  companyWebsite: z.string().optional(),
  website: z.string().optional(), // honeypot — see contactSchema comment
});

export type QuoteFormValues = z.infer<typeof quoteSchema>;

export const applicationSchema = z.object({
  name: z.string().min(2, "Please enter your name."),
  email: z.string().email("Please enter a valid email address."),
  phone: z.string().optional(),
  linkedin: z.string().optional(),
  portfolio: z.string().optional(),
  coverLetter: z.string().optional(),
  website: z.string().optional(), // honeypot — see contactSchema comment
});

export type ApplicationFormValues = z.infer<typeof applicationSchema>;
