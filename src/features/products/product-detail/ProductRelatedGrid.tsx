import Link from "next/link";
import featuredStyles from "@/features/home/featured-products/FeaturedProducts.module.css";
import productCardStyles from "@/features/home/product-categories/ProductCategories.module.css";
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
    <section
      className={`${productCardStyles.panel} ${featuredStyles.section} ${styles.pdRelated}`}
    >
      <div className={styles.pdRelatedHead}>
        <h2 className={styles.sectionTitle}>RELATED PRODUCTS</h2>
        <Link href="/products/micropipettes" className={styles.viewAllLink}>
          View All Micropipettes →
        </Link>
      </div>

      <div className={styles.pdRelatedGrid}>
        {relatedProducts.map((product) => (
          <article
            key={product.id}
            className={`${productCardStyles.card} ${featuredStyles.card} ${styles.pdRelatedCard}`}
          >
            <div
              className={`${productCardStyles.media} ${featuredStyles.media} ${styles.pdRelatedMedia}`}
            >
              <div className={styles.pdRelatedPipette} aria-hidden="true">
                <div className={styles.pdRelatedPipetteTop} />
                <div className={styles.pdRelatedPipetteBody}>
                  {product.brand.slice(0, 4)}
                </div>
                <div className={styles.pdRelatedPipetteShaft} />
                <div className={styles.pdRelatedPipetteTip} />
              </div>
              <span className={featuredStyles.typeTag}>
                {product.typeLabel}
              </span>
            </div>
            <div className={styles.pdRelatedBody}>
              <span className={featuredStyles.brandTag}>{product.brand}</span>
              <h3>{product.title}</h3>
              <p>{product.shortOverview}</p>
              <Link
                href={`/products/${product.slug}`}
                className={`btn secondary ${featuredStyles.details} ${styles.pdRelatedAction}`}
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
