"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./ProductEnquiry.module.css";
import {
  COUNTRY_CALLING_CODES,
  COUNTRIES,
  PREFERRED_BRANDS,
  REQUIREMENT_TYPES,
} from "./product-enquiry.data";
import type { ProductDetailItem } from "../product-detail/product-detail.data";

interface ProductEnquiryFormProps {
  product: ProductDetailItem;
}

export default function ProductEnquiryForm({ product }: ProductEnquiryFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState<{
    contactPerson: string;
    companyName: string;
    email: string;
    phoneCode: string;
    phoneNumber: string;
    country: string;
    quantity: string;
    preferredBrand: string;
    requirementType: string;
    targetDate: string;
    message: string;
    consent: boolean;
  }>({
    contactPerson: "",
    companyName: "",
    email: "",
    phoneCode: "+91",
    phoneNumber: "",
    country: "",
    quantity: "10",
    preferredBrand: (product.brand as string) || "SSCIENCES",
    requirementType: "Standard Product Purchase",
    targetDate: "",
    message: "",
    consent: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    // Simulate enquiry workflow submission
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 400);
  };

  if (submitted) {
    return (
      <section className={styles.rqFormCard}>
        <div className={styles.submittedCard}>
          <div className={styles.submittedIcon} aria-hidden="true">
            ✓
          </div>
          <h3>Enquiry Submitted Successfully</h3>
          <p>
            Thank you, <strong>{formData.contactPerson}</strong>. Your quotation request for{" "}
            <strong>{product.title}</strong> has been logged. Our commercial sales team will review your specifications and respond shortly.
          </p>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            <button
              type="button"
              className={styles.btnPrimary}
              onClick={() => setSubmitted(false)}
            >
              Submit Another Request
            </button>
            <Link href={`/products/${product.slug}`} className={styles.btnSecondary} style={{ color: "var(--midnight-navy)", borderColor: "#d5e1f0" }}>
              Back to Product Details
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.rqFormCard}>
      <div className={styles.rqHead}>
        <span className={styles.typeTag}>PRODUCT ENQUIRY</span>
        <h2>Tell Us Your Requirement</h2>
        <p>Share your contact and requirement details. Fields marked with * are required.</p>
      </div>

      <form className={styles.rqForm} onSubmit={handleSubmit}>
        <div className={styles.rqGrid}>
          <label>
            <span>Contact Person *</span>
            <input
              type="text"
              placeholder="Enter full name"
              required
              value={formData.contactPerson}
              onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
            />
          </label>

          <label>
            <span>Company Name *</span>
            <input
              type="text"
              placeholder="Enter company name"
              required
              value={formData.companyName}
              onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
            />
          </label>

          <label>
            <span>Email Address *</span>
            <input
              type="email"
              placeholder="name@company.com"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </label>

          <label>
            <span>Phone / WhatsApp</span>
            <div className={styles.rqPhoneFields}>
              <select
                aria-label="Country calling code"
                value={formData.phoneCode}
                onChange={(e) => setFormData({ ...formData, phoneCode: e.target.value })}
              >
                <option value="">Code</option>
                {COUNTRY_CALLING_CODES.map((item) => (
                  <option key={`${item.code}-${item.country}`} value={item.code}>
                    {item.code} — {item.country}
                  </option>
                ))}
              </select>
              <input
                type="tel"
                placeholder="Enter phone number"
                value={formData.phoneNumber}
                onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
              />
            </div>
          </label>

          <label>
            <span>Country *</span>
            <select
              required
              value={formData.country}
              onChange={(e) => setFormData({ ...formData, country: e.target.value })}
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
            <span>Required Quantity *</span>
            <input
              type="number"
              min="1"
              placeholder="Enter quantity"
              required
              value={formData.quantity}
              onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
            />
          </label>

          <label className={styles.span2}>
            <span>Selected Product</span>
            <input
              type="text"
              value={`${product.title} (SKU: ${product.productCode})`}
              readOnly
            />
          </label>

          <label>
            <span>Preferred Brand</span>
            <select
              value={formData.preferredBrand}
              onChange={(e) => setFormData({ ...formData, preferredBrand: e.target.value })}
            >
              <option value="">Select brand</option>
              {PREFERRED_BRANDS.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </label>

          <label>
            <span>Requirement Type</span>
            <select
              value={formData.requirementType}
              onChange={(e) => setFormData({ ...formData, requirementType: e.target.value })}
            >
              {REQUIREMENT_TYPES.map((rt) => (
                <option key={rt} value={rt}>
                  {rt}
                </option>
              ))}
            </select>
          </label>

          <label className={styles.span2}>
            <span>Target Requirement Date</span>
            <input
              type="date"
              value={formData.targetDate}
              onChange={(e) => setFormData({ ...formData, targetDate: e.target.value })}
            />
          </label>

          <label className={styles.span2}>
            <span>Additional Requirement / Message</span>
            <textarea
              rows={5}
              placeholder="Tell us about volume range, quantity, branding, packaging, target market or any technical requirement..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            />
          </label>

          <label className={styles.span2}>
            <span>Attach Reference File</span>
            <input type="file" />
            <small>Optional — requirement sheet, logo artwork, drawings or supporting document.</small>
          </label>
        </div>

        <div className={styles.rqConsent}>
          <label>
            <input
              type="checkbox"
              required
              checked={formData.consent}
              onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
            />
            <span>I agree to be contacted regarding this quotation enquiry.</span>
          </label>
        </div>

        <div className={styles.rqSubmit}>
          <div className={styles.rqTrust}>
            <span>✓ Product pre-selected</span>
            <span>✓ B2B enquiry workflow</span>
            <span>✓ CMS-ready structure</span>
          </div>
          <button className={styles.btnPrimary} type="submit" disabled={submitting}>
            {submitting ? "Submitting..." : "Submit Enquiry →"}
          </button>
        </div>
      </form>
    </section>
  );
}
