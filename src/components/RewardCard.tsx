import { useState } from 'react';
import { Star, Check, ChevronDown, ChevronUp } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface Benefit {
  name: string;
  value?: string | number;
  available: boolean;
}

interface TierBenefits {
  gaming: Benefit[];
  resort: Benefit[];
  annual: Benefit[];
}

interface RewardCardProps {
  tier: 'red' | 'platinum' | 'black';
  title: string;
  tierRange: string;
  benefits: TierBenefits;
  pointsMultiplier?: number;
}

export function RewardCard({ tier, title, tierRange, benefits, pointsMultiplier }: RewardCardProps) {
  const { t } = useLanguage();
  const [expandedSection, setExpandedSection] = useState<'gaming' | 'resort' | 'annual' | null>(null);

  const getStarColor = (tier: string) => {
    switch (tier) {
      case 'red':
        return 'text-red-500';
      case 'platinum':
        return 'text-accent-400';
      case 'black':
        return 'text-black drop-shadow-[0_0_3px_rgba(255,255,255,0.5)]';
      default:
        return 'text-royal-500';
    }
  };

  const getCheckMarkStyle = (tier: string) => {
    switch (tier) {
      case 'black':
        return 'h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-black stroke-[3] mt-1 mr-2 sm:mr-3 flex-shrink-0';
      default:
        return `h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 ${getStarColor(tier)} stroke-2 mt-1 mr-2 flex-shrink-0`;
    }
  };

  const starColor = getStarColor(tier);
  const checkMarkStyle = getCheckMarkStyle(tier);

  const renderBenefitSection = (
    title: string, 
    benefits: Benefit[], 
    section: 'gaming' | 'resort' | 'annual'
  ) => {
    const isExpanded = expandedSection === section;
    const availableBenefits = benefits.filter(b => b.available);
    const unavailableBenefits = benefits.filter(b => !b.available);
    
    return (
      <div className="mb-3 sm:mb-4 md:mb-6">
        <button 
          onClick={() => setExpandedSection(isExpanded ? null : section)}
          className="w-full flex items-center justify-between text-xs sm:text-sm md:text-base lg:text-lg font-serif font-semibold text-white mb-1 sm:mb-2 md:mb-3 lg:mb-4 hover:text-royal-500 transition-colors touch-manipulation"
        >
          <span>{title}</span>
          {isExpanded ? (
            <ChevronUp className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 flex-shrink-0" />
          ) : (
            <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 flex-shrink-0" />
          )}
        </button>
        <div className={`space-y-1 sm:space-y-2 md:space-y-3 transition-all duration-300 ${isExpanded ? 'block' : 'hidden'}`}>
          {availableBenefits.length > 0 && (
            <div className="space-y-1 sm:space-y-2 md:space-y-3">
              {availableBenefits.map((benefit, index) => (
                <div 
                  key={index} 
                  className="flex items-start text-cream-100 p-1 sm:p-2 md:p-3 rounded-lg bg-navy-900/30 hover:bg-navy-900/50 transition-colors"
                >
                  <Check className={checkMarkStyle} />
                  <span className="text-xs sm:text-sm leading-relaxed min-w-0">
                    {t(benefit.name)}
                    {benefit.value && (
                      <span className={`ml-1 font-semibold ${starColor}`}>
                        {benefit.value}
                      </span>
                    )}
                  </span>
                </div>
              ))}
            </div>
          )}
          
          {unavailableBenefits.length > 0 && (
            <div className="space-y-1 sm:space-y-2 md:space-y-3 pt-1 sm:pt-2 md:pt-3">
              <p className="text-xs text-cream-200 uppercase tracking-wider">{t('tiers.higherTiers')}</p>
              {unavailableBenefits.map((benefit, index) => (
                <div 
                  key={index} 
                  className="flex items-start text-cream-100/30 p-1 sm:p-2 md:p-3 rounded-lg"
                >
                  <span className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 flex-shrink-0" />
                  <span className="text-xs sm:text-sm min-w-0">{t(benefit.name)}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className={`reward-card reward-card-${tier} overflow-hidden`}>
      <div className="sticky top-0 z-10 bg-gradient-to-b from-navy-950/95 to-navy-950/80 backdrop-blur-sm p-2 sm:p-3 md:p-4 lg:p-6 border-b border-royal-500/10">
        <div className="flex items-center">
          <Star className={`h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 lg:h-8 lg:w-8 ${starColor} fill-current flex-shrink-0`} />
          <div className="ml-2 sm:ml-3 min-w-0">
            <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-serif font-bold text-white truncate">{title}</h3>
            <p className="text-xs sm:text-sm text-cream-200 truncate">Tier Credits: {tierRange}</p>
          </div>
        </div>
        
        {pointsMultiplier && (
          <div className="mt-2 sm:mt-3 md:mt-4 flex items-center gap-2 sm:gap-3 md:gap-4">
            <div>
              <div className={`${starColor} text-base sm:text-lg md:text-xl font-bold mb-1`}>{pointsMultiplier}x</div>
              <div className="text-cream-100 text-xs sm:text-sm">Points Multiplier</div>
            </div>
          </div>
        )}
      </div>

      <div className="p-2 sm:p-3 md:p-4 lg:p-6">
        {renderBenefitSection(t('tiers.sections.gaming'), benefits.gaming, 'gaming')}
        {renderBenefitSection(t('tiers.sections.resort'), benefits.resort, 'resort')}
        {renderBenefitSection(t('tiers.sections.annual'), benefits.annual, 'annual')}
      </div>
      
      <div className="px-2 sm:px-3 md:px-4 lg:px-6 pb-2 sm:pb-3 md:pb-4 lg:pb-6">
        <p className="text-xs text-cream-200">
          {t('tiers.termsNote')}
        </p>
      </div>
    </div>
  );
}