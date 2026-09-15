import type { Metadata } from "next";
import { TermsBody } from "@/components/sections/terms-body";

export const metadata: Metadata = { title: "Terms of Service" };

export default function TermsPage() {
  return <TermsBody />;
}
