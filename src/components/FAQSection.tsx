import { useState } from 'react';
import { ChevronDown, ChevronUp, MessageCircle } from 'lucide-react';
import { AnimatedSection } from './AnimatedSection';
import { useLanguage } from '../contexts/LanguageContext';

export function FAQSection() {
  const { t } = useLanguage();
  const [openItems, setOpenItems] = useState<string[]>(['1']); // First item open by default

  const toggleItem = (id: string) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const faqData = t('faq.questions');

  return (
    <section className="py-12 sm:py-16 md:py-24 lg:py-32 bg-navy-950/95" id="faq">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <AnimatedSection>
          <div className="max-w-4xl mx-auto text-center mb-12 sm:mb-16 lg:mb-24">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-bold text-white mb-6 sm:mb-8">
              {t('faq.title')}
            </h2>
            <p className="text-cream-100 text-lg sm:text-xl md:text-2xl lg:text-3xl leading-relaxed px-4">
              {t('faq.subtitle')}
            </p>
          </div>
        </AnimatedSection>

        {/* FAQ Items */}
        <div className="max-w-4xl mx-auto">
          <div className="space-y-4 sm:space-y-6">
            {faqData.map((item: { id: string; question: string; answer: string }, index: number) => (
              <AnimatedSection key={index}>
                <div className="glass-card rounded-xl overflow-hidden">
                  <button
                    onClick={() => toggleItem(index.toString())}
                    className="w-full px-6 sm:px-8 py-4 sm:py-6 text-left flex items-center justify-between hover:bg-navy-900/30 transition-colors touch-manipulation"
                    aria-expanded={openItems.includes(index.toString())}
                    aria-controls={`faq-answer-${index}`}
                  >
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-serif font-semibold text-white pr-4 flex-1">
                      {item.question}
                    </h3>
                    <div className="flex-shrink-0">
                      {openItems.includes(index.toString()) ? (
                        <ChevronUp className="h-5 w-5 sm:h-6 sm:w-6 text-royal-500" />
                      ) : (
                        <ChevronDown className="h-5 w-5 sm:h-6 sm:w-6 text-royal-500" />
                      )}
                    </div>
                  </button>
                  
                  {openItems.includes(index.toString()) && (
                    <div 
                      id={`faq-answer-${index}`}
                      className="px-6 sm:px-8 pb-4 sm:pb-6 border-t border-royal-500/20"
                    >
                      <div className="pt-4 sm:pt-6">
                        <p className="text-cream-100 text-base sm:text-lg leading-relaxed">
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <AnimatedSection>
          <div className="max-w-3xl mx-auto text-center mt-12 sm:mt-16 lg:mt-24">
            <div className="glass-card p-6 sm:p-8 lg:p-12 rounded-2xl">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-white mb-4 sm:mb-6">
                {t('faq.stillHaveQuestions.title')}
              </h3>
              <p className="text-cream-100 text-lg sm:text-xl mb-6 sm:mb-8">
                {t('faq.stillHaveQuestions.subtitle')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
                <a
                  href="#contact"
                  className="bg-royal-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold hover:bg-royal-400 transition-all duration-300 transform hover:scale-105 shadow-royal flex items-center justify-center touch-manipulation"
                >
                  <MessageCircle className="h-5 w-5 mr-2" />
                  {t('faq.stillHaveQuestions.contactButton')}
                </a>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}