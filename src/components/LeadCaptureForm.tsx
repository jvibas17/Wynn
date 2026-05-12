import React, { useState, useRef, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { CTAButton } from './CTAButton';
import { useLanguage } from '../contexts/LanguageContext';

export function LeadCaptureForm() {
  const { t } = useLanguage();
  const form = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    emailjs.init("CoRTPrMWNM5iX2ws4");
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Prevent multiple submissions
    if (isSubmitting) {
      console.log('=== ALREADY SUBMITTING, IGNORING ===');
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus('idle');

    console.log('=== FORM SUBMISSION START ===');
    console.log('Form data:', { name: formData.name, email: formData.email, phone: formData.phone });

    try {
      if (!form.current) {
        throw new Error('Form reference is not available');
      }

      console.log('=== SENDING ADMIN EMAIL TO WINNIE ===');
      const adminTemplateParams = {
        to_name: 'Winnie Lee',
        to_email: 'lovepicaso888@gmail.com',
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
      };
      console.log('Admin template params:', adminTemplateParams);

      const adminResponse = await emailjs.send(
        'service_7p441ia',
        'template_vitqt4j',
        adminTemplateParams,
        'CoRTPrMWNM5iX2ws4'
      );
      console.log('Admin email response:', adminResponse);

      if (adminResponse.status !== 200) {
        throw new Error(`EmailJS returned status ${adminResponse.status}`);
      }

      // Admin email succeeded — mark success immediately
      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '' });

      // Auto-reply is best-effort; failures don't affect the success state
      try {
        console.log('=== SENDING SINGLE AUTO-REPLY ===');
        const guestTemplateParams = {
          guest_name: formData.name,
          to_name: formData.name,
          guest_email: formData.email,
          from_name: 'Wynn VIP Services Team',
          reply_to: 'lovepicaso888@gmail.com',
          to_email: formData.email
        };
        const autoReplyResponse = await emailjs.send(
          'service_7p441ia',
          'template_w1f93hz',
          guestTemplateParams,
          'CoRTPrMWNM5iX2ws4'
        );
        console.log('Auto-reply response:', autoReplyResponse);
      } catch (autoReplyError) {
        console.warn('Auto-reply failed (non-critical):', autoReplyError);
      }

      console.log('=== ALL EMAILS SENT SUCCESSFULLY ===');
    } catch (error) {
      console.error('Error sending email:', error);
      console.log('=== EMAIL SENDING FAILED ===');
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form ref={form} onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
      <div>
        <input
          type="text"
          name="from_name"
          placeholder={t('contact.form.name')}
          className="input-field text-lg sm:text-xl py-4 sm:py-5"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>
      <div>
        <input
          type="email"
          name="from_email"
          placeholder={t('contact.form.email')}
          className="input-field text-lg sm:text-xl py-4 sm:py-5"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
      </div>
      <div>
        <input
          type="tel"
          name="phone"
          placeholder={t('contact.form.phone')}
          className="input-field text-lg sm:text-xl py-4 sm:py-5"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          required
        />
      </div>
      <CTAButton 
        text={isSubmitting ? t('contact.form.sending') : t('contact.form.submit')} 
        className="w-full text-lg sm:text-xl py-5 sm:py-6" 
        showArrow={!isSubmitting}
      />
      
      {submitStatus === 'success' && (
        <div className="p-4 sm:p-6 bg-green-500/10 border border-green-500/20 rounded-lg text-green-400 text-base sm:text-lg">
          {t('contact.form.success')}
        </div>
      )}
      
      {submitStatus === 'error' && (
        <div className="p-4 sm:p-6 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-base sm:text-lg">
          {t('contact.form.error')}
        </div>
      )}
    </form>
  );
}