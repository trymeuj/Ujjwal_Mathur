import type { Metadata } from "next";
import LegacyPage from "@/components/LegacyPage";

export const metadata: Metadata = { title: "People" };

export default function PeoplePage() {
  return <LegacyPage source="people" />;
}
