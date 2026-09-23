"use client";

import { useState } from "react";
import { oemFaqs } from "./oem.data";
import styles from "./Oem.module.css";

export default function OemFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className={styles.faqSection} aria-labelledby="oem-faq-title">
      <div className={styles.wrap}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionEyebrow}>Frequently Asked Questions</div>
          <h2 id="oem-faq-title" className={styles.sectionTitle}>
            OEM Partnership Inquiries &amp; Policies
          </h2>
          <p className={styles.sectionDesc}>
            Common questions regarding minimum order quantities, private labeling
            artwork, calibration certificates, and export logistics.
          </p>
        </div>

        <div className={styles.faqList}>
          {oemFaqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={index} className={styles.faqItem}>
                <button
                  type="button"
                  className={styles.faqQuestion}
                  onClick={() => toggleFaq(index)}
                  aria-expanded={isOpen}
                >
                  <span>{faq.question}</span>
                  <span className={styles.faqToggle} aria-hidden="true">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>
                {isOpen && (
                  <div className={styles.faqAnswer}>
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
