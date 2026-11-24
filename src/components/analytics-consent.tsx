'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const key = 'maison-lulu-analytics-consent-v1';
const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '';

type AnalyticsWindow = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
};

function startAnalytics() {
  if (!measurementId || typeof document === 'undefined') return;
  if (document.querySelector('[data-maison-ga]')) return;
  const w = window as AnalyticsWindow;
  w.dataLayer = w.dataLayer || [];
  w.gtag = (...args: unknown[]) => { w.dataLayer?.push(args); };
  w.gtag('js', new Date());
  w.gtag('config', measurementId, { anonymize_ip: true });
  const script = document.createElement('script');
  script.async = true;
  script.dataset.maisonGa = 'true';
  script.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(measurementId);
  document.head.appendChild(script);
}

export function AnalyticsConsent() {
  const [choice, setChoice] = useState<'yes' | 'no' | null>('no');

  useEffect(() => {
    if (!measurementId) return;
    let value: string | null = null;
    try { value = window.localStorage.getItem(key); } catch { /* disabled storage */ }
    const next = value === 'yes' || value === 'no' ? value : null;
    setChoice(next);
    if (next === 'yes') startAnalytics();
  }, []);

  if (!measurementId || choice !== null) return null;

  const decide = (value: 'yes' | 'no') => {
    try { window.localStorage.setItem(key, value); } catch { /* disabled storage */ }
    setChoice(value);
    if (value === 'yes') startAnalytics();
  };

  return <aside className="cookie-banner" aria-label="Choix de mesure d'audience">
    <p><strong>Mesure d’audience</strong> — Avec votre accord, nous utilisons Google Analytics pour comprendre les visites et améliorer le site. <Link href="/politique-de-confidentialite">En savoir plus</Link>.</p>
    <div><button type="button" className="cookie-reject" onClick={() => decide('no')}>Refuser</button><button type="button" className="button" onClick={() => decide('yes')}>Accepter</button></div>
  </aside>;
}
