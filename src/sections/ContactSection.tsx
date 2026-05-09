import { Mail, MapPin } from 'lucide-react';
import { AnimatedSection } from '../components/AnimatedSection';
import { LeadCaptureForm } from '../components/LeadCaptureForm';
import { useLanguage } from '../contexts/LanguageContext';

export function ContactSection() {
  const { t } = useLanguage();

  return (
    <section className="py-12 sm:py-16 md:py-24 lg:py-32 xl:py-40 relative aurora-glow" id="contact">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1663425561986-3c67758d2c54?auto=format&fit=crop&q=80')] bg-cover bg-bottom opacity-30 md:opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950/90 to-navy-950/90"></div>
      </div>
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 relative">
        <AnimatedSection>
          <div className="editorial-header mb-16 lg:mb-24">
            <div className="editorial-number">03</div>
            <div>
              <div className="luxury-label">Connect</div>
              <h2 className="heading-display text-white mb-6">
                {t('contact.title')}
              </h2>
              <div className="ornament-divider w-48 mb-6"><span /></div>
              <p className="serif-italic text-cream-200/75 text-lg md:text-xl lg:text-2xl leading-relaxed max-w-xl">
                {t('contact.subtitle')}
              </p>
            </div>
          </div>
        </AnimatedSection>
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 lg:gap-16">
          <AnimatedSection>
            <div className="glass-card card-asymmetric hover-lift p-4 sm:p-6 md:p-8 lg:p-12 rounded-2xl">
              <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-serif font-bold text-white mb-4 sm:mb-6 md:mb-8 lg:mb-12">{t('contact.hostTitle')}</h3>
              <div className="space-y-4 sm:space-y-6 md:space-y-8">
                <div className="flex items-center text-cream-100 group">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-18 lg:h-18 rounded-full bg-navy-800/50 flex items-center justify-center mr-3 sm:mr-4 md:mr-6 group-hover:bg-royal-500/20 transition-colors flex-shrink-0">
                    <Mail className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 lg:h-8 lg:w-8 text-royal-500" />
                  </div>
                  <div>
                    <p className="group-hover:text-royal-500 transition-colors text-sm sm:text-base md:text-lg lg:text-xl break-all">lovepicaso888@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-center text-cream-100 group">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-18 lg:h-18 rounded-full bg-navy-800/50 flex items-center justify-center mr-3 sm:mr-4 md:mr-6 group-hover:bg-royal-500/20 transition-colors flex-shrink-0">
                    <MapPin className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 lg:h-8 lg:w-8 text-royal-500" />
                  </div>
                  <div>
                    <p className="group-hover:text-royal-500 transition-colors text-sm sm:text-base md:text-lg lg:text-xl">{t('contact.contactInfo.address')}</p>
                    <p className="text-xs sm:text-sm text-cream-200">{t('contact.contactInfo.location')}</p>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
          <AnimatedSection>
            <div className="glass-card card-asymmetric hover-lift p-4 sm:p-6 md:p-8 lg:p-12 rounded-2xl">
              <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-serif font-bold text-white mb-4 sm:mb-6 md:mb-8 lg:mb-12">{t('contact.contactInfo.title')}</h3>
              <LeadCaptureForm />
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
