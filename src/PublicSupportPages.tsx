import { useState, type FormEvent } from 'react';
import { CheckCircle2, Lightbulb, Mail, MessageSquareMore } from 'lucide-react';
import { LanguageSelector, type Locale } from './i18n';
import { supabase } from './lib/supabase';

type PageType = 'about' | 'contact' | 'feedback';

type Copy = {
  back: string; aboutTitle: string; aboutIntro: string; aboutBody: string[];
  contactTitle: string; contactIntro: string; response: string;
  feedbackTitle: string; feedbackIntro: string; name: string; email: string;
  category: string; message: string; idea: string; bug: string; feature: string;
  other: string; send: string; sending: string; success: string; error: string;
};

const copy: Record<Locale, Copy> = {
  en: {
    back: 'Back to home', aboutTitle: 'About Yasaflow', aboutIntro: 'A calm digital home for organizations, communities and members.',
    aboutBody: ['Yasaflow helps associations, clubs, faith communities, volunteer organizations and other member-based groups manage members, activities, communication, donations and administration in one place.','The platform is developed with clarity, accessibility and responsible access at its core. We improve Yasaflow continuously based on feedback from the organizations that use it.'],
    contactTitle: 'Contact Yasaflow', contactIntro: 'Questions about the product, subscriptions, billing or technical support are welcome.', response: 'We normally reply within one business day.',
    feedbackTitle: 'Help us improve Yasaflow', feedbackIntro: 'Have an idea, found a problem or need a feature? We read every submission.',
    name: 'Name', email: 'Email', category: 'Category', message: 'Describe your feedback', idea: 'Idea', bug: 'Bug', feature: 'Feature request', other: 'Other',
    send: 'Send feedback', sending: 'Sending…', success: 'Thank you. Your feedback has been received.', error: 'We could not send your feedback. Please email hello@yasaflow.com.',
  },
  nb: {
    back: 'Tilbake til forsiden', aboutTitle: 'Om Yasaflow', aboutIntro: 'Et oversiktlig digitalt hjem for organisasjoner, fellesskap og medlemmer.',
    aboutBody: ['Yasaflow hjelper foreninger, klubber, tros- og livssynssamfunn, frivillige organisasjoner og andre medlemsbaserte fellesskap med å håndtere medlemmer, aktiviteter, kommunikasjon, donasjoner og administrasjon på ett sted.','Plattformen utvikles med tydelighet, tilgjengelighet og ansvarlig tilgang som grunnprinsipper. Vi forbedrer Yasaflow kontinuerlig basert på tilbakemeldinger fra organisasjonene som bruker løsningen.'],
    contactTitle: 'Kontakt Yasaflow', contactIntro: 'Du er velkommen til å kontakte oss om produktet, abonnement, fakturering eller teknisk hjelp.', response: 'Vi svarer normalt innen én virkedag.',
    feedbackTitle: 'Hjelp oss å forbedre Yasaflow', feedbackIntro: 'Har du en idé, funnet en feil eller savner en funksjon? Vi leser alle innspill.',
    name: 'Navn', email: 'E-post', category: 'Kategori', message: 'Beskriv tilbakemeldingen', idea: 'Idé', bug: 'Feil', feature: 'Funksjonsønske', other: 'Annet',
    send: 'Send tilbakemelding', sending: 'Sender…', success: 'Takk. Tilbakemeldingen din er mottatt.', error: 'Vi kunne ikke sende tilbakemeldingen. Send gjerne e-post til hello@yasaflow.com.',
  },
  tr: {
    back: 'Ana sayfaya dön', aboutTitle: 'Yasaflow hakkında', aboutIntro: 'Kurumlar, topluluklar ve üyeler için sade bir dijital merkez.',
    aboutBody: ['Yasaflow; derneklerin, kulüplerin, inanç topluluklarının, gönüllü kuruluşların ve diğer üye tabanlı toplulukların üyeleri, etkinlikleri, iletişimi, bağışları ve yönetimi tek yerde yürütmesine yardımcı olur.','Platform; netlik, erişilebilirlik ve sorumlu erişim ilkeleriyle geliştirilir. Yasaflow’u kullanan kurumların geri bildirimleri doğrultusunda sürekli iyileştiriyoruz.'],
    contactTitle: 'Yasaflow ile iletişim', contactIntro: 'Ürün, abonelik, faturalandırma veya teknik destek hakkında bize ulaşabilirsiniz.', response: 'Normalde bir iş günü içinde yanıt veririz.',
    feedbackTitle: 'Yasaflow’u geliştirmemize yardımcı olun', feedbackIntro: 'Bir fikriniz mi var, hata mı buldunuz veya yeni bir özelliğe mi ihtiyacınız var? Tüm iletileri okuyoruz.',
    name: 'Ad', email: 'E-posta', category: 'Kategori', message: 'Geri bildiriminizi açıklayın', idea: 'Fikir', bug: 'Hata', feature: 'Özellik talebi', other: 'Diğer',
    send: 'Geri bildirim gönder', sending: 'Gönderiliyor…', success: 'Teşekkürler. Geri bildiriminiz alındı.', error: 'Geri bildirim gönderilemedi. Lütfen hello@yasaflow.com adresine e-posta gönderin.',
  },
};

