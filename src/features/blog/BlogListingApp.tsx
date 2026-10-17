"use client";

import { useState } from "react";
import Link from "next/link";
import InnerPageHero from "@/components/layout/InnerPageHero";
import InnerPageHeroVisual from "@/components/layout/InnerPageHeroVisual";
import styles from "./Blog.module.css";
import { BLOG_POSTS, BLOG_CATEGORIES } from "./blog.data";

/** Inline article icon used for card and featured visuals */
function ArticleIcon() {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <rect x="8" y="4" width="32" height="40" rx="4" />
      <path d="M16 14h16M16 22h16M16 30h10" />
    </svg>
  );
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogListingApp() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredPosts =
    activeCategory === "All"
      ? BLOG_POSTS
      : BLOG_POSTS.filter((post) => post.category === activeCategory);

  const featuredPost = filteredPosts.find((post) => post.featured);
  const regularPosts = filteredPosts.filter((post) => post !== featuredPost);

  return (
    <div className={styles.blogPage}>
      {/* Hero Section */}
      <InnerPageHero
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Blog" }]}
        title="Insights & Technical Articles"
        eyebrow="Laboratory knowledge hub"
        description="Technical guides, product updates, application notes, and industry insights for laboratory professionals, procurement teams, and distribution partners."
        visual={<InnerPageHeroVisual kind="blog" />}
      />

      {/* Main Blog Section */}
      <section className={styles.blogSection}>
        <div className="wrap">
          <div className={styles.blogIntro}>
            <span className={styles.typeTag}>Knowledge Center</span>
            <h2>Latest Articles & Technical Resources</h2>
            <p>
              Stay informed with expert content covering micropipette
              calibration, liquid handling best practices, product engineering
              updates, and B2B laboratory supply chain insights from our
              manufacturing and application science teams.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className={styles.categoryFilters}>
            {BLOG_CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`${styles.categoryTab} ${
                  activeCategory === cat ? styles.categoryTabActive : ""
                }`}
                onClick={() => setActiveCategory(cat)}
                id={`blog-filter-${cat.toLowerCase().replace(/\s+/g, "-")}`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Featured Post */}
          {featuredPost && activeCategory === "All" && (
            <Link
              href={`/blog/${featuredPost.slug}`}
              className={styles.featuredCard}
              id={`featured-post-${featuredPost.slug}`}
            >
              <div className={styles.featuredVisual}>
                <div className={styles.featuredVisualIcon}>
                  <ArticleIcon />
                  <span className={styles.featuredVisualLabel}>
                    {featuredPost.category}
                  </span>
                </div>
              </div>
              <div className={styles.featuredContent}>
                <span className={styles.featuredBadge}>★ Featured Article</span>
                <h2>{featuredPost.title}</h2>
                <div className={styles.featuredMeta}>
                  <span>{formatDate(featuredPost.publishedDate)}</span>
                  <span className={styles.featuredMetaDot} />
                  <span>{featuredPost.readingTime}</span>
                  <span className={styles.featuredMetaDot} />
                  <span>{featuredPost.author.name}</span>
                </div>
                <p>{featuredPost.excerpt}</p>
                <span className="btn primary">Read Article →</span>
              </div>
            </Link>
          )}

          {/* Blog Post Grid */}
          {regularPosts.length > 0 ? (
            <div className={styles.blogGrid}>
              {regularPosts.map((post) => (
                <article key={post.id} className={styles.blogCard}>
                  <div className={styles.blogCardVisual}>
                    <span className={styles.blogCardCategoryBadge}>
                      {post.category}
                    </span>
                    <ArticleIcon />
                    <span
                      style={{
                        fontSize: "11px",
                        fontWeight: 800,
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                      }}
                    >
                      Article
                    </span>
                  </div>

                  <div className={styles.blogCardBody}>
                    <div className={styles.blogCardMeta}>
                      <span>{formatDate(post.publishedDate)}</span>
                      <span className={styles.blogCardMetaDot} />
                      <span>{post.readingTime}</span>
                    </div>

                    <h3>{post.title}</h3>
                    <p>{post.excerpt}</p>

                    <div className={styles.blogCardTags}>
                      {post.tags.slice(0, 3).map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>

                    <div className={styles.blogCardAction}>
                      <Link
                        className="btn secondary"
                        href={`/blog/${post.slug}`}
                        id={`read-post-${post.slug}`}
                        style={{ width: "100%" }}
                      >
                        Read Article →
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <h3>No articles in this category yet</h3>
              <p>
                Check back soon — our technical and product teams publish new
                content regularly.
              </p>
            </div>
          )}

          {/* CTA Banner */}
          <section className={styles.blogCta}>
            <div>
              <span className={styles.typeTag} style={{ color: "#ff8469" }}>
                STAY INFORMED
              </span>
              <h2>Need Technical Support or Custom Solutions?</h2>
              <p>
                Our engineering and application science teams are available for
                technical consultations, calibration inquiries, and custom OEM
                discussions.
              </p>
            </div>
            <div className={styles.blogCtaActions}>
              <Link
                className="btn primary"
                href="/contact"
                id="blog-cta-contact"
              >
                Contact Us →
              </Link>
              <Link
                className="btn secondary"
                href="/resources"
                id="blog-cta-resources"
              >
                Download Resources
              </Link>
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}
