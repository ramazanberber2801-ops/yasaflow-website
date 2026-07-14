import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import SiteRouter from './SiteRouter';
import { I18nProvider, useI18n } from './i18n';
import { usePageMetadata } from './seo';

const pendingOnboardingKey = 'yasaflow.pending-onboarding.v1';

function routeAuthCallbackToOnboarding() {
  const path = window.location.pathname.replace(/\/$/, '') || '/';
  if (path !== '/' || !window.localStorage.getItem(pendingOnboardingKey)) return;

  const hash = new URLSearchParams(window.location.hash.replace(/^#/, ''));
  const isSupabaseCallback = hash.has('access_token') || hash.has('refresh_token') || hash.has('error_code') || hash.has('type');
  if (!isSupabaseCallback) return;

  window.history.replaceState(null, '', `/get-started${window.location.search}${window.location.hash}`);
}

routeAuthCallbackToOnboarding();

function SeoRouter() {
  const { locale } = useI18n();
  const path = window.location.pathname.replace(/\/$/, '') || '/';
  usePageMetadata(path, locale);
  return <SiteRouter />;
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <I18nProvider>
      <SeoRouter />
    </I18nProvider>
  </StrictMode>,
);