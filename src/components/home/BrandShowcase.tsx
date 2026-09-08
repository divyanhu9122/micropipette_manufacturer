interface BrandShowcaseProps {
  onSelectBrand?: (brand: string) => void;
}

const brands = [
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
];

export default function BrandShowcase({ onSelectBrand }: BrandShowcaseProps) {
  return (
    <section className="section" id="brands">
      <div className="wrap">
        <div className="brand-section">
          <h2 className="section-title">OUR SPECIALIZED MANUFACTURING BRANDS</h2>
          <p className="section-subtitle" style={{ color: "#cce0ff" }}>
            Three trusted product portfolios united under one unified manufacturing, quality assurance, and export umbrella.
          </p>

          <div className="brand-grid">
            {brands.map((brand) => (
              <article key={brand.id} className="brand-card">
                <div className="brand-tagline">{brand.badge}</div>
                <div className={`brand-logo-text ${brand.class}`}>
                  {brand.name === "LABXE" ? (
                    <>
                      LAB<b>XE</b>
                    </>
                  ) : brand.name === "SSCIENCES" ? (
                    <>
                      S<b>SCIENCES</b>
                    </>
                  ) : (
                    brand.name
                  )}
                </div>
                <h4>{brand.tagline}</h4>
                <p>{brand.desc}</p>
                <button
                  type="button"
                  className="btn secondary"
                  style={{ width: "100%", padding: "10px 14px", fontSize: 13 }}
                  onClick={() => onSelectBrand && onSelectBrand(brand.name)}
                >
                  Explore {brand.name} Products →
                </button>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
