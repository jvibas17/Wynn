import { Link, useLocation } from 'react-router-dom';
import { rememberLanguage, useLanguage } from '../contexts/LanguageContext';

const LANGS = [
  { code: 'en',    label: 'EN',     hreflang: 'en' },
  { code: 'zh',    label: '简体',   hreflang: 'zh-CN' },
  { code: 'zh-tw', label: '繁體',   hreflang: 'zh-TW' },
  { code: 'ja',    label: '日本語', hreflang: 'ja' },
] as const;

export function LanguageSwitch() {
  const { language, switchPath } = useLanguage();
  const { hash } = useLocation();

  return (
    <div className="flex items-center gap-0">
      {LANGS.map(({ code, label, hreflang }, i) => (
        <span key={code} className="flex items-center">
          {i > 0 && (
            <span className="text-white/12 mx-1.5 text-[0.55rem] select-none" aria-hidden="true">·</span>
          )}
          <Link
            to={switchPath(code) + hash}
            hrefLang={hreflang}
            onClick={() => rememberLanguage(code)}
            aria-current={language === code ? 'true' : undefined}
            className={`text-[0.6rem] tracking-[0.12em] uppercase transition-all duration-200 touch-manipulation py-1 ${
              language === code
                ? 'text-royal-400 font-semibold'
                : 'text-white/28 hover:text-white/60 font-medium'
            }`}
          >
            {label}
          </Link>
        </span>
      ))}
    </div>
  );
}
