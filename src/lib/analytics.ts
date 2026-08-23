/**
 * Lightweight analytics helper.
 *
 * Sends events to Google Analytics (gtag) when a measurement ID is configured,
 * loads Microsoft Clarity when a project ID is configured, and always mirrors
 * events into window.dataLayer so any tag manager can pick them up. No-ops
 * safely during SSR or when no provider is configured.
 */

type EventParams = Record<string, string | number | boolean | undefined>;

/** Clarity's tag replays calls queued on `.q` once the real script loads. */
type ClarityFn = ((...args: unknown[]) => void) & { q?: unknown[] };

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    clarity?: ClarityFn;
  }
}

// Default measurement ID for AppCraft Studio. NEXT_PUBLIC_GA_MEASUREMENT_ID
// overrides this at build time; set it to "" to disable.
const DEFAULT_GA_MEASUREMENT_ID = "G-2B0PJHE46E";

// Default Microsoft Clarity project ID for AppCraft Studio.
// NEXT_PUBLIC_CLARITY_PROJECT_ID overrides this at build time; set it to "" to disable.
const DEFAULT_CLARITY_PROJECT_ID = "y6jhiz9xg4";

const envMeasurementId = process.env["NEXT_PUBLIC_GA_MEASUREMENT_ID"];
const measurementId = envMeasurementId ?? DEFAULT_GA_MEASUREMENT_ID;

const envClarityProjectId = process.env["NEXT_PUBLIC_CLARITY_PROJECT_ID"];
const clarityProjectId = envClarityProjectId ?? DEFAULT_CLARITY_PROJECT_ID;

let initialized = false;

function initGoogleAnalytics() {
  if (!measurementId) return;

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);

  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer?.push(args);
  };
  window.gtag("js", new Date());
  window.gtag("config", measurementId);
}

function initClarity() {
  if (!clarityProjectId || window.clarity) return;

  // Stub that queues calls until the real tag loads and drains `.q`.
  const stub = function clarity(...args: unknown[]) {
    (stub.q = stub.q ?? []).push(args);
  } as ClarityFn;
  window.clarity = stub;

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.clarity.ms/tag/${clarityProjectId}`;
  document.head.appendChild(script);
}

export function initAnalytics() {
  if (typeof window === "undefined" || initialized) return;
  initialized = true;

  window.dataLayer = window.dataLayer ?? [];

  initGoogleAnalytics();
  initClarity();
}

export function trackEvent(name: string, params: EventParams = {}) {
  if (typeof window === "undefined") return;
  initAnalytics();

  const payload = { ...params };
  window.gtag?.("event", name, payload);
  window.dataLayer?.push({ event: name, ...payload });
  // Clarity takes only an event name; params show up via its own heatmaps.
  window.clarity?.("event", name);

  if (process.env.NODE_ENV === "development") {
    console.info("[analytics]", name, payload);
  }
}
