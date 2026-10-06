import Link from "next/link";
import PublicShell from "@/components/PublicShell";

export default function NotFound() {
  return (
    <PublicShell eyebrow="404" title="Page not found" intro="The page you requested does not exist.">
      <Link href="/">Return home →</Link>
    </PublicShell>
  );
}
