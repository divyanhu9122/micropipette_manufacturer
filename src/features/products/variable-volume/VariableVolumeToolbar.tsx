"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./VariableVolume.module.css";
import type { SortValue } from "./variable-volume.data";

interface VariableVolumeToolbarProps {
  searchQuery: string;
  onSearchChange: (val: string) => void;
  sortValue: SortValue;
  onSortChange: (val: SortValue) => void;
  isFilterOpen: boolean;
  onToggleFilter: () => void;
  activeFilterCount: number;
}

const SORT_LABELS: Record<SortValue, string> = {
  featured: "Sort: Featured",
  "name-asc": "Name A–Z",
  "name-desc": "Name Z–A",
};

export default function VariableVolumeToolbar({
  searchQuery,
  onSearchChange,
  sortValue,
  onSortChange,
  isFilterOpen,
  onToggleFilter,
  activeFilterCount,
}: VariableVolumeToolbarProps) {
  const [isSortOpen, setIsSortOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) {
        setIsSortOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsSortOpen(false);
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className={styles.vvToolbar}>
      <label
        className={styles.searchWrap}
        aria-label="Search variable volume micropipettes"
      >
        <svg
          className={styles.searchIcon}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
        <input
          type="search"
          className={styles.searchInput}
          placeholder="Search variable volume micropipettes..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </label>

      <button
        type="button"
        className={styles.filterToggleBtn}
        onClick={onToggleFilter}
        aria-expanded={isFilterOpen}
        aria-controls="vvFilterPanel"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <line x1="4" y1="21" x2="4" y2="14" />
          <line x1="4" y1="10" x2="4" y2="3" />
          <line x1="12" y1="21" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12" y2="3" />
          <line x1="20" y1="21" x2="20" y2="16" />
          <line x1="20" y1="12" x2="20" y2="3" />
          <line x1="1" y1="14" x2="7" y2="14" />
          <line x1="9" y1="8" x2="15" y2="8" />
          <line x1="17" y1="16" x2="23" y2="16" />
        </svg>
        <span>{isFilterOpen ? "Hide Filters" : "Filter Products"}</span>
        {activeFilterCount > 0 && <span>({activeFilterCount})</span>}
      </button>

      <div
        ref={sortRef}
        className={`${styles.sortContainer} ${isSortOpen ? styles.sortOpen : ""}`}
      >
        <button
          type="button"
          className={styles.sortTrigger}
          onClick={() => setIsSortOpen((open) => !open)}
          aria-haspopup="listbox"
          aria-expanded={isSortOpen}
        >
          <span>{SORT_LABELS[sortValue]}</span>
          <span className={styles.sortChevron} aria-hidden="true">
            ⌄
          </span>
        </button>

        {isSortOpen && (
          <div
            className={styles.sortMenu}
            role="listbox"
            aria-label="Sort products"
          >
            {(["featured", "name-asc", "name-desc"] as const).map((key) => (
              <button
                key={key}
                type="button"
                role="option"
                aria-selected={sortValue === key}
                className={`${styles.sortOption} ${sortValue === key ? styles.sortOptionSelected : ""}`}
                onClick={() => {
                  onSortChange(key);
                  setIsSortOpen(false);
                }}
              >
                {SORT_LABELS[key]}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
