"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { createBrowserSupabaseClient } from "@/lib/cms/browser";
import {
  CONTENT_DEFINITIONS,
  type ContentEntity,
  type ContentField,
} from "./content-config";
import {
  cmsRequest,
  loadLookup,
  type CmsRecord,
  type ContentPage,
} from "./api";
import type { StaffRole } from "@/lib/auth/permissions";
import styles from "../Admin.module.css";
import css from "./Cms.module.css";

function formValue(field: ContentField, value: unknown): string {
  if (value === null || value === undefined) return String(field.default ?? "");
  if (field.type === "json") return JSON.stringify(value, null, 2);
  if (field.type === "lines")
    return Array.isArray(value) ? value.join("\n") : String(value);
  if (field.type === "date") return String(value).slice(0, 10);
  return String(value);
}

export default function ContentManager({
  entity,
  role,
}: {
  entity: ContentEntity;
  role: StaffRole;
}) {
  const definition = CONTENT_DEFINITIONS[entity];
  const [records, setRecords] = useState<CmsRecord[]>([]);
  const [lookups, setLookups] = useState<Record<string, CmsRecord[]>>({});
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [total, setTotal] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [revision, setRevision] = useState(0);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [editing, setEditing] = useState<CmsRecord | null | undefined>(
    undefined,
  );
  const [values, setValues] = useState<Record<string, string>>({});

  useEffect(() => {
    const controller = new AbortController();
    const timer = setTimeout(() => {
      cmsRequest<ContentPage>(
        `/api/admin/content/${entity}?page=${page}&q=${encodeURIComponent(search)}`,
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
            setRecords([]);
            setLoading(false);
            setError(
              cause instanceof Error
                ? cause.message
                : "Unable to load content.",
            );
          }
        });
    }, 200);
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [entity, page, search, revision]);

  useEffect(() => {
    const controller = new AbortController();
    const needed = Array.from(
      new Set(
        definition.fields.flatMap((field) =>
          field.lookup ? [field.lookup] : [],
        ),
      ),
    );
    Promise.all(
      needed.map(
        async (name) =>
          [name, await loadLookup(name, controller.signal)] as const,
      ),
    )
      .then((entries) => {
        if (!controller.signal.aborted) setLookups(Object.fromEntries(entries));
      })
      .catch(() => {
        if (!controller.signal.aborted)
          setError("Related records could not load. Refresh before editing.");
      });
    return () => controller.abort();
  }, [definition, revision]);

  const refresh = () => {
    setLoading(true);
    setRevision((value) => value + 1);
  };
  const openEditor = (record: CmsRecord | null) => {
    setEditing(record);
    setError("");
    setNotice("");
    setValues(
      Object.fromEntries(
        definition.fields.map((field) => [
          field.key,
          formValue(field, record?.[field.key]),
        ]),
      ),
    );
  };
  async function save(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      const input: Record<string, unknown> = {};
      for (const field of definition.fields) {
        const value = values[field.key]?.trim() ?? "";
        if (field.type === "checkbox") input[field.key] = value === "true";
        else if (field.type === "lines")
          input[field.key] = value
            .split("\n")
            .map((line) => line.trim())
            .filter(Boolean);
        else if (field.type === "json") {
          try {
            input[field.key] = JSON.parse(value || "{}");
          } catch {
            throw new Error(`Enter a valid JSON object for ${field.label}.`);
          }
        } else if (!value && field.nullable) input[field.key] = null;
        else if (field.type === "number") input[field.key] = Number(value);
        else input[field.key] = value;
      }
      await cmsRequest(
        `/api/admin/content/${entity}${editing ? `/${editing.id}` : ""}`,
        { method: editing ? "PATCH" : "POST", body: JSON.stringify(input) },
      );
      setEditing(undefined);
      setNotice("Saved to the database.");
      refresh();
    } catch (cause) {
      setError(
        cause instanceof Error
          ? cause.message
          : "Saving failed. Your changes are still in the form.",
      );
    } finally {
      setBusy(false);
    }
  }
  async function unpublish(record: CmsRecord) {
    if (
      !window.confirm(
        `Unpublish “${String(record[definition.nameField])}” from the website?`,
      )
    )
      return;
    setBusy(true);
    setError("");
    try {
      await cmsRequest(`/api/admin/content/${entity}/${record.id}`, {
        method: "DELETE",
      });
      setNotice("Unpublished. The record is retained as a draft.");
      refresh();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Unpublishing failed.");
    } finally {
      setBusy(false);
    }
  }
  async function upload(field: ContentField, file?: File) {
    if (!file || !field.upload) return;
    setBusy(true);
    setError("");
    try {
      const types: Record<string, string> =
        field.upload === "images"
          ? { "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp" }
          : { "application/pdf": "pdf" };
      const extension = types[file.type];
      const limit =
        field.upload === "images" ? 5 * 1024 * 1024 : 16 * 1024 * 1024;
      if (!extension || file.size > limit)
        throw new Error(
          field.upload === "images"
            ? "Choose a JPG, PNG or WebP image up to 5 MB."
            : "Choose a PDF up to 16 MB.",
        );
      const client = createBrowserSupabaseClient();
      const { data: identity, error: identityError } =
        await client.auth.getUser();
      if (identityError || !identity.user)
        throw new Error("Sign in again before uploading.");
      const path = `${identity.user.id}/${crypto.randomUUID()}.${extension}`;
      const { error: uploadError } = await client.storage
        .from(field.upload)
        .upload(path, file, { upsert: false, contentType: file.type });
      if (uploadError)
        throw new Error(
          "The upload failed. Check your session and file size, then try again.",
        );
      const url = `/api/media/${field.upload}/${path}`;
      setValues((old) => ({
        ...old,
        [field.key]:
          field.type === "lines"
            ? [old[field.key], url].filter(Boolean).join("\n")
            : url,
        ...(entity === "resources" && field.key === "file_url"
          ? { file_size_kb: String(Math.ceil(file.size / 1024)) }
          : {}),
      }));
      setNotice(
        "Uploaded privately. Save the record to link this file; publish it to make the file available to visitors.",
      );
    } catch (cause) {
      setError(
        cause instanceof Error
          ? cause.message
          : "The file could not be uploaded.",
      );
    } finally {
      setBusy(false);
    }
  }

  const readOnly =
    role !== "admin" && Boolean(editing?.[definition.publication]);
  return (
    <div className={styles.workspace}>
      <div className={styles.pageHead}>
        <div>
          <div className={styles.eyebrow}>Content management</div>
          <h1>{definition.title}</h1>
          <p className={styles.pageDesc}>
            Manage website content. Changes are confirmed after database
            storage.
          </p>
        </div>
        <div className={styles.pageActions}>
          <button className="btn secondary" onClick={refresh} disabled={busy}>
            Refresh
          </button>
          <button
            className="btn primary"
            onClick={() => openEditor(null)}
            disabled={busy}
          >
            Add record
          </button>
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
      {entity === "products" && (
        <p className={css.help}>
          Create <Link href="/admin/brands">brands</Link> and{" "}
          <Link href="/admin/categories">categories</Link> before adding
          products.
        </p>
      )}
      {editing !== undefined ? (
        <form className={`${styles.panel} ${css.editor}`} onSubmit={save}>
          <div className={css.actions}>
            <h2>{editing ? "Edit record" : "New record"}</h2>
            <button
              type="button"
              className="btn secondary"
              onClick={() => setEditing(undefined)}
              disabled={busy}
            >
              Close editor
            </button>
          </div>
          {readOnly && (
            <p className={css.notice}>
              Published records require an administrator to edit. Editors can
              create and edit drafts.
            </p>
          )}
          <fieldset disabled={busy || readOnly} className={css.fieldset}>
            <div className={styles.formGrid}>
              {definition.fields.map((field) => (
                <label
                  key={field.key}
                  className={`${styles.formGroup} ${field.type === "textarea" || field.type === "json" || field.type === "lines" ? css.wide : ""}`}
                >
                  <span className={styles.formLabel}>{field.label}</span>
                  {field.type === "checkbox" ? (
                    <input
                      type="checkbox"
                      checked={values[field.key] === "true"}
                      disabled={
                        field.key === definition.publication && role !== "admin"
                      }
                      onChange={(event) =>
                        setValues({
                          ...values,
                          [field.key]: String(event.target.checked),
                        })
                      }
                    />
                  ) : field.type === "select" ? (
                    <select
                      className={styles.field}
                      required={field.required}
                      value={values[field.key] || ""}
                      onChange={(event) =>
                        setValues({
                          ...values,
                          [field.key]: event.target.value,
                        })
                      }
                    >
                      <option value="">Choose…</option>
                      {field.lookup
                        ? (lookups[field.lookup] ?? [])
                            .filter(
                              (row) =>
                                field.key !== "parent_id" ||
                                row.id !== editing?.id,
                            )
                            .map((row) => (
                              <option key={row.id} value={row.id}>
                                {String(row.name)}
                                {row.is_active ? "" : " (draft)"}
                              </option>
                            ))
                        : field.options?.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                    </select>
                  ) : ["textarea", "json", "lines"].includes(
                      field.type || "",
                    ) ? (
                    <textarea
                      className={`${styles.field} ${css.textarea}`}
                      required={field.required}
                      rows={field.type === "json" ? 7 : 5}
                      value={values[field.key] || ""}
                      onChange={(event) =>
                        setValues({
                          ...values,
                          [field.key]: event.target.value,
                        })
                      }
                    />
                  ) : (
                    <input
                      className={styles.field}
                      required={field.required}
                      type={
                        field.type === "number"
                          ? "number"
                          : field.type === "date"
                            ? "date"
                            : "text"
                      }
                      step={field.type === "number" ? "any" : undefined}
                      value={values[field.key] || ""}
                      onChange={(event) =>
                        setValues({
                          ...values,
                          [field.key]: event.target.value,
                        })
                      }
                    />
                  )}
                  {field.hint && (
                    <small className={css.help}>{field.hint}</small>
                  )}
                  {field.upload && (
                    <input
                      aria-label={`Upload ${field.label}`}
                      type="file"
                      accept={
                        field.upload === "images"
                          ? "image/jpeg,image/png,image/webp"
                          : "application/pdf"
                      }
                      onChange={(event) => {
                        void upload(field, event.target.files?.[0]);
                        event.target.value = "";
                      }}
                    />
                  )}
                </label>
              ))}
            </div>
            <button className="btn primary" type="submit">
              {busy ? "Saving…" : "Save record"}
            </button>
          </fieldset>
        </form>
      ) : (
        <>
          <div className={css.actions}>
            <label>
              Search{" "}
              <input
                className={styles.field}
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  setPage(1);
                  setLoading(true);
                  setError("");
                }}
              />
            </label>
            <span>{total} records</span>
          </div>
          <div className={`${styles.panel} ${styles.tableWrap}`}>
            <table className={styles.dataTable}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>State</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {records.map((record) => (
                  <tr key={record.id}>
                    <td>
                      {String(record[definition.nameField] ?? "Untitled")}
                    </td>
                    <td>
                      {record[definition.publication] ? "Published" : "Draft"}
                    </td>
                    <td>
                      <div className={css.actions}>
                        <button
                          className="btn secondary small"
                          onClick={() => openEditor(record)}
                          disabled={busy}
                        >
                          Edit
                        </button>
                        {role === "admin" &&
                          record[definition.publication] === true && (
                            <button
                              className="btn secondary small"
                              onClick={() => void unpublish(record)}
                              disabled={busy}
                            >
                              Unpublish
                            </button>
                          )}
                      </div>
                    </td>
                  </tr>
                ))}
                {!records.length && (
                  <tr>
                    <td colSpan={3}>
                      {loading ? "Loading…" : "No records found."}
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
