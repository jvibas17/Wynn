import React from 'react';
import { ChevronRight } from 'lucide-react';

interface CTAButtonProps {
  text: string;
  onClick?: () => void;
  variant?: 'primary' | 'outline';
  className?: string;
  showArrow?: boolean;
  href?: string;
}

export function CTAButton({ 
  text, 
  onClick, 
  variant = 'primary', 
  className = '',
  showArrow = false,
  href
}: CTAButtonProps) {
  const baseClass = variant === 'primary' ? 'cta-button' : 'cta-button-outline';
  
  const handleClick = (e: React.MouseEvent) => {
    if (href) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    onClick?.();
  };
  
  return (
    <button 
      onClick={handleClick} 
      className={`${baseClass} ${className} group min-h-[3rem] sm:min-h-[3.5rem] lg:min-h-[4rem]`}
    >
      <span className="text-base sm:text-lg lg:text-xl">{text}</span>
      {showArrow && (
        <ChevronRight className="ml-2 sm:ml-3 h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7 transform group-hover:translate-x-1 transition-transform" />
      )}
    </button>
  );
}