export default function PublicSupportPage({ type, locale }: { type: PageType; locale: Locale }) {
  const t = copy[locale];
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  async function submitFeedback(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!supabase || status === 'sending') return;
    const form = event.currentTarget;
    const data = new FormData(form);
    setStatus('sending');
    const { error } = await supabase.functions.invoke('submit-public-feedback', {
      body: {
        name: String(data.get('name') ?? '').trim(),
        email: String(data.get('email') ?? '').trim(),
        category: String(data.get('category') ?? 'other'),
        message: String(data.get('message') ?? '').trim(),
        website: String(data.get('website') ?? ''),
        locale,
      },
    });
    if (error) { console.error(error); setStatus('error'); return; }
    form.reset();
    setStatus('success');
  }

  return <div className="min-h-screen bg-slate-50 text-slate-950">
    <header className="border-b border-slate-200 bg-white"><div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-5"><a href="/" className="font-semibold text-[#2185DC]">Yasaflow</a><LanguageSelector /></div></header>
    <main className="mx-auto max-w-3xl px-5 py-16 sm:py-24">
      <a href="/" className="text-sm font-semibold text-[#2185DC]">← {t.back}</a>
      {type === 'about' && <section className="mt-10 rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm sm:p-10"><Lightbulb className="text-[#2185DC]" /><h1 className="mt-5 text-4xl font-semibold tracking-[-.04em]">{t.aboutTitle}</h1><p className="mt-5 text-xl leading-8 text-slate-600">{t.aboutIntro}</p><div className="mt-8 space-y-5 text-base leading-8 text-slate-700">{t.aboutBody.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div></section>}
      {type === 'contact' && <section className="mt-10 rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm sm:p-10"><Mail className="text-[#2185DC]" /><h1 className="mt-5 text-4xl font-semibold tracking-[-.04em]">{t.contactTitle}</h1><p className="mt-5 text-lg leading-8 text-slate-600">{t.contactIntro}</p><a className="mt-8 inline-flex rounded-2xl bg-[#2185DC] px-5 py-3 font-semibold text-white" href="mailto:hello@yasaflow.com">hello@yasaflow.com</a><p className="mt-5 text-sm text-slate-500">{t.response}</p></section>}
      {type === 'feedback' && <section className="mt-10 rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm sm:p-10"><MessageSquareMore className="text-[#2185DC]" /><h1 className="mt-5 text-4xl font-semibold tracking-[-.04em]">{t.feedbackTitle}</h1><p className="mt-5 text-lg leading-8 text-slate-600">{t.feedbackIntro}</p><form onSubmit={submitFeedback} className="mt-9 space-y-5"><input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" /><label className="block text-sm font-semibold">{t.name}<input name="name" required maxLength={120} className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 font-normal outline-none focus:border-[#2185DC]" /></label><label className="block text-sm font-semibold">{t.email}<input name="email" type="email" required maxLength={254} className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 font-normal outline-none focus:border-[#2185DC]" /></label><label className="block text-sm font-semibold">{t.category}<select name="category" className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 font-normal"><option value="idea">{t.idea}</option><option value="bug">{t.bug}</option><option value="feature">{t.feature}</option><option value="other">{t.other}</option></select></label><label className="block text-sm font-semibold">{t.message}<textarea name="message" required minLength={10} maxLength={4000} rows={7} className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 font-normal outline-none focus:border-[#2185DC]" /></label><button disabled={status === 'sending' || !supabase} className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-[#2185DC] px-6 font-semibold text-white disabled:opacity-60">{status === 'sending' ? t.sending : t.send}</button>{status === 'success' && <p className="flex items-center gap-2 text-sm font-medium text-emerald-700"><CheckCircle2 size={18} />{t.success}</p>}{status === 'error' && <p role="alert" className="text-sm font-medium text-red-700">{t.error}</p>}</form></section>}
    </main>
  </div>;
}
