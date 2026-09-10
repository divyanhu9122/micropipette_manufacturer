import styles from "./ProductListing.module.css";

/**
 * Compact pagination matching the confirmed prototype: the current page is
 * the only boxed number, each adjacent page is a small plain number, and any
 * pages further away collapse to a single dot.
 */
export default function ProductPagination({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  return (
    <nav className={styles.pagination} aria-label="Product pagination">
      {currentPage > 1 && (
        <button
          className={styles.pagePrev}
          type="button"
          aria-label="Previous page"
          onClick={() => onPageChange(currentPage - 1)}
        >
          ‹
        </button>
      )}

      {currentPage > 2 && (
        <span className={styles.pageDot} aria-hidden="true">
          •
        </span>
      )}

      {currentPage > 1 && (
        <button
          className={styles.pageMini}
          type="button"
          aria-label={`Go to page ${currentPage - 1}`}
          onClick={() => onPageChange(currentPage - 1)}
        >
          {currentPage - 1}
        </button>
      )}

      <span className={styles.pageCurrent} aria-current="page">
        {currentPage}
      </span>

      {currentPage < totalPages && (
        <button
          className={styles.pageMini}
          type="button"
          aria-label={`Go to page ${currentPage + 1}`}
          onClick={() => onPageChange(currentPage + 1)}
        >
          {currentPage + 1}
        </button>
      )}

      {currentPage < totalPages - 1 && (
        <span className={styles.pageDot} aria-hidden="true">
          •
        </span>
      )}

      {currentPage < totalPages && (
        <button
          className={styles.pageNext}
          type="button"
          aria-label="Next page"
          onClick={() => onPageChange(currentPage + 1)}
        >
          ›
        </button>
      )}
    </nav>
  );
}
