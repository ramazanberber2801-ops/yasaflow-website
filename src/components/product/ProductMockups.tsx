import {
  Bell,
  CalendarDays,
  CheckCircle2,
  FileText,
  Home,
  LayoutDashboard,
  Megaphone,
  Menu,
  Settings,
  ShieldCheck,
  Users,
} from 'lucide-react';
import type { Locale } from '../../i18n';

const copy = {
  en: {
    owner: 'Owner Dashboard', admin: 'Administrator Dashboard', mobile: 'Mobile App',
    organizations: 'Organizations', modules: 'Active modules', access: 'Access overview', activity: 'Recent activity',
    members: 'Members', activities: 'Activities', news: 'News', documents: 'Documents', push: 'Push notifications', tasks: 'Tasks',
    today: 'Today', next: 'Next activity', latest: 'Latest update', profile: 'Profile', home: 'Home', calendar: 'Calendar', more: 'More',
    ready: 'Ready', configured: 'Configured', review: 'Needs review', draft: 'Draft', published: 'Published',
  },
  nb: {
    owner: 'Eierdashboard', admin: 'Administratordashboard', mobile: 'Mobilapp',
    organizations: 'Organisasjoner', modules: 'Aktive moduler', access: 'Tilgangsoversikt', activity: 'Nylig aktivitet',
    members: 'Medlemmer', activities: 'Aktiviteter', news: 'Nyheter', documents: 'Dokumenter', push: 'Pushvarsler', tasks: 'Oppgaver',
    today: 'I dag', next: 'Neste aktivitet', latest: 'Siste oppdatering', profile: 'Profil', home: 'Hjem', calendar: 'Kalender', more: 'Mer',
    ready: 'Klar', configured: 'Konfigurert', review: 'Må gjennomgås', draft: 'Utkast', published: 'Publisert',
  },
  tr: {
    owner: 'Sahip Paneli', admin: 'Yönetici Paneli', mobile: 'Mobil Uygulama',
    organizations: 'Kuruluşlar', modules: 'Aktif modüller', access: 'Erişim özeti', activity: 'Son etkinlik',
    members: 'Üyeler', activities: 'Etkinlikler', news: 'Haberler', documents: 'Belgeler', push: 'Anlık bildirimler', tasks: 'Görevler',
    today: 'Bugün', next: 'Sonraki etkinlik', latest: 'Son güncelleme', profile: 'Profil', home: 'Ana sayfa', calendar: 'Takvim', more: 'Daha fazla',
    ready: 'Hazır', configured: 'Yapılandırıldı', review: 'İnceleme gerekli', draft: 'Taslak', published: 'Yayınlandı',
  },
} satisfies Record<Locale, Record<string, string>>;

function BrowserFrame({ children }: { children: React.ReactNode }) {
  return <div className="overflow-hidden rounded-[1.6rem] border border-slate-200 bg-white shadow-[0_24px_70px_rgba(15,23,42,.12)]">
    <div className="flex h-10 items-center gap-2 border-b border-slate-100 bg-slate-50 px-4">
      <span className="h-2.5 w-2.5 rounded-full bg-slate-300" /><span className="h-2.5 w-2.5 rounded-full bg-slate-300" /><span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
      <span className="ml-3 h-5 flex-1 rounded-full bg-white" />
    </div>{children}
  </div>;
}

function SideRail() {
  return <aside className="hidden w-14 shrink-0 flex-col items-center gap-4 border-r border-slate-100 bg-[#0F172A] py-4 text-slate-400 sm:flex">
    <span className="grid h-8 w-8 place-items-center rounded-xl bg-[#2185DC] text-xs font-bold text-white">Y</span>
    {[LayoutDashboard, Users, CalendarDays, FileText, Settings].map((Icon, index) => <Icon key={index} size={17} className={index === 0 ? 'text-white' : ''} />)}
  </aside>;
}

