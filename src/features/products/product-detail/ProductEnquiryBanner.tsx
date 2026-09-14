"use client";

import styles from "./ProductDetail.module.css";

interface ProductEnquiryBannerProps {
  onOpenQuote: () => void;
}

export default function ProductEnquiryBanner({
  onOpenQuote,
}: ProductEnquiryBannerProps) {
  return (
    <section className={styles.pdEnquiry} id="enquiry">
      <div>
        <span className={styles.typeTag}>PRODUCT ENQUIRY</span>
        <h2>Need a Quote or Technical Support?</h2>
        <p>
          Product and model information will be automatically pre-filled when
          the quote request modal opens.
        </p>
      </div>
      <button
        type="button"
        className={styles.actionBtnPrimary}
        onClick={onOpenQuote}
      >
        Request Quote →
      </button>
    </section>
  );
}
