import Link from "next/link";
import styles from "./About.module.css";

export default function AboutPageApp() {
  return (
    <div className={styles.aboutPage}>
      {/* Hero Section with extreme-left breadcrumb */}
      <section className={styles.aboutHero}>
        <div className={styles.aboutHeroBg} aria-hidden="true" />
        <div className={styles.aboutHeroInner}>
          <div className={styles.aboutHeroCopy}>
            <nav className={styles.aboutCrumb} aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span className={styles.aboutCrumbSep}>›</span>
              <span>About Us</span>
            </nav>
            <h1>About Us</h1>
            <p>
              MicropipetteManufacturer.com brings together laboratory,
              liquid-handling and scientific-instrument capabilities across LABXE,
              SSCIENCES and DANWER in one focused B2B product-discovery
              platform.
            </p>
          </div>
        </div>
      </section>

      {/* WHO WE ARE */}
      <section className={styles.aboutSection}>
        <div className={`wrap ${styles.aboutPanel} ${styles.aboutIntro}`}>
          <div className={styles.aboutCopy}>
            <h2 className={styles.aboutTitle}>WHO WE ARE</h2>
            <p>
              Our platform connects customers with scientific and laboratory
              products across three established brands — LABXE, SSCIENCES and
              DANWER — while keeping each brand&apos;s identity distinct.
            </p>
            <p>
              LABXE states that it supplies, trades and exports scientific,
              medical, surgical and weighing equipment, and manufactures
              liquid-handling systems under LABXE and SSCIENCES with in-house
              molding, assembly and calibration facilities.
            </p>
            <p>
              SSCIENCES / Singh Science Systems presents its business around
              scientific instruments and liquid-handling systems, while DANWER
              focuses on weighing balances, micropipettes and laboratory
              equipment.
            </p>
          </div>
          <div className={styles.aboutVisual}>
            <svg
              className={styles.aboutVisualIcon}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            <span>[COMPANY / FACTORY / LAB IMAGE]</span>
          </div>
        </div>
      </section>

      {/* LEADERSHIP */}
      <section className={styles.aboutSection}>
        <div className={`wrap ${styles.aboutPanel}`}>
          <h2 className={styles.aboutTitle}>LEADERSHIP</h2>

          <div className={styles.aboutLeadership}>
            <div className={styles.aboutLeaderPhoto}>
              <svg
                className={styles.aboutLeaderPhotoIcon}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <span>[CHAIRMAN / MANAGING DIRECTOR PHOTO]</span>
            </div>

            <div className={styles.aboutLeaderCopy}>
              <span className={styles.aboutLeaderTag}>
                CHAIRMAN / MANAGING DIRECTOR
              </span>

              <h3>[OWNER / MD NAME]</h3>

              <p className={styles.leadershipIntro}>
                [Short verified introduction covering the leader&apos;s role,
                business journey and involvement in scientific instruments,
                liquid handling, manufacturing and customer-focused growth.]
              </p>

              <blockquote>
                “[Short verified leadership message or vision statement.]”
              </blockquote>

              <p>
                [A concise 3–5 line summary of the leader&apos;s approach to
                product quality, manufacturing, innovation, customer
                relationships and long-term development of the business.]
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* OUR CAPABILITIES */}
      <section className={styles.aboutSection}>
        <div className={`wrap ${styles.aboutPanel}`}>
          <h2 className={styles.aboutTitle}>OUR CAPABILITIES</h2>
          <div className={styles.aboutGrid4}>
            <article className={styles.aboutBox}>
              <h3>Liquid Handling</h3>
              <p>
                Micropipettes, multichannel systems, bottle-top dispensers and
                related liquid-handling solutions.
              </p>
            </article>
            <article className={styles.aboutBox}>
              <h3>In-House Manufacturing Support</h3>
              <p>
                LABXE states that its liquid-handling operations are supported by
                in-house molding, assembly and calibration facilities.
              </p>
            </article>
            <article className={styles.aboutBox}>
              <h3>Scientific Instruments</h3>
              <p>
                A broader portfolio serving laboratory, research, educational
                and industrial scientific applications.
              </p>
            </article>
            <article className={styles.aboutBox}>
              <h3>Weighing Solutions</h3>
              <p>
                DANWER&apos;s product focus includes laboratory and industrial
                weighing balances alongside laboratory equipment.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* OUR BRAND PORTFOLIO */}
      <section className={styles.aboutSection}>
        <div className={`wrap ${styles.aboutPanel}`}>
          <h2 className={styles.aboutTitle}>OUR BRAND PORTFOLIO</h2>
          <div className={styles.aboutGrid3}>
            <article className={styles.aboutBox}>
              <div className={styles.aboutBrandLogo}>
                <span className={styles.brandLogoLabxe}>
                  LAB<b>XE</b>
                </span>
              </div>
              <h3>LABXE</h3>
              <p>
                Scientific and laboratory equipment with a strong
                liquid-handling focus and in-house manufacturing support.
              </p>
              <div className={styles.aboutActions}>
                <Link className="btn primary" href="/brands/labxe">
                  Explore Brand
                </Link>
                <a
                  className="btn secondary"
                  href="https://labxe.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Official Website →
                </a>
              </div>
            </article>

            <article className={styles.aboutBox}>
              <div className={styles.aboutBrandLogo}>
                <span className={styles.brandLogoSsciences}>
                  S<b>SCIENCES</b>
                </span>
              </div>
              <h3>SSCIENCES</h3>
              <p>
                Scientific instruments and liquid-handling systems for
                laboratory, research and technical applications.
              </p>
              <div className={styles.aboutActions}>
                <Link className="btn primary" href="/brands/ssciences">
                  Explore Brand
                </Link>
                <a
                  className="btn secondary"
                  href="https://www.ssciences.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Official Website →
                </a>
              </div>
            </article>

            <article className={styles.aboutBox}>
              <div className={styles.aboutBrandLogo}>
                <span className={styles.brandLogoDanwer}>DANWER</span>
              </div>
              <h3>DANWER</h3>
              <p>
                Weighing balances, micropipettes and laboratory equipment with
                emphasis on precision, quality and support.
              </p>
              <div className={styles.aboutActions}>
                <Link className="btn primary" href="/brands/danwer">
                  Explore Brand
                </Link>
                <a
                  className="btn secondary"
                  href="https://danwer.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Official Website →
                </a>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* OEM & PRIVATE LABEL */}
      <section className={styles.aboutSection}>
        <div className={`wrap ${styles.aboutPanel} ${styles.aboutSplit}`}>
          <div>
            <div className={styles.aboutOemCopy}>
              <h2 className={styles.aboutTitle}>OEM & PRIVATE LABEL</h2>
              <p>
                Our OEM pathway supports companies looking for custom branding
                and private-label opportunities in liquid-handling products.
                Final branding, packaging, quantity and commercial requirements
                are handled through a dedicated OEM enquiry workflow.
              </p>
            </div>
            <div className={styles.aboutOemAction}>
              <Link className="btn primary" href="/oem">
                Explore OEM Solutions →
              </Link>
            </div>
          </div>

          <div className={styles.aboutFacts}>
            <div className={styles.aboutFact}>
              <strong>Custom Branding</strong>
              <span>
                Logo and brand identity options based on confirmed product
                capability.
              </span>
            </div>
            <div className={styles.aboutFact}>
              <strong>Private Label</strong>
              <span>
                Private-label support for suitable liquid-handling products.
              </span>
            </div>
            <div className={styles.aboutFact}>
              <strong>Packaging</strong>
              <span>
                Packaging requirements can be discussed through the OEM enquiry
                process.
              </span>
            </div>
            <div className={styles.aboutFact}>
              <strong>Bulk / Distributor Enquiries</strong>
              <span>
                Dedicated enquiry path for B2B and distribution requirements.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* WHY WORK WITH US */}
      <section className={styles.aboutSection}>
        <div className={`wrap ${styles.aboutPanel}`}>
          <h2 className={styles.aboutTitle}>WHY WORK WITH US</h2>
          <div className={styles.aboutGrid3}>
            <article className={styles.aboutBox}>
              <h3>Focused Product Expertise</h3>
              <p>
                A product ecosystem centered on scientific instruments, liquid
                handling and laboratory workflows.
              </p>
            </article>
            <article className={styles.aboutBox}>
              <h3>Multiple Brand Choices</h3>
              <p>
                Explore LABXE, SSCIENCES and DANWER from one platform while
                retaining clear brand-level product discovery.
              </p>
            </article>
            <article className={styles.aboutBox}>
              <h3>B2B Support</h3>
              <p>
                Structured paths for product enquiries, OEM/private label,
                catalogue access and business communication.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.aboutCta}>
        <div>
          <h2>Explore Our Scientific Product Portfolio</h2>
          <p>
            Discover products across LABXE, SSCIENCES and DANWER or discuss OEM
            and bulk requirements with our team.
          </p>
        </div>
        <div className={styles.aboutCtaActions}>
          <Link className="btn primary" href="/products">
            Explore Products →
          </Link>
          <Link className="btn secondary" href="/request-quote">
            Request Quote
          </Link>
          <Link className="btn secondary" href="/contact">
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
}
