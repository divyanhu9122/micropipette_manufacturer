"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "../Admin.module.css";
import {
  AdminCategoryItem,
  INITIAL_ADMIN_CATEGORIES,
} from "../admin.data";

export default function CategoriesManagement() {
  const [categories, setCategories] = useState<AdminCategoryItem[]>(
    INITIAL_ADMIN_CATEGORIES
  );
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingCategory, setEditingCategory] =
    useState<AdminCategoryItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form state
  const [formData, setFormData] = useState<Partial<AdminCategoryItem>>({
    name: "",
    slug: "",
    parent: "",
    status: "Published",
    order: 1,
    description: "",
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
    setEditingCategory(null);
    setFormData({
      name: "",
      slug: "",
      parent: "",
      status: "Published",
      order: categories.length + 1,
      description: "",
      seoTitle: "",
      metaDesc: "",
    });
    setIsEditorOpen(true);
  };

  const handleOpenEdit = (cat: AdminCategoryItem) => {
    setEditingCategory(cat);
    setFormData({ ...cat });
    setIsEditorOpen(true);
  };

  const handleCloseEditor = () => {
    setIsEditorOpen(false);
    setEditingCategory(null);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name?.trim()) {
      showToast("Please provide a category name before saving.");
      return;
    }

    if (editingCategory) {
      setCategories((prev) =>
        prev.map((c) =>
          c.id === editingCategory.id
            ? ({
                ...c,
                ...formData,
                parent: formData.parent === "none" ? undefined : formData.parent,
              } as AdminCategoryItem)
            : c
        )
      );
      showToast(`Category "${formData.name}" updated successfully.`);
    } else {
      const newCat: AdminCategoryItem = {
        id: `cat-${Date.now()}`,
        name: formData.name!,
        slug:
          formData.slug ||
          formData.name!.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""),
        parent: formData.parent === "none" ? undefined : formData.parent,
        status: (formData.status as "Published" | "Draft") || "Published",
        order: Number(formData.order) || categories.length + 1,
        description: formData.description || "",
        seoTitle: formData.seoTitle,
        metaDesc: formData.metaDesc,
      };
      setCategories((prev) => [...prev, newCat]);
      showToast(`New category "${newCat.name}" added successfully.`);
    }

    handleCloseEditor();
  };

  // Top-level categories for parent dropdown
  const topLevelCategories = categories.filter((c) => !c.parent);

  return (
    <div className={styles.workspace}>
      <div className={styles.pageHead}>
        <div>
          <div className={styles.eyebrow}>Phase 4.4 · Taxonomy</div>
          <h1>Categories & Subcategories</h1>
          <p className={styles.pageDesc}>
            Maintain the hierarchy used for product discovery and catalogue navigation.
          </p>
        </div>
        <div className={styles.pageActions}>
          <button
            className={`${styles.btn} ${styles.btnPrimary}`}
            onClick={handleOpenAdd}
            id="admin-btn-add-category"
          >
            + Add Category
          </button>
        </div>
      </div>

      {/* Prototype Reference Banner */}
      <div className={styles.prototypeBanner}>
        <strong>Reference categories:</strong> Micropipettes, Pipette Tips, Tip Boxes &
        Racks, Pipette Controllers, Accessories and Lab Instruments appear in the confirmed
        homepage; Bottle Top Dispensers and Balances also appear in the confirmed
        product-listing filter direction.
      </div>

      {/* Categories Tree */}
      <div className={styles.tree}>
        {categories.map((cat) => {
          const isChild = Boolean(cat.parent);
          return (
            <div
              key={cat.id}
              className={`${styles.treeRow} ${isChild ? styles.treeRowChild : ""}`}
            >
              <div className={styles.treeTitle}>
                {cat.name}
                <small>
                  {isChild
                    ? `Child of ${cat.parent}`
                    : `/products/${cat.slug}/`}
                </small>
              </div>

              <div>
                <span
                  className={`${styles.status} ${
                    cat.status === "Published"
                      ? styles.statusPublished
                      : styles.statusDraft
                  }`}
                >
                  {cat.status}
                </span>
              </div>

              <div className={styles.order} title="Display Order Index">
                {cat.order}
              </div>

              <div style={{ textAlign: "right" }}>
                <button
                  className={`${styles.btn} ${styles.btnSmall}`}
                  onClick={() => handleOpenEdit(cat)}
                  id={`edit-cat-${cat.id}`}
                >
                  Edit
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Category Editor */}
      {isEditorOpen && (
        <article className={styles.panel} id="categoryEditor" style={{ marginTop: "24px" }}>
          <div className={styles.panelHead}>
            <div>
              <h2>{editingCategory ? "Edit Category" : "Add New Category"}</h2>
              <p>Create or update a category/subcategory in the catalog taxonomy.</p>
            </div>
          </div>

          <form onSubmit={handleSave}>
            <div className={styles.panelBody}>
              <div className={styles.formGrid}>
                <label className={styles.formGroup}>
                  <span className={styles.formLabel}>
                    Category Name <span className={styles.required}>*</span>
                  </span>
                  <input
                    className={styles.field}
                    value={formData.name || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="e.g. Variable Volume"
                    required
                  />
                </label>

                <label className={styles.formGroup}>
                  <span className={styles.formLabel}>Parent Category</span>
                  <select
                    className={styles.select}
                    value={formData.parent || "none"}
                    onChange={(e) =>
                      setFormData({ ...formData, parent: e.target.value })
                    }
                  >
                    <option value="none">None — top level category</option>
                    {topLevelCategories
                      .filter((c) => c.id !== editingCategory?.id)
                      .map((c) => (
                        <option key={c.id} value={c.name}>
                          {c.name}
                        </option>
                      ))}
                  </select>
                </label>

                <label className={styles.formGroup}>
                  <span className={styles.formLabel}>URL Slug</span>
                  <input
                    className={styles.field}
                    value={formData.slug || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, slug: e.target.value })
                    }
                    placeholder="e.g. variable-volume"
                  />
                </label>

                <label className={styles.formGroup}>
                  <span className={styles.formLabel}>Publication Status</span>
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
                    value={formData.order || 1}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        order: parseInt(e.target.value) || 1,
                      })
                    }
                    min={1}
                  />
                </label>

                <label className={`${styles.formGroup} ${styles.span2}`}>
                  <span className={styles.formLabel}>Short Description</span>
                  <textarea
                    className={styles.textarea}
                    value={formData.description || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    placeholder="Enter verified category description..."
                    style={{ minHeight: "80px" }}
                  />
                </label>
              </div>

              {/* SEO Mini Section */}
              <details className={styles.seoMini}>
                <summary>
                  Search Appearance (SEO) <span className={styles.help}>Optional</span>
                </summary>
                <div className={styles.seoMiniBody}>
                  <p className={styles.seoMiniNote}>
                    Keep everyday editing simple. Use these essentials here, or visit{" "}
                    <Link href="/admin/settings" style={{ color: "var(--primary-blue, #0d418a)", fontWeight: 700 }}>
                      SEO & Settings
                    </Link>{" "}
                    for full canonical, robots, schema, sitemap, and social directives.
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
                        placeholder="[Category SEO title] | MicropipetteManufacturer.com"
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
                        placeholder="Page-specific description for Google search snippet..."
                        style={{ minHeight: "72px" }}
                      />
                    </label>

                    <div className={styles.formGroup}>
                      <span className={styles.formLabel}>More Controls</span>
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
                id="btn-save-category"
              >
                Save Category
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
