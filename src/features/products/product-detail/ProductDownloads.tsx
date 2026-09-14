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
              <a
                href="#"
                className={styles.downloadBtn}
                onClick={(e) => {
                  e.preventDefault();
                  alert(
                    `Downloading ${doc.title} (${doc.format}, ${doc.size})...`,
                  );
                }}
              >
                Download
              </a>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
