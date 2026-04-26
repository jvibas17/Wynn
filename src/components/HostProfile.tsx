import { ChevronRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export function HostProfile() {
  const { t } = useLanguage();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 xl:gap-20 items-center">
      <div className="relative order-2 lg:order-1">
        <img 
          src="https://images.unsplash.com/photo-1581351721010-8cf859cb14a4?auto=format&fit=crop&q=80" 
          alt="Las Vegas Strip at Night" 
          className="rounded-lg shadow-2xl transform hover:scale-105 transition-transform duration-500 w-full h-auto"
        />
        <div className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 lg:-bottom-8 lg:-right-8 bg-royal-500 text-white p-6 sm:p-8 lg:p-10 xl:p-12 rounded-lg shadow-xl transform hover:scale-110 transition-transform duration-300">
          <p className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold font-serif">15+ Years</p>
          <p className="text-sm sm:text-base lg:text-lg uppercase tracking-wider">of Excellence</p>
        </div>
      </div>
      <div className="order-1 lg:order-2">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-bold text-white mb-6 sm:mb-8 lg:mb-10 leading-tight">
          {t('host.title')}
        </h2>
        <p className="text-cream-100 mb-6 sm:mb-8 lg:mb-10 text-lg sm:text-xl md:text-2xl leading-relaxed">
          {t('host.description')}
        </p>
        <ul className="space-y-4 sm:space-y-6 lg:space-y-8">
          {t('host.features').map((feature: string, index: number) => (
            <li key={index} className="flex items-start text-cream-100 group">
              <ChevronRight className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-royal-500 mr-4 sm:mr-6 transform group-hover:translate-x-1 transition-transform mt-1 flex-shrink-0" />
              <span className="group-hover:text-royal-500 transition-colors text-lg sm:text-xl lg:text-2xl">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}