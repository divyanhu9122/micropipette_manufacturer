"use client";

import { useEffect } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import styles from "@/features/not-found/NotFound.module.css";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorBoundary({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log error to monitoring if configured
    console.error("Application error:", error);
  }, [error]);

  return (
    <main className={styles.errorPage}>
      <Header />
      <section className={styles.errorHero}>
        <div className={`wrap ${styles.errorHeroInner}`}>
          <nav className={styles.errorBreadcrumb} aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className={styles.errorBreadcrumbSep}>›</span>
            <span>Error</span>
          </nav>

          <div className={styles.errorContent}>
            <div className={styles.errorCode} aria-hidden="true">
              500
            </div>

            <span className={styles.errorTag}>APPLICATION ERROR</span>

            <h1>Something Went Wrong</h1>

            <p>
              An unexpected error occurred while loading this page. Our
              technical team has been notified. You can try refreshing the page,
              returning to the homepage, or contacting our team for support.
            </p>

            <div className={styles.errorActions}>
              <button
                type="button"
                className="btn primary"
                onClick={() => reset()}
                id="error-retry-button"
              >
                Try Again ↻
              </button>
              <Link className="btn secondary" href="/">
                Back to Home →
              </Link>
              <Link className="btn secondary" href="/contact">
                Contact Support →
              </Link>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
