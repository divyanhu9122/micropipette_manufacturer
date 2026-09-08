import Link from "next/link";

export default function Footer() {
  return (
    <footer>
      <div className="wrap footer-top">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="logo">
              <div className="logo-mark" aria-hidden="true" />
              <div className="logo-text">
                MicropipetteManufacturer<span style={{ color: "#dcecff" }}>.com</span>
                <small>Precision. Performance. Partnership.</small>
              </div>
            </div>
            <p>
              Central B2B platform for LABXE, SSCIENCES and DANWER product discovery, OEM solutions and global laboratory inquiries.
            </p>
          </div>

          <div>
            <h4>COMPANY</h4>
            <Link href="#categories">Products</Link>
            <Link href="#brands">Our Brands</Link>
            <Link href="#oem">OEM Manufacturing</Link>
            <Link href="#quality">Quality Policy</Link>
          </div>

          <div>
            <h4>SUPPORT</h4>
            <Link href="#resources">Downloads & Manuals</Link>
            <Link href="#partner">Technical Support</Link>
            <Link href="#testimonials">Client Testimonials</Link>
            <Link href="#partner">Contact Sales</Link>
          </div>

          <div id="resources">
            <h4>RESOURCES</h4>
            <a href="#resources">Product Catalogs</a>
            <a href="#resources">Technical Brochures</a>
            <a href="#quality">ISO Certificates</a>
            <a href="#applications">Application Notes</a>
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
        © {new Date().getFullYear()} MicropipetteManufacturer.com — Precision Liquid Handling Laboratory Solutions. All rights reserved.
      </div>
    </footer>
  );
}
