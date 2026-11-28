"use client";

import Link from "next/link";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import styles from "./ProductListing.module.css";
import ProductToolbar from "./ProductToolbar";
import ProductFilters from "./ProductFilters";
import ProductGrid from "./ProductGrid";
import ProductPagination from "./ProductPagination";
import { useReveal } from "./useReveal";
import {
  type ProductListItem,
  type ProductBrand,
  type ProductFamily,
  type SortValue,
} from "./product-listing.data";

const FILTERS_ID = "productFilters";
const ITEMS_PER_PAGE = 6;

function ProductListingContent({
  products,
}: {
  products: readonly ProductListItem[];
}) {
  const productListItems = products;
  const productFamilies = Array.from(
    new Set(products.map((item) => item.family)),
  );
  const productBrands = Array.from(
    new Set(products.map((item) => item.brandLabel)),
  );
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category");
  const initialBrand = searchParams.get("brand");
  const initialSearch =
    searchParams.get("q") || searchParams.get("search") || "";

  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [sortValue, setSortValue] = useState<SortValue>("featured");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState(initialSearch);

  const [selectedFamilies, setSelectedFamilies] = useState<ProductFamily[]>(
    () => {
      if (
        initialCategory &&
        productFamilies.includes(initialCategory as ProductFamily)
      ) {
        return [initialCategory as ProductFamily];
      }
      return [];
    },
  );

  const [selectedBrands, setSelectedBrands] = useState<ProductBrand[]>(() => {
    if (initialBrand && productBrands.includes(initialBrand as ProductBrand)) {
      return [initialBrand as ProductBrand];
    }
    return [];
  });

  const [selectedChannels, setSelectedChannels] = useState<string[]>([]);
  const [selectedVolumeRanges, setSelectedVolumeRanges] = useState<string[]>(
    [],
  );

  const resultsScrollRef = useRef<HTMLDivElement>(null);
  const { ref: resultsHeadRef, isVisible: isResultsHeadVisible } =
    useReveal<HTMLDivElement>();

  // Responsive filter panel listener
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 861px)");
    const closeOnDesktop = () => {
      if (desktop.matches) setIsFiltersOpen(false);
    };
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);

  // Counts across the dataset
  const familyCounts = Object.fromEntries(
    productFamilies.map((family) => [
      family,
      products.filter((item) => item.family === family).length,
    ]),
  );

  const brandCounts = Object.fromEntries(
    productBrands.map((brand) => [
      brand,
      products.filter((item) => item.brandLabel === brand).length,
    ]),
  );

  const handleToggleFamily = (family: ProductFamily) => {
    setSelectedFamilies((prev) =>
      prev.includes(family)
        ? prev.filter((f) => f !== family)
        : [...prev, family],
    );
    setCurrentPage(1);
  };

  const handleToggleBrand = (brand: ProductBrand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand],
    );
    setCurrentPage(1);
  };

  const handleToggleChannel = (channel: string) => {
    setSelectedChannels((prev) =>
      prev.includes(channel)
        ? prev.filter((c) => c !== channel)
        : [...prev, channel],
    );
    setCurrentPage(1);
  };

  const handleToggleVolumeRange = (vr: string) => {
    setSelectedVolumeRanges((prev) =>
      prev.includes(vr) ? prev.filter((v) => v !== vr) : [...prev, vr],
    );
    setCurrentPage(1);
  };

  const handleClearAll = () => {
    setSelectedFamilies([]);
    setSelectedBrands([]);
    setSelectedChannels([]);
    setSelectedVolumeRanges([]);
    setSearchQuery("");
    setCurrentPage(1);
  };

  const activeFilterCount =
    selectedFamilies.length +
    selectedBrands.length +
    selectedChannels.length +
    selectedVolumeRanges.length +
    (searchQuery.trim() ? 1 : 0);

  // Filtered & Sorted products
  const filteredProducts = useMemo(() => {
    let list = [...productListItems];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.brandLabel.toLowerCase().includes(q) ||
          p.family.toLowerCase().includes(q) ||
          p.specs.some((s) => s.toLowerCase().includes(q)),
      );
    }

    if (selectedFamilies.length > 0) {
      list = list.filter((p) => selectedFamilies.includes(p.family));
    }

    if (selectedBrands.length > 0) {
      list = list.filter((p) => selectedBrands.includes(p.brandLabel));
    }

    if (selectedChannels.length > 0) {
      list = list.filter(
        (p) => p.channelType && selectedChannels.includes(p.channelType),
      );
    }

    if (selectedVolumeRanges.length > 0) {
      list = list.filter((p) => {
        if (!p.volumeRange) return false;
        return selectedVolumeRanges.includes(p.volumeRange);
      });
    }

    if (sortValue === "az") {
      list.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortValue === "za") {
      list.sort((a, b) => b.title.localeCompare(a.title));
    }

    return list;
  }, [
    productListItems,
    searchQuery,
    selectedFamilies,
    selectedBrands,
    selectedChannels,
    selectedVolumeRanges,
    sortValue,
  ]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredProducts.length / ITEMS_PER_PAGE),
  );
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  const handlePageChange = (page: number) => {
    const nextPage = Math.max(1, Math.min(page, totalPages));
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
        onSortChange={(val) => {
          setSortValue(val);
          setCurrentPage(1);
        }}
        searchQuery={searchQuery}
        onSearchChange={(val) => {
          setSearchQuery(val);
          setCurrentPage(1);
        }}
      />

      <div className={styles.layout}>
        <ProductFilters
          id={FILTERS_ID}
          isOpen={isFiltersOpen}
          selectedFamilies={selectedFamilies}
          onToggleFamily={handleToggleFamily}
          selectedBrands={selectedBrands}
          onToggleBrand={handleToggleBrand}
          selectedChannels={selectedChannels}
          onToggleChannel={handleToggleChannel}
          selectedVolumeRanges={selectedVolumeRanges}
          onToggleVolumeRange={handleToggleVolumeRange}
          onClearAll={handleClearAll}
          activeFilterCount={activeFilterCount}
          familyCounts={familyCounts}
          brandCounts={brandCounts}
          volumeOptions={Array.from(
            new Set(
              products
                .map((item) => item.volumeRange)
                .filter((range): range is string =>
                  Boolean(range && range !== "Not specified"),
                ),
            ),
          )}
        />

        <section className={styles.resultsBlock} aria-labelledby="resultTitle">
          <div
            ref={resultsHeadRef}
            className={`${styles.resultsHead} ${styles.reveal} ${isResultsHeadVisible ? styles.revealVisible : ""}`}
          >
            <h2 id="resultTitle">Available Products</h2>
            <span>
              Showing {filteredProducts.length}{" "}
              {filteredProducts.length === 1 ? "Product" : "Products"}
            </span>
          </div>

          {activeFilterCount > 0 && (
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 8,
                margin: "8px 0 16px",
              }}
            >
              {selectedFamilies.map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => handleToggleFamily(f)}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "4px 10px",
                    background: "#eef5ff",
                    border: "1px solid #c8dcf5",
                    borderRadius: 999,
                    fontSize: 12,
                    fontWeight: 600,
                    color: "#082f68",
                    cursor: "pointer",
                  }}
                >
                  Category: {f} ×
                </button>
              ))}
              {selectedBrands.map((b) => (
                <button
                  key={b}
                  type="button"
                  onClick={() => handleToggleBrand(b)}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "4px 10px",
                    background: "#fff2ee",
                    border: "1px solid #ffd4c9",
                    borderRadius: 999,
                    fontSize: 12,
                    fontWeight: 600,
                    color: "#c23013",
                    cursor: "pointer",
                  }}
                >
                  Brand: {b} ×
                </button>
              ))}
              {selectedChannels.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => handleToggleChannel(c)}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "4px 10px",
                    background: "#f0f4f8",
                    border: "1px solid #d4e0eb",
                    borderRadius: 999,
                    fontSize: 12,
                    fontWeight: 600,
                    color: "#334e68",
                    cursor: "pointer",
                  }}
                >
                  {c} ×
                </button>
              ))}
              {selectedVolumeRanges.map((vr) => (
                <button
                  key={vr}
                  type="button"
                  onClick={() => handleToggleVolumeRange(vr)}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "4px 10px",
                    background: "#f0f4f8",
                    border: "1px solid #d4e0eb",
                    borderRadius: 999,
                    fontSize: 12,
                    fontWeight: 600,
                    color: "#334e68",
                    cursor: "pointer",
                  }}
                >
                  Volume: {vr} ×
                </button>
              ))}
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "4px 10px",
                    background: "#f0f4f8",
                    border: "1px solid #d4e0eb",
                    borderRadius: 999,
                    fontSize: 12,
                    fontWeight: 600,
                    color: "#334e68",
                    cursor: "pointer",
                  }}
                >
                  Search: &ldquo;{searchQuery}&rdquo; ×
                </button>
              )}
              <button
                type="button"
                onClick={handleClearAll}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#d72d2d",
                  fontSize: 12,
                  fontWeight: 700,
                  cursor: "pointer",
                  textDecoration: "underline",
                  padding: "4px 8px",
                }}
              >
                Clear all filters
              </button>
            </div>
          )}

          {filteredProducts.length === 0 ? (
            <div
              style={{
                background: "linear-gradient(180deg, #f8fbff 0%, #ebf4ff 100%)",
                border: "1px solid #d6e3f2",
                borderRadius: "18px",
                padding: "48px 24px",
                textAlign: "center",
                margin: "24px 0",
              }}
            >
              <h3
                style={{
                  fontSize: "20px",
                  color: "var(--midnight-navy, #051f44)",
                  marginBottom: "8px",
                }}
              >
                {products.length
                  ? "No products match your filters"
                  : "Tell us what you need"}
              </h3>
              <p
                style={{
                  color: "#62758d",
                  fontSize: "14px",
                  maxWidth: "480px",
                  margin: "0 auto 20px",
                }}
              >
                {products.length
                  ? "Try another search or clear your category and brand filters."
                  : "Our catalogue is being updated. Send your product requirements, volume range and quantity for assistance."}
              </p>
              <Link href="/request-quote" className="btn primary">
                Request product information
              </Link>
              {products.length > 0 && (
                <button
                  type="button"
                  className="btn secondary"
                  onClick={handleClearAll}
                  style={{ display: "inline-flex", margin: "0 auto" }}
                >
                  Reset All Filters
                </button>
              )}
            </div>
          ) : (
            <>
              <div className={styles.resultsScroll} ref={resultsScrollRef}>
                <ProductGrid products={paginatedProducts} />
              </div>
              {totalPages > 1 && (
                <ProductPagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              )}
            </>
          )}
        </section>
      </div>
    </>
  );
}

function ProductListingWrapper({
  products,
}: {
  products: readonly ProductListItem[];
}) {
  const searchParams = useSearchParams();
  return (
    <ProductListingContent key={searchParams.toString()} products={products} />
  );
}

export default function ProductListingApp({
  products,
}: {
  products: readonly ProductListItem[];
}) {
  return (
    <Suspense
      fallback={
        <div style={{ padding: "40px", textAlign: "center" }}>
          Loading products...
        </div>
      }
    >
      <ProductListingWrapper products={products} />
    </Suspense>
  );
}
