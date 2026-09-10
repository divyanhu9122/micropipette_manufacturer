"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface HeaderProps {
  onOpenQuote?: () => void;
}

export default function Header({ onOpenQuote }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [headerHidden, setHeaderHidden] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1101px)");
    const closeOnDesktop = () => {
      if (desktop.matches) setMobileMenuOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    desktop.addEventListener("change", closeOnDesktop);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      desktop.removeEventListener("change", closeOnDesktop);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const tolerance = 8;
    const getScrollY = () => Math.max(0, Math.min(
      window.scrollY,
      document.documentElement.scrollHeight - window.innerHeight,
    ));
    let previousY = getScrollY();
    let travel = 0;
    let frame: number | null = null;

    const updateHeader = () => {
      frame = null;
      const currentY = getScrollY();
      const delta = currentY - previousY;
      previousY = currentY;

      // Keep the initial header visible; clamp overscroll at both page edges.
      if (currentY <= (headerRef.current?.offsetHeight ?? 0) || mobileMenuOpen) {
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
  }, [mobileMenuOpen]);

  return (
    <>
      <div className="topbar">
        <div className="wrap">
          <span className="topbar-platform">B2B Scientific & Laboratory Equipment Platform</span>
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
        className={`header${headerHidden && !mobileMenuOpen ? " header--hidden" : ""}`}
      >
        <div className="wrap">
          <Link href="/" className="logo">
            <Image
              className="logo-image"
              src="/images/brand/micropipette-manufacturer-logo.png"
              alt="Micropipette Manufacturer logo"
              width={98}
              height={32}
              priority
            />
          </Link>

          <div className="nav-shell">
            <nav className="nav">
              <Link className="active" href="/">
                Home
              </Link>
              <Link href="/products">Products</Link>
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
            ref={menuButtonRef}
            className="btn ghost menu-toggle"
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
          >
            {mobileMenuOpen ? "Close" : "Menu"}
          </button>

        </div>

        {mobileMenuOpen && (
          <div className="mobile-menu-drawer" id="mobile-navigation">
            <Link href="/" onClick={() => setMobileMenuOpen(false)}>
              Home
            </Link>
            <Link href="/products" onClick={() => setMobileMenuOpen(false)}>
              Products
            </Link>
            <a href="#brands" onClick={() => setMobileMenuOpen(false)}>
              Brands
            </a>
            <a href="#oem" onClick={() => setMobileMenuOpen(false)}>
              OEM
            </a>
            <a href="#applications" onClick={() => setMobileMenuOpen(false)}>
              Applications
            </a>
            <a href="#resources" onClick={() => setMobileMenuOpen(false)}>
              Resources
            </a>
            <button
              className="btn primary"
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuote?.();
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
