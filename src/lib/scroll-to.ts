import type { MouseEvent } from "react";

/**
 * Smooth-scrolls to an in-page section without writing "#id" into the URL.
 */
export function scrollToHash(e: MouseEvent<HTMLAnchorElement>, href: string) {
  if (!href.startsWith("#")) return;
  const id = href.slice(1);
  e.preventDefault();

  const prefersReduced =
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (id === "top") {
    window.scrollTo({ top: 0, behavior: prefersReduced ? "auto" : "smooth" });
    return;
  }

  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({
    behavior: prefersReduced ? "auto" : "smooth",
    block: "start",
  });
}
