import Link from "next/link";
import styles from "./ProductListing.module.css";
import ProductListingApp from "./ProductListingApp";

import type { ProductListItem } from "./product-listing.data";

export default function ProductListing({
  products = [],
  title = "Scientific Products",
}: {
  products?: readonly ProductListItem[];
  title?: string;
}) {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.wrap}>
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className={styles.chevron} aria-hidden="true">
              ›
            </span>
            <span>Products</span>
          </nav>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.intro}>
            Explore precision laboratory instruments and consumables from LABXE,
            SSCIENCES and DANWER. Browse by category and brand to find the right
            solution for your laboratory.
          </p>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.wrap}>
          <div className={styles.panel}>
            <h2 className={styles.sectionTitle}>PRODUCTS</h2>
            <ProductListingApp products={products} />
          </div>
        </div>
      </section>
    </div>
  );
}
