"use client";

import { useState, useEffect, useCallback } from "react";

interface HeroSliderProps {
  onOpenQuote?: () => void;
}

const slides = [
  {
    id: 1,
    image: "/images/hero/hero-slide-01.jpg",
    eyebrow: "PRECISION ENGINEERED. GLOBALLY TRUSTED.",
    isEyebrow: true,
    title: "Global Micropipette Manufacturing & Laboratory Solutions",
    description:
      "Advanced micropipettes and lab instruments for distributors, laboratories, institutions and OEM partners worldwide.",
    primaryCta: "Get Quote →",
    primaryAction: "quote",
    secondaryCta: "Download Catalog ↓",
    secondaryHref: "#resources",
  },
  {
    id: 2,
    image: "/images/hero/hero-slide-02.jpg",
    eyebrow: "PRODUCT PORTFOLIO",
    isEyebrow: false,
    title: "One Portal for Micropipettes, Tips, Controllers and More",
    description:
      "Explore organized product categories, technical information and faster enquiry paths from one unified manufacturer platform.",
    primaryCta: "Explore Products →",
    primaryAction: "categories",
    secondaryCta: "Download Catalog ↓",
    secondaryHref: "#resources",
  },
  {
    id: 3,
    image: "/images/hero/hero-slide-03.jpg",
    eyebrow: "OUR BRANDS",
    isEyebrow: false,
    title: "LABXE, SSCIENCES and DANWER Under One Strong B2B Structure",
    description:
      "Three focused brands connected through one global platform for product discovery, OEM enquiries and distributor partnerships.",
    primaryCta: "Browse Brands →",
    primaryAction: "brands",
    secondaryCta: "Download Catalog ↓",
    secondaryHref: "#resources",
  },
  {
    id: 4,
    image: "/images/hero/hero-slide-04.jpg",
    eyebrow: "OEM / PRIVATE LABEL",
    isEyebrow: false,
    title: "Build Your Own Micropipette Brand With Custom Printing",
    description:
      "Custom company-name printing, logo branding, private-label packaging and structured OEM support for global buyers.",
    primaryCta: "OEM Inquiries →",
    primaryAction: "quote",
    secondaryCta: "Download Catalog ↓",
    secondaryHref: "#resources",
  },
];

export default function HeroSlider({ onOpenQuote }: HeroSliderProps) {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 2800);
    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  return (
    <section
      className="hero hero-full-slider"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Micropipette Manufacturing Hero Slideshow"
    >
      <div className="hero-slider-full">
        {slides.map((slide, index) => {
          const isActive = index === current;
          return (
            <article
              key={slide.id}
              className={`hero-full-slide ${isActive ? "active" : ""}`}
              style={{ backgroundImage: `url(${slide.image})` }}
              aria-hidden={!isActive}
            >
              <div className="hero-image-overlay" />
              <div className="wrap hero-image-content">
                <div className="hero-image-copy">
                  {slide.isEyebrow ? (
                    <div className="eyebrow hero-eyebrow">{slide.eyebrow}</div>
                  ) : (
                    <span className="slide-label">{slide.eyebrow}</span>
                  )}
                  <h1>{slide.title}</h1>
                  <p>{slide.description}</p>
                  <div className="hero-actions">
                    {slide.primaryAction === "quote" ? (
                      <button
                        type="button"
                        className="btn primary"
                        onClick={onOpenQuote}
                      >
                        {slide.primaryCta}
                      </button>
                    ) : (
                      <a className="btn primary" href={`#${slide.primaryAction}`}>
                        {slide.primaryCta}
                      </a>
                    )}
                    <a className="btn hero-catalog" href={slide.secondaryHref}>
                      {slide.secondaryCta}
                    </a>
                  </div>
                </div>
              </div>
            </article>
          );
        })}

        <button
          className="hero-slider-nav hero-prev"
          type="button"
          onClick={prevSlide}
          aria-label="Previous slide"
        >
          ‹
        </button>
        <button
          className="hero-slider-nav hero-next"
          type="button"
          onClick={nextSlide}
          aria-label="Next slide"
        >
          ›
        </button>

        <div className="hero-slider-dots">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              className={`hero-dot ${index === current ? "active" : ""}`}
              type="button"
              onClick={() => setCurrent(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
