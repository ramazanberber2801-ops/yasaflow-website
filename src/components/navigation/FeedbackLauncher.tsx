import { Lightbulb } from 'lucide-react';
import type { Locale } from '../../i18n';

const labels: Record<Locale, string> = {
  en: 'Share an idea',
  nb: 'Har du en idé?',
  tr: 'Bir fikriniz mi var?',
};

export function FeedbackLauncher({ locale }: { locale: Locale }) {
  const label = labels[locale];
  return <a href="/feedback" aria-label={label} title={label} className="fixed bottom-5 right-5 z-50 inline-flex min-h-12 items-center gap-2 rounded-full bg-[#2185DC] px-5 text-sm font-semibold text-white shadow-[0_14px_35px_rgba(33,133,220,.35)] transition hover:-translate-y-0.5 hover:bg-[#1877c8] focus:outline-none focus:ring-4 focus:ring-[#2185DC]/25"><Lightbulb size={18} />{label}</a>;
}
