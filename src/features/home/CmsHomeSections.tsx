import Link from "next/link";
import Image from "next/image";
import Carousel from "@/components/ui/carousel/Carousel";
import type { Category, Brand } from "@/types/cms";
import type { ProductListItem } from "@/features/products/product-listing/product-listing.data";
import shared from "./product-categories/ProductCategories.module.css";
import featured from "./featured-products/FeaturedProducts.module.css";
import brandStyles from "@/components/home/BrandShowcase.module.css";
export function CmsCategories({ categories }: { categories: Category[] }) {
  if (!categories.length) return null;
  return (
    <section className={shared.section}>
      <div className={shared.wrap}>
        <div className={shared.panel}>
          <h2 className={shared.title}>Product categories</h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))",
              gap: 20,
            }}
          >
            {categories.map((category) => (
              <article className={shared.card} key={category.id}>
                <h3>{category.name}</h3>
                {category.description && <p>{category.description}</p>}
                <Link
                  href={`/products?category=${encodeURIComponent(category.slug === "micropipettes" ? "Micropipette" : category.name)}`}
                  className="btn secondary"
                >
                  Explore products →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
export function CmsBrands({ brands }: { brands: Brand[] }) {
  if (!brands.length) return null;
  return (
    <section className="section" id="brands">
      <div className="wrap">
        <div className="brand-section">
          <h2 className="section-title">Our brands</h2>
          <Carousel
            styles={brandStyles}
            label="Manufacturing brands"
            previousLabel="Previous brands"
            nextLabel="Next brands"
          >
            {brands.map((brand) => (
              <article
                key={brand.id}
                className={`brand-card ${brandStyles.card}`}
              >
                <div className="brand-tagline">{brand.tagline}</div>
                {brand.logo_url && (
                  <Image
                    unoptimized
                    src={brand.logo_url}
                    width={240}
                    height={100}
                    alt={brand.name}
                    style={{ objectFit: "contain", maxWidth: "100%" }}
                  />
                )}
                <h3>{brand.name}</h3>
                <p>{brand.description}</p>
                <Link className="btn secondary" href={`/brands/${brand.slug}`}>
                  Explore brand →
                </Link>
              </article>
            ))}
          </Carousel>
        </div>
      </div>
    </section>
  );
}
export function CmsFeaturedProducts({
  products,
}: {
  products: ProductListItem[];
}) {
  if (!products.length) return null;
  return (
    <section className={`${shared.section} ${featured.section}`} id="products">
      <div className={shared.wrap}>
        <div className={shared.panel}>
          <h2 className={shared.title}>Featured products</h2>
          <Carousel
            styles={shared}
            label="Featured products"
            previousLabel="Previous products"
            nextLabel="Next products"
          >
            {products.map((product) => (
              <article
                key={product.id}
                className={`${shared.card} ${featured.card}`}
              >
                <div className={`${shared.media} ${featured.media}`}>
                  {product.imageUrl ? (
                    <Image
                      unoptimized
                      src={product.imageUrl}
                      alt={product.title}
                      width={360}
                      height={260}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                      }}
                    />
                  ) : (
                    <span>{product.brandLabel}</span>
                  )}
                </div>
                <div className={featured.tagRow}>
                  <span className={featured.brandTag}>
                    {product.brandLabel}
                  </span>
                  <span className={featured.typeTag}>{product.typeLabel}</span>
                </div>
                <h3>{product.title}</h3>
                <p>{product.description}</p>
                <div className={featured.specs}>
                  {product.specs.map((spec) => (
                    <span className={featured.spec} key={spec}>
                      {spec}
                    </span>
                  ))}
                </div>
                <Link
                  className="btn secondary"
                  href={`/products/${product.slug}`}
                >
                  View details →
                </Link>
              </article>
            ))}
          </Carousel>
        </div>
      </div>
    </section>
  );
}
