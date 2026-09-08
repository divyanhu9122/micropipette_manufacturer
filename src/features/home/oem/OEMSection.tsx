import styles from "./OEMSection.module.css";

export default function OEMSection() {
  return (
    <section
      id="oem"
      className={`section ${styles.section}`}
      aria-labelledby="oem-title"
    >
      <div className="wrap">
        <div className={styles.container}>
          <h2 id="oem-title" className={styles.title}>
            OEM / PRIVATE LABEL SOLUTIONS
          </h2>
          <div className={styles.grid}>
            <div className={styles.panel}>
              <h3 className={styles.panelTitle}>
                Build Your Brand With Confidence
              </h3>
              <p>
                Custom company name printing, logo branding, packaging and
                global OEM support for laboratory distributors and private-label
                buyers.
              </p>
              {/* Prototype copy retained verbatim; MOQ and quality statements remain unverified. */}
              <ul className={styles.list}>
                <li>Custom branding &amp; packaging</li>
                <li>Product customization</li>
                <li>R&amp;D and design support</li>
                <li>Low MOQ &amp; scalable production</li>
                <li>Global quality standards</li>
              </ul>
              {/* Preserve the source destination until its production route is confirmed. */}
              <a
                className={`btn secondary ${styles.cta}`}
                href="micropipette_manufacturer_contact_partnership_v2.html"
              >
                Explore OEM Solutions →
              </a>
            </div>
            <div className={styles.showcase}>
              <div
                className={styles.illustration}
                role="img"
                aria-label="Private-label package marked Your Brand beside a LABXE pipette"
              >
                <div className={styles.package} />
                <div className={styles.pipette}>
                  <div className={styles.top} />
                  <div className={styles.body} />
                  <div className={styles.shaft} />
                  <div className={styles.nozzle} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
