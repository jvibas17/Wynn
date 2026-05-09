import { ChevronRight } from 'lucide-react';
import { AnimatedSection } from '../components/AnimatedSection';
import { useLanguage } from '../contexts/LanguageContext';
import wynnExterior from '../../Assets/sunlit-exterior-of-wynn.jpg';

export function ExperienceSection() {
  const { t } = useLanguage();

  return (
    <section className="py-12 sm:py-16 md:py-24 lg:py-32 xl:py-40 relative" id="experience">
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30 md:opacity-20"
          style={{ backgroundImage: `url(${wynnExterior})` }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950/90 to-navy-950/90"></div>
      </div>
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 lg:gap-16 xl:gap-20 items-center">
          <AnimatedSection>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-serif font-bold text-white mb-4 sm:mb-6 md:mb-8 lg:mb-10">
              {t('experience.title')}
            </h2>
            <p className="text-cream-100 mb-4 sm:mb-6 md:mb-8 lg:mb-10 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed">
              {t('experience.description')}
            </p>
            <ul className="space-y-3 sm:space-y-4 md:space-y-6">
              {t('experience.features').map((feature: string, index: number) => (
                <li key={index} className="flex items-center text-cream-100 group">
                  <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 text-royal-500 mr-3 sm:mr-4 transform group-hover:translate-x-1 transition-transform flex-shrink-0" />
                  <span className="group-hover:text-royal-500 transition-colors text-base sm:text-lg md:text-xl">{feature}</span>
                </li>
              ))}
            </ul>
          </AnimatedSection>
          <AnimatedSection>
            <div className="relative mt-8 lg:mt-0">
              <img
                src={wynnExterior}
                alt="Wynn Las Vegas Luxury Hotel Exterior - VIP Experience"
                className="rounded-lg shadow-2xl transform hover:scale-105 transition-transform duration-500 w-full h-auto max-h-96 sm:max-h-none object-cover"
              />
              <div className="absolute -bottom-3 -right-3 sm:-bottom-4 sm:-right-4 md:-bottom-6 md:-right-6 lg:-bottom-8 lg:-right-8 bg-royal-500 text-white p-3 sm:p-4 md:p-6 lg:p-8 xl:p-10 rounded-lg shadow-xl transform hover:scale-110 transition-transform duration-300">
                <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold font-serif text-white">{t('experience.excellence')}</p>
                <p className="text-xs sm:text-sm md:text-base lg:text-lg uppercase tracking-wider">{t('experience.excellenceText')}</p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
