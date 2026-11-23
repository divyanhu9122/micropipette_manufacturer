"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { StaffIdentity } from "@/lib/auth/authorize";
import { createBrowserSupabaseClient } from "@/lib/cms/browser";
import styles from "../Admin.module.css";

interface AdminTopbarProps {
  staff: StaffIdentity;
  title: string;
  contextText?: string;
  onToggleSidebar: () => void;
}

export default function AdminTopbar({
  staff,
  title,
  contextText = "Micropipette Central Management",
  onToggleSidebar,
}: AdminTopbarProps) {
  const router = useRouter();
  const [signOutError, setSignOutError] = useState("");
  async function signOut() {
    try {
      const { error } = await createBrowserSupabaseClient().auth.signOut({
        scope: "local",
      });
      if (error) throw error;
      router.replace("/staff/login");
      router.refresh();
    } catch {
      setSignOutError("Sign-out failed. Please try again.");
    }
  }
  return (
    <header className={styles.topbar}>
      <div className={styles.topbarLeft}>
        <button
          type="button"
          className={styles.menuToggle}
          onClick={onToggleSidebar}
          aria-label="Toggle navigation menu"
        >
          <svg viewBox="0 0 24 24">
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>

        <div>
          <div className={styles.topTitle}>{title}</div>
          <div className={styles.topContext}>{contextText}</div>
        </div>
      </div>

      <div className={styles.topbarRight}>
        <span className={styles.chip}>{staff.role}</span>

        <div className={styles.profile}>
          <div className={styles.avatar}>
            {staff.email.slice(0, 2).toUpperCase()}
          </div>
          <div className={styles.profileInfo}>
            <strong>{staff.email}</strong>
            <span>{staff.role}</span>
          </div>
        </div>
        <button type="button" onClick={signOut}>
          Sign out
        </button>
        {signOutError && <span role="alert">{signOutError}</span>}
      </div>
    </header>
  );
}
