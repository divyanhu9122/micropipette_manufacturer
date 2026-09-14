"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import styles from "./VariableVolume.module.css";
import VariableVolumeToolbar from "./VariableVolumeToolbar";
import VariableVolumeFilters, {
  type FilterState,
} from "./VariableVolumeFilters";
import VariableVolumeProductGrid from "./VariableVolumeProductGrid";
import VariableVolumePagination from "./VariableVolumePagination";
import QuoteModal from "@/components/ui/QuoteModal";
import {
  initialVariableVolumeProducts,
  type SortValue,
  type VariableVolumeProduct,
} from "./variable-volume.data";

const ITEMS_PER_PAGE = 6;

export default function VariableVolumeApp() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortValue, setSortValue] = useState<SortValue>("featured");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState("");

  const [filters, setFilters] = useState<FilterState>({
    channels: [],
    operations: [],
    volumeRanges: [],
    brands: [],
  });

  const activeFilterCount =
    filters.channels.length +
    filters.operations.length +
    filters.volumeRanges.length +
    filters.brands.length;

  const handleClearAll = () => {
    setFilters({
      channels: [],
      operations: [],
      volumeRanges: [],
      brands: [],
    });
    setSearchQuery("");
    setCurrentPage(1);
  };

  const handleOpenQuote = (productTitle: string) => {
    setSelectedProduct(productTitle);
    setQuoteModalOpen(true);
  };

  // Filter & Sort
  const filteredProducts = useMemo(() => {
    let list: VariableVolumeProduct[] = [...initialVariableVolumeProducts];

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.specs.volumeRange.toLowerCase().includes(q),
      );
    }

    // Channel filter
    if (filters.channels.length > 0) {
      list = list.filter((p) => filters.channels.includes(p.channelType));
    }

    // Operation filter
    if (filters.operations.length > 0) {
      list = list.filter((p) => filters.operations.includes(p.operation));
    }

    // Volume range filter
    if (filters.volumeRanges.length > 0) {
      list = list.filter((p) =>
        filters.volumeRanges.some((vr) =>
          p.specs.volumeRange.includes(vr.split(" ")[0]),
        ),
      );
    }

    // Brand filter
    if (filters.brands.length > 0) {
      list = list.filter((p) => filters.brands.includes(p.brand));
    }

    // Sort
    if (sortValue === "name-asc") {
      list.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortValue === "name-desc") {
      list.sort((a, b) => b.title.localeCompare(a.title));
    }

    return list;
  }, [searchQuery, filters, sortValue]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE) || 1;
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className={styles.page}>
      {/* Compact Hero Section */}
      <section className={styles.heroCompact}>
        <div className={styles.wrap}>
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className={styles.chevron} aria-hidden="true">
              ›
            </span>
            <Link href="/products">Products</Link>
            <span className={styles.chevron} aria-hidden="true">
              ›
            </span>
            <Link href="/products/micropipettes">Micropipettes</Link>
            <span className={styles.chevron} aria-hidden="true">
              ›
            </span>
            <span className={styles.breadcrumbCurrent}>Variable Volume</span>
          </nav>
          <h1 className={styles.title}>Variable Volume Micropipettes</h1>
        </div>
      </section>

      {/* Main Catalog Section */}
      <section className={styles.section}>
        <div className={styles.wrap}>
          <div className={styles.vvMaster}>
            {/* Top Toolbar */}
            <VariableVolumeToolbar
              searchQuery={searchQuery}
              onSearchChange={(q) => {
                setSearchQuery(q);
                setCurrentPage(1);
              }}
              sortValue={sortValue}
              onSortChange={setSortValue}
              isFilterOpen={isFilterOpen}
              onToggleFilter={() => setIsFilterOpen((prev) => !prev)}
              activeFilterCount={activeFilterCount}
            />

            {/* Layout: Filters Sidebar + Products Display */}
            <div className={styles.vvLayout}>
              <VariableVolumeFilters
                filters={filters}
                onFilterChange={(f) => {
                  setFilters(f);
                  setCurrentPage(1);
                }}
                isOpen={isFilterOpen}
                onClearAll={handleClearAll}
              />

              <section
                className={styles.vvProductsPanel}
                aria-label="Available variable volume micropipettes"
              >
                <div className={styles.vvProductsHead}>
                  <h2>Available Products</h2>
                  <span className={styles.productsCount}>
                    Showing {filteredProducts.length} Products
                  </span>
                </div>

                <div className={styles.placeholderNotice}>
                  Product specifications, volume increments, and models reflect
                  verified laboratory standards. For custom OEM volumes or brand
                  configurations, request a direct quote.
                </div>

                <div className={styles.vvProductsScroll}>
                  <VariableVolumeProductGrid
                    products={paginatedProducts}
                    onOpenQuote={handleOpenQuote}
                  />
                </div>

                <VariableVolumePagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </section>
            </div>
          </div>
        </div>
      </section>

      {/* Shared Site Quote Modal */}
      <QuoteModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        defaultProduct={selectedProduct}
      />
    </div>
  );
}
