"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import InnerPageHero from "@/components/layout/InnerPageHero";
import InnerPageHeroVisual from "@/components/layout/InnerPageHeroVisual";
import styles from "./Resources.module.css";
import { RESOURCE_CATEGORIES, ResourceItem } from "./resources.data";
import CatalogueModal from "@/components/ui/CatalogueModal";

export default function ResourcesApp({
  resources = [],
}: {
  resources?: ResourceItem[];
}) {
  const RESOURCE_BRANDS = [
    { id: "all", label: "All Brands" },
    ...Array.from(
      new Set(
        resources.map((item) => item.brand).filter((brand) => brand !== "all"),
      ),
    ).map((brand) => ({ id: brand, label: brand.toUpperCase() })),
  ];
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedBrand, setSelectedBrand] = useState<string>("all");
  const [activeModalResource, setActiveModalResource] =
    useState<ResourceItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenCatalogueModal = (resource?: ResourceItem) => {
    setActiveModalResource(resource || null);
    setIsModalOpen(true);
  };

  const filteredResources = useMemo(() => {
    return resources.filter((item) => {
      const matchesCategory =
        selectedCategory === "all" || item.category === selectedCategory;
      const matchesBrand =
        selectedBrand === "all" ||
        item.brand === selectedBrand ||
        item.brand === "all";
      const matchesSearch =
        searchQuery === "" ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesBrand && matchesSearch;
    });
  }, [resources, searchQuery, selectedCategory, selectedBrand]);

  return (
    <div className={styles.resourcesPage}>
      {/* Compact Breadcrumb Hero */}
      <InnerPageHero
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Resources & Technical Documentation" },
        ]}
        title="Technical Documentation & Download Center"
        eyebrow="Resources"
        description="Browse product catalogues, datasheets and operating manuals, with technical documents organized by product and brand."
        visual={<InnerPageHeroVisual kind="resources" />}
      />

      {/* Main Content Section */}
      <section className={styles.resourcesSection}>
        <div className="wrap">
          <div className={styles.resourcesIntro}>
            <span className={styles.typeTag}>Central download repository</span>
            <h2>
              Product Catalogues, Datasheets, Protocols & Quality Certificates
            </h2>
            <p>
              Browse available product catalogues, datasheets and operating
              manuals. If the document you need is not listed, contact our team
              with the product model and your requirement.
            </p>
          </div>

          {/* Featured Pack Banner */}
          <div className={styles.featuredBanner}>
            <div className={styles.featuredContent}>
              <h3>Request the product catalogue</h3>
              <p>
                Tell us the products and brands you need. Our team will confirm
                the documents available for your requirement.
              </p>
            </div>
            <button
              type="button"
              className="btn primary"
              onClick={() => handleOpenCatalogueModal()}
            >
              Request a Catalogue →
            </button>
          </div>

          {/* Search & Filter Toolbar */}
          <div className={styles.toolbar}>
            <div className={styles.searchBox}>
              <svg
                className={styles.searchIcon}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
              <input
                type="text"
                className={styles.searchInput}
                placeholder="Search resources by title, keyword, or document name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search resources"
              />
            </div>

            <div className={styles.filterRows}>
              <div className={styles.filterGroup}>
                <span className={styles.filterLabel}>Category:</span>
                <div className={styles.pillList}>
                  {RESOURCE_CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      className={`${styles.pillBtn} ${
                        selectedCategory === cat.id ? styles.active : ""
                      }`}
                      onClick={() => setSelectedCategory(cat.id)}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className={styles.filterGroup}>
                <span className={styles.filterLabel}>Brand:</span>
                <div className={styles.pillList}>
                  {RESOURCE_BRANDS.map((br) => (
                    <button
                      key={br.id}
                      type="button"
                      className={`${styles.pillBtn} ${
                        selectedBrand === br.id ? styles.active : ""
                      }`}
                      onClick={() => setSelectedBrand(br.id)}
                    >
                      {br.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Grid Count */}
          <div className={styles.gridHeader}>
            <span className={styles.gridCount}>
              Showing {filteredResources.length} of {resources.length} documents
            </span>
          </div>

          {/* Cards Grid */}
          {filteredResources.length > 0 ? (
            <div className={styles.resourceGrid}>
              {filteredResources.map((item) => (
                <article key={item.id} className={styles.card}>
                  <div className={styles.cardTop}>
                    <div className={styles.badges}>
                      <span className={styles.formatBadge}>
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                          <polyline points="14 2 14 8 20 8" />
                        </svg>
                        {item.format}
                      </span>
                      <span className={styles.brandBadge}>
                        {item.brand === "all"
                          ? "All Brands"
                          : item.brand.toUpperCase()}
                      </span>
                    </div>
                    <h3 className={styles.cardTitle}>{item.title}</h3>
                    <p className={styles.cardDesc}>{item.description}</p>
                  </div>

                  <div className={styles.cardBottom}>
                    <div className={styles.fileMeta}>
                      <span>{item.fileSize}</span>
                    </div>
                    <button
                      type="button"
                      className={styles.downloadBtn}
                      onClick={() => handleOpenCatalogueModal(item)}
                      aria-label={`Download ${item.title}`}
                    >
                      <svg
                        className={styles.downloadBtnSvg}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" y1="15" x2="12" y2="3" />
                      </svg>
                      {item.url ? "Download" : "Request document"}
                    </button>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <h3>
                {resources.length
                  ? "No matching documents found"
                  : "Request product documentation"}
              </h3>
              <p>
                {resources.length
                  ? "Try another keyword or clear the filters."
                  : "Our download library is being updated. Tell us the product model and the document you need."}
              </p>
              <Link href="/contact" className="btn primary">
                Request a document
              </Link>
              {resources.length > 0 && (
                <button
                  type="button"
                  className="btn secondary"
                  style={{ marginTop: 16 }}
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("all");
                    setSelectedBrand("all");
                  }}
                >
                  Reset Filters
                </button>
              )}
            </div>
          )}

          {/* Custom Documentation CTA */}
          <div className={styles.customCta}>
            <div className={styles.customCtaContent}>
              <h3>Need a Specific Technical Document?</h3>
              <p>
                Send the product model and the manual, calibration report or
                certificate you need. Our team will review availability and
                respond to your request.
              </p>
            </div>
            <Link href="/contact" className="btn secondary">
              Request Documentation →
            </Link>
          </div>
        </div>
      </section>

      {/* Catalogue Download Modal */}
      <CatalogueModal
        downloadUrl={activeModalResource?.url}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        catalogueTitle={
          activeModalResource ? activeModalResource.title : "Product catalogue"
        }
        categoryOrBrand={
          activeModalResource
            ? activeModalResource.brand.toUpperCase()
            : "LABXE • SSCIENCES • DANWER"
        }
        fileSize={activeModalResource ? activeModalResource.fileSize : "PDF"}
      />
    </div>
  );
}
