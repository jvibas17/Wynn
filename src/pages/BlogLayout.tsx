import { Fragment, useEffect } from 'react';
import { Crown } from 'lucide-react';
import { LanguageSwitch } from '../components/LanguageSwitch';
import { useLanguage, type Language } from '../contexts/LanguageContext';
import type { Article, ArticleBlock } from '../i18n/articles/types';

interface BlogLayoutProps {
  article: Record<Language, Article>;
}

export function BlogLayout({ article }: BlogLayoutProps) {
  const { language, t } = useLanguage();
  const content = article[language];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    document.title = content.docTitle;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', content.metaDescription);
  }, [content]);

  const scrollToContact = () => {
    window.location.href = '/#contact';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950 text-white">
      {/* Nav */}
      <nav className="fixed w-full z-50 bg-navy-950/95 backdrop-blur-md border-b border-royal-500/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">
            <a href="/" className="flex items-center gap-3 group flex-shrink-0">
              <span className="w-px h-7 bg-royal-500/60 group-hover:bg-royal-500 transition-colors" />
              <div className="flex flex-col leading-none">
                <span className="font-serif italic text-white text-xl leading-none tracking-wide group-hover:text-royal-300 transition-colors">Wynn</span>
                <span className="text-[0.45rem] tracking-[0.32em] uppercase text-cream-100/30 mt-1">{t('ui.logoCaption')}</span>
              </div>
            </a>
            <div className="flex items-center gap-4 sm:gap-6">
              <LanguageSwitch />
              <a
                href="/#contact"
                onClick={(e) => { e.preventDefault(); scrollToContact(); }}
                className="hidden sm:flex group items-center gap-2.5 border border-royal-500/35 hover:border-royal-500/70 px-4 py-2 transition-all duration-300 hover:bg-royal-500/5"
              >
                <span className="text-[0.65rem] tracking-[0.18em] uppercase text-royal-400/70 group-hover:text-royal-300">{t('ui.blog.contact')}</span>
                <span className="text-royal-400/50 group-hover:text-royal-300 text-xs">→</span>
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <div className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-royal-500/5 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl relative">
          <a href="/" className="inline-flex items-center gap-2 text-royal-400/60 hover:text-royal-400 text-xs tracking-[0.15em] uppercase mb-8 transition-colors">
            {t('ui.blog.back')}
          </a>
          <div className="flex items-center gap-3 mb-6">
            <Crown className="h-5 w-5 text-royal-500" />
            <span className="text-[0.6rem] tracking-[0.28em] uppercase text-royal-400/60">{t('ui.blog.badge')}</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">{content.title}</h1>
          <p className="text-cream-100/70 text-lg sm:text-xl leading-relaxed mb-8">{content.description}</p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs tracking-[0.15em] uppercase text-cream-200/40">
            <span>{t('ui.blog.published')}</span>
            <span className="text-royal-500/30">✦</span>
            <span>{content.readTime}</span>
            <span className="text-royal-500/30">✦</span>
            <span>{t('ui.blog.byline')}</span>
          </div>
        </div>
      </div>

      {/* Thin divider */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
        <div className="h-px bg-gradient-to-r from-transparent via-royal-500/30 to-transparent mb-12" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl pb-24">
        <div className="prose-wynn text-cream-100/75 text-base sm:text-lg leading-relaxed">
          {content.blocks.map((block, i) => (
            <Fragment key={i}>{renderBlock(block, t)}</Fragment>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="border-t border-royal-500/10 py-16 sm:py-24 bg-navy-950/80">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl text-center">
          <p className="text-[0.6rem] tracking-[0.28em] uppercase text-royal-400/50 mb-4">{t('ui.blog.ctaLabel')}</p>
          <h2 className="font-serif italic text-3xl sm:text-4xl text-white mb-6">{t('ui.blog.ctaTitle')}</h2>
          <p className="text-cream-100/60 mb-8 max-w-lg mx-auto">{t('ui.blog.ctaText')}</p>
          <a
            href="/#contact"
            className="inline-flex items-center gap-3 border border-royal-500/50 hover:border-royal-500 px-8 py-4 text-sm tracking-[0.15em] uppercase text-royal-400 hover:text-white transition-all duration-300 hover:bg-royal-500/10"
          >
            {t('ui.blog.ctaButton')}
          </a>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-navy-950 py-8 border-t border-royal-500/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-cream-200/30 tracking-wider">
          <span>{t('ui.blog.copyright')}</span>
          <a href="/" className="hover:text-royal-400 transition-colors uppercase tracking-[0.15em]">{t('ui.blog.backHome')}</a>
        </div>
      </footer>
    </div>
  );
}

function renderBlock(block: ArticleBlock, t: (key: string) => string) {
  switch (block[0]) {
    case 'p':
      return <p className="mb-4">{inline(block[1])}</p>;
    case 'h2':
      return (
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-14 mb-4 pb-3 border-b border-royal-500/15">
          {block[1]}
        </h2>
      );
    case 'h3':
      return <h3 className="font-serif text-xl sm:text-2xl font-semibold text-royal-300 mt-10 mb-3">{block[1]}</h3>;
    case 'h3gold':
      return (
        <h3 id={block[2]} className="font-serif text-xl sm:text-2xl font-semibold text-amber-300 mt-10 mb-3 flex items-center gap-3">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-400/70 flex-shrink-0" />
          {block[1]}
        </h3>
      );
    case 'ul':
      return (
        <ul>
          {block[1].map((item, i) => <li key={i}>{inline(item)}</li>)}
        </ul>
      );
    case 'tip':
      return (
        <div className="my-6 pl-4 border-l-2 border-royal-500/50 bg-royal-500/5 py-4 pr-4 rounded-r-lg">
          <p className="text-[0.6rem] tracking-[0.2em] uppercase text-royal-400/60 mb-2">{t('ui.blog.hostTip')}</p>
          <p className="text-cream-100/80 text-sm sm:text-base leading-relaxed">{inline(block[1])}</p>
        </div>
      );
    case 'note':
      return (
        <div className="my-6 pl-4 border-l-2 border-amber-400/50 bg-amber-500/5 py-4 pr-4 rounded-r-lg">
          <p className="text-[0.6rem] tracking-[0.2em] uppercase text-amber-400/60 mb-2">{t('ui.blog.hostNote')}</p>
          <p className="text-cream-100/80 text-sm sm:text-base leading-relaxed">{inline(block[1])}</p>
        </div>
      );
    case 'faq':
      return (
        <div className="mb-6 pb-6 border-b border-royal-500/10 last:border-b-0">
          <p className="font-serif font-semibold text-white text-base sm:text-lg mb-2">{block[1]}</p>
          <p className="text-cream-100/65 text-sm sm:text-base leading-relaxed">{inline(block[2])}</p>
        </div>
      );
  }
}

function inline(text: string) {
  return text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/).map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) return <strong key={i}>{part.slice(2, -2)}</strong>;
    if (part.startsWith('*') && part.endsWith('*') && part.length > 1) return <em key={i}>{part.slice(1, -1)}</em>;
    return part;
  });
}
