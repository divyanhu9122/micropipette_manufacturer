"use client";

import { useEffect, useRef, type ReactNode } from "react";
import styles from "./Testimonials.module.css";

export default function TestimonialCarousel({
  children,
  count,
}: {
  children: ReactNode;
  count: number;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = rootRef.current;
    const track = root?.querySelector<HTMLDivElement>(`[data-track]`);
    const section = root?.closest("section");
    if (!root || !track || !section) return;
    const dots = Array.from(
      root.querySelectorAll<HTMLButtonElement>("[data-dot]"),
    );
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const events = new AbortController();
    const options = { signal: events.signal };
    let active = 0;
    let timer: ReturnType<typeof setInterval> | undefined;
    let hovered = section.matches(":hover");
    let focused = false;
    let drag: { id: number; x: number; left: number } | null = null;
    const step = () =>
      (track.firstElementChild as HTMLElement).offsetWidth +
      (parseFloat(getComputedStyle(track).columnGap) || 18);
    const setDot = (index: number) => {
      active = Math.max(0, Math.min(index, count - 1));
      dots.forEach((dot, i) => {
        dot.dataset.active = String(i === active);
        dot.setAttribute("aria-current", String(i === active));
      });
    };
    const go = (index: number) => {
      const next = (index + count) % count;
      track.scrollTo({
        left: next * step(),
        behavior: motion.matches ? "instant" : "smooth",
      });
      setDot(next);
    };
    const stop = () => {
      if (timer !== undefined) clearInterval(timer);
      timer = undefined;
    };
    const start = () => {
      stop();
      if (!motion.matches && !hovered && !focused && !drag)
        timer = setInterval(() => go(active + 1), 5600);
    };
    root.querySelector("[data-prev]")?.addEventListener(
      "click",
      () => {
        go(active - 1);
        start();
      },
      options,
    );
    root.querySelector("[data-next]")?.addEventListener(
      "click",
      () => {
        go(active + 1);
        start();
      },
      options,
    );
    dots.forEach((dot, i) =>
      dot.addEventListener(
        "click",
        () => {
          go(i);
          start();
        },
        options,
      ),
    );
    section.addEventListener(
      "mouseenter",
      () => {
        hovered = true;
        stop();
      },
      options,
    );
    section.addEventListener(
      "mouseleave",
      () => {
        hovered = false;
        start();
      },
      options,
    );
    section.addEventListener(
      "focusin",
      () => {
        focused = true;
        stop();
      },
      options,
    );
    section.addEventListener(
      "focusout",
      (event) => {
        if (!section.contains(event.relatedTarget as Node | null)) {
          focused = false;
          start();
        }
      },
      options,
    );
    track.addEventListener(
      "pointerdown",
      (event) => {
        if (drag || (event.pointerType === "mouse" && event.button !== 0))
          return;
        drag = {
          id: event.pointerId,
          x: event.clientX,
          left: track.scrollLeft,
        };
        track.classList.add(styles.dragging);
        track.setPointerCapture(event.pointerId);
        stop();
      },
      options,
    );
    track.addEventListener(
      "pointermove",
      (event) => {
        if (drag && event.pointerId === drag.id)
          track.scrollLeft = drag.left - (event.clientX - drag.x);
      },
      options,
    );
    const finish = (event: PointerEvent) => {
      if (!drag || event.pointerId !== drag.id) return;
      const id = drag.id;
      drag = null;
      track.classList.remove(styles.dragging);
      if (track.hasPointerCapture(id)) track.releasePointerCapture(id);
      setDot(Math.round(track.scrollLeft / step()));
      start();
    };
    track.addEventListener("pointerup", finish, options);
    track.addEventListener("pointercancel", finish, options);
    track.addEventListener("lostpointercapture", finish, options);
    motion.addEventListener("change", start, options);
    start();
    return () => {
      stop();
      events.abort();
    };
  }, [count]);
  return (
    <div ref={rootRef} className={styles.shell}>
      <div
        data-track
        className={styles.track}
        tabIndex={0}
        role="region"
        aria-label="Customer testimonials, scrollable"
      >
        {children}
      </div>
      <div className={styles.controls}>
        <button
          data-prev
          type="button"
          className={styles.arrow}
          aria-label="Previous testimonial"
        >
          ‹
        </button>
        <div
          className={styles.dots}
          role="group"
          aria-label="Testimonial navigation"
        >
          {Array.from({ length: count }, (_, i) => (
            <button
              key={i}
              data-dot
              data-active={i === 0}
              aria-current={i === 0}
              type="button"
              className={styles.dot}
              aria-label={`Testimonial ${i + 1}`}
            />
          ))}
        </div>
        <button
          data-next
          type="button"
          className={styles.arrow}
          aria-label="Next testimonial"
        >
          ›
        </button>
      </div>
    </div>
  );
}
