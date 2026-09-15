import type { Metadata } from "next";
import { PrivacyBody } from "@/components/sections/privacy-body";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return <PrivacyBody />;
}
