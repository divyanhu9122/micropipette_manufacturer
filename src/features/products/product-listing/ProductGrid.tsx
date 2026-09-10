import styles from "./ProductListing.module.css";
import ProductCard from "./ProductCard";
import type { ProductListItem } from "./product-listing.data";

export default function ProductGrid({
  products,
}: {
  products: readonly ProductListItem[];
}) {
  return (
    <div className={styles.grid}>
      {products.map((product, index) => (
        <ProductCard
          key={product.id}
          product={product}
          revealDelayMs={(index % 4) * 50}
        />
      ))}
    </div>
  );
}
