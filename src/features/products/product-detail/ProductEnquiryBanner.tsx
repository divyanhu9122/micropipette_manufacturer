import Link from "next/link";
import styles from "./ProductDetail.module.css";

interface ProductEnquiryBannerProps {
  onOpenQuote?: () => void;
  slug?: string;
}

export default function ProductEnquiryBanner({
  onOpenQuote,
  slug,
}: ProductEnquiryBannerProps) {
  return (
    <section className={styles.pdEnquiry} id="enquiry">
      <div>
        <span className={styles.typeTag}>PRODUCT ENQUIRY</span>
        <h2>Need a Quote or Technical Support?</h2>
        <p>
          Product and model information will be automatically pre-filled when
          submitting this quotation enquiry.
        </p>
      </div>
      {slug ? (
        <Link
          href={`/products/${slug}/request-quote`}
          className={styles.actionBtnPrimary}
        >
          Request Quote →
        </Link>
      ) : (
        <button
          type="button"
          className={styles.actionBtnPrimary}
          onClick={onOpenQuote}
        >
          Request Quote →
        </button>
      )}
    </section>
  );
}
