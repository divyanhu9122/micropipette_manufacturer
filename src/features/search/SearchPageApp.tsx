"use client";

import { Suspense, useMemo, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./SearchPage.module.css";
import { searchItems, type SearchItem, type SearchContentType } from "./search.data";

const TABS: Array<{ label: string; value: "All" | SearchContentType }> = [
  { label: "All", value: "All" },
  { label: "Products", value: "Product" },
  { label: "Micropipette Series", value: "Micropipette Series" },
  { label: "Categories", value: "Category" },
  { label: "Brands", value: "Brand" },
  { label: "Information Pages", value: "Page" },
];

const SUGGESTIONS = [
  { label: "Micropipettes", href: "/products/micropipettes" },
  { label: "Lab Plasticware", href: "/products?category=Lab+Plasticware" },
  { label: "Science Plus", href: "/products/micropipettes#science-plus" },
  { label: "FAC Plus", href: "/products/micropipettes#fac-plus" },
  { label: "LABXE", href: "/brands/labxe" },
  { label: "SSCIENCES", href: "/brands/ssciences" },
  { label: "dr.pipette", href: "/brands/dr-pipette" },
  { label: "sscientific", href: "/brands/sscientific" },
];

function SearchPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";

  const [inputVal, setInputVal] = useState(initialQuery);
  const [activeTab, setActiveTab] = useState<"All" | SearchContentType>("All");

  const allMatching = useMemo(() => {
    return initialQuery.trim() ? searchItems(initialQuery) : [];
  }, [initialQuery]);

  const filteredResults = useMemo(() => {
    if (activeTab === "All") return allMatching;
    return allMatching.filter((item) => item.type === activeTab);
  }, [allMatching, activeTab]);

  const handleSearchSubmit = (e: FormEvent) => {
    e.preventDefault();
    const q = inputVal.trim();
    if (q) {
      router.push(`/search?q=${encodeURIComponent(q)}`);
    } else {
      router.push("/search");
    }
  };

  const handleClear = () => {
    setInputVal("");
    router.push("/search");
  };

  return (
    <div className={styles.page}>
      {/* Hero Header */}
      <section className={styles.hero}>
        <div className={styles.wrap}>
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className={styles.breadcrumbSep}>›</span>
            <span>Search</span>
          </nav>
          <h1 className={styles.heroTitle}>
            {initialQuery.trim()
              ? `Search Results for "${initialQuery.trim()}"`
              : "Search the Scientific Product Catalog"}
          </h1>
          <p className={styles.heroSubtitle}>
            {initialQuery.trim()
              ? `Found ${allMatching.length} matching ${allMatching.length === 1 ? "entry" : "entries"} across products, series, categories, and brands.`
              : "Search public products, series, categories, brands, specifications, and technical pages."}
          </p>
        </div>
      </section>

      {/* Main Search Results Section */}
      <section className={styles.section}>
        <div className={styles.wrap}>
          {/* Query Bar */}
          <div className={styles.searchToolbar}>
            <form onSubmit={handleSearchSubmit} className={styles.searchBarLarge} role="search">
              <input
                type="search"
                className={styles.largeInput}
                placeholder="Search products, micropipette series, categories, brands..."
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                aria-label="Search catalog"
              />
              {inputVal && (
                <button
                  type="button"
                  onClick={handleClear}
                  className={styles.largeClearBtn}
                  aria-label="Clear query"
                  title="Clear query"
                >
                  ✕
                </button>
              )}
              <button type="submit" className={styles.largeSubmitBtn}>
                <span>Search</span>
                <span aria-hidden="true">→</span>
              </button>
            </form>
          </div>

          {/* Results Filter Tabs */}
          {allMatching.length > 0 && (
            <div className={styles.tabs} role="tablist" aria-label="Filter results by content type">
              {TABS.map((tab) => {
                const count =
                  tab.value === "All"
                    ? allMatching.length
                    : allMatching.filter((item) => item.type === tab.value).length;
                if (count === 0 && tab.value !== "All") return null;

                const isActive = activeTab === tab.value;
                return (
                  <button
                    key={tab.value}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    className={`${styles.tab} ${isActive ? styles.tabActive : ""}`}
                    onClick={() => setActiveTab(tab.value)}
                  >
                    {tab.label} ({count})
                  </button>
                );
              })}
            </div>
          )}

          {/* Body Content */}
          {initialQuery.trim() === "" ? (
            /* Empty Query State */
            <div className={styles.emptyBox}>
              <h2 className={styles.emptyTitle}>Enter a Search Query</h2>
              <p className={styles.emptyText}>
                Type a product model, series name (e.g. Science Plus, FAC Plus), brand (LABXE, SSCIENCES, dr.pipette, sscientific), or category (Lab Plasticware, Balances) to find instant matches.
              </p>
              <div className={styles.suggestionPills}>
                {SUGGESTIONS.map((sug) => (
                  <Link key={sug.label} href={sug.href} className={styles.suggestionPill}>
                    {sug.label}
                  </Link>
                ))}
              </div>
            </div>
          ) : filteredResults.length === 0 ? (
            /* No Results State */
            <div className={styles.emptyBox}>
              <h2 className={styles.emptyTitle}>No Results Found</h2>
              <p className={styles.emptyText}>
                We couldn&rsquo;t find any matches for &ldquo;{initialQuery.trim()}&rdquo;
                {activeTab !== "All" ? ` under the ${activeTab} filter` : ""}. Try adjusting your keywords, clearing filters, or exploring popular categories below.
              </p>
              <div className={styles.suggestionPills}>
                {SUGGESTIONS.map((sug) => (
                  <Link key={sug.label} href={sug.href} className={styles.suggestionPill}>
                    {sug.label}
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            /* Active Results Grid */
            <div className={styles.resultsGrid}>
              {filteredResults.map((item: SearchItem) => (
                <Link key={item.id} href={item.href} className={styles.card}>
                  <div className={styles.cardTop}>
                    <span className={styles.cardTypeBadge}>{item.type}</span>
                    {item.isComingSoon && (
                      <span className={styles.comingSoonBadge}>Coming Soon</span>
                    )}
                  </div>
                  <h3 className={styles.cardTitle}>{item.title}</h3>
                  <p className={styles.cardDesc}>{item.description}</p>
                  <div className={styles.cardLinkRow}>
                    <span>View Destination</span>
                    <span style={{ marginLeft: 6 }}>→</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function SearchPageWrapper() {
  const searchParams = useSearchParams();
  return <SearchPageContent key={searchParams.toString()} />;
}

export default function SearchPageApp() {
  return (
    <Suspense fallback={<div style={{ padding: "60px 20px", textAlign: "center" }}>Loading search...</div>}>
      <SearchPageWrapper />
    </Suspense>
  );
}
