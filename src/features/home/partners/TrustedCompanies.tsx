import PartnerReveal from "./PartnerReveal";
import shared from "../product-categories/ProductCategories.module.css";
import styles from "./TrustedCompanies.module.css";

const placeholders = [
  "PARTNER 01",
  "PARTNER 02",
  "PARTNER 03",
  "PARTNER 04",
  "PARTNER 05",
  "PARTNER 06",
] as const;

export default function TrustedCompanies() {
  return (
    <div className={shared.wrap}>
      <div className={styles.proof}>
        <PartnerReveal>
          <h2
            id="customers-title"
            className={`${shared.title} ${styles.title}`}
          >
            TRUSTED BY LEADING COMPANIES
          </h2>
          <p className={styles.subtitle}>
            Showcase your valued partners, laboratories, institutions and global
            business relationships with a clean, premium logo strip.
          </p>
          <div className={styles.shell}>
            <div
              className={styles.mask}
              role="region"
              aria-label="Trusted by leading companies logo showcase"
            >
              <div className={styles.track}>
                {[...placeholders, ...placeholders].map((partner, index) => (
                  <div
                    key={`${partner}-${index}`}
                    className={styles.item}
                    aria-hidden={
                      index >= placeholders.length ? true : undefined
                    }
                    data-placeholder="true"
                  >
                    <div className={styles.logo}>{partner}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </PartnerReveal>
      </div>
    </div>
  );
}
