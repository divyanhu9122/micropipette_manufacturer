"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import ObjectFields from "./ObjectFields";
import { HttpError } from "@/lib/http/errors";
import {
  parseProductInput,
  parseBlogInput,
  parseBrandInput,
  parseCategoryInput,
  parseResourceInput,
  parsePageInput,
  parseSettingsInput,
} from "@/lib/validation/admin";
import Link from "next/link";
import Image from "next/image";
import { createBrowserSupabaseClient } from "@/lib/cms/browser";
import {
  CONTENT_DEFINITIONS,
  type ContentEntity,
  type ContentField,
} from "./content-config";
import {
  cmsRequest,
  CmsRequestError,
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
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const uploaded = useRef<string[]>([]);
  const [initialValues, setInitialValues] = useState<Record<string, string>>(
    {},
  );
  const [pendingFiles, setPendingFiles] = useState<Record<string, File[]>>({});
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [progress, setProgress] = useState("");
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

  const dirty =
    editing !== undefined &&
    (JSON.stringify(values) !== JSON.stringify(initialValues) ||
      Object.keys(pendingFiles).length > 0);
  useEffect(() => {
    if (!dirty) return;
    const beforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "";
    };
    const navigate = (event: MouseEvent) => {
      const link =
        event.target instanceof Element
          ? event.target.closest<HTMLAnchorElement>("a[href]")
          : null;
      if (
        !link ||
        link.target === "_blank" ||
        link.hasAttribute("download") ||
        event.ctrlKey ||
        event.metaKey ||
        event.shiftKey ||
        event.altKey ||
        event.button !== 0
      )
        return;
      const destination = new URL(link.href, window.location.href);
      if (
        destination.pathname === window.location.pathname &&
        destination.search === window.location.search
      )
        return;
      event.preventDefault();
      event.stopPropagation();
      if (!window.confirm("Discard unsaved changes and leave this editor?"))
        return;
      void cleanupUploads()
        .then(() => {
          setEditing(undefined);
          setPendingFiles({});
          if (destination.origin === window.location.origin)
            router.push(
              destination.pathname + destination.search + destination.hash,
            );
          else window.location.assign(destination.href);
        })
        .catch(() =>
          setError(
            "Pending uploads could not be cleaned up. Retry before leaving.",
          ),
        );
    };
    window.addEventListener("beforeunload", beforeUnload);
    document.addEventListener("click", navigate, true);
    return () => {
      window.removeEventListener("beforeunload", beforeUnload);
      document.removeEventListener("click", navigate, true);
    };
  }, [dirty, router]);
  useEffect(() => {
    const key = Object.keys(fieldErrors)[0];
    if (!busy && key)
      formRef.current
        ?.querySelector<HTMLElement>(
          `[name="${key}"],#field-${key} input,#field-${key} textarea`,
        )
        ?.focus();
  }, [busy, fieldErrors]);
  async function cleanupUploads() {
    if (!uploaded.current.length) return;
    await cmsRequest("/api/admin/media", {
      method: "DELETE",
      body: JSON.stringify({ files: uploaded.current }),
    });
    uploaded.current = [];
  }
  async function discard() {
    if (dirty && !window.confirm("Discard unsaved changes?")) return false;
    try {
      await cleanupUploads();
      setPendingFiles({});
      return true;
    } catch {
      setError(
        "Pending uploads could not be cleaned up. Retry before closing.",
      );
      return false;
    }
  }
  const refresh = () => {
    setLoading(true);
    setRevision((value) => value + 1);
  };
  const openEditor = async (record: CmsRecord | null) => {
    if (!(await discard())) return;
    setEditing(record);
    setError("");
    setNotice("");
    setFieldErrors({});
    const nextValues = Object.fromEntries(
      definition.fields.map((field) => [
        field.key,
        formValue(field, record?.[field.key]),
      ]),
    );
    setValues(nextValues);
    setInitialValues(nextValues);
  };
  async function save(event: FormEvent) {
    event.preventDefault();
    if (busy) return;
    setBusy(true);
    setProgress("Saving record…");
    setFieldErrors({});
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
            throw new HttpError(
              400,
              "INVALID_INPUT",
              `Enter a valid JSON object for ${field.label}.`,
              { [field.key]: "Enter a valid JSON object." },
            );
          }
        } else if (!value && field.nullable) input[field.key] = null;
        else if (field.type === "number") input[field.key] = Number(value);
        else input[field.key] = value;
      }
      const parse = {
        products: parseProductInput,
        blog: parseBlogInput,
        brands: parseBrandInput,
        categories: parseCategoryInput,
        resources: parseResourceInput,
        pages: parsePageInput,
        settings: parseSettingsInput,
      }[entity];
      parse(input, !editing);
      for (const [key, files] of Object.entries(pendingFiles)) {
        const field = definition.fields.find((item) => item.key === key)!;
        setProgress(`Uploading ${field.label}…`);
        for (const file of files) {
          const url = await upload(field, file);
          input[key] =
            field.type === "lines" ? [...(input[key] as string[]), url] : url;
          if (entity === "resources" && key === "file_url")
            input.file_size_kb = Math.ceil(file.size / 1024);
        }
      }
      setProgress("Saving record…");
      await cmsRequest(
        `/api/admin/content/${entity}${editing ? `/${editing.id}` : ""}`,
        { method: editing ? "PATCH" : "POST", body: JSON.stringify(input) },
      );
      uploaded.current = [];
      setPendingFiles({});
      setEditing(undefined);
      setNotice("Saved to the database.");
      refresh();
    } catch (cause) {
      const details =
        cause instanceof HttpError || cause instanceof CmsRequestError
          ? cause.fieldErrors || {}
          : {};
      setFieldErrors(details);

      setError(
        cause instanceof Error
          ? cause.message
          : "Saving failed. Your changes are still in the form.",
      );
      try {
        await cleanupUploads();
      } catch {
        setError(
          "Saving was not confirmed and upload cleanup needs a retry. Keep this editor open and try again.",
        );
      }
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
  function stageFile(field: ContentField, file?: File) {
    if (!file || !field.upload) return;
    const allowed =
      field.upload === "images"
        ? ["image/jpeg", "image/png", "image/webp"]
        : ["application/pdf"];
    const limit = (field.upload === "images" ? 5 : 16) * 1024 * 1024;
    if (!allowed.includes(file.type) || file.size > limit) {
      setError(
        field.upload === "images"
          ? "Choose a JPG, PNG or WebP image up to 5 MB."
          : "Choose a PDF up to 16 MB.",
      );
      return;
    }
    if (
      field.type === "lines" &&
      (values[field.key] || "").split("\n").filter(Boolean).length +
        (pendingFiles[field.key]?.length || 0) >=
        20
    ) {
      setError(
        "A product can have up to 20 images. Remove an image before adding another.",
      );
      return;
    }
    setPendingFiles((previous) => ({
      ...previous,
      [field.key]:
        field.type === "lines"
          ? [...(previous[field.key] || []), file]
          : [file],
    }));
    setError("");
    setNotice(
      "File selected. It will upload privately when you save this record.",
    );
  }
  async function upload(field: ContentField, file: File) {
    const client = createBrowserSupabaseClient();
    const { data: identity, error: identityError } =
      await client.auth.getUser();
    if (identityError || !identity.user)
      throw new Error("Sign in again before uploading.");
    const extensions: Record<string, string> = {
      "image/jpeg": "jpg",
      "image/png": "png",
      "image/webp": "webp",
      "application/pdf": "pdf",
    };
    const path = `${identity.user.id}/${crypto.randomUUID()}.${extensions[file.type]}`;
    const { error } = await client.storage
      .from(field.upload!)
      .upload(path, file, { upsert: false, contentType: file.type });
    if (error)
      throw new Error(
        "The upload failed. Check your session and file size, then retry.",
      );
    const url = `/api/media/${field.upload}/${path}`;
    uploaded.current.push(url);
    return url;
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
        <form
          ref={formRef}
          className={`${styles.panel} ${css.editor}`}
          onSubmit={save}
        >
          <div className={css.actions}>
            <h2>{editing ? "Edit record" : "New record"}</h2>
            {editing && entity !== "settings" && (
              <Link
                href={`/admin/preview/${entity}/${editing.id}`}
                target="_blank"
                className="btn secondary"
              >
                Preview saved record
              </Link>
            )}
            <button
              type="button"
              className="btn secondary"
              onClick={async () => {
                if (await discard()) setEditing(undefined);
              }}
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
                <div
                  key={field.key}
                  className={`${styles.formGroup} ${field.type === "textarea" || field.type === "json" || field.type === "lines" ? css.wide : ""}`}
                >
                  <label
                    htmlFor={`field-${field.key}`}
                    className={styles.formLabel}
                  >
                    {field.label}
                  </label>
                  {field.type === "json" ? (
                    <ObjectFields
                      id={`field-${field.key}`}
                      label={field.label}
                      group={entity === "settings" ? values.key : undefined}
                      value={values[field.key] || "{}"}
                      onChange={(value) =>
                        setValues({ ...values, [field.key]: value })
                      }
                    />
                  ) : field.type === "checkbox" ? (
                    <input
                      id={`field-${field.key}`}
                      name={field.key}
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
                      disabled={
                        entity === "settings" &&
                        Boolean(editing) &&
                        field.key === "key"
                      }
                      id={`field-${field.key}`}
                      name={field.key}
                      aria-invalid={Boolean(fieldErrors[field.key])}
                      aria-describedby={
                        fieldErrors[field.key]
                          ? `error-${field.key}`
                          : undefined
                      }
                      className={styles.field}
                      required={field.required}
                      value={values[field.key] || ""}
                      onChange={(event) =>
                        setValues({
                          ...values,
                          [field.key]: event.target.value,
                          ...(entity === "settings" && field.key === "key"
                            ? { value: "{}" }
                            : {}),
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
                      id={`field-${field.key}`}
                      name={field.key}
                      aria-invalid={Boolean(fieldErrors[field.key])}
                      aria-describedby={
                        fieldErrors[field.key]
                          ? `error-${field.key}`
                          : undefined
                      }
                      className={`${styles.field} ${css.textarea}`}
                      required={field.required}
                      rows={5}
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
                      id={`field-${field.key}`}
                      name={field.key}
                      aria-invalid={Boolean(fieldErrors[field.key])}
                      aria-describedby={
                        fieldErrors[field.key]
                          ? `error-${field.key}`
                          : undefined
                      }
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
                  {fieldErrors[field.key] && (
                    <p
                      id={`error-${field.key}`}
                      role="alert"
                      className={css.fieldError}
                    >
                      {fieldErrors[field.key]}
                    </p>
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
                        stageFile(field, event.target.files?.[0]);
                        event.target.value = "";
                      }}
                    />
                  )}
                  {field.upload && (
                    <MediaPreview
                      value={values[field.key] || ""}
                      bucket={field.upload}
                    />
                  )}
                  {pendingFiles[field.key]?.map((file, index) => (
                    <div key={index} className={css.help}>
                      {file.name} — selected for upload{" "}
                      <button
                        type="button"
                        onClick={() =>
                          setPendingFiles((previous) => {
                            const next = { ...previous };
                            const remaining = next[field.key].filter(
                              (_, i) => i !== index,
                            );
                            if (remaining.length) next[field.key] = remaining;
                            else delete next[field.key];
                            return next;
                          })
                        }
                      >
                        Remove selected file
                      </button>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <button className="btn primary" type="submit">
              {busy ? progress : "Save record"}
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

function MediaPreview({
  value,
  bucket,
}: {
  value: string;
  bucket: "images" | "documents";
}) {
  const urls = value.split("\n").filter(Boolean);
  return (
    <div className={css.mediaPreviews}>
      {urls.map((url) => {
        const prefix = `/api/media/${bucket}/`;
        const href = url.startsWith(prefix)
          ? `/api/admin/media?bucket=${bucket}&path=${encodeURIComponent(url.slice(prefix.length))}`
          : url;
        if (!/^(?:\/(?!\/)|https:\/\/)/.test(href)) return null;
        return (
          <a key={url} href={href} target="_blank" rel="noopener noreferrer">
            {bucket === "images" ? (
              <Image
                unoptimized
                src={href}
                alt="Uploaded image preview"
                width={120}
                height={90}
              />
            ) : (
              "Open PDF"
            )}
          </a>
        );
      })}
    </div>
  );
}
