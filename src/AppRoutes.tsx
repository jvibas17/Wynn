import { Routes, Route } from 'react-router-dom';
import App from './App.tsx';
import { WynnRewardsGuide } from './pages/WynnRewardsGuide.tsx';
import { GetCompsAtWynn } from './pages/GetCompsAtWynn.tsx';
import { MultilingualVIPHost } from './pages/MultilingualVIPHost.tsx';

// Shared by the browser entry (main.tsx) and the build-time prerenderer (entry-server.tsx).
export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/wynn-rewards-guide" element={<WynnRewardsGuide />} />
      <Route path="/how-to-get-comps-at-wynn-las-vegas" element={<GetCompsAtWynn />} />
      <Route path="/multilingual-vip-host-las-vegas" element={<MultilingualVIPHost />} />
    </Routes>
  );
}
