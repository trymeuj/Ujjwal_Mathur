import type { Metadata } from "next";
import LegacyPage from "@/components/LegacyPage";

export const metadata: Metadata = { title: "Aiva" };

export default function AivaPage() {
  return <LegacyPage source="aiva" />;
}
