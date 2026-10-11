import React, { createContext, useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { translations } from '../i18n/translations';
import { LANGUAGES, localizePath, splitPath } from '../i18n/routes';

export type Language = 'en' | 'zh' | 'ja' | 'zh-tw';

const HTML_LANG: Record<Language, string> = { en: 'en', zh: 'zh-CN', 'zh-tw': 'zh-TW', ja: 'ja' };
const STORAGE_KEY = 'wynn-language';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => any;
  /** Path to a page in the current language, e.g. path('/wynn-rewards-guide') → '/zh/wynn-rewards-guide' */
  path: (pagePath: string) => string;
  /** Path to the current page in another language */
  switchPath: (lang: Language) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function rememberLanguage(lang: Language) {
  try {
    localStorage.setItem(STORAGE_KEY, lang);
  } catch {
    // storage unavailable (private mode) — the URL still carries the language
  }
}

export function LanguageProvider({ language, children }: { language: Language; children: React.ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    document.documentElement.lang = HTML_LANG[language];
  }, [language]);

  // Visitors who picked a language before land on English URLs from search/bookmarks;
  // send them to their language's version of the same page.
  useEffect(() => {
    if (language !== 'en') return;
    let saved: string | null = null;
    try {
      saved = localStorage.getItem(STORAGE_KEY);
    } catch {
      return;
    }
    if (saved && saved !== 'en' && (LANGUAGES as string[]).includes(saved)) {
      navigate(localizePath(splitPath(location.pathname).path, saved as Language) + location.hash, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const t = (key: string) => {
    const keys = key.split('.');
    let value: any = translations[language];

    for (const k of keys) {
      if (value === undefined) return key;
      value = value[k];
    }

    return value || key;
  };

  const path = (pagePath: string) => localizePath(pagePath, language);
  const switchPath = (lang: Language) => localizePath(splitPath(location.pathname).path, lang);

  const setLanguage = (lang: Language) => {
    rememberLanguage(lang);
    navigate(switchPath(lang) + location.hash);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, path, switchPath }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
