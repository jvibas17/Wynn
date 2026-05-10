import { useLanguage } from '../contexts/LanguageContext';

const LANGS = [
  { code: 'en',    label: 'EN' },
  { code: 'zh',    label: '简体' },
  { code: 'zh-tw', label: '繁體' },
  { code: 'ja',    label: '日本語' },
] as const;

export function LanguageSwitch() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-0">
      {LANGS.map(({ code, label }, i) => (
        <span key={code} className="flex items-center">
          {i > 0 && (
            <span className="text-white/12 mx-1.5 text-[0.55rem] select-none" aria-hidden="true">·</span>
          )}
          <button
            onClick={() => setLanguage(code)}
            className={`text-[0.6rem] tracking-[0.12em] uppercase transition-all duration-200 touch-manipulation py-1 ${
              language === code
                ? 'text-royal-400 font-semibold'
                : 'text-white/28 hover:text-white/60 font-medium'
            }`}
          >
            {label}
          </button>
        </span>
      ))}
    </div>
  );
}
