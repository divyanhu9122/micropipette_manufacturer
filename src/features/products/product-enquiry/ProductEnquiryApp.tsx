"use client";

import Link from "next/link";
import styles from "./ProductEnquiry.module.css";
import ProductEnquirySidebar from "./ProductEnquirySidebar";
import ProductEnquiryForm from "./ProductEnquiryForm";
import ProductEnquiryHelp from "./ProductEnquiryHelp";
import type { ProductDetailItem } from "../product-detail/product-detail.data";

interface ProductEnquiryAppProps {
  product: ProductDetailItem;
}

export default function ProductEnquiryApp({ product }: ProductEnquiryAppProps) {
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
            <Link href={`/products/${product.slug}`}>
              {product.title}
            </Link>
            <span className={styles.chevron} aria-hidden="true">
              ›
            </span>
            <span className={styles.breadcrumbCurrent}>Request Quote</span>
          </nav>
          <h1 className={styles.heroTitle}>Request Quote</h1>
        </div>
      </section>

      {/* Main Request Quote 2-Column Section */}
      <section className={styles.rqSection}>
        <div className={styles.wrap}>
          <div className={styles.rqLayout}>
            <ProductEnquirySidebar product={product} />
            <ProductEnquiryForm product={product} />
          </div>
          <ProductEnquiryHelp />
        </div>
      </section>
    </div>
  );
}
