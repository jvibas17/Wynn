import { Star, Quote } from 'lucide-react';

interface TestimonialCardProps {
  name: string;
  role: string;
  content: string;
  rating: number;
}

export function TestimonialCard({ name, role, content, rating }: TestimonialCardProps) {
  return (
    <div className="glass-card p-8 rounded-2xl transform hover:scale-105 transition-all duration-300">
      <Quote className="h-8 w-8 text-royal-500/50 mb-4" />
      <p className="text-cream-100 leading-relaxed italic mb-6">"{content}"</p>
      <div className="flex mb-4">
        {[...Array(rating)].map((_, i) => (
          <Star key={i} className="h-5 w-5 text-royal-500 fill-current" />
        ))}
      </div>
      <div>
        <h4 className="text-xl font-serif font-semibold text-white">{name}</h4>
        <p className="text-cream-100 text-sm mt-1">{role}</p>
      </div>
    </div>
  );
}