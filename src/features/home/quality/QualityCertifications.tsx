import styles from "./QualityCertifications.module.css";

// Unverified prototype placeholders; these are not certification records.
const placeholders = [
  { id: "iso-9001", title: "ISO", subtitle: "9001:2015" },
  { id: "iso-13485", title: "ISO", subtitle: "13485:2016" },
  { id: "ce", title: "CE", subtitle: "Certified" },
  { id: "compliant", title: "✔", subtitle: "Compliant" },
  { id: "qc", title: "◎", subtitle: "QC Verified" },
] as const;

export default function QualityCertifications() {
  return (
    <section
      className="section"
      id="quality"
      aria-labelledby="quality-title"
      aria-describedby="quality-placeholder-note"
    >
      <div className="wrap">
        <div className={styles.bar}>
          <div className={styles.copy}>
            <h3 id="quality-title">QUALITY &amp; CERTIFICATIONS</h3>
            <p>
              We are committed to delivering products that meet international
              quality standards and ensure consistent performance across every
              application.
            </p>
            <p id="quality-placeholder-note" className={styles.note}>
              Placeholder for preview only — pending verification before
              publishing.
            </p>
          </div>
          {placeholders.map((placeholder) => (
            <div
              key={placeholder.id}
              className={styles.cert}
              data-verification-status="unverified-placeholder"
              aria-describedby="quality-placeholder-note"
            >
              <strong>{placeholder.title}</strong>
              <span>{placeholder.subtitle}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
