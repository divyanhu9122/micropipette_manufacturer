"use client";

import type { SortValue } from "./subcategory.data";
import styles from "./Subcategory.module.css";

interface SubcategoryToolbarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  sortValue: SortValue;
  onSortChange: (v: SortValue) => void;
  isFilterOpen: boolean;
  onToggleFilter: () => void;
  activeFilterCount: number;
}

export default function SubcategoryToolbar({
  searchQuery,
  onSearchChange,
  sortValue,
  onSortChange,
  isFilterOpen,
  onToggleFilter,
  activeFilterCount,
}: SubcategoryToolbarProps) {
  return (
    <div className={styles.subToolbar}>
      {/* Search Bar */}
      <div className={styles.searchWrap}>
        <span className={styles.searchIcon} aria-hidden="true">
          🔍
        </span>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Search by model, volume range, or keyword..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          aria-label="Search micropipettes in this subcategory"
        />
        {searchQuery && (
          <button
            type="button"
            className={styles.searchClear}
            onClick={() => onSearchChange("")}
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
      </div>

      {/* Mobile Filter Toggle */}
      <button
        type="button"
        className={styles.filterToggleBtn}
        onClick={onToggleFilter}
        aria-expanded={isFilterOpen}
        aria-label="Toggle filter sidebar"
      >
        <span>⚙ Filters</span>
        {activeFilterCount > 0 && (
          <span className={styles.filterCountBadge}>{activeFilterCount}</span>
        )}
      </button>

      {/* Sort Dropdown */}
      <div className={styles.sortWrap}>
        <select
          className={styles.sortSelect}
          value={sortValue}
          onChange={(e) => onSortChange(e.target.value as SortValue)}
          aria-label="Sort products"
        >
          <option value="featured">Sort: Featured</option>
          <option value="name-asc">Name: A to Z</option>
          <option value="name-desc">Name: Z to A</option>
        </select>
      </div>
    </div>
  );
}
