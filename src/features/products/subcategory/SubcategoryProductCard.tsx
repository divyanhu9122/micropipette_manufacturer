"use client";

import Link from "next/link";
import type { SubcategoryProduct } from "./subcategory.data";
import styles from "./Subcategory.module.css";

interface SubcategoryProductCardProps {
  product: SubcategoryProduct;
  onOpenQuote: (productTitle: string) => void;
}

export default function SubcategoryProductCard({
  product,
  onOpenQuote,
}: SubcategoryProductCardProps) {
  return (
    <article className={styles.productCard}>
      <div className={styles.cardBrandBar}>
        <span className={styles.cardBrandPill}>{product.brandLabel}</span>
        <span className={styles.cardTypePill}>{product.typeLabel}</span>
      </div>

      <h3 className={styles.cardTitle}>
        <Link
          href={`/products/${product.slug}`}
          className={styles.cardTitleLink}
        >
          {product.title}
        </Link>
      </h3>

      <p className={styles.cardDesc}>{product.description}</p>

      <div className={styles.specsGrid}>
        <div className={styles.specItem}>
          <span className={styles.specKey}>Volume</span>
          <span className={styles.specVal}>{product.specs.volumeRange}</span>
        </div>
        <div className={styles.specItem}>
          <span className={styles.specKey}>Increment</span>
          <span className={styles.specVal}>{product.specs.increment}</span>
        </div>
        <div className={styles.specItem}>
          <span className={styles.specKey}>Channel</span>
          <span className={styles.specVal}>{product.specs.channel}</span>
        </div>
        <div className={styles.specItem}>
          <span className={styles.specKey}>Sterilization</span>
          <span className={styles.specVal}>{product.specs.autoclavable}</span>
        </div>
      </div>

      <div className={styles.cardActions}>
        <button
          type="button"
          className={styles.btnQuote}
          onClick={() => onOpenQuote(product.title)}
        >
          Request Quote
        </button>
        <Link
          href={`/products/${product.slug}`}
          className={styles.btnDetails}
        >
          View Details →
        </Link>
      </div>
    </article>
  );
}
