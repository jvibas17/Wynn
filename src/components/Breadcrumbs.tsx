import { ChevronRight, Home } from 'lucide-react';
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
    { label: t('breadcrumbs.location'), href: '#', current: true }
  ];

  return (
    <nav 
      className="fixed top-0 left-0 right-0 z-40 bg-navy-950/80 backdrop-blur-sm border-b border-royal-500/10"
      aria-label="Breadcrumb navigation"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <ol className="flex items-center space-x-2 py-2 text-sm">
          {breadcrumbs.map((item, index) => (
            <li key={item.href} className="flex items-center">
              {index === 0 && (
                <Home className="h-4 w-4 text-royal-400 mr-1" aria-hidden="true" />
              )}
              
              {index > 0 && (
                <ChevronRight 
                  className="h-4 w-4 text-cream-200/50 mx-2" 
                  aria-hidden="true" 
                />
              )}
              
              {item.current ? (
                <span 
                  className="text-cream-100 font-medium"
                  aria-current="page"
                >
                  {item.label}
                </span>
              ) : (
                <a 
                  href={item.href}
                  className="text-cream-200/70 hover:text-royal-400 transition-colors"
                >
                  {item.label}
                </a>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}