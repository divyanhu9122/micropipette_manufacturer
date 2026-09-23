import Link from "next/link";
import styles from "./Brands.module.css";
import { BRAND_LISTING_ITEMS } from "./brands.data";

export default function BrandListingApp() {
  return (
    <div className={styles.brandPage}>
      {/* Compact Breadcrumb Hero */}
      <section className={styles.heroCompact}>
        <div className="wrap">
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className={styles.breadcrumbSep}>›</span>
            <span>Brands</span>
          </nav>
          <h1>Our Brands</h1>
        </div>
      </section>

      {/* Main Brand Listing Section */}
      <section className={styles.brandSection}>
        <div className="wrap">
          <div className={styles.brandIntro}>
            <span className={styles.typeTag}>BRAND PORTFOLIO</span>
            <h2>Scientific Brands Under One Manufacturing Network</h2>
            <p>
              Explore our brand portfolio. Each brand page works as a compact
              B2B landing page with dedicated catalogues, specifications, and
              direct inquiry routing, backed by unified ISO 8655 gravimetric
              manufacturing and global export quality assurance.
            </p>
          </div>

          <div className={styles.brandGrid}>
            {BRAND_LISTING_ITEMS.map((item) => (
              <article key={item.id} className={styles.brandMasterCard}>
                <div className={styles.brandLogoArea}>
                  <span className={styles.brandBadge}>{item.badge}</span>
                  {item.logoClass ? (
                    <div
                      className={`${styles.brandLogoTitle} ${styles[item.logoClass]}`}
                    >
                      {item.name === "LABXE" ? (
                        <>
                          LAB<b>XE</b>
                        </>
                      ) : item.name === "SSCIENCES" ? (
                        <>
                          S<b>SCIENCES</b>
                        </>
                      ) : (
                        item.name
                      )}
                    </div>
                  ) : (
                    <div className={styles.brandLogoTitle}>[{item.name} LOGO]</div>
                  )}
                  <span className={styles.brandLogoSubtitle}>
                    {item.isFuturePlaceholder
                      ? "CMS Pre-Configured Slot"
                      : "Precision Liquid Handling"}
                  </span>
                </div>

                <div className={styles.brandContent}>
                  <span className={styles.brandTag}>
                    {item.isFuturePlaceholder ? "CMS-READY" : item.name}
                  </span>
                  <h2>{item.name}</h2>
                  <p>{item.shortIntro}</p>

                  <div className={styles.brandProductTags}>
                    {item.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>

                  <div className={styles.brandActions}>
                    {item.slug ? (
                      <Link
                        className="btn primary"
                        href={`/brands/${item.slug}`}
                        id={`explore-brand-${item.slug}`}
                      >
                        Explore Brand →
                      </Link>
                    ) : (
                      <button
                        type="button"
                        className="btn secondary"
                        disabled
                        style={{ opacity: 0.65, cursor: "not-allowed" }}
                      >
                        CMS Slot Reserved
                      </button>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Built for Future Brand Expansion Banner */}
          <section className={styles.brandFuture}>
            <div>
              <span className={styles.typeTag} style={{ color: "#ff8469" }}>
                CMS-DRIVEN ARCHITECTURE
              </span>
              <h2>Built for Future Brand Expansion</h2>
              <p>
                Additional brands can be integrated directly through the CMS
                using our approved reusable brand-detail template, complete with
                automated product filtering, catalogue downloads, and dedicated
                quote routing without requiring frontend rebuilds.
              </p>
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}
