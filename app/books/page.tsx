import type { Metadata } from "next";
import LegacyPage from "@/components/LegacyPage";

export const metadata: Metadata = { title: "Books I Have Read" };

export default function BooksPage() {
  return <LegacyPage source="books" />;
}
