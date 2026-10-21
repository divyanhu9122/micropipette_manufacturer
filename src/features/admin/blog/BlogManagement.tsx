"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import styles from "../Admin.module.css";
import {
  AdminBlogItem,
  INITIAL_ADMIN_BLOG_ARTICLES,
} from "../admin.data";

export default function BlogManagement() {
  const [articles, setArticles] = useState<AdminBlogItem[]>(
    INITIAL_ADMIN_BLOG_ARTICLES
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<AdminBlogItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [formData, setFormData] = useState<Partial<AdminBlogItem>>({
    title: "",
    slug: "",
    category: "Liquid Handling",
    author: "Admin User",
    date: new Date().toISOString().split("T")[0],
    status: "Published",
    excerpt: "",
    content: "",
    tags: ["micropipette", "liquid handling"],
    faq: "",
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
    setEditingArticle(null);
    setFormData({
      title: "",
      slug: "",
      category: "Liquid Handling",
      author: "Admin User",
      date: new Date().toISOString().split("T")[0],
      status: "Published",
      excerpt: "",
      content: "",
      tags: ["micropipette", "liquid handling"],
      faq: "",
      seoTitle: "",
      metaDesc: "",
    });
    setIsEditorOpen(true);
  };

  const handleOpenEdit = (article: AdminBlogItem) => {
    setEditingArticle(article);
    setFormData({ ...article });
    setIsEditorOpen(true);
  };

  const handleCloseEditor = () => {
    setIsEditorOpen(false);
    setEditingArticle(null);
  };

  const handleSave = (statusToSet: "Published" | "Draft") => {
    if (!formData.title?.trim()) {
      showToast("Please provide an article title.");
      return;
    }

    if (editingArticle) {
      setArticles((prev) =>
        prev.map((a) =>
          a.id === editingArticle.id
            ? ({
                ...a,
                ...formData,
                status: statusToSet,
              } as AdminBlogItem)
            : a
        )
      );
      showToast(`Article "${formData.title}" saved as ${statusToSet}.`);
    } else {
      const newArt: AdminBlogItem = {
        id: `blog-${Date.now()}`,
        title: formData.title!,
        slug:
          formData.slug ||
          formData.title!.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""),
        category: formData.category || "Liquid Handling",
        author: formData.author || "Admin User",
        date: formData.date || new Date().toISOString().split("T")[0],
        status: statusToSet,
        excerpt: formData.excerpt || "",
        content: formData.content || "",
        tags: Array.isArray(formData.tags)
          ? formData.tags
          : String(formData.tags || "")
              .split(",")
              .map((t) => t.trim())
              .filter(Boolean),
        faq: formData.faq,
        seoTitle: formData.seoTitle,
        metaDesc: formData.metaDesc,
      };
      setArticles((prev) => [newArt, ...prev]);
      showToast(`Article "${newArt.title}" created as ${statusToSet}.`);
    }

    handleCloseEditor();
  };

  const filteredArticles = useMemo(() => {
    return articles.filter((a) => {
      const matchesSearch =
        a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.author.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus =
        statusFilter === "All" || a.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [articles, searchQuery, statusFilter]);

  return (
    <div className={styles.workspace}>
      <div className={styles.pageHead}>
        <div>
          <div className={styles.eyebrow}>Phase 4.7 · Blog Management</div>
          <h1>Blog</h1>
          <p className={styles.pageDesc}>
            Create and maintain articles supporting the public Blog Listing and Blog
            Article Detail prototypes.
          </p>
        </div>
        <div className={styles.pageActions}>
          <button
            className={`${styles.btn} ${styles.btnPrimary}`}
            onClick={handleOpenAdd}
            id="admin-btn-add-blog"
          >
            + Add Blog Article
          </button>
        </div>
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
              placeholder="Search article by title, author or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search blog articles"
            />
          </div>

          <select
            className={`${styles.select} ${styles.inputSmall}`}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All statuses</option>
            <option value="Published">Published</option>
            <option value="Draft">Draft</option>
          </select>
        </div>
      </div>

      {/* Data Table */}
      <article className={styles.panel}>
        <div className={styles.tableWrap}>
          <table className={styles.dataTable} id="blogTable">
            <thead>
              <tr>
                <th>Article</th>
                <th>Category</th>
                <th>Author</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredArticles.map((art) => (
                <tr key={art.id}>
                  <td className={styles.primaryCell}>
                    {art.title}
                    <span className={styles.subline}>/blog/{art.slug}/</span>
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
                      {art.category}
                    </span>
                  </td>
                  <td style={{ color: "#051f44", fontWeight: 600 }}>{art.author}</td>
                  <td style={{ color: "#62758d", fontSize: "12px" }}>{art.date}</td>
                  <td>
                    <span
                      className={`${styles.status} ${
                        art.status === "Published"
                          ? styles.statusPublished
                          : styles.statusDraft
                      }`}
                    >
                      {art.status}
                    </span>
                  </td>
                  <td>
                    <div className={styles.rowActions}>
                      <button
                        className={`${styles.btn} ${styles.btnSmall}`}
                        onClick={() => handleOpenEdit(art)}
                        id={`edit-blog-${art.id}`}
                      >
                        Edit
                      </button>
                      <Link
                        href={`/blog/${art.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${styles.btn} ${styles.btnSmall}`}
                      >
                        View Public ↗
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredArticles.length === 0 && (
                <tr>
                  <td colSpan={6} style={{ textAlign: "center", padding: "30px", color: "#62758d" }}>
                    No matching articles found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </article>

      {/* Article Editor */}
      {isEditorOpen && (
        <article className={styles.panel} id="blogEditor" style={{ marginTop: "24px" }}>
          <div className={styles.panelHead}>
            <div>
              <h2>{editingArticle ? "Edit Article" : "Create Blog Article"}</h2>
              <p>
                Content hierarchy supports article body, headings (TOC), FAQ and
                related-content capability.
              </p>
            </div>
          </div>

          <div className={styles.panelBody}>
            <div className={styles.formGrid}>
              <label className={`${styles.formGroup} ${styles.span2}`}>
                <span className={styles.formLabel}>
                  Article Title <span className={styles.required}>*</span>
                </span>
                <input
                  className={styles.field}
                  value={formData.title || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  placeholder="e.g. Choosing a Micropipette Range for Daily Diagnostics"
                  required
                />
              </label>

              <label className={styles.formGroup}>
                <span className={styles.formLabel}>URL Slug</span>
                <input
                  className={styles.field}
                  value={formData.slug || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, slug: e.target.value })
                  }
                  placeholder="e.g. choosing-a-micropipette-range"
                />
              </label>

              <label className={styles.formGroup}>
                <span className={styles.formLabel}>Category</span>
                <input
                  className={styles.field}
                  value={formData.category || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  placeholder="e.g. Liquid Handling"
                />
              </label>

              <label className={styles.formGroup}>
                <span className={styles.formLabel}>Author</span>
                <input
                  className={styles.field}
                  value={formData.author || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, author: e.target.value })
                  }
                  placeholder="e.g. Technical Editorial Team"
                />
              </label>

              <label className={styles.formGroup}>
                <span className={styles.formLabel}>Publish Date</span>
                <input
                  type="date"
                  className={styles.field}
                  value={formData.date || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                />
              </label>

              <label className={`${styles.formGroup} ${styles.span2}`}>
                <span className={styles.formLabel}>Excerpt / Lead Paragraph</span>
                <textarea
                  className={styles.textarea}
                  value={formData.excerpt || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, excerpt: e.target.value })
                  }
                  placeholder="Brief summary to display in article preview cards..."
                  style={{ minHeight: "75px" }}
                />
              </label>

              <div className={`${styles.formGroup} ${styles.span2}`}>
                <span className={styles.formLabel}>Article Body Content</span>
                <div className={styles.fauxEditor}>
                  <div className={styles.editorTools}>
                    <button type="button">B</button>
                    <button type="button">
                      <i>I</i>
                    </button>
                    <button type="button">H2</button>
                    <button type="button">H3</button>
                    <button type="button">•</button>
                    <button type="button">1.</button>
                    <button type="button">↗</button>
                  </div>
                  <textarea
                    className={styles.textarea}
                    value={formData.content || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, content: e.target.value })
                    }
                    placeholder="Write article content here. Use H2/H3 headings so the public page can generate a table of contents..."
                    style={{ minHeight: "180px" }}
                  />
                </div>
              </div>

              <label className={styles.formGroup}>
                <span className={styles.formLabel}>Tags (comma-separated)</span>
                <input
                  className={styles.field}
                  value={
                    Array.isArray(formData.tags)
                      ? formData.tags.join(", ")
                      : formData.tags || ""
                  }
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      tags: e.target.value.split(",").map((t) => t.trim()),
                    })
                  }
                  placeholder="micropipette, calibration, liquid handling"
                />
              </label>

              <label className={styles.formGroup}>
                <span className={styles.formLabel}>Status</span>
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

              <label className={`${styles.formGroup} ${styles.span2}`}>
                <span className={styles.formLabel}>Article-Specific FAQ (optional)</span>
                <textarea
                  className={styles.textarea}
                  value={formData.faq || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, faq: e.target.value })
                  }
                  placeholder="Q: Question?&#10;A: Verified answer..."
                  style={{ minHeight: "70px" }}
                />
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
                      placeholder="[Blog Article SEO title] | MicropipetteManufacturer.com"
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
                      placeholder="Article description for search snippets..."
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
              type="button"
              className={styles.btn}
              onClick={() => handleSave("Draft")}
            >
              Save Draft
            </button>
            <button
              type="button"
              className={`${styles.btn} ${styles.btnPrimary}`}
              onClick={() => handleSave("Published")}
              id="btn-publish-blog"
            >
              Publish Article
            </button>
          </div>
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
