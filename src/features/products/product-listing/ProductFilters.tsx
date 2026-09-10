import Link from "next/link";
import styles from "./ProductListing.module.css";
import {
  productBrands,
  productFamilies,
  productFamilyRoutes,
} from "./product-listing.data";

export default function ProductFilters({
  id,
  isOpen,
}: {
  id: string;
  isOpen: boolean;
}) {
  return (
    <aside
      className={`${styles.filter} ${isOpen ? styles.filterOpen : ""}`}
      id={id}
    >
      <h2>Filter Products</h2>
      <div className={styles.filterGroup}>
        <h3>Product Family</h3>
        {productFamilies.map((family) => {
          const href = productFamilyRoutes[family];
          return (
            <label className={styles.check} key={family}>
              <input type="checkbox" />{" "}
              {href ? (
                <Link className={styles.checkLink} href={href}>
                  {family}
                </Link>
              ) : (
                family
              )}
            </label>
          );
        })}
      </div>
      <div className={styles.filterGroup}>
        <h3>Brand</h3>
        {productBrands.map((brand) => (
          <label className={styles.check} key={brand}>
            <input type="checkbox" /> {brand}
          </label>
        ))}
      </div>
      <div className={styles.filterGroup}>
        <h3>Micropipette Filters</h3>
        <p className={styles.filterNote}>
          Final filter attributes will be inserted after the verified product
          data is supplied.
        </p>
      </div>
    </aside>
  );
}
