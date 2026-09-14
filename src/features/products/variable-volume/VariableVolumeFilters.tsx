"use client";

import styles from "./VariableVolume.module.css";
import {
  brandOptions,
  channelOptions,
  operationOptions,
  volumeRangeOptions,
} from "./variable-volume.data";

export interface FilterState {
  channels: string[];
  operations: string[];
  volumeRanges: string[];
  brands: string[];
}

interface VariableVolumeFiltersProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  isOpen: boolean;
  onClearAll: () => void;
}

export default function VariableVolumeFilters({
  filters,
  onFilterChange,
  isOpen,
  onClearAll,
}: VariableVolumeFiltersProps) {
  const hasActiveFilters =
    filters.channels.length > 0 ||
    filters.operations.length > 0 ||
    filters.volumeRanges.length > 0 ||
    filters.brands.length > 0;

  const toggleChannel = (channel: string) => {
    if (channel === "all") {
      onFilterChange({ ...filters, channels: [] });
      return;
    }
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

  const toggleVolumeRange = (vr: string) => {
    const next = filters.volumeRanges.includes(vr)
      ? filters.volumeRanges.filter((v) => v !== vr)
      : [...filters.volumeRanges, vr];
    onFilterChange({ ...filters, volumeRanges: next });
  };

  const toggleBrand = (brand: string) => {
    const next = filters.brands.includes(brand)
      ? filters.brands.filter((b) => b !== brand)
      : [...filters.brands, brand];
    onFilterChange({ ...filters, brands: next });
  };

  return (
    <aside
      id="vvFilterPanel"
      className={`${styles.vvFilterPanel} ${isOpen ? styles.vvFilterPanelOpen : ""}`}
      aria-label="Variable volume micropipette filters"
    >
      <div className={styles.vvFilterHead}>
        <h2>Filters</h2>
        {hasActiveFilters && (
          <button
            type="button"
            className={styles.clearFilterBtn}
            onClick={onClearAll}
          >
            Clear All
          </button>
        )}
      </div>

      <div className={styles.vvFilterScroll}>
        {/* Channel Type */}
        <div className={styles.vvFilterGroup}>
          <h3>Channel Type</h3>
          <label className={styles.filterLabel}>
            <input
              type="checkbox"
              className={styles.checkboxInput}
              checked={filters.channels.length === 0}
              onChange={() => toggleChannel("all")}
            />
            <span>All Channels</span>
          </label>
          {channelOptions
            .filter((opt) => opt.id !== "all")
            .map((opt) => (
              <label key={opt.id} className={styles.filterLabel}>
                <input
                  type="checkbox"
                  className={styles.checkboxInput}
                  checked={filters.channels.includes(opt.label)}
                  onChange={() => toggleChannel(opt.label)}
                />
                <span>{opt.label}</span>
              </label>
            ))}
        </div>

        {/* Operation */}
        <div className={styles.vvFilterGroup}>
          <h3>Operation</h3>
          {operationOptions.map((opt) => (
            <label key={opt.id} className={styles.filterLabel}>
              <input
                type="checkbox"
                className={styles.checkboxInput}
                checked={filters.operations.includes(opt.label)}
                onChange={() => toggleOperation(opt.label)}
              />
              <span>{opt.label}</span>
            </label>
          ))}
        </div>

        {/* Volume Range */}
        <div className={styles.vvFilterGroup}>
          <h3>Volume Range</h3>
          {volumeRangeOptions.map((opt) => (
            <label key={opt.id} className={styles.filterLabel}>
              <input
                type="checkbox"
                className={styles.checkboxInput}
                checked={filters.volumeRanges.includes(opt.label)}
                onChange={() => toggleVolumeRange(opt.label)}
              />
              <span>{opt.label}</span>
            </label>
          ))}
        </div>

        {/* Brand */}
        <div className={styles.vvFilterGroup}>
          <h3>Brand</h3>
          {brandOptions.map((opt) => (
            <label key={opt.id} className={styles.filterLabel}>
              <input
                type="checkbox"
                className={styles.checkboxInput}
                checked={filters.brands.includes(opt.id)}
                onChange={() => toggleBrand(opt.id)}
              />
              <span>{opt.label}</span>
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
}
