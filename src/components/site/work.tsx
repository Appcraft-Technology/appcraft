"use client";

import { motion } from "motion/react";
import { ArrowUpRight, Apple, Play, Globe } from "lucide-react";
import { Reveal, SectionHeading, fadeUp } from "./motion-primitives";
import { PatternOverlay } from "./work-pattern";
import { ScreenshotCarousel } from "./screenshot-carousel";
import { projects, secondary, type Platform } from "./work-data";

const platformClass: Record<Platform, string> = {
  iOS: "bg-surface text-ink-muted border border-line",
  Android: "bg-accent-emerald/10 text-accent-emerald border border-accent-emerald/25",
  Web: "bg-accent-blue/10 text-accent-blue border border-accent-blue/25",
};

const storeBtn =
  "inline-flex items-center gap-1.5 rounded-lg border border-line bg-surface px-3 py-2 text-xs font-medium text-ink-muted transition-colors hover:border-line-strong hover:text-ink";

export function Work() {
  return (
    <section id="work" className="scroll-mt-24 pt-16 pb-28 sm:pt-20 lg:pt-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Selected Work"
          title="Products We've Shipped"
          subtitle="Live apps and platforms. Real links. Real users."
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-6"
        >
          {projects.map((p, pi) => (
            <motion.article
              key={p.name}
              variants={fadeUp}
              className={`group flex flex-col overflow-hidden rounded-2xl glass-card transition-all duration-300 hover:-translate-y-1.5 hover:border-line-strong ${p.span} ${p.wide ? "lg:grid lg:grid-cols-2 lg:items-center" : ""}`}
            >
              <div
                className={`relative overflow-hidden ${p.wide ? "aspect-[16/9] lg:aspect-auto lg:h-full lg:min-h-80" : "aspect-[16/10]"}`}
              >
                <div className="absolute inset-0" style={{ background: p.gradient }} />
                <PatternOverlay kind={p.pattern} />
                <div className="absolute inset-0">
                  <ScreenshotCarousel
                    shots={p.shots}
                    name={p.name}
                    fit={p.shotFit}
                    eager={pi < 2}
                  />
                </div>
              </div>

              <div className="p-6">
                <h3 className="font-display text-xl font-bold">{p.name}</h3>
                <p className="mt-2 text-sm text-ink-muted">{p.desc}</p>

                <div className="mt-4 flex flex-wrap items-center gap-2">
                  {p.platforms.map((pl) => (
                    <span
                      key={pl}
                      className={`rounded-full px-3 py-1 text-xs font-medium ${platformClass[pl]}`}
                    >
                      {pl}
                    </span>
                  ))}
                </div>

                <div className="mt-5 flex flex-wrap items-center gap-2">
                  {p.appStore && (
                    <a
                      href={p.appStore}
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label={`${p.name} on the App Store`}
                      className={storeBtn}
                    >
                      <Apple className="size-4" /> App Store
                    </a>
                  )}
                  {p.playStore && (
                    <a
                      href={p.playStore}
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label={`${p.name} on Google Play`}
                      className={storeBtn}
                    >
                      <Play className="size-4" /> Google Play
                    </a>
                  )}
                  {p.website && (
                    <a
                      href={p.website}
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label={`${p.name} website`}
                      className={storeBtn}
                    >
                      <Globe className="size-4" /> Visit Site
                    </a>
                  )}
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-1 px-1 text-sm text-accent-blue hover:underline"
                  >
                    View Live <ArrowUpRight className="size-4" />
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        <Reveal className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-line pt-8 text-sm text-ink-dim">
          <span className="eyebrow">Also shipped</span>
          {secondary.map((s) => (
            <a
              key={s.name}
              href={s.url}
              target="_blank"
              rel="noreferrer noopener"
              className="transition-colors hover:text-ink"
            >
              {s.name} <span className="text-ink-dim">- {s.platform}</span>
            </a>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
