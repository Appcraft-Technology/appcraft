"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import type { Shot } from "./work-data";

type Props = {
  shots: Shot[];
  name: string;
  fit: "phone" | "web";
  eager?: boolean;
};

export function ScreenshotCarousel({ shots, name, fit, eager }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);

  const scrollTo = useCallback(
    (i: number) => {
      const track = trackRef.current;
      if (!track) return;
      const clamped = Math.max(0, Math.min(shots.length - 1, i));
      track.scrollTo({ left: clamped * track.clientWidth, behavior: "smooth" });
      setIndex(clamped);
    },
    [shots.length],
  );

  const onScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    setIndex(Math.round(track.scrollLeft / Math.max(1, track.clientWidth)));
  };

  return (
    <>
      <div className="group/car relative size-full">
        <div
          ref={trackRef}
          onScroll={onScroll}
          className="flex size-full snap-x snap-mandatory overflow-x-auto overscroll-x-contain scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {shots.map((s, i) => (
            <button
              key={s.src}
              type="button"
              onClick={() => setLightbox(i)}
              aria-label={`Open ${name} screenshot ${i + 1} of ${shots.length}: ${s.caption}`}
              className="relative flex w-full shrink-0 snap-center items-end justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue"
            >
              <img
                src={s.src}
                width={s.w}
                height={s.h}
                alt={`${name} - ${s.caption}`}
                loading={eager && i === 0 ? "eager" : "lazy"}
                fetchPriority={eager && i === 0 ? "high" : "auto"}
                decoding="async"
                sizes={
                  fit === "web"
                    ? "(max-width: 1024px) 100vw, 640px"
                    : "(max-width: 640px) 60vw, 300px"
                }
                className={
                  fit === "web"
                    ? "size-full object-cover object-top"
                    : "h-full w-auto max-w-full translate-y-5 rounded-t-xl object-contain object-top shadow-2xl transition-transform duration-500 group-hover:translate-y-2"
                }
              />
            </button>
          ))}
        </div>

        <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-bg/60 p-1.5 text-ink-muted opacity-0 backdrop-blur transition-opacity group-hover/car:opacity-100">
          <Maximize2 className="size-3.5" />
        </span>

        {shots.length > 1 && (
          <>
            <button
              type="button"
              aria-label={`Previous ${name} screenshot`}
              onClick={() => scrollTo(index - 1)}
              disabled={index === 0}
              className="absolute left-2 top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-full border border-line bg-bg/70 text-ink backdrop-blur transition disabled:opacity-30 md:opacity-0 md:group-hover/car:opacity-100"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              aria-label={`Next ${name} screenshot`}
              onClick={() => scrollTo(index + 1)}
              disabled={index === shots.length - 1}
              className="absolute right-2 top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-full border border-line bg-bg/70 text-ink backdrop-blur transition disabled:opacity-30 md:opacity-0 md:group-hover/car:opacity-100"
            >
              <ChevronRight className="size-5" />
            </button>
            <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
              {shots.map((s, i) => (
                <button
                  key={s.src}
                  type="button"
                  aria-label={`Go to ${name} screenshot ${i + 1}`}
                  aria-current={i === index}
                  onClick={() => scrollTo(i)}
                  className={`h-1.5 rounded-full transition-all ${i === index ? "w-5 bg-ink" : "w-1.5 bg-ink/40"}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {lightbox !== null && (
        <Lightbox shots={shots} name={name} start={lightbox} onClose={() => setLightbox(null)} />
      )}
    </>
  );
}

function Lightbox({
  shots,
  name,
  start,
  onClose,
}: {
  shots: Shot[];
  name: string;
  start: number;
  onClose: () => void;
}) {
  const [i, setI] = useState(start);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setI((v) => Math.min(shots.length - 1, v + 1));
      if (e.key === "ArrowLeft") setI((v) => Math.max(0, v - 1));
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose, shots.length]);

  const shot = shots[i]!;

  const overlay = (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${name} screenshots`}
      onClick={onClose}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-4 bg-bg/95 p-4 backdrop-blur-xl animate-in fade-in"
    >
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute right-4 top-4 grid size-10 place-items-center rounded-full border border-line bg-surface text-ink"
      >
        <X className="size-5" />
      </button>

      <img
        src={shot.src}
        alt={`${name} - ${shot.caption}`}
        width={shot.w}
        height={shot.h}
        onClick={(e) => e.stopPropagation()}
        className="max-h-[78vh] w-auto max-w-full rounded-xl border border-line object-contain shadow-2xl"
      />

      <p className="text-sm text-ink-muted">
        {shot.caption} · {i + 1}/{shots.length}
      </p>

      {shots.length > 1 && (
        <div className="flex items-center gap-3" onClick={(e) => e.stopPropagation()}>
          <button
            type="button"
            aria-label="Previous screenshot"
            onClick={() => setI(Math.max(0, i - 1))}
            disabled={i === 0}
            className="grid size-11 place-items-center rounded-full border border-line bg-surface text-ink disabled:opacity-30"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            type="button"
            aria-label="Next screenshot"
            onClick={() => setI(Math.min(shots.length - 1, i + 1))}
            disabled={i === shots.length - 1}
            className="grid size-11 place-items-center rounded-full border border-line bg-surface text-ink disabled:opacity-30"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>
      )}
    </div>
  );

  if (typeof document === "undefined") return null;
  return createPortal(overlay, document.body);
}
