"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "../Admin.module.css";
import {
  ADMIN_KPIS,
  INITIAL_ENQUIRIES,
  RECENT_PRODUCT_ACTIVITIES,
  RECENT_CONTENT_ITEMS,
  type EnquiryItem,
  type EnquiryStatus,
} from "../admin.data";
import EnquiryDetailModal from "../enquiries/EnquiryDetailModal";

export default function AdminDashboardApp() {
  const [enquiries, setEnquiries] = useState<EnquiryItem[]>(INITIAL_ENQUIRIES);
  const [selectedEnquiry, setSelectedEnquiry] = useState<EnquiryItem | null>(
    null,
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const handleOpenEnquiry = (enq: EnquiryItem) => {
    setSelectedEnquiry(enq);
    setModalOpen(true);
  };

  const handleUpdateStatus = (id: string, newStatus: EnquiryStatus) => {
    setEnquiries((prev) =>
      prev.map((e) => (e.id === id ? { ...e, status: newStatus } : e)),
    );
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3500);
  };

  return (
    <div className={styles.workspace}>
      {/* Header */}
      <div className={styles.pageHead}>
        <div>
          <div className={styles.eyebrow}>Phase 4 · Overview</div>
          <h1>Dashboard Overview</h1>
          <p className={styles.pageDesc}>
            A concise operating view of products, laboratory documents, content,
            and incoming B2B inquiries across LABXE, SSCIENCES, and DANWER.
          </p>
        </div>
        <div className={styles.prototypeBanner} style={{ margin: 0 }}>
          <strong>Prototype Mode:</strong> Connected to mock operational data.
          Ready for Strapi backend integration.
        </div>
      </div>

      {/* KPI Cards */}
      <div className={styles.kpis}>
        {ADMIN_KPIS.map((kpi) => (
          <article key={kpi.id} className={styles.kpi}>
            <div className={styles.kpiTop}>
              <div className={styles.kpiLabel}>{kpi.label}</div>
              <div className={styles.kpiIcon}>{kpi.icon}</div>
            </div>
            <div className={styles.kpiValue}>{kpi.value}</div>
            <div className={styles.kpiFoot}>
              <span>{kpi.footerNote}</span>
              <span className={styles.kpiSampleBadge}>{kpi.badge}</span>
            </div>
          </article>
        ))}
      </div>

      {/* Main Grid: Left (Tables) & Right (Quick actions & Content) */}
      <div className={styles.grid2}>
        <div className={styles.stack}>
          {/* Recent Enquiries Panel */}
          <article className={styles.panel}>
            <div className={styles.panelHead}>
              <div>
                <h2>Recent Enquiries & Quotes</h2>
                <p>
                  Incoming B2B requirements, custom OEM proposals, and quote
                  requests.
                </p>
              </div>
              <Link href="/admin/enquiries" className="btn secondary small">
                View All Enquiries →
              </Link>
            </div>
            <div className={styles.tableWrap}>
              <table className={styles.dataTable}>
                <thead>
                  <tr>
                    <th>Contact</th>
                    <th>Company</th>
                    <th>Type</th>
                    <th>Product / Subject</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {enquiries.slice(0, 4).map((enq) => (
                    <tr key={enq.id}>
                      <td className={styles.primaryCell}>
                        {enq.name}
                        <span className={styles.subline}>{enq.email}</span>
                      </td>
                      <td>{enq.company}</td>
                      <td>
                        <span className={styles.typeBadge}>{enq.type}</span>
                      </td>
                      <td>{enq.product}</td>
                      <td>{enq.date.split("·")[0]}</td>
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
                          onClick={() => handleOpenEnquiry(enq)}
                          id={`dash-view-enq-${enq.id}`}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </article>

          {/* Recent Product Activity Panel */}
          <article className={styles.panel}>
            <div className={styles.panelHead}>
              <div>
                <h2>Recent Product Activity</h2>
                <p>
                  Catalog edits, specification modifications, and linked
                  downloads.
                </p>
              </div>
            </div>
            <div className={styles.tableWrap}>
              <table className={styles.dataTable}>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Action Performed</th>
                    <th>Edited By</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {RECENT_PRODUCT_ACTIVITIES.map((act) => (
                    <tr key={act.id}>
                      <td className={styles.primaryCell}>{act.product}</td>
                      <td>{act.action}</td>
                      <td>{act.editedBy}</td>
                      <td>
                        <span
                          className={`${styles.status} ${
                            act.status === "Published"
                              ? styles.statusPublished
                              : styles.statusDraft
                          }`}
                        >
                          {act.status}
                        </span>
                      </td>
                      <td>{act.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </article>
        </div>

        {/* Right Stack */}
        <div className={styles.stack}>
          {/* Quick Actions Panel */}
          <article className={styles.panel}>
            <div className={styles.panelHead}>
              <div>
                <h2>Quick Operations</h2>
                <p>Direct shortcuts to content management tools.</p>
              </div>
            </div>
            <div className={styles.panelBody}>
              <div className={styles.quickGrid}>
                <Link
                  href="/admin/enquiries"
                  className="btn primary"
                  style={{ width: "100%", justifyContent: "flex-start" }}
                >
                  ✉ Review Enquiries
                </Link>
                <Link
                  href="/admin/products"
                  className="btn secondary"
                  style={{ width: "100%", justifyContent: "flex-start" }}
                >
                  + Add Product
                </Link>
                <Link
                  href="/admin/blog"
                  className="btn secondary"
                  style={{ width: "100%", justifyContent: "flex-start" }}
                >
                  + New Blog Article
                </Link>
                <Link
                  href="/admin/resources"
                  className="btn secondary"
                  style={{ width: "100%", justifyContent: "flex-start" }}
                >
                  + Upload Resource
                </Link>
              </div>
            </div>
          </article>

          {/* Recently Added Content Panel */}
          <article className={styles.panel}>
            <div className={styles.panelHead}>
              <div>
                <h2>Recently Added Content</h2>
                <p>Items scheduled across platform modules.</p>
              </div>
            </div>
            <ul className={styles.contentList}>
              {RECENT_CONTENT_ITEMS.map((item) => (
                <li key={item.id}>
                  <span className={styles.typeBadge}>{item.type}</span>
                  <div className={styles.contentCopy}>
                    <strong>{item.title}</strong>
                    <span>{item.subtitle}</span>
                  </div>
                  <span
                    className={`${styles.status} ${
                      item.status === "Published"
                        ? styles.statusPublished
                        : item.status === "Uploaded"
                          ? styles.statusUploaded
                          : styles.statusDraft
                    }`}
                  >
                    {item.status}
                  </span>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </div>

      {/* Inquiry Detail Slide-Over Drawer Modal */}
      <EnquiryDetailModal
        enquiry={selectedEnquiry}
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
