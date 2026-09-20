"use client";

import { useEffect, useState } from "react";
import styles from "@/features/resources/catalogue-modal/CatalogueModal.module.css";
import { COUNTRIES } from "@/features/products/product-enquiry/product-enquiry.data";

interface CatalogueModalProps {
  isOpen: boolean;
  onClose: () => void;
  catalogueTitle?: string;
  categoryOrBrand?: string;
  fileSize?: string;
}

export default function CatalogueModal({
  isOpen,
  onClose,
  catalogueTitle = "Complete Micropipette & Lab Instruments Catalogue 2026",
  categoryOrBrand = "LABXE • SSCIENCES • DANWER",
  fileSize = "PDF [VERIFY FILE SIZE]",
}: CatalogueModalProps) {
  const [submitted, setSubmitted] = useState(false);
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
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
            <span className={styles.typeTag}>CATALOGUE DOWNLOAD</span>
            <h2 id="catalogModalTitle">Get the Complete Catalogue</h2>
            <p>
              Share your basic contact details and the catalogue will be available immediately after submission.
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
                  Required fields are marked with *. Catalogue access is shown immediately after successful submission.
                </small>
                <button className={styles.btnPrimary} type="submit">
                  Submit & Continue →
                </button>
              </div>
            </form>
          ) : (
            <div className={styles.catalogSuccess}>
              <div className={styles.catalogSuccessIcon} aria-hidden="true">
                ✓
              </div>
              <h3>Your catalogue is ready</h3>
              <p>
                Thank you, <strong>{formData.name}</strong>. You can now download the requested PDF catalogue for {categoryOrBrand}.
              </p>
              <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
                <a
                  className={styles.btnPrimary}
                  href="#download"
                  onClick={(e) => {
                    e.preventDefault();
                    alert("Download started for: " + catalogueTitle);
                  }}
                >
                  Download Catalogue ↓
                </a>
                <button
                  type="button"
                  className={styles.btnPrimary}
                  style={{ background: "transparent", color: "var(--deep-navy-blue)", border: "1px solid #d5e1f0", boxShadow: "none" }}
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
