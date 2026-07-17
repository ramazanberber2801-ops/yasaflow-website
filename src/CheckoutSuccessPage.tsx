import { CheckCircle2 } from 'lucide-react';
import { Logo } from './components/branding/Logo';
import { LanguageSelector, useI18n, type Locale } from './i18n';

const copy: Record<Locale, { title:string; body:string; login:string; home:string }> = {
  en: { title:'Payment received', body:'Your subscription is being connected to the organization. Your dashboard is ready for your first sign-in.', login:'Go to sign in', home:'Back to home' },
  nb: { title:'Betalingen er mottatt', body:'Abonnementet kobles nå til organisasjonen. Dashboardet er klart for første innlogging.', login:'Gå til innlogging', home:'Tilbake til forsiden' },
  tr: { title:'Ödeme alındı', body:'Aboneliğiniz kurumunuza bağlanıyor. Paneliniz ilk girişiniz için hazır.', login:'Giriş sayfasına git', home:'Ana sayfaya dön' },
};

export default function CheckoutSuccessPage() {
  const { locale } = useI18n();
  const t = copy[locale];
  return <main className="min-h-screen bg-slate-50 px-5 py-10 text-slate-950 sm:px-8"><div className="mx-auto max-w-3xl"><header className="flex items-center justify-between"><a href="/"><Logo /></a><LanguageSelector compact /></header><section className="mt-20 rounded-[2rem] border border-slate-200 bg-white p-8 text-center shadow-sm sm:p-12"><CheckCircle2 className="mx-auto text-emerald-500" size={64}/><h1 className="mt-6 text-4xl font-semibold tracking-[-.04em]">{t.title}</h1><p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-slate-600">{t.body}</p><div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row"><a href="/login" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#2185DC] px-6 font-semibold text-white">{t.login}</a><a href="/" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-200 px-6 font-semibold">{t.home}</a></div></section></div></main>;
}
