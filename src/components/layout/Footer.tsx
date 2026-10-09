import Link from "next/link";
import Image from "next/image";

interface FooterProps {
  onOpenCatalogue?: () => void;
}

export default function Footer({ onOpenCatalogue }: FooterProps) {
  return (
    <footer>
      <div className="wrap footer-top">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link href="/" className="logo footer-brand-logo">
              <Image
                className="footer-brand-logo-image"
                src="/images/brand/micropipette-manufacturer-logo.png"
                alt="MicropipetteManufacturer"
                width={866}
                height={288}
              />
            </Link>
            <p>
              Central B2B platform for LABXE, SSCIENCES and DANWER product discovery, OEM solutions and global laboratory inquiries.
            </p>
          </div>

          <div>
            <h4>COMPANY</h4>
            <Link href="/about">About Us</Link>
            <Link href="/products">Products</Link>
            <Link href="/brands">Our Brands</Link>
            <Link href="/oem">OEM Manufacturing</Link>
            <Link href="/about">Quality Policy</Link>
          </div>

          <div>
            <h4>SUPPORT</h4>
            <Link href="/resources">Downloads & Manuals</Link>
            <Link href="/faq">FAQs</Link>
            <Link href="/contact">Technical Support</Link>
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/terms">Terms & Conditions</Link>
          </div>

          <div id="resources">
            <h4>RESOURCES</h4>
            <Link href="/resources">Documentation Hub</Link>
            {onOpenCatalogue ? (
              <>
                <button
                  type="button"
                  onClick={onOpenCatalogue}
                  style={{
                    background: "none",
                    border: "none",
                    color: "inherit",
                    font: "inherit",
                    padding: 0,
                    cursor: "pointer",
                    textAlign: "left",
                    display: "block",
                  }}
                >
                  Product Catalogs
                </button>
                <button
                  type="button"
                  onClick={onOpenCatalogue}
                  style={{
                    background: "none",
                    border: "none",
                    color: "inherit",
                    font: "inherit",
                    padding: 0,
                    cursor: "pointer",
                    textAlign: "left",
                    display: "block",
                  }}
                >
                  Technical Brochures
                </button>
              </>
            ) : (
              <>
                <Link href="/resources">Product Catalogs</Link>
                <Link href="/resources">Technical Brochures</Link>
              </>
            )}
            <Link href="/resources">ISO Certificates</Link>
            <Link href="/applications">Application Notes</Link>
          </div>

          <div>
            <h4>CONNECT WITH US</h4>
            <div className="socials">
              <a href="#" className="social" aria-label="LinkedIn">in</a>
              <a href="#" className="social" aria-label="Facebook">f</a>
              <a href="#" className="social" aria-label="Twitter">𝕏</a>
              <a href="#" className="social" aria-label="YouTube">▶</a>
            </div>
            <p style={{ fontSize: 12, color: "#9bb8dc", marginTop: 14 }}>
              Direct export shipments dispatched to 80+ countries worldwide.
            </p>
          </div>
        </div>
      </div>

      <div className="copyright">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12, maxWidth: 1240, margin: "0 auto", padding: "0 18px" }}>
          <div>
            © {new Date().getFullYear()} MicropipetteManufacturer.com — Precision Liquid Handling Laboratory Solutions. All rights reserved.
          </div>
          <div className="footer-legal">
            <Link href="/privacy-policy" style={{ color: "inherit", textDecoration: "none" }}>Privacy Policy</Link>
            <span className="footer-legal-separator" aria-hidden="true">•</span>
            <Link href="/terms" style={{ color: "inherit", textDecoration: "none" }}>Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
