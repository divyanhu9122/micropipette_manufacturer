"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./ProductListing.module.css";
import ProductToolbar from "./ProductToolbar";
import ProductFilters from "./ProductFilters";
import ProductGrid from "./ProductGrid";
import ProductPagination from "./ProductPagination";
import { useReveal } from "./useReveal";
import {
  productListItems,
  prototypeTotalPages,
  type SortValue,
} from "./product-listing.data";

const FILTERS_ID = "productFilters";

export default function ProductListingApp() {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [sortValue, setSortValue] = useState<SortValue>("featured");
  const [currentPage, setCurrentPage] = useState(1);
  const resultsScrollRef = useRef<HTMLDivElement>(null);
  const { ref: resultsHeadRef, isVisible: isResultsHeadVisible } =
    useReveal<HTMLDivElement>();

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 861px)");
    const closeOnDesktop = () => {
      if (desktop.matches) setIsFiltersOpen(false);
    };
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);

  const handlePageChange = (page: number) => {
    const nextPage = Math.max(1, Math.min(page, prototypeTotalPages));
    setCurrentPage(nextPage);
    resultsScrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <ProductToolbar
        filtersId={FILTERS_ID}
        isFiltersOpen={isFiltersOpen}
        onToggleFilters={() => setIsFiltersOpen((open) => !open)}
        sortValue={sortValue}
        onSortChange={setSortValue}
      />

      <div className={styles.layout}>
        <ProductFilters id={FILTERS_ID} isOpen={isFiltersOpen} />

        <section className={styles.resultsBlock} aria-labelledby="resultTitle">
          <div
            ref={resultsHeadRef}
            className={`${styles.resultsHead} ${styles.reveal} ${isResultsHeadVisible ? styles.revealVisible : ""}`}
          >
            <h2 id="resultTitle">Available Products</h2>
            <span>Showing {productListItems.length} Prototype Products</span>
          </div>
          <p className={styles.placeholder}>
            Product names, images and technical specifications are
            placeholders at this UX stage. Production content will come from
            the CMS and verified business data.
          </p>
          <div className={styles.resultsScroll} ref={resultsScrollRef}>
            <ProductGrid products={productListItems} />
          </div>
          <ProductPagination
            currentPage={currentPage}
            totalPages={prototypeTotalPages}
            onPageChange={handlePageChange}
          />
        </section>
      </div>
    </>
  );
}
