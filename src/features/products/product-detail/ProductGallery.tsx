"use client";

import { useState } from "react";
import styles from "./ProductDetail.module.css";

interface ProductGalleryProps {
  title: string;
}

const THUMB_LABELS = [
  "Front View",
  "Plunger & Dial",
  "Tip Cone",
  "Ergonomic Grip",
  "Packaging",
];

export default function ProductGallery({ title }: ProductGalleryProps) {
  const [activeThumb, setActiveThumb] = useState(0);

  return (
    <div className={styles.pdGallery}>
      <div
        className={styles.pdMainImage}
        aria-label={`${title} view: ${THUMB_LABELS[activeThumb]}`}
      >
        <div className={styles.pipetteGraphic} aria-hidden="true">
          <div className={styles.pipetteStem} />
        </div>
        <span>[PRODUCT IMAGE — {THUMB_LABELS[activeThumb].toUpperCase()}]</span>
      </div>

      <div className={styles.pdThumbs} aria-label="Product gallery, 5 photos">
        {THUMB_LABELS.map((label, index) => (
          <button
            key={label}
            type="button"
            className={`${styles.pdThumb} ${activeThumb === index ? styles.pdThumbActive : ""}`}
            onClick={() => setActiveThumb(index)}
            aria-label={`View ${label}`}
          >
            <div className={styles.thumbIcon} aria-hidden="true" />
            <span>IMAGE {index + 1}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
