"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./UniversalQuote.module.css";
import {
  COUNTRIES,
  BUYER_TYPES,
  PREFERRED_BRANDS,
  QUOTE_TYPES,
} from "../product-enquiry/product-enquiry.data";

interface ProductOption {
  id: string;
  name: string;
  category: string;
  brand: string;
}

const AVAILABLE_PRODUCTS: ProductOption[] = [
  {
    id: "sp-v010",
    name: "Science Plus Variable Volume (0.5–10 µL)",
    category: "Micropipettes",
    brand: "SSCIENCES",
  },
  {
    id: "sp-v020",
    name: "Science Plus Variable Volume (2–20 µL)",
    category: "Micropipettes",
    brand: "SSCIENCES",
  },
  {
    id: "sp-v100",
    name: "Science Plus Variable Volume (10–100 µL)",
    category: "Micropipettes",
    brand: "SSCIENCES",
  },
  {
    id: "sp-v200",
    name: "Science Plus Variable Volume (20–200 µL)",
    category: "Micropipettes",
    brand: "SSCIENCES",
  },
  {
    id: "sp-v1000",
    name: "Science Plus Variable Volume (100–1000 µL)",
    category: "Micropipettes",
    brand: "SSCIENCES",
  },
  {
    id: "sp-v5000",
    name: "Science Plus Variable Volume (0.5–5 mL)",
    category: "Micropipettes",
    brand: "SSCIENCES",
  },
  {
    id: "sp-v10000",
    name: "Science Plus Variable Volume (1–10 mL)",
    category: "Micropipettes",
    brand: "SSCIENCES",
  },
  {
    id: "mc-8ch",
    name: "Multichannel 8-Channel Micropipette (5–50 µL)",
    category: "Micropipettes",
    brand: "SSCIENCES",
  },
  {
    id: "fac-plus",
    name: "FAC Plus Fully Autoclavable Pipette",
    category: "Micropipettes",
    brand: "LABXE",
  },
  {
    id: "btd-reg",
    name: "Bottle Top Dispenser Regular (0.5–50 mL)",
    category: "Bottle Top Dispensers",
    brand: "SSCIENCES",
  },
  {
    id: "btd-prem",
    name: "Bottle Top Dispenser Premium Dual-Valve",
    category: "Bottle Top Dispensers",
    brand: "LABXE",
  },
  {
    id: "bal-prec",
    name: "Precision Analytical Balance Series",
    category: "Balances",
    brand: "DANWER",
  },
];

const CATEGORIES = [
  "Micropipettes",
  "Bottle Top Dispensers",
  "Balances",
  "Other Laboratory Instruments",
];

