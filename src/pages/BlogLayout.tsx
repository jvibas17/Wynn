import { Crown } from 'lucide-react';

interface BlogLayoutProps {
  title: string;
  description: string;
  children: React.ReactNode;
  publishDate?: string;
  readTime?: string;
}

export function BlogLayout({ title, description, children, publishDate = 'May 2026', readTime = '5 min read' }: BlogLayoutProps) {
  const scrollToContact = () => {
    window.location.href = '/#contact';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950 text-white">
      {/* Nav */}
      <nav className="fixed w-full z-50 bg-navy-950/95 backdrop-blur-md border-b border-royal-500/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <a href="/" className="flex items-center gap-3 group">
              <span className="w-px h-7 bg-royal-500/60 group-hover:bg-royal-500 transition-colors" />
              <div className="flex flex-col leading-none">
                <span className="font-serif italic text-white text-xl leading-none tracking-wide group-hover:text-royal-300 transition-colors">Wynn</span>
                <span className="text-[0.45rem] tracking-[0.32em] uppercase text-cream-100/30 mt-1">Rewards</span>
              </div>
            </a>
            <a
              href="/#contact"
              onClick={(e) => { e.preventDefault(); scrollToContact(); }}
              className="group flex items-center gap-2.5 border border-royal-500/35 hover:border-royal-500/70 px-4 py-2 transition-all duration-300 hover:bg-royal-500/5"
            >
              <span className="text-[0.65rem] tracking-[0.18em] uppercase text-royal-400/70 group-hover:text-royal-300">Contact Winnie Lee</span>
              <span className="text-royal-400/50 group-hover:text-royal-300 text-xs">→</span>
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <div className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-royal-500/5 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl relative">
          <a href="/" className="inline-flex items-center gap-2 text-royal-400/60 hover:text-royal-400 text-xs tracking-[0.15em] uppercase mb-8 transition-colors">
            ← Back to Vegas VIP Host
          </a>
          <div className="flex items-center gap-3 mb-6">
            <Crown className="h-5 w-5 text-royal-500" />
            <span className="text-[0.6rem] tracking-[0.28em] uppercase text-royal-400/60">Wynn VIP Guide</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">{title}</h1>
          <p className="text-cream-100/70 text-lg sm:text-xl leading-relaxed mb-8">{description}</p>
          <div className="flex items-center gap-4 text-xs tracking-[0.15em] uppercase text-cream-200/40">
            <span>{publishDate}</span>
            <span className="text-royal-500/30">✦</span>
            <span>{readTime}</span>
            <span className="text-royal-500/30">✦</span>
            <span>Winnie Lee · Wynn VIP Host</span>
          </div>
        </div>
      </div>

      {/* Thin divider */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
        <div className="h-px bg-gradient-to-r from-transparent via-royal-500/30 to-transparent mb-12" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl pb-24">
        <div className="prose-wynn">
          {children}
        </div>
      </div>

      {/* CTA */}
      <div className="border-t border-royal-500/10 py-16 sm:py-24 bg-navy-950/80">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl text-center">
          <p className="text-[0.6rem] tracking-[0.28em] uppercase text-royal-400/50 mb-4">Ready to experience it?</p>
          <h2 className="font-serif italic text-3xl sm:text-4xl text-white mb-6">Contact Winnie Lee Directly</h2>
          <p className="text-cream-100/60 mb-8 max-w-lg mx-auto">Winnie Lee is fluent in English, Mandarin, Taiwanese, and Japanese. Reach out to start planning your VIP Las Vegas experience.</p>
          <a
            href="/#contact"
            className="inline-flex items-center gap-3 border border-royal-500/50 hover:border-royal-500 px-8 py-4 text-sm tracking-[0.15em] uppercase text-royal-400 hover:text-white transition-all duration-300 hover:bg-royal-500/10"
          >
            Begin Your VIP Journey →
          </a>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-navy-950 py-8 border-t border-royal-500/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-cream-200/30 tracking-wider">
          <span>© 2026 Wynn Rewards VIP Services · Winnie Lee</span>
          <a href="/" className="hover:text-royal-400 transition-colors uppercase tracking-[0.15em]">← Back to Home</a>
        </div>
      </footer>
    </div>
  );
}
