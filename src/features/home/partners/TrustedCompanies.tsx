"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import PartnerReveal from "./PartnerReveal";
import shared from "../product-categories/ProductCategories.module.css";
import styles from "./TrustedCompanies.module.css";

const partnerNames = [
  "GENOMICS LAB",
  "MOLECULAR BIOTECH",
  "CLINICAL DIAGNOSTICS",
  "PHARMA QC LABS",
  "ACADEMIC SCIENCES",
  "BIO-REPOSITORY",
  "PATHOLOGY NETWORK",
  "ANALYTICAL TESTING",
  "FOOD SAFETY LAB",
  "PETROCHEMICAL QC",
  "FORENSIC SCIENCES",
  "BIOPROCESS LAB",
  "MICROBIOLOGY INSTITUTE",
] as const;

interface Partner {
  name: string;
  logo: string;
}

const partners: Partner[] = partnerNames.map((name, index) => ({
  name,
  logo: `/images/partners/partner-${String(index + 1).padStart(2, "0")}.png`,
}));

function PartnerLogo({ partner }: { partner: Partner }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={styles.logo}>
      <Image
        src={partner.logo}
        alt={`${partner.name} logo`}
        fill
        sizes="(max-width: 640px) 132px, 172px"
        loading="eager"
        unoptimized
        className={`${styles.logoImage} ${loaded ? styles.logoLoaded : styles.logoPending}`}
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(false)}
      />
      {!loaded && (
        <span
          className={styles.logoPlaceholder}
          role="img"
          aria-label={`${partner.name} logo placeholder`}
        >
          [COMPANY LOGO]
        </span>
      )}
    </div>
  );
}

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
                    {partners.map((partner) => (
                      <div
                        key={partner.logo}
                        className={styles.item}
                      >
                        <PartnerLogo partner={partner} />
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
