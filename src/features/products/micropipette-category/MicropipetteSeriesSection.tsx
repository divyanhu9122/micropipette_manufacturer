"use client";

import Link from "next/link";
import Image from "next/image";
import pl from "@/features/products/product-listing/ProductListing.module.css";
import styles from "./MicropipetteCategory.module.css";
import { micropipetteSeriesItems } from "./micropipette-category.data";

export default function MicropipetteSeriesSection() {
  return (
    <section className={styles.seriesSection} aria-labelledby="series-heading">
      <div className={pl.panel}>
        <h2 id="series-heading" className={pl.sectionTitle}>
          MICROPIPETTE SERIES
        </h2>

        <div className={styles.seriesGrid}>
          {micropipetteSeriesItems.map((item) => (
            <article key={item.id} className={styles.seriesCard} id={item.id}>
              <div className={styles.seriesMedia} aria-hidden="true">
                {item.imageSrc ? (
                  <Image
                    src={item.imageSrc}
                    alt={item.name}
                    width={400}
                    height={225}
                    className={styles.seriesImage}
                  />
                ) : (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    <span style={{ fontSize: 24 }}>🔬</span>
                    <span style={{ fontSize: 12, fontWeight: 700, color: "#486581" }}>
                      {item.brandLabel} • {item.name}
                    </span>
                  </div>
                )}
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    padding: "3px 8px",
                    borderRadius: "999px",
                    fontSize: "11px",
                    fontWeight: 800,
                    background: "rgba(13, 65, 138, 0.1)",
                    color: "#082f68",
                    border: "1px solid rgba(13, 65, 138, 0.16)",
                  }}
                >
                  {item.brandLabel}
                </span>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    padding: "3px 8px",
                    borderRadius: "999px",
                    fontSize: "11px",
                    fontWeight: 700,
                    background: "rgba(240, 74, 42, 0.1)",
                    color: "#f04a2a",
                    border: "1px solid rgba(240, 74, 42, 0.18)",
                  }}
                >
                  {item.seriesTag}
                </span>
              </div>

              <h3>{item.name}</h3>

              {item.description ? (
                <p className={styles.seriesDesc}>{item.description}</p>
              ) : (
                <p className={styles.seriesDesc} style={{ fontStyle: "italic", color: "#829ab1" }}>
                  Product series overview and certified catalog specifications in compilation.
                </p>
              )}

              {item.specs && item.specs.length > 0 && (
                <div className={styles.seriesSpecs}>
                  {item.specs.map((spec) => (
                    <span key={spec} className={styles.seriesSpec}>
                      {spec}
                    </span>
                  ))}
                </div>
              )}

              <div className={styles.seriesFooter}>
                {item.href ? (
                  <Link href={item.href} className="btn secondary">
                    View Series Details →
                  </Link>
                ) : (
                  <Link
                    href={`/request-quote?product=${encodeURIComponent(item.name)}`}
                    className="btn secondary"
                    style={{ background: "#f0f4f8", borderColor: "#c8d7e6" }}
                  >
                    Request Specifications →
                  </Link>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
