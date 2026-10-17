"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import styles from "../Admin.module.css";

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
  const pathname = usePathname();

  const isNavActive = (href: string) => {
    if (href === "/admin") {
      return pathname === "/admin";
    }
    return pathname?.startsWith(href);
  };

  return (
    <>
      {/* Mobile Backdrop */}
      <div
        className={`${styles.modalOverlay} ${isOpen ? styles.modalOverlayOpen : ""}`}
        onClick={onClose}
        aria-hidden="true"
      />

      <aside
        className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ""}`}
        aria-label="Admin navigation"
      >
        <div className={styles.brand}>
          <div className={styles.brandLogo}>
            <Image
              src="/images/brand/micropipette-manufacturer-logo.png"
              alt="Logo"
              width={40}
              height={36}
              style={{ objectFit: "contain", width: "auto", height: "auto" }}
            />
          </div>
          <div className={styles.brandCopy}>
            <strong>Micropipette</strong>
            <span>Admin / CMS</span>
          </div>
        </div>

        <div className={styles.sideScroll}>
          <div className={styles.navLabel}>Core Operations</div>
          <nav className={styles.nav}>
            <Link
              href="/admin"
              className={`${styles.navBtn} ${
                isNavActive("/admin") ? styles.navBtnActive : ""
              }`}
              onClick={onClose}
              id="admin-nav-dashboard"
            >
              <span className={styles.navIcon}>
                <svg viewBox="0 0 24 24">
                  <rect x="3" y="3" width="7" height="7" rx="1" />
                  <rect x="14" y="3" width="7" height="7" rx="1" />
                  <rect x="14" y="14" width="7" height="7" rx="1" />
                  <rect x="3" y="14" width="7" height="7" rx="1" />
                </svg>
              </span>
              <span className={styles.navText}>Dashboard</span>
            </Link>

            <Link
              href="/admin/enquiries"
              className={`${styles.navBtn} ${
                isNavActive("/admin/enquiries") ? styles.navBtnActive : ""
              }`}
              onClick={onClose}
              id="admin-nav-enquiries"
            >
              <span className={styles.navIcon}>
                <svg viewBox="0 0 24 24">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </span>
              <span className={styles.navText}>Enquiries & Quotes</span>
            </Link>
          </nav>

          <div className={styles.navLabel}>Catalog & Content</div>
          <nav className={styles.nav}>
            <Link
              href="/admin/products"
              className={`${styles.navBtn} ${
                isNavActive("/admin/products") ? styles.navBtnActive : ""
              }`}
              onClick={onClose}
              id="admin-nav-products"
            >
              <span className={styles.navIcon}>
                <svg viewBox="0 0 24 24">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                  <line x1="12" y1="22.08" x2="12" y2="12" />
                </svg>
              </span>
              <span className={styles.navText}>Products</span>
            </Link>

            <Link
              href="/admin/categories"
              className={`${styles.navBtn} ${
                isNavActive("/admin/categories") ? styles.navBtnActive : ""
              }`}
              onClick={onClose}
              id="admin-nav-categories"
            >
              <span className={styles.navIcon}>
                <svg viewBox="0 0 24 24">
                  <line x1="8" y1="6" x2="21" y2="6" />
                  <line x1="8" y1="12" x2="21" y2="12" />
                  <line x1="8" y1="18" x2="21" y2="18" />
                  <line x1="3" y1="6" x2="3.01" y2="6" />
                  <line x1="3" y1="12" x2="3.01" y2="12" />
                  <line x1="3" y1="18" x2="3.01" y2="18" />
                </svg>
              </span>
              <span className={styles.navText}>Categories</span>
            </Link>

            <Link
              href="/admin/brands"
              className={`${styles.navBtn} ${
                isNavActive("/admin/brands") ? styles.navBtnActive : ""
              }`}
              onClick={onClose}
              id="admin-nav-brands"
            >
              <span className={styles.navIcon}>
                <svg viewBox="0 0 24 24">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              </span>
              <span className={styles.navText}>Brands</span>
            </Link>

            <Link
              href="/admin/blog"
              className={`${styles.navBtn} ${
                isNavActive("/admin/blog") ? styles.navBtnActive : ""
              }`}
              onClick={onClose}
              id="admin-nav-blog"
            >
              <span className={styles.navIcon}>
                <svg viewBox="0 0 24 24">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
              </span>
              <span className={styles.navText}>Blog</span>
            </Link>

            <Link
              href="/admin/resources"
              className={`${styles.navBtn} ${
                isNavActive("/admin/resources") ? styles.navBtnActive : ""
              }`}
              onClick={onClose}
              id="admin-nav-resources"
            >
              <span className={styles.navIcon}>
                <svg viewBox="0 0 24 24">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
              </span>
              <span className={styles.navText}>Resources / Docs</span>
            </Link>
          </nav>

          <div className={styles.navLabel}>System & Settings</div>
          <nav className={styles.nav}>
            <Link
              href="/admin/settings"
              className={`${styles.navBtn} ${
                isNavActive("/admin/settings") ? styles.navBtnActive : ""
              }`}
              onClick={onClose}
              id="admin-nav-settings"
            >
              <span className={styles.navIcon}>
                <svg viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="3" />
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                </svg>
              </span>
              <span className={styles.navText}>SEO & Settings</span>
            </Link>

            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.navBtn}
              id="admin-nav-public-site"
            >
              <span className={styles.navIcon}>
                <svg viewBox="0 0 24 24">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </span>
              <span className={styles.navText}>View Public Site ↗</span>
            </Link>
          </nav>
        </div>

        <div className={styles.sideFoot}>
          <strong>Phase 4 Prototype</strong>
          <span>Ready for Strapi CMS API</span>
        </div>
      </aside>
    </>
  );
}
