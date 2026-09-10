"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

/**
 * Restrained scroll reveal matching the confirmed prototype's .pl-reveal
 * behavior: fades/slides an element in once it nears the viewport, then
 * stops observing it.
 *
 * Every render starts hidden (isVisible: false) so the server-rendered
 * markup and the client's first hydration pass always agree — browser
 * capability checks (IntersectionObserver support, reduced-motion
 * preference) are unknowable on the server, so they only run after mount,
 * inside the effect below, never during the initial render.
 */
export function useReveal<T extends HTMLElement>(): {
  ref: RefObject<T | null>;
  isVisible: boolean;
} {
  const ref = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (!("IntersectionObserver" in window) || prefersReducedMotion) {
      const frame = requestAnimationFrame(() => setIsVisible(true));
      return () => cancelAnimationFrame(frame);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -24px 0px" },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
}
