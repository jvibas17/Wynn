import { useLanguage } from '../contexts/LanguageContext';

export function LanguageSwitch() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-0.5 sm:gap-1 md:gap-2">
      <button
        onClick={() => setLanguage('en')}
        className={`px-1.5 sm:px-2 md:px-3 py-1 sm:py-1.5 md:py-2 rounded-full text-xs sm:text-sm font-medium transition-colors touch-manipulation min-w-[2rem] sm:min-w-[2.5rem] md:min-w-[3rem] ${
          language === 'en'
            ? 'bg-royal-500 text-white'
            : 'text-cream-100 hover:text-royal-500 hover:bg-royal-500/10'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => setLanguage('zh')}
        className={`px-1.5 sm:px-2 md:px-3 py-1 sm:py-1.5 md:py-2 rounded-full text-xs sm:text-sm font-medium transition-colors touch-manipulation min-w-[2rem] sm:min-w-[2.5rem] md:min-w-[3rem] ${
          language === 'zh'
            ? 'bg-royal-500 text-white'
            : 'text-cream-100 hover:text-royal-500 hover:bg-royal-500/10'
        }`}
      >
        简体
      </button>
      <button
        onClick={() => setLanguage('zh-tw')}
        className={`px-1.5 sm:px-2 md:px-3 py-1 sm:py-1.5 md:py-2 rounded-full text-xs sm:text-sm font-medium transition-colors touch-manipulation min-w-[2rem] sm:min-w-[2.5rem] md:min-w-[3rem] ${
          language === 'zh-tw'
            ? 'bg-royal-500 text-white'
            : 'text-cream-100 hover:text-royal-500 hover:bg-royal-500/10'
        }`}
      >
        繁體
      </button>
      <button
        onClick={() => setLanguage('ja')}
        className={`px-1.5 sm:px-2 md:px-3 py-1 sm:py-1.5 md:py-2 rounded-full text-xs sm:text-sm font-medium transition-colors touch-manipulation min-w-[2rem] sm:min-w-[2.5rem] md:min-w-[3rem] ${
          language === 'ja'
            ? 'bg-royal-500 text-white'
            : 'text-cream-100 hover:text-royal-500 hover:bg-royal-500/10'
        }`}
      >
        日本語
      </button>
    </div>
  );
}