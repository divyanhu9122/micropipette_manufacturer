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
        {/* No production Request Quote / Contact Sales route is migrated yet;
            preserved as a safe placeholder pending that decision (see report). */}
        <a className="btn primary" href="#">
          Request Quote →
        </a>
        <a className="btn secondary" href="#">
          Contact Sales
        </a>
      </div>
    </div>
  );
}
