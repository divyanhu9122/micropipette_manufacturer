import Link from "next/link";
import { requireStaffPage } from "@/lib/auth/page";
import { notificationConfig } from "@/lib/enquiries/notifications";
import styles from "../Admin.module.css";
import css from "./Cms.module.css";
export default async function Dashboard() {
  const { client } = await requireStaffPage("staff:manage");
  const tables = [
    "products",
    "brands",
    "categories",
    "blog_articles",
    "resources",
    "enquiries",
  ];
  const results = await Promise.all(
    tables.map((table) =>
      client.from(table).select("id", { count: "exact", head: true }),
    ),
  );
  const audit = await client
    .from("audit_events")
    .select("id,table_name,operation,record_id,created_at")
    .order("created_at", { ascending: false })
    .limit(15);
  const failed = results.some((result) => result.error) || Boolean(audit.error);
  return (
    <div className={styles.workspace}>
      <div className={styles.pageHead}>
        <div>
          <div className={styles.eyebrow}>Operations</div>
          <h1>Dashboard</h1>
          <p className={styles.pageDesc}>
            Current catalogue and enquiry activity.
          </p>
        </div>
        <Link className="btn primary" href="/admin/enquiries">
          Review enquiries
        </Link>
      </div>
      {failed && (
        <p className={css.error}>
          Some dashboard data could not load. Refresh to try again.
        </p>
      )}
      <div className={styles.kpis}>
        {tables.map((table, index) => (
          <article className={styles.kpi} key={table}>
            <div className={styles.kpiLabel}>{table.replaceAll("_", " ")}</div>
            <div className={styles.kpiValue}>
              {results[index].error
                ? "Unavailable"
                : (results[index].count ?? 0)}
            </div>
          </article>
        ))}
      </div>
      <p className={css.notice}>
        {notificationConfig()
          ? "Email alerts are configured. Enquiries are always available in the sales workspace."
          : "Email alerts need a sending provider. Enquiries are stored and available in the sales workspace."}
      </p>
      <div className={css.actions}>
        <Link className="btn secondary" href="/admin/products">
          Manage products
        </Link>
        <Link className="btn secondary" href="/admin/pages">
          Edit website pages
        </Link>
        <Link className="btn secondary" href="/admin/staff">
          Manage staff
        </Link>
      </div>
      <article className={styles.panel}>
        <div className={styles.panelHead}>
          <h2>Recent changes</h2>
        </div>
        <div className={styles.tableWrap}>
          <table className={styles.dataTable}>
            <thead>
              <tr>
                <th>Section</th>
                <th>Action</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {audit.data?.map((event) => (
                <tr key={event.id}>
                  <td>{event.table_name.replaceAll("_", " ")}</td>
                  <td>{event.operation}</td>
                  <td>
                    {new Date(event.created_at).toLocaleString("en-IN", {
                      timeZone: "Asia/Kolkata",
                    })}
                  </td>
                </tr>
              ))}
              {!audit.data?.length && (
                <tr>
                  <td colSpan={3}>No changes recorded yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </article>
    </div>
  );
}
