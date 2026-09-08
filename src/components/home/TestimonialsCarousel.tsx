const testimonials = [
  {
    id: 1,
    quote:
      "Dependable volumetric precision and superb build quality. Our regional distribution network has imported over 12,000 units with zero defect escalations.",
    author: "Dr. Marcus Vance",
    role: "Director of Procurement",
    company: "Nordic Lab Supplies • Germany",
  },
  {
    id: 2,
    quote:
      "The OEM custom laser-branding process was seamless. The private label packaging and custom calibration certificates matched our strict hospital tender requirements.",
    author: "Elena Rostova",
    role: "OEM Brand Manager",
    company: "Diagnostics Direct • UAE",
  },
  {
    id: 3,
    quote:
      "The lightweight plunger force on the multichannel pipettes dramatically reduced repetitive strain across our high-throughput molecular diagnostic technicians.",
    author: "Prof. Kenneth Wright",
    role: "Head of Genomics Laboratory",
    company: "BioTech Institute • United Kingdom",
  },
  {
    id: 4,
    quote:
      "Fast production turnaround and dependable export logistics. Factory direct pricing allowed us to compete successfully in government research tenders.",
    author: "Siddharth Mehta",
    role: "Managing Director",
    company: "Apex Scientific Corp • India & SE Asia",
  },
];

export default function TestimonialsCarousel() {
  return (
    <section className="section" id="testimonials">
      <div className="wrap">
        <div className="section-panel" style={{ background: "linear-gradient(180deg, #f0f7ff, #e4effd)" }}>
          <h2 className="section-title">CLIENT & PARTNER TESTIMONIALS</h2>
          <p className="testimonial-subtitle">
            Feedback from international distributor networks, contract testing facilities, and OEM partners.
          </p>

          <div className="testimonial-grid">
            {testimonials.map((t) => (
              <article key={t.id} className="testimonial-card">
                <div className="quote-mark" aria-hidden="true">
                  “
                </div>
                <blockquote>{t.quote}</blockquote>
                <div className="testimonial-meta">
                  <strong>{t.author}</strong>
                  <span>{t.role}</span>
                  <span style={{ color: "var(--corporate-blue)", fontWeight: 600 }}>{t.company}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
