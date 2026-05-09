import React from 'react';

interface StatCardProps {
  number: string;
  text: string;
}

export function StatCard({ number, text }: StatCardProps) {
  return (
    <div className="glass-card p-6 sm:p-8 md:p-10 lg:p-12 xl:p-16 rounded-2xl transform hover:scale-105 transition-all duration-300">
      <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-royal-500 mb-3 sm:mb-4 md:mb-6 font-serif">{number}</div>
      <div className="text-cream-100 uppercase tracking-wider text-base sm:text-lg md:text-xl lg:text-2xl">{text}</div>
    </div>
  );
}
