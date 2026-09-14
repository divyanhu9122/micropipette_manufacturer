import Link from "next/link";
import styles from "./ProductDetail.module.css";
import { getProductBySlug } from "./product-detail.data";

interface ProductRelatedGridProps {
  relatedSlugs: string[];
}

export default function ProductRelatedGrid({
  relatedSlugs,
}: ProductRelatedGridProps) {
  const relatedProducts = relatedSlugs.map((slug) => getProductBySlug(slug));

  return (
    <section className={styles.pdRelated}>
      <div className={styles.pdRelatedHead}>
        <h2 className={styles.sectionTitle}>RELATED PRODUCTS</h2>
        <Link href="/products/micropipettes" className={styles.viewAllLink}>
          View All Micropipettes →
        </Link>
      </div>

      <div className={styles.pdRelatedGrid}>
        {relatedProducts.map((product) => (
          <article key={product.id} className={styles.pdRelatedCard}>
            <div className={styles.pdRelatedMedia} aria-hidden="true">
              [PRODUCT IMAGE]
            </div>
            <div className={styles.pdRelatedBody}>
              <span className={styles.brandTag}>{product.brand}</span>
              <h3>{product.title}</h3>
              <p>{product.shortOverview}</p>
              <Link
                href={`/products/${product.slug}`}
                className={styles.actionBtnSecondary}
              >
                View Details →
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
