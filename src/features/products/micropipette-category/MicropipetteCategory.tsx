import Link from "next/link";
// Reuses the already-migrated hero/breadcrumb/section/panel/title treatment
// from Product Listing (identical rules in both confirmed prototypes)
// instead of redefining it, and instead of the stale globals.css
// `.section-title`/`.section-panel` (pre-refinement, doesn't match the
// confirmed v13 design).
import pl from "@/features/products/product-listing/ProductListing.module.css";
import styles from "./MicropipetteCategory.module.css";
import MicropipetteCategoryGrid from "./MicropipetteCategoryGrid";
import FeaturedMicropipettes from "./FeaturedMicropipettes";
import MicropipetteHelpCTA from "./MicropipetteHelpCTA";

export default function MicropipetteCategory() {
  return (
    <div className={pl.page}>
      <section className={pl.hero}>
        <div className={pl.wrap}>
          <nav className={pl.breadcrumb} aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className={pl.chevron} aria-hidden="true">
              ›
            </span>
            <Link href="/products">Products</Link>
            <span className={pl.chevron} aria-hidden="true">
              ›
            </span>
            <span>Micropipettes</span>
          </nav>
          <h1 className={pl.title}>Micropipettes</h1>
        </div>
      </section>

      <section className={pl.section}>
        <div className={pl.wrap}>
          <div className={`${pl.panel} ${styles.categoryPanel}`}>
            <h2 className={pl.sectionTitle}>MICROPIPETTE CATEGORIES</h2>
            <MicropipetteCategoryGrid />
          </div>

          <FeaturedMicropipettes />
          <MicropipetteHelpCTA />
        </div>
      </section>
    </div>
  );
}
