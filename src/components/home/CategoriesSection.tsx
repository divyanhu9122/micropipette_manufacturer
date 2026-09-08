interface CategoriesSectionProps {
  onSelectCategory?: (categoryName: string) => void;
}

const categories = [
  {
    id: "variable-volume",
    name: "Variable Volume",
    subtitle: "Single Channel",
    desc: "Precision autoclavable micropipettes with fine digital volume adjustment from 0.1µL to 10mL.",
    type: "single",
  },
  {
    id: "fixed-volume",
    name: "Fixed Volume",
    subtitle: "Single Channel",
    desc: "Streamlined single-volume pipettes calibrated for high-speed routine clinical and testing assays.",
    type: "fixed",
  },
  {
    id: "multichannel",
    name: "8 & 12 Multichannel",
    subtitle: "High Throughput",
    desc: "Ergonomic multichannel manifolds engineered for 96-well plate screening, ELISA, and PCR setups.",
    type: "multi",
  },
  {
    id: "electronic",
    name: "Electronic Pipettes",
    subtitle: "Motorized Precision",
    desc: "Microprocessor-controlled dispensing ensuring zero operator fatigue and maximum reproducibility.",
    type: "electronic",
  },
  {
    id: "tips-accessories",
    name: "Tips & Accessories",
    subtitle: "Consumables",
    desc: "Universal fit, barrier filter, low-retention tips, carousel stands, and calibration toolkits.",
    type: "tips",
  },
  {
    id: "bottle-top",
    name: "Bottle Top Dispensers",
    subtitle: "Reagent Handling",
    desc: "Direct-from-bottle liquid dispensers with chemical-resistant PTFE fluid pathways.",
    type: "dispenser",
  },
];

export default function CategoriesSection({ onSelectCategory }: CategoriesSectionProps) {
  return (
    <section className="section" id="categories">
      <div className="wrap">
        <div className="section-panel">
          <h2 className="section-title">EXPLORE LABORATORY CATEGORIES</h2>
          <p className="section-subtitle">
            Comprehensive range of scientific liquid handling instruments manufactured under strict ISO quality standards.
          </p>

          <div className="category-grid">
            {categories.map((cat) => (
              <article key={cat.id} className="card">
                <div className="card-media">
                  {cat.type === "single" && (
                    <div className="pipette-icon" aria-label="Variable Volume Pipette">
                      <div className="p-top" />
                      <div className="p-body" />
                      <div className="p-shaft" />
                      <div className="p-tip" />
                    </div>
                  )}
                  {cat.type === "fixed" && (
                    <div className="pipette-icon" aria-label="Fixed Volume Pipette">
                      <div className="p-top" style={{ background: "#f04a2a" }} />
                      <div className="p-body" />
                      <div className="p-shaft" style={{ background: "#0d418a" }} />
                      <div className="p-tip" />
                    </div>
                  )}
                  {cat.type === "multi" && (
                    <div className="pipette-icon" aria-label="Multichannel Pipette">
                      <div className="p-top" />
                      <div className="p-body" />
                      <div className="multi-icon">
                        <span />
                        <span />
                        <span />
                        <span />
                        <span />
                        <span />
                      </div>
                    </div>
                  )}
                  {cat.type === "electronic" && (
                    <div
                      style={{
                        width: 36,
                        height: 84,
                        background: "linear-gradient(180deg, #fcfcfd, #e8edf4)",
                        border: "1px solid #ced9e7",
                        borderRadius: 10,
                        position: "relative",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <div
                        style={{
                          width: 22,
                          height: 18,
                          background: "#0a3265",
                          borderRadius: 3,
                          color: "#fff",
                          fontSize: 8,
                          fontWeight: 900,
                          display: "grid",
                          placeItems: "center",
                        }}
                      >
                        LCD
                      </div>
                    </div>
                  )}
                  {cat.type === "tips" && (
                    <div className="tips-icon">
                      <span />
                      <span />
                      <span />
                      <span />
                    </div>
                  )}
                  {cat.type === "dispenser" && (
                    <div
                      style={{
                        width: 60,
                        height: 70,
                        background: "#fff",
                        border: "1px solid #d6e1ef",
                        borderRadius: 8,
                        position: "relative",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <div
                        style={{
                          width: 20,
                          height: 38,
                          background: "#0d418a",
                          borderRadius: 4,
                        }}
                      />
                    </div>
                  )}
                </div>

                <h3>{cat.name}</h3>
                <p>{cat.desc}</p>
                <button
                  type="button"
                  className="btn secondary"
                  style={{ width: "100%", padding: "8px 12px", fontSize: 13 }}
                  onClick={() => onSelectCategory && onSelectCategory(cat.name)}
                >
                  View Series →
                </button>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
