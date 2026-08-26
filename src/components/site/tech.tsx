"use client";

import { SectionHeading } from "./motion-primitives";

const rowOne = [
  "Swift",
  "SwiftUI",
  "Objective-C",
  "Kotlin",
  "Jetpack Compose",
  "React",
  "Next.js",
  "Node.js",
];
const rowTwo = [
  "PostgreSQL",
  "MongoDB",
  "AWS",
  "Firebase",
  "Docker",
  "REST",
  "GraphQL",
  "TypeScript",
];

function Pill({ label }: { label: string }) {
  return (
    <span className="mx-2 rounded-full border border-line bg-surface px-4 py-2 text-sm whitespace-nowrap text-ink-muted">
      {label}
    </span>
  );
}

function Row({ items, reverse }: { items: string[]; reverse?: boolean }) {
  const half = [...items, ...items, ...items];
  const doubled = [...half, ...half];
  return (
    <div className="group relative overflow-hidden py-3 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      <div
        className={`${reverse ? "marquee-track-reverse" : "marquee-track"} group-hover:[animation-play-state:paused]`}
      >
        {doubled.map((t, i) => (
          <Pill key={t + i} label={t} />
        ))}
      </div>
    </div>
  );
}

export function Tech() {
  return (
    <section id="tech" className="scroll-mt-0 border-y border-line bg-surface-2 pt-4 pb-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading eyebrow="Tech Stack" title="What We Build With" align="center" />
      </div>
      <div className="mt-12 space-y-2">
        <Row items={rowOne} />
        <Row items={rowTwo} reverse />
      </div>
    </section>
  );
}
