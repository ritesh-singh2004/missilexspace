'use client';

import { Building2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import SectionHeading from '@/components/patterns/SectionHeading';
import { partnerCategories } from '@/lib/site-data';

export default function PartnerOrganizations() {
  const { t } = useTranslation('home');

  return (
    <section className="border-t border-line bg-mist py-16">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 xl:px-12">
        <SectionHeading eyebrow={t('partners.eyebrow')} title={t('partners.title')} description={t('partners.description')} />
        <div className="mt-8 grid grid-cols-1 gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {partnerCategories.map((partner) => (
            <div key={partner.title} className="flex flex-col gap-3 bg-white p-6">
              <div className="flex items-center justify-between">
                <Building2 className="h-5 w-5 text-isroBlue" />
                <p className="text-2xl font-semibold text-isroBlue">{partner.count}</p>
              </div>
              <p className="text-sm font-semibold leading-5 text-charcoal">{partner.title}</p>
              <p className="text-xs leading-5 text-steel">{partner.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
