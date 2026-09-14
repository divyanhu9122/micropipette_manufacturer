"use client";

import { useEffect, useState } from "react";
import styles from "./ProductDetail.module.css";

const NAV_ITEMS = [
  { id: "overview", label: "Overview" },
  { id: "specifications", label: "Specifications" },
  { id: "features", label: "Features" },
  { id: "applications", label: "Applications" },
  { id: "downloads", label: "Downloads" },
  { id: "enquiry", label: "Enquiry" },
];

export default function ProductSideNav() {
  const [activeSection, setActiveSection] = useState("overview");

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + 180;
      for (const item of NAV_ITEMS) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollY >= top && scrollY < top + height) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <aside className={styles.pdSideNav} aria-label="Product in-page navigation">
      {NAV_ITEMS.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          className={`${styles.navLink} ${activeSection === item.id ? styles.navLinkActive : ""}`}
          onClick={() => setActiveSection(item.id)}
        >
          {item.label}
        </a>
      ))}
    </aside>
  );
}
