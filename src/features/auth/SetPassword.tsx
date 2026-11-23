"use client";
import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { createBrowserSupabaseClient } from "@/lib/cms/browser";
import styles from "./StaffSignIn.module.css";
export default function SetPassword() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  async function save(event: FormEvent) {
    event.preventDefault();
    if (password.length < 12 || password !== confirmation) {
      setError(
        "Choose a password of at least 12 characters and enter it twice.",
      );
      return;
    }
    setBusy(true);
    setError("");
    try {
      const client = createBrowserSupabaseClient();
      const { error } = await client.auth.updateUser({ password });
      if (error)
        throw new Error(
          "The password could not be saved. Try a stronger password or request a fresh recovery link.",
        );
      setPassword("");
      setConfirmation("");
      router.replace("/staff/login");
      router.refresh();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Saving failed.");
      setBusy(false);
    }
  }
  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <h1>Choose your password</h1>
        <p>
          Use at least 12 characters. You will also need an authenticator for
          staff access.
        </p>
        {error && <p role="alert">{error}</p>}
        <form onSubmit={save} style={{ display: "grid", gap: 16 }}>
          <label>
            New password
            <input
              required
              className="field"
              type="password"
              minLength={12}
              autoComplete="new-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>
          <label>
            Confirm password
            <input
              required
              className="field"
              type="password"
              minLength={12}
              autoComplete="new-password"
              value={confirmation}
              onChange={(event) => setConfirmation(event.target.value)}
            />
          </label>
          <button className="btn primary" disabled={busy}>
            {busy ? "Saving…" : "Save password"}
          </button>
        </form>
      </section>
    </main>
  );
}
