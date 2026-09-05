"use client";

import type { LenisRef } from "lenis/react";
import { ReactLenis } from "lenis/react";
import { useEffect, useRef } from "react";
import { cancelFrame, frame } from "motion/react";

export default function SmoothScrolling({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<LenisRef>(null);

  useEffect(() => {
    function update(data: { timestamp: number }) {
      lenisRef.current?.lenis?.raf(data.timestamp);
    }
    function scrollToTop() {
      lenisRef.current?.lenis?.scrollTo(0, { immediate: true, force: true });
    }
    frame.update(update, true);
    window.addEventListener("appcraft:scroll-top", scrollToTop);
    return () => {
      cancelFrame(update);
      window.removeEventListener("appcraft:scroll-top", scrollToTop);
    };
  }, []);

  return (
    <ReactLenis
      root
      options={{
        autoRaf: false,
        duration: 1.5,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        touchMultiplier: 2,
        infinite: false,
        anchors: true,
        syncTouch: false,
      }}
      ref={lenisRef}
    >
      {children}
    </ReactLenis>
  );
}
