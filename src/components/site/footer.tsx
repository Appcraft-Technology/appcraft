"use client";

import { Linkedin } from "lucide-react";
import { scrollToHash } from "@/lib/scroll-to";

const logoUrl = "/assets/appcraft-logo.png";

const links = [
  { label: "Work", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "Tech", href: "#tech" },
  { label: "Contact", href: "#contact" },
];

export function Footer() {
  return (
    <footer className="border-t border-line py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-5 text-center sm:px-8">
        <a href="https://appcraft.in" target="_blank" rel="noreferrer noopener">
          <img
            src={logoUrl}
            alt="AppCraft Technology"
            width={120}
            height={45}
            loading="lazy"
            className="h-10 w-auto opacity-70 transition-opacity hover:opacity-100"
          />
        </a>
        <p className="max-w-2xl text-sm text-ink-dim">
          AppCraft Studio operates as the product engineering division of{" "}
          <a
            href="https://appcraft.in"
            target="_blank"
            rel="noreferrer noopener"
            className="text-accent-blue hover:underline"
          >
            AppCraft Technology
          </a>
          , a digital solutions company based in New Delhi since 2013.
        </p>
      </div>

      <div className="mx-auto mt-8 max-w-7xl px-5 sm:px-8">
        <div className="h-px w-full bg-line" />
      </div>

      <div className="mx-auto mt-6 flex max-w-7xl flex-col items-center gap-5 px-5 text-center text-sm text-ink-dim sm:px-8 lg:flex-row lg:justify-between lg:gap-8 lg:text-left">
        <nav
          aria-label="Footer"
          className="order-1 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 lg:order-2"
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={(e) => scrollToHash(e, l.href)}
              className="inline-flex min-h-11 items-center rounded-full px-3 outline-none transition-colors hover:text-ink focus-visible:ring-2 focus-visible:ring-accent-blue-bright focus-visible:ring-offset-2 focus-visible:ring-offset-background active:bg-foreground/10"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <p className="order-2 max-w-md text-balance lg:order-1 lg:max-w-none">
          © 2026 AppCraft Studio. A product engineering division of AppCraft Technology.
        </p>
        <a
          href="https://www.linkedin.com/in/dipakmishra/"
          target="_blank"
          rel="noreferrer noopener"
          aria-label="AppCraft Studio on LinkedIn"
          className="order-3 inline-flex size-11 items-center justify-center rounded-full border border-line outline-none transition-colors hover:text-ink focus-visible:ring-2 focus-visible:ring-accent-blue-bright focus-visible:ring-offset-2 focus-visible:ring-offset-background active:bg-foreground/10"
        >
          <Linkedin className="size-5" />
        </a>
      </div>
    </footer>
  );
}
