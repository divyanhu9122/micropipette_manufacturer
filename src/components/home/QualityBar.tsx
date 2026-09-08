export default function QualityBar() {
  const certifications = [
    { title: "ISO", code: "9001:2015", label: "Quality System" },
    { title: "ISO", code: "13485:2016", label: "Medical Devices" },
    { title: "CE", code: "Certified", label: "European Conformity" },
    { title: "ISO", code: "8655", label: "Calibration Standard" },
    { title: "QC", code: "Verified", label: "Individual Serial Report" },
  ];

  return (
    <section className="section" id="quality">
      <div className="wrap">
        <div className="quality-bar">
          <div className="quality-copy">
            <h3>QUALITY ASSURANCE & GLOBAL CERTIFICATIONS</h3>
            <p>
              Every manufactured pipette undergoes strict gravimetric calibration according to ISO 8655 specifications.
              Supplied with an individual batch calibration certificate and traceability report.
            </p>
          </div>

          {certifications.map((c, i) => (
            <div key={i} className="cert">
              <strong>{c.title}</strong>
              <span>{c.code}</span>
              <span style={{ fontSize: 10, opacity: 0.75 }}>{c.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
