import { CTAButton } from '../components/CTAButton';
import { useLanguage } from '../contexts/LanguageContext';

export function HeroSection() {
  const { t } = useLanguage();

  return (
    <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 flex-1 flex items-center relative pt-32 pb-16">

      {/* Vertical side rail — luxury identifier */}
      <div className="hidden lg:block absolute left-2 xl:left-6 top-1/2 -translate-y-1/2 z-10">
        <span className="vertical-rail">Wynn Las Vegas — VIP Concierge — Est. MMV</span>
      </div>

      {/* Massive Roman numeral year accent — top right corner */}
      <div className="hidden md:block absolute top-28 right-0 z-0 text-right pr-4 lg:pr-12 opacity-100">
        <div className="accent-numeral">MMXXV</div>
        <div className="text-[0.55rem] tracking-[0.45em] uppercase text-royal-400/40 mt-2 mr-2">
          Anno Domini · Vegas
        </div>
      </div>

      {/* Asymmetric content grid */}
      <div className="grid grid-cols-12 gap-6 lg:gap-12 w-full relative z-10 lg:pl-12">

        {/* Left: Title block — 8 of 12 cols */}
        <div className="col-span-12 lg:col-span-8">
          <div className="luxury-label animate-fade-up">
            An Exclusive Invitation
          </div>

          <h1 className="heading-display text-gold-foil mb-6 sm:mb-8 animate-fade-up">
            {t('hero.title')}
          </h1>

          <div className="ornament-divider w-64 mb-6 animate-fade-up">
            <span />
          </div>

          <p className="serif-italic text-lg sm:text-xl md:text-2xl lg:text-3xl text-cream-100/75 leading-relaxed max-w-2xl animate-fade-up-delay">
            {t('hero.subtitle')}
          </p>
        </div>

        {/* Right: Floating info card — 4 of 12 cols, drops below title */}
        <div className="col-span-12 lg:col-span-4 lg:pt-24 animate-fade-up-delay">
          <div className="hero-info-card">
            <div className="luxury-label">Direct Access</div>
            <p className="text-cream-100/70 text-sm sm:text-base leading-relaxed mb-6">
              Multilingual support in English, Mandarin, Taiwanese &amp; Japanese. Personalised &amp; discreet.
            </p>
            <div className="flex flex-col gap-3">
              <CTAButton
                text={t('hero.cta.contact')}
                showArrow={true}
                href="#contact"
                className="text-sm w-full"
                aria-label="Contact Winnie Lee for VIP Services"
              />
              <CTAButton
                text={t('hero.cta.learnMore')}
                variant="outline"
                href="#services"
                className="text-sm w-full"
                aria-label="Learn more about VIP services"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
