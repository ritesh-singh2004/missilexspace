'use client';

import { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import PageBanner from '@/components/patterns/PageBanner';

const inputClass = 'w-full rounded border border-line bg-white px-4 py-2.5 text-sm text-charcoal outline-none transition focus:border-isroBlue';

const feedbackTypes = ['general', 'bug', 'content', 'suggestion'] as const;

export default function FeedbackPageContent() {
  const { t } = useTranslation(['pages', 'forms']);

  const feedbackSchema = z.object({
    name: z.string().min(2, t('forms:validation.nameRequired')),
    email: z.string().email(t('forms:validation.emailRequired')),
    type: z.enum(feedbackTypes),
    message: z.string().min(20, t('forms:validation.messageRequired'))
  });

  type FeedbackFormValues = z.infer<typeof feedbackSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<FeedbackFormValues>({ resolver: zodResolver(feedbackSchema), defaultValues: { type: 'general' } });

  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const onSubmit = async (data: FeedbackFormValues) => {
    setStatus('idle');
    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error('Network response was not ok');
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  return (
    <main className="bg-white">
      <PageBanner eyebrow={t('pages:feedback.eyebrow')} title={t('pages:feedback.title')} description={t('pages:feedback.description')} />
      <div className="mx-auto max-w-2xl px-6 py-16 sm:px-8 xl:px-12">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="space-y-2 text-sm">
              <span className="text-steel">{t('forms:fields.name')}</span>
              <input {...register('name')} className={inputClass} />
              <p className="text-xs text-red-600">{errors.name?.message}</p>
            </label>
            <label className="space-y-2 text-sm">
              <span className="text-steel">{t('forms:fields.email')}</span>
              <input {...register('email')} className={inputClass} />
              <p className="text-xs text-red-600">{errors.email?.message}</p>
            </label>
          </div>

          <label className="space-y-2 text-sm">
            <span className="text-steel">{t('pages:feedback.typeLabel')}</span>
            <select {...register('type')} className={inputClass}>
              {feedbackTypes.map((type) => (
                <option key={type} value={type}>
                  {t(`pages:feedback.types.${type}`)}
                </option>
              ))}
            </select>
          </label>

          <label className="space-y-2 text-sm">
            <span className="text-steel">{t('forms:fields.message')}</span>
            <textarea {...register('message')} rows={6} className={inputClass} />
            <p className="text-xs text-red-600">{errors.message?.message}</p>
          </label>

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center justify-center rounded bg-isroBlue px-6 py-3 text-sm font-semibold text-white transition hover:bg-isroBlueDark disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? t('forms:buttons.sending') : t('forms:buttons.sendMessage')}
          </button>

          {status === 'success' && (
            <div className="mt-4 border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
              <p>{t('pages:feedback.success')}</p>
              <p className="mt-1 text-xs text-emerald-600">{t('pages:feedback.successNote')}</p>
            </div>
          )}
          {status === 'error' && (
            <p className="mt-4 border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{t('forms:status.genericError')}</p>
          )}
        </form>
      </div>
    </main>
  );
}
