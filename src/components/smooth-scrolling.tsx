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
    frame.update(update, true);
    return () => cancelFrame(update);
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
