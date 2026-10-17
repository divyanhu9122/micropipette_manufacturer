"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import styles from "../Admin.module.css";
import { INITIAL_ADMIN_PRODUCTS, type AdminProductItem } from "../admin.data";
import ProductEditor from "./ProductEditor";

export default function AdminProductsApp() {
  const [products, setProducts] = useState<AdminProductItem[]>(
    INITIAL_ADMIN_PRODUCTS,
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");

  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<AdminProductItem | null>(
    null,
  );
  const [toastMessage, setToastMessage] = useState("");

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3500);
  };

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.code.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.subcategory.toLowerCase().includes(q);

      const matchesBrand = selectedBrand === "All" || p.brand === selectedBrand;
      const matchesStatus =
        selectedStatus === "All" || p.status === selectedStatus;

      return matchesQuery && matchesBrand && matchesStatus;
    });
  }, [products, searchQuery, selectedBrand, selectedStatus]);

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setIsEditorOpen(true);
  };

  const handleOpenEdit = (p: AdminProductItem) => {
    setEditingProduct(p);
    setIsEditorOpen(true);
  };

  const handleSaveProduct = (saved: AdminProductItem) => {
    setProducts((prev) => {
      const idx = prev.findIndex((p) => p.id === saved.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = saved;
        return copy;
      }
      return [saved, ...prev];
    });
    setIsEditorOpen(false);
    setEditingProduct(null);
  };

  const handleDuplicate = (p: AdminProductItem) => {
    const duplicated: AdminProductItem = {
      ...p,
      id: `prod-${Date.now().toString().slice(-4)}`,
      title: `${p.title} (Copy)`,
      code: `${p.code}-COPY`,
      slug: `${p.slug}-copy`,
      status: "Draft",
      updatedDate: "Today",
    };
    setProducts((prev) => [duplicated, ...prev]);
    showToast(`Duplicated "${p.title}" as new Draft.`);
  };

  const handleDelete = (id: string, title: string) => {
    if (
      window.confirm(
        `Delete product "${title}"? This is a prototype confirmation.`,
      )
    ) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
      showToast(`Product "${title}" removed.`);
    }
  };

  if (isEditorOpen) {
    return (
      <ProductEditor
        product={editingProduct}
        onSave={handleSaveProduct}
        onCancel={() => {
          setIsEditorOpen(false);
          setEditingProduct(null);
        }}
        onShowToast={showToast}
      />
    );
  }

  return (
    <div className={styles.workspace}>
      {/* Header */}
      <div className={styles.pageHead}>
        <div>
          <div className={styles.eyebrow}>Phase 4.2 · Product Management</div>
          <h1>Products Catalog</h1>
          <p className={styles.pageDesc}>
            Manage product records that feed the public product listing,
            subcategory indexes, and reusable product detail pages.
          </p>
        </div>
        <div className={styles.pageActions}>
          <button
            type="button"
            className="btn primary"
            onClick={handleOpenAdd}
            id="admin-add-product-btn"
          >
            + Add Product
          </button>
        </div>
      </div>

      <div className={styles.prototypeBanner}>
        <strong>Content Reference:</strong> Product families and brand
        terminology follow the confirmed catalog across LABXE, SSCIENCES, and
        DANWER.
      </div>

      {/* Toolbar */}
      <div className={styles.toolbar}>
        <div className={styles.toolbarLeft}>
          <div className={styles.searchBox}>
            <svg viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-4-4" />
            </svg>
            <input
              type="text"
              placeholder="Search product name, code, or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              id="product-search-input"
            />
          </div>

          <select
            className={styles.select}
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
            id="filter-product-brand"
          >
            <option value="All">All Brands</option>
            <option value="LABXE">LABXE</option>
            <option value="SSCIENCES">SSCIENCES</option>
            <option value="DANWER">DANWER</option>
          </select>

          <select
            className={styles.select}
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            id="filter-product-status"
          >
            <option value="All">All Statuses</option>
            <option value="Published">Published</option>
            <option value="Draft">Draft</option>
          </select>
        </div>

        <div style={{ fontSize: "12px", color: "#62758d" }}>
          Showing <strong>{filteredProducts.length}</strong> of{" "}
          {products.length} products
        </div>
      </div>

      {/* Products Table Panel */}
      <article className={styles.panel}>
        <div className={styles.tableWrap}>
          <table className={styles.dataTable} id="products-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Code</th>
                <th>Brand</th>
                <th>Category</th>
                <th>Updated</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((p) => (
                  <tr key={p.id}>
                    <td className={styles.primaryCell}>
                      {p.title}
                      <span className={styles.subline}>
                        {p.category} · {p.subcategory}
                        {p.channel ? ` (${p.channel})` : ""}
                      </span>
                    </td>
                    <td>
                      <code>{p.code}</code>
                    </td>
                    <td>
                      <span className={styles.typeBadge}>{p.brand}</span>
                    </td>
                    <td>{p.category}</td>
                    <td>{p.updatedDate}</td>
                    <td>
                      <span
                        className={`${styles.status} ${
                          p.status === "Published"
                            ? styles.statusPublished
                            : styles.statusDraft
                        }`}
                      >
                        {p.status}
                      </span>
                    </td>
                    <td>
                      <div className={styles.rowActions}>
                        <button
                          type="button"
                          className="btn secondary small"
                          onClick={() => handleOpenEdit(p)}
                          id={`edit-prod-${p.id}`}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="btn secondary small"
                          onClick={() => handleDuplicate(p)}
                          title="Duplicate as new draft"
                        >
                          Duplicate
                        </button>
                        <Link
                          href={`/products/${p.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn ghost small"
                          title="View live public product page"
                        >
                          ↗
                        </Link>
                        <button
                          type="button"
                          className="btn ghost small"
                          onClick={() => handleDelete(p.id, p.title)}
                          style={{ color: "#b33a24" }}
                          title="Delete"
                        >
                          ✕
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={7}
                    style={{ textAlign: "center", padding: "40px 20px" }}
                  >
                    <div style={{ color: "#62758d", fontSize: "14px" }}>
                      No products match your current search and filter criteria.
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </article>

      {/* Floating Action Feedback Toast */}
      {toastMessage && <div className={styles.toast}>{toastMessage}</div>}
    </div>
  );
}
