import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { getLocales } from 'expo-localization';
import { router } from 'expo-router';
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
    const explicit = new URL(window.location.href).searchParams.get('lang');
    if (isLang(explicit)) return explicit;
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
  const preferenceRevision = useRef(0);

  useEffect(() => {
    // Resolve the browser preference after the first hydrated paint.
    if (Platform.OS !== 'web') {
      let active = true;
      const revision = preferenceRevision.current;
      SecureStore.getItemAsync(STORAGE_KEY).then(stored => {
        const detected = getLocales()[0]?.languageCode;
        if (active && revision === preferenceRevision.current) setLangState(isLang(stored) ? stored : isLang(detected) ? detected : 'en');
      }).catch(() => {
        const detected = getLocales()[0]?.languageCode;
        if (active && revision === preferenceRevision.current) setLangState(isLang(detected) ? detected : 'en');
      });
      return () => { active = false; };
    }
    const frame = window.requestAnimationFrame(() => {
      if (preferenceRevision.current === 0) setLangState(detectLang());
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const setLang = useCallback((next: Lang) => {
    preferenceRevision.current++;
    setLangState(next);
    if (Platform.OS !== 'web') {
      void SecureStore.setItemAsync(STORAGE_KEY, next).catch(() => {});
    }
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      router.setParams({ lang: next });
      try {
        window.localStorage?.setItem(STORAGE_KEY, next);
        document.documentElement.lang = next;
      } catch {
        // Storage unavailable: the choice still applies for this session.
      }
    }
  }, []);

  useEffect(() => {
    if (Platform.OS === 'web') document.documentElement.lang = lang;
  }, [lang]);

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
