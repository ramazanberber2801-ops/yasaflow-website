import type { MouseEvent } from 'react';
import ModuleLibrary from './ModuleLibrary';
import { ModuleMetadata } from './ModuleMetadata';
import PublicRouter from './PublicRouter';
import { useI18n } from './i18n';

const productLabels = new Set(['Products', 'Produkter', 'Ürünler']);

export default function SiteRouter() {
  const { locale } = useI18n();
  const path = window.location.pathname.replace(/\/$/, '') || '/';

  if (path === '/modules') return <><ModuleMetadata locale={locale} /><ModuleLibrary /></>;

  function handleProductNavigation(event: MouseEvent<HTMLDivElement>) {
    if (path !== '/') return;
    const anchor = (event.target as HTMLElement).closest('a');
    const label = anchor?.textContent?.trim();
    if (!label || !productLabels.has(label)) return;
    event.preventDefault();
    window.location.assign('/modules');
  }

  return <div lang={locale === 'nb' ? 'nb-NO' : locale} onClickCapture={handleProductNavigation}><PublicRouter /></div>;
}
