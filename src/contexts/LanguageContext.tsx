import React, { createContext, useContext, useEffect, useState } from 'react';
import { translations } from '../i18n/translations';

export type Language = 'en' | 'zh' | 'ja' | 'zh-tw';

const HTML_LANG: Record<Language, string> = { en: 'en', zh: 'zh-CN', 'zh-tw': 'zh-TW', ja: 'ja' };

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => any;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('wynn-language');
    return (saved as Language) || 'en';
  });

  useEffect(() => {
    document.documentElement.lang = HTML_LANG[language];
  }, [language]);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('wynn-language', lang);
  };

  const t = (key: string) => {
    const keys = key.split('.');
    let value: any = translations[language];
    
    for (const k of keys) {
      if (value === undefined) return key;
      value = value[k];
    }
    
    return value || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
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