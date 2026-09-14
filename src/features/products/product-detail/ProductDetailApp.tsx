"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./ProductDetail.module.css";
import ProductGallery from "./ProductGallery";
import ProductHeroSummary from "./ProductHeroSummary";
import ProductSideNav from "./ProductSideNav";
import ProductSpecTable from "./ProductSpecTable";
import ProductFeaturesGrid from "./ProductFeaturesGrid";
import ProductDownloads from "./ProductDownloads";
import ProductEnquiryBanner from "./ProductEnquiryBanner";
import ProductRelatedGrid from "./ProductRelatedGrid";
import QuoteModal from "@/components/ui/QuoteModal";
import type { ProductDetailItem } from "./product-detail.data";

interface ProductDetailAppProps {
  product: ProductDetailItem;
}

export default function ProductDetailApp({ product }: ProductDetailAppProps) {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);

  const handleOpenQuote = () => {
    setQuoteModalOpen(true);
  };

  return (
    <div className={styles.page}>
      {/* Compact Hero / Breadcrumb Bar */}
      <section className={styles.heroCompact}>
        <div className={styles.wrap}>
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className={styles.chevron} aria-hidden="true">
              ›
            </span>
            <Link href="/products">Products</Link>
            <span className={styles.chevron} aria-hidden="true">
              ›
            </span>
            <Link href="/products/micropipettes">Micropipettes</Link>
            <span className={styles.chevron} aria-hidden="true">
              ›
            </span>
            <Link href="/products/micropipettes/variable-volume">
              Variable Volume
            </Link>
            <span className={styles.chevron} aria-hidden="true">
              ›
            </span>
            <span className={styles.breadcrumbCurrent}>{product.title}</span>
          </nav>
        </div>
      </section>

      {/* Main Product Detail Section */}
      <section className={styles.pdSection}>
        <div className={styles.wrap}>
          {/* Top Hero Card: Gallery + Summary */}
          <div className={styles.pdHeroCard}>
            <ProductGallery title={product.title} />
            <ProductHeroSummary
              product={product}
              onOpenQuote={handleOpenQuote}
            />
          </div>

          {/* Body Layout: Sticky In-Page Side Nav + Content Panels */}
          <div className={styles.pdLayout}>
            <ProductSideNav />

            <div className={styles.pdContent}>
              {/* Overview Panel */}
              <section className={styles.pdPanel} id="overview">
                <h2 className={styles.sectionTitle}>PRODUCT OVERVIEW</h2>
                {product.longOverview.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </section>

              {/* Technical Specifications */}
              <ProductSpecTable specifications={product.specifications} />

              {/* Key Features */}
              <ProductFeaturesGrid features={product.features} />

              {/* Applications & Downloads */}
              <ProductDownloads
                applications={product.applications}
                downloads={product.downloads}
              />

              {/* Technical Support & Quote Enquiry */}
              <ProductEnquiryBanner onOpenQuote={handleOpenQuote} />
            </div>
          </div>

          {/* Related Products Recommendation */}
          <ProductRelatedGrid relatedSlugs={product.relatedSlugs} />
        </div>
      </section>

      {/* Shared Site Quote Modal with prefilled product title */}
      <QuoteModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        defaultProduct={product.title}
      />
    </div>
  );
}
