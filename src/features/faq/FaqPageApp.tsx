"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./Faq.module.css";
import { FAQ_ITEMS, FAQ_CATEGORIES } from "./faq.data";

export default function FaqPageApp() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [openItemIds, setOpenItemIds] = useState<Record<string, boolean>>({});

  const handleToggleItem = (id: string) => {
    setOpenItemIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleSelectCategory = (categoryId: string) => {
    setActiveCategory((prev) => (prev === categoryId ? "all" : categoryId));
  };

  const visibleItems = FAQ_ITEMS.filter((item) => {
    if (activeCategory === "all") return true;
    return item.category === activeCategory;
  });

  return (
    <div className={styles.faqPage}>
      {/* Hero */}
      <section className={styles.faqHero}>
        <div className={`wrap ${styles.faqHeroInner}`}>
          <nav className={styles.faqBreadcrumb} aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className={styles.faqBreadcrumbSep}>›</span>
            <span>FAQs</span>
          </nav>

          <div className={styles.faqHeroCopy}>
            <span className={styles.faqKicker}>HELP & SUPPORT</span>
            <h1>Frequently Asked Questions</h1>
            <p>
              Find quick answers about products, product selection, calibration
              and support, OEM/private-label requirements, resources and business
              enquiries.
            </p>
          </div>
        </div>
      </section>

      {/* Main Section */}
      <section className={styles.faqSection}>
        <div className="wrap">
          <div className={styles.faqPanel}>
            <div className={styles.faqLayout}>
              {/* Sidebar */}
              <aside className={styles.faqSide}>
                <span className={styles.faqTag}>FAQ GUIDE</span>
                <h2>Browse by Topic</h2>
                <p>
                  These FAQs are designed as a central support layer.
                  Product-specific FAQs can also appear on individual product
                  pages where relevant.
                </p>

                <div className={styles.faqSideLinks}>
                  {FAQ_CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      className={
                        activeCategory === cat.id ? styles.isActive : ""
                      }
                      onClick={() => handleSelectCategory(cat.id)}
                      aria-pressed={activeCategory === cat.id}
                    >
                      <span>{cat.label}</span>
                      <span aria-hidden="true">→</span>
                    </button>
                  ))}
                </div>

                <div className={styles.faqHelpBox}>
                  <strong>Still need help?</strong>
                  <p>
                    Send your product, OEM or technical requirement directly to
                    our team.
                  </p>
                  <Link className="btn primary" href="/contact">
                    Contact Us →
                  </Link>
                </div>
              </aside>

              {/* FAQ Accordion List */}
              <section
                className={styles.faqListPanel}
                aria-label="FAQ Accordion"
              >
                <div className={styles.faqListHead}>
                  <div>
                    <span className={styles.faqTag}>COMMON QUESTIONS</span>
                    <h2>Answers to Common Enquiries</h2>
                  </div>
                  <span className={styles.faqCount}>
                    {visibleItems.length} FAQ
                    {visibleItems.length === 1 ? "" : "s"}
                  </span>
                </div>

                {visibleItems.length === 0 ? (
                  <div className={styles.faqNoMatch} role="status">
                    <div className={styles.faqNoMatchIcon} aria-hidden="true">
                      ?
                    </div>
                    <h3>No matching FAQ found</h3>
                    <p>
                      Try selecting another FAQ category or contact us for
                      assistance.
                    </p>
                  </div>
                ) : (
                  <div className={styles.faqList}>
                    {visibleItems.map((item) => {
                      const isOpen = !!openItemIds[item.id];
                      return (
                        <article
                          key={item.id}
                          className={`${styles.faqItem} ${
                            isOpen ? styles.isOpen : ""
                          }`}
                        >
                          <button
                            className={styles.faqQuestion}
                            type="button"
                            onClick={() => handleToggleItem(item.id)}
                            aria-expanded={isOpen}
                            aria-controls={`faq-answer-${item.id}`}
                            id={`faq-question-${item.id}`}
                          >
                            <span>{item.question}</span>
                            <b aria-hidden="true">+</b>
                          </button>
                          <div
                            id={`faq-answer-${item.id}`}
                            role="region"
                            aria-labelledby={`faq-question-${item.id}`}
                            className={styles.faqAnswer}
                          >
                            <p className={styles.faqAnswerContent}>
                              {item.answer}
                            </p>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                )}
              </section>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
