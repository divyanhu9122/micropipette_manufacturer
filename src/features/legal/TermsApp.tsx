import Link from "next/link";
import styles from "./Legal.module.css";

export default function TermsApp() {
  return (
    <div className={styles.legalPage}>
      {/* Compact Breadcrumb Hero */}
      <section className={styles.heroCompact}>
        <div className="wrap">
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className={styles.breadcrumbSep}>›</span>
            <span>Terms & Conditions</span>
          </nav>
          <h1>Terms & Commercial Conditions</h1>
          <div className={styles.lastUpdated}>Last Updated: October 2026</div>
        </div>
      </section>

      {/* Main Content */}
      <section className={styles.legalSection}>
        <div className="wrap">
          <div className={styles.legalGrid}>
            {/* Table of Contents Sidebar */}
            <aside className={styles.tocSidebar} aria-label="Table of Contents">
              <div className={styles.tocTitle}>Sections</div>
              <ul className={styles.tocList}>
                <li>
                  <a href="#acceptance" className={styles.tocLink}>
                    1. Commercial Acceptance
                  </a>
                </li>
                <li>
                  <a href="#quotations" className={styles.tocLink}>
                    2. Quotations & Pricing
                  </a>
                </li>
                <li>
                  <a href="#oem-terms" className={styles.tocLink}>
                    3. OEM & Private Label
                  </a>
                </li>
                <li>
                  <a href="#calibration-warranty" className={styles.tocLink}>
                    4. ISO 8655 Calibration & Warranty
                  </a>
                </li>
                <li>
                  <a href="#shipping-incoterms" className={styles.tocLink}>
                    5. Shipping & Incoterms
                  </a>
                </li>
                <li>
                  <a href="#claims-returns" className={styles.tocLink}>
                    6. Inspection & Claims
                  </a>
                </li>
                <li>
                  <a href="#liability" className={styles.tocLink}>
                    7. Limitation of Liability
                  </a>
                </li>
                <li>
                  <a href="#jurisdiction" className={styles.tocLink}>
                    8. Governing Jurisdiction
                  </a>
                </li>
              </ul>
            </aside>

            {/* Legal Body */}
            <article className={styles.legalContent}>
              <h2 id="acceptance">1. Commercial Acceptance</h2>
              <p>
                These Commercial Terms and Conditions govern all quotation inquiries, purchase
                contracts, proforma invoices, and international supply agreements executed with
                MicropipetteManufacturer.com (&ldquo;Manufacturer&rdquo;, &ldquo;Company&rdquo;) for
                the supply of single-channel micropipettes, multichannel pipettes, bottle-top
                dispensers, electronic fluid handling instruments, and laboratory accessories.
              </p>
              <p>
                By issuing a commercial purchase order, executing a signed proforma invoice, or
                submitting an OEM production contract, the purchasing party (&ldquo;Buyer&rdquo;)
                agrees to be bound by these terms.
              </p>

              <div className={styles.calloutBox}>
                <p>
                  All sales are strictly B2B commercial transactions intended for research,
                  diagnostic, academic, distributor, and industrial applications.
                </p>
              </div>

              <h2 id="quotations">2. Quotations & Pricing</h2>
              <ul>
                <li>
                  <strong>Validity:</strong> Written price quotations and proforma estimates are valid
                  for thirty (30) calendar days from the date of issuance, unless otherwise stipulated
                  in writing.
                </li>
                <li>
                  <strong>Currency & Taxes:</strong> Unless explicitly noted, all quoted prices are in
                  USD (or EUR/INR where agreed) and exclude local destination import duties, VAT/GST,
                  customs broker fees, or consular legalization costs.
                </li>
                <li>
                  <strong>Minimum Order Quantities (MOQ):</strong> Volume pricing tiers apply to
                  standard production batches. Custom volumetric increments or specialized packaging
                  may be subject to agreed minimum production runs.
                </li>
              </ul>

              <h2 id="oem-terms">3. OEM & Private Label Manufacturing</h2>
              <p>
                For private-label partners, distributors, and contract manufacturing arrangements:
              </p>
              <ul>
                <li>
                  <strong>Intellectual Property:</strong> Buyer retains all ownership rights to its
                  trademarks, logos, and custom graphic designs provided for laser marking and
                  packaging. The Manufacturer retains ownership of all underlying mechanical patents,
                  internal mold tooling, piston mechanisms, and factory firmware.
                </li>
                <li>
                  <strong>Tooling & Pre-Production Samples:</strong> Custom injection molds, specialized
                  color dyes, and branded printing plates require written golden sample sign-off
                  prior to mass manufacturing dispatch.
                </li>
                <li>
                  <strong>Exclusivity:</strong> Territory or brand exclusivity arrangements must be
                  stipulated in a separate signed Distributor / OEM Master Agreement.
                </li>
              </ul>

              <h2 id="calibration-warranty">4. ISO 8655 Calibration & Warranty</h2>
              <p>
                Every mechanical and electronic micropipette manufactured in our facility is calibrated
                in compliance with ISO 8655 gravimetric standards under temperature and humidity
                controlled conditions.
              </p>
              <ul>
                <li>
                  <strong>Manufacturing Warranty:</strong> Instruments carry a standard twelve (12)
                  month limited manufacturer warranty from delivery against defects in materials and
                  workmanship.
                </li>
                <li>
                  <strong>Exclusions:</strong> The warranty excludes normal wear-and-tear components
                  (such as O-rings, tip cones, and seal rings), damage resulting from the aspiration of
                  incompatible aggressive solvents without appropriate fluoropolymer barriers, drops,
                  mechanical impacts, or unauthorized disassembly.
                </li>
                <li>
                  <strong>Autoclaving Protocols:</strong> Autoclavability claims are strictly conditioned
                  upon adherence to the documented 121°C (20 minute) steam sterilization guidelines.
                </li>
              </ul>

              <h2 id="shipping-incoterms">5. Shipping & Incoterms</h2>
              <p>
                International consignments are dispatched according to Incoterms 2020 rules as agreed
                upon in the proforma invoice:
              </p>
              <ul>
                <li><strong>EXW (Ex Works):</strong> Cargo ready for collection at our primary manufacturing facility.</li>
                <li><strong>FOB (Free on Board):</strong> Cargo cleared for export and delivered on board the designated vessel/flight.</li>
                <li><strong>CIF / CFR (Cost, Insurance & Freight):</strong> Cargo freight prepaid to the named destination international port or airport.</li>
              </ul>
              <p>
                Transit risk transfers to the Buyer or freight forwarder in accordance with the
                stipulated Incoterm.
              </p>

              <h2 id="claims-returns">6. Inspection & Claims</h2>
              <p>
                Upon arrival at the destination port, Buyer shall inspect the consignment:
              </p>
              <ul>
                <li>
                  <strong>Transit Damage & Shortages:</strong> Must be reported with photographic
                  evidence on the carrier bill of lading within seven (7) business days of receipt.
                </li>
                <li>
                  <strong>Volumetric Performance Discrepancies:</strong> Must be reported within thirty
                  (30) days accompanied by ISO 8655 gravimetric test logs (including balance model,
                  ambient temperature, and distilled water calibration data).
                </li>
              </ul>

              <h2 id="liability">7. Limitation of Liability</h2>
              <p>
                To the maximum extent permitted by applicable commercial law, Manufacturer shall not be
                liable for indirect, incidental, special, or consequential damages, including loss of
                laboratory reagents, experimental downtime, or lost commercial profits. Total cumulative
                liability arising out of any order shall not exceed the net invoiced purchase price of
                the specific defective instrument batch.
              </p>

              <h2 id="jurisdiction">8. Governing Jurisdiction</h2>
              <p>
                These Commercial Conditions and any dispute or claim arising out of or in connection with
                them shall be governed by and construed in accordance with the substantive laws of India,
                with commercial arbitration administered in accordance with international commercial
                arbitration practices.
              </p>

              <div className={styles.contactBox}>
                <strong>Commercial Inquiries & Contract Administration</strong>
                <p style={{ margin: "4px 0" }}>
                  Email: legal@micropipettemanufacturer.in
                </p>
                <p style={{ margin: "4px 0" }}>
                  Procurement Support:{" "}
                  <Link href="/contact" style={{ color: "var(--corporate-blue)", fontWeight: 700 }}>
                    Direct Commercial Contact
                  </Link>
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
}
