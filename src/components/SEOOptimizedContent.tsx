import { Star, Crown, MapPin, Clock, Award } from 'lucide-react';
import { AnimatedSection } from './AnimatedSection';
import { useLanguage } from '../contexts/LanguageContext';

export function SEOOptimizedContent() {
  const { t } = useLanguage();

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-navy-950/98 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-r from-royal-500/20 via-transparent to-royal-500/20"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative">
        
        {/* Hero Content for SEO */}
        <AnimatedSection>
          <div className="max-w-6xl mx-auto text-center mb-12 sm:mb-16 lg:mb-20">
            <div className="inline-flex items-center gap-3 mb-6 sm:mb-8">
              <Crown className="h-8 w-8 sm:h-10 sm:w-10 text-royal-500" />
              <span className="text-royal-400 text-lg sm:text-xl font-semibold uppercase tracking-wider">
                {t('seo.badge')}
              </span>
              <Crown className="h-8 w-8 sm:h-10 sm:w-10 text-royal-500" />
            </div>
            
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-serif font-bold text-white mb-6 sm:mb-8 leading-tight">
              {t('seo.title')}
            </h1>
            
            <p className="text-lg sm:text-xl md:text-2xl text-cream-100 leading-relaxed max-w-4xl mx-auto mb-8 sm:mb-12">
              {t('seo.subtitle')}
            </p>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-8 lg:gap-12 text-cream-200">
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-400 fill-current" />
                <span className="text-sm sm:text-base font-medium">{t('seo.trust.rating')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-royal-400" />
                <span className="text-sm sm:text-base font-medium">{t('seo.trust.reviews')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-accent-400" />
                <span className="text-sm sm:text-base font-medium">{t('seo.trust.available')}</span>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Key Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 mb-12 sm:mb-16 lg:mb-20 max-w-5xl mx-auto">
          <AnimatedSection>
            <div className="glass-card p-6 sm:p-8 lg:p-10 rounded-xl text-center hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 bg-royal-500/20 rounded-full flex items-center justify-center">
                <Star className="h-8 w-8 sm:h-10 sm:w-10 text-royal-500" />
              </div>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-serif font-bold text-white mb-4 sm:mb-6">
                {t('seo.services.casinoHost.title')}
              </h3>
              <p className="text-cream-100 text-base sm:text-lg leading-relaxed">
                {t('seo.services.casinoHost.description')}
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <div className="glass-card p-6 sm:p-8 lg:p-10 rounded-xl text-center hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 bg-yellow-500/20 rounded-full flex items-center justify-center">
                <Award className="h-8 w-8 sm:h-10 sm:w-10 text-yellow-400" />
              </div>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-serif font-bold text-white mb-4 sm:mb-6">
                {t('seo.services.entertainment.title')}
              </h3>
              <p className="text-cream-100 text-base sm:text-lg leading-relaxed">
                {t('seo.services.entertainment.description')}
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <div className="glass-card p-6 sm:p-8 lg:p-10 rounded-xl text-center hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 bg-accent-500/20 rounded-full flex items-center justify-center">
                <Crown className="h-8 w-8 sm:h-10 sm:w-10 text-accent-400" />
              </div>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-serif font-bold text-white mb-4 sm:mb-6">
                {t('seo.services.dining.title')}
              </h3>
              <p className="text-cream-100 text-base sm:text-lg leading-relaxed">
                {t('seo.services.dining.description')}
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <div className="glass-card p-6 sm:p-8 lg:p-10 rounded-xl text-center hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 bg-green-500/20 rounded-full flex items-center justify-center">
                <MapPin className="h-8 w-8 sm:h-10 sm:w-10 text-green-400" />
              </div>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-serif font-bold text-white mb-4 sm:mb-6">
                {t('seo.services.accommodations.title')}
              </h3>
              <p className="text-cream-100 text-base sm:text-lg leading-relaxed">
                {t('seo.services.accommodations.description')}
              </p>
            </div>
          </AnimatedSection>
        </div>

        {/* Why Choose Section */}
        <div className="max-w-4xl mx-auto">
          <AnimatedSection>
            <div className="glass-card p-6 sm:p-8 lg:p-10 rounded-xl text-center">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-white mb-6 sm:mb-8">
                {t('seo.whyChoose.title')}
              </h2>
              <div className="space-y-4 sm:space-y-6 text-cream-100 text-base sm:text-lg leading-relaxed">
                <p>
                  {t('seo.whyChoose.content.paragraph1')}
                </p>
                <p>
                  {t('seo.whyChoose.content.paragraph2')}
                </p>
                <p>
                  {t('seo.whyChoose.content.paragraph3')}
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>

      </div>
    </section>
  );
}