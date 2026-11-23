"use client";

import { useState } from "react";
import { useSiteNavigation } from "@/features/site/SiteSettings";
import { submitEnquiry } from "@/features/enquiries/submit-enquiry";

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultProduct?: string;
}

export default function QuoteModal(props: QuoteModalProps) {
  if (!props.isOpen) return null;
  return (
    <QuoteModalContent key={props.defaultProduct || "general"} {...props} />
  );
}

function QuoteModalContent({ onClose, defaultProduct = "" }: QuoteModalProps) {
  const navigation = useSiteNavigation();
  const productOptions = Array.from(
    new Set([
      ...navigation.products.map((product) => product.title),
      ...navigation.categories.map((category) => category.name),
      defaultProduct,
    ]),
  ).filter(Boolean);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    productInterest: defaultProduct || "General product enquiry",
    quantity: "11-50 Units",
    message: "",
  });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setSubmissionError("");
    try {
      await submitEnquiry({
        name: formData.name,
        company: formData.company,
        email: formData.email,
        phone: formData.phone,
        country: "Not specified",
        type: "Product Quote",
        product: formData.productInterest,
        quantity: formData.quantity,
        message:
          formData.message ||
          `Quote request for ${formData.productInterest}. Estimated quantity: ${formData.quantity}.`,
      });
      setSubmitted(true);
    } catch (cause) {
      setSubmissionError(
        cause instanceof Error
          ? cause.message
          : "Your enquiry could not be saved. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-content"
        role="dialog"
        aria-modal="true"
        aria-label="Request a quotation"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="modal-close"
          onClick={onClose}
          aria-label="Close quote modal"
        >
          ✕
        </button>

        {submitted ? (
          <div style={{ textAlign: "center", padding: "30px 10px" }}>
            <div
              style={{
                width: 60,
                height: 60,
                borderRadius: "50%",
                background: "#eafaf1",
                color: "#27ae60",
                display: "grid",
                placeItems: "center",
                fontSize: 32,
                margin: "0 auto 16px",
              }}
            >
              ✓
            </div>
            <h3
              style={{
                fontSize: 24,
                margin: "0 0 10px",
                color: "var(--midnight-navy)",
              }}
            >
              Quote Request Received
            </h3>
            <p
              style={{
                color: "var(--slate-blue-gray)",
                fontSize: 15,
                margin: "0 0 20px",
              }}
            >
              Thank you, <strong>{formData.name}</strong>. Our commercial and
              technical team will review your request for{" "}
              <strong>{formData.productInterest}</strong> and respond shortly.
            </p>
            <button
              className="btn primary"
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
            >
              Back to Overview
            </button>
          </div>
        ) : (
          <div>
            <div className="eyebrow" style={{ marginBottom: 8 }}>
              DIRECT MANUFACTURER INQUIRY
            </div>
            <h2
              style={{
                fontSize: 24,
                margin: "0 0 8px",
                color: "var(--midnight-navy)",
              }}
            >
              Request B2B Quote & Technical Specs
            </h2>
            <p
              style={{
                color: "var(--slate-blue-gray)",
                fontSize: 14,
                margin: "0 0 20px",
              }}
            >
              Get direct factory pricing, OEM branding guidance, and bulk
              distributor terms.
            </p>

            <form
              onSubmit={handleSubmit}
              style={{ display: "flex", flexDirection: "column", gap: 14 }}
            >
              <div className="quote-fields">
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: 12,
                      fontWeight: 700,
                      marginBottom: 4,
                    }}
                  >
                    Full Name *
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="Dr. John Doe"
                    aria-label="Full name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    style={{
                      width: "100%",
                      padding: "10px 12px",
                      borderRadius: 10,
                      border: "1px solid #c8d8ea",
                      fontSize: 14,
                    }}
                  />
                </div>
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: 12,
                      fontWeight: 700,
                      marginBottom: 4,
                    }}
                  >
                    Company / Lab / Institute *
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="BioSciences Lab Ltd."
                    aria-label="Company or laboratory"
                    value={formData.company}
                    onChange={(e) =>
                      setFormData({ ...formData, company: e.target.value })
                    }
                    style={{
                      width: "100%",
                      padding: "10px 12px",
                      borderRadius: 10,
                      border: "1px solid #c8d8ea",
                      fontSize: 14,
                    }}
                  />
                </div>
              </div>

              <div className="quote-fields">
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: 12,
                      fontWeight: 700,
                      marginBottom: 4,
                    }}
                  >
                    Business Email *
                  </label>
                  <input
                    required
                    type="email"
                    placeholder="procurement@lab.com"
                    aria-label="Business email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    style={{
                      width: "100%",
                      padding: "10px 12px",
                      borderRadius: 10,
                      border: "1px solid #c8d8ea",
                      fontSize: 14,
                    }}
                  />
                </div>
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: 12,
                      fontWeight: 700,
                      marginBottom: 4,
                    }}
                  >
                    Phone / WhatsApp
                  </label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    aria-label="Phone or WhatsApp"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    style={{
                      width: "100%",
                      padding: "10px 12px",
                      borderRadius: 10,
                      border: "1px solid #c8d8ea",
                      fontSize: 14,
                    }}
                  />
                </div>
              </div>

              <div className="quote-fields quote-fields-interest">
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: 12,
                      fontWeight: 700,
                      marginBottom: 4,
                    }}
                  >
                    Product Category / Interest
                  </label>
                  <select
                    aria-label="Product category or interest"
                    value={formData.productInterest}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        productInterest: e.target.value,
                      })
                    }
                    style={{
                      width: "100%",
                      padding: "10px 12px",
                      borderRadius: 10,
                      border: "1px solid #c8d8ea",
                      fontSize: 14,
                      background: "#fff",
                    }}
                  >
                    <option value="General product enquiry">
                      General product enquiry
                    </option>
                    {productOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: 12,
                      fontWeight: 700,
                      marginBottom: 4,
                    }}
                  >
                    Estimated Quantity
                  </label>
                  <select
                    aria-label="Estimated quantity"
                    value={formData.quantity}
                    onChange={(e) =>
                      setFormData({ ...formData, quantity: e.target.value })
                    }
                    style={{
                      width: "100%",
                      padding: "10px 12px",
                      borderRadius: 10,
                      border: "1px solid #c8d8ea",
                      fontSize: 14,
                      background: "#fff",
                    }}
                  >
                    <option value="1-10 Units (Evaluation)">
                      1-10 Units (Evaluation)
                    </option>
                    <option value="11-50 Units">11-50 Units</option>
                    <option value="50-200 Units (Bulk)">
                      50-200 Units (Bulk)
                    </option>
                    <option value="500+ Units (OEM / Distributor)">
                      500+ Units (OEM / Distributor)
                    </option>
                  </select>
                </div>
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: 12,
                    fontWeight: 700,
                    marginBottom: 4,
                  }}
                >
                  Specific Requirements or Target Specifications
                </label>
                <textarea
                  rows={3}
                  placeholder="Volume range, custom branding requirements, export country, calibration certification..."
                  aria-label="Specific requirements"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    borderRadius: 10,
                    border: "1px solid #c8d8ea",
                    fontSize: 14,
                  }}
                />
              </div>

              {submissionError && (
                <p role="alert" style={{ color: "#b42318", padding: "12px 0" }}>
                  {submissionError}
                </p>
              )}
              <div className="quote-actions">
                <button
                  type="button"
                  className="btn ghost"
                  style={{ color: "var(--slate-blue-gray)" }}
                  onClick={onClose}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn primary"
                  disabled={submitting}
                  aria-busy={submitting}
                >
                  {submitting ? "Submitting…" : "Submit RFP / Quote Request →"}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
