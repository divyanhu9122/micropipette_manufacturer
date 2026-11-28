"use client";

import { useEffect, useRef } from "react";

/** Keep the background inert and restore focus when a modal closes. */
export function useDialog<T extends HTMLElement>(
  open: boolean,
  onClose: () => void,
) {
  const ref = useRef<T>(null);
  const close = useRef(onClose);
  useEffect(() => {
    close.current = onClose;
  }, [onClose]);
  useEffect(() => {
    const dialog = ref.current;
    if (!open || !dialog) return;
    const previous =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    const overflow = document.body.style.overflow;
    const siblings: { element: HTMLElement; inert: boolean }[] = [];
    let branch: HTMLElement = dialog;
    while (branch.parentElement) {
      for (const sibling of Array.from(branch.parentElement.children)) {
        if (sibling !== branch && sibling instanceof HTMLElement) {
          siblings.push({ element: sibling, inert: sibling.inert });
          sibling.inert = true;
        }
      }
      if (branch.parentElement === document.body) break;
      branch = branch.parentElement;
    }
    document.body.style.overflow = "hidden";
    const controls = () =>
      Array.from(
        dialog.querySelectorAll<HTMLElement>(
          'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])',
        ),
      ).filter(
        (element) =>
          element.getClientRects().length &&
          !element.closest("[hidden],[inert]"),
      );
    (controls()[0] || dialog).focus();
    const keydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        event.stopPropagation();
        close.current();
      }
      if (event.key !== "Tab") return;
      const items = controls();
      const first = items[0];
      const last = items.at(-1);
      if (!first) {
        event.preventDefault();
        dialog.focus();
      } else if (
        event.shiftKey &&
        (document.activeElement === first ||
          !dialog.contains(document.activeElement))
      ) {
        event.preventDefault();
        last?.focus();
      } else if (
        !event.shiftKey &&
        (document.activeElement === last ||
          !dialog.contains(document.activeElement))
      ) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", keydown, true);
    return () => {
      document.removeEventListener("keydown", keydown, true);
      siblings.forEach(({ element, inert }) => {
        element.inert = inert;
      });
      document.body.style.overflow = overflow;
      if (previous?.isConnected) previous.focus();
    };
  }, [open]);
  return ref;
}
