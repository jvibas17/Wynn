import React from 'react';
import { CreditCard, Coins, Gift } from 'lucide-react';
import { AnimatedSection } from '../components/AnimatedSection';
import { RewardCard } from '../components/RewardCard';
import { useLanguage } from '../contexts/LanguageContext';
import { tierBenefits } from '../data/tierBenefits';

function InfoCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: React.ReactNode }) {
  return (
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
}

export function ServicesSection() {
  const { t } = useLanguage();
  const tiers = ['red', 'platinum', 'black'] as const;

  return (
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
          {tiers.map((tier) => (
            <AnimatedSection key={tier}>
              <RewardCard
                tier={tier}
                title={t(`tiers.${tier}.title`)}
                tierRange={tierBenefits[tier].tierRange}
                benefits={tierBenefits[tier]}
              />
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection>
          <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-white mb-6 sm:mb-8 md:mb-12 lg:mb-16 text-center">
            {t('services.earnRedeem.title')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-10">
            <InfoCard
              icon={<CreditCard className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-royal-500" />}
              title={t('services.earnRedeem.tierCredits.title')}
              description={
                <>
                  <p className="mb-4">{t('services.earnRedeem.tierCredits.description')}</p>
                  <ul className="list-disc list-inside space-y-2 mb-4 pl-4">
                    {t('services.earnRedeem.tierCredits.games').map((game: string, index: number) => (
                      <li key={index}>{game}</li>
                    ))}
                  </ul>
                  <p>{t('services.earnRedeem.tierCredits.instructions')}</p>
                </>
              }
            />
            <InfoCard
              icon={<Coins className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-royal-500" />}
              title={t('services.earnRedeem.freeCredit.title')}
              description={
                <>
                  <p className="font-semibold mb-3">{t('services.earnRedeem.freeCredit.earnTitle')}</p>
                  <ul className="list-disc list-inside space-y-2 mb-4 pl-4">
                    {t('services.earnRedeem.freeCredit.rates').map((rate: string, index: number) => (
                      <li key={index}>{rate}</li>
                    ))}
                  </ul>
                  <p className="font-bold text-lg mb-4 text-royal-400">{t('services.earnRedeem.freeCredit.conversion')}</p>
                  <ul className="space-y-2 text-cream-200 text-sm">
                    {t('services.earnRedeem.freeCredit.terms').map((term: string, index: number) => (
                      <li key={index}>• {term}</li>
                    ))}
                  </ul>
                </>
              }
            />
            <InfoCard
              icon={<Gift className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-royal-500" />}
              title={t('services.earnRedeem.compDollars.title')}
              description={
                <>
                  <p className="mb-4">{t('services.earnRedeem.compDollars.description')}</p>
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
              }
            />
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
  );
}
