import { useLanguage } from '../contexts/LanguageContext';

export function HostProfile() {
  const { t } = useLanguage();

  return (
    <div className="relative">

      {/* Editorial section label */}
      <div className="luxury-label mb-0">Your Host</div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-0 items-stretch">

        {/* LEFT — Image column, edge-to-edge atmospheric */}
        <div className="relative order-2 lg:order-1 min-h-[380px] sm:min-h-[480px] lg:min-h-[600px] overflow-hidden rounded-xl lg:rounded-r-none lg:rounded-l-xl">
          <img
            src="https://images.unsplash.com/photo-1581351721010-8cf859cb14a4?auto=format&fit=crop&q=80"
            alt="Las Vegas Strip at Night — Wynn VIP Host"
            className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
          />
          {/* Gradient overlays for depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-navy-950/20 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-navy-950/60 lg:block hidden" />

          {/* Floating years badge — bottom left */}
          <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8">
            <div className="inline-block">
              <div className="font-serif italic font-bold text-royal-300 leading-none mb-1"
                style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)' }}>
                15+
              </div>
              <div className="text-xs sm:text-sm font-medium tracking-[0.25em] uppercase text-cream-200/70">
                Years of Excellence
              </div>
              <div className="mt-2 h-px w-12 bg-royal-500/60" />
            </div>
          </div>

          {/* Vertical rail — right edge of image */}
          <div className="hidden lg:flex absolute right-4 top-8 bottom-8 items-center">
            <span className="vertical-rail opacity-30">Wynn Las Vegas · VIP Host</span>
          </div>
        </div>

        {/* RIGHT — Content column */}
        <div className="order-1 lg:order-2 flex flex-col justify-center px-0 pt-8 pb-6 lg:pt-0 lg:pl-14 xl:pl-20">

          {/* Large display heading */}
          <h2 className="heading-display text-white mb-4 lg:mb-6">
            {t('host.title')}
          </h2>

          <div className="ornament-divider w-40 mb-6 lg:mb-8"><span /></div>

          {/* Pull-quote style description */}
          <p className="serif-italic text-cream-100/70 text-lg sm:text-xl lg:text-2xl leading-relaxed mb-8 lg:mb-10 max-w-lg">
            {t('host.description')}
          </p>

          {/* Feature list — numbered editorial with thin dividers */}
          <ul className="space-y-0 max-w-lg">
            {t('host.features').map((feature: string, index: number) => (
              <li
                key={index}
                className="group flex items-center py-4 border-b border-royal-500/10 last:border-b-0 hover:border-royal-500/30 transition-colors duration-300"
              >
                <span className="font-serif italic text-royal-500/35 text-base w-8 flex-shrink-0 group-hover:text-royal-500/60 transition-colors">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className="w-px h-4 bg-royal-500/20 mx-4 flex-shrink-0 group-hover:bg-royal-500/50 transition-colors" />
                <span className="text-cream-100 text-base sm:text-lg group-hover:text-royal-300 transition-colors">
                  {feature}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
