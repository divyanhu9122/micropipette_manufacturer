"use client";

import Link from "next/link";
import styles from "./ProductListing.module.css";
import { useReveal } from "./useReveal";
import type { ProductListItem } from "./product-listing.data";

export default function ProductCard({
  product,
  revealDelayMs = 0,
}: {
  product: ProductListItem;
  revealDelayMs?: number;
}) {
  const { ref, isVisible } = useReveal<HTMLElement>();

  return (
    <article
      ref={ref}
      className={`${styles.productCard} ${styles.reveal} ${isVisible ? styles.revealVisible : ""}`}
      style={{ transitionDelay: `${revealDelayMs}ms` }}
    >
      <div className={styles.media} aria-hidden="true">
        Product Image Placeholder
      </div>
      <div className={styles.tagRow}>
        <span className={styles.brandTag}>{product.brandLabel}</span>
        <span className={styles.typeTag}>{product.typeLabel}</span>
      </div>
      <h3>{product.title}</h3>
      <p>{product.description}</p>
      <div className={styles.specs}>
        {product.specs.map((spec, index) => (
          <span key={`${product.id}-spec-${index}`} className={styles.spec}>
            {spec}
          </span>
        ))}
      </div>
      <div className={styles.actions}>
        {/* Product Detail is not migrated yet; this points to its intended route. */}
        <Link className="btn secondary" href={`/products/${product.slug}`}>
          View Details →
        </Link>
        <a className="btn primary" href="#">
          Get Quote
        </a>
      </div>
    </article>
  );
}
