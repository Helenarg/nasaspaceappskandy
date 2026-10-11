export const COOKIE_CONSENT_KEY = "nasaspaceapps.cookie-consent";
export const COOKIE_PREFERENCES_EVENT = "nasaspaceapps:cookie-preferences";

export type ConsentChoice = "all" | "essential";

export function readConsent(): ConsentChoice | null {
  if (typeof window === "undefined") return null;
  try {
    const value = window.localStorage.getItem(COOKIE_CONSENT_KEY);
    return value === "all" || value === "essential" ? value : null;
  } catch {
    return null;
  }
}

export function hasFunctionalConsent() {
  return readConsent() === "all";
}
