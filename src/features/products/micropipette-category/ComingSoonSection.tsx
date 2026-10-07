"use client";

import styles from "./MicropipetteCategory.module.css";
import { comingSoonItems } from "./micropipette-category.data";

export default function ComingSoonSection() {
  return (
    <section
      id="coming-soon"
      className={styles.comingSoonSection}
      aria-labelledby="coming-soon-heading"
    >
      <div className={styles.comingSoonPanel}>
        <div style={{ textAlign: "center", marginBottom: "16px" }}>
          <h2
            id="coming-soon-heading"
            style={{
              fontFamily: "var(--font-manrope), var(--font-inter), Arial, Helvetica, sans-serif",
              fontSize: "clamp(24px, 2.8vw, 30px)",
              fontWeight: 800,
              color: "var(--midnight-navy)",
              margin: "0 0 8px",
            }}
          >
            Coming Soon
          </h2>
          <p className={styles.comingSoonSubtitle}>
            Next-generation micropipette series currently in advanced development and laboratory qualification.
          </p>
        </div>

        <div className={styles.comingSoonGrid}>
          {comingSoonItems.map((item) => (
            <article key={item.id} className={styles.comingSoonCard}>
              <div className={styles.comingSoonHeader}>
                <span className={styles.comingSoonBadge}>Coming Soon</span>
                <span style={{ fontSize: 11, fontWeight: 700, color: "#62758d" }}>
                  IN VERIFICATION
                </span>
              </div>

              <h3>{item.name}</h3>

              <p>{item.note}</p>

              <div className={styles.comingSoonNotice}>
                <span aria-hidden="true">ℹ</span>
                <span>Specifications and availability will be announced following ISO certification.</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
