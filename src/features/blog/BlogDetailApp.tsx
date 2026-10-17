import Link from "next/link";
import styles from "./Blog.module.css";
import type { BlogPost } from "./blog.data";
import { getRelatedPosts } from "./blog.data";

interface BlogDetailAppProps {
  post: BlogPost;
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogDetailApp({ post }: BlogDetailAppProps) {
  const relatedPosts = getRelatedPosts(post.slug, 3);

  const authorInitials = post.author.name
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className={styles.blogPage}>
      {/* Compact Breadcrumb Hero */}
      <section className={styles.heroCompact}>
        <div className="wrap">
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className={styles.breadcrumbSep}>›</span>
            <Link href="/blog">Blog</Link>
            <span className={styles.breadcrumbSep}>›</span>
            <span>{post.title}</span>
          </nav>
          <h1>{post.title}</h1>
          <div className={styles.heroMeta}>
            <span className={styles.blogTag}>{post.category}</span>
            <span className={styles.heroMetaDot} />
            <span>{formatDate(post.publishedDate)}</span>
            <span className={styles.heroMetaDot} />
            <span>{post.readingTime}</span>
            <span className={styles.heroMetaDot} />
            <span>{post.author.name}</span>
          </div>
        </div>
      </section>

      {/* Detail Content */}
      <section className={styles.detailSection}>
        <div className="wrap">
          <div className={styles.detailLayout}>
            {/* Article Body */}
            <article className={styles.articlePanel}>
              {post.body.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </article>

            {/* Sidebar */}
            <aside className={styles.sidebar}>
              {/* Author Panel */}
              <div className={styles.sidebarPanel}>
                <h3 className={styles.sidebarTitle}>Author</h3>
                <div className={styles.authorCard}>
                  <div className={styles.authorAvatar}>{authorInitials}</div>
                  <div className={styles.authorInfo}>
                    <strong>{post.author.name}</strong>
                    <span>{post.author.role}</span>
                  </div>
                </div>
              </div>

              {/* Tags Panel */}
              <div className={styles.sidebarPanel}>
                <h3 className={styles.sidebarTitle}>Tags</h3>
                <div className={styles.tagCloud}>
                  {post.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>

              {/* Related Articles Panel */}
              {relatedPosts.length > 0 && (
                <div className={styles.sidebarPanel}>
                  <h3 className={styles.sidebarTitle}>Related Articles</h3>
                  <div className={styles.relatedGrid}>
                    {relatedPosts.map((related) => (
                      <Link
                        key={related.slug}
                        href={`/blog/${related.slug}`}
                        className={styles.relatedItem}
                        id={`related-${related.slug}`}
                      >
                        <strong>{related.title}</strong>
                        <span>
                          {related.category} · {related.readingTime}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </aside>
          </div>

          {/* CTA Banner */}
          <section className={styles.blogCta}>
            <div>
              <span className={styles.typeTag} style={{ color: "#ff8469" }}>
                B2B INQUIRY
              </span>
              <h2>Questions About This Topic?</h2>
              <p>
                Our technical and sales engineering teams are available for
                consultations on calibration, product selection, and custom OEM
                requirements.
              </p>
            </div>
            <div className={styles.blogCtaActions}>
              <Link
                className="btn primary"
                href="/contact"
                id="blog-detail-cta-contact"
              >
                Contact Engineering →
              </Link>
              <Link
                className="btn secondary"
                href="/blog"
                id="blog-detail-cta-blog"
              >
                ← Back to Blog
              </Link>
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}
