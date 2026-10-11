import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { AppRoutes } from './AppRoutes';

export { buildHead, buildSitemap, NOT_FOUND_HEAD } from './seo/head';
export { LANGUAGES, PAGE_PATHS, localizePath } from './i18n/routes';

export function render(url: string) {
  return renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <AppRoutes />
      </StaticRouter>
    </StrictMode>
  );
}
