const applications = [
  {
    id: "clinical",
    title: "Clinical Diagnostics",
    icon: "🔬",
    desc: "High accuracy pipetting for serum, plasma, blood pathology, and diagnostic ELISA protocols.",
  },
  {
    id: "molecular",
    title: "Molecular Biology",
    icon: "🧬",
    desc: "Aerosol barrier tip compatibility for contamination-free PCR, RT-qPCR, and DNA sequencing.",
  },
  {
    id: "pharma",
    title: "Pharmaceutical QC",
    icon: "💊",
    desc: "GLP/GMP compliant volumetric handling for batch release testing and formulation labs.",
  },
  {
    id: "chemical",
    title: "Chemical Analysis",
    icon: "⚗️",
    desc: "Robust materials resisting aggressive solvents, acids, and volatile non-aqueous solutions.",
  },
  {
    id: "academic",
    title: "Academic Research",
    icon: "🎓",
    desc: "Cost-effective, autoclavable pipettes engineered for rigorous multi-user university benches.",
  },
];

export default function ApplicationsSection() {
  return (
    <section className="section" id="applications">
      <div className="wrap">
        <div className="section-panel">
          <h2 className="section-title">ENGINEERED FOR CRITICAL SCIENTIFIC APPLICATIONS</h2>
          <p className="section-subtitle">
            Validated across diverse laboratory environments where sample integrity and volumetric fidelity are paramount.
          </p>

          <div className="app-grid">
            {applications.map((app) => (
              <article key={app.id} className="app-card">
                <div className="app-icon-wrap" aria-hidden="true">
                  {app.icon}
                </div>
                <h4>{app.title}</h4>
                <p>{app.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
