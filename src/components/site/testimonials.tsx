"use client";

import { motion } from "motion/react";
import { SectionHeading, fadeUp } from "./motion-primitives";

const dallasKrueger = "/assets/testimonials/dallas-krueger.webp";
const michael = "/assets/testimonials/michael.webp";
const mohitKalra = "/assets/testimonials/mohit-kalra.webp";

const quotes = [
  {
    quote:
      "My experience has been great working with Appcraft Technology. Their team is highly skilled in developing end-to-end solutions for web and mobile platforms.",
    name: "Dallas Krueger",
    role: "Business Owner",
    avatar: dallasKrueger,
  },
  {
    quote:
      "It has been great experience working with your guys. You made my website, mobile app and Facebook app without any hassle to me. I am so impressed by your services.",
    name: "Mohit Kalra",
    role: "Business Owner",
    avatar: mohitKalra,
  },
  {
    quote:
      "Thank you for making such a great product for us! I am so pleased with the quality of YouPoll app. Your expertise in mobile domain is great! I will refer everyone I know.",
    name: "Michael",
    role: "Freelancer",
    avatar: michael,
  },
];

export function Testimonials() {
  return (
    <section className="py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading eyebrow="Client Voices" title="What Partners Say" />
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-3"
        >
          {quotes.map((q) => (
            <motion.figure
              key={q.name}
              variants={fadeUp}
              className="rounded-xl glass-card p-8 transition-all duration-300 hover:-translate-y-1.5 hover:border-line-strong"
            >
              <span
                aria-hidden="true"
                className="block font-display text-5xl leading-none text-accent-blue opacity-30"
              >
                &ldquo;
              </span>
              <blockquote className="mt-3 text-base leading-[1.7] italic text-ink-muted">
                {q.quote}
              </blockquote>
              <hr className="my-6 border-line" />
              <figcaption className="flex items-center gap-3">
                <img
                  src={q.avatar}
                  alt=""
                  width={48}
                  height={48}
                  loading="lazy"
                  decoding="async"
                  className="h-12 w-12 shrink-0 rounded-full object-cover ring-1 ring-line"
                />
                <div className="min-w-0">
                  <p className="font-display text-base font-bold">{q.name}</p>
                  <p className="mt-0.5 text-sm text-ink-dim">{q.role}</p>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
