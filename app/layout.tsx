import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Ujjwal Mathur's Website",
    template: "%s | Ujjwal Mathur",
  },
  description: "Ujjwal Mathur's personal website, essays, notes, and reading list.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
