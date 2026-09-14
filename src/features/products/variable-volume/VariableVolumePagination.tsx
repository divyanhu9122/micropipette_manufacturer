"use client";

import styles from "./VariableVolume.module.css";

interface VariableVolumePaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function VariableVolumePagination({
  currentPage,
  totalPages,
  onPageChange,
}: VariableVolumePaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <nav
      className={styles.vvPagination}
      aria-label="Variable volume product pages"
    >
      <button
        type="button"
        className={styles.pageBtn}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
      >
        ‹
      </button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          type="button"
          className={`${styles.pageBtn} ${currentPage === page ? styles.pageBtnActive : ""}`}
          onClick={() => onPageChange(page)}
          aria-current={currentPage === page ? "page" : undefined}
        >
          {page}
        </button>
      ))}

      <button
        type="button"
        className={styles.pageBtn}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
      >
        ›
      </button>
    </nav>
  );
}
