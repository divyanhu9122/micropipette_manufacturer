"use client";

import styles from "./ProductDetail.module.css";
import type { ProductDetailItem } from "./product-detail.data";

interface ProductHeroSummaryProps {
  product: ProductDetailItem;
  onOpenQuote: () => void;
}

export default function ProductHeroSummary({
  product,
  onOpenQuote,
}: ProductHeroSummaryProps) {
  return (
    <div className={styles.pdSummary}>
      <div className={styles.pdTags}>
        <span className={styles.brandTag}>{product.brand}</span>
        <span className={styles.typeTag}>{product.typeLabel}</span>
      </div>

      <h1 className={styles.pdTitle}>{product.title}</h1>
      <p className={styles.pdShortCopy}>{product.shortOverview}</p>

      <div className={styles.pdKeySpecs}>
        <div className={styles.pdKeySpec}>
          <span className={styles.keySpecLabel}>Volume Range</span>
          <strong className={styles.keySpecValue}>
            {product.keySpecs.volumeRange}
          </strong>
        </div>
        <div className={styles.pdKeySpec}>
          <span className={styles.keySpecLabel}>Increment</span>
          <strong className={styles.keySpecValue}>
            {product.keySpecs.increment}
          </strong>
        </div>
        <div className={styles.pdKeySpec}>
          <span className={styles.keySpecLabel}>Channel</span>
          <strong className={styles.keySpecValue}>
            {product.keySpecs.channel}
          </strong>
        </div>
        <div className={styles.pdKeySpec}>
          <span className={styles.keySpecLabel}>Autoclavable</span>
          <strong className={styles.keySpecValue}>
            {product.keySpecs.autoclavable}
          </strong>
        </div>
      </div>

      <div className={styles.pdActions}>
        <button
          type="button"
          className={styles.actionBtnPrimary}
          onClick={onOpenQuote}
        >
          Request Quote →
        </button>
        <a href="#downloads" className={styles.actionBtnSecondary}>
          Download Datasheet
        </a>
      </div>

      <div className={styles.pdMetaStrip}>
        <div>
          <span className={styles.metaLabel}>Product Code</span>
          <strong className={styles.metaValue}>{product.productCode}</strong>
        </div>
        <div>
          <span className={styles.metaLabel}>Brand</span>
          <strong className={styles.metaValue}>{product.brand}</strong>
        </div>
        <div>
          <span className={styles.metaLabel}>Category</span>
          <strong className={styles.metaValue}>{product.category}</strong>
        </div>
      </div>
    </div>
  );
}
