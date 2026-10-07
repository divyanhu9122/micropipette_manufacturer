"use client";

import { useEffect, useRef, useState, useTransition, type FormEvent, type KeyboardEvent } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./UniversalSearchBar.module.css";
import { searchItems, type SearchItem } from "./search.data";

interface UniversalSearchBarProps {
  id?: string;
  placeholder?: string;
  onNavigate?: () => void;
  onClose?: () => void;
  autoFocus?: boolean;
  className?: string;
}

const POPULAR_SUGGESTIONS = [
  { label: "Micropipette", href: "/products/micropipettes" },
  { label: "Lab Plasticware", href: "/products?category=Lab+Plasticware" },
  { label: "Science Plus", href: "/products/micropipettes#science-plus" },
  { label: "FAC Plus (Autoclavable)", href: "/products/micropipettes#fac-plus" },
  { label: "LABXE", href: "/brands/labxe" },
  { label: "SSCIENCES", href: "/brands/ssciences" },
  { label: "dr.pipette", href: "/brands/dr-pipette" },
  { label: "sscientific", href: "/brands/sscientific" },
];

export default function UniversalSearchBar({
  id = "universal-search",
  placeholder = "Search products, series, brands...",
  onNavigate,
  onClose,
  autoFocus = false,
  className,
}: UniversalSearchBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialUrlQuery = searchParams?.get("q") || "";

  const [query, setQuery] = useState(initialUrlQuery);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const [, startTransition] = useTransition();

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const [prevUrlQuery, setPrevUrlQuery] = useState(initialUrlQuery);
  if (prevUrlQuery !== initialUrlQuery) {
    setPrevUrlQuery(initialUrlQuery);
    setQuery(initialUrlQuery);
  }

  // Auto focus input when requested
  useEffect(() => {
    if (autoFocus) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 60);
      return () => clearTimeout(timer);
    }
  }, [autoFocus]);

  // Click outside listener
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        setIsOpen(false);
        setActiveIndex(-1);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const results: SearchItem[] = query.trim() ? searchItems(query).slice(0, 7) : [];

  const handleSelectResult = (href: string) => {
    setIsOpen(false);
    onNavigate?.();
    onClose?.();
    router.push(href);
  };

  const handleSubmit = (e?: FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;

    setIsOpen(false);
    onNavigate?.();
    onClose?.();
    startTransition(() => {
      router.push(`/search?q=${encodeURIComponent(trimmed)}`);
    });
  };

  const handleClear = () => {
    setQuery("");
    setActiveIndex(-1);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      setIsOpen(false);
      setActiveIndex(-1);
      onClose?.();
      return;
    }

    if (!isOpen && (e.key === "ArrowDown" || e.key === "ArrowUp")) {
      setIsOpen(true);
      return;
    }

    if (results.length > 0) {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((prev) => (prev + 1 < results.length ? prev + 1 : 0));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((prev) => (prev > 0 ? prev - 1 : results.length - 1));
      } else if (e.key === "Enter" && activeIndex >= 0 && activeIndex < results.length) {
        e.preventDefault();
        const selected = results[activeIndex];
        handleSelectResult(selected.href);
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className={`${styles.searchContainer} ${className || ""}`}
    >
      <form
        role="search"
        className={styles.searchForm}
        onSubmit={handleSubmit}
        aria-label="Universal Site Search"
      >
        <div className={styles.searchFieldWrap}>
          <input
            ref={inputRef}
            id={id}
            type="search"
            className={styles.searchInput}
            placeholder={placeholder}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
              setActiveIndex(-1);
            }}
            onFocus={() => setIsOpen(true)}
            onKeyDown={handleKeyDown}
            role="combobox"
            aria-label="Search laboratory products, micropipette series, categories, and brands"
            aria-autocomplete="list"
            aria-controls={`${id}-results`}
            aria-expanded={isOpen}
            autoComplete="off"
            spellCheck="false"
          />

          {query && (
            <button
              type="button"
              className={styles.clearBtn}
              onClick={handleClear}
              aria-label="Clear search query"
              title="Clear search query"
            >
              ✕
            </button>
          )}

          <button
            type="submit"
            className={styles.submitBtn}
            aria-label="Submit search query"
            title="Search"
          >
            <svg
              className={styles.searchIcon}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>
        </div>
      </form>

      {/* Interactive Dropdown */}
      {isOpen && (
        <div
          id={`${id}-results`}
          className={styles.dropdown}
          role="region"
          aria-label="Search suggestions and matching results"
        >
          {query.trim().length === 0 ? (
            /* Empty Query State: Suggestions */
            <div className={styles.suggestionBlock}>
              <div className={styles.suggestionHeading}>Popular Categories & Searches</div>
              <div className={styles.tagPills}>
                {POPULAR_SUGGESTIONS.map((sug) => (
                  <Link
                    key={sug.label}
                    href={sug.href}
                    className={styles.tagPill}
                    onClick={() => {
                      setIsOpen(false);
                      onNavigate?.();
                      onClose?.();
                    }}
                  >
                    {sug.label}
                  </Link>
                ))}
              </div>
            </div>
          ) : results.length > 0 ? (
            /* Live Results */
            <>
              <div className={styles.dropdownHeader}>
                <span>Matching Results ({results.length})</span>
                <span>Press Enter to view all</span>
              </div>
              <ul ref={listRef} className={styles.resultsList} role="listbox">
                {results.map((item, index) => (
                  <li key={item.id} role="option" aria-selected={activeIndex === index}>
                    <Link
                      href={item.href}
                      className={`${styles.resultItem} ${activeIndex === index ? styles.resultItemActive : ""}`}
                      onClick={() => {
                        setIsOpen(false);
                        onNavigate?.();
                        onClose?.();
                      }}
                      onMouseEnter={() => setActiveIndex(index)}
                    >
                      <div className={styles.resultHead}>
                        <span className={styles.resultTitle}>{item.title}</span>
                        <div>
                          <span className={styles.typeBadge}>{item.type}</span>
                          {item.isComingSoon && (
                            <span className={styles.comingSoonBadge}>Coming Soon</span>
                          )}
                        </div>
                      </div>
                      <p className={styles.resultSnippet}>{item.description}</p>
                    </Link>
                  </li>
                ))}
              </ul>
              <div className={styles.dropdownFooter}>
                <Link
                  href={`/search?q=${encodeURIComponent(query.trim())}`}
                  className={styles.viewAllLink}
                  onClick={() => {
                    setIsOpen(false);
                    onNavigate?.();
                    onClose?.();
                  }}
                >
                  View all results for &ldquo;{query.trim()}&rdquo; →
                </Link>
              </div>
            </>
          ) : (
            /* No Results State */
            <div className={styles.noResults}>
              <div className={styles.noResultsTitle}>No results found</div>
              <p className={styles.noResultsDesc}>
                We couldn&rsquo;t find anything matching &ldquo;{query.trim()}&rdquo;. Try checking the spelling or searching for a broader term like &ldquo;micropipette&rdquo;, &ldquo;LABXE&rdquo;, or &ldquo;plasticware&rdquo;.
              </p>
              <div className={styles.tagPills} style={{ justifyContent: "center" }}>
                {POPULAR_SUGGESTIONS.slice(0, 4).map((sug) => (
                  <Link
                    key={sug.label}
                    href={sug.href}
                    className={styles.tagPill}
                    onClick={() => {
                      setIsOpen(false);
                      onNavigate?.();
                      onClose?.();
                    }}
                  >
                    {sug.label}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
