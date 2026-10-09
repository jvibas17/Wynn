import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import { AppRoutes } from './AppRoutes';
import './index.css';

// Each route ships prerendered HTML (see scripts/prerender.mjs) so crawlers see real
// content. In the browser we still mount with createRoot (not hydrate) so the saved
// language preference and client-only behaviour work exactly as before.
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </LanguageProvider>
  </StrictMode>
);
