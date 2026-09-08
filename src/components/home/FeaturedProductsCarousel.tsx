"use client";

import { useRef } from "react";

interface FeaturedProductsProps {
  onOpenQuote?: (productName: string) => void;
}

const featuredProducts = [
  {
    id: "labxe-precision-pro",
    brand: "LABXE",
    type: "Single Channel",
    name: "PrecisionPro Variable Volume Pipette",
    desc: "Fully autoclavable mechanical pipette with four-digit display and thermal insulation preventing heat transfer.",
    volumeRange: "0.1 µL – 10,000 µL",
    specs: ["Fully Autoclavable", "4-Digit Lock", "ISO 8655"],
  },
  {
    id: "ssciences-multi-8",
    brand: "SSCIENCES",
    type: "Multichannel",
    name: "ErgoFlow 8-Channel Micropipette",
    desc: "Engineered for 96-well plate assays with 360° manifold rotation and lightweight tip ejector mechanism.",
    volumeRange: "0.5 – 10 µL / 30 – 300 µL",
    specs: ["360° Manifold", "Individual Pistons", "Ultra Lightweight"],
  },
  {
    id: "danwer-dispenser",
    brand: "DANWER",
    type: "Dispensers",
    name: "ChemFlow Bottle Top Dispenser",
    desc: "Direct reagent dispensing from reagent glass bottles with zero-loss recirculation valve and PTFE piston.",
    volumeRange: "1 – 10 mL / 5 – 50 mL",
    specs: ["PTFE Inert", "Recirculation Valve", "Borosilicate Path"],
  },
  {
    id: "labxe-controller",
    brand: "LABXE",
    type: "Accessory",
    name: "AccuPipette Motorized Controller",
    desc: "Ergonomic electronic aspirator for 0.1 to 100 mL serological glass and plastic pipettes with lithium-ion power.",
    volumeRange: "0.1 – 100 mL",
    specs: ["Li-Ion Battery", "Dual Speed Control", "0.45µm Filter"],
  },
  {
    id: "ssciences-filter-tips",
    brand: "SSCIENCES",
    type: "Consumable",
    name: "Barrier Micro-Filter Pipette Tips",
    desc: "Sterile racked hydrophobic filter barrier tips ensuring aerosol protection during genomic and PCR protocols.",
    volumeRange: "10 µL / 200 µL / 1000 µL",
    specs: ["RNase/DNase Free", "Pyrogen Safe", "Universal Fit"],
  },
  {
    id: "labxe-stand",
    brand: "LABXE",
    type: "Accessory",
    name: "Rotating Carousel Pipette Stand",
    desc: "Heavy-base 360-degree rotating desktop stand accommodating up to 6 single or multichannel instruments.",
    volumeRange: "Holds 6 Units",
    specs: ["Weighted Base", "Non-Slip Pad", "Universal Clamp"],
  },
];

export default function FeaturedProductsCarousel({ onOpenQuote }: FeaturedProductsProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "prev" | "next") => {
    if (trackRef.current) {
      const scrollAmount = direction === "prev" ? -340 : 340;
      trackRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="section" id="products">
      <div className="wrap">
        <div className="section-panel">
          <h2 className="section-title">FEATURED LABORATORY INSTRUMENTS</h2>
          <p className="section-subtitle">
            Factory-calibrated precision instruments manufactured for clinical diagnostics, research, and bulk distribution.
          </p>

          <div className="featured-carousel-shell">
            <button
              className="carousel-arrow prev"
              type="button"
              onClick={() => scroll("prev")}
              aria-label="Previous product"
            >
              ‹
            </button>

            <div className="carousel-track" ref={trackRef}>
              {featuredProducts.map((prod) => (
                <article key={prod.id} className="featured-card">
                  <div className="featured-badges">
                    <span className="featured-brand-tag">{prod.brand}</span>
                    <span className="featured-type-tag">{prod.type}</span>
                  </div>

                  <div className="featured-media">
                    <div
                      style={{
                        width: 24,
                        height: 90,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <div
                        style={{
                          width: 18,
                          height: 8,
                          background: prod.brand === "LABXE" ? "#0d418a" : "#f04a2a",
                          borderRadius: 3,
                        }}
                      />
                      <div
                        style={{
                          width: 18,
                          height: 44,
                          background: "#ffffff",
                          border: "1px solid #c9d8eb",
                          borderRadius: 4,
                          margin: "1px 0",
                          position: "relative",
                        }}
                      >
                        <div
                          style={{
                            position: "absolute",
                            bottom: 6,
                            left: 2,
                            right: 2,
                            height: 6,
                            background: "#051f44",
                            borderRadius: 1,
                          }}
                        />
                      </div>
                      <div style={{ width: 5, height: 22, background: "#557fb9" }} />
                      <div
                        style={{
                          width: 3,
                          height: 14,
                          background: "#ffffff",
                          border: "1px solid #bcd3ee",
                          borderTop: "none",
                        }}
                      />
                    </div>
                  </div>

                  <h4>{prod.name}</h4>
                  <p>{prod.desc}</p>

                  <div className="featured-specs">
                    {prod.specs.map((spec, i) => (
                      <span key={i} className="featured-spec">
                        {spec}
                      </span>
                    ))}
                  </div>

                  <div className="featured-footer">
                    <span className="featured-meta">{prod.volumeRange}</span>
                    <button
                      type="button"
                      className="btn primary"
                      style={{ padding: "6px 12px", fontSize: 12 }}
                      onClick={() => onOpenQuote && onOpenQuote(prod.name)}
                    >
                      Inquire / RFP →
                    </button>
                  </div>
                </article>
              ))}
            </div>

            <button
              className="carousel-arrow next"
              type="button"
              onClick={() => scroll("next")}
              aria-label="Next product"
            >
              ›
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
