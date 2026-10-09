"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import UniversalSearchBar from "@/features/search/UniversalSearchBar";

interface HeaderProps {
  onOpenQuote?: () => void;
}

export default function Header({ onOpenQuote }: HeaderProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [headerHidden, setHeaderHidden] = useState(false);

  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const searchTriggerRef = useRef<HTMLButtonElement>(null);
  const mobileSearchTriggerRef = useRef<HTMLButtonElement>(null);
  const navShellRef = useRef<HTMLDivElement>(null);

  // Close menus on route navigation
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setSearchOpen(false);
    setMobileMenuOpen(false);
  }

  // Click outside to close search panel
  useEffect(() => {
    if (!searchOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [searchOpen]);

  // Escape key listener for search and mobile drawer
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (searchOpen) {
          setSearchOpen(false);
          if (typeof window !== "undefined" && window.innerWidth > 1100) {
            searchTriggerRef.current?.focus();
          } else {
            mobileSearchTriggerRef.current?.focus();
          }
        } else if (mobileMenuOpen) {
          setMobileMenuOpen(false);
          menuButtonRef.current?.focus();
        }
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [searchOpen, mobileMenuOpen]);

  // Responsive listener for closing mobile menu on desktop resize
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1101px)");
    const closeOnDesktop = () => {
      if (desktop.matches) {
        setMobileMenuOpen(false);
      }
    };
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);

  // Header scroll hide/show listener
  useEffect(() => {
    const tolerance = 8;
    const getScrollY = () =>
      Math.max(
        0,
        Math.min(
          window.scrollY,
          document.documentElement.scrollHeight - window.innerHeight,
        ),
      );
    let previousY = getScrollY();
    let travel = 0;
    let frame: number | null = null;

    const updateHeader = () => {
      frame = null;
      const currentY = getScrollY();
      const delta = currentY - previousY;
      previousY = currentY;

      // Keep the initial header visible; clamp overscroll at both page edges.
      if (
        currentY <= (headerRef.current?.offsetHeight ?? 0) ||
        mobileMenuOpen ||
        searchOpen
      ) {
        travel = 0;
        setHeaderHidden(false);
        return;
      }
      if (delta === 0) return;
      travel = Math.sign(delta) === Math.sign(travel) ? travel + delta : delta;
      if (Math.abs(travel) >= tolerance) {
        setHeaderHidden(travel > 0);
        travel = 0;
      }
    };

    const onScroll = () => {
      if (frame === null) frame = window.requestAnimationFrame(updateHeader);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame !== null) window.cancelAnimationFrame(frame);
    };
  }, [mobileMenuOpen, searchOpen]);

  const quoteButton = onOpenQuote ? (
    <button className="btn primary" type="button" onClick={onOpenQuote}>
      Get Quote →
    </button>
  ) : (
    <Link className="btn primary" href="/request-quote">
      Get Quote →
    </Link>
  );

  return (
    <>
      <div className="topbar">
        <div className="wrap">
          <span className="topbar-platform">
            B2B Scientific & Laboratory Equipment Platform
          </span>
          <div className="topbar-actions">
            <a href="mailto:sales@micropipettemanufacturer.com">
              <span aria-hidden="true">✉</span> sales@micropipettemanufacturer.com
            </a>
            <a href="tel:+18005550199">
              <span aria-hidden="true">☎</span> +1 (800) 555-0199
            </a>
            <button className="topbar-quote" type="button" onClick={onOpenQuote}>
              Request a Quote
            </button>
          </div>
        </div>
      </div>

      <header
        ref={headerRef}
        className={`header${headerHidden && !mobileMenuOpen && !searchOpen ? " header--hidden" : ""}`}
      >
        <div className="wrap">
          <Link href="/" className="logo">
            <Image
              className="logo-image"
              src="/images/brand/micropipette-manufacturer-logo.png"
              alt="Micropipette Manufacturer logo"
              width={866}
              height={288}
              priority
            />
          </Link>

          {/* Desktop Navigation Shell (never shrinks; keeps all links visible) */}
          <div className="nav-shell" ref={navShellRef}>
            <div className="nav-links-wrap">
              <nav className="nav">
                <Link className={pathname === "/" ? "active" : ""} href="/">
                  Home
                </Link>
                <Link
                  className={pathname?.startsWith("/products") ? "active" : ""}
                  href="/products"
                >
                  Products
                </Link>
                <Link
                  className={pathname?.startsWith("/brands") ? "active" : ""}
                  href="/brands"
                >
                  Brands
                </Link>
                <Link
                  className={pathname?.startsWith("/oem") ? "active" : ""}
                  href="/oem"
                >
                  OEM
                </Link>
                <Link
                  className={
                    pathname?.startsWith("/applications") ? "active" : ""
                  }
                  href="/applications"
                >
                  Applications
                </Link>
                <Link
                  className={pathname?.startsWith("/resources") ? "active" : ""}
                  href="/resources"
                >
                  Resources
                </Link>

                {/* Small Search Icon Button in the Nav Bar */}
                <button
                  ref={searchTriggerRef}
                  type="button"
                  className={`nav-search-trigger${searchOpen ? " active" : ""}`}
                  onClick={() => setSearchOpen((prev) => !prev)}
                  aria-label={searchOpen ? "Close search bar" : "Open search bar"}
                  aria-expanded={searchOpen}
                  aria-controls="header-search-panel"
                  title={searchOpen ? "Close search" : "Search products, series, brands..."}
                >
                  <svg
                    className="nav-search-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                </button>
              </nav>

              {quoteButton}
            </div>
          </div>

          {/* Mobile Header Actions (Search Icon + Menu Button) */}
          <div className="mobile-header-actions">
            <button
              ref={mobileSearchTriggerRef}
              className={`mobile-search-toggle${searchOpen ? " active" : ""}`}
              type="button"
              onClick={() => {
                setSearchOpen((prev) => !prev);
                if (!searchOpen) setMobileMenuOpen(false);
              }}
              aria-label={searchOpen ? "Close search bar" : "Toggle search bar"}
              aria-expanded={searchOpen}
              aria-controls="header-search-panel"
              title="Search website"
            >
              <svg
                className="nav-search-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.3"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>

            <button
              ref={menuButtonRef}
              className="btn ghost menu-toggle"
              type="button"
              onClick={() => {
                setMobileMenuOpen(!mobileMenuOpen);
                if (!mobileMenuOpen) setSearchOpen(false);
              }}
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              {mobileMenuOpen ? "Close" : "Menu"}
            </button>
          </div>
        </div>

        {/* Search Panel (opens directly below header for both desktop and mobile) */}
        {searchOpen && (
          <div
            className="header-search-panel"
            id="header-search-panel"
            role="region"
            aria-label="Site Search"
          >
            <div className="header-search-inner-wrap">
              <Suspense fallback={<div style={{ height: 38, flex: 1 }} />}>
                <UniversalSearchBar
                  id="header-universal-search"
                  autoFocus
                  className="nav-search-inner"
                  placeholder="Search products, series, brands, categories..."
                  onNavigate={() => setSearchOpen(false)}
                  onClose={() => {
                    setSearchOpen(false);
                    if (typeof window !== "undefined" && window.innerWidth > 1100) {
                      searchTriggerRef.current?.focus();
                    } else {
                      mobileSearchTriggerRef.current?.focus();
                    }
                  }}
                />
              </Suspense>
              <button
                type="button"
                className="nav-search-close"
                onClick={() => {
                  setSearchOpen(false);
                  if (typeof window !== "undefined" && window.innerWidth > 1100) {
                    searchTriggerRef.current?.focus();
                  } else {
                    mobileSearchTriggerRef.current?.focus();
                  }
                }}
                aria-label="Close search"
                title="Close search (Esc)"
              >
                ✕
              </button>
            </div>
          </div>
        )}

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="mobile-menu-drawer" id="mobile-navigation">
            <div style={{ paddingBottom: 6 }}>
              <Suspense fallback={<div style={{ height: 36 }} />}>
                <UniversalSearchBar
                  id="header-mobile-drawer-search"
                  className="nav-search-inner"
                  placeholder="Search products, brands, series..."
                  onNavigate={() => setMobileMenuOpen(false)}
                />
              </Suspense>
            </div>
            <Link href="/" onClick={() => setMobileMenuOpen(false)}>
              Home
            </Link>
            <Link href="/products" onClick={() => setMobileMenuOpen(false)}>
              Products
            </Link>
            <Link href="/brands" onClick={() => setMobileMenuOpen(false)}>
              Brands
            </Link>
            <Link href="/oem" onClick={() => setMobileMenuOpen(false)}>
              OEM
            </Link>
            <Link href="/applications" onClick={() => setMobileMenuOpen(false)}>
              Applications
            </Link>
            <Link href="/resources" onClick={() => setMobileMenuOpen(false)}>
              Resources
            </Link>
            {onOpenQuote ? (
              <button
                className="btn primary"
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenQuote();
                }}
              >
                Get Quote →
              </button>
            ) : (
              <Link
                className="btn primary"
                href="/request-quote"
                onClick={() => setMobileMenuOpen(false)}
              >
                Get Quote →
              </Link>
            )}
          </div>
        )}
      </header>
      <div className="header-spacer" aria-hidden="true" />
    </>
  );
}
