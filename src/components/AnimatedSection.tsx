import React from 'react';
import { useInView } from 'react-intersection-observer';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
}

export function AnimatedSection({ children, className = '' }: AnimatedSectionProps) {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
    initialInView: false
  });

  return (
    <div 
      ref={ref} 
      className={`slide-in ${inView ? 'visible' : ''} ${className}`}
    >
      {children}
    </div>
  );
}