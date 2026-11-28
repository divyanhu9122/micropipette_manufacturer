import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { requireStaffPage } from "@/lib/auth/page";
import {
  CONTENT_DEFINITIONS,
  isContentEntity,
} from "@/features/admin/cms/content-config";
import { parseRecordId } from "@/lib/validation/admin";
import styles from "@/features/admin/Admin.module.css";
import css from "@/features/admin/cms/Cms.module.css";

export default async function ContentPreview({
  params,
}: {
  params: Promise<{ entity: string; id: string }>;
}) {
  const { entity, id } = await params;
  if (!isContentEntity(entity) || entity === "settings") notFound();
  try {
    parseRecordId(id);
  } catch {
    notFound();
  }
  const { client } = await requireStaffPage("content:read");
  const definition = CONTENT_DEFINITIONS[entity];
  const { data, error } = await client
    .from(definition.table)
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error)
    throw new Error("The saved preview could not load. Please try again.");
  if (!data) notFound();
  return (
    <div className={styles.workspace}>
      <p className={css.notice}>
        Private staff preview of the saved record.{" "}
        {data[definition.publication]
          ? "This record is published."
          : "This draft is not visible to visitors."}{" "}
        Save your editor to preview new changes.
      </p>
      <Link href={`/admin/${entity}`}>← Back to {definition.title}</Link>
      <h1>{String(data[definition.nameField])}</h1>
      {definition.fields
        .filter(
          (field) =>
            ![definition.nameField, definition.publication].includes(field.key),
        )
        .map((field) => {
          const value = data[field.key];
          if (value === null || value === "" || value === undefined)
            return null;
          const values = Array.isArray(value) ? value : [value];
          return (
            <section
              key={field.key}
              className={styles.panel}
              style={{ padding: 20, marginTop: 16 }}
            >
              <h2>{field.label}</h2>
              {field.upload ? (
                values.map((url: string) => {
                  const prefix = `/api/media/${field.upload}/`;
                  const href = url.startsWith(prefix)
                    ? `/api/admin/media?bucket=${field.upload}&path=${encodeURIComponent(url.slice(prefix.length))}`
                    : url;
                  return (
                    <div key={url}>
                      {field.upload === "images" && (
                        <Image
                          unoptimized
                          src={href}
                          alt={String(data[definition.nameField])}
                          width={480}
                          height={320}
                          style={{
                            objectFit: "contain",
                            maxWidth: "100%",
                            height: "auto",
                          }}
                        />
                      )}
                      <p>
                        <a
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Open {field.upload === "images" ? "image" : "PDF"}
                        </a>
                      </p>
                    </div>
                  );
                })
              ) : (
                <div className={css.detail}>
                  {typeof value === "object" ? (
                    <pre style={{ whiteSpace: "pre-wrap" }}>
                      {JSON.stringify(value, null, 2)}
                    </pre>
                  ) : (
                    String(value)
                  )}
                </div>
              )}
            </section>
          );
        })}
    </div>
  );
}
