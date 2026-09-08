"use client";

import { useRef, type PointerEvent, type ReactNode } from "react";

export default function Carousel({
  children,
  styles,
  label,
  previousLabel,
  nextLabel,
}: {
  children: ReactNode;
  styles: Record<string, string>;
  label: string;
  previousLabel: string;
  nextLabel: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const drag = useRef<{
    pointerId: number;
    startX: number;
    scrollLeft: number;
  } | null>(null);

  const scroll = (direction: number) => {
    const track = trackRef.current;
    const card = track?.firstElementChild;
    if (!track || !(card instanceof HTMLElement)) return;
    const gap = parseFloat(window.getComputedStyle(track).columnGap) || 0;
    // offsetWidth excludes the hover scale so each step stays exactly one card + gap.
    const step = card.offsetWidth + gap;
    track.scrollBy({
      left: direction * step,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  };

  const startDrag = (event: PointerEvent<HTMLDivElement>) => {
    if (drag.current || (event.pointerType === "mouse" && event.button !== 0))
      return;
    const track = event.currentTarget;
    drag.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      scrollLeft: track.scrollLeft,
    };
    track.classList.add(styles.dragging);
    track.setPointerCapture(event.pointerId);
  };

  const moveDrag = (event: PointerEvent<HTMLDivElement>) => {
    const current = drag.current;
    if (!current || event.pointerId !== current.pointerId) return;
    event.currentTarget.scrollLeft =
      current.scrollLeft - (event.clientX - current.startX);
  };

  const stopDrag = (event: PointerEvent<HTMLDivElement>) => {
    const current = drag.current;
    if (!current || event.pointerId !== current.pointerId) return;
    drag.current = null;
    event.currentTarget.classList.remove(styles.dragging);
    if (event.currentTarget.hasPointerCapture(current.pointerId)) {
      event.currentTarget.releasePointerCapture(current.pointerId);
    }
  };

  return (
    <div className={styles.carouselSection}>
      <div className={styles.shell}>
        <button
          className={`${styles.arrow} ${styles.previous}`}
          type="button"
          aria-label={previousLabel}
          onClick={() => scroll(-1)}
        >
          ‹
        </button>
        <div
          ref={trackRef}
          className={styles.track}
          tabIndex={0}
          role="region"
          aria-label={label}
          onPointerDown={startDrag}
          onPointerMove={moveDrag}
          onPointerUp={stopDrag}
          onPointerCancel={stopDrag}
          onLostPointerCapture={stopDrag}
        >
          {children}
        </div>
        <button
          className={`${styles.arrow} ${styles.next}`}
          type="button"
          aria-label={nextLabel}
          onClick={() => scroll(1)}
        >
          ›
        </button>
      </div>
    </div>
  );
}
