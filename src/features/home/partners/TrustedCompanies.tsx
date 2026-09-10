"use client";

import { useEffect, useRef } from "react";
import PartnerReveal from "./PartnerReveal";
import shared from "../product-categories/ProductCategories.module.css";
import styles from "./TrustedCompanies.module.css";

const placeholders = [
  "PARTNER 01",
  "PARTNER 02",
  "PARTNER 03",
  "PARTNER 04",
  "PARTNER 05",
  "PARTNER 06",
  "PARTNER 07",
  "PARTNER 08",
  "PARTNER 09",
  "PARTNER 10",
  "PARTNER 11",
  "PARTNER 12",
  "PARTNER 13",
] as const;

export default function TrustedCompanies() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    const viewport = track?.parentElement;
    const firstGroup = track?.firstElementChild;
    if (!track || !viewport || !(firstGroup instanceof HTMLElement)) return;

    let groupWidth = 0;
    let speedPerSecond = 0;
    let offset = 0;
    let previousTime = performance.now();
    let frame = 0;

    const updateMetrics = () => {
      groupWidth = firstGroup.getBoundingClientRect().width;
      speedPerSecond = groupWidth > 0 ? groupWidth / 10: 0;
      if (groupWidth > 0) offset %= groupWidth;
    };

    const animate = (time: number) => {
      const elapsed = (time - previousTime) / 1000;
      previousTime = time;
      if (groupWidth > 0 && speedPerSecond > 0) {
        offset = (offset + elapsed * speedPerSecond) % groupWidth;
        track.style.transform = `translate3d(${-offset}px, 0, 0)`;
      }
      frame = window.requestAnimationFrame(animate);
    };

    updateMetrics();
    const observer = new ResizeObserver(updateMetrics);
    observer.observe(viewport);
    observer.observe(firstGroup);
    frame = window.requestAnimationFrame(animate);
    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className={shared.wrap}>
      <div className={styles.proof}>
        <PartnerReveal>
          <h2
            id="customers-title"
            className={`${shared.title} ${styles.title}`}
          >
            TRUSTED BY LEADING COMPANIES
          </h2>
          <p className={styles.subtitle}>
            Showcase your valued partners, laboratories, institutions and global
            business relationships with a clean, premium logo strip.
          </p>
          <div className={styles.shell}>
            <div
              className={styles.mask}
              role="region"
              aria-label="Trusted by leading companies logo showcase"
            >
              <div ref={trackRef} className={styles.track}>
                {[false, true].map((isDuplicate) => (
                  <div
                    key={String(isDuplicate)}
                    className={styles.logoGroup}
                    aria-hidden={isDuplicate ? true : undefined}
                  >
                    {placeholders.map((partner) => (
                      <div
                        key={partner}
                        className={styles.item}
                        data-placeholder="true"
                      >
                        <div className={styles.logo}>{partner}</div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </PartnerReveal>
      </div>
    </div>
  );
}
