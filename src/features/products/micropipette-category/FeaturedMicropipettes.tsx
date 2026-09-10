import Link from "next/link";
import Carousel from "@/components/ui/carousel/Carousel";
import shared from "@/features/home/product-categories/ProductCategories.module.css";
import featuredStyles from "@/features/home/featured-products/FeaturedProducts.module.css";
// Reuses the already-migrated, verified-correct panel/title treatment from
// Product Listing (identical rules in both confirmed prototypes) rather than
// the stale globals.css `.section-panel`/`.section-title` (pre-refinement,
// does not match the confirmed v13 design).
import pl from "@/features/products/product-listing/ProductListing.module.css";
import styles from "./MicropipetteCategory.module.css";
import { featuredMicropipetteItems } from "./micropipette-category.data";

export default function FeaturedMicropipettes() {
  return (
    <div className={styles.featuredWrap}>
      <div className={pl.panel}>
        <h2 className={pl.sectionTitle}>FEATURED MICROPIPETTES</h2>
        <div className={featuredStyles.section}>
          <Carousel
            styles={shared}
            label="Featured micropipettes, scrollable"
            previousLabel="Previous featured micropipettes"
            nextLabel="Next featured micropipettes"
          >
            {featuredMicropipetteItems.map((item) => (
              <article
                key={item.id}
                className={`${shared.card} ${featuredStyles.card}`}
              >
                <div
                  className={`${shared.media} ${featuredStyles.media}`}
                  aria-hidden="true"
                >
                  [REAL PRODUCT IMAGE]
                </div>
                <div className={featuredStyles.tagRow}>
                  <span className={featuredStyles.brandTag}>{item.brandLabel}</span>
                  <span className={featuredStyles.typeTag}>{item.typeLabel}</span>
                </div>
                <h4>{item.title}</h4>
                <p>{item.description}</p>
                <div className={featuredStyles.specs}>
                  {item.specs.map((spec, index) => (
                    <span key={`${item.id}-spec-${index}`} className={featuredStyles.spec}>
                      {spec}
                    </span>
                  ))}
                </div>
                <div className={featuredStyles.footer}>
                  <span className={featuredStyles.meta}>{item.meta}</span>
                  {/* Product Detail is not migrated yet; this points to its intended route. */}
                  <Link
                    className={`btn secondary ${featuredStyles.details}`}
                    href={`/products/${item.slug}`}
                  >
                    View Details →
                  </Link>
                </div>
              </article>
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
}