function StatusPill({ children, tone = 'blue' }: { children: React.ReactNode; tone?: 'blue' | 'green' | 'amber' }) {
  const style = tone === 'green' ? 'bg-emerald-50 text-emerald-700' : tone === 'amber' ? 'bg-amber-50 text-amber-700' : 'bg-blue-50 text-blue-700';
  return <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${style}`}>{children}</span>;
}

export function OwnerDashboardMockup({ locale }: { locale: Locale }) {
  const t = copy[locale];
  return <BrowserFrame><div className="flex min-h-72"><SideRail /><div className="min-w-0 flex-1 p-4 sm:p-5">
    <div className="flex items-center justify-between"><div><p className="text-[10px] font-semibold uppercase tracking-[.14em] text-[#2185DC]">Yasaflow</p><h3 className="mt-1 text-sm font-semibold text-slate-900">{t.owner}</h3></div><Bell size={17} className="text-slate-400" /></div>
    <div className="mt-5 grid grid-cols-3 gap-2">{[[t.organizations, t.ready], [t.modules, t.configured], [t.access, t.review]].map(([label, state], index) => <div key={label} className="rounded-2xl border border-slate-100 p-3"><p className="text-[10px] text-slate-500">{label}</p><div className="mt-3"><StatusPill tone={index === 2 ? 'amber' : index === 1 ? 'green' : 'blue'}>{state}</StatusPill></div></div>)}</div>
    <div className="mt-3 rounded-2xl bg-slate-50 p-3"><div className="flex items-center justify-between"><p className="text-xs font-semibold">{t.activity}</p><CheckCircle2 size={15} className="text-[#14B8A6]" /></div><div className="mt-3 space-y-2">{[t.modules, t.access, t.organizations].map((item, index) => <div key={item} className="flex items-center gap-3"><span className={`h-2 w-2 rounded-full ${index === 1 ? 'bg-amber-400' : 'bg-[#2185DC]'}`} /><span className="text-[10px] text-slate-600">{item}</span><span className="ml-auto h-1.5 w-12 rounded-full bg-slate-200" /></div>)}</div></div>
  </div></div></BrowserFrame>;
}

export function AdministratorDashboardMockup({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const cards = [[Users, t.members], [CalendarDays, t.activities], [Megaphone, t.news], [FileText, t.documents]] as const;
  return <BrowserFrame><div className="flex min-h-72"><SideRail /><div className="min-w-0 flex-1 p-4 sm:p-5">
    <div className="flex items-center justify-between"><div><p className="text-[10px] font-semibold uppercase tracking-[.14em] text-[#14B8A6]">Yasaflow</p><h3 className="mt-1 text-sm font-semibold">{t.admin}</h3></div><Menu size={17} className="text-slate-400" /></div>
    <div className="mt-5 grid grid-cols-2 gap-2">{cards.map(([Icon, label], index) => <div key={label} className="rounded-2xl border border-slate-100 p-3"><div className="flex items-center gap-2"><span className="grid h-7 w-7 place-items-center rounded-xl bg-[#2185DC]/10 text-[#2185DC]"><Icon size={14} /></span><span className="text-[10px] font-semibold">{label}</span></div><div className="mt-3 h-1.5 rounded-full bg-slate-100"><div className={`h-full rounded-full ${index % 2 ? 'w-2/3 bg-[#14B8A6]' : 'w-1/2 bg-[#2185DC]'}`} /></div></div>)}</div>
    <div className="mt-3 grid grid-cols-[1.2fr_.8fr] gap-2"><div className="rounded-2xl bg-[#0F172A] p-3 text-white"><p className="text-[10px] text-slate-400">{t.push}</p><p className="mt-2 text-xs font-semibold">{t.draft}</p><div className="mt-4 h-1.5 rounded-full bg-white/10"><div className="h-full w-3/5 rounded-full bg-[#14B8A6]" /></div></div><div className="rounded-2xl bg-slate-50 p-3"><p className="text-[10px] text-slate-500">{t.tasks}</p><ShieldCheck className="mt-3 text-[#2185DC]" size={20} /></div></div>
  </div></div></BrowserFrame>;
}

export function MobileAppMockup({ locale }: { locale: Locale }) {
  const t = copy[locale];
  return <div className="mx-auto w-full max-w-[230px] rounded-[2.4rem] border-[7px] border-[#0F172A] bg-white p-3 shadow-[0_24px_70px_rgba(15,23,42,.2)]">
    <div className="mx-auto mb-3 h-1.5 w-14 rounded-full bg-slate-200" />
    <div className="flex items-center justify-between"><div><p className="text-[9px] text-slate-400">{t.today}</p><p className="text-xs font-semibold">Yasaflow</p></div><Bell size={15} className="text-slate-400" /></div>
    <div className="mt-4 rounded-2xl bg-gradient-to-br from-[#2185DC] to-[#14B8A6] p-4 text-white"><p className="text-[9px] text-white/70">{t.next}</p><p className="mt-1 text-xs font-semibold">{t.activities}</p><div className="mt-4 h-1.5 rounded-full bg-white/20"><div className="h-full w-2/3 rounded-full bg-white" /></div></div>
    <div className="mt-3 rounded-2xl border border-slate-100 p-3"><div className="flex items-center gap-2"><Megaphone size={14} className="text-[#2185DC]" /><p className="text-[10px] font-semibold">{t.latest}</p></div><div className="mt-3 space-y-2"><div className="h-1.5 rounded-full bg-slate-100" /><div className="h-1.5 w-4/5 rounded-full bg-slate-100" /></div><div className="mt-3"><StatusPill tone="green">{t.published}</StatusPill></div></div>
    <nav className="mt-4 grid grid-cols-4 gap-1 border-t border-slate-100 pt-3 text-center text-[8px] text-slate-500">{[[Home, t.home], [CalendarDays, t.calendar], [FileText, t.documents], [Users, t.profile]].map(([Icon, label], index) => { const ItemIcon = Icon as typeof Home; return <span key={String(label)} className={index === 0 ? 'text-[#2185DC]' : ''}><ItemIcon className="mx-auto mb-1" size={14} />{label}</span>; })}</nav>
  </div>;
}

export function ProductMockup({ type, locale }: { type: 'owner' | 'admin' | 'mobile'; locale: Locale }) {
  if (type === 'owner') return <OwnerDashboardMockup locale={locale} />;
  if (type === 'admin') return <AdministratorDashboardMockup locale={locale} />;
  return <MobileAppMockup locale={locale} />;
}
