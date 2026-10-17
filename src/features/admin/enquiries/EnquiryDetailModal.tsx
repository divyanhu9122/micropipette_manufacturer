"use client";

import { useEffect, useState } from "react";
import styles from "../Admin.module.css";
import type { EnquiryItem, EnquiryStatus } from "../admin.data";

interface EnquiryDetailModalProps {
  enquiry: EnquiryItem | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateStatus: (id: string, newStatus: EnquiryStatus) => void;
  onShowToast: (msg: string) => void;
}

interface EnquiryDetailContentProps {
  enquiry: EnquiryItem;
  onClose: () => void;
  onUpdateStatus: (id: string, newStatus: EnquiryStatus) => void;
  onShowToast: (msg: string) => void;
}

function EnquiryDetailContent({
  enquiry,
  onClose,
  onUpdateStatus,
  onShowToast,
}: EnquiryDetailContentProps) {
  const [internalNotes, setInternalNotes] = useState(
    enquiry.internalNotes || "",
  );
  const [selectedStatus, setSelectedStatus] = useState<EnquiryStatus>(
    enquiry.status,
  );

  const handleSave = () => {
    onUpdateStatus(enquiry.id, selectedStatus);
    onShowToast(`Enquiry ${enquiry.id} updated successfully.`);
    onClose();
  };

  const handleQuickRespond = () => {
    onUpdateStatus(enquiry.id, "Responded");
    onShowToast(`Enquiry marked as Responded.`);
    onClose();
  };

  return (
    <div
      className={`${styles.modalDrawer} ${styles.modalDrawerOpen}`}
      role="dialog"
      aria-labelledby="modal-enquiry-title"
      aria-modal="true"
    >
      <div className={styles.modalHead}>
        <div>
          <div className={styles.eyebrow}>{enquiry.type}</div>
          <h2 id="modal-enquiry-title">{enquiry.company}</h2>
        </div>
        <button
          type="button"
          className="btn ghost small"
          onClick={onClose}
          aria-label="Close drawer"
          style={{ fontSize: "16px", minHeight: "32px", padding: "4px 8px" }}
        >
          ✕
        </button>
      </div>

      <div className={styles.modalBody}>
        <div className={styles.formGrid}>
          <div className={styles.formGroup}>
            <span className={styles.formLabel}>Contact Name</span>
            <input className={styles.field} readOnly value={enquiry.name} />
          </div>

          <div className={styles.formGroup}>
            <span className={styles.formLabel}>Company</span>
            <input className={styles.field} readOnly value={enquiry.company} />
          </div>

          <div className={styles.formGroup}>
            <span className={styles.formLabel}>Email Address</span>
            <input className={styles.field} readOnly value={enquiry.email} />
          </div>

          <div className={styles.formGroup}>
            <span className={styles.formLabel}>Phone / WhatsApp</span>
            <input className={styles.field} readOnly value={enquiry.phone} />
          </div>

          <div className={styles.formGroup}>
            <span className={styles.formLabel}>Country</span>
            <input className={styles.field} readOnly value={enquiry.country} />
          </div>

          <div className={styles.formGroup}>
            <span className={styles.formLabel}>Date Received</span>
            <input className={styles.field} readOnly value={enquiry.date} />
          </div>

          <div className={styles.formGroupSpan2}>
            <span className={styles.formLabel}>Product / Requirement</span>
            <input className={styles.field} readOnly value={enquiry.product} />
          </div>

          <div className={styles.formGroupSpan2}>
            <span className={styles.formLabel}>Requested Quantity</span>
            <input className={styles.field} readOnly value={enquiry.quantity} />
          </div>

          {enquiry.oemDetails && (
            <div
              className={styles.formGroupSpan2}
              style={{
                background: "#f0f7ff",
                padding: "12px",
                borderRadius: "9px",
                border: "1px solid #cfe0f2",
              }}
            >
              <span
                className={styles.formLabel}
                style={{ color: "var(--vermilion, #f04a2a)" }}
              >
                OEM Customization Specifications
              </span>
              <p
                style={{
                  margin: "4px 0 0",
                  fontSize: "12px",
                  color: "#18334f",
                }}
              >
                {enquiry.oemDetails}
              </p>
            </div>
          )}

          <div className={styles.formGroupSpan2}>
            <span className={styles.formLabel}>
              Customer Message / Inquiry Notes
            </span>
            <textarea
              className={styles.textarea}
              readOnly
              value={enquiry.message}
              style={{ background: "#fafcff" }}
            />
          </div>

          <div className={styles.formGroupSpan2}>
            <span className={styles.formLabel}>Update Inquiry Status</span>
            <select
              className={styles.select}
              value={selectedStatus}
              onChange={(e) =>
                setSelectedStatus(e.target.value as EnquiryStatus)
              }
              id="enquiry-status-select"
            >
              <option value="New">New (Unreviewed)</option>
              <option value="Open">Open (In Discussion)</option>
              <option value="Responded">Responded (Quote Sent)</option>
              <option value="Closed">Closed (Completed / Archived)</option>
            </select>
          </div>

          <div className={styles.formGroupSpan2}>
            <span className={styles.formLabel}>Internal Team Notes</span>
            <textarea
              className={styles.textarea}
              placeholder="Add internal notes for sales or engineering team..."
              value={internalNotes}
              onChange={(e) => setInternalNotes(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className={styles.modalFoot}>
        <button
          type="button"
          className="btn secondary"
          onClick={handleQuickRespond}
          id="enquiry-quick-respond-btn"
        >
          Mark as Responded
        </button>
        <button
          type="button"
          className="btn primary"
          onClick={handleSave}
          id="enquiry-save-btn"
        >
          Save Status & Notes
        </button>
      </div>
    </div>
  );
}

export default function EnquiryDetailModal({
  enquiry,
  isOpen,
  onClose,
  onUpdateStatus,
  onShowToast,
}: EnquiryDetailModalProps) {
  // Handle Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !enquiry) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className={`${styles.modalOverlay} ${styles.modalOverlayOpen}`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Keying the content by enquiry.id automatically resets state without setState in an effect */}
      <EnquiryDetailContent
        key={enquiry.id}
        enquiry={enquiry}
        onClose={onClose}
        onUpdateStatus={onUpdateStatus}
        onShowToast={onShowToast}
      />
    </>
  );
}
