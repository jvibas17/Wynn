import { useLanguage } from '../contexts/LanguageContext';

interface BreadcrumbItem {
  label: string;
  href: string;
  current?: boolean;
}

export function Breadcrumbs() {
  const { t } = useLanguage();

  const breadcrumbs: BreadcrumbItem[] = [
    { label: t('breadcrumbs.home'), href: '/' },
    { label: t('breadcrumbs.services'), href: '#services' },
    { label: t('breadcrumbs.location'), href: '#', current: true },
  ];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-40"
      aria-label="Breadcrumb navigation"
    >
      {/* Thin royal purple top line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-royal-500/50 to-transparent" />

      {/* Breadcrumb bar */}
      <div className="bg-navy-950/90 backdrop-blur-md border-b border-royal-500/[0.08]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ol className="flex items-center py-1.5 gap-0" aria-label="breadcrumb">
            {breadcrumbs.map((item, index) => (
              <li key={item.href} className="flex items-center">

                {/* Diamond separator — not shown before first item */}
                {index > 0 && (
                  <span
                    className="mx-2.5 text-royal-500/30 text-[0.5rem] select-none"
                    aria-hidden="true"
                  >
                    ✦
                  </span>
                )}

                {item.current ? (
                  <span
                    aria-current="page"
                    className="text-[0.65rem] font-semibold tracking-[0.18em] uppercase text-cream-100/80"
                  >
                    {item.label}
                  </span>
                ) : (
                  <a
                    href={item.href}
                    className="text-[0.65rem] font-medium tracking-[0.18em] uppercase text-royal-400/50 hover:text-royal-400 transition-colors duration-200"
                  >
                    {item.label}
                  </a>
                )}
              </li>
            ))}

            {/* Right side — thin accent rule that fades out */}
            <li className="ml-auto hidden sm:block" aria-hidden="true">
              <div className="flex items-center gap-2 text-[0.55rem] tracking-[0.25em] uppercase text-royal-500/25 font-medium select-none">
                <span className="w-6 h-px bg-royal-500/20" />
                <span>Vegas VIP Host</span>
              </div>
            </li>
          </ol>
        </div>
      </div>
    </nav>
  );
}
