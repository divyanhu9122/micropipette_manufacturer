"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./ProductDetail.module.css";

interface ProductGalleryProps {
  title: string;
  images?: string[];
}

export default function ProductGallery({
  title,
  images = [],
}: ProductGalleryProps) {
  const [activeThumb, setActiveThumb] = useState(0);

  return (
    <div className={styles.pdGallery}>
      <div className={styles.pdMainImage} aria-label={title}>
        {images.length ? (
          <Image
            unoptimized
            src={images[Math.min(activeThumb, images.length - 1)]}
            alt={title}
            width={700}
            height={700}
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        ) : (
          <span>Product image pending</span>
        )}
      </div>

      <div className={styles.pdThumbs} aria-label="Product gallery">
        {images.map((image, index) => (
          <button
            key={image}
            type="button"
            className={`${styles.pdThumb} ${activeThumb === index ? styles.pdThumbActive : ""}`}
            onClick={() => setActiveThumb(index)}
            aria-label={`View image ${index + 1}`}
          >
            <Image
              unoptimized
              src={image}
              alt={`${title} — view ${index + 1}`}
              width={80}
              height={80}
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
