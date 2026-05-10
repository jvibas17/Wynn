import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { AnimatedSection } from './AnimatedSection';
import { useLanguage } from '../contexts/LanguageContext';

export function FAQSection() {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqData = t('faq.questions');

  return (
    <section className="py-12 sm:py-16 md:py-24 lg:py-32 relative overflow-hidden" id="faq">
      {/* Subtle grain atmosphere behind the section */}
      <div className="absolute inset-0 bg-navy-950/98 pointer-events-none" />
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-royal-500/[0.03] to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative">

        {/* Editorial header — number left, title right */}
        <AnimatedSection>
          <div className="editorial-header mb-12 lg:mb-20">
            <div className="editorial-number">?</div>
            <div>
              <div className="luxury-label">Knowledge</div>
              <h2 className="heading-display text-white mb-4">
                {t('faq.title')}
              </h2>
              <div className="ornament-divider w-40 mb-4"><span /></div>
              <p className="serif-italic text-cream-200/70 text-lg md:text-xl leading-relaxed max-w-md">
                {t('faq.subtitle')}
              </p>
            </div>
          </div>
        </AnimatedSection>

        {/* FAQ — two-column: index rail left, content right */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8 lg:gap-16 xl:gap-24 items-start max-w-6xl">

          {/* Left: question index rail (desktop) */}
          <div className="hidden lg:block sticky top-32 space-y-px">
            {faqData.map((item: { id: string; question: string; answer: string }, i: number) => (
              <button
                key={i}
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className={`
                  w-full text-left py-4 px-0 flex items-start gap-4 group transition-all duration-300
                  border-b border-royal-500/10 last:border-b-0
                  ${openIndex === i ? 'text-royal-400' : 'text-cream-200/40 hover:text-cream-100/70'}
                `}
              >
                <span className={`
                  font-serif italic text-3xl leading-none mt-1 flex-shrink-0 transition-colors
                  ${openIndex === i ? 'text-royal-500' : 'text-royal-500/20 group-hover:text-royal-500/50'}
                `}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-sm font-medium leading-snug tracking-wide line-clamp-2">
                  {item.question}
                </span>
              </button>
            ))}

            {/* CTA below index */}
            <div className="pt-8">
              <a
                href="#contact"
                className="inline-flex items-center gap-3 text-royal-400 hover:text-royal-300 transition-colors group"
              >
                <span className="text-sm font-medium tracking-widest uppercase">{t('faq.stillHaveQuestions.contactButton')}</span>
                <span className="w-8 h-px bg-royal-500 group-hover:w-14 transition-all duration-300" />
              </a>
            </div>
          </div>

          {/* Right: expanded answers */}
          <div className="space-y-0">
            {faqData.map((item: { id: string; question: string; answer: string }, i: number) => {
              const isOpen = openIndex === i;
              return (
                <AnimatedSection key={i}>
                  <div className={`faq-editorial-item group ${isOpen ? 'is-open' : ''}`}>
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : i)}
                      className="w-full flex items-start justify-between gap-6 py-6 sm:py-8 text-left touch-manipulation"
                      aria-expanded={isOpen}
                    >
                      {/* Question number — mobile only */}
                      <span className="lg:hidden font-serif italic text-royal-500/40 text-2xl leading-none mt-1 flex-shrink-0 w-8">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <h3 className={`
                        flex-1 font-serif text-lg sm:text-xl lg:text-2xl font-semibold leading-snug transition-colors duration-300
                        ${isOpen ? 'text-royal-300' : 'text-white group-hover:text-royal-200'}
                      `}>
                        {item.question}
                      </h3>
                      <div className={`
                        flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full border flex items-center justify-center transition-all duration-300 mt-0.5
                        ${isOpen
                          ? 'border-royal-500/60 bg-royal-500/10 text-royal-400'
                          : 'border-royal-500/20 text-royal-500/40 group-hover:border-royal-500/50 group-hover:text-royal-400'
                        }
                      `}>
                        {isOpen
                          ? <Minus className="h-3 w-3 sm:h-4 sm:w-4" />
                          : <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
                        }
                      </div>
                    </button>

                    {/* Answer — slides open */}
                    <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[600px] opacity-100 pb-6 sm:pb-8' : 'max-h-0 opacity-0'}`}>
                      <p className="text-cream-100/70 text-base sm:text-lg leading-relaxed pl-0 lg:pl-0 border-l-2 border-royal-500/20 pl-4 sm:pl-6">
                        {item.answer}
                      </p>
                    </div>

                    {/* Bottom rule */}
                    <div className="h-px bg-royal-500/10 group-hover:bg-royal-500/25 transition-colors duration-300" />
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
