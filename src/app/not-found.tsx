import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import styles from "@/features/not-found/NotFound.module.css";

export default function NotFound() {
  return (
    <main className={styles.errorPage}>
      <Header />
      <section className={styles.errorHero}>
        <div className={`wrap ${styles.errorHeroInner}`}>
          <nav className={styles.errorBreadcrumb} aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className={styles.errorBreadcrumbSep}>›</span>
            <span>404</span>
          </nav>

          <div className={styles.errorContent}>
            <div className={styles.errorCode} aria-hidden="true">
              404
            </div>

            <span className={styles.errorTag}>PAGE NOT FOUND</span>

            <h1>We Couldn’t Find That Page</h1>

            <p>
              The page may have been moved, renamed or is no longer available.
              You can return to the homepage, browse our scientific products or
              contact us for assistance.
            </p>

            <div className={styles.errorActions}>
              <Link className="btn primary" href="/">
                Back to Home →
              </Link>
              <Link className="btn secondary" href="/products">
                Explore Products →
              </Link>
              <Link className="btn secondary" href="/contact">
                Contact Us →
              </Link>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
