"use client";

import Link from "next/link";
import styles from "./VariableVolume.module.css";
import type { VariableVolumeProduct } from "./variable-volume.data";

interface VariableVolumeProductCardProps {
  product: VariableVolumeProduct;
  onOpenQuote: (productTitle: string) => void;
}

export default function VariableVolumeProductCard({
  product,
  onOpenQuote,
}: VariableVolumeProductCardProps) {
  return (
    <article className={styles.vvProductItem}>
      <div
        className={styles.vvProductImage}
        aria-label={`${product.title} illustration`}
      >
        <div className={styles.pipetteGraphic} aria-hidden="true">
          <div className={styles.pipetteStem} />
        </div>
        <span>[PRODUCT IMAGE / MODEL]</span>
      </div>

      <div className={styles.vvProductBody}>
        <div className={styles.tagRow}>
          <span className={styles.brandTag}>{product.brandLabel}</span>
          <span className={styles.typeTag}>{product.typeLabel}</span>
        </div>

        <h3>{product.title}</h3>
        <p>{product.description}</p>

        <div className={styles.vvSpecGrid}>
          <div className={styles.specItem}>
            <span className={styles.specLabel}>Volume Range</span>
            <strong className={styles.specValue}>
              {product.specs.volumeRange}
            </strong>
          </div>
          <div className={styles.specItem}>
            <span className={styles.specLabel}>Increment</span>
            <strong className={styles.specValue}>
              {product.specs.increment}
            </strong>
          </div>
          <div className={styles.specItem}>
            <span className={styles.specLabel}>Channel</span>
            <strong className={styles.specValue}>
              {product.specs.channel}
            </strong>
          </div>
          <div className={styles.specItem}>
            <span className={styles.specLabel}>Autoclavable</span>
            <strong className={styles.specValue}>
              {product.specs.autoclavable}
            </strong>
          </div>
        </div>

        <div className={styles.vvActions}>
          <Link
            href={`/products/${product.slug}`}
            className={styles.actionBtnSecondary}
          >
            View Details →
          </Link>
          <button
            type="button"
            className={styles.actionBtnPrimary}
            onClick={() => onOpenQuote(product.title)}
          >
            Get Quote
          </button>
        </div>
      </div>
    </article>
  );
}
