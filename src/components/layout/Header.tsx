"use client";

import { useState } from "react";
import Link from "next/link";

interface HeaderProps {
  onOpenQuote?: () => void;
}

export default function Header({ onOpenQuote }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <div className="topbar">
        <div className="wrap">
          <span>Direct OEM & Factory Sales Support</span>
          <a href="mailto:sales@micropipettemanufacturer.com">sales@micropipettemanufacturer.com</a>
          <a href="tel:+18005550199">+1 (800) 555-0199</a>
          <span style={{ color: "#79a4d8" }}>ISO 9001:2015 & ISO 13485:2016 Certified</span>
        </div>
      </div>

      <header className="header">
        <div className="wrap">
          <Link href="/" className="logo">
            <div className="logo-mark" aria-hidden="true" />
            <div className="logo-text">
              MicropipetteManufacturer<span style={{ color: "#dcecff" }}>.com</span>
              <small>Precision. Performance. Partnership.</small>
            </div>
          </Link>

          <div className="nav-shell">
            <nav className="nav">
              <Link className="active" href="/">
                Home
              </Link>
              <a href="#categories">Products</a>
              <a href="#brands">Brands</a>
              <a href="#oem">OEM</a>
              <a href="#applications">Applications</a>
              <a href="#resources">Resources</a>
            </nav>
            <button
              className="btn primary"
              type="button"
              onClick={onOpenQuote}
            >
              Get Quote →
            </button>
          </div>

          <button
            className="btn ghost menu-toggle"
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? "✕ Close" : "☰ Menu"}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="mobile-menu-drawer">
            <Link href="/" onClick={() => setMobileMenuOpen(false)}>
              Home
            </Link>
            <a href="#categories" onClick={() => setMobileMenuOpen(false)}>
              Products
            </a>
            <a href="#brands" onClick={() => setMobileMenuOpen(false)}>
              Brands
            </a>
            <a href="#oem" onClick={() => setMobileMenuOpen(false)}>
              OEM / Private Label
            </a>
            <a href="#applications" onClick={() => setMobileMenuOpen(false)}>
              Applications
            </a>
            <a href="#resources" onClick={() => setMobileMenuOpen(false)}>
              Resources & Catalogs
            </a>
            <button
              className="btn primary"
              style={{ marginTop: 8 }}
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenQuote) onOpenQuote();
              }}
            >
              Get Quote →
            </button>
          </div>
        )}
      </header>
      <div className="header-spacer" aria-hidden="true" />
    </>
  );
}
