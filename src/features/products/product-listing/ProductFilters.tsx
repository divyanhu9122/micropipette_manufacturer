"use client";

import Link from "next/link";
import styles from "./ProductListing.module.css";
import {
  productBrands,
  productFamilies,
  productFamilyRoutes,
  type ProductBrand,
  type ProductFamily,
} from "./product-listing.data";

interface ProductFiltersProps {
  id: string;
  isOpen: boolean;
  selectedFamilies: ProductFamily[];
  onToggleFamily: (family: ProductFamily) => void;
  selectedBrands: ProductBrand[];
  onToggleBrand: (brand: ProductBrand) => void;
  selectedChannels: string[];
  onToggleChannel: (channel: string) => void;
  selectedVolumeRanges: string[];
  onToggleVolumeRange: (range: string) => void;
  onClearAll: () => void;
  activeFilterCount: number;
  familyCounts: Record<ProductFamily, number>;
  brandCounts: Record<ProductBrand, number>;
}

const CHANNEL_OPTIONS = ["Single Channel", "Multichannel"] as const;
const VOLUME_OPTIONS = [
  "0.5 – 10 µL",
  "10 – 100 µL",
  "20 – 200 µL",
  "100 – 1000 µL",
  "1 – 10 mL",
] as const;

export default function ProductFilters({
  id,
  isOpen,
  selectedFamilies,
  onToggleFamily,
  selectedBrands,
  onToggleBrand,
  selectedChannels,
  onToggleChannel,
  selectedVolumeRanges,
  onToggleVolumeRange,
  onClearAll,
  activeFilterCount,
  familyCounts,
  brandCounts,
}: ProductFiltersProps) {
  return (
    <aside
      className={`${styles.filter} ${isOpen ? styles.filterOpen : ""}`}
      id={id}
      aria-label="Product filter options"
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <h2 style={{ margin: 0 }}>Filter Products</h2>
        {activeFilterCount > 0 && (
          <button
            type="button"
            onClick={onClearAll}
            style={{
              background: "none",
              border: "none",
              color: "var(--vermilion, #f04a2a)",
              fontWeight: 700,
              fontSize: 13,
              cursor: "pointer",
              padding: "4px 8px",
            }}
            aria-label="Clear all active filters"
          >
            Clear All ({activeFilterCount})
          </button>
        )}
      </div>

      {/* 1. Category / Product Family */}
      <div className={styles.filterGroup}>
        <h3>Product Category</h3>
        {productFamilies.map((family) => {
          const href = productFamilyRoutes[family];
          const isChecked = selectedFamilies.includes(family);
          const count = familyCounts[family] ?? 0;
          return (
            <label className={styles.check} key={family}>
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => onToggleFamily(family)}
                aria-label={`Filter by ${family} (${count} items)`}
              />{" "}
              <span style={{ flex: 1 }}>{family}</span>
              {href && (
                <Link
                  className={styles.checkLink}
                  href={href}
                  title={`Go to ${family} dedicated page`}
                  onClick={(e) => e.stopPropagation()}
                  style={{ marginLeft: 6, fontSize: 11 }}
                >
                  view page ↗
                </Link>
              )}
              <span style={{ fontSize: 11, color: "#62758d", marginLeft: 4 }}>({count})</span>
            </label>
          );
        })}
      </div>

      {/* 2. Brand */}
      <div className={styles.filterGroup}>
        <h3>Brand</h3>
        {productBrands.map((brand) => {
          const isChecked = selectedBrands.includes(brand);
          const count = brandCounts[brand] ?? 0;
          return (
            <label className={styles.check} key={brand}>
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => onToggleBrand(brand)}
                aria-label={`Filter by ${brand} (${count} items)`}
              />{" "}
              <span style={{ flex: 1 }}>{brand}</span>
              <span style={{ fontSize: 11, color: "#62758d" }}>({count})</span>
            </label>
          );
        })}
      </div>

      {/* 3. Channel Type */}
      <div className={styles.filterGroup}>
        <h3>Channel Count</h3>
        {CHANNEL_OPTIONS.map((channel) => {
          const isChecked = selectedChannels.includes(channel);
          return (
            <label className={styles.check} key={channel}>
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => onToggleChannel(channel)}
                aria-label={`Filter by ${channel}`}
              />{" "}
              {channel}
            </label>
          );
        })}
      </div>

      {/* 4. Volume Range */}
      <div className={styles.filterGroup}>
        <h3>Volume Range</h3>
        {VOLUME_OPTIONS.map((vr) => {
          const isChecked = selectedVolumeRanges.includes(vr);
          return (
            <label className={styles.check} key={vr}>
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => onToggleVolumeRange(vr)}
                aria-label={`Filter by ${vr}`}
              />{" "}
              {vr}
            </label>
          );
        })}
      </div>
    </aside>
  );
}
