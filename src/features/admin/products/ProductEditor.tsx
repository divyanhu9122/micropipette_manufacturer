"use client";

import { useState } from "react";
import styles from "../Admin.module.css";
import type { AdminProductItem, AdminProductSpec } from "../admin.data";

interface ProductEditorProps {
  product?: AdminProductItem | null;
  onSave: (product: AdminProductItem) => void;
  onCancel: () => void;
  onShowToast: (msg: string) => void;
}

export default function ProductEditor({
  product,
  onSave,
  onCancel,
  onShowToast,
}: ProductEditorProps) {
  const isEditing = !!product;

  const [title, setTitle] = useState(product?.title || "");
  const [code, setCode] = useState(product?.code || "");
  const [slug, setSlug] = useState(product?.slug || "");
  const [brand, setBrand] = useState<"LABXE" | "SSCIENCES" | "DANWER">(
    product?.brand || "LABXE",
  );
  const [category, setCategory] = useState(
    product?.category || "Micropipettes",
  );
  const [subcategory, setSubcategory] = useState(
    product?.subcategory || "Variable Volume",
  );
  const [channel, setChannel] = useState(product?.channel || "Single Channel");
  const [status, setStatus] = useState<"Published" | "Draft">(
    product?.status || "Draft",
  );
  const [displayOrder, setDisplayOrder] = useState<number>(
    product?.displayOrder || 10,
  );
  const [overview, setOverview] = useState(product?.overview || "");
  const [featuresText, setFeaturesText] = useState(
    product?.features ? product.features.join("\n") : "",
  );

  const [specs, setSpecs] = useState<AdminProductSpec[]>(
    product?.specs || [
      { label: "Volume Range", value: "0.5–10 µL" },
      { label: "Increment", value: "0.01 µL" },
      { label: "Accuracy", value: "±1.0%" },
      { label: "Precision", value: "≤0.5%" },
      { label: "Autoclavability", value: "Autoclavable lower assembly" },
    ],
  );

  const [seoTitle, setSeoTitle] = useState(
    product ? `${product.title} | MicropipetteManufacturer.in` : "",
  );
  const [seoDescription, setSeoDescription] = useState(product?.overview || "");

  const handleAddSpecRow = () => {
    setSpecs((prev) => [...prev, { label: "New Specification", value: "" }]);
  };

  const handleSpecChange = (
    index: number,
    field: "label" | "value",
    val: string,
  ) => {
    setSpecs((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: val };
      return copy;
    });
  };

  const handleRemoveSpec = (index: number) => {
    setSpecs((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (targetStatus: "Published" | "Draft") => {
    if (!title.trim()) {
      onShowToast("Please enter a Product Name.");
      return;
    }

    const updated: AdminProductItem = {
      id: product?.id || `prod-${Date.now().toString().slice(-4)}`,
      title: title.trim(),
      code: code.trim() || `CODE-${Date.now().toString().slice(-4)}`,
      slug:
        slug.trim() ||
        title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, ""),
      brand,
      category,
      subcategory,
      channel,
      status: targetStatus,
      updatedDate: "Today",
      overview,
      features: featuresText
        .split("\n")
        .map((f) => f.replace(/^•\s*/, "").trim())
        .filter(Boolean),
      specs: specs.filter((s) => s.label.trim() && s.value.trim()),
      displayOrder: Number(displayOrder) || 10,
    };

    onSave(updated);
    onShowToast(
      `Product "${updated.title}" ${targetStatus === "Published" ? "published" : "saved as draft"}.`,
    );
  };

  return (
    <div className={styles.workspace}>
      {/* Editor Page Head */}
      <div className={styles.pageHead}>
        <div>
          <div className={styles.eyebrow}>
            Phase 4.3 · {isEditing ? "Edit Product" : "Add New Product"}
          </div>
          <h1>{isEditing ? `Edit: ${product.title}` : "New Product Record"}</h1>
          <p className={styles.pageDesc}>
            Reusable product content form mirroring the confirmed public product
            detail structure.
          </p>
        </div>
        <div className={styles.pageActions}>
          <button
            type="button"
            className="btn secondary"
            onClick={onCancel}
            id="editor-cancel-btn"
          >
            ← Back to Products
          </button>
          <button
            type="button"
            className="btn secondary"
            onClick={() => handleSubmit("Draft")}
            id="editor-save-draft-btn"
          >
            Save Draft
          </button>
          <button
            type="button"
            className="btn primary"
            onClick={() => handleSubmit("Published")}
            id="editor-publish-btn"
          >
            Publish Product
          </button>
        </div>
      </div>

      <div className={styles.prototypeBanner}>
        <strong>Note:</strong> Content changes update in-memory catalog for this
        session. Changes are ready for Strapi CMS persistence.
      </div>

      <div className={styles.grid2}>
        {/* Left Column */}
        <div className={styles.stack}>
          {/* Basic Info */}
          <article className={styles.panel}>
            <div className={styles.panelHead}>
              <div>
                <h2>Basic Information</h2>
                <p>Identity, brand, and catalogue taxonomy.</p>
              </div>
            </div>
            <div className={styles.panelBody}>
              <div className={styles.formGrid}>
                <div className={styles.formGroupSpan2}>
                  <span className={styles.formLabel}>
                    Product Name <span className={styles.required}>*</span>
                  </span>
                  <input
                    className={styles.field}
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                      if (!isEditing && !slug) {
                        setSlug(
                          e.target.value
                            .toLowerCase()
                            .replace(/[^a-z0-9]+/g, "-")
                            .replace(/^-|-$/g, ""),
                        );
                      }
                    }}
                    placeholder="e.g. LABXE Precision Variable Volume"
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <span className={styles.formLabel}>Product Code</span>
                  <input
                    className={styles.field}
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="e.g. LABXE-SP-001"
                  />
                </div>

                <div className={styles.formGroup}>
                  <span className={styles.formLabel}>URL Slug</span>
                  <input
                    className={styles.field}
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="e.g. labxe-precision-variable-volume"
                  />
                </div>

                <div className={styles.formGroup}>
                  <span className={styles.formLabel}>Brand</span>
                  <select
                    className={styles.select}
                    value={brand}
                    onChange={(e) =>
                      setBrand(
                        e.target.value as "LABXE" | "SSCIENCES" | "DANWER",
                      )
                    }
                  >
                    <option value="LABXE">LABXE</option>
                    <option value="SSCIENCES">SSCIENCES</option>
                    <option value="DANWER">DANWER</option>
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <span className={styles.formLabel}>Category</span>
                  <select
                    className={styles.select}
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="Micropipettes">Micropipettes</option>
                    <option value="Pipette Tips">Pipette Tips</option>
                    <option value="Bottle Top Dispensers">
                      Bottle Top Dispensers
                    </option>
                    <option value="Pipette Controllers">
                      Pipette Controllers
                    </option>
                    <option value="Laboratory Instruments">
                      Laboratory Instruments
                    </option>
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <span className={styles.formLabel}>Subcategory</span>
                  <select
                    className={styles.select}
                    value={subcategory}
                    onChange={(e) => setSubcategory(e.target.value)}
                  >
                    <option value="Variable Volume">Variable Volume</option>
                    <option value="Fixed Volume">Fixed Volume</option>
                    <option value="Multichannel">Multichannel</option>
                    <option value="Universal Fit">Universal Fit</option>
                    <option value="Precision Balances">
                      Precision Balances
                    </option>
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <span className={styles.formLabel}>Channel Type</span>
                  <input
                    className={styles.field}
                    value={channel}
                    onChange={(e) => setChannel(e.target.value)}
                    placeholder="Single Channel / 8-Channel / 12-Channel"
                  />
                </div>
              </div>
            </div>
          </article>

          {/* Product Overview & Features */}
          <article className={styles.panel}>
            <div className={styles.panelHead}>
              <div>
                <h2>Product Overview & Key Features</h2>
                <p>Technical product copy and bulleted highlights.</p>
              </div>
            </div>
            <div className={styles.panelBody}>
              <div className={styles.formGrid}>
                <div className={styles.formGroupSpan2}>
                  <span className={styles.formLabel}>Product Overview</span>
                  <div className={styles.fauxEditor}>
                    <div className={styles.editorTools}>
                      <button type="button" title="Bold">
                        B
                      </button>
                      <button type="button" title="Italic">
                        <i>I</i>
                      </button>
                      <button type="button" title="Bullet List">
                        •
                      </button>
                      <button type="button" title="Numbered List">
                        1.
                      </button>
                    </div>
                    <textarea
                      className={styles.textarea}
                      style={{ border: 0, minHeight: "120px" }}
                      value={overview}
                      onChange={(e) => setOverview(e.target.value)}
                      placeholder="Enter verified technical overview copy..."
                    />
                  </div>
                </div>

                <div className={styles.formGroupSpan2}>
                  <span className={styles.formLabel}>
                    Key Features (one per line)
                  </span>
                  <textarea
                    className={styles.textarea}
                    style={{ minHeight: "100px" }}
                    value={featuresText}
                    onChange={(e) => setFeaturesText(e.target.value)}
                    placeholder="• Autoclavable tip cone&#10;• Thermal insulation&#10;• ISO 8655 calibration report included"
                  />
                </div>
              </div>
            </div>
          </article>

          {/* Technical Specifications Table */}
          <article className={styles.panel}>
            <div className={styles.panelHead}>
              <div>
                <h2>Technical Specifications</h2>
                <p>Metrological, volumetric, and material properties.</p>
              </div>
              <button
                type="button"
                className="btn secondary small"
                onClick={handleAddSpecRow}
                id="add-spec-row-btn"
              >
                + Add Spec Row
              </button>
            </div>
            <div className={styles.panelBody} style={{ padding: 0 }}>
              <table className={styles.specTable}>
                <thead>
                  <tr>
                    <th style={{ width: "40%" }}>Specification Parameter</th>
                    <th>Verified Value</th>
                    <th style={{ width: "60px", textAlign: "center" }}>Del</th>
                  </tr>
                </thead>
                <tbody>
                  {specs.map((spec, idx) => (
                    <tr key={idx}>
                      <td>
                        <input
                          value={spec.label}
                          onChange={(e) =>
                            handleSpecChange(idx, "label", e.target.value)
                          }
                          placeholder="e.g. Volume Range"
                        />
                      </td>
                      <td>
                        <input
                          value={spec.value}
                          onChange={(e) =>
                            handleSpecChange(idx, "value", e.target.value)
                          }
                          placeholder="e.g. 100–1000 µL"
                        />
                      </td>
                      <td style={{ textAlign: "center" }}>
                        <button
                          type="button"
                          className="btn ghost small"
                          onClick={() => handleRemoveSpec(idx)}
                          style={{ color: "#b33a24", padding: "2px 6px" }}
                        >
                          ✕
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </article>
        </div>

        {/* Right Column */}
        <div className={styles.stack}>
          {/* Publishing Card */}
          <article className={styles.panel}>
            <div className={styles.panelHead}>
              <div>
                <h2>Publishing Status</h2>
                <p>Live visibility and display order.</p>
              </div>
            </div>
            <div className={styles.panelBody}>
              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <span className={styles.formLabel}>Status</span>
                  <select
                    className={styles.select}
                    value={status}
                    onChange={(e) =>
                      setStatus(e.target.value as "Published" | "Draft")
                    }
                  >
                    <option value="Draft">Draft (Editable, Not Live)</option>
                    <option value="Published">Published (Live Catalog)</option>
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <span className={styles.formLabel}>Display Order</span>
                  <input
                    type="number"
                    className={styles.field}
                    value={displayOrder}
                    onChange={(e) => setDisplayOrder(Number(e.target.value))}
                  />
                </div>
              </div>
            </div>
          </article>

          {/* Product Media Card */}
          <article className={styles.panel}>
            <div className={styles.panelHead}>
              <div>
                <h2>Product Media</h2>
                <p>Asset associations from Media Library.</p>
              </div>
            </div>
            <div className={styles.panelBody}>
              <div className={styles.uploadBox}>
                <strong>Primary Product Image</strong>
                <span>
                  Assigned standard asset: <code>{slug || "product"}.png</code>
                </span>
                <div style={{ marginTop: "10px" }}>
                  <button type="button" className="btn secondary small">
                    Browse Media Library
                  </button>
                </div>
              </div>

              <div style={{ marginTop: "14px" }}>
                <span className={styles.formLabel}>Image Alt Text</span>
                <input
                  className={styles.field}
                  defaultValue={`${title} precision liquid handling micropipette`}
                  placeholder="Describe image for accessibility..."
                />
              </div>
            </div>
          </article>

          {/* Search Engine Appearance (SEO) */}
          <article className={styles.panel}>
            <div className={styles.panelHead}>
              <div>
                <h2>Search Appearance (SEO)</h2>
                <p>Google search listing snippet.</p>
              </div>
            </div>
            <div className={styles.panelBody}>
              <div className={styles.formGrid}>
                <div className={styles.formGroupSpan2}>
                  <span className={styles.formLabel}>SEO Title</span>
                  <input
                    className={styles.field}
                    value={seoTitle}
                    onChange={(e) => setSeoTitle(e.target.value)}
                    placeholder="Page Title | MicropipetteManufacturer.in"
                  />
                </div>

                <div className={styles.formGroupSpan2}>
                  <span className={styles.formLabel}>Meta Description</span>
                  <textarea
                    className={styles.textarea}
                    style={{ minHeight: "75px" }}
                    value={seoDescription}
                    onChange={(e) => setSeoDescription(e.target.value)}
                    placeholder="Concise search summary..."
                  />
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}
