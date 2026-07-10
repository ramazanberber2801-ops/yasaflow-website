import {
  ArrowRight,
  Bell,
  CalendarDays,
  Check,
  ChevronDown,
  Church,
  CircleDollarSign,
  ClipboardList,
  FileText,
  Heart,
  Landmark,
  Menu,
  MessageCircle,
  Newspaper,
  Palette,
  Settings,
  ShieldCheck,
  Trophy,
  Users,
  X,
} from 'lucide-react';
import { useState, type ComponentType, type ReactNode } from 'react';
import { Logo } from './components/branding/Logo';

type Icon = ComponentType<{ className?: string; size?: number; strokeWidth?: number }>;
type LinkItem = { label: string; href: string };

const navigation: LinkItem[] = [
  { label: 'Products', href: '#products' },
  { label: 'Solutions', href: '#solutions' },
  { label: 'Pricing', href: '#contact' },
  { label: 'About', href: '#how-it-works' },
  { label: 'Contact', href: '#contact' },
];

const organizations: { icon: Icon; title: string; text: string }[] = [
  { icon: Heart, title: 'Frivillige organisasjoner', text: 'Bring engagement, activities and communication together in one calm workspace.' },
  { icon: Users, title: 'Foreninger', text: 'Make membership, documents and day-to-day administration easier to manage.' },
  { icon: Trophy, title: 'Idrettslag', text: 'Coordinate teams, activities, volunteers and updates without fragmented tools.' },
  { icon: Church, title: 'Kirker', text: 'Create connection through news, calendars, events and trusted communication.' },
  { icon: Palette, title: 'Kulturorganisasjoner', text: 'Plan programmes, involve members and keep everyone informed.' },
  { icon: Landmark, title: 'Moskeer', text: 'Bring information, activities, donations and community into one digital home.' },
  { icon: ClipboardList, title: 'Studentforeninger', text: 'Give new and existing members one clear place to participate.' },
  { icon: ShieldCheck, title: 'Trossamfunn', text: 'A professional foundation for operations, information and long-term membership work.' },
];

const features: { icon: Icon; title: string; text: string }[] = [
  { icon: Newspaper, title: 'News', text: 'Publish clear updates for everyone or selected groups.' },
  { icon: CalendarDays, title: 'Activities', text: 'Plan events and make participation easy to understand.' },
  { icon: Users, title: 'Members', text: 'Keep member information organised and accessible.' },
  { icon: Bell, title: 'Push Notifications', text: 'Reach people with important updates at the right time.' },
  { icon: CircleDollarSign, title: 'Donations', text: 'Make it simple to support the organisation digitally.' },
  { icon: FileText, title: 'Documents', text: 'Keep policies, minutes and important files in one place.' },
  { icon: CalendarDays, title: 'Calendar', text: 'Give everyone one current view of what is happening.' },
  { icon: MessageCircle, title: 'Chat', text: 'Create direct, structured communication around the work.' },
  { icon: ShieldCheck, title: 'Administration', text: 'Give the right people control without unnecessary complexity.' },
  { icon: Settings, title: 'Settings', text: 'Adapt modules, roles and the experience to your organisation.' },
];

const workflow = [
  ['Create organization', 'Set the foundation for your digital organization.'],
  ['Invite administrator', 'Give the right person secure responsibility.'],
  ['Choose modules', 'Activate only what your community needs.'],
  ['Launch', 'Welcome members into a clear, professional experience.'],
] as const;

