import { Crown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AnimatedSection } from './AnimatedSection';
import { useLanguage } from '../contexts/LanguageContext';

export function SEOOptimizedContent() {
  const { t } = useLanguage();

  const services = [
    { key: 'casinoHost', numeral: 'I' },
    { key: 'entertainment', numeral: 'II' },
    { key: 'dining', numeral: 'III' },
    { key: 'accommodations', numeral: 'IV' },
  ];

  return (
    <section className="py-16 sm:py-20 md:py-28 bg-navy-950/98 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-royal-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-royal-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative">

        {/* Header block — left-aligned editorial, not centered */}
        <AnimatedSection>
          <div className="max-w-3xl mb-16 sm:mb-20 lg:mb-28">
            <div className="flex items-center gap-4 mb-6">
              <Crown className="h-6 w-6 text-royal-500 flex-shrink-0" />
              <div className="luxury-label">{t('seo.badge')}</div>
            </div>
            <h2 className="heading-display text-white mb-6">
              {t('seo.title')}
            </h2>
            <div className="ornament-divider w-48 mb-6"><span /></div>
            <p className="serif-italic text-cream-100/70 text-lg sm:text-xl md:text-2xl leading-relaxed">
              {t('seo.subtitle')}
            </p>
          </div>
        </AnimatedSection>

        {/* Services — staggered editorial rows, not a symmetric card grid */}
        <div className="relative">
          {services.map(({ key, numeral }, i) => (
            <AnimatedSection key={key}>
              <div
                className={`
                  service-editorial-row group
                  ${i % 2 === 0 ? 'lg:ml-0 lg:mr-24' : 'lg:ml-24 lg:mr-0'}
                `}
              >
                {/* Roman numeral — oversized background flourish */}
                <div className="service-numeral" aria-hidden="true">{numeral}</div>

                {/* Content */}
                <div className="service-row-content">
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-serif font-bold text-white mb-3 group-hover:text-royal-400 transition-colors duration-300">
                    {t(`seo.services.${key}.title`)}
                  </h3>
                  <p className="text-cream-100/70 text-base sm:text-lg leading-relaxed max-w-xl">
                    {t(`seo.services.${key}.description`)}
                  </p>
                </div>

                {/* Thin accent rule on hover */}
                <div className="absolute left-0 bottom-0 h-px w-0 bg-gradient-to-r from-royal-500/60 to-transparent group-hover:w-full transition-all duration-500" />
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Why Choose — full-width editorial text block */}
        <AnimatedSection>
          <div className="mt-20 lg:mt-28 border-t border-royal-500/15 pt-16 lg:pt-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-start">
              <div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-serif font-bold text-white mb-0 leading-tight">
                  {t('seo.whyChoose.title')}
                </h2>
              </div>
              <div className="space-y-5 text-cream-100/70 text-base sm:text-lg leading-relaxed">
                <p>{t('seo.whyChoose.content.paragraph1')}</p>
                <p>{t('seo.whyChoose.content.paragraph2')}</p>
                <p>{t('seo.whyChoose.content.paragraph3')}</p>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Internal links to content pages — SEO crawlability + user navigation */}
        <AnimatedSection>
          <div className="mt-16 lg:mt-20 border-t border-royal-500/10 pt-12 lg:pt-16">
            <div className="luxury-label mb-8">Further Reading</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6">
              {[
                {
                  to: '/wynn-rewards-guide',
                  title: 'Wynn Rewards Tiers Explained',
                  desc: 'Red, Platinum, Black & Chairman\'s Club — what each tier means and how to maximize your benefits.',
                  accent: 'hover:border-royal-500/40 hover:bg-royal-500/5',
                },
                {
                  to: '/how-to-get-comps-at-wynn-las-vegas',
                  title: 'How to Get Comps at Wynn',
                  desc: 'The insider guide to casino comps — from a real Wynn VIP host.',
                  accent: 'hover:border-royal-500/40 hover:bg-royal-500/5',
                },
                {
                  to: '/multilingual-vip-host-las-vegas',
                  title: 'Multilingual VIP Hosting',
                  desc: 'English, Mandarin, Taiwanese & Japanese VIP host services at Wynn.',
                  accent: 'hover:border-royal-500/40 hover:bg-royal-500/5',
                },
                {
                  to: '/wynn-rewards-guide#chairmans-club',
                  title: "Chairman's Club",
                  desc: 'Invite-only ultra-exclusive tier. Private gaming salons, executive host & bespoke luxury at the highest level.',
                  accent: 'hover:border-amber-400/50 hover:bg-amber-500/5',
                  gold: true,
                },
              ].map(({ to, title, desc, accent, gold }) => (
                <Link
                  key={to}
                  to={to}
                  className={`group block border p-5 lg:p-6 transition-all duration-300 ${gold ? 'border-amber-400/20' : 'border-royal-500/15'} ${accent}`}
                >
                  {gold && (
                    <div className="flex items-center gap-2 mb-3">
                      <span className="inline-block w-1 h-1 rounded-full bg-amber-400/70" />
                      <span className="text-[0.55rem] tracking-[0.25em] uppercase text-amber-400/50 font-medium">Invite Only</span>
                    </div>
                  )}
                  <h3 className={`font-serif font-semibold text-white text-base lg:text-lg mb-2 leading-snug transition-colors ${gold ? 'group-hover:text-amber-300' : 'group-hover:text-royal-300'}`}>
                    {title}
                  </h3>
                  <p className="text-cream-100/50 text-sm leading-relaxed mb-4">{desc}</p>
                  <span className={`text-[0.6rem] tracking-[0.18em] uppercase transition-colors ${gold ? 'text-amber-400/40 group-hover:text-amber-400' : 'text-royal-400/50 group-hover:text-royal-400'}`}>
                    Read guide →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </AnimatedSection>

      </div>
    </section>
  );
}
