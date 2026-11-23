"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./StaffSignIn.module.css";
export default function ConfirmAccess({
  tokenHash,
  type,
}: {
  tokenHash: string;
  type: "invite" | "recovery";
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  async function confirm() {
    setBusy(true);
    setError("");
    try {
      const response = await fetch("/api/auth/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tokenHash, type }),
      });
      if (!response.ok)
        throw new Error(
          "This link has expired or could not be verified. Ask your administrator for a new link.",
        );
      router.replace("/staff/set-password");
      router.refresh();
    } catch (cause) {
      setError(
        cause instanceof Error ? cause.message : "Unable to verify this link.",
      );
      setBusy(false);
    }
  }
  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <h1>Set up your staff account</h1>
        <p>Continue to verify this one-time link and choose your password.</p>
        {error && <p role="alert">{error}</p>}
        <button
          className="btn primary"
          disabled={busy}
          onClick={() => void confirm()}
        >
          {busy ? "Verifying…" : "Continue"}
        </button>
      </section>
    </main>
  );
}
