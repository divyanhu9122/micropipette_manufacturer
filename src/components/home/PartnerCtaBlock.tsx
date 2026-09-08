interface PartnerCtaBlockProps {
  onOpenQuote?: () => void;
}

export default function PartnerCtaBlock({ onOpenQuote }: PartnerCtaBlockProps) {
  return (
    <section className="section" id="partner">
      <div className="wrap">
        <div className="partner-wrap">
          <div className="partner-grid">
            <div>
              <h2>Ready to Partner With Us?</h2>
              <p>
                Connect with our direct sales and OEM engineering team for bulk distributor pricing, private label manufacturing,
                tender participation, and technical liquid handling guidance.
              </p>

              <div className="partner-actions">
                <button
                  type="button"
                  className="btn primary"
                  onClick={onOpenQuote}
                >
                  Request Partnership Call →
                </button>
                <a className="btn secondary" href="#resources">
                  Download Catalog & Specifications ↓
                </a>
              </div>

              <div className="partner-highlights">
                <div className="highlight">
                  <strong>80+</strong>
                  <span>Countries Served Globally</span>
                </div>
                <div className="highlight">
                  <strong>24h</strong>
                  <span>Average Technical Response</span>
                </div>
                <div className="highlight">
                  <strong>OEM</strong>
                  <span>Custom Branding & Packaging</span>
                </div>
              </div>
            </div>

            <div className="partner-side">
              <h3>Why Global Buyers Contact Us Directly</h3>
              <ul>
                <li>Direct factory bulk pricing with no intermediary distributor markup</li>
                <li>Comprehensive OEM & private-label branding with custom colorways</li>
                <li>Individual ISO 8655 gravimetric calibration certificates included</li>
                <li>Dedicated international freight support, customs, and documentation</li>
              </ul>

              <div className="contact-badges">
                <div className="badge">Direct Factory Supply</div>
                <div className="badge">OEM Consultation</div>
                <div className="badge">24h Sales Response</div>
                <div className="badge">Worldwide Shipping</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
