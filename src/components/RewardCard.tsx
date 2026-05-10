import { useState } from 'react';
import { Check, ChevronDown, ChevronUp } from 'lucide-react';
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

const tierConfig = {
  red: {
    accentBar: 'bg-red-600',
    accentText: 'text-red-400',
    accentBorder: 'border-red-500/30',
    accentBg: 'bg-red-500/8',
    accentHover: 'hover:text-red-400',
    accentCheck: 'text-red-400',
    numeral: 'I',
    label: 'Entry',
  },
  platinum: {
    accentBar: 'bg-accent-400',
    accentText: 'text-accent-300',
    accentBorder: 'border-accent-400/30',
    accentBg: 'bg-accent-500/8',
    accentHover: 'hover:text-accent-300',
    accentCheck: 'text-accent-300',
    numeral: 'II',
    label: 'Elite',
  },
  black: {
    accentBar: 'bg-gradient-to-r from-cream-200/80 via-cream-100 to-cream-200/80',
    accentText: 'text-cream-100',
    accentBorder: 'border-cream-200/25',
    accentBg: 'bg-cream-100/5',
    accentHover: 'hover:text-cream-100',
    accentCheck: 'text-cream-200',
    numeral: 'III',
    label: 'Chairman',
  },
};

export function RewardCard({ tier, title, tierRange, benefits }: RewardCardProps) {
  const { t } = useLanguage();
  const [expandedSection, setExpandedSection] = useState<'gaming' | 'resort' | 'annual' | null>(null);
  const cfg = tierConfig[tier];

  const renderBenefitSection = (
    label: string,
    items: Benefit[],
    section: 'gaming' | 'resort' | 'annual'
  ) => {
    const isOpen = expandedSection === section;
    const available = items.filter(b => b.available);
    const locked = items.filter(b => !b.available);

    return (
      <div className="border-b border-white/5 last:border-b-0">
        <button
          onClick={() => setExpandedSection(isOpen ? null : section)}
          className={`w-full flex items-center justify-between py-4 px-0 text-left transition-colors duration-200 ${cfg.accentHover} touch-manipulation`}
          aria-expanded={isOpen}
        >
          <span className={`font-serif text-base sm:text-lg font-semibold ${isOpen ? cfg.accentText : 'text-white/70'} transition-colors`}>
            {label}
          </span>
          {isOpen
            ? <ChevronUp className={`h-4 w-4 flex-shrink-0 ${cfg.accentText}`} />
            : <ChevronDown className="h-4 w-4 flex-shrink-0 text-white/30" />
          }
        </button>

        <div className={`overflow-hidden transition-all duration-400 ease-in-out ${isOpen ? 'max-h-[500px] pb-4' : 'max-h-0'}`}>
          <div className="space-y-2">
            {available.map((b, i) => (
              <div key={i} className="flex items-start gap-3 text-cream-100/80 text-sm leading-snug">
                <Check className={`h-3.5 w-3.5 flex-shrink-0 mt-0.5 ${cfg.accentCheck}`} />
                <span>
                  {t(b.name)}
                  {b.value && <span className={`ml-1 font-semibold ${cfg.accentText}`}>{b.value}</span>}
                </span>
              </div>
            ))}
            {locked.length > 0 && (
              <div className="pt-2 space-y-2">
                <p className="text-xs text-white/25 uppercase tracking-widest">{t('tiers.higherTiers')}</p>
                {locked.map((b, i) => (
                  <div key={i} className="flex items-start gap-3 text-white/20 text-sm">
                    <span className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                    <span>{t(b.name)}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`reward-card-editorial group relative overflow-hidden rounded-2xl border ${cfg.accentBorder} transition-all duration-500`}>

      {/* Colored top accent bar */}
      <div className={`h-0.5 w-full ${cfg.accentBar}`} />

      {/* Background atmosphere */}
      <div className={`absolute inset-0 ${cfg.accentBg} pointer-events-none`} />

      {/* Decorative background numeral */}
      <div
        className={`absolute -right-4 -top-4 font-serif italic font-bold text-[10rem] leading-none ${cfg.accentText} opacity-[0.04] pointer-events-none select-none`}
        aria-hidden="true"
      >
        {cfg.numeral}
      </div>

      {/* Card header */}
      <div className="relative px-6 lg:px-8 pt-8 pb-6">
        {/* Tier label */}
        <div className={`inline-flex items-center gap-2 mb-4`}>
          <span className={`text-[0.6rem] font-bold tracking-[0.3em] uppercase ${cfg.accentText}`}>
            {cfg.label} Tier
          </span>
          <span className={`w-6 h-px ${cfg.accentBar}`} />
        </div>

        {/* Tier name */}
        <h3 className="font-serif font-bold text-white leading-tight mb-2" style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)' }}>
          {title}
        </h3>

        {/* Credits range */}
        <p className={`text-xs font-medium tracking-wider uppercase ${cfg.accentText} opacity-70`}>
          Tier Credits: {tierRange}
        </p>
      </div>

      {/* Thin divider */}
      <div className={`mx-6 lg:mx-8 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-2`} />

      {/* Benefit sections */}
      <div className="px-6 lg:px-8 pb-2">
        {renderBenefitSection(t('tiers.sections.gaming'), benefits.gaming, 'gaming')}
        {renderBenefitSection(t('tiers.sections.resort'), benefits.resort, 'resort')}
        {renderBenefitSection(t('tiers.sections.annual'), benefits.annual, 'annual')}
      </div>

      {/* Terms */}
      <div className="px-6 lg:px-8 pb-6 pt-2">
        <p className="text-xs text-white/25 leading-relaxed">{t('tiers.termsNote')}</p>
      </div>
    </div>
  );
}
