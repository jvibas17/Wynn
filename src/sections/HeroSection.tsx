import { CTAButton } from '../components/CTAButton';
import { useLanguage } from '../contexts/LanguageContext';

export function HeroSection() {
  const { t } = useLanguage();

  return (
    <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 flex-1 flex items-center relative">
      <div className="max-w-5xl w-full">
        <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-serif font-bold text-white mb-4 sm:mb-6 md:mb-8 lg:mb-12 leading-tight animate-fade-up">
          {t('hero.title')}
        </h1>
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-cream-100 mb-6 sm:mb-8 md:mb-10 lg:mb-16 leading-relaxed animate-fade-up-delay max-w-4xl">
          {t('hero.subtitle')}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 lg:gap-8 animate-fade-up-delay">
          <CTAButton text={t('hero.cta.contact')} showArrow={true} href="#contact" className="text-base sm:text-lg md:text-xl py-3 sm:py-4 md:py-5" aria-label="Contact Winnie Lee for VIP Services" />
          <CTAButton text={t('hero.cta.learnMore')} variant="outline" href="#services" className="text-base sm:text-lg md:text-xl py-3 sm:py-4 md:py-5" aria-label="Learn more about VIP services" />
        </div>
      </div>
    </div>
  );
}
