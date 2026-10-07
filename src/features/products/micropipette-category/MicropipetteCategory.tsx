import Link from "next/link";
import pl from "@/features/products/product-listing/ProductListing.module.css";
import styles from "./MicropipetteCategory.module.css";
import MicropipetteCategoryGrid from "./MicropipetteCategoryGrid";
import MicropipetteSeriesSection from "./MicropipetteSeriesSection";
import ComingSoonSection from "./ComingSoonSection";
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

          <MicropipetteSeriesSection />

          <ComingSoonSection />

          <MicropipetteHelpCTA />
        </div>
      </section>
    </div>
  );
}
