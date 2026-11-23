"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { createBrowserSupabaseClient } from "@/lib/cms/browser";
import styles from "./StaffSignIn.module.css";

export default function StaffSignInApp({
  configured,
  initialMfaRequired = false,
  initialFactorId = "",
}: {
  configured: boolean;
  initialMfaRequired?: boolean;
  initialFactorId?: string;
}) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [mode, setMode] = useState<"password" | "enroll" | "verify">(
    initialMfaRequired ? (initialFactorId ? "verify" : "enroll") : "password",
  );
  const [factorId, setFactorId] = useState(initialFactorId);
  const [qrCode, setQrCode] = useState("");
  const [secret, setSecret] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function continueSession() {
    const response = await fetch("/api/auth/session", { cache: "no-store" });
    const session = await response.json();
    if (!response.ok)
      throw new Error(
        session.error || "Your staff access could not be verified.",
      );
    if (!session.requiresMfa) {
      router.replace("/admin");
      router.refresh();
      return;
    }
    const client = createBrowserSupabaseClient();
    const factors = await client.auth.mfa.listFactors();
    if (factors.error)
      throw new Error(
        "Your authenticator could not be loaded. Please try again.",
      );
    const factor = factors.data.totp[0];
    setFactorId(factor?.id ?? "");
    setMode(factor ? "verify" : "enroll");
  }

  async function signIn(event: FormEvent) {
    event.preventDefault();
    if (busy) return;
    setBusy(true);
    setError("");
    try {
      const client = createBrowserSupabaseClient();
      const result = await client.auth.signInWithPassword({
        email: email.trim(),
        password,
      });
      setPassword("");
      if (result.error)
        throw new Error("Sign-in failed. Check your email and password.");
      await continueSession();
    } catch (cause) {
      setError(
        cause instanceof Error
          ? cause.message
          : "Sign-in could not be completed.",
      );
    } finally {
      setBusy(false);
    }
  }

  async function enroll() {
    setBusy(true);
    setError("");
    try {
      const client = createBrowserSupabaseClient();
      const result = await client.auth.mfa.enroll({
        factorType: "totp",
        friendlyName: `Micropipette ${crypto.randomUUID().slice(0, 8)}`,
      });
      if (result.error)
        throw new Error("Authenticator setup failed. Please try again.");
      setFactorId(result.data.id);
      setQrCode(result.data.totp.qr_code);
      setSecret(result.data.totp.secret);
      setMode("verify");
    } catch (cause) {
      setError(
        cause instanceof Error ? cause.message : "Authenticator setup failed.",
      );
    } finally {
      setBusy(false);
    }
  }

  async function verify(event: FormEvent) {
    event.preventDefault();
    if (busy) return;
    setBusy(true);
    setError("");
    try {
      const client = createBrowserSupabaseClient();
      const result = await client.auth.mfa.challengeAndVerify({
        factorId,
        code: code.trim(),
      });
      setCode("");
      if (result.error)
        throw new Error(
          "That code could not be verified. Enter a new code from your authenticator.",
        );
      await continueSession();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Verification failed.");
    } finally {
      setBusy(false);
    }
  }

  async function restart() {
    setBusy(true);
    setError("");
    try {
      const client = createBrowserSupabaseClient();
      const { error: signOutError } = await client.auth.signOut({
        scope: "local",
      });
      if (signOutError) throw new Error("Sign-out failed. Please try again.");
      setMode("password");
      setQrCode("");
      setSecret("");
      setFactorId("");
      setCode("");
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Sign-out failed.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className={styles.page}>
      <section className={styles.card} aria-labelledby="staff-sign-in-title">
        <p className={styles.eyebrow}>MICROPIPETTE OPERATIONS</p>
        <h1 id="staff-sign-in-title">Staff sign-in</h1>
        <p>
          Use your approved staff account to manage website content and
          enquiries.
        </p>
        {!configured && (
          <p role="status" className={styles.notice}>
            Staff sign-in is being prepared. Please try again later.
          </p>
        )}
        {error && (
          <p role="alert" className={styles.error}>
            {error}
          </p>
        )}
        {mode === "password" && (
          <form onSubmit={signIn}>
            <label>
              Email
              <input
                type="email"
                required
                autoComplete="username"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                disabled={!configured || busy}
              />
            </label>
            <label>
              Password
              <input
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                disabled={!configured || busy}
              />
            </label>
            <button type="submit" disabled={!configured || busy}>
              {busy ? "Signing in…" : "Continue"}
            </button>
          </form>
        )}
        {mode === "enroll" && (
          <div>
            <h2>Set up your authenticator</h2>
            <p>
              A second verification step is required for staff access. Add this
              account to an authenticator app.
            </p>
            <button type="button" onClick={enroll} disabled={busy}>
              {busy ? "Preparing…" : "Set up authenticator"}
            </button>
          </div>
        )}
        {mode === "verify" && (
          <form onSubmit={verify}>
            <h2>Verify your authenticator</h2>
            {qrCode && (
              <>
                <Image
                  src={`data:image/svg+xml;utf8,${encodeURIComponent(qrCode)}`}
                  alt="Scan this code with your authenticator app"
                  width={220}
                  height={220}
                  unoptimized
                />
                <details>
                  <summary>Enter a setup key instead</summary>
                  <code className={styles.secret}>{secret}</code>
                </details>
              </>
            )}
            <label>
              Six-digit code
              <input
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                pattern="[0-9]{6}"
                maxLength={6}
                required
                value={code}
                onChange={(event) =>
                  setCode(event.target.value.replace(/\D/g, ""))
                }
                disabled={busy}
              />
            </label>
            <button type="submit" disabled={busy}>
              {busy ? "Verifying…" : "Verify and continue"}
            </button>
          </form>
        )}
        {mode !== "password" && (
          <button
            type="button"
            className={styles.secondary}
            onClick={restart}
            disabled={busy}
          >
            Use another account
          </button>
        )}
        <Link href="/">Return to the public website</Link>
      </section>
    </main>
  );
}
