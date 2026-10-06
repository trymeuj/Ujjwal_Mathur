import type { Metadata } from "next";
import LegacyPage from "@/components/LegacyPage";

export const metadata: Metadata = { title: "Notes" };

export default function NotesPage() {
  return <LegacyPage source="notes" />;
}
