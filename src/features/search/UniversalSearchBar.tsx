"use client";

import {
  useEffect,
  useRef,
  useState,
  useTransition,
  type FormEvent,
  type KeyboardEvent,
} from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./UniversalSearchBar.module.css";
import { searchItems, type SearchContentType } from "./search.data";

interface UniversalSearchBarProps {
  id?: string;
  placeholder?: string;
  onNavigate?: () => void;
  onClose?: () => void;
  autoFocus?: boolean;
  className?: string;
  panel?: boolean;
}

const RESULT_GROUPS: { type: SearchContentType; label: string }[] = [
  { type: "Product", label: "Products" },
  { type: "Micropipette Series", label: "Micropipette Series" },
  { type: "Category", label: "Categories" },
  { type: "Brand", label: "Brands" },
  { type: "Page", label: "Pages" },
];

const POPULAR_SUGGESTIONS = [
  { label: "Micropipette", href: "/products/micropipettes" },
  { label: "Lab Plasticware", href: "/products?category=Lab+Plasticware" },
  { label: "Science Plus", href: "/products/micropipettes#science-plus" },
  {
    label: "FAC Plus (Autoclavable)",
    href: "/products/micropipettes#fac-plus",
  },
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
  panel = false,
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
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [prevUrlQuery, setPrevUrlQuery] = useState(initialUrlQuery);
  if (prevUrlQuery !== initialUrlQuery) {
    setPrevUrlQuery(initialUrlQuery);
    setQuery(initialUrlQuery);
    setActiveIndex(-1);
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
    document.addEventListener("pointerdown", handleOutsideClick);
    return () =>
      document.removeEventListener("pointerdown", handleOutsideClick);
  }, []);

  const matches = query.trim() ? searchItems(query).slice(0, 7) : [];
  const groups = RESULT_GROUPS.map((group) => ({
    ...group,
    items: matches.filter((item) => item.type === group.type),
  })).filter((group) => group.items.length > 0);
  const results = groups.flatMap((group) => group.items);
  const suggestions = query.trim()
    ? POPULAR_SUGGESTIONS.slice(0, 4)
    : POPULAR_SUGGESTIONS;
  const choices = results.length > 0 ? results : suggestions;
  const activeOptionId =
    isOpen && activeIndex >= 0 && activeIndex < choices.length
      ? `${id}-option-${activeIndex}`
      : undefined;

  useEffect(() => {
    if (!activeOptionId) return;
    const activeOption = document.getElementById(activeOptionId);
    const dropdown = dropdownRef.current;
    if (!activeOption || !dropdown) return;
    const optionBounds = activeOption.getBoundingClientRect();
    const dropdownBounds = dropdown.getBoundingClientRect();
    if (optionBounds.bottom > dropdownBounds.bottom) {
      dropdown.scrollTop += optionBounds.bottom - dropdownBounds.bottom;
    } else if (optionBounds.top < dropdownBounds.top) {
      dropdown.scrollTop -= dropdownBounds.top - optionBounds.top;
    }
  }, [activeOptionId]);

  const handleNavigate = () => {
    setIsOpen(false);
    setActiveIndex(-1);
    onNavigate?.();
    onClose?.();
  };

  const handleSelectResult = (href: string) => {
    handleNavigate();
    router.push(href);
  };

  const handleSubmit = (e?: FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;

    handleNavigate();
    startTransition(() => {
      router.push(`/search?q=${encodeURIComponent(trimmed)}`);
    });
  };

  const handleClear = () => {
    setQuery("");
    setIsOpen(true);
    setActiveIndex(-1);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      e.preventDefault();
      if (onClose) e.stopPropagation();
      setIsOpen(false);
      setActiveIndex(-1);
      onClose?.();
      return;
    }

    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      setIsOpen(true);
      setActiveIndex((prev) => {
        if (e.key === "ArrowDown")
          return isOpen && prev + 1 < choices.length ? prev + 1 : 0;
        return isOpen && prev > 0 ? prev - 1 : choices.length - 1;
      });
      return;
    }

    if (
      e.key === "Enter" &&
      isOpen &&
      activeIndex >= 0 &&
      activeIndex < choices.length
    ) {
      e.preventDefault();
      handleSelectResult(choices[activeIndex].href);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`${styles.searchContainer} ${panel ? styles.panel : ""} ${className || ""}`}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setIsOpen(false);
          setActiveIndex(-1);
        }
      }}
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
            aria-label="Search products, micropipette series, categories, brands, and pages"
            aria-autocomplete="list"
            aria-controls={isOpen ? `${id}-results` : undefined}
            aria-activedescendant={activeOptionId}
            aria-expanded={isOpen}
            aria-haspopup="listbox"
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
          ref={dropdownRef}
          className={styles.dropdown}
          role="region"
          aria-label="Search suggestions and matching results"
        >
          {query.trim().length === 0 ? (
            /* Empty Query State: Suggestions */
            <div className={styles.suggestionBlock}>
              <div className={styles.suggestionHeading}>
                Popular Categories & Searches
              </div>
              <div
                id={`${id}-results`}
                className={styles.tagPills}
                role="listbox"
                aria-label="Popular searches"
              >
                {suggestions.map((sug, index) => (
                  <Link
                    key={sug.label}
                    href={sug.href}
                    id={`${id}-option-${index}`}
                    role="option"
                    aria-selected={activeIndex === index}
                    tabIndex={-1}
                    className={`${styles.tagPill} ${activeIndex === index ? styles.tagPillActive : ""}`}
                    onClick={handleNavigate}
                    onMouseEnter={() => setActiveIndex(index)}
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
                <span role="status">Matching Results ({results.length})</span>
                <span>Use ↑ ↓ to select</span>
              </div>
              <div
                id={`${id}-results`}
                className={styles.resultsList}
                role="listbox"
                aria-label="Matching search results"
              >
                {groups.map((group) => (
                  <div
                    key={group.type}
                    role="group"
                    aria-labelledby={`${id}-group-${group.type.replaceAll(" ", "-")}`}
                  >
                    <div
                      id={`${id}-group-${group.type.replaceAll(" ", "-")}`}
                      className={styles.groupHeading}
                    >
                      {group.label}
                    </div>
                    {group.items.map((item) => {
                      const index = results.indexOf(item);
                      return (
                        <Link
                          key={item.id}
                          href={item.href}
                          id={`${id}-option-${index}`}
                          role="option"
                          aria-selected={activeIndex === index}
                          tabIndex={-1}
                          className={`${styles.resultItem} ${activeIndex === index ? styles.resultItemActive : ""}`}
                          onClick={handleNavigate}
                          onMouseEnter={() => setActiveIndex(index)}
                        >
                          <div className={styles.resultHead}>
                            <span className={styles.resultTitle}>
                              {item.title}
                            </span>
                            <div>
                              <span className={styles.typeBadge}>
                                {item.type}
                              </span>
                              {item.isComingSoon && (
                                <span className={styles.comingSoonBadge}>
                                  Coming Soon
                                </span>
                              )}
                            </div>
                          </div>
                          <p className={styles.resultSnippet}>
                            {item.description}
                          </p>
                        </Link>
                      );
                    })}
                  </div>
                ))}
              </div>
              <div className={styles.dropdownFooter}>
                <Link
                  href={`/search?q=${encodeURIComponent(query.trim())}`}
                  className={styles.viewAllLink}
                  onClick={handleNavigate}
                >
                  View all results for &ldquo;{query.trim()}&rdquo; →
                </Link>
              </div>
            </>
          ) : (
            /* No Results State */
            <div className={styles.noResults}>
              <div className={styles.noResultsTitle} role="status">
                No results found
              </div>
              <p className={styles.noResultsDesc}>
                We couldn&rsquo;t find anything matching &ldquo;{query.trim()}
                &rdquo;. Try checking the spelling or searching for a broader
                term like &ldquo;micropipette&rdquo;, &ldquo;LABXE&rdquo;, or
                &ldquo;plasticware&rdquo;.
              </p>
              <div
                id={`${id}-results`}
                className={styles.tagPills}
                style={{ justifyContent: "center" }}
                role="listbox"
                aria-label="Suggested searches"
              >
                {suggestions.map((sug, index) => (
                  <Link
                    key={sug.label}
                    href={sug.href}
                    id={`${id}-option-${index}`}
                    role="option"
                    aria-selected={activeIndex === index}
                    tabIndex={-1}
                    className={`${styles.tagPill} ${activeIndex === index ? styles.tagPillActive : ""}`}
                    onClick={handleNavigate}
                    onMouseEnter={() => setActiveIndex(index)}
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
