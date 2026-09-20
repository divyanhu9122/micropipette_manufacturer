"use client";

import styles from "./Subcategory.module.css";

interface SubcategoryPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function SubcategoryPagination({
  currentPage,
  totalPages,
  onPageChange,
}: SubcategoryPaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className={styles.pagination} aria-label="Pagination">
      <button
        type="button"
        className={styles.pageBtn}
        disabled={currentPage <= 1}
        onClick={() => onPageChange(currentPage - 1)}
        aria-label="Previous page"
      >
        ← Prev
      </button>

      {pages.map((p) => (
        <button
          key={p}
          type="button"
          className={`${styles.pageBtn} ${currentPage === p ? styles.pageBtnActive : ""}`}
          onClick={() => onPageChange(p)}
          aria-current={currentPage === p ? "page" : undefined}
          aria-label={`Page ${p}`}
        >
          {p}
        </button>
      ))}

      <button
        type="button"
        className={styles.pageBtn}
        disabled={currentPage >= totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        aria-label="Next page"
      >
        Next →
      </button>
    </nav>
  );
}
