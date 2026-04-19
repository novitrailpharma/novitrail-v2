export type AnalyticsEventProperties = Record<string, string | number | boolean | null | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (command: string, action: string, params?: Record<string, unknown>) => void;
    clarity?: (...args: unknown[]) => void;
  }
}

function sanitizeProperties(properties: AnalyticsEventProperties = {}) {
  return Object.fromEntries(
    Object.entries(properties).filter(([, value]) => value !== undefined)
  );
}

export function trackPageView(pathname: string, pageTitle: string) {
  if (typeof window === "undefined" || !window.gtag) {
    return;
  }

  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  if (!measurementId) {
    return;
  }

  window.gtag("config", measurementId, {
    page_path: pathname,
    page_title: pageTitle,
  });
}

export function trackAnalyticsEvent(
  eventName: string,
  properties: AnalyticsEventProperties = {}
) {
  if (typeof window === "undefined") {
    return;
  }

  const payload = sanitizeProperties(properties);

  if (window.gtag) {
    window.gtag("event", eventName, payload);
  }

  if (window.clarity) {
    window.clarity("event", eventName);
  }
}
