import type { Metadata } from "next";
import LegacyPage from "@/components/LegacyPage";

export const metadata: Metadata = { title: "Journal" };

export default function JournalPage() {
  return <LegacyPage source="journal" />;
}
