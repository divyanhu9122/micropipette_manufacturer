const partners = [
  "BIO-ANALYTICA",
  "GLOBAL LAB CORP",
  "GENOME PHARMA",
  "MEDITECH EUROPE",
  "APEX DIAGNOSTICS",
  "NORDIC SCIENTIFIC",
  "PACIFIC CLINICALS",
  "VITA SCIENCES",
];

export default function PartnerMarquee() {
  const marqueeList = [...partners, ...partners];

  return (
    <div className="customer-section">
      <div className="wrap">
        <h2 className="section-title">TRUSTED BY GLOBAL DISTRIBUTORS & INSTITUTES</h2>
        <p className="partner-subtitle">
          Supplying certified liquid handling instruments to research centers, contract labs, and healthcare networks worldwide.
        </p>

        <div className="partner-marquee-shell">
          <div className="partner-marquee-mask" aria-label="Trusted laboratory partners list">
            <div className="partner-marquee-track">
              {marqueeList.map((partner, index) => (
                <div key={index} className="partner-logo-item">
                  <div className="partner-logo">{partner}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
