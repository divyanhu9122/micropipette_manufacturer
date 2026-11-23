"use client";
import Link from "next/link";
import Image from "next/image";
import { useSiteSettings } from "@/features/site/SiteSettings";

interface FooterProps {
  onOpenCatalogue?: () => void;
}

export default function Footer({ onOpenCatalogue }: FooterProps) {
  const settings = useSiteSettings();
  const site = settings.site || {};
  const contact = settings.contact || {};
  return (
    <footer>
      <div className="wrap footer-top">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link href="/" className="logo footer-brand-logo">
              <Image
                className="footer-brand-logo-image"
                unoptimized
                src={
                  site.logo ||
                  "/images/brand/micropipette-manufacturer-logo.png"
                }
                alt={site.name || "Micropipette Manufacturer"}
                width={866}
                height={288}
              />
            </Link>
            <p>
              {site.description ||
                "Product information, OEM solutions and laboratory enquiries."}
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
            <Link href="/blog">Technical Blog</Link>
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
              {contact.linkedin && (
                <a
                  href={contact.linkedin}
                  className="social"
                  aria-label="LinkedIn"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  in
                </a>
              )}
              {contact.twitter && (
                <a
                  href={contact.twitter}
                  className="social"
                  aria-label="Twitter"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  𝕏
                </a>
              )}
            </div>
            <p style={{ fontSize: 12, color: "#9bb8dc", marginTop: 14 }}>
              {contact.email && (
                <>
                  <a href={`mailto:${contact.email}`}>{contact.email}</a>
                  <br />
                </>
              )}
              {contact.phone && (
                <>
                  <a href={`tel:${contact.phone.replace(/[^+0-9]/g, "")}`}>
                    {contact.phone}
                  </a>
                  <br />
                </>
              )}
              {contact.address ||
                "Contact our team for product and quotation information."}
            </p>
          </div>
        </div>
      </div>

      <div className="copyright">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 12,
            maxWidth: 1240,
            margin: "0 auto",
            padding: "0 18px",
          }}
        >
          <div>
            © {new Date().getFullYear()}{" "}
            {site.name || "Micropipette Manufacturer"} — Precision Liquid
            Handling Laboratory Solutions. All rights reserved.
          </div>
          <div className="footer-legal">
            <Link
              href="/privacy-policy"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              Privacy Policy
            </Link>
            <span className="footer-legal-separator" aria-hidden="true">
              •
            </span>
            <Link
              href="/terms"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
