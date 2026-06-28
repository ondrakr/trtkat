export type CookiePreferences = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
};

export type StoredConsent = CookiePreferences & {
  visitorId: string;
  decidedAt: string;
};

const STORAGE_KEY = 'trtkat_cookie_consent';
const VISITOR_KEY = 'trtkat_visitor_id';

function generateId() {
  return crypto.randomUUID();
}

export function getVisitorId(): string {
  try {
    let id = localStorage.getItem(VISITOR_KEY);
    if (!id) {
      id = generateId();
      localStorage.setItem(VISITOR_KEY, id);
    }
    return id;
  } catch {
    return generateId();
  }
}

export function getStoredConsent(): StoredConsent | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as StoredConsent;
  } catch {
    return null;
  }
}

export function hasConsentDecision(): boolean {
  return getStoredConsent() !== null;
}

export function getAnalyticsConsent(): boolean {
  return getStoredConsent()?.analytics === true;
}

export function saveConsentLocal(prefs: CookiePreferences): StoredConsent {
  const stored: StoredConsent = {
    ...prefs,
    necessary: true,
    visitorId: getVisitorId(),
    decidedAt: new Date().toISOString(),
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
  window.dispatchEvent(new CustomEvent('trtkat:consent', { detail: stored }));
  return stored;
}

export async function persistConsent(prefs: CookiePreferences): Promise<void> {
  const stored = saveConsentLocal(prefs);
  try {
    await fetch('/api/cookie-consent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        visitorId: stored.visitorId,
        analytics: stored.analytics,
        marketing: stored.marketing,
        necessary: true,
      }),
    });
  } catch {
    // Local consent still applies; sync can retry later
  }
}

export function openCookieSettings() {
  window.dispatchEvent(new CustomEvent('trtkat:open-cookie-settings'));
}
