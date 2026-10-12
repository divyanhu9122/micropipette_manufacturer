import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./InnerPageHero.module.css";

export interface InnerPageBreadcrumb {
  label: string;
  href?: string;
}

interface InnerPageHeroProps {
  breadcrumb: readonly InnerPageBreadcrumb[];
  title: string;
  description: string;
  eyebrow?: string;
  visual?: ReactNode;
  actions?: ReactNode;
  details?: ReactNode;
  backgroundImage?: string;
  overlay?: boolean;
}

export default function InnerPageHero({
  breadcrumb,
  title,
  description,
  eyebrow,
  visual,
  actions,
  details,
  backgroundImage,
  overlay = true,
}: InnerPageHeroProps) {
  return (
    <>
      <section className={styles.hero}>
        {backgroundImage && (
          <>
            <Image
              src={backgroundImage}
              alt=""
              fill
              sizes="100vw"
              className={styles.backgroundImage}
            />
            {overlay && <div className={styles.imageOverlay} aria-hidden="true" />}
          </>
        )}
        <div className={`wrap ${styles.inner}`}>
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <ol>
              {breadcrumb.map((item, index) => (
                <li key={`${item.label}-${index}`}>
                  {index > 0 && (
                    <span className={styles.separator} aria-hidden="true">
                      ›
                    </span>
                  )}
                  {item.href && index < breadcrumb.length - 1 ? (
                    <Link href={item.href}>{item.label}</Link>
                  ) : (
                    <span
                      aria-current={
                        index === breadcrumb.length - 1 ? "page" : undefined
                      }
                    >
                      {item.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
          {visual && (
            <div className={styles.visual} aria-hidden="true">
              {visual}
            </div>
          )}
          <div className={styles.content}>
            <div className={styles.copy}>
              {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
              <h1>{title}</h1>
              <p className={styles.description}>{description}</p>
            </div>
          </div>
        </div>
      </section>
      {(actions || details) && (
        <div className={styles.supporting}>
          <div className="wrap">
            {actions && <div className={styles.actions}>{actions}</div>}
            {details && <div className={styles.details}>{details}</div>}
          </div>
        </div>
      )}
    </>
  );
}
