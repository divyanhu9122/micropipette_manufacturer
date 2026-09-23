"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./Brands.module.css";
import type { BrandDetailItem } from "./brands.data";
import QuoteModal from "@/components/ui/QuoteModal";
import CatalogueModal from "@/components/ui/CatalogueModal";

interface BrandDetailAppProps {
  brand: BrandDetailItem;
}

export default function BrandDetailApp({ brand }: BrandDetailAppProps) {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [quoteProduct, setQuoteProduct] = useState("");
  const [catalogueModalOpen, setCatalogueModalOpen] = useState(false);

  const handleOpenQuote = (productName = "") => {
    setQuoteProduct(productName || `${brand.name} Product Range`);
    setQuoteModalOpen(true);
  };

  const handleOpenCatalogue = () => {
    setCatalogueModalOpen(true);
  };

  return (
    <div className={styles.brandPage}>
      {/* Compact Breadcrumb Hero */}
      <section className={styles.heroCompact}>
        <div className="wrap">
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className={styles.breadcrumbSep}>›</span>
            <Link href="/brands">Brands</Link>
            <span className={styles.breadcrumbSep}>›</span>
            <span>{brand.name}</span>
          </nav>
          <h1>{brand.name}</h1>
        </div>
      </section>

      {/* Main Detail Content */}
      <section className={styles.bdSection}>
        <div className="wrap">
          {/* Brand Hero Card */}
          <section className={styles.bdHeroCard}>
            <div className={styles.bdLogoPanel}>
              <div className={styles.bdLogoBox}>
                <span className={styles.brandBadge}>{brand.badge}</span>
                <div
                  className={`${styles.brandLogoTitle} ${styles[brand.brandLogoClass]}`}
                >
                  {brand.name === "LABXE" ? (
                    <>
                      LAB<b>XE</b>
                    </>
                  ) : brand.name === "SSCIENCES" ? (
                    <>
                      S<b>SCIENCES</b>
                    </>
                  ) : (
                    brand.name
                  )}
                </div>
                <span className={styles.brandLogoSubtitle}>{brand.tagline}</span>
              </div>
            </div>

            <div className={styles.bdHeroContent}>
              <span className={styles.typeTag}>BRAND PROFILE</span>
              <h2>{brand.name}</h2>
              <p>{brand.shortIntro}</p>

              <div className={styles.bdTags}>
                {brand.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </div>
          </section>

          {/* About the Brand Panel */}
          <section className={styles.bdPanel} id="about">
            <div className={styles.bdSectionHead}>
              <h2 className={styles.bdSectionTitle}>ABOUT THE BRAND</h2>
            </div>
            <div className={styles.bdTwoCol}>
              <div>
                {brand.aboutStory.map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>
              <div className={styles.bdFacts}>
                {brand.facts.map((fact) => (
                  <div key={fact.label}>
                    <span>{fact.label}</span>
                    <strong>
                      {fact.label === "Official Website" ? (
                        <a
                          href={fact.value}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {fact.value.replace("https://", "")} ↗
                        </a>
                      ) : (
                        fact.value
                      )}
                    </strong>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Featured Products Panel */}
          <section className={styles.bdPanel} id="products">
            <div className={`${styles.bdSectionHead} ${styles.bdSectionHeadRow}`}>
              <h2 className={styles.bdSectionTitle}>FEATURED PRODUCTS</h2>
              <Link href="/products" className={styles.bdSectionLink}>
                View All {brand.name} Products →
              </Link>
            </div>

            <div className={styles.bdProductGrid}>
              {brand.featuredProducts.map((product) => (
                <article key={product.id} className={styles.bdProductItem}>
                  <div className={styles.bdProductMedia}>
                    <div className={styles.pipetteIconGraphic}>
                      <div className={styles.pipetteIconTop} />
                      <div className={styles.pipetteIconBody}>
                        {brand.name.slice(0, 4)}
                      </div>
                      <div className={styles.pipetteIconShaft} />
                      <div className={styles.pipetteIconTip} />
                    </div>
                    <span>{product.typeLabel}</span>
                  </div>
                  <div className={styles.bdProductBody}>
                    <span className={styles.brandTag}>{product.brandTag}</span>
                    <h3>{product.title}</h3>
                    <p>{product.description}</p>
                    <Link
                      href={`/products/${product.slug}`}
                      className={`btn secondary ${styles.ctaBtn}`}
                    >
                      View Details →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* Capabilities & Support Panel */}
          <section className={styles.bdPanel} id="capabilities">
            <div className={styles.bdSectionHead}>
              <h2 className={styles.bdSectionTitle}>CAPABILITIES & SUPPORT</h2>
            </div>

            <div className={styles.bdCapabilityGrid}>
              {brand.capabilities.map((cap) => (
                <article key={cap.num} className={styles.bdCapabilityCard}>
                  <span className={styles.bdCapabilityNum}>{cap.num}</span>
                  <h3>{cap.title}</h3>
                  <p>{cap.desc}</p>
                </article>
              ))}
            </div>
          </section>

          {/* Catalogues & Resources Panel */}
          <section className={styles.bdPanel} id="resources">
            <div className={styles.bdSectionHead}>
              <h2 className={styles.bdSectionTitle}>CATALOGUES & RESOURCES</h2>
            </div>

            <div className={styles.bdResourceList}>
              {brand.resources.map((res) => (
                <article key={res.id} className={styles.bdResourceCard}>
                  <div className={styles.bdResourceInfo}>
                    <strong>{res.title}</strong>
                    <span>
                      {res.format} • {res.size} • Official Manufacturer Edition
                    </span>
                  </div>
                  <button
                    type="button"
                    className="btn secondary"
                    onClick={handleOpenCatalogue}
                  >
                    Download
                  </button>
                </article>
              ))}
            </div>
          </section>

          {/* B2B Enquiry CTA Banner */}
          <section className={styles.bdCta}>
            <div>
              <span className={styles.typeTag} style={{ color: "#ff8469" }}>
                B2B DIRECT INQUIRY
              </span>
              <h2>Interested in {brand.name} Products?</h2>
              <p>
                Request bulk quotation, distributor support, technical data
                sheets, or custom OEM/private-label variations directly from our
                manufacturing sales engineering team.
              </p>
            </div>

            <div className={styles.bdCtaActions}>
              <button
                type="button"
                className="btn primary"
                onClick={() => handleOpenQuote()}
                id={`quote-brand-${brand.id}`}
              >
                Request Quote →
              </button>
              <a
                className={`btn secondary ${styles.bdCtaSecondary}`}
                href={brand.officialWebsiteUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit Official Website ↗
              </a>
            </div>
          </section>
        </div>
      </section>

      {/* Quote and Catalogue Modals */}
      <QuoteModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        defaultProduct={quoteProduct}
      />
      <CatalogueModal
        isOpen={catalogueModalOpen}
        onClose={() => setCatalogueModalOpen(false)}
      />
    </div>
  );
}
