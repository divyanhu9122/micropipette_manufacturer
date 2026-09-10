"use client";

import { useState } from "react";

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultProduct?: string;
}

export default function QuoteModal({ isOpen, onClose, defaultProduct = "" }: QuoteModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    productInterest: defaultProduct || "Variable Volume Micropipettes",
    quantity: "50-100",
    message: "",
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close quote modal">
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
            <h3 style={{ fontSize: 24, margin: "0 0 10px", color: "var(--midnight-navy)" }}>
              Quote Request Received
            </h3>
            <p style={{ color: "var(--slate-blue-gray)", fontSize: 15, margin: "0 0 20px" }}>
              Thank you, <strong>{formData.name}</strong>. Our commercial and technical team will review
              your request for <strong>{formData.productInterest}</strong> and respond within 24 hours.
            </p>
            <button className="btn primary" onClick={() => { setSubmitted(false); onClose(); }}>
              Back to Overview
            </button>
          </div>
        ) : (
          <div>
            <div className="eyebrow" style={{ marginBottom: 8 }}>
              DIRECT MANUFACTURER INQUIRY
            </div>
            <h2 style={{ fontSize: 24, margin: "0 0 8px", color: "var(--midnight-navy)" }}>
              Request B2B Quote & Technical Specs
            </h2>
            <p style={{ color: "var(--slate-blue-gray)", fontSize: 14, margin: "0 0 20px" }}>
              Get direct factory pricing, OEM branding guidance, and bulk distributor terms.
            </p>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div className="quote-fields">
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 700, marginBottom: 4 }}>
                    Full Name *
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="Dr. John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                  <label style={{ display: "block", fontSize: 12, fontWeight: 700, marginBottom: 4 }}>
                    Company / Lab / Institute *
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="BioSciences Lab Ltd."
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
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
                  <label style={{ display: "block", fontSize: 12, fontWeight: 700, marginBottom: 4 }}>
                    Business Email *
                  </label>
                  <input
                    required
                    type="email"
                    placeholder="procurement@lab.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
                  <label style={{ display: "block", fontSize: 12, fontWeight: 700, marginBottom: 4 }}>
                    Phone / WhatsApp
                  </label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
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
                  <label style={{ display: "block", fontSize: 12, fontWeight: 700, marginBottom: 4 }}>
                    Product Category / Interest
                  </label>
                  <select
                    value={formData.productInterest}
                    onChange={(e) => setFormData({ ...formData, productInterest: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "10px 12px",
                      borderRadius: 10,
                      border: "1px solid #c8d8ea",
                      fontSize: 14,
                      background: "#fff",
                    }}
                  >
                    <option value="Variable Volume Single Channel">Variable Volume Single Channel</option>
                    <option value="Fixed Volume Single Channel">Fixed Volume Single Channel</option>
                    <option value="8 & 12 Multichannel Pipettes">8 & 12 Multichannel Pipettes</option>
                    <option value="Electronic Pipettes">Electronic Pipettes</option>
                    <option value="Pipette Tips & Accessories">Pipette Tips & Accessories</option>
                    <option value="Bottle Top Dispensers">Bottle Top Dispensers</option>
                    <option value="OEM / Private Label Manufacturing">OEM / Private Label Manufacturing</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 700, marginBottom: 4 }}>
                    Estimated Quantity
                  </label>
                  <select
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "10px 12px",
                      borderRadius: 10,
                      border: "1px solid #c8d8ea",
                      fontSize: 14,
                      background: "#fff",
                    }}
                  >
                    <option value="1-10 Units (Evaluation)">1-10 Units (Evaluation)</option>
                    <option value="11-50 Units">11-50 Units</option>
                    <option value="50-200 Units (Bulk)">50-200 Units (Bulk)</option>
                    <option value="500+ Units (OEM / Distributor)">500+ Units (OEM / Distributor)</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: "block", fontSize: 12, fontWeight: 700, marginBottom: 4 }}>
                  Specific Requirements or Target Specifications
                </label>
                <textarea
                  rows={3}
                  placeholder="Volume range, custom branding requirements, export country, calibration certification..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    borderRadius: 10,
                    border: "1px solid #c8d8ea",
                    fontSize: 14,
                  }}
                />
              </div>

              <div className="quote-actions">
                <button type="button" className="btn ghost" style={{ color: "var(--slate-blue-gray)" }} onClick={onClose}>
                  Cancel
                </button>
                <button type="submit" className="btn primary">
                  Submit RFP / Quote Request →
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
