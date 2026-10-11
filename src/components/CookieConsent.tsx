"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, m, useReducedMotion } from "motion/react";
import { XIcon as X } from "@phosphor-icons/react/dist/csr/X";
import { useI18n } from "@/i18n";
import {
  COOKIE_CONSENT_KEY,
  COOKIE_PREFERENCES_EVENT,
  readConsent,
  type ConsentChoice,
} from "@/lib/cookie-consent";

export function CookieConsent() {
  const { t } = useI18n();
  const [visible, setVisible] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    // Browser storage is intentionally read after hydration.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setVisible(readConsent() === null);

    const reopen = () => setVisible(true);
    const sync = (event: StorageEvent) => {
      if (event.key === COOKIE_CONSENT_KEY) setVisible(readConsent() === null);
    };

    window.addEventListener(COOKIE_PREFERENCES_EVENT, reopen);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(COOKIE_PREFERENCES_EVENT, reopen);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const save = (choice: ConsentChoice) => {
    try {
      window.localStorage.setItem(COOKIE_CONSENT_KEY, choice);
    } catch {
      // The preference still applies for the current page when storage is blocked.
    }
    setVisible(false);
  };

  return (
    <AnimatePresence initial={false}>
      {visible && (
        <m.aside
          className="cookie-consent"
          role="dialog"
          aria-modal="false"
          aria-labelledby="cookie-consent-title"
          aria-describedby="cookie-consent-description"
          initial={{ opacity: 0, y: reduced ? 0 : 18, scale: reduced ? 1 : 0.985 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: reduced ? 0 : 12, scale: reduced ? 1 : 0.99 }}
          transition={{ duration: reduced ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] }}
        >
          <button
            type="button"
            className="cookie-consent-close"
            aria-label={t("cookie.close")}
            onClick={() => save("essential")}
          >
            <X size={18} aria-hidden="true" />
          </button>
          <div className="cookie-consent-copy">
            <p className="technical-label">{t("cookie.label")}</p>
            <h2 id="cookie-consent-title">{t("cookie.title")}</h2>
            <p id="cookie-consent-description">{t("cookie.description")}</p>
            <Link href="/privacy">{t("cookie.learnMore")}</Link>
          </div>
          <div className="cookie-consent-actions">
            <button type="button" className="outline-button" onClick={() => save("essential")}>
              {t("cookie.essential")}
            </button>
            <button type="button" className="white-button" onClick={() => save("all")}>
              {t("cookie.accept")}
            </button>
          </div>
        </m.aside>
      )}
    </AnimatePresence>
  );
}

export function CookiePreferencesButton() {
  const { t } = useI18n();
  return (
    <button
      type="button"
      className="footer-cookie-button"
      onClick={() => window.dispatchEvent(new Event(COOKIE_PREFERENCES_EVENT))}
    >
      {t("footer.cookies")}
    </button>
  );
}
