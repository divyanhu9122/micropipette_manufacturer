"use client";

import styles from "./ProductEnquiry.module.css";
import type { ProductDetailItem } from "../product-detail/product-detail.data";

interface ProductEnquirySidebarProps {
  product: ProductDetailItem;
}

export default function ProductEnquirySidebar({ product }: ProductEnquirySidebarProps) {
  return (
    <aside className={styles.rqProduct} aria-label="Product Information">
      <div className={styles.rqImage}>
        <div className={styles.rqProductVisual} aria-hidden="true">
          <div className={styles.rqProductVisualPipette} />
        </div>
        <span>{product.brand} • {product.typeLabel}</span>
      </div>
      <div className={styles.rqProductBody}>
        <div className={styles.pdTags}>
          <span className={styles.brandTag}>{product.brand}</span>
          <span className={styles.typeTag}>{product.typeLabel}</span>
        </div>
        <h2>{product.title}</h2>
        <p>{product.shortOverview}</p>

        <div className={styles.rqSpecs}>
          <div>
            <span>Volume Range</span>
            <strong>{product.keySpecs.volumeRange}</strong>
          </div>
          <div>
            <span>Channel</span>
            <strong>{product.keySpecs.channel}</strong>
          </div>
          <div>
            <span>Product Code</span>
            <strong>{product.productCode}</strong>
          </div>
          <div>
            <span>Autoclavable</span>
            <strong>{product.keySpecs.autoclavable}</strong>
          </div>
        </div>

        <div className={styles.rqNote}>
          Product information is pre-selected automatically for this quotation request.
        </div>
      </div>
    </aside>
  );
}
