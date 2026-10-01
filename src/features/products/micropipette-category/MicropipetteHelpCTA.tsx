import Link from "next/link";
import featuredStyles from "@/features/home/featured-products/FeaturedProducts.module.css";
import styles from "./MicropipetteCategory.module.css";

export default function MicropipetteHelpCTA() {
  return (
    <div className={styles.helpCta}>
      <div>
        <span className={featuredStyles.typeTag}>B2B SUPPORT</span>
        <h2>Need Help Choosing a Micropipette?</h2>
        <p>
          Connect with the sales team for product selection, quotation,
          OEM/private-label or technical guidance.
        </p>
      </div>
      <div className={styles.ctaActions}>
        <Link className="btn primary" href="/request-quote">
          Request Quote →
        </Link>
        <Link className="btn secondary" href="/contact">
          Contact Sales
        </Link>
      </div>
    </div>
  );
}
