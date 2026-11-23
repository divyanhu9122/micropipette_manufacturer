"use client";

import { useEffect, useState } from "react";
import { submitEnquiry } from "@/features/enquiries/submit-enquiry";
import styles from "@/features/resources/catalogue-modal/CatalogueModal.module.css";
import { COUNTRIES } from "@/features/products/product-enquiry/product-enquiry.data";

interface CatalogueModalProps {
  isOpen: boolean;
  onClose: () => void;
  catalogueTitle?: string;
  categoryOrBrand?: string;
  fileSize?: string;
  downloadUrl?: string;
}

export default function CatalogueModal({
  isOpen,
  onClose,
  catalogueTitle = "Product catalogue",
  categoryOrBrand = "Laboratory instruments",
  fileSize = "PDF",
  downloadUrl,
}: CatalogueModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    country: "",
    message: "",
  });

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setSubmissionError("");
    try {
      await submitEnquiry({
        ...formData,
        country: formData.country || "Not specified",
        type: "Technical Resource",
        product: catalogueTitle,
        message: formData.message || `Catalogue request for ${catalogueTitle}`,
      });
      setSubmitted(true);
    } catch (cause) {
      setSubmissionError(
        cause instanceof Error
          ? cause.message
          : "Your request could not be saved. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={styles.catalogModalBackdrop}
      onClick={handleBackdropClick}
      role="presentation"
    >
      <section
        className={styles.catalogModal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="catalogModalTitle"
      >
        <div className={styles.catalogModalHead}>
          <div>
            <span className={styles.typeTag}>Catalogue download</span>
            <h2 id="catalogModalTitle">Get the Complete Catalogue</h2>
            <p>
              Share your contact details to request the catalogue from our team.
            </p>
          </div>
          <button
            className={styles.catalogClose}
            type="button"
            aria-label="Close catalogue modal"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        <div className={styles.catalogModalBody}>
          <div className={styles.catalogFileSummary}>
            <div className={styles.catalogPdfIcon} aria-hidden="true">
              PDF
            </div>
            <div>
              <strong>{catalogueTitle}</strong>
              <span>
                {categoryOrBrand} • {fileSize}
              </span>
            </div>
          </div>

          {!submitted ? (
            <form onSubmit={handleSubmit}>
              {submissionError && (
                <p role="alert" style={{ color: "#b42318", padding: "12px 0" }}>
                  {submissionError}
                </p>
              )}
              <div className={styles.catalogFormGrid}>
                <label className={styles.catalogField}>
                  <span>Name *</span>
                  <input
                    type="text"
                    required
                    placeholder="Your full name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </label>

                <label className={styles.catalogField}>
                  <span>Company *</span>
                  <input
                    type="text"
                    required
                    placeholder="Company name"
                    value={formData.company}
                    onChange={(e) =>
                      setFormData({ ...formData, company: e.target.value })
                    }
                  />
                </label>

                <label className={styles.catalogField}>
                  <span>Email *</span>
                  <input
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </label>

                <label className={styles.catalogField}>
                  <span>Phone / WhatsApp *</span>
                  <input
                    type="tel"
                    required
                    placeholder="+91 ..."
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                  />
                </label>

                <label className={`${styles.catalogField} ${styles.full}`}>
                  <span>Country *</span>
                  <select
                    required
                    value={formData.country}
                    onChange={(e) =>
                      setFormData({ ...formData, country: e.target.value })
                    }
                  >
                    <option value="" disabled>
                      Select your country
                    </option>
                    {COUNTRIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </label>

                <label className={`${styles.catalogField} ${styles.full}`}>
                  <span>Requirement / Message</span>
                  <textarea
                    rows={3}
                    placeholder="Optional — tell us what products or quantities you are interested in."
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                  />
                </label>
              </div>

              <div className={styles.catalogActions}>
                <small>
                  Required fields are marked with *. Our team will help with
                  your catalogue request.
                </small>
                <button
                  className={styles.btnPrimary}
                  type="submit"
                  disabled={submitting}
                  aria-busy={submitting}
                >
                  {submitting ? "Submitting…" : "Submit & Continue →"}
                </button>
              </div>
            </form>
          ) : (
            <div className={styles.catalogSuccess}>
              <div className={styles.catalogSuccessIcon} aria-hidden="true">
                ✓
              </div>
              <h3>
                {downloadUrl
                  ? "Your catalogue is ready"
                  : "Catalogue request received"}
              </h3>
              <p>
                Thank you, <strong>{formData.name}</strong>.{" "}
                {downloadUrl
                  ? "You can download your requested catalogue below."
                  : "Our team will contact you with the requested catalogue."}
              </p>
              <div
                style={{
                  display: "flex",
                  gap: "12px",
                  justifyContent: "center",
                  flexWrap: "wrap",
                }}
              >
                {downloadUrl && (
                  <a className={styles.btnPrimary} href={downloadUrl} download>
                    Download Catalogue ↓
                  </a>
                )}
                <button
                  type="button"
                  className={styles.btnPrimary}
                  style={{
                    background: "transparent",
                    color: "var(--deep-navy-blue)",
                    border: "1px solid #d5e1f0",
                    boxShadow: "none",
                  }}
                  onClick={() => {
                    setSubmitted(false);
                    onClose();
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
