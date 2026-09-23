import Link from "next/link";
import styles from "./Oem.module.css";

interface OemHeroProps {
  onOpenInquiry: () => void;
}

export default function OemHero({ onOpenInquiry }: OemHeroProps) {
  return (
    <section className={styles.hero} aria-label="OEM & Private Label Manufacturing">
      <div className={styles.wrap}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span className={styles.chevron} aria-hidden="true">
            ›
          </span>
          <span className={styles.breadcrumbCurrent}>OEM / Private Label</span>
        </nav>

        <div className={styles.heroContent}>
          <div className={styles.heroEyebrow}>
            Contract Manufacturing &amp; Private Label
          </div>
          <h1 className={styles.heroTitle}>
            Global OEM &amp; Private Label Micropipette Manufacturing
          </h1>
          <p className={styles.heroDesc}>
            Custom company name and logo printing, bespoke volume ranges,
            private-label packaging, and ISO 8655 gravimetric certified contract
            manufacturing for international distributors, diagnostic companies,
            and laboratory equipment brands.
          </p>

          <div className={styles.heroCtas}>
            <button
              type="button"
              className={styles.btnPrimary}
              onClick={onOpenInquiry}
            >
              Request OEM Proposal →
            </button>
            <a href="#capabilities" className={styles.btnSecondary}>
              Explore OEM Capabilities ↓
            </a>
          </div>

          <div className={styles.trustBadges}>
            <div className={styles.badgeItem}>
              <span className={styles.badgeIcon}>✓</span>
              <span>ISO 9001:2015 &amp; ISO 13485:2016 Certified</span>
            </div>
            <div className={styles.badgeItem}>
              <span className={styles.badgeIcon}>✓</span>
              <span>100% Gravimetric ISO 8655 Calibration</span>
            </div>
            <div className={styles.badgeItem}>
              <span className={styles.badgeIcon}>✓</span>
              <span>Class 100,000 Cleanroom Assembly</span>
            </div>
            <div className={styles.badgeItem}>
              <span className={styles.badgeIcon}>✓</span>
              <span>Low MOQ Starting at 50 Units</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
