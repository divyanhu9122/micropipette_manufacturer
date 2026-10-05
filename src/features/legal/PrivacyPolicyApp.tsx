import Link from "next/link";
import styles from "./Legal.module.css";

export default function PrivacyPolicyApp() {
  return (
    <div className={styles.legalPage}>
      {/* Compact Breadcrumb Hero */}
      <section className={styles.heroCompact}>
        <div className="wrap">
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className={styles.breadcrumbSep}>›</span>
            <span>Privacy Policy</span>
          </nav>
          <h1>Privacy Policy</h1>
          <div className={styles.lastUpdated}>Last Updated: October 2026</div>
        </div>
      </section>

      {/* Main Content */}
      <section className={styles.legalSection}>
        <div className="wrap">
          <div className={styles.legalGrid}>
            {/* Table of Contents Sidebar */}
            <aside className={styles.tocSidebar} aria-label="Table of Contents">
              <div className={styles.tocTitle}>Contents</div>
              <ul className={styles.tocList}>
                <li>
                  <a href="#overview" className={styles.tocLink}>
                    1. Overview & Scope
                  </a>
                </li>
                <li>
                  <a href="#information-collected" className={styles.tocLink}>
                    2. Information We Collect
                  </a>
                </li>
                <li>
                  <a href="#how-we-use-data" className={styles.tocLink}>
                    3. How We Use Information
                  </a>
                </li>
                <li>
                  <a href="#data-storage" className={styles.tocLink}>
                    4. Storage & Data Security
                  </a>
                </li>
                <li>
                  <a href="#international-transfers" className={styles.tocLink}>
                    5. Global Export Transfers
                  </a>
                </li>
                <li>
                  <a href="#cookies" className={styles.tocLink}>
                    6. Cookies & Web Analytics
                  </a>
                </li>
                <li>
                  <a href="#your-rights" className={styles.tocLink}>
                    7. GDPR & Data Rights
                  </a>
                </li>
                <li>
                  <a href="#contact-us" className={styles.tocLink}>
                    8. Contact Information
                  </a>
                </li>
              </ul>
            </aside>

            {/* Legal Body */}
            <article className={styles.legalContent}>
              <h2 id="overview">1. Overview & Scope</h2>
              <p>
                MicropipetteManufacturer.com (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;)
                operates as a global B2B laboratory equipment manufacturing and export platform for
                our proprietary instrument brands—LABXE, SSCIENCES, and DANWER—as well as private label
                OEM partners worldwide.
              </p>
              <p>
                This Privacy Policy explains how we collect, process, store, and safeguard business
                contact data, procurement inquiries, quotation requests, and technical interactions
                submitted through our website.
              </p>

              <div className={styles.calloutBox}>
                <p>
                  As a strictly B2B manufacturing portal, our platform is designed for research
                  institutions, universities, hospitals, distributors, diagnostic laboratories, and
                  commercial OEM buyers.
                </p>
              </div>

              <h2 id="information-collected">2. Information We Collect</h2>
              <p>We collect information directly from you when you interact with our website:</p>
              <ul>
                <li>
                  <strong>Business Inquiries & Quotation Requests:</strong> Name, professional title,
                  company or institution name, business email address, direct phone number, delivery
                  country, volumetric instrument models, and estimated order quantities.
                </li>
                <li>
                  <strong>OEM / Private Label Specifications:</strong> Custom molding requirements,
                  laser-etching details, packaging branding assets, target volume ranges, and
                  technical tolerances.
                </li>
                <li>
                  <strong>Document & Catalogue Requests:</strong> Professional email and organization
                  details provided when downloading technical specifications or master catalogues.
                </li>
                <li>
                  <strong>Technical Support & Calibration Communications:</strong> Serial numbers,
                  recalibration logs, warranty registration details, and application inquiries.
                </li>
                <li>
                  <strong>Automated Technical Data:</strong> IP address, browser type, operating
                  system, referring URL, and page interaction timestamps collected via standard
                  server logs.
                </li>
              </ul>

              <h2 id="how-we-use-data">3. How We Use Information</h2>
              <p>We process collected business information for the following legitimate purposes:</p>
              <ul>
                <li>Fulfilling requests for formal price quotations, proforma invoices, and distributor terms.</li>
                <li>Providing customized OEM engineering feasibility assessments and tooling estimates.</li>
                <li>Dispatching requested technical documentation, ISO 8655 calibration reports, and software manuals.</li>
                <li>Managing international export logistics, Incoterms coordination, and export compliance verification.</li>
                <li>Maintaining warranty records, lot traceability, and instrument calibration history.</li>
                <li>Improving our web platform responsiveness, navigation speed, and product discoverability.</li>
              </ul>

              <h2 id="data-storage">4. Storage & Data Security</h2>
              <p>
                We implement industry-standard organizational and technical security measures to protect
                commercial and contact information against unauthorized access, loss, or disclosure.
              </p>
              <p>
                All web transmissions are encrypted via Transport Layer Security (TLS 1.3 / HTTPS).
                Inquiry forms and commercial correspondences are stored within secured database systems
                with role-based access control and strict firewall policies.
              </p>

              <h2 id="international-transfers">5. Global Export Transfers</h2>
              <p>
                Because our laboratory instruments and private-label micropipettes are supplied to
                distributor partners in over 80 countries, commercial transaction details may be
                transferred to authorized logistics handlers, freight forwarders, and regional customs
                authorities solely for import/export clearance and cargo dispatch.
              </p>

              <h2 id="cookies">6. Cookies & Web Analytics</h2>
              <p>
                Our website utilizes minimal functional and performance cookies necessary to enable
                secure navigation, remember quotation modal preferences, and monitor aggregate site
                traffic without tracking personal consumer identities across non-affiliated websites.
              </p>
              <p>
                You may configure your browser settings to decline cookies; however, certain interactive
                quotation filters and modal conveniences may function with reduced persistence.
              </p>

              <h2 id="your-rights">7. GDPR & Data Rights</h2>
              <p>
                Depending on your geographical jurisdiction (including the European Economic Area under
                the General Data Protection Regulation), you hold rights regarding your personal and
                commercial contact data:
              </p>
              <ul>
                <li><strong>Right of Access:</strong> Request a copy of the business contact details held in our systems.</li>
                <li><strong>Right to Rectification:</strong> Request correction of inaccurate company or contact records.</li>
                <li><strong>Right to Erasure:</strong> Request deletion of non-mandatory inquiry records where statutory commercial retention periods do not apply.</li>
                <li><strong>Right to Restrict Processing:</strong> Request suspension of promotional technical updates or catalogue notices.</li>
              </ul>

              <h2 id="contact-us">8. Contact Information</h2>
              <p>
                For data protection inquiries, commercial record updates, or privacy concerns, please
                reach out directly to our corporate data administration office:
              </p>

              <div className={styles.contactBox}>
                <strong>MicropipetteManufacturer.com — Corporate Data Office</strong>
                <p style={{ margin: "4px 0" }}>
                  Email: privacy@micropipettemanufacturer.in
                </p>
                <p style={{ margin: "4px 0" }}>
                  Website Support:{" "}
                  <Link href="/contact" style={{ color: "var(--corporate-blue)", fontWeight: 700 }}>
                    Technical Contact Form
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
