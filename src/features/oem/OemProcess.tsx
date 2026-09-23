import { oemProcessSteps } from "./oem.data";
import styles from "./Oem.module.css";

export default function OemProcess() {
  return (
    <section
      className={styles.processSection}
      aria-labelledby="oem-process-title"
    >
      <div className={styles.wrap}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionEyebrow}>Step-by-Step Execution</div>
          <h2 id="oem-process-title" className={styles.sectionTitle}>
            Seamless OEM Partnership Roadmap
          </h2>
          <p className={styles.sectionDesc}>
            Our standardized five-stage process ensures transparent lead times,
            meticulous sample validation, and consistent batch-to-batch quality.
          </p>
        </div>

        <div className={styles.processGrid}>
          {oemProcessSteps.map((step) => (
            <div key={step.step} className={styles.processCard}>
              <div className={styles.stepBadge}>{step.step}</div>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepDesc}>{step.description}</p>
              <div className={styles.stepDuration}>
                <span aria-hidden="true">⏱</span>
                <span>{step.duration}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
