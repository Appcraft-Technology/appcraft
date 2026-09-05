"use client";

import { motion } from "motion/react";
import { CalendarDays, Package, Smartphone, Users } from "lucide-react";
import { FlipText } from "./flip-text";
import Link from "next/link";

const trust = [
  { icon: CalendarDays, value: "13", label: "Years in Business" },
  { icon: Package, value: "50+", label: "Products Shipped" },
  { icon: Smartphone, value: "9", label: "Live Store Apps" },
  { icon: Users, value: "100%", label: "In-House Team" },
];

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center overflow-hidden"
      style={{ background: "var(--gradient-hero)" }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(45% 35% at 20% 20%, color-mix(in oklab, var(--accent-blue) 30%, transparent), transparent 70%), radial-gradient(40% 40% at 80% 10%, color-mix(in oklab, var(--accent-blue) 18%, transparent), transparent 70%)",
        }}
      />
      <div className="relative mx-auto w-full max-w-7xl px-5 pt-28 pb-6 sm:px-8 sm:pt-32 sm:pb-8 lg:pb-10">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="eyebrow"
          data-testid="hero-eyebrow"
        >
          <span className="inline">Product&nbsp;Engineering&nbsp;&amp;&nbsp;AI&nbsp;Automation</span>
          <span className="mx-2 hidden text-ink-muted sm:inline">·</span>
          <span className="block sm:inline">Est.&nbsp;2013</span>
        </motion.p>

        <h1
          className="mt-5 max-w-5xl font-display tracking-tight text-[clamp(1.25rem,5.6vw,4.5rem)] min-[360px]:text-[clamp(1.5rem,6.6vw,4.5rem)] sm:mt-6"
          style={{ lineHeight: 1.1 }}
        >
          {["We", "Ship"].map((word, i) => (
            <motion.span
              key={word}
              className="mr-[0.25em] inline-block"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 + i * 0.05, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {word}
            </motion.span>
          ))}
          <span className="inline-block whitespace-nowrap">
            <motion.span
              className="mr-[0.25em] inline-block"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            >
              Production
            </motion.span>
            <motion.span
              className="inline-block"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <FlipText />
            </motion.span>
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="mt-6 max-w-3xl text-base leading-relaxed text-ink-muted sm:mt-8 sm:text-lg"
        >
          AppCraft Technology designs, builds, and launches iOS, Android, web, CRM, ERP, AI
          automation, and agentic AI solutions for international businesses.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.52 }}
          className="mt-4 max-w-2xl text-sm leading-relaxed text-ink-dim sm:text-base"
        >
          13 years. 50+ products shipped. 9 live apps on the App Store and Google Play.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <Link
            href="/work"
            className="rounded-full bg-primary px-8 py-3.5 font-medium text-primary-foreground shadow-[var(--shadow-glow)] transition-transform duration-200 hover:scale-[1.02]"
          >
            View Our Work
          </Link>
          <Link
            href="/contact"
            className="rounded-full border border-line-strong px-8 py-3.5 font-medium text-ink transition-colors duration-200 hover:border-ink-muted hover:bg-surface/60"
          >
            Start Your Project
          </Link>
        </motion.div>

        <motion.dl
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.75 }}
          className="mt-12 grid sm:mt-16 grid-cols-2 gap-8 sm:flex sm:flex-wrap"
        >
          {trust.map((t) => (
            <div key={t.label} className="flex items-center gap-3">
              <t.icon className="size-5 shrink-0 text-accent-blue" />
              <div className="min-w-0">
                <dt className="font-display text-2xl font-bold">{t.value}</dt>
                <dd className="text-sm text-ink-muted">{t.label}</dd>
              </div>
            </div>
          ))}
        </motion.dl>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9 }}
          className="mt-10 inline-flex max-w-full flex-col gap-1 rounded-2xl border border-line px-4 py-3 text-sm text-ink-muted transition-colors hover:border-line-strong hover:text-ink sm:flex-row sm:items-center sm:gap-3 sm:rounded-full sm:py-2"
        >
          <span className="font-medium text-ink">AppCraft Technology</span>
          <span className="text-ink-muted/80 sm:text-ink-muted">
            Product engineering for CRM, ERP, AI automation, and agentic AI.
          </span>
        </motion.div>
      </div>
    </section>
  );
}
