import type { Metadata } from "next";
import { CookiesBody } from "@/components/sections/cookies-body";

export const metadata: Metadata = { title: "Cookie Policy" };

export default function CookiesPage() {
  return <CookiesBody />;
}
