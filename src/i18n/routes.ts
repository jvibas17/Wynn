import type { Language } from '../contexts/LanguageContext';

export const LANGUAGES: Language[] = ['en', 'zh', 'zh-tw', 'ja'];

export const PAGE_PATHS = [
  '/',
  '/wynn-rewards-guide',
  '/how-to-get-comps-at-wynn-las-vegas',
  '/multilingual-vip-host-las-vegas',
  '/privacy-policy',
] as const;

export type PagePath = (typeof PAGE_PATHS)[number];

// English lives at the root; other languages get a prefix (/zh, /zh-tw, /ja).
export function localizePath(path: string, language: Language): string {
  const prefix = language === 'en' ? '' : `/${language}`;
  const localized = prefix + (path === '/' ? '' : path);
  return localized || '/';
}

export function splitPath(pathname: string): { language: Language; path: string } {
  const match = pathname.match(/^\/(zh-tw|zh|ja)(\/.*)?$/);
  if (!match) return { language: 'en', path: pathname || '/' };
  return { language: match[1] as Language, path: match[2] || '/' };
}
