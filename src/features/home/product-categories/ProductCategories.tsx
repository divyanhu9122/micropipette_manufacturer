import ProductCategoryCarousel from "./ProductCategoryCarousel";
import ProductCategoryCard from "./ProductCategoryCard";
import { productCategories } from "./productCategories.data";
import styles from "./ProductCategories.module.css";

export default function ProductCategories() {
  return (
    <section
      id="categories"
      className={styles.section}
      aria-labelledby="product-categories-title"
    >
      <div className={styles.wrap}>
        <div className={styles.panel}>
          <h2 id="product-categories-title" className={styles.title}>
            PRODUCT CATEGORIES
          </h2>
          <ProductCategoryCarousel>
            {productCategories.map((category) => (
              <ProductCategoryCard key={category.id} category={category} />
            ))}
          </ProductCategoryCarousel>
        </div>
      </div>
    </section>
  );
}
