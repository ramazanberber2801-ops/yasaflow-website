import { useLayoutEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import type { Locale } from '../../i18n';
import { ProductMockup } from './ProductMockups';

const previewTitles: Record<Locale, string> = {
  en: 'One platform. Three focused views.',
  nb: 'Én plattform. Tre fokuserte visninger.',
  tr: 'Tek platform. Üç odaklı görünüm.',
};

const labels: Record<Locale, [string, string, string]> = {
  en: ['Owner Dashboard', 'Administrator Dashboard', 'Mobile App'],
  nb: ['Eierdashboard', 'Administratordashboard', 'Mobilapp'],
  tr: ['Sahip paneli', 'Yönetici paneli', 'Mobil uygulama'],
};

export function ProductPreviewEnhancer({ locale }: { locale: Locale }) {
  const [target, setTarget] = useState<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const heading = Array.from(document.querySelectorAll('h2')).find((node) => node.textContent?.trim() === previewTitles[locale]);
    const grid = heading?.parentElement?.querySelector<HTMLElement>('.mt-14.grid');
    if (!grid) return;
    grid.replaceChildren();
    grid.className = 'mt-14 grid items-start gap-6 lg:grid-cols-3';
    setTarget(grid);
    return () => setTarget(null);
  }, [locale]);

  if (!target) return null;

  const types = ['owner', 'admin', 'mobile'] as const;
  return createPortal(
    <>{types.map((type, index) => <article key={type} className="rounded-[2rem] border border-slate-200 bg-white p-4 text-left shadow-[0_16px_50px_rgba(15,23,42,.06)]">
      <div className="flex min-h-[19rem] items-center justify-center rounded-[1.5rem] bg-gradient-to-b from-slate-50 to-white p-3 sm:p-5">
        <ProductMockup type={type} locale={locale} />
      </div>
      <h3 className="px-3 pb-3 pt-6 text-lg font-semibold text-slate-950">{labels[locale][index]}</h3>
    </article>)}</>,
    target,
  );
}
