import styles from "./ProductDetail.module.css";
import type { ProductDetailDownload } from "./product-detail.data";

interface ProductDownloadsProps {
  applications: string[];
  downloads: ProductDetailDownload[];
}

export default function ProductDownloads({
  applications,
  downloads,
}: ProductDownloadsProps) {
  return (
    <>
      {/* Applications Panel */}
      <section className={styles.pdPanel} id="applications">
        <h2 className={styles.sectionTitle}>APPLICATIONS</h2>
        <div className={styles.pdPillRow}>
          {applications.map((app) => (
            <span key={app} className={styles.pillItem}>
              {app}
            </span>
          ))}
        </div>
      </section>

      {/* Downloads & Documents Panel */}
      <section className={styles.pdPanel} id="downloads">
        <h2 className={styles.sectionTitle}>DOWNLOADS & DOCUMENTS</h2>
        <div className={styles.pdDownloadList}>
          {downloads.map((doc) => (
            <article key={doc.title} className={styles.downloadItem}>
              <div>
                <strong className={styles.downloadTitle}>{doc.title}</strong>
                <span className={styles.downloadMeta}>
                  {doc.format} • {doc.size}
                </span>
              </div>
              {doc.url ? (
                <a
                  href={doc.url}
                  className={styles.downloadBtn}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Download
                </a>
              ) : (
                <span>File pending</span>
              )}
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
