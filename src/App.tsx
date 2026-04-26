import React, { useState, useEffect } from 'react';
import { Crown, ChevronRight, Mail, MapPin, Menu, X, CreditCard, Coins, Gift } from 'lucide-react';
import { AnimatedSection } from './components/AnimatedSection';
import { CTAButton } from './components/CTAButton';
import { LeadCaptureForm } from './components/LeadCaptureForm';
import { LanguageSwitch } from './components/LanguageSwitch';
import { ChatBot } from './components/ChatBot';
import { WhatsAppChat } from './components/WhatsAppChat';
import { useLanguage } from './contexts/LanguageContext';
import { RewardCard } from './components/RewardCard';
import { HostProfile } from './components/HostProfile';
import { FAQSection } from './components/FAQSection';
import { Breadcrumbs } from './components/Breadcrumbs';
import { SEOOptimizedContent } from './components/SEOOptimizedContent';
import { tierBenefits } from './data/tierBenefits';
import wynnExterior from '../Assets/sunlit-exterior-of-wynn.jpg';

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showWhatsAppChat, setShowWhatsAppChat] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMobileMenuOpen && !(event.target as Element).closest('nav')) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMobileMenuOpen]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const renderTierCards = () => {
    const tiers = ['red', 'platinum', 'black'] as const;
    return tiers.map((tier) => (
      <AnimatedSection key={tier}>
        <RewardCard
          tier={tier}
          title={t(`tiers.${tier}.title`)}
          tierRange={tierBenefits[tier].tierRange}
          benefits={tierBenefits[tier]}
        />
      </AnimatedSection>
    ));
  };

  const renderInfoCard = (icon: React.ReactNode, title: string, description: React.ReactNode) => (
    <div className="glass-card p-4 sm:p-6 lg:p-8 rounded-xl hover:bg-navy-900/50 transition-all duration-300">
      <div className="flex flex-col space-y-4">
        <div className="flex items-start space-x-4">
          <div className="p-3 rounded-lg bg-royal-500/10 flex-shrink-0">
            {icon}
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-lg sm:text-xl font-serif font-semibold text-white mb-3">{title}</h4>
          </div>
        </div>
        <div className="text-cream-100 text-sm sm:text-base space-y-3 leading-relaxed">
          {description}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950">
      {/* Breadcrumbs */}
      <Breadcrumbs />
      
      <header className="relative min-h-screen flex flex-col">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1663425561986-3c67758d2c54?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-40"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-navy-950/90 via-transparent to-navy-950"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-royal-500/10 via-transparent to-royal-500/10"></div>
        </div>

        <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-navy-950/95 backdrop-blur-md py-2 sm:py-4 shadow-navy' : 'py-4 sm:py-6'}`}>
          <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12">
            <div className="flex items-center justify-between h-16 lg:h-20">
              <button 
                onClick={scrollToTop}
                className="flex items-center group flex-shrink-0"
                aria-label="Wynn Rewards - Scroll to top"
              >
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
              
              {/* Mobile/Tablet Menu Button */}
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
          
          {/* Mobile/Tablet Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden absolute top-full left-0 right-0 bg-navy-950/98 backdrop-blur-md border-t border-royal-500/20">
              <div className="container mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6">
                <div className="flex flex-col space-y-6">
                  <a 
                    href="#services" 
                    className="text-white hover:text-royal-500 transition-colors text-base sm:text-lg tracking-wider uppercase font-medium py-2 sm:py-3 border-b border-navy-800/50 touch-manipulation"
                    onClick={() => setIsMobileMenuOpen(false)}
                    aria-label="VIP Services"
                  >
                    {t('nav.services')}
                  </a>
                  <a 
                    href="#experience" 
                    className="text-white hover:text-royal-500 transition-colors text-base sm:text-lg tracking-wider uppercase font-medium py-2 sm:py-3 border-b border-navy-800/50 touch-manipulation"
                    onClick={() => setIsMobileMenuOpen(false)}
                    aria-label="VIP Experience"
                  >
                    {t('nav.experience')}
                  </a>
                  <a 
                    href="#faq" 
                    className="text-white hover:text-royal-500 transition-colors text-base sm:text-lg tracking-wider uppercase font-medium py-2 sm:py-3 border-b border-navy-800/50 touch-manipulation"
                    onClick={() => setIsMobileMenuOpen(false)}
                    aria-label="Frequently Asked Questions"
                  >
                    {t('nav.faq')}
                  </a>
                  <a 
                    href="#contact" 
                    className="text-white hover:text-royal-500 transition-colors text-base sm:text-lg tracking-wider uppercase font-medium py-2 sm:py-3 border-b border-navy-800/50 touch-manipulation"
                    onClick={() => setIsMobileMenuOpen(false)}
                    aria-label="Contact Winnie Lee"
                  >
                    {t('nav.contact')}
                  </a>
                  <div className="py-3">
                    <LanguageSwitch />
                  </div>
                  <CTAButton 
                    text={t('hero.cta.contact')} 
                    className="w-full text-base sm:text-lg py-3 sm:py-4" 
                    showArrow={true} 
                    href="#contact"
                    onClick={() => setIsMobileMenuOpen(false)}
                    aria-label="Contact Winnie Lee for VIP Services"
                  />
                </div>
              </div>
            </div>
          )}
        </nav>

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
        
        <div className="absolute bottom-0 left-0 right-0 h-24 sm:h-32 lg:h-40 bg-gradient-to-t from-navy-950 to-transparent"></div>
      </header>

      {/* SEO Optimized Content Section */}
      <SEOOptimizedContent />

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

      <section className="py-12 sm:py-16 md:py-24 lg:py-32 xl:py-40 bg-navy-950/95" id="services">
        <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12">
          <AnimatedSection>
            <div className="max-w-4xl mx-auto text-center mb-12 sm:mb-16 lg:mb-24">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-serif font-bold text-white mb-4 sm:mb-6 md:mb-8">
                {t('services.title')}
              </h2>
              <p className="text-cream-100 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed px-2 sm:px-4">
                {t('services.subtitle')}
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-10 mb-8 sm:mb-12 lg:mb-16 xl:mb-24">
            {renderTierCards()}
          </div>

          <AnimatedSection>
            <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-white mb-6 sm:mb-8 md:mb-12 lg:mb-16 text-center">
              {t('services.earnRedeem.title')}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-10">
              {renderInfoCard(
                <CreditCard className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-royal-500" />,
                t('services.earnRedeem.tierCredits.title'),
                <>
                  <p className="mb-4">
                    {t('services.earnRedeem.tierCredits.description')}
                  </p>
                  <ul className="list-disc list-inside space-y-2 mb-4 pl-4">
                    {t('services.earnRedeem.tierCredits.games').map((game: string, index: number) => (
                      <li key={index}>{game}</li>
                    ))}
                  </ul>
                  <p>
                    {t('services.earnRedeem.tierCredits.instructions')}
                  </p>
                </>
              )}

              {renderInfoCard(
                <Coins className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-royal-500" />,
                t('services.earnRedeem.freeCredit.title'),
                <>
                  <p className="font-semibold mb-3">{t('services.earnRedeem.freeCredit.earnTitle')}</p>
                  <ul className="list-disc list-inside space-y-2 mb-4 pl-4">
                    {t('services.earnRedeem.freeCredit.rates').map((rate: string, index: number) => (
                      <li key={index}>{rate}</li>
                    ))}
                  </ul>
                  <p className="font-bold text-lg mb-4 text-royal-400">
                    {t('services.earnRedeem.freeCredit.conversion')}
                  </p>
                  <ul className="space-y-2 text-cream-200 text-sm">
                    {t('services.earnRedeem.freeCredit.terms').map((term: string, index: number) => (
                      <li key={index}>• {term}</li>
                    ))}
                  </ul>
                </>
              )}

              {renderInfoCard(
                <Gift className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-royal-500" />,
                t('services.earnRedeem.compDollars.title'),
                <>
                  <p className="mb-4">
                    {t('services.earnRedeem.compDollars.description')}
                  </p>
                  <ul className="list-disc list-inside space-y-2 mb-4 pl-4">
                    {t('services.earnRedeem.compDollars.games').map((game: string, index: number) => (
                      <li key={index}>{game}</li>
                    ))}
                  </ul>
                  <p className="font-semibold mb-3">{t('services.earnRedeem.compDollars.redeemTitle')}</p>
                  <ul className="list-disc list-inside space-y-1 pl-4">
                    {t('services.earnRedeem.compDollars.redeemOptions').map((option: string, index: number) => (
                      <li key={index}>{option}</li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </AnimatedSection>

          <div className="mt-8 sm:mt-12 md:mt-16 lg:mt-24 max-w-5xl mx-auto">
            <div className="glass-card p-4 sm:p-6 md:p-8 lg:p-10 rounded-xl">
              <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-serif font-bold text-white mb-3 sm:mb-4 md:mb-6">{t('services.terms.title')}</h3>
              <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm md:text-base lg:text-lg text-cream-200 leading-relaxed">
                {t('services.terms.conditions').map((condition: string, index: number) => (
                  <p key={index}>{condition}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

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

      <section className="py-12 sm:py-16 md:py-24 lg:py-32">
        <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-12">
            <AnimatedSection>
              <StatCard number="3" text={t('stats.tiers')} />
            </AnimatedSection>
            <AnimatedSection>
              <StatCard number="100%" text={t('stats.satisfaction')} />
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* FAQ Section for SEO */}
      <FAQSection />

      <section className="py-12 sm:py-16 md:py-24 lg:py-32 xl:py-40 relative" id="contact">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1663425561986-3c67758d2c54?auto=format&fit=crop&q=80')] bg-cover bg-bottom opacity-30 md:opacity-20"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-navy-950/90 to-navy-950/90"></div>
        </div>
        <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 relative">
          <AnimatedSection>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-serif font-bold text-center text-white mb-3 sm:mb-4 md:mb-6 lg:mb-8">
              {t('contact.title')}
            </h2>
            <p className="text-center text-cream-200 mb-8 sm:mb-12 md:mb-16 lg:mb-24 max-w-4xl mx-auto text-base sm:text-lg md:text-xl lg:text-2xl px-2 sm:px-4">
              {t('contact.subtitle')}
            </p>
          </AnimatedSection>
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 lg:gap-16">
            <AnimatedSection>
              <div className="glass-card p-4 sm:p-6 md:p-8 lg:p-12 rounded-2xl">
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
              <div className="glass-card p-4 sm:p-6 md:p-8 lg:p-12 rounded-2xl">
                <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-serif font-bold text-white mb-4 sm:mb-6 md:mb-8 lg:mb-12">{t('contact.contactInfo.title')}</h3>
                <LeadCaptureForm />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

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

      {/* AI Chatbot Assistant */}
      {!showWhatsAppChat && <ChatBot onOpenWhatsApp={() => setShowWhatsAppChat(true)} />}

      {/* WhatsApp Chat with Winnie Lee */}
      {showWhatsAppChat && <WhatsAppChat onClose={() => setShowWhatsAppChat(false)} />}

      {/* Virtual Pet */}
    </div>
  );
}

function StatCard({ number, text }: { number: string; text: string }) {
  return (
    <div className="glass-card p-6 sm:p-8 md:p-10 lg:p-12 xl:p-16 rounded-2xl transform hover:scale-105 transition-all duration-300">
      <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-royal-500 mb-3 sm:mb-4 md:mb-6 font-serif">{number}</div>
      <div className="text-cream-100 uppercase tracking-wider text-base sm:text-lg md:text-xl lg:text-2xl">{text}</div>
    </div>
  );
}

export default App;