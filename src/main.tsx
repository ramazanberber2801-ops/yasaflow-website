import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import PublicRouter from './PublicRouter';
import { I18nProvider, useI18n } from './i18n';
import { usePageMetadata } from './seo';

function SeoRouter() {
  const { locale } = useI18n();
  const path = window.location.pathname.replace(/\/$/, '') || '/';
  usePageMetadata(path, locale);
  return <PublicRouter />;
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <I18nProvider>
      <SeoRouter />
    </I18nProvider>
  </StrictMode>,
);
