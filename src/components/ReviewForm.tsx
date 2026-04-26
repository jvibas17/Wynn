import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { CTAButton } from './CTAButton';
import { useLanguage } from '../contexts/LanguageContext';

interface ReviewFormProps {
  onSubmit: (review: {
    name: string;
    role: string;
    content: string;
    rating: number;
  }) => void;
  onClose: () => void;
}

export function ReviewForm({ onSubmit, onClose }: ReviewFormProps) {
  const { t } = useLanguage();
  const [rating, setRating] = useState(5);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    content: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ ...formData, rating });
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-white mb-2">{t('reviews.form.name')}</label>
        <input
          type="text"
          className="input-field"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>
      <div>
        <label className="block text-white mb-2">{t('reviews.form.role')}</label>
        <input
          type="text"
          className="input-field"
          value={formData.role}
          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          required
        />
      </div>
      <div>
        <label className="block text-white mb-2">{t('reviews.form.rating')}</label>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setRating(value)}
              className="focus:outline-none"
            >
              <Star
                className={`h-8 w-8 ${
                  value <= rating ? 'text-royal-500 fill-current' : 'text-gray-400'
                }`}
              />
            </button>
          ))}
        </div>
      </div>
      <div>
        <label className="block text-white mb-2">{t('reviews.form.review')}</label>
        <textarea
          className="input-field min-h-[120px]"
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          required
        />
      </div>
      <div className="flex gap-4">
        <CTAButton text={t('reviews.form.submit')} className="flex-1" />
        <button
          type="button"
          onClick={onClose}
          className="px-6 py-3 rounded-lg border-2 border-gray-500 text-gray-300 hover:bg-gray-500/10"
        >
          {t('reviews.form.cancel')}
        </button>
      </div>
    </form>
  );
}