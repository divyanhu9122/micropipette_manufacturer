import { oemCapabilities } from "./oem.data";
import styles from "./Oem.module.css";

export default function OemCapabilities() {
  return (
    <section
      id="capabilities"
      className={styles.capabilitiesSection}
      aria-labelledby="capabilities-title"
    >
      <div className={styles.wrap}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionEyebrow}>Manufacturing Capabilities</div>
          <h2 id="capabilities-title" className={styles.sectionTitle}>
            Custom Engineering &amp; Brand Integration
          </h2>
          <p className={styles.sectionDesc}>
            From high-durability laser marking to bespoke tip cone dimensions and
            full private-label packaging, our manufacturing infrastructure adapts
            to your brand’s commercial requirements.
          </p>
        </div>

        <div className={styles.capabilitiesGrid}>
          {oemCapabilities.map((item) => (
            <article key={item.id} className={styles.capabilityCard}>
              <div className={styles.capabilityIcon} aria-hidden="true">
                {item.icon}
              </div>
              <h3 className={styles.capabilityTitle}>{item.title}</h3>
              <p className={styles.capabilityDesc}>{item.description}</p>
              <ul className={styles.capabilityList}>
                {item.details.map((detail, index) => (
                  <li key={index} className={styles.capabilityListItem}>
                    <span className={styles.capabilityListBullet}>✓</span>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
