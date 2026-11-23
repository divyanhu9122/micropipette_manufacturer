"use client";
import { useEffect, useState, type FormEvent } from "react";
import { cmsRequest, type CmsRecord, type ContentPage } from "./api";
import type { StaffRole } from "@/lib/auth/permissions";
import styles from "../Admin.module.css";
import css from "./Cms.module.css";

const statuses = ["new", "read", "replied", "closed"];
const text = (row: CmsRecord, key: string) => String(row[key] ?? "");
export function csvCell(value: unknown) {
  let cell = String(value ?? "");
  if (/^[\s]*[=+@-]|^[\t\r\n]/.test(cell)) cell = `'${cell}`;
  return `"${cell.replace(/"/g, '""')}"`;
}

export default function EnquiriesManager({ role }: { role: StaffRole }) {
  const [records, setRecords] = useState<CmsRecord[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [revision, setRevision] = useState(0);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [active, setActive] = useState<CmsRecord | null>(null);
  const [notes, setNotes] = useState("");
  const [editStatus, setEditStatus] = useState("new");
  useEffect(() => {
    const controller = new AbortController();
    const timer = setTimeout(() => {
      cmsRequest<ContentPage>(
        `/api/admin/enquiries?page=${page}&status=${status}&q=${encodeURIComponent(search)}`,
        { signal: controller.signal },
      )
        .then((result) => {
          setRecords(result.items);
          setTotal(result.total);
          setHasMore(result.hasMore);
          setLoading(false);
        })
        .catch((cause) => {
          if (!controller.signal.aborted) {
            setError(
              cause instanceof Error
                ? cause.message
                : "Enquiries could not load.",
            );
            setRecords([]);
            setLoading(false);
          }
        });
    }, 200);
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [page, status, search, revision]);
  const refresh = () => {
    setLoading(true);
    setRevision((value) => value + 1);
  };
  async function save(event: FormEvent) {
    event.preventDefault();
    if (!active) return;
    setBusy(true);
    setError("");
    try {
      await cmsRequest(`/api/admin/enquiries/${active.id}`, {
        method: "PATCH",
        body: JSON.stringify({
          status: editStatus,
          internal_notes: notes.trim() || null,
        }),
      });
      setActive(null);
      setNotice("Enquiry updated.");
      refresh();
    } catch (cause) {
      setError(
        cause instanceof Error
          ? cause.message
          : "The update failed. Your notes are still in the form.",
      );
    } finally {
      setBusy(false);
    }
  }
  function exportPage() {
    const columns = [
      "enquiry_id",
      "name",
      "email",
      "phone",
      "company",
      "country",
      "enquiry_type",
      "product_title",
      "quantity",
      "message",
      "status",
      "created_at",
    ];
    const csv = [
      columns.map(csvCell).join(","),
      ...records.map((row) =>
        columns.map((key) => csvCell(row[key])).join(","),
      ),
    ].join("\r\n");
    const url = URL.createObjectURL(
      new Blob(["\ufeff", csv], { type: "text/csv;charset=utf-8" }),
    );
    const link = document.createElement("a");
    link.href = url;
    link.download = `enquiries-page-${page}.csv`;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  return (
    <div className={styles.workspace}>
      <div className={styles.pageHead}>
        <div>
          <div className={styles.eyebrow}>Sales workspace</div>
          <h1>Enquiries & quotes</h1>
          <p className={styles.pageDesc}>
            Review customer requests and keep status and internal notes up to
            date.
          </p>
        </div>
        <div className={styles.pageActions}>
          <button className="btn secondary" onClick={refresh} disabled={busy}>
            Refresh
          </button>
          {role === "admin" && (
            <button
              className="btn secondary"
              onClick={exportPage}
              disabled={!records.length}
            >
              Export this page
            </button>
          )}
        </div>
      </div>
      {error && (
        <p role="alert" className={css.error}>
          {error}
        </p>
      )}
      {notice && (
        <p role="status" className={css.notice}>
          {notice}
        </p>
      )}
      {active ? (
        <article className={`${styles.panel} ${css.editor}`}>
          <div className={css.actions}>
            <h2>{text(active, "enquiry_id")}</h2>
            <button
              className="btn secondary"
              onClick={() => setActive(null)}
              disabled={busy}
            >
              Close
            </button>
          </div>
          <dl>
            {[
              ["Customer", "name"],
              ["Email", "email"],
              ["Phone", "phone"],
              ["Company", "company"],
              ["Country", "country"],
              ["Product", "product_title"],
              ["Quantity", "quantity"],
              ["Request", "message"],
              ["OEM details", "oem_specifications"],
            ].map(([label, key]) => (
              <div key={key}>
                <dt>
                  <strong>{label}</strong>
                </dt>
                <dd className={css.detail}>{text(active, key) || "—"}</dd>
              </div>
            ))}
          </dl>
          {Boolean(active.attachment_path) && (
            <p>
              <a
                className="btn secondary"
                href={`/api/admin/enquiries/${active.id}/attachment`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Download {text(active, "attachment_name") || "reference file"}
              </a>
            </p>
          )}
          <form onSubmit={save} className={css.form}>
            <label>
              Status
              <select
                className={styles.field}
                value={editStatus}
                onChange={(event) => setEditStatus(event.target.value)}
              >
                {statuses.map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Internal notes
              <textarea
                className={`${styles.field} ${css.textarea}`}
                value={notes}
                maxLength={10000}
                onChange={(event) => setNotes(event.target.value)}
              />
            </label>
            <button className="btn primary" disabled={busy}>
              {busy ? "Saving…" : "Save changes"}
            </button>
          </form>
        </article>
      ) : (
        <>
          <div className={css.actions}>
            <label>
              Customer name
              <input
                className={styles.field}
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  setPage(1);
                  setLoading(true);
                }}
              />
            </label>
            <label>
              Status
              <select
                className={styles.field}
                value={status}
                onChange={(event) => {
                  setStatus(event.target.value);
                  setPage(1);
                  setLoading(true);
                }}
              >
                <option value="">All</option>
                {statuses.map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </label>
            <span>{total} enquiries</span>
          </div>
          <div className={`${styles.panel} ${styles.tableWrap}`}>
            <table className={styles.dataTable}>
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Company</th>
                  <th>Request</th>
                  <th>Status</th>
                  <th>Received</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {records.map((row) => (
                  <tr key={row.id}>
                    <td>
                      {text(row, "name")}
                      <br />
                      {text(row, "email")}
                    </td>
                    <td>{text(row, "company")}</td>
                    <td>
                      {text(row, "product_title") || text(row, "enquiry_type")}
                    </td>
                    <td>{text(row, "status")}</td>
                    <td>
                      {new Date(text(row, "created_at")).toLocaleDateString()}
                    </td>
                    <td>
                      <button
                        className="btn secondary small"
                        onClick={() => {
                          setActive(row);
                          setNotes(text(row, "internal_notes"));
                          setEditStatus(text(row, "status"));
                          setError("");
                        }}
                      >
                        Review
                      </button>
                    </td>
                  </tr>
                ))}
                {!records.length && (
                  <tr>
                    <td colSpan={6}>
                      {loading ? "Loading…" : "No enquiries found."}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className={css.actions}>
            <button
              className="btn secondary"
              disabled={page <= 1 || loading}
              onClick={() => {
                setPage(page - 1);
                setLoading(true);
              }}
            >
              Previous
            </button>
            <span>Page {page}</span>
            <button
              className="btn secondary"
              disabled={!hasMore || loading}
              onClick={() => {
                setPage(page + 1);
                setLoading(true);
              }}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
