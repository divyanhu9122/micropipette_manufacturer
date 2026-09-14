"use client";

import styles from "./VariableVolume.module.css";
import VariableVolumeProductCard from "./VariableVolumeProductCard";
import type { VariableVolumeProduct } from "./variable-volume.data";

interface VariableVolumeProductGridProps {
  products: readonly VariableVolumeProduct[];
  onOpenQuote: (productTitle: string) => void;
}

export default function VariableVolumeProductGrid({
  products,
  onOpenQuote,
}: VariableVolumeProductGridProps) {
  if (products.length === 0) {
    return (
      <div className={styles.emptyState}>
        <h3>No variable volume micropipettes match your criteria</h3>
        <p>Try clearing some filters or searching with a different term.</p>
      </div>
    );
  }

  return (
    <div className={styles.vvProductGrid}>
      {products.map((product) => (
        <VariableVolumeProductCard
          key={product.id}
          product={product}
          onOpenQuote={onOpenQuote}
        />
      ))}
    </div>
  );
}
