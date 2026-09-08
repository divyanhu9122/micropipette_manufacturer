import Carousel from "@/components/ui/carousel/Carousel";
import shared from "../product-categories/ProductCategories.module.css";
import oem from "../oem/OEMSection.module.css";
import styles from "./FeaturedProducts.module.css";
import {
  featuredProducts,
  type FeaturedProduct,
} from "./featuredProducts.data";

function ProductVisual({ visual }: { visual: FeaturedProduct["visual"] }) {
  if (visual === "single")
    return (
      <div
        className={oem.pipette}
        style={{ transform: "scale(.88)", marginTop: 18 }}
      >
        <div className={oem.top} />
        <div className={oem.body} />
        <div className={oem.shaft} />
        <div className={oem.nozzle} />
      </div>
    );
  if (visual === "multi")
    return (
      <div className={shared.pipettes} style={{ marginTop: 20 }}>
        {[0, 1].map((id) => (
          <div key={id} className={shared.pipette}>
            <div className={shared.pipetteTop} />
            <div className={shared.pipetteBody} />
            <div className={shared.pipetteShaft} />
            <div className={shared.pipetteNozzle} />
          </div>
        ))}
      </div>
    );
  if (visual === "tips")
    return (
      <div className={shared.tips} style={{ marginTop: 18 }}>
        <span />
        <span />
        <span />
        <span />
      </div>
    );
  return (
    <div
      className={shared[visual]}
      style={{
        marginTop: visual === "rack" ? 26 : visual === "balance" ? 20 : 18,
      }}
    />
  );
}

export default function FeaturedProducts() {
  return (
    <section
      id="products"
      className={`${shared.section} ${styles.section}`}
      aria-labelledby="featured-products-title"
      aria-describedby="featured-products-verification"
    >
      <div className={shared.wrap}>
        <div className={shared.panel}>
          <h2 id="featured-products-title" className={shared.title}>
            FEATURED PRODUCTS
          </h2>
          <p id="featured-products-verification" className={styles.verifyNote}>
            Product specifications shown in this prototype require verification
            before publishing.
          </p>
          <Carousel
            styles={shared}
            label="Featured products, scrollable"
            previousLabel="Previous featured products"
            nextLabel="Next featured products"
          >
            {featuredProducts.map((product) => (
              <article
                key={product.id}
                className={`${shared.card} ${styles.card}`}
                data-verification-status={product.verificationStatus}
              >
                <div
                  className={`${shared.media} ${styles.media}`}
                  aria-hidden="true"
                >
                  <ProductVisual visual={product.visual} />
                </div>
                <div className={styles.tagRow}>
                  <span className={styles.brandTag}>{product.brand}</span>
                  <span className={styles.typeTag}>{product.type}</span>
                </div>
                <h4>{product.title}</h4>
                <p>{product.description}</p>
                <div className={styles.specs}>
                  {product.specs.map((spec) => (
                    <span key={spec} className={styles.spec}>
                      {spec}
                    </span>
                  ))}
                </div>
                <div className={styles.footer}>
                  <span className={styles.meta}>{product.meta}</span>
                  <a className={`btn secondary ${styles.details}`} href="#">
                    View Details →
                  </a>
                </div>
              </article>
            ))}
          </Carousel>
        </div>
      </div>
    </section>
  );
}
