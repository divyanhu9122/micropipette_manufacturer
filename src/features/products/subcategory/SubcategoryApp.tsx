"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import styles from "./Subcategory.module.css";
import SubcategoryToolbar from "./SubcategoryToolbar";
import SubcategoryFilters, { type FilterState } from "./SubcategoryFilters";
import SubcategoryProductGrid from "./SubcategoryProductGrid";
import SubcategoryPagination from "./SubcategoryPagination";
import QuoteModal from "@/components/ui/QuoteModal";
import type {
  SortValue,
  SubcategoryConfig,
  SubcategoryProduct,
} from "./subcategory.data";

const ITEMS_PER_PAGE = 6;

interface SubcategoryAppProps {
  config: SubcategoryConfig;
}

export default function SubcategoryApp({ config }: SubcategoryAppProps) {
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
    let list: SubcategoryProduct[] = [...config.products];

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
  }, [config.products, searchQuery, filters, sortValue]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE) || 1;
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
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
            <span className={styles.breadcrumbCurrent}>{config.title}</span>
          </nav>
          <h1 className={styles.title}>{config.title}</h1>
          <p className={styles.heroDescription}>{config.heroDescription}</p>
        </div>
      </section>

      {/* Main Catalog Section */}
      <section className={styles.section}>
        <div className={styles.wrap}>
          <div className={styles.subMaster}>
            {/* Top Toolbar */}
            <SubcategoryToolbar
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
            <div className={styles.layout}>
              <SubcategoryFilters
                filters={filters}
                onFilterChange={(f) => {
                  setFilters(f);
                  setCurrentPage(1);
                }}
                isOpen={isFilterOpen}
                onClearAll={handleClearAll}
              />

              <div className={styles.productsCol}>
                <div className={styles.resultsMeta}>
                  <span>
                    Showing{" "}
                    <strong>
                      {filteredProducts.length === 0
                        ? 0
                        : (currentPage - 1) * ITEMS_PER_PAGE + 1}
                      –
                      {Math.min(
                        currentPage * ITEMS_PER_PAGE,
                        filteredProducts.length,
                      )}
                    </strong>{" "}
                    of <strong>{filteredProducts.length}</strong> instruments
                  </span>
                </div>

                <SubcategoryProductGrid
                  products={paginatedProducts}
                  onOpenQuote={handleOpenQuote}
                  onClearAll={handleClearAll}
                />

                <SubcategoryPagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            </div>
          </div>

          {/* Consultation CTA Banner */}
          <div className={styles.helpCTA}>
            <div className={styles.helpCTAContent}>
              <h2 className={styles.helpCTATitle}>
                Need Help Selecting the Right Micropipette?
              </h2>
              <p className={styles.helpCTADesc}>
                Our technical liquid-handling specialists provide volume
                compatibility checks, OEM customization inquiries, and bulk
                laboratory distributor quotes.
              </p>
            </div>
            <div className={styles.helpCTAActions}>
              <button
                type="button"
                className={styles.helpCTABtn}
                onClick={() => handleOpenQuote(`${config.title} Consultation`)}
              >
                Request Consultation
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Modal */}
      <QuoteModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        defaultProduct={selectedProduct}
      />
    </div>
  );
}
