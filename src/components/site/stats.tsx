"use client";

import { StaggerGroup, fadeUp } from "./motion-primitives";
import { motion } from "motion/react";

const stats = [
  { value: "13", label: "Years in Business" },
  { value: "50+", label: "Products Shipped" },
  { value: "9", label: "Live Store Apps" },
  { value: "3", label: "Continents Served" },
  { value: "100%", label: "In-House Delivery" },
];

export function Stats() {
  return (
    <section className="border-y border-line bg-surface-2 py-20">
      <StaggerGroup className="mx-auto grid max-w-7xl grid-cols-2 gap-y-10 px-5 sm:px-8 lg:grid-cols-5">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            variants={fadeUp}
            className={`text-center ${i > 0 ? "lg:border-l lg:border-line" : ""}`}
          >
            <p
              className="font-display font-bold text-accent-blue"
              style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
            >
              {s.value}
            </p>
            <p className="mt-2 text-sm text-ink-muted">{s.label}</p>
          </motion.div>
        ))}
      </StaggerGroup>
    </section>
  );
}
