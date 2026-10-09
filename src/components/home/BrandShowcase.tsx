import Image from "next/image";
import Link from "next/link";
import Carousel from "@/components/ui/carousel/Carousel";
import styles from "./BrandShowcase.module.css";

interface ShowcaseBrand {
  id: string;
  name: string;
  tagline: string;
  class: string;
  desc: string;
  badge: string;
  logo?: string;
}

const brands: ShowcaseBrand[] = [
  {
    id: "labxe",
    name: "LABXE",
    tagline: "Clinical & Molecular Precision",
    class: "labxe",
    desc: "Premium ergonomic micropipettes, electronic pipetting aids, and certified calibration systems for high-throughput diagnostic labs.",
    badge: "Flagship Line",
  },
  {
    id: "ssciences",
    name: "SSCIENCES",
    tagline: "Life Science & Genomics",
    class: "ssciences",
    desc: "Dedicated multichannel pipettes, low-retention filter tips, and molecular biology consumables ensuring sample purity.",
    badge: "Genomics Grade",
  },
  {
    id: "danwer",
    name: "DANWER",
    tagline: "Heavy-Duty & Analytical Range",
    class: "danwer",
    desc: "Robust autoclaved dispensers, chemical-resistant fluid transfer devices, and heavy-duty volumetric laboratory equipment.",
    badge: "Industrial Grade",
  },
  {
    id: "dr-pipette",
    name: "dr.pipette",
    tagline: "Liquid Handling & Pipetting",
    class: "",
    desc: "Precision micropipettes and liquid handling instruments engineered for laboratory accuracy.",
    badge: "Specialized Brand",
  },
  {
    id: "sscientific",
    name: "sscientific",
    tagline: "Scientific & Measurement Systems",
    class: "",
    desc: "Volumetric laboratory instruments and scientific measurement tools.",
    badge: "Specialized Brand",
  },
];

export default function BrandShowcase() {
  return (
    <section className="section" id="brands">
      <div className="wrap">
        <div className="brand-section">
          <h2 className="section-title">OUR SPECIALIZED MANUFACTURING BRANDS</h2>
          <p className="section-subtitle" style={{ color: "#cce0ff" }}>
            Trusted product portfolios united under one unified manufacturing, quality assurance, and export umbrella.
          </p>

          <Carousel
            styles={styles}
            label="Specialized manufacturing brands"
            previousLabel="Previous brands"
            nextLabel="Next brands"
          >
            {brands.map((brand) => (
              <article key={brand.id} className={`brand-card ${styles.card}`}>
                <div className="brand-tagline">{brand.badge}</div>
                <div className={styles.brandLogoArea}>
                  {brand.logo ? (
                    <Image
                      src={brand.logo}
                      alt={`${brand.name} logo`}
                      fill
                      sizes="(max-width: 640px) 240px, 300px"
                      className={styles.brandLogo}
                    />
                  ) : (
                    <div className={styles.logoPlaceholder} aria-label={`${brand.name} logo placeholder`}>
                      [BRAND LOGO]
                    </div>
                  )}
                </div>
                <h4>{brand.tagline}</h4>
                <p>{brand.desc}</p>
                <Link
                  href={`/brands/${brand.id}`}
                  className="btn secondary"
                  style={{ width: "100%", padding: "10px 14px", fontSize: 13, textAlign: "center" }}
                >
                  Explore {brand.name} Products →
                </Link>
              </article>
            ))}
          </Carousel>
        </div>
      </div>
    </section>
  );
}
