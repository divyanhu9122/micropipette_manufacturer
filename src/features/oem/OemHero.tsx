import InnerPageHero from "@/components/layout/InnerPageHero";
import InnerPageHeroVisual from "@/components/layout/InnerPageHeroVisual";
import styles from "./Oem.module.css";

interface OemHeroProps {
  onOpenInquiry: () => void;
}

export default function OemHero({ onOpenInquiry }: OemHeroProps) {
  return (
    <InnerPageHero
      breadcrumb={[
        { label: "Home", href: "/" },
        { label: "OEM / Private Label" },
      ]}
      title="OEM & Private Label Manufacturing"
      eyebrow="Contract Manufacturing & Private Label"
      description="Explore private-label micropipette manufacturing, from custom branding and packaging to product customization for laboratory equipment brands and distributors."
      visual={<InnerPageHeroVisual kind="oem" />}
      actions={
        <>
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
        </>
      }
      details={
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
      }
    />
  );
}
