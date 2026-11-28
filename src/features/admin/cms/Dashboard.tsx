import Link from "next/link";
import { requireStaffPage } from "@/lib/auth/page";
import { notificationConfig } from "@/lib/enquiries/notifications";
import styles from "../Admin.module.css";
import css from "./Cms.module.css";
export default async function Dashboard() {
  const { client, staff } = await requireStaffPage("staff:manage");
  const tables = [
    "products",
    "brands",
    "categories",
    "blog_articles",
    "resources",
    "enquiries",
  ];
  const contentTables = tables.filter((table) => table !== "enquiries");
  const [results, published, contact, audit] = await Promise.all([
    Promise.all(
      tables.map((table) =>
        client.from(table).select("id", { count: "exact", head: true }),
      ),
    ),
    Promise.all(
      contentTables.map((table) =>
        client
          .from(table)
          .select("id", { count: "exact", head: true })
          .eq(
            table === "blog_articles"
              ? "is_published"
              : table === "resources"
                ? "is_public"
                : "is_active",
            true,
          ),
      ),
    ),
    client
      .from("settings")
      .select("value")
      .eq("key", "contact")
      .eq("is_public", true)
      .maybeSingle(),
    client
      .from("audit_events")
      .select("id,table_name,operation,record_id,actor_id,created_at")
      .order("created_at", { ascending: false })
      .limit(15),
  ]);
  const recordNames = new Map<string, string>();
  const sections: Record<string, { path: string; name: string }> = {
    products: { path: "products", name: "title" },
    brands: { path: "brands", name: "name" },
    categories: { path: "categories", name: "name" },
    blog_articles: { path: "blog", name: "title" },
    resources: { path: "resources", name: "title" },
    pages: { path: "pages", name: "title" },
    settings: { path: "settings", name: "key" },
    enquiries: { path: "enquiries", name: "enquiry_id" },
  };
  await Promise.all(
    Object.entries(sections).map(async ([table, section]) => {
      const ids =
        audit.data
          ?.filter((event) => event.table_name === table)
          .map((event) => event.record_id) || [];
      if (!ids.length) return;
      const { data } = await client
        .from(table)
        .select(`id,${section.name}`)
        .in("id", ids);
      for (const row of data || []) {
        const record = row as unknown as Record<string, string>;
        recordNames.set(`${table}:${record.id}`, record[section.name]);
      }
    }),
  );
  const failed =
    [...results, ...published].some((result) => result.error) ||
    Boolean(audit.error || contact.error);
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
            {index < published.length && (
              <p className={css.help}>
                {published[index].error
                  ? "Publication counts unavailable"
                  : `${published[index].count ?? 0} published · ${(results[index].count ?? 0) - (published[index].count ?? 0)} drafts`}
              </p>
            )}
          </article>
        ))}
      </div>
      <p className={css.notice}>
        {notificationConfig()
          ? "Email alerts are configured. Enquiries are always available in the sales workspace."
          : "Email alerts need a sending provider. Enquiries are stored and available in the sales workspace."}
      </p>
      <p className={css.help}>
        Launch checks:{" "}
        {published[0].count
          ? "Published products available."
          : "No products are published yet."}{" "}
        {published[4].count
          ? "Published resources available; verify their files before launch."
          : "Upload and publish approved PDFs."}{" "}
        {contact.data?.value?.email || contact.data?.value?.phone
          ? "Public contact details are set."
          : "Add approved public contact details in Settings."}{" "}
        Product images, specifications and business claims still need an
        editorial review.
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
                <th>Record</th>
                <th>Changed by</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {audit.data?.map((event) => (
                <tr key={event.id}>
                  <td>{event.table_name.replaceAll("_", " ")}</td>
                  <td>{event.operation}</td>
                  <td>
                    {sections[event.table_name] ? (
                      <Link href={`/admin/${sections[event.table_name].path}`}>
                        {recordNames.get(
                          `${event.table_name}:${event.record_id}`,
                        ) || event.record_id}
                      </Link>
                    ) : (
                      event.record_id
                    )}
                  </td>
                  <td>
                    {event.actor_id === staff.id
                      ? staff.email
                      : event.actor_id || "System"}
                  </td>
                  <td>
                    {new Date(event.created_at).toLocaleString("en-IN", {
                      timeZone: "Asia/Kolkata",
                    })}
                  </td>
                </tr>
              ))}
              {!audit.data?.length && (
                <tr>
                  <td colSpan={5}>No changes recorded yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </article>
    </div>
  );
}
