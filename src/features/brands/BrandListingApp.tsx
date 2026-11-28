import Link from "next/link";
import Image from "next/image";
import InnerPageHero from "@/components/layout/InnerPageHero";
import InnerPageHeroVisual from "@/components/layout/InnerPageHeroVisual";
import styles from "./Brands.module.css";
import type { BrandListingCard } from "./brands.data";

export default function BrandListingApp({
  brands = [],
}: {
  brands?: BrandListingCard[];
}) {
  return (
    <div className={styles.brandPage}>
      {/* Compact Breadcrumb Hero */}
      <InnerPageHero
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Brands" }]}
        title="Our Brands"
        eyebrow="Manufacturing brand portfolio"
        description="Explore our scientific brands and their laboratory instrument portfolios, with dedicated product information and enquiry routes."
        visual={<InnerPageHeroVisual kind="brands" />}
      />

      {/* Main Brand Listing Section */}
      <section className={styles.brandSection}>
        <div className="wrap">
          <div className={styles.brandIntro}>
            <span className={styles.typeTag}>Brand portfolio</span>
            <h2>Scientific Brands Under One Manufacturing Network</h2>
            <p>
              Explore our brand portfolio. Each brand page works as a compact
              place to explore available products, request specifications and
              contact our team.
            </p>
          </div>

          <div className={styles.brandGrid}>
            {brands.map((item) => (
              <article key={item.id} className={styles.brandMasterCard}>
                <div className={styles.brandLogoArea}>
                  <span className={styles.brandBadge}>{item.badge}</span>
                  {item.logoUrl ? (
                    <Image
                      unoptimized
                      src={item.logoUrl}
                      alt={item.name}
                      width={260}
                      height={120}
                      style={{ objectFit: "contain", maxWidth: "100%" }}
                    />
                  ) : item.logoClass ? (
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
                    <div className={styles.brandLogoTitle}>{item.name}</div>
                  )}
                  <span className={styles.brandLogoSubtitle}>
                    {item.isFuturePlaceholder
                      ? "Brand information"
                      : "Precision Liquid Handling"}
                  </span>
                </div>

                <div className={styles.brandContent}>
                  <span className={styles.brandTag}>
                    {item.isFuturePlaceholder ? "Brand portfolio" : item.name}
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
                        Details coming soon
                      </button>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Find the Right Brand for Your Requirement Banner */}
          <section className={styles.brandFuture}>
            <div>
              <span className={styles.typeTag} style={{ color: "#ff8469" }}>
                PRODUCT AND BRAND SUPPORT
              </span>
              <h2>Find the Right Brand for Your Requirement</h2>
              <p>
                Tell us your application, preferred brand, volume range and
                quantity. Our team can help you identify suitable products and
                request the documentation you need.
              </p>
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}
