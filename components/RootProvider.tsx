'use client';

import { Suspense } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SitePreferencesProvider from '@/components/providers/SitePreferences';
import I18nProvider from '@/components/providers/I18nProvider';
import ToastProvider from '@/components/providers/ToastProvider';
import BackToTop from '@/components/layout/BackToTop';
import RouteProgressBar from '@/components/layout/RouteProgressBar';

export default function RootProvider({ children }: { children: React.ReactNode }) {
  return (
    <I18nProvider>
      <SitePreferencesProvider>
        <ToastProvider>
          <Suspense fallback={null}>
            <RouteProgressBar />
          </Suspense>
          <Navbar />
          <main id="main-content">{children}</main>
          <Footer />
          <BackToTop />
        </ToastProvider>
      </SitePreferencesProvider>
    </I18nProvider>
  );
}
