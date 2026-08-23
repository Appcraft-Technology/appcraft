"use client";

import { useEffect, useRef } from "react";

/**
 * AppCraft's Cal.com booking link: cal.com/appcraft-technology/30min
 * Update here if the username or event slug ever changes.
 */
const CAL_NAMESPACE = "30min";
const CAL_LINK = "appcraft-technology/30min";
const EMBED_SCRIPT_SRC = "https://app.cal.com/embed/embed.js";

type CalApi = {
  (...args: unknown[]): void;
  q?: unknown[][];
};

type CalGlobal = {
  (...args: unknown[]): void;
  ns: Record<string, CalApi>;
  q?: unknown[][];
  loaded?: boolean;
};

declare global {
  interface Window {
    Cal?: CalGlobal;
  }
}

/**
 * Ports Cal.com's official vanilla embed snippet (see https://cal.com/docs/embed)
 * into TypeScript. We use the framework-agnostic script instead of
 * `@calcom/embed-react` because that package's peer dependencies are pinned to
 * React 18 and conflict with this project's React 19 - this snippet is the same
 * embed logic Cal.com ships in their own generated code, just typed.
 */
function ensureCalGlobal(): CalGlobal {
  if (window.Cal) return window.Cal;

  const push = (api: CalApi, args: unknown[]) => {
    api.q = api.q ?? [];
    api.q.push(args);
  };

  const Cal = ((...args: unknown[]) => {
    const cal = window.Cal as CalGlobal;

    if (!cal.loaded) {
      cal.ns = {};
      cal.q = cal.q ?? [];
      const script = document.createElement("script");
      script.src = EMBED_SCRIPT_SRC;
      document.head.appendChild(script);
      cal.loaded = true;
    }

    if (args[0] === "init") {
      const namespace = args[1];
      if (typeof namespace === "string") {
        const api: CalApi = (...apiArgs: unknown[]) => push(api, apiArgs);
        cal.ns[namespace] = cal.ns[namespace] ?? api;
        push(cal.ns[namespace], args);
        push(cal, ["initNamespace", namespace]);
      } else {
        push(cal, args);
      }
      return;
    }

    push(cal, args);
  }) as CalGlobal;

  Cal.ns = {};
  window.Cal = Cal;
  return Cal;
}

/**
 * Maps AppCraft's existing design tokens (see src/app/globals.css) onto Cal.com's
 * documented CSS variable API (Cal("ui", { cssVarsPerTheme })). This is a light-only
 * site, so the "dark" theme entry mirrors the light one - Cal.com requires both keys.
 * Reference: https://cal.com/docs/developing/guides/embeds/customize-embed-css-variables
 */
const APPCRAFT_CAL_THEME = {
  "cal-brand": "oklch(0.615 0.175 250.3)", // --accent-blue (#0287E8)
  "cal-brand-emphasis": "oklch(0.671 0.16 244.5)", // --accent-blue-bright (#1C9DF0)
  "cal-brand-text": "oklch(0.99 0 0)",
  "cal-text": "oklch(0.21 0.03 264)", // --ink
  "cal-text-emphasis": "oklch(0.21 0.03 264)", // --ink
  "cal-text-subtle": "oklch(0.48 0.035 258)", // --ink-muted
  "cal-text-muted": "oklch(0.58 0.03 258)", // --ink-dim
  "cal-bg": "oklch(0.995 0.002 250)", // --background
  "cal-bg-emphasis": "oklch(0.955 0.008 255)", // --surface-2
  "cal-bg-subtle": "oklch(0.972 0.005 255)", // --surface
  "cal-border": "oklch(0.21 0.03 264 / 12%)", // --line
  "cal-border-emphasis": "oklch(0.21 0.03 264 / 22%)", // --line-strong
  "cal-border-subtle": "oklch(0.21 0.03 264 / 12%)", // --line
  "cal-border-booker": "oklch(0.21 0.03 264 / 12%)", // --line
  "cal-border-booker-width": "1px",
  radius: "0.75rem", // --radius
} as const;

export function BookCall() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const Cal = ensureCalGlobal();

    Cal("init", CAL_NAMESPACE, { origin: "https://cal.com" });
    Cal.ns[CAL_NAMESPACE]?.("inline", {
      elementOrSelector: container,
      config: { layout: "month_view" },
      calLink: CAL_LINK,
    });
    Cal.ns[CAL_NAMESPACE]?.("ui", {
      theme: "light",
      hideEventTypeDetails: false,
      layout: "month_view",
      cssVarsPerTheme: {
        light: APPCRAFT_CAL_THEME,
        dark: APPCRAFT_CAL_THEME,
      },
    });
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ width: "100%", height: 700, maxHeight: "80vh", overflowY: "auto" }}
      className="rounded-2xl"
      aria-label="Book a call scheduling widget"
    />
  );
}
