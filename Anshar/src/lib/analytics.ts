declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export type GAEvent =
  | "view_portfolio"
  | "begin_checkout"
  | "form_submit"
  | "add_payment_info"
  | "purchase"
  | "select_service";

/**
 * Fires a GA4 custom event. No-ops safely when gtag is absent (dev / no consent),
 * but always mirrors into dataLayer so the payload can be inspected in devtools.
 */
export function track(event: GAEvent, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;

  const payload = { event, ...params, timestamp: new Date().toISOString() };

  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push(payload);
  }

  if (typeof window.gtag === "function") {
    window.gtag("event", event, params);
  } else if (process.env.NODE_ENV !== "production") {
    // eslint-disable-next-line no-console
    console.info("[analytics]", event, params);
  }
}

/** Reads UTM params from the current URL so orders can be attributed. */
export function utmParams(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const sp = new URLSearchParams(window.location.search);
  const out: Record<string, string> = {};
  for (const key of ["utm_source", "utm_medium", "utm_campaign", "utm_content"]) {
    const v = sp.get(key);
    if (v) out[key] = v;
  }
  return out;
}
