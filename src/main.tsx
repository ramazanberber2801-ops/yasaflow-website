import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import PublicRouter from './PublicRouter';
import { I18nProvider } from './i18n';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <I18nProvider>
      <PublicRouter />
    </I18nProvider>
  </StrictMode>,
);
