import styles from "./ProductDetail.module.css";
import type { ProductDetailFeature } from "./product-detail.data";

interface ProductFeaturesGridProps {
  features: ProductDetailFeature[];
}

export default function ProductFeaturesGrid({
  features,
}: ProductFeaturesGridProps) {
  return (
    <section className={styles.pdPanel} id="features">
      <h2 className={styles.sectionTitle}>KEY FEATURES</h2>
      <div className={styles.pdFeatureGrid}>
        {features.map((feature) => (
          <article key={feature.num} className={styles.featureCard}>
            <span className={styles.featureNum}>{feature.num}</span>
            <h3>{feature.title}</h3>
            <p>{feature.desc}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
