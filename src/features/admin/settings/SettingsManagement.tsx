"use client";

import { useState } from "react";
import styles from "../Admin.module.css";
import {
  AdminSettingsData,
  INITIAL_ADMIN_SETTINGS,
} from "../admin.data";

type SettingsTab = "site" | "seo" | "advanced-seo" | "contact";

export default function SettingsManagement() {
  const [settings, setSettings] = useState<AdminSettingsData>(
    INITIAL_ADMIN_SETTINGS
  );
  const [activeTab, setActiveTab] = useState<SettingsTab>("site");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Advanced SEO state
  const [selectedSeoPage, setSelectedSeoPage] = useState<string>("Homepage");
  const [seoTitle, setSeoTitle] = useState(
    "Micropipette Manufacturer & Laboratory Liquid Handling Solutions"
  );
  const [seoDesc, setSeoDesc] = useState(
    "Certified manufacturer of variable volume micropipettes, pipette tips, and bottle-top dispensers for global laboratories."
  );
  const [canonicalUrl, setCanonicalUrl] = useState(
    "https://micropipettemanufacturer.com/"
  );
  const [robotsDirectives, setRobotsDirectives] = useState({
    noindex: false,
    nofollow: false,
    noarchive: false,
    nosnippet: false,
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleSaveAll = () => {
    showToast("Website settings and SEO configuration saved successfully.");
  };

  const handlePageSelectChange = (pageName: string) => {
    setSelectedSeoPage(pageName);
    const found = settings.pageRecords.find((r) => r.pageName === pageName);
    if (found) {
      setSeoTitle(found.seoTitle);
      setSeoDesc(found.metaDesc);
      setCanonicalUrl(found.canonical);
    } else {
      setSeoTitle(`${pageName} | MicropipetteManufacturer.com`);
      setSeoDesc(settings.defaultMetaDescription);
      setCanonicalUrl(
        `https://micropipettemanufacturer.com/${pageName.toLowerCase().replace(/\s+/g, "-")}/`
      );
    }
  };

  return (
    <div className={styles.workspace}>
      <div className={styles.pageHead}>
        <div>
          <div className={styles.eyebrow}>
            Phase 4.12 · SEO / Website Settings
          </div>
          <h1>SEO / Settings</h1>
          <p className={styles.pageDesc}>
            Manage site identity, page metadata, crawl directives, structured data,
            sitemaps and public contact settings in one prototype workspace.
          </p>
        </div>
        <div className={styles.pageActions}>
          <button
            className={`${styles.btn} ${styles.btnPrimary}`}
            onClick={handleSaveAll}
            id="admin-btn-save-settings"
          >
            Save Settings
          </button>
        </div>
      </div>

      <article className={styles.panel}>
        {/* Navigation Tabs */}
        <div className={styles.settingsTabs}>
          <button
            className={`${styles.settingsTab} ${
              activeTab === "site" ? styles.settingsTabActive : ""
            }`}
            onClick={() => setActiveTab("site")}
            type="button"
          >
            Site Identity
          </button>
          <button
            className={`${styles.settingsTab} ${
              activeTab === "seo" ? styles.settingsTabActive : ""
            }`}
            onClick={() => setActiveTab("seo")}
            type="button"
          >
            SEO Defaults
          </button>
          <button
            className={`${styles.settingsTab} ${
              activeTab === "advanced-seo" ? styles.settingsTabActive : ""
            }`}
            onClick={() => setActiveTab("advanced-seo")}
            type="button"
          >
            Advanced SEO & SERP Preview
          </button>
          <button
            className={`${styles.settingsTab} ${
              activeTab === "contact" ? styles.settingsTabActive : ""
            }`}
            onClick={() => setActiveTab("contact")}
            type="button"
          >
            Contact & Social
          </button>
        </div>

        {/* Tab 1: Site Identity */}
        {activeTab === "site" && (
          <div className={styles.settingsPane}>
            <div className={styles.formGrid}>
              <label className={styles.formGroup}>
                <span className={styles.formLabel}>Site Name</span>
                <input
                  className={styles.field}
                  value={settings.siteName}
                  onChange={(e) =>
                    setSettings({ ...settings, siteName: e.target.value })
                  }
                />
              </label>

              <label className={styles.formGroup}>
                <span className={styles.formLabel}>Site Tagline</span>
                <input
                  className={styles.field}
                  value={settings.tagline}
                  onChange={(e) =>
                    setSettings({ ...settings, tagline: e.target.value })
                  }
                />
              </label>

              <label className={`${styles.formGroup} ${styles.span2}`}>
                <span className={styles.formLabel}>Default Site Description</span>
                <textarea
                  className={styles.textarea}
                  value={settings.defaultDescription}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      defaultDescription: e.target.value,
                    })
                  }
                  style={{ minHeight: "85px" }}
                />
              </label>

              <div className={styles.formGroup}>
                <span className={styles.formLabel}>Primary Logo Asset</span>
                <input
                  className={styles.field}
                  value={settings.primaryLogo}
                  readOnly
                />
                <span className={styles.help}>Self-hosted in public/images/brand/</span>
              </div>

              <div className={styles.formGroup}>
                <span className={styles.formLabel}>Favicon Asset</span>
                <input
                  className={styles.field}
                  value={settings.favicon}
                  readOnly
                />
                <span className={styles.help}>Served from public/favicon.ico</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: SEO Defaults */}
        {activeTab === "seo" && (
          <div className={styles.settingsPane}>
            <div className={styles.formGrid}>
              <label className={`${styles.formGroup} ${styles.span2}`}>
                <span className={styles.formLabel}>Default SEO Title Pattern</span>
                <input
                  className={styles.field}
                  value={settings.defaultTitlePattern}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      defaultTitlePattern: e.target.value,
                    })
                  }
                />
              </label>

              <label className={`${styles.formGroup} ${styles.span2}`}>
                <span className={styles.formLabel}>Default Meta Description</span>
                <textarea
                  className={styles.textarea}
                  value={settings.defaultMetaDescription}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      defaultMetaDescription: e.target.value,
                    })
                  }
                  style={{ minHeight: "75px" }}
                />
              </label>

              <label className={styles.formGroup}>
                <span className={styles.formLabel}>Default Canonical Behavior</span>
                <input
                  className={styles.field}
                  value={settings.defaultCanonical}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      defaultCanonical: e.target.value,
                    })
                  }
                />
              </label>

              <label className={styles.formGroup}>
                <span className={styles.formLabel}>Default Robots Directive</span>
                <select
                  className={styles.select}
                  value={settings.defaultRobots}
                  onChange={(e) =>
                    setSettings({ ...settings, defaultRobots: e.target.value })
                  }
                >
                  <option value="Index, follow">Index, follow</option>
                  <option value="Noindex, follow">Noindex, follow</option>
                  <option value="Index, nofollow">Index, nofollow</option>
                  <option value="Noindex, nofollow">Noindex, nofollow</option>
                </select>
              </label>

              <label className={styles.formGroup}>
                <span className={styles.formLabel}>Open Graph Default Image</span>
                <input
                  className={styles.field}
                  value={settings.openGraphImage}
                  onChange={(e) =>
                    setSettings({ ...settings, openGraphImage: e.target.value })
                  }
                />
              </label>

              <label className={styles.formGroup}>
                <span className={styles.formLabel}>Twitter / X Card Type</span>
                <select
                  className={styles.select}
                  value={settings.twitterCard}
                  onChange={(e) =>
                    setSettings({ ...settings, twitterCard: e.target.value })
                  }
                >
                  <option value="Summary large image">Summary large image</option>
                  <option value="Summary">Summary</option>
                </select>
              </label>

              <div className={`${styles.formGroup} ${styles.span2}`} style={{ marginTop: "14px" }}>
                <span className={styles.formLabel}>Registered Core Page Records</span>
                <div className={styles.tableWrap}>
                  <table className={styles.dataTable}>
                    <thead>
                      <tr>
                        <th>Page</th>
                        <th>Path</th>
                        <th>Canonical</th>
                        <th>Robots</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {settings.pageRecords.map((rec) => (
                        <tr key={rec.id}>
                          <td className={styles.primaryCell}>{rec.pageName}</td>
                          <td>
                            <code>{rec.path}</code>
                          </td>
                          <td style={{ color: "#62758d", fontSize: "12px" }}>
                            {rec.canonical}
                          </td>
                          <td>
                            <span
                              className={`${styles.status} ${styles.statusPublished}`}
                            >
                              {rec.robots}
                            </span>
                          </td>
                          <td>
                            <button
                              type="button"
                              className={`${styles.btn} ${styles.btnSmall}`}
                              onClick={() => {
                                handlePageSelectChange(rec.pageName);
                                setActiveTab("advanced-seo");
                              }}
                            >
                              Edit SEO →
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Advanced SEO & SERP Preview */}
        {activeTab === "advanced-seo" && (
          <div className={styles.settingsPane}>
            <div className={styles.seoWorkspace}>
              <section className={styles.seoBlock}>
                <div className={styles.seoBlockHead}>
                  <h3>Page-Level Advanced SEO & Google SERP Preview</h3>
                  <p>
                    Edit search metadata and crawl directives for an individual public page
                    or content record.
                  </p>
                </div>

                <div className={styles.seoBlockBody}>
                  <div className={styles.seoSplit}>
                    {/* Left Form */}
                    <div className={styles.formGrid}>
                      <label className={`${styles.formGroup} ${styles.span2}`}>
                        <span className={styles.formLabel}>Select Target Page / Route</span>
                        <select
                          className={styles.select}
                          value={selectedSeoPage}
                          onChange={(e) => handlePageSelectChange(e.target.value)}
                        >
                          <option value="Homepage">Homepage (/)</option>
                          <option value="Products Listing">Products Listing (/products/)</option>
                          <option value="Brand Portfolio">Brand Portfolio (/brands/)</option>
                          <option value="Resources & Download Center">
                            Resources & Download Center (/resources/)
                          </option>
                          <option value="OEM & Private Label">
                            OEM & Private Label (/oem/)
                          </option>
                          <option value="About Us">About Us (/about/)</option>
                          <option value="Contact Us">Contact Us (/contact/)</option>
                          <option value="FAQ">FAQ (/faq/)</option>
                        </select>
                      </label>

                      <label className={`${styles.formGroup} ${styles.span2}`}>
                        <span className={styles.charLine}>
                          <span className={styles.formLabel}>SEO Meta Title</span>
                          <span className={styles.charCount}>
                            {seoTitle.length} / 70 characters
                          </span>
                        </span>
                        <input
                          className={styles.field}
                          value={seoTitle}
                          maxLength={70}
                          onChange={(e) => setSeoTitle(e.target.value)}
                        />
                      </label>

                      <label className={`${styles.formGroup} ${styles.span2}`}>
                        <span className={styles.charLine}>
                          <span className={styles.formLabel}>Meta Description</span>
                          <span className={styles.charCount}>
                            {seoDesc.length} / 160 characters
                          </span>
                        </span>
                        <textarea
                          className={styles.textarea}
                          value={seoDesc}
                          maxLength={160}
                          onChange={(e) => setSeoDesc(e.target.value)}
                          style={{ minHeight: "85px" }}
                        />
                      </label>

                      <label className={`${styles.formGroup} ${styles.span2}`}>
                        <span className={styles.formLabel}>Canonical URL</span>
                        <input
                          className={styles.field}
                          value={canonicalUrl}
                          onChange={(e) => setCanonicalUrl(e.target.value)}
                        />
                      </label>

                      <div className={`${styles.formGroup} ${styles.span2}`}>
                        <span className={styles.formLabel}>Search Crawl Directives</span>
                        <div className={styles.seoChecks}>
                          <label className={styles.seoCheck}>
                            <input
                              type="checkbox"
                              checked={robotsDirectives.noindex}
                              onChange={(e) =>
                                setRobotsDirectives({
                                  ...robotsDirectives,
                                  noindex: e.target.checked,
                                })
                              }
                            />
                            noindex (hide from search)
                          </label>

                          <label className={styles.seoCheck}>
                            <input
                              type="checkbox"
                              checked={robotsDirectives.nofollow}
                              onChange={(e) =>
                                setRobotsDirectives({
                                  ...robotsDirectives,
                                  nofollow: e.target.checked,
                                })
                              }
                            />
                            nofollow (do not follow links)
                          </label>

                          <label className={styles.seoCheck}>
                            <input
                              type="checkbox"
                              checked={robotsDirectives.noarchive}
                              onChange={(e) =>
                                setRobotsDirectives({
                                  ...robotsDirectives,
                                  noarchive: e.target.checked,
                                })
                              }
                            />
                            noarchive (no cached link)
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Right: Live Google SERP Snippet Preview */}
                    <div>
                      <div className={styles.searchPreview}>
                        <div className={styles.searchPreviewLabel}>
                          Google Search Result Preview
                        </div>
                        <div className={styles.searchPreviewSite}>
                          <div className={styles.searchPreviewFavicon}>M</div>
                          <div>
                            <div className={styles.searchPreviewDomain}>
                              micropipettemanufacturer.com
                            </div>
                            <div className={styles.searchPreviewUrl}>
                              {canonicalUrl}
                            </div>
                          </div>
                        </div>
                        <div className={styles.searchPreviewTitle}>
                          {seoTitle || "Page Title | MicropipetteManufacturer.com"}
                        </div>
                        <div className={styles.searchPreviewDesc}>
                          {seoDesc ||
                            "Meta description snippet displayed in Google search results."}
                        </div>
                      </div>

                      <div className={styles.seoStatusGrid}>
                        <div className={styles.seoStatusCard}>
                          <strong>
                            <span className={styles.seoStatusDot} />
                            Indexable
                          </strong>
                          <span>
                            {robotsDirectives.noindex ? "Noindex active" : "Index, follow"}
                          </span>
                        </div>
                        <div className={styles.seoStatusCard}>
                          <strong>
                            <span className={styles.seoStatusDot} />
                            Canonical
                          </strong>
                          <span>Self-referencing</span>
                        </div>
                        <div className={styles.seoStatusCard}>
                          <strong>
                            <span className={styles.seoStatusDot} />
                            Schema
                          </strong>
                          <span>JSON-LD active</span>
                        </div>
                        <div className={styles.seoStatusCard}>
                          <strong>
                            <span className={styles.seoStatusDot} />
                            Sitemap
                          </strong>
                          <span>Included (/sitemap.xml)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Structured Data & Schema.org */}
              <section className={styles.seoBlock}>
                <div className={styles.seoBlockHead}>
                  <h3>Structured Data (Schema.org JSON-LD)</h3>
                  <p>
                    Verified structured data injection on production Next.js layout and
                    pages.
                  </p>
                </div>
                <div className={styles.seoBlockBody}>
                  <div className={styles.schemaGrid}>
                    <div className={styles.schemaCard}>
                      <strong>Organization Schema</strong>
                      <span>Brand entity, logo, contact points, ISO certs</span>
                      <span className={styles.schemaState}>✓ Active in layout.tsx</span>
                    </div>
                    <div className={styles.schemaCard}>
                      <strong>WebSite Schema</strong>
                      <span>Site search action & verified domain hierarchy</span>
                      <span className={styles.schemaState}>✓ Active in layout.tsx</span>
                    </div>
                    <div className={styles.schemaCard}>
                      <strong>Product Schema</strong>
                      <span>SKU, ISO 8655 tolerances, volume specs</span>
                      <span className={styles.schemaState}>✓ Active in /products/[slug]</span>
                    </div>
                    <div className={styles.schemaCard}>
                      <strong>Article Schema</strong>
                      <span>Author, publication date, headline, reading time</span>
                      <span className={styles.schemaState}>✓ Active in /blog/[slug]</span>
                    </div>
                    <div className={styles.schemaCard}>
                      <strong>BreadcrumbList Schema</strong>
                      <span>Navigational breadcrumbs across all inner routes</span>
                      <span className={styles.schemaState}>✓ Active in shared UI</span>
                    </div>
                    <div className={styles.schemaCard}>
                      <strong>FAQPage Schema</strong>
                      <span>Question/Answer pairs for rich snippet eligibility</span>
                      <span className={styles.schemaState}>✓ Active in /faq</span>
                    </div>
                  </div>
                </div>
              </section>

              {/* Robots.txt Preview */}
              <section className={styles.seoBlock}>
                <div className={styles.seoBlockHead}>
                  <h3>Crawl Directives (robots.txt preview)</h3>
                  <p>
                    Generated automatically by Next.js metadata route at /robots.txt
                  </p>
                </div>
                <div className={styles.seoBlockBody}>
                  <textarea
                    className={`${styles.textarea} ${styles.robotsEditor}`}
                    readOnly
                    value={`User-Agent: *\nAllow: /\nDisallow: /admin/\nDisallow: /api/\n\nSitemap: https://micropipettemanufacturer.com/sitemap.xml`}
                  />
                  <div className={styles.seoMuted}>
                    Generated via <code>src/app/robots.ts</code> and strictly protects
                    admin routes from crawling while providing the sitemap directive to
                    crawlers.
                  </div>
                </div>
              </section>
            </div>
          </div>
        )}

        {/* Tab 4: Contact & Social */}
        {activeTab === "contact" && (
          <div className={styles.settingsPane}>
            <div className={styles.formGrid}>
              <label className={styles.formGroup}>
                <span className={styles.formLabel}>Corporate Sales Email</span>
                <input
                  type="email"
                  className={styles.field}
                  value={settings.contactEmail}
                  onChange={(e) =>
                    setSettings({ ...settings, contactEmail: e.target.value })
                  }
                />
              </label>

              <label className={styles.formGroup}>
                <span className={styles.formLabel}>Official Phone / WhatsApp</span>
                <input
                  type="tel"
                  className={styles.field}
                  value={settings.contactPhone}
                  onChange={(e) =>
                    setSettings({ ...settings, contactPhone: e.target.value })
                  }
                />
              </label>

              <label className={`${styles.formGroup} ${styles.span2}`}>
                <span className={styles.formLabel}>Manufacturing Facility Address</span>
                <textarea
                  className={styles.textarea}
                  value={settings.address}
                  onChange={(e) =>
                    setSettings({ ...settings, address: e.target.value })
                  }
                  style={{ minHeight: "80px" }}
                />
              </label>

              <label className={styles.formGroup}>
                <span className={styles.formLabel}>LinkedIn Profile URL</span>
                <input
                  className={styles.field}
                  value={settings.linkedin}
                  onChange={(e) =>
                    setSettings({ ...settings, linkedin: e.target.value })
                  }
                />
              </label>

              <label className={styles.formGroup}>
                <span className={styles.formLabel}>Twitter / X Profile URL</span>
                <input
                  className={styles.field}
                  value={settings.twitter}
                  onChange={(e) =>
                    setSettings({ ...settings, twitter: e.target.value })
                  }
                />
              </label>
            </div>
          </div>
        )}

        <div className={styles.panelFoot}>
          <button
            type="button"
            className={`${styles.btn} ${styles.btnPrimary}`}
            onClick={handleSaveAll}
          >
            Save All Settings
          </button>
        </div>
      </article>

      {/* Toast Notification */}
      {toastMessage && (
        <div className={`${styles.toast} ${styles.toastShow}`}>
          {toastMessage}
        </div>
      )}
    </div>
  );
}
