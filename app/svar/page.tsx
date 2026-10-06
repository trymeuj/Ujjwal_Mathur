import type { Metadata } from "next";
import LegacyPage from "@/components/LegacyPage";

export const metadata: Metadata = { title: "Svar" };

export default function SvarPage() {
  return <LegacyPage source="svar" />;
}
