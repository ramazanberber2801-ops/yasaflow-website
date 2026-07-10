import { ArrowRight, Building2, CalendarDays, MessageSquareText, Sparkles, Users } from 'lucide-react';

const features = [
  { icon: Building2, title: 'Organisasjon', text: 'Samle nyheter, aktiviteter og administrasjon på ett sted.' },
  { icon: Users, title: 'Medlemmer', text: 'Gjør medlemsarbeid enklere og mer oversiktlig.' },
  { icon: CalendarDays, title: 'Aktiviteter', text: 'Planlegg arrangementer og hold alle oppdatert.' },
  { icon: MessageSquareText, title: 'Kommunikasjon', text: 'Nå ut med varsler, meldinger og viktig informasjon.' },
];

export default function App() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 py-16">
        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300">
          <Sparkles size={16} /> Yasaflow website foundation
        </div>

        <div className="mt-8 max-w-3xl">
          <h1 className="text-5xl font-semibold tracking-tight sm:text-7xl">
            Alt organisasjonen trenger. Ett sted.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            Grunnstrukturen er klar. Den endelige offentlige nettsiden og onboarding-opplevelsen bygges i neste fase.
          </p>
          <button className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-medium text-slate-950 transition hover:bg-slate-200">
            Kommer snart <ArrowRight size={18} />
          </button>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(({ icon: Icon, title, text }) => (
            <article key={title} className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <Icon className="text-cyan-300" size={22} />
              <h2 className="mt-4 font-semibold">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-400">{text}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