export default function UniversalQuoteApp() {
  const [summaryOpen, setSummaryOpen] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Form states
  const [contactPerson, setContactPerson] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [buyerType, setBuyerType] = useState("");

  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    "Micropipettes",
  ]);
  const [preferredBrand, setPreferredBrand] = useState("");
  const [productSearch, setProductSearch] = useState("");
  const [selectedProducts, setSelectedProducts] = useState<Record<string, number>>({
    "sp-v010": 10,
  });

  const [requiredDate, setRequiredDate] = useState("");
  const [destinationCountry, setDestinationCountry] = useState("");
  const [quoteType, setQuoteType] = useState("Standard Product Quote");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);

  // Category toggle
  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  // Product selection toggle
  const toggleProduct = (prodId: string) => {
    setSelectedProducts((prev) => {
      const copy = { ...prev };
      if (copy[prodId]) {
        delete copy[prodId];
      } else {
        copy[prodId] = 10;
      }
      return copy;
    });
  };

  // Quantity change
  const updateQuantity = (prodId: string, qty: number) => {
    if (qty <= 0) return;
    setSelectedProducts((prev) => ({
      ...prev,
      [prodId]: qty,
    }));
  };

  const removeProduct = (prodId: string) => {
    setSelectedProducts((prev) => {
      const copy = { ...prev };
      delete copy[prodId];
      return copy;
    });
  };

  // Filtered product options based on search and selected categories
  const filteredProducts = AVAILABLE_PRODUCTS.filter((p) => {
    const matchesCategory =
      selectedCategories.length === 0 || selectedCategories.includes(p.category);
    const matchesSearch =
      !productSearch ||
      p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.category.toLowerCase().includes(productSearch.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const selectedProductList = AVAILABLE_PRODUCTS.filter(
    (p) => selectedProducts[p.id] !== undefined
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 450);
  };

  return (
    <div className={styles.page}>
      {/* Compact Hero / Breadcrumb Bar */}
      <section className={styles.heroCompact}>
        <div className={styles.wrap}>
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className={styles.chevron} aria-hidden="true">
              ›
            </span>
            <span className={styles.breadcrumbCurrent}>Request Quote</span>
          </nav>
          <h1 className={styles.heroTitle}>Request Quote</h1>
        </div>
      </section>

      {/* Main Universal Quote Section */}
      <section className={styles.uqSection}>
        <div className={styles.wrap}>
          <div className={styles.uqIntro}>
            <span className={styles.typeTag}>UNIVERSAL QUOTE</span>
            <h2>Tell Us What You Need</h2>
            <p>
              One quotation flow for product-specific, brand-specific, general,
              bulk, distributor, export and catalogue-origin enquiries.
            </p>
          </div>

          <div className={styles.uqLayout}>
            {/* Sticky Collapsible Quote Summary Sidebar */}
            <aside
              className={styles.uqContext}
              aria-labelledby="quoteSummaryTitle"
            >
              <button
                className={styles.uqSummaryToggle}
                type="button"
                aria-expanded={summaryOpen}
                onClick={() => setSummaryOpen(!summaryOpen)}
              >
                <h2 id="quoteSummaryTitle">Your Quote Summary</h2>
                <span
                  className={styles.uqSummaryToggleIcon}
                  style={{
                    transform: summaryOpen ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                  aria-hidden="true"
                >
                  ⌄
                </span>
              </button>

              {summaryOpen && (
                <div className={styles.uqSummaryContent}>
                  <p className={styles.uqSummaryIntro}>
                    Review your selections before sending your request.
                  </p>

                  <div className={styles.uqSummaryProduct}>
                    <div className={styles.uqSummaryVisual} aria-hidden="true">
                      <div className={styles.uqSummaryVisualPipette} />
                    </div>
                    <div className={styles.uqSummaryProductCopy}>
                      <span>{preferredBrand || "Any Brand / Multi"}</span>
                      <strong>
                        {selectedProductList.length > 0
                          ? `${selectedProductList.length} Model(s) Selected`
                          : "Choose product(s)"}
                      </strong>
                      <small>
                        {selectedCategories.length > 0
                          ? selectedCategories.join(", ")
                          : "No category selected"}
                      </small>
                    </div>
                  </div>

                  <div className={styles.uqSummaryList}>
                    <div className={styles.uqSummaryRow}>
                      <span>Products & quantities</span>
                      <div className={styles.uqSummaryProducts}>
                        {selectedProductList.length > 0 ? (
                          selectedProductList.map((p) => (
                            <div key={p.id} className={styles.uqSummaryProductRow}>
                              <span>{p.name}</span>
                              <strong>Qty: {selectedProducts[p.id]}</strong>
                            </div>
                          ))
                        ) : (
                          <span className={styles.uqSummaryProductRow}>
                            <span>No products selected</span>
                            <strong>—</strong>
                          </span>
                        )}
                      </div>
                    </div>

                    <div className={styles.uqSummaryRow}>
                      <span>Quote type</span>
                      <strong>{quoteType}</strong>
                    </div>

                    <div className={styles.uqSummaryRow}>
                      <span>Required by</span>
                      <strong>{requiredDate || "Not specified"}</strong>
                    </div>

                    <div className={styles.uqSummaryRow}>
                      <span>Destination</span>
                      <strong>{destinationCountry || country || "Not specified"}</strong>
                    </div>
                  </div>

                  <div className={styles.uqSummaryActions}>
                    <a className={styles.uqSummaryEdit} href="#product-requirement">
                      Edit Selection
                    </a>
                  </div>

                  <div className={styles.uqSummaryNote}>
                    <p>
                      <strong>Need help choosing a model?</strong> Our scientific sales team can recommend the exact configuration.
                    </p>
                  </div>
                </div>
              )}
            </aside>

            {/* Form Panel */}
            <section className={styles.uqFormPanel}>
              {submitted ? (
                <div className={styles.submittedCard}>
                  <div className={styles.submittedIcon} aria-hidden="true">
                    ✓
                  </div>
                  <h3>Quote Request Received</h3>
                  <p>
                    Thank you, <strong>{contactPerson}</strong>. Your universal quotation request for{" "}
                    <strong>{selectedProductList.length} product(s)</strong> has been logged. Our commercial sales engineers will prepare a formal proposal.
                  </p>
                  <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
                    <button
                      type="button"
                      className={styles.btnPrimary}
                      onClick={() => setSubmitted(false)}
                    >
                      Submit Another Request
                    </button>
                    <Link
                      href="/products"
                      className={styles.btnPrimary}
                      style={{ background: "var(--deep-navy-blue)", borderColor: "var(--deep-navy-blue)" }}
                    >
                      Browse Products
                    </Link>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className={styles.uqForm}>
                  {/* Block 01: Contact Information */}
                  <div className={styles.uqBlock}>
                    <div className={styles.uqBlockHead}>
                      <span>01</span>
                      <div>
                        <h3>Contact Information</h3>
                        <p>Who should our commercial sales team contact?</p>
                      </div>
                    </div>
                    <div className={styles.uqGrid}>
                      <label>
                        <span>Contact Person *</span>
                        <input
                          type="text"
                          placeholder="Enter full name"
                          required
                          value={contactPerson}
                          onChange={(e) => setContactPerson(e.target.value)}
                        />
                      </label>
                      <label>
                        <span>Company Name *</span>
                        <input
                          type="text"
                          placeholder="Enter company name"
                          required
                          value={companyName}
                          onChange={(e) => setCompanyName(e.target.value)}
                        />
                      </label>
                      <label>
                        <span>Email *</span>
                        <input
                          type="email"
                          placeholder="name@company.com"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </label>
                      <label>
                        <span>Phone / WhatsApp</span>
                        <input
                          type="tel"
                          placeholder="+91 ..."
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </label>
                      <label>
                        <span>Country *</span>
                        <select
                          required
                          value={country}
                          onChange={(e) => setCountry(e.target.value)}
                        >
                          <option value="" disabled>
                            Select country
                          </option>
                          {COUNTRIES.map((c) => (
                            <option key={c} value={c}>
                              {c}
                            </option>
                          ))}
                        </select>
                      </label>
                      <label>
                        <span>Buyer Type</span>
                        <select
                          value={buyerType}
                          onChange={(e) => setBuyerType(e.target.value)}
                        >
                          <option value="">Select buyer type</option>
                          {BUYER_TYPES.map((bt) => (
                            <option key={bt} value={bt}>
                              {bt}
                            </option>
                          ))}
                        </select>
                      </label>
                    </div>
                  </div>

                  {/* Block 02: Product & Brand Requirement */}
                  <div className={styles.uqBlock} id="product-requirement">
                    <div className={styles.uqBlockHead}>
                      <span>02</span>
                      <div>
                        <h3>Product & Brand Requirement</h3>
                        <p>
                          Select one or multiple categories and products. Multi-selection is fully supported.
                        </p>
                      </div>
                    </div>

                    <div className={styles.uqGrid}>
                      {/* Category Chips */}
                      <div className={styles.uqField}>
                        <span className={styles.uqLabel}>Product Categories *</span>
                        <div className={styles.categoryChipGrid}>
                          {CATEGORIES.map((cat) => {
                            const active = selectedCategories.includes(cat);
                            return (
                              <button
                                key={cat}
                                type="button"
                                className={`${styles.categoryChip} ${active ? styles.active : ""}`}
                                onClick={() => toggleCategory(cat)}
                              >
                                {active ? "✓ " : "+ "}
                                {cat}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Preferred Brand */}
                      <label>
                        <span>Preferred Brand</span>
                        <select
                          value={preferredBrand}
                          onChange={(e) => setPreferredBrand(e.target.value)}
                        >
                          <option value="">No preference / Select brand</option>
                          {PREFERRED_BRANDS.map((b) => (
                            <option key={b} value={b}>
                              {b}
                            </option>
                          ))}
                        </select>
                      </label>

                      {/* Products Multi-Selection with Search */}
                      <div className={`${styles.uqField} ${styles.uqSpan2}`}>
                        <span className={styles.uqLabel}>Products / Models</span>
                        <div className={styles.productSearchWrap}>
                          <input
                            type="search"
                            className={styles.productSearchInput}
                            placeholder="Search product or model..."
                            value={productSearch}
                            onChange={(e) => setProductSearch(e.target.value)}
                          />
                          <div className={styles.productCheckList}>
                            {filteredProducts.map((p) => {
                              const isSelected = selectedProducts[p.id] !== undefined;
                              return (
                                <label key={p.id} className={styles.productCheckItem}>
                                  <input
                                    type="checkbox"
                                    checked={isSelected}
                                    onChange={() => toggleProduct(p.id)}
                                  />
                                  <span>{p.name}</span>
                                </label>
                              );
                            })}
                          </div>
                        </div>
                        <small>Check items to include them in the quotation table below.</small>
                      </div>

                      {/* Quantities Table */}
                      <div className={`${styles.uqField} ${styles.uqSpan2}`}>
                        <span className={styles.uqLabel}>Selected Products & Quantities</span>
                        <div className={styles.uqQtyTable}>
                          <div className={styles.uqQtyHead}>
                            <span>Product / Model</span>
                            <span>Quantity</span>
                            <span>Action</span>
                          </div>
                          <div className={styles.uqQtyList}>
                            {selectedProductList.length > 0 ? (
                              selectedProductList.map((p) => (
                                <div key={p.id} className={styles.uqQtyRow}>
                                  <span>{p.name}</span>
                                  <input
                                    type="number"
                                    min="1"
                                    value={selectedProducts[p.id]}
                                    onChange={(e) =>
                                      updateQuantity(p.id, parseInt(e.target.value) || 1)
                                    }
                                  />
                                  <button
                                    type="button"
                                    className={styles.uqQtyRemove}
                                    title="Remove item"
                                    onClick={() => removeProduct(p.id)}
                                  >
                                    ✕
                                  </button>
                                </div>
                              ))
                            ) : (
                              <div className={styles.uqQtyEmpty}>
                                Select a product or model above to add a quantity.
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <label>
                        <span>Required By Date</span>
                        <input
                          type="date"
                          value={requiredDate}
                          onChange={(e) => setRequiredDate(e.target.value)}
                        />
                      </label>

                      <label>
                        <span>Destination / Delivery Country</span>
                        <input
                          type="text"
                          placeholder="Enter destination country"
                          value={destinationCountry}
                          onChange={(e) => setDestinationCountry(e.target.value)}
                        />
                      </label>
                    </div>
                  </div>

                  {/* Block 03: Quote Type */}
                  <div className={styles.uqBlock}>
                    <div className={styles.uqBlockHead}>
                      <span>03</span>
                      <div>
                        <h3>Quote Type</h3>
                        <p>Select the commercial requirement that best matches your enquiry.</p>
                      </div>
                    </div>
                    <div className={styles.uqChoiceGrid}>
                      {QUOTE_TYPES.map((qt) => {
                        const active = quoteType === qt.value;
                        return (
                          <label
                            key={qt.value}
                            className={`${styles.uqChoiceCard} ${active ? styles.active : ""}`}
                          >
                            <input
                              type="radio"
                              name="quote-type"
                              value={qt.value}
                              checked={active}
                              onChange={() => setQuoteType(qt.value)}
                            />
                            <span>
                              <strong>{qt.title}</strong>
                              <small>{qt.desc}</small>
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  {/* Block 04: Additional Requirement */}
                  <div className={styles.uqBlock}>
                    <div className={styles.uqBlockHead}>
                      <span>04</span>
                      <div>
                        <h3>Additional Requirement</h3>
                        <p>Add specifications, branding information or purchasing notes.</p>
                      </div>
                    </div>
                    <div className={styles.uqGrid}>
                      <label className={styles.uqSpan2}>
                        <span>Requirement / Message</span>
                        <textarea
                          rows={5}
                          placeholder="Tell us about specifications, volume range, quantity, branding, packaging, delivery destination or other requirements..."
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                        />
                      </label>
                      <label className={styles.uqSpan2}>
                        <span>Upload Requirement File</span>
                        <input type="file" />
                        <small>Optional — purchase list, specification sheet, logo artwork or supporting document.</small>
                      </label>
                    </div>
                  </div>

                  {/* Submit Bar */}
                  <div className={styles.uqSubmit}>
                    <label className={styles.uqConsent}>
                      <input
                        type="checkbox"
                        required
                        checked={consent}
                        onChange={(e) => setConsent(e.target.checked)}
                      />
                      <span>
                        I agree that the submitted information may be used to respond to this quotation request.
                      </span>
                    </label>
                    <button className={styles.btnPrimary} type="submit" disabled={submitting}>
                      {submitting ? "Submitting..." : "Submit Quote Request →"}
                    </button>
                  </div>
                </form>
              )}
            </section>
          </div>
        </div>
      </section>
    </div>
  );
}
