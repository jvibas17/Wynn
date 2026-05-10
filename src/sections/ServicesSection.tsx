import React from 'react';
import { CreditCard, Coins, Gift } from 'lucide-react';
import { AnimatedSection } from '../components/AnimatedSection';
import { RewardCard } from '../components/RewardCard';
import { useLanguage } from '../contexts/LanguageContext';
import { tierBenefits } from '../data/tierBenefits';

interface EarnRedeemRowProps {
  index: number;
  numeral: string;
  icon: React.ReactNode;
  title: string;
  description: React.ReactNode;
}

function EarnRedeemRow({ index, numeral, icon, title, description }: EarnRedeemRowProps) {
  return (
    <div className="earn-redeem-row group">
      {/* Large numeral — background decorative */}
      <div className="earn-numeral" aria-hidden="true">{numeral}</div>

      {/* Icon */}
      <div className="earn-icon-wrap flex-shrink-0">
        {icon}
      </div>

      {/* Content */}
      <div className="earn-content min-w-0">
        <h4 className="text-lg sm:text-xl lg:text-2xl font-serif font-semibold text-white mb-3 group-hover:text-royal-300 transition-colors duration-300">
          {title}
        </h4>
        <div className="text-cream-100/65 text-sm sm:text-base space-y-2 leading-relaxed">
          {description}
        </div>
      </div>

      {/* Hover bottom rule */}
      <div className="absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-royal-500/50 to-transparent group-hover:w-full transition-all duration-500" />
    </div>
  );
}

export function ServicesSection() {
  const { t } = useLanguage();
  const tiers = ['red', 'platinum', 'black'] as const;

  return (
    <section className="py-12 sm:py-16 md:py-24 lg:py-32 xl:py-40 bg-navy-950/95 aurora-glow" id="services">
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12">

        {/* ── WYNN REWARDS PROGRAM ───────────────────────────────── */}
        <AnimatedSection>
          <div className="editorial-header mb-16 lg:mb-24">
            <div className="editorial-number">01</div>
            <div>
              <div className="luxury-label">Rewards &amp; Benefits</div>
              <h2 className="heading-display text-white mb-6">
                {t('services.title')}
              </h2>
              <div className="ornament-divider w-48 mb-6"><span /></div>
              <p className="serif-italic text-cream-100/75 text-lg md:text-xl lg:text-2xl leading-relaxed max-w-xl">
                {t('services.subtitle')}
              </p>
            </div>
          </div>
        </AnimatedSection>

        {/* Tier cards — staggered heights via offset classes */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-10 mb-8 sm:mb-12 lg:mb-16 xl:mb-28 items-start">
          {tiers.map((tier, i) => (
            <AnimatedSection key={tier}>
              <div className={`
                ${i === 0 ? 'xl:mt-0' : ''}
                ${i === 1 ? 'xl:mt-8' : ''}
                ${i === 2 ? 'xl:mt-16' : ''}
              `}>
                <RewardCard
                  tier={tier}
                  title={t(`tiers.${tier}.title`)}
                  tierRange={tierBenefits[tier].tierRange}
                  benefits={tierBenefits[tier]}
                />
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* ── HOW TO EARN & REDEEM ────────────────────────────────── */}
        <AnimatedSection>
          {/* Section heading — editorial */}
          <div className="flex items-end gap-6 lg:gap-10 mb-12 lg:mb-16 border-t border-royal-500/15 pt-12 lg:pt-16">
            <div className="luxury-label self-start mt-1">How it Works</div>
            <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white leading-tight">
              {t('services.earnRedeem.title')}
            </h3>
          </div>
        </AnimatedSection>

        {/* Earn & Redeem rows — editorial numbered, not a card grid */}
        <div className="space-y-0 mb-16 lg:mb-24">
          <AnimatedSection>
            <EarnRedeemRow
              index={0}
              numeral="01"
              icon={<CreditCard className="h-7 w-7 lg:h-8 lg:w-8 text-royal-500" />}
              title={t('services.earnRedeem.tierCredits.title')}
              description={
                <>
                  <p className="mb-3">{t('services.earnRedeem.tierCredits.description')}</p>
                  <ul className="list-disc list-inside space-y-1 mb-3 pl-2">
                    {t('services.earnRedeem.tierCredits.games').map((game: string, i: number) => (
                      <li key={i}>{game}</li>
                    ))}
                  </ul>
                  <p className="text-cream-200/50 text-sm">{t('services.earnRedeem.tierCredits.instructions')}</p>
                </>
              }
            />
          </AnimatedSection>

          <AnimatedSection>
            <EarnRedeemRow
              index={1}
              numeral="02"
              icon={<Coins className="h-7 w-7 lg:h-8 lg:w-8 text-royal-500" />}
              title={t('services.earnRedeem.freeCredit.title')}
              description={
                <>
                  <p className="font-semibold text-cream-100/90 mb-2">{t('services.earnRedeem.freeCredit.earnTitle')}</p>
                  <ul className="list-disc list-inside space-y-1 mb-3 pl-2">
                    {t('services.earnRedeem.freeCredit.rates').map((rate: string, i: number) => (
                      <li key={i}>{rate}</li>
                    ))}
                  </ul>
                  <p className="font-bold text-base text-royal-400 mb-3">{t('services.earnRedeem.freeCredit.conversion')}</p>
                  <ul className="space-y-1 text-cream-200/50 text-sm">
                    {t('services.earnRedeem.freeCredit.terms').map((term: string, i: number) => (
                      <li key={i}>· {term}</li>
                    ))}
                  </ul>
                </>
              }
            />
          </AnimatedSection>

          <AnimatedSection>
            <EarnRedeemRow
              index={2}
              numeral="03"
              icon={<Gift className="h-7 w-7 lg:h-8 lg:w-8 text-royal-500" />}
              title={t('services.earnRedeem.compDollars.title')}
              description={
                <>
                  <p className="mb-3">{t('services.earnRedeem.compDollars.description')}</p>
                  <ul className="list-disc list-inside space-y-1 mb-3 pl-2">
                    {t('services.earnRedeem.compDollars.games').map((game: string, i: number) => (
                      <li key={i}>{game}</li>
                    ))}
                  </ul>
                  <p className="font-semibold text-cream-100/90 mb-2">{t('services.earnRedeem.compDollars.redeemTitle')}</p>
                  <ul className="list-disc list-inside space-y-1 pl-2">
                    {t('services.earnRedeem.compDollars.redeemOptions').map((option: string, i: number) => (
                      <li key={i}>{option}</li>
                    ))}
                  </ul>
                </>
              }
            />
          </AnimatedSection>
        </div>

        {/* Terms block */}
        <div className="max-w-5xl mx-auto">
          <div className="glass-card p-4 sm:p-6 md:p-8 lg:p-10 rounded-xl">
            <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-serif font-bold text-white mb-3 sm:mb-4 md:mb-6">
              {t('services.terms.title')}
            </h3>
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
