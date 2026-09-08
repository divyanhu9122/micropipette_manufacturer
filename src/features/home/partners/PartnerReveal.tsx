"use client";

import { useEffect, useRef, type ReactNode } from "react";
import styles from "./TrustedCompanies.module.css";

export default function PartnerReveal({
  children,
  id = "customers",
  titleId = "customers-title",
  className = "",
}: {
  children: ReactNode;
  id?: string;
  titleId?: string;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const section = ref.current;
    if (!section) return;
    if (
      !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      section.classList.add(styles.visible);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          section.classList.add(styles.visible);
          observer.disconnect();
        }
      },
      { threshold: 0.16 },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);
  return (
    <section
      ref={ref}
      id={id}
      className={`${styles.section} ${className}`}
      aria-labelledby={titleId}
    >
      {children}
    </section>
  );
}
