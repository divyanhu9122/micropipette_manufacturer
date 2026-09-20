"use client";

import styles from "./Subcategory.module.css";

export interface FilterState {
  channels: string[];
  operations: string[];
  volumeRanges: string[];
  brands: string[];
}

interface SubcategoryFiltersProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  isOpen: boolean;
  onClearAll: () => void;
}

const BRAND_OPTIONS = ["SSCIENCES", "LABXE", "DANWER"];
const CHANNEL_OPTIONS = ["Single Channel", "Multichannel"];
const OPERATION_OPTIONS = ["Mechanical", "Electronic"];
const VOLUME_OPTIONS = [
  "0.5 – 10 µL",
  "10 – 100 µL",
  "20 – 200 µL",
  "100 – 1000 µL",
];

export default function SubcategoryFilters({
  filters,
  onFilterChange,
  isOpen,
  onClearAll,
}: SubcategoryFiltersProps) {
  const hasActiveFilters =
    filters.channels.length > 0 ||
    filters.operations.length > 0 ||
    filters.volumeRanges.length > 0 ||
    filters.brands.length > 0;

  const toggleBrand = (brand: string) => {
    const next = filters.brands.includes(brand)
      ? filters.brands.filter((b) => b !== brand)
      : [...filters.brands, brand];
    onFilterChange({ ...filters, brands: next });
  };

  const toggleChannel = (channel: string) => {
    const next = filters.channels.includes(channel)
      ? filters.channels.filter((c) => c !== channel)
      : [...filters.channels, channel];
    onFilterChange({ ...filters, channels: next });
  };

  const toggleOperation = (op: string) => {
    const next = filters.operations.includes(op)
      ? filters.operations.filter((o) => o !== op)
      : [...filters.operations, op];
    onFilterChange({ ...filters, operations: next });
  };

  const toggleVolume = (vol: string) => {
    const next = filters.volumeRanges.includes(vol)
      ? filters.volumeRanges.filter((v) => v !== vol)
      : [...filters.volumeRanges, vol];
    onFilterChange({ ...filters, volumeRanges: next });
  };

  return (
    <aside
      className={`${styles.filtersCard} ${isOpen ? styles.mobileOpen : ""}`}
      aria-label="Filter products"
    >
      <div className={styles.filtersHeader}>
        <h2 className={styles.filtersHeading}>Filters</h2>
        {hasActiveFilters && (
          <button
            type="button"
            className={styles.clearBtn}
            onClick={onClearAll}
          >
            Clear All
          </button>
        )}
      </div>

      {/* Brand */}
      <div className={styles.filterGroup}>
        <div className={styles.groupTitle}>Manufacturer Brand</div>
        <div className={styles.optionsList}>
          {BRAND_OPTIONS.map((b) => (
            <label key={b} className={styles.checkboxLabel}>
              <input
                type="checkbox"
                className={styles.checkboxInput}
                checked={filters.brands.includes(b)}
                onChange={() => toggleBrand(b)}
              />
              <span className={styles.customBox} />
              <span className={styles.filterLabelText}>{b}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Channel Configuration */}
      <div className={styles.filterGroup}>
        <div className={styles.groupTitle}>Channel Type</div>
        <div className={styles.optionsList}>
          {CHANNEL_OPTIONS.map((c) => (
            <label key={c} className={styles.checkboxLabel}>
              <input
                type="checkbox"
                className={styles.checkboxInput}
                checked={filters.channels.includes(c)}
                onChange={() => toggleChannel(c)}
              />
              <span className={styles.customBox} />
              <span className={styles.filterLabelText}>{c}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Operation Mode */}
      <div className={styles.filterGroup}>
        <div className={styles.groupTitle}>Operation Mode</div>
        <div className={styles.optionsList}>
          {OPERATION_OPTIONS.map((o) => (
            <label key={o} className={styles.checkboxLabel}>
              <input
                type="checkbox"
                className={styles.checkboxInput}
                checked={filters.operations.includes(o)}
                onChange={() => toggleOperation(o)}
              />
              <span className={styles.customBox} />
              <span className={styles.filterLabelText}>{o}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Volume Range */}
      <div className={styles.filterGroup}>
        <div className={styles.groupTitle}>Volume Range</div>
        <div className={styles.optionsList}>
          {VOLUME_OPTIONS.map((v) => (
            <label key={v} className={styles.checkboxLabel}>
              <input
                type="checkbox"
                className={styles.checkboxInput}
                checked={filters.volumeRanges.includes(v)}
                onChange={() => toggleVolume(v)}
              />
              <span className={styles.customBox} />
              <span className={styles.filterLabelText}>{v}</span>
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
}
