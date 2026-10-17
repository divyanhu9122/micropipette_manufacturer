"use client";

import styles from "../Admin.module.css";

interface AdminTopbarProps {
  title: string;
  contextText?: string;
  onToggleSidebar: () => void;
}

export default function AdminTopbar({
  title,
  contextText = "Micropipette Central Management",
  onToggleSidebar,
}: AdminTopbarProps) {
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
        <span className={styles.chip}>B2B Admin Prototype</span>

        <div className={styles.profile}>
          <div className={styles.avatar}>AU</div>
          <div className={styles.profileInfo}>
            <strong>Admin User</strong>
            <span>Lead Metrology</span>
          </div>
        </div>
      </div>
    </header>
  );
}
