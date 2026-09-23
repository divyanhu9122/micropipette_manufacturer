import styles from "./Oem.module.css";

const metrics = [
  { value: "ISO 8655", label: "Gravimetric Calibration Standards" },
  { value: "Class 100K", label: "Cleanroom Molding & Assembly" },
  { value: "100%", label: "Optical & Piston Leakage Testing" },
  { value: "40+ Countries", label: "Global Laboratory Distribution" },
];

export default function OemQuality() {
  return (
    <section className={styles.qualitySection} aria-labelledby="oem-quality-title">
      <div className={styles.wrap}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionEyebrow}>Manufacturing Rigor</div>
          <h2 id="oem-quality-title" className={styles.sectionTitle}>
            Certified Laboratory Quality &amp; Cleanroom Standards
          </h2>
          <p className={styles.sectionDesc}>
            Every instrument manufactured under private label undergoes the exact
            same stringent inspection, gravimetric testing, and environmental
            quality controls as our primary brand lines.
          </p>
        </div>

        <div className={styles.metricsGrid}>
          {metrics.map((m, index) => (
            <div key={index} className={styles.metricCard}>
              <div className={styles.metricValue}>{m.value}</div>
              <div className={styles.metricLabel}>{m.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
