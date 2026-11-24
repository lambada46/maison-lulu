export type FunnelEvent = 'quote_started' | 'formula_selected' | 'personalization_completed' | 'quote_estimate_viewed' | 'quote_request_sent';

type AnalyticsWindow = Window & {
  gtag?: (...args: unknown[]) => void;
};

export function trackFunnel(event: FunnelEvent, properties: Record<string, string | number> = {}) {
  if (typeof window === 'undefined') return;
  const w = window as AnalyticsWindow;
  // Never send names, emails, phone numbers, event notes, or exact addresses.
  w.gtag?.('event', event, properties);
}
