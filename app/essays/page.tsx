import type { Metadata } from "next";
import LegacyPage from "@/components/LegacyPage";

export const metadata: Metadata = { title: "Essays" };

export default function EssaysPage() {
  return <LegacyPage source="essays" />;
}
