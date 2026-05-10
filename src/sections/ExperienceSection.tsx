import { ChevronRight } from 'lucide-react';
import { AnimatedSection } from '../components/AnimatedSection';
import { useLanguage } from '../contexts/LanguageContext';
import wynnExterior from '../../Assets/sunlit-exterior-of-wynn.jpg';

export function ExperienceSection() {
  const { t } = useLanguage();

  return (
    <section className="py-12 sm:py-16 md:py-24 lg:py-32 xl:py-40 relative clip-diagonal-top clip-diagonal-bottom overflow-hidden" id="experience">
      {/* Background */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25 md:opacity-15"
          style={{ backgroundImage: `url(${wynnExterior})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950/95 via-navy-950/80 to-navy-950/95" />
        {/* Directional light from right */}
        <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-royal-500/[0.04] to-transparent pointer-events-none" />
      </div>

      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 relative">

        {/* Deco background letter */}
        <div className="deco-letter absolute -left-8 top-0 opacity-60 pointer-events-none select-none" aria-hidden="true">E</div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 lg:gap-20 xl:gap-28 items-center">

          {/* LEFT — text content */}
          <AnimatedSection>
            <div className="editorial-number mb-2">02</div>
            <div className="luxury-label">The Experience</div>
            <h2 className="heading-display text-white mb-4">
              {t('experience.title')}
            </h2>
            <div className="ornament-divider w-48 mb-6"><span /></div>
            <p className="serif-italic text-cream-100/70 mb-8 text-lg md:text-xl lg:text-2xl leading-relaxed">
              {t('experience.description')}
            </p>

            {/* Feature list — editorial with thin rule between items */}
            <ul className="space-y-0">
              {t('experience.features').map((feature: string, index: number) => (
                <li key={index} className="group flex items-center py-4 border-b border-royal-500/10 last:border-b-0 hover:border-royal-500/30 transition-colors duration-300">
                  <span className="font-serif italic text-royal-500/40 text-lg w-8 flex-shrink-0 group-hover:text-royal-500/70 transition-colors">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <ChevronRight className="h-4 w-4 text-royal-500/60 mx-3 flex-shrink-0 transform group-hover:translate-x-1 transition-transform" />
                  <span className="group-hover:text-royal-300 transition-colors text-base sm:text-lg text-cream-100">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </AnimatedSection>

          {/* RIGHT — image with offset badge */}
          <AnimatedSection>
            <div className="relative mt-8 lg:mt-0">
              {/* Image container with editorial frame */}
              <div className="relative rounded-lg overflow-hidden shadow-2xl">
                <img
                  src={wynnExterior}
                  alt="Wynn Las Vegas Luxury Hotel Exterior - VIP Experience"
                  className="w-full h-auto max-h-96 sm:max-h-none object-cover transform hover:scale-105 transition-transform duration-700"
                />
                {/* Dark gradient overlay on image bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-navy-950/60 to-transparent" />
              </div>

              {/* Offset badge — hangs outside the image */}
              <div className="absolute -bottom-4 -right-4 sm:-bottom-5 sm:-right-5 bg-royal-500 text-white p-4 sm:p-6 lg:p-8 rounded-lg shadow-xl transform hover:scale-110 transition-transform duration-300">
                <p className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold font-serif leading-none">
                  {t('experience.excellence')}
                </p>
                <p className="text-xs sm:text-sm uppercase tracking-widest mt-1 opacity-90">
                  {t('experience.excellenceText')}
                </p>
              </div>

              {/* Thin vertical accent line left of image */}
              <div className="hidden lg:block absolute -left-6 top-8 bottom-8 w-px bg-gradient-to-b from-transparent via-royal-500/40 to-transparent" />
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
