"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm({ destination }: { destination: string }) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSubmitting(true);

    const data = new FormData(event.currentTarget);
    const response = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: data.get("password") }),
    });

    if (!response.ok) {
      const result = (await response.json()) as { error?: string };
      setError(result.error ?? "Unable to sign in.");
      setSubmitting(false);
      return;
    }

    router.replace(destination);
    router.refresh();
  }

  return (
    <form onSubmit={submit} className="password-container">
      <h1>Enter Password to Access {destination === "/journal" ? "Journal" : "Notes"}</h1>
      <input
        type="password"
        name="password"
        className="password-input"
        placeholder="Enter password"
        autoFocus
        autoComplete="current-password"
      />
      <button type="submit" className="password-btn" disabled={submitting}>
        {submitting ? "Checking…" : "Enter"}
      </button>
      <div className="error-message" role="alert">
        {error}
      </div>
    </form>
  );
}
