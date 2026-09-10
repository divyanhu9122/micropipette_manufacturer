"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./ProductListing.module.css";
import { useReveal } from "./useReveal";
import { sortOptions, type SortValue } from "./product-listing.data";

export default function ProductToolbar({
  filtersId,
  isFiltersOpen,
  onToggleFilters,
  sortValue,
  onSortChange,
}: {
  filtersId: string;
  isFiltersOpen: boolean;
  onToggleFilters: () => void;
  sortValue: SortValue;
  onSortChange: (value: SortValue) => void;
}) {
  const [isSortOpen, setIsSortOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);
  const { ref: revealRef, isVisible } = useReveal<HTMLDivElement>();
  const selectedOption =
    sortOptions.find((option) => option.value === sortValue) ??
    sortOptions[0];

  useEffect(() => {
    if (!isSortOpen) return;

    const closeOnOutsideClick = (event: MouseEvent) => {
      if (!sortRef.current?.contains(event.target as Node)) {
        setIsSortOpen(false);
      }
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsSortOpen(false);
    };

    document.addEventListener("click", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("click", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [isSortOpen]);

  return (
    <div
      ref={revealRef}
      className={`${styles.toolbar} ${styles.reveal} ${isVisible ? styles.revealVisible : ""}`}
    >
      <label className={styles.search} aria-label="Search products">
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="m21 21-4.3-4.3m1.3-5.2a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
        <input type="search" placeholder="Search product, model, SKU or brand" />
      </label>

      <button
        className={styles.filterToggle}
        type="button"
        aria-expanded={isFiltersOpen}
        aria-controls={filtersId}
        onClick={onToggleFilters}
      >
        Filters
      </button>

      <div
        ref={sortRef}
        className={`${styles.sort} ${isSortOpen ? styles.sortOpen : ""}`}
      >
        <button
          className={styles.sortTrigger}
          type="button"
          aria-haspopup="listbox"
          aria-expanded={isSortOpen}
          onClick={() => setIsSortOpen((open) => !open)}
        >
          <span>{selectedOption.label}</span>
          <span className={styles.sortChevron} aria-hidden="true">
            ⌄
          </span>
        </button>
        <div className={styles.sortMenu} role="listbox" aria-label="Sort products">
          {sortOptions.map((option) => (
            <button
              key={option.value}
              className={`${styles.sortOption} ${option.value === sortValue ? styles.sortOptionSelected : ""}`}
              type="button"
              role="option"
              aria-selected={option.value === sortValue}
              onClick={() => {
                onSortChange(option.value);
                setIsSortOpen(false);
              }}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
