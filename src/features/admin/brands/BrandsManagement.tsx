"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "../Admin.module.css";
import { AdminBrandItem, INITIAL_ADMIN_BRANDS } from "../admin.data";

export default function BrandsManagement() {
  const [brands, setBrands] = useState<AdminBrandItem[]>(INITIAL_ADMIN_BRANDS);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingBrand, setEditingBrand] = useState<AdminBrandItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [formData, setFormData] = useState<Partial<AdminBrandItem>>({
    name: "LABXE",
    tagline: "",
    slug: "",
    summary: "",
    status: "Published",
    displayOrder: 1,
    logo: "/images/brand/micropipette-manufacturer-logo.png",
    seoTitle: "",
    metaDesc: "",
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleOpenAdd = () => {
    setEditingBrand(null);
    setFormData({
      name: "LABXE",
      tagline: "",
      slug: "",
      summary: "",
      status: "Published",
      displayOrder: brands.length + 1,
      logo: "/images/brand/micropipette-manufacturer-logo.png",
      seoTitle: "",
      metaDesc: "",
    });
    setIsEditorOpen(true);
  };

  const handleOpenEdit = (brand: AdminBrandItem) => {
    setEditingBrand(brand);
    setFormData({ ...brand });
    setIsEditorOpen(true);
  };

  const handleCloseEditor = () => {
    setIsEditorOpen(false);
    setEditingBrand(null);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name?.trim()) {
      showToast("Please provide a brand name.");
      return;
    }

    if (editingBrand) {
      setBrands((prev) =>
        prev.map((b) =>
          b.id === editingBrand.id
            ? ({
                ...b,
                ...formData,
              } as AdminBrandItem)
            : b
        )
      );
      showToast(`Brand "${formData.name}" updated successfully.`);
    } else {
      const newBrand: AdminBrandItem = {
        id: `brand-${Date.now()}`,
        name: formData.name as "LABXE" | "SSCIENCES" | "DANWER",
        tagline: formData.tagline || "",
        slug:
          formData.slug ||
          formData.name!.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""),
        summary: formData.summary || "",
        status: (formData.status as "Published" | "Draft") || "Published",
        displayOrder: Number(formData.displayOrder) || brands.length + 1,
        logo: formData.logo || "/images/brand/micropipette-manufacturer-logo.png",
        productsLinkedCount: 0,
        seoTitle: formData.seoTitle,
        metaDesc: formData.metaDesc,
      };
      setBrands((prev) => [...prev, newBrand]);
      showToast(`Brand "${newBrand.name}" registered.`);
    }

    handleCloseEditor();
  };

  return (
    <div className={styles.workspace}>
      <div className={styles.pageHead}>
        <div>
          <div className={styles.eyebrow}>Phase 4.5 · Brand Management</div>
          <h1>Brands</h1>
          <p className={styles.pageDesc}>
            Manage the three confirmed brands in the current project scope.
          </p>
        </div>
        <div className={styles.pageActions}>
          <button
            className={`${styles.btn} ${styles.btnPrimary}`}
            onClick={handleOpenAdd}
            id="admin-btn-add-brand"
          >
            + Add Brand
          </button>
        </div>
      </div>

      {/* Prototype Scope Banner */}
      <div className={styles.prototypeBanner}>
        <strong>Confirmed brand scope:</strong> LABXE, SSCIENCES / Singh Science Systems,
        and DANWER. LABAIDS is not part of this project.
      </div>

      {/* Brand Cards Grid */}
      <div className={styles.cards}>
        {brands.map((brand) => (
          <article key={brand.id} className={styles.entityCard}>
            <div>
              <div className={styles.entityCardHead}>
                <div>
                  <h3>{brand.name}</h3>
                  <p>{brand.tagline}</p>
                </div>
                <span
                  className={`${styles.status} ${
                    brand.status === "Published"
                      ? styles.statusPublished
                      : styles.statusDraft
                  }`}
                >
                  {brand.status}
                </span>
              </div>

              <p style={{ marginTop: "12px", color: "#62758d", fontSize: "12px" }}>
                {brand.summary}
              </p>

              <div className={styles.entityMeta}>
                <span className={styles.metaPill}>
                  {brand.productsLinkedCount} Products linked · sample
                </span>
                <span className={styles.metaPill}>Reusable brand detail</span>
                <span className={styles.metaPill}>Order: {brand.displayOrder}</span>
              </div>
            </div>

            <div className={styles.entityActions}>
              <button
                className={`${styles.btn} ${styles.btnSmall}`}
                onClick={() => handleOpenEdit(brand)}
                id={`edit-brand-${brand.id}`}
              >
                Edit
              </button>
              <Link
                href="/admin/products"
                className={`${styles.btn} ${styles.btnSmall}`}
              >
                View Products ↗
              </Link>
              <Link
                href={`/brands/${brand.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.btn} ${styles.btnSmall}`}
                style={{ marginLeft: "auto" }}
              >
                Public Page ↗
              </Link>
            </div>
          </article>
        ))}
      </div>

      {/* Brand Editor Panel */}
      {isEditorOpen && (
        <article className={styles.panel} id="brandEditor">
          <div className={styles.panelHead}>
            <div>
              <h2>{editingBrand ? `Edit ${editingBrand.name}` : "Add Brand"}</h2>
              <p>Uses one reusable public brand-detail structure and catalog association.</p>
            </div>
          </div>

          <form onSubmit={handleSave}>
            <div className={styles.panelBody}>
              <div className={styles.formGrid}>
                <label className={styles.formGroup}>
                  <span className={styles.formLabel}>
                    Brand Name <span className={styles.required}>*</span>
                  </span>
                  <input
                    className={styles.field}
                    value={formData.name || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        name: e.target.value as "LABXE" | "SSCIENCES" | "DANWER",
                      })
                    }
                    placeholder="LABXE / SSCIENCES / DANWER"
                    required
                  />
                </label>

                <label className={styles.formGroup}>
                  <span className={styles.formLabel}>Tagline</span>
                  <input
                    className={styles.field}
                    value={formData.tagline || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, tagline: e.target.value })
                    }
                    placeholder="e.g. Precision Micropipettes"
                  />
                </label>

                <label className={styles.formGroup}>
                  <span className={styles.formLabel}>URL Slug</span>
                  <input
                    className={styles.field}
                    value={formData.slug || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, slug: e.target.value })
                    }
                    placeholder="e.g. labxe"
                  />
                </label>

                <label className={styles.formGroup}>
                  <span className={styles.formLabel}>Status</span>
                  <select
                    className={styles.select}
                    value={formData.status || "Published"}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        status: e.target.value as "Published" | "Draft",
                      })
                    }
                  >
                    <option value="Published">Published</option>
                    <option value="Draft">Draft</option>
                  </select>
                </label>

                <label className={styles.formGroup}>
                  <span className={styles.formLabel}>Display Order</span>
                  <input
                    type="number"
                    className={styles.field}
                    value={formData.displayOrder || 1}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        displayOrder: parseInt(e.target.value) || 1,
                      })
                    }
                    min={1}
                  />
                </label>

                <label className={`${styles.formGroup} ${styles.span2}`}>
                  <span className={styles.formLabel}>Brand Summary</span>
                  <textarea
                    className={styles.textarea}
                    value={formData.summary || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, summary: e.target.value })
                    }
                    placeholder="Enter verified brand summary and mission statement..."
                    style={{ minHeight: "85px" }}
                  />
                </label>

                <div className={`${styles.formGroup} ${styles.span2}`}>
                  <span className={styles.formLabel}>Brand Logo Asset</span>
                  <div className={styles.uploadBox}>
                    <strong>Select logo from Media Library</strong>
                    <span>Current asset: /images/brand/micropipette-manufacturer-logo.png</span>
                    <button
                      className={`${styles.btn} ${styles.btnSmall}`}
                      type="button"
                      onClick={() => showToast("Media library selector ready for stage 10.")}
                    >
                      Browse Media Library
                    </button>
                  </div>
                </div>
              </div>

              {/* SEO Mini Section */}
              <details className={styles.seoMini}>
                <summary>
                  Search appearance (SEO) <span className={styles.help}>Optional</span>
                </summary>
                <div className={styles.seoMiniBody}>
                  <p className={styles.seoMiniNote}>
                    Keep everyday editing simple. Use these essentials here, or open Advanced
                    SEO for canonical, robots, schema, sitemap and social metadata.
                  </p>
                  <div className={styles.formGrid}>
                    <label className={`${styles.formGroup} ${styles.span2}`}>
                      <span className={styles.formLabel}>SEO Title</span>
                      <input
                        className={styles.field}
                        value={formData.seoTitle || ""}
                        onChange={(e) =>
                          setFormData({ ...formData, seoTitle: e.target.value })
                        }
                        placeholder="[Brand SEO title] | MicropipetteManufacturer.com"
                      />
                    </label>

                    <label className={`${styles.formGroup} ${styles.span2}`}>
                      <span className={styles.formLabel}>Meta Description</span>
                      <textarea
                        className={styles.textarea}
                        value={formData.metaDesc || ""}
                        onChange={(e) =>
                          setFormData({ ...formData, metaDesc: e.target.value })
                        }
                        placeholder="Brand search description for search engine result snippets..."
                        style={{ minHeight: "72px" }}
                      />
                    </label>

                    <div className={styles.formGroup}>
                      <span className={styles.formLabel}>More controls</span>
                      <Link
                        href="/admin/settings"
                        className={styles.btn}
                        style={{ display: "inline-flex", width: "fit-content" }}
                      >
                        Open Advanced SEO ↗
                      </Link>
                    </div>
                  </div>
                </div>
              </details>
            </div>

            <div className={styles.panelFoot}>
              <button
                type="button"
                className={styles.btn}
                onClick={handleCloseEditor}
              >
                Cancel
              </button>
              <button
                type="submit"
                className={`${styles.btn} ${styles.btnPrimary}`}
                id="btn-save-brand"
              >
                Save Brand
              </button>
            </div>
          </form>
        </article>
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className={`${styles.toast} ${styles.toastShow}`}>
          {toastMessage}
        </div>
      )}
    </div>
  );
}