function Button({ children, href = '#contact', secondary = false }: { children: ReactNode; href?: string; secondary?: boolean }) {
  return (
    <a
      href={href}
      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl px-5 text-sm font-semibold transition focus:outline-none focus:ring-4 focus:ring-[#2185DC]/20 ${
        secondary
          ? 'border border-slate-200 bg-white text-slate-900 hover:border-slate-300 hover:bg-slate-50'
          : 'bg-[#2185DC] text-white shadow-[0_12px_30px_rgba(33,133,220,.24)] hover:bg-[#1877c8]'
      }`}
    >
      {children}
    </a>
  );
}

function ProductMockup() {
  const labels = ['Activities', 'News', 'Members'];

  return (
    <div className="relative mx-auto w-full max-w-[620px]" aria-label="Yasaflow product interface preview">
      <div className="absolute -inset-8 rounded-[3rem] bg-[#2185DC]/10 blur-3xl" />
      <div className="relative overflow-hidden rounded-[2rem] border border-white/70 bg-white p-3 shadow-[0_30px_80px_rgba(15,23,42,.16)]">
        <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4 sm:p-6">
          <div className="flex items-center justify-between gap-4">
            <Logo />
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">Organization ready</span>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-[.72fr_1.28fr]">
            <aside className="rounded-2xl bg-[#0F172A] p-4 text-white">
              <p className="text-xs text-slate-400">Overview</p>
              <p className="mt-2 text-2xl font-semibold">Welcome</p>
              <div className="mt-8 space-y-3">
                {['News', 'Activities', 'Members', 'Donations'].map((item, index) => (
                  <div key={item} className={`rounded-xl px-3 py-2 text-sm ${index === 0 ? 'bg-white/10' : 'text-slate-400'}`}>
                    {item}
                  </div>
                ))}
              </div>
            </aside>
            <div className="space-y-3">
              <div className="rounded-2xl bg-white p-4 shadow-sm">
                <p className="text-xs font-medium text-slate-500">Your workspace</p>
                <div className="mt-3 grid grid-cols-3 gap-2">
                  {labels.map((item) => (
                    <div key={item} className="rounded-xl bg-slate-50 p-3 text-center text-xs font-semibold text-slate-700">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl bg-white p-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <p className="font-semibold">Latest activity</p>
                  <span className="text-xs text-[#2185DC]">View all</span>
                </div>
                <div className="mt-4 space-y-3">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <span className="h-10 w-10 rounded-xl bg-[#2185DC]/10" />
                      <div className="flex-1">
                        <div className="h-2.5 w-3/4 rounded bg-slate-200" />
                        <div className="mt-2 h-2 w-1/2 rounded bg-slate-100" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="overflow-hidden bg-white text-slate-950">
      <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/85 backdrop-blur-xl">
        <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 sm:px-8">
          <a href="#top" aria-label="Yasaflow home"><Logo /></a>
          <nav className="hidden items-center gap-7 lg:flex" aria-label="Main navigation">
            {navigation.map((item) => <a className="text-sm font-medium text-slate-600 hover:text-slate-950" href={item.href} key={item.label}>{item.label}</a>)}
          </nav>
          <div className="hidden items-center gap-3 lg:flex">
            <a href="#contact" className="px-3 text-sm font-semibold">Log in</a>
            <Button>Get Started <ArrowRight size={16} /></Button>
          </div>
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            className="rounded-xl border border-slate-200 p-2 lg:hidden"
            onClick={() => setMenuOpen((current) => !current)}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
        {menuOpen && (
          <nav className="border-t border-slate-200 bg-white px-5 py-5 lg:hidden" aria-label="Mobile navigation">
            {navigation.map((item) => <a onClick={() => setMenuOpen(false)} className="block py-3 font-medium" href={item.href} key={item.label}>{item.label}</a>)}
            <div className="mt-3 grid grid-cols-2 gap-3">
              <Button href="#contact" secondary>Log in</Button>
              <Button>Get Started</Button>
            </div>
          </nav>
        )}
      </header>

      <main id="top">
        <section className="relative bg-[radial-gradient(circle_at_80%_10%,rgba(33,133,220,.12),transparent_32%),linear-gradient(180deg,#fff_0%,#f8fbff_100%)] px-5 pb-24 pt-20 sm:px-8 lg:pb-32 lg:pt-28">
          <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-[.9fr_1.1fr]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#2185DC]/20 bg-[#2185DC]/5 px-4 py-2 text-sm font-medium text-[#176db6]"><span className="h-2 w-2 rounded-full bg-[#14B8A6]" />A calmer way to run your organization</div>
              <h1 className="mt-8 max-w-3xl text-5xl font-semibold leading-[1.02] tracking-[-.055em] sm:text-6xl lg:text-7xl">Everything your organization needs.<span className="mt-2 block text-[#2185DC]">One platform.</span></h1>
              <p className="mt-7 max-w-xl text-lg leading-8 text-slate-600">Yasaflow brings communication, activities, members, donations and administration together in one clear digital home—built for organizations that want to grow with confidence.</p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row"><Button>Create Organization <ArrowRight size={17} /></Button><Button secondary>Book Demo</Button></div>
              <p className="mt-5 flex items-center gap-2 text-sm text-slate-500"><Check size={16} className="text-[#14B8A6]" />Simple to start. Flexible for the long term.</p>
            </div>
            <ProductMockup />
          </div>
        </section>

        <section id="solutions" className="px-5 py-24 sm:px-8 lg:py-32">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-2xl"><p className="text-sm font-semibold uppercase tracking-[.18em] text-[#2185DC]">For communities of every kind</p><h2 className="mt-4 text-4xl font-semibold tracking-[-.04em] sm:text-5xl">Built for every organization.</h2><p className="mt-5 text-lg leading-8 text-slate-600">Different missions need different tools. Yasaflow provides a shared foundation that adapts without becoming complicated.</p></div>
            <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{organizations.map(({ icon: IconComponent, title, text }) => <article key={title} className="group rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-[0_10px_40px_rgba(15,23,42,.04)] transition hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(15,23,42,.08)]"><span className="grid h-11 w-11 place-items-center rounded-2xl bg-[#2185DC]/8 text-[#2185DC]"><IconComponent size={21} /></span><h3 className="mt-5 text-lg font-semibold">{title}</h3><p className="mt-3 text-sm leading-6 text-slate-600">{text}</p></article>)}</div>
          </div>
        </section>

        <section id="products" className="bg-[#0F172A] px-5 py-24 text-white sm:px-8 lg:py-32">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-2xl"><p className="text-sm font-semibold uppercase tracking-[.18em] text-[#62b4ff]">One connected platform</p><h2 className="mt-4 text-4xl font-semibold tracking-[-.04em] sm:text-5xl">The essentials, thoughtfully connected.</h2><p className="mt-5 text-lg leading-8 text-slate-300">Choose the modules your organization needs today and expand as your work evolves.</p></div>
            <div className="mt-14 grid gap-px overflow-hidden rounded-[2rem] border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-5">{features.map(({ icon: IconComponent, title, text }) => <article key={title} className="bg-[#0F172A] p-6 transition hover:bg-slate-800"><IconComponent className="text-[#62b4ff]" size={22} /><h3 className="mt-5 font-semibold">{title}</h3><p className="mt-3 text-sm leading-6 text-slate-400">{text}</p></article>)}</div>
          </div>
        </section>

        <section id="how-it-works" className="px-5 py-24 sm:px-8 lg:py-32">
          <div className="mx-auto max-w-7xl"><div className="grid gap-14 lg:grid-cols-[.75fr_1.25fr]"><div><p className="text-sm font-semibold uppercase tracking-[.18em] text-[#2185DC]">How it works</p><h2 className="mt-4 text-4xl font-semibold tracking-[-.04em] sm:text-5xl">From idea to launch, without the noise.</h2><p className="mt-5 text-lg leading-8 text-slate-600">A clear setup process gives your organization structure from day one.</p></div><ol className="space-y-4">{workflow.map(([title, text], index) => <li key={title} className="flex items-center gap-5 rounded-3xl border border-slate-200 p-5 sm:p-6"><span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[#2185DC] font-semibold text-white">{index + 1}</span><div className="flex-1"><p className="text-lg font-semibold">{title}</p><p className="mt-1 text-sm text-slate-500">{text}</p></div>{index < workflow.length - 1 && <ChevronDown className="text-slate-300" />}</li>)}</ol></div></div>
        </section>

        <section className="bg-slate-50 px-5 py-24 sm:px-8 lg:py-32">
          <div className="mx-auto max-w-7xl"><div className="text-center"><p className="text-sm font-semibold uppercase tracking-[.18em] text-[#2185DC]">Product experience</p><h2 className="mt-4 text-4xl font-semibold tracking-[-.04em] sm:text-5xl">One platform. Three focused views.</h2></div><div className="mt-14 grid gap-6 lg:grid-cols-3">{['Owner Dashboard', 'Administrator Dashboard', 'Mobile App'].map((title, index) => <article key={title} className="rounded-[2rem] border border-slate-200 bg-white p-4 shadow-[0_18px_50px_rgba(15,23,42,.06)]"><div className={`min-h-72 rounded-[1.5rem] p-5 ${index === 2 ? 'mx-auto max-w-[230px] bg-[#0F172A]' : 'bg-slate-100'}`}><div className="flex gap-2"><span className="h-2.5 w-2.5 rounded-full bg-slate-300" /><span className="h-2.5 w-2.5 rounded-full bg-slate-300" /></div><div className="mt-10 space-y-3"><div className="h-8 w-2/3 rounded-lg bg-white/90" /><div className="grid grid-cols-2 gap-3"><div className="h-20 rounded-xl bg-white/70" /><div className="h-20 rounded-xl bg-[#2185DC]/20" /></div><div className="h-24 rounded-xl bg-white/80" /></div></div><h3 className="px-2 pt-6 text-lg font-semibold">{title}</h3><p className="px-2 pb-2 pt-2 text-sm leading-6 text-slate-600">A calm, role-specific interface designed to keep the important work visible.</p></article>)}</div></div>
        </section>

        <section id="contact" className="px-5 py-24 sm:px-8 lg:py-32">
          <div className="mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-[#0F172A] px-6 py-14 text-center text-white shadow-[0_30px_80px_rgba(15,23,42,.18)] sm:px-12 sm:py-20"><p className="text-sm font-semibold uppercase tracking-[.18em] text-[#62b4ff]">Your next chapter</p><h2 className="mt-4 text-4xl font-semibold tracking-[-.04em] sm:text-5xl">Ready to get started?</h2><p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-slate-300">Give your organization a digital home built for clarity, trust and long-term growth.</p><div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row"><Button>Create Organization <ArrowRight size={17} /></Button><a className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-white/15 px-5 text-sm font-semibold hover:bg-white/5" href="mailto:hello@yasaflow.com">Book Demo</a></div></div>
        </section>
      </main>

      <footer className="border-t border-slate-200 px-5 py-12 sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-10 lg:flex-row lg:items-center lg:justify-between"><div><Logo /><p className="mt-3 max-w-sm text-sm text-slate-500">A modern digital home for organizations, communities and members.</p></div><nav className="flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-slate-600" aria-label="Footer navigation">{navigation.map((item) => <a href={item.href} key={item.label}>{item.label}</a>)}<a href="#contact">Privacy</a><a href="#contact">Terms</a></nav><div className="flex gap-3" aria-label="Social media placeholders"><span className="grid h-10 w-10 place-items-center rounded-full border border-slate-200 text-xs" aria-hidden="true">in</span><span className="grid h-10 w-10 place-items-center rounded-full border border-slate-200 text-xs" aria-hidden="true">ig</span></div></div>
        <div className="mx-auto mt-10 max-w-7xl border-t border-slate-200 pt-6 text-xs text-slate-400">© 2026 Yasaflow. Built for organizations that care about their community.</div>
      </footer>
    </div>
  );
}
