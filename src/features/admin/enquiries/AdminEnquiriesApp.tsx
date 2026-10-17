"use client";

import { useMemo, useState } from "react";
import styles from "../Admin.module.css";
import {
  INITIAL_ENQUIRIES,
  type EnquiryItem,
  type EnquiryStatus,
} from "../admin.data";
import EnquiryDetailModal from "./EnquiryDetailModal";

export default function AdminEnquiriesApp() {
  const [enquiries, setEnquiries] = useState<EnquiryItem[]>(INITIAL_ENQUIRIES);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string>("All");
  const [selectedStatus, setSelectedStatus] = useState<string>("All");

  const [activeEnquiry, setActiveEnquiry] = useState<EnquiryItem | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const filteredEnquiries = useMemo(() => {
    return enquiries.filter((item) => {
      // Search match
      const q = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.company.toLowerCase().includes(q) ||
        item.email.toLowerCase().includes(q) ||
        item.product.toLowerCase().includes(q) ||
        item.country.toLowerCase().includes(q);

      // Type match
      const matchesType = selectedType === "All" || item.type === selectedType;

      // Status match
      const matchesStatus =
        selectedStatus === "All" || item.status === selectedStatus;

      return matchesQuery && matchesType && matchesStatus;
    });
  }, [enquiries, searchQuery, selectedType, selectedStatus]);

  const counts = useMemo(() => {
    return {
      all: enquiries.length,
      new: enquiries.filter((e) => e.status === "New").length,
      open: enquiries.filter((e) => e.status === "Open").length,
      responded: enquiries.filter((e) => e.status === "Responded").length,
      closed: enquiries.filter((e) => e.status === "Closed").length,
    };
  }, [enquiries]);

  const handleOpenModal = (enq: EnquiryItem) => {
    setActiveEnquiry(enq);
    setModalOpen(true);
  };

  const handleUpdateStatus = (id: string, newStatus: EnquiryStatus) => {
    setEnquiries((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: newStatus } : item,
      ),
    );
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3500);
  };

  const handleExportCsv = () => {
    if (filteredEnquiries.length === 0) {
      showToast("No enquiries to export.");
      return;
    }

    const headers = [
      "ID",
      "Name",
      "Company",
      "Email",
      "Phone",
      "Country",
      "Type",
      "Product",
      "Quantity",
      "Date",
      "Status",
      "Message",
    ];

    const rows = filteredEnquiries.map((e) => [
      `"${e.id}"`,
      `"${e.name.replace(/"/g, '""')}"`,
      `"${e.company.replace(/"/g, '""')}"`,
      `"${e.email}"`,
      `"${e.phone}"`,
      `"${e.country}"`,
      `"${e.type}"`,
      `"${e.product.replace(/"/g, '""')}"`,
      `"${e.quantity.replace(/"/g, '""')}"`,
      `"${e.date}"`,
      `"${e.status}"`,
      `"${e.message.replace(/"/g, '""')}"`,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `micropipette_enquiries_${new Date().toISOString().slice(0, 10)}.csv`,
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast(`Exported ${filteredEnquiries.length} enquiries to CSV.`);
  };

  return (
    <div className={styles.workspace}>
      {/* Header */}
      <div className={styles.pageHead}>
        <div>
          <div className={styles.eyebrow}>Phase 4.10 · Enquiry Management</div>
          <h1>B2B Enquiries & Quotations</h1>
          <p className={styles.pageDesc}>
            Manage incoming product quotes, distributor partnerships, bulk
            orders, and custom OEM private-label requirements in one centralized
            workspace.
          </p>
        </div>
        <div className={styles.pageActions}>
          <button
            type="button"
            className="btn secondary"
            onClick={handleExportCsv}
            id="export-enquiries-btn"
          >
            ↓ Export CSV ({filteredEnquiries.length})
          </button>
        </div>
      </div>

      {/* Quick Status Count Pills */}
      <div
        style={{
          display: "flex",
          gap: "8px",
          flexWrap: "wrap",
          marginBottom: "16px",
        }}
      >
        <button
          type="button"
          onClick={() => setSelectedStatus("All")}
          className={`btn ${selectedStatus === "All" ? "primary" : "secondary"} small`}
        >
          All ({counts.all})
        </button>
        <button
          type="button"
          onClick={() => setSelectedStatus("New")}
          className={`btn ${selectedStatus === "New" ? "primary" : "secondary"} small`}
        >
          New ({counts.new})
        </button>
        <button
          type="button"
          onClick={() => setSelectedStatus("Open")}
          className={`btn ${selectedStatus === "Open" ? "primary" : "secondary"} small`}
        >
          Open ({counts.open})
        </button>
        <button
          type="button"
          onClick={() => setSelectedStatus("Responded")}
          className={`btn ${selectedStatus === "Responded" ? "primary" : "secondary"} small`}
        >
          Responded ({counts.responded})
        </button>
        <button
          type="button"
          onClick={() => setSelectedStatus("Closed")}
          className={`btn ${selectedStatus === "Closed" ? "primary" : "secondary"} small`}
        >
          Closed ({counts.closed})
        </button>
      </div>

      {/* Toolbar / Search & Filters */}
      <div className={styles.toolbar}>
        <div className={styles.toolbarLeft}>
          <div className={styles.searchBox}>
            <svg viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-4-4" />
            </svg>
            <input
              type="text"
              placeholder="Search by contact, company, email, or product..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              id="enquiry-search-input"
            />
          </div>

          <select
            className={styles.select}
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            id="filter-enquiry-type"
          >
            <option value="All">All Enquiry Types</option>
            <option value="Product Quote">Product Quote</option>
            <option value="OEM / Private Label">OEM / Private Label</option>
            <option value="Universal / General">Universal / General</option>
            <option value="Technical Resource">Technical Resource</option>
            <option value="Bulk Requirement">Bulk Requirement</option>
          </select>

          <select
            className={styles.select}
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            id="filter-enquiry-status"
          >
            <option value="All">All Statuses</option>
            <option value="New">New</option>
            <option value="Open">Open</option>
            <option value="Responded">Responded</option>
            <option value="Closed">Closed</option>
          </select>
        </div>

        <div style={{ fontSize: "12px", color: "#62758d" }}>
          Showing <strong>{filteredEnquiries.length}</strong> of{" "}
          {enquiries.length} records
        </div>
      </div>

      {/* Enquiries Table Panel */}
      <article className={styles.panel}>
        <div className={styles.tableWrap}>
          <table className={styles.dataTable} id="enquiries-management-table">
            <thead>
              <tr>
                <th>Contact</th>
                <th>Company</th>
                <th>Enquiry Type</th>
                <th>Product / Requirement</th>
                <th>Country</th>
                <th>Date Received</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEnquiries.length > 0 ? (
                filteredEnquiries.map((enq) => (
                  <tr key={enq.id}>
                    <td className={styles.primaryCell}>
                      {enq.name}
                      <span className={styles.subline}>{enq.email}</span>
                    </td>
                    <td>
                      <strong>{enq.company}</strong>
                    </td>
                    <td>
                      <span className={styles.typeBadge}>{enq.type}</span>
                    </td>
                    <td style={{ maxWidth: "260px" }}>
                      <div
                        style={{
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                        title={enq.product}
                      >
                        {enq.product}
                      </div>
                      <span className={styles.subline}>{enq.quantity}</span>
                    </td>
                    <td>{enq.country}</td>
                    <td>{enq.date}</td>
                    <td>
                      <span
                        className={`${styles.status} ${
                          enq.status === "New"
                            ? styles.statusNew
                            : enq.status === "Open"
                              ? styles.statusOpen
                              : enq.status === "Responded"
                                ? styles.statusResponded
                                : styles.statusClosed
                        }`}
                      >
                        {enq.status}
                      </span>
                    </td>
                    <td>
                      <button
                        type="button"
                        className="btn secondary small"
                        onClick={() => handleOpenModal(enq)}
                        id={`btn-view-${enq.id}`}
                      >
                        Review →
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={8}
                    style={{ textAlign: "center", padding: "40px 20px" }}
                  >
                    <div style={{ color: "#62758d", fontSize: "14px" }}>
                      No enquiries match your current search and filter
                      criteria.
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </article>

      {/* Slide-over Drawer Modal */}
      <EnquiryDetailModal
        enquiry={activeEnquiry}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onUpdateStatus={handleUpdateStatus}
        onShowToast={showToast}
      />

      {/* Floating Action Feedback Toast */}
      {toastMessage && <div className={styles.toast}>{toastMessage}</div>}
    </div>
  );
}
