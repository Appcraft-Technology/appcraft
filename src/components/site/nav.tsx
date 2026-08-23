"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { scrollToHash } from "@/lib/scroll-to";
import { useActiveSection, useSectionQueryDeepLink } from "@/lib/use-active-section";

const iconSrc = "/assets/appcraft-icon-transparent.png";

const sectionIds = ["work", "process", "tech", "contact"];

const links = [
  { label: "Work", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "Tech", href: "#tech" },
  { label: "Contact", href: "#contact" },
];

export function Logo({ size = 36 }: { size?: number }) {
  return (
    <img
      alt=""
      aria-hidden
      width={size}
      height={size}
      decoding="async"
      style={{ width: size, height: size }}
      src={iconSrc}
      className="object-contain"
    />
  );
}

export function Wordmark() {
  return (
    <span className="flex flex-col font-display" style={{ gap: 0, paddingBottom: 2 }}>
      <span
        className="text-xl font-bold tracking-tight text-ink"
        style={{ lineHeight: 1.15 }}
      >
        AppCraft
      </span>
      <span
        className="text-sm font-medium text-accent-blue"
        style={{ lineHeight: 1.3, marginTop: -2 }}
      >
        Technology
      </span>
    </span>
  );
}

/** Logo lockup with a subtle draw-in reveal on mount. */
export function LogoLockup({ size = 42 }: { size?: number }) {
  return (
    <motion.span
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } } }}
      className="flex min-w-0 items-center gap-2.5"
    >
      <motion.span
        className="shrink-0 overflow-hidden"
        variants={{
          hidden: { clipPath: "inset(0 100% 0 0)", opacity: 0, scale: 0.92 },
          visible: {
            clipPath: "inset(0 0% 0 0)",
            opacity: 1,
            scale: 1,
            transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
          },
        }}
      >
        <Logo size={size} />
      </motion.span>
      <motion.span
        className="min-w-0"
        variants={{
          hidden: { clipPath: "inset(0 100% 0 0)", opacity: 0, y: 4 },
          visible: {
            clipPath: "inset(0 0% 0 0)",
            opacity: 1,
            y: 0,
            transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
          },
        }}
      >
        <Wordmark />
      </motion.span>
    </motion.span>
  );
}

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const active = useActiveSection(sectionIds);
  useSectionQueryDeepLink(sectionIds);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-line bg-background/90 backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-4 sm:px-8 lg:flex lg:justify-between">
        <a
          href="#top"
          onClick={(e) => scrollToHash(e, "#top")}
          aria-label="AppCraft Technology, back to top"
          className="group -mx-2 -my-1 flex min-w-0 items-center rounded-full px-2 py-1 outline-none transition-all duration-300 hover:bg-foreground/5 focus-visible:ring-2 focus-visible:ring-accent-blue-bright focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <span className="transition-transform duration-300 ease-out group-hover:scale-[1.03] group-focus-visible:scale-[1.03] motion-reduce:transform-none">
            <LogoLockup />
          </span>
        </a>

        <div className="hidden items-center gap-6 lg:flex xl:gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={(e) => scrollToHash(e, l.href)}
              aria-current={active === l.href.slice(1) ? "true" : undefined}
              className={`relative rounded-full px-1 py-1 text-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-accent-blue-bright focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                active === l.href.slice(1) ? "text-ink" : "text-ink-muted hover:text-ink"
              }`}
            >
              {l.label}
              {active === l.href.slice(1) ? (
                <motion.span
                  layoutId="nav-active"
                  className="absolute inset-x-0 -bottom-1 h-0.5 rounded-full bg-accent-blue-bright"
                />
              ) : null}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href="#contact"
            onClick={(e) => {
              trackEvent("cta_click", { cta: "Start Your Project", location: "nav_desktop" });
              scrollToHash(e, "#contact");
            }}
            className="inline-flex items-center whitespace-nowrap rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground outline-none transition-all duration-200 hover:scale-[1.02] hover:shadow-[var(--shadow-glow)] focus-visible:ring-2 focus-visible:ring-accent-blue-bright focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.98]"
          >
            Start Your Project
          </a>
        </div>

        <div className="flex items-center gap-2 justify-self-end sm:gap-3 lg:hidden">
          <a
            href="#contact"
            onClick={(e) => {
              trackEvent("cta_click", { cta: "Start Your Project", location: "nav_mobile" });
              scrollToHash(e, "#contact");
            }}
            className="hidden items-center whitespace-nowrap rounded-full bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground outline-none transition-transform duration-200 focus-visible:ring-2 focus-visible:ring-accent-blue-bright focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.97] sm:inline-flex"
          >
            Start Your Project
          </a>
          <button
            ref={menuButtonRef}
            type="button"
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(true)}
            className="inline-flex size-11 items-center justify-center rounded-full border border-line text-ink outline-none transition-colors focus-visible:ring-2 focus-visible:ring-accent-blue-bright focus-visible:ring-offset-2 focus-visible:ring-offset-background active:bg-foreground/10"
          >
            <Menu className="size-5" />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/98 backdrop-blur-xl lg:hidden"
          >
            <div className="flex items-center justify-between px-5 py-4 sm:px-8">
              <div className="flex min-w-0 items-center gap-2.5">
                <Logo />
                <Wordmark />
              </div>
              <button
                ref={closeRef}
                type="button"
                aria-label="Close menu"
                onClick={() => {
                  setOpen(false);
                  menuButtonRef.current?.focus();
                }}
                className="inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-line text-ink outline-none transition-colors focus-visible:ring-2 focus-visible:ring-accent-blue-bright focus-visible:ring-offset-2 focus-visible:ring-offset-background active:bg-foreground/10"
              >
                <X className="size-5" />
              </button>
            </div>
            <motion.ul
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } } }}
              className="mt-8 flex flex-col gap-2 px-6 sm:mt-10 sm:px-8"
            >
              {links.map((l) => (
                <motion.li
                  key={l.href}
                  variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
                >
                  <a
                    href={l.href}
                    onClick={(e) => {
                      setOpen(false);
                      scrollToHash(e, l.href);
                    }}
                    aria-current={active === l.href.slice(1) ? "true" : undefined}
                    className={`-mx-3 inline-flex min-h-11 items-center rounded-2xl px-3 py-2 font-display text-3xl font-bold tracking-tight outline-none transition-colors focus-visible:ring-2 focus-visible:ring-accent-blue-bright focus-visible:ring-offset-2 focus-visible:ring-offset-background active:bg-foreground/10 sm:text-4xl ${
                      active === l.href.slice(1) ? "text-accent-blue-bright" : "text-ink"
                    }`}
                  >
                    {l.label}
                  </a>
                </motion.li>
              ))}
              <motion.li
                variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
              >
                <a
                  href="#contact"
                  onClick={(e) => {
                    trackEvent("cta_click", { cta: "Start Your Project", location: "mobile_menu" });
                    setOpen(false);
                    scrollToHash(e, "#contact");
                  }}
                  className="mt-6 inline-flex min-h-11 items-center rounded-full bg-primary px-6 py-3 text-base font-medium text-primary-foreground outline-none transition-transform focus-visible:ring-2 focus-visible:ring-accent-blue-bright focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.97]"
                >
                  Start Your Project
                </a>
              </motion.li>
            </motion.ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
