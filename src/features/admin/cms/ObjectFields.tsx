"use client";
import { useState } from "react";
import styles from "../Admin.module.css";
import css from "./Cms.module.css";

export const SETTING_FIELDS: Record<
  string,
  { key: string; label: string; type?: string }[]
> = {
  site: [
    { key: "name", label: "Website name" },
    { key: "tagline", label: "Tagline" },
    { key: "description", label: "Description" },
    { key: "logo", label: "Logo URL" },
    { key: "favicon", label: "Favicon URL" },
  ],
  contact: [
    { key: "email", label: "Public email", type: "email" },
    { key: "phone", label: "Phone / WhatsApp", type: "tel" },
    { key: "address", label: "Company address" },
    { key: "businessHours", label: "Business hours" },
    { key: "linkedin", label: "LinkedIn URL" },
    { key: "twitter", label: "X / Twitter URL" },
  ],
  seo: [
    { key: "title", label: "Default page title" },
    { key: "description", label: "Search description" },
    { key: "image", label: "Social sharing image URL" },
  ],
  navigation: [{ key: "catalogueUrl", label: "Published catalogue URL" }],
};

export default function ObjectFields({
  id,
  label,
  value,
  group,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  group?: string;
  onChange: (value: string) => void;
}) {
  const [advanced, setAdvanced] = useState(false);
  const [newKey, setNewKey] = useState("");
  let object: Record<string, unknown> = {};
  let valid = true;
  try {
    const parsed = JSON.parse(value || "{}");
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed))
      valid = false;
    else object = parsed;
  } catch {
    valid = false;
  }
  const fields = group
    ? SETTING_FIELDS[group] || []
    : Object.keys(object).map((key) => ({ key, label: key, type: "text" }));
  const complex = Object.values(object).some(
    (entry) => entry !== null && typeof entry === "object",
  );
  const change = (key: string, entry: string) =>
    onChange(JSON.stringify({ ...object, [key]: entry || null }, null, 2));
  return (
    <div id={id} role="group" aria-label={label}>
      {!advanced && valid && !complex ? (
        <div className={css.objectFields}>
          {group && !fields.length && <p>Choose a settings group first.</p>}
          {fields.map((field) => (
            <div key={field.key}>
              <label htmlFor={`${id}-${field.key}`}>{field.label}</label>
              <input
                id={`${id}-${field.key}`}
                name={field.key}
                type={field.type || "text"}
                className={styles.field}
                value={String(object[field.key] ?? "")}
                onChange={(event) => change(field.key, event.target.value)}
              />
              {!group && (
                <button
                  type="button"
                  onClick={() => {
                    const next = { ...object };
                    delete next[field.key];
                    onChange(JSON.stringify(next, null, 2));
                  }}
                >
                  Remove {field.label}
                </button>
              )}
            </div>
          ))}
          {!group && (
            <div>
              <label htmlFor={`${id}-new`}>New specification label</label>
              <input
                id={`${id}-new`}
                className={styles.field}
                value={newKey}
                onChange={(event) => setNewKey(event.target.value)}
              />
              <button
                type="button"
                disabled={
                  !newKey.trim() || Object.hasOwn(object, newKey.trim())
                }
                onClick={() => {
                  change(newKey.trim(), "");
                  setNewKey("");
                }}
              >
                Add specification
              </button>
            </div>
          )}
        </div>
      ) : (
        <label>
          Advanced JSON for {label}
          <textarea
            className={styles.field}
            value={value}
            rows={7}
            onChange={(event) => onChange(event.target.value)}
          />
        </label>
      )}
      {!valid && (
        <p role="alert">
          Enter a valid JSON object or restore the previous value.
        </p>
      )}
      <button
        type="button"
        className="btn secondary small"
        onClick={() => setAdvanced(!advanced)}
      >
        {advanced ? "Use named fields" : "Edit advanced JSON"}
      </button>
    </div>
  );
}
