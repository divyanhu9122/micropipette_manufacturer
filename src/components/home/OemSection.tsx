interface OemSectionProps {
  onOpenQuote?: () => void;
}

export default function OemSection({ onOpenQuote }: OemSectionProps) {
  return (
    <section className="section" id="oem">
      <div className="wrap">
        <div className="standalone-box">
          <h2 className="section-title">OEM & PRIVATE LABEL MANUFACTURING</h2>
          <p className="section-subtitle">
            Turnkey manufacturing capabilities for global distributors, healthcare brands, and scientific instrument companies.
          </p>

          <div className="split-box">
            <div className="oem-panel">
              <h3>Custom Branding & Tailored Manufacturing</h3>
              <p>
                From precision laser logo etching to customized body color accents and bespoke packaging boxes, we provide
                end-to-end private labeling services for distributors in 80+ countries.
              </p>
              <ul className="oem-list">
                <li>Custom company logo printing and laser markings on pipette bodies</li>
                <li>Customized color accents, volume dials, and plunger button coding</li>
                <li>Private-label retail boxes, blister packaging, and multilingual manuals</li>
                <li>Factory calibration reports with your distributor branding & serial numbers</li>
                <li>Full ISO 9001:2015 & ISO 13485:2016 regulatory documentation support</li>
              </ul>
              <button
                type="button"
                className="btn primary"
                onClick={onOpenQuote}
              >
                Request OEM Consultation →
              </button>
            </div>

            <div className="oem-showcase">
              <div className="boxed-pipette">
                <div className="pack-box">
                  <span>YOUR BRAND</span>
                  <small>CUSTOM PRIVATE LABEL PACKAGING</small>
                </div>
                <div
                  style={{
                    width: 32,
                    height: 140,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    transform: "rotate(20deg)",
                  }}
                >
                  <div
                    style={{
                      width: 22,
                      height: 12,
                      background: "#9db4d5",
                      borderRadius: "6px 6px 0 0",
                    }}
                  />
                  <div
                    style={{
                      width: 28,
                      height: 64,
                      background: "#ffffff",
                      border: "1px solid #d5dfea",
                      borderRadius: 8,
                      position: "relative",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <span
                      style={{
                        transform: "rotate(-90deg)",
                        fontSize: 9,
                        fontWeight: 900,
                        color: "#0d57bf",
                        whiteSpace: "nowrap",
                      }}
                    >
                      YOUR LOGO
                    </span>
                  </div>
                  <div style={{ width: 8, height: 38, background: "#4d7fbe" }} />
                  <div
                    style={{
                      width: 4,
                      height: 24,
                      background: "#ffffff",
                      border: "1px solid #d8e3f2",
                      borderTop: "none",
                    }}
                  />
                </div>
              </div>
              <p
                style={{
                  fontSize: 13,
                  color: "var(--slate-blue-gray)",
                  textAlign: "center",
                  marginTop: 20,
                  fontWeight: 600,
                }}
              >
                Factory Direct • Minimum Order Quantities from 50 Units • Fast International Dispatch
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
