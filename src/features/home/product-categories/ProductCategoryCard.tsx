import type { ProductCategory } from "./productCategories.data";
import styles from "./ProductCategories.module.css";

export default function ProductCategoryCard({
  category,
}: {
  category: ProductCategory;
}) {
  return (
    <article className={styles.card}>
      <div className={styles.media} aria-hidden="true">
        {category.visualType === "micropipette" && (
          <div className={styles.pipettes}>
            {[0, 1, 2].map((id) => (
              <div className={styles.pipette} key={id}>
                <div className={styles.pipetteTop} />
                <div className={styles.pipetteBody} />
                <div className={styles.pipetteShaft} />
                <div className={styles.pipetteNozzle} />
              </div>
            ))}
          </div>
        )}
        {category.visualType === "tips" && (
          <div className={styles.tips}>
            <span />
            <span />
            <span />
            <span />
          </div>
        )}
        {category.visualType === "rack" && <div className={styles.rack} />}
        {category.visualType === "controller" && (
          <div className={styles.controller} />
        )}
        {category.visualType === "stand" && (
          <div className={styles.stand}>
            <div className={styles.holder} />
          </div>
        )}
        {category.visualType === "balance" && (
          <div className={styles.balance} />
        )}
      </div>
      <h3>{category.title}</h3>
      <p>{category.description}</p>
    </article>
  );
}
