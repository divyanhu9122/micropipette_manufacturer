"use client";

import type { SubcategoryProduct } from "./subcategory.data";
import SubcategoryProductCard from "./SubcategoryProductCard";
import styles from "./Subcategory.module.css";

interface SubcategoryProductGridProps {
  products: readonly SubcategoryProduct[];
  onOpenQuote: (productTitle: string) => void;
  onClearAll: () => void;
}

export default function SubcategoryProductGrid({
  products,
  onOpenQuote,
  onClearAll,
}: SubcategoryProductGridProps) {
  if (products.length === 0) {
    return (
      <div className={styles.emptyState}>
        <h3 className={styles.emptyStateTitle}>No micropipettes found</h3>
        <p className={styles.emptyStateDesc}>
          Try adjusting your search criteria or resetting filters to view all
          available models in this subcategory.
        </p>
        <button
          type="button"
          className={styles.emptyStateClearBtn}
          onClick={onClearAll}
        >
          Reset All Filters
        </button>
      </div>
    );
  }

  return (
    <div className={styles.productGrid}>
      {products.map((product) => (
        <SubcategoryProductCard
          key={product.id}
          product={product}
          onOpenQuote={onOpenQuote}
        />
      ))}
    </div>
  );
}
