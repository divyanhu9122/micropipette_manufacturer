"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import styles from "../Admin.module.css";
import {
  AdminResourceItem,
  INITIAL_ADMIN_RESOURCES,
  ResourceType,
} from "../admin.data";

export default function ResourcesManagement() {
  const [resources, setResources] = useState<AdminResourceItem[]>(
    INITIAL_ADMIN_RESOURCES
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string>("All");
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingResource, setEditingResource] =
    useState<AdminResourceItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [formData, setFormData] = useState<Partial<AdminResourceItem>>({
    title: "",
    type: "Catalogue",
    associations: "",
    fileFormat: "PDF",
    fileSize: "2.5 MB",
    status: "Published",
    brandAssoc: "LABXE",
    categoryAssoc: "Micropipettes",
    productAssoc: "None",
    downloadLabel: "Download Document",
    seoTitle: "",
    metaDesc: "",
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleOpenAdd = () => {
    setEditingResource(null);
    setFormData({
      title: "",
      type: "Catalogue",
      associations: "",
      fileFormat: "PDF",
      fileSize: "2.5 MB",
      status: "Published",
      brandAssoc: "LABXE",
      categoryAssoc: "Micropipettes",
      productAssoc: "None",
      downloadLabel: "Download Document",
      seoTitle: "",
      metaDesc: "",
    });
    setIsEditorOpen(true);
  };

  const handleOpenEdit = (res: AdminResourceItem) => {
    setEditingResource(res);
    setFormData({ ...res });
    setIsEditorOpen(true);
  };

  const handleDelete = (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete the resource "${title}"?`)) {
      setResources((prev) => prev.filter((r) => r.id !== id));
      showToast(`Resource "${title}" removed.`);
    }
  };

  const handleCloseEditor = () => {
    setIsEditorOpen(false);
    setEditingResource(null);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title?.trim()) {
      showToast("Please provide a resource title.");
      return;
    }

    const assocList: string[] = [];
    if (formData.brandAssoc && formData.brandAssoc !== "None") {
      assocList.push(formData.brandAssoc);
    }
    if (formData.categoryAssoc && formData.categoryAssoc !== "None") {
      assocList.push(formData.categoryAssoc);
    }
    if (formData.productAssoc && formData.productAssoc !== "None") {
      assocList.push(formData.productAssoc);
    }
    const computedAssocs = assocList.length > 0 ? assocList.join(" · ") : "Universal";

    if (editingResource) {
      setResources((prev) =>
        prev.map((r) =>
          r.id === editingResource.id
            ? ({
                ...r,
                ...formData,
                associations: computedAssocs,
              } as AdminResourceItem)
            : r
        )
      );
      showToast(`Resource "${formData.title}" updated.`);
    } else {
      const newRes: AdminResourceItem = {
        id: `res-${Date.now()}`,
        title: formData.title!,
        type: (formData.type as ResourceType) || "Datasheet",
        associations: computedAssocs,
        fileFormat: formData.fileFormat || "PDF",
        fileSize: formData.fileSize || "1.5 MB",
        status: (formData.status as "Published" | "Draft") || "Published",
        brandAssoc: formData.brandAssoc,
        categoryAssoc: formData.categoryAssoc,
        productAssoc: formData.productAssoc,
        downloadLabel: formData.downloadLabel || "Download Document",
        seoTitle: formData.seoTitle,
        metaDesc: formData.metaDesc,
      };
      setResources((prev) => [...prev, newRes]);
      showToast(`Resource "${newRes.title}" uploaded to library.`);
    }

    handleCloseEditor();
  };

  const filteredResources = useMemo(() => {
    return resources.filter((r) => {
      const matchSearch =
        r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.associations.toLowerCase().includes(searchQuery.toLowerCase());
      const matchType = selectedType === "All" || r.type === selectedType;
      return matchSearch && matchType;
    });
  }, [resources, searchQuery, selectedType]);

  return (
    <div className={styles.workspace}>
      <div className={styles.pageHead}>
        <div>
          <div className={styles.eyebrow}>
            Phase 4.6 · Download Center Management
          </div>
          <h1>Resources / Documents</h1>
          <p className={styles.pageDesc}>
            One central document library for catalogues, brochures, datasheets, manuals,
            certificates and other technical files.
          </p>
        </div>
        <div className={styles.pageActions}>
          <button
            className={`${styles.btn} ${styles.btnPrimary}`}
            onClick={handleOpenAdd}
            id="admin-btn-add-resource"
          >
            + Add Resource
          </button>
        </div>
      </div>

      {/* Prototype Scope Banner */}
      <div className={styles.prototypeBanner}>
        <strong>Confirmed resource rule:</strong> a single resource may be associated
        with a brand, category and/or product. Upload once; reuse associations instead of
        creating duplicate copies.
      </div>

      {/* Toolbar */}
      <div className={styles.toolbar}>
        <div className={styles.toolbarLeft}>
          <div className={styles.search}>
            <svg viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-4-4" />
            </svg>
            <input
              className={styles.field}
              placeholder="Search resource name or association..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search resources"
            />
          </div>

          <select
            className={`${styles.select} ${styles.inputSmall}`}
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="All">All resource types</option>
            <option value="Catalogue">Catalogue</option>
            <option value="Brochure">Brochure</option>
            <option value="Datasheet">Datasheet</option>
            <option value="Manual">Manual</option>
            <option value="Certificate">Certificate</option>
            <option value="Calibration-related">Calibration-related</option>
            <option value="Other Technical File">Other Technical File</option>
          </select>
        </div>
      </div>

      {/* Data Table */}
      <article className={styles.panel}>
        <div className={styles.tableWrap}>
          <table className={styles.dataTable} id="resourcesTable">
            <thead>
              <tr>
                <th>Resource</th>
                <th>Type</th>
                <th>Associations</th>
                <th>File</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredResources.map((res) => (
                <tr key={res.id}>
                  <td className={styles.primaryCell}>
                    {res.title}
                    <span className={styles.subline}>
                      Label: &quot;{res.downloadLabel}&quot;
                    </span>
                  </td>
                  <td>
                    <span
                      style={{
                        padding: "3px 8px",
                        borderRadius: "6px",
                        background: "#edf5ff",
                        color: "#082f68",
                        fontWeight: 700,
                        fontSize: "11px",
                      }}
                    >
                      {res.type}
                    </span>
                  </td>
                  <td style={{ color: "#62758d", fontSize: "12px" }}>
                    {res.associations}
                  </td>
                  <td>
                    <strong>{res.fileFormat}</strong>
                    <span className={styles.subline}>{res.fileSize}</span>
                  </td>
                  <td>
                    <span
                      className={`${styles.status} ${
                        res.status === "Published"
                          ? styles.statusPublished
                          : styles.statusDraft
                      }`}
                    >
                      {res.status}
                    </span>
                  </td>
                  <td>
                    <div className={styles.rowActions}>
                      <button
                        className={`${styles.btn} ${styles.btnSmall}`}
                        onClick={() => handleOpenEdit(res)}
                        id={`edit-res-${res.id}`}
                      >
                        Edit
                      </button>
                      <button
                        className={`${styles.btn} ${styles.btnSmall}`}
                        onClick={() =>
                          showToast("File replacement modal ready for Stage 10.")
                        }
                      >
                        Replace
                      </button>
                      <button
                        className={`${styles.btn} ${styles.btnSmall} ${styles.btnDanger}`}
                        onClick={() => handleDelete(res.id, res.title)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredResources.length === 0 && (
                <tr>
                  <td colSpan={6} style={{ textAlign: "center", padding: "30px", color: "#62758d" }}>
                    No matching technical resources found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </article>

      {/* Resource Editor */}
      {isEditorOpen && (
        <article className={styles.panel} id="resourceEditor" style={{ marginTop: "24px" }}>
          <div className={styles.panelHead}>
            <div>
              <h2>{editingResource ? "Edit Resource" : "Add Resource"}</h2>
              <p>
                Upload, replace, publish, unpublish and associate documents in this UX
                prototype.
              </p>
            </div>
          </div>

          <form onSubmit={handleSave}>
            <div className={styles.panelBody}>
              <div className={styles.formGrid}>
                <label className={`${styles.formGroup} ${styles.span2}`}>
                  <span className={styles.formLabel}>
                    Resource Title <span className={styles.required}>*</span>
                  </span>
                  <input
                    className={styles.field}
                    value={formData.title || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    placeholder="e.g. Liquid Handling Master Catalogue"
                    required
                  />
                </label>

                <label className={styles.formGroup}>
                  <span className={styles.formLabel}>Resource Type</span>
                  <select
                    className={styles.select}
                    value={formData.type || "Catalogue"}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        type: e.target.value as ResourceType,
                      })
                    }
                  >
                    <option value="Catalogue">Catalogue</option>
                    <option value="Brochure">Brochure</option>
                    <option value="Datasheet">Datasheet</option>
                    <option value="Manual">Manual</option>
                    <option value="Certificate">Certificate</option>
                    <option value="Calibration-related">Calibration-related</option>
                    <option value="Other Technical File">Other Technical File</option>
                  </select>
                </label>

                <label className={styles.formGroup}>
                  <span className={styles.formLabel}>Download Button Label</span>
                  <input
                    className={styles.field}
                    value={formData.downloadLabel || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, downloadLabel: e.target.value })
                    }
                    placeholder="e.g. Download Catalogue (PDF)"
                  />
                </label>

                <div className={`${styles.formGroup} ${styles.span2}`}>
                  <span className={styles.formLabel}>File Asset</span>
                  <div className={styles.uploadBox}>
                    <strong>Choose PDF / Document file</strong>
                    <span>Local prototype UI; connects to S3/CDN storage in Stage 11.</span>
                    <input type="file" accept=".pdf,.doc,.docx,.xls,.xlsx" />
                  </div>
                </div>

                <label className={styles.formGroup}>
                  <span className={styles.formLabel}>Brand Association</span>
                  <select
                    className={styles.select}
                    value={formData.brandAssoc || "None"}
                    onChange={(e) =>
                      setFormData({ ...formData, brandAssoc: e.target.value })
                    }
                  >
                    <option value="None">None / Universal</option>
                    <option value="LABXE">LABXE</option>
                    <option value="SSCIENCES">SSCIENCES</option>
                    <option value="DANWER">DANWER</option>
                  </select>
                </label>

                <label className={styles.formGroup}>
                  <span className={styles.formLabel}>Category Association</span>
                  <select
                    className={styles.select}
                    value={formData.categoryAssoc || "None"}
                    onChange={(e) =>
                      setFormData({ ...formData, categoryAssoc: e.target.value })
                    }
                  >
                    <option value="None">None</option>
                    <option value="Micropipettes">Micropipettes</option>
                    <option value="Pipette Tips">Pipette Tips</option>
                    <option value="Bottle Top Dispensers">Bottle Top Dispensers</option>
                    <option value="Pipette Controllers">Pipette Controllers</option>
                    <option value="Lab Instruments">Lab Instruments</option>
                  </select>
                </label>

                <label className={styles.formGroup}>
                  <span className={styles.formLabel}>Product Association</span>
                  <select
                    className={styles.select}
                    value={formData.productAssoc || "None"}
                    onChange={(e) =>
                      setFormData({ ...formData, productAssoc: e.target.value })
                    }
                  >
                    <option value="None">None</option>
                    <option value="LABXE Micropipette Single Channel">
                      LABXE Micropipette Single Channel
                    </option>
                    <option value="LABXE Micropipette Multi Channel">
                      LABXE Micropipette Multi Channel
                    </option>
                    <option value="Universal Pipette Tips (Racked)">
                      Universal Pipette Tips (Racked)
                    </option>
                    <option value="Bottle Top Dispenser">Bottle Top Dispenser</option>
                  </select>
                </label>

                <label className={styles.formGroup}>
                  <span className={styles.formLabel}>Publication Status</span>
                  <select
                    className={styles.select}
                    value={formData.status || "Published"}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        status: e.target.value as "Published" | "Draft",
                      })
                    }
                  >
                    <option value="Published">Published</option>
                    <option value="Draft">Draft</option>
                  </select>
                </label>
              </div>

              {/* SEO Mini Section */}
              <details className={styles.seoMini}>
                <summary>
                  Search appearance (SEO) <span className={styles.help}>Optional</span>
                </summary>
                <div className={styles.seoMiniBody}>
                  <p className={styles.seoMiniNote}>
                    Keep everyday editing simple. Use these essentials here, or open Advanced
                    SEO for canonical, robots, schema, sitemap and social metadata.
                  </p>
                  <div className={styles.formGrid}>
                    <label className={`${styles.formGroup} ${styles.span2}`}>
                      <span className={styles.formLabel}>SEO Title</span>
                      <input
                        className={styles.field}
                        value={formData.seoTitle || ""}
                        onChange={(e) =>
                          setFormData({ ...formData, seoTitle: e.target.value })
                        }
                        placeholder="[Resource SEO title] | MicropipetteManufacturer.com"
                      />
                    </label>

                    <label className={`${styles.formGroup} ${styles.span2}`}>
                      <span className={styles.formLabel}>Meta Description</span>
                      <textarea
                        className={styles.textarea}
                        value={formData.metaDesc || ""}
                        onChange={(e) =>
                          setFormData({ ...formData, metaDesc: e.target.value })
                        }
                        placeholder="Resource description for search engine result snippets..."
                        style={{ minHeight: "72px" }}
                      />
                    </label>

                    <div className={styles.formGroup}>
                      <span className={styles.formLabel}>More controls</span>
                      <Link
                        href="/admin/settings"
                        className={styles.btn}
                        style={{ display: "inline-flex", width: "fit-content" }}
                      >
                        Open Advanced SEO ↗
                      </Link>
                    </div>
                  </div>
                </div>
              </details>
            </div>

            <div className={styles.panelFoot}>
              <button
                type="button"
                className={styles.btn}
                onClick={handleCloseEditor}
              >
                Cancel
              </button>
              <button
                type="submit"
                className={`${styles.btn} ${styles.btnPrimary}`}
                id="btn-save-resource"
              >
                Save Resource
              </button>
            </div>
          </form>
        </article>
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className={`${styles.toast} ${styles.toastShow}`}>
          {toastMessage}
        </div>
      )}
    </div>
  );
}
