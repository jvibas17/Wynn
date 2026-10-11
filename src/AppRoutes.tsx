import { Route, Routes } from 'react-router-dom';
import App from './App';
import { LanguageProvider } from './contexts/LanguageContext';
import { LANGUAGES, localizePath, type PagePath } from './i18n/routes';
import { WynnRewardsGuide } from './pages/WynnRewardsGuide';
import { GetCompsAtWynn } from './pages/GetCompsAtWynn';
import { MultilingualVIPHost } from './pages/MultilingualVIPHost';
import { NotFound } from './pages/NotFound';

const PAGES: Record<PagePath, () => JSX.Element> = {
  '/': App,
  '/wynn-rewards-guide': WynnRewardsGuide,
  '/how-to-get-comps-at-wynn-las-vegas': GetCompsAtWynn,
  '/multilingual-vip-host-las-vegas': MultilingualVIPHost,
};

export function AppRoutes() {
  return (
    <Routes>
      {LANGUAGES.flatMap(language =>
        Object.entries(PAGES).map(([pagePath, Page]) => {
          const path = localizePath(pagePath, language);
          return (
            <Route
              key={path}
              path={path}
              element={<LanguageProvider language={language}><Page /></LanguageProvider>}
            />
          );
        })
      )}
      <Route path="*" element={<LanguageProvider language="en"><NotFound /></LanguageProvider>} />
    </Routes>
  );
}
