"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./Applications.module.css";
import { APPLICATIONS_DATA } from "./applications.data";
import QuoteModal from "@/components/ui/QuoteModal";

export default function ApplicationsListingApp() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [quoteSubject, setQuoteSubject] = useState("");

  const handleOpenQuote = (appName = "") => {
    setQuoteSubject(
      appName ? `${appName} Application Guidance` : "Application Pipetting Consultation"
    );
    setQuoteModalOpen(true);
  };

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case "dna":
        return (
          <svg
            className={styles.appIconSvg}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M2 15c6.667-6 13.333 0 20-6" />
            <path d="M9 22c1.798-1.998 2.518-3.995 2.807-5.993" />
            <path d="M15 2c-1.798 1.998-2.518 3.995-2.807 5.993" />
            <path d="m17 6-2.5-2.5" />
            <path d="m14 8-1-1" />
            <path d="m7 18 2.5 2.5" />
            <path d="m3.5 14.5.5.5" />
            <path d="m20 9 .5.5" />
            <path d="m6.5 12.5 1 1" />
            <path d="m16.5 10.5 1 1" />
            <path d="m10 16 1.5 1.5" />
          </svg>
        );
      case "clinical":
        return (
          <svg
            className={styles.appIconSvg}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 14c1.66 0 3-1.34 3-3 0-2-3-6-3-6s-3 4-3 6c0 1.66 1.34 3 3 3Z" />
            <path d="M5 21a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
            <polyline points="17 21 17 13 7 13 7 21" />
            <polyline points="7 3 7 8 15 8" />
          </svg>
        );
      case "pharma":
        return (
          <svg
            className={styles.appIconSvg}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z" />
            <path d="m8.5 8.5 7 7" />
          </svg>
        );
      case "food":
        return (
          <svg
            className={styles.appIconSvg}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5" />
            <path d="M8.5 8.5v.01" />
            <path d="M16 15.5v.01" />
            <path d="M12 12v.01" />
            <path d="M11 17v.01" />
            <path d="M7 14v.01" />
          </svg>
        );
      case "environmental":
        return (
          <svg
            className={styles.appIconSvg}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
            <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
          </svg>
        );
      case "academic":
      default:
        return (
          <svg
            className={styles.appIconSvg}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21.42 10.922a1 1 0 0 0-.019-.838L12.83 2.18a2 2 0 0 0-1.66 0L2.6 10.08a1 1 0 0 0 0 1.832l8.57 7.908a2 2 0 0 0 1.66 0l8.57-7.9a1 1 0 0 0 .02-.998Z" />
            <path d="M6 12v5c3 3 9 3 12 0v-5" />
          </svg>
        );
    }
  };

  return (
    <div className={styles.appPage}>
      {/* Compact Breadcrumb Hero */}
      <section className={styles.heroCompact}>
        <div className="wrap">
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className={styles.breadcrumbSep}>›</span>
            <span>Applications</span>
          </nav>
          <h1>Applications</h1>
        </div>
      </section>

      {/* Main Applications Listing Section */}
      <section className={styles.appSection}>
        <div className="wrap">
          <div className={styles.appIntro}>
            <span className={styles.typeTag}>APPLICATION WORKFLOWS</span>
            <h2>Liquid Handling Instruments Engineered for Critical Workflows</h2>
            <p>
              Explore dedicated laboratory application areas served by our
              micropipettes, liquid dispensers, and calibration systems. From
              single-cell genomic assays to heavy-duty environmental testing, our
              instruments are calibrated to ISO 8655 standards for maximum repeatability.
            </p>
          </div>

          <div className={styles.appGrid}>
            {APPLICATIONS_DATA.map((app) => (
              <article key={app.id} className={styles.appCard}>
                <div className={styles.appMedia}>
                  <div className={styles.appIconWrapper}>{renderIcon(app.iconName)}</div>
                  <span className={styles.appMediaTag}>{app.title}</span>
                </div>

                <div className={styles.appBody}>
                  <span className={styles.typeTag}>{app.tag}</span>
                  <h2>{app.title}</h2>
                  <p>{app.description}</p>

                  <div className={styles.workflowTags}>
                    {app.workflows.map((wf) => (
                      <span key={wf}>{wf}</span>
                    ))}
                  </div>

                  <div className={styles.appActions}>
                    <Link
                      href="/products"
                      className={`btn secondary ${styles.ctaBtn}`}
                      id={`explore-app-${app.id}`}
                    >
                      Explore Suitable Products →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Bottom Consultation Banner */}
          <section className={styles.appCta}>
            <div>
              <span className={styles.typeTag} style={{ color: "#ff8469" }}>
                APPLICATION CONSULTATION
              </span>
              <h2>Need Application-Specific Pipetting Guidance?</h2>
              <p>
                Our technical application engineers can help select or customize
                liquid handling tools for specific assay protocols, viscosity
                challenges, microplate geometries, or regulatory compliance standards.
              </p>
            </div>

            <div className={styles.appCtaActions}>
              <button
                type="button"
                className="btn primary"
                onClick={() => handleOpenQuote()}
                id="app-consultation-btn"
              >
                Request Application Consultation →
              </button>
              <Link href="/products" className={`btn secondary ${styles.appCtaSecondary}`}>
                Browse All Products →
              </Link>
            </div>
          </section>
        </div>
      </section>

      {/* Quote Modal */}
      <QuoteModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        defaultProduct={quoteSubject}
      />
    </div>
  );
}
