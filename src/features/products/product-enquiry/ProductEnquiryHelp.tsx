"use client";

import Link from "next/link";
import styles from "./ProductEnquiry.module.css";

export default function ProductEnquiryHelp() {
  return (
    <section className={styles.rqHelp}>
      <div>
        <span
          className={styles.typeTag}
          style={{
            color: "#fff",
            background: "rgba(255, 255, 255, 0.15)",
            borderColor: "rgba(255, 255, 255, 0.3)",
          }}
        >
          NEED HELP?
        </span>
        <h2>Not Sure Which Micropipette to Select?</h2>
        <p>
          Use our universal quotation workflow for technical guidance, bulk institutional purchase, distributor requirements, or OEM / private-label discussions.
        </p>
      </div>
      <Link className={styles.btnSecondary} href="/request-quote">
        Universal Quote →
      </Link>
    </section>
  );
}
