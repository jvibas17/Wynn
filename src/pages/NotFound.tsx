import { Crown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BRAND } from '../brand';

export function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950 text-white flex items-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-xl text-center">
        <Crown className="h-8 w-8 text-royal-500 mx-auto mb-6" />
        <p className="text-[0.6rem] tracking-[0.28em] uppercase text-royal-400/60 mb-4">404</p>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold mb-4">Page not found</h1>
        <p className="text-cream-100/70 mb-2">找不到此页面 · 找不到此頁面 · ページが見つかりません</p>
        <p className="text-cream-100/50 text-sm mb-10">The page you're looking for doesn't exist or has moved.</p>
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm tracking-[0.15em] uppercase">
          <Link to="/" className="text-royal-400 hover:text-white transition-colors">{BRAND.name} →</Link>
          <Link to="/zh" className="text-royal-400/70 hover:text-white transition-colors">简体</Link>
          <Link to="/zh-tw" className="text-royal-400/70 hover:text-white transition-colors">繁體</Link>
          <Link to="/ja" className="text-royal-400/70 hover:text-white transition-colors">日本語</Link>
        </div>
      </div>
    </div>
  );
}
