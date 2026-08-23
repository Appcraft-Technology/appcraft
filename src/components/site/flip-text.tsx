"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

export const flipWords = ["Apps.", "Software.", "CRM.", "Website.", "AI Automation."];

export const flipPhrase = flipWords.map((w) => w.replace(/\.$/, "")).join(", ");

export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return reduced;
}

const boxStyle = {
  height: "1.3em",
  lineHeight: "1.1",
  marginBottom: "-0.2em",
} as const;

/**
 * Rotating headline word.
 *
 * Accessibility: the wrapper carries a single static aria-label with the whole
 * phrase, and every visual layer is aria-hidden, so assistive tech announces
 * the phrase once instead of narrating each flip. Motion stops when the user
 * prefers reduced motion or presses the pause control in the hero.
 */
export function FlipText({ className, paused = false }: { className?: string; paused?: boolean }) {
  const [index, setIndex] = useState(0);
  const reducedMotion = useReducedMotion();
  const still = reducedMotion || paused;

  useEffect(() => {
    if (still) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % flipWords.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [still]);

  // Invisible sizer holds the widest word so the container width, and the
  // headline line box, never change while words cycle.
  const sizer = (
    <span aria-hidden="true" className="invisible col-start-1 row-start-1 whitespace-nowrap">
      {flipWords.reduce((a, b) => (b.length > a.length ? b : a))}
    </span>
  );

  const srLabel = <span className="sr-only">{flipPhrase}</span>;

  if (still) {
    return (
      <>
        {srLabel}
        <span
          data-testid="flip-text"
          data-static="true"
          aria-hidden="true"
          className={`inline-grid max-w-full overflow-hidden align-bottom text-accent-blue ${className ?? ""}`}
          style={boxStyle}
        >
          {sizer}
          <span aria-hidden="true" className="col-start-1 row-start-1 whitespace-nowrap">
            {flipWords[index]}
          </span>
        </span>
      </>
    );
  }

  return (
    <>
      {srLabel}
      <span
        data-testid="flip-text"
        data-static="false"
        aria-hidden="true"
        className={`inline-grid max-w-full overflow-hidden align-bottom ${className ?? ""}`}
        style={{ ...boxStyle, perspective: "1000px" }}
      >
        {sizer}
        <span aria-hidden="true" className="col-start-1 row-start-1 inline-grid">
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={flipWords[index]}
              className="col-start-1 row-start-1 whitespace-nowrap text-accent-blue will-change-transform"
              initial={{ rotateX: 90, y: "100%", opacity: 0 }}
              animate={{ rotateX: 0, y: 0, opacity: 1 }}
              exit={{ rotateX: -90, y: "-100%", opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              style={{ transformOrigin: "center center", backfaceVisibility: "hidden" }}
            >
              {flipWords[index]}
            </motion.span>
          </AnimatePresence>
        </span>
      </span>
    </>
  );
}
