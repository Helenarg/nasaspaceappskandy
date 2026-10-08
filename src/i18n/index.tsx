import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Platform } from 'react-native';
import { DICTIONARIES, LANGUAGES, type Lang, type StringKey } from './strings';

const STORAGE_KEY = 'nasaspaceapps.lang';

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: StringKey) => string;
};

const I18nContext = createContext<Ctx>({
  lang: 'en',
  setLang: () => {},
  t: (key) => DICTIONARIES.en[key] ?? key,
});

function isLang(value: string | null | undefined): value is Lang {
  return !!value && LANGUAGES.some((l) => l.code === value);
}

/** Stored choice first, then the browser's language, then English. */
function detectLang(): Lang {
  if (Platform.OS !== 'web' || typeof window === 'undefined') return 'en';
  try {
    const stored = window.localStorage?.getItem(STORAGE_KEY);
    if (isLang(stored)) return stored;
  } catch {
    // Private mode or blocked storage: fall through to the browser language.
  }
  const nav = window.navigator?.language?.slice(0, 2);
  return isLang(nav) ? nav : 'en';
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  // Static rendering has no window; hydrate to the detected language after mount so
  // the pre-rendered HTML and the first client render agree.
  const [lang, setLangState] = useState<Lang>('en');

  useEffect(() => {
    const detected = detectLang();
    if (detected !== 'en') setLangState(detected);
  }, []);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      try {
        window.localStorage?.setItem(STORAGE_KEY, next);
        document.documentElement.lang = next;
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
    [lang, setLang]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  return useContext(I18nContext);
}

export { LANGUAGES };
export type { Lang, StringKey };
