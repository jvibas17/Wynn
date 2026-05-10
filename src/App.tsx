import { useState, useEffect } from 'react';
import { Crown, Menu, X } from 'lucide-react';
import wynnEncoreNight from '../Assets/wynn-encore-exterior-night.jpg';
import { AnimatedSection } from './components/AnimatedSection';
import { CTAButton } from './components/CTAButton';
import { LanguageSwitch } from './components/LanguageSwitch';
import { StatCard } from './components/StatCard';
import { HostProfile } from './components/HostProfile';
import { FAQSection } from './components/FAQSection';
import { Breadcrumbs } from './components/Breadcrumbs';
import { SEOOptimizedContent } from './components/SEOOptimizedContent';
import { HeroSection } from './sections/HeroSection';
import { ServicesSection } from './sections/ServicesSection';
import { ExperienceSection } from './sections/ExperienceSection';
import { ContactSection } from './sections/ContactSection';
import { useLanguage } from './contexts/LanguageContext';

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMobileMenuOpen && !(event.target as Element).closest('nav')) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMobileMenuOpen]);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <div className="min-h-screen bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950">
      <Breadcrumbs />

      {/* Header / Hero */}
      <header className="relative min-h-screen flex flex-col">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-cover bg-center opacity-50" style={{ backgroundImage: `url(${wynnEncoreNight})` }}></div>
          <div className="absolute inset-0 bg-gradient-to-b from-navy-950/90 via-transparent to-navy-950"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-royal-500/10 via-transparent to-royal-500/10"></div>
        </div>

        <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-navy-950/95 backdrop-blur-md py-2 sm:py-4 shadow-navy' : 'py-4 sm:py-6'}`}>
          <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12">
            <div className="flex items-center justify-between h-16 lg:h-20">
              <button onClick={scrollToTop} className="flex items-center group flex-shrink-0" aria-label="Wynn Rewards - Scroll to top">
                <Crown className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 text-royal-500 group-hover:scale-110 transition-transform" />
                <span className="ml-2 sm:ml-3 text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-white font-serif group-hover:text-royal-500 transition-colors">Wynn Rewards</span>
              </button>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center justify-center flex-1 mx-4 lg:mx-8 xl:mx-12">
                <div className="flex items-center space-x-6 xl:space-x-8">
                  <a href="#services" className="text-white hover:text-royal-500 transition-colors text-xs md:text-sm lg:text-base tracking-wider uppercase font-medium whitespace-nowrap" aria-label="VIP Services">{t('nav.services')}</a>
                  <a href="#experience" className="text-white hover:text-royal-500 transition-colors text-xs md:text-sm lg:text-base tracking-wider uppercase font-medium whitespace-nowrap" aria-label="VIP Experience">{t('nav.experience')}</a>
                  <a href="#faq" className="text-white hover:text-royal-500 transition-colors text-xs md:text-sm lg:text-base tracking-wider uppercase font-medium whitespace-nowrap" aria-label="Frequently Asked Questions">{t('nav.faq')}</a>
                  <a href="#contact" className="text-white hover:text-royal-500 transition-colors text-xs md:text-sm lg:text-base tracking-wider uppercase font-medium whitespace-nowrap" aria-label="Contact Winnie Lee">{t('nav.contact')}</a>
                </div>
              </div>

              {/* Desktop Language Switch & CTA */}
              <div className="hidden md:flex items-center space-x-2 lg:space-x-4 xl:space-x-6 flex-shrink-0">
                <LanguageSwitch />
                <CTAButton text={t('hero.cta.contact')} showArrow={true} href="#contact" aria-label="Contact Winnie Lee for VIP Services" className="text-xs md:text-sm lg:text-base px-3 md:px-4 lg:px-6 py-2 lg:py-3" />
              </div>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden text-white p-2 sm:p-3 rounded-lg hover:bg-royal-500/10 transition-colors touch-manipulation flex-shrink-0"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle mobile menu"
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? <X className="h-5 w-5 sm:h-6 sm:w-6" /> : <Menu className="h-5 w-5 sm:h-6 sm:w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden absolute top-full left-0 right-0 bg-navy-950/98 backdrop-blur-md border-t border-royal-500/20">
              <div className="container mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6">
                <div className="flex flex-col space-y-6">
                  {[
                    { href: '#services', label: 'VIP Services', key: 'nav.services' },
                    { href: '#experience', label: 'VIP Experience', key: 'nav.experience' },
                    { href: '#faq', label: 'Frequently Asked Questions', key: 'nav.faq' },
                    { href: '#contact', label: 'Contact Winnie Lee', key: 'nav.contact' },
                  ].map(({ href, label, key }) => (
                    <a
                      key={href}
                      href={href}
                      className="text-white hover:text-royal-500 transition-colors text-base sm:text-lg tracking-wider uppercase font-medium py-2 sm:py-3 border-b border-navy-800/50 touch-manipulation"
                      onClick={() => setIsMobileMenuOpen(false)}
                      aria-label={label}
                    >
                      {t(key)}
                    </a>
                  ))}
                  <div className="py-3"><LanguageSwitch /></div>
                  <CTAButton text={t('hero.cta.contact')} className="w-full text-base sm:text-lg py-3 sm:py-4" showArrow={true} href="#contact" onClick={() => setIsMobileMenuOpen(false)} aria-label="Contact Winnie Lee for VIP Services" />
                </div>
              </div>
            </div>
          )}
        </nav>

        <HeroSection />

        <div className="absolute bottom-0 left-0 right-0 h-24 sm:h-32 lg:h-40 bg-gradient-to-t from-navy-950 to-transparent"></div>
      </header>

      {/* SEO Content */}
      <SEOOptimizedContent />

      {/* Host Profile */}
      <section className="py-12 sm:py-16 md:py-24 lg:py-32 xl:py-40 relative">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1663425561986-3c67758d2c54?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-30 md:opacity-20"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-navy-950/90 to-navy-950/90"></div>
        </div>
        <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 relative">
          <AnimatedSection>
            <HostProfile />
          </AnimatedSection>
        </div>
      </section>

      {/* Marquee ribbon — scrolling banner of values */}
      <div className="marquee">
        <div className="marquee-track">
          <span className="marquee-item">Discreet</span>
          <span className="marquee-item">Bespoke</span>
          <span className="marquee-item">Multilingual</span>
          <span className="marquee-item">Twenty-Four Hours</span>
          <span className="marquee-item">Wynn Rewards</span>
          <span className="marquee-item">VIP Access</span>
          <span className="marquee-item">Discreet</span>
          <span className="marquee-item">Bespoke</span>
          <span className="marquee-item">Multilingual</span>
          <span className="marquee-item">Twenty-Four Hours</span>
          <span className="marquee-item">Wynn Rewards</span>
          <span className="marquee-item">VIP Access</span>
        </div>
      </div>

      {/* Services */}
      <ServicesSection />

      {/* Experience */}
      <ExperienceSection />

      {/* Stats */}
      <section className="py-12 sm:py-16 md:py-24 lg:py-32">
        <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-12">
            <AnimatedSection><StatCard number="3" text={t('stats.tiers')} /></AnimatedSection>
            <AnimatedSection><StatCard number="100%" text={t('stats.satisfaction')} /></AnimatedSection>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQSection />

      {/* Contact */}
      <ContactSection />

      {/* Footer */}
      <footer className="bg-navy-950 text-white py-8 sm:py-12 lg:py-16">
        <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
            <div className="flex items-center">
              <Crown className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 lg:h-12 lg:w-12 text-royal-500" />
              <span className="ml-2 sm:ml-3 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold font-serif">Wynn Rewards</span>
            </div>
            <div className="text-center md:text-right">
              <p className="text-cream-100 text-sm sm:text-base md:text-lg lg:text-xl">{t('footer.copyright')}</p>
              <p className="text-cream-200 text-xs sm:text-sm md:text-base lg:text-lg mt-1 sm:mt-2">{t('footer.subtitle')}</p>
            </div>
          </div>
        </div>
      </footer>

      {/* Chatbot & WhatsApp — disabled */}
      {/* {!showWhatsAppChat && <ChatBot onOpenWhatsApp={() => setShowWhatsAppChat(true)} />} */}
      {/* {showWhatsAppChat && <WhatsAppChat onClose={() => setShowWhatsAppChat(false)} />} */}
    </div>
  );
}

export default App;
