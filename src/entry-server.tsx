import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import { AppRoutes } from './AppRoutes';
import { PAGES, renderHead } from './seo/pages';

// Build-time only: used by scripts/prerender.mjs to write static HTML per route.
export { PAGES };

export function render(path: string) {
  const page = PAGES.find((p) => p.path === path);
  if (!page) throw new Error(`No SEO entry for ${path}`);
  const html = renderToString(
    <StrictMode>
      <LanguageProvider>
        <StaticRouter location={path}>
          <AppRoutes />
        </StaticRouter>
      </LanguageProvider>
    </StrictMode>
  );
  return { html, head: renderHead(page) };
}
