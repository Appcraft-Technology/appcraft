"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Compass, Hammer, Layers, Rocket } from "lucide-react";
import { SectionHeading, fadeUp } from "./motion-primitives";

const steps = [
  {
    n: "01",
    icon: Compass,
    title: "Discover",
    desc: "We map your users, constraints, and success metrics before writing a line of code.",
  },
  {
    n: "02",
    icon: Layers,
    title: "Architect",
    desc: "System design, API contracts, and scalable infrastructure planned by senior engineers.",
  },
  {
    n: "03",
    icon: Hammer,
    title: "Build",
    desc: "Two-week sprints with working demos. You see progress, not promises.",
  },
  {
    n: "04",
    icon: Rocket,
    title: "Ship",
    desc: "App Store, Play Store, and production web deploys. Then we stay for support.",
  },
];

export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "center 40%"] });
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="process" className="scroll-mt-24 py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Our Process"
          title="From Idea to App Store"
          subtitle="A battle-tested system refined over 13 years and 50+ products."
        />

        <div ref={ref} className="relative mt-16">
          <div className="absolute top-6 right-0 left-0 hidden h-px bg-line lg:block">
            <motion.div
              style={{ scaleX, transformOrigin: "left" }}
              className="h-px w-full bg-accent-blue"
            />
          </div>

          <motion.ol
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
            className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4"
          >
            {steps.map((s) => (
              <motion.li key={s.n} variants={fadeUp} className="relative">
                <div className="flex size-12 items-center justify-center rounded-full border border-line bg-background">
                  <s.icon className="size-5 text-accent-blue" />
                </div>
                <p className="mt-6 font-display text-3xl font-bold text-accent-blue">{s.n}</p>
                <h3 className="mt-2 text-xl">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">{s.desc}</p>
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </div>
    </section>
  );
}
