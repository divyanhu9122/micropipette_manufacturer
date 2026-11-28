"use client";
import { useEffect, useState, type FormEvent } from "react";
import { cmsRequest } from "./api";
import type { StaffRole } from "@/lib/auth/permissions";
import styles from "../Admin.module.css";
import css from "./Cms.module.css";
type Member = {
  user_id: string;
  email: string | null;
  role: StaffRole;
  is_active: boolean;
};
export default function StaffManager({
  currentEmail,
}: {
  currentEmail: string;
}) {
  const [members, setMembers] = useState<Member[]>([]);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<StaffRole>("editor");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [revision, setRevision] = useState(0);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [link, setLink] = useState("");
  useEffect(() => {
    const controller = new AbortController();
    cmsRequest<{ items: Member[]; hasMore: boolean }>(
      `/api/admin/staff?page=${page}`,
      { signal: controller.signal },
    )
      .then((result) => {
        setMembers(result.items);
        setHasMore(result.hasMore);
      })
      .catch((cause) => {
        if (!controller.signal.aborted)
          setError(
            cause instanceof Error ? cause.message : "Staff could not load.",
          );
      });
    return () => controller.abort();
  }, [page, revision]);
  async function create(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError("");
    setLink("");
    try {
      const result = await cmsRequest<{ onboardingUrl: string }>(
        "/api/admin/staff",
        { method: "POST", body: JSON.stringify({ email, role }) },
      );
      setLink(result.onboardingUrl);
      setEmail("");
      setRevision((value) => value + 1);
    } catch (cause) {
      setError(
        cause instanceof Error ? cause.message : "Account setup failed.",
      );
    } finally {
      setBusy(false);
    }
  }
  async function save(member: Member) {
    setBusy(true);
    setError("");
    try {
      await cmsRequest(`/api/admin/staff/${member.user_id}`, {
        method: "PATCH",
        body: JSON.stringify({
          role: member.role,
          is_active: member.is_active,
        }),
      });
      setRevision((value) => value + 1);
    } catch (cause) {
      setError(
        cause instanceof Error ? cause.message : "Access could not be updated.",
      );
    } finally {
      setBusy(false);
    }
  }
  return (
    <div className={styles.workspace}>
      <div className={styles.pageHead}>
        <div>
          <div className={styles.eyebrow}>Administration</div>
          <h1>Staff access</h1>
          <p className={styles.pageDesc}>
            Admins publish and manage access. Editors prepare drafts. Sales
            manage enquiries. Every staff member must use an authenticator.
          </p>
        </div>
      </div>
      {error && (
        <p role="alert" className={css.error}>
          {error}
        </p>
      )}
      <form
        onSubmit={create}
        className={`${styles.panel} ${css.editor} ${css.form}`}
      >
        <h2>Create or restore staff access</h2>
        <label>
          Email
          <input
            className={styles.field}
            required
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>
        <label>
          Role
          <select
            className={styles.field}
            value={role}
            onChange={(event) => setRole(event.target.value as StaffRole)}
          >
            {["admin", "editor", "sales"].map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
        <button className="btn primary" disabled={busy}>
          {busy ? "Preparing…" : "Create private access link"}
        </button>
        <p className={css.help}>
          No email is sent. Share the one-time link privately with this staff
          member. Existing accounts receive a password recovery link.
        </p>
        {link && (
          <label>
            Private one-time link
            <textarea className={styles.field} readOnly value={link} rows={3} />
          </label>
        )}
      </form>
      <div className={`${styles.panel} ${styles.tableWrap}`}>
        <table className={styles.dataTable}>
          <thead>
            <tr>
              <th>Staff member</th>
              <th>Role</th>
              <th>Active</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member) => (
              <tr key={member.user_id}>
                <td>{member.email || "Staff account"}</td>
                <td>
                  <select
                    className={styles.field}
                    disabled={
                      busy ||
                      member.email?.toLowerCase() === currentEmail.toLowerCase()
                    }
                    value={member.role}
                    onChange={(event) =>
                      setMembers((values) =>
                        values.map((item) =>
                          item.user_id === member.user_id
                            ? { ...item, role: event.target.value as StaffRole }
                            : item,
                        ),
                      )
                    }
                  >
                    {["admin", "editor", "sales"].map((item) => (
                      <option key={item}>{item}</option>
                    ))}
                  </select>
                </td>
                <td>
                  <input
                    aria-label={`Active access for ${member.email || "staff"}`}
                    type="checkbox"
                    disabled={
                      busy ||
                      member.email?.toLowerCase() === currentEmail.toLowerCase()
                    }
                    checked={member.is_active}
                    onChange={(event) =>
                      setMembers((values) =>
                        values.map((item) =>
                          item.user_id === member.user_id
                            ? { ...item, is_active: event.target.checked }
                            : item,
                        ),
                      )
                    }
                  />
                </td>
                <td>
                  {member.email?.toLowerCase() ===
                  currentEmail.toLowerCase() ? (
                    "Your account"
                  ) : (
                    <button
                      className="btn secondary small"
                      disabled={busy}
                      onClick={() => void save(member)}
                    >
                      Save access
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={css.actions}>
        <button
          className="btn secondary"
          disabled={page <= 1 || busy}
          onClick={() => setPage(page - 1)}
        >
          Previous
        </button>
        <span>Page {page}</span>
        <button
          className="btn secondary"
          disabled={!hasMore || busy}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
