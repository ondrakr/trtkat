import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { GA4_MEASUREMENT_ID } from '../config/analytics';
import { getAnalyticsConsent } from '../lib/cookies';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function loadGtag(id: string) {
  if (document.getElementById('ga4-script')) return;

  const script = document.createElement('script');
  script.id = 'ga4-script';
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer ?? [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer?.push(args);
  };
  window.gtag('js', new Date());
  window.gtag('config', id, { send_page_view: false, anonymize_ip: true });
}

export function Analytics() {
  const location = useLocation();

  useEffect(() => {
    if (!GA4_MEASUREMENT_ID) return;

    function maybeLoad() {
      if (getAnalyticsConsent()) {
        loadGtag(GA4_MEASUREMENT_ID!);
      }
    }

    maybeLoad();
    window.addEventListener('trtkat:consent', maybeLoad);
    return () => window.removeEventListener('trtkat:consent', maybeLoad);
  }, []);

  useEffect(() => {
    if (!GA4_MEASUREMENT_ID || !window.gtag || !getAnalyticsConsent()) return;
    window.gtag('event', 'page_view', {
      page_path: location.pathname + location.search + location.hash,
      page_title: document.title,
    });
  }, [location]);

  return null;
}
