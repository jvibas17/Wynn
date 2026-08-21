import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.tsx';
import { LanguageProvider } from './contexts/LanguageContext';
import { WynnRewardsGuide } from './pages/WynnRewardsGuide.tsx';
import { GetCompsAtWynn } from './pages/GetCompsAtWynn.tsx';
import { MultilingualVIPHost } from './pages/MultilingualVIPHost.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/wynn-rewards-guide" element={<WynnRewardsGuide />} />
          <Route path="/how-to-get-comps-at-wynn-las-vegas" element={<GetCompsAtWynn />} />
          <Route path="/multilingual-vip-host-las-vegas" element={<MultilingualVIPHost />} />
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  </StrictMode>
);