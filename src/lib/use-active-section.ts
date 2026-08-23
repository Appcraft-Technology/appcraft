import { useEffect, useState } from "react";

/**
 * Tracks which section is currently in view, based on scroll position.
 * Never touches the URL.
 */
export function useActiveSection(ids: string[], offset = 96) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const compute = () => {
      const scrollY = window.scrollY;
      // Bottom of page: last section wins.
      if (scrollY + window.innerHeight >= document.body.scrollHeight - 2) {
        setActive(ids[ids.length - 1] ?? null);
        return;
      }
      const threshold = Math.max(offset, window.innerHeight * 0.35);
      let current: string | null = null;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= threshold) current = id;
      }
      setActive(current);
    };

    compute();
    window.addEventListener("scroll", compute, { passive: true });
    window.addEventListener("resize", compute);
    return () => {
      window.removeEventListener("scroll", compute);
      window.removeEventListener("resize", compute);
    };
  }, [ids.join("|"), offset]);

  return active;
}

/**
 * Deep links via ?section=contact (no "#" fragment in the URL).
 */
export function useSectionQueryDeepLink(validIds: string[]) {
  useEffect(() => {
    const section = new URLSearchParams(window.location.search).get("section");
    if (!section || !validIds.includes(section)) return;
    let tries = 0;
    const tryScroll = () => {
      const el = document.getElementById(section);
      if (el) {
        el.scrollIntoView({ behavior: "auto", block: "start" });
        return;
      }
      if (tries++ < 20) window.setTimeout(tryScroll, 100);
    };
    tryScroll();
  }, []);
}
