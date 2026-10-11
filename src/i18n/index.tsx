"use client";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { DICTIONARIES, LANGUAGES, type Lang, type StringKey } from "./strings";

const STORAGE_KEY = "nasaspaceapps.lang";

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: StringKey) => string;
};

const I18nContext = createContext<Ctx>({
  lang: "en",
  setLang: () => {},
  t: (key) => DICTIONARIES.en[key] ?? key,
});

function isLang(value: string | null | undefined): value is Lang {
  return !!value && LANGUAGES.some((l) => l.code === value);
}

/** Stored choice first, then the browser's language, then English. */
function detectLang(): Lang {
  if (typeof window === "undefined") return "en";
  try {
    const stored = window.localStorage?.getItem(STORAGE_KEY);
    if (isLang(stored)) return stored;
  } catch {
    // Private mode or blocked storage: fall through to the browser language.
  }
  const nav = window.navigator?.language?.slice(0, 2);
  return isLang(nav) ? nav : "en";
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  // Static rendering has no window; hydrate to the detected language after mount so
  // the pre-rendered HTML and the first client render agree.
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const detected = detectLang();
    document.documentElement.lang = detected;
    // Browser preference is only available after hydration.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (detected !== "en") setLangState(detected);

    const syncStoredLanguage = (event: StorageEvent) => {
      if (event.key !== STORAGE_KEY || !isLang(event.newValue)) return;
      setLangState(event.newValue);
      document.documentElement.lang = event.newValue;
    };
    window.addEventListener("storage", syncStoredLanguage);
    return () => window.removeEventListener("storage", syncStoredLanguage);
  }, []);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    if (typeof window !== "undefined") {
      document.documentElement.lang = next;
      try {
        window.localStorage?.setItem(STORAGE_KEY, next);
      } catch {
        // Storage unavailable: the choice still applies for this session.
      }
    }
  }, []);

  const value = useMemo<Ctx>(
    () => ({
      lang,
      setLang,
      // Missing translations fall back to English instead of rendering a key.
      t: (key) => DICTIONARIES[lang][key] ?? DICTIONARIES.en[key] ?? key,
    }),
    [lang, setLang],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  return useContext(I18nContext);
}

export { LANGUAGES };
export type { Lang, StringKey };